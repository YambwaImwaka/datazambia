import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import CovidDashboard from '@/components/health/CovidDashboard';

const COVID = () => {
  return (
    <PageLayout 
      title="COVID-19 Dashboard - Zambia Health Data | Zambia Insight"
      description="Comprehensive COVID-19 statistics for Zambia including deaths, cases, vaccination rates, and timeline of key events from 2020-2024."
      canonicalUrl="https://datazambia.com/health/covid"
    >
      <div className="container mx-auto px-4 py-8">
        <CovidDashboard />
      </div>
    </PageLayout>
  );
};

export default COVID;