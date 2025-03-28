import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

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

// Base API URL for economic data
const ECONOMIC_API_URL = "https://api.worldbank.org/v2/country/ZMB/indicator";

// Get economic indicators from real data sources
export const useEconomicIndicators = () => {
  const [data, setData] = useState<EconomicIndicator[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEconomicData = async () => {
      setLoading(true);
      try {
        // Indicator codes for various economic metrics
        const indicators = {
          inflation: "FP.CPI.TOTL.ZG", // Inflation, consumer prices (annual %)
          gdpGrowth: "NY.GDP.MKTP.KD.ZG", // GDP growth (annual %)
          interestRate: "FR.INR.LEND", // Lending interest rate (%)
          debtToGdp: "GC.DOD.TOTL.GD.ZS", // Central government debt, total (% of GDP)
          fiscalBalance: "GC.BAL.CASH.GD.ZS", // Cash surplus/deficit (% of GDP)
          unemploymentRate: "SL.UEM.TOTL.ZS" // Unemployment, total (% of total labor force)
        };

        // Fetch data for each indicator
        const responses = await Promise.all(
          Object.entries(indicators).map(async ([key, code]) => {
            const response = await fetch(
              `${ECONOMIC_API_URL}/${code}?format=json&per_page=5`, 
              { headers: { 'Content-Type': 'application/json' } }
            );
            
            if (!response.ok) {
              throw new Error(`Failed to fetch ${key} data: ${response.status}`);
            }
            
            const data = await response.json();
            return { key, data: data[1] || [] }; // World Bank API returns an array with metadata and data
          })
        );

        // Process and transform the data
        const processedData: EconomicIndicator[] = responses
          .filter(response => response.data && response.data.length > 0)
          .map(response => {
            const { key, data } = response;
            // Sort by date (newest first)
            const sortedData = [...data].sort((a, b) => 
              parseInt(b.date) - parseInt(a.date)
            );
            
            // Get latest and previous values
            const latestData = sortedData[0];
            const previousData = sortedData[1];
            
            // Calculate the change
            const currentValue = latestData?.value || 0;
            const previousValue = previousData?.value || 0;
            const changeValue = currentValue - previousValue;
            const changePercent = previousValue !== 0 
              ? ((changeValue / Math.abs(previousValue)) * 100).toFixed(1) 
              : "0.0";
            
            // Determine if change is positive (need to invert for some metrics)
            let isPositive: boolean;
            if (key === 'inflation' || key === 'interestRate' || key === 'debtToGdp' || key === 'unemploymentRate') {
              isPositive = changeValue < 0;
            } else {
              isPositive = changeValue > 0;
            }

            // Format indicator values
            let formattedValue: string | number = currentValue;
            if (key === 'debtToGdp' || key === 'fiscalBalance' || key === 'inflation' || 
                key === 'interestRate' || key === 'gdpGrowth' || key === 'unemploymentRate') {
              formattedValue = `${Number(currentValue).toFixed(1)}%`;
            }

            // Create indicator names and descriptions
            const names: Record<string, string> = {
              inflation: "Inflation Rate",
              gdpGrowth: "GDP Growth Rate",
              interestRate: "Interest Rate",
              debtToGdp: "National Debt",
              fiscalBalance: "Budget Deficit",
              unemploymentRate: "Unemployment Rate"
            };

            const descriptions: Record<string, string> = {
              inflation: "Year-on-year inflation rate",
              gdpGrowth: "Annual GDP growth rate",
              interestRate: "Central bank policy rate",
              debtToGdp: "Total public debt as % of GDP",
              fiscalBalance: "As percentage of GDP",
              unemploymentRate: "Percentage of labor force"
            };

            const sources: Record<string, string> = {
              inflation: "World Bank/Bank of Zambia",
              gdpGrowth: "World Bank/Zambia Statistics Agency",
              interestRate: "World Bank/Bank of Zambia",
              debtToGdp: "World Bank/Ministry of Finance",
              fiscalBalance: "World Bank/Ministry of Finance",
              unemploymentRate: "World Bank/Zambia Statistics Agency"
            };

            // Format the date
            const dateStr = latestData?.date;
            let formattedDate = dateStr;
            
            if (dateStr && dateStr.length === 4) {
              // It's just a year
              formattedDate = dateStr;
            } else if (dateStr) {
              // Try to format as a proper date
              try {
                const date = new Date(dateStr);
                formattedDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
              } catch (e) {
                // If parsing fails, keep original format
                formattedDate = dateStr;
              }
            }

            return {
              name: names[key] || key,
              value: formattedValue,
              change: `${changeValue < 0 ? '' : '+'}${changePercent}%`,
              isPositive,
              description: descriptions[key] || latestData.indicator.value,
              lastUpdated: formattedDate || "Not available",
              source: sources[key] || "World Bank"
            };
          });

        setData(processedData);
      } catch (err) {
        console.error('Failed to fetch economic data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        
        // Notify the user about the error
        toast({
          title: "Data Fetch Error",
          description: "Failed to fetch economic indicators. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEconomicData();
  }, []);

  return { data, loading, error };
};
