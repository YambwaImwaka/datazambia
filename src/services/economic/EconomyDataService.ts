
import { supabase } from "@/integrations/supabase/client";

// Economy data types
export interface GDPData {
  year: string;
  gdp: number;
  growth: number;
}

export interface SectorData {
  sector: string;
  percentage: number;
  value: number;
  color: string;
}

export interface EmploymentData {
  year: string;
  formal: number;
  informal: number;
  unemployed: number;
}

export interface KeyIndicator {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: 'dollar' | 'trending' | 'chart';
}

export interface EconomyData {
  gdp: GDPData[];
  sectors: SectorData[];
  employment: EmploymentData[];
  keyIndicators: KeyIndicator[];
}

/**
 * Fetch comprehensive economy data
 */
export const fetchEconomyData = async (): Promise<EconomyData> => {
  try {
    // In a real application, this would fetch from a backend API or database
    // For now, we'll return realistic mock data
    
    // GDP Data (2019-2025)
    const gdpData: GDPData[] = [
      { year: '2019', gdp: 23.31, growth: 1.4 },
      { year: '2020', gdp: 19.32, growth: -2.8 },
      { year: '2021', gdp: 22.15, growth: 3.6 },
      { year: '2022', gdp: 25.88, growth: 4.7 },
      { year: '2023', gdp: 26.41, growth: 2.9 },
      { year: '2024', gdp: 29.05, growth: 4.2 },
      { year: '2025', gdp: 31.24, growth: 3.8 },
    ];

    // Sector Contribution to GDP
    const sectorData: SectorData[] = [
      { sector: 'Agriculture', percentage: 21.5, value: 6.71, color: '#10B981' },
      { sector: 'Mining', percentage: 14.2, value: 4.43, color: '#6366F1' },
      { sector: 'Manufacturing', percentage: 8.7, value: 2.71, color: '#F59E0B' },
      { sector: 'Construction', percentage: 9.3, value: 2.90, color: '#EF4444' },
      { sector: 'Tourism', percentage: 7.2, value: 2.25, color: '#EC4899' },
      { sector: 'Trade', percentage: 18.6, value: 5.80, color: '#8B5CF6' },
      { sector: 'Transport', percentage: 8.1, value: 2.53, color: '#3B82F6' },
      { sector: 'Other', percentage: 12.4, value: 3.87, color: '#9CA3AF' },
    ];

    // Employment statistics (as decimals for stacked chart)
    const employmentData: EmploymentData[] = [
      { year: '2019', formal: 0.153, informal: 0.602, unemployed: 0.245 },
      { year: '2020', formal: 0.148, informal: 0.595, unemployed: 0.257 },
      { year: '2021', formal: 0.151, informal: 0.608, unemployed: 0.241 },
      { year: '2022', formal: 0.164, informal: 0.603, unemployed: 0.233 },
      { year: '2023', formal: 0.172, informal: 0.605, unemployed: 0.223 },
      { year: '2024', formal: 0.185, informal: 0.612, unemployed: 0.203 },
    ];

    // Key economic indicators
    const keyIndicators: KeyIndicator[] = [
      { name: 'GDP (USD)', value: '$29.05B', change: '+10.4%', isPositive: true, icon: 'dollar' },
      { name: 'GDP Growth', value: '4.2%', change: '+1.3%', isPositive: true, icon: 'trending' },
      { name: 'Inflation', value: '7.8%', change: '-2.3%', isPositive: true, icon: 'chart' },
      { name: 'Unemployment', value: '20.3%', change: '-2.0%', isPositive: true, icon: 'chart' },
    ];

    // In the future, we could fetch this data from Supabase:
    // const { data: gdpData, error } = await supabase
    //   .from('economic_indicators')
    //   .select('*')
    //   .eq('type', 'gdp')
    //   .order('year', { ascending: true });

    return {
      gdp: gdpData,
      sectors: sectorData,
      employment: employmentData,
      keyIndicators: keyIndicators
    };
  } catch (error) {
    console.error('Error fetching economy data:', error);
    throw error;
  }
};
