
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { provinces, dataCategories } from "@/utils/data";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="Zambia Insight"
        >
          <div className="w-10 h-10 rounded-full bg-zambia-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">ZI</span>
          </div>
          <span className="font-display font-bold text-xl text-gray-900 dark:text-white">
            Zambia Insight
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-zambia-600",
              location.pathname === "/" ? "text-zambia-600" : "text-gray-700 dark:text-gray-300"
            )}
          >
            Home
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-zambia-600 transition-colors">
                <span>Provinces</span>
                <ChevronDown size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass">
              {provinces.map((province) => (
                <DropdownMenuItem key={province.id}>
                  <Link
                    to={`/province/${province.id}`}
                    className="w-full"
                  >
                    {province.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-zambia-600 transition-colors">
                <span>Data</span>
                <ChevronDown size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass">
              {dataCategories.map((category) => (
                <DropdownMenuItem key={category.id}>
                  <Link
                    to={`/explore/${category.id}`}
                    className="w-full"
                  >
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link
            to="/explore"
            className={cn(
              "text-sm font-medium transition-colors hover:text-zambia-600",
              location.pathname.includes("/explore") ? "text-zambia-600" : "text-gray-700 dark:text-gray-300"
            )}
          >
            Explore
          </Link>
          
          <Link
            to="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-zambia-600",
              location.pathname === "/about" ? "text-zambia-600" : "text-gray-700 dark:text-gray-300"
            )}
          >
            About
          </Link>
        </nav>

        {/* Search and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="hidden md:block relative">
            <Input
              type="search"
              placeholder="Search data..."
              className="w-60 pl-9 bg-gray-50 border-gray-200 focus:border-zambia-400 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              size={16}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
            />
          </form>
          
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 animate-fade-in">
          <div className="container mx-auto px-4 py-5 flex flex-col h-full">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-zambia-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">ZI</span>
                </div>
                <span className="font-display font-bold text-xl">
                  Zambia Insight
                </span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </Button>
            </div>
            
            <form onSubmit={handleSearch} className="relative mt-8">
              <Input
                type="search"
                placeholder="Search data..."
                className="w-full pl-9 bg-gray-50 border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                size={16}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
              />
              <Button type="submit" className="sr-only">Search</Button>
            </form>
            
            <nav className="flex flex-col space-y-6 mt-8">
              <Link
                to="/"
                className={cn(
                  "text-xl font-medium py-2",
                  location.pathname === "/" ? "text-zambia-600" : "text-gray-700 dark:text-gray-300"
                )}
              >
                Home
              </Link>
              
              <div className="space-y-3">
                <p className="text-xl font-medium text-gray-700 dark:text-gray-300">Provinces</p>
                <div className="grid grid-cols-2 gap-2 pl-3">
                  {provinces.map((province) => (
                    <Link
                      key={province.id}
                      to={`/province/${province.id}`}
                      className="text-base text-gray-600 dark:text-gray-400 py-1"
                    >
                      {province.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-xl font-medium text-gray-700 dark:text-gray-300">Data Categories</p>
                <div className="grid grid-cols-2 gap-2 pl-3">
                  {dataCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/explore/${category.id}`}
                      className="text-base text-gray-600 dark:text-gray-400 py-1"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link
                to="/explore"
                className={cn(
                  "text-xl font-medium py-2",
                  location.pathname.includes("/explore") ? "text-zambia-600" : "text-gray-700 dark:text-gray-300"
                )}
              >
                Explore
              </Link>
              
              <Link
                to="/about"
                className={cn(
                  "text-xl font-medium py-2",
                  location.pathname === "/about" ? "text-zambia-600" : "text-gray-700 dark:text-gray-300"
                )}
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
