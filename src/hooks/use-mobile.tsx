
import { useMediaQuery } from "./use-media-query";

/**
 * A hook that returns whether the current viewport is mobile sized
 * This centralizes the media query definition across the app
 * @param breakpoint Optional custom breakpoint (default is 768px - md)
 */
export function useIsMobile(breakpoint: string = "768px"): boolean {
  return useMediaQuery(`(max-width: ${breakpoint})`);
}

/**
 * A hook that returns detailed breakpoints for responsive design
 * @returns Object with boolean values for each breakpoint
 */
export function useBreakpoints() {
  const isMobile = useMediaQuery("(max-width: 640px)"); // sm
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1023px)"); // md-lg
  const isDesktop = useMediaQuery("(min-width: 1024px)"); // lg+
  const isLargeDesktop = useMediaQuery("(min-width: 1280px)"); // xl+
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const isLandscape = useMediaQuery("(orientation: landscape)");
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isPortrait,
    isLandscape,
    // Helper for common patterns
    isMobileOrTablet: isMobile || isTablet,
  };
}

/**
 * Hook that returns the current device type based on screen size
 * @returns The current device type as a string
 */
export function useDeviceType(): "mobile" | "tablet" | "desktop" {
  const { isMobile, isTablet } = useBreakpoints();
  
  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
}

export default useIsMobile;
