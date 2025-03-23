
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import KeyMetrics from "@/components/home/KeyMetrics";
import FeaturedProvinces from "@/components/home/FeaturedProvinces";
import LineChart from "@/components/charts/LineChart";
import WeatherSection from "@/components/home/WeatherSection";
import { historicalData } from "@/utils/data";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Real-time Weather Section */}
        <WeatherSection />
        
        {/* Key Metrics Section */}
        <KeyMetrics />
        
        {/* Featured Provinces Section */}
        <FeaturedProvinces />
        
        {/* Data Trends Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Data Trends Over Time
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Visualizing Zambia's progress across key metrics
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-subtle border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
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
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-subtle border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
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
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
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
