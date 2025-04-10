
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ExchangeRatesSection from './ExchangeRatesSection';
import CommoditiesSection from './CommoditiesSection';
import EconomicIndicatorsSection from './EconomicIndicatorsSection';
import { fetchExchangeRates } from '@/services/exchange-rates/ExchangeRateService';
import { fetchCommodityPrices } from '@/services/commodities/CommodityService';
import { fetchEconomicIndicators } from '@/services/economic/EconomicIndicatorService';
import { useInView } from 'react-intersection-observer';
import { useQueries } from '@tanstack/react-query';

const FinanceOverview = () => {
  const [activeTab, setActiveTab] = useState("exchange-rates");
  
  // Intersection observer for animations
  const { ref: exchangeRef, inView: exchangeVisible } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: commoditiesRef, inView: commoditiesVisible } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: indicatorsRef, inView: indicatorsVisible } = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Use React Query for data fetching
  const [
    exchangeRatesQuery,
    commoditiesQuery,
    economicIndicatorsQuery
  ] = useQueries({
    queries: [
      {
        queryKey: ['exchangeRates'],
        queryFn: fetchExchangeRates,
        staleTime: 1000 * 60 * 15, // 15 minutes
      },
      {
        queryKey: ['commodities'],
        queryFn: fetchCommodityPrices,
        staleTime: 1000 * 60 * 60, // 1 hour
      },
      {
        queryKey: ['economicIndicators'],
        queryFn: fetchEconomicIndicators,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
      }
    ]
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Finance & Economic Overview</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Current financial metrics, exchange rates, and economic indicators for Zambia
        </p>
      </div>
      
      <Tabs defaultValue="exchange-rates" onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exchange-rates">Exchange Rates</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
          <TabsTrigger value="indicators">Economic Indicators</TabsTrigger>
        </TabsList>
        
        <TabsContent value="exchange-rates" className="space-y-4">
          <div ref={exchangeRef}>
            <ExchangeRatesSection 
              exchangeRates={exchangeRatesQuery.data} 
              loading={exchangeRatesQuery.isLoading}
              isVisible={exchangeVisible} 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="commodities" className="space-y-4">
          <div ref={commoditiesRef}>
            <CommoditiesSection 
              commodityPrices={commoditiesQuery.data} 
              loading={commoditiesQuery.isLoading}
              isVisible={commoditiesVisible} 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="indicators" className="space-y-4">
          <div ref={indicatorsRef}>
            <EconomicIndicatorsSection 
              economicIndicators={economicIndicatorsQuery.data} 
              loading={economicIndicatorsQuery.isLoading}
              isVisible={indicatorsVisible} 
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceOverview;
