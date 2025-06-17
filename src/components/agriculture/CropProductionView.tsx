
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { TrendingUp, Calendar, Wheat, Award } from "lucide-react";
import { realCropData } from "./data/cropData";

interface CropProductionViewProps {
  selectedProvince: string;
  selectedYear: string;
}

export const CropProductionView = ({ selectedProvince, selectedYear }: CropProductionViewProps) => {
  // Filter the real crop data based on selections
  const filteredData = useMemo(() => {
    return realCropData.filter(record => {
      const provinceMatch = selectedProvince === "all" || 
        record["Top Region"] === selectedProvince ||
        record["2ND Best Region"] === selectedProvince ||
        record["3rd Best Region"] === selectedProvince ||
        record["4th Best Region"] === selectedProvince ||
        record["5th Best Region"] === selectedProvince;
      
      const yearMatch = selectedYear === "all" || record.Year === parseInt(selectedYear);
      
      return provinceMatch && yearMatch;
    });
  }, [selectedProvince, selectedYear]);

  // Create chart data for trends
  const trendData = useMemo(() => {
    const years = [2019, 2020, 2021, 2022, 2023];
    return years.map(year => {
      const yearData = realCropData.filter(item => item.Year === year);
      return {
        year: year.toString(),
        Maize: yearData.find(item => item.Crop === "Maize")?.["Production MT"] / 1000 || 0,
        Soybeans: yearData.find(item => item.Crop === "Soybeans")?.["Production MT"] / 1000 || 0,
        Wheat: yearData.find(item => item.Crop === "Wheat")?.["Production MT"] / 1000 || 0
      };
    });
  }, []);

  // Create regional data for bar chart
  const regionalData = useMemo(() => {
    const regions = ["Southern", "Eastern", "Central", "Lusaka", "Copperbelt"];
    return regions.map(region => {
      const regionData = realCropData.filter(item => 
        item["Top Region"] === region && item.Year === 2023
      );
      
      return {
        region,
        Maize: regionData.find(item => item.Crop === "Maize")?.["Production MT"] / 1000 || 0,
        Soybeans: regionData.find(item => item.Crop === "Soybeans")?.["Production MT"] / 1000 || 0,
        Wheat: regionData.find(item => item.Crop === "Wheat")?.["Production MT"] / 1000 || 0
      };
    });
  }, []);

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="trends">Trends</TabsTrigger>
        <TabsTrigger value="data">Raw Data</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {["Maize", "Soybeans", "Wheat"].map(crop => {
            const cropData = realCropData.filter(item => item.Crop === crop && item.Year === 2023);
            const topProducer = cropData[0];
            
            return (
              <Card key={crop}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    {crop} - 2023
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

        <Card>
          <CardHeader>
            <CardTitle>Regional Production by Crop (2023) - Thousand MT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart
                data={regionalData}
                bars={[
                  { dataKey: "Maize", name: "Maize", color: "#eab308" },
                  { dataKey: "Soybeans", name: "Soybeans", color: "#10b981" },
                  { dataKey: "Wheat", name: "Wheat", color: "#f97316" }
                ]}
                xAxisKey="region"
                height={300}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="trends" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Production Trends (2019-2023) - Thousand MT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <LineChart
                data={trendData}
                lines={[
                  { dataKey: "Maize", name: "Maize", color: "#eab308" },
                  { dataKey: "Soybeans", name: "Soybeans", color: "#10b981" },
                  { dataKey: "Wheat", name: "Wheat", color: "#f97316" }
                ]}
                xAxisKey="year"
                height={300}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="data" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Complete Crop Production Records
              {selectedYear !== "all" && (
                <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  Year: {selectedYear}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>
                  Official crop production data from government sources
                  {selectedYear === "all" ? " (2019-2023)" : ` for ${selectedYear}`}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold bg-blue-50 dark:bg-blue-900/20">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Year
                      </div>
                    </TableHead>
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
                  {filteredData
                    .sort((a, b) => b.Year - a.Year)
                    .map((record, index) => (
                      <TableRow key={`${record.Year}-${record.Crop}-${index}`}>
                        <TableCell className="font-bold text-blue-600 dark:text-blue-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {record.Year}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          <div className="flex items-center gap-2">
                            <Wheat className="h-4 w-4" />
                            {record.Crop}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-green-700 dark:text-green-400">
                          🥇 {record["Top Region"]}
                        </TableCell>
                        <TableCell className="font-medium">
                          {record["Production MT"].toLocaleString()}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          🥈 {record["2ND Best Region"]}
                        </TableCell>
                        <TableCell>
                          {record["2nd Production Mt"].toLocaleString()}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          🥉 {record["3rd Best Region"]}
                        </TableCell>
                        <TableCell>
                          {record["3rd Production Mt"].toLocaleString()}
                        </TableCell>
                        <TableCell className="text-xs text-gray-500 max-w-[150px] truncate">
                          {record.Source}
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
  );
};
