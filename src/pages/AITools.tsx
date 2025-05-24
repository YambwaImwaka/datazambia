
import React from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ImageIcon, TrendingUp, Lightbulb, Database, MapPin } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import AIChatbot from "@/components/ai/AIChatbot";
import AIImageGenerator from "@/components/ai/AIImageGenerator";
import TimeSeriesForecaster from "@/components/ai/TimeSeriesForecaster";
import { motion } from "framer-motion";

const AITools: React.FC = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>AI Analytics Tools | Zambia Data Hub</title>
        <meta name="description" content="AI-powered tools for analyzing Zambian economic data, creating visualizations, and forecasting development trends." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">AI-Powered Data Analytics</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Advanced artificial intelligence tools designed specifically for analyzing, visualizing, and forecasting Zambia's economic and development data
          </p>
        </motion.div>

        <Tabs defaultValue="analyst" className="space-y-8">
          <TabsList className="w-full justify-center">
            <TabsTrigger value="analyst" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Data Analyst</span>
            </TabsTrigger>
            <TabsTrigger value="forecaster" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Economic Forecaster</span>
            </TabsTrigger>
            <TabsTrigger value="visualizer" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Visualization Creator</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analyst" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      AI Data Analyst for Zambia
                    </CardTitle>
                    <CardDescription>
                      Get insights on economic indicators, provincial statistics, and development trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/30 rounded-md">
                      <div className="text-center text-gray-500 dark:text-gray-400 px-4">
                        <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">Zambia Data Analyst</p>
                        <p className="text-sm">Click the analyst button in the bottom right to start exploring Zambian data with AI assistance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>AI Data Analysis Capabilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-1">
                          <Database className="h-4 w-4" />
                          Economic Intelligence
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Specialized in Zambian economic indicators including GDP, inflation, copper prices, agricultural output, and government fiscal data.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4" />
                          Provincial Analytics
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Compare statistics across all 10 provinces, analyze regional development patterns, and identify investment opportunities.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-1">
                          <Lightbulb className="h-4 w-4" />
                          Sample Analysis Questions
                        </h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• "What's driving Zambia's current inflation rate?"</li>
                          <li>• "Compare healthcare access between urban and rural areas"</li>
                          <li>• "Analyze copper export trends and economic impact"</li>
                          <li>• "Which provinces have the highest education enrollment?"</li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                        <h3 className="font-medium text-green-800 dark:text-green-300 mb-1">Powered by Advanced AI</h3>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          Uses specialized training on Zambian data patterns to provide accurate, contextual analysis of development metrics and economic trends.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="forecaster" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TimeSeriesForecaster />
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Economic Forecasting Engine</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-1">
                          <TrendingUp className="h-4 w-4" />
                          Predictive Analytics
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          AI-powered forecasting using time series analysis to predict future trends in key economic indicators for informed policy making.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-1">
                          <Database className="h-4 w-4" />
                          Available Forecasts
                        </h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• GDP Growth Rate projections</li>
                          <li>• Inflation rate predictions</li>
                          <li>• Copper price forecasts</li>
                          <li>• Agricultural output estimates</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Methodology</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                          Combines historical data patterns, seasonal trends, and economic factors to generate reliable forecasts for strategic planning and policy development.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="visualizer" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AIImageGenerator />
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Data Visualization Generator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-1">
                          <ImageIcon className="h-4 w-4" />
                          Professional Visualizations
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Create publication-ready charts, maps, and infographics specifically designed for Zambian data presentation and analysis.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-1">
                          <Lightbulb className="h-4 w-4" />
                          Visualization Types
                        </h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Economic indicator charts and graphs</li>
                          <li>• Provincial comparison maps</li>
                          <li>• Development progress infographics</li>
                          <li>• Dashboard layouts for presentations</li>
                        </ul>
                      </div>
                      
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md">
                        <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Zambia-Focused Design</h3>
                        <p className="text-sm text-amber-700 dark:text-amber-400">
                          Automatically applies Zambian national colors and styling conventions suitable for government reports and research publications.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AITools;
