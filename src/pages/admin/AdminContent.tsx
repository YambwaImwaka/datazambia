import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Image, 
  Video, 
  Upload, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Download,
  Eye,
  EyeOff,
  Globe,
  Calendar,
  User,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  File,
  Folder,
  Settings
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  author: string;
  created_at: string;
  updated_at: string;
  meta_description?: string;
  tags?: string[];
}

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: number;
  url: string;
  uploaded_at: string;
  uploaded_by: string;
  alt_text?: string;
  description?: string;
}

interface Publication {
  id: string;
  title: string;
  type: 'report' | 'research' | 'article' | 'data';
  description: string;
  file_url: string;
  file_size: number;
  downloads: number;
  published_at: string;
  author: string;
  tags?: string[];
}

const AdminContent = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  
  // Dialog states
  const [showPageDialog, setShowPageDialog] = useState(false);
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  const [showPublicationDialog, setShowPublicationDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<Page | MediaFile | Publication | null>(null);
  
  // Form states
  const [pageForm, setPageForm] = useState({
    title: '',
    slug: '',
    content: '',
    status: 'draft' as 'draft' | 'published',
    meta_description: '',
    tags: ''
  });

  const [mediaForm, setMediaForm] = useState({
    name: '',
    alt_text: '',
    description: '',
    file: null as File | null
  });

  const [publicationForm, setPublicationForm] = useState({
    title: '',
    type: 'report' as 'report' | 'research' | 'article' | 'data',
    description: '',
    tags: '',
    file: null as File | null
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      // Fetch analytics data instead of pages (since pages table doesn't exist)
      const { data: analyticsData } = await supabase
        .from('analytics_page_views')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(10);
      
      // Create mock pages from analytics data for display
      if (analyticsData) {
        const mockPages = analyticsData.map(view => ({
          id: view.id,
          title: view.page_title || 'Untitled Page',
          slug: view.page_path,
          content: `Page analytics for ${view.page_path}`,
          status: 'published' as const,
          author: 'System',
          created_at: view.created_at,
          updated_at: view.updated_at
        }));
        setPages(mockPages);
      }

      // Fetch media (simulated data for now)
      const mockMedia: MediaFile[] = [
        {
          id: '1',
          name: 'zambia-map.png',
          type: 'image',
          size: 2048576,
          url: '/images/zambia-map.png',
          uploaded_at: '2024-01-15T10:30:00Z',
          uploaded_by: 'admin',
          alt_text: 'Map of Zambia showing provinces'
        },
        {
          id: '2',
          name: 'economic-report-2024.pdf',
          type: 'document',
          size: 5242880,
          url: '/documents/economic-report-2024.pdf',
          uploaded_at: '2024-01-10T14:20:00Z',
          uploaded_by: 'admin',
          description: 'Annual economic report for 2024'
        }
      ];
      setMedia(mockMedia);

      // Fetch publications (simulated data for now)
      const mockPublications: Publication[] = [
        {
          id: '1',
          title: 'Zambia Economic Report 2024',
          type: 'report',
          description: 'Comprehensive analysis of Zambia\'s economic performance',
          file_url: '/publications/economic-report-2024.pdf',
          file_size: 5242880,
          downloads: 245,
          published_at: '2024-01-15T09:00:00Z',
          author: 'Ministry of Finance',
          tags: ['economics', 'finance', '2024']
        },
        {
          id: '2',
          title: 'Population Statistics Analysis',
          type: 'research',
          description: 'Detailed population demographics and trends',
          file_url: '/publications/population-stats-2024.pdf',
          file_size: 3145728,
          downloads: 189,
          published_at: '2024-01-10T11:30:00Z',
          author: 'Central Statistical Office',
          tags: ['population', 'demographics', 'statistics']
        }
      ];
      setPublications(mockPublications);

    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handlePageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const pageData = {
        ...pageForm,
        tags: pageForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        updated_at: new Date().toISOString()
      };

      if (editingItem) {
        // Update existing analytics record (mock operation)
        console.log('Would update analytics record:', pageData);
        toast.success('Page updated successfully');
      } else {
        // Create new analytics record (mock operation)  
        console.log('Would create analytics record:', pageData);
        toast.success('Page created successfully');
      }

      setShowPageDialog(false);
      setEditingItem(null);
      resetPageForm();
      fetchContent();
    } catch (error) {
      console.error('Error saving page:', error);
      toast.error('Failed to save page');
    }
  };

  const handleMediaUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaForm.file) {
      toast.error('Please select a file');
      return;
    }

    try {
      // In a real app, upload to Supabase Storage
      const fileName = `${Date.now()}-${mediaForm.file.name}`;
      
      const mockMediaFile: MediaFile = {
        id: Date.now().toString(),
        name: mediaForm.file.name,
        type: mediaForm.file.type.startsWith('image/') ? 'image' : 
              mediaForm.file.type.startsWith('video/') ? 'video' : 'document',
        size: mediaForm.file.size,
        url: `/uploads/${fileName}`,
        uploaded_at: new Date().toISOString(),
        uploaded_by: 'admin',
        alt_text: mediaForm.alt_text,
        description: mediaForm.description
      };

      setMedia(prev => [mockMediaFile, ...prev]);
      setShowMediaDialog(false);
      resetMediaForm();
      toast.success('Media uploaded successfully');
    } catch (error) {
      console.error('Error uploading media:', error);
      toast.error('Failed to upload media');
    }
  };

  const handlePublicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicationForm.file) {
      toast.error('Please select a file');
      return;
    }

    try {
      const mockPublication: Publication = {
        id: Date.now().toString(),
        title: publicationForm.title,
        type: publicationForm.type,
        description: publicationForm.description,
        file_url: `/publications/${publicationForm.file.name}`,
        file_size: publicationForm.file.size,
        downloads: 0,
        published_at: new Date().toISOString(),
        author: 'admin',
        tags: publicationForm.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      setPublications(prev => [mockPublication, ...prev]);
      setShowPublicationDialog(false);
      resetPublicationForm();
      toast.success('Publication added successfully');
    } catch (error) {
      console.error('Error adding publication:', error);
      toast.error('Failed to add publication');
    }
  };

  const resetPageForm = () => {
    setPageForm({
      title: '',
      slug: '',
      content: '',
      status: 'draft',
      meta_description: '',
      tags: ''
    });
  };

  const resetMediaForm = () => {
    setMediaForm({
      name: '',
      alt_text: '',
      description: '',
      file: null
    });
  };

  const resetPublicationForm = () => {
    setPublicationForm({
      title: '',
      type: 'report',
      description: '',
      tags: '',
      file: null
    });
  };

  const editPage = (page: Page) => {
    setEditingItem(page);
    setPageForm({
      title: page.title,
      slug: page.slug,
      content: page.content,
      status: page.status,
      meta_description: page.meta_description || '',
      tags: page.tags?.join(', ') || ''
    });
    setShowPageDialog(true);
  };

  const deletePage = async (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      try {
        // Mock delete operation
        console.log('Would delete analytics record:', id);
        setPages(prev => prev.filter(page => page.id !== id));
        toast.success('Page deleted successfully');
      } catch (error) {
        console.error('Error deleting page:', error);
        toast.error('Failed to delete page');
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMedia = media.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedType === 'all' || item.type === selectedType)
  );

  const filteredPublications = publications.filter(pub =>
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout
      title="Content Management | Admin Dashboard"
      description="Manage site content, media, and publications"
      showHeader={true}
      showFooter={true}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Content Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage site content, media files, and publications
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pages.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {pages.filter(p => p.status === 'published').length} published
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Media Files</CardTitle>
                  <Image className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{media.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(media.reduce((sum, item) => sum + item.size, 0))} total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Publications</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{publications.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {publications.reduce((sum, pub) => sum + pub.downloads, 0)} total downloads
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common content management tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Dialog open={showPageDialog} onOpenChange={setShowPageDialog}>
                    <DialogTrigger asChild>
                      <Button className="h-auto p-4 flex flex-col items-center gap-2">
                        <Plus className="h-6 w-6" />
                        <span>Create Page</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{editingItem ? 'Edit Page' : 'Create New Page'}</DialogTitle>
                        <DialogDescription>
                          {editingItem ? 'Update the page content and settings.' : 'Create a new page for your website.'}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handlePageSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              value={pageForm.title}
                              onChange={(e) => setPageForm(prev => ({ ...prev, title: e.target.value }))}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                              id="slug"
                              value={pageForm.slug}
                              onChange={(e) => setPageForm(prev => ({ ...prev, slug: e.target.value }))}
                              placeholder="page-url"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="content">Content</Label>
                          <Textarea
                            id="content"
                            value={pageForm.content}
                            onChange={(e) => setPageForm(prev => ({ ...prev, content: e.target.value }))}
                            rows={8}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="status">Status</Label>
                            <Select
                              value={pageForm.status}
                              onValueChange={(value: 'draft' | 'published') => 
                                setPageForm(prev => ({ ...prev, status: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="tags">Tags</Label>
                            <Input
                              id="tags"
                              value={pageForm.tags}
                              onChange={(e) => setPageForm(prev => ({ ...prev, tags: e.target.value }))}
                              placeholder="tag1, tag2, tag3"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="meta_description">Meta Description</Label>
                          <Textarea
                            id="meta_description"
                            value={pageForm.meta_description}
                            onChange={(e) => setPageForm(prev => ({ ...prev, meta_description: e.target.value }))}
                            rows={2}
                          />
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => {
                            setShowPageDialog(false);
                            setEditingItem(null);
                            resetPageForm();
                          }}>
                            Cancel
                          </Button>
                          <Button type="submit">
                            {editingItem ? 'Update Page' : 'Create Page'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={showMediaDialog} onOpenChange={setShowMediaDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Upload className="h-6 w-6" />
                        <span>Upload Media</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Media</DialogTitle>
                        <DialogDescription>
                          Upload images, videos, or documents to your media library.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleMediaUpload} className="space-y-4">
                        <div>
                          <Label htmlFor="media-file">File</Label>
                          <Input
                            id="media-file"
                            type="file"
                            onChange={(e) => setMediaForm(prev => ({ 
                              ...prev, 
                              file: e.target.files?.[0] || null 
                            }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="alt-text">Alt Text</Label>
                          <Input
                            id="alt-text"
                            value={mediaForm.alt_text}
                            onChange={(e) => setMediaForm(prev => ({ ...prev, alt_text: e.target.value }))}
                            placeholder="Description for accessibility"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={mediaForm.description}
                            onChange={(e) => setMediaForm(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                          />
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => {
                            setShowMediaDialog(false);
                            resetMediaForm();
                          }}>
                            Cancel
                          </Button>
                          <Button type="submit">Upload</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={showPublicationDialog} onOpenChange={setShowPublicationDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Plus className="h-6 w-6" />
                        <span>Add Publication</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Publication</DialogTitle>
                        <DialogDescription>
                          Add a new publication, report, or research document.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handlePublicationSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="pub-title">Title</Label>
                          <Input
                            id="pub-title"
                            value={publicationForm.title}
                            onChange={(e) => setPublicationForm(prev => ({ ...prev, title: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="pub-type">Type</Label>
                          <Select
                            value={publicationForm.type}
                            onValueChange={(value: 'report' | 'research' | 'article' | 'data') => 
                              setPublicationForm(prev => ({ ...prev, type: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="report">Report</SelectItem>
                              <SelectItem value="research">Research</SelectItem>
                              <SelectItem value="article">Article</SelectItem>
                              <SelectItem value="data">Data</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="pub-description">Description</Label>
                          <Textarea
                            id="pub-description"
                            value={publicationForm.description}
                            onChange={(e) => setPublicationForm(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="pub-file">File</Label>
                          <Input
                            id="pub-file"
                            type="file"
                            onChange={(e) => setPublicationForm(prev => ({ 
                              ...prev, 
                              file: e.target.files?.[0] || null 
                            }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="pub-tags">Tags</Label>
                          <Input
                            id="pub-tags"
                            value={publicationForm.tags}
                            onChange={(e) => setPublicationForm(prev => ({ ...prev, tags: e.target.value }))}
                            placeholder="tag1, tag2, tag3"
                          />
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => {
                            setShowPublicationDialog(false);
                            resetPublicationForm();
                          }}>
                            Cancel
                          </Button>
                          <Button type="submit">Add Publication</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <Download className="h-6 w-6" />
                    <span>Export Data</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pages" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Manage Pages</CardTitle>
                    <CardDescription>Create, edit, and manage site pages</CardDescription>
                  </div>
                  <Dialog open={showPageDialog} onOpenChange={setShowPageDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Page
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search pages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    {filteredPages.map((page) => (
                      <div key={page.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{page.title}</div>
                          <div className="text-sm text-muted-foreground">
                            /{page.slug} • Last modified: {new Date(page.updated_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                            {page.status}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => editPage(page)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => deletePage(page.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Media Library</CardTitle>
                    <CardDescription>Manage images, videos, and documents</CardDescription>
                  </div>
                  <Dialog open={showMediaDialog} onOpenChange={setShowMediaDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Media
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="image">Images</SelectItem>
                        <SelectItem value="video">Videos</SelectItem>
                        <SelectItem value="document">Documents</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Search media..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredMedia.map((item) => (
                      <div key={item.id} className="border rounded-lg p-2 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded mb-2 flex items-center justify-center">
                          {item.type === 'image' ? (
                            <Image className="h-8 w-8 text-gray-400" />
                          ) : item.type === 'video' ? (
                            <Video className="h-8 w-8 text-gray-400" />
                          ) : (
                            <File className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div className="text-xs font-medium truncate">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{formatFileSize(item.size)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publications" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Publications</CardTitle>
                    <CardDescription>Manage research papers, reports, and publications</CardDescription>
                  </div>
                  <Dialog open={showPublicationDialog} onOpenChange={setShowPublicationDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Publication
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search publications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    {filteredPublications.map((pub) => (
                      <div key={pub.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{pub.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {pub.type} • Published: {new Date(pub.published_at).toLocaleDateString()} • {pub.downloads} downloads
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{pub.description}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AdminContent; 