
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import FinanceOverview from '@/components/finance/FinanceOverview';

const Finance = () => {
  return (
    <PageLayout 
      title="Financial Markets & Economy | Zambia Insight"
      description="Access real-time financial data, exchange rates, commodity prices, and economic indicators for Zambia."
      canonicalUrl="https://datazambia.com/finance"
    >
      <FinanceOverview />
    </PageLayout>
  );
};

export default Finance;
