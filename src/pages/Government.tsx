import React, { useState } from 'react';
import { GovernmentStructure } from '@/components/government/GovernmentStructure';
import PageLayout from '@/components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchGovernanceData } from '@/services/governance/GovernanceService';
import { useQuery } from '@tanstack/react-query';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { Building2, TrendingUp, DollarSign, Lightbulb } from 'lucide-react';

const Government = () => {
  const [activeTab, setActiveTab] = useState('structure');
  
  const { data: governanceData, isLoading } = useQuery({
    queryKey: ['governance'],
    queryFn: fetchGovernanceData,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <PageLayout
      title="Government & Governance | Zambia Insight"
      description="Explore Zambia's government structure, ease of doing business, corruption indices, and innovation metrics."
      canonicalUrl="https://datazambia.com/government"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="structure">Government Structure</TabsTrigger>
          <TabsTrigger value="governance">Governance & Business Climate</TabsTrigger>
        </TabsList>

        <TabsContent value="structure">
          <GovernmentStructure />
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Governance & Business Climate</h2>
            <p className="text-muted-foreground">
              Track ease of doing business, corruption perceptions, policy stability, public spending, and innovation indicators
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, i) => (
                <Card key={i}><CardContent className="p-6 animate-pulse"><div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" /></CardContent></Card>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Ease of Doing Business</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">#{governanceData?.keyMetrics.easeOfBusiness}</div>
                    <p className="text-xs text-muted-foreground">global ranking (of 190)</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Corruption Perception</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{governanceData?.keyMetrics.corruptionIndex}/100</div>
                    <p className="text-xs text-muted-foreground">transparency score</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Public Spending</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{governanceData?.keyMetrics.publicSpending}%</div>
                    <p className="text-xs text-muted-foreground">of GDP</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">R&D Investment</CardTitle>
                    <Lightbulb className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{governanceData?.keyMetrics.rdSpending}%</div>
                    <p className="text-xs text-muted-foreground">of GDP</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Environment Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <LineChart
                      data={governanceData?.businessTrends || []}
                      lines={[{ dataKey: 'rank', name: 'Ease of Doing Business Rank', color: '#3b82f6' }]}
                      xAxisKey="year"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Corruption Perception Index</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <LineChart
                      data={governanceData?.corruptionTrends || []}
                      lines={[{ dataKey: 'score', name: 'CPI Score', color: '#10b981' }]}
                      xAxisKey="year"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Public Spending by Sector</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <BarChart
                      data={governanceData?.spendingBySector || []}
                      bars={[{ dataKey: 'percentage', name: '% of Budget', color: '#f59e0b' }]}
                      xAxisKey="sector"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Innovation Indicators</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <BarChart
                      data={governanceData?.innovationMetrics || []}
                      bars={[{ dataKey: 'value', name: 'Count', color: '#8b5cf6' }]}
                      xAxisKey="metric"
                    />
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Government;