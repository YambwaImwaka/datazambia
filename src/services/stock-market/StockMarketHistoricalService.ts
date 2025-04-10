
import { supabase } from "@/integrations/supabase/client";

export interface HistoricalDataPoint {
  date: string;
  value: number;
}

export interface HistoricalDataSeries {
  name: string;
  data: HistoricalDataPoint[];
  id: string;
  type: 'currency' | 'commodity' | 'indicator';
}

/**
 * Fetch historical data for financial metrics
 * @param type The type of data: 'currency', 'commodity', or 'indicator'
 * @param id The identifier for the specific data series
 * @param period The time period: '1w', '1m', '3m', '6m', '1y', '5y'
 */
export const fetchHistoricalData = async (
  type: 'currency' | 'commodity' | 'indicator',
  id: string,
  period: '1w' | '1m' | '3m' | '6m' | '1y' | '5y' = '3m'
): Promise<HistoricalDataSeries> => {
  try {
    // In a real app, this would fetch from a real API endpoint
    // For now, we'll generate realistic mock data
    
    // Generate dates for the selected period
    const endDate = new Date();
    const startDate = new Date();
    
    switch (period) {
      case '1w': startDate.setDate(endDate.getDate() - 7); break;
      case '1m': startDate.setMonth(endDate.getMonth() - 1); break;
      case '3m': startDate.setMonth(endDate.getMonth() - 3); break;
      case '6m': startDate.setMonth(endDate.getMonth() - 6); break;
      case '1y': startDate.setFullYear(endDate.getFullYear() - 1); break;
      case '5y': startDate.setFullYear(endDate.getFullYear() - 5); break;
    }
    
    // Generate mock time series data
    const data: HistoricalDataPoint[] = [];
    let currentDate = new Date(startDate);
    let baseValue = 0;
    
    // Set a realistic base value depending on type
    if (type === 'currency') {
      baseValue = id === 'USD' ? 19.82 : id === 'EUR' ? 18.37 : 15.76;
    } else if (type === 'commodity') {
      baseValue = id === 'Copper' ? 8700 : id === 'Gold' ? 1980 : 32500;
    } else {
      baseValue = id === 'GDP' ? 4.2 : id === 'Inflation' ? 7.8 : 20.3;
    }
    
    // Generate daily data points with realistic fluctuations
    while (currentDate <= endDate) {
      // Skip weekends for financial data
      const day = currentDate.getDay();
      if (day !== 0 && day !== 6) {
        // Add some random variation (more volatile for shorter time periods)
        const volatilityFactor = period === '1w' || period === '1m' ? 0.01 : 0.005;
        const randomChange = (Math.random() - 0.48) * volatilityFactor * baseValue;
        
        // Add some trend bias (slight upward trend)
        const trendBias = 0.0002 * baseValue;
        
        const value = baseValue + randomChange + trendBias;
        baseValue = value; // Use this as the new base for the next point
        
        data.push({
          date: currentDate.toISOString().split('T')[0],
          value: Number(value.toFixed(2))
        });
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return {
      name: id,
      data,
      id,
      type
    };
    
    // In a real app with an API:
    // const { data, error } = await supabase
    //   .from('historical_data')
    //   .select('*')
    //   .eq('type', type)
    //   .eq('series_id', id)
    //   .gte('date', startDate.toISOString())
    //   .lte('date', endDate.toISOString())
    //   .order('date', { ascending: true });
    //
    // if (error) throw error;
    // return {
    //   name: id,
    //   data: data.map(d => ({ date: d.date, value: d.value })),
    //   id,
    //   type
    // };
    
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};
