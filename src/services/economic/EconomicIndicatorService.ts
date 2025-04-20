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
 * Flattens raw JSON economic data with multiple categories and returns a flat array of EconomicIndicator.
 */
export const fetchEconomicIndicators = async (): Promise<EconomicIndicator[]> => {
  try {
    // Updated rawData replaced with the latest JSON dataset as provided by user
    const rawData = {
      "Macroeconomic_Overview": {
        "Nominal_GDP_2023": {
          "value": "$29.2 billion",
          "source": "World Bank",
          "link": "https://data.worldbank.org/country/zambia"
        },
        "GDP_Growth_Rate_2023": {
          "value": 0.047,
          "source": "IMF",
          "link": "https://www.imf.org/en/Countries/ZMB"
        },
        "GDP_Per_Capita_2023": {
          "value": "$1,480",
          "source": "World Bank",
          "link": "https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=ZM"
        },
        "Inflation_Rate_May_2024": {
          "value": 0.138,
          "source": "ZamStats",
          "link": "ZamStats"
        },
        "Unemployment_Rate_2023": {
          "value": 0.124,
          "source": "ILO",
          "link": "https://www.ilo.org/ilostat/"
        },
        "National_Debt_to_GDP_2023": {
          "value": 0.713,
          "source": "Bank of Zambia",
          "link": "Bank of Zambia"
        },
        "Exchange_Rate_April_2025": {
          "value": "1 USD = 28.5 ZMW",
          "source": "BoZ",
          "link": "https://www.boz.zm/financial-markets/exchange-rates.htm"
        },
        "Foreign_Reserves_2024": {
          "value": "$3.1 billion",
          "source": "BoZ",
          "link": "https://www.boz.zm/financial-markets/exchange-rates.htm"
        },
        "Current_Account_Balance_2023": {
          "value": "-$1.2 billion",
          "source": "IMF",
          "link": "https://www.imf.org/en/Publications/WEO"
        }
      },
      "Sectoral_Contributions_to_GDP_2023": {
        "Agriculture": {
          "value": 0.031,
          "source": "ZamStats",
          "link": "https://www.zamstats.gov.zm/"
        },
        "Mining_Quarrying": {
          "value": 0.124,
          "source": "ZamStats",
          "link": "https://www.zamstats.gov.zm/"
        },
        "Manufacturing": {
          "value": 0.082,
          "source": "ZamStats",
          "link": "https://www.zamstats.gov.zm/"
        },
        "Services": {
          "value": 0.547,
          "source": "ZamStats",
          "link": "https://www.zamstats.gov.zm/"
        },
        "Construction": {
          "value": 0.069,
          "source": "ZamStats",
          "link": "https://www.zamstats.gov.zm/"
        }
      },
      "Trade_Exports": {
        "Total_Exports_2023": {
          "value": "$10.5 billion",
          "source": "ITC Trade Map",
          "link": "https://www.trademap.org/"
        },
        "Top_Export_Copper": {
          "value": "70% of exports",
          "source": "Bank of Zambia",
          "link": "https://www.boz.zm/"
        },
        "Copper_Production_2023": {
          "value": "763,000 metric tons",
          "source": "USGS",
          "link": "https://www.usgs.gov/"
        },
        "Cobalt_Production_2023": {
          "value": "8,500 metric tons",
          "source": "USGS",
          "link": "https://www.usgs.gov/"
        },
        "Total_Imports_2023": {
          "value": "$8.9 billion",
          "source": "ZRA",
          "link": "https://www.zra.org.zm/"
        },
        "Trade_Balance_2023": {
          "value": "+$1.6 billion",
          "source": "ZRA",
          "link": "https://www.zra.org.zm/"
        }
      },
      "Fiscal_Government_Finance": {
        "Budget_Deficit_2023": {
          "value": "6.8% of GDP",
          "source": "Ministry of Finance",
          "link": "https://www.mof.gov.zm/"
        },
        "Tax_Revenue_2023": {
          "value": "16.2% of GDP",
          "source": "ZRA",
          "link": "https://www.zra.org.zm/"
        },
        "External_Debt_2024": {
          "value": "$14.3 billion",
          "source": "World Bank",
          "link": "https://data.worldbank.org/"
        },
        "Domestic_Debt_2024": {
          "value": "$5.8 billion",
          "source": "Bank of Zambia",
          "link": "https://www.boz.zm/"
        }
      },
      "Mining_Natural_Resources": {
        "Copper_Reserves_2023": {
          "value": "20 million tons",
          "source": "Zambia Chamber of Mines",
          "link": "https://www.zambiamining.co.zm/"
        },
        "Gold_Production_2023": {
          "value": "3.2 metric tons",
          "source": "Bank of Zambia",
          "link": "https://www.boz.zm/"
        },
        "Mining_FDI_2023": {
          "value": "$1.2 billion",
          "source": "ZDA",
          "link": "https://www.zda.org.zm/"
        }
      },
      "Agriculture": {
        "Maize_Production_2023": {
          "value": "3.1 million tons",
          "source": "FAO",
          "link": "https://www.fao.org/"
        },
        "Tobacco_Exports_2023": {
          "value": "$320 million",
          "source": "ITC",
          "link": "https://www.trademap.org/"
        }
      },
      "Energy_Infrastructure": {
        "Electricity_Production_2023": {
          "value": "14.5 TWh",
          "source": "ZESCO",
          "link": "https://www.zesco.co.zm/"
        },
        "Road_Network_Length": {
          "value": "67,000 km",
          "source": "RDA",
          "link": "https://www.rda.org.zm/"
        }
      },
      "Financial_Sector": {
        "Banking_Sector_Assets_2023": {
          "value": "$9.8 billion",
          "source": "BoZ",
          "link": "https://www.boz.zm/"
        },
        "Policy_Interest_Rate_2024": {
          "value": "12.5%",
          "source": "BoZ",
          "link": "https://www.boz.zm/"
        }
      },
      "Demographics_Social_Indicators": {
        "Population_2024": {
          "value": "20.9 million",
          "source": "UN",
          "link": "https://population.un.org/"
        },
        "Poverty_Rate_2023": {
          "value": 0.544,
          "source": "World Bank",
          "link": "https://data.worldbank.org/"
        },
        "Human_Development_Index": {
          "value": 0.584,
          "source": "UNDP",
          "link": "https://hdr.undp.org/"
        }
      },
      "Foreign_Investment_Tourism": {
        "FDI_Inflows_2023": {
          "value": "$1.5 billion",
          "source": "UNCTAD",
          "link": "https://unctad.org/"
        },
        "Tourist_Arrivals_2023": {
          "value": "1.2 million",
          "source": "Zambia Tourism Agency",
          "link": "https://www.zambiatourism.com/"
        }
      }
    };
    
    // Helper to convert decimal numbers (0-1) to percent strings if applicable
    function toPercentString(val: number | string): string {
      if (typeof val === "number") {
        return `${(val * 100).toFixed(1)}%`;
      }
      if (typeof val === "string" && !val.includes("%") && !isNaN(Number(val))) {
        return `${(Number(val) * 100).toFixed(1)}%`;
      }
      return String(val);
    }
    
    // Checks if the metric typically benefits from higher values (positive) or not (negative)
    function isPositiveIndicator(name: string, val: string): boolean {
      // List indicators where a higher value is negative
      const negativeIndicatorsKeywords = [
        "Inflation", "Unemployment", "Debt", "Deficit", "Current Account", "Poverty"
      ];
      for (const keyword of negativeIndicatorsKeywords) {
        if (name.includes(keyword)) {
          // Negative if the number is positive (simplified heuristic)
          // except if value is a negative number (e.g. deficit)
          const numericVal = parseFloat(val.replace(/[^-\d\.]/g, ''));
          if (!isNaN(numericVal)) {
            return numericVal <= 0; // zero or negative is positive situation
          }
          return false; // default
        }
      }
      // Most other indicators, higher is positive
      return true;
    }
    
    // Descriptions for all metrics - a best effort based on name
    const descriptionMap: Record<string,string> = {
      "Nominal_GDP_2023": "Nominal Gross Domestic Product for the year 2023.",
      "GDP_Growth_Rate_2023": "Annual growth rate of Zambia's GDP in 2023.",
      "GDP_Per_Capita_2023": "GDP per person in Zambia for 2023.",
      "Inflation_Rate_May_2024": "Inflation rate measured as of May 2024.",
      "Unemployment_Rate_2023": "Unemployment rate for the year 2023.",
      "National_Debt_to_GDP_2023": "Ratio of national debt to GDP in 2023.",
      "Exchange_Rate_April_2025": "Exchange rate of USD to ZMW as of April 2025.",
      "Foreign_Reserves_2024": "Foreign currency reserves held by the Bank of Zambia in 2024.",
      "Current_Account_Balance_2023": "Zambia's current account balance in 2023 (surplus or deficit).",
      "Agriculture": "Contribution of agriculture sector to GDP in 2023.",
      "Mining_Quarrying": "Contribution of mining and quarrying sector to GDP in 2023.",
      "Manufacturing": "Contribution of manufacturing sector to GDP in 2023.",
      "Services": "Contribution of services sector to GDP in 2023.",
      "Construction": "Contribution of construction sector to GDP in 2023.",
      "Total_Exports_2023": "Total exports value in 2023.",
      "Top_Export_Copper": "Share of copper in total exports.",
      "Copper_Production_2023": "Quantity of copper produced in 2023.",
      "Cobalt_Production_2023": "Quantity of cobalt produced in 2023.",
      "Total_Imports_2023": "Total imports value in 2023.",
      "Trade_Balance_2023": "Trade balance (exports minus imports) for 2023.",
      "Budget_Deficit_2023": "Budget deficit as percentage of GDP in 2023.",
      "Tax_Revenue_2023": "Tax revenue as percentage of GDP in 2023.",
      "External_Debt_2024": "External governmental debt in 2024.",
      "Domestic_Debt_2024": "Domestic governmental debt in 2024.",
      "Copper_Reserves_2023": "Copper reserves available as of 2023.",
      "Gold_Production_2023": "Gold production in metric tons for 2023.",
      "Mining_FDI_2023": "Foreign direct investment in mining sector in 2023.",
      "Maize_Production_2023": "Maize production volume in 2023.",
      "Tobacco_Exports_2023": "Value of tobacco exports in 2023.",
      "Electricity_Production_2023": "Electricity produced in 2023.",
      "Road_Network_Length": "Total length of road networks.",
      "Banking_Sector_Assets_2023": "Total assets in banking sector for 2023.",
      "Policy_Interest_Rate_2024": "Monetary policy interest rate in 2024.",
      "Population_2024": "Population estimate in 2024.",
      "Poverty_Rate_2023": "Poverty rate in 2023.",
      "Human_Development_Index": "Human Development Index rating.",
      "FDI_Inflows_2023": "Foreign direct investment inflows in 2023.",
      "Tourist_Arrivals_2023": "Number of tourist arrivals in 2023."
    };

    const lastUpdatedMap: Record<string,string> = {
      // Using year approximation based on metric names
      "Nominal_GDP_2023": "2023",
      "GDP_Growth_Rate_2023": "2023",
      "GDP_Per_Capita_2023": "2023",
      "Inflation_Rate_May_2024": "May 2024",
      "Unemployment_Rate_2023": "2023",
      "National_Debt_to_GDP_2023": "2023",
      "Exchange_Rate_April_2025": "April 2025",
      "Foreign_Reserves_2024": "2024",
      "Current_Account_Balance_2023": "2023",
      "Agriculture": "2023",
      "Mining_Quarrying": "2023",
      "Manufacturing": "2023",
      "Services": "2023",
      "Construction": "2023",
      "Total_Exports_2023": "2023",
      "Top_Export_Copper": "2023",
      "Copper_Production_2023": "2023",
      "Cobalt_Production_2023": "2023",
      "Total_Imports_2023": "2023",
      "Trade_Balance_2023": "2023",
      "Budget_Deficit_2023": "2023",
      "Tax_Revenue_2023": "2023",
      "External_Debt_2024": "2024",
      "Domestic_Debt_2024": "2024",
      "Copper_Reserves_2023": "2023",
      "Gold_Production_2023": "2023",
      "Mining_FDI_2023": "2023",
      "Maize_Production_2023": "2023",
      "Tobacco_Exports_2023": "2023",
      "Electricity_Production_2023": "2023",
      "Road_Network_Length": "",
      "Banking_Sector_Assets_2023": "2023",
      "Policy_Interest_Rate_2024": "2024",
      "Population_2024": "2024",
      "Poverty_Rate_2023": "2023",
      "Human_Development_Index": "",
      "FDI_Inflows_2023": "2023",
      "Tourist_Arrivals_2023": "2023"
    };

    const indicators: EconomicIndicator[] = [];

    // We flatten the categories and indicators
    for (const [category, metrics] of Object.entries(rawData)) {
      for (const [key, data] of Object.entries(metrics)) {
        // Compose readable name e.g. replace _ with spaces and remove years
        // We keep the original key as name for consistent access to maps
        const sentenceCase = key
          .replace(/_/g, " ")
          .replace(/\b\d{4}\b/g, "")  // remove years (4 digits)
          .replace(/\s{2,}/g, " ")    // eliminate double spaces
          .trim();

        // Format value string properly
        let valueStr = "";
        if (typeof data.value === "number") {
          // Convert decimals like GDP growth and inflation to percents
          // Heuristic: if the original key or category suggests percentage or rate, convert
          if (
            key.toLowerCase().includes("rate") ||
            key.toLowerCase().includes("inflation") ||
            key.toLowerCase().includes("unemployment") ||
            key.toLowerCase().includes("debt") ||
            key.toLowerCase().includes("deficit") ||
            key.toLowerCase().includes("poverty")
          ) {
            valueStr = toPercentString(data.value);
          } else {
            valueStr = data.value.toString();
          }
        } else if (typeof data.value === "string") {
          valueStr = data.value;
        } else {
          valueStr = String(data.value);
        }

        // Determine positivity heuristically
        const isPositive = isPositiveIndicator(key, valueStr);

        // Fetch description and last updated info
        const description = descriptionMap[key] || "";
        const lastUpdated = lastUpdatedMap[key] || "";

        // Finally push a fully formed indicator
        indicators.push({
          name: sentenceCase,
          value: valueStr,
          change: "-", // No change info available currently
          isPositive,
          description,
          source: data.source || "",
          sourceLink: data.link || "",
          lastUpdated
        });
      }
    }

    return indicators;
  } catch (error) {
    console.error("Error fetching economic indicators:", error);
    throw error;
  }
};
