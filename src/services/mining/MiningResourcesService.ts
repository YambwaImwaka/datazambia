export interface MiningProduction {
  year: number;
  quarter?: string;
  copper: number; // metric tons
  cobalt: number; // metric tons
  emeralds?: number; // carats
  gold?: number; // ounces
}

export interface MiningEconomicImpact {
  gdpContribution: number; // percentage
  exportRevenue: number; // USD millions
  employmentTotal: number;
  employmentDirect: number;
  employmentIndirect: number;
  taxRevenue: number; // USD millions
}

export interface MiningEnvironmentalImpact {
  waterUsage: number; // million cubic meters
  landDisturbed: number; // hectares
  rehabilitatedLand: number; // hectares
  carbonEmissions: number; // metric tons CO2
  wasteGenerated: number; // metric tons
}

export interface MiningCompany {
  name: string;
  ownership: string;
  mainCommodity: string;
  production: number;
  employees: number;
  location: string;
}

export interface ComprehensiveMiningData {
  production: MiningProduction[];
  economicImpact: MiningEconomicImpact;
  environmentalImpact: MiningEnvironmentalImpact;
  majorCompanies: MiningCompany[];
  reserves: {
    copper: number; // million metric tons
    cobalt: number; // thousand metric tons
    emeralds: string;
  };
}

// Data based on 2024-2025 research
const miningData: ComprehensiveMiningData = {
  production: [
    {
      year: 2024,
      copper: 763000, // metric tons (12% increase from 2023)
      cobalt: 21500,
      emeralds: 45000000, // carats
      gold: 12000
    },
    {
      year: 2025,
      quarter: "Q1",
      copper: 224000, // 30% increase YoY
      cobalt: 6200,
      emeralds: 11000000,
      gold: 3200
    },
    {
      year: 2023,
      copper: 681000,
      cobalt: 19800,
      emeralds: 42000000,
      gold: 11500
    },
    {
      year: 2022,
      copper: 698000,
      cobalt: 18200,
      emeralds: 38000000,
      gold: 10800
    },
    {
      year: 2021,
      copper: 830000,
      cobalt: 22000,
      emeralds: 35000000,
      gold: 9500
    }
  ],
  economicImpact: {
    gdpContribution: 12.5, // Mining contributes ~12.5% to GDP
    exportRevenue: 8700, // USD millions (2024 estimate)
    employmentTotal: 95000,
    employmentDirect: 65000,
    employmentIndirect: 30000,
    taxRevenue: 1250 // USD millions
  },
  environmentalImpact: {
    waterUsage: 145, // million cubic meters annually
    landDisturbed: 28500, // hectares
    rehabilitatedLand: 4200, // hectares
    carbonEmissions: 2800000, // metric tons CO2 annually
    wasteGenerated: 185000000 // metric tons annually
  },
  majorCompanies: [
    {
      name: "Konkola Copper Mines (KCM)",
      ownership: "Vedanta Resources (79.4%)",
      mainCommodity: "Copper",
      production: 180000,
      employees: 12500,
      location: "Chingola, Copperbelt"
    },
    {
      name: "First Quantum Minerals - Kansanshi",
      ownership: "First Quantum Minerals",
      mainCommodity: "Copper, Gold",
      production: 240000,
      employees: 8500,
      location: "Solwezi, North-Western"
    },
    {
      name: "Barrick Gold - Lumwana",
      ownership: "Barrick Gold (80%)",
      mainCommodity: "Copper",
      production: 125000,
      employees: 4200,
      location: "Solwezi, North-Western"
    },
    {
      name: "Mopani Copper Mines",
      ownership: "ZCCM-IH (90%)",
      mainCommodity: "Copper, Cobalt",
      production: 95000,
      employees: 9800,
      location: "Mufulira, Copperbelt"
    },
    {
      name: "Gemfields - Kagem",
      ownership: "Gemfields (75%)",
      mainCommodity: "Emeralds",
      production: 45000000, // carats
      employees: 1800,
      location: "Kafubu, Copperbelt"
    }
  ],
  reserves: {
    copper: 19, // million metric tons
    cobalt: 270, // thousand metric tons
    emeralds: "World's largest deposits"
  }
};

export const fetchMiningData = async (): Promise<ComprehensiveMiningData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(miningData), 500);
  });
};

export const getMiningProduction = (): MiningProduction[] => {
  return miningData.production;
};

export const getMiningEconomicImpact = (): MiningEconomicImpact => {
  return miningData.economicImpact;
};

export const getMiningEnvironmentalImpact = (): MiningEnvironmentalImpact => {
  return miningData.environmentalImpact;
};

export const getMajorMiningCompanies = (): MiningCompany[] => {
  return miningData.majorCompanies;
};

export const getCopperProductionGrowth = (): number => {
  const latest = miningData.production[0].copper;
  const previous = miningData.production[2].copper;
  return ((latest - previous) / previous) * 100;
};
