
import { useState, useEffect } from "react";
import { useExchangeRateData, useStockMarketData, useEconomicIndicators, useCommodityPrices } from "@/services/FinanceService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, BarChart3, TrendingUp, Landmark } from "lucide-react";
import ExchangeRatesSection from "./ExchangeRatesSection";
import StockMarketSection from "./StockMarketSection";
import EconomicIndicatorsSection from "./EconomicIndicatorsSection";
import CommoditiesSection from "./CommoditiesSection";

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
          <ExchangeRatesSection 
            exchangeRates={exchangeRates} 
            loading={loadingExchangeRates} 
            isVisible={isVisible} 
          />
        </TabsContent>
        
        <TabsContent value="stock-market" className="mt-0">
          <StockMarketSection 
            stockMarket={stockMarket} 
            loading={loadingStockMarket} 
            isVisible={isVisible} 
          />
        </TabsContent>
        
        <TabsContent value="economic-indicators" className="mt-0">
          <EconomicIndicatorsSection 
            economicIndicators={economicIndicators} 
            loading={loadingEconomicIndicators} 
            isVisible={isVisible} 
          />
        </TabsContent>
        
        <TabsContent value="commodities" className="mt-0">
          <CommoditiesSection 
            commodityPrices={commodityPrices} 
            loading={loadingCommodities} 
            isVisible={isVisible} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceOverview;
