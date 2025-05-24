
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, TrendingUp, Brain } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Sample economic data (would normally come from an API)
const economicDataSets = {
  gdp_growth: [
    { x: "2018-01", y: 3.8 },
    { x: "2018-04", y: 3.5 },
    { x: "2018-07", y: 3.2 },
    { x: "2018-10", y: 3.0 },
    { x: "2019-01", y: 2.9 },
    { x: "2019-04", y: 2.7 },
    { x: "2019-07", y: 2.5 },
    { x: "2019-10", y: 2.6 },
    { x: "2020-01", y: 1.5 },
    { x: "2020-04", y: -2.1 },
    { x: "2020-07", y: -1.8 },
    { x: "2020-10", y: -1.2 },
    { x: "2021-01", y: 0.9 },
    { x: "2021-04", y: 2.0 },
    { x: "2021-07", y: 2.8 },
    { x: "2021-10", y: 3.1 },
    { x: "2022-01", y: 3.3 },
    { x: "2022-04", y: 2.9 },
    { x: "2022-07", y: 3.0 },
    { x: "2022-10", y: 2.8 },
    { x: "2023-01", y: 2.5 },
    { x: "2023-04", y: 2.4 },
    { x: "2023-07", y: 2.3 },
    { x: "2023-10", y: 2.5 }
  ],
  inflation_rate: [
    { x: "2018-01", y: 7.0 },
    { x: "2018-04", y: 6.8 },
    { x: "2018-07", y: 7.9 },
    { x: "2018-10", y: 8.3 },
    { x: "2019-01", y: 7.5 },
    { x: "2019-04", y: 8.1 },
    { x: "2019-07", y: 9.3 },
    { x: "2019-10", y: 10.8 },
    { x: "2020-01", y: 12.5 },
    { x: "2020-04", y: 15.7 },
    { x: "2020-07", y: 16.0 },
    { x: "2020-10", y: 17.4 },
    { x: "2021-01", y: 22.8 },
    { x: "2021-04", y: 23.2 },
    { x: "2021-07", y: 24.6 },
    { x: "2021-10", y: 19.3 },
    { x: "2022-01", y: 15.1 },
    { x: "2022-04", y: 11.7 },
    { x: "2022-07", y: 9.9 },
    { x: "2022-10", y: 9.8 },
    { x: "2023-01", y: 9.4 },
    { x: "2023-04", y: 8.8 },
    { x: "2023-07", y: 10.1 },
    { x: "2023-10", y: 12.9 }
  ],
  copper_price: [
    { x: "2018-01", y: 7083 },
    { x: "2018-04", y: 6834 },
    { x: "2018-07", y: 6172 },
    { x: "2018-10", y: 6239 },
    { x: "2019-01", y: 5837 },
    { x: "2019-04", y: 6443 },
    { x: "2019-07", y: 5940 },
    { x: "2019-10", y: 5780 },
    { x: "2020-01", y: 6031 },
    { x: "2020-04", y: 5060 },
    { x: "2020-07", y: 6430 },
    { x: "2020-10", y: 6721 },
    { x: "2021-01", y: 7971 },
    { x: "2021-04", y: 9415 },
    { x: "2021-07", y: 9440 },
    { x: "2021-10", y: 9761 },
    { x: "2022-01", y: 9782 },
    { x: "2022-04", y: 10183 },
    { x: "2022-07", y: 7603 },
    { x: "2022-10", y: 7561 },
    { x: "2023-01", y: 9040 },
    { x: "2023-04", y: 8780 },
    { x: "2023-07", y: 8650 },
    { x: "2023-10", y: 8300 }
  ]
};

const metrics = [
  { id: "gdp_growth", name: "GDP Growth Rate (%)", color: "#1e88e5" },
  { id: "inflation_rate", name: "Inflation Rate (%)", color: "#e53935" },
  { id: "copper_price", name: "Copper Price (USD/tonne)", color: "#43a047" }
];

const TimeSeriesForecaster = () => {
  const [selectedMetric, setSelectedMetric] = useState(metrics[0].id);
  const [forecastPeriods, setForecastPeriods] = useState("6");
  const [isForecasting, setIsForecasting] = useState(false);
  const [forecastData, setForecastData] = useState<any[] | null>(null);
  const [combinedData, setCombinedData] = useState<any[] | null>(null);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const currentMetric = metrics.find(m => m.id === selectedMetric) || metrics[0];
  const historicalData = economicDataSets[selectedMetric as keyof typeof economicDataSets] || [];

  const handleGenerateForecast = async () => {
    setIsForecasting(true);
    setError(null);
    setForecastData(null);
    setCombinedData(null);
    setAiInsights(null);

    try {
      const { data, error } = await supabase.functions.invoke("ai-enhanced-forecast", {
        body: { 
          timeSeriesData: historicalData,
          periodsToForecast: parseInt(forecastPeriods),
          metricName: currentMetric.name
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.forecast) {
        setForecastData(data.forecast);
        setAiInsights(data.aiInsights);
        
        const combined = [
          ...historicalData,
          ...data.forecast
        ];
        
        setCombinedData(combined);
        
        toast({
          title: "AI-Enhanced Forecast Generated",
          description: `Advanced forecast for ${currentMetric.name} with AI insights.`,
        });
      } else {
        throw new Error("No forecast data received");
      }
    } catch (err) {
      console.error("Error forecasting data:", err);
      setError("Failed to generate forecast. Please try again.");
      toast({
        title: "Forecast failed",
        description: "There was an error generating the forecast. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsForecasting(false);
    }
  };

  const formatXAxis = (tickItem: string) => {
    // Convert "YYYY-MM" to "MMM YYYY"
    const [year, month] = tickItem.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return new Intl.DateTimeFormat('en', { month: 'short', year: '2-digit' }).format(date);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(date);
      const isForecast = payload[0]?.payload?.isForecast;
      
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border rounded shadow-sm">
          <p className="text-xs font-medium">{formattedDate}</p>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {isForecast ? 'Forecast: ' : 'Actual: '}
            <span className="font-medium" style={{ color: currentMetric.color }}>
              {payload[0].value.toFixed(2)}
            </span>
          </p>
          {isForecast && (
            <p className="text-xs italic text-gray-500 mt-1">AI-generated forecast</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI-Enhanced Economic Forecaster
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Economic Metric
              </label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  {metrics.map((metric) => (
                    <SelectItem key={metric.id} value={metric.id}>
                      {metric.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Forecast Periods (Quarters)
              </label>
              <Select value={forecastPeriods} onValueChange={setForecastPeriods}>
                <SelectTrigger>
                  <SelectValue placeholder="Select periods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">1 Year (4 Quarters)</SelectItem>
                  <SelectItem value="6">1.5 Years (6 Quarters)</SelectItem>
                  <SelectItem value="8">2 Years (8 Quarters)</SelectItem>
                  <SelectItem value="12">3 Years (12 Quarters)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleGenerateForecast} 
            disabled={isForecasting} 
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isForecasting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating AI-Enhanced Forecast...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Generate AI-Enhanced Forecast
              </>
            )}
          </Button>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          <div className="h-80 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={combinedData || historicalData}
                margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="x"
                  tickFormatter={formatXAxis}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                  minTickGap={10}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={36} />

                {forecastData && (
                  <ReferenceLine
                    x={historicalData[historicalData.length - 1].x}
                    stroke="#666"
                    strokeDasharray="3 3"
                    label={{ value: 'AI Forecast Start', position: 'insideTopLeft', fill: '#666', fontSize: 12 }}
                  />
                )}

                <Line
                  type="monotone"
                  dataKey="y"
                  stroke={currentMetric.color}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  dot={{ strokeWidth: 2, r: 4 }}
                  name={forecastData ? "Historical Data" : currentMetric.name}
                />
                
                {forecastData && (
                  <Line
                    type="monotone"
                    dataKey={(data) => data.isForecast ? data.y : null}
                    stroke={`${currentMetric.color}80`}
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 4 }}
                    name="AI-Enhanced Forecast"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {aiInsights && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-md border border-purple-200 dark:border-purple-700"
            >
              <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Economic Analysis
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-400 whitespace-pre-wrap">
                {aiInsights}
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-500 mt-3 italic">
                Powered by advanced AI models analyzing Zambian economic patterns
              </p>
            </motion.div>
          )}

        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-800/30 text-xs text-center text-gray-500">
        AI-enhanced forecasting with Grok & DeepSeek for Zambia's economy
      </CardFooter>
    </Card>
  );
};

export default TimeSeriesForecaster;
