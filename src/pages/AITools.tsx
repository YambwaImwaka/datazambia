
import React from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, ImageIcon, TrendingUp, Lightbulb } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import AIChatbot from "@/components/ai/AIChatbot";
import AIImageGenerator from "@/components/ai/AIImageGenerator";
import TimeSeriesForecaster from "@/components/ai/TimeSeriesForecaster";
import { motion } from "framer-motion";

const AITools: React.FC = () => {
  return (
    <PageLayout>
      <Helmet>
        <title>AI Tools | Zambia Data Hub</title>
        <meta name="description" content="Advanced AI tools for data analysis, visualization, and forecasting for Zambia's economic and social data." />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">AI-Powered Insights</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Leverage cutting-edge artificial intelligence to explore, visualize, and forecast Zambia's economic and development data
          </p>
        </motion.div>

        <Tabs defaultValue="chatbot" className="space-y-8">
          <TabsList className="w-full justify-center">
            <TabsTrigger value="chatbot" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span>AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="forecaster" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Economic Forecaster</span>
            </TabsTrigger>
            <TabsTrigger value="visualizer" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Visualization Generator</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chatbot" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      Interactive Data Assistant
                    </CardTitle>
                    <CardDescription>
                      Ask questions about Zambia's data in natural language
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[600px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/30 rounded-md">
                      <p className="text-center text-gray-500 dark:text-gray-400 px-4">
                        Click the chat button in the bottom right corner to start a conversation with the AI assistant
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-1">
                          <Bot className="h-4 w-4" />
                          Zambia Data AI Assistant
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Our AI is trained on comprehensive Zambian economic data, provincial statistics, health indicators, and educational metrics to provide accurate information.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-1">
                          <Lightbulb className="h-4 w-4" />
                          Sample Questions
                        </h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• "What were Zambia's copper export figures for 2023?"</li>
                          <li>• "How has the literacy rate changed in Lusaka province?"</li>
                          <li>• "Compare GDP growth between Southern and Copperbelt provinces"</li>
                          <li>• "Show me health indicators for children in rural areas"</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Powered by Advanced AI</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                          Our assistant uses OpenAI technology to understand complex questions and deliver accurate information about Zambia's development metrics and statistics.
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
                    <CardTitle>About the Economic Forecaster</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-1">
                          <TrendingUp className="h-4 w-4" />
                          AI-Powered Predictions
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Our Economic Forecaster uses advanced time series algorithms to analyze historical trends and generate predictions for key Zambian economic indicators.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-1">
                          <Lightbulb className="h-4 w-4" />
                          Available Metrics
                        </h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• GDP Growth Rate</li>
                          <li>• Inflation Rate</li>
                          <li>• Copper Prices</li>
                          <li>• And more economic indicators</li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md">
                        <h3 className="font-medium text-green-800 dark:text-green-300 mb-1">How It Works</h3>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          The forecaster analyzes patterns, seasonality, and trends in historical data to project future values, taking into account both long-term trends and cyclical factors.
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
                    <CardTitle>About the Visualization Generator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-1">
                          <ImageIcon className="h-4 w-4" />
                          Custom Data Visuals
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Our AI can create custom visualizations based on your descriptions, helping you illustrate Zambian development data in creative and informative ways.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium flex items-center gap-2 mb-1">
                          <Lightbulb className="h-4 w-4" />
                          Example Prompts
                        </h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• "Create a map highlighting education access across Zambia's provinces"</li>
                          <li>• "Generate a visual comparing rural vs urban healthcare facilities"</li>
                          <li>• "Show Zambia's agricultural exports in an infographic"</li>
                        </ul>
                      </div>
                      
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md">
                        <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Powered by Hugging Face</h3>
                        <p className="text-sm text-amber-700 dark:text-amber-400">
                          This tool uses advanced image generation models from Hugging Face to create high-quality visualizations based on your text descriptions.
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
