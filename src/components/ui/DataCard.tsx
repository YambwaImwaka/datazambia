
import { useState, ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronUp, ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-800",
        isHovered ? "shadow-elevated transform translate-y-[-5px]" : "shadow-subtle",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        animationDelay: `${index * 100}ms`,
        opacity: 0,
        animation: "fade-in 0.5s ease-out forwards"
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </CardTitle>
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                    <HelpCircle size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-2 text-xs" side="bottom">
                  {description}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col">
          <div className="flex items-center">
            {icon && <div className="mr-2 text-gray-500 dark:text-gray-400">{icon}</div>}
            <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
          
          {change && (
            <div className="flex items-center mt-1">
              {isPositive ? (
                <ChevronUp className="h-4 w-4 text-green-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-red-500" />
              )}
              <p 
                className={cn(
                  "text-xs font-medium ml-1",
                  isPositive ? "text-green-500" : "text-red-500"
                )}
              >
                {change}
              </p>
            </div>
          )}
          
          {(lastUpdated || source) && (
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400">
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
