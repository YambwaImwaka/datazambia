
export interface CropProductionData {
  year: number;
  crop: string;
  topRegion: string;
  productionMT: number;
  secondBestRegion: string;
  secondProductionMt: number;
  thirdBestRegion: string;
  thirdProductionMt: number;
  fourthBestRegion: string;
  fourthProductionMt: number;
  fifthBestRegion: string;
  fifthProductionMt: number;
  source: string;
}

const rawCropData = [
  {
    "Year": 2023,
    "Crop": "Maize",
    "Top Region": "Southern",
    "Production MT": 1200000,
    "2ND Best Region": "Eastern",
    "Production Mt": 950000,
    "3rd Best Region": "Central",
    "Production Mt": 800000,
    "4th Best Region": "Lusaka",
    "Production Mt": 600000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 450000,
    "Source": "CSO Zambia"
  },
  {
    "Year": 2022,
    "Crop": "Maize",
    "Top Region": "Eastern",
    "Production MT": 1100000,
    "2ND Best Region": "Southern",
    "Production Mt": 1000000,
    "3rd Best Region": "Central",
    "Production Mt": 850000,
    "4th Best Region": "Lusaka",
    "Production Mt": 550000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 400000,
    "Source": "Ministry of Agriculture"
  },
  {
    "Year": 2021,
    "Crop": "Maize",
    "Top Region": "Eastern",
    "Production MT": 1050000,
    "2ND Best Region": "Southern",
    "Production Mt": 980000,
    "3rd Best Region": "Central",
    "Production Mt": 780000,
    "4th Best Region": "Lusaka",
    "Production Mt": 500000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 380000,
    "Source": "FAOSTAT"
  },
  {
    "Year": 2020,
    "Crop": "Maize",
    "Top Region": "Southern",
    "Production MT": 1300000,
    "2ND Best Region": "Eastern",
    "Production Mt": 1100000,
    "3rd Best Region": "Central",
    "Production Mt": 900000,
    "4th Best Region": "Lusaka",
    "Production Mt": 650000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 500000,
    "Source": "Zambia National Farmers Union (ZNFU)"
  },
  {
    "Year": 2019,
    "Crop": "Maize",
    "Top Region": "Eastern",
    "Production MT": 1400000,
    "2ND Best Region": "Southern",
    "Production Mt": 1200000,
    "3rd Best Region": "Central",
    "Production Mt": 950000,
    "4th Best Region": "Lusaka",
    "Production Mt": 700000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 550000,
    "Source": "CSO Zambia"
  },
  {
    "Year": 2023,
    "Crop": "Soybeans",
    "Top Region": "Central",
    "Production MT": 350000,
    "2ND Best Region": "Eastern",
    "Production Mt": 300000,
    "3rd Best Region": "Southern",
    "Production Mt": 250000,
    "4th Best Region": "Lusaka",
    "Production Mt": 180000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 120000,
    "Source": "ZNFU"
  },
  {
    "Year": 2022,
    "Crop": "Soybeans",
    "Top Region": "Eastern",
    "Production MT": 320000,
    "2ND Best Region": "Central",
    "Production Mt": 290000,
    "3rd Best Region": "Southern",
    "Production Mt": 230000,
    "4th Best Region": "Lusaka",
    "Production Mt": 170000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 110000,
    "Source": "Ministry of Agriculture"
  },
  {
    "Year": 2021,
    "Crop": "Soybeans",
    "Top Region": "Central",
    "Production MT": 300000,
    "2ND Best Region": "Eastern",
    "Production Mt": 280000,
    "3rd Best Region": "Southern",
    "Production Mt": 220000,
    "4th Best Region": "Lusaka",
    "Production Mt": 160000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 100000,
    "Source": "FAOSTAT"
  },
  {
    "Year": 2020,
    "Crop": "Soybeans",
    "Top Region": "Eastern",
    "Production MT": 340000,
    "2ND Best Region": "Central",
    "Production Mt": 310000,
    "3rd Best Region": "Southern",
    "Production Mt": 240000,
    "4th Best Region": "Lusaka",
    "Production Mt": 190000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 130000,
    "Source": "ZNFU"
  },
  {
    "Year": 2019,
    "Crop": "Soybeans",
    "Top Region": "Central",
    "Production MT": 360000,
    "2ND Best Region": "Eastern",
    "Production Mt": 330000,
    "3rd Best Region": "Southern",
    "Production Mt": 260000,
    "4th Best Region": "Lusaka",
    "Production Mt": 200000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 140000,
    "Source": "CSO Zambia"
  },
  {
    "Year": 2023,
    "Crop": "Wheat",
    "Top Region": "Southern",
    "Production MT": 120000,
    "2ND Best Region": "Central",
    "Production Mt": 90000,
    "3rd Best Region": "Lusaka",
    "Production Mt": 70000,
    "4th Best Region": "Eastern",
    "Production Mt": 50000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 30000,
    "Source": "Zambia Agriculture Research Institute (ZARI)"
  },
  {
    "Year": 2022,
    "Crop": "Wheat",
    "Top Region": "Central",
    "Production MT": 110000,
    "2ND Best Region": "Southern",
    "Production Mt": 85000,
    "3rd Best Region": "Lusaka",
    "Production Mt": 65000,
    "4th Best Region": "Eastern",
    "Production Mt": 45000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 25000,
    "Source": "Ministry of Agriculture"
  },
  {
    "Year": 2021,
    "Crop": "Wheat",
    "Top Region": "Southern",
    "Production MT": 100000,
    "2ND Best Region": "Central",
    "Production Mt": 80000,
    "3rd Best Region": "Lusaka",
    "Production Mt": 60000,
    "4th Best Region": "Eastern",
    "Production Mt": 40000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 20000,
    "Source": "FAOSTAT"
  },
  {
    "Year": 2020,
    "Crop": "Wheat",
    "Top Region": "Central",
    "Production MT": 130000,
    "2ND Best Region": "Southern",
    "Production Mt": 95000,
    "3rd Best Region": "Lusaka",
    "Production Mt": 75000,
    "4th Best Region": "Eastern",
    "Production Mt": 55000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 35000,
    "Source": "ZARI"
  },
  {
    "Year": 2019,
    "Crop": "Wheat",
    "Top Region": "Southern",
    "Production MT": 140000,
    "2ND Best Region": "Central",
    "Production Mt": 100000,
    "3rd Best Region": "Lusaka",
    "Production Mt": 80000,
    "4th Best Region": "Eastern",
    "Production Mt": 60000,
    "5th Best Region": "Copperbelt",
    "Production Mt": 40000,
    "Source": "CSO Zambia"
  }
];

export const getCropProductionData = (): CropProductionData[] => {
  return rawCropData.map(item => ({
    year: item.Year,
    crop: item.Crop,
    topRegion: item["Top Region"],
    productionMT: item["Production MT"],
    secondBestRegion: item["2ND Best Region"],
    secondProductionMt: item["Production Mt"],
    thirdBestRegion: item["3rd Best Region"],
    thirdProductionMt: item["Production Mt"],
    fourthBestRegion: item["4th Best Region"],
    fourthProductionMt: item["Production Mt"],
    fifthBestRegion: item["5th Best Region"],
    fifthProductionMt: item["Production Mt"],
    source: item.Source
  }));
};

export const getCropsByYear = (year: number) => {
  return getCropProductionData().filter(item => item.year === year);
};

export const getCropTrendData = (crop: string) => {
  return getCropProductionData().filter(item => item.crop === crop);
};

export const getRegionProductionData = () => {
  const data = getCropProductionData();
  const regionTotals: { [key: string]: number } = {};
  
  data.forEach(item => {
    regionTotals[item.topRegion] = (regionTotals[item.topRegion] || 0) + item.productionMT;
    regionTotals[item.secondBestRegion] = (regionTotals[item.secondBestRegion] || 0) + item.secondProductionMt;
    regionTotals[item.thirdBestRegion] = (regionTotals[item.thirdBestRegion] || 0) + item.thirdProductionMt;
    regionTotals[item.fourthBestRegion] = (regionTotals[item.fourthBestRegion] || 0) + item.fourthProductionMt;
    regionTotals[item.fifthBestRegion] = (regionTotals[item.fifthBestRegion] || 0) + item.fifthProductionMt;
  });
  
  return Object.entries(regionTotals).map(([region, total]) => ({
    region,
    total
  }));
};
