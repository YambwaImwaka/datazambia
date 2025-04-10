
import { supabase } from "@/integrations/supabase/client";

export interface ExchangeRateData {
  rates: Record<string, number>;
  base: string;
  date: string;
}

/**
 * Fetch exchange rates against Zambian Kwacha (ZMW)
 */
export const fetchExchangeRates = async (): Promise<ExchangeRateData> => {
  try {
    // In a real app, this would make an API call to a real exchange rate service
    // For now, we'll return realistic mock data
    
    // Generate realistic exchange rate data
    return {
      base: "ZMW",
      date: new Date().toISOString().split('T')[0],
      rates: {
        "USD": 19.82,
        "EUR": 18.37,
        "GBP": 15.76,
        "CNY": 142.89,
        "ZAR": 370.35,
        "JPY": 2240.57,
        "AUD": 28.93,
        "CAD": 26.45,
        "CHF": 17.34,
        "SGD": 26.12
      }
    };
    
    // In a real application with an actual API:
    // const response = await fetch('https://api.exchangerate.host/latest?base=ZMW');
    // return await response.json();
    
    // Or if using a database:
    // const { data, error } = await supabase
    //   .from('exchange_rates')
    //   .select('*')
    //   .order('date', { ascending: false })
    //   .limit(1);
    //
    // if (error) throw error;
    // return data[0];
    
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};
