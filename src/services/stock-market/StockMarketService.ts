
import { useState, useEffect } from 'react';

// Stock market data types
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: string;
}

export interface StockMarketData {
  index: {
    value: number;
    change: string;
    isPositive: boolean;
    lastUpdated: string;
    recentPerformance: Array<{date: string, value: number}>; // Added recentPerformance
  };
  stocks: StockData[];
}

// Use Stock Market API to get latest data for LSE
export const useStockMarketData = () => {
  const [data, setData] = useState<StockMarketData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockMarketData = async () => {
      setLoading(true);
      try {
        // In a real application, this would fetch from Lusaka Stock Exchange API
        // Using simulated data for now
        const stockMarketData: StockMarketData = {
          index: {
            value: 8742.61,
            change: "+2.36%",
            isPositive: true,
            lastUpdated: new Date().toLocaleDateString(),
            recentPerformance: [
              { date: "2025-04-15", value: 8742.61 },
              { date: "2025-04-14", value: 8540.47 },
              { date: "2025-04-13", value: 8489.23 },
              { date: "2025-04-12", value: 8512.75 },
              { date: "2025-04-11", value: 8563.19 },
              { date: "2025-04-10", value: 8481.36 },
              { date: "2025-04-09", value: 8415.92 }
            ]
          },
          stocks: [
            { symbol: "ZANAF", name: "Zambia National Commercial Bank", price: 3.87, change: "+5.17%" },
            { symbol: "ZSUG", name: "Zambia Sugar Plc", price: 4.52, change: "+4.63%" },
            { symbol: "MTNZ", name: "MTN Zambia", price: 7.25, change: "+3.87%" },
            { symbol: "ZCCM", name: "ZCCM Investment Holdings", price: 12.68, change: "+3.42%" },
            { symbol: "CECA", name: "Copperbelt Energy Corporation", price: 5.31, change: "+2.91%" },
            { symbol: "LUSE", name: "Lusaka Water & Sewerage", price: 2.78, change: "+1.84%" },
            { symbol: "ZMBL", name: "Zambeef Products", price: 6.12, change: "+1.49%" },
            { symbol: "PEZA", name: "Prime Energy Zambia", price: 8.97, change: "+0.79%" }
          ]
        };
        
        setData(stockMarketData);
      } catch (err) {
        console.error('Failed to fetch stock market data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStockMarketData();
  }, []);

  return { data, loading, error };
};
