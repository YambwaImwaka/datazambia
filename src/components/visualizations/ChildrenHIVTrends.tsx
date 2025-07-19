import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { childrenHIVData } from "@/utils/data";
import { TrendingDown, Shield } from "lucide-react";

const ChildrenHIVTrends = () => {
  const peakYear = childrenHIVData.reduce((prev, current) => 
    (prev.infections > current.infections) ? prev : current
  );
  const latestYear = childrenHIVData[childrenHIVData.length - 1];
  const reduction = Math.round(((peakYear.infections - latestYear.infections) / peakYear.infections) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current (2022)</CardDescription>
            <CardTitle className="text-2xl">{latestYear.infections.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Reduction from Peak</CardDescription>
            <CardTitle className="text-2xl text-green-600 flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              -{reduction}%
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Prevention Success</CardDescription>
            <CardTitle className="text-2xl text-green-600 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              High
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Children HIV Infections (Ages 0-14)</CardTitle>
          <CardDescription>
            Progress in preventing HIV transmission to children (1990-2022)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={childrenHIVData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value.toLocaleString()}`, 'New Infections']}
                labelFormatter={(year) => `Year: ${year}`}
              />
              <Area 
                type="monotone" 
                dataKey="infections" 
                stroke="hsl(var(--destructive))" 
                fill="hsl(var(--destructive)/20)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prevention Milestones</CardTitle>
          <CardDescription>
            Key achievements in reducing pediatric HIV
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <span className="font-medium">Peak Infections</span>
              <span className="text-sm text-red-600">{peakYear.year}: {peakYear.infections.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <span className="font-medium">50% Reduction</span>
              <span className="text-sm text-orange-600">2010: 12,000 (-45%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <span className="font-medium">75% Reduction</span>
              <span className="text-sm text-yellow-600">2015: 9,800 (-55%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <span className="font-medium">80% Reduction</span>
              <span className="text-sm text-green-600">2022: 4,400 (-80%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Success Factors</CardTitle>
          <CardDescription>
            Key interventions that contributed to reducing pediatric HIV
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">Prevention Programs</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Prevention of Mother-to-Child Transmission (PMTCT)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Antiretroviral therapy for pregnant mothers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Safe delivery practices
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Infant feeding counseling
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-secondary">Support Systems</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Enhanced testing and counseling
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Community health worker programs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Partner involvement initiatives
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Healthcare infrastructure improvements
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildrenHIVTrends;