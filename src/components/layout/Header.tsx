
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { 
  UserCircle, 
  LogOut, 
  LogIn, 
  Menu, 
  ChevronDown,
  Bot,
  TrendingUp,
  Sparkles
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="bg-gradient-to-r from-zambia-600 to-zambia-800 text-white text-xl font-bold py-1 px-3 rounded-md mr-2">ZDH</div>
            <span className="hidden md:inline-block font-semibold text-lg">
              Zambia Data Hub
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                Explore <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <Link to="/explore">
                <DropdownMenuItem className="cursor-pointer">All Data</DropdownMenuItem>
              </Link>
              <Link to="/explore/education">
                <DropdownMenuItem className="cursor-pointer">Education</DropdownMenuItem>
              </Link>
              <Link to="/explore/health">
                <DropdownMenuItem className="cursor-pointer">Health</DropdownMenuItem>
              </Link>
              <Link to="/explore/economy">
                <DropdownMenuItem className="cursor-pointer">Economy</DropdownMenuItem>
              </Link>
              <Link to="/explore/agriculture">
                <DropdownMenuItem className="cursor-pointer">Agriculture</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/provinces">
            <Button variant="ghost">Provinces</Button>
          </Link>
          
          <Link to="/finance">
            <Button variant="ghost">Finance</Button>
          </Link>

          <Link to="/ai-tools">
            <Button variant="ghost" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              AI Tools
            </Button>
          </Link>
          
          <Link to="/about">
            <Button variant="ghost">About</Button>
          </Link>
        </nav>

        <div className="flex items-center space-x-1">
          <ModeToggle />

          {user ? (
            <>
              <UserNotifications />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full">
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
                  <Link to="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem>
                  </Link>
                  <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                  </Link>
                  <Link to="/favorites">
                    <DropdownMenuItem className="cursor-pointer">Favorites</DropdownMenuItem>
                  </Link>
                  {user.isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <Link to="/admin/dashboard">
                        <DropdownMenuItem className="cursor-pointer">Admin Dashboard</DropdownMenuItem>
                      </Link>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth/signin">
              <Button size="sm" variant="secondary" className="gap-1">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
          )}
          
          <Button 
            variant="ghost" 
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
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
