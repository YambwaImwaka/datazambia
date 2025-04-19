
import { supabase } from "@/integrations/supabase/client";

export interface EconomicIndicator {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  description: string;
  source: string;
  lastUpdated: string;
}

/**
 * Fetch economic indicators for Zambia
 * Currently returns real latest data statically from JSON provided by user.
 * Future: could extend to fetch from APIs or scrape from source links.
 */
export const fetchEconomicIndicators = async (): Promise<EconomicIndicator[]> => {
  try {
    // Real data mapped from user JSON, with inferred fields and static mock for description & lastUpdated
    // Note: Links are included in descriptions appended to source for now.
    const indicators: EconomicIndicator[] = [
      {
        name: "Nominal GDP (2023)",
        value: "$29.2 billion",
        change: "-", // No change info given, default "-"
        isPositive: true,
        description: "Nominal Gross Domestic Product for the year 2023.",
        source: "World Bank (https://data.worldbank.org/country/zambia)",
        lastUpdated: "2023"
      },
      {
        name: "GDP Growth Rate (2023)",
        value: "4.7%", // converted 0.047 to percent string
        change: "-", // no change info given
        isPositive: true,
        description: "GDP Growth Rate for the year 2023.",
        source: "IMF (https://www.imf.org/en/Countries/ZMB)",
        lastUpdated: "2023"
      },
      {
        name: "GDP Per Capita (2023)",
        value: "$1,480",
        change: "-",
        isPositive: true,
        description: "GDP per capita data for 2023.",
        source: "World Bank (https://data.worldbank.org/indicator/NY.GDP.PCAP.CD)",
        lastUpdated: "2023"
      },
      {
        name: "Inflation Rate (May 2024)",
        value: "13.8%", // converted 0.138 to percent string
        change: "-",
        isPositive: false, // inflation increasing generally negative, but no trend given
        description: "Inflation rate measured by ZamStats as of May 2024.",
        source: "ZamStats",
        lastUpdated: "May 2024"
      },
      {
        name: "Unemployment Rate (2023)",
        value: "12.4%", // 0.124 percent converted
        change: "-",
        isPositive: false, // high unemployment is generally negative
        description: "Unemployment rate estimated by ILO for 2023.",
        source: "ILO (https://www.ilo.org/ilostat/)",
        lastUpdated: "2023"
      },
      {
        name: "National Debt-to-GDP (2023)",
        value: "71.3%", // 0.713 converted to percent for readability
        change: "-",
        isPositive: false, // higher debt-to-gdp ratio generally negative
        description: "Debt to GDP ratio for Zambia in 2023.",
        source: "Bank of Zambia",
        lastUpdated: "2023"
      },
      {
        name: "Exchange Rate (April 2025)",
        value: "1 USD = 28.5 ZMW",
        change: "-",
        isPositive: true,
        description: "Exchange rate as of April 2025",
        source: "Bank of Zambia (https://www.boz.zm/financial-markets/exchange-rates)",
        lastUpdated: "April 2025"
      },
      {
        name: "Foreign Reserves (2024)",
        value: "$3.1 billion",
        change: "-",
        isPositive: true,
        description: "Foreign currency reserves held by the Bank of Zambia for 2024.",
        source: "Bank of Zambia (https://www.boz.zm/financial-markets/exchange-rates)",
        lastUpdated: "2024"
      },
      {
        name: "Current Account Balance (2023)",
        value: "-$1.2 billion",
        change: "-",
        isPositive: false, // Negative current account balance generally negative
        description: "Current account balance for 2023 as reported by IMF.",
        source: "IMF (https://www.imf.org/en/Publications/WEO)",
        lastUpdated: "2023"
      }
    ];

    return indicators;
  } catch (error) {
    console.error("Error fetching economic indicators:", error);
    throw error;
  }
};

