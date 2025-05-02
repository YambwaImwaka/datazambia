
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Book, LineChart, Globe, PieChart, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

const SectorTiles: React.FC = () => {
  const sectors = [
    {
      title: "Education",
      icon: <Book size={28} className="text-amber-500" />,
      description: "Literacy rates, enrollment statistics, and educational outcomes",
      color: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-900",
      link: "/explore/education"
    },
    {
      title: "Economy",
      icon: <LineChart size={28} className="text-green-500" />,
      description: "GDP growth, economic indicators, and market trends",
      color: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-200 dark:border-green-900",
      link: "/explore/economy"
    },
    {
      title: "Health",
      icon: <PieChart size={28} className="text-blue-500" />,
      description: "Health metrics, disease prevalence, and medical facilities",
      color: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-900",
      link: "/explore/health"
    },
    {
      title: "Agriculture",
      icon: <Globe size={28} className="text-emerald-500" />,
      description: "Crop production, livestock data, and farming practices",
      color: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-200 dark:border-emerald-900",
      link: "/explore/agriculture"
    },
    {
      title: "Finance",
      icon: <BarChart size={28} className="text-purple-500" />,
      description: "Exchange rates, stock market data, and investment metrics",
      color: "bg-purple-50 dark:bg-purple-950/30",
      border: "border-purple-200 dark:border-purple-900",
      link: "/finance"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Data Categories
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Explore comprehensive data across key sectors of Zambia's development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link to={sector.link} className="block h-full">
                <Card className={`h-full border ${sector.border} hover:shadow-md transition-shadow`}>
                  <CardContent className={`p-6 ${sector.color}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm inline-block mb-4">
                          {sector.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{sector.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {sector.description}
                        </p>
                      </div>
                      <ArrowRight className="text-gray-400 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorTiles;
