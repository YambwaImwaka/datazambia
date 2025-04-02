
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Map, Search, BarChart2, Info, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  authRequired?: boolean;
  adminRequired?: boolean;
}

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const isMobile = useIsMobile();
  
  const navItems: NavItem[] = [
    { label: 'Home', href: '/', icon: <Home className="h-5 w-5" /> },
    { label: 'Provinces', href: '/provinces', icon: <Map className="h-5 w-5" /> },
    { label: 'Explore', href: '/explore', icon: <Search className="h-5 w-5" /> },
    { label: 'About', href: '/about', icon: <Info className="h-5 w-5" /> },
    { 
      label: 'Dashboard', 
      href: '/dashboard', 
      icon: <BarChart2 className="h-5 w-5" />,
      authRequired: true
    },
    { 
      label: 'Admin', 
      href: '/admin/users', 
      icon: <User className="h-5 w-5" />,
      authRequired: true,
      adminRequired: true
    },
  ];

  const handleSignOut = () => {
    signOut();
    setOpen(false);
    toast.success("Signed out successfully");
  };

  if (!isMobile) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 max-w-[85vw] sm:max-w-[300px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Menu</h2>
            <SheetClose asChild>
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
          
          <nav className="flex-1 overflow-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems
                .filter(item => {
                  if (item.adminRequired && !isAdmin) return false;
                  if (item.authRequired && !user) return false;
                  return true;
                })
                .map((item) => (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <Link
                        to={item.href}
                        className="flex items-center gap-3 rounded-md px-3 py-3 text-base hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <span className="flex items-center justify-center w-6">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    </SheetClose>
                  </li>
                ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-border">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {user.email?.[0].toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{user.user_metadata?.full_name || user.email}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <SheetClose asChild>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="flex-1"
                    size="sm"
                  >
                    <Link to="/auth/signin">Sign In</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button 
                    asChild 
                    className="flex-1"
                    size="sm"
                  >
                    <Link to="/auth/signup">Sign Up</Link>
                  </Button>
                </SheetClose>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
