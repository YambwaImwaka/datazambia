
import { useState, useEffect, useRef } from "react";
import { useMultipleCitiesWeather } from "@/services/WeatherService";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CloudRain, Sun, Wind, Droplets, CloudLightning, Cloud, Sunrise, CloudSnow, ThermometerSun } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from '@/components/ui/use-toast';

export const WeatherSection = () => {
  const cities = ["Lusaka", "Ndola", "Livingstone", "Kitwe", "Chipata"];
  const { weatherDataMap, loading, error } = useMultipleCitiesWeather(cities);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Show error toast once if there's an error
  useEffect(() => {
    if (error) {
      toast({
        title: "Weather data error",
        description: "Unable to fetch weather data. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error]);

  // Function to get appropriate weather icon
  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle') || lowerCondition.includes('shower')) {
      return <CloudRain className="h-12 w-12 text-blue-500" />;
    } else if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
      return <Sun className="h-12 w-12 text-amber-500" />;
    } else if (lowerCondition.includes('wind')) {
      return <Wind className="h-12 w-12 text-gray-500" />;
    } else if (lowerCondition.includes('humid') || lowerCondition.includes('mist') || lowerCondition.includes('fog')) {
      return <Droplets className="h-12 w-12 text-blue-300" />;
    } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return <CloudLightning className="h-12 w-12 text-purple-500" />;
    } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return <Cloud className="h-12 w-12 text-gray-400" />;
    } else if (lowerCondition.includes('snow')) {
      return <CloudSnow className="h-12 w-12 text-blue-200" />;
    } else {
      return <ThermometerSun className="h-12 w-12 text-amber-400" />;
    }
  };

  const getWeatherGradient = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle') || lowerCondition.includes('shower')) {
      return 'from-blue-500/10 to-blue-600/5 dark:from-blue-800/20 dark:to-blue-900/10';
    } else if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
      return 'from-amber-500/10 to-amber-600/5 dark:from-amber-800/20 dark:to-amber-900/10';
    } else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
      return 'from-purple-500/10 to-purple-600/5 dark:from-purple-800/20 dark:to-purple-900/10';
    } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return 'from-gray-300/10 to-gray-400/5 dark:from-gray-700/20 dark:to-gray-800/10';
    } else {
      return 'from-sky-300/10 to-sky-400/5 dark:from-sky-700/20 dark:to-sky-800/10';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section 
      className="py-24 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/30 dark:to-gray-900"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center space-x-2 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-4 py-2 rounded-full text-sm font-medium">
              <Sun size={16} />
              <span>Live Weather Updates</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Real-Time Weather Across Zambia
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay informed with current weather conditions in major cities across Zambia, 
            updated in real-time for your planning needs.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {loading ? (
            // Loading skeletons
            Array(5).fill(0).map((_, index) => (
              <Card key={`skeleton-${index}`} className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-6 w-24 mb-4" />
                  <Skeleton className="h-16 w-16 rounded-full mb-4" />
                  <Skeleton className="h-10 w-20 mb-3" />
                  <Skeleton className="h-4 w-36 mb-6" />
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Skeleton className="h-16 w-full rounded-lg" />
                    <Skeleton className="h-16 w-full rounded-lg" />
                  </div>
                </div>
              </Card>
            ))
          ) : error ? (
            <div className="col-span-full text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
              <CloudLightning className="h-12 w-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
              <p className="text-red-600 dark:text-red-400 font-medium text-lg mb-2">
                Error loading weather data
              </p>
              <p className="text-red-500/80 dark:text-red-400/80 text-sm">
                Please try again later or check your connection.
              </p>
            </div>
          ) : (
            cities.map((city, index) => {
              const cityData = weatherDataMap[city];
              return (
                <motion.div
                  key={city}
                  variants={cardVariants}
                >
                  <Card 
                    className={`p-6 bg-gradient-to-b ${cityData ? getWeatherGradient(cityData.current.condition.text) : 'from-gray-100 to-white dark:from-gray-800 dark:to-gray-900'} backdrop-blur-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative h-full`}
                  >
                    {cityData ? (
                      <div className="flex flex-col items-center relative z-10">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{city}</h3>
                        <div className="mb-2">
                          {getWeatherIcon(cityData.current.condition.text)}
                        </div>
                        <div className="mt-1 text-4xl font-bold text-gray-900 dark:text-white mb-1">
                          {cityData.current.temp_c}°C
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">{cityData.current.condition.text}</p>
                        
                        <div className="grid grid-cols-2 gap-3 w-full">
                          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg flex flex-col items-center">
                            <Wind className="h-5 w-5 text-gray-500 dark:text-gray-400 mb-1" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{cityData.current.wind_kph} km/h</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Wind</span>
                          </div>
                          
                          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg flex flex-col items-center">
                            <Droplets className="h-5 w-5 text-blue-500 dark:text-blue-400 mb-1" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{cityData.current.humidity}%</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Humidity</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                          <Sunrise className="h-3 w-3 mr-1" />
                          <span>Updated: {cityData.current.last_updated.split(' ')[1]}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Cloud className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4 opacity-50" />
                        <p className="text-gray-500 dark:text-gray-400 text-center">No data available for {city}</p>
                      </div>
                    )}
                    
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4">
                      <Cloud className="h-24 w-24 text-gray-400" />
                    </div>
                    <div className="absolute bottom-0 left-0 opacity-10 -translate-x-1/4 translate-y-1/4">
                      <CloudRain className="h-16 w-16 text-blue-500" />
                    </div>
                  </Card>
                </motion.div>
              );
            })
          )}
        </motion.div>
        
        <motion.div 
          className="max-w-xs mx-auto mt-8 text-center text-xs text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p>Weather data provided by WeatherAPI.com</p>
          <p className="mt-1">Last updated: {new Date().toLocaleTimeString()}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default WeatherSection;
