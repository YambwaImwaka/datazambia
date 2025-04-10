
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
 */
export const fetchEconomicIndicators = async (): Promise<EconomicIndicator[]> => {
  try {
    // In a real app, this would fetch from a database or API
    // For now, we'll return realistic mock data
    
    const indicators: EconomicIndicator[] = [
      {
        name: "GDP Growth Rate",
        value: "4.2%",
        change: "+1.3%",
        isPositive: true,
        description: "Annual GDP growth based on constant local currency. Shows economic expansion or contraction.",
        source: "World Bank",
        lastUpdated: "Jun 2024"
      },
      {
        name: "Inflation Rate",
        value: "7.8%",
        change: "-2.3%",
        isPositive: true,
        description: "Consumer price inflation, annual percentage change. Measures cost of living increases.",
        source: "Bank of Zambia",
        lastUpdated: "Jul 2024"
      },
      {
        name: "Unemployment Rate",
        value: "20.3%",
        change: "-2.0%",
        isPositive: true,
        description: "Percentage of labor force that is unemployed but actively seeking employment.",
        source: "Zambia Statistics Agency",
        lastUpdated: "May 2024"
      },
      {
        name: "Foreign Reserves",
        value: "$2.8B",
        change: "+12.0%",
        isPositive: true,
        description: "Foreign currency reserves held by the Bank of Zambia, in USD billions.",
        source: "Bank of Zambia",
        lastUpdated: "Jul 2024"
      },
      {
        name: "Interest Rate",
        value: "9.5%",
        change: "-0.5%",
        isPositive: true,
        description: "Central bank policy interest rate, used to manage monetary policy.",
        source: "Bank of Zambia",
        lastUpdated: "Jul 2024"
      },
      {
        name: "External Debt",
        value: "$12.6B",
        change: "+3.2%",
        isPositive: false,
        description: "Total external debt stock in USD billions.",
        source: "Ministry of Finance",
        lastUpdated: "Jun 2024"
      },
      {
        name: "Fiscal Deficit",
        value: "-5.7%",
        change: "+0.8%",
        isPositive: true,
        description: "Fiscal deficit as percentage of GDP. Negative value indicates deficit.",
        source: "Ministry of Finance",
        lastUpdated: "Jun 2024"
      }
    ];
    
    return indicators;
    
    // In a real application with a database:
    // const { data, error } = await supabase
    //   .from('economic_indicators')
    //   .select('*')
    //   .eq('type', 'current')
    //   .order('priority', { ascending: true });
    //
    // if (error) throw error;
    // return data;
    
  } catch (error) {
    console.error('Error fetching economic indicators:', error);
    throw error;
  }
};
