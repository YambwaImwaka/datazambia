
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Search, UserPlus, UserMinus, Mail, User, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type AdminUser = {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
};

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const AdminAccountsPanel = () => {
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  // Fetch admin users
  const { data: adminUsers = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('email');

      if (error) {
        toast.error('Failed to load administrators');
        throw error;
      }

      return data as AdminUser[];
    },
  });

  // Filter admin users by search term
  const filteredAdmins = adminUsers.filter(admin => 
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (admin.full_name && admin.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (admin.username && admin.username.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Add admin mutation
  const addAdminMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.rpc('make_admin', { email });
      
      if (error) throw error;
      
      return email;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      form.reset();
      setAddDialogOpen(false);
      toast.success('Admin privileges granted successfully');
    },
    onError: (error: any) => {
      if (error.message.includes('not found')) {
        toast.error('User with this email address was not found');
      } else {
        toast.error('Failed to grant admin privileges');
        console.error('Error making admin:', error);
      }
    },
    onSettled: () => {
      setProcessing(false);
    }
  });

  // Remove admin mutation
  const removeAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', 'admin');
      
      if (error) throw error;
      
      return userId;
    },
    onSuccess: (userId) => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('Admin privileges removed successfully');
    },
    onError: (error) => {
      toast.error('Failed to remove admin privileges');
      console.error('Error removing admin:', error);
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setProcessing(true);
    addAdminMutation.mutate(data.email);
  });

  const handleRemoveAdmin = (admin: AdminUser) => {
    // Don't allow removing yourself
    if (admin.id === currentUser?.id) {
      toast.error("You cannot remove your own administrator privileges");
      return;
    }

    if (confirm(`Are you sure you want to remove administrator privileges from ${admin.email}?`)) {
      removeAdminMutation.mutate(admin.id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Administrator Accounts</CardTitle>
        <CardDescription>
          Manage user accounts with administrator privileges
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search administrators..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Administrator
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Administrator</DialogTitle>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User Email</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter user's email address" />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground mt-1">
                            The user must already be registered on the platform.
                          </p>
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setAddDialogOpen(false);
                          form.reset();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={processing}
                      >
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Grant Admin Access
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          {filteredAdmins.length > 0 ? (
            <Card>
              <ScrollArea className="h-[400px] w-full rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdmins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" />
                              <AvatarFallback className="bg-primary/10">
                                {admin.full_name?.[0] || admin.email[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{admin.full_name || 'Not set'}</div>
                              {admin.username && (
                                <div className="text-xs text-muted-foreground">@{admin.username}</div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{admin.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Badge 
                              variant="outline" 
                              className="bg-primary/10 text-primary border-primary/20"
                            >
                              <Shield className="h-3 w-3 mr-1" />
                              Administrator
                            </Badge>
                            {admin.id === currentUser?.id && (
                              <Badge className="ml-2 bg-blue-500/10 text-blue-500 border-blue-500/20">
                                You
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAdmin(admin)}
                            disabled={admin.id === currentUser?.id}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <UserMinus className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </Card>
          ) : isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Card className="py-12">
              <div className="text-center space-y-3">
                <Shield className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-medium">No administrators found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {searchTerm 
                    ? "No administrators match your search criteria." 
                    : "Add administrator privileges to users to allow them to manage the platform."}
                </p>
                {searchTerm ? (
                  <Button 
                    variant="outline"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setAddDialogOpen(true)}
                    className="mt-2"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Administrator
                  </Button>
                )}
              </div>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAccountsPanel;
