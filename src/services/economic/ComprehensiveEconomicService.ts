
export interface MacroeconomicIndicator {
  indicator: string;
  value: string;
  source: string;
  link?: string;
}

export interface SectoralContribution {
  sector: string;
  contribution: number;
  source: string;
}

export interface TradeIndicator {
  indicator: string;
  value: string;
  source: string;
}

export interface MiningProduction {
  region: string;
  majorMines: string;
  production2019: number;
  production2020: number;
  production2021: number;
  production2022: number;
  production2023: number;
  keyPlayers: string;
}

export interface MineralProduction {
  mineral: string;
  production2019: number;
  production2020: number;
  production2021: number;
  production2022: number;
  production2023: number;
  majorProducers: string;
}

export interface MiningTaxContribution {
  year: string;
  company: string;
  companyIncomeTax: number;
  mineralRoyaltyTax: number;
  totalPaid: number;
}

export interface GoldProduction {
  region: string;
  companyMine: string;
  production2019: number;
  production2020: number;
  production2021: number;
  production2022: number;
  production2023: number;
  capacity: number;
  ownership: string;
  sources: string;
}

export interface ComprehensiveEconomicData {
  macroeconomicOverview: MacroeconomicIndicator[];
  sectoralContributions: SectoralContribution[];
  tradeExports: TradeIndicator[];
  fiscalGovernment: TradeIndicator[];
  miningNaturalResources: TradeIndicator[];
  agriculture: TradeIndicator[];
  energyInfrastructure: TradeIndicator[];
  financialSector: TradeIndicator[];
  demographics: TradeIndicator[];
  foreignInvestmentTourism: TradeIndicator[];
  regionalMiningBreakdown: MiningProduction[];
  mineralSpecificBreakdown: MineralProduction[];
  miningTaxContributions: MiningTaxContribution[];
  goldProduction: GoldProduction[];
}

// Real comprehensive economic data for Zambia
const comprehensiveEconomicData: ComprehensiveEconomicData = {
  macroeconomicOverview: [
    {
      indicator: "Nominal GDP (2023)",
      value: "$29.2 billion",
      source: "World Bank",
      link: "https://data.worldbank.org/country/zambia"
    },
    {
      indicator: "GDP Growth Rate (2023)",
      value: "4.7%",
      source: "IMF",
      link: "https://www.imf.org/en/Countries/ZMB"
    },
    {
      indicator: "GDP Per Capita (2023)",
      value: "$1,480",
      source: "World Bank",
      link: "https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=ZM"
    },
    {
      indicator: "Inflation Rate (May 2024)",
      value: "13.8%",
      source: "ZamStats"
    },
    {
      indicator: "Unemployment Rate (2023)",
      value: "12.4%",
      source: "ILO",
      link: "https://www.ilo.org/ilostat/"
    },
    {
      indicator: "National Debt-to-GDP (2023)",
      value: "71.3%",
      source: "Bank of Zambia"
    },
    {
      indicator: "Exchange Rate (APRIL 2025)",
      value: "1 USD = 28.5 ZMW",
      source: "BoZ",
      link: "https://www.boz.zm/financial-markets/exchange-rates.htm"
    },
    {
      indicator: "Foreign Reserves (2024)",
      value: "$3.1 billion",
      source: "BoZ",
      link: "https://www.boz.zm/financial-markets/exchange-rates.htm"
    },
    {
      indicator: "Current Account Balance",
      value: "-$1.2 billion (2023)",
      source: "IMF",
      link: "https://www.imf.org/en/Publications/WEO"
    }
  ],
  
  sectoralContributions: [
    { sector: "Agriculture", contribution: 3.1, source: "ZamStats" },
    { sector: "Mining & Quarrying", contribution: 12.4, source: "ZamStats" },
    { sector: "Manufacturing", contribution: 8.2, source: "ZamStats" },
    { sector: "Services", contribution: 54.7, source: "ZamStats" },
    { sector: "Construction", contribution: 6.9, source: "ZamStats" }
  ],

  tradeExports: [
    { indicator: "Total Exports (2023)", value: "$10.5 billion", source: "ITC Trade Map" },
    { indicator: "Top Export (Copper)", value: "70% of exports", source: "Bank of Zambia" },
    { indicator: "Copper Production (2023)", value: "763,000 metric tons", source: "USGS" },
    { indicator: "Cobalt Production (2023)", value: "8,500 metric tons", source: "USGS" },
    { indicator: "Total Imports (2023)", value: "$8.9 billion", source: "ZRA" },
    { indicator: "Trade Balance (2023)", value: "+$1.6 billion", source: "ZRA" }
  ],

  fiscalGovernment: [
    { indicator: "Budget Deficit (2023)", value: "6.8% of GDP", source: "Ministry of Finance" },
    { indicator: "Tax Revenue (2023)", value: "16.2% of GDP", source: "ZRA" },
    { indicator: "External Debt (2024)", value: "$14.3 billion", source: "World Bank" },
    { indicator: "Domestic Debt (2024)", value: "$5.8 billion", source: "Bank of Zambia" }
  ],

  miningNaturalResources: [
    { indicator: "Copper Reserves 2023", value: "20 million tons", source: "Zambia Chamber of Mines" },
    { indicator: "Gold Production (2023)", value: "3.2 metric tons", source: "Bank of Zambia" },
    { indicator: "Mining FDI (2023)", value: "$1.2 billion", source: "ZDA" }
  ],

  agriculture: [
    { indicator: "Maize Production (2023)", value: "3.1 million tons", source: "FAO" },
    { indicator: "Tobacco Exports (2023)", value: "$320 million", source: "ITC" }
  ],

  energyInfrastructure: [
    { indicator: "Electricity Production", value: "14.5 TWh (2023)", source: "ZESCO" },
    { indicator: "Road Network Length", value: "67,000 km", source: "RDA" }
  ],

  financialSector: [
    { indicator: "Banking Sector Assets", value: "$9.8 billion (2023)", source: "BoZ" },
    { indicator: "Policy Interest Rate", value: "12.5% (2024)", source: "BoZ" }
  ],

  demographics: [
    { indicator: "Population (2024)", value: "20.9 million", source: "UN" },
    { indicator: "Poverty Rate (2023)", value: "54.4%", source: "World Bank" },
    { indicator: "Human Development Index", value: "0.584 (Medium)", source: "UNDP" }
  ],

  foreignInvestmentTourism: [
    { indicator: "FDI Inflows (2023)", value: "$1.5 billion", source: "UNCTAD" },
    { indicator: "Tourist Arrivals (2023)", value: "1.2 million", source: "Zambia Tourism Agency" }
  ],

  regionalMiningBreakdown: [
    {
      region: "Copperbelt",
      majorMines: "Kansanshi, Mopani, KCM",
      production2019: 520,
      production2020: 400,
      production2021: 550,
      production2022: 680,
      production2023: 540,
      keyPlayers: "FQM, ZCCM-IH, Vedanta"
    },
    {
      region: "North-Western",
      majorMines: "Lumwana, Sentinel, Kalumbila",
      production2019: 280,
      production2020: 220,
      production2021: 320,
      production2022: 400,
      production2023: 380,
      keyPlayers: "Barrick Gold, FQM"
    },
    {
      region: "Central",
      majorMines: "Lubambe, NFC Africa",
      production2019: 60,
      production2020: 50,
      production2021: 80,
      production2022: 100,
      production2023: 90,
      keyPlayers: "EMR Capital, CNMC"
    },
    {
      region: "Southern",
      majorMines: "Sable Zinc, Maamba Coal",
      production2019: 20,
      production2020: 15,
      production2021: 25,
      production2022: 30,
      production2023: 25,
      keyPlayers: "Jubilee Metals, Nava Bharat"
    }
  ],

  mineralSpecificBreakdown: [
    {
      mineral: "Copper",
      production2019: 750,
      production2020: 600,
      production2021: 850,
      production2022: 1050,
      production2023: 900,
      majorProducers: "FQM, KCM, Mopani, Barrick"
    },
    {
      mineral: "Cobalt",
      production2019: 30,
      production2020: 20,
      production2021: 40,
      production2022: 60,
      production2023: 50,
      majorProducers: "Chambishi Metals, Mopani"
    },
    {
      mineral: "Gold",
      production2019: 15,
      production2020: 10,
      production2021: 25,
      production2022: 30,
      production2023: 20,
      majorProducers: "Kansanshi, Lumwana (by-product)"
    },
    {
      mineral: "Zinc/Lead",
      production2019: 10,
      production2020: 8,
      production2021: 12,
      production2022: 15,
      production2023: 12,
      majorProducers: "Kabwe, Sable Zinc"
    },
    {
      mineral: "Coal",
      production2019: 5,
      production2020: 4,
      production2021: 6,
      production2022: 8,
      production2023: 7,
      majorProducers: "Maamba Collieries"
    }
  ],

  miningTaxContributions: [
    { year: "2019", company: "First Quantum Minerals (FQM)", companyIncomeTax: 120, mineralRoyaltyTax: 210, totalPaid: 330 },
    { year: "2019", company: "Konkola Copper Mines (KCM)", companyIncomeTax: 30, mineralRoyaltyTax: 50, totalPaid: 80 },
    { year: "2019", company: "Mopani Copper Mines", companyIncomeTax: 40, mineralRoyaltyTax: 70, totalPaid: 110 },
    { year: "2019", company: "Other (Lumwana, CNMC, etc.)", companyIncomeTax: 30, mineralRoyaltyTax: 50, totalPaid: 80 },
    { year: "2020", company: "FQM", companyIncomeTax: 90, mineralRoyaltyTax: 160, totalPaid: 250 },
    { year: "2020", company: "KCM", companyIncomeTax: 10, mineralRoyaltyTax: 20, totalPaid: 30 },
    { year: "2020", company: "Mopani (ZCCM-IH)", companyIncomeTax: 25, mineralRoyaltyTax: 50, totalPaid: 75 },
    { year: "2020", company: "Other", companyIncomeTax: 55, mineralRoyaltyTax: 90, totalPaid: 145 },
    { year: "2021", company: "FQM", companyIncomeTax: 150, mineralRoyaltyTax: 270, totalPaid: 420 },
    { year: "2021", company: "KCM", companyIncomeTax: 5, mineralRoyaltyTax: 10, totalPaid: 15 },
    { year: "2021", company: "Mopani (ZCCM-IH)", companyIncomeTax: 40, mineralRoyaltyTax: 80, totalPaid: 120 },
    { year: "2021", company: "Other", companyIncomeTax: 55, mineralRoyaltyTax: 90, totalPaid: 145 },
    { year: "2022", company: "FQM", companyIncomeTax: 180, mineralRoyaltyTax: 330, totalPaid: 510 },
    { year: "2022", company: "KCM", companyIncomeTax: 10, mineralRoyaltyTax: 15, totalPaid: 25 },
    { year: "2022", company: "Mopani", companyIncomeTax: 50, mineralRoyaltyTax: 100, totalPaid: 150 },
    { year: "2022", company: "Other", companyIncomeTax: 60, mineralRoyaltyTax: 105, totalPaid: 165 },
    { year: "2023", company: "FQM", companyIncomeTax: 160, mineralRoyaltyTax: 290, totalPaid: 450 },
    { year: "2023", company: "KCM", companyIncomeTax: 5, mineralRoyaltyTax: 10, totalPaid: 15 },
    { year: "2023", company: "Mopani", companyIncomeTax: 30, mineralRoyaltyTax: 60, totalPaid: 90 },
    { year: "2023", company: "Other", companyIncomeTax: 75, mineralRoyaltyTax: 140, totalPaid: 215 }
  ],

  goldProduction: [
    {
      region: "North-Western",
      companyMine: "Lumwana Mine (Barrick)",
      production2019: 3.2,
      production2020: 3,
      production2021: 3.5,
      production2022: 4.1,
      production2023: 4.3,
      capacity: 5,
      ownership: "Barrick Gold (100%)",
      sources: "Barrick Q4 2023 Report, p.12"
    },
    {
      region: "North-Western",
      companyMine: "Kalumbila Minerals (FQM)",
      production2019: 0.8,
      production2020: 0.7,
      production2021: 0.9,
      production2022: 1.2,
      production2023: 1.5,
      capacity: 2,
      ownership: "First Quantum (100%)",
      sources: "FQM 2023 Annual Report, p.45"
    },
    {
      region: "Copperbelt",
      companyMine: "Kansanshi Mine (FQM)",
      production2019: 2.5,
      production2020: 2.3,
      production2021: 2.8,
      production2022: 3,
      production2023: 2.7,
      capacity: 3.5,
      ownership: "FQM (80%), ZCCM-IH (20%)",
      sources: "FQM Site Report 2023"
    },
    {
      region: "Copperbelt",
      companyMine: "Mopani Copper Mines",
      production2019: 0.5,
      production2020: 0.4,
      production2021: 0.3,
      production2022: 0.2,
      production2023: 0.1,
      capacity: 0.5,
      ownership: "ZCCM-IH (100%)",
      sources: "ZCCM-IH 2022 Financials, p.8"
    },
    {
      region: "Eastern",
      companyMine: "Dunrobin Gold Project",
      production2019: 0.1,
      production2020: 0.1,
      production2021: 0.2,
      production2022: 0.3,
      production2023: 0.4,
      capacity: 0.5,
      ownership: "Zamango Resources",
      sources: "Mining Journal (2023)"
    },
    {
      region: "Central",
      companyMine: "Kasenseli Gold Mine",
      production2019: 0,
      production2020: 0.2,
      production2021: 1,
      production2022: 1.5,
      production2023: 1.8,
      capacity: 2,
      ownership: "ZCCM-IH (100%)",
      sources: "ZCCM-IH Press Release (Jan 2024)"
    }
  ]
};

export const fetchComprehensiveEconomicData = async (): Promise<ComprehensiveEconomicData> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return comprehensiveEconomicData;
};

export const getMacroeconomicIndicators = (): MacroeconomicIndicator[] => {
  return comprehensiveEconomicData.macroeconomicOverview;
};

export const getSectoralGDPBreakdown = (): SectoralContribution[] => {
  return comprehensiveEconomicData.sectoralContributions;
};

export const getMiningProductionByRegion = (): MiningProduction[] => {
  return comprehensiveEconomicData.regionalMiningBreakdown;
};

export const getMineralProductionTrends = (): MineralProduction[] => {
  return comprehensiveEconomicData.mineralSpecificBreakdown;
};

export const getMiningTaxData = (): MiningTaxContribution[] => {
  return comprehensiveEconomicData.miningTaxContributions;
};

export const getGoldProductionData = (): GoldProduction[] => {
  return comprehensiveEconomicData.goldProduction;
};
