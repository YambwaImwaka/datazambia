
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
import { removeAdmin } from '@/utils/makeAdmin';
import { useAuth } from '@/contexts/AuthContext';

const AdminAccountsPanel = () => {
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    setIsLoading(true);
    try {
      // First, get all users with admin role
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
        .select('*')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      setAdminUsers(profilesData || []);
    } catch (error) {
      console.error('Error fetching admin users:', error);
      toast.error('Failed to load admin users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAdmin = async (userId: string, username: string) => {
    try {
      const result = await removeAdmin(userId);
      
      if (result.success) {
        toast.success(`Admin privileges removed from ${username}`);
        // Refresh the admin users list
        fetchAdminUsers();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      console.error('Error removing admin:', error);
      toast.error(error.message || 'An error occurred while removing admin privileges');
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
          <Button className="ml-auto" onClick={() => navigate('/create-admin')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Admin
          </Button>
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
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell className="font-medium">{admin.username || 'N/A'}</TableCell>
                      <TableCell>{admin.full_name || 'N/A'}</TableCell>
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
                                  onClick={() => handleRemoveAdmin(admin.id, admin.username || admin.full_name)}
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
                {searchTerm ? "No admins match your search criteria." : "Add your first admin user to get started."}
              </p>
              {searchTerm ? (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </Button>
              ) : (
                <Button 
                  className="mt-4"
                  onClick={() => navigate('/create-admin')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Admin
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
