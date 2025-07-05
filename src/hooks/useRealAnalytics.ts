
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RealAnalyticsData {
  totalPageViews: number;
  uniqueVisitors: number;
  totalSessions: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ page_path: string; view_count: number; bounce_rate: number }>;
  topReferrers: Array<{ referrer: string; count: number }>;
  deviceStats: Array<{ device_type: string; count: number; percentage: number }>;
  browserStats: Array<{ browser: string; count: number; percentage: number }>;
  locationStats: Array<{ country: string; count: number }>;
  dailyViews: Array<{ 
    date: string; 
    views: number; 
    visitors: number; 
    sessions: number;
    bounce_rate: number;
  }>;
  hourlyViews: Array<{ hour: number; views: number }>;
  realtimeUsers: number;
}

export const useRealAnalytics = (timeRange: string = '7d') => {
  const [analyticsData, setAnalyticsData] = useState<RealAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRealAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      startDate.setDate(endDate.getDate() - days);

      // Fetch page views with detailed stats
      const { data: pageViews, error: pageViewError } = await supabase
        .from('analytics_page_views')
        .select('*')
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0]);

      if (pageViewError) throw pageViewError;

      // Fetch events for detailed analysis
      const { data: events, error: eventsError } = await supabase
        .from('analytics_events')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      if (eventsError) throw eventsError;

      // Fetch sessions for session analysis
      const { data: sessions, error: sessionsError } = await supabase
        .from('analytics_sessions')
        .select('*')
        .gte('started_at', startDate.toISOString())
        .lte('started_at', endDate.toISOString());

      if (sessionsError) throw sessionsError;

      // Calculate real-time users (active in last 5 minutes)
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const { data: realtimeEvents } = await supabase
        .from('analytics_events')
        .select('session_id')
        .gte('created_at', fiveMinutesAgo.toISOString())
        .eq('event_type', 'page_view');

      const realtimeUsers = new Set(realtimeEvents?.map(e => e.session_id) || []).size;

      // Process the data
      const totalPageViews = pageViews?.reduce((sum, page) => sum + page.view_count, 0) || 0;
      const uniqueVisitors = pageViews?.reduce((sum, page) => sum + page.unique_visitors, 0) || 0;
      const totalSessions = sessions?.length || 0;
      
      // Calculate average session duration
      const sessionDurations = sessions?.filter(s => s.session_duration && s.session_duration > 0) || [];
      const averageSessionDuration = sessionDurations.length > 0 
        ? Math.round(sessionDurations.reduce((sum, s) => sum + (s.session_duration || 0), 0) / sessionDurations.length / 1000)
        : 0;

      // Calculate bounce rate
      const bouncedSessions = sessions?.filter(s => s.is_bounce).length || 0;
      const bounceRate = totalSessions > 0 ? Math.round((bouncedSessions / totalSessions) * 100) : 0;

      // Top pages with bounce rate
      const topPages = pageViews
        ?.sort((a, b) => b.view_count - a.view_count)
        .slice(0, 10)
        .map(page => {
          const pageSessions = sessions?.filter(s => s.landing_page === page.page_path) || [];
          const pageBouncedSessions = pageSessions.filter(s => s.is_bounce).length;
          const pageBounceRate = pageSessions.length > 0 
            ? Math.round((pageBouncedSessions / pageSessions.length) * 100) 
            : 0;
          
          return {
            page_path: page.page_path,
            view_count: page.view_count,
            bounce_rate: pageBounceRate
          };
        }) || [];

      // Top referrers analysis
      const referrerCounts = events?.reduce((acc: Record<string, number>, event) => {
        if (event.referrer) {
          const domain = event.referrer.includes('://') 
            ? new URL(event.referrer).hostname 
            : event.referrer;
          acc[domain] = (acc[domain] || 0) + 1;
        }
        return acc;
      }, {}) || {};

      const topReferrers = Object.entries(referrerCounts)
        .map(([referrer, count]) => ({ referrer, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Device and browser stats with percentages
      const deviceCounts = events?.reduce((acc: Record<string, number>, event) => {
        if (event.device_type) {
          acc[event.device_type] = (acc[event.device_type] || 0) + 1;
        }
        return acc;
      }, {}) || {};

      const totalDeviceEvents = Object.values(deviceCounts).reduce((sum, count) => sum + count, 0);
      const deviceStats = Object.entries(deviceCounts).map(([device_type, count]) => ({
        device_type,
        count,
        percentage: totalDeviceEvents > 0 ? Math.round((count / totalDeviceEvents) * 100) : 0
      }));

      const browserCounts = events?.reduce((acc: Record<string, number>, event) => {
        if (event.browser) {
          acc[event.browser] = (acc[event.browser] || 0) + 1;
        }
        return acc;
      }, {}) || {};

      const totalBrowserEvents = Object.values(browserCounts).reduce((sum, count) => sum + count, 0);
      const browserStats = Object.entries(browserCounts).map(([browser, count]) => ({
        browser,
        count,
        percentage: totalBrowserEvents > 0 ? Math.round((count / totalBrowserEvents) * 100) : 0
      }));

      // Location stats
      const locationCounts = events?.reduce((acc: Record<string, number>, event) => {
        if (event.country) {
          acc[event.country] = (acc[event.country] || 0) + 1;
        }
        return acc;
      }, {}) || {};

      const locationStats = Object.entries(locationCounts)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Daily views with bounce rate
      const dailyViewsMap = pageViews?.reduce((acc: Record<string, { 
        views: number; 
        visitors: number; 
        sessions: Set<string>;
        bouncedSessions: Set<string>;
      }>, page) => {
        const date = page.date;
        if (!acc[date]) {
          acc[date] = { views: 0, visitors: 0, sessions: new Set(), bouncedSessions: new Set() };
        }
        acc[date].views += page.view_count;
        acc[date].visitors += page.unique_visitors;
        return acc;
      }, {}) || {};

      // Add session data to daily views
      sessions?.forEach(session => {
        const date = session.started_at.split('T')[0];
        if (dailyViewsMap[date]) {
          dailyViewsMap[date].sessions.add(session.session_id);
          if (session.is_bounce) {
            dailyViewsMap[date].bouncedSessions.add(session.session_id);
          }
        }
      });

      const dailyViews = Object.entries(dailyViewsMap)
        .map(([date, data]) => ({
          date,
          views: data.views,
          visitors: data.visitors,
          sessions: data.sessions.size,
          bounce_rate: data.sessions.size > 0 
            ? Math.round((data.bouncedSessions.size / data.sessions.size) * 100) 
            : 0
        }))
        .sort((a, b) => a.date.localeCompare(b.date));

      // Hourly views for today
      const today = new Date().toISOString().split('T')[0];
      const todayEvents = events?.filter(e => e.created_at.startsWith(today)) || [];
      
      const hourlyViewsMap = Array.from({ length: 24 }, (_, i) => ({ hour: i, views: 0 }));
      todayEvents.forEach(event => {
        if (event.event_type === 'page_view') {
          const hour = new Date(event.created_at).getHours();
          hourlyViewsMap[hour].views++;
        }
      });

      setAnalyticsData({
        totalPageViews,
        uniqueVisitors,
        totalSessions,
        averageSessionDuration,
        bounceRate,
        topPages,
        topReferrers,
        deviceStats,
        browserStats,
        locationStats,
        dailyViews,
        hourlyViews: hourlyViewsMap,
        realtimeUsers
      });

    } catch (error: any) {
      console.error('Error fetching real analytics:', error);
      setError(error.message || 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealAnalyticsData();
  }, [timeRange]);

  return { analyticsData, loading, error, refetch: fetchRealAnalyticsData };
};
