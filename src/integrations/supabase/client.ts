// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xaofrarlthvoxdhazjlu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhhb2ZyYXJsdGh2b3hkaGF6amx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2MzAyMzYsImV4cCI6MjA1ODIwNjIzNn0.cYKZsXnzY2TtF3RFtZkLO8z9i-VLmt8xpcUJCnD5Lyw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);