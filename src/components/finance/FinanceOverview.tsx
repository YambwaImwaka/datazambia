
import { useState, useEffect } from "react";
import { useExchangeRateData, useStockMarketData, useEconomicIndicators, useCommodityPrices } from "@/services/FinanceService";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, DollarSign, BarChart3, TrendingUp, Landmark } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart } from "@/components/charts/LineChart";

export const FinanceOverview = () => {
  const { data: exchangeRates, loading: loadingExchangeRates } = useExchangeRateData();
  const { data: stockMarket, loading: loadingStockMarket } = useStockMarketData();
  const { data: economicIndicators, loading: loadingEconomicIndicators } = useEconomicIndicators();
  const { data: commodityPrices, loading: loadingCommodities } = useCommodityPrices();
  const [activeTab, setActiveTab] = useState("exchange-rates");
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to format exchange rates for display
  const formatExchangeRate = (currency: string, inverted: number) => {
    if (!inverted) return "N/A";
    // Example: If 1 ZMW = 0.05 USD, then 1 USD = 20 ZMW
    return `${currency}/ZMW: ${inverted.toFixed(2)}`;
  };
  
  // Transform stock market performance data for chart
  const getChartData = () => {
    if (!stockMarket) return [];
    return stockMarket.index.recentPerformance?.map(item => ({
      date: item.date.slice(5), // Remove year for cleaner display
      value: item.value
    })) || [];
  };

  return (
    <div 
      className="w-full py-8"
      style={{ 
        opacity: 0,
        animation: isVisible ? "fade-in 0.8s ease-out forwards" : "none"
      }}
    >
      <Tabs defaultValue="exchange-rates" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="exchange-rates" className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Exchange Rates</span>
          </TabsTrigger>
          <TabsTrigger value="stock-market" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Stock Market</span>
          </TabsTrigger>
          <TabsTrigger value="economic-indicators" className="flex items-center space-x-2">
            <Landmark className="h-4 w-4" />
            <span>Economic Indicators</span>
          </TabsTrigger>
          <TabsTrigger value="commodities" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Commodities</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="exchange-rates" className="mt-0">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Current Exchange Rates
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Live currency exchange rates against the Zambian Kwacha (ZMW)
          </p>
          
          {loadingExchangeRates ? (
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
        </TabsContent>
        
        <TabsContent value="stock-market" className="mt-0">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Lusaka Stock Exchange
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Real-time performance of the LuSE All Share Index and top stocks
          </p>
          
          {loadingStockMarket ? (
            <div className="space-y-8">
              <Card className="p-6">
                <Skeleton className="h-8 w-48 mb-4" />
                <Skeleton className="h-10 w-28 mb-3" />
                <Skeleton className="h-5 w-36 mb-8" />
                <Skeleton className="h-60 w-full" />
              </Card>
              
              <div className="mt-8">
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, i) => (
                    <Card key={`stock-skeleton-${i}`} className="p-6">
                      <Skeleton className="h-6 w-36 mb-4" />
                      <Skeleton className="h-10 w-28 mb-3" />
                      <Skeleton className="h-5 w-24" />
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : stockMarket ? (
            <div className="space-y-8" style={{ opacity: 0, animation: isVisible ? "fade-in 0.6s ease-out forwards" : "none" }}>
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      LuSE All Share Index
                    </h3>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {stockMarket.index.value.toLocaleString()}
                      </div>
                      <div className={`flex items-center ml-3 ${stockMarket.index.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {stockMarket.index.isPositive ? 
                          <ArrowUpRight className="h-5 w-5 mr-1" /> : 
                          <ArrowDownRight className="h-5 w-5 mr-1" />
                        }
                        <span className="font-medium">{stockMarket.index.change}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 md:mt-0 md:text-right">
                    <p>Last updated: {new Date().toLocaleTimeString()}</p>
                    <p>Source: LuSE Data Feed</p>
                  </div>
                </div>
                
                <div className="h-80">
                  <LineChart
                    data={getChartData()}
                    lines={[
                      { dataKey: "value", name: "Index Value", color: "#0ea5e9" }
                    ]}
                    xAxisKey="date"
                    height={300}
                  />
                </div>
              </Card>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Top Performing Stocks
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stockMarket.stocks.map((stock, index) => (
                    <Card 
                      key={stock.symbol}
                      className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
                      style={{ 
                        opacity: 0,
                        animation: isVisible ? `fade-in 0.5s ease-out ${index * 0.1 + 0.3}s forwards` : "none"
                      }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{stock.symbol}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
                        </div>
                        <div className={`text-sm font-medium ${parseFloat(stock.changePercent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.changePercent}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stock.price.toFixed(2)} ZMW
                      </div>
                      <div className={`flex items-center mt-1 ${parseFloat(stock.changePercent) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(stock.changePercent) >= 0 ? 
                          <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        }
                        <span>{stock.change} ZMW</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                No stock market data available
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="economic-indicators" className="mt-0">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Economic Indicators
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Key economic metrics and performance indicators for Zambia
          </p>
          
          {loadingEconomicIndicators ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(7).fill(0).map((_, i) => (
                <Card key={`indicator-skeleton-${i}`} className="p-6">
                  <Skeleton className="h-6 w-36 mb-4" />
                  <Skeleton className="h-10 w-28 mb-3" />
                  <Skeleton className="h-5 w-24 mb-4" />
                  <Skeleton className="h-4 w-48" />
                </Card>
              ))}
            </div>
          ) : economicIndicators ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {economicIndicators.map((indicator, index) => (
                <Card 
                  key={indicator.name}
                  className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    opacity: 0,
                    animation: isVisible ? `fade-in 0.5s ease-out ${index * 0.08}s forwards` : "none"
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {indicator.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {indicator.value}
                    </div>
                    <div className={`flex items-center ml-3 ${indicator.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {indicator.isPositive ? 
                        <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      }
                      <span>{indicator.change}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {indicator.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                    <span>Source: {indicator.source}</span>
                    <span>Updated: {indicator.lastUpdated}</span>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                No economic indicator data available
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="commodities" className="mt-0">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Commodity Prices
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Current market prices for Zambia's key export commodities
          </p>
          
          {loadingCommodities ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(5).fill(0).map((_, i) => (
                <Card key={`commodity-skeleton-${i}`} className="p-6">
                  <Skeleton className="h-6 w-24 mb-4" />
                  <Skeleton className="h-10 w-36 mb-3" />
                  <Skeleton className="h-5 w-28 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </Card>
              ))}
            </div>
          ) : commodityPrices ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commodityPrices.map((commodity, index) => (
                <Card 
                  key={commodity.name}
                  className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
                  style={{ 
                    opacity: 0,
                    animation: isVisible ? `fade-in 0.5s ease-out ${index * 0.1}s forwards` : "none"
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {commodity.name}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {commodity.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {commodity.unit}
                  </div>
                  <div className={`flex items-center ${commodity.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {commodity.isPositive ? 
                      <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    }
                    <span>{commodity.change}</span>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400">
                No commodity price data available
              </p>
            </div>
          )}
          
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-right">
            <p>Data updated: {new Date().toLocaleTimeString()}</p>
            <p>Source: Global Commodity Markets API</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceOverview;
