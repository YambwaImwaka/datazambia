
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, ImageIcon, TrendingUp, Lightbulb, Database, MapPin, MessageSquare, Bot, Zap, Star } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import AIChatbot from "@/components/ai/AIChatbot";
import AIImageGenerator from "@/components/ai/AIImageGenerator";
import TimeSeriesForecaster from "@/components/ai/TimeSeriesForecaster";
import { motion } from "framer-motion";

const AITools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [chatVisible, setChatVisible] = useState(false);

  const sampleQuestions = [
    "What's the current state of Zambia's copper mining industry?",
    "Compare healthcare access between urban and rural provinces",
    "Show me GDP growth trends over the last 5 years",
    "Which provinces have the highest education enrollment rates?",
    "Analyze agricultural productivity in the Copperbelt vs Eastern Province",
    "What are the main drivers of inflation in Zambia?"
  ];

  const quickActions = [
    { 
      title: "Economic Analysis", 
      description: "Get instant insights on GDP, inflation, and trade data",
      icon: BarChart3,
      action: () => {
        setActiveTool("analyst");
        setChatVisible(true);
      }
    },
    {
      title: "Provincial Comparison", 
      description: "Compare development metrics across all 10 provinces",
      icon: MapPin,
      action: () => {
        setActiveTool("analyst");
        setChatVisible(true);
      }
    },
    {
      title: "Generate Forecast", 
      description: "Create predictions for economic indicators",
      icon: TrendingUp,
      action: () => setActiveTool("forecaster")
    },
    {
      title: "Create Visualization", 
      description: "Generate charts and infographics",
      icon: ImageIcon,
      action: () => setActiveTool("visualizer")
    }
  ];

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
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bot className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">AI-Powered Data Analytics</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Advanced artificial intelligence tools designed specifically for analyzing, visualizing, and forecasting Zambia's economic and development data
          </p>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={action.action}>
                  <CardContent className="p-4 text-center">
                    <action.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-semibold mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sample Questions Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Try These Sample Questions
            </CardTitle>
            <CardDescription>Click any question to start analyzing Zambian data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sampleQuestions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3 hover:bg-primary/5"
                    onClick={() => {
                      setActiveTool("analyst");
                      setChatVisible(true);
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{question}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTool || "analyst"} onValueChange={setActiveTool} className="space-y-8">
          <TabsList className="w-full justify-center">
            <TabsTrigger value="analyst" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Data Analyst</span>
              <Badge variant="secondary" className="ml-1">
                <Zap className="h-3 w-3 mr-1" />
                Live
              </Badge>
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
                      <Badge variant="outline" className="ml-auto">
                        <Star className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Get insights on economic indicators, provincial statistics, and development trends
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {chatVisible ? (
                      <div className="h-[600px]">
                        <AIChatbot />
                      </div>
                    ) : (
                      <div className="h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-md">
                        <div className="text-center text-gray-500 dark:text-gray-400 px-4">
                          <Bot className="h-16 w-16 mx-auto mb-4 text-primary" />
                          <p className="text-lg font-medium mb-2">Zambia Data Analyst Ready</p>
                          <p className="text-sm mb-4">Ask questions about Zambian economic data, provincial statistics, or development trends</p>
                          <Button onClick={() => setChatVisible(true)} className="mt-2">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Start Analysis
                          </Button>
                        </div>
                      </div>
                    )}
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
                          Instant Insights
                        </h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• Real-time economic trend analysis</li>
                          <li>• Cross-provincial comparisons</li>
                          <li>• Policy impact assessments</li>
                          <li>• Investment opportunity identification</li>
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
