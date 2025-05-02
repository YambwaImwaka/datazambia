
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Globe, BarChart, PieChart, Search } from "lucide-react";
import { keyMetrics } from "@/utils/data";

const DataHighlights: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
              <BarChart size={16} />
              <span>Key Metrics</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Zambia at a Glance
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Key development indicators and metrics across the nation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="h-full border-t-4 hover:shadow-md transition-shadow border-t-blue-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{metric.title}</p>
                      <h3 className="text-3xl font-bold mb-1">{metric.value}</h3>
                      <div className="flex items-center">
                        <span className={`flex items-center text-sm ${metric.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {metric.isPositive ? 
                            <TrendingUp className="h-4 w-4 mr-1" /> : 
                            <TrendingDown className="h-4 w-4 mr-1" />
                          }
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30`}>
                      {metric.id === 'population' && <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                      {metric.id === 'gdp' && <BarChart className="h-5 w-5 text-green-600 dark:text-green-400" />}
                      {metric.id === 'literacy' && <PieChart className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
                      {metric.id === 'urbanization' && <Search className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Last updated: {metric.lastUpdated}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataHighlights;
