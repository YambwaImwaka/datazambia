
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { provinces } from "@/utils/data";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";

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

  return (
    <section 
      className="py-20 bg-gray-50 dark:bg-gray-800"
      ref={containerRef}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            style={{ 
              opacity: 0,
              animation: isVisible ? "fade-in 0.5s ease-out forwards" : "none"
            }}
          >
            Featured Provinces
          </h2>
          <p 
            className="text-lg text-gray-600 dark:text-gray-300"
            style={{ 
              opacity: 0,
              animation: isVisible ? "fade-in 0.5s ease-out 0.2s forwards" : "none"
            }}
          >
            Explore detailed data insights for Zambia's key provinces
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProvinces.map((province, index) => (
            <Card 
              key={province.id}
              className={cn(
                "overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl shadow-subtle hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2",
                "bg-white dark:bg-gray-900"
              )}
              style={{ 
                opacity: 0,
                animation: isVisible ? `fade-in 0.5s ease-out ${0.3 + index * 0.1}s forwards` : "none"
              }}
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
                  <p className="text-sm text-white/80">Capital: {province.capital}</p>
                </div>
              </div>
              
              <CardContent className="p-5">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Population</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{province.population}M</p>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">GDP</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">${province.gdp}B</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                  {province.description}
                </p>
                
                <Link to={`/province/${province.id}`}>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between hover:bg-zambia-50 hover:text-zambia-600 border border-gray-200 dark:border-gray-700"
                  >
                    View Details
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div 
          className="text-center mt-12"
          style={{ 
            opacity: 0,
            animation: isVisible ? "fade-in 0.5s ease-out 0.7s forwards" : "none"
          }}
        >
          <Link to="/provinces">
            <Button 
              className="h-11 px-6 bg-zambia-600 hover:bg-zambia-700 text-white rounded-full shadow-subtle hover:shadow-elevated transform transition-all duration-300 hover:-translate-y-1"
            >
              View All Provinces
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProvinces;
