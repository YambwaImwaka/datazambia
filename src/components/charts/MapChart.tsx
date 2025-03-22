
import { useState, useEffect, useRef } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Simplified Zambia GeoJSON with province boundaries
const ZAMBIA_GEO_URL = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/zambia/zambia-provinces.json";

interface MapChartProps {
  data: Array<{
    id: string;
    name: string;
    value: number;
  }>;
  colorScale?: string[];
  title?: string;
  className?: string;
  height?: number;
  showLegend?: boolean;
  tooltipFormat?: (name: string, value: number) => string;
  onClick?: (provinceId: string) => void;
}

export const MapChart = ({
  data,
  colorScale = ["#C6E5FF", "#66B2FF", "#0066CC", "#003366"],
  title,
  className,
  height = 400,
  showLegend = true,
  tooltipFormat = (name, value) => `${name}: ${value}`,
  onClick,
}: MapChartProps) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Map province names from GeoJSON to our data IDs
  const provinceMapping: Record<string, string> = {
    "Central": "central",
    "Copperbelt": "copperbelt",
    "Eastern": "eastern",
    "Luapula": "luapula",
    "Lusaka": "lusaka",
    "Muchinga": "muchinga", 
    "Northern": "northern",
    "North-Western": "northwestern",
    "Southern": "southern",
    "Western": "western"
  };

  // Get min and max values for color scale
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  // Get color for value
  const getColor = (value: number) => {
    const normalizedValue = (value - min) / (max - min);
    const index = Math.min(
      Math.floor(normalizedValue * colorScale.length),
      colorScale.length - 1
    );
    return colorScale[index];
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
  };

  return (
    <div
      ref={mapRef}
      className={cn("w-full relative", className)}
      style={{ height }}
      onMouseMove={handleMouseMove}
    >
      {title && (
        <h3 className="font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
      )}
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ 
          scale: 2500,
          center: [28, -13.5]
        }}
        style={{
          width: "100%",
          height: "100%",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out"
        }}
      >
        <ZoomableGroup>
          <Geographies geography={ZAMBIA_GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const provinceId = provinceMapping[geo.properties.NAME_1];
                const provinceData = data.find(d => d.id === provinceId);
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={provinceData ? getColor(provinceData.value) : "#F5F5F5"}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { 
                        fill: provinceData ? getColor(provinceData.value) : "#F5F5F5",
                        opacity: 0.8,
                        outline: "none"
                      },
                      pressed: { outline: "none" }
                    }}
                    onMouseEnter={() => {
                      if (provinceData) {
                        setTooltipContent(tooltipFormat(provinceData.name, provinceData.value));
                        setShowTooltip(true);
                      }
                    }}
                    onMouseLeave={() => {
                      setShowTooltip(false);
                    }}
                    onClick={() => {
                      if (onClick && provinceId) {
                        onClick(provinceId);
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      
      {showTooltip && (
        <div
          className="absolute pointer-events-none bg-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 text-sm z-10"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 40,
          }}
        >
          {tooltipContent}
        </div>
      )}
      
      {showLegend && (
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-md shadow-md p-2 border border-gray-200 dark:border-gray-700 flex items-center text-xs space-x-3">
          <span>Low</span>
          <div className="flex space-x-0.5">
            {colorScale.map((color, i) => (
              <div
                key={i}
                className="w-4 h-4"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span>High</span>
        </div>
      )}
    </div>
  );
};

export default MapChart;
