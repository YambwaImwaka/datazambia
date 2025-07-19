
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Sample data points from the full dataset for visualization
const populationData = [
  { year: 1990, population: 7.9, type: "Historical" },
  { year: 1995, population: 8.8, type: "Historical" },
  { year: 2000, population: 9.9, type: "Historical" },
  { year: 2005, population: 11.5, type: "Historical" },
  { year: 2010, population: 13.7, type: "Historical" },
  { year: 2015, population: 16.3, type: "Historical" },
  { year: 2017, population: 17.4, type: "Historical" },
  { year: 2020, population: 19.0, type: "Forecasted" },
  { year: 2025, population: 21.8, type: "Forecasted" },
  { year: 2030, population: 24.7, type: "Forecasted" },
  { year: 2035, population: 27.7, type: "Forecasted" },
  { year: 2040, population: 30.5, type: "Forecasted" },
  { year: 2045, population: 33.3, type: "Forecasted" },
  { year: 2050, population: 35.9, type: "Forecasted" },
  { year: 2060, population: 40.6, type: "Forecasted" },
  { year: 2070, population: 44.2, type: "Forecasted" },
  { year: 2080, population: 46.5, type: "Forecasted" },
  { year: 2090, population: 47.6, type: "Forecasted" },
  { year: 2100, population: 47.3, type: "Forecasted" }
];

const PopulationForecast = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-lg">Zambia Population Forecast (1990-2100)</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Historical data through 2017, forecasted projections beyond
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={populationData}>
                  <defs>
                    <linearGradient id="populationGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    domain={['dataMin', 'dataMax']}
                    type="number"
                    scale="linear"
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value}M`, 'Population']}
                    labelFormatter={(year) => `Year: ${year}`}
                  />
                  <ReferenceLine x={2017} stroke="#ef4444" strokeDasharray="2 2" />
                  <Area
                    type="monotone"
                    dataKey="population"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#populationGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-lg">Population Milestones</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">47.6M</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Peak Population (2090s)</div>
            </div>

            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">+500%</div>
              <div className="text-sm text-green-700 dark:text-green-300">Growth from 1990-2100</div>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2090</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Population plateau begins</div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="font-semibold text-sm">Key Projections:</h4>
              <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Rapid growth until 2050s</li>
                <li>• Slower growth 2050-2090</li>
                <li>• Population stabilizes by 2090</li>
                <li>• Slight decline after 2095</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PopulationForecast;
