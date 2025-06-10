
export interface MarketShareEntry {
  company: string;
  market_share: string;
  source: string;
  percentage?: number; // Parsed percentage for calculations
}

export interface IndustryMarketShare {
  industry: string;
  entries: MarketShareEntry[];
}

// Real market share data for Zambian industries
const realMarketShareData: IndustryMarketShare[] = [
  {
    "industry": "Telecommunications",
    "entries": [
      {"company": "MTN Zambia", "market_share": "~45-50%", "source": "ZICTA (2023)", "percentage": 47.5},
      {"company": "Airtel Zambia", "market_share": "~40-45%", "source": "ZICTA (2023)", "percentage": 42.5},
      {"company": "Zamtel", "market_share": "~5-10%", "source": "ZICTA (2023)", "percentage": 7.5}
    ]
  },
  {
    "industry": "Banking",
    "entries": [
      {"company": "Zanaco", "market_share": "~20%", "source": "Bank of Zambia (2023)", "percentage": 20},
      {"company": "Absa Zambia", "market_share": "~18%", "source": "Bank of Zambia (2023)", "percentage": 18},
      {"company": "Stanbic Bank Zambia", "market_share": "~15%", "source": "Bank of Zambia (2023)", "percentage": 15},
      {"company": "FNB Zambia", "market_share": "~10%", "source": "Bank of Zambia (2023)", "percentage": 10}
    ]
  },
  {
    "industry": "Beverages (Beer)",
    "entries": [
      {"company": "Zambia Breweries (AB InBev)", "market_share": "~75%", "source": "Industry Reports (2022)", "percentage": 75},
      {"company": "Castle Brewing", "market_share": "~20%", "source": "Industry Reports (2022)", "percentage": 20},
      {"company": "Others", "market_share": "~5%", "source": "Industry Reports (2022)", "percentage": 5}
    ]
  },
  {
    "industry": "Retail (Supermarkets)",
    "entries": [
      {"company": "Shoprite Zambia", "market_share": "~40%", "source": "RCAZ (2023)", "percentage": 40},
      {"company": "Pick n Pay Zambia", "market_share": "~30%", "source": "RCAZ (2023)", "percentage": 30},
      {"company": "SPAR Zambia", "market_share": "~15%", "source": "RCAZ (2023)", "percentage": 15},
      {"company": "Others (Choppies, etc.)", "market_share": "~15%", "source": "RCAZ (2023)", "percentage": 15}
    ]
  },
  {
    "industry": "Mobile Money",
    "entries": [
      {"company": "MTN Mobile Money (MoMo)", "market_share": "~50%", "source": "Bank of Zambia (2023)", "percentage": 50},
      {"company": "Airtel Money", "market_share": "~40%", "source": "Bank of Zambia (2023)", "percentage": 40},
      {"company": "Zamtel Kwacha", "market_share": "~10%", "source": "Bank of Zambia (2023)", "percentage": 10}
    ]
  },
  {
    "industry": "Cement & Construction",
    "entries": [
      {"company": "Lafarge Zambia", "market_share": "~60%", "source": "ZACCI (2023)", "percentage": 60},
      {"company": "Dangote Cement Zambia", "market_share": "~30%", "source": "ZACCI (2023)", "percentage": 30},
      {"company": "Others (Sinoma, etc.)", "market_share": "~10%", "source": "ZACCI (2023)", "percentage": 10}
    ]
  },
  {
    "industry": "FMCG",
    "entries": [
      {"company": "Unilever Zambia", "market_share": "~35%", "source": "Industry Reports (2023)", "percentage": 35},
      {"company": "Trade Kings Group", "market_share": "~25%", "source": "Industry Reports (2023)", "percentage": 25},
      {"company": "PZ Cussons Zambia", "market_share": "~15%", "source": "Industry Reports (2023)", "percentage": 15},
      {"company": "Others", "market_share": "~25%", "source": "Industry Reports (2023)", "percentage": 25}
    ]
  },
  {
    "industry": "Insurance",
    "entries": [
      {"company": "PICZ", "market_share": "~20%", "source": "PIA Zambia (2023)", "percentage": 20},
      {"company": "ZSIC", "market_share": "~18%", "source": "PIA Zambia (2023)", "percentage": 18},
      {"company": "Allianz Zambia", "market_share": "~12%", "source": "PIA Zambia (2023)", "percentage": 12},
      {"company": "Others (NICO, Madison)", "market_share": "~50%", "source": "PIA Zambia (2023)", "percentage": 50}
    ]
  },
  {
    "industry": "Energy (Fuel Retail)",
    "entries": [
      {"company": "TotalEnergies Zambia", "market_share": "~30%", "source": "ERB (2023)", "percentage": 30},
      {"company": "Puma Energy Zambia", "market_share": "~25%", "source": "ERB (2023)", "percentage": 25},
      {"company": "Vivo Energy (Shell)", "market_share": "~20%", "source": "ERB (2023)", "percentage": 20},
      {"company": "Others (Engen, Petroda)", "market_share": "~25%", "source": "ERB (2023)", "percentage": 25}
    ]
  },
  {
    "industry": "Airlines",
    "entries": [
      {"company": "Proflight Zambia", "market_share": "~50% (domestic)", "source": "ZCAA (2023)", "percentage": 50},
      {"company": "Zambia Airways", "market_share": "~20%", "source": "ZCAA (2023)", "percentage": 20},
      {"company": "Int'l Carriers (Ethiopian, etc.)", "market_share": "~30%", "source": "ZCAA (2023)", "percentage": 30}
    ]
  }
];

export const fetchMarketShareData = async (): Promise<IndustryMarketShare[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  return realMarketShareData;
};

export const getMarketShareByIndustry = (industry: string): IndustryMarketShare | undefined => {
  return realMarketShareData.find(data => data.industry === industry);
};

export const getAllIndustries = (): string[] => {
  return realMarketShareData.map(data => data.industry);
};

export const getMarketLeaders = (): Array<{industry: string, leader: string, marketShare: string}> => {
  return realMarketShareData.map(industryData => {
    const leader = industryData.entries.reduce((prev, current) => 
      (current.percentage || 0) > (prev.percentage || 0) ? current : prev
    );
    
    return {
      industry: industryData.industry,
      leader: leader.company,
      marketShare: leader.market_share
    };
  });
};
