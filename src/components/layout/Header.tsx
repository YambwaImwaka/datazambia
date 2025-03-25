
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MobileNav from './MobileNav';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Check if the current route is active
  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Provinces', path: '/provinces' },
    { name: 'Explore', path: '/explore' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileNav />
            
            <Link to="/" className="flex items-center gap-2">
              <span className="bg-zambia-600 text-white font-bold text-xl px-2 py-1 rounded">ZI</span>
              <span className="font-bold text-lg hidden sm:inline">Zambia Insight</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActiveRoute(link.path)
                    ? 'text-zambia-600 dark:text-zambia-400 bg-zambia-50 dark:bg-zambia-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name || 'User'} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {user.email?.[0].toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin/users">Admin</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              !isMobile && (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" asChild>
                    <Link to="/auth/signin">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/auth/signup">Sign Up</Link>
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
