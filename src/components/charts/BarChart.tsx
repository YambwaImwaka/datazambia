
import { useRef, useState, useEffect } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

interface BarChartProps {
  data: any[];
  bars: Array<{
    dataKey: string;
    name: string;
    color: string;
  }>;
  keys?: string[]; // For compatibility with Education.tsx
  indexBy?: string; // For compatibility with Education.tsx
  colors?: string[]; // For compatibility with Education.tsx
  legends?: string[]; // For compatibility with Education.tsx
  title?: string;
  xAxisKey: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  className?: string;
  height?: number;
  layout?: "vertical" | "horizontal";
  showGrid?: boolean;
  showAnimation?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 shadow-lg rounded-md">
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        <div className="mt-2">
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-item-${index}`} className="flex items-center mb-1 last:mb-0">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-gray-700 dark:text-gray-300">
                {entry.name}: <span className="font-medium">{entry.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export const BarChart = ({
  data,
  bars,
  keys,
  indexBy,
  colors,
  legends,
  xAxisKey,
  xAxisLabel,
  yAxisLabel,
  title,
  className,
  height = 300,
  layout = "horizontal",
  showGrid = true,
  showAnimation = true,
}: BarChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Handle both APIs - convert old format (keys, indexBy, colors) to new format (bars) if needed
  const barsConfig = bars || 
    (keys ? keys.map((key, index) => ({
      dataKey: key,
      name: legends ? legends[index] : key,
      color: colors ? colors[index] : `hsl(${index * 60}, 70%, 50%)`,
    })) : []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // If using the keys/indexBy format, override xAxisKey
  const effectiveXAxisKey = indexBy || xAxisKey;

  return (
    <div 
      ref={chartRef}
      className={cn("w-full", className)}
    >
      {title && (
        <h3 className="font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />}
          <XAxis
            dataKey={layout === "horizontal" ? effectiveXAxisKey : undefined}
            type={layout === "horizontal" ? "category" : "number"}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={{ stroke: "#d1d5db" }}
            label={
              xAxisLabel
                ? {
                    value: xAxisLabel,
                    position: "insideBottom",
                    offset: -5,
                    fill: "#6b7280",
                  }
                : undefined
            }
          />
          <YAxis
            dataKey={layout === "vertical" ? effectiveXAxisKey : undefined}
            type={layout === "vertical" ? "category" : "number"}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={{ stroke: "#d1d5db" }}
            label={
              yAxisLabel
                ? {
                    value: yAxisLabel,
                    angle: -90,
                    position: "insideLeft",
                    fill: "#6b7280",
                  }
                : undefined
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {barsConfig.map((bar, index) => (
            <Bar
              key={`bar-${index}`}
              dataKey={bar.dataKey}
              name={bar.name}
              fill={bar.color}
              radius={[4, 4, 0, 0]}
              isAnimationActive={isVisible && showAnimation}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
