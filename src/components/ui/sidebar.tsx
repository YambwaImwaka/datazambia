
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/components/theme-provider"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

export function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  isSearchOpen,
  setIsSearchOpen,
}: SidebarProps) {
  const isMobile = useIsMobile();
  const { setTheme } = useTheme();

  return (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0">
          {isMobile ? "Menu" : "Open Sidebar"}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full sm:w-64 border-r pr-0"
      >
        <SheetHeader className="pl-6 pb-1.5">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-8rem)] pl-6 pb-6">
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Main Navigation</h4>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="/">Home</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="/provinces">Provinces</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="/finance">Finance</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="/explore">Explore</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="/about">About</a>
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Account</h4>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="/dashboard">Dashboard</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="/profile">Profile</a>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a href="/auth/signin">Sign In</a>
            </Button>
          </div>
        </ScrollArea>
        
        <SheetFooter className="flex flex-col items-center justify-end space-y-2 border-t p-6">
          <Button type="button" onClick={() => setIsSearchOpen(!isSearchOpen)} className="inline-flex items-center">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
