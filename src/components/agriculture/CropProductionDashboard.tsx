
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { getCropProductionData, getCropTrendData, getRegionProductionData } from "@/services/CropProductionService";
import { Wheat, TrendingUp, BarChart3, Award } from "lucide-react";

export const CropProductionDashboard = () => {
  const [selectedCrop, setSelectedCrop] = useState("Maize");
  const [selectedYear, setSelectedYear] = useState("2023");
  
  const allData = getCropProductionData();
  const cropTrendData = getCropTrendData(selectedCrop);
  const regionData = getRegionProductionData();
  const yearData = allData.filter(item => item.year === parseInt(selectedYear));
  
  // Transform data for charts
  const trendChartData = cropTrendData.map(item => ({
    year: item.year.toString(),
    production: Math.round(item.productionMT / 1000), // Convert to thousands
    topRegion: item.topRegion
  }));
  
  const regionChartData = regionData.map(item => ({
    region: item.region,
    total: Math.round(item.total / 1000000) // Convert to millions
  }));
  
  const yearlyComparisonData = yearData.map(item => ({
    crop: item.crop,
    production: Math.round(item.productionMT / 1000)
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Crop Production Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Real agricultural production data across Zambia's provinces (2019-2023)
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Maize">Maize</SelectItem>
              <SelectItem value="Soybeans">Soybeans</SelectItem>
              <SelectItem value="Wheat">Wheat</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
              <SelectItem value="2019">2019</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Production Trends
          </TabsTrigger>
          <TabsTrigger value="regions" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            By Region
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <Wheat className="h-4 w-4" />
            Crop Comparison
          </TabsTrigger>
          <TabsTrigger value="rankings" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Top Performers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {selectedCrop} Production Trends (2019-2023)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <LineChart
                  data={trendChartData}
                  xAxisKey="year"
                  lines={[
                    { dataKey: "production", name: "Production (000 MT)", color: "#3b82f6" }
                  ]}
                  height={300}
                />
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Production shown in thousands of metric tons (MT)
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Total Production by Region (All Crops Combined)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChart
                  data={regionChartData}
                  xAxisKey="region"
                  bars={[
                    { dataKey: "total", name: "Total Production (Million MT)", color: "#10b981" }
                  ]}
                  height={300}
                />
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Combined production across all crops in millions of metric tons
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wheat className="h-5 w-5" />
                Crop Production Comparison - {selectedYear}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <BarChart
                  data={yearlyComparisonData}
                  xAxisKey="crop"
                  bars={[
                    { dataKey: "production", name: "Production (000 MT)", color: "#f59e0b" }
                  ]}
                  height={300}
                />
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Top region production for each crop in {selectedYear}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rankings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {yearData.map((item, index) => (
              <Card key={`${item.crop}-${item.year}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Wheat className="h-5 w-5" />
                      {item.crop} {item.year}
                    </span>
                    <Badge variant="outline">{item.source}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span className="font-medium">1st: {item.topRegion}</span>
                    </span>
                    <span className="text-sm">{(item.productionMT / 1000).toLocaleString()}k MT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-400 rounded"></div>
                      <span className="font-medium">2nd: {item.secondBestRegion}</span>
                    </span>
                    <span className="text-sm">{(item.secondProductionMt / 1000).toLocaleString()}k MT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded"></div>
                      <span className="font-medium">3rd: {item.thirdBestRegion}</span>
                    </span>
                    <span className="text-sm">{(item.thirdProductionMt / 1000).toLocaleString()}k MT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="font-medium">4th: {item.fourthBestRegion}</span>
                    </span>
                    <span className="text-sm">{(item.fourthProductionMt / 1000).toLocaleString()}k MT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="font-medium">5th: {item.fifthBestRegion}</span>
                    </span>
                    <span className="text-sm">{(item.fifthProductionMt / 1000).toLocaleString()}k MT</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CropProductionDashboard;
