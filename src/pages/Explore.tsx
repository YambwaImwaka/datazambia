
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { provinces, dataCategories } from '@/utils/data';
import AgricultureMain from '@/components/agriculture/AgricultureMain';
import FinanceOverview from '@/components/finance/FinanceOverview';
import EconomyDashboard from '@/components/economy/EconomyDashboard';
import HealthDashboard from '@/components/health/HealthDashboard';
import SocialData from '@/pages/explore/SocialData';
import { ArrowUpRight } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

const Explore = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(categoryId);
  const navigate = useNavigate();
  
  useEffect(() => {
    setCurrentCategory(categoryId);
  }, [categoryId]);

  // Get current category details for SEO
  const currentCategoryDetails = dataCategories.find(cat => cat.id === currentCategory);
  const pageTitle = currentCategoryDetails 
    ? `${currentCategoryDetails.name} Data | Zambia Insight`
    : "Explore Zambian Provinces & Data";
  const pageDescription = currentCategoryDetails
    ? currentCategoryDetails.description
    : "Discover comprehensive data and insights across Zambia's provinces. Explore economic indicators, agriculture, health, and more.";

  // Determine which dashboard to show based on the category
  const renderDashboard = () => {
    if (currentCategory === "agriculture") {
      return <AgricultureMain />;
    } else if (currentCategory === "finance") {
      return <FinanceOverview />;
    } else if (currentCategory === "economy") {
      return <EconomyDashboard />;
    } else if (currentCategory === "health") {
      return <HealthDashboard />;
    } else if (currentCategory === "social") {
      return <SocialData />;
    } else if (currentCategory === "education") {
      return <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Education Metrics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Comprehensive education statistics and insights across Zambia.</p>
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
          <p className="text-lg">Education metrics dashboard is coming soon.</p>
        </div>
      </div>;
    } else {
      // Default case - show the province cards without the map
      return (
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Explore Zambia</h1>
          
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

  return (
    <PageLayout
      title={pageTitle}
      description={pageDescription}
      canonicalUrl={`https://datazambia.com/explore${currentCategory ? `/${currentCategory}` : ''}`}
    >
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
    </PageLayout>
  );
};

export default Explore;
