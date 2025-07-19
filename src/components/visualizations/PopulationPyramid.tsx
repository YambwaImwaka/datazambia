import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { populationPyramidData } from '@/utils/data';

const PopulationPyramid = () => {
  const [selectedYear, setSelectedYear] = useState<string>('2019');
  
  const years = [...new Set(populationPyramidData.map(d => d.year))].sort();
  
  const yearData = populationPyramidData.filter(d => d.year === parseInt(selectedYear));
  
  // Transform data for pyramid chart
  const chartData = [...new Set(yearData.map(d => d.ageRange))].map(ageRange => {
    const maleData = yearData.find(d => d.ageRange === ageRange && d.sex === 'Males');
    const femaleData = yearData.find(d => d.ageRange === ageRange && d.sex === 'Females');
    
    return {
      ageRange,
      Males: -(maleData?.population || 0) / 1000, // Negative for left side
      Females: (femaleData?.population || 0) / 1000,
      MalesAbs: (maleData?.population || 0) / 1000,
    };
  });

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Population Pyramid</h2>
        <p className="text-muted-foreground">Age and gender distribution by year</p>
      </div>

      <div className="flex justify-center">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Population by Age Group ({selectedYear})</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={chartData}
              layout="horizontal"
              margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                axisLine={false}
                tickFormatter={(value) => `${Math.abs(value)}k`}
              />
              <YAxis 
                dataKey="ageRange" 
                type="category" 
                axisLine={false}
                fontSize={12}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${Math.abs(value).toFixed(0)}k people`, 
                  name === 'Males' ? 'Males' : 'Females'
                ]}
              />
              <Bar dataKey="Males" fill="hsl(var(--secondary))" name="Males" />
              <Bar dataKey="Females" fill="hsl(var(--primary))" name="Females" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PopulationPyramid;