
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Loader2, UserCog, ShieldAlert, Shield, UserX, Search, Download, Trash2, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
  profile?: {
    username?: string;
    full_name?: string;
    bio?: string;
    location?: string;
    avatar_url?: string;
  };
  isAdmin?: boolean;
}

const profileSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserManagementPanel = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: '',
      username: '',
      bio: '',
      location: '',
    },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch users from auth
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      if (authError) throw authError;

      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
      if (profilesError) throw profilesError;

      // Fetch admin roles
      const { data: adminRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');
      if (rolesError) throw rolesError;

      const adminUserIds = new Set((adminRoles || []).map(role => role.user_id));
      const profilesMap = new Map(profiles?.map(p => [p.id, p]) || []);

      const enrichedUsers = authUsers.users.map(user => ({
        ...user,
        profile: profilesMap.get(user.id),
        isAdmin: adminUserIds.has(user.id)
      }));

      setUsers(enrichedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.profile?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.profile?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePromoteUser = async (userId: string) => {
    setProcessingUserId(userId);
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role: 'admin' });
        
      if (error) throw error;
      
      await fetchUsers();
      toast.success('User promoted to administrator');
    } catch (error) {
      console.error('Error promoting user:', error);
      toast.error('Failed to promote user');
    } finally {
      setProcessingUserId(null);
    }
  };

  const handleDemoteUser = async (userId: string) => {
    setProcessingUserId(userId);
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');
        
      if (error) throw error;
      
      await fetchUsers();
      toast.success('User role updated');
    } catch (error) {
      console.error('Error demoting user:', error);
      toast.error('Failed to update user role');
    } finally {
      setProcessingUserId(null);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    form.reset({
      full_name: user.profile?.full_name || user.user_metadata?.full_name || '',
      username: user.profile?.username || '',
      bio: user.profile?.bio || '',
      location: user.profile?.location || '',
    });
    setShowEditDialog(true);
  };

  const handleUpdateUser = async (values: ProfileFormValues) => {
    if (!editingUser) return;
    
    setProcessingUserId(editingUser.id);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: editingUser.id,
          ...values,
          updated_at: new Date().toISOString(),
        });
        
      if (error) throw error;
      
      await fetchUsers();
      setShowEditDialog(false);
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setProcessingUserId(null);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    setProcessingUserId(userToDelete.id);
    try {
      // First anonymize the user data
      const { error: anonymizeError } = await supabase.rpc('anonymize_user_data', {
        target_user_id: userToDelete.id
      });
      
      if (anonymizeError) throw anonymizeError;
      
      // Then delete the auth user
      const { error: deleteError } = await supabase.auth.admin.deleteUser(userToDelete.id);
      if (deleteError) throw deleteError;
      
      await fetchUsers();
      setShowDeleteDialog(false);
      setUserToDelete(null);
      toast.success('User deleted and data anonymized');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setProcessingUserId(null);
    }
  };

  const handleExportUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('export_user_data', {
        target_user_id: userId
      });
      
      if (error) throw error;
      
      // Download as JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `user_data_${userId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('User data exported successfully');
    } catch (error) {
      console.error('Error exporting user data:', error);
      toast.error('Failed to export user data');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and data with GDPR compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full">
                  {users.length} Users
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  {users.filter(u => u.isAdmin).length} Admins
                </Badge>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Sign In</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.profile?.avatar_url || user.user_metadata?.avatar_url} />
                                <AvatarFallback className="text-xs">
                                  {(user.profile?.full_name || user.user_metadata?.full_name)?.[0] || user.email[0].toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <span className="font-medium">
                                  {user.profile?.full_name || user.user_metadata?.full_name || 'User'}
                                </span>
                                {user.profile?.username && (
                                  <p className="text-sm text-muted-foreground">@{user.profile.username}</p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {user.last_sign_in_at 
                              ? new Date(user.last_sign_in_at).toLocaleDateString() 
                              : 'Never'}
                          </TableCell>
                          <TableCell>
                            {user.isAdmin ? (
                              <Badge className="bg-primary">Administrator</Badge>
                            ) : (
                              <Badge variant="secondary">Standard User</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEditUser(user)}
                                title="Edit User"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleExportUserData(user.id)}
                                title="Export User Data"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              
                              {currentUser?.id !== user.id && (
                                <>
                                  {user.isAdmin ? (
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={() => handleDemoteUser(user.id)}
                                      disabled={processingUserId === user.id}
                                      title="Remove Admin"
                                    >
                                      {processingUserId === user.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <Shield className="h-4 w-4" />
                                      )}
                                    </Button>
                                  ) : (
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={() => handlePromoteUser(user.id)}
                                      disabled={processingUserId === user.id}
                                      title="Make Admin"
                                    >
                                      {processingUserId === user.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <ShieldAlert className="h-4 w-4" />
                                      )}
                                    </Button>
                                  )}
                                  
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => {
                                      setUserToDelete(user);
                                      setShowDeleteDialog(true);
                                    }}
                                    title="Delete User"
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No users found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Profile</DialogTitle>
            <DialogDescription>
              Update user profile information
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateUser)} className="space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={processingUserId === editingUser?.id}
                >
                  {processingUserId === editingUser?.id && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update User
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User Account</DialogTitle>
            <DialogDescription>
              This will permanently delete the user account and anonymize all associated data. 
              This action cannot be undone and complies with GDPR data deletion requirements.
            </DialogDescription>
          </DialogHeader>

          {userToDelete && (
            <div className="flex items-center gap-3 py-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userToDelete.profile?.avatar_url || userToDelete.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {(userToDelete.profile?.full_name || userToDelete.user_metadata?.full_name)?.[0] || userToDelete.email[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {userToDelete.profile?.full_name || userToDelete.user_metadata?.full_name || 'User'}
                </p>
                <p className="text-sm text-muted-foreground">{userToDelete.email}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={processingUserId === userToDelete?.id}
            >
              {processingUserId === userToDelete?.id && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagementPanel;
