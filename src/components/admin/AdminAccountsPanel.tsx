import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Loader2, Search, Shield, ShieldCheck, UserX, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type AdminUser = {
  id: string;
  username: string | null;
  full_name: string | null;
  email: string;
  created_at: string;
};

const AdminAccountsPanel = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const navigate = useNavigate();
  const { user, makeUserAdmin } = useAuth();

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    setIsLoading(true);
    try {
      // Get all users with admin role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      if (roleError) throw roleError;

      if (!roleData || roleData.length === 0) {
        setAdminUsers([]);
        return;
      }

      // Get user IDs from role data
      const userIds = roleData.map((item) => item.user_id);

      // Fetch user profiles for these IDs
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username, full_name, created_at')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      // Try to get emails from auth.users (might not work with RLS)
      let emailMap = new Map<string, string>();
      try {
        const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
        
        if (!authError && authData?.users) {
          authData.users.forEach((authUser: any) => {
            if (authUser?.id && authUser?.email) {
              emailMap.set(authUser.id, authUser.email);
            }
          });
        }
      } catch (error) {
        console.warn('Could not fetch auth emails:', error);
      }

      // Combine profile data with emails
      const adminsWithEmails = (profilesData || []).map(profile => ({
        ...profile,
        email: emailMap.get(profile.id) || 'Email not available'
      }));

      setAdminUsers(adminsWithEmails);
    } catch (error) {
      console.error('Error fetching admin users:', error);
      toast.error('Failed to load admin users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAdmin = async (userId: string, username: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');

      if (error) throw error;

      toast.success(`Admin privileges removed from ${username}`);
      // Refresh the admin users list
      fetchAdminUsers();
    } catch (error: any) {
      console.error('Error removing admin:', error);
      toast.error(error.message || 'An error occurred while removing admin privileges');
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    setIsAddingAdmin(true);
    try {
      const result = await makeUserAdmin(newAdminEmail.trim());
      if (result.success) {
        setNewAdminEmail('');
        await fetchAdminUsers();
      }
    } finally {
      setIsAddingAdmin(false);
    }
  };

  // Filter admin users based on search term
  const filteredAdmins = adminUsers.filter((admin) => {
    return (
      admin.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Accounts</CardTitle>
        <CardDescription>
          Manage administrator accounts and privileges
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Admin Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Enter email to make admin..."
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleAddAdmin}
                disabled={isAddingAdmin || !newAdminEmail.trim()}
              >
                <Plus className="h-4 w-4 mr-1" />
                {isAddingAdmin ? 'Adding...' : 'Add Admin'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search admins..." 
              className="pl-9" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading admin accounts...</span>
          </div>
        ) : filteredAdmins.length > 0 ? (
          <Card>
            <ScrollArea className="h-[400px] w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell className="font-medium">{admin.username || 'N/A'}</TableCell>
                      <TableCell>{admin.full_name || 'N/A'}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <ShieldCheck className="mr-1 h-3 w-3" />
                          Administrator
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {user?.id !== admin.id ? (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                <UserX className="h-4 w-4 mr-1" />
                                Remove Admin
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Remove Admin Privileges</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to remove admin privileges from {admin.username || admin.full_name}? 
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-red-500 hover:bg-red-600"
                                  onClick={() => handleRemoveAdmin(admin.id, admin.username || admin.full_name || 'User')}
                                >
                                  Remove Admin
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <Shield className="mr-1 h-3 w-3" />
                            Current User
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
        ) : (
          <Card className="py-8">
            <div className="text-center">
              <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">No admin accounts found</h3>
              <p className="mt-1 text-muted-foreground">
                {searchTerm ? "No admins match your search criteria." : "Use the form above to add admin users."}
              </p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </Button>
              )}
            </div>
          </Card>
        )}

        <div className="mt-4 text-sm text-muted-foreground">
          <p>Note: For security reasons, you cannot remove your own admin privileges.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAccountsPanel;
