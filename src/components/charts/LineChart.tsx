
import React from "react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

interface LineProps {
  dataKey: string;
  name?: string;
  color: string;
  strokeDasharray?: string;
}

interface LineChartProps {
  data: any[];
  lines?: LineProps[];
  xAxisKey: string;
  lineKey?: string; // Added for backward compatibility
  strokeColor?: string; // Added for backward compatibility
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  animation?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  xAxisKey,
  lineKey,
  strokeColor,
  height = 400,
  showGrid = true,
  showLegend = true,
  animation = true
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  // Handle both new API with lines array and old API with single lineKey and strokeColor
  const lineConfigs = lines || (lineKey ? [{ dataKey: lineKey, color: strokeColor || "#3b82f6", name: lineKey }] : []);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis
          dataKey={xAxisKey}
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: "#94a3b8" }}
          axisLine={{ stroke: "#94a3b8" }}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: "#94a3b8" }}
          axisLine={{ stroke: "#94a3b8" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #e2e8f0",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        {showLegend && (
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: "20px" }}
          />
        )}
        {lineConfigs.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name || line.dataKey}
            stroke={line.color}
            strokeWidth={2}
            activeDot={{ r: 6 }}
            strokeDasharray={line.strokeDasharray}
            isAnimationActive={animation}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
