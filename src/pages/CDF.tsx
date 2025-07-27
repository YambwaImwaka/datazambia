import PageLayout from "../components/layout/PageLayout";
import { CDFDashboard } from "../components/cdf/CDFDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { 
  Gavel, 
  PieChart as PieIcon, 
  Users as UsersIcon, 
  FileText, 
  HelpCircle, 
  Phone, 
  Info as InfoIcon, 
  ExternalLink, 
  ArrowRightCircle, 
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  MapPin,
  DollarSign,
  Award,
  Target,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Zap,
  Globe,
  Building2,
  GraduationCap,
  Heart
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { useState } from "react";

export default function CDF() {
  const [activeProvince, setActiveProvince] = useState<string | null>(null);

  // Pie chart data for allocation
  const allocationData = [
    { name: "Community Projects", value: 60, color: "#3b82f6", icon: Building2 },
    { name: "Empowerment", value: 20, color: "#10b981", icon: Heart },
    { name: "Bursaries", value: 20, color: "#8b5cf6", icon: GraduationCap },
  ];

  // Province data with coordinates for map visualization
  const provinceData = [
    { name: "Lusaka", value: 156, color: "#ef4444", coordinates: [15.3875, 28.3228] },
    { name: "Copperbelt", value: 142, color: "#f97316", coordinates: [12.8235, 28.1928] },
    { name: "Southern", value: 138, color: "#eab308", coordinates: [16.8089, 26.4194] },
    { name: "Northern", value: 134, color: "#84cc16", coordinates: [10.1789, 30.7406] },
    { name: "Eastern", value: 132, color: "#06b6d4", coordinates: [13.6333, 32.6453] },
    { name: "Western", value: 128, color: "#8b5cf6", coordinates: [15.3875, 23.1276] },
    { name: "Central", value: 126, color: "#ec4899", coordinates: [14.4791, 28.2994] },
    { name: "Muchinga", value: 124, color: "#6366f1", coordinates: [10.1789, 32.6453] },
    { name: "Northwestern", value: 122, color: "#14b8a6", coordinates: [12.8235, 25.1928] },
  ];

  // Top performing constituencies
  const topConstituencies = [
    { name: "Chililabombwe", amount: 15114024, change: "+12.5%", trend: "up" },
    { name: "Chingola", amount: 13916550, change: "+8.2%", trend: "up" },
    { name: "Kalulushi", amount: 13620000, change: "+15.3%", trend: "up" },
    { name: "Lufwanyama", amount: 13935384, change: "+5.7%", trend: "up" },
    { name: "Masaiti", amount: 13953384, change: "+9.1%", trend: "up" },
  ];

  // CDF Process Timeline
  const processSteps = [
    { step: 1, title: "Application", description: "Fill CDF form", icon: FileText, color: "bg-blue-500" },
    { step: 2, title: "Submission", description: "Submit to WDC", icon: ArrowRightCircle, color: "bg-green-500" },
    { step: 3, title: "Review", description: "WDC to CDFC", icon: CheckCircle, color: "bg-yellow-500" },
    { step: 4, title: "Approval", description: "Local Authority", icon: Award, color: "bg-purple-500" },
    { step: 5, title: "Implementation", description: "Project execution", icon: Target, color: "bg-red-500" },
  ];

  return (
    <PageLayout
      title="Constituency Development Fund (CDF) Dashboard"
      description="Explore Zambia's CDF allocations by category, constituency, and project. Interactive charts and tables for transparency and insight."
    >
      <TooltipProvider>
        {/* Hero Section with Key Stats */}
        <div className="relative overflow-hidden bg-blue-600 rounded-xl p-4 md:p-8 mb-8">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-white">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              Constituency Development Fund
            </h1>
            <p className="text-base md:text-xl mb-4 md:mb-6 opacity-90">
              Empowering communities through transparent and accountable development funding
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">156</div>
                <div className="text-xs md:text-sm opacity-80">Constituencies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">K2.8B</div>
                <div className="text-xs md:text-sm opacity-80">Total Allocation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">60%</div>
                <div className="text-xs md:text-sm opacity-80">Community Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">100%</div>
                <div className="text-xs md:text-sm opacity-80">Transparency</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Facts Box */}
        <div className="mb-8">
          <Card className="bg-orange-50 dark:bg-orange-900 border-0 shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-800 rounded-full self-center md:self-auto">
                  <Lightbulb className="h-6 w-6 text-orange-600 dark:text-orange-200" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-2 md:mb-3 text-lg md:text-xl">Key Insights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-orange-600" />
                      <span className="text-xs md:text-sm">Every constituency receives CDF annually</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-green-600" />
                      <span className="text-xs md:text-sm">60% for infrastructure & development</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <span className="text-xs md:text-sm">Local management for transparency</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-600" />
                      <span className="text-xs md:text-sm">Report misuse: <a href="tel:5980" className="underline font-medium">5980</a></span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Province Map */}
        <Card className="mb-8 bg-blue-50 dark:bg-blue-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
              CDF Distribution by Province
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <div className="min-w-[350px] md:min-w-0">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={provinceData}
                    layout="vertical"
                    margin={{ left: 40, right: 20, top: 20, bottom: 20 }}
                  >
                    <XAxis type="number" tick={{ fill: '#2563eb', fontWeight: 600, fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#2563eb', fontWeight: 600, fontSize: 12 }} />
                    <RechartsTooltip formatter={(value) => `K${value}M allocated`} />
                    <Bar dataKey="value">
                      {provinceData.map((entry, index) => (
                        <Cell key={entry.name} fill={
                          index % 3 === 0 ? '#3b82f6' :
                          index % 3 === 1 ? '#10b981' :
                          '#f59e42'
                        } />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Allocation Breakdown with Animated Progress */}
        <Card className="mb-8 bg-blue-50 dark:bg-blue-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <PieIcon className="h-5 w-5 text-blue-600" />
              CDF Allocation Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
              {/* Pie Chart */}
              <div className="h-64 md:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {allocationData.map((entry, idx) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Animated Progress Bars */}
              <div className="space-y-4 md:space-y-6">
                {allocationData.map((item, index) => (
                  <div key={item.name} className="space-y-1 md:space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" style={{ color: item.color }} />
                        <span className="font-medium text-xs md:text-base">{item.name}</span>
                      </div>
                      <span className="font-bold text-xs md:text-base" style={{ color: item.color }}>
                        {item.value}%
                      </span>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={item.value} 
                        className="h-2 md:h-3 transition-all duration-1000 ease-out"
                        style={{
                          '--progress-background': item.color + '20',
                          '--progress-foreground': item.color,
                        } as React.CSSProperties}
                      />
                    </div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                      {item.name === "Community Projects" && "Infrastructure, disaster contingency, local development"}
                      {item.name === "Empowerment" && "Grants and soft loans for youth, women, community empowerment"}
                      {item.name === "Bursaries" && "Secondary boarding school and skills development support"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Constituencies */}
        <Card className="mb-8 bg-green-50 dark:bg-green-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Top Performing Constituencies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {topConstituencies.map((constituency, index) => (
                <div
                  key={constituency.name}
                  className="p-3 md:p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-1 md:mb-2">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    {constituency.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <h4 className="font-bold text-base md:text-lg mb-1">{constituency.name}</h4>
                  <div className="text-lg md:text-2xl font-bold text-green-600 mb-1">
                    K{(constituency.amount / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                    {constituency.change} from last year
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CDF Process Timeline */}
        <Card className="mb-8 bg-blue-50 dark:bg-blue-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              How to Access CDF - Process Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-700"></div>
              <div className="space-y-4 md:space-y-6">
                {processSteps.map((step, index) => (
                  <div key={step.step} className="relative flex flex-col md:flex-row items-center gap-2 md:gap-4">
                    {/* Step Circle */}
                    <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full ${step.color.replace('bg-purple-500', 'bg-blue-500').replace('bg-yellow-500', 'bg-green-500').replace('bg-red-500', 'bg-orange-500')} flex items-center justify-center text-white font-bold shadow-lg mb-2 md:mb-0`}>
                      <step.icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                      <h4 className="font-bold text-base md:text-lg mb-1">{step.title}</h4>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 md:mt-6 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://acazambia.org/cdf-forms/" target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Forms
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://acazambia.org/cdf/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Framework Section */}
        <Card className="mb-8 bg-blue-50 dark:bg-blue-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Gavel className="h-5 w-5 text-blue-600" />
              Legal Framework
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {[
                { title: "Constitution of Zambia", article: "Article 162", color: "bg-blue-100 dark:bg-blue-900" },
                { title: "Local Government Act", year: "2023", color: "bg-green-100 dark:bg-green-900" },
                { title: "CDF Act", year: "2024", color: "bg-blue-100 dark:bg-blue-900" },
              ].map((law, index) => (
                <div key={index} className={`p-3 md:p-4 rounded-lg ${law.color} hover:scale-105 transition-transform duration-300`}>
                  <h4 className="font-bold mb-1 text-base md:text-lg">{law.title}</h4>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                    {law.article || `Act No. ${law.year}`}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 md:mt-4 text-center">
              <Button variant="outline" asChild>
                <a href="https://www.parliament.gov.zm/sites/default/files/documents/acts/Constituency%20Development%20Fund%20Act%2C%202024.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 mr-2" />
                  Read the CDF Act (PDF)
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Role Players Section */}
        <Card className="mb-8 bg-green-50 dark:bg-green-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <UsersIcon className="h-5 w-5 text-green-600" />
              Key Role Players in CDF
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { name: "Citizens", icon: UsersIcon, color: "bg-blue-500" },
                { name: "Ward Development Committees", icon: Building2, color: "bg-green-500" },
                { name: "CDF Committees", icon: Award, color: "bg-orange-500" },
                { name: "Local Authorities", icon: Globe, color: "bg-blue-500" },
                { name: "Provincial Officers", icon: MapPin, color: "bg-green-500" },
                { name: "Ministry of Local Government", icon: Building2, color: "bg-blue-500" },
                { name: "Ministry of Finance", icon: DollarSign, color: "bg-orange-500" },
                { name: "Members of Parliament", icon: Star, color: "bg-green-500" },
              ].map((player, index) => (
                <div
                  key={index}
                  className="text-center p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${player.color} rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3`}>
                    <player.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <h4 className="font-medium text-xs md:text-sm">{player.name}</h4>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reporting Corruption Section */}
        <Card className="mb-8 bg-orange-50 dark:bg-orange-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <ShieldCheck className="h-5 w-5 text-red-600" />
              Report CDF Misuse or Corruption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4 mb-3 md:mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500 mt-1" />
                <div>
                  <h4 className="font-bold mb-1 md:mb-2 text-base md:text-lg">Suspect misuse of CDF funds?</h4>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-2 md:mb-4">
                    Report anonymously to the Anti-Corruption Commission (ACC)
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                <a href="tel:5980" className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-red-50 dark:bg-red-900 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition-colors">
                  <Phone className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="font-medium text-xs md:text-sm">Toll-Free</div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">5980</div>
                  </div>
                </a>
                <a href="mailto:info@acc.gov.zm" className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-red-50 dark:bg-red-900 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition-colors">
                  <FileText className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="font-medium text-xs md:text-sm">Email</div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">info@acc.gov.zm</div>
                  </div>
                </a>
                <a href="https://www.acc.gov.zm/report-corruption" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-red-50 dark:bg-red-900 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 transition-colors">
                  <ExternalLink className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="font-medium text-xs md:text-sm">Online</div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">acc.gov.zm</div>
                  </div>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* External Resources Section */}
        <Card className="mb-8 bg-blue-50 dark:bg-blue-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <ExternalLink className="h-5 w-5 text-slate-600" />
              External Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {[
                { title: "ActionAid CDF Portal", url: "https://acazambia.org/cdf/", icon: Globe },
                { title: "CDF Act 2024 (PDF)", url: "https://www.parliament.gov.zm/sites/default/files/documents/acts/Constituency%20Development%20Fund%20Act%2C%202024.pdf", icon: FileText },
                { title: "CDF Application Forms", url: "https://acazambia.org/cdf-forms/", icon: FileText },
                { title: "Report Corruption (ACC)", url: "https://www.acc.gov.zm/report-corruption", icon: ShieldCheck },
              ].map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <resource.icon className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-xs md:text-sm">{resource.title}</span>
                  <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard */}
        <CDFDashboard />
      </TooltipProvider>
    </PageLayout>
  );
} 