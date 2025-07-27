
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchHistoricalData } from '@/services/stock-market/StockMarketHistoricalService';
import { LineChart } from '@/components/charts/LineChart';
import { useQuery } from '@tanstack/react-query';
import { LineChartIcon, Loader2 } from 'lucide-react';

type TimeRange = '1w' | '1m' | '3m' | '6m' | '1y' | '5y';

interface HistoricalChartSectionProps {
  isVisible: boolean;
}

const HistoricalChartSection: React.FC<HistoricalChartSectionProps> = ({ isVisible }) => {
  const [selectedType, setSelectedType] = useState<'currency' | 'commodity' | 'indicator'>('currency');
  const [selectedItem, setSelectedItem] = useState('USD');
  const [timeRange, setTimeRange] = useState<TimeRange>('3m');
  
  // Define options for selection
  const options = {
    currency: [
      { id: 'USD', name: 'US Dollar (USD)' },
      { id: 'EUR', name: 'Euro (EUR)' },
      { id: 'GBP', name: 'British Pound (GBP)' },
      { id: 'CNY', name: 'Chinese Yuan (CNY)' },
      { id: 'ZAR', name: 'South African Rand (ZAR)' }
    ],
    commodity: [
      { id: 'Copper', name: 'Copper' },
      { id: 'Gold', name: 'Gold' },
      { id: 'Corn', name: 'Corn' },
      { id: 'Cobalt', name: 'Cobalt' },
      { id: 'Cotton', name: 'Cotton' }
    ],
    indicator: [
      { id: 'GDP', name: 'GDP Growth Rate' },
      { id: 'Inflation', name: 'Inflation Rate' },
      { id: 'Unemployment', name: 'Unemployment Rate' },
      { id: 'InterestRate', name: 'Interest Rate' },
      { id: 'ExternalDebt', name: 'External Debt' }
    ]
  };
  
  // Update selected item when type changes to ensure we have a valid selection
  useEffect(() => {
    setSelectedItem(options[selectedType][0].id);
  }, [selectedType]);
  
  // Fetch historical data
  const { data, isLoading, error } = useQuery({
    queryKey: ['historicalData', selectedType, selectedItem, timeRange],
    queryFn: () => fetchHistoricalData(selectedType, selectedItem, timeRange),
    enabled: isVisible
  });
  
  // Prepare chart data
  const chartData = data?.data.map(point => ({
    date: point.date,
    value: point.value
  })) || [];
  
  // Get unit text based on type and item
  const getUnitText = () => {
    if (selectedType === 'currency') return 'ZMW';
    if (selectedType === 'commodity') {
      switch (selectedItem) {
        case 'Copper': return 'USD/tonne';
        case 'Gold': return 'USD/oz';
        case 'Corn': return 'USD/tonne';
        case 'Cobalt': return 'USD/tonne';
        case 'Cotton': return 'USD/lb';
        default: return '';
      }
    }
    if (selectedType === 'indicator') {
      switch (selectedItem) {
        case 'GDP': return '%';
        case 'Inflation': return '%';
        case 'Unemployment': return '%';
        case 'InterestRate': return '%';
        case 'ExternalDebt': return 'USD billion';
        default: return '';
      }
    }
    return '';
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <LineChartIcon className="mr-2 h-5 w-5" />
          Historical Data Charts
        </CardTitle>
        <CardDescription>
          View how financial metrics have changed over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as any)}>
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 min-w-max">
                <TabsTrigger value="currency" className="text-xs sm:text-sm">Currencies</TabsTrigger>
                <TabsTrigger value="commodity" className="text-xs sm:text-sm">Commodities</TabsTrigger>
                <TabsTrigger value="indicator" className="text-xs sm:text-sm">Indicators</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">
                Select {selectedType === 'currency' ? 'Currency' : selectedType === 'commodity' ? 'Commodity' : 'Indicator'}
              </label>
              <Select value={selectedItem} onValueChange={setSelectedItem}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {options[selectedType].map(option => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Time Range</label>
              <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1w">1 Week</SelectItem>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                  <SelectItem value="5y">5 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="h-[350px] mt-6">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-red-500">Error loading historical data</p>
              </div>
            ) : chartData.length > 0 ? (
              <LineChart
                data={chartData}
                lines={[
                  {
                    dataKey: "value",
                    name: `${options[selectedType].find(o => o.id === selectedItem)?.name || selectedItem} (${getUnitText()})`,
                    color: "#3b82f6",
                  },
                ]}
                xAxisKey="date"
                height={350}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">No data available</p>
              </div>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mt-2">
            {!isLoading && !error && data && (
              <>
                This chart shows historical values for {options[selectedType].find(o => o.id === selectedItem)?.name || selectedItem} 
                over the past {timeRange === '1w' ? 'week' : 
                  timeRange === '1m' ? 'month' : 
                    timeRange === '3m' ? '3 months' : 
                      timeRange === '6m' ? '6 months' : 
                        timeRange === '1y' ? 'year' : '5 years'}.
              </>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalChartSection;
