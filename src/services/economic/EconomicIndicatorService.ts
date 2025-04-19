
import { supabase } from "@/integrations/supabase/client";

export interface EconomicIndicator {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  description: string;
  source: string;
  sourceLink?: string;
  lastUpdated: string;
}

/**
 * Fetch economic indicators with real data and source links.
 * The function uses the provided static JSON data and enriches it with 
 * descriptions and processing such as formatting values and setting positivity.
 */
export const fetchEconomicIndicators = async (): Promise<EconomicIndicator[]> => {
  try {
    // Data loaded from user's provided JSON with added descriptions and logic
    
    const rawIndicators = [
      {
        indicator: "Nominal GDP (2023)",
        value: "$29.2 billion",
        source: "World Bank",
        link: "https://data.worldbank.org/country/zambia"
      },
      {
        indicator: "GDP Growth Rate (2023)",
        value: "0.047",
        source: "IMF",
        link: "https://www.imf.org/en/Countries/ZMB"
      },
      {
        indicator: "GDP Per Capita (2023)",
        value: "$1,480",
        source: "World Bank",
        link: "https://data.worldbank.org/indicator/NY.GDP.PCAP.CD"
      },
      {
        indicator: "Inflation Rate (May 2024)",
        value: "0.138",
        source: "ZamStats",
        link: "ZamStats"
      },
      {
        indicator: "Unemployment Rate (2023)",
        value: "0.124",
        source: "ILO",
        link: "https://www.ilo.org/ilostat/"
      },
      {
        indicator: "National Debt-to-GDP (2023)",
        value: "0.713",
        source: "Bank of Zambia",
        link: "Bank of Zambia"
      },
      {
        indicator: "Exchange Rate (April 2025)",
        value: "1 USD = 28.5 ZMW",
        source: "BoZ",
        link: "https://www.boz.zm/financial-markets/exchange-rates"
      },
      {
        indicator: "Foreign Reserves (2024)",
        value: "$3.1 billion",
        source: "BoZ",
        link: "https://www.boz.zm/financial-markets/exchange-rates"
      },
      {
        indicator: "Current Account Balance (2023)",
        value: "-$1.2 billion",
        source: "IMF",
        link: "https://www.imf.org/en/Publications/WEO"
      }
    ];

    // Helper to convert decimal strings to percents if applicable
    const toPercentString = (val: string) => {
      const num = parseFloat(val);
      if (isNaN(num)) return val;
      return `${(num * 100).toFixed(1)}%`;
    };

    // Helper to determine if a value change is positive or negative (heuristic)
    const isPositiveIndicator = (name: string, value: string): boolean => {
      if (name.includes('Inflation') || name.includes('Unemployment') || name.includes('Debt') || name.includes('Deficit') || name.includes('Current Account')) {
        // These higher values are generally negative except negative numbers indicating surplus are positive
        return !(parseFloat(value.replace(/[^-\d.]/g, '')) > 0);
      }
      // For other indicators, higher is generally positive
      return true;
    };

    // Process and enrich indicators with descriptions, formatted values, positivity etc.
    const indicators: EconomicIndicator[] = rawIndicators.map(item => {
      let formattedValue = item.value;
      if (item.indicator.includes('Rate') || item.indicator.includes('Inflation') || item.indicator.includes('Unemployment') || item.indicator.includes('Debt')) {
        // Convert decimal to percent string where provided as decimal
        if (!formattedValue.includes('%')) {
          formattedValue = toPercentString(formattedValue);
        }
      }

      // Description can be generated from the indicator string
      const descMap: Record<string,string> = {
        "Nominal GDP (2023)": "Nominal Gross Domestic Product for the year 2023.",
        "GDP Growth Rate (2023)": "GDP Growth Rate for the year 2023.",
        "GDP Per Capita (2023)": "GDP per capita data for 2023.",
        "Inflation Rate (May 2024)": "Inflation rate measured by ZamStats as of May 2024.",
        "Unemployment Rate (2023)": "Unemployment rate estimated by ILO for 2023.",
        "National Debt-to-GDP (2023)": "Debt to GDP ratio for Zambia in 2023.",
        "Exchange Rate (April 2025)": "Exchange rate as of April 2025.",
        "Foreign Reserves (2024)": "Foreign currency reserves held by the Bank of Zambia for 2024.",
        "Current Account Balance (2023)": "Current account balance for 2023 as reported by IMF."
      };

      const lastUpdatedMap: Record<string,string> = {
        "Nominal GDP (2023)": "2023",
        "GDP Growth Rate (2023)": "2023",
        "GDP Per Capita (2023)": "2023",
        "Inflation Rate (May 2024)": "May 2024",
        "Unemployment Rate (2023)": "2023",
        "National Debt-to-GDP (2023)": "2023",
        "Exchange Rate (April 2025)": "April 2025",
        "Foreign Reserves (2024)": "2024",
        "Current Account Balance (2023)": "2023"
      };

      return {
        name: item.indicator,
        value: formattedValue,
        change: "-", // No change info available
        isPositive: isPositiveIndicator(item.indicator, formattedValue),
        description: descMap[item.indicator] || "",
        source: item.source || "",
        sourceLink: item.link || "",
        lastUpdated: lastUpdatedMap[item.indicator] || ""
      };
    });

    return indicators;
  } catch (error) {
    console.error("Error fetching economic indicators:", error);
    throw error;
  }
};
