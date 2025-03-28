import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Landmark, ChevronRight, Database, Globe } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import KeyMetrics from "@/components/home/KeyMetrics";
import FeaturedProvinces from "@/components/home/FeaturedProvinces";
import LineChart from "@/components/charts/LineChart";
import WeatherSection from "@/components/home/WeatherSection";
import { historicalData, provinces } from "@/utils/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDevelopmentIndicator, WORLD_BANK_INDICATORS } from "@/services/DataService";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const localGdpData = historicalData.gdp.map(item => ({
    year: item.year,
    value: item.value
  }));
  
  const localPopulationData = historicalData.population.map(item => ({
    year: item.year,
    value: item.value
  }));
  
  const [isDataLoading, setIsDataLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <WeatherSection />
        
        <KeyMetrics />
        
        <FeaturedProvinces />
        
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Data Insights
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Explore Zambia's development through various indicators and metrics
              </p>
            </div>
            
            <Tabs 
              defaultValue="overview" 
              className="w-full" 
              onValueChange={setActiveTab}
            >
              <div className="flex justify-center mb-8">
                <TabsList className="bg-gray-100 dark:bg-gray-800 p-1">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="economic" 
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Economic
                  </TabsTrigger>
                  <TabsTrigger 
                    value="social" 
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Social
                  </TabsTrigger>
                  <TabsTrigger 
                    value="environmental" 
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Environmental
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="overview" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-subtle border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      Population Growth
                    </h3>
                    {isDataLoading ? (
                      <Skeleton className="w-full h-[300px]" />
                    ) : (
                      <LineChart
                        data={localPopulationData}
                        lines={[
                          { dataKey: "value", name: "Annual Growth (%)", color: "#0ea5e9" }
                        ]}
                        xAxisKey="year"
                        height={300}
                      />
                    )}
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      Source: Zambia Statistics Agency
                    </div>
                  </Card>
                  
                  <Card className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-subtle border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      GDP Per Capita
                    </h3>
                    {isDataLoading ? (
                      <Skeleton className="w-full h-[300px]" />
                    ) : (
                      <LineChart
                        data={localGdpData}
                        lines={[
                          { dataKey: "value", name: "USD", color: "#10b981" }
                        ]}
                        xAxisKey="year"
                        height={300}
                      />
                    )}
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      Source: Zambia Statistics Agency
                    </div>
                  </Card>
                </div>
                
                <div className="mt-8 text-center">
                  <Link to="/explore">
                    <Button
                      variant="outline" 
                      className="h-11 px-6 border-zambia-300 hover:border-zambia-500 text-zambia-600 hover:text-zambia-700 rounded-full shadow-subtle hover:shadow-elevated transform transition-all duration-300 hover:-translate-y-1"
                    >
                      Explore More Data
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="economic" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      <Landmark className="h-6 w-6 text-zambia-500 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Banking & Finance
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Explore financial indicators, exchange rates, and banking metrics across Zambia.
                    </p>
                    <Link to="/explore/finance" className="text-zambia-600 hover:text-zambia-700 font-medium flex items-center">
                      View Details
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </Card>
                  
                  <Card className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      <Globe className="h-6 w-6 text-zambia-500 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Trade & Investment
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Analyze trade flows, foreign direct investments, and economic partnerships.
                    </p>
                    <Link to="/explore/trade" className="text-zambia-600 hover:text-zambia-700 font-medium flex items-center">
                      View Details
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </Card>
                  
                  <Card className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      <Database className="h-6 w-6 text-zambia-500 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Industry Analysis
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Discover performance metrics across various industry sectors in Zambia.
                    </p>
                    <Link to="/explore/industry" className="text-zambia-600 hover:text-zambia-700 font-medium flex items-center">
                      View Details
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="social" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Education Metrics
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Literacy Rate</span>
                        <span className="font-medium text-gray-900 dark:text-white">86.7%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Primary School Enrollment</span>
                        <span className="font-medium text-gray-900 dark:text-white">94.2%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Secondary School Enrollment</span>
                        <span className="font-medium text-gray-900 dark:text-white">68.5%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Tertiary Education</span>
                        <span className="font-medium text-gray-900 dark:text-white">23.1%</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link to="/explore/education" className="text-zambia-600 hover:text-zambia-700 font-medium flex items-center">
                        View More Education Data
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </Card>
                  
                  <Card className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Healthcare Indicators
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Life Expectancy</span>
                        <span className="font-medium text-gray-900 dark:text-white">63.5 years</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Infant Mortality Rate</span>
                        <span className="font-medium text-gray-900 dark:text-white">42.7 per 1,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Healthcare Access</span>
                        <span className="font-medium text-gray-900 dark:text-white">67.3%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Vaccination Coverage</span>
                        <span className="font-medium text-gray-900 dark:text-white">76.8%</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link to="/explore/health" className="text-zambia-600 hover:text-zambia-700 font-medium flex items-center">
                        View More Health Data
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="environmental" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Environmental Indicators
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Biodiversity</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Zambia hosts over 8,017 species of plants, 224 mammal species, and 757 bird species, with 4 national parks designated as UNESCO World Heritage sites.
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Forest Coverage</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Forests cover approximately 60% of Zambia's total land area, though deforestation occurs at a rate of 0.5% annually due to agriculture and charcoal production.
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Water Resources</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          The country possesses 40% of Central and Southern Africa's water resources, with the Zambezi River Basin being crucial for hydropower generation and agriculture.
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Climate Change</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Zambia has experienced a 1.3°C increase in temperature since 1960, with more frequent droughts and floods affecting agriculture and water availability.
                        </p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Sustainable Development
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Renewable Energy</span>
                        <span className="font-medium text-gray-900 dark:text-white">85.9%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Clean Water Access</span>
                        <span className="font-medium text-gray-900 dark:text-white">72.3%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">CO₂ Emissions</span>
                        <span className="font-medium text-gray-900 dark:text-white">0.2 tons per capita</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Protected Areas</span>
                        <span className="font-medium text-gray-900 dark:text-white">37.8%</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link to="/explore/environment" className="text-zambia-600 hover:text-zambia-700 font-medium flex items-center">
                        View Environmental Data
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Explore Zambia's Provinces
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Discover detailed information and statistics for each province
                  </p>
                </div>
                <Link to="/provinces">
                  <Button 
                    className="h-11 px-6 bg-zambia-600 hover:bg-zambia-700 text-white rounded-full shadow-subtle hover:shadow-elevated transform transition-all duration-300 hover:-translate-y-1"
                  >
                    View All Provinces
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {provinces.slice(0, 4).map(province => (
                  <Link key={province.id} to={`/province/${province.id}`}>
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                      <div className="relative h-48">
                        <img 
                          src={province.image} 
                          alt={province.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white">{province.name}</h3>
                          <p className="text-sm text-white/80">Capital: {province.capital}</p>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Population</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{province.population}M</p>
                          </div>
                          
                          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="text-xs text-gray-500 dark:text-gray-400">GDP</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">${province.gdp}B</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-r from-zambia-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Explore the Rich Data of Zambia's Provinces
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Dive into comprehensive datasets, interactive visualizations, and insightful analyses
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/explore"
                className="inline-flex items-center justify-center h-12 px-8 bg-white text-zambia-600 font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Exploring
              </Link>
              <Link 
                to="/about"
                className="inline-flex items-center justify-center h-12 px-8 bg-transparent border-2 border-white text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
