
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import { useInView } from "react-intersection-observer";

// Import existing sections - using default imports
import { ExchangeRatesSection } from "./ExchangeRatesSection";
import { CommoditiesSection } from "./CommoditiesSection";
import { EconomicIndicatorsSection } from "./EconomicIndicatorsSection";
import { StockMarketSection } from "./StockMarketSection";
import HistoricalChartSection from "./HistoricalChartSection";
import FinanceNewsSection from "./FinanceNewsSection";
import WatchlistSection from "./WatchlistSection";
import SearchResults from "./SearchResults";

// Import new market share section
import { MarketShareSection } from "./MarketShareSection";

// Import services
import { fetchExchangeRates } from "@/services/exchange-rates/ExchangeRateService";
import { fetchCommodityPrices } from "@/services/commodities/CommodityService";
import { fetchEconomicIndicators } from "@/services/economic/EconomicIndicatorService";
import { fetchStockMarketData } from "@/services/stock-market/StockMarketService";

const FinanceOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Fetch data using React Query
  const { data: exchangeRates, isLoading: exchangeLoading } = useQuery({
    queryKey: ['exchangeRates'],
    queryFn: fetchExchangeRates,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: commodityPrices, isLoading: commodityLoading } = useQuery({
    queryKey: ['commodities'],
    queryFn: fetchCommodityPrices,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const { data: economicIndicators, isLoading: indicatorsLoading } = useQuery({
    queryKey: ['economicIndicators'],
    queryFn: fetchEconomicIndicators,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { data: stockData, isLoading: stockLoading } = useQuery({
    queryKey: ['stockMarket'],
    queryFn: fetchStockMarketData,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  // Key metrics for overview cards
  const keyMetrics = [
    {
      title: "USD/ZMW Rate",
      value: exchangeRates ? `K${exchangeRates.rates?.USD ? (1/exchangeRates.rates.USD).toFixed(2) : 'N/A'}` : "Loading...",
      change: exchangeRates ? "+2.5%" : "",
      isPositive: true,
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      title: "Copper Price",
      value: commodityPrices ? `$${commodityPrices.find(commodity => commodity.name === 'Copper')?.price.toLocaleString() || 'N/A'}` : "Loading...",
      change: commodityPrices ? `${commodityPrices.find(commodity => commodity.name === 'Copper')?.change || 'N/A'}` : "",
      isPositive: commodityPrices ? (commodityPrices.find(commodity => commodity.name === 'Copper')?.isPositive ?? true) : true,
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: "GDP Growth",
      value: economicIndicators ? `${economicIndicators.find(indicator => indicator.name.includes('GDP'))?.value || 'N/A'}` : "Loading...",
      change: economicIndicators ? `${economicIndicators.find(indicator => indicator.name.includes('GDP'))?.change || 'N/A'}` : "",
      isPositive: economicIndicators ? (economicIndicators.find(indicator => indicator.name.includes('GDP'))?.isPositive ?? true) : true,
      icon: <BarChart3 className="h-5 w-5" />
    }
  ];

  return (
    <div className="container mx-auto px-4" ref={ref}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Financial Markets & Economy</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Comprehensive financial data, market analysis, and economic indicators for Zambia
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search financial data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Show search results if there's a search term */}
      {searchTerm && (
        <SearchResults 
          query={searchTerm}
          exchangeRates={exchangeRates}
          commodities={commodityPrices}
          indicators={economicIndicators}
        />
      )}

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="markets">Stock & Commodities</TabsTrigger>
          <TabsTrigger value="economy">Economic Data</TabsTrigger>
          <TabsTrigger value="market-share">Market Share</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {keyMetrics.map((metric, index) => (
              <Card 
                key={metric.title}
                className="p-6"
                style={{ 
                  opacity: 0,
                  animation: inView ? `fade-in 0.5s ease-out ${index * 0.2}s forwards` : "none"
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {metric.icon}
                    <h3 className="font-semibold text-gray-900 dark:text-white">{metric.title}</h3>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {metric.value}
                </div>
                <div className={`text-sm ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </div>
              </Card>
            ))}
          </div>

          {/* Exchange Rates */}
          <ExchangeRatesSection 
            exchangeRates={exchangeRates} 
            loading={exchangeLoading} 
            isVisible={inView} 
          />

          {/* Economic Indicators */}
          <EconomicIndicatorsSection 
            economicIndicators={economicIndicators} 
            loading={indicatorsLoading} 
            isVisible={inView} 
          />
        </TabsContent>

        <TabsContent value="markets" className="space-y-8">
          {/* Stock Market */}
          <StockMarketSection 
            stockMarket={stockData} 
            loading={stockLoading} 
            isVisible={inView} 
          />

          {/* Commodities */}
          <CommoditiesSection 
            commodityPrices={commodityPrices} 
            loading={commodityLoading} 
            isVisible={inView} 
          />

          {/* Historical Charts */}
          <HistoricalChartSection isVisible={inView} />

          {/* Watchlist */}
          <WatchlistSection isVisible={inView} />
        </TabsContent>

        <TabsContent value="economy" className="space-y-8">
          {/* Economic Indicators - Full View */}
          <EconomicIndicatorsSection 
            economicIndicators={economicIndicators} 
            loading={indicatorsLoading} 
            isVisible={inView} 
          />

          {/* Finance News */}
          <FinanceNewsSection isVisible={inView} />
        </TabsContent>

        <TabsContent value="market-share" className="space-y-8">
          {/* New Market Share Section */}
          <MarketShareSection isVisible={inView} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceOverview;
