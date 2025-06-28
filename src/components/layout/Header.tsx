
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { useAnalyticsContext } from "@/components/analytics/AnalyticsProvider";
import { 
  UserCircle, 
  LogOut, 
  LogIn, 
  Menu, 
  ChevronDown,
  Sparkles,
  BarChart3
} from "lucide-react";
import MobileNav from "./MobileNav";
import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import UserNotifications from "../notifications/UserNotifications";

const Header = () => {
  const { user, signOut } = useAuth();
  const { trackClick } = useAnalyticsContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleNavClick = (item: string) => {
    trackClick(`nav_${item}`, { location: 'header' });
  };
  
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center" onClick={() => handleNavClick('logo')}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-zambia-600 to-zambia-800 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200">
                <img 
                  src="/lovable-uploads/2f245af2-a159-479f-b943-399b757e847a.png" 
                  alt="Zambia Data Hub Logo" 
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<span class="text-white font-bold text-lg">ZDH</span>';
                  }}
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 hover:bg-zambia-50 dark:hover:bg-zambia-900/20">
                Explore <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <Link to="/explore" onClick={() => handleNavClick('explore_all')}>
                <DropdownMenuItem className="cursor-pointer">All Data</DropdownMenuItem>
              </Link>
              <Link to="/explore/education" onClick={() => handleNavClick('explore_education')}>
                <DropdownMenuItem className="cursor-pointer">Education</DropdownMenuItem>
              </Link>
              <Link to="/explore/health" onClick={() => handleNavClick('explore_health')}>
                <DropdownMenuItem className="cursor-pointer">Health</DropdownMenuItem>
              </Link>
              <Link to="/explore/economy" onClick={() => handleNavClick('explore_economy')}>
                <DropdownMenuItem className="cursor-pointer">Economy</DropdownMenuItem>
              </Link>
              <Link to="/explore/agriculture" onClick={() => handleNavClick('explore_agriculture')}>
                <DropdownMenuItem className="cursor-pointer">Agriculture</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/provinces" onClick={() => handleNavClick('provinces')}>
            <Button variant="ghost" className="hover:bg-zambia-50 dark:hover:bg-zambia-900/20">Provinces</Button>
          </Link>
          
          <Link to="/finance" onClick={() => handleNavClick('finance')}>
            <Button variant="ghost" className="hover:bg-zambia-50 dark:hover:bg-zambia-900/20">Finance</Button>
          </Link>

          <Link to="/ai-tools" onClick={() => handleNavClick('ai_tools')}>
            <Button variant="ghost" className="flex items-center gap-1 hover:bg-zambia-50 dark:hover:bg-zambia-900/20">
              <Sparkles className="h-4 w-4" />
              AI Tools
            </Button>
          </Link>
          
          <Link to="/about" onClick={() => handleNavClick('about')}>
            <Button variant="ghost" className="hover:bg-zambia-50 dark:hover:bg-zambia-900/20">About</Button>
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <ModeToggle />

          {user ? (
            <>
              <UserNotifications />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full hover:bg-zambia-50 dark:hover:bg-zambia-900/20">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium truncate">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <Link to="/dashboard" onClick={() => handleNavClick('dashboard')}>
                    <DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem>
                  </Link>
                  <Link to="/profile" onClick={() => handleNavClick('profile')}>
                    <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                  </Link>
                  <Link to="/favorites" onClick={() => handleNavClick('favorites')}>
                    <DropdownMenuItem className="cursor-pointer">Favorites</DropdownMenuItem>
                  </Link>
                  {user.isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <Link to="/admin/dashboard" onClick={() => handleNavClick('admin_dashboard')}>
                        <DropdownMenuItem className="cursor-pointer">Admin Dashboard</DropdownMenuItem>
                      </Link>
                      <Link to="/admin/analytics" onClick={() => handleNavClick('admin_analytics')}>
                        <DropdownMenuItem className="cursor-pointer">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => {
                    handleNavClick('logout');
                    signOut();
                  }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth/signin" onClick={() => handleNavClick('signin')}>
              <Button size="sm" variant="secondary" className="gap-1 bg-zambia-600 hover:bg-zambia-700 text-white">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
          )}
          
          <Button 
            variant="ghost" 
            size="sm"
            className="md:hidden hover:bg-zambia-50 dark:hover:bg-zambia-900/20"
            onClick={() => {
              handleNavClick('mobile_menu');
              setIsMobileMenuOpen(true);
            }}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </header>
  );
};

export default Header;
