export async function fetchEnvironmentClimateData() {
  // Simulated data - replace with real API calls
  return {
    keyMetrics: {
      avgRainfall: 1020,
      forestCover: 66,
      waterAccess: 67,
      climateRisk: 'Medium-High'
    },
    rainfallTrends: [
      { year: '2019', rainfall: 1050 },
      { year: '2020', rainfall: 980 },
      { year: '2021', rainfall: 1100 },
      { year: '2022', rainfall: 950 },
      { year: '2023', rainfall: 1020 }
    ],
    forestCoverTrends: [
      { year: '2019', coverage: 68.2 },
      { year: '2020', coverage: 67.8 },
      { year: '2021', coverage: 67.2 },
      { year: '2022', coverage: 66.6 },
      { year: '2023', coverage: 66.0 }
    ],
    waterAccessByRegion: [
      { region: 'Lusaka', access: 89 },
      { region: 'Copperbelt', access: 85 },
      { region: 'Southern', access: 72 },
      { region: 'Eastern', access: 58 },
      { region: 'Northern', access: 54 },
      { region: 'Western', access: 48 }
    ],
    extremeEvents: [
      { year: '2019', droughts: 2, floods: 3 },
      { year: '2020', droughts: 3, floods: 2 },
      { year: '2021', droughts: 1, floods: 4 },
      { year: '2022', droughts: 4, floods: 2 },
      { year: '2023', droughts: 2, floods: 3 }
    ]
  };
}
