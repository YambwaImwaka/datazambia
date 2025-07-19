
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Real data for children newly infected with HIV
const childrenHIVData = [
  { year: 1990, infections: 14000 },
  { year: 1995, infections: 21000 },
  { year: 2000, infections: 22000 },
  { year: 2003, infections: 22000 }, // Peak
  { year: 2005, infections: 18000 },
  { year: 2010, infections: 12000 },
  { year: 2015, infections: 9800 },
  { year: 2020, infections: 5100 },
  { year: 2021, infections: 4800 },
  { year: 2022, infections: 4400 }
];

const ChildrenHIVTrends = () => {
  const peakYear = 2003;
  const peakInfections = 22000;
  const latestInfections = 4400;
  const reductionPercentage = Math.round(((peakInfections - latestInfections) / peakInfections) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-lg">Children HIV Infections Trend (1990-2022)</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            New HIV infections among children aged 0-14 years
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={childrenHIVData}>
                <defs>
                  <linearGradient id="hivGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number) => [value.toLocaleString(), 'New infections']} />
                <Area
                  type="monotone"
                  dataKey="infections"
                  stroke="#dc2626"
                  fillOpacity={1}
                  fill="url(#hivGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-lg">HIV Prevention Success</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-green-800 dark:text-green-200">Overall Reduction</span>
                <span className="text-3xl font-bold text-green-600">-{reductionPercentage}%</span>
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                From peak of {peakInfections.toLocaleString()} in {peakYear} to {latestInfections.toLocaleString()} in 2022
              </div>
              <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${reductionPercentage}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                <div className="text-xl font-bold text-red-600">22,000</div>
                <div className="text-xs text-red-700 dark:text-red-300">Peak (2003)</div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <div className="text-xl font-bold text-blue-600">4,400</div>
                <div className="text-xs text-blue-700 dark:text-blue-300">Current (2022)</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Prevention Milestones</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>• 2003: Peak infections (22,000)</li>
                <li>• 2005-2010: Rapid decline begins</li>
                <li>• 2015: Below 10,000 infections</li>
                <li>• 2020: Achieved 5,100 infections</li>
                <li>• 2022: Further reduced to 4,400</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildrenHIVTrends;
