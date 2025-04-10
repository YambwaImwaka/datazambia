
import { supabase } from "@/integrations/supabase/client";

export interface CommodityPrice {
  name: string;
  price: number;
  unit: string;
  change: string;
  isPositive: boolean;
}

/**
 * Fetch commodity prices for key Zambian exports
 */
export const fetchCommodityPrices = async (): Promise<CommodityPrice[]> => {
  try {
    // In a real app, this would make an API call to a commodities API or fetch from database
    // For now, we'll return realistic mock data for Zambia's key commodities
    
    const commodities: CommodityPrice[] = [
      {
        name: "Copper",
        price: 8712.45,
        unit: "USD/tonne",
        change: "+2.3%",
        isPositive: true
      },
      {
        name: "Cobalt",
        price: 32547.80,
        unit: "USD/tonne",
        change: "+5.1%",
        isPositive: true
      },
      {
        name: "Gold",
        price: 1986.50,
        unit: "USD/oz",
        change: "-0.8%",
        isPositive: false
      },
      {
        name: "Corn",
        price: 187.35,
        unit: "USD/tonne",
        change: "+1.5%",
        isPositive: true
      },
      {
        name: "Cotton",
        price: 74.20,
        unit: "USD/lb",
        change: "-1.2%",
        isPositive: false
      },
      {
        name: "Tobacco",
        price: 2563.80,
        unit: "USD/tonne",
        change: "+0.7%",
        isPositive: true
      }
    ];
    
    return commodities;
    
    // In a real application with a database:
    // const { data, error } = await supabase
    //   .from('commodity_prices')
    //   .select('*')
    //   .order('updated_at', { ascending: false });
    //
    // if (error) throw error;
    // return data;
    
  } catch (error) {
    console.error('Error fetching commodity prices:', error);
    throw error;
  }
};
