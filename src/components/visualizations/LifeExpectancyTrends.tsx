import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { lifeExpectancyData } from '@/utils/data';

const LifeExpectancyTrends = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');

  // Filter data based on selected period
  const filteredData = selectedPeriod === 'all' 
    ? lifeExpectancyData 
    : lifeExpectancyData.filter(item => item.timePeriod === selectedPeriod);

  // Group data by year for the chart
  const chartData = filteredData.reduce((acc: any[], item) => {
    const existingYear = acc.find(d => d.year === item.year);
    if (existingYear) {
      existingYear[item.sex] = item.age;
    } else {
      acc.push({
        year: item.year,
        [item.sex]: item.age,
        timePeriod: item.timePeriod
      });
    }
    return acc;
  }, []).sort((a, b) => a.year - b.year);

  // Calculate key statistics
  const currentFemaleLife = lifeExpectancyData.find(d => d.year === 2021 && d.sex === 'Females')?.age || 0;
  const currentMaleLife = lifeExpectancyData.find(d => d.year === 2021 && d.sex === 'Males')?.age || 0;
  const projectedFemaleLife = lifeExpectancyData.find(d => d.year === 2050 && d.sex === 'Females')?.age || 0;
  const projectedMaleLife = lifeExpectancyData.find(d => d.year === 2050 && d.sex === 'Males')?.age || 0;

  const genderGap2021 = currentFemaleLife - currentMaleLife;
  const genderGap2050 = projectedFemaleLife - projectedMaleLife;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Life Expectancy Trends</h2>
        <p className="text-muted-foreground">
          Historical and projected life expectancy at birth (1990-2050)
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Current (2021)</h3>
              <p className="text-lg font-bold text-primary">{currentFemaleLife} years</p>
              <p className="text-xs text-muted-foreground">Females</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Current (2021)</h3>
              <p className="text-lg font-bold text-secondary">{currentMaleLife} years</p>
              <p className="text-xs text-muted-foreground">Males</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Projected (2050)</h3>
              <p className="text-lg font-bold text-primary">{projectedFemaleLife} years</p>
              <p className="text-xs text-muted-foreground">Females</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground">Projected (2050)</h3>
              <p className="text-lg font-bold text-secondary">{projectedMaleLife} years</p>
              <p className="text-xs text-muted-foreground">Males</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Years</TabsTrigger>
          <TabsTrigger value="Past">Historical (1990-2021)</TabsTrigger>
          <TabsTrigger value="Forecasted">Projected (2022-2050)</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedPeriod} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Life Expectancy by Gender</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    type="number"
                    scale="linear"
                    domain={['dataMin', 'dataMax']}
                  />
                  <YAxis 
                    label={{ value: 'Life Expectancy (years)', angle: -90, position: 'insideLeft' }}
                    domain={['dataMin - 2', 'dataMax + 2']}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value} years`, '']}
                    labelFormatter={(year) => `Year: ${year}`}
                  />
                  <Legend />
                  <ReferenceLine x={2021} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
                  <Line 
                    type="monotone" 
                    dataKey="Females" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ r: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Males" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    dot={{ r: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gender Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">2021 Gap:</span>
              <span className="text-lg font-bold text-primary">{genderGap2021.toFixed(1)} years</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">2050 Gap:</span>
              <span className="text-lg font-bold text-primary">{genderGap2050.toFixed(1)} years</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The gender gap in life expectancy is expected to remain relatively stable, with females continuing to live longer than males.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Trends</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">
                Significant recovery expected after COVID-19 impact in 2020-2021
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">
                Steady improvement projected through 2050 for both genders
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">
                Female life expectancy could reach nearly 75 years by 2050
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-muted-foreground">
                HIV/AIDS impact visible in the 1990s and early 2000s decline
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LifeExpectancyTrends;