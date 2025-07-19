import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area } from "recharts";
import { aquacultureData } from "@/utils/data";

const AquacultureDashboard = () => {
  const latestYear = aquacultureData[aquacultureData.length - 1];
  const growthRate = Math.round(((latestYear.production - aquacultureData[0].production) / aquacultureData[0].production) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Production (2022)</CardDescription>
            <CardTitle className="text-2xl">{latestYear.production.toLocaleString()} MT</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Growth Since 1977</CardDescription>
            <CardTitle className="text-2xl text-green-600">+{growthRate.toLocaleString()}%</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Annual Growth</CardDescription>
            <CardTitle className="text-2xl">12.8%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aquaculture Production Growth</CardTitle>
          <CardDescription>
            Fish farming production in metric tons (1977-2022)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={aquacultureData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value.toLocaleString()} MT`, 'Production']}
                labelFormatter={(year) => `Year: ${year}`}
              />
              <Area 
                type="monotone" 
                dataKey="production" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary)/20)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Production Milestones</CardTitle>
          <CardDescription>
            Key achievements in Zambian aquaculture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="font-medium">First Production</span>
              <span className="text-sm text-muted-foreground">1977: 3 MT</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="font-medium">1,000 MT Milestone</span>
              <span className="text-sm text-muted-foreground">1987: 1,091 MT</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="font-medium">10,000 MT Milestone</span>
              <span className="text-sm text-muted-foreground">2010: 10,290 MT</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="font-medium">Latest Achievement</span>
              <span className="text-sm text-muted-foreground">2022: 75,648 MT</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AquacultureDashboard;