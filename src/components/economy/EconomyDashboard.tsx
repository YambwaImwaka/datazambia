
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { DataCard } from "@/components/ui/DataCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, DollarSign, BarChart3, Mountain, Gem, Users } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import DataExport from "@/components/ui/DataExport";
import { useQuery } from "@tanstack/react-query";
import { fetchEconomyData } from "@/services/economic/EconomyDataService";
import { fetchMiningResourcesData } from "@/services/mining/MiningResourcesService";

const EconomyDashboard = () => {
  const [activeTab, setActiveTab] = useState("gdp");
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Fetch real economy data
  const { data: economyData, isLoading } = useQuery({
    queryKey: ['economyData'],
    queryFn: fetchEconomyData,
    staleTime: 1000 * 60 * 60 * 24,
  });

  // Fetch mining data
  const { data: miningData, isLoading: isMiningLoading } = useQuery({
    queryKey: ['miningData'],
    queryFn: fetchMiningResourcesData,
    staleTime: 1000 * 60 * 60 * 24,
  });
  
  // Prepare datasets for various visualizations
  const gdpData = economyData?.gdp || [];
  const sectorContributionData = economyData?.sectors || [];
  const employmentData = economyData?.employment || [];
  const keyIndicators = economyData?.keyIndicators || [];

  // Format data for export based on active tab
  const getExportData = () => {
    if (!economyData) return [];
    
    switch (activeTab) {
      case "gdp":
        return economyData.gdp;
      case "sectors":
        return economyData.sectors;
      case "employment":
        return economyData.employment;
      default:
        return economyData.gdp;
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Economy Overview</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Comprehensive analysis of Zambia's economic performance, key sectors, and growth indicators
          </p>
        </div>
        <DataExport 
          data={getExportData()}
          fileName={`zambia-economy-${activeTab}-data`}
          label="Export Data"
          disabled={isLoading || !economyData}
        />
      </div>

      {/* Key economic indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isLoading ? (
          Array(4).fill(0).map((_, index) => (
            <Card key={`skeleton-${index}`} className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </Card>
          ))
        ) : (
          keyIndicators.map((indicator, index) => (
            <DataCard
              key={indicator.name}
              title={indicator.name}
              value={indicator.value}
              change={indicator.change}
              isPositive={indicator.isPositive}
              icon={indicator.icon === 'dollar' ? <DollarSign size={20} /> : 
                    indicator.icon === 'trending' ? <TrendingUp size={20} /> : 
                    <BarChart3 size={20} />}
              index={index}
            />
          ))
        )}
      </div>

      <Tabs defaultValue="gdp" className="mb-8" onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4 min-w-max mb-8">
            <TabsTrigger value="gdp" className="text-xs sm:text-sm">GDP & Growth</TabsTrigger>
            <TabsTrigger value="sectors" className="text-xs sm:text-sm">Economic Sectors</TabsTrigger>
            <TabsTrigger value="mining" className="text-xs sm:text-sm">Mining & Resources</TabsTrigger>
            <TabsTrigger value="employment" className="text-xs sm:text-sm">Employment</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="gdp" className="space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-[350px] bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-[350px] bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">GDP Development (Billion USD)</h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={gdpData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '8px',
                          borderColor: '#e2e8f0',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                      />
                      <Area type="monotone" dataKey="gdp" stroke="#0284c7" fillOpacity={1} fill="url(#colorGdp)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">GDP Growth Rate (%)</h3>
                <div className="h-[350px]">
                  <BarChart 
                    data={gdpData.map(item => ({ name: item.year, value: item.growth }))}
                    xAxisKey="name"
                    bars={[
                      { dataKey: "value", name: "Growth Rate", color: "#0284c7" }
                    ]}
                  />
                </div>
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sectors" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Sector Contribution to GDP</h3>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-[400px] bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-[400px]">
                  <BarChart 
                    data={sectorContributionData.map(item => ({
                      name: item.sector,
                      value: item.percentage
                    }))}
                    xAxisKey="name"
                    bars={sectorContributionData.map(item => ({
                      dataKey: "value",
                      name: item.sector,
                      color: item.color
                    }))}
                    layout={isMobile ? "vertical" : "horizontal"}
                  />
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-4">Sector Breakdown</h4>
                  <div className="space-y-4">
                    {sectorContributionData.map(sector => (
                      <div key={sector.sector} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-3" 
                            style={{ backgroundColor: sector.color }}
                          ></div>
                          <span className="font-medium">{sector.sector}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 dark:text-gray-400 mr-3">${sector.value}B</span>
                          <span className="font-bold">{sector.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="mining" className="space-y-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Mining & Natural Resources</h2>
            <p className="text-muted-foreground">
              Monitor copper, cobalt, emerald production, GDP contribution, mining jobs, and environmental impacts
            </p>
          </div>

          {isMiningLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, i) => (
                <Card key={i}><CardContent className="p-6 animate-pulse"><div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" /></CardContent></Card>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Copper Production</CardTitle>
                    <Mountain className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{miningData?.keyMetrics.copperProduction}k</div>
                    <p className="text-xs text-muted-foreground">metric tons per year</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Mining GDP Share</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{miningData?.keyMetrics.gdpContribution}%</div>
                    <p className="text-xs text-muted-foreground">of national GDP</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Mining Jobs</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{miningData?.keyMetrics.miningJobs}k</div>
                    <p className="text-xs text-muted-foreground">direct employment</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Emerald Exports</CardTitle>
                    <Gem className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${miningData?.keyMetrics.emeraldExports}M</div>
                    <p className="text-xs text-muted-foreground">annual revenue</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mineral Production Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <LineChart
                      data={miningData?.productionTrends || []}
                      lines={[
                        { dataKey: 'copper', name: 'Copper (kt)', color: '#f59e0b' },
                        { dataKey: 'cobalt', name: 'Cobalt (kt)', color: '#3b82f6' }
                      ]}
                      xAxisKey="year"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Mining Revenue by Resource</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <BarChart
                      data={miningData?.revenueByResource || []}
                      bars={[{ dataKey: 'revenue', name: 'Revenue (Million USD)', color: '#10b981' }]}
                      xAxisKey="resource"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Mining Employment Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <LineChart
                      data={miningData?.employmentTrends || []}
                      lines={[{ dataKey: 'jobs', name: 'Jobs (thousands)', color: '#8b5cf6' }]}
                      xAxisKey="year"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Impact Score</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <LineChart
                      data={miningData?.environmentalImpact || []}
                      lines={[{ dataKey: 'score', name: 'Impact Score', color: '#ef4444' }]}
                      xAxisKey="year"
                    />
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="employment" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Employment Distribution</h3>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-[400px] bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={employmentData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      stackOffset="expand"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `${Math.round(value * 100)}%`} />
                      <Tooltip 
                        formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`]}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '8px',
                          borderColor: '#e2e8f0',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="formal" stackId="1" stroke="#3B82F6" fill="#3B82F6" name="Formal Employment" />
                      <Area type="monotone" dataKey="informal" stackId="1" stroke="#10B981" fill="#10B981" name="Informal Employment" />
                      <Area type="monotone" dataKey="unemployed" stackId="1" stroke="#EF4444" fill="#EF4444" name="Unemployed" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Formal Employment</h4>
                    <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                      {employmentData[employmentData.length - 1]?.formal * 100}%
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      {((employmentData[employmentData.length - 1]?.formal - 
                        employmentData[employmentData.length - 2]?.formal) * 100).toFixed(1)}% from previous year
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-medium text-green-700 dark:text-green-300 mb-1">Informal Employment</h4>
                    <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                      {employmentData[employmentData.length - 1]?.informal * 100}%
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      {((employmentData[employmentData.length - 1]?.informal - 
                        employmentData[employmentData.length - 2]?.informal) * 100).toFixed(1)}% from previous year
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">Unemployment Rate</h4>
                    <p className="text-2xl font-bold text-red-800 dark:text-red-200">
                      {employmentData[employmentData.length - 1]?.unemployed * 100}%
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      {((employmentData[employmentData.length - 1]?.unemployed - 
                        employmentData[employmentData.length - 2]?.unemployed) * 100).toFixed(1)}% from previous year
                    </p>
                  </div>
                </div>
              </>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EconomyDashboard;
