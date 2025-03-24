import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapChart } from '@/components/charts/MapChart';
import { provinces, dataCategories } from '@/utils/data';
import AgricultureDashboard from '@/components/agriculture/AgricultureDashboard';
import FinanceOverview from '@/components/finance/FinanceOverview';
import EconomyDashboard from '@/components/economy/EconomyDashboard';
import { ArrowUpRight } from 'lucide-react';

const Explore = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(categoryId);
  const navigate = useNavigate();
  
  useEffect(() => {
    setCurrentCategory(categoryId);
  }, [categoryId]);

  // Determine which dashboard to show based on the category
  const renderDashboard = () => {
    if (currentCategory === "agriculture") {
      return <AgricultureDashboard />;
    } else if (currentCategory === "finance") {
      return <FinanceOverview />;
    } else if (currentCategory === "economy") {
      return <EconomyDashboard />;
    } else if (currentCategory === "health") {
      return <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Health Metrics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Comprehensive health statistics and insights across Zambia.</p>
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <p className="text-lg">Health metrics dashboard is coming soon.</p>
        </div>
      </div>;
    } else if (currentCategory === "education") {
      return <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Education Metrics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Comprehensive education statistics and insights across Zambia.</p>
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <p className="text-lg">Education metrics dashboard is coming soon.</p>
        </div>
      </div>;
    } else {
      // Default case - show the province map
      // Transform the data for the MapChart component
      const provinceMapData = provinces.map(province => ({
        id: province.id,
        name: province.name,
        value: province.population, // Using population as the value
        coordinates: province.coordinates as [number, number],
        color: getRandomColor(province.name) // Generate a color based on province name
      }));

      return (
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Explore Zambia</h1>
          
          <div className="mb-8">
            <MapChart 
              data={provinceMapData}
              title="Population Distribution by Province"
              colorScale={['#C6E5FF', '#66B2FF', '#0066CC', '#003366']}
              tooltipFormat={(name, value) => `${name}: ${value}M population`}
              onClick={(provinceId) => navigate(`/province/${provinceId}`)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {provinces.map(province => (
              <div 
                key={province.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/province/${province.id}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={province.image} 
                    alt={province.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="p-4 text-white">
                      <h2 className="text-2xl font-bold">{province.name} Province</h2>
                      <p className="flex items-center">
                        <span className="mr-2">Population: {province.population}M</span>
                        <span className="mr-2">|</span>
                        <span>Capital: {province.capital}</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{province.description}</p>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Key Industries</h3>
                    <div className="flex flex-wrap gap-2">
                      {province.keyIndustries.map((industry, index) => (
                        <span 
                          key={index} 
                          className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Major Exports</h3>
                    <div className="flex flex-wrap gap-2">
                      {province.majorExports.map((export_, index) => (
                        <span 
                          key={index} 
                          className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs px-2 py-1 rounded"
                        >
                          {export_}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Tourist Attractions</h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                      {province.touristAttractions.map((attraction, index) => (
                        <li key={index}>{attraction}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    to={`/province/${province.id}`}
                    className="inline-flex items-center mt-2 text-zambia-600 hover:text-zambia-700 font-medium"
                  >
                    View Province Details
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  // Generate a deterministic color based on province name
  function getRandomColor(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentCategory 
              ? dataCategories.find(cat => cat.id === currentCategory)?.name || "Explore Data" 
              : "Explore Zambia"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {currentCategory 
              ? dataCategories.find(cat => cat.id === currentCategory)?.description || "Explore detailed insights" 
              : "Discover insights across Zambia's provinces and sectors"}
          </p>
        </div>
        
        {/* Category selection */}
        <div className="flex flex-wrap gap-3 mb-8">
          {dataCategories.map(category => (
            <Link 
              key={category.id}
              to={`/explore/${category.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentCategory === category.id 
                  ? 'bg-zambia-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
        
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Explore;
