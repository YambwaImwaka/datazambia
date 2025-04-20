
import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, BarChart2, TrendingUp, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataCard } from "@/components/ui/DataCard";
import { motion, useInView } from "framer-motion";
import { fetchEconomicIndicators, EconomicIndicator } from "@/services/economic/EconomicIndicatorService";

export const KeyMetrics = () => {
  const [indicators, setIndicators] = useState<EconomicIndicator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  useEffect(() => {
    const loadIndicators = async () => {
      setLoading(true);
      try {
        const data = await fetchEconomicIndicators();
        setIndicators(data);
      } catch (err) {
        console.error("Failed to load economic indicators:", err);
      } finally {
        setLoading(false);
      }
    };
    loadIndicators();
  }, []);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section
      className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 relative"
      ref={containerRef}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center space-x-2 bg-zambia-50 dark:bg-zambia-900/30 text-zambia-600 dark:text-zambia-400 px-4 py-2 rounded-full text-sm font-medium">
              <BarChart2 size={16} />
              <span>Data Insights</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Key Metrics at a Glance
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Essential figures and statistics that paint a picture of Zambia's current state,
            highlighting trends and patterns across different sectors.
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading key metrics...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {indicators.map((indicator, index) => (
              <motion.div
                key={indicator.name}
                custom={index}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeInUpVariants}
              >
                <DataCard
                  title={indicator.name}
                  value={indicator.value}
                  change={indicator.change}
                  isPositive={indicator.isPositive}
                  description={indicator.description}
                  index={index}
                  source={indicator.source}
                  sourceLink={indicator.sourceLink}
                  lastUpdated={indicator.lastUpdated}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Visual elements */}
        <div className="absolute left-0 opacity-10 dark:opacity-5 pointer-events-none">
          <TrendingUp className="h-64 w-64 text-zambia-500 -rotate-12" />
        </div>
        <div className="absolute right-0 bottom-20 opacity-10 dark:opacity-5 pointer-events-none">
          <LineChart className="h-48 w-48 text-blue-500 rotate-12" />
        </div>
      </div>
    </section>
  );
};

export default KeyMetrics;
