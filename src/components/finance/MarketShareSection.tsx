
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart } from "@/components/charts/BarChart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Building2, Crown, TrendingUp, RefreshCw } from "lucide-react";
import { fetchMarketShareData, IndustryMarketShare, getMarketLeaders } from "@/services/market-share/MarketShareService";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import DataExport from "@/components/ui/DataExport";
import { useQueryClient } from "@tanstack/react-query";

// Colors for charts
const CHART_COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
  '#82CA9D', '#FFC658', '#8DD1E1', '#D084D0', '#FF6B6B'
];

interface MarketShareSectionProps {
  isVisible: boolean;
}

export const MarketShareSection = ({ isVisible }: MarketShareSectionProps) => {
  const [marketData, setMarketData] = useState<IndustryMarketShare[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMarketShareData();
        setMarketData(data);
      } catch (error) {
        console.error('Error loading market share data:', error);
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
        const data = await fetchMarketShareData();
        setMarketData(data);
      } catch (error) {
        console.error('Error refreshing market share data:', error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, 1000);
  };

  // Prepare data for different visualizations
  const getSelectedIndustryData = () => {
    if (selectedIndustry === "all") return null;
    return marketData.find(industry => industry.industry === selectedIndustry);
  };

  const getPieChartData = () => {
    const industryData = getSelectedIndustryData();
    if (!industryData) return [];
    
    return industryData.entries.map(entry => ({
      name: entry.company,
      value: entry.percentage || 0,
      displayValue: entry.market_share
    }));
  };

  const getIndustryComparisonData = () => {
    return marketData.map(industry => {
      const leader = industry.entries.reduce((prev, current) => 
        (current.percentage || 0) > (prev.percentage || 0) ? current : prev
      );
      
      return {
        industry: industry.industry,
        dominance: leader.percentage || 0,
        leader: leader.company
      };
    });
  };

  const getExportData = () => {
    if (selectedIndustry === "all") {
      return marketData.flatMap(industry => 
        industry.entries.map(entry => ({
          Industry: industry.industry,
          Company: entry.company,
          MarketShare: entry.market_share,
          Source: entry.source
        }))
      );
    } else {
      const industryData = getSelectedIndustryData();
      return industryData?.entries.map(entry => ({
        Industry: industryData.industry,
        Company: entry.company,
        MarketShare: entry.market_share,
        Source: entry.source
      })) || [];
    }
  };

  const marketLeaders = getMarketLeaders();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Market Share Analysis
        </h2>
        <div className="flex gap-2">
          <DataExport 
            data={getExportData()} 
            fileName={`zambia-market-share-${selectedIndustry}`}
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
        Industry market dominance and company market shares across key Zambian sectors
      </p>

      {loading || refreshing ? (
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Select Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries Overview</SelectItem>
                {marketData.map(industry => (
                  <SelectItem key={industry.industry} value={industry.industry}>
                    {industry.industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Market Leaders</TabsTrigger>
              <TabsTrigger value="breakdown">Industry Breakdown</TabsTrigger>
              <TabsTrigger value="comparison">Cross-Industry</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Data</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {marketLeaders.map((leader, index) => (
                  <Card 
                    key={leader.industry}
                    className="p-4"
                    style={{ 
                      opacity: 0,
                      animation: isVisible ? `fade-in 0.5s ease-out ${index * 0.1}s forwards` : "none"
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="h-4 w-4 text-yellow-500" />
                      <h3 className="font-semibold text-sm">{leader.industry}</h3>
                    </div>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {leader.leader}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {leader.marketShare}
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="breakdown" className="mt-6">
              {selectedIndustry === "all" ? (
                <Card className="p-6">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    Please select a specific industry to view detailed breakdown
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        {selectedIndustry} Market Share
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={getPieChartData()}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, value }) => `${name}: ${value}%`}
                            >
                              {getPieChartData().map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}%`, 'Market Share']} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle>Company Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {getSelectedIndustryData()?.entries.map((entry, index) => (
                          <div key={entry.company} className="border-b pb-3 last:border-b-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{entry.company}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Source: {entry.source}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="text-lg font-bold" style={{ color: CHART_COLORS[index % CHART_COLORS.length] }}>
                                  {entry.market_share}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="comparison" className="mt-6">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Market Concentration by Industry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <BarChart 
                      data={getIndustryComparisonData()}
                      xAxisKey="industry"
                      bars={[
                        { dataKey: "dominance", name: "Market Leader Share (%)", color: "#0088FE" }
                      ]}
                      height={350}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Shows the market share percentage of the leading company in each industry
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="detailed" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Market Share Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableCaption>
                        Market share data from official industry sources and regulatory bodies
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Industry</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Market Share</TableHead>
                          <TableHead>Source</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {marketData
                          .filter(industry => selectedIndustry === "all" || industry.industry === selectedIndustry)
                          .flatMap(industry => 
                            industry.entries.map((entry, index) => (
                              <TableRow key={`${industry.industry}-${entry.company}`}>
                                {index === 0 && (
                                  <TableCell 
                                    rowSpan={industry.entries.length} 
                                    className="font-medium align-top"
                                  >
                                    {industry.industry}
                                  </TableCell>
                                )}
                                <TableCell className="font-medium">{entry.company}</TableCell>
                                <TableCell>
                                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                                    {entry.market_share}
                                  </span>
                                </TableCell>
                                <TableCell className="text-sm">{entry.source}</TableCell>
                              </TableRow>
                            ))
                          )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
      
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-right">
        <p>Market share data compiled from various regulatory bodies and industry reports</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default MarketShareSection;
