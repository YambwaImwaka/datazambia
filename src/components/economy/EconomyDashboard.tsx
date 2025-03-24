
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { DataCard } from "@/components/ui/DataCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

const EconomyDashboard = () => {
  const [activeTab, setActiveTab] = useState("gdp");
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // GDP Growth Data
  const gdpData = [
    { year: '2019', gdp: 23.31, growth: 1.4 },
    { year: '2020', gdp: 19.32, growth: -2.8 },
    { year: '2021', gdp: 22.15, growth: 3.6 },
    { year: '2022', gdp: 25.88, growth: 4.7 },
    { year: '2023', gdp: 26.41, growth: 2.9 },
    { year: '2024', gdp: 29.05, growth: 4.2 },
    { year: '2025', gdp: 31.24, growth: 3.8 },
  ];

  // Sector Contribution to GDP
  const sectorContributionData = [
    { sector: 'Agriculture', percentage: 21.5, value: 6.71, color: '#10B981' },
    { sector: 'Mining', percentage: 14.2, value: 4.43, color: '#6366F1' },
    { sector: 'Manufacturing', percentage: 8.7, value: 2.71, color: '#F59E0B' },
    { sector: 'Construction', percentage: 9.3, value: 2.90, color: '#EF4444' },
    { sector: 'Tourism', percentage: 7.2, value: 2.25, color: '#EC4899' },
    { sector: 'Trade', percentage: 18.6, value: 5.80, color: '#8B5CF6' },
    { sector: 'Transport', percentage: 8.1, value: 2.53, color: '#3B82F6' },
    { sector: 'Other', percentage: 12.4, value: 3.87, color: '#9CA3AF' },
  ];

  // Employment statistics
  const employmentData = [
    { year: '2019', formal: 15.3, informal: 60.2, unemployed: 24.5 },
    { year: '2020', formal: 14.8, informal: 59.5, unemployed: 25.7 },
    { year: '2021', formal: 15.1, informal: 60.8, unemployed: 24.1 },
    { year: '2022', formal: 16.4, informal: 60.3, unemployed: 23.3 },
    { year: '2023', formal: 17.2, informal: 60.5, unemployed: 22.3 },
    { year: '2024', formal: 18.5, informal: 61.2, unemployed: 20.3 },
  ];

  // Key economic indicators
  const keyIndicators = [
    { name: 'GDP (USD)', value: '$29.05B', change: '+10.4%', isPositive: true, icon: <DollarSign size={20} /> },
    { name: 'GDP Growth', value: '4.2%', change: '+1.3%', isPositive: true, icon: <TrendingUp size={20} /> },
    { name: 'Inflation', value: '7.8%', change: '-2.3%', isPositive: true, icon: <BarChart3 size={20} /> },
    { name: 'Unemployment', value: '20.3%', change: '-2.0%', isPositive: true, icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Economy Overview</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Comprehensive analysis of Zambia's economic performance, key sectors, and growth indicators
        </p>
      </div>

      {/* Key economic indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {keyIndicators.map((indicator, index) => (
          <DataCard
            key={indicator.name}
            title={indicator.name}
            value={indicator.value}
            change={indicator.change}
            isPositive={indicator.isPositive}
            icon={indicator.icon}
            index={index}
          />
        ))}
      </div>

      <Tabs defaultValue="gdp" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="gdp">GDP & Growth</TabsTrigger>
          <TabsTrigger value="sectors">Economic Sectors</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gdp" className="space-y-6">
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
                  yAxisKey="value"
                  barKey="value"
                  colors={['#0284c7']}
                  formatValue={(value) => `${value}%`}
                />
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sectors" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Sector Contribution to GDP</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={sectorContributionData}
                    xAxisKey="sector"
                    yAxisKey="percentage"
                    barKey="percentage"
                    colors={sectorContributionData.map(item => item.color)}
                    formatValue={(value) => `${value}%`}
                    layout={isMobile ? "vertical" : "horizontal"}
                  />
                </ResponsiveContainer>
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
          </Card>
        </TabsContent>
        
        <TabsContent value="employment" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Employment Distribution</h3>
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
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">18.5%</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">+1.3% from previous year</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-green-700 dark:text-green-300 mb-1">Informal Employment</h4>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">61.2%</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">+0.7% from previous year</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">Unemployment Rate</h4>
                <p className="text-2xl font-bold text-red-800 dark:text-red-200">20.3%</p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">-2.0% from previous year</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EconomyDashboard;
