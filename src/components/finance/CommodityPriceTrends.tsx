import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Fuel, Fish, Wheat } from 'lucide-react';

const commodityData = [
  { month: 'Jun 2017', Paraffin: 6.81, Petrol: 12.5, Diesel: 10.76, 'Dried Kapenta Siavonga': 128.38, 'Dried Kapenta Mpulungu': 114.98, 'Rape Vegetable': 4.57, Tomatoes: 6.78, 'Maize Grain': 36.41, 'Roller Mealie Meal': 74.73, 'Breakfast Mealie Meal': 96.37 },
  { month: 'Jul 2017', Paraffin: 6.78, Petrol: 12.5, Diesel: 10.72, 'Dried Kapenta Siavonga': 126.78, 'Dried Kapenta Mpulungu': 108.52, 'Rape Vegetable': 4.45, Tomatoes: 7.27, 'Maize Grain': 33.97, 'Roller Mealie Meal': 65.84, 'Breakfast Mealie Meal': 88.58 },
  { month: 'Aug 2017', Paraffin: 6.5, Petrol: 11.67, Diesel: 9.87, 'Dried Kapenta Siavonga': 124.33, 'Dried Kapenta Mpulungu': 109.99, 'Rape Vegetable': 4.52, Tomatoes: 7.02, 'Maize Grain': 31.07, 'Roller Mealie Meal': 57.73, 'Breakfast Mealie Meal': 77.27 },
  { month: 'Sep 2017', Paraffin: 6.53, Petrol: 11.67, Diesel: 9.87, 'Dried Kapenta Siavonga': 128.02, 'Dried Kapenta Mpulungu': 112.45, 'Rape Vegetable': 4.37, Tomatoes: 7.03, 'Maize Grain': 29.1, 'Roller Mealie Meal': 54.21, 'Breakfast Mealie Meal': 72 },
  { month: 'Oct 2017', Paraffin: 6.48, Petrol: 11.67, Diesel: 9.87, 'Dried Kapenta Siavonga': 131.76, 'Dried Kapenta Mpulungu': 111.39, 'Rape Vegetable': 4.42, Tomatoes: 6.94, 'Maize Grain': 28.31, 'Roller Mealie Meal': 52.57, 'Breakfast Mealie Meal': 69.36 },
  { month: 'Nov 2017', Paraffin: 7.83, Petrol: 12.97, Diesel: 11.09, 'Dried Kapenta Siavonga': 135.77, 'Dried Kapenta Mpulungu': 119.67, 'Rape Vegetable': 4.62, Tomatoes: 6.93, 'Maize Grain': 29, 'Roller Mealie Meal': 51.24, 'Breakfast Mealie Meal': 67.39 },
  { month: 'Dec 2017', Paraffin: 7.82, Petrol: 12.97, Diesel: 11.09, 'Dried Kapenta Siavonga': 128.74, 'Dried Kapenta Mpulungu': 109.19, 'Rape Vegetable': 5.02, Tomatoes: 6.53, 'Maize Grain': 28.18, 'Roller Mealie Meal': 49.76, 'Breakfast Mealie Meal': 66.23 },
  { month: 'Jan 2018', Paraffin: 7.82, Petrol: 12.95, Diesel: 11.11, 'Dried Kapenta Siavonga': 136.67, 'Dried Kapenta Mpulungu': 118.48, 'Rape Vegetable': 5.31, Tomatoes: 6.54, 'Maize Grain': 29.31, 'Roller Mealie Meal': 50.95, 'Breakfast Mealie Meal': 67.17 },
  { month: 'Feb 2018', Paraffin: 7.82, Petrol: 12.97, Diesel: 11.09, 'Dried Kapenta Siavonga': 142.69, 'Dried Kapenta Mpulungu': 125.7, 'Rape Vegetable': 5.58, Tomatoes: 6.84, 'Maize Grain': 28.26, 'Roller Mealie Meal': 51.67, 'Breakfast Mealie Meal': 69.72 },
  { month: 'Mar 2018', Paraffin: 8.85, Petrol: 13.75, Diesel: 12.01, 'Dried Kapenta Siavonga': 141.42, 'Dried Kapenta Mpulungu': 121.11, 'Rape Vegetable': 5.77, Tomatoes: 10.5, 'Maize Grain': 29.25, 'Roller Mealie Meal': 53.8, 'Breakfast Mealie Meal': 73.46 },
  { month: 'Apr 2018', Paraffin: 8.74, Petrol: 13.77, Diesel: 12, 'Dried Kapenta Siavonga': 151.68, 'Dried Kapenta Mpulungu': 123.8, 'Rape Vegetable': 6.03, Tomatoes: 11.76, 'Maize Grain': 29.02, 'Roller Mealie Meal': 54, 'Breakfast Mealie Meal': 77.34 },
  { month: 'May 2018', Paraffin: 8.85, Petrol: 13.74, Diesel: 12, 'Dried Kapenta Siavonga': 138.42, 'Dried Kapenta Mpulungu': 121.49, 'Rape Vegetable': 5.62, Tomatoes: 12.68, 'Maize Grain': 30.74, 'Roller Mealie Meal': 57.23, 'Breakfast Mealie Meal': 79.56 }
];

const fuelCommodities = ['Paraffin', 'Petrol', 'Diesel'];
const fishCommodities = ['Dried Kapenta Siavonga', 'Dried Kapenta Mpulungu'];
const vegetableCommodities = ['Rape Vegetable', 'Tomatoes'];
const grainCommodities = ['Maize Grain', 'Roller Mealie Meal', 'Breakfast Mealie Meal'];

const colors = {
  Paraffin: '#8884d8',
  Petrol: '#82ca9d',
  Diesel: '#ffc658',
  'Dried Kapenta Siavonga': '#ff7300',
  'Dried Kapenta Mpulungu': '#00ff7f',
  'Rape Vegetable': '#ff1493',
  Tomatoes: '#ff6347',
  'Maize Grain': '#ffd700',
  'Roller Mealie Meal': '#daa520',
  'Breakfast Mealie Meal': '#cd853f'
};

interface CommodityPriceTrendsProps {
  isVisible: boolean;
}

const CommodityPriceTrends: React.FC<CommodityPriceTrendsProps> = ({ isVisible }) => {
  const [activeCategory, setActiveCategory] = useState('fuel');

  const getCommoditiesForCategory = (category: string) => {
    switch (category) {
      case 'fuel': return fuelCommodities;
      case 'fish': return fishCommodities;
      case 'vegetables': return vegetableCommodities;
      case 'grains': return grainCommodities;
      default: return fuelCommodities;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fuel': return <Fuel className="h-4 w-4" />;
      case 'fish': return <Fish className="h-4 w-4" />;
      case 'vegetables': return <TrendingUp className="h-4 w-4" />;
      case 'grains': return <Wheat className="h-4 w-4" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground mb-2">{label}</p>
          {payload.map((entry: any) => (
            <p key={entry.dataKey} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: K{entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <div>
            <CardTitle className="text-foreground">Commodity Price Trends</CardTitle>
            <CardDescription className="text-muted-foreground">
              Monthly commodity prices from Jun 2017 to May 2018 (in ZMW)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="fuel" className="flex items-center gap-2">
              {getCategoryIcon('fuel')}
              Fuel
            </TabsTrigger>
            <TabsTrigger value="fish" className="flex items-center gap-2">
              {getCategoryIcon('fish')}
              Fish
            </TabsTrigger>
            <TabsTrigger value="vegetables" className="flex items-center gap-2">
              {getCategoryIcon('vegetables')}
              Vegetables
            </TabsTrigger>
            <TabsTrigger value="grains" className="flex items-center gap-2">
              {getCategoryIcon('grains')}
              Grains
            </TabsTrigger>
          </TabsList>

          {['fuel', 'fish', 'vegetables', 'grains'].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={commodityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      label={{ value: 'Price (ZMW)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {getCommoditiesForCategory(category).map((commodity) => (
                      <Line
                        key={commodity}
                        type="monotone"
                        dataKey={commodity}
                        stroke={colors[commodity as keyof typeof colors]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Price Summary */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getCommoditiesForCategory(category).map((commodity) => {
                  const latestPrice = commodityData[commodityData.length - 1][commodity as keyof typeof commodityData[0]] as number;
                  const firstPrice = commodityData[0][commodity as keyof typeof commodityData[0]] as number;
                  const change = ((latestPrice - firstPrice) / firstPrice * 100).toFixed(1);
                  const isPositive = parseFloat(change) >= 0;
                  
                  return (
                    <div key={commodity} className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-semibold text-sm text-foreground">{commodity}</div>
                      <div className="text-lg font-bold text-foreground">K{latestPrice}</div>
                      <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}{change}% vs Jun 2017
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>Source: Market price data for various commodities in Zambia</p>
          <p>Last updated: May 2018</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommodityPriceTrends;