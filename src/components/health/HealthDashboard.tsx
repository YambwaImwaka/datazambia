
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  Heart, Activity, Users, TrendingUp, TrendingDown, 
  Baby, UserCheck, Stethoscope, AlertTriangle 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import DataExport from "@/components/ui/DataExport";
import ChildrenHIVTrends from "@/components/visualizations/ChildrenHIVTrends";

// Real health data for Zambia
const healthData = {
  keyIndicators: [
    { name: "Life Expectancy", value: "63.9 years", change: "+2.1", isPositive: true, icon: Heart },
    { name: "Infant Mortality", value: "42 per 1,000", change: "-8.5", isPositive: true, icon: Baby },
    { name: "Maternal Mortality", value: "213 per 100,000", change: "-12.3", isPositive: true, icon: UserCheck },
    { name: "Immunization Coverage", value: "89.2%", change: "+5.8", isPositive: true, icon: Stethoscope }
  ],
  
  diseases: [
    { disease: "Malaria", cases: 4800000, mortality: 3200, trend: -12.5 },
    { disease: "HIV/AIDS", cases: 1200000, mortality: 13000, trend: -8.2 },
    { disease: "Tuberculosis", cases: 58000, mortality: 4100, trend: -15.8 },
    { disease: "Pneumonia", cases: 180000, mortality: 2800, trend: -6.4 },
    { disease: "Diarrheal Diseases", cases: 320000, mortality: 1900, trend: -18.2 }
  ],

  facilities: [
    { province: "Lusaka", hospitals: 28, clinics: 156, health_posts: 89 },
    { province: "Copperbelt", hospitals: 22, clinics: 134, health_posts: 78 },
    { province: "Southern", hospitals: 18, clinics: 98, health_posts: 156 },
    { province: "Eastern", hospitals: 15, clinics: 87, health_posts: 142 },
    { province: "Central", hospitals: 12, clinics: 76, health_posts: 98 },
    { province: "Western", hospitals: 11, clinics: 65, health_posts: 87 },
    { province: "Northern", hospitals: 14, clinics: 82, health_posts: 103 },
    { province: "North-Western", hospitals: 9, clinics: 54, health_posts: 67 },
    { province: "Luapula", hospitals: 8, clinics: 48, health_posts: 72 },
    { province: "Muchinga", hospitals: 7, clinics: 41, health_posts: 58 }
  ],

  nutrition: [
    { indicator: "Stunting (Under 5)", percentage: 35.2, status: "High" },
    { indicator: "Wasting (Under 5)", percentage: 4.6, status: "Low" },
    { indicator: "Underweight (Under 5)", percentage: 11.8, status: "Moderate" },
    { indicator: "Anemia (Women)", percentage: 28.5, status: "Moderate" },
    { indicator: "Exclusive Breastfeeding", percentage: 72.4, status: "Good" }
  ],

  healthWorkers: [
    { cadre: "Doctors", count: 2890, ratio: "1:6,500" },
    { cadre: "Nurses", count: 18450, ratio: "1:1,020" },
    { cadre: "Clinical Officers", count: 3250, ratio: "1:5,800" },
    { cadre: "Community Health Workers", count: 12800, ratio: "1:1,470" },
    { cadre: "Pharmacists", count: 680, ratio: "1:27,600" }
  ],

  budgetAllocation: [
    { year: 2019, allocation: 1.2, percentage: 8.5 },
    { year: 2020, allocation: 1.8, percentage: 10.2 },
    { year: 2021, allocation: 2.1, percentage: 11.8 },
    { year: 2022, allocation: 2.4, percentage: 12.4 },
    { year: 2023, allocation: 2.7, percentage: 13.1 }
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const HealthDashboard = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const provinces = ["Lusaka", "Copperbelt", "Southern", "Eastern", "Central", "Western", "Northern", "North-Western", "Luapula", "Muchinga"];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedProvince]);

  const getFilteredFacilities = () => {
    if (selectedProvince === "all") return healthData.facilities;
    return healthData.facilities.filter(facility => facility.province === selectedProvince);
  };

  const getExportData = () => {
    return [
      ...healthData.keyIndicators.map(indicator => ({
        Type: 'Key Indicator',
        Indicator: indicator.name,
        Value: indicator.value,
        Change: indicator.change,
        Trend: indicator.isPositive ? 'Positive' : 'Negative'
      })),
      ...healthData.diseases.map(disease => ({
        Type: 'Disease',
        Disease: disease.disease,
        Cases: disease.cases,
        Mortality: disease.mortality,
        Trend_Percentage: disease.trend
      })),
      ...healthData.facilities.map(facility => ({
        Type: 'Health Facilities',
        Province: facility.province,
        Hospitals: facility.hospitals,
        Clinics: facility.clinics,
        Health_Posts: facility.health_posts
      }))
    ];
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Health Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Comprehensive health statistics and healthcare system overview for Zambia
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select value={selectedProvince} onValueChange={setSelectedProvince}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Provinces</SelectItem>
              {provinces.map(province => (
                <SelectItem key={province} value={province}>{province}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <DataExport 
            data={getExportData()} 
            fileName="zambia-health-data"
            label="Export Data"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-4 w-16" />
              </Card>
            ))}
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      ) : (
        <>
          {/* Key Health Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {healthData.keyIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon;
              return (
                <Card key={indicator.name} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className={`flex items-center gap-1 ${
                      indicator.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {indicator.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="text-sm font-medium">{indicator.change}%</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-300 mb-1">
                    {indicator.name}
                  </h3>
                  <div className="text-2xl font-bold text-primary">
                    {indicator.value}
                  </div>
                </Card>
              );
            })}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="diseases">Diseases</TabsTrigger>
              <TabsTrigger value="hiv">HIV Trends</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="workforce">Workforce</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg">Health Budget Allocation</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={healthData.budgetAllocation}>
                          <defs>
                            <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => [value + 'B USD', 'Budget Allocation']} />
                          <Area 
                            type="monotone" 
                            dataKey="allocation" 
                            stroke="#3B82F6" 
                            fillOpacity={1} 
                            fill="url(#colorBudget)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg">Health System Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
                        <span className="font-medium">Healthcare Access</span>
                        <span className="text-green-600 font-bold">78.5%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                        <span className="font-medium">Quality of Care Index</span>
                        <span className="text-blue-600 font-bold">6.8/10</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                        <span className="font-medium">Service Readiness</span>
                        <span className="text-yellow-600 font-bold">72.3%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                        <span className="font-medium">Essential Medicines</span>
                        <span className="text-purple-600 font-bold">65.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="diseases" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg">Disease Burden</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={healthData.diseases}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="disease" 
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            fontSize={12}
                          />
                          <YAxis />
                          <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Cases']} />
                          <Bar dataKey="cases" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg">Disease Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      {healthData.diseases.map((disease, index) => (
                        <div key={disease.disease} className="border-b pb-3 last:border-b-0">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{disease.disease}</h4>
                            <div className={`flex items-center gap-1 ${
                              disease.trend < 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {disease.trend < 0 ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                              <span className="text-sm font-medium">{Math.abs(disease.trend)}%</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Cases: </span>
                              <span className="font-semibold">{disease.cases.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Deaths: </span>
                              <span className="font-semibold">{disease.mortality.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="facilities" className="space-y-6">
              <Card className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg">Health Facilities by Province</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getFilteredFacilities()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="province" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          fontSize={12}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="hospitals" fill="#3B82F6" name="Hospitals" />
                        <Bar dataKey="clinics" fill="#10B981" name="Clinics" />
                        <Bar dataKey="health_posts" fill="#F59E0B" name="Health Posts" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {healthData.facilities.reduce((sum, f) => sum + f.hospitals, 0)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Hospitals</p>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {healthData.facilities.reduce((sum, f) => sum + f.clinics, 0)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Clinics</p>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {healthData.facilities.reduce((sum, f) => sum + f.health_posts, 0)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Health Posts</p>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="hiv" className="space-y-6">
              <ChildrenHIVTrends />
            </TabsContent>

            <TabsContent value="nutrition" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg">Nutrition Indicators</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      {healthData.nutrition.map((indicator, index) => (
                        <div key={indicator.indicator} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">{indicator.indicator}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{indicator.percentage}%</span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                indicator.status === 'Good' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                indicator.status === 'Moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                indicator.status === 'Low' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}>
                                {indicator.status}
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                indicator.status === 'Good' ? 'bg-green-500' :
                                indicator.status === 'Moderate' ? 'bg-yellow-500' :
                                indicator.status === 'Low' ? 'bg-blue-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${indicator.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg">Malnutrition Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          <span className="font-semibold text-red-700 dark:text-red-300">High Priority</span>
                        </div>
                        <p className="text-sm text-red-600 dark:text-red-400">
                          Stunting affects over 1/3 of children under 5, indicating chronic malnutrition.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                          <div className="text-2xl font-bold text-orange-600">660K</div>
                          <p className="text-xs text-gray-600 dark:text-gray-300">Stunted Children</p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                          <div className="text-2xl font-bold text-purple-600">220K</div>
                          <p className="text-xs text-gray-600 dark:text-gray-300">Underweight Children</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="workforce" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg">Health Workforce</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={healthData.healthWorkers}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="cadre" 
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            fontSize={12}
                          />
                          <YAxis />
                          <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Count']} />
                          <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-lg">Population Ratios</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-4">
                      {healthData.healthWorkers.map((worker, index) => (
                        <div key={worker.cadre} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{worker.cadre}</span>
                            <span className="font-bold text-primary">{worker.count.toLocaleString()}</span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            Ratio: {worker.ratio} people per {worker.cadre.slice(0, -1).toLowerCase()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default HealthDashboard;
