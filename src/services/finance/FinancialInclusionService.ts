export async function fetchFinancialInclusionData() {
  // Simulated data - replace with real API calls
  return {
    keyMetrics: {
      bankAccountAccess: 45.2,
      mobileMoneyUsers: 68.5,
      smeCredit: 22.5,
      fintechAdoption: 34.5
    },
    bankAccountTrend: [
      { year: '2019', bank: 35, mobile: 48 },
      { year: '2020', bank: 38, mobile: 54 },
      { year: '2021', bank: 40, mobile: 59 },
      { year: '2022', bank: 43, mobile: 64 },
      { year: '2023', bank: 45, mobile: 69 }
    ],
    creditBySector: [
      { sector: 'Agriculture', value: 2.8 },
      { sector: 'Manufacturing', value: 1.5 },
      { sector: 'Retail', value: 3.2 },
      { sector: 'Services', value: 2.1 },
      { sector: 'Construction', value: 1.8 }
    ],
    digitalPayments: [
      { year: '2019', transactions: 125 },
      { year: '2020', transactions: 148 },
      { year: '2021', transactions: 165 },
      { year: '2022', transactions: 178 },
      { year: '2023', transactions: 185 }
    ]
  };
}
