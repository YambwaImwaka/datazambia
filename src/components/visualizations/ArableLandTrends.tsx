import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { arableLandData } from "@/utils/data";
import { TrendingDown } from "lucide-react";

const ArableLandTrends = () => {
  const firstYear = arableLandData[0];
  const lastYear = arableLandData[arableLandData.length - 1];
  const decline = Math.round(((firstYear.hectares - lastYear.hectares) / firstYear.hectares) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current (2021)</CardDescription>
            <CardTitle className="text-2xl">{lastYear.hectares} ha/person</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Decline Since 1961</CardDescription>
            <CardTitle className="text-2xl text-red-600 flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              -{decline}%
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Population Pressure</CardDescription>
            <CardTitle className="text-2xl">High</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Arable Land per Person</CardTitle>
          <CardDescription>
            Declining agricultural land availability (hectares per person)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={arableLandData}>
              <XAxis dataKey="year" />
              <YAxis domain={[0, 'dataMax']} />
              <Tooltip 
                formatter={(value) => [`${value} hectares`, 'Per Person']}
                labelFormatter={(year) => `Year: ${year}`}
              />
              <Line 
                type="monotone" 
                dataKey="hectares" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Land Pressure Analysis</CardTitle>
          <CardDescription>
            Understanding the decline in arable land per capita
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-destructive">Contributing Factors</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  Population growth outpacing land expansion
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  Urbanization reducing agricultural areas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  Climate change affecting land productivity
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">•</span>
                  Soil degradation in some regions
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">Implications</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Need for agricultural intensification
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Focus on crop yield improvements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Investment in sustainable farming
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Food security considerations
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArableLandTrends;