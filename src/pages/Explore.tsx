import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MapChart from "@/components/charts/MapChart";
import FinanceOverview from "@/components/finance/FinanceOverview";
import AgricultureDashboard from "@/components/agriculture/AgricultureDashboard";
import { provinces, dataCategories, timePeriods, healthMetrics, educationMetrics, historicalData, economicSectors } from "@/utils/data";
import { LineChart } from "@/components/charts/LineChart";

const Explore = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activePeriod, setActivePeriod] = useState("1yr");
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-zambia-600 to-blue-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Explore Zambia's Data
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Interactive visualizations and comprehensive datasets from across the nation
              </p>
              
              <div className="bg-white/20 backdrop-blur-sm p-1 rounded-full inline-flex">
                <Tabs
                  value={activePeriod}
                  onValueChange={setActivePeriod}
                  className="inline-flex"
                >
                  <TabsList className="bg-transparent">
                    {timePeriods.map(period => (
                      <TabsTrigger 
                        key={period.id}
                        value={period.id}
                        className="data-[state=active]:bg-white data-[state=active]:text-zambia-600 text-white"
                      >
                        {period.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-subtle border border-gray-200 dark:border-gray-700 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Data Categories
                  </h2>
                  
                  <Tabs
                    orientation="vertical"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="flex flex-col items-start space-y-1 bg-transparent">
                      {dataCategories.map(category => (
                        <TabsTrigger 
                          key={category.id}
                          value={category.id}
                          className="w-full justify-start px-3 py-2 data-[state=active]:bg-zambia-50 data-[state=active]:text-zambia-700 dark:data-[state=active]:bg-zambia-950 dark:data-[state=active]:text-zambia-300"
                        >
                          {category.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-9">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-8 shadow-subtle border border-gray-200 dark:border-gray-700">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsContent value="overview" className="mt-0">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Zambia Overview Map
                      </h2>
                      
                      <div className="h-[600px] w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden mb-8">
                        <MapChart provinces={provinces} />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {provinces.map(province => (
                          <div 
                            key={province.id}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {province.name}
                            </h3>
                            <div className="flex flex-col space-y-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
                              <div className="flex justify-between">
                                <span>Population:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{province.population}M</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Capital:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{province.capital}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>GDP:</span>
                                <span className="font-medium text-gray-900 dark:text-white">${province.gdp}B</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Literacy:</span>
                                <span className="font-medium text-gray-900 dark:text-white">{province.literacy}%</span>
                              </div>
                            </div>
                            <a 
                              href={`/province/${province.id}`}
                              className="inline-block w-full text-center py-2 bg-zambia-50 hover:bg-zambia-100 text-zambia-700 font-medium rounded-lg transition-colors dark:bg-zambia-900 dark:hover:bg-zambia-800 dark:text-zambia-300"
                            >
                              View Details
                            </a>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="health" className="mt-0">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Health Metrics
                      </h2>
                      
                      <div className="space-y-8">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Infant Mortality Rate (per 1,000 live births)
                          </h3>
                          
                          <div className="w-full overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Province</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Rate</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Visualization</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {healthMetrics.infantMortality.map(item => (
                                  <tr key={item.province} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.province}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.value}</td>
                                    <td className="px-4 py-3">
                                      <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div 
                                          className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                                          style={{ width: `${(item.value / 40) * 100}%` }}
                                        ></div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Life Expectancy (years)
                          </h3>
                          
                          <div className="w-full overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Province</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Years</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Visualization</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {healthMetrics.lifeExpectancy.map(item => (
                                  <tr key={item.province} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.province}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.value}</td>
                                    <td className="px-4 py-3">
                                      <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div 
                                          className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                                          style={{ width: `${(item.value / 75) * 100}%` }}
                                        ></div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Access to Healthcare (%)
                          </h3>
                          
                          <div className="w-full overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Province</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Percentage</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Visualization</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {healthMetrics.accessToHealthcare.map(item => (
                                  <tr key={item.province} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.province}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.value}%</td>
                                    <td className="px-4 py-3">
                                      <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div 
                                          className="absolute top-0 left-0 h-full bg-purple-500 rounded-full"
                                          style={{ width: `${item.value}%` }}
                                        ></div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="education" className="mt-0">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Education Metrics
                      </h2>
                      
                      <div className="space-y-8">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Primary School Enrollment (%)
                          </h3>
                          
                          <div className="w-full overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Province</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Percentage</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Visualization</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {educationMetrics.primaryEnrollment.map(item => (
                                  <tr key={item.province} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.province}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.value}%</td>
                                    <td className="px-4 py-3">
                                      <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div 
                                          className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                                          style={{ width: `${item.value}%` }}
                                        ></div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Secondary School Enrollment (%)
                          </h3>
                          
                          <div className="w-full overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Province</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Percentage</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Visualization</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {educationMetrics.secondaryEnrollment.map(item => (
                                  <tr key={item.province} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.province}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.value}%</td>
                                    <td className="px-4 py-3">
                                      <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div 
                                          className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                                          style={{ width: `${item.value}%` }}
                                        ></div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Tertiary Education Enrollment (%)
                          </h3>
                          
                          <div className="w-full overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Province</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Percentage</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Visualization</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {educationMetrics.tertiaryEnrollment.map(item => (
                                  <tr key={item.province} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.province}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.value}%</td>
                                    <td className="px-4 py-3">
                                      <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div 
                                          className="absolute top-0 left-0 h-full bg-amber-500 rounded-full"
                                          style={{ width: `${(item.value / 35) * 100}%` }}
                                        ></div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="agriculture" className="mt-0">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Agriculture Statistics
                      </h2>
                      
                      <AgricultureDashboard />
                    </TabsContent>
                    
                    <TabsContent value="economy" className="mt-0">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Economic Indicators
                      </h2>
                      
                      <div className="mb-8">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            GDP Historical Trend (Billion USD)
                          </h3>
                          
                          <div className="h-80">
                            <LineChart
                              data={historicalData.gdp}
                              lines={[
                                { dataKey: "value", name: "GDP (Billion USD)", color: "#10b981" }
                              ]}
                              xAxisKey="year"
                              height={300}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Inflation Rate Historical Trend (%)
                          </h3>
                          
                          <div className="h-80">
                            <LineChart
                              data={historicalData.inflation}
                              lines={[
                                { dataKey: "value", name: "Inflation Rate (%)", color: "#f59e0b" }
                              ]}
                              xAxisKey="year"
                              height={300}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-8">
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Economic Sectors Contribution to GDP (%)
                          </h3>
                          
                          <div className="w-full overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Sector</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Percentage</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Year-over-Year</th>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Visualization</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {economicSectors.map(sector => (
                                  <tr key={sector.name} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{sector.name}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{sector.value}%</td>
                                    <td className="px-4 py-3 text-sm">
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        sector.isPositive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                      }`}>
                                        {sector.change}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3">
                                      <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div 
                                          className={`absolute top-0 left-0 h-full rounded-full ${
                                            sector.name === "Agriculture" ? "bg-green-500" :
                                            sector.name === "Mining" ? "bg-amber-500" :
                                            sector.name === "Manufacturing" ? "bg-blue-500" :
                                            sector.name === "Renewable Energy" ? "bg-teal-500" :
                                            sector.name === "Tourism" ? "bg-purple-500" :
                                            sector.name === "Construction" ? "bg-orange-500" :
                                            sector.name === "Transport" ? "bg-indigo-500" :
                                            "bg-gray-500"
                                          }`}
                                          style={{ width: `${sector.value}%` }}
                                        ></div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="finance" className="mt-0">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Financial Data
                      </h2>
                      
                      <FinanceOverview />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explore;
