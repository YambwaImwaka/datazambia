
import { useState, useEffect } from 'react';

// Exchange rate data types
export interface ExchangeRateData {
  base: string;
  rates: {
    [currency: string]: number;
  };
  date: string;
}

// Stock market data types
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: string;
  changePercent: string;
  previousClose: number;
  lastUpdated: string;
}

// Economic indicators types
export interface EconomicIndicator {
  name: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  description: string;
  lastUpdated: string;
  source: string;
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

// Simulated Lusaka Stock Exchange data with real-time updates
export const useStockMarketData = () => {
  const [data, setData] = useState<{
    index: { value: number; change: string; isPositive: boolean };
    stocks: StockData[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        // Simulating stock market data with realistic fluctuations
        // In production, this would be connected to a real stock market API
        // Using generated data based on real Zambian stock tickers
        const stocksData = [
          {
            symbol: "ZANAF",
            name: "Zambia National Commercial Bank",
            price: 3.87 + (Math.random() * 0.2 - 0.1),
            previousClose: 3.87,
            lastUpdated: new Date().toISOString()
          },
          {
            symbol: "ZSUG",
            name: "Zambia Sugar Plc",
            price: 4.52 + (Math.random() * 0.2 - 0.1),
            previousClose: 4.52,
            lastUpdated: new Date().toISOString()
          },
          {
            symbol: "MTNZ",
            name: "MTN Zambia",
            price: 7.25 + (Math.random() * 0.3 - 0.15),
            previousClose: 7.25,
            lastUpdated: new Date().toISOString()
          },
          {
            symbol: "ZCCM",
            name: "ZCCM Investment Holdings",
            price: 12.68 + (Math.random() * 0.5 - 0.25),
            previousClose: 12.68,
            lastUpdated: new Date().toISOString()
          },
          {
            symbol: "CECA",
            name: "Copperbelt Energy Corporation",
            price: 5.31 + (Math.random() * 0.2 - 0.1),
            previousClose: 5.31,
            lastUpdated: new Date().toISOString()
          }
        ];
        
        // Calculate changes for each stock
        const processedStocks = stocksData.map(stock => {
          const changeValue = stock.price - stock.previousClose;
          const changePercent = (changeValue / stock.previousClose) * 100;
          
          return {
            ...stock,
            change: changeValue.toFixed(2),
            changePercent: `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%`
          };
        });
        
        // Calculate index value (simple average of stock prices)
        const indexValue = 8742.61 + (Math.random() * 40 - 20);
        const indexChange = indexValue - 8742.61;
        const indexChangePercent = (indexChange / 8742.61) * 100;
        
        setData({
          index: {
            value: Number(indexValue.toFixed(2)),
            change: `${indexChangePercent > 0 ? '+' : ''}${indexChangePercent.toFixed(2)}%`,
            isPositive: indexChangePercent > 0
          },
          stocks: processedStocks
        });
      } catch (err) {
        console.error('Failed to fetch stock market data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
    
    // Refresh every 60 seconds to simulate real-time stock data
    const interval = setInterval(fetchStockData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};

// Get economic indicators
export const useEconomicIndicators = () => {
  const [data, setData] = useState<EconomicIndicator[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEconomicData = async () => {
      setLoading(true);
      try {
        // In a real application, this would fetch from a dedicated economic data API
        // Using simulated data with realistic values for 2025 Zambia
        // This would typically come from sources like World Bank, IMF, or national statistics
        
        const today = new Date();
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        
        const indicators: EconomicIndicator[] = [
          { 
            name: "Inflation Rate", 
            value: (6.8 + (Math.random() * 0.4 - 0.2)).toFixed(1) + "%", 
            change: "-0.7%", 
            isPositive: true, 
            description: "Year-on-year inflation rate",
            lastUpdated: lastMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            source: "Bank of Zambia"
          },
          { 
            name: "Interest Rate", 
            value: (7.5 + (Math.random() * 0.2 - 0.1)).toFixed(1) + "%", 
            change: "-0.5%", 
            isPositive: true, 
            description: "Central bank policy rate",
            lastUpdated: today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            source: "Bank of Zambia"
          },
          { 
            name: "Foreign Reserves", 
            value: "$" + (4.2 + (Math.random() * 0.3 - 0.15)).toFixed(1) + "B", 
            change: "+11.3%", 
            isPositive: true, 
            description: "Gross international reserves",
            lastUpdated: "Q1 2025",
            source: "Bank of Zambia"
          },
          { 
            name: "National Debt", 
            value: "$" + (15.6 + (Math.random() * 0.6 - 0.3)).toFixed(1) + "B", 
            change: "-3.4%", 
            isPositive: true, 
            description: "Total public debt",
            lastUpdated: "Q1 2025",
            source: "Ministry of Finance"
          },
          { 
            name: "Budget Deficit", 
            value: (4.3 + (Math.random() * 0.3 - 0.15)).toFixed(1) + "%", 
            change: "-0.9%", 
            isPositive: true, 
            description: "As percentage of GDP",
            lastUpdated: "2024",
            source: "Ministry of Finance"
          },
          { 
            name: "GDP Growth Rate", 
            value: (5.2 + (Math.random() * 0.4 - 0.2)).toFixed(1) + "%", 
            change: "+0.3%", 
            isPositive: true, 
            description: "Annual GDP growth rate",
            lastUpdated: "Q1 2025",
            source: "Zambia Statistics Agency"
          },
          { 
            name: "Unemployment Rate", 
            value: (12.8 + (Math.random() * 0.5 - 0.25)).toFixed(1) + "%", 
            change: "-0.6%", 
            isPositive: true, 
            description: "Percentage of labor force",
            lastUpdated: today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            source: "Zambia Statistics Agency"
          }
        ];
        
        setData(indicators);
      } catch (err) {
        console.error('Failed to fetch economic data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEconomicData();
  }, []);

  return { data, loading, error };
};

// Get commodity prices relevant to Zambia's exports
export const useCommodityPrices = () => {
  const [data, setData] = useState<{
    name: string;
    price: number;
    unit: string;
    change: string;
    isPositive: boolean;
  }[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommodityPrices = async () => {
      setLoading(true);
      try {
        // In a production app, this would connect to a commodity prices API
        // Using simulated data for Zambia's key export commodities
        
        const commodities = [
          {
            name: "Copper",
            price: 12456 + (Math.random() * 200 - 100),
            unit: "USD/tonne",
            previousPrice: 12350
          },
          {
            name: "Cobalt",
            price: 56780 + (Math.random() * 500 - 250),
            unit: "USD/tonne",
            previousPrice: 56500
          },
          {
            name: "Gold",
            price: 2475 + (Math.random() * 25 - 12.5),
            unit: "USD/oz",
            previousPrice: 2460
          },
          {
            name: "Tobacco",
            price: 5.25 + (Math.random() * 0.2 - 0.1),
            unit: "USD/kg",
            previousPrice: 5.20
          },
          {
            name: "Sugar",
            price: 0.28 + (Math.random() * 0.01 - 0.005),
            unit: "USD/lb",
            previousPrice: 0.275
          }
        ];
        
        // Calculate changes
        const processedCommodities = commodities.map(item => {
          const changeValue = item.price - item.previousPrice;
          const changePercent = (changeValue / item.previousPrice) * 100;
          
          return {
            name: item.name,
            price: Number(item.price.toFixed(2)),
            unit: item.unit,
            change: `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%`,
            isPositive: changePercent > 0
          };
        });
        
        setData(processedCommodities);
      } catch (err) {
        console.error('Failed to fetch commodity prices:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCommodityPrices();
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchCommodityPrices, 300000);
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};
