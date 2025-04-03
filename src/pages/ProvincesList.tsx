
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { MapChart } from '@/components/charts/MapChart';
import { provinces } from '@/utils/data';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import PageLayout from '@/components/layout/PageLayout';

const ProvincesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Format data for map visualization
  const provinceMapData = provinces.map(province => ({
    id: province.id,
    name: province.name,
    value: province.population,
    coordinates: province.coordinates as [number, number],
    color: getRandomColor(province.name)
  }));
  
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
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Provinces of Zambia
        </h1>
        
        <div className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Interactive Map
          </h2>
          <div className="h-[500px]">
            <MapChart 
              data={provinceMapData}
              title="Zambia Provinces"
              colorScale={['#C6E5FF', '#66B2FF', '#0066CC', '#003366']}
              tooltipFormat={(name, value) => `${name}: ${value}M population`}
              onClick={(provinceId) => navigate(`/province/${provinceId}`)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array(9).fill(0).map((_, i) => (
              <Card key={`skeleton-${i}`} className="overflow-hidden h-[400px]">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-5">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
          ) : (
            provinces.map(province => (
              <Card 
                key={province.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={province.image} 
                    alt={province.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{province.name}</h3>
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <span className="font-semibold">Capital:</span> {province.capital}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <span className="font-semibold">Population:</span> {province.population} million
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {province.description}
                  </p>
                </CardContent>
                
                <CardFooter>
                  <Link 
                    to={`/province/${province.id}`} 
                    className="w-full"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full justify-between hover:bg-zambia-50 hover:text-zambia-600 border border-gray-200 dark:border-gray-700"
                    >
                      View Details
                      <ChevronRight size={16} />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ProvincesList;
