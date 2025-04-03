import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, ArrowLeft, MapPin, Users, TrendingUp, Landmark, BarChart2 } from "lucide-react";
import { DataCard } from "@/components/ui/DataCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import { provinces, healthMetrics, educationMetrics, agricultureMetrics, historicalData } from "@/utils/data";
import PageLayout from "@/components/layout/PageLayout";

const ProvinceProfile = () => {
  const { provinceId } = useParams<{ provinceId: string }>();
  const [province, setProvince] = useState<typeof provinces[0] | undefined>(undefined);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Find province by ID
    const foundProvince = provinces.find(p => p.id === provinceId);
    setProvince(foundProvince);
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [provinceId]);

  if (!province && !isLoading) {
    return (
      <PageLayout>
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Province Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The province you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/">
              <Button className="bg-zambia-600 hover:bg-zambia-700">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout showHeader={false} fullWidth={true} className="pt-0">
      {/* Hero Section */}
      <section 
        className="relative h-80 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${province?.image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="max-w-4xl">
              <div className="flex items-center text-white/80 text-sm mb-2">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight size={16} className="mx-1" />
                <Link to="/provinces" className="hover:text-white transition-colors">Provinces</Link>
                <ChevronRight size={16} className="mx-1" />
                <span>{province?.name}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{province?.name} Province</h1>
              
              <div className="flex items-center text-white/90 mb-4">
                <MapPin size={16} className="mr-1" />
                <span>Capital: {province?.capital}</span>
              </div>
              
              <p className="text-white/80 max-w-2xl">
                {province?.description}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/provinces">
              <Button variant="ghost" className="pl-0 text-gray-600 hover:text-zambia-600">
                <ArrowLeft size={16} className="mr-2" />
                Back to All Provinces
              </Button>
            </Link>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <DataCard
              title="Population"
              value={`${province?.population}M`}
              change="+2.1%"
              isPositive={true}
              icon={<Users size={18} />}
            />
            
            <DataCard
              title="GDP"
              value={`$${province?.gdp}B`}
              change="+3.2%"
              isPositive={true}
              icon={<TrendingUp size={18} />}
            />
            
            <DataCard
              title="Literacy Rate"
              value={`${province?.literacy}%`}
              change="+1.5%"
              isPositive={true}
              icon={<BarChart2 size={18} />}
            />
            
            <DataCard
              title="Urbanization"
              value={`${province?.urbanization}%`}
              change="+2.3%"
              isPositive={true}
              icon={<Landmark size={18} />}
            />
          </div>
          
          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-subtle border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full border-b border-gray-200 dark:border-gray-700 p-0 h-auto">
                <div className="container flex overflow-x-auto">
                  <TabsTrigger 
                    value="overview" 
                    className="py-4 px-6 text-sm border-b-2 border-transparent data-[state=active]:border-zambia-600 rounded-none"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="health" 
                    className="py-4 px-6 text-sm border-b-2 border-transparent data-[state=active]:border-zambia-600 rounded-none"
                  >
                    Health
                  </TabsTrigger>
                  <TabsTrigger 
                    value="education" 
                    className="py-4 px-6 text-sm border-b-2 border-transparent data-[state=active]:border-zambia-600 rounded-none"
                  >
                    Education
                  </TabsTrigger>
                  <TabsTrigger 
                    value="agriculture" 
                    className="py-4 px-6 text-sm border-b-2 border-transparent data-[state=active]:border-zambia-600 rounded-none"
                  >
                    Agriculture
                  </TabsTrigger>
                  <TabsTrigger 
                    value="economy" 
                    className="py-4 px-6 text-sm border-b-2 border-transparent data-[state=active]:border-zambia-600 rounded-none"
                  >
                    Economy
                  </TabsTrigger>
                </div>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        About {province?.name} Province
                      </h2>
                      
                      <p className="text-gray-600 dark:text-gray-300">
                        {province?.description} With a population of {province?.population} million people, {province?.name} Province is one of the key regions in Zambia, contributing to the nation's growth and development.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Capital</h3>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{province?.capital}</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">GDP Contribution</h3>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">{Math.round((province?.gdp || 0) / 25.5 * 100)}% of national GDP</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Historical Trends
                      </h2>
                      
                      <LineChart
                        data={historicalData.gdp}
                        lines={[
                          { dataKey: "value", name: "National GDP (Billion USD)", color: "#0ea5e9" }
                        ]}
                        xAxisKey="year"
                        height={300}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="health">
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Health Indicators
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Infant Mortality Rate
                          </h3>
                          
                          <BarChart
                            data={healthMetrics.infantMortality.slice(0, 5)}
                            bars={[
                              { dataKey: "value", name: "per 1,000 live births", color: "#0ea5e9" }
                            ]}
                            xAxisKey="province"
                            height={300}
                          />
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Life Expectancy
                          </h3>
                          
                          <BarChart
                            data={healthMetrics.lifeExpectancy.slice(0, 5)}
                            bars={[
                              { dataKey: "value", name: "Years", color: "#10b981" }
                            ]}
                            xAxisKey="province"
                            height={300}
                          />
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Access to Healthcare
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          Percentage of population with access to healthcare facilities within 5km.
                        </p>
                        
                        <BarChart
                          data={healthMetrics.accessToHealthcare}
                          bars={[
                            { dataKey: "value", name: "Access (%)", color: "#6366f1" }
                          ]}
                          xAxisKey="province"
                          height={300}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="education">
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Education Statistics
                    </h2>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Enrollment Rates by Education Level
                        </h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                              Primary Education
                            </h4>
                            <p className="text-4xl font-bold text-zambia-600">
                              {educationMetrics.primaryEnrollment.find(p => p.province === province?.name)?.value}%
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Enrollment rate
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                              Secondary Education
                            </h4>
                            <p className="text-4xl font-bold text-zambia-600">
                              {educationMetrics.secondaryEnrollment.find(p => p.province === province?.name)?.value}%
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Enrollment rate
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                              Tertiary Education
                            </h4>
                            <p className="text-4xl font-bold text-zambia-600">
                              {educationMetrics.tertiaryEnrollment.find(p => p.province === province?.name)?.value}%
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Enrollment rate
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Primary Enrollment Comparison
                          </h3>
                          
                          <BarChart
                            data={educationMetrics.primaryEnrollment.slice(0, 5)}
                            bars={[
                              { dataKey: "value", name: "Enrollment (%)", color: "#8b5cf6" }
                            ]}
                            xAxisKey="province"
                            height={300}
                          />
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Secondary Enrollment Comparison
                          </h3>
                          
                          <BarChart
                            data={educationMetrics.secondaryEnrollment.slice(0, 5)}
                            bars={[
                              { dataKey: "value", name: "Enrollment (%)", color: "#ec4899" }
                            ]}
                            xAxisKey="province"
                            height={300}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="agriculture">
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Agricultural Production
                    </h2>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Crop Production (Thousand Metric Tons)
                        </h3>
                        
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
                              {agricultureMetrics.cropProduction.map((item, index) => (
                                <tr 
                                  key={index}
                                  className={`border-b border-gray-100 dark:border-gray-800 ${item.province === province?.name ? 'bg-zambia-50 dark:bg-zambia-900/10' : ''}`}
                                >
                                  <td className="p-3 font-medium">
                                    {item.province}
                                    {item.province === province?.name && (
                                      <span className="ml-2 text-xs py-0.5 px-1.5 bg-zambia-100 text-zambia-700 rounded">Current</span>
                                    )}
                                  </td>
                                  <td className="p-3 text-center">{item.maize}</td>
                                  <td className="p-3 text-center">{item.cassava}</td>
                                  <td className="p-3 text-center">{item.sorghum}</td>
                                  <td className="p-3 text-center">{item.rice}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Livestock (Thousand Heads)
                        </h3>
                        
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
                              {agricultureMetrics.livestock.map((item, index) => (
                                <tr 
                                  key={index}
                                  className={`border-b border-gray-100 dark:border-gray-800 ${item.province === province?.name ? 'bg-zambia-50 dark:bg-zambia-900/10' : ''}`}
                                >
                                  <td className="p-3 font-medium">
                                    {item.province}
                                    {item.province === province?.name && (
                                      <span className="ml-2 text-xs py-0.5 px-1.5 bg-zambia-100 text-zambia-700 rounded">Current</span>
                                    )}
                                  </td>
                                  <td className="p-3 text-center">{item.cattle}</td>
                                  <td className="p-3 text-center">{item.goats}</td>
                                  <td className="p-3 text-center">{item.pigs}</td>
                                  <td className="p-3 text-center">{item.poultry}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="economy">
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Economic Indicators
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            GDP Contribution by Sector
                          </h3>
                          
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Agriculture</span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">42%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mining</span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">28%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Services</span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">22%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Manufacturing</span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">8%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Employment by Sector
                          </h3>
                          
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Agriculture</span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">54%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '54%' }}></div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mining</span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">12%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Services</span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">28%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Manufacturing</span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">6%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '6%' }}></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Economic Growth Trends
                        </h3>
                        
                        <LineChart
                          data={historicalData.gdp}
                          lines={[
                            { dataKey: "value", name: "GDP (Billion USD)", color: "#0ea5e9" }
                          ]}
                          xAxisKey="year"
                          height={300}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Related Provinces Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Explore Other Provinces
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {provinces.filter(p => p.id !== provinceId).slice(0, 3).map((relatedProvince) => (
              <Card 
                key={relatedProvince.id}
                className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={relatedProvince.image} 
                    alt={relatedProvince.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {relatedProvince.name} Province
                  </h3>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Capital: {relatedProvince.capital}
                  </p>
                  
                  <Link to={`/province/${relatedProvince.id}`}>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                    >
                      View Profile
                      <ChevronRight size={16} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProvinceProfile;
