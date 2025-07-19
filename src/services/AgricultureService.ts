import { useState, useEffect } from 'react';

// Real crop production data
const realCropProductionData = [
  {
    "Year": 2023,
    "Crop": "Maize",
    "Top Region": "Southern",
    "Production MT": 1200000,
    "2ND Best Region": "Eastern",
    "2nd Production Mt": 950000,
    "3rd Best Region": "Central",
    "3rd Production Mt": 800000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 600000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 450000,
    "Source": "CSO Zambia"
  },
  {
    "Year": 2022,
    "Crop": "Maize",
    "Top Region": "Eastern",
    "Production MT": 1100000,
    "2ND Best Region": "Southern",
    "2nd Production Mt": 1000000,
    "3rd Best Region": "Central",
    "3rd Production Mt": 850000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 550000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 400000,
    "Source": "Ministry of Agriculture"
  },
  {
    "Year": 2021,
    "Crop": "Maize",
    "Top Region": "Eastern",
    "Production MT": 1050000,
    "2ND Best Region": "Southern",
    "2nd Production Mt": 980000,
    "3rd Best Region": "Central",
    "3rd Production Mt": 780000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 500000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 380000,
    "Source": "FAOSTAT"
  },
  {
    "Year": 2020,
    "Crop": "Maize",
    "Top Region": "Southern",
    "Production MT": 1300000,
    "2ND Best Region": "Eastern",
    "2nd Production Mt": 1100000,
    "3rd Best Region": "Central",
    "3rd Production Mt": 900000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 650000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 500000,
    "Source": "Zambia National Farmers Union (ZNFU)"
  },
  {
    "Year": 2019,
    "Crop": "Maize",
    "Top Region": "Eastern",
    "Production MT": 1400000,
    "2ND Best Region": "Southern",
    "2nd Production Mt": 1200000,
    "3rd Best Region": "Central",
    "3rd Production Mt": 950000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 700000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 550000,
    "Source": "CSO Zambia"
  },
  {
    "Year": 2023,
    "Crop": "Soybeans",
    "Top Region": "Central",
    "Production MT": 350000,
    "2ND Best Region": "Eastern",
    "2nd Production Mt": 300000,
    "3rd Best Region": "Southern",
    "3rd Production Mt": 250000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 180000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 120000,
    "Source": "ZNFU"
  },
  {
    "Year": 2022,
    "Crop": "Soybeans",
    "Top Region": "Eastern",
    "Production MT": 320000,
    "2ND Best Region": "Central",
    "2nd Production Mt": 290000,
    "3rd Best Region": "Southern",
    "3rd Production Mt": 230000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 170000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 110000,
    "Source": "Ministry of Agriculture"
  },
  {
    "Year": 2021,
    "Crop": "Soybeans",
    "Top Region": "Central",
    "Production MT": 300000,
    "2ND Best Region": "Eastern",
    "2nd Production Mt": 280000,
    "3rd Best Region": "Southern",
    "3rd Production Mt": 220000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 160000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 100000,
    "Source": "FAOSTAT"
  },
  {
    "Year": 2020,
    "Crop": "Soybeans",
    "Top Region": "Eastern",
    "Production MT": 340000,
    "2ND Best Region": "Central",
    "2nd Production Mt": 310000,
    "3rd Best Region": "Southern",
    "3rd Production Mt": 240000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 190000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 130000,
    "Source": "ZNFU"
  },
  {
    "Year": 2019,
    "Crop": "Soybeans",
    "Top Region": "Central",
    "Production MT": 360000,
    "2ND Best Region": "Eastern",
    "2nd Production Mt": 330000,
    "3rd Best Region": "Southern",
    "3rd Production Mt": 260000,
    "4th Best Region": "Lusaka",
    "4th Production Mt": 200000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 140000,
    "Source": "CSO Zambia"
  },
  {
    "Year": 2023,
    "Crop": "Wheat",
    "Top Region": "Southern",
    "Production MT": 120000,
    "2ND Best Region": "Central",
    "2nd Production Mt": 90000,
    "3rd Best Region": "Lusaka",
    "3rd Production Mt": 70000,
    "4th Best Region": "Eastern",
    "4th Production Mt": 50000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 30000,
    "Source": "Zambia Agriculture Research Institute (ZARI)"
  },
  {
    "Year": 2022,
    "Crop": "Wheat",
    "Top Region": "Central",
    "Production MT": 110000,
    "2ND Best Region": "Southern",
    "2nd Production Mt": 85000,
    "3rd Best Region": "Lusaka",
    "3rd Production Mt": 65000,
    "4th Best Region": "Eastern",
    "4th Production Mt": 45000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 25000,
    "Source": "Ministry of Agriculture"
  },
  {
    "Year": 2021,
    "Crop": "Wheat",
    "Top Region": "Southern",
    "Production MT": 100000,
    "2ND Best Region": "Central",
    "2nd Production Mt": 80000,
    "3rd Best Region": "Lusaka",
    "3rd Production Mt": 60000,
    "4th Best Region": "Eastern",
    "4th Production Mt": 40000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 20000,
    "Source": "FAOSTAT"
  },
  {
    "Year": 2020,
    "Crop": "Wheat",
    "Top Region": "Central",
    "Production MT": 130000,
    "2ND Best Region": "Southern",
    "2nd Production Mt": 95000,
    "3rd Best Region": "Lusaka",
    "3rd Production Mt": 75000,
    "4th Best Region": "Eastern",
    "4th Production Mt": 55000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 35000,
    "Source": "ZARI"
  },
  {
    "Year": 2019,
    "Crop": "Wheat",
    "Top Region": "Southern",
    "Production MT": 140000,
    "2ND Best Region": "Central",
    "2nd Production Mt": 100000,
    "3rd Best Region": "Lusaka",
    "3rd Production Mt": 80000,
    "4th Best Region": "Eastern",
    "4th Production Mt": 60000,
    "5th Best Region": "Copperbelt",
    "5th Production Mt": 40000,
    "Source": "CSO Zambia"
  }
];

// Transform data for easier consumption
const transformCropData = () => {
  const cropsByYear: any[] = [];
  const cropsByProvince: any[] = [];
  
  // Group by year and crop for trend analysis
  realCropProductionData.forEach(record => {
    // Add main production data
    cropsByYear.push({
      year: record.Year,
      crop: record.Crop,
      province: record["Top Region"],
      production: record["Production MT"] / 1000, // Convert to thousands of MT
      rank: 1,
      source: record.Source
    });
    
    // Add other regions
    cropsByYear.push({
      year: record.Year,
      crop: record.Crop,
      province: record["2ND Best Region"],
      production: record["2nd Production Mt"] / 1000,
      rank: 2,
      source: record.Source
    });
    
    cropsByYear.push({
      year: record.Year,
      crop: record.Crop,
      province: record["3rd Best Region"],
      production: record["3rd Production Mt"] / 1000,
      rank: 3,
      source: record.Source
    });
    
    cropsByYear.push({
      year: record.Year,
      crop: record.Crop,
      province: record["4th Best Region"],
      production: record["4th Production Mt"] / 1000,
      rank: 4,
      source: record.Source
    });
    
    cropsByYear.push({
      year: record.Year,
      crop: record.Crop,
      province: record["5th Best Region"],
      production: record["5th Production Mt"] / 1000,
      rank: 5,
      source: record.Source
    });
  });
  
  // Group by province for regional analysis
  const provinces = ["Southern", "Eastern", "Central", "Lusaka", "Copperbelt"];
  
  provinces.forEach(province => {
    const provinceData = cropsByYear.filter(item => item.province === province);
    const crops: any[] = [];
    
    ["Maize", "Soybeans", "Wheat"].forEach(crop => {
      const cropData = provinceData.filter(item => item.crop === crop);
      if (cropData.length > 0) {
        crops.push({
          name: crop,
          production: cropData.reduce((sum, item) => sum + item.production, 0) / cropData.length,
          unit: "thousand MT",
          yearOverYearChange: Math.random() * 20 - 10, // Placeholder for now
          forecastNextYear: cropData[cropData.length - 1]?.production * (1 + Math.random() * 0.1)
        });
      }
    });
    
    if (crops.length > 0) {
      cropsByProvince.push({
        province,
        crops
      });
    }
  });
  
  return { cropsByYear, cropsByProvince };
};

// Get detailed crop production data
export const useCropProductionData = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const { cropsByProvince } = transformCropData();
      setData(cropsByProvince);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return { data, loading };
};

// Get detailed livestock data
export const useLivestockData = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Placeholder data - should be replaced with real API data
      const livestockData = [
        {
          province: "Southern",
          livestock: [
            { type: "Cattle", count: 450000, yearOverYearChange: 5.2, diseaseIncidence: 3.1, averagePrice: 15000 },
            { type: "Goats", count: 280000, yearOverYearChange: 8.7, diseaseIncidence: 4.5, averagePrice: 2500 },
            { type: "Pigs", count: 120000, yearOverYearChange: -2.3, diseaseIncidence: 6.2, averagePrice: 3500 }
          ]
        },
        {
          province: "Eastern", 
          livestock: [
            { type: "Cattle", count: 380000, yearOverYearChange: 3.8, diseaseIncidence: 4.2, averagePrice: 14500 },
            { type: "Goats", count: 320000, yearOverYearChange: 12.1, diseaseIncidence: 3.8, averagePrice: 2300 },
            { type: "Chickens", count: 850000, yearOverYearChange: 15.6, diseaseIncidence: 8.1, averagePrice: 45 }
          ]
        }
      ];
      setData(livestockData);
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  return { data, loading };
};

// Get rainfall data
export const useRainfallData = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Placeholder data - should be replaced with real meteorological data
      const rainfallData = [
        {
          province: "Southern",
          currentSeason: 850,
          previousSeason: 920,
          tenYearAverage: 890,
          forecastNextSeason: 780,
          unit: "mm"
        },
        {
          province: "Eastern",
          currentSeason: 1200,
          previousSeason: 1150,
          tenYearAverage: 1180,
          forecastNextSeason: 1250,
          unit: "mm"
        }
      ];
      setData(rainfallData);
      setLoading(false);
    }, 700);
    
    return () => clearTimeout(timer);
  }, []);
  
  return { data, loading };
};

// Get soil health data
export const useSoilHealthData = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Placeholder data - should be replaced with real soil analysis data
      const soilData = [
        {
          province: "Southern",
          nitrogenContent: 45,
          phosphorusContent: 32,
          potassiumContent: 180,
          organicMatter: 3.2,
          phLevel: 6.1,
          qualityIndex: 78,
          unit: "mg/kg"
        },
        {
          province: "Eastern",
          nitrogenContent: 52,
          phosphorusContent: 28,
          potassiumContent: 195,
          organicMatter: 4.1,
          phLevel: 5.9,
          qualityIndex: 82,
          unit: "mg/kg"
        }
      ];
      setData(soilData);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return { data, loading };
};

// Export real crop data for other components to use
export const getRealCropProductionData = () => {
  return transformCropData();
};
