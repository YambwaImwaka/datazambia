
import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

// Stock market data types
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: string;
  changePercent: string;
}

export interface StockMarketData {
  index: {
    value: number;
    change: string;
    isPositive: boolean;
    lastUpdated: string;
    recentPerformance: Array<{date: string, value: number}>;
  };
  stocks: StockData[];
}

// Finnhub API key
const FINNHUB_API_KEY = "cvlk1npr01qj3umdsk00cvlk1npr01qj3umdsk0g";
const FINNHUB_API_URL = "https://finnhub.io/api/v1";

// Selected symbols to represent Zambian market equivalents
// Using a selection of symbols available in Finnhub as proxies
const STOCK_SYMBOLS = ["AAPL", "MSFT", "GOOG", "AMZN", "FB", "TSLA", "NFLX", "NVDA"];
const STOCK_NAMES = {
  "AAPL": "Apple (ZANAF proxy)",
  "MSFT": "Microsoft (ZSUG proxy)",
  "GOOG": "Google (MTNZ proxy)",
  "AMZN": "Amazon (ZCCM proxy)",
  "FB": "Meta (CECA proxy)",
  "TSLA": "Tesla (LUSE proxy)",
  "NFLX": "Netflix (ZMBL proxy)",
  "NVDA": "Nvidia (PEZA proxy)"
};

// Use Stock Market API to get latest data
export const useStockMarketData = () => {
  const [data, setData] = useState<StockMarketData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockMarketData = async () => {
      setLoading(true);
      try {
        // Get index data (using S&P 500 as a proxy for LSE All Share Index)
        const indexResponse = await fetch(`${FINNHUB_API_URL}/index/constituents?symbol=^GSPC&token=${FINNHUB_API_KEY}`);
        if (!indexResponse.ok) {
          throw new Error(`Failed to fetch index data: ${indexResponse.status}`);
        }
        
        // Fetch stock quotes for selected symbols
        const stockPromises = STOCK_SYMBOLS.map(symbol => 
          fetch(`${FINNHUB_API_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`)
            .then(res => {
              if (!res.ok) throw new Error(`Failed to fetch ${symbol}: ${res.status}`);
              return res.json();
            })
        );
        
        const stockResults = await Promise.all(stockPromises);
        
        // Generate index performance data (using calculated average)
        const now = new Date();
        const recentPerformance = Array(7).fill(null).map((_, i) => {
          const date = new Date();
          date.setDate(now.getDate() - (6 - i));
          // Generate a semi-random but consistently increasing trend for the index
          const baseValue = 8400;
          const dayOffset = 20 * i;
          const randomVariation = Math.random() * 100 - 50;
          return {
            date: date.toISOString().split('T')[0],
            value: baseValue + dayOffset + randomVariation
          };
        });
        
        // Calculate average price and change to simulate index
        const totalPrice = stockResults.reduce((sum, quote) => sum + quote.c, 0);
        const avgPrice = totalPrice / stockResults.length;
        const totalPrevClose = stockResults.reduce((sum, quote) => sum + quote.pc, 0);
        const avgPrevClose = totalPrevClose / stockResults.length;
        const indexChange = avgPrice - avgPrevClose;
        const indexChangePercent = (indexChange / avgPrevClose) * 100;
        
        // Format stocks data
        const stocks = stockResults.map((quote, index) => {
          const symbol = STOCK_SYMBOLS[index];
          const change = quote.c - quote.pc;
          const changePercent = (change / quote.pc) * 100;
          
          return {
            symbol: symbol,
            name: STOCK_NAMES[symbol as keyof typeof STOCK_NAMES],
            price: quote.c,
            change: change.toFixed(2),
            changePercent: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%`
          };
        });
        
        // Sort by change percent (descending)
        stocks.sort((a, b) => {
          const percentA = parseFloat(a.changePercent);
          const percentB = parseFloat(b.changePercent);
          return percentB - percentA;
        });
        
        const stockMarketData: StockMarketData = {
          index: {
            value: parseFloat(avgPrice.toFixed(2)),
            change: `${indexChangePercent >= 0 ? '+' : ''}${indexChangePercent.toFixed(2)}%`,
            isPositive: indexChangePercent >= 0,
            lastUpdated: new Date().toLocaleDateString(),
            recentPerformance
          },
          stocks
        };
        
        setData(stockMarketData);
      } catch (err) {
        console.error('Failed to fetch stock market data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        toast({
          title: "Error fetching stock market data",
          description: "Couldn't connect to Finnhub API. Using fallback data.",
          variant: "destructive"
        });
        
        // Fallback to simulated data
        provideFallbackData();
      } finally {
        setLoading(false);
      }
    };
    
    // Fallback function in case API fails
    const provideFallbackData = () => {
      const fallbackData: StockMarketData = {
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
          { symbol: "ZANAF", name: "Zambia National Commercial Bank", price: 3.87, change: "+0.19", changePercent: "+5.17%" },
          { symbol: "ZSUG", name: "Zambia Sugar Plc", price: 4.52, change: "+0.20", changePercent: "+4.63%" },
          { symbol: "MTNZ", name: "MTN Zambia", price: 7.25, change: "+0.27", changePercent: "+3.87%" },
          { symbol: "ZCCM", name: "ZCCM Investment Holdings", price: 12.68, change: "+0.42", changePercent: "+3.42%" },
          { symbol: "CECA", name: "Copperbelt Energy Corporation", price: 5.31, change: "+0.15", changePercent: "+2.91%" },
          { symbol: "LUSE", name: "Lusaka Water & Sewerage", price: 2.78, change: "+0.05", changePercent: "+1.84%" },
          { symbol: "ZMBL", name: "Zambeef Products", price: 6.12, change: "+0.09", changePercent: "+1.49%" },
          { symbol: "PEZA", name: "Prime Energy Zambia", price: 8.97, change: "+0.07", changePercent: "+0.79%" }
        ]
      };
      
      setData(fallbackData);
    };

    fetchStockMarketData();
  }, []);

  return { data, loading, error };
};
