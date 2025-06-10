
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, Wheat, Award } from "lucide-react";

// Real crop production data
const realCropData = [
  {
    "Year": 2023,
    "Crop": "Maize",
    "Top Region": "Southern",
    "Production MT": 1200000,
    "2ND Best Region": "Eastern",
    "2nd Production Mt": 950000,
    "3rd Best Region": "Central",
    "3rd Production Mt": 800000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 600000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 450000,
    "Source": "CSO Zambia"
  },
  {
    "Year": 2022,
    "Crop": "Maize",
    "Top Region": "Eastern",
    "Production MT": 1100000,
    "2ND Best Region": "Southern",
    "2nd Production Mt": 1000000,
    "3rd Best Region": "Central",
    "3rd Production Mt": 850000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 550000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 400000,
    "Source": "Ministry of Agriculture"
  },
  {
    "Year": 2021,
    "Crop": "Maize",
    "Top Region": "Eastern",
    "Production MT": 1050000,
    "2ND Best Region": "Southern",
    "2nd Production Mt": 980000,
    "3rd Best Region": "Central",
    "3rd Production Mt": 780000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 500000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 380000,
    "Source": "FAOSTAT"
  },
  {
    "Year": 2020,
    "Crop": "Maize",
    "Top Region": "Southern",
    "Production MT": 1300000,
    "2ND Best Region": "Eastern",
    "2nd Production Mt": 1100000,
    "3rd Best Region": "Central",
    "3rd Production Mt": 900000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 650000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 500000,
    "Source": "Zambia National Farmers Union (ZNFU)"
  },
  {
    "Year": 2019,
    "Crop": "Maize",
    "Top Region": "Eastern",
    "Production MT": 1400000,
    "2ND Best Region": "Southern",
    "2nd Production Mt": 1200000,
    "3rd Best Region": "Central",
    "3rd Production Mt": 950000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 700000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 550000,
    "Source": "CSO Zambia"
  },
  {
    "Year": 2023,
    "Crop": "Soybeans",
    "Top Region": "Central",
    "Production MT": 350000,
    "2ND Best Region": "Eastern",
    "2nd Production Mt": 300000,
    "3rd Best Region": "Southern",
    "3rd Production Mt": 250000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 180000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 120000,
    "Source": "ZNFU"
  },
  {
    "Year": 2022,
    "Crop": "Soybeans",
    "Top Region": "Eastern",
    "Production MT": 320000,
    "2ND Best Region": "Central",
    "2nd Production Mt": 290000,
    "3rd Best Region": "Southern",
    "3rd Production Mt": 230000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 170000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 110000,
    "Source": "Ministry of Agriculture"
  },
  {
    "Year": 2021,
    "Crop": "Soybeans",
    "Top Region": "Central",
    "Production MT": 300000,
    "2ND Best Region": "Eastern",
    "2nd Production Mt": 280000,
    "3rd Best Region": "Southern",
    "3rd Production Mt": 220000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 160000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 100000,
    "Source": "FAOSTAT"
  },
  {
    "Year": 2020,
    "Crop": "Soybeans",
    "Top Region": "Eastern",
    "Production MT": 340000,
    "2ND Best Region": "Central",
    "2nd Production Mt": 310000,
    "3rd Best Region": "Southern",
    "3rd Production Mt": 240000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 190000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 130000,
    "Source": "ZNFU"
  },
  {
    "Year": 2019,
    "Crop": "Soybeans",
    "Top Region": "Central",
    "Production MT": 360000,
    "2ND Best Region": "Eastern",
    "2nd Production Mt": 330000,
    "3rd Best Region": "Southern",
    "3rd Production Mt": 260000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 200000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 140000,
    "Source": "CSO Zambia"
  },
  {
    "Year": 2023,
    "Crop": "Wheat",
    "Top Region": "Southern",
    "Production MT": 120000,
    "2ND Best Region": "Central",
    "2nd Production Mt": 90000,
    "3rd Best Region": "Lusaka",
    "3rd Production Mt": 70000,
    "4th Best Region": "Eastern",
    "4th Production Mt": 50000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 30000,
    "Source": "Zambia Agriculture Research Institute (ZARI)"
  },
  {
    "Year": 2022,
    "Crop": "Wheat",
    "Top Region": "Central",
    "Production MT": 110000,
    "2ND Best Region": "Southern",
    "2nd Production Mt": 85000,
    "3rd Best Region": "Lusaka",
    "3rd Production Mt": 65000,
    "4th Best Region": "Eastern",
    "4th Production Mt": 45000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 25000,
    "Source": "Ministry of Agriculture"
  },
  {
    "Year": 2021,
    "Crop": "Wheat",
    "Top Region": "Southern",
    "Production MT": 100000,
    "2ND Best Region": "Central",
    "2nd Production Mt": 80000,
    "3rd Best Region": "Lusaka",
    "3rd Production Mt": 60000,
    "4th Best Region": "Eastern",
    "4th Production Mt": 40000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 20000,
    "Source": "FAOSTAT"
  },
  {
    "Year": 2020,
    "Crop": "Wheat",
    "Top Region": "Central",
    "Production MT": 130000,
    "2ND Best Region": "Southern",
    "2nd Production Mt": 95000,
    "3rd Best Region": "Lusaka",
    "3rd Production Mt": 75000,
    "4th Best Region": "Eastern",
    "4th Production Mt": 55000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 35000,
    "Source": "ZARI"
  },
  {
    "Year": 2019,
    "Crop": "Wheat",
    "Top Region": "Southern",
    "Production MT": 140000,
    "2ND Best Region": "Central",
    "2nd Production Mt": 100000,
    "3rd Best Region": "Lusaka",
    "3rd Production Mt": 80000,
    "4th Best Region": "Eastern",
    "4th Production Mt": 60000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 40000,
    "Source": "CSO Zambia"
  }
];

export const RealCropProductionDashboard = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  // Transform data for visualization
  const transformedData = useMemo(() => {
    // Create time series data for line charts
    const timeSeriesData = realCropData.reduce((acc, record) => {
      const existing = acc.find(item => item.year === record.Year && item.crop === record.Crop);
      if (!existing) {
        acc.push({
          year: record.Year,
          crop: record.Crop,
          totalProduction: record["Production MT"] + record["2nd Production Mt"] + 
                          record["3rd Production Mt"] + record["4th Production Mt"] + 
                          record["5th Production Mt"],
          topRegionProduction: record["Production MT"],
          topRegion: record["Top Region"]
        });
      }
      return acc;
    }, [] as any[]);

    // Create regional breakdown data
    const regionalData = realCropData.reduce((acc, record) => {
      const regions = [
        { name: record["Top Region"], production: record["Production MT"] },
        { name: record["2ND Best Region"], production: record["2nd Production Mt"] },
        { name: record["3rd Best Region"], production: record["3rd Production Mt"] },
        { name: record["4th Best Region"], production: record["4th Production Mt"] },
        { name: record["5th Best Region"], production: record["5th Production Mt"] }
      ];

      regions.forEach(region => {
        const existing = acc.find(item => 
          item.region === region.name && 
          item.crop === record.Crop && 
          item.year === record.Year
        );
        if (!existing) {
          acc.push({
            region: region.name,
            crop: record.Crop,
            year: record.Year,
            production: region.production / 1000, // Convert to thousands of MT
            source: record.Source
          });
        }
      });
      return acc;
    }, [] as any[]);

    return { timeSeriesData, regionalData };
  }, []);

  // Filter data based on selections
  const filteredTimeSeriesData = useMemo(() => {
    let data = transformedData.timeSeriesData;
    
    if (selectedCrop !== "all") {
      data = data.filter(item => item.crop === selectedCrop);
    }
    
    if (selectedYear !== "all") {
      data = data.filter(item => item.year === parseInt(selectedYear));
    }
    
    return data.map(item => ({
      ...item,
      totalProduction: item.totalProduction / 1000 // Convert to thousands of MT
    }));
  }, [transformedData.timeSeriesData, selectedCrop, selectedYear]);

  const filteredRegionalData = useMemo(() => {
    let data = transformedData.regionalData;
    
    if (selectedCrop !== "all") {
      data = data.filter(item => item.crop === selectedCrop);
    }
    
    if (selectedYear !== "all") {
      data = data.filter(item => item.year === parseInt(selectedYear));
    }
    
    return data;
  }, [transformedData.regionalData, selectedCrop, selectedYear]);

  // Get unique values for filters
  const crops = ["Maize", "Soybeans", "Wheat"];
  const years = [2019, 2020, 2021, 2022, 2023];

  // Create chart data for different visualizations
  const getYearlyTrendData = () => {
    if (selectedCrop === "all") {
      return years.map(year => {
        const yearData = filteredTimeSeriesData.filter(item => item.year === year);
        return {
          year: year.toString(),
          Maize: yearData.find(item => item.crop === "Maize")?.totalProduction || 0,
          Soybeans: yearData.find(item => item.crop === "Soybeans")?.totalProduction || 0,
          Wheat: yearData.find(item => item.crop === "Wheat")?.totalProduction || 0
        };
      });
    } else {
      return filteredTimeSeriesData.map(item => ({
        year: item.year.toString(),
        production: item.totalProduction
      }));
    }
  };

  const getRegionalBarData = () => {
    const regions = ["Southern", "Eastern", "Central", "Lusaka", "Copperbelt"];
    
    if (selectedCrop === "all" && selectedYear === "all") {
      return regions.map(region => {
        const regionData = filteredRegionalData.filter(item => item.region === region);
        return {
          region,
          Maize: regionData.filter(item => item.crop === "Maize").reduce((sum, item) => sum + item.production, 0) / 5,
          Soybeans: regionData.filter(item => item.crop === "Soybeans").reduce((sum, item) => sum + item.production, 0) / 5,
          Wheat: regionData.filter(item => item.crop === "Wheat").reduce((sum, item) => sum + item.production, 0) / 5
        };
      });
    } else {
      return regions.map(region => {
        const regionData = filteredRegionalData.filter(item => item.region === region);
        return {
          region,
          production: regionData.reduce((sum, item) => sum + item.production, 0) / Math.max(regionData.length, 1)
        };
      });
    }
  };

  return (
    <div className="w-full py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Real Crop Production Data (2019-2023)
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Official agricultural production statistics from government sources
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Crops</SelectItem>
              {crops.map(crop => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Yearly Trends</TabsTrigger>
          <TabsTrigger value="regional">Regional Breakdown</TabsTrigger>
          <TabsTrigger value="rankings">Top Producers</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Data</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Production Trends (Thousand MT)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {selectedCrop === "all" ? (
                  <LineChart
                    data={getYearlyTrendData()}
                    lines={[
                      { dataKey: "Maize", name: "Maize", color: "#eab308" },
                      { dataKey: "Soybeans", name: "Soybeans", color: "#10b981" },
                      { dataKey: "Wheat", name: "Wheat", color: "#f97316" }
                    ]}
                    xAxisKey="year"
                    height={300}
                  />
                ) : (
                  <LineChart
                    data={getYearlyTrendData()}
                    lines={[
                      { dataKey: "production", name: selectedCrop, color: "#3b82f6" }
                    ]}
                    xAxisKey="year"
                    height={300}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Production by Region (Thousand MT)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {selectedCrop === "all" ? (
                  <BarChart
                    data={getRegionalBarData()}
                    bars={[
                      { dataKey: "Maize", name: "Maize", color: "#eab308" },
                      { dataKey: "Soybeans", name: "Soybeans", color: "#10b981" },
                      { dataKey: "Wheat", name: "Wheat", color: "#f97316" }
                    ]}
                    xAxisKey="region"
                    height={300}
                  />
                ) : (
                  <BarChart
                    data={getRegionalBarData()}
                    bars={[
                      { dataKey: "production", name: selectedCrop, color: "#3b82f6" }
                    ]}
                    xAxisKey="region"
                    height={300}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rankings" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {crops.map(crop => {
              const cropData = realCropData.filter(item => item.Crop === crop && item.Year === 2023);
              const topProducer = cropData[0];
              
              return (
                <Card key={crop}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      {crop} (2023)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {topProducer && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">🥇 {topProducer["Top Region"]}</span>
                          <span className="text-sm font-bold">{(topProducer["Production MT"] / 1000).toLocaleString()}k MT</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">🥈 {topProducer["2ND Best Region"]}</span>
                          <span className="text-sm">{(topProducer["2nd Production Mt"] / 1000).toLocaleString()}k MT</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">🥉 {topProducer["3rd Best Region"]}</span>
                          <span className="text-sm">{(topProducer["3rd Production Mt"] / 1000).toLocaleString()}k MT</span>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="text-xs text-gray-500">Source: {topProducer.Source}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Complete Production Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>
                    Comprehensive crop production data from official sources
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Crop</TableHead>
                      <TableHead>Top Region</TableHead>
                      <TableHead>Production (MT)</TableHead>
                      <TableHead>2nd Region</TableHead>
                      <TableHead>Production (MT)</TableHead>
                      <TableHead>3rd Region</TableHead>
                      <TableHead>Production (MT)</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {realCropData
                      .filter(record => 
                        (selectedCrop === "all" || record.Crop === selectedCrop) &&
                        (selectedYear === "all" || record.Year === parseInt(selectedYear))
                      )
                      .map((record, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{record.Year}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Wheat className="h-4 w-4" />
                              {record.Crop}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{record["Top Region"]}</TableCell>
                          <TableCell>{record["Production MT"].toLocaleString()}</TableCell>
                          <TableCell>{record["2ND Best Region"]}</TableCell>
                          <TableCell>{record["2nd Production Mt"].toLocaleString()}</TableCell>
                          <TableCell>{record["3rd Best Region"]}</TableCell>
                          <TableCell>{record["3rd Production Mt"].toLocaleString()}</TableCell>
                          <TableCell className="text-xs">{record.Source}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealCropProductionDashboard;
