
import { useState, useEffect } from 'react';

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
