
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const childMortalityData = [
  { year: 1990, "Under-5": 165.8, "Under-1": 89.6 },
  { year: 1995, "Under-5": 159.0, "Under-1": 86.7 },
  { year: 2000, "Under-5": 141.7, "Under-1": 81.0 },
  { year: 2005, "Under-5": 116.3, "Under-1": 70.4 },
  { year: 2010, "Under-5": 86.0, "Under-1": 54.7 },
  { year: 2015, "Under-5": 64.7, "Under-1": 43.1 },
  { year: 2020, "Under-5": 48.8, "Under-1": 33.6 },
  { year: 2021, "Under-5": 46.1, "Under-1": 32.1 }
];

const ChildMortalityTrends = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-lg">Child Mortality Trends (1990-2021)</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Deaths per 1,000 live births - Showing significant improvement over three decades
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={childMortalityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: number, name: string) => [value, `${name} mortality per 1,000`]} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="Under-5" 
                  stroke="#dc2626" 
                  strokeWidth={3}
                  name="Under-5 mortality"
                />
                <Line 
                  type="monotone" 
                  dataKey="Under-1" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  name="Infant (Under-1) mortality"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-lg">Mortality Reduction Progress</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-green-800 dark:text-green-200">Under-5 Mortality</span>
                <span className="text-2xl font-bold text-green-600">-72%</span>
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Reduced from 165.8 to 46.1 deaths per 1,000 births (1990-2021)
              </div>
              <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-blue-800 dark:text-blue-200">Infant Mortality</span>
                <span className="text-2xl font-bold text-blue-600">-64%</span>
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                Reduced from 89.6 to 32.1 deaths per 1,000 births (1990-2021)
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Key Achievements</h4>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Steepest decline occurred between 2000-2010</li>
                <li>• Consistent year-over-year improvements</li>
                <li>• Both infant and under-5 mortality trending downward</li>
                <li>• Progress accelerated after 2005</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildMortalityTrends;
