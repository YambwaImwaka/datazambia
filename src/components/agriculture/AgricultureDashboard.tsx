
import { useState, useEffect } from "react";
import { 
  useCropProductionData, 
  useLivestockData, 
  useRainfallData, 
  useSoilHealthData 
} from "@/services/AgricultureService";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Wheat, 
  Cow, 
  CloudRain, 
  Mountain, 
  TrendingUp, 
  TrendingDown,
  Search,
  Info
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart } from "@/components/charts/LineChart";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip } from "@/components/ui/tooltip";

export const AgricultureDashboard = () => {
  const { data: cropData, loading: loadingCrops } = useCropProductionData();
  const { data: livestockData, loading: loadingLivestock } = useLivestockData();
  const { data: rainfallData, loading: loadingRainfall } = useRainfallData();
  const { data: soilHealthData, loading: loadingSoil } = useSoilHealthData();
  const [activeTab, setActiveTab] = useState("crop-production");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Filter data based on selected province and search term
  const filteredCropData = cropData?.filter(item => 
    (selectedProvince === "all" || item.province === selectedProvince) &&
    (searchTerm === "" || item.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.crops.some(crop => crop.name.toLowerCase().includes(searchTerm.toLowerCase())))
  );
  
  const filteredLivestockData = livestockData?.filter(item => 
    (selectedProvince === "all" || item.province === selectedProvince) &&
    (searchTerm === "" || item.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.livestock.some(animal => animal.type.toLowerCase().includes(searchTerm.toLowerCase())))
  );
  
  const filteredRainfallData = rainfallData?.filter(item => 
    (selectedProvince === "all" || item.province === selectedProvince) &&
    (searchTerm === "" || item.province.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const filteredSoilData = soilHealthData?.filter(item => 
    (selectedProvince === "all" || item.province === selectedProvince) &&
    (searchTerm === "" || item.province.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Prepare chart data
  const getRainfallChartData = () => {
    if (!filteredRainfallData) return [];
    
    return filteredRainfallData.map(item => ({
      province: item.province,
      current: item.currentSeason,
      previous: item.previousSeason,
      average: item.tenYearAverage,
      forecast: item.forecastNextSeason
    }));
  };
  
  const getCropProductionChartData = () => {
    if (!filteredCropData) return [];
    
    // Create data for major crops across provinces
    const majorCrops = ["Maize", "Cassava", "Rice", "Wheat"];
    
    return filteredCropData.map(item => {
      const result: any = { province: item.province };
      
      item.crops.forEach(crop => {
        if (majorCrops.includes(crop.name)) {
          result[crop.name.toLowerCase()] = crop.production;
        }
      });
      
      return result;
    });
  };

  return (
    <div 
      className="w-full py-8"
      style={{ 
        opacity: 0,
        animation: isVisible ? "fade-in 0.8s ease-out forwards" : "none"
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Agricultural Data Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Comprehensive agricultural statistics across Zambia's provinces
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-9 w-full sm:w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedProvince} onValueChange={setSelectedProvince}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Provinces</SelectItem>
              {cropData?.map(item => (
                <SelectItem key={item.province} value={item.province}>
                  {item.province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="crop-production" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="crop-production" className="flex items-center space-x-2">
            <Wheat className="h-4 w-4" />
            <span>Crop Production</span>
          </TabsTrigger>
          <TabsTrigger value="livestock" className="flex items-center space-x-2">
            <Cow className="h-4 w-4" />
            <span>Livestock</span>
          </TabsTrigger>
          <TabsTrigger value="rainfall" className="flex items-center space-x-2">
            <CloudRain className="h-4 w-4" />
            <span>Rainfall Patterns</span>
          </TabsTrigger>
          <TabsTrigger value="soil-health" className="flex items-center space-x-2">
            <Mountain className="h-4 w-4" />
            <span>Soil Health</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="crop-production" className="mt-0">
          {loadingCrops ? (
            <div className="space-y-8">
              <Card className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-80 w-full" />
              </Card>
              
              <Card className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="overflow-x-auto">
                  <Skeleton className="h-64 w-full" />
                </div>
              </Card>
            </div>
          ) : filteredCropData?.length ? (
            <div className="space-y-8" style={{ opacity: 0, animation: isVisible ? "fade-in 0.6s ease-out forwards" : "none" }}>
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Major Crop Production by Province (thousand tonnes)
                </h3>
                <div className="h-80">
                  <LineChart
                    data={getCropProductionChartData()}
                    lines={[
                      { dataKey: "maize", name: "Maize", color: "#eab308" },
                      { dataKey: "cassava", name: "Cassava", color: "#10b981" },
                      { dataKey: "rice", name: "Rice", color: "#0ea5e9" },
                      { dataKey: "wheat", name: "Wheat", color: "#f97316" }
                    ]}
                    xAxisKey="province"
                    height={300}
                  />
                </div>
              </Card>
              
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Detailed Crop Production Data
                </h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>
                      Agricultural production data for 2025 (thousand tonnes)
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Province</TableHead>
                        <TableHead>Crop</TableHead>
                        <TableHead>Production</TableHead>
                        <TableHead>YoY Change</TableHead>
                        <TableHead>Next Year Forecast</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCropData.flatMap(province => 
                        province.crops.map(crop => (
                          <TableRow key={`${province.province}-${crop.name}`}>
                            <TableCell className="font-medium">{province.province}</TableCell>
                            <TableCell>{crop.name}</TableCell>
                            <TableCell>{crop.production} {crop.unit}</TableCell>
                            <TableCell>
                              <div className={`flex items-center ${crop.yearOverYearChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {crop.yearOverYearChange >= 0 ? 
                                  <TrendingUp className="h-4 w-4 mr-1" /> : 
                                  <TrendingDown className="h-4 w-4 mr-1" />
                                }
                                <span>{crop.yearOverYearChange}%</span>
                              </div>
                            </TableCell>
                            <TableCell>{crop.forecastNextYear} {crop.unit}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                No crop production data available for the selected filters
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="livestock" className="mt-0">
          {loadingLivestock ? (
            <Card className="p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="overflow-x-auto">
                <Skeleton className="h-64 w-full" />
              </div>
            </Card>
          ) : filteredLivestockData?.length ? (
            <Card 
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md"
              style={{ opacity: 0, animation: isVisible ? "fade-in 0.6s ease-out forwards" : "none" }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Livestock Population and Health Metrics
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>
                    Livestock data for Zambia's provinces (2025)
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Province</TableHead>
                      <TableHead>Livestock Type</TableHead>
                      <TableHead>Population (thousands)</TableHead>
                      <TableHead>YoY Change</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Disease Incidence
                          <Tooltip content="Percentage of animals affected by diseases in the past year">
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </Tooltip>
                        </div>
                      </TableHead>
                      <TableHead>Avg. Price (ZMW)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLivestockData.flatMap(province => 
                      province.livestock.map(animal => (
                        <TableRow key={`${province.province}-${animal.type}`}>
                          <TableCell className="font-medium">{province.province}</TableCell>
                          <TableCell>{animal.type}</TableCell>
                          <TableCell>{animal.count}</TableCell>
                          <TableCell>
                            <div className={`flex items-center ${animal.yearOverYearChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {animal.yearOverYearChange >= 0 ? 
                                <TrendingUp className="h-4 w-4 mr-1" /> : 
                                <TrendingDown className="h-4 w-4 mr-1" />
                              }
                              <span>{animal.yearOverYearChange}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`flex items-center ${animal.diseaseIncidence <= 5 ? 'text-green-600' : animal.diseaseIncidence <= 10 ? 'text-amber-600' : 'text-red-600'}`}>
                              {animal.diseaseIncidence}%
                            </div>
                          </TableCell>
                          <TableCell>{animal.averagePrice.toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          ) : (
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                No livestock data available for the selected filters
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="rainfall" className="mt-0">
          {loadingRainfall ? (
            <div className="space-y-8">
              <Card className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-80 w-full" />
              </Card>
              
              <Card className="p-6">
                <Skeleton className="h-6 w-48 mb-4" />
                <div className="overflow-x-auto">
                  <Skeleton className="h-64 w-full" />
                </div>
              </Card>
            </div>
          ) : filteredRainfallData?.length ? (
            <div className="space-y-8" style={{ opacity: 0, animation: isVisible ? "fade-in 0.6s ease-out forwards" : "none" }}>
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Rainfall Comparison by Province (mm)
                </h3>
                <div className="h-80">
                  <LineChart
                    data={getRainfallChartData()}
                    lines={[
                      { dataKey: "current", name: "Current Season", color: "#0ea5e9" },
                      { dataKey: "previous", name: "Previous Season", color: "#8b5cf6" },
                      { dataKey: "average", name: "10-Year Average", color: "#94a3b8" },
                      { dataKey: "forecast", name: "Next Season Forecast", color: "#10b981", strokeDasharray: "5 5" }
                    ]}
                    xAxisKey="province"
                    height={300}
                  />
                </div>
              </Card>
              
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Detailed Rainfall Data
                </h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>
                      Rainfall data across Zambia's provinces (mm)
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Province</TableHead>
                        <TableHead>Current Season</TableHead>
                        <TableHead>Previous Season</TableHead>
                        <TableHead>10-Year Average</TableHead>
                        <TableHead>Change from Average</TableHead>
                        <TableHead>Next Season Forecast</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRainfallData.map(item => {
                        const changeFromAverage = ((item.currentSeason - item.tenYearAverage) / item.tenYearAverage) * 100;
                        
                        return (
                          <TableRow key={item.province}>
                            <TableCell className="font-medium">{item.province}</TableCell>
                            <TableCell>{item.currentSeason} mm</TableCell>
                            <TableCell>{item.previousSeason} mm</TableCell>
                            <TableCell>{item.tenYearAverage} mm</TableCell>
                            <TableCell>
                              <div className={`flex items-center ${changeFromAverage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {changeFromAverage >= 0 ? 
                                  <TrendingUp className="h-4 w-4 mr-1" /> : 
                                  <TrendingDown className="h-4 w-4 mr-1" />
                                }
                                <span>{changeFromAverage.toFixed(1)}%</span>
                              </div>
                            </TableCell>
                            <TableCell>{item.forecastNextSeason} mm</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                No rainfall data available for the selected filters
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="soil-health" className="mt-0">
          {loadingSoil ? (
            <Card className="p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="overflow-x-auto">
                <Skeleton className="h-64 w-full" />
              </div>
            </Card>
          ) : filteredSoilData?.length ? (
            <Card 
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md"
              style={{ opacity: 0, animation: isVisible ? "fade-in 0.6s ease-out forwards" : "none" }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Soil Health Analysis by Province
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>
                    Soil nutrient and quality data for agricultural regions (2025)
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Province</TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Nitrogen (ppm)
                          <Tooltip content="Parts per million - higher values indicate more nitrogen">
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </Tooltip>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Phosphorus (ppm)
                          <Tooltip content="Parts per million - higher values indicate more phosphorus">
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </Tooltip>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Potassium (ppm)
                          <Tooltip content="Parts per million - higher values indicate more potassium">
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </Tooltip>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Organic Matter (%)
                          <Tooltip content="Percentage of organic material in soil - 3-5% is ideal">
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </Tooltip>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          pH Level
                          <Tooltip content="Soil acidity/alkalinity - 5.5-6.5 is optimal for most crops">
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </Tooltip>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center">
                          Quality Index
                          <Tooltip content="Overall soil health score (0-100)">
                            <Info className="h-4 w-4 ml-1 text-gray-400" />
                          </Tooltip>
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSoilData.map(item => (
                      <TableRow key={item.province}>
                        <TableCell className="font-medium">{item.province}</TableCell>
                        <TableCell>{item.nitrogenContent}</TableCell>
                        <TableCell>{item.phosphorusContent}</TableCell>
                        <TableCell>{item.potassiumContent}</TableCell>
                        <TableCell>{item.organicMatter}%</TableCell>
                        <TableCell>{item.phLevel}</TableCell>
                        <TableCell>
                          <div className={`flex items-center font-medium ${
                            item.qualityIndex >= 80 ? 'text-green-600' : 
                            item.qualityIndex >= 60 ? 'text-lime-600' : 
                            item.qualityIndex >= 40 ? 'text-amber-600' : 
                            'text-red-600'
                          }`}>
                            {item.qualityIndex}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          ) : (
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                No soil health data available for the selected filters
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgricultureDashboard;
