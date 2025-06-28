
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AnalyticsEvent {
  event_type: 'page_view' | 'click' | 'search' | 'download' | 'form_submit';
  page_path: string;
  page_title?: string;
  event_data?: Record<string, any>;
}

// Generate a unique session ID
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Detect device type
const getDeviceType = (): 'desktop' | 'mobile' | 'tablet' => {
  const userAgent = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
};

// Get browser info
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browser = 'Unknown';
  
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  else if (userAgent.includes('Opera')) browser = 'Opera';
  
  return browser;
};

// Get OS info
const getOSInfo = () => {
  const userAgent = navigator.userAgent;
  let os = 'Unknown';
  
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS')) os = 'iOS';
  
  return os;
};

export const useAnalytics = () => {
  const location = useLocation();
  const { user } = useAuth();
  const sessionStartTime = useRef<number>(Date.now());
  const currentPath = useRef<string>('');
  
  const trackEvent = async (event: AnalyticsEvent) => {
    try {
      const sessionId = getSessionId();
      const deviceType = getDeviceType();
      const browser = getBrowserInfo();
      const os = getOSInfo();
      const screenResolution = `${screen.width}x${screen.height}`;
      
      await supabase.from('analytics_events').insert({
        user_id: user?.id || null,
        session_id: sessionId,
        event_type: event.event_type,
        page_path: event.page_path,
        page_title: event.page_title || document.title,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        device_type: deviceType,
        browser: browser,
        operating_system: os,
        screen_resolution: screenResolution,
        event_data: event.event_data || {}
      });
      
      // Update or create session
      const sessionData = {
        session_id: sessionId,
        user_id: user?.id || null,
        user_agent: navigator.userAgent,
        device_type: deviceType,
        browser: browser,
        operating_system: os,
        referrer: document.referrer || null,
        landing_page: event.event_type === 'page_view' ? event.page_path : undefined,
        ended_at: new Date().toISOString()
      };
      
      await supabase.from('analytics_sessions')
        .upsert(sessionData, { onConflict: 'session_id' });
        
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  const trackPageView = (path?: string, title?: string) => {
    const pagePath = path || location.pathname;
    const pageTitle = title || document.title;
    
    trackEvent({
      event_type: 'page_view',
      page_path: pagePath,
      page_title: pageTitle
    });
  };

  const trackClick = (element: string, data?: Record<string, any>) => {
    trackEvent({
      event_type: 'click',
      page_path: location.pathname,
      event_data: { element, ...data }
    });
  };

  const trackSearch = (query: string, results?: number) => {
    trackEvent({
      event_type: 'search',
      page_path: location.pathname,
      event_data: { query, results }
    });
  };

  const trackDownload = (filename: string, type?: string) => {
    trackEvent({
      event_type: 'download',
      page_path: location.pathname,
      event_data: { filename, type }
    });
  };

  const trackFormSubmit = (formName: string, data?: Record<string, any>) => {
    trackEvent({
      event_type: 'form_submit',
      page_path: location.pathname,
      event_data: { form_name: formName, ...data }
    });
  };

  // Track page views automatically
  useEffect(() => {
    const handlePageView = () => {
      if (currentPath.current !== location.pathname) {
        currentPath.current = location.pathname;
        trackPageView();
      }
    };

    // Track initial page view
    handlePageView();
    
    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handlePageView();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location.pathname]);

  return {
    trackPageView,
    trackClick,
    trackSearch,
    trackDownload,
    trackFormSubmit
  };
};
