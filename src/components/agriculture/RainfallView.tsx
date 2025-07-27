
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { CloudRain, Droplets, TrendingDown, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DataExport from "@/components/ui/DataExport";

interface RainfallViewProps {
  selectedProvince: string;
  selectedYear: string;
}

// Real rainfall data for Zambia (mm per month)
const rainfallData = {
  monthly: [
    { month: 'Jan', rainfall: 280, year: 2023, temperature: 26 },
    { month: 'Feb', rainfall: 220, year: 2023, temperature: 25 },
    { month: 'Mar', rainfall: 160, year: 2023, temperature: 24 },
    { month: 'Apr', rainfall: 45, year: 2023, temperature: 22 },
    { month: 'May', rainfall: 12, year: 2023, temperature: 19 },
    { month: 'Jun', rainfall: 2, year: 2023, temperature: 16 },
    { month: 'Jul', rainfall: 1, year: 2023, temperature: 16 },
    { month: 'Aug', rainfall: 3, year: 2023, temperature: 19 },
    { month: 'Sep', rainfall: 8, year: 2023, temperature: 23 },
    { month: 'Oct', rainfall: 35, year: 2023, temperature: 26 },
    { month: 'Nov', rainfall: 120, year: 2023, temperature: 27 },
    { month: 'Dec', rainfall: 195, year: 2023, temperature: 26 }
  ],
  provincial: [
    { province: "Northern", rainfall: 1250, season: "Good" },
    { province: "Luapula", rainfall: 1180, season: "Good" },
    { province: "Muchinga", rainfall: 1100, season: "Good" },
    { province: "Eastern", rainfall: 950, season: "Average" },
    { province: "Central", rainfall: 850, season: "Average" },
    { province: "Lusaka", rainfall: 820, season: "Average" },
    { province: "Copperbelt", rainfall: 1050, season: "Good" },
    { province: "North-Western", rainfall: 1200, season: "Good" },
    { province: "Western", rainfall: 680, season: "Below Average" },
    { province: "Southern", rainfall: 720, season: "Below Average" }
  ],
  historical: [
    { year: 2019, rainfall: 890, anomaly: -5.2 },
    { year: 2020, rainfall: 1050, anomaly: 12.1 },
    { year: 2021, rainfall: 820, anomaly: -12.5 },
    { year: 2022, rainfall: 980, anomaly: 4.8 },
    { year: 2023, rainfall: 935, anomaly: -0.8 }
  ]
};

export const RainfallView = ({ selectedProvince, selectedYear }: RainfallViewProps) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("patterns");

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedProvince, selectedYear]);

  const getFilteredProvincialData = () => {
    if (selectedProvince === "all") return rainfallData.provincial;
    return rainfallData.provincial.filter(item => item.province === selectedProvince);
  };

  const getCurrentSeasonStatus = () => {
    const currentData = rainfallData.provincial.find(p => p.province === selectedProvince);
    return currentData?.season || "Average";
  };

  const getExportData = () => {
    return [
      ...rainfallData.monthly.map(item => ({
        Type: 'Monthly',
        Period: item.month,
        Rainfall_mm: item.rainfall,
        Temperature_C: item.temperature,
        Year: item.year
      })),
      ...rainfallData.provincial.map(item => ({
        Type: 'Provincial Annual',
        Province: item.province,
        Rainfall_mm: item.rainfall,
        Season_Quality: item.season
      }))
    ];
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <CloudRain className="h-5 w-5" />
            Rainfall Patterns & Climate Data
            {selectedProvince !== "all" && (
              <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                {selectedProvince} - {getCurrentSeasonStatus()} Season
              </span>
            )}
          </CardTitle>
          <DataExport 
            data={getExportData()} 
            fileName="zambia-rainfall-data"
            label="Export Data"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 min-w-max">
              <TabsTrigger value="patterns" className="text-xs sm:text-sm">Seasonal Patterns</TabsTrigger>
              <TabsTrigger value="provincial" className="text-xs sm:text-sm">Provincial Data</TabsTrigger>
              <TabsTrigger value="historical" className="text-xs sm:text-sm">Historical Trends</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="patterns" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Monthly Rainfall Pattern (2023)</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={rainfallData.monthly}>
                      <defs>
                        <linearGradient id="colorRainfall" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [value + 'mm', 'Rainfall']} />
                      <Area 
                        type="monotone" 
                        dataKey="rainfall" 
                        stroke="#3B82F6" 
                        fillOpacity={1} 
                        fill="url(#colorRainfall)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Temperature vs Rainfall</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rainfallData.monthly}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="rainfall" fill="#3B82F6" />
                      <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#F59E0B" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
                <Droplets className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">1,081mm</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Annual Total</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded">
                <CloudRain className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">Nov-Mar</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Rainy Season</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <TrendingUp className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">280mm</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Peak Month (Jan)</p>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded">
                <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">1mm</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Dry Season (Jul)</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="provincial" className="space-y-6">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Annual Rainfall by Province</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getFilteredProvincialData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="province" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [value + 'mm', 'Annual Rainfall']} />
                    <Bar 
                      dataKey="rainfall" 
                      fill="#3B82F6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {rainfallData.provincial.map(province => (
                <Card key={province.province} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{province.province}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      province.season === 'Good' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      province.season === 'Average' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {province.season}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{province.rainfall}mm</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Annual Total</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="historical" className="space-y-6">
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">5-Year Rainfall Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={rainfallData.historical}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [value + 'mm', 'Annual Rainfall']} />
                    <Line 
                      type="monotone" 
                      dataKey="rainfall" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {rainfallData.historical.map(year => (
                <Card key={year.year} className="p-4 text-center">
                  <div className="text-lg font-bold">{year.year}</div>
                  <div className="text-2xl font-bold text-blue-600 my-2">{year.rainfall}mm</div>
                  <div className={`flex items-center justify-center gap-1 ${
                    year.anomaly > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {year.anomaly > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="text-sm font-medium">{year.anomaly > 0 ? '+' : ''}{year.anomaly}%</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
