import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { healthSpendingData } from '@/utils/data';

const HealthSpendingProjections = () => {
  // Transform data for the chart
  const chartData = healthSpendingData.map(item => ({
    category: item.timePeriod,
    '2021 Actual': item.actual2021,
    '2050 Projected': item.projected2050,
    fullCategory: item.category
  }));

  const totalSpending2021 = healthSpendingData.reduce((sum, item) => sum + item.actual2021, 0);
  const totalSpending2050 = healthSpendingData.reduce((sum, item) => sum + item.projected2050, 0);
  const growthRate = ((totalSpending2050 - totalSpending2021) / totalSpending2021 * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Health Spending Projections</h2>
        <p className="text-muted-foreground">
          Actual 2021 vs. Projected 2050 Health Spending (USD per capita)
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-muted-foreground">Total 2021</h3>
              <p className="text-2xl font-bold text-foreground">${totalSpending2021.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">per capita</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-muted-foreground">Projected 2050</h3>
              <p className="text-2xl font-bold text-foreground">${totalSpending2050.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">per capita</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-muted-foreground">Growth Rate</h3>
              <p className="text-2xl font-bold text-primary">+{growthRate}%</p>
              <p className="text-sm text-muted-foreground">increase expected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Health Spending by Source</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="category" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis label={{ value: 'USD per capita', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value, name) => [`$${value}`, name]}
                labelFormatter={(label, payload) => {
                  const fullCategory = payload?.[0]?.payload?.fullCategory;
                  return fullCategory || label;
                }}
              />
              <Legend />
              <Bar dataKey="2021 Actual" fill="hsl(var(--primary))" name="2021 Actual" />
              <Bar dataKey="2050 Projected" fill="hsl(var(--secondary))" name="2050 Projected" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-muted-foreground">
              Government health spending is projected to increase significantly, becoming the largest funding source by 2050
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-muted-foreground">
              Development assistance for health is expected to decrease as the country develops its domestic capacity
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm text-muted-foreground">
              Private spending (both prepaid and out-of-pocket) is projected to grow moderately
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthSpendingProjections;