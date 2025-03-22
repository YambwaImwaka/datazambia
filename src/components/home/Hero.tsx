
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { provinces } from "@/utils/data";

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

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950"></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-zambia-500 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-blue-300 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>
      
      <div className="container relative z-10 px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="opacity-0 animation-delay-100"
            style={{ animation: animationComplete ? "slide-up 0.7s ease-out forwards" : "none" }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
              Discover <span className="text-zambia-600">Zambia</span> Through Data
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              Explore comprehensive data insights across all provinces of Zambia. From economic indicators to health metrics, understand the nation through numbers.
            </p>
          </div>
          
          <div 
            className="opacity-0 relative animation-delay-300 mb-12"
            style={{ animation: animationComplete ? "slide-up 0.7s ease-out forwards" : "none" }}
          >
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="search"
                placeholder="Search for a province..."
                className="w-full h-14 pl-14 pr-4 rounded-full border-2 border-gray-200 focus:border-zambia-400 shadow-subtle focus:shadow-elevated transition-all duration-300"
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
              <div className="absolute z-20 top-16 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white dark:bg-gray-800 shadow-elevated rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {searchResults.length > 0 ? (
                  <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                    {searchResults.map((province) => (
                      <li 
                        key={province.id}
                        className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => handleProvinceClick(province.id)}
                      >
                        <div className="flex items-center p-4">
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
          
          <div 
            className="opacity-0 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animation-delay-500"
            style={{ animation: animationComplete ? "slide-up 0.7s ease-out forwards" : "none" }}
          >
            <Button 
              className="h-12 px-6 bg-zambia-600 hover:bg-zambia-700 text-white rounded-full shadow-subtle hover:shadow-elevated transform transition-all duration-300 hover:-translate-y-1"
              onClick={() => navigate("/explore")}
            >
              Explore Data
              <ArrowRight size={16} className="ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              className="h-12 px-6 border-2 border-gray-300 hover:border-zambia-400 text-gray-700 dark:text-gray-200 rounded-full shadow-subtle hover:shadow-elevated transform transition-all duration-300 hover:-translate-y-1"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
