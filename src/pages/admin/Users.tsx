
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
import { User, Settings, Search, ArrowLeft, Shield, ShieldX } from 'lucide-react';

interface ProfileWithRole {
  id: string;
  email: string;
  username: string | null;
  full_name: string | null;
  is_admin: boolean;
  created_at: string;
}

interface SupabaseAuthUser {
  id: string;
  email?: string;
  [key: string]: any;
}

const UsersAdmin = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<ProfileWithRole[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
      
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username, full_name, created_at');
      
      if (profilesError) throw profilesError;
      
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .eq('role', 'admin');
      
      if (rolesError) throw rolesError;
      
      let emailMap = new Map<string, string>();
      try {
        const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
        
        if (!authError && authData && authData.users) {
          const authUsers = authData.users as SupabaseAuthUser[];
          authUsers.forEach(user => {
            if (user && user.id && user.email) {
              emailMap.set(user.id, user.email);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching auth users:', error);
      }
      
      const adminIds = new Set(roles.map(r => r.user_id));
      
      const mappedUsers: ProfileWithRole[] = profiles.map(profile => ({
        id: profile.id,
        email: emailMap.get(profile.id) || 'Email hidden',
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

  const makeAdmin = async (email: string) => {
    try {
      const { error } = await supabase.rpc('make_admin', { email });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error('Error making admin:', error);
      return { success: false, message: error.message };
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
      return { success: true };
    } catch (error: any) {
      console.error('Error removing admin:', error);
      return { success: false, message: error.message };
    }
  };

  const toggleAdminRole = async (userId: string, isCurrentlyAdmin: boolean) => {
    try {
      if (isCurrentlyAdmin) {
        const result = await removeAdmin(userId);
        
        if (!result.success) throw new Error(result.message);
        
        toast.success('Admin role removed');
      } else {
        const userEmail = users.find(u => u.id === userId)?.email;
        
        if (!userEmail || userEmail === 'Email hidden') {
          throw new Error('Could not find user email. Please try again later.');
        }
        
        const result = await makeAdmin(userEmail);
        
        if (!result.success) throw new Error(result.message);
        
        toast.success('Admin role added');
      }
      
      fetchUsers();
    } catch (error: any) {
      console.error('Error toggling admin role:', error);
      toast.error(error.message || 'Failed to update user role');
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
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleAdminRole(user.id, user.is_admin)}
                                >
                                  {user.is_admin ? (
                                    <>
                                      <ShieldX className="h-4 w-4 mr-1" />
                                      Remove Admin
                                    </>
                                  ) : (
                                    <>
                                      <Shield className="h-4 w-4 mr-1" />
                                      Make Admin
                                    </>
                                  )}
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => navigate(`/admin/users/${user.id}`)}>
                                  <Settings className="h-4 w-4" />
                                </Button>
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
