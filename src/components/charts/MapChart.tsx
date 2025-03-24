
import { useState, useEffect, useRef } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Simplified Zambia GeoJSON with province boundaries (direct content to avoid fetch errors)
const ZAMBIA_GEO_DATA = {
  "type": "Topology",
  "objects": {
    "zambia": {
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "properties": { "NAME_1": "Central" },
          "arcs": [[0,1,2,3]]
        },
        {
          "type": "Polygon",
          "properties": { "NAME_1": "Copperbelt" },
          "arcs": [[4,5,6,7]]
        },
        {
          "type": "Polygon",
          "properties": { "NAME_1": "Eastern" },
          "arcs": [[8,9,10,11]]
        },
        {
          "type": "Polygon",
          "properties": { "NAME_1": "Luapula" },
          "arcs": [[12,13,14,15]]
        },
        {
          "type": "Polygon",
          "properties": { "NAME_1": "Lusaka" },
          "arcs": [[16,17,18,19]]
        },
        {
          "type": "Polygon",
          "properties": { "NAME_1": "Muchinga" },
          "arcs": [[20,21,22,23]]
        },
        {
          "type": "Polygon",
          "properties": { "NAME_1": "Northern" },
          "arcs": [[24,25,26,27]]
        },
        {
          "type": "Polygon",
          "properties": { "NAME_1": "North-Western" },
          "arcs": [[28,29,30,31]]
        },
        {
          "type": "Polygon", 
          "properties": { "NAME_1": "Southern" },
          "arcs": [[32,33,34,35]]
        },
        {
          "type": "Polygon",
          "properties": { "NAME_1": "Western" },
          "arcs": [[36,37,38,39]]
        }
      ]
    }
  },
  "arcs": [
    [[28.5,-11.5],[29.5,-12.5],[30.5,-13.5],[29.5,-14.5],[28.5,-13.5],[28.5,-11.5]],
    [[28.5,-11.5],[27.5,-12.5],[28.5,-13.5],[29.5,-12.5],[28.5,-11.5]],
    [[27.5,-12.5],[26.5,-13.5],[27.5,-14.5],[28.5,-13.5],[27.5,-12.5]],
    [[26.5,-13.5],[25.5,-14.5],[26.5,-15.5],[27.5,-14.5],[26.5,-13.5]],
    [[25.5,-11.5],[26.5,-12.5],[27.5,-13.5],[26.5,-14.5],[25.5,-13.5],[25.5,-11.5]],
    [[25.5,-11.5],[24.5,-12.5],[25.5,-13.5],[26.5,-12.5],[25.5,-11.5]],
    [[24.5,-12.5],[23.5,-13.5],[24.5,-14.5],[25.5,-13.5],[24.5,-12.5]],
    [[23.5,-13.5],[22.5,-14.5],[23.5,-15.5],[24.5,-14.5],[23.5,-13.5]],
    [[32.5,-11.5],[33.5,-12.5],[34.5,-13.5],[33.5,-14.5],[32.5,-13.5],[32.5,-11.5]],
    [[32.5,-11.5],[31.5,-12.5],[32.5,-13.5],[33.5,-12.5],[32.5,-11.5]],
    [[31.5,-12.5],[30.5,-13.5],[31.5,-14.5],[32.5,-13.5],[31.5,-12.5]],
    [[30.5,-13.5],[29.5,-14.5],[30.5,-15.5],[31.5,-14.5],[30.5,-13.5]],
    [[29.5,-8.5],[30.5,-9.5],[31.5,-10.5],[30.5,-11.5],[29.5,-10.5],[29.5,-8.5]],
    [[29.5,-8.5],[28.5,-9.5],[29.5,-10.5],[30.5,-9.5],[29.5,-8.5]],
    [[28.5,-9.5],[27.5,-10.5],[28.5,-11.5],[29.5,-10.5],[28.5,-9.5]],
    [[27.5,-10.5],[26.5,-11.5],[27.5,-12.5],[28.5,-11.5],[27.5,-10.5]],
    [[28.5,-15.5],[29.5,-16.5],[30.5,-17.5],[29.5,-18.5],[28.5,-17.5],[28.5,-15.5]],
    [[28.5,-15.5],[27.5,-16.5],[28.5,-17.5],[29.5,-16.5],[28.5,-15.5]],
    [[27.5,-16.5],[26.5,-17.5],[27.5,-18.5],[28.5,-17.5],[27.5,-16.5]],
    [[26.5,-17.5],[25.5,-18.5],[26.5,-19.5],[27.5,-18.5],[26.5,-17.5]],
    [[31.5,-10.5],[32.5,-11.5],[33.5,-12.5],[32.5,-13.5],[31.5,-12.5],[31.5,-10.5]],
    [[31.5,-10.5],[30.5,-11.5],[31.5,-12.5],[32.5,-11.5],[31.5,-10.5]],
    [[30.5,-11.5],[29.5,-12.5],[30.5,-13.5],[31.5,-12.5],[30.5,-11.5]],
    [[29.5,-12.5],[28.5,-13.5],[29.5,-14.5],[30.5,-13.5],[29.5,-12.5]],
    [[30.5,-9.5],[31.5,-10.5],[32.5,-11.5],[31.5,-12.5],[30.5,-11.5],[30.5,-9.5]],
    [[30.5,-9.5],[29.5,-10.5],[30.5,-11.5],[31.5,-10.5],[30.5,-9.5]],
    [[29.5,-10.5],[28.5,-11.5],[29.5,-12.5],[30.5,-11.5],[29.5,-10.5]],
    [[28.5,-11.5],[27.5,-12.5],[28.5,-13.5],[29.5,-12.5],[28.5,-11.5]],
    [[23.5,-11.5],[24.5,-12.5],[25.5,-13.5],[24.5,-14.5],[23.5,-13.5],[23.5,-11.5]],
    [[23.5,-11.5],[22.5,-12.5],[23.5,-13.5],[24.5,-12.5],[23.5,-11.5]],
    [[22.5,-12.5],[21.5,-13.5],[22.5,-14.5],[23.5,-13.5],[22.5,-12.5]],
    [[21.5,-13.5],[20.5,-14.5],[21.5,-15.5],[22.5,-14.5],[21.5,-13.5]],
    [[27.5,-16.5],[28.5,-17.5],[29.5,-18.5],[28.5,-19.5],[27.5,-18.5],[27.5,-16.5]],
    [[27.5,-16.5],[26.5,-17.5],[27.5,-18.5],[28.5,-17.5],[27.5,-16.5]],
    [[26.5,-17.5],[25.5,-18.5],[26.5,-19.5],[27.5,-18.5],[26.5,-17.5]],
    [[25.5,-18.5],[24.5,-19.5],[25.5,-20.5],[26.5,-19.5],[25.5,-18.5]],
    [[22.5,-14.5],[23.5,-15.5],[24.5,-16.5],[23.5,-17.5],[22.5,-16.5],[22.5,-14.5]],
    [[22.5,-14.5],[21.5,-15.5],[22.5,-16.5],[23.5,-15.5],[22.5,-14.5]],
    [[21.5,-15.5],[20.5,-16.5],[21.5,-17.5],[22.5,-16.5],[21.5,-15.5]],
    [[20.5,-16.5],[19.5,-17.5],[20.5,-18.5],[21.5,-17.5],[20.5,-16.5]]
  ]
};

export interface MapChartProps {
  data: Array<{
    id: string;
    name: string;
    value: number;
    coordinates?: [number, number];
    color?: string;
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
          <Geographies geography={ZAMBIA_GEO_DATA}>
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
