
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

// Import new sections
import { MarketShareSection } from "./MarketShareSection";
import ComprehensiveEconomicSection from "./ComprehensiveEconomicSection";

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
      value: exchangeRates ? `K${exchangeRates.rates?.['ZMW'] ? (1 / exchangeRates.rates['ZMW'] * 28.5).toFixed(2) : '28.50'}` : "Loading...",
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
      value: economicIndicators ? `${economicIndicators.find(indicator => indicator.name.includes('GDP'))?.value || '4.7%'}` : "Loading...",
      change: economicIndicators ? `${economicIndicators.find(indicator => indicator.name.includes('GDP'))?.change || '+0.5%'}` : "",
      isPositive: economicIndicators ? (economicIndicators.find(indicator => indicator.name.includes('GDP'))?.isPositive ?? true) : true,
      icon: <BarChart3 className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6" ref={ref}>
        {/* Header Section */}
        <div className="mb-8 space-y-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Financial Markets & Economy
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Comprehensive financial data, market analysis, and economic indicators for Zambia
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto md:mx-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search financial data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
          </div>
        </div>

        {/* Show search results if there's a search term */}
        {searchTerm && (
          <div className="mb-8">
            <SearchResults 
              query={searchTerm}
              exchangeRates={exchangeRates}
              commodities={commodityPrices}
              indicators={economicIndicators}
            />
          </div>
        )}

        {/* Main Content Tabs */}
        <div className="w-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Navigation */}
            <div className="mb-8">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto gap-1 bg-muted/50 p-1">
                <TabsTrigger 
                  value="overview" 
                  className="text-xs md:text-sm px-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="markets" 
                  className="text-xs md:text-sm px-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Markets
                </TabsTrigger>
                <TabsTrigger 
                  value="economy" 
                  className="text-xs md:text-sm px-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Economy
                </TabsTrigger>
                <TabsTrigger 
                  value="market-share" 
                  className="text-xs md:text-sm px-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Market Share
                </TabsTrigger>
                <TabsTrigger 
                  value="comprehensive" 
                  className="text-xs md:text-sm px-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Comprehensive
                </TabsTrigger>
                <TabsTrigger 
                  value="mining" 
                  className="text-xs md:text-sm px-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Mining
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content */}
            <div className="min-h-[600px]">
              <TabsContent value="overview" className="mt-0 space-y-8">
                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {keyMetrics.map((metric, index) => (
                    <Card 
                      key={metric.title}
                      className="p-4 lg:p-6 bg-card border-border hover:shadow-lg transition-shadow duration-200"
                      style={{ 
                        opacity: 0,
                        animation: inView ? `fade-in 0.5s ease-out ${index * 0.2}s forwards` : "none"
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            {metric.icon}
                          </div>
                          <h3 className="font-semibold text-sm lg:text-base text-card-foreground">
                            {metric.title}
                          </h3>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xl lg:text-2xl font-bold text-card-foreground">
                          {metric.value}
                        </div>
                        <div className={`text-sm ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Exchange Rates */}
                <div className="space-y-6">
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
                </div>
              </TabsContent>

              <TabsContent value="markets" className="mt-0 space-y-8">
                <StockMarketSection 
                  stockMarket={stockData} 
                  loading={stockLoading} 
                  isVisible={inView} 
                />

                <CommoditiesSection 
                  commodityPrices={commodityPrices} 
                  loading={commodityLoading} 
                  isVisible={inView} 
                />

                <HistoricalChartSection isVisible={inView} />

                <WatchlistSection isVisible={inView} />
              </TabsContent>

              <TabsContent value="economy" className="mt-0 space-y-8">
                <EconomicIndicatorsSection 
                  economicIndicators={economicIndicators} 
                  loading={indicatorsLoading} 
                  isVisible={inView} 
                />

                <FinanceNewsSection isVisible={inView} />
              </TabsContent>

              <TabsContent value="market-share" className="mt-0">
                <MarketShareSection isVisible={inView} />
              </TabsContent>

              <TabsContent value="comprehensive" className="mt-0">
                <ComprehensiveEconomicSection isVisible={inView} />
              </TabsContent>

              <TabsContent value="mining" className="mt-0">
                <ComprehensiveEconomicSection isVisible={inView} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview;
