
import { StockData } from "@/services/stock-market/StockMarketService";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart } from "@/components/charts/LineChart";

interface StockMarketSectionProps {
  stockMarket: {
    index: { value: number; change: string; isPositive: boolean };
    stocks: StockData[];
  } | null;
  loading: boolean;
  isVisible: boolean;
}

export const StockMarketSection = ({ stockMarket, loading, isVisible }: StockMarketSectionProps) => {
  // Generate chart data from stock performance
  const getChartData = () => {
    if (!stockMarket) return [];
    
    // Create synthetic chart data from stock performance
    return stockMarket.stocks.map((stock, index) => ({
      date: `May ${index + 1}`,
      value: stock.price * 100  // Scale up for better visualization
    })).slice(0, 7); // Limit to 7 data points
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Lusaka Stock Exchange
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Real-time performance of the LuSE All Share Index and top stocks
      </p>
      
      {loading ? (
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
    </div>
  );
};

export default StockMarketSection;
