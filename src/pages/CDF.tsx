import PageLayout from "../components/layout/PageLayout";
import { CDFDashboard } from "../components/cdf/CDFDashboard";
import { cdfData } from "../components/cdf/cdfData";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip
} from "recharts";
import { 
  TrendingUp,
  MapPin,
  DollarSign,
  Building2,
  GraduationCap,
  Heart,
  Users,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";
import { useMemo } from "react";

export default function CDF() {
  // Calculate actual statistics from the real CDF data
  const stats = useMemo(() => {
    const totalAmount = cdfData.reduce((sum, item) => sum + item.amount, 0);
    const totalConstituencies = new Set(cdfData.map(item => item.constituency)).size;
    
    // Calculate category totals
    const categoryTotals = cdfData.reduce((acc, item) => {
      const normalizedCategory = item.category.toLowerCase();
      if (normalizedCategory.includes('bursaries') || normalizedCategory.includes('busaries') || normalizedCategory.includes('burseries')) {
        acc.bursaries = (acc.bursaries || 0) + item.amount;
      } else if (normalizedCategory.includes('projects') || normalizedCategory.includes('community')) {
        acc.projects = (acc.projects || 0) + item.amount;
      } else if (normalizedCategory.includes('empowerment')) {
        acc.empowerment = (acc.empowerment || 0) + item.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    // Calculate percentages
    const bursariesPercent = ((categoryTotals.bursaries || 0) / totalAmount * 100);
    const projectsPercent = ((categoryTotals.projects || 0) / totalAmount * 100);
    const empowermentPercent = ((categoryTotals.empowerment || 0) / totalAmount * 100);

    // Top constituencies by total allocation
    const constituencyTotals = cdfData.reduce((acc, item) => {
      acc[item.constituency] = (acc[item.constituency] || 0) + item.amount;
      return acc;
    }, {} as Record<string, number>);

    const topConstituencies = Object.entries(constituencyTotals)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);

    return {
      totalAmount,
      totalConstituencies,
      categoryTotals,
      bursariesPercent,
      projectsPercent,
      empowermentPercent,
      topConstituencies
    };
  }, []);

  // Allocation breakdown data for visualization
  const allocationData = [
    { name: "Community Projects", value: stats.projectsPercent, color: "#3b82f6", amount: stats.categoryTotals.projects || 0 },
    { name: "Empowerment", value: stats.empowermentPercent, color: "#10b981", amount: stats.categoryTotals.empowerment || 0 },
    { name: "Bursaries", value: stats.bursariesPercent, color: "#8b5cf6", amount: stats.categoryTotals.bursaries || 0 },
  ];

  return (
    <PageLayout
      title="Constituency Development Fund (CDF) - Real Data Dashboard"
      description="Comprehensive analysis of Zambia's CDF allocations based on actual disbursement data. Transparency through real numbers."
    >
      {/* Hero Section with Real Statistics */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 md:p-8 mb-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-8 w-8" />
            <h1 className="text-2xl md:text-4xl font-bold">
              Discover Zambia Through Data
            </h1>
          </div>
          <p className="text-lg md:text-xl mb-6 opacity-90 max-w-3xl">
            Transparency in action: Real CDF allocation data from across Zambia's constituencies. 
            Every kwacha accounted for, every project tracked, every community empowered.
          </p>
          
          {/* Key Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5" />
                <span className="text-sm opacity-80">Constituencies</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold">{stats.totalConstituencies}</div>
              <div className="text-xs opacity-70">Actively funded</div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5" />
                <span className="text-sm opacity-80">Total Allocated</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold">
                K{(stats.totalAmount / 1000000).toFixed(0)}M
              </div>
              <div className="text-xs opacity-70">Real disbursements</div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-5 w-5" />
                <span className="text-sm opacity-80">Projects</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold">
                {Math.round(stats.projectsPercent)}%
              </div>
              <div className="text-xs opacity-70">of total allocation</div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5" />
                <span className="text-sm opacity-80">Education</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold">
                {Math.round(stats.bursariesPercent)}%
              </div>
              <div className="text-xs opacity-70">Bursaries & skills</div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Quality Notice */}
      <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-900/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                About This Data
              </h3>
              <p className="text-sm text-orange-800 dark:text-orange-200 mb-3">
                This dashboard presents <strong>actual CDF disbursement data</strong> from participating constituencies. 
                The "top performing" rankings are based on <strong>total allocation amounts</strong> from the available data, 
                not previous performance metrics.
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-orange-700 dark:text-orange-300">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Real disbursement amounts</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Verified constituency data</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Data coverage varies by constituency</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Side by Side Layout: CDF Overview + Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* CDF Allocation Breakdown */}
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Actual CDF Allocation Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={50}
                    label={({ name, percent }) => `${name}: ${percent.toFixed(1)}%`}
                  >
                    {allocationData.map((entry, idx) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: number, name: string, props: any) => [
                      `${value.toFixed(1)}% (K${(props.payload.amount / 1000000).toFixed(1)}M)`,
                      name
                    ]} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              {allocationData.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold">
                    K{(item.amount / 1000000).toFixed(1)}M
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Constituencies by Allocation */}
        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Top Constituencies by Total Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={stats.topConstituencies.slice(0, 8)} 
                  layout="vertical"
                  margin={{ left: 80, right: 20, top: 20, bottom: 20 }}
                >
                  <XAxis 
                    type="number" 
                    tickFormatter={(value) => `K${(value / 1000000).toFixed(1)}M`}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={80}
                    tick={{ fontSize: 11 }}
                  />
                  <RechartsTooltip 
                    formatter={(value: number) => [`K${(value / 1000000).toFixed(1)}M`, 'Total Allocation']} 
                  />
                  <Bar dataKey="amount" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <strong>Ranking Methodology:</strong> Based on total allocation amounts from available data. 
              Higher allocations may indicate larger constituency needs, population, or more comprehensive data reporting.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Trends and Insights */}
      <Card className="mb-8 bg-purple-50 dark:bg-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-purple-600" />
            Key Insights from the Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Education Focus</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Heavy investment in bursaries, especially secondary boarding schools and skills development. 
                Katuba constituency shows the highest skills development allocation at K721,731.80 for 82 beneficiaries.
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">High-Value Allocations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Keembe received K476,011 for boarding school bursaries with only 14 recipients, 
                indicating either high per-student costs or potential areas for efficiency review.
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">Regional Patterns</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Katuba and Keembe constituencies dominate the dataset, showing higher reporting 
                visibility and potentially indicating model constituencies for transparency.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Presidential Delivery Unit Connection */}
      <Card className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-800 px-4 py-2 rounded-full mb-4">
              <Users className="h-5 w-5 text-yellow-700" />
              <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                Presidential Delivery Unit Initiative
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-yellow-900 dark:text-yellow-100">
              Transforming CDF Through Data Transparency
            </h3>
            <p className="text-yellow-800 dark:text-yellow-200 max-w-2xl mx-auto mb-4">
              This dashboard represents our commitment to making CDF data accessible, transparent, and actionable. 
              By providing real-time insights into fund allocation and utilization, we're building trust and 
              enabling evidence-based decision making for community development.
            </p>
            <Badge variant="outline" className="border-yellow-400 text-yellow-700">
              Supporting the President's Transparency Agenda
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Full Interactive Dashboard */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-1">
        <CDFDashboard />
      </div>
    </PageLayout>
  );
}