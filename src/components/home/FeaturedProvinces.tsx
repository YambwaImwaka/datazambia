
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Users, DollarSign, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { provinces } from "@/utils/data";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

export const FeaturedProvinces = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  // Get 3 featured provinces
  const featuredProvinces = provinces.slice(0, 3);
  
  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900"
      ref={containerRef}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
              <MapPin size={16} />
              <span>Provincial Data</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Provinces
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore detailed data insights for Zambia's key provinces and discover 
            their unique economic indicators, demographics, and development metrics.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {featuredProvinces.map((province) => (
            <motion.div
              key={province.id}
              variants={cardVariants}
            >
              <Card 
                className={cn(
                  "overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2",
                  "bg-white dark:bg-gray-800"
                )}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={province.image} 
                    alt={province.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-zambia-600 dark:text-zambia-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {province.name}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{province.name}</h3>
                    <div className="flex items-center text-white/90">
                      <Building size={16} className="mr-1" />
                      <p className="text-sm">Capital: {province.capital}</p>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <Users size={18} className="text-blue-500 dark:text-blue-400 mr-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">Population</p>
                      </div>
                      <p className="text-center text-xl font-bold text-gray-900 dark:text-white">{province.population}M</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <DollarSign size={18} className="text-green-500 dark:text-green-400 mr-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">GDP</p>
                      </div>
                      <p className="text-center text-xl font-bold text-gray-900 dark:text-white">${province.gdp}B</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-5 text-sm">
                    {province.description}
                  </p>
                  
                  <Link to={`/province/${province.id}`} className="block">
                    <Button 
                      variant="default" 
                      className="w-full justify-between bg-gradient-to-r from-zambia-500 to-zambia-600 hover:from-zambia-600 hover:to-zambia-700 text-white"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link to="/provinces">
            <Button 
              className="h-12 px-8 bg-gradient-to-r from-zambia-500 to-zambia-600 hover:from-zambia-600 hover:to-zambia-700 text-white rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1"
            >
              View All Provinces
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProvinces;
