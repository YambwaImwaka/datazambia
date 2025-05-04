
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
  Bot,
  Sparkles
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
      <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
        <SheetHeader className="p-4 bg-gradient-to-r from-zambia-700 to-zambia-800 text-white">
          <SheetTitle className="text-white">Zambia Data Hub</SheetTitle>
        </SheetHeader>

        <div className="py-4 overflow-y-auto">
          <SheetClose asChild>
            <Link to="/" className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              <Home className="mr-3 h-4 w-4" />
              Home
            </Link>
          </SheetClose>

          <Accordion
            type="single"
            collapsible
            value={activeAccordion || undefined}
            onValueChange={(value) => setActiveAccordion(value)}
          >
            <AccordionItem value="explore" className="border-b-0">
              <AccordionTrigger className="px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 hover:no-underline">
                <span className="flex items-center">
                  <Database className="mr-3 h-4 w-4" />
                  Explore Data
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <SheetClose asChild>
                  <Link to="/explore" className="flex items-center px-10 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                    <BarChart4 className="mr-3 h-4 w-4" />
                    All Data
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/explore/education" className="flex items-center px-10 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                    <BookOpen className="mr-3 h-4 w-4" />
                    Education
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/explore/health" className="flex items-center px-10 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Activity className="mr-3 h-4 w-4" />
                    Health
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/explore/economy" className="flex items-center px-10 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                    <DollarSign className="mr-3 h-4 w-4" />
                    Economy
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/explore/agriculture" className="flex items-center px-10 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Sprout className="mr-3 h-4 w-4" />
                    Agriculture
                  </Link>
                </SheetClose>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <SheetClose asChild>
            <Link to="/provinces" className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              <Map className="mr-3 h-4 w-4" />
              Provinces
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link to="/finance" className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              <DollarSign className="mr-3 h-4 w-4" />
              Finance
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link to="/ai-tools" className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              <Sparkles className="mr-3 h-4 w-4" />
              AI Tools
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link to="/about" className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
              <Info className="mr-3 h-4 w-4" />
              About
            </Link>
          </SheetClose>

          <Separator className="my-2" />

          {user ? (
            <>
              <SheetClose asChild>
                <Link to="/dashboard" className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                  <BarChart4 className="mr-3 h-4 w-4" />
                  Dashboard
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Link to="/profile" className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                  <User className="mr-3 h-4 w-4" />
                  My Profile
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Link to="/favorites" className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Star className="mr-3 h-4 w-4" />
                  Favorites
                </Link>
              </SheetClose>
              
              {user.isAdmin && (
                <>
                  <Separator className="my-2" />
                  <SheetClose asChild>
                    <Link to="/admin/dashboard" className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Settings className="mr-3 h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  </SheetClose>
                </>
              )}
              
              <Separator className="my-2" />
              
              <Button 
                variant="ghost" 
                className="flex items-center w-full justify-start px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 font-normal h-auto rounded-none"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Log Out
              </Button>
            </>
          ) : (
            <SheetClose asChild>
              <Link to="/auth/signin" className="flex items-center px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">
                <LogIn className="mr-3 h-4 w-4" />
                Sign In
              </Link>
            </SheetClose>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
