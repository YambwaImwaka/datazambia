
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LineChart } from "@/components/charts/LineChart";
import { historicalData } from "@/utils/data";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export const DataVisualizer = () => {
  const [activeMetric, setActiveMetric] = useState<"population" | "gdp" | "inflation">("population");
  
  // Convert historical data to expected format for LineChart
  const populationData = historicalData.population.map(item => ({
    name: item.year,
    value: item.value
  }));
  
  const gdpData = historicalData.gdp.map(item => ({
    name: item.year,
    value: item.value
  }));
  
  const inflationData = historicalData.inflation.map(item => ({
    name: item.year,
    value: item.value
  }));

  return (
    <motion.section
      className="py-16 bg-white dark:bg-gray-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Interactive Data Explorer
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Visualize key national metrics over time with our interactive charts
            </p>
          </div>
          <Link to="/explore">
            <Button 
              variant="outline" 
              className="group flex items-center border-dashed"
            >
              Explore More Data 
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>
        </div>
        
        <Card className="border border-gray-200 dark:border-gray-700 overflow-hidden">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-xl font-bold">Historical Trend Analysis</CardTitle>
              <Tabs
                value={activeMetric}
                onValueChange={(value) => setActiveMetric(value as "population" | "gdp" | "inflation")}
                className="w-full sm:w-auto"
              >
                <div className="overflow-x-auto">
                  <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 min-w-max">
                    <TabsTrigger value="population" className="text-xs sm:text-sm">Population</TabsTrigger>
                    <TabsTrigger value="gdp" className="text-xs sm:text-sm">GDP</TabsTrigger>
                    <TabsTrigger value="inflation" className="text-xs sm:text-sm">Inflation</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[400px]">
              <Tabs value={activeMetric}>
                <TabsContent value="population" className="m-0 h-full">
                  <LineChart 
                    data={populationData}
                    xAxisKey="name"
                    lines={[{ dataKey: "value", name: "Population", color: "#3b82f6" }]}
                    animation={true}
                  />
                  <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Population in Millions (2010-2025)
                  </div>
                </TabsContent>
                
                <TabsContent value="gdp" className="m-0 h-full">
                  <LineChart 
                    data={gdpData}
                    xAxisKey="name"
                    lines={[{ dataKey: "value", name: "GDP", color: "#10b981" }]}
                    animation={true}
                  />
                  <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    GDP in Billion USD (2010-2025)
                  </div>
                </TabsContent>
                
                <TabsContent value="inflation" className="m-0 h-full">
                  <LineChart 
                    data={inflationData}
                    xAxisKey="name"
                    lines={[{ dataKey: "value", name: "Inflation", color: "#ef4444" }]}
                    animation={true}
                  />
                  <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Inflation Rate (%) (2010-2025)
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Source: Zambia Statistics Agency, Bank of Zambia, World Bank
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default DataVisualizer;
