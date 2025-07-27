import { useState, useMemo, useEffect } from "react";
import { cdfData, CDFRecord, CDF_CATEGORIES, CDF_SUBCATEGORIES, CDF_PROVINCES } from "./cdfData";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Building2,
  GraduationCap,
  Users,
  Hammer,
  Info,
  MapPin,
  DollarSign,
  FileText,
  BarChart3,
  Eye,
  Target,
  Award
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import DataExport from "@/components/ui/DataExport";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", 
  "#8884D8", "#82CA9D", "#FFC658", "#8DD1E1", 
  "#D084D0", "#FF6B6B", "#4ECDC4", "#45B7D1"
];

export function CDFDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedConstituency, setSelectedConstituency] = useState("all");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Filter data based on search and selections
  const filteredData = useMemo(() => {
    return cdfData.filter(item => {
      const matchesSearch = searchTerm === "" || 
        item.constituency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesConstituency = selectedConstituency === "all" || item.constituency === selectedConstituency;
      
      // Province filtering
      const matchesProvince = selectedProvince === "all" || 
        Object.entries(CDF_PROVINCES).some(([province, constituencies]) => 
          province === selectedProvince && constituencies.includes(item.constituency)
        );
      
      return matchesSearch && matchesCategory && matchesConstituency && matchesProvince;
    });
  }, [searchTerm, selectedCategory, selectedConstituency, selectedProvince]);

  // Calculate key metrics
  const keyMetrics = useMemo(() => {
    const totalAmount = cdfData.reduce((sum, item) => sum + item.amount, 0);
    const totalConstituencies = new Set(cdfData.map(item => item.constituency)).size;
    const totalProjects = cdfData.filter(item => item.category === "Projects" || item.category === "Community Projects").length;
    const totalBursaries = cdfData.filter(item => item.category === "Bursaries").length;
    const totalEmpowerment = cdfData.filter(item => item.category === "Empowerment").length;

    return [
      {
        title: "Total CDF Allocation",
        value: `K${(totalAmount / 1000000).toFixed(1)}M`,
        change: "+12.5%",
        isPositive: true,
        icon: <DollarSign className="h-5 w-5" />,
        description: "Total funds allocated"
      },
      {
        title: "Constituencies",
        value: totalConstituencies.toString(),
        change: "+3",
        isPositive: true,
        icon: <MapPin className="h-5 w-5" />,
        description: "Active constituencies"
      },
      {
        title: "Community Projects",
        value: totalProjects.toString(),
        change: "+8.2%",
        isPositive: true,
        icon: <Building2 className="h-5 w-5" />,
        description: "Infrastructure projects"
      },
      {
        title: "Bursaries Awarded",
        value: totalBursaries.toString(),
        change: "+15.3%",
        isPositive: true,
        icon: <GraduationCap className="h-5 w-5" />,
        description: "Educational support"
      }
    ];
  }, []);

  // Category distribution data
  const categoryDistribution = useMemo(() => {
    const totals: Record<string, number> = {};
    cdfData.forEach(item => {
      totals[item.category] = (totals[item.category] || 0) + item.amount;
    });
    return Object.entries(totals).map(([category, amount]) => ({ category, amount }));
  }, []);

  // Top constituencies by allocation
  const topConstituencies = useMemo(() => {
    const totals: Record<string, number> = {};
    cdfData.forEach(item => {
      totals[item.constituency] = (totals[item.constituency] || 0) + item.amount;
    });
    return Object.entries(totals)
      .map(([constituency, amount]) => ({ constituency, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);
  }, []);

  // Subcategory breakdown for selected category
  const subcategoryBreakdown = useMemo(() => {
    if (selectedCategory === "all") return [];
    const filtered = cdfData.filter(item => item.category === selectedCategory);
    const totals: Record<string, number> = {};
    filtered.forEach(item => {
      totals[item.subCategory] = (totals[item.subCategory] || 0) + item.amount;
    });
    return Object.entries(totals).map(([subCategory, amount]) => ({ subCategory, amount }));
  }, [selectedCategory]);

  // Province breakdown
  const provinceBreakdown = useMemo(() => {
    const totals: Record<string, number> = {};
    Object.entries(CDF_PROVINCES).forEach(([province, constituencies]) => {
      const provinceData = cdfData.filter(item => constituencies.includes(item.constituency));
      totals[province] = provinceData.reduce((sum, item) => sum + item.amount, 0);
    });
    return Object.entries(totals)
      .map(([province, amount]) => ({ province, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, []);

  // Category performance analysis
  const categoryPerformance = useMemo(() => {
    const totals: Record<string, number> = {};
    const counts: Record<string, number> = {};
    
    cdfData.forEach(item => {
      totals[item.category] = (totals[item.category] || 0) + item.amount;
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    
    return Object.entries(totals).map(([category, amount]) => ({
      category,
      amount,
      count: counts[category],
      average: amount / counts[category]
    }));
  }, []);

  // Get unique constituencies for filter
  const constituencies = useMemo(() => {
    const unique = new Set(cdfData.map(item => item.constituency));
    return Array.from(unique).sort();
  }, []);

  // Export data function
  const getExportData = () => {
    return filteredData.map(item => ({
      Constituency: item.constituency,
      Category: item.category,
      SubCategory: item.subCategory,
      Amount: item.amount,
      AmountFormatted: `K${(item.amount / 1000000).toFixed(2)}M`
    }));
  };

  if (!isVisible) {
    return (
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-12" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Constituency Development Fund (CDF)
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Comprehensive data on Zambia's CDF allocations, projects, and community development initiatives
          </p>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    {metric.isPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${metric.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search constituencies, categories, or projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select Province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Provinces</SelectItem>
                {Object.keys(CDF_PROVINCES).map(province => (
                  <SelectItem key={province} value={province}>{province}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CDF_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedConstituency} onValueChange={setSelectedConstituency}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select Constituency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Constituencies</SelectItem>
                {constituencies.map(constituency => (
                  <SelectItem key={constituency} value={constituency}>{constituency}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Export Button */}
      <div className="flex justify-end">
        <DataExport 
          data={getExportData()} 
          fileName={`cdf-data-${selectedProvince}-${selectedCategory}`}
          label="Export CDF Data"
          variant="outline"
          size="sm"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 min-w-max">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="allocations" className="text-xs sm:text-sm">Allocations</TabsTrigger>
            <TabsTrigger value="constituencies" className="text-xs sm:text-sm">Constituencies</TabsTrigger>
            <TabsTrigger value="provinces" className="text-xs sm:text-sm">Provinces</TabsTrigger>
            <TabsTrigger value="analysis" className="text-xs sm:text-sm">Analysis</TabsTrigger>
            <TabsTrigger value="details" className="text-xs sm:text-sm">Details</TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>CDF Allocation by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `K${(value / 1000000).toFixed(1)}M`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Constituencies */}
            <Card>
              <CardHeader>
                <CardTitle>Top 10 Constituencies by Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topConstituencies} layout="vertical" margin={{ left: 100, right: 20, top: 10, bottom: 10 }}>
                      <XAxis type="number" tickFormatter={(value) => `K${(value / 1000000).toFixed(1)}M`} />
                      <YAxis dataKey="constituency" type="category" width={100} />
                      <Tooltip formatter={(value: number) => `K${(value / 1000000).toFixed(1)}M`} />
                      <Bar dataKey="amount" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Allocations Tab */}
        <TabsContent value="allocations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subcategoryBreakdown} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subCategory" />
                      <YAxis tickFormatter={(value) => `K${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip formatter={(value: number) => `K${(value / 1000000).toFixed(1)}M`} />
                      <Bar dataKey="amount" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Province Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Province-wise Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={provinceBreakdown} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="province" />
                      <YAxis tickFormatter={(value) => `K${(value / 1000000).toFixed(1)}M`} />
                      <Tooltip formatter={(value: number) => `K${(value / 1000000).toFixed(1)}M`} />
                      <Bar dataKey="amount" fill="#FFBB28" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Constituencies Tab */}
        <TabsContent value="constituencies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Constituency Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topConstituencies} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="constituency" angle={-45} textAnchor="end" height={100} />
                    <YAxis tickFormatter={(value) => `K${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value: number) => `K${(value / 1000000).toFixed(1)}M`} />
                    <Bar dataKey="amount" fill="#FFBB28" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Provinces Tab */}
        <TabsContent value="provinces" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Province-wise CDF Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {provinceBreakdown.map((province, index) => (
                  <Card key={province.province} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-sm">{province.province}</h3>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          K{(province.amount / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {((province.amount / cdfData.reduce((sum, item) => sum + item.amount, 0)) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Category Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryPerformance.map((cat, index) => (
                    <div key={cat.category} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <div>
                          <h4 className="font-medium">{cat.category}</h4>
                          <p className="text-sm text-muted-foreground">{cat.count} allocations</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">K{(cat.amount / 1000000).toFixed(1)}M</p>
                        <p className="text-xs text-muted-foreground">
                          Avg: K{(cat.average / 1000000).toFixed(1)}M
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Allocation Efficiency */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Allocation Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {provinceBreakdown.slice(0, 5).map((province, index) => {
                    const constituencyCount = CDF_PROVINCES[province.province as keyof typeof CDF_PROVINCES]?.length || 0;
                    const efficiency = province.amount / constituencyCount;
                    return (
                      <div key={province.province} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="font-medium">{province.province}</h4>
                          <p className="text-sm text-muted-foreground">{constituencyCount} constituencies</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">K{(efficiency / 1000000).toFixed(1)}M</p>
                          <p className="text-xs text-muted-foreground">per constituency</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed CDF Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Constituency</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Subcategory</TableHead>
                      <TableHead className="text-right">Amount (ZMW)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.constituency}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell>{item.subCategory}</TableCell>
                        <TableCell className="text-right font-mono">
                          K{(item.amount / 1000000).toFixed(2)}M
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* About CDF Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            About the Constituency Development Fund (CDF)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-700 dark:text-gray-200 space-y-4">
            <p>
              The Constituency Development Fund (CDF) is a Zambian government initiative established under the Constitution of Zambia (Article 162), the Local Government Act 2023, and the Constituency Development Fund Act 2024. It aims to decentralize development by allocating funds directly to constituencies for community projects, empowerment grants, and educational bursaries.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Community Projects (60%)</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">Infrastructure, disaster contingency, and local development initiatives.</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Empowerment (20%)</h4>
                <p className="text-sm text-green-700 dark:text-green-300">Grants and soft loans for youth, women, and community economic empowerment.</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Bursaries (20%)</h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">Secondary boarding school and skills development support for students.</p>
              </div>
            </div>
            <p className="text-sm">
              <strong>Key Role Players:</strong> Citizens, Ward Development Committees, CDF Committees, Local Authorities, Provincial Officers, and relevant Ministers.
            </p>
            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <a href="https://acazambia.org/cdf/" target="_blank" rel="noopener noreferrer">
                  Learn more about CDF →
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 