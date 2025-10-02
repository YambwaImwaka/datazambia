export interface EaseOfDoingBusiness {
  year: number;
  overallRank: number;
  totalCountries: number;
  score: number;
  indicators: {
    startingBusiness: number;
    dealingWithConstruction: number;
    gettingElectricity: number;
    registeringProperty: number;
    gettingCredit: number;
    protectingInvestors: number;
    payingTaxes: number;
    tradingAcrossBorders: number;
    enforcingContracts: number;
    resolvingInsolvency: number;
  };
}

export interface CorruptionMetrics {
  year: number;
  cpiScore: number; // 0-100, where 100 is very clean
  cpiRank: number;
  totalCountries: number;
  perception: "Very Corrupt" | "Corrupt" | "Moderately Corrupt" | "Clean" | "Very Clean";
  sectorScores: {
    publicSector: number;
    police: number;
    judiciary: number;
    parliament: number;
    education: number;
    health: number;
  };
}

export interface PolicyStability {
  year: number;
  politicalStabilityIndex: number; // -2.5 to 2.5
  governmentEffectiveness: number; // -2.5 to 2.5
  regulatoryQuality: number; // -2.5 to 2.5
  ruleOfLaw: number; // -2.5 to 2.5
  controlOfCorruption: number; // -2.5 to 2.5
}

export interface PublicSpending {
  year: number;
  totalBudget: number; // USD billions
  gdpPercentage: number;
  breakdown: {
    education: number; // percentage
    health: number;
    infrastructure: number;
    defense: number;
    agriculture: number;
    socialProtection: number;
    debtServicing: number;
  };
}

export interface InnovationIndicators {
  year: number;
  rdSpending: number; // percentage of GDP
  rdExpenditure: number; // USD millions
  researchers: number; // per million people
  patents: {
    filed: number;
    granted: number;
    international: number;
  };
  innovationIndex: number; // 0-100
  techStartups: number;
  universityResearchCenters: number;
}

export interface GovernanceData {
  easeOfBusiness: EaseOfDoingBusiness[];
  corruption: CorruptionMetrics[];
  policyStability: PolicyStability[];
  publicSpending: PublicSpending[];
  innovation: InnovationIndicators[];
}

// Data based on 2024 research
const governanceData: GovernanceData = {
  easeOfBusiness: [
    {
      year: 2019, // Last available from World Bank before discontinuation
      overallRank: 85,
      totalCountries: 190,
      score: 66.9,
      indicators: {
        startingBusiness: 89,
        dealingWithConstruction: 98,
        gettingElectricity: 152,
        registeringProperty: 126,
        gettingCredit: 12, // Strong
        protectingInvestors: 72,
        payingTaxes: 128,
        tradingAcrossBorders: 167,
        enforcingContracts: 140,
        resolvingInsolvency: 77
      }
    },
    {
      year: 2018,
      overallRank: 87,
      totalCountries: 190,
      score: 66.0,
      indicators: {
        startingBusiness: 87,
        dealingWithConstruction: 95,
        gettingElectricity: 150,
        registeringProperty: 128,
        gettingCredit: 15,
        protectingInvestors: 70,
        payingTaxes: 130,
        tradingAcrossBorders: 165,
        enforcingContracts: 138,
        resolvingInsolvency: 75
      }
    }
  ],
  corruption: [
    {
      year: 2024,
      cpiScore: 34,
      cpiRank: 108,
      totalCountries: 180,
      perception: "Corrupt",
      sectorScores: {
        publicSector: 32,
        police: 28,
        judiciary: 35,
        parliament: 31,
        education: 38,
        health: 36
      }
    },
    {
      year: 2023,
      cpiScore: 33,
      cpiRank: 110,
      totalCountries: 180,
      perception: "Corrupt",
      sectorScores: {
        publicSector: 31,
        police: 27,
        judiciary: 34,
        parliament: 30,
        education: 37,
        health: 35
      }
    },
    {
      year: 2022,
      cpiScore: 33,
      cpiRank: 116,
      totalCountries: 180,
      perception: "Corrupt",
      sectorScores: {
        publicSector: 30,
        police: 26,
        judiciary: 33,
        parliament: 29,
        education: 36,
        health: 34
      }
    }
  ],
  policyStability: [
    {
      year: 2024,
      politicalStabilityIndex: 0.18,
      governmentEffectiveness: -0.35,
      regulatoryQuality: -0.28,
      ruleOfLaw: -0.42,
      controlOfCorruption: -0.58
    },
    {
      year: 2023,
      politicalStabilityIndex: 0.15,
      governmentEffectiveness: -0.38,
      regulatoryQuality: -0.32,
      ruleOfLaw: -0.45,
      controlOfCorruption: -0.62
    },
    {
      year: 2022,
      politicalStabilityIndex: 0.12,
      governmentEffectiveness: -0.41,
      regulatoryQuality: -0.35,
      ruleOfLaw: -0.48,
      controlOfCorruption: -0.65
    }
  ],
  publicSpending: [
    {
      year: 2024,
      totalBudget: 8.5,
      gdpPercentage: 27.2,
      breakdown: {
        education: 16.8,
        health: 12.5,
        infrastructure: 18.3,
        defense: 7.2,
        agriculture: 8.5,
        socialProtection: 11.4,
        debtServicing: 25.3
      }
    },
    {
      year: 2023,
      totalBudget: 7.9,
      gdpPercentage: 28.1,
      breakdown: {
        education: 16.2,
        health: 11.8,
        infrastructure: 17.5,
        defense: 7.5,
        agriculture: 8.2,
        socialProtection: 10.8,
        debtServicing: 28.0
      }
    }
  ],
  innovation: [
    {
      year: 2024,
      rdSpending: 0.28, // percentage of GDP (very low)
      rdExpenditure: 87, // USD millions
      researchers: 45, // per million people
      patents: {
        filed: 127,
        granted: 34,
        international: 8
      },
      innovationIndex: 28.5,
      techStartups: 156,
      universityResearchCenters: 12
    },
    {
      year: 2023,
      rdSpending: 0.24,
      rdExpenditure: 72,
      researchers: 42,
      patents: {
        filed: 108,
        granted: 28,
        international: 6
      },
      innovationIndex: 26.8,
      techStartups: 132,
      universityResearchCenters: 11
    },
    {
      year: 2022,
      rdSpending: 0.21,
      rdExpenditure: 61,
      researchers: 38,
      patents: {
        filed: 92,
        granted: 24,
        international: 5
      },
      innovationIndex: 25.2,
      techStartups: 105,
      universityResearchCenters: 10
    }
  ]
};

export const fetchGovernanceData = async (): Promise<GovernanceData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(governanceData), 500);
  });
};

export const getEaseOfDoingBusiness = (): EaseOfDoingBusiness[] => {
  return governanceData.easeOfBusiness;
};

export const getCorruptionMetrics = (): CorruptionMetrics[] => {
  return governanceData.corruption;
};

export const getPolicyStability = (): PolicyStability[] => {
  return governanceData.policyStability;
};

export const getPublicSpending = (): PublicSpending[] => {
  return governanceData.publicSpending;
};

export const getInnovationIndicators = (): InnovationIndicators[] => {
  return governanceData.innovation;
};

export const getLatestCorruptionScore = (): number => {
  return governanceData.corruption[0].cpiScore;
};

export const getCorruptionTrend = (): "Improving" | "Declining" | "Stable" => {
  const scores = governanceData.corruption.map(c => c.cpiScore);
  const latest = scores[0];
  const previous = scores[1];
  
  if (latest > previous) return "Improving";
  if (latest < previous) return "Declining";
  return "Stable";
};
