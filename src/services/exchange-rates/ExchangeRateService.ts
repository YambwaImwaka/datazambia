
import { supabase } from "@/integrations/supabase/client";

export interface ExchangeRateData {
  rates: Record<string, number>;
  base: string;
  date: string;
}

/**
 * Fetch exchange rates against Zambian Kwacha (ZMW) using Finnhub.io API
 */
export const fetchExchangeRates = async (): Promise<ExchangeRateData> => {
  // Directly hardcoding the API key as requested by the user
  const FINNHUB_API_KEY = "cvlk1npr01qj3umdsk00cvlk1npr01qj3umdsk0g";
  const base = "ZMW";

  if (!FINNHUB_API_KEY) {
    throw new Error("Finnhub API key is not set in environment variables.");
  }

  try {
    // Finnhub provides currency exchange rates as individual pairs
    // We'll fetch a selection of commonly used currencies vs ZMW

    const currencies = [
      "USD", "EUR", "GBP", "CNY", "ZAR", "JPY", "AUD", "CAD", "CHF", "SGD"
    ];

    const rates: Record<string, number> = {};

    // Fetch each currency pair one-by-one
    // Finnhub endpoint example: https://finnhub.io/api/v1/forex/rates?base=ZMW&token=API_KEY
    // However, Finnhub’s forex/rates endpoint returns all available pairs keyed by currency symbol
    const url = `https://finnhub.io/api/v1/forex/rates?base=${base}&token=${FINNHUB_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch exchange rates: ${response.status} - ${errorText}`);
    }

    const result = await response.json();

    if (!result || !result.rates) {
      throw new Error("Invalid response format from Finnhub");
    }

    // Extract the rates for our desired currencies
    for (const currency of currencies) {
      if (result.rates[currency]) {
        rates[currency] = result.rates[currency];
      }
    }

    return {
      base,
      date: new Date().toISOString().split('T')[0],
      rates
    };

  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

