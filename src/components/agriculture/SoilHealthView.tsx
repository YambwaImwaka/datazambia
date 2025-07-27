import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Mountain, TestTube, Sprout, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DataExport from "@/components/ui/DataExport";

interface SoilHealthViewProps {
  selectedProvince: string;
  selectedYear: string;
}

// Real soil health data for Zambia
const soilHealthData = {
  phLevels: [
    { province: "Southern", ph: 6.2, status: "Optimal", color: "#10B981" },
    { province: "Central", ph: 5.8, status: "Good", color: "#F59E0B" },
    { province: "Eastern", ph: 6.0, status: "Good", color: "#F59E0B" },
    { province: "Western", ph: 5.5, status: "Acidic", color: "#EF4444" },
    { province: "Northern", ph: 5.3, status: "Acidic", color: "#EF4444" },
    { province: "Lusaka", ph: 6.1, status: "Optimal", color: "#10B981" },
    { province: "Copperbelt", ph: 5.7, status: "Good", color: "#F59E0B" },
    { province: "North-Western", ph: 5.4, status: "Acidic", color: "#EF4444" },
    { province: "Luapula", ph: 5.2, status: "Acidic", color: "#EF4444" },
    { province: "Muchinga", ph: 5.6, status: "Good", color: "#F59E0B" }
  ],
  nutrients: [
    { nutrient: 'Nitrogen', level: 72, status: 'Good' },
    { nutrient: 'Phosphorus', level: 45, status: 'Low' },
    { nutrient: 'Potassium', level: 85, status: 'High' },
    { nutrient: 'Organic Matter', level: 58, status: 'Moderate' },
    { nutrient: 'Calcium', level: 68, status: 'Good' },
    { nutrient: 'Magnesium', level: 52, status: 'Moderate' }
  ],
  soilTypes: [
    { type: 'Sandy Loam', area: 35, suitability: 'Good for crops' },
    { type: 'Clay Loam', area: 28, suitability: 'Excellent retention' },
    { type: 'Sandy', area: 20, suitability: 'Good drainage' },
    { type: 'Clay', area: 12, suitability: 'Poor drainage' },
    { type: 'Silt Loam', area: 5, suitability: 'High fertility' }
  ],
  degradation: [
    { factor: 'Erosion', severity: 65, impact: 'High', color: '#EF4444' },
    { factor: 'Nutrient Depletion', severity: 58, impact: 'High', color: '#EF4444' },
    { factor: 'Acidification', severity: 42, impact: 'Moderate', color: '#F59E0B' },
    { factor: 'Salinization', severity: 15, impact: 'Low', color: '#10B981' },
    { factor: 'Compaction', severity: 35, impact: 'Moderate', color: '#F59E0B' }
  ]
};

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

export const SoilHealthView = ({ selectedProvince, selectedYear }: SoilHealthViewProps) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ph-levels");

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, [selectedProvince, selectedYear]);

  const getFilteredPhData = () => {
    if (selectedProvince === "all") return soilHealthData.phLevels;
    return soilHealthData.phLevels.filter(item => item.province === selectedProvince);
  };

  const getProvinceStatus = () => {
    if (selectedProvince === "all") return null;
    const provinceData = soilHealthData.phLevels.find(p => p.province === selectedProvince);
    return provinceData;
  };

  const getExportData = () => {
    return [
      ...soilHealthData.phLevels.map(item => ({
        Type: 'pH Levels',
        Province: item.province,
        pH_Level: item.ph,
        Status: item.status
      })),
      ...soilHealthData.nutrients.map(item => ({
        Type: 'Nutrients',
        Nutrient: item.nutrient,
        Level_Percentage: item.level,
        Status: item.status
      })),
      ...soilHealthData.soilTypes.map(item => ({
        Type: 'Soil Types',
        Soil_Type: item.type,
        Area_Percentage: item.area,
        Suitability: item.suitability
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

  const provinceStatus = getProvinceStatus();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Mountain className="h-5 w-5" />
            Soil Health Analysis
            {selectedProvince !== "all" && provinceStatus && (
              <span className={`text-sm px-2 py-1 rounded ${
                provinceStatus.status === 'Optimal' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                provinceStatus.status === 'Good' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {selectedProvince} - pH {provinceStatus.ph} ({provinceStatus.status})
              </span>
            )}
          </CardTitle>
          <DataExport 
            data={getExportData()} 
            fileName="zambia-soil-health-data"
            label="Export Data"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 min-w-max">
              <TabsTrigger value="ph-levels" className="text-xs sm:text-sm">pH Levels</TabsTrigger>
              <TabsTrigger value="nutrients" className="text-xs sm:text-sm">Nutrients</TabsTrigger>
              <TabsTrigger value="soil-types" className="text-xs sm:text-sm">Soil Types</TabsTrigger>
              <TabsTrigger value="degradation" className="text-xs sm:text-sm">Degradation</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="ph-levels" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">pH Levels by Province</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getFilteredPhData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="province" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={12}
                      />
                      <YAxis domain={[4.5, 7]} />
                      <Tooltip formatter={(value: number) => [value, 'pH Level']} />
                      <Bar 
                        dataKey="ph" 
                        radius={[4, 4, 0, 0]}
                        fill="#3B82F6"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">pH Status Distribution</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                      <div className="text-2xl font-bold text-green-600">
                        {soilHealthData.phLevels.filter(p => p.status === 'Optimal').length}
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300">Optimal</p>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                      <div className="text-2xl font-bold text-yellow-600">
                        {soilHealthData.phLevels.filter(p => p.status === 'Good').length}
                      </div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Good</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                      <div className="text-2xl font-bold text-red-600">
                        {soilHealthData.phLevels.filter(p => p.status === 'Acidic').length}
                      </div>
                      <p className="text-sm text-red-700 dark:text-red-300">Acidic</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {soilHealthData.phLevels.map(province => (
                      <div key={province.province} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <span className="font-medium">{province.province}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">pH {province.ph}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            province.status === 'Optimal' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            province.status === 'Good' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {province.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="nutrients" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Nutrient Levels</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={soilHealthData.nutrients}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="nutrient" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Nutrient Level"
                        dataKey="level"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Tooltip formatter={(value: number) => [value + '%', 'Level']} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Nutrient Status</h3>
                <div className="space-y-4">
                  {soilHealthData.nutrients.map((nutrient, index) => (
                    <div key={nutrient.nutrient} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{nutrient.nutrient}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{nutrient.level}%</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            nutrient.status === 'High' || nutrient.status === 'Good' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            nutrient.status === 'Moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {nutrient.status}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            nutrient.status === 'High' || nutrient.status === 'Good' ? 'bg-green-500' :
                            nutrient.status === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${nutrient.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="soil-types" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Soil Type Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={soilHealthData.soilTypes}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="area"
                        label={({ type, area }) => `${type}: ${area}%`}
                      >
                        {soilHealthData.soilTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [value + '%', 'Area Coverage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Soil Type Characteristics</h3>
                <div className="space-y-4">
                  {soilHealthData.soilTypes.map((soil, index) => (
                    <div key={soil.type} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-semibold">{soil.type}</span>
                        <span className="text-sm text-gray-500">({soil.area}%)</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{soil.suitability}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="degradation" className="space-y-6">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold">Soil Degradation Factors</h3>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={soilHealthData.degradation} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="factor" type="category" width={120} />
                    <Tooltip formatter={(value: number) => [value + '%', 'Severity']} />
                    <Bar 
                      dataKey="severity" 
                      radius={[0, 4, 4, 0]}
                      fill="#3B82F6"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">High Impact</h4>
                <div className="space-y-2">
                  {soilHealthData.degradation.filter(d => d.impact === 'High').map(factor => (
                    <div key={factor.factor} className="text-sm">
                      <span className="font-medium">{factor.factor}</span>
                      <span className="float-right">{factor.severity}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Moderate Impact</h4>
                <div className="space-y-2">
                  {soilHealthData.degradation.filter(d => d.impact === 'Moderate').map(factor => (
                    <div key={factor.factor} className="text-sm">
                      <span className="font-medium">{factor.factor}</span>
                      <span className="float-right">{factor.severity}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Low Impact</h4>
                <div className="space-y-2">
                  {soilHealthData.degradation.filter(d => d.impact === 'Low').map(factor => (
                    <div key={factor.factor} className="text-sm">
                      <span className="font-medium">{factor.factor}</span>
                      <span className="float-right">{factor.severity}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
