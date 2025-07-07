import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, Settings, Search, ArrowLeft, Shield, ShieldX, Plus } from 'lucide-react';

interface ProfileWithRole {
  id: string;
  email: string;
  username: string | null;
  full_name: string | null;
  is_admin: boolean;
  created_at: string;
}

const UsersAdmin = () => {
  const { isAdmin, makeUserAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<ProfileWithRole[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }

    fetchUsers();
  }, [isAdmin, navigate]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      
      // Get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username, full_name, created_at');
      
      if (profilesError) throw profilesError;
      
      // Get admin users
      const { data: adminUsers, error: adminError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');
      
      if (adminError) throw adminError;
      
      const adminIds = new Set((adminUsers || []).map(r => r.user_id));
      
      // Get user emails from auth (this might not work with RLS, so we'll handle gracefully)
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
        console.warn('Could not fetch user emails:', error);
      }
      
      const mappedUsers: ProfileWithRole[] = (profiles || []).map(profile => ({
        id: profile.id,
        email: emailMap.get(profile.id) || 'Email not available',
        username: profile.username,
        full_name: profile.full_name,
        is_admin: adminIds.has(profile.id),
        created_at: profile.created_at
      }));
      
      setUsers(mappedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMakeAdmin = async (email: string) => {
    const result = await makeUserAdmin(email);
    if (result.success) {
      await fetchUsers(); // Refresh the list
    } else {
      toast.error(result.message || 'Failed to make user admin');
    }
  };

  const handleAddNewAdmin = async () => {
    if (!newAdminEmail.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    setIsAddingAdmin(true);
    try {
      const result = await makeUserAdmin(newAdminEmail.trim());
      if (result.success) {
        setNewAdminEmail('');
        await fetchUsers();
      }
    } finally {
      setIsAddingAdmin(false);
    }
  };

  const removeAdmin = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');

      if (error) throw error;
      
      toast.success('Admin role removed');
      await fetchUsers();
    } catch (error: any) {
      console.error('Error removing admin:', error);
      toast.error('Failed to remove admin role');
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" onClick={() => navigate('/admin/dashboard')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">User Management</h1>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-9 w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Add Admin Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Make User Admin</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter user email..."
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddNewAdmin}
                  disabled={isAddingAdmin || !newAdminEmail.trim()}
                >
                  {isAddingAdmin ? 'Adding...' : 'Make Admin'}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Enter the email address of the user you want to make an admin.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="py-3 px-4 text-left">User</th>
                        <th className="py-3 px-4 text-left">Email</th>
                        <th className="py-3 px-4 text-left">Role</th>
                        <th className="py-3 px-4 text-left">Joined</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <User className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{user.full_name || 'N/A'}</p>
                                  <p className="text-sm text-muted-foreground">@{user.username || 'no-username'}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">{user.email}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                {user.is_admin ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                    <Shield className="h-3 w-3 mr-1" />
                                    Admin
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                    Viewer
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2">
                                {user.is_admin ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeAdmin(user.id)}
                                  >
                                    <ShieldX className="h-4 w-4 mr-1" />
                                    Remove Admin
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleMakeAdmin(user.email)}
                                    disabled={user.email === 'Email not available'}
                                  >
                                    <Shield className="h-4 w-4 mr-1" />
                                    Make Admin
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-muted-foreground">
                            No users found matching your search criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UsersAdmin;
