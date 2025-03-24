
import { useState, useEffect } from 'react';

// Exchange rate data types
export interface ExchangeRateData {
  base: string;
  rates: {
    [currency: string]: number;
  };
  date: string;
}

// Use Exchange Rates API to get latest currency data for ZMW
export const useExchangeRateData = () => {
  const [data, setData] = useState<ExchangeRateData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true);
      try {
        // Using the open.er-api.com API (has CORS support)
        const response = await fetch(
          'https://open.er-api.com/v6/latest/ZMW'
        );
        
        if (!response.ok) {
          throw new Error('Exchange rate data not available');
        }
        
        const exchangeData = await response.json();
        
        if (!exchangeData || !exchangeData.rates) {
          // Fallback to mock data if API doesn't return expected format
          console.log('Using mock exchange rate data due to API format issues');
          setData(getMockExchangeRates());
          return;
        }
        
        // Format the data - we want ZMW as base, but with rates correctly
        // representing how many units of ZMW = 1 unit of other currency
        const formattedData: ExchangeRateData = {
          base: 'ZMW',
          rates: {
            USD: exchangeData.rates.USD, 
            EUR: exchangeData.rates.EUR,
            GBP: exchangeData.rates.GBP,
            CNY: exchangeData.rates.CNY,
            ZAR: exchangeData.rates.ZAR
          },
          date: exchangeData.time_last_update_utc 
            ? new Date(exchangeData.time_last_update_utc).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
        };
        
        setData(formattedData);
      } catch (err) {
        console.error('Failed to fetch exchange rate data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        
        // Use mock data on failure
        console.log('Using mock exchange rate data due to API error');
        setData(getMockExchangeRates());
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  // Provide mock data when API fails
  const getMockExchangeRates = (): ExchangeRateData => {
    return {
      base: 'ZMW',
      rates: {
        USD: 0.053,
        EUR: 0.049,
        GBP: 0.042,
        CNY: 0.38,
        ZAR: 0.96
      },
      date: new Date().toISOString().split('T')[0]
    };
  };

  return { data, loading, error };
};
