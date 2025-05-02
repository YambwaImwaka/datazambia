
import { useState, ReactElement, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronUp, ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface DataCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  description?: string;
  className?: string;
  index?: number;
  icon?: ReactElement;
  lastUpdated?: string;
  source?: string;
  sourceLink?: string;
}

export const DataCard = ({ 
  title, 
  value, 
  change, 
  isPositive = true, 
  description,
  className,
  index = 0,
  icon,
  lastUpdated,
  source,
  sourceLink
}: DataCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  // Define color gradients based on positive/negative values
  const backgroundGradient = isPositive
    ? "bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-800/90"
    : "bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-800/90";

  const borderGradient = isPositive
    ? "border-l-4 border-green-500"
    : "border-l-4 border-red-500";

  const hoverAnimation = {
    rest: { 
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    hover: { 
      y: -3,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
    }
  };

  const entryAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={entryAnimation}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-800 h-full",
          backgroundGradient,
          borderGradient,
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
              {icon && (
                <motion.span 
                  className="text-gray-700 dark:text-gray-300"
                  animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {icon}
                </motion.span>
              )}
              {title}
            </CardTitle>
            {description && (
              <Tooltip content={description}>
                <motion.button 
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                  whileHover={{ rotate: 10 }}
                >
                  <HelpCircle size={16} />
                </motion.button>
              </Tooltip>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col">
            <motion.p 
              className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {value}
            </motion.p>
            
            {change && (
              <div className="flex items-center mt-2">
                <motion.div
                  animate={isHovered ? { y: [0, -3, 0] } : {}}
                  transition={{ repeat: 0, duration: 0.5 }}
                >
                  {isPositive ? (
                    <ChevronUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-red-500" />
                  )}
                </motion.div>
                <p 
                  className={cn(
                    "text-xs font-medium ml-1",
                    isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}
                >
                  {change}
                </p>
              </div>
            )}
            
            {(lastUpdated || source) && (
              <motion.div 
                className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {lastUpdated && <p>Last updated: {lastUpdated}</p>}
                {source && sourceLink ? (
                  <p className="mt-0.5">
                    Source:{" "}
                    <a 
                      href={sourceLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="underline hover:text-zambia-700 transition-colors"
                    >
                      {source}
                    </a>
                  </p>
                ) : (
                  source && <p className="mt-0.5">Source: {source}</p>
                )}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DataCard;
