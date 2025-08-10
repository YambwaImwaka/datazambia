import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronRight,
  LogOut,
  LogIn,
  BarChart4,
  Map,
  Home,
  Info,
  User,
  Star,
  Settings,
  Database,
  BookOpen,
  Activity,
  Sprout,
  DollarSign,
  Sparkles,
  Building,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNav = ({ isOpen, setIsOpen }: MobileNavProps) => {
  const { user, signOut } = useAuth();
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const handleLogout = () => {
    signOut();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-full sm:w-[420px] p-0 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex h-dvh max-h-dvh overflow-hidden flex-col">
        {/* Modern Header with Logo */}
        <SheetHeader className="relative p-6 bg-gradient-to-r from-zambia-600 via-zambia-700 to-zambia-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
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
              <div>
                <SheetTitle className="text-white text-lg font-bold">Zambia Data Hub</SheetTitle>
                <p className="text-zambia-100 text-sm opacity-90">Data-Driven Insights</p>
              </div>
            </div>
            
            <SheetClose asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="py-6 space-y-1">
            {/* Home Link */}
            <SheetClose asChild>
              <Link to="/" className="group flex items-center gap-3 px-5 py-3 mx-4 my-1 rounded-lg text-foreground hover:bg-muted/70 dark:hover:bg-muted/20 transition">
                <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                  <Home className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="font-medium">Home</span>
              </Link>
            </SheetClose>

            {/* Explore Data Accordion */}
            <Accordion
              type="single"
              collapsible
              value={activeAccordion || undefined}
              onValueChange={(value) => setActiveAccordion(value)}
              className="border-none"
            >
              <AccordionItem value="explore" className="border-none">
                <AccordionTrigger className="px-5 py-3 mx-4 my-1 rounded-lg text-foreground hover:bg-muted/70 dark:hover:bg-muted/20 hover:no-underline transition group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                      <Database className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <span className="font-medium">Explore Data</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20">
                    {[
                      { to: "/explore", icon: BarChart4, label: "All Data", color: "text-blue-600 dark:text-blue-300" },
                      { to: "/explore/education", icon: BookOpen, label: "Education", color: "text-purple-600 dark:text-purple-300" },
                      { to: "/explore/health", icon: Activity, label: "Health", color: "text-red-600 dark:text-red-300" },
                      { to: "/explore/economy", icon: DollarSign, label: "Economy", color: "text-green-600 dark:text-green-300" },
                      { to: "/explore/agriculture", icon: Sprout, label: "Agriculture", color: "text-amber-600 dark:text-amber-300" },
                      { to: "/explore/government", icon: Building, label: "Government", color: "text-indigo-600 dark:text-indigo-300" }
                    ].map((item) => (
                      <SheetClose key={item.to} asChild>
                        <Link to={item.to} className="group flex items-center gap-3 px-5 py-3 mx-4 my-1 rounded-lg text-foreground hover:bg-muted/70 dark:hover:bg-muted/20 transition">
                          <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                            <item.icon className={`h-4 w-4 ${item.color}`} />
                          </div>
                          <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Other Navigation Items */}
            {[
              { to: "/provinces", icon: Map, label: "Provinces", bgColor: "from-orange-100 to-red-100 dark:from-orange-800 dark:to-red-800", iconColor: "text-orange-600 dark:text-orange-300" },
              { to: "/finance", icon: DollarSign, label: "Finance", bgColor: "from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800", iconColor: "text-green-600 dark:text-green-300" },
              { to: "/cdf", icon: Database, label: "CDF", bgColor: "from-blue-100 to-cyan-100 dark:from-blue-800 dark:to-cyan-800", iconColor: "text-blue-600 dark:text-blue-300" },
              { to: "/ai-tools", icon: Sparkles, label: "AI Tools", bgColor: "from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800", iconColor: "text-purple-600 dark:text-purple-300" },
              { to: "/about", icon: Info, label: "About", bgColor: "from-gray-100 to-slate-100 dark:from-gray-800 dark:to-slate-800", iconColor: "text-gray-600 dark:text-gray-300" }
            ].map((item) => (
              <SheetClose key={item.to} asChild>
                <Link to={item.to} className="group flex items-center gap-3 px-5 py-3 mx-4 my-1 rounded-lg text-foreground hover:bg-muted/70 dark:hover:bg-muted/20 transition">
                  <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                    <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </SheetClose>
            ))}

            <Separator className="my-4 mx-6" />

            {/* User Section */}
            {user ? (
              <>
                {[
                  { to: "/dashboard", icon: BarChart4, label: "Dashboard", bgColor: "from-blue-100 to-indigo-100 dark:from-blue-800 dark:to-indigo-800", iconColor: "text-blue-600 dark:text-blue-300" },
                  { to: "/profile", icon: User, label: "My Profile", bgColor: "from-gray-100 to-slate-100 dark:from-gray-800 dark:to-slate-800", iconColor: "text-gray-600 dark:text-gray-300" },
                  { to: "/favorites", icon: Star, label: "Favorites", bgColor: "from-yellow-100 to-amber-100 dark:from-yellow-800 dark:to-amber-800", iconColor: "text-yellow-600 dark:text-yellow-300" }
                ].map((item) => (
                  <SheetClose key={item.to} asChild>
                    <Link to={item.to} className="group flex items-center gap-3 px-5 py-3 mx-4 my-1 rounded-lg text-foreground hover:bg-muted/70 dark:hover:bg-muted/20 transition">
                      <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                        <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SheetClose>
                ))}
                
                {user.isAdmin && (
                  <>
                    <Separator className="my-4 mx-6" />
                    <SheetClose asChild>
                      <Link to="/admin/dashboard" className="group flex items-center gap-3 px-5 py-3 mx-4 my-1 rounded-lg text-foreground hover:bg-muted/70 dark:hover:bg-muted/20 transition">
                        <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                          <Settings className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium">Admin Dashboard</span>
                      </Link>
                    </SheetClose>
                  </>
                )}
                
                <Separator className="my-4 mx-6" />
                
                <Button 
                  variant="ghost" 
                  className="group flex items-center w-full justify-start px-5 py-3 mx-4 my-1 rounded-lg text-foreground hover:bg-muted/70 dark:hover:bg-muted/20 font-normal h-auto transition"
                  onClick={handleLogout}
                >
                  <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="font-medium">Log Out</span>
                </Button>
              </>
            ) : (
              <SheetClose asChild>
                <Link to="/auth/signin" className="group flex items-center gap-3 px-5 py-3 mx-4 my-1 rounded-lg text-foreground hover:bg-muted/70 dark:hover:bg-muted/20 transition">
                  <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                    <LogIn className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="font-medium">Sign In</span>
                </Link>
              </SheetClose>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            © 2024 Zambia Data Hub. All rights reserved.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
