
import { useState, useEffect } from 'react';

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
