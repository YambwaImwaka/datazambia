
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataCard } from "@/components/ui/DataCard";
import { keyMetrics } from "@/utils/data";
import { useInView } from "framer-motion";

export const KeyMetrics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  return (
    <section className="py-20 bg-white dark:bg-gray-900" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            style={{ 
              opacity: 0,
              animation: isVisible ? "fade-in 0.5s ease-out forwards" : "none"
            }}
          >
            Key Metrics at a Glance
          </h2>
          <p 
            className="text-lg text-gray-600 dark:text-gray-300"
            style={{ 
              opacity: 0,
              animation: isVisible ? "fade-in 0.5s ease-out 0.2s forwards" : "none"
            }}
          >
            Essential figures and statistics that paint a picture of Zambia's current state
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyMetrics.map((metric, index) => (
            <DataCard
              key={metric.id}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              isPositive={metric.isPositive}
              description={metric.description}
              index={index}
            />
          ))}
        </div>
        
        <div 
          className="text-center mt-12"
          style={{ 
            opacity: 0,
            animation: isVisible ? "fade-in 0.5s ease-out 0.5s forwards" : "none"
          }}
        >
          <Button 
            variant="outline" 
            className="h-11 px-6 border-zambia-300 hover:border-zambia-500 text-zambia-600 hover:text-zambia-700 rounded-full shadow-subtle hover:shadow-elevated transform transition-all duration-300 hover:-translate-y-1"
          >
            View All Metrics
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default KeyMetrics;
