
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Upload, Search, FileType, Image, File, Trash2, FileText, Download, Filter, LayoutGrid, ListFilter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type MediaFile = {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  alt_text: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
};

type FileTypeFilter = 'all' | 'image' | 'document' | 'other';
type ViewMode = 'list' | 'grid';

const fileUploadSchema = z.object({
  alt_text: z.string().optional(),
  description: z.string().optional(),
});

type FileUploadFormValues = z.infer<typeof fileUploadSchema>;

const MediaManagementPanel = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [fileTypeFilter, setFileTypeFilter] = useState<FileTypeFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<FileUploadFormValues>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      alt_text: '',
      description: '',
    },
  });

  // Fetch media files
  const { data: mediaFiles = [], isLoading } = useQuery({
    queryKey: ['media-files'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to load media files');
        throw error;
      }

      return data as MediaFile[];
    },
  });

  // Filter media files based on search term and file type
  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = 
      file.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (file.description && file.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (file.alt_text && file.alt_text.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (fileTypeFilter === 'all') return matchesSearch;
    
    if (fileTypeFilter === 'image') {
      return matchesSearch && file.file_type.startsWith('image/');
    }
    
    if (fileTypeFilter === 'document') {
      return matchesSearch && (
        file.file_type.includes('pdf') || 
        file.file_type.includes('word') || 
        file.file_type.includes('document') ||
        file.file_type.includes('text/') ||
        file.file_type.includes('spreadsheet') ||
        file.file_type.includes('excel')
      );
    }
    
    if (fileTypeFilter === 'other') {
      return matchesSearch && 
        !file.file_type.startsWith('image/') && 
        !(
          file.file_type.includes('pdf') || 
          file.file_type.includes('word') || 
          file.file_type.includes('document') ||
          file.file_type.includes('text/') ||
          file.file_type.includes('spreadsheet') ||
          file.file_type.includes('excel')
        );
    }
    
    return matchesSearch;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadMutation = useMutation({
    mutationFn: async (formData: { 
      file: File; 
      alt_text?: string; 
      description?: string;
    }) => {
      if (!user) throw new Error('Not authenticated');
      
      // Upload to storage
      const fileExt = formData.file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}-${formData.file.name}`;
      
      // Check if storage bucket exists and create if needed
      try {
        const { data: buckets } = await supabase.storage.listBuckets();
        const mediaBucketExists = buckets?.some(bucket => bucket.name === 'media');
        
        if (!mediaBucketExists) {
          toast.info('Setting up storage bucket...');
          // This would require creating the bucket via SQL or API in a real app
        }
      } catch (error) {
        console.error('Error checking buckets:', error);
        // Continue with upload attempt anyway
      }
      
      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, formData.file, {
          upsert: true,
          contentType: formData.file.type
        });
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = supabase.storage.from('media').getPublicUrl(filePath);
      
      // Create record in media table
      const { data: mediaData, error: mediaError } = await supabase
        .from('media')
        .insert({
          user_id: user.id,
          file_name: formData.file.name,
          file_path: filePath,
          file_type: formData.file.type,
          file_size: formData.file.size,
          alt_text: formData.alt_text || null,
          description: formData.description || null,
        })
        .select()
        .single();
      
      if (mediaError) {
        // Try to delete the uploaded file if db insertion fails
        await supabase.storage.from('media').remove([filePath]);
        throw mediaError;
      }
      
      return mediaData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media-files'] });
      setSelectedFile(null);
      form.reset();
      setUploadDialogOpen(false);
      toast.success('File uploaded successfully');
    },
    onError: (error: any) => {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload file');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (file: MediaFile) => {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([file.file_path]);
      
      if (storageError) throw storageError;
      
      // Delete from media table
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', file.id);
      
      if (dbError) throw dbError;
      
      return file.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media-files'] });
      toast.success('File deleted successfully');
    },
    onError: (error: any) => {
      console.error('Delete error:', error);
      toast.error(error.message || 'Failed to delete file');
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }
    
    setIsUploading(true);
    uploadMutation.mutate({
      file: selectedFile,
      alt_text: data.alt_text,
      description: data.description,
    });
  });

  const handleDelete = (file: MediaFile) => {
    if (confirm(`Are you sure you want to delete ${file.file_name}?`)) {
      deleteMutation.mutate(file);
    }
  };

  const getFileUrl = (filePath: string) => {
    return supabase.storage.from('media').getPublicUrl(filePath).data.publicUrl;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    else return (bytes / 1073741824).toFixed(1) + ' GB';
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="h-6 w-6 text-blue-500" />;
    if (fileType.includes('pdf')) return <FileText className="h-6 w-6 text-red-500" />;
    if (fileType.includes('word') || fileType.includes('document')) 
      return <FileText className="h-6 w-6 text-blue-700" />;
    if (fileType.includes('spreadsheet') || fileType.includes('excel')) 
      return <FileText className="h-6 w-6 text-green-600" />;
    return <File className="h-6 w-6 text-gray-500" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Library</CardTitle>
        <CardDescription>
          Upload and manage media files across the Zambia Insight platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex w-full sm:w-auto gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search media..." 
                  className="pl-9" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select 
                value={fileTypeFilter} 
                onValueChange={(value) => setFileTypeFilter(value as FileTypeFilter)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="File type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All files</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <div className="flex border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none rounded-l-md ${viewMode === 'list' ? 'bg-muted' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <ListFilter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none rounded-r-md ${viewMode === 'grid' ? 'bg-muted' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
              
              <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Media
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Upload New Media</DialogTitle>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <FormLabel>File</FormLabel>
                        <Input 
                          type="file" 
                          onChange={handleFileChange}
                          className="cursor-pointer"
                        />
                        {selectedFile && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {selectedFile.name} ({formatFileSize(selectedFile.size)})
                          </p>
                        )}
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="alt_text"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alt Text</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Descriptive text for the media" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                placeholder="Additional details about this media file"
                                className="min-h-[80px]"
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
                          onClick={() => {
                            setUploadDialogOpen(false);
                            setSelectedFile(null);
                            form.reset();
                          }}
                          disabled={isUploading}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={!selectedFile || isUploading || uploadMutation.isPending}
                        >
                          {(isUploading || uploadMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Upload
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading media files...</span>
            </div>
          ) : filteredFiles.length > 0 ? (
            viewMode === 'list' ? (
              <Card>
                <ScrollArea className="h-[500px] w-full rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Uploaded</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFiles.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getFileIcon(file.file_type)}
                              <div>
                                <div className="font-medium">{file.file_name}</div>
                                {file.alt_text && (
                                  <div className="text-xs text-muted-foreground">{file.alt_text}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{file.file_type.split('/')[1] || file.file_type}</Badge>
                          </TableCell>
                          <TableCell>{formatFileSize(file.file_size)}</TableCell>
                          <TableCell>{formatDistanceToNow(new Date(file.created_at), { addSuffix: true })}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => window.open(getFileUrl(file.file_path), '_blank')}
                                title="Download"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(file)}
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                                disabled={deleteMutation.isPending}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFiles.map((file) => (
                  <Card key={file.id} className="overflow-hidden">
                    <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      {file.file_type.startsWith('image/') ? (
                        <img 
                          src={getFileUrl(file.file_path)} 
                          alt={file.alt_text || file.file_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          {getFileIcon(file.file_type)}
                          <span className="mt-2 text-sm text-muted-foreground">{file.file_type.split('/')[1]}</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <div className="truncate font-medium">{file.file_name}</div>
                      <div className="text-xs text-muted-foreground mt-1 flex justify-between">
                        <span>{formatFileSize(file.file_size)}</span>
                        <span>{formatDistanceToNow(new Date(file.created_at), { addSuffix: true })}</span>
                      </div>
                      <div className="flex justify-between mt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(getFileUrl(file.file_path), '_blank')}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(file)}
                          className="text-red-500 hover:text-red-700"
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          ) : (
            <Card className="py-12">
              <div className="text-center space-y-3">
                <FileType className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-medium">No media files found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {searchTerm || fileTypeFilter !== 'all' 
                    ? "No files match your search criteria. Try adjusting your filters." 
                    : "Upload your first media file to start building your library."}
                </p>
                {searchTerm || fileTypeFilter !== 'all' ? (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm('');
                      setFileTypeFilter('all');
                    }}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setUploadDialogOpen(true)}
                    className="mt-2"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Media
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

export default MediaManagementPanel;
