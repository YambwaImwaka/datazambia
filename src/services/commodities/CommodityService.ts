
import { useState, useEffect } from 'react';

// Commodity types
export interface CommodityPrice {
  name: string;
  price: number;
  unit: string;
  change: string;
  isPositive: boolean;
}

// Get commodity prices relevant to Zambia's exports
export const useCommodityPrices = () => {
  const [data, setData] = useState<CommodityPrice[] | null>(null);
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
