
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Loader2, UserCog, ShieldAlert, Shield, UserX, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
  };
  isAdmin?: boolean;
}

const UserManagementPanel = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState<'promote' | 'demote' | 'delete' | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;
      
      if (!authUsers?.users?.length) {
        setUsers([]);
        return;
      }
      
      // Fetch admin roles to determine which users are admins
      const { data: adminRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');
        
      if (rolesError) throw rolesError;
      
      const adminUserIds = new Set((adminRoles || []).map(role => role.user_id));
      
      // Combine the data
      const enrichedUsers = authUsers.users.map(user => ({
        ...user,
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
    user.user_metadata?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePromoteUser = async (userId: string) => {
    setProcessingUserId(userId);
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role: 'admin' });
        
      if (error) throw error;
      
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isAdmin: true } : user
      ));
      
      toast.success('User promoted to administrator');
    } catch (error) {
      console.error('Error promoting user:', error);
      toast.error('Failed to promote user');
    } finally {
      setProcessingUserId(null);
      setShowConfirmDialog(false);
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
      
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isAdmin: false } : user
      ));
      
      toast.success('User role updated');
    } catch (error) {
      console.error('Error demoting user:', error);
      toast.error('Failed to update user role');
    } finally {
      setProcessingUserId(null);
      setShowConfirmDialog(false);
    }
  };

  const confirmAction = (user: User, action: 'promote' | 'demote' | 'delete') => {
    setSelectedUser(user);
    setActionType(action);
    setShowConfirmDialog(true);
  };

  const executeConfirmedAction = () => {
    if (!selectedUser || !actionType) return;
    
    switch (actionType) {
      case 'promote':
        handlePromoteUser(selectedUser.id);
        break;
      case 'demote':
        handleDemoteUser(selectedUser.id);
        break;
      case 'delete':
        // Implement user deletion logic here
        toast.info('User deletion not yet implemented');
        setShowConfirmDialog(false);
        break;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          View and manage user accounts and permissions
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
                              <AvatarImage src={user.user_metadata?.avatar_url} />
                              <AvatarFallback className="text-xs">
                                {user.user_metadata?.full_name?.[0] || user.email[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">
                              {user.user_metadata?.full_name || 'User'}
                            </span>
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
                          <div className="flex justify-end gap-2">
                            {currentUser?.id !== user.id && (
                              <>
                                {user.isAdmin ? (
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => confirmAction(user, 'demote')}
                                    disabled={processingUserId === user.id}
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
                                    onClick={() => confirmAction(user, 'promote')}
                                    disabled={processingUserId === user.id}
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
                                  onClick={() => confirmAction(user, 'delete')}
                                >
                                  <UserX className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button variant="ghost" size="icon">
                              <UserCog className="h-4 w-4" />
                            </Button>
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

        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === 'promote' ? 'Promote to Administrator' : 
                 actionType === 'demote' ? 'Remove Administrator Role' : 
                 'Delete User Account'}
              </DialogTitle>
              <DialogDescription>
                {actionType === 'promote' 
                  ? 'This will grant administrative privileges to this user, allowing them to access all areas of the system.'
                  : actionType === 'demote'
                  ? 'This will remove administrative privileges from this user, restricting them to standard user access.'
                  : 'This will permanently delete this user account and all associated data. This action cannot be undone.'}
              </DialogDescription>
            </DialogHeader>

            {selectedUser && (
              <div className="flex items-center gap-3 py-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedUser.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {selectedUser.user_metadata?.full_name?.[0] || selectedUser.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedUser.user_metadata?.full_name || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>
            )}

            <DialogFooter className="gap-2 sm:justify-end">
              <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
              <Button 
                variant={actionType === 'delete' ? 'destructive' : 'default'}
                onClick={executeConfirmedAction}
                disabled={processingUserId === selectedUser?.id}
              >
                {processingUserId === selectedUser?.id && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UserManagementPanel;
