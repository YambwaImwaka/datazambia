
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useForm } from 'react-hook-form';
import { PencilIcon, PlusIcon, SearchIcon, TrashIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import mockProvinces from '@/utils/data';

const ContentManagementPanel = () => {
  const [activeTab, setActiveTab] = useState('provinces');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Mock query - in a real app this would fetch from Supabase
  const { data: provinces } = useQuery({
    queryKey: ['provinces'],
    queryFn: () => Promise.resolve(mockProvinces),
    initialData: mockProvinces,
  });
  
  const filteredProvinces = provinces.filter(province => 
    province.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    province.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    province.capital.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectedProvince = provinces.find(p => p.id === selectedProvinceId);
  
  const form = useForm({
    defaultValues: {
      name: selectedProvince?.name || '',
      capital: selectedProvince?.capital || '',
      description: selectedProvince?.description || '',
    }
  });
  
  const openEditDialog = (provinceId: string) => {
    setSelectedProvinceId(provinceId);
    const province = provinces.find(p => p.id === provinceId);
    if (province) {
      form.reset({
        name: province.name,
        capital: province.capital,
        description: province.description,
      });
    }
    setIsEditDialogOpen(true);
  };
  
  const handleSaveChanges = (values: any) => {
    console.log('Saving changes:', values);
    // In a real app, this would call a Supabase mutation to update the province
    setIsEditDialogOpen(false);
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
            <div className="flex items-center justify-between">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search provinces..." 
                  className="pl-9" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="ml-auto">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Province
              </Button>
            </div>
            
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
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openEditDialog(province.id)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </Card>
            
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Edit Province</DialogTitle>
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
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="datasets">
            <Card className="p-6">
              <p className="text-muted-foreground">Dataset management coming soon...</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="articles">
            <Card className="p-6">
              <p className="text-muted-foreground">Article management coming soon...</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="pages">
            <Card className="p-6">
              <p className="text-muted-foreground">Static page management coming soon...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentManagementPanel;
