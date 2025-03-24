
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
        // Using the free.currconv.com API (has CORS support)
        const response = await fetch(
          'https://open.er-api.com/v6/latest/ZMW'
        );
        
        if (!response.ok) {
          throw new Error('Exchange rate data not available');
        }
        
        const exchangeData = await response.json();
        
        if (!exchangeData || !exchangeData.rates) {
          // Fallback to mock data if API doesn't return expected format
          setData(getMockExchangeRates());
          console.log('Using mock exchange rate data due to API format issues');
          return;
        }
        
        // Convert data to the format we need (data comes as ZMW=1)
        const formattedData = {
          base: 'ZMW',
          rates: {
            USD: Number((1 / exchangeData.rates.USD).toFixed(2)),
            EUR: Number((1 / exchangeData.rates.EUR).toFixed(2)),
            GBP: Number((1 / exchangeData.rates.GBP).toFixed(2)),
            CNY: Number((1 / exchangeData.rates.CNY).toFixed(2)),
            ZAR: Number((1 / exchangeData.rates.ZAR).toFixed(2))
          },
          date: exchangeData.date || new Date().toISOString().split('T')[0]
        };
        
        setData(formattedData);
      } catch (err) {
        console.error('Failed to fetch exchange rate data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        
        // Use mock data on failure
        setData(getMockExchangeRates());
        console.log('Using mock exchange rate data due to API error');
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
        USD: 18.75,
        EUR: 17.21,
        GBP: 14.83,
        CNY: 136.42,
        ZAR: 342.16
      },
      date: new Date().toISOString().split('T')[0]
    };
  };

  return { data, loading, error };
};
