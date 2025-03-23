
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
        // Using ExchangeRate-API or similar
        const response = await fetch(
          'https://api.exchangerate.host/latest?base=ZMW&symbols=USD,EUR,GBP,CNY,ZAR'
        );
        
        if (!response.ok) {
          throw new Error('Exchange rate data not available');
        }
        
        const exchangeData = await response.json();
        
        // Convert data to the format we need (data comes as ZMW=1)
        const formattedData = {
          ...exchangeData,
          rates: Object.entries(exchangeData.rates).reduce((acc, [currency, rate]) => ({
            ...acc,
            [currency]: Number((1 / (rate as number)).toFixed(2))
          }), {})
        };
        
        setData(formattedData);
      } catch (err) {
        console.error('Failed to fetch exchange rate data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  return { data, loading, error };
};
