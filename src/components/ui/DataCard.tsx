
import { useState, ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronUp, ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";

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
  source
}: DataCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define color gradients based on positive/negative values
  const backgroundGradient = isPositive
    ? "bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-800/90"
    : "bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-800/90";

  const borderGradient = isPositive
    ? "border-l-4 border-green-500"
    : "border-l-4 border-red-500";

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-800",
        backgroundGradient,
        borderGradient,
        isHovered ? "shadow-lg transform translate-y-[-3px]" : "shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        animationDelay: `${index * 100}ms`,
        opacity: 0,
        animation: "fade-in 0.5s ease-out forwards",
        transitionProperty: "transform, box-shadow"
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
            {icon && <span className="text-gray-700 dark:text-gray-300">{icon}</span>}
            {title}
          </CardTitle>
          {description && (
            <Tooltip content={description}>
              <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
                <HelpCircle size={16} />
              </button>
            </Tooltip>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col">
          <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {value}
          </p>
          
          {change && (
            <div className="flex items-center mt-2">
              {isPositive ? (
                <ChevronUp className="h-4 w-4 text-green-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-red-500" />
              )}
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
            <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
              {lastUpdated && <p>Last updated: {lastUpdated}</p>}
              {source && <p className="mt-0.5">Source: {source}</p>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
