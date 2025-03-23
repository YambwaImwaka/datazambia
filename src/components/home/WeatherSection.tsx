
import { useState, useEffect } from "react";
import { useMultipleCitiesWeather } from "@/services/WeatherService";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CloudRain, Sun, Wind, Droplets, TerminalSquare } from "lucide-react";

export const WeatherSection = () => {
  const cities = ["Lusaka", "Ndola", "Livingstone", "Kitwe", "Chipata"];
  const { weatherDataMap, loading, error } = useMultipleCitiesWeather(cities);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to get appropriate weather icon
  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle') || lowerCondition.includes('shower')) {
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    } else if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
      return <Sun className="h-8 w-8 text-amber-500" />;
    } else if (lowerCondition.includes('wind')) {
      return <Wind className="h-8 w-8 text-gray-500" />;
    } else if (lowerCondition.includes('humid') || lowerCondition.includes('mist') || lowerCondition.includes('fog')) {
      return <Droplets className="h-8 w-8 text-blue-300" />;
    } else {
      return <TerminalSquare className="h-8 w-8 text-gray-400" />;
    }
  };

  return (
    <section 
      className="py-16 bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950"
      style={{ 
        opacity: 0,
        animation: isVisible ? "fade-in 0.8s ease-out forwards" : "none"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real-Time Weather Across Zambia
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Current conditions in major cities
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {loading ? (
            // Loading skeletons
            Array(5).fill(0).map((_, index) => (
              <Card key={`skeleton-${index}`} className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-6 w-24 mb-3" />
                  <Skeleton className="h-12 w-12 rounded-full mb-3" />
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-36 mb-4" />
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </Card>
            ))
          ) : error ? (
            <div className="col-span-full text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <p className="text-red-600 dark:text-red-400">
                Error loading weather data. Please try again later.
              </p>
            </div>
          ) : (
            cities.map((city, index) => {
              const cityData = weatherDataMap[city];
              return (
                <Card 
                  key={city}
                  className="p-5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  style={{ 
                    opacity: 0,
                    animation: isVisible ? `fade-in 0.5s ease-out ${index * 0.1 + 0.2}s forwards` : "none"
                  }}
                >
                  {cityData ? (
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{city}</h3>
                      {getWeatherIcon(cityData.current.condition.text)}
                      <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        {cityData.current.temp_c}°C
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{cityData.current.condition.text}</p>
                      <div className="grid grid-cols-2 gap-2 w-full text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Wind className="h-4 w-4 mr-1" />
                          <span>{cityData.current.wind_kph} km/h</span>
                        </div>
                        <div className="flex items-center">
                          <Droplets className="h-4 w-4 mr-1" />
                          <span>{cityData.current.humidity}%</span>
                        </div>
                        <div className="flex items-center">
                          <CloudRain className="h-4 w-4 mr-1" />
                          <span>{cityData.current.precip_mm} mm</span>
                        </div>
                        <div className="text-xs text-right">
                          <span>Updated: {cityData.current.last_updated.split(' ')[1]}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center h-full justify-center">
                      <p className="text-gray-500 dark:text-gray-400">No data available for {city}</p>
                    </div>
                  )}
                </Card>
              );
            })
          )}
        </div>
        
        <div className="max-w-xs mx-auto mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Weather data provided by WeatherAPI.com</p>
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </section>
  );
};

export default WeatherSection;
