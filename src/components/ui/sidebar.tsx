import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { provinces } from "@/utils/data"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tooltip } from "@/components/ui/tooltip"
import { useTheme } from "@/components/theme-provider"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import { useMediaQuery } from "@/hooks/use-media-query"

const list = [
  "Overview",
  "Health",
  "Education",
  "Agriculture",
  "Economy",
  "Finance",
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1.5 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

interface SidebarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
  isSearchOpen: boolean
  setIsSearchOpen: (isOpen: boolean) => void
}

export function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  isSearchOpen,
  setIsSearchOpen,
}: SidebarProps) {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = React.useState(false)
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(2023, 0, 20),
    to: new Date(2023, 0, 22),
  })
  const isMobile = useIsMobile()
  const isLargeScreen = useMediaQuery("(min-width: 1024px)")
  const { setTheme } = useTheme()
  const [isManualOpen, setIsManualOpen] = React.useState(false)
  const [isAutomaticOpen, setIsAutomaticOpen] = React.useState(false)
  const [isTaskOpen, setIsTaskOpen] = React.useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false)
  const [isProfileOpen, setIsProfileOpen] = React.useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false)
  const [isDisplayOpen, setIsDisplayOpen] = React.useState(false)
  const [isAccessibilityOpen, setIsAccessibilityOpen] = React.useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = React.useState(false)
  const [isSecurityOpen, setIsSecurityOpen] = React.useState(false)
  const [isBillingOpen, setIsBillingOpen] = React.useState(false)
  const [isAppearanceOpen, setIsAppearanceOpen] = React.useState(false)
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false)
  const [isIntegrationsOpen, setIsIntegrationsOpen] = React.useState(false)
  const [isKeyboardShortcutsOpen, setIsKeyboardShortcutsOpen] =
    React.useState(false)
  const [isHelpOpen, setIsHelpOpen] = React.useState(false)
  const [isFeedbackOpen, setIsFeedbackOpen] = React.useState(false)
  const [isAboutOpen, setIsAboutOpen] = React.useState(false)
  const [isContactOpen, setIsContactOpen] = React.useState(false)
  const [isTermsOpen, setIsTermsOpen] = React.useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState(false)
  const [isLicenseOpen, setIsLicenseOpen] = React.useState(false)
  const [isChangelogOpen, setIsChangelogOpen] = React.useState(false)
  const [isStatusOpen, setIsStatusOpen] = React.useState(false)
  const [isLogOutOpen, setIsLogOutOpen] = React.useState(false)
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = React.useState(false)
  const [isNewFeatureOpen, setIsNewFeatureOpen] = React.useState(false)
  const [isBugReportOpen, setIsBugReportOpen] = React.useState(false)
  const [isPerformanceOpen, setIsPerformanceOpen] = React.useState(false)
  const [isExperimentalOpen, setIsExperimentalOpen] = React.useState(false)
  const [isBetaOpen, setIsBetaOpen] = React.useState(false)
  const [isDarkMode, setDarkMode] = React.useState(false)
  const [isHighContrast, setHighContrast] = React.useState(false)
  const [isReducedMotion, setReducedMotion] = React.useState(false)
  const [isDyslexiaFriendly, setDyslexiaFriendly] = React.useState(false)
  const [isKeyboardNavigation, setKeyboardNavigation] = React.useState(false)
  const [isScreenReaderSupport, setScreenReaderSupport] = React.useState(false)
  const [isSpeechRecognition, setSpeechRecognition] = React.useState(false)
  const [isZoomEnabled, setZoomEnabled] = React.useState(false)
  const [isCustomTheme, setCustomTheme] = React.useState(false)
  const [isNotificationsEnabled, setNotificationsEnabled] =
    React.useState(false)
  const [isEmailNotificationsEnabled, setEmailNotificationsEnabled] =
    React.useState(false)
  const [isPushNotificationsEnabled, setPushNotificationsEnabled] =
    React.useState(false)
  const [isSoundNotificationsEnabled, setSoundNotificationsEnabled] =
    React.useState(false)
  const [isVibrationNotificationsEnabled, setVibrationNotificationsEnabled] =
    React.useState(false)
  const [isLedNotificationsEnabled, setLedNotificationsEnabled] =
    React.useState(false)
  const [isLocationServicesEnabled, setLocationServicesEnabled] =
    React.useState(false)
  const [isMicrophoneAccessEnabled, setMicrophoneAccessEnabled] =
    React.useState(false)
  const [isCameraAccessEnabled, setCameraAccessEnabled] = React.useState(false)
  const [isContactsAccessEnabled, setContactsAccessEnabled] =
    React.useState(false)
  const [isCalendarAccessEnabled, setCalendarAccessEnabled] =
    React.useState(false)
  const [isPhotosAccessEnabled, setPhotosAccessEnabled] = React.useState(false)
  const [isRemindersAccessEnabled, setRemindersAccessEnabled] =
    React.useState(false)
  const [isMotionAccessEnabled, setMotionAccessEnabled] = React.useState(false)
  const [isBackgroundAppRefreshEnabled, setBackgroundAppRefreshEnabled] =
    React.useState(false)
  const [isCellularDataAccessEnabled, setCellularDataAccessEnabled] =
    React.useState(false)
  const [isBluetoothAccessEnabled, setBluetoothAccessEnabled] =
    React.useState(false)
  const [isAdvertisingTrackingEnabled, setAdvertisingTrackingEnabled] =
    React.useState(false)
  const [isAnalyticsEnabled, setAnalyticsEnabled] = React.useState(false)
  const [isCrashReportingEnabled, setCrashReportingEnabled] =
    React.useState(false)
  const [isPersonalizedAdsEnabled, setPersonalizedAdsEnabled] =
    React.useState(false)
  const [isLocationBasedAdsEnabled, setLocationBasedAdsEnabled] =
    React.useState(false)
  const [isInterestBasedAdsEnabled, setInterestBasedAdsEnabled] =
    React.useState(false)
  const [isThirdPartyCookiesEnabled, setThirdPartyCookiesEnabled] =
    React.useState(false)
  const [isDoNotTrackEnabled, setDoNotTrackEnabled] = React.useState(false)
  const [isAutomaticUpdatesEnabled, setAutomaticUpdatesEnabled] =
    React.useState(false)
  const [isBetaProgramEnabled, setBetaProgramEnabled] = React.useState(false)
  const [isDeveloperModeEnabled, setDeveloperModeEnabled] =
    React.useState(false)
  const [isHardwareAccelerationEnabled, setHardwareAccelerationEnabled] =
    React.useState(false)
  const [isWebGLEnabled, setWebGLEnabled] = React.useState(false)
  const [isExperimentalFeaturesEnabled, setExperimentalFeaturesEnabled] =
    React.useState(false)
  const [isAccessibilityFeaturesEnabled, setAccessibilityFeaturesEnabled] =
    React.useState(false)
  const [isAdvancedSettingsEnabled, setAdvancedSettingsEnabled] =
    React.useState(false)
  const [isDataCollectionEnabled, setDataCollectionEnabled] =
    React.useState(false)
  const [isCloudSyncEnabled, setCloudSyncEnabled] = React.useState(false)
  const [isAutoSaveEnabled, setAutoSaveEnabled] = React.useState(false)
  const [isSpellCheckEnabled, setSpellCheckEnabled] = React.useState(false)
  const [isGrammarCheckEnabled, setGrammarCheckEnabled] =
    React.useState(false)
  const [isAutoCorrectEnabled, setAutoCorrectEnabled] = React.useState(false)
  const [isTextPredictionEnabled, setTextPredictionEnabled] =
    React.useState(false)
  const [isSmartComposeEnabled, setSmartComposeEnabled] =
    React.useState(false)
  const [isOfflineAccessEnabled, setOfflineAccessEnabled] =
    React.useState(false)
  const [isLocationSharingEnabled, setLocationSharingEnabled] =
    React.useState(false)
  const [isMicrophoneSharingEnabled, setMicrophoneSharingEnabled] =
    React.useState(false)
  const [isCameraSharingEnabled, setCameraSharingEnabled] =
    React.useState(false)
  const [isContactsSharingEnabled, setContactsSharingEnabled] =
    React.useState(false)
  const [isCalendarSharingEnabled, setCalendarSharingEnabled] =
    React.useState(false)
  const [isPhotosSharingEnabled, setPhotosSharingEnabled] =
    React.useState(false)
  const [isRemindersSharingEnabled, setRemindersSharingEnabled] =
    React.useState(false)
  const [isMotionSharingEnabled, setMotionSharingEnabled] =
    React.useState(false)
  const [isBackgroundAppRefreshSharingEnabled, setBackgroundAppRefreshSharingEnabled] =
    React.useState(false)
  const [isCellularDataSharingEnabled, setCellularDataSharingEnabled] =
    React.useState(false)
  const [isBluetoothSharingEnabled, setBluetoothSharingEnabled] =
    React.useState(false)
  const [isAdvertisingTrackingSharingEnabled, setAdvertisingTrackingSharingEnabled] =
    React.useState(false)
  const [isAnalyticsSharingEnabled, setAnalyticsSharingEnabled] =
    React.useState(false)
  const [isCrashReportingSharingEnabled, setCrashReportingSharingEnabled] =
    React.useState(false)
  const [isPersonalizedAdsSharingEnabled, setPersonalizedAdsSharingEnabled] =
    React.useState(false)
  const [isLocationBasedAdsSharingEnabled, setLocationBasedAdsSharingEnabled] =
    React.useState(false)
  const [isInterestBasedAdsSharingEnabled, setInterestBasedAdsSharingEnabled] =
    React.useState(false)
  const [isThirdPartyCookiesSharingEnabled, setThirdPartyCookiesSharingEnabled] =
    React.useState(false)
  const [isDoNotTrackSharingEnabled, setDoNotTrackSharingEnabled] =
    React.useState(false)
  const [isAutomaticUpdatesSharingEnabled, setAutomaticUpdatesSharingEnabled] =
    React.useState(false)
  const [isBetaProgramSharingEnabled, setBetaProgramSharingEnabled] =
    React.useState(false)
  const [isDeveloperModeSharingEnabled, setDeveloperModeSharingEnabled] =
    React.useState(false)
  const [isHardwareAccelerationSharingEnabled, setHardwareAccelerationSharingEnabled] =
    React.useState(false)
  const [isWebGLEnabledSharingEnabled, setWebGLEnabledSharingEnabled] =
    React.useState(false)
  const [isExperimentalFeaturesSharingEnabled, setExperimentalFeaturesSharingEnabled] =
    React.useState(false)
  const [isAccessibilityFeaturesSharingEnabled, setAccessibilityFeaturesSharingEnabled] =
    React.useState(false)
  const [isAdvancedSettingsSharingEnabled, setAdvancedSettingsSharingEnabled] =
    React.useState(false)
  const [isDataCollectionSharingEnabled, setDataCollectionSharingEnabled] =
    React.useState(false)
  const [isCloudSyncSharingEnabled, setCloudSyncSharingEnabled] =
    React.useState(false)
  const [isAutoSaveSharingEnabled, setAutoSaveSharingEnabled] =
    React.useState(false)
  const [isSpellCheckSharingEnabled, setSpellCheckSharingEnabled] =
    React.useState(false)
  const [isGrammarCheckSharingEnabled, setGrammarCheckSharingEnabled] =
    React.useState(false)
  const [isAutoCorrectSharingEnabled, setAutoCorrectSharingEnabled] =
    React.useState(false)
  const [isTextPredictionSharingEnabled, setTextPredictionSharingEnabled] =
    React.useState(false)
  const [isSmartComposeSharingEnabled, setSmartComposeSharingEnabled] =
    React.useState(false)
  const [isOfflineAccessSharingEnabled, setOfflineAccessSharingEnabled] =
    React.useState(false)

  return (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0">
          {isLargeScreen ? "Open Sidebar" : "Menu"}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full sm:w-64 border-r pr-0"
      >
        <SheetHeader className="pl-6 pb-1.5">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Navigate through Zambia's key data categories.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] pl-6 pb-6">
          <Separator className="mb-4" />
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Data Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                    {list.map((item) => (
                      <ListItem key={item} title={item}>
                        Comprehensive statistics and insights.
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="#"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "data-[active]:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground"
                    )}
                  >
                    Explore Provinces
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="#"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "data-[active]:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground"
                    )}
                  >
                    Key Metrics
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="#"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "data-[active]:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground"
                    )}
                  >
                    Financial Data
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="#"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "data-[active]:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground"
                    )}
                  >
                    Economic Sectors
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="#"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "data-[active]:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground"
                    )}
                  >
                    Historical Trends
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="#"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "data-[active]:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground"
                    )}
                  >
                    Health Metrics
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="#"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "data-[active]:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground"
                    )}
                  >
                    Education Metrics
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a
                    href="#"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "data-[active]:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground"
                    )}
                  >
                    Agriculture Metrics
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Separator className="my-4" />
          <Accordion type="single" collapsible>
            <AccordionItem value="provinces">
              <AccordionTrigger>Provinces</AccordionTrigger>
              <AccordionContent>
                <ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
                  {provinces.map((province) => (
                    <li key={province.id}>
                      <NavigationMenuLink asChild>
                        <a
                          href="#"
                          className={cn(
                            "block select-none space-y-1.5 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {province.name}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {province.description}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="my-4" />
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/examples/card-example.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <h4 className="text-sm font-medium leading-none">
                Zambian Insights
              </h4>
              <p className="text-xs text-muted-foreground">info@zm.gov</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Settings</h4>
            <Button variant="ghost" className="w-full justify-start">
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Notifications
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Display
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Accessibility
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Language
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Security
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Billing
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Appearance</h4>
            <Button variant="ghost" className="w-full justify-start">
              Theme
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Customization
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Advanced</h4>
            <Button variant="ghost" className="w-full justify-start">
              Integrations
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Keyboard shortcuts
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Help</h4>
            <Button variant="ghost" className="w-full justify-start">
              New Feature
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Bug Report
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Performance
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Experimental
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Beta
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Legal</h4>
            <Button variant="ghost" className="w-full justify-start">
              Terms of Service
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              License
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Changelog
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Status
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Account</h4>
            <Button variant="ghost" className="w-full justify-start">
              Log out
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Delete account
            </Button>
          </div>
        </ScrollArea>
        <SheetFooter className="flex flex-col items-center justify-end space-y-2 border-t p-6">
          <Tooltip content="Search the data">
            <button
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </Tooltip>
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
