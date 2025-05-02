
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedInsights: React.FC = () => {
  const insights = [
    {
      title: "Education Progress in Zambia",
      description: "Primary school enrollment has grown to 93% in 2024, marking a significant achievement in educational access.",
      category: "Education",
      date: "April 25, 2025",
      imageSrc: "/lovable-uploads/IMG-20250426-WA0000.jpg"
    },
    {
      title: "Renewable Energy Investment Growth",
      description: "Solar and hydroelectric investments have increased by 27.8% in 2024, creating new opportunities for sustainable development.",
      category: "Economy",
      date: "April 21, 2025",
      imageSrc: "/lovable-uploads/IMG-20250426-WA0001.jpg"
    },
    {
      title: "Agricultural Productivity Trends",
      description: "Crop yields have improved by 12% across central provinces, boosting food security and export potential.",
      category: "Agriculture",
      date: "April 18, 2025",
      imageSrc: "/lovable-uploads/IMG-20250426-WA0002.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <div className="inline-block mb-4">
              <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
                <TrendingUp size={16} />
                <span>Insights and Analysis</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Data Insights</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Key findings and trends from our latest data analysis across Zambian provinces
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/explore">
              <Button variant="outline">
                View All Insights
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={insight.imageSrc}
                    alt={insight.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{insight.category}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{insight.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{insight.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {insight.description}
                  </p>
                  <Button variant="link" className="p-0 h-auto font-medium text-blue-600 dark:text-blue-400">
                    Read Analysis <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedInsights;
