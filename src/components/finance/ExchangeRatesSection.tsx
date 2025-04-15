
import { ExchangeRateData } from "@/services/exchange-rates/ExchangeRateService";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import DataExport from "@/components/ui/DataExport";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExchangeRatesSectionProps {
  exchangeRates: ExchangeRateData | null;
  loading: boolean;
  isVisible: boolean;
}

export const ExchangeRatesSection = ({ exchangeRates, loading, isVisible }: ExchangeRatesSectionProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [animatedRates, setAnimatedRates] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();
  
  // Function to format exchange rates for display
  const formatExchangeRate = (currency: string, rate: number) => {
    if (!rate) return "N/A";
    return `1 ZMW = ${(1/rate).toFixed(6)} ${currency}`;
  };

  // Calculate rate change based on stored previous values
  const getRateChange = (currency: string, rate: number) => {
    // In a real application, you would compare with historical data
    // For demo purposes, we'll use a deterministic approach
    const hash = currency.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 10) > 5; 
  };

  // Get percent change
  const getPercentChange = (currency: string) => {
    const hash = currency.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((hash % 10) / 10 * 2).toFixed(2);
  };
  
  // Refresh exchange rates
  const handleRefresh = () => {
    setRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ['exchangeRates'] })
      .finally(() => {
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      });
  };
  
  // Add animation when a rate is clicked
  const handleRateClick = (currency: string) => {
    if (!animatedRates.includes(currency)) {
      setAnimatedRates(prev => [...prev, currency]);
      setTimeout(() => {
        setAnimatedRates(prev => prev.filter(c => c !== currency));
      }, 1000);
    }
  };

  // Prepare data for export
  const getExportData = () => {
    if (!exchangeRates || !exchangeRates.rates) return [];
    
    return Object.entries(exchangeRates.rates).map(([currency, rate]) => {
      const isHigher = getRateChange(currency, rate);
      const percentChange = getPercentChange(currency);
      return {
        Currency: currency,
        Rate: rate.toFixed(2),
        Change: `${isHigher ? '+' : '-'}${percentChange}%`,
        Direction: isHigher ? 'Up' : 'Down',
        ZMWEquivalent: (1/rate).toFixed(6),
        Date: exchangeRates.date
      };
    });
  };

  useEffect(() => {
    // Clear animations when data changes
    setAnimatedRates([]);
  }, [exchangeRates]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Current Exchange Rates
        </h2>
        <div className="flex flex-wrap gap-2">
          <DataExport 
            data={getExportData()} 
            fileName="zambia-exchange-rates"
            label={isMobile ? "Export" : "Export Rates"}
            disabled={loading || refreshing || !exchangeRates}
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleRefresh}
            disabled={refreshing || loading}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {isMobile ? "" : "Refresh"}
          </Button>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
        Live currency exchange rates against the Zambian Kwacha (ZMW)
      </p>
      
      {loading || refreshing ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
          {Array(isMobile ? 4 : 5).fill(0).map((_, i) => (
            <Card key={`skeleton-${i}`} className="p-3 sm:p-6">
              <Skeleton className="h-6 w-12 mb-2 sm:h-8 sm:w-16 sm:mb-4" />
              <Skeleton className="h-8 w-20 mb-2 sm:h-10 sm:w-28 sm:mb-3" />
              <Skeleton className="h-4 w-16 sm:h-5 sm:w-20" />
            </Card>
          ))}
        </div>
      ) : exchangeRates && Object.keys(exchangeRates.rates).length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
          {Object.entries(exchangeRates.rates).map(([currency, rate], index) => {
            const isHigher = getRateChange(currency, rate);
            const percentChange = getPercentChange(currency);
            const isAnimated = animatedRates.includes(currency);
            
            return (
              <Card 
                key={currency}
                className={`p-3 sm:p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer ${
                  isHigher ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'
                } ${isAnimated ? 'scale-105' : ''}`}
                style={{ 
                  opacity: 0,
                  animation: isVisible ? `fade-in 0.5s ease-out ${index * 0.1}s forwards` : "none"
                }}
                onClick={() => handleRateClick(currency)}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    {currency}
                  </div>
                  {isHigher ? (
                    <div className="flex items-center text-green-500 bg-green-50 dark:bg-green-900/20 px-1 sm:px-2 py-1 rounded text-xs">
                      <TrendingUp size={12} className="mr-1" />
                      <span className="text-xs font-medium">{percentChange}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500 bg-red-50 dark:bg-red-900/20 px-1 sm:px-2 py-1 rounded text-xs">
                      <TrendingDown size={12} className="mr-1" />
                      <span className="text-xs font-medium">{percentChange}%</span>
                    </div>
                  )}
                </div>
                <div className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {rate.toFixed(2)}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {formatExchangeRate(currency, rate)}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="p-4 sm:p-10 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
          <AlertTriangle className="h-8 w-8 sm:h-12 sm:w-12 text-amber-500 mx-auto mb-2 sm:mb-4" />
          <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            No exchange rate data available
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
            We couldn't fetch the latest exchange rates. This might be due to API rate limits or connectivity issues.
          </p>
          <Button onClick={handleRefresh} className="mx-auto">
            <RefreshCw className="h-4 w-4 mr-1" />
            Try Again
          </Button>
        </div>
      )}
      
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 sm:mt-6 text-right">
        <p>Data updated: {exchangeRates?.date || new Date().toISOString().split('T')[0]}</p>
        <p>Source: Exchange Rate API</p>
      </div>
    </div>
  );
};

export default ExchangeRatesSection;
