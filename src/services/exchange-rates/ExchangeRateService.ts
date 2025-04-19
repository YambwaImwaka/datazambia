import { supabase } from "@/integrations/supabase/client";

export interface ExchangeRateData {
  rates: Record<string, number>;
  base: string;
  date: string;
}

/**
 * Fetch exchange rates against Zambian Kwacha (ZMW) using ExchangeRate-API
 */
export const fetchExchangeRates = async (): Promise<ExchangeRateData> => {
  // Use the provided API key for ExchangeRate-API.com
  const API_KEY = "ecaef261eb208cf1dbcbfd59";
  const base = "ZMW";

  if (!API_KEY) {
    throw new Error("Exchange Rate API key is not set.");
  }

  try {
    // Example URL: https://v6.exchangerate-api.com/v6/ecaef261eb208cf1dbcbfd59/latest/ZMW
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch exchange rates: ${response.status} - ${errorText}`);
    }

    const result = await response.json();

    if (result.result !== "success" || !result.conversion_rates) {
      throw new Error("Invalid response format from ExchangeRate-API");
    }

    // Use specified currencies to keep consistent
    const currencies = [
      "USD", "EUR", "GBP", "CNY", "ZAR", "JPY", "AUD", "CAD", "CHF", "SGD"
    ];

    const rates: Record<string, number> = {};

    for (const currency of currencies) {
      if (result.conversion_rates[currency]) {
        rates[currency] = result.conversion_rates[currency];
      }
    }

    return {
      base,
      date: result.time_last_update_utc || new Date().toISOString().split('T')[0],
      rates
    };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};
