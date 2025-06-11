import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { Building2, TrendingUp, DollarSign, Factory, RefreshCw } from "lucide-react";
import { 
  fetchComprehensiveEconomicData, 
  ComprehensiveEconomicData,
  MacroeconomicIndicator,
  SectoralContribution 
} from "@/services/economic/ComprehensiveEconomicService";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import DataExport from "@/components/ui/DataExport";

// Colors for charts
const CHART_COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
  '#82CA9D', '#FFC658', '#8DD1E1', '#D084D0', '#FF6B6B'
];

interface ComprehensiveEconomicSectionProps {
  isVisible: boolean;
}

export const ComprehensiveEconomicSection = ({ isVisible }: ComprehensiveEconomicSectionProps) => {
  const [economicData, setEconomicData] = useState<ComprehensiveEconomicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchComprehensiveEconomicData();
        setEconomicData(data);
      } catch (error) {
        console.error('Error loading comprehensive economic data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    
    setTimeout(async () => {
      try {
        const data = await fetchComprehensiveEconomicData();
        setEconomicData(data);
      } catch (error) {
        console.error('Error refreshing economic data:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, 1000);
  };

  // Prepare data for charts
  const getSectoralPieData = () => {
    if (!economicData) return [];
    
    return economicData.sectoralContributions.map(sector => ({
      name: sector.sector,
      value: sector.contribution,
      displayValue: `${sector.contribution}%`
    }));
  };

  const getMiningProductionTrendData = () => {
    if (!economicData) return [];
    
    const years = ['2019', '2020', '2021', '2022', '2023'];
    return years.map(year => {
      const data: any = { year };
      economicData.mineralSpecificBreakdown.forEach(mineral => {
        data[mineral.mineral] = (mineral as any)[`production${year}`];
      });
      return data;
    });
  };

  const getRegionalMiningData = () => {
    if (!economicData) return [];
    
    return economicData.regionalMiningBreakdown.map(region => ({
      region: region.region,
      production2023: region.production2023,
      production2022: region.production2022,
      production2021: region.production2021
    }));
  };

  const getExportData = () => {
    if (!economicData) return [];
    
    return economicData.macroeconomicOverview
      .filter(indicator => indicator.indicator.includes('GDP') || indicator.indicator.includes('Export'))
      .map(indicator => ({
        indicator: indicator.indicator,
        value: indicator.value,
        source: indicator.source
      }));
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Comprehensive Economic Overview
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mt-1">
            Complete economic indicators, sectoral analysis, and mining sector data for Zambia
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <DataExport 
            data={economicData ? [
              ...economicData.macroeconomicOverview,
              ...economicData.sectoralContributions,
              ...economicData.tradeExports
            ] : []} 
            fileName="zambia-comprehensive-economic-data"
            label="Export Data"
            disabled={loading || refreshing}
            className="w-full sm:w-auto"
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center gap-2 w-full sm:w-auto"
            onClick={handleRefresh}
            disabled={refreshing || loading}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {loading || refreshing ? (
        <div className="space-y-6">
          <Skeleton className="h-12 w-full max-w-md" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      ) : (
        <div className="w-full">
          <Tabs defaultValue="macroeconomic" className="w-full">
            {/* Improved Tab Navigation */}
            <div className="mb-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto gap-1 bg-muted/30 p-1 rounded-lg">
                <TabsTrigger 
                  value="macroeconomic" 
                  className="text-xs md:text-sm px-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 rounded-md"
                >
                  <span className="hidden sm:inline">Macroeconomic</span>
                  <span className="sm:hidden">Macro</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="sectoral" 
                  className="text-xs md:text-sm px-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 rounded-md"
                >
                  <span className="hidden sm:inline">Sectoral GDP</span>
                  <span className="sm:hidden">Sectoral</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="mining" 
                  className="text-xs md:text-sm px-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 rounded-md"
                >
                  Mining
                </TabsTrigger>
                <TabsTrigger 
                  value="trade" 
                  className="text-xs md:text-sm px-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 rounded-md"
                >
                  <span className="hidden sm:inline">Trade & Finance</span>
                  <span className="sm:hidden">Trade</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="detailed" 
                  className="text-xs md:text-sm px-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 rounded-md col-span-2 md:col-span-1"
                >
                  <span className="hidden sm:inline">Detailed Data</span>
                  <span className="sm:hidden">Details</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content with proper spacing */}
            <div className="min-h-[500px]">
              <TabsContent value="macroeconomic" className="mt-0 space-y-6">
                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {economicData?.macroeconomicOverview.slice(0, 6).map((indicator, index) => (
                    <Card 
                      key={indicator.indicator}
                      className="p-4 border-border hover:shadow-md transition-shadow duration-200"
                      style={{ 
                        opacity: 0,
                        animation: isVisible ? `fade-in 0.5s ease-out ${index * 0.1}s forwards` : "none"
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold text-sm text-card-foreground">{indicator.indicator}</h3>
                      </div>
                      <p className="text-lg font-bold text-primary mb-1">
                        {indicator.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Source: {indicator.source}
                      </p>
                    </Card>
                  ))}
                </div>

                {/* Overview Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6 border-border">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="h-5 w-5" />
                        Key Economic Indicators
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-4">
                        {economicData?.macroeconomicOverview.slice(0, 5).map((indicator, index) => (
                          <div key={indicator.indicator} className="border-b border-border pb-3 last:border-b-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm text-card-foreground">{indicator.indicator}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {indicator.source}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <span className="text-lg font-bold text-primary">
                                  {indicator.value}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 border-border">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg">Economic Overview Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-3 text-sm">
                        <div className="grid grid-cols-1 gap-2">
                          <p><strong>GDP:</strong> $29.2 billion with 4.7% growth rate</p>
                          <p><strong>Population:</strong> 20.9 million people</p>
                          <p><strong>Per Capita Income:</strong> $1,480</p>
                          <p><strong>Inflation:</strong> 13.8% (May 2024)</p>
                          <p><strong>Unemployment:</strong> 12.4% of labor force</p>
                          <p><strong>Exchange Rate:</strong> 28.5 ZMW per USD</p>
                          <p><strong>Debt-to-GDP:</strong> 71.3%</p>
                          <p><strong>Foreign Reserves:</strong> $3.1 billion</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sectoral" className="mt-0 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6 border-border">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Building2 className="h-5 w-5" />
                        GDP by Sector (2023)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={getSectoralPieData()}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, value }) => `${name}: ${value}%`}
                            >
                              {getSectoralPieData().map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}%`, 'GDP Contribution']} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 border-border">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg">Sectoral Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-4">
                        {economicData?.sectoralContributions.map((sector, index) => (
                          <div key={sector.sector} className="border-b border-border pb-3 last:border-b-0">
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <h4 className="font-medium text-card-foreground">{sector.sector}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Source: {sector.source}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <span 
                                  className="text-lg font-bold" 
                                  style={{ color: CHART_COLORS[index % CHART_COLORS.length] }}
                                >
                                  {sector.contribution}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="mining" className="mt-0 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <Card className="p-6 border-border">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Factory className="h-5 w-5" />
                        Mining Production by Region (2023)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={getRegionalMiningData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="region" 
                              fontSize={12}
                              angle={-45}
                              textAnchor="end"
                              height={60}
                            />
                            <YAxis fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="production2023" fill="#0088FE" name="2023 Production" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 border-border">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg">Mineral Production Trends</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={getMiningProductionTrendData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" fontSize={12} />
                            <YAxis fontSize={12} />
                            <Tooltip />
                            <Line type="monotone" dataKey="Copper" stroke="#0088FE" strokeWidth={2} />
                            <Line type="monotone" dataKey="Cobalt" stroke="#00C49F" strokeWidth={2} />
                            <Line type="monotone" dataKey="Gold" stroke="#FFBB28" strokeWidth={2} />
                            <Legend />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Mining Key Facts */}
                <Card className="p-6 border-border">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg">Mining Sector Key Facts</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <h4 className="font-bold text-xl md:text-2xl text-primary">763,000</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">Metric tons copper (2023)</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <h4 className="font-bold text-xl md:text-2xl text-green-600">8,500</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">Metric tons cobalt (2023)</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <h4 className="font-bold text-xl md:text-2xl text-yellow-600">20M</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">Tons copper reserves</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <h4 className="font-bold text-xl md:text-2xl text-purple-600">12.4%</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">Of GDP contribution</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trade" className="mt-0 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6 border-border">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg">Trade & Exports</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-4">
                        {economicData?.tradeExports.map((trade, index) => (
                          <div key={trade.indicator} className="border-b border-border pb-3 last:border-b-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium text-card-foreground">{trade.indicator}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {trade.source}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <span className="text-lg font-bold text-green-600">
                                  {trade.value}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6 border-border">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg">Fiscal & Government Finance</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="space-y-4">
                        {economicData?.fiscalGovernment.map((fiscal, index) => (
                          <div key={fiscal.indicator} className="border-b border-border pb-3 last:border-b-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium text-card-foreground">{fiscal.indicator}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {fiscal.source}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <span className="text-lg font-bold text-red-600">
                                  {fiscal.value}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="detailed" className="mt-0">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Complete Economic Dataset</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[120px]">Category</TableHead>
                            <TableHead className="min-w-[200px]">Indicator</TableHead>
                            <TableHead className="w-[120px]">Value</TableHead>
                            <TableHead className="w-[120px]">Source</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {economicData?.macroeconomicOverview.map((indicator, index) => (
                            <TableRow key={`macro-${index}`}>
                              <TableCell className="font-medium text-xs">Macroeconomic</TableCell>
                              <TableCell className="text-sm">{indicator.indicator}</TableCell>
                              <TableCell className="font-semibold text-primary text-sm">
                                {indicator.value}
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">{indicator.source}</TableCell>
                            </TableRow>
                          ))}
                          {economicData?.sectoralContributions.map((sector, index) => (
                            <TableRow key={`sector-${index}`}>
                              <TableCell className="font-medium text-xs">Sectoral GDP</TableCell>
                              <TableCell className="text-sm">{sector.sector}</TableCell>
                              <TableCell className="font-semibold text-green-600 text-sm">
                                {sector.contribution}%
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">{sector.source}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
      
      {/* Footer */}
      <div className="text-xs text-muted-foreground mt-8 pt-4 border-t border-border">
        <div className="text-center space-y-1">
          <p>Economic data compiled from multiple official sources including World Bank, IMF, Bank of Zambia</p>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveEconomicSection;
