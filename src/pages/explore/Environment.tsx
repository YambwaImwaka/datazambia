import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchEnvironmentClimateData } from '@/services/environment/EnvironmentClimateService';
import { useQuery } from '@tanstack/react-query';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { Cloud, Droplets, Trees, AlertTriangle } from 'lucide-react';

const Environment: React.FC = () => {
  const { data: environmentData, isLoading } = useQuery({
    queryKey: ['environment'],
    queryFn: fetchEnvironmentClimateData,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <PageLayout
      title="Environment & Climate | Zambia Insight"
      description="Track rainfall patterns, forest cover, water availability, and pollution levels in Zambia."
      canonicalUrl="https://datazambia.com/explore/environment"
    >
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Environment & Climate</h1>
          <p className="text-muted-foreground">
            Monitor rainfall patterns, droughts/floods, forest cover, water availability, and pollution levels
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 animate-pulse">
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Avg Annual Rainfall</CardTitle>
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{environmentData?.keyMetrics.avgRainfall}mm</div>
                  <p className="text-xs text-muted-foreground">per year</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Forest Cover</CardTitle>
                  <Trees className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{environmentData?.keyMetrics.forestCover}%</div>
                  <p className="text-xs text-muted-foreground">of land area</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Water Availability</CardTitle>
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{environmentData?.keyMetrics.waterAccess}%</div>
                  <p className="text-xs text-muted-foreground">population with access</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Climate Risk Level</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{environmentData?.keyMetrics.climateRisk}</div>
                  <p className="text-xs text-muted-foreground">risk classification</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Annual Rainfall Trends</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <LineChart
                    data={environmentData?.rainfallTrends || []}
                    lines={[{ dataKey: 'rainfall', name: 'Rainfall (mm)', color: '#3b82f6' }]}
                    xAxisKey="year"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Forest Cover Change</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <LineChart
                    data={environmentData?.forestCoverTrends || []}
                    lines={[{ dataKey: 'coverage', name: 'Forest Cover (%)', color: '#10b981' }]}
                    xAxisKey="year"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Water Access by Region</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <BarChart
                    data={environmentData?.waterAccessByRegion || []}
                    bars={[{ dataKey: 'access', name: 'Access (%)', color: '#06b6d4' }]}
                    xAxisKey="region"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Extreme Weather Events</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]">
                  <BarChart
                    data={environmentData?.extremeEvents || []}
                    bars={[
                      { dataKey: 'droughts', name: 'Droughts', color: '#f59e0b' },
                      { dataKey: 'floods', name: 'Floods', color: '#3b82f6' }
                    ]}
                    xAxisKey="year"
                  />
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default Environment;
