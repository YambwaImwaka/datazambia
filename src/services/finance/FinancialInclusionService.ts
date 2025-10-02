export interface FinancialAccessMetrics {
  year: number;
  adultsWithBankAccount: number; // percentage
  adultsWithMobileMoneyAccount: number; // percentage
  totalFinancialAccess: number; // percentage (bank OR mobile money)
  registeredMobileMoneyAccounts: number; // millions
  activeMobileMoneyAccounts: number; // millions
}

export interface SMEFinanceData {
  totalSMEs: number;
  smesWithCredit: number; // percentage
  avgLoanSize: number; // USD
  creditGap: number; // USD millions
  womenOwnedSMEsWithCredit: number; // percentage
  menOwnedSMEsWithCredit: number; // percentage
}

export interface FintechMetrics {
  digitalPaymentUsers: number; // millions
  digitalPaymentVolume: number; // USD billions
  mobileMoneyTransactions: number; // millions per month
  agentNetworkSize: number;
  fintechStartups: number;
}

export interface DigitalEconomyIndicators {
  internetPenetration: number; // percentage
  mobileSubscription: number; // percentage
  smartphoneUsers: number; // millions
  eCommerceGrowth: number; // percentage YoY
  digitalLiteracyRate: number; // percentage
}

export interface FinancialInclusionData {
  accessMetrics: FinancialAccessMetrics[];
  smeFinance: SMEFinanceData;
  fintech: FintechMetrics;
  digitalEconomy: DigitalEconomyIndicators;
}

// Data based on 2024 research and World Bank reports
const financialInclusionData: FinancialInclusionData = {
  accessMetrics: [
    {
      year: 2024,
      adultsWithBankAccount: 45.2,
      adultsWithMobileMoneyAccount: 68.5,
      totalFinancialAccess: 74.8,
      registeredMobileMoneyAccounts: 12.5,
      activeMobileMoneyAccounts: 8.3
    },
    {
      year: 2023,
      adultsWithBankAccount: 42.8,
      adultsWithMobileMoneyAccount: 64.2,
      totalFinancialAccess: 71.5,
      registeredMobileMoneyAccounts: 11.2,
      activeMobileMoneyAccounts: 7.6
    },
    {
      year: 2022,
      adultsWithBankAccount: 40.1,
      adultsWithMobileMoneyAccount: 59.8,
      totalFinancialAccess: 67.3,
      registeredMobileMoneyAccounts: 9.8,
      activeMobileMoneyAccounts: 6.8
    },
    {
      year: 2021,
      adultsWithBankAccount: 37.5,
      adultsWithMobileMoneyAccount: 54.2,
      totalFinancialAccess: 62.8,
      registeredMobileMoneyAccounts: 8.5,
      activeMobileMoneyAccounts: 5.9
    },
    {
      year: 2020,
      adultsWithBankAccount: 35.2,
      adultsWithMobileMoneyAccount: 48.5,
      totalFinancialAccess: 58.3,
      registeredMobileMoneyAccounts: 7.2,
      activeMobileMoneyAccounts: 4.8
    }
  ],
  smeFinance: {
    totalSMEs: 285000,
    smesWithCredit: 22.5, // only 22.5% have access to credit
    avgLoanSize: 8500, // USD
    creditGap: 4200, // USD millions - unmet financing needs
    womenOwnedSMEsWithCredit: 15.8, // lower than men
    menOwnedSMEsWithCredit: 28.3
  },
  fintech: {
    digitalPaymentUsers: 9.8, // millions
    digitalPaymentVolume: 15.6, // USD billions annually
    mobileMoneyTransactions: 185, // millions per month
    agentNetworkSize: 42500,
    fintechStartups: 38
  },
  digitalEconomy: {
    internetPenetration: 52.6, // percentage of population
    mobileSubscription: 98.2, // percentage (many have multiple SIMs)
    smartphoneUsers: 7.2, // millions
    eCommerceGrowth: 34.5, // percentage YoY growth
    digitalLiteracyRate: 41.3 // percentage
  }
};

export const fetchFinancialInclusionData = async (): Promise<FinancialInclusionData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(financialInclusionData), 500);
  });
};

export const getAccessMetrics = (): FinancialAccessMetrics[] => {
  return financialInclusionData.accessMetrics;
};

export const getSMEFinanceData = (): SMEFinanceData => {
  return financialInclusionData.smeFinance;
};

export const getFintechMetrics = (): FintechMetrics => {
  return financialInclusionData.fintech;
};

export const getDigitalEconomyIndicators = (): DigitalEconomyIndicators => {
  return financialInclusionData.digitalEconomy;
};

export const getFinancialInclusionGrowth = (): number => {
  const latest = financialInclusionData.accessMetrics[0].totalFinancialAccess;
  const baseline = financialInclusionData.accessMetrics[4].totalFinancialAccess;
  return latest - baseline;
};

export const getMobileMoneyGrowthRate = (): number => {
  const data = financialInclusionData.accessMetrics;
  const latest = data[0].adultsWithMobileMoneyAccount;
  const previous = data[1].adultsWithMobileMoneyAccount;
  return ((latest - previous) / previous) * 100;
};
