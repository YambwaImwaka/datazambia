
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bookmark, BarChart4, Download, Search, RefreshCcw, Newspaper } from "lucide-react";
import ExchangeRatesSection from './ExchangeRatesSection';
import CommoditiesSection from './CommoditiesSection';
import EconomicIndicatorsSection from './EconomicIndicatorsSection';
import { fetchExchangeRates } from '@/services/FinanceService';
import { fetchCommodityPrices } from '@/services/FinanceService';
import { fetchEconomicIndicators } from '@/services/FinanceService';
import { useInView } from 'react-intersection-observer';
import { useQueries } from '@tanstack/react-query';
import { DataExport } from '@/components/ui/DataExport';
import HistoricalChartSection from './HistoricalChartSection';
import WatchlistSection from './WatchlistSection';
import FinanceNewsSection from './FinanceNewsSection';
import SearchResults from './SearchResults';
import { toast } from 'sonner';
import { exportToPdf } from '@/utils/pdfExport';

const FinanceOverview = () => {
  const [activeTab, setActiveTab] = useState("exchange-rates");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  // Intersection observer for animations
  const { ref: exchangeRef, inView: exchangeVisible } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: commoditiesRef, inView: commoditiesVisible } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: indicatorsRef, inView: indicatorsVisible } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: historicalRef, inView: historicalVisible } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: watchlistRef, inView: watchlistVisible } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: newsRef, inView: newsVisible } = useInView({ threshold: 0.1, triggerOnce: true });
  
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // In a real app, this would trigger a search API call
      toast.info(`Searching for: ${searchQuery}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
  };

  const generatePdfReport = () => {
    // Prepare data for PDF export
    const allData = [];
    
    // Add exchange rate data if available
    if (exchangeRatesQuery.data?.rates) {
      const exchangeRateRows = Object.entries(exchangeRatesQuery.data.rates).map(([currency, rate]) => ({
        Type: "Exchange Rate",
        Name: currency,
        Value: rate,
        Unit: "ZMW"
      }));
      allData.push(...exchangeRateRows);
    }
    
    // Add commodity data if available
    if (commoditiesQuery.data) {
      const commodityRows = commoditiesQuery.data.map(commodity => ({
        Type: "Commodity",
        Name: commodity.name,
        Value: commodity.price,
        Unit: commodity.unit,
        Change: commodity.change
      }));
      allData.push(...commodityRows);
    }
    
    // Add economic indicator data if available
    if (economicIndicatorsQuery.data) {
      const indicatorRows = economicIndicatorsQuery.data.map(indicator => ({
        Type: "Economic Indicator",
        Name: indicator.name,
        Value: indicator.value,
        Change: indicator.change,
        Source: indicator.source
      }));
      allData.push(...indicatorRows);
    }
    
    // Generate PDF
    exportToPdf({
      title: "Zambia Financial Markets Report",
      subtitle: "Current market indicators and economic data",
      fileName: "zambia-financial-report",
      tableData: allData,
      tableColumns: ["Type", "Name", "Value", "Unit", "Change", "Source"],
      additionalText: "This comprehensive report provides an overview of Zambia's current financial metrics, including exchange rates, commodity prices, and key economic indicators. Data is sourced from official government sources and international financial institutions."
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Finance & Economic Overview</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Current financial metrics, exchange rates, and economic indicators for Zambia
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search financial data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64"
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <Search size={18} />
            </Button>
          </form>
          
          <Button variant="outline" size="sm" onClick={generatePdfReport}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          
          <DataExport 
            data={[
              ...(exchangeRatesQuery.data?.rates ? Object.entries(exchangeRatesQuery.data.rates).map(([currency, rate]) => ({ currency, rate })) : []),
              ...(commoditiesQuery.data || []),
              ...(economicIndicatorsQuery.data || [])
            ]}
            fileName="zambia-financial-data"
          />
        </div>
      </div>
      
      {isSearching ? (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Search Results: "{searchQuery}"</h2>
            <Button variant="ghost" size="sm" onClick={clearSearch}>
              Clear Search
            </Button>
          </div>
          <SearchResults 
            query={searchQuery} 
            exchangeRates={exchangeRatesQuery.data}
            commodities={commoditiesQuery.data}
            indicators={economicIndicatorsQuery.data}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Bookmark className="mr-2 h-5 w-5" />
                  My Watchlist
                </CardTitle>
                <CardDescription>
                  Personalized financial items you're tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div ref={watchlistRef}>
                  <WatchlistSection isVisible={watchlistVisible} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Newspaper className="mr-2 h-5 w-5" />
                  Latest Financial News
                </CardTitle>
                <CardDescription>
                  Recent updates about Zambia's economy and markets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div ref={newsRef}>
                  <FinanceNewsSection isVisible={newsVisible} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="exchange-rates" onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <TabsTrigger value="exchange-rates">Exchange Rates</TabsTrigger>
              <TabsTrigger value="commodities">Commodities</TabsTrigger>
              <TabsTrigger value="indicators">Economic Indicators</TabsTrigger>
              <TabsTrigger value="historical">
                <span className="hidden md:inline">Historical Charts</span>
                <span className="md:hidden">Charts</span>
              </TabsTrigger>
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
            
            <TabsContent value="historical" className="space-y-4">
              <div ref={historicalRef}>
                <HistoricalChartSection isVisible={historicalVisible} />
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default FinanceOverview;
