export async function fetchGovernanceData() {
  // Simulated data - replace with real API calls
  return {
    keyMetrics: {
      easeOfBusiness: 85,
      corruptionIndex: 34,
      publicSpending: 27.2,
      rdSpending: 0.28
    },
    businessTrends: [
      { year: '2015', rank: 111 },
      { year: '2016', rank: 98 },
      { year: '2017', rank: 90 },
      { year: '2018', rank: 87 },
      { year: '2019', rank: 85 }
    ],
    corruptionTrends: [
      { year: '2020', score: 33 },
      { year: '2021', score: 33 },
      { year: '2022', score: 33 },
      { year: '2023', score: 33 },
      { year: '2024', score: 34 }
    ],
    spendingBySector: [
      { sector: 'Education', percentage: 16.8 },
      { sector: 'Health', percentage: 12.5 },
      { sector: 'Infrastructure', percentage: 18.3 },
      { sector: 'Defense', percentage: 7.2 },
      { sector: 'Agriculture', percentage: 8.5 },
      { sector: 'Debt Servicing', percentage: 25.3 }
    ],
    innovationMetrics: [
      { metric: 'Patents Filed', value: 127 },
      { metric: 'Tech Startups', value: 156 },
      { metric: 'Research Centers', value: 12 },
      { metric: 'Researchers (per M)', value: 45 }
    ]
  };
}
