
import { EconomicIndicator } from "@/services/economic/EconomicIndicatorService";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, ArrowDownRight, TrendingUp, BarChart3, DollarSign, Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import DataExport from "@/components/ui/DataExport";

interface EconomicIndicatorsSectionProps {
  economicIndicators: EconomicIndicator[] | null;
  loading: boolean;
  isVisible: boolean;
}

export const EconomicIndicatorsSection = ({ economicIndicators, loading, isVisible }: EconomicIndicatorsSectionProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  
  // Get appropriate icon based on indicator name
  const getIndicatorIcon = (name: string) => {
    if (name.includes('GDP') || name.includes('Growth')) {
      return <TrendingUp className="h-5 w-5 text-blue-500" />;
    } else if (name.includes('Rate') || name.includes('Inflation') || name.includes('Unemployment')) {
      return <BarChart3 className="h-5 w-5 text-amber-500" />;
    } else if (name.includes('Debt') || name.includes('Deficit') || name.includes('Reserves')) {
      return <DollarSign className="h-5 w-5 text-emerald-500" />;
    } else {
      return <Calendar className="h-5 w-5 text-purple-500" />;
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    queryClient.invalidateQueries({ queryKey: ['economicIndicators'] })
      .finally(() => {
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      });
  };

  // Prepare data for export
  const getExportData = () => {
    if (!economicIndicators) return [];
    
    return economicIndicators.map(indicator => ({
      Indicator: indicator.name,
      Value: indicator.value,
      Change: indicator.change,
      Direction: indicator.isPositive ? 'Positive' : 'Negative',
      Description: indicator.description,
      Source: indicator.source,
      LastUpdated: indicator.lastUpdated
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Economic Indicators
        </h2>
        <div className="flex gap-2">
          <DataExport 
            data={getExportData()} 
            fileName="zambia-economic-indicators"
            label="Export Indicators"
            disabled={loading || refreshing || !economicIndicators}
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
        Key economic metrics and performance indicators for Zambia
      </p>
      
      {loading || refreshing ? (
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
              className={`p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                indicator.isPositive ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'
              }`}
              style={{ 
                opacity: 0,
                animation: isVisible ? `fade-in 0.5s ease-out ${index * 0.08}s forwards` : "none"
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                {getIndicatorIcon(indicator.name)}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {indicator.name}
                </h3>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {indicator.value}
                </div>
                <div className={`flex items-center ml-3 px-2 py-1 rounded ${
                  indicator.isPositive ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'
                }`}>
                  {indicator.isPositive ? 
                    <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  }
                  <span className="text-xs font-medium">{indicator.change}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {indicator.description}
              </p>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <span>{indicator.source}</span>
                <span>{indicator.lastUpdated}</span>
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
    </div>
  );
};

export default EconomicIndicatorsSection;
