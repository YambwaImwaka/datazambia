
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import FinanceOverview from '@/components/finance/FinanceOverview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchFinancialInclusionData } from '@/services/finance/FinancialInclusionService';
import { useQuery } from '@tanstack/react-query';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { Wallet, CreditCard, Smartphone, TrendingUp } from 'lucide-react';

const Finance = () => {
  const [activeTab, setActiveTab] = useState('markets');
  
  const { data: financialInclusionData, isLoading } = useQuery({
    queryKey: ['financialInclusion'],
    queryFn: fetchFinancialInclusionData,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <PageLayout 
      title="Financial Markets & Economy | Zambia Insight"
      description="Access real-time financial data, exchange rates, commodity prices, economic indicators, and financial inclusion metrics for Zambia."
      canonicalUrl="https://datazambia.com/finance"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="markets">Markets & Trading</TabsTrigger>
          <TabsTrigger value="inclusion">Financial Inclusion</TabsTrigger>
        </TabsList>

        <TabsContent value="markets">
          <FinanceOverview />
        </TabsContent>

        <TabsContent value="inclusion" className="space-y-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Financial Inclusion & Digital Economy</h2>
            <p className="text-muted-foreground">
              Track banking access, mobile money adoption, credit availability, and fintech growth in Zambia
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
                    <CardTitle className="text-sm font-medium">Bank Account Access</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{financialInclusionData?.keyMetrics.bankAccountAccess}%</div>
                    <p className="text-xs text-muted-foreground">of adults have bank accounts</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Mobile Money Users</CardTitle>
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{financialInclusionData?.keyMetrics.mobileMoneyUsers}%</div>
                    <p className="text-xs text-muted-foreground">use mobile money services</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">SME Credit Access</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{financialInclusionData?.keyMetrics.smeCredit}%</div>
                    <p className="text-xs text-muted-foreground">of SMEs have credit access</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Fintech Adoption</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{financialInclusionData?.keyMetrics.fintechAdoption}%</div>
                    <p className="text-xs text-muted-foreground">annual growth rate</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Access Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <LineChart
                      data={financialInclusionData?.bankAccountTrend || []}
                      lines={[
                        { dataKey: 'bank', name: 'Bank Accounts', color: '#3b82f6' },
                        { dataKey: 'mobile', name: 'Mobile Money', color: '#10b981' }
                      ]}
                      xAxisKey="year"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Credit Distribution by Sector</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <BarChart
                      data={financialInclusionData?.creditBySector || []}
                      bars={[{ dataKey: 'value', name: 'Credit (Billion ZMW)', color: '#f59e0b' }]}
                      xAxisKey="sector"
                    />
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Digital Payment Adoption</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px]">
                    <LineChart
                      data={financialInclusionData?.digitalPayments || []}
                      lines={[{ dataKey: 'transactions', name: 'Transactions (Millions)', color: '#8b5cf6' }]}
                      xAxisKey="year"
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

export default Finance;
