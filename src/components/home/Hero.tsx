
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search, MapPin, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { provinces } from "@/utils/data";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<typeof provinces>([]);
  const [showResults, setShowResults] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = provinces.filter(province => 
      province.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    
    setSearchResults(filtered);
    setShowResults(true);
  }, [searchValue]);

  const handleProvinceClick = (provinceId: string) => {
    navigate(`/province/${provinceId}`);
    setShowResults(false);
    setSearchValue("");
  };

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-zambia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-br from-zambia-400 to-zambia-500 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-tl from-blue-300 to-blue-400 rounded-full filter blur-3xl animate-float-slow" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-tr from-yellow-300 to-amber-400 rounded-full filter blur-3xl animate-float-medium" style={{ animationDelay: "0.8s" }}></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-16 w-32 h-32 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rotate-12"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 rounded-full border border-gray-200 dark:border-gray-700 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm"></div>
        <div className="absolute top-1/3 right-24 w-24 h-24 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm -rotate-12"></div>
      </div>
      
      <motion.div 
        className="container relative z-10 px-4 py-12 md:py-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
              Discover <span className="text-gradient bg-gradient-to-r from-zambia-500 to-blue-600 bg-clip-text text-transparent">Zambia</span> Through Data
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Explore comprehensive data insights across all provinces of Zambia. From economic indicators to health metrics, understand the nation through numbers.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="relative mb-10"
          >
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="search"
                placeholder="Search for a province..."
                className="w-full h-14 pl-14 pr-4 rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-zambia-400 shadow-md hover:shadow-lg focus:shadow-lg transition-all duration-300"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
              />
              <Search
                size={20}
                className="absolute top-1/2 left-5 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            {showResults && (
              <div className="absolute z-20 top-16 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {searchResults.length > 0 ? (
                  <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                    {searchResults.map((province) => (
                      <li 
                        key={province.id}
                        className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => handleProvinceClick(province.id)}
                      >
                        <div className="flex items-center p-4">
                          <div className="mr-4 p-2 rounded-full bg-zambia-50 dark:bg-gray-700">
                            <MapPin size={18} className="text-zambia-500 dark:text-zambia-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-medium text-gray-900 dark:text-white">
                              {province.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Capital: {province.capital}
                            </p>
                          </div>
                          <ArrowRight size={16} className="text-gray-400" />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No provinces found matching your search.
                  </div>
                )}
              </div>
            )}
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/explore">
              <Button 
                className="h-14 px-8 bg-gradient-to-r from-zambia-500 to-zambia-600 hover:from-zambia-600 hover:to-zambia-700 text-white rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 text-lg"
              >
                Explore Data
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            
            <Link to="/provinces">
              <Button 
                variant="outline" 
                className="h-14 px-8 border-2 border-gray-300 dark:border-gray-600 hover:border-zambia-400 dark:hover:border-zambia-500 text-gray-700 dark:text-gray-200 rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 text-lg"
              >
                <MapPin size={18} className="mr-2" />
                View Provinces
              </Button>
            </Link>
          </motion.div>
          
          {/* Feature highlights */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="rounded-full w-12 h-12 bg-zambia-100 dark:bg-zambia-900/40 flex items-center justify-center mb-4 mx-auto">
                <MapPin size={24} className="text-zambia-600 dark:text-zambia-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Provincial Insights</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Detailed statistics and information for each of Zambia's 10 provinces.</p>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="rounded-full w-12 h-12 bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4 mx-auto">
                <BarChart2 size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Economic Indicators</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Comprehensive economic data including GDP, trade statistics, and growth rates.</p>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="rounded-full w-12 h-12 bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-4 mx-auto">
                <ArrowRight size={24} className="text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Interactive Maps</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Explore geographical data through intuitive and responsive interactive maps.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
