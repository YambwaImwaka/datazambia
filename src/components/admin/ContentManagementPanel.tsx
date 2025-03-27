
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { provinces } from '@/utils/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, PlusCircle, MapPin, Activity, BarChart, FileText } from 'lucide-react';

const ContentManagementPanel = () => {
  const [activeTab, setActiveTab] = useState('provinces');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Management</CardTitle>
        <CardDescription>
          Manage the data and content displayed throughout the site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="provinces" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="provinces">Provinces</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="featured">Featured Content</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="provinces" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Provinces Database</h3>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Province
              </Button>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Capital</TableHead>
                    <TableHead>Population</TableHead>
                    <TableHead>Area (km²)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {provinces.map((province) => (
                    <TableRow key={province.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          {province.name}
                        </div>
                      </TableCell>
                      <TableCell>{province.capital}</TableCell>
                      <TableCell>{province.population.toLocaleString()}</TableCell>
                      <TableCell>{province.area.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Statistics & Indicators</h3>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Statistic
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">Health Statistics</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">15 indicators</p>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">Economic Indicators</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">23 indicators</p>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">Agriculture Data</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">18 indicators</p>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="featured" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Featured Content Management</h3>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Featured Item
              </Button>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {provinces.slice(0, 5).map((province, index) => (
                    <TableRow key={province.id}>
                      <TableCell className="font-medium">
                        {province.name} Overview
                      </TableCell>
                      <TableCell>Province</TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          Active
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Report Templates</h3>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Report Template
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Province Summary Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">A comprehensive overview of key metrics for a selected province</p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">Edit Template</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Economic Trends Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Analysis of economic indicators over time with visualizations</p>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">Edit Template</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentManagementPanel;
