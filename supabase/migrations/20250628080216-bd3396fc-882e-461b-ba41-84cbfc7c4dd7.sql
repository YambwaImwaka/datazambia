
-- Create analytics events table to track page views and user interactions
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'click', 'search', 'download', 'form_submit')),
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  country TEXT,
  city TEXT,
  device_type TEXT CHECK (device_type IN ('desktop', 'mobile', 'tablet')),
  browser TEXT,
  operating_system TEXT,
  screen_resolution TEXT,
  event_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create page views summary table for faster queries
CREATE TABLE public.analytics_page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  page_title TEXT,
  view_count INTEGER NOT NULL DEFAULT 1,
  unique_visitors INTEGER NOT NULL DEFAULT 1,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_path, date)
);

-- Create user sessions table to track visitor sessions
CREATE TABLE public.analytics_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id),
  ip_address INET,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  operating_system TEXT,
  referrer TEXT,
  landing_page TEXT,
  exit_page TEXT,
  page_views INTEGER DEFAULT 1,
  session_duration INTEGER DEFAULT 0,
  is_bounce BOOLEAN DEFAULT true,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX idx_analytics_events_page_path ON public.analytics_events(page_path);
CREATE INDEX idx_analytics_events_user_id ON public.analytics_events(user_id);
CREATE INDEX idx_analytics_events_session_id ON public.analytics_events(session_id);
CREATE INDEX idx_analytics_page_views_date ON public.analytics_page_views(date);
CREATE INDEX idx_analytics_sessions_started_at ON public.analytics_sessions(started_at);

-- Enable Row Level Security
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics data (admin access only for viewing)
CREATE POLICY "Admin can view all analytics events" 
  ON public.analytics_events 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can insert analytics events" 
  ON public.analytics_events 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin can view all page views" 
  ON public.analytics_page_views 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "System can manage page views" 
  ON public.analytics_page_views 
  FOR ALL 
  USING (true);

CREATE POLICY "Admin can view all sessions" 
  ON public.analytics_sessions 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can insert sessions" 
  ON public.analytics_sessions 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can update sessions" 
  ON public.analytics_sessions 
  FOR UPDATE 
  USING (true);

-- Function to update page view summaries
CREATE OR REPLACE FUNCTION update_page_view_summary()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_type = 'page_view' THEN
    INSERT INTO public.analytics_page_views (page_path, page_title, view_count, unique_visitors, date)
    VALUES (NEW.page_path, NEW.page_title, 1, 1, CURRENT_DATE)
    ON CONFLICT (page_path, date) 
    DO UPDATE SET 
      view_count = analytics_page_views.view_count + 1,
      unique_visitors = CASE 
        WHEN NEW.user_id IS NOT NULL AND NOT EXISTS (
          SELECT 1 FROM public.analytics_events 
          WHERE page_path = NEW.page_path 
          AND user_id = NEW.user_id 
          AND DATE(created_at) = CURRENT_DATE
          AND id != NEW.id
        ) THEN analytics_page_views.unique_visitors + 1
        ELSE analytics_page_views.unique_visitors
      END,
      updated_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for page view summary updates
CREATE TRIGGER trigger_update_page_view_summary
  AFTER INSERT ON public.analytics_events
  FOR EACH ROW
  EXECUTE FUNCTION update_page_view_summary();
