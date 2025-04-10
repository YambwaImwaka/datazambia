
import { CommodityPrice } from "@/services/commodities/CommodityService";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import DataExport from "@/components/ui/DataExport";

interface CommoditiesSectionProps {
  commodityPrices: CommodityPrice[] | null;
  loading: boolean;
  isVisible: boolean;
}

export const CommoditiesSection = ({ commodityPrices, loading, isVisible }: CommoditiesSectionProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  
  const handleRefresh = () => {
    setRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ['commodities'] })
      .finally(() => {
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      });
  };

  // Prepare data for export
  const getExportData = () => {
    if (!commodityPrices) return [];
    
    return commodityPrices.map(commodity => ({
      Commodity: commodity.name,
      Price: commodity.price,
      Unit: commodity.unit,
      Change: commodity.change,
      Direction: commodity.isPositive ? 'Up' : 'Down',
      LastUpdated: new Date().toISOString()
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Commodity Prices
        </h2>
        <div className="flex gap-2">
          <DataExport 
            data={getExportData()} 
            fileName="zambia-commodity-prices"
            label="Export Data"
            disabled={loading || refreshing || !commodityPrices}
          />
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleRefresh}
            disabled={refreshing || loading}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Current market prices for Zambia's key export commodities
      </p>
      
      {loading || refreshing ? (
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
    </div>
  );
};

export default CommoditiesSection;
