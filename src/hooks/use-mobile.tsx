
import { useMediaQuery } from "./use-media-query";

/**
 * A hook that returns whether the current viewport is mobile sized
 * This centralizes the media query definition across the app
 */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}

export default useIsMobile;
