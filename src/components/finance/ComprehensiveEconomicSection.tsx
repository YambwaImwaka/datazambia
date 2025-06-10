
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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Comprehensive Economic Overview
        </h2>
        <div className="flex gap-2">
          <DataExport 
            data={economicData ? [
              ...economicData.macroeconomicOverview,
              ...economicData.sectoralContributions,
              ...economicData.tradeExports
            ] : []} 
            fileName="zambia-comprehensive-economic-data"
            label="Export Data"
            disabled={loading || refreshing}
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleRefresh}
            disabled={refreshing || loading}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Complete economic indicators, sectoral analysis, and mining sector data for Zambia
      </p>

      {loading || refreshing ? (
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      ) : (
        <Tabs defaultValue="macroeconomic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="macroeconomic">Macroeconomic</TabsTrigger>
            <TabsTrigger value="sectoral">Sectoral GDP</TabsTrigger>
            <TabsTrigger value="mining">Mining Analysis</TabsTrigger>
            <TabsTrigger value="trade">Trade & Finance</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Data</TabsTrigger>
          </TabsList>

          <TabsContent value="macroeconomic" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {economicData?.macroeconomicOverview.slice(0, 6).map((indicator, index) => (
                <Card 
                  key={indicator.indicator}
                  className="p-4"
                  style={{ 
                    opacity: 0,
                    animation: isVisible ? `fade-in 0.5s ease-out ${index * 0.1}s forwards` : "none"
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    <h3 className="font-semibold text-sm">{indicator.indicator}</h3>
                  </div>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {indicator.value}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Source: {indicator.source}
                  </p>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Key Economic Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {economicData?.macroeconomicOverview.slice(0, 5).map((indicator, index) => (
                      <div key={indicator.indicator} className="border-b pb-3 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-sm">{indicator.indicator}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {indicator.source}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {indicator.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Economic Overview Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p><strong>GDP:</strong> $29.2 billion with 4.7% growth rate</p>
                    <p><strong>Population:</strong> 20.9 million people</p>
                    <p><strong>Per Capita Income:</strong> $1,480</p>
                    <p><strong>Inflation:</strong> 13.8% (May 2024)</p>
                    <p><strong>Unemployment:</strong> 12.4% of labor force</p>
                    <p><strong>Exchange Rate:</strong> 28.5 ZMW per USD</p>
                    <p><strong>Debt-to-GDP:</strong> 71.3%</p>
                    <p><strong>Foreign Reserves:</strong> $3.1 billion</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sectoral" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    GDP by Sector (2023)
                  </CardTitle>
                </CardHeader>
                <CardContent>
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

              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Sectoral Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {economicData?.sectoralContributions.map((sector, index) => (
                      <div key={sector.sector} className="border-b pb-3 last:border-b-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{sector.sector}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Source: {sector.source}
                            </p>
                          </div>
                          <div className="text-right">
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

          <TabsContent value="mining" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Factory className="h-5 w-5" />
                    Mining Production by Region (2023)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getRegionalMiningData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="region" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="production2023" fill="#0088FE" name="2023 Production" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Mineral Production Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getMiningProductionTrendData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
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

            <Card className="p-6">
              <CardHeader>
                <CardTitle>Mining Sector Key Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <h4 className="font-bold text-2xl text-blue-600">763,000</h4>
                    <p className="text-sm text-gray-600">Metric tons copper (2023)</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-2xl text-green-600">8,500</h4>
                    <p className="text-sm text-gray-600">Metric tons cobalt (2023)</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-2xl text-yellow-600">20M</h4>
                    <p className="text-sm text-gray-600">Tons copper reserves</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-2xl text-purple-600">12.4%</h4>
                    <p className="text-sm text-gray-600">Of GDP contribution</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trade" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Trade & Exports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {economicData?.tradeExports.map((trade, index) => (
                      <div key={trade.indicator} className="border-b pb-3 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{trade.indicator}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {trade.source}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-green-600 dark:text-green-400">
                              {trade.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Fiscal & Government Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {economicData?.fiscalGovernment.map((fiscal, index) => (
                      <div key={fiscal.indicator} className="border-b pb-3 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{fiscal.indicator}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {fiscal.source}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-red-600 dark:text-red-400">
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

          <TabsContent value="detailed" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Complete Economic Dataset</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Indicator</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Source</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {economicData?.macroeconomicOverview.map((indicator, index) => (
                        <TableRow key={`macro-${index}`}>
                          <TableCell className="font-medium">Macroeconomic</TableCell>
                          <TableCell>{indicator.indicator}</TableCell>
                          <TableCell className="font-semibold text-blue-600 dark:text-blue-400">
                            {indicator.value}
                          </TableCell>
                          <TableCell className="text-sm">{indicator.source}</TableCell>
                        </TableRow>
                      ))}
                      {economicData?.sectoralContributions.map((sector, index) => (
                        <TableRow key={`sector-${index}`}>
                          <TableCell className="font-medium">Sectoral GDP</TableCell>
                          <TableCell>{sector.sector}</TableCell>
                          <TableCell className="font-semibold text-green-600 dark:text-green-400">
                            {sector.contribution}%
                          </TableCell>
                          <TableCell className="text-sm">{sector.source}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-right">
        <p>Economic data compiled from multiple official sources including World Bank, IMF, Bank of Zambia</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ComprehensiveEconomicSection;
