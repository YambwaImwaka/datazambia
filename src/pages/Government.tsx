import React from 'react';
import { GovernmentStructure } from '@/components/government/GovernmentStructure';
import PageLayout from '@/components/layout/PageLayout';

const Government = () => {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <GovernmentStructure />
      </div>
    </PageLayout>
  );
};

export default Government;