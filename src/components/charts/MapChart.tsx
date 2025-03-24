
import React from 'react';
import { Card } from "@/components/ui/card";

// Define props interface for the MapChart component
export interface MapChartProps {
  data: {
    id?: string;
    name: string;
    value: number;
    coordinates: [number, number];
    color?: string;
  }[];
  title: string;
  description?: string;
  height?: number;
  width?: string;
  colorScale?: string[];
  tooltipFormat?: (name: string, value: number) => string;
  onClick?: (id: string) => void;
}

export const MapChart: React.FC<MapChartProps> = ({
  data,
  title,
  description,
  height = 500,
  width = '100%',
  colorScale,
  tooltipFormat,
  onClick
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-400">No map data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));

  const handlePointClick = (id?: string) => {
    if (onClick && id) {
      onClick(id);
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      )}
      
      <div className="relative" style={{ height, width }}>
        {/* Simple SVG map of Zambia */}
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 800 600" 
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
        >
          <g transform="translate(100, 100) scale(2.5)">
            <path 
              d="M148.2,38.1C147.3,37.2,146.3,36.5,145.2,35.9C144.2,35.3,143.1,34.9,142,34.7C140.9,34.5,139.8,34.5,138.7,34.6C137.6,34.7,136.5,35,135.5,35.4C134.5,35.8,133.5,36.4,132.6,37.1C131.7,37.8,130.9,38.6,130.2,39.5C129.5,40.4,128.9,41.4,128.5,42.4C128.1,43.4,127.8,44.5,127.7,45.6C127.6,46.7,127.6,47.8,127.8,48.9C128,50,128.4,51.1,128.9,52.1C129.5,53.2,130.2,54.2,131.1,55.1C132,56,132.9,56.8,143.6,53L148.2,38.1Z" 
              fill="#1E3A8A"
              stroke="#FFFFFF"
              strokeWidth="0.5"
            />
            {/* Add more path elements for other provinces */}
            
            {/* Data points with radius based on value */}
            {data.map((item, index) => {
              const size = (item.value / maxValue) * 30 + 10; // Scale circle size
              
              return (
                <g 
                  key={index} 
                  transform={`translate(${item.coordinates[0] * 6}, ${item.coordinates[1] * 5})`}
                  onClick={() => handlePointClick(item.id)}
                  className="cursor-pointer"
                >
                  <circle 
                    cx="0" 
                    cy="0" 
                    r={size} 
                    fill={item.color || "#3B82F6"} 
                    fillOpacity="0.7"
                    stroke="#FFFFFF"
                    strokeWidth="1"
                  />
                  <text 
                    x="0" 
                    y="0" 
                    textAnchor="middle" 
                    dy=".3em" 
                    fill="white" 
                    fontSize="8"
                    fontWeight="bold"
                  >
                    {item.name}
                  </text>
                  {tooltipFormat && (
                    <title>{tooltipFormat(item.name, item.value)}</title>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
        
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color || "#3B82F6" }}
              ></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MapChart;
