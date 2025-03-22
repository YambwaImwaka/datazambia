import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Search, Filter, ChevronRight, BarChart2 as BarChartIcon, PieChart, MapPin, ArrowDown, TrendingUp, DollarSign, Percent, Globe } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import MapChart from "@/components/charts/MapChart";
import { provinces, dataCategories, healthMetrics, educationMetrics, timePeriods, historicalData, financialData } from "@/utils/data";
import DataCard from "@/components/ui/DataCard";

const Explore = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(categoryId || "overview");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("5yr");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const mapData = provinces.map(province => ({
    id: province.id,
    name: province.name,
    value: province.literacy
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (categoryId) {
      setActiveTab(categoryId);
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [categoryId]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/explore/${value !== "overview" ? value : ""}`);
  };

  const getProvincesByMetric = (metric: string) => {
    if (metric === "infantMortality") {
      return healthMetrics.infantMortality
        .sort((a, b) => a.value - b.value)
        .map(item => ({
          ...item,
          value: item.value
        }));
    }
    
    if (metric === "lifeExpectancy") {
      return healthMetrics.lifeExpectancy
        .sort((a, b) => b.value - a.value)
        .map(item => ({
          ...item,
          value: item.value
        }));
    }
    
    if (metric === "accessToHealthcare") {
      return healthMetrics.accessToHealthcare
        .sort((a, b) => b.value - a.value)
        .map(item => ({
          ...item,
          value: item.value
        }));
    }
    
    if (metric === "primaryEnrollment") {
      return educationMetrics.primaryEnrollment
        .sort((a, b) => b.value - a.value)
        .map(item => ({
          ...item,
          value: item.value
        }));
    }
    
    if (metric === "secondaryEnrollment") {
      return educationMetrics.secondaryEnrollment
        .sort((a, b) => b.value - a.value)
        .map(item => ({
          ...item,
          value: item.value
        }));
    }
    
    return [];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        <section className="bg-gradient-to-r from-zambia-800 to-zambia-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-center text-white/80 text-sm mb-2">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight size={16} className="mx-1" />
                <span>Data Explorer</span>
                {categoryId && (
                  <>
                    <ChevronRight size={16} className="mx-1" />
                    <span>{dataCategories.find(c => c.id === categoryId)?.name}</span>
                  </>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Explore Zambia's Provincial Data
              </h1>
              
              <p className="text-lg text-white/80 max-w-3xl mb-8">
                Discover insights, trends, and patterns across Zambia's provinces with our interactive data explorer.
              </p>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative flex-grow max-w-2xl">
                  <Input
                    type="search"
                    placeholder="Search datasets, indicators, or provinces..."
                    className="w-full h-12 pl-12 pr-4 rounded-full border-transparent focus:border-white/20 bg-white/10 backdrop-blur-md text-white placeholder:text-white/60"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search
                    size={20}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white/60"
                  />
                </div>
                
                <Button
                  className="h-12 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full"
                >
                  <Filter size={18} className="mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="w-full border-b border-gray-200 dark:border-gray-700 p-0 h-auto mb-8">
                <div className="container flex overflow-x-auto">
                  {dataCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="py-4 px-6 text-sm border-b-2 border-transparent data-[state=active]:border-zambia-600 rounded-none flex items-center"
                    >
                      <span className="mr-2">{category.name}</span>
                    </TabsTrigger>
                  ))}
                </div>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Provincial Literacy Rates
                          </h2>
                          
                          <Select
                            value={selectedTimePeriod}
                            onValueChange={setSelectedTimePeriod}
                          >
                            <SelectTrigger className="w-36">
                              <SelectValue placeholder="Time Period" />
                            </SelectTrigger>
                            <SelectContent>
                              {timePeriods.map((period) => (
                                <SelectItem key={period.id} value={period.id}>
                                  {period.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="h-[400px]">
                          <MapChart
                            data={mapData}
                            height={400}
                            onClick={(provinceId) => navigate(`/province/${provinceId}`)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                          Top Provinces
                        </h2>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                              By Population
                            </h3>
                            
                            <div className="space-y-4">
                              {provinces
                                .sort((a, b) => b.population - a.population)
                                .slice(0, 5)
                                .map((province, index) => (
                                  <Link
                                    key={province.id}
                                    to={`/province/${province.id}`}
                                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zambia-100 text-zambia-800 flex items-center justify-center font-bold">
                                      {index + 1}
                                    </div>
                                    <div className="ml-3 flex-grow">
                                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                        {province.name}
                                      </h4>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {province.population}M people
                                      </p>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                  </Link>
                                ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                              By GDP
                            </h3>
                            
                            <div className="space-y-4">
                              {provinces
                                .sort((a, b) => b.gdp - a.gdp)
                                .slice(0, 5)
                                .map((province, index) => (
                                  <Link
                                    key={province.id}
                                    to={`/province/${province.id}`}
                                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold">
                                      {index + 1}
                                    </div>
                                    <div className="ml-3 flex-grow">
                                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                        {province.name}
                                      </h4>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        ${province.gdp}B
                                      </p>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                  </Link>
                                ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Historical Trends
                      </h2>
                      
                      <Select
                        value={selectedTimePeriod}
                        onValueChange={setSelectedTimePeriod}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Time Period" />
                        </SelectTrigger>
                        <SelectContent>
                          {timePeriods.map((period) => (
                            <SelectItem key={period.id} value={period.id}>
                              {period.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Population Growth
                        </h3>
                        
                        <LineChart
                          data={historicalData.population}
                          lines={[
                            { dataKey: "value", name: "Population (Millions)", color: "#0ea5e9" }
                          ]}
                          xAxisKey="year"
                          height={300}
                        />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          GDP Growth
                        </h3>
                        
                        <LineChart
                          data={historicalData.gdp}
                          lines={[
                            { dataKey: "value", name: "GDP (Billion USD)", color: "#10b981" }
                          ]}
                          xAxisKey="year"
                          height={300}
                        />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Inflation Rate
                        </h3>
                        
                        <LineChart
                          data={historicalData.inflation}
                          lines={[
                            { dataKey: "value", name: "Inflation (%)", color: "#f43f5e" }
                          ]}
                          xAxisKey="year"
                          height={300}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="health" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Infant Mortality Rate
                      </h2>
                      
                      <BarChart
                        data={getProvincesByMetric("infantMortality")}
                        bars={[
                          { dataKey: "value", name: "per 1,000 live births", color: "#f43f5e" }
                        ]}
                        xAxisKey="province"
                        height={400}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Life Expectancy
                      </h2>
                      
                      <BarChart
                        data={getProvincesByMetric("lifeExpectancy")}
                        bars={[
                          { dataKey: "value", name: "Years", color: "#0ea5e9" }
                        ]}
                        xAxisKey="province"
                        height={400}
                      />
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Access to Healthcare
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Percentage of population with access to healthcare facilities within 5km.
                    </p>
                    
                    <BarChart
                      data={getProvincesByMetric("accessToHealthcare")}
                      bars={[
                        { dataKey: "value", name: "Access (%)", color: "#10b981" }
                      ]}
                      xAxisKey="province"
                      height={400}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="education" className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Education Enrollment Rates
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Primary Education
                        </h3>
                        <p className="text-4xl font-bold text-zambia-600 mb-1">
                          82.6%
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          National average enrollment rate
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Secondary Education
                        </h3>
                        <p className="text-4xl font-bold text-zambia-600 mb-1">
                          54.5%
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          National average enrollment rate
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Tertiary Education
                        </h3>
                        <p className="text-4xl font-bold text-zambia-600 mb-1">
                          12.2%
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          National average enrollment rate
                        </p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                      Primary Enrollment by Province
                    </h3>
                    
                    <BarChart
                      data={getProvincesByMetric("primaryEnrollment")}
                      bars={[
                        { dataKey: "value", name: "Enrollment (%)", color: "#8b5cf6" }
                      ]}
                      xAxisKey="province"
                      height={400}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Secondary Enrollment by Province
                    </h2>
                    
                    <BarChart
                      data={getProvincesByMetric("secondaryEnrollment")}
                      bars={[
                        { dataKey: "value", name: "Enrollment (%)", color: "#ec4899" }
                      ]}
                      xAxisKey="province"
                      height={400}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="agriculture" className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Crop Production by Province
                    </h2>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-tl-lg">Province</th>
                            <th className="p-3 bg-gray-50 dark:bg-gray-800">Maize</th>
                            <th className="p-3 bg-gray-50 dark:bg-gray-800">Cassava</th>
                            <th className="p-3 bg-gray-50 dark:bg-gray-800">Sorghum</th>
                            <th className="p-3 bg-gray-50 dark:bg-gray-800 rounded-tr-lg">Rice</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Use agricultureMetrics.cropProduction here */}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Livestock by Province
                    </h2>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-tl-lg">Province</th>
                            <th className="p-3 bg-gray-50 dark:bg-gray-800">Cattle</th>
                            <th className="p-3 bg-gray-50 dark:bg-gray-800">Goats</th>
                            <th className="p-3 bg-gray-50 dark:bg-gray-800">Pigs</th>
                            <th className="p-3 bg-gray-50 dark:bg-gray-800 rounded-tr-lg">Poultry</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Use agricultureMetrics.livestock here */}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="economy" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        GDP by Province
                      </h2>
                      
                      <BarChart
                        data={provinces.map(p => ({ province: p.name, value: p.gdp })).sort((a, b) => b.value - a.value)}
                        bars={[
                          { dataKey: "value", name: "GDP (Billion USD)", color: "#10b981" }
                        ]}
                        xAxisKey="province"
                        height={400}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        GDP Growth Rate
                      </h2>
                      
                      <LineChart
                        data={historicalData.gdp}
                        lines={[
                          { dataKey: "value", name: "GDP (Billion USD)", color: "#10b981" }
                        ]}
                        xAxisKey="year"
                        height={400}
                      />
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Inflation Rate
                    </h2>
                    
                    <LineChart
                      data={historicalData.inflation}
                      lines={[
                        { dataKey: "value", name: "Inflation (%)", color: "#f43f5e" }
                      ]}
                      xAxisKey="year"
                      height={400}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="finance" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                          Economic Indicators
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {financialData.economicIndicators.map((indicator, index) => (
                            <DataCard
                              key={indicator.name}
                              title={indicator.name}
                              value={indicator.value}
                              change={indicator.change}
                              isPositive={indicator.isPositive}
                              description={indicator.description}
                              index={index}
                              lastUpdated={indicator.lastUpdated}
                              source={indicator.source}
                              icon={indicator.name.includes("Inflation") ? <Percent className="h-5 w-5" /> : 
                                    indicator.name.includes("Interest") ? <Percent className="h-5 w-5" /> :
                                    indicator.name.includes("Reserves") ? <DollarSign className="h-5 w-5" /> :
                                    indicator.name.includes("Debt") ? <TrendingUp className="h-5 w-5" /> :
                                    <DollarSign className="h-5 w-5" />}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                          Exchange Rates
                        </h2>
                        
                        <div className="space-y-4">
                          {financialData.exchangeRates.map((rate, index) => (
                            <div key={rate.currency} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                                  {rate.currency.substring(0, 1)}
                                </div>
                                <div className="ml-3">
                                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {rate.currency === "USD" ? "US Dollar" : 
                                     rate.currency === "EUR" ? "Euro" : 
                                     rate.currency === "GBP" ? "British Pound" : 
                                     rate.currency === "CNY" ? "Chinese Yuan" : 
                                     rate.currency === "ZAR" ? "South African Rand" : rate.currency}
                                  </h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Last updated: {rate.lastUpdated}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-base font-semibold text-gray-900 dark:text-white">
                                  {rate.rate} ZMW
                                </p>
                                <p className={`text-xs ${rate.isPositive ? 'text-red-500' : 'text-green-500'}`}>
                                  {rate.change}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Lusaka Stock Exchange
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          LuSE All Share Index
                        </h3>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                              {financialData.stockMarket.luseBoardIndex.value}
                            </p>
                            <p className={`text-lg font-semibold ${financialData.stockMarket.luseBoardIndex.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                              {financialData.stockMarket.luseBoardIndex.change}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Last updated: {financialData.stockMarket.luseBoardIndex.lastUpdated}
                          </p>
                        </div>
                        
                        <LineChart
                          data={financialData.stockMarket.luseBoardIndex.recentPerformance.map(item => ({
                            year: item.date.split('-')[2],
                            value: item.value
                          }))}
                          lines={[
                            { dataKey: "value", name: "LuSE Index", color: "#8b5cf6" }
                          ]}
                          xAxisKey="year"
                          height={200}
                        />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Top Performing Stocks
                        </h3>
                        
                        <div className="space-y-4">
                          {financialData.stockMarket.topPerformingStocks.map((stock, index) => (
                            <div key={stock.symbol} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                                  {index + 1}
                                </div>
                                <div className="ml-3">
                                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {stock.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {stock.symbol}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-base font-semibold text-gray-900 dark:text-white">
                                  {stock.price} ZMW
                                </p>
                                <p className="text-xs text-green-500">
                                  {stock.change}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Top Exports
                      </h2>
                      
                      <BarChart
                        data={financialData.tradeData.exports.slice(0, 6).map(item => ({
                          category: item.category,
                          value: item.value
                        }))}
                        bars={[
                          { dataKey: "value", name: "Value (Million USD)", color: "#10b981" }
                        ]}
                        xAxisKey="category"
                        height={400}
                      />
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                          Top Export Destinations
                        </h3>
                        
                        <div className="space-y-2">
                          {financialData.tradeData.tradingPartners.topExportDestinations.slice(0, 5).map((country) => (
                            <div key={country.country} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{country.country}</span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">${country.value}M</span>
                                <span className="text-xs text-green-500">{country.change}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Foreign Direct Investment
                      </h2>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total FDI</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">${financialData.foreignDirectInvestment.total.value}M</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">YoY Change</p>
                            <p className={`text-lg font-semibold ${financialData.foreignDirectInvestment.total.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                              {financialData.foreignDirectInvestment.total.change}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Last updated: {financialData.foreignDirectInvestment.total.lastUpdated}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                            FDI by Country
                          </h3>
                          
                          <div className="space-y-2">
                            {financialData.foreignDirectInvestment.bySource.slice(0, 5).map((country) => (
                              <div key={country.country} className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 dark:text-gray-300">{country.country}</span>
                                <div className="flex items-center">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">{country.percentage}%</span>
                                  <span className="text-xs text-green-500">{country.change}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                            FDI by Sector
                          </h3>
                          
                          <div className="space-y-2">
                            {financialData.foreignDirectInvestment.bySector.slice(0, 5).map((sector) => (
                              <div key={sector.sector} className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 dark:text-gray-300">{sector.sector}</span>
                                <div className="flex items-center">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">{sector.percentage}%</span>
                                  <span className="text-xs text-green-500">{sector.change}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="infrastructure" className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Infrastructure Development
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Infrastructure data visualization content will be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Download the Data
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Access the complete dataset for your research, analysis, or application development needs.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-zambia-600 hover:bg-zambia-700">
                <ArrowDown size={16} className="mr-2" />
                CSV Format
              </Button>
              
              <Button variant="outline">
                <ArrowDown size={16} className="mr-2" />
                JSON Format
              </Button>
              
              <Button variant="outline">
                <ArrowDown size={16} className="mr-2" />
                Excel Format
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
