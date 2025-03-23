
import { ExchangeRateData } from "@/services/exchange-rates/ExchangeRateService";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ExchangeRatesSectionProps {
  exchangeRates: ExchangeRateData | null;
  loading: boolean;
  isVisible: boolean;
}

export const ExchangeRatesSection = ({ exchangeRates, loading, isVisible }: ExchangeRatesSectionProps) => {
  // Function to format exchange rates for display
  const formatExchangeRate = (currency: string, inverted: number) => {
    if (!inverted) return "N/A";
    // Example: If 1 ZMW = 0.05 USD, then 1 USD = 20 ZMW
    return `${currency}/ZMW: ${inverted.toFixed(2)}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Current Exchange Rates
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Live currency exchange rates against the Zambian Kwacha (ZMW)
      </p>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {Array(5).fill(0).map((_, i) => (
            <Card key={`skeleton-${i}`} className="p-6">
              <Skeleton className="h-8 w-16 mb-4" />
              <Skeleton className="h-10 w-28 mb-3" />
              <Skeleton className="h-5 w-20" />
            </Card>
          ))}
        </div>
      ) : exchangeRates ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {Object.entries(exchangeRates.rates).map(([currency, rate], index) => (
            <Card 
              key={currency}
              className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
              style={{ 
                opacity: 0,
                animation: isVisible ? `fade-in 0.5s ease-out ${index * 0.1}s forwards` : "none"
              }}
            >
              <div className="text-xl font-bold text-gray-500 dark:text-gray-400 mb-2">
                {currency}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {rate.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formatExchangeRate(currency, rate)}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400">
            No exchange rate data available
          </p>
        </div>
      )}
      
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-right">
        <p>Data updated: {exchangeRates?.date || new Date().toISOString().split('T')[0]}</p>
        <p>Source: ExchangeRate-API</p>
      </div>
    </div>
  );
};

export default ExchangeRatesSection;
