
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useForm } from 'react-hook-form';
import { Pencil, Plus, Search, Trash2, Filter, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { provinces as provincesData } from '@/utils/data';
import { toast } from 'sonner';

// Define the schema for provinces
const provinceSchema = z.object({
  name: z.string().min(1, 'Province name is required'),
  capital: z.string().min(1, 'Capital city is required'),
  description: z.string(),
  population: z.number().positive('Population must be a positive number'),
});

type ProvinceFormValues = z.infer<typeof provinceSchema>;

const ContentManagementPanel = () => {
  const [activeTab, setActiveTab] = useState('provinces');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewProvinceDialogOpen, setIsNewProvinceDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const { data: provinces, isLoading } = useQuery({
    queryKey: ['provinces'],
    queryFn: () => Promise.resolve(provincesData),
  });
  
  // Filter provinces based on search term
  const filteredProvinces = provinces?.filter(province => 
    province.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    province.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    province.capital.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  const selectedProvince = provinces?.find(p => p.id === selectedProvinceId);
  
  // Edit form
  const form = useForm<ProvinceFormValues>({
    resolver: zodResolver(provinceSchema),
    defaultValues: {
      name: selectedProvince?.name || '',
      capital: selectedProvince?.capital || '',
      description: selectedProvince?.description || '',
      population: selectedProvince?.population || 0,
    }
  });
  
  // New province form
  const newProvinceForm = useForm<ProvinceFormValues>({
    resolver: zodResolver(provinceSchema),
    defaultValues: {
      name: '',
      capital: '',
      description: '',
      population: 0,
    }
  });
  
  // Mock mutation for updating a province
  const updateProvinceMutation = useMutation({
    mutationFn: (values: ProvinceFormValues & { id: string }) => {
      // In a real app, this would call an API or Supabase
      console.log('Updating province:', values);
      // Simulate API call
      return new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provinces'] });
      setIsEditDialogOpen(false);
      toast.success('Province updated successfully');
    },
    onError: () => {
      toast.error('Failed to update province');
    }
  });
  
  // Mock mutation for creating a new province
  const createProvinceMutation = useMutation({
    mutationFn: (values: ProvinceFormValues) => {
      // In a real app, this would call an API or Supabase
      console.log('Creating province:', values);
      // Simulate API call
      return new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provinces'] });
      setIsNewProvinceDialogOpen(false);
      newProvinceForm.reset();
      toast.success('Province created successfully');
    },
    onError: () => {
      toast.error('Failed to create province');
    }
  });
  
  // Mock mutation for deleting a province
  const deleteProvinceMutation = useMutation({
    mutationFn: (id: string) => {
      // In a real app, this would call an API or Supabase
      console.log('Deleting province:', id);
      // Simulate API call
      return new Promise<void>(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provinces'] });
      toast.success('Province deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete province');
    }
  });
  
  const openEditDialog = (provinceId: string) => {
    setSelectedProvinceId(provinceId);
    const province = provinces?.find(p => p.id === provinceId);
    if (province) {
      form.reset({
        name: province.name,
        capital: province.capital,
        description: province.description,
        population: province.population,
      });
    }
    setIsEditDialogOpen(true);
  };
  
  const handleSaveChanges = (values: ProvinceFormValues) => {
    if (!selectedProvinceId) return;
    
    updateProvinceMutation.mutate({
      ...values,
      id: selectedProvinceId,
    });
  };
  
  const handleCreateProvince = (values: ProvinceFormValues) => {
    createProvinceMutation.mutate(values);
  };
  
  const handleDeleteProvince = (id: string) => {
    if (confirm('Are you sure you want to delete this province? This action cannot be undone.')) {
      deleteProvinceMutation.mutate(id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Management</CardTitle>
        <CardDescription>
          Manage all content across the Zambia Insight platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="provinces" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="provinces">Provinces</TabsTrigger>
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="pages">Static Pages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="provinces" className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search provinces..." 
                  className="pl-9" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                className="w-full md:w-auto" 
                onClick={() => setIsNewProvinceDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Province
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading provinces...</span>
              </div>
            ) : filteredProvinces.length > 0 ? (
              <Card>
                <ScrollArea className="h-[400px] w-full rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Capital</TableHead>
                        <TableHead>Population</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProvinces.map((province) => (
                        <TableRow key={province.id}>
                          <TableCell className="font-medium">{province.name}</TableCell>
                          <TableCell>{province.capital}</TableCell>
                          <TableCell>{province.population.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => openEditDialog(province.id)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteProvince(province.id)}
                                disabled={deleteProvinceMutation.isPending}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </Card>
            ) : (
              <Card className="py-12">
                <div className="text-center space-y-3">
                  <Search className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-medium">No provinces found</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    {searchTerm 
                      ? "No provinces match your search criteria." 
                      : "Add your first province to get started."}
                  </p>
                  {searchTerm ? (
                    <Button 
                      variant="outline"
                      onClick={() => setSearchTerm('')}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Clear Filters
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setIsNewProvinceDialogOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Province
                    </Button>
                  )}
                </div>
              </Card>
            )}
            
            {/* Edit Province Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Edit Province</DialogTitle>
                  <DialogDescription>
                    Update province information including name, capital, population, and description.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSaveChanges)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Province Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="capital"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capital City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="population"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Population</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="number" 
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              className="min-h-[120px]" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsEditDialogOpen(false)}
                        disabled={updateProvinceMutation.isPending}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        disabled={updateProvinceMutation.isPending}
                      >
                        {updateProvinceMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            {/* New Province Dialog */}
            <Dialog open={isNewProvinceDialogOpen} onOpenChange={setIsNewProvinceDialogOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Province</DialogTitle>
                  <DialogDescription>
                    Create a new province with basic information including name, capital, population, and description.
                  </DialogDescription>
                </DialogHeader>
                <Form {...newProvinceForm}>
                  <form onSubmit={newProvinceForm.handleSubmit(handleCreateProvince)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={newProvinceForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Province Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={newProvinceForm.control}
                        name="capital"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capital City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={newProvinceForm.control}
                        name="population"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Population</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="number" 
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={newProvinceForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              className="min-h-[120px]" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsNewProvinceDialogOpen(false)}
                        disabled={createProvinceMutation.isPending}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        disabled={createProvinceMutation.isPending}
                      >
                        {createProvinceMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          'Create Province'
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="datasets">
            <Card className="p-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <Database className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Datasets Management</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Upload, organize, and manage economic and social datasets for Zambia's provinces and districts.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Dataset
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="articles">
            <Card className="p-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <FileText className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Articles Management</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Create and publish articles, news, and analysis about Zambia's economy, development, and governance.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Article
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="pages">
            <Card className="p-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <Layout className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Static Pages Management</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Edit and update static pages including About Us, Contact, Terms of Service, and Privacy Policy.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Page
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

import { FileText, Layout } from 'lucide-react';
import { Database } from 'lucide-react';

export default ContentManagementPanel;
