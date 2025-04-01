
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme-toggle';
import MobileNav from './MobileNav';
import UserNotifications from '@/components/notifications/UserNotifications';
import { useIsMobile } from '@/hooks/use-mobile';
import { User, LogOut, Settings, Heart, BarChart2, UserCog, Layout } from 'lucide-react';

const Header = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background z-50 border-b">
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <MobileNav />
          
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/2f245af2-a159-479f-b943-399b757e847a.png" 
              alt="Data Zambia" 
              className="h-10 w-auto mr-2" 
            />
            <span className="text-xl font-bold hidden md:inline-block">Data Zambia</span>
          </Link>
          
          {!isMobile && (
            <nav className="ml-10">
              <ul className="flex space-x-6">
                <li>
                  <Link to="/provinces" className="text-sm hover:text-primary transition-colors">
                    Provinces
                  </Link>
                </li>
                <li>
                  <Link to="/explore" className="text-sm hover:text-primary transition-colors">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link to="/dashboard" className="text-sm hover:text-primary transition-colors">
                      Dashboard
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <li>
                    <Link to="/admin/dashboard" className="text-sm hover:text-primary transition-colors">
                      Admin
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />

          {user ? (
            <>
              <UserNotifications />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 ml-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="text-xs">
                        {user.user_metadata?.full_name?.[0] || user.email?.[0].toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/favorites')}>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favorites</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <BarChart2 className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin/dashboard')}>
                      <Layout className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {!isMobile && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth/signin">Sign In</Link>
                </Button>
              )}
              <Button size="sm" asChild>
                <Link to="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
