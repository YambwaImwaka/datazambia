
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search, MapPin, BarChart2, TreePine, ChevronRight, Database, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { provinces } from "@/utils/data";
import { motion } from "framer-motion";

export const Hero = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<typeof provinces>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentVisual, setCurrentVisual] = useState(0);

  // Data visualizations placeholders for rotation
  const visuals = [
    { id: 1, title: "GDP Growth", value: "7.2%", icon: LineChart, color: "blue" },
    { id: 2, title: "Education Enrollment", value: "92.4%", icon: BarChart2, color: "amber" },
    { id: 3, title: "Agricultural Output", value: "↑ 12.3%", icon: TreePine, color: "green" },
    { id: 4, title: "Healthcare Access", value: "76.8%", icon: Database, color: "red" },
  ];

  useEffect(() => {
    // Auto-rotate through visualizations
    const rotationTimer = setInterval(() => {
      setCurrentVisual(prev => (prev + 1) % visuals.length);
    }, 5000);
    
    return () => {
      clearInterval(rotationTimer);
    };
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

  // Animation variants for the rotating visuals
  const visualVariants = {
    enter: { y: 20, opacity: 0 },
    center: { 
      y: 0, 
      opacity: 1,
      transition: { 
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { 
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-0">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white to-amber-50/80 dark:from-gray-900 dark:via-gray-850 dark:to-gray-800"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
      
      {/* Animated background elements - more subtle and modern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-gradient-to-r from-zambia-400/20 to-zambia-500/20 filter blur-[100px] animate-float"></div>
        <div className="absolute bottom-[15%] right-[10%] w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/20 to-blue-500/20 filter blur-[100px] animate-float-slow"></div>
        <div className="absolute top-[40%] right-[20%] w-64 h-64 rounded-full bg-gradient-to-r from-amber-300/20 to-amber-400/20 filter blur-[80px] animate-float-medium"></div>
      </div>
      
      {/* Modern decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-[10%] left-[5%] w-96 h-96 text-zambia-500/10 dark:text-zambia-400/5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M42.8,-57.2C57.9,-46.5,74,-36.5,81.3,-21.7C88.5,-7,86.8,12.5,78.4,27.1C70.1,41.8,55,51.6,39.5,59.1C24,66.5,8,71.7,-7.2,70.9C-22.5,70.1,-37,63.3,-50.9,53.2C-64.9,43.1,-78.2,29.5,-83.1,13.2C-87.9,-3.2,-84.2,-22.3,-74.1,-36C-64,-49.8,-47.5,-58.2,-32.2,-68.8C-16.9,-79.5,-2.8,-92.3,8,-89.9C18.8,-87.5,27.7,-68,42.8,-57.2Z" transform="translate(100 100)" />
        </svg>
        
        <svg className="absolute bottom-[15%] right-[5%] w-64 h-64 text-blue-500/10 dark:text-blue-400/5" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M36.8,-50.9C51.4,-41.8,69.7,-36.7,76.4,-25.5C83.1,-14.2,78.3,3.2,71.1,17.8C63.9,32.5,54.4,44.4,42.2,53.7C30.1,63.1,15,69.9,-0.2,70.1C-15.3,70.3,-30.7,63.9,-41.9,53.8C-53.1,43.7,-60.2,29.9,-65.6,14.8C-71.1,-0.4,-74.9,-16.9,-70.1,-30.5C-65.3,-44,-52,-54.7,-38,-61.5C-23.9,-68.3,-9.2,-71.3,1.2,-72.9C11.5,-74.6,22.3,-75,36.8,-50.9Z" transform="translate(100 100)" />
        </svg>
        
        {/* Chart lines decorative elements - more subtle */}
        <div className="hidden md:block absolute top-[40%] right-[15%] w-32 h-32 opacity-40">
          <svg viewBox="0 0 100 100" className="w-full h-full text-green-500/30">
            <path d="M0,70 Q25,50 50,60 T100,40" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M0,40 Q25,30 50,60 T100,20" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      <motion.div 
        className="container relative z-10 px-4 py-12 md:py-24 flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Featured Data Stats with Modern Cards */}
        <motion.div 
          variants={itemVariants}
          className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10"
        >
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zambia-100 dark:bg-zambia-900/40 text-zambia-700 dark:text-zambia-300 text-sm font-medium mb-3"
            >
              <Database size={14} />
              <span>Zambia's Official Data Hub</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
              Discover <span className="text-gradient bg-gradient-to-r from-zambia-500 to-blue-600 bg-clip-text text-transparent">Zambia</span> Through Actionable Data
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Access comprehensive, up-to-date data insights across all provinces. Make informed decisions with visualized statistics.
            </p>

            <div className="relative max-w-xl mb-8">
              <Input
                type="search"
                placeholder="Search for a province or metric..."
                className="w-full h-14 pl-14 pr-4 rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-zambia-400 shadow-md hover:shadow-lg transition-all duration-300"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
              />
              <Search
                size={20}
                className="absolute top-1/2 left-5 transform -translate-y-1/2 text-gray-400"
              />
              
              {showResults && (
                <div className="absolute z-20 top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
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
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/explore">
                <Button 
                  className="h-14 px-8 w-full sm:w-auto bg-gradient-to-r from-zambia-500 to-zambia-600 hover:from-zambia-600 hover:to-zambia-700 text-white rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 text-lg"
                >
                  Explore Data
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              
              <Link to="/provinces">
                <Button 
                  variant="outline" 
                  className="h-14 px-8 w-full sm:w-auto border-2 border-gray-300 dark:border-gray-600 hover:border-zambia-400 dark:hover:border-zambia-500 text-gray-700 dark:text-gray-200 rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 text-lg"
                >
                  <MapPin size={18} className="mr-2" />
                  View Provinces
                </Button>
              </Link>
            </div>
          </div>

          {/* Modern Statistics Display */}
          <div className="relative">
            {/* Backdrop Card */}
            <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-3xl shadow-xl opacity-20 translate-x-4 translate-y-4"></div>
            
            {/* Main Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className="p-6 md:p-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Latest Statistics</h3>
                
                {/* Stats Items */}
                <div className="space-y-8">
                  {visuals.map((visual, index) => {
                    const IconComponent = visual.icon;
                    const colorClass = {
                      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
                      green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
                      amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
                      red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    }[visual.color];
                    
                    return (
                      <motion.div
                        key={visual.id}
                        initial={{ opacity: 0.6, y: index === currentVisual ? 0 : (index < currentVisual ? -20 : 20) }}
                        animate={{ 
                          opacity: index === currentVisual ? 1 : 0.6, 
                          y: index === currentVisual ? 0 : (index < currentVisual ? -20 : 20) 
                        }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-4"
                      >
                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${colorClass}`}>
                          <IconComponent size={24} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {visual.title}
                          </h4>
                          <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            {visual.value}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                  <Link to="/explore" className="flex items-center text-zambia-600 dark:text-zambia-400 font-medium group">
                    <span>View all statistics</span>
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Category Cards - More Modern and Visual */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 w-full max-w-6xl"
        >
          <div className="group relative bg-gradient-to-br from-zambia-50 to-zambia-100 dark:from-zambia-900/20 dark:to-zambia-800/40 p-6 rounded-2xl border border-zambia-200/50 dark:border-zambia-700/30 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10 text-zambia-600">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="rounded-full w-12 h-12 bg-zambia-100 dark:bg-zambia-900/40 flex items-center justify-center mb-4">
              <MapPin size={20} className="text-zambia-600 dark:text-zambia-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Provincial Data</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Comprehensive statistics for each province</p>
          </div>
          
          <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/40 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-700/30 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10 text-blue-600">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="rounded-full w-12 h-12 bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4">
              <BarChart2 size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Economic Metrics</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Growth rates, trade, and financial data</p>
          </div>
          
          <div className="group relative bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/40 p-6 rounded-2xl border border-green-200/50 dark:border-green-700/30 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10 text-green-600">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="rounded-full w-12 h-12 bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-4">
              <TreePine size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Agriculture</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Crop outputs and farming statistics</p>
          </div>
          
          <div className="group relative bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/40 p-6 rounded-2xl border border-amber-200/50 dark:border-amber-700/30 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10 text-amber-600">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="rounded-full w-12 h-12 bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mb-4">
              <LineChart size={20} className="text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Social Indicators</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Education, health, and demographic data</p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Add CSS for grid pattern */}
      <style>
        {`
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
        }
        
        @media (prefers-color-scheme: dark) {
          .bg-grid-pattern {
            background-image: 
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float 7s ease-in-out infinite;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        `}
      </style>
    </div>
  );
};

export default Hero;
