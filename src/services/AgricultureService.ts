
import { useState, useEffect } from 'react';

// Types for agricultural data
export interface CropProductionData {
  province: string;
  crops: {
    name: string;
    production: number;
    unit: string;
    yearOverYearChange: number;
    forecastNextYear: number;
  }[];
}

export interface LivestockData {
  province: string;
  livestock: {
    type: string;
    count: number;
    yearOverYearChange: number;
    diseaseIncidence: number;
    averagePrice: number;
  }[];
}

export interface RainfallData {
  province: string;
  currentSeason: number;
  previousSeason: number;
  tenYearAverage: number;
  forecastNextSeason: number;
  unit: string;
}

export interface SoilHealthData {
  province: string;
  nitrogenContent: number;
  phosphorusContent: number;
  potassiumContent: number;
  organicMatter: number;
  phLevel: number;
  qualityIndex: number;
}

// Get detailed crop production data
export const useCropProductionData = () => {
  const [data, setData] = useState<CropProductionData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCropData = async () => {
      setLoading(true);
      try {
        // In a real application, this would fetch data from Ministry of Agriculture API
        // Using enhanced simulated data for now
        const provinces = [
          "Lusaka", "Copperbelt", "Central", "Eastern", "Northern", 
          "Muchinga", "Southern", "Western", "Luapula", "North-Western"
        ];
        
        const cropTypes = ["Maize", "Cassava", "Sorghum", "Rice", "Wheat", "Soybeans", "Cotton", "Tobacco"];
        
        const enhancedData: CropProductionData[] = provinces.map(province => {
          // Base production values that match Zambia's typical provincial outputs
          let baseProduction: { [key: string]: number } = {
            "Maize": 0,
            "Cassava": 0,
            "Sorghum": 0,
            "Rice": 0,
            "Wheat": 0,
            "Soybeans": 0,
            "Cotton": 0,
            "Tobacco": 0
          };
          
          // Set realistic base values for each province based on their known strengths
          switch (province) {
            case "Eastern":
              baseProduction = {
                "Maize": 460, "Cassava": 190, "Sorghum": 75, "Rice": 55,
                "Wheat": 15, "Soybeans": 45, "Cotton": 35, "Tobacco": 25
              };
              break;
            case "Central":
              baseProduction = {
                "Maize": 490, "Cassava": 140, "Sorghum": 65, "Rice": 40,
                "Wheat": 85, "Soybeans": 65, "Cotton": 25, "Tobacco": 15
              };
              break;
            case "Southern":
              baseProduction = {
                "Maize": 430, "Cassava": 155, "Sorghum": 80, "Rice": 40,
                "Wheat": 50, "Soybeans": 30, "Cotton": 45, "Tobacco": 20
              };
              break;
            case "Northern":
              baseProduction = {
                "Maize": 385, "Cassava": 350, "Sorghum": 60, "Rice": 45,
                "Wheat": 10, "Soybeans": 20, "Cotton": 15, "Tobacco": 10
              };
              break;
            case "Luapula":
              baseProduction = {
                "Maize": 345, "Cassava": 400, "Sorghum": 50, "Rice": 60,
                "Wheat": 5, "Soybeans": 15, "Cotton": 10, "Tobacco": 5
              };
              break;
            case "Lusaka":
              baseProduction = {
                "Maize": 395, "Cassava": 125, "Sorghum": 50, "Rice": 30,
                "Wheat": 40, "Soybeans": 55, "Cotton": 10, "Tobacco": 5
              };
              break;
            case "Copperbelt":
              baseProduction = {
                "Maize": 350, "Cassava": 160, "Sorghum": 45, "Rice": 30,
                "Wheat": 25, "Soybeans": 35, "Cotton": 15, "Tobacco": 10
              };
              break;
            case "Western":
              baseProduction = {
                "Maize": 275, "Cassava": 250, "Sorghum": 65, "Rice": 90,
                "Wheat": 5, "Soybeans": 15, "Cotton": 30, "Tobacco": 5
              };
              break;
            case "Muchinga":
              baseProduction = {
                "Maize": 350, "Cassava": 285, "Sorghum": 60, "Rice": 40,
                "Wheat": 15, "Soybeans": 25, "Cotton": 20, "Tobacco": 15
              };
              break;
            case "North-Western":
              baseProduction = {
                "Maize": 325, "Cassava": 275, "Sorghum": 50, "Rice": 40,
                "Wheat": 10, "Soybeans": 20, "Cotton": 15, "Tobacco": 5
              };
              break;
          }
          
          return {
            province,
            crops: cropTypes.map(crop => {
              // Add randomness to simulate current year's data
              const randomFactor = Math.random() * 0.2 - 0.1; // -10% to +10%
              const production = baseProduction[crop] * (1 + randomFactor);
              
              // Calculate year-over-year change (-5% to +15% with provincial variation)
              let yoyBaseline = 0.05; // 5% growth baseline
              
              // Adjust baseline based on province-specific factors
              if (["Eastern", "Central", "Southern"].includes(province)) {
                yoyBaseline += 0.03; // Better infrastructure and support
              } else if (["Western", "Luapula", "Muchinga"].includes(province)) {
                yoyBaseline -= 0.02; // More limited infrastructure
              }
              
              // Adjust baseline based on crop-specific factors
              if (["Maize", "Soybeans", "Wheat"].includes(crop)) {
                yoyBaseline += 0.02; // Government focusing on these crops
              } else if (["Tobacco", "Cotton"].includes(crop)) {
                yoyBaseline -= 0.01; // Less emphasis on these crops
              }
              
              const yoyVariation = Math.random() * 0.1 - 0.05; // -5% to +5% random variation
              const yearOverYearChange = yoyBaseline + yoyVariation;
              
              // Forecast for next year (based on current + growth trends + random factor)
              const forecastFactor = yearOverYearChange + (Math.random() * 0.04 - 0.02); // YoY + (-2% to +2%)
              const forecastNextYear = production * (1 + forecastFactor);
              
              return {
                name: crop,
                production: Number(production.toFixed(1)),
                unit: "thousand tonnes",
                yearOverYearChange: Number((yearOverYearChange * 100).toFixed(1)),
                forecastNextYear: Number(forecastNextYear.toFixed(1))
              };
            })
          };
        });
        
        setData(enhancedData);
      } catch (err) {
        console.error('Failed to fetch crop production data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCropData();
  }, []);

  return { data, loading, error };
};

// Get detailed livestock data
export const useLivestockData = () => {
  const [data, setData] = useState<LivestockData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLivestockData = async () => {
      setLoading(true);
      try {
        // In a real application, this would fetch data from Ministry of Agriculture API
        // Using enhanced simulated data for now
        const provinces = [
          "Lusaka", "Copperbelt", "Central", "Eastern", "Northern", 
          "Muchinga", "Southern", "Western", "Luapula", "North-Western"
        ];
        
        const livestockTypes = ["Cattle", "Goats", "Sheep", "Pigs", "Chickens", "Ducks"];
        
        const enhancedData: LivestockData[] = provinces.map(province => {
          // Base livestock counts that match Zambia's typical provincial trends
          let baseCounts: { [key: string]: number } = {
            "Cattle": 0,
            "Goats": 0,
            "Sheep": 0,
            "Pigs": 0,
            "Chickens": 0,
            "Ducks": 0
          };
          
          // Set realistic base values for each province based on their known strengths
          switch (province) {
            case "Southern":
              baseCounts = {
                "Cattle": 460, "Goats": 340, "Sheep": 120, "Pigs": 130,
                "Chickens": 1450, "Ducks": 85
              };
              break;
            case "Western":
              baseCounts = {
                "Cattle": 390, "Goats": 310, "Sheep": 95, "Pigs": 90,
                "Chickens": 880, "Ducks": 120
              };
              break;
            case "Central":
              baseCounts = {
                "Cattle": 385, "Goats": 295, "Sheep": 110, "Pigs": 130,
                "Chickens": 1130, "Ducks": 75
              };
              break;
            case "Eastern":
              baseCounts = {
                "Cattle": 340, "Goats": 350, "Sheep": 115, "Pigs": 165,
                "Chickens": 1280, "Ducks": 90
              };
              break;
            case "Lusaka":
              baseCounts = {
                "Cattle": 185, "Goats": 230, "Sheep": 85, "Pigs": 160,
                "Chickens": 1650, "Ducks": 65
              };
              break;
            case "Copperbelt":
              baseCounts = {
                "Cattle": 165, "Goats": 215, "Sheep": 75, "Pigs": 185,
                "Chickens": 1460, "Ducks": 55
              };
              break;
            case "Northern":
              baseCounts = {
                "Cattle": 240, "Goats": 275, "Sheep": 90, "Pigs": 180,
                "Chickens": 1090, "Ducks": 70
              };
              break;
            case "Muchinga":
              baseCounts = {
                "Cattle": 215, "Goats": 245, "Sheep": 85, "Pigs": 140,
                "Chickens": 980, "Ducks": 65
              };
              break;
            case "Luapula":
              baseCounts = {
                "Cattle": 170, "Goats": 250, "Sheep": 70, "Pigs": 195,
                "Chickens": 985, "Ducks": 115
              };
              break;
            case "North-Western":
              baseCounts = {
                "Cattle": 195, "Goats": 215, "Sheep": 75, "Pigs": 160,
                "Chickens": 1040, "Ducks": 60
              };
              break;
          }
          
          return {
            province,
            livestock: livestockTypes.map(type => {
              // Add randomness to simulate current year's data
              const randomFactor = Math.random() * 0.15 - 0.05; // -5% to +10%
              const count = baseCounts[type] * (1 + randomFactor);
              
              // Calculate year-over-year change with provincial variation
              let yoyBaseline = 0.03; // 3% growth baseline
              
              // Adjust baseline based on province-specific factors for livestock
              if (["Southern", "Western", "Central"].includes(province) && type === "Cattle") {
                yoyBaseline += 0.04; // Better cattle rearing conditions and support
              } else if (["Lusaka", "Copperbelt"].includes(province) && ["Pigs", "Chickens"].includes(type)) {
                yoyBaseline += 0.05; // Urban demand increases commercial farming
              }
              
              const yoyVariation = Math.random() * 0.08 - 0.04; // -4% to +4% random variation
              const yearOverYearChange = yoyBaseline + yoyVariation;
              
              // Disease incidence varies by animal type and province
              let baseDisease = 0.05; // Base 5% disease incidence
              if (type === "Cattle" && ["Southern", "Western"].includes(province)) {
                baseDisease += 0.02; // Higher cattle disease in these regions
              } else if (type === "Pigs") {
                baseDisease += 0.03; // Pigs generally more susceptible
              } else if (type === "Chickens" && ["Lusaka", "Copperbelt"].includes(province)) {
                baseDisease -= 0.02; // Better commercial management reduces disease
              }
              
              const diseaseVariation = Math.random() * 0.04 - 0.02;
              const diseaseIncidence = Math.max(0.01, baseDisease + diseaseVariation);
              
              // Average price varies by animal type and province
              let basePrice = 0;
              switch (type) {
                case "Cattle": basePrice = 3500; break;
                case "Goats": basePrice = 550; break;
                case "Sheep": basePrice = 650; break;
                case "Pigs": basePrice = 750; break;
                case "Chickens": basePrice = 45; break;
                case "Ducks": basePrice = 55; break;
              }
              
              // Price adjustments based on province (urban vs rural)
              if (["Lusaka", "Copperbelt"].includes(province)) {
                basePrice *= 1.15; // Higher prices in urban areas
              } else if (["Western", "Luapula", "Muchinga"].includes(province)) {
                basePrice *= 0.9; // Lower prices in more remote areas
              }
              
              const priceVariation = Math.random() * 0.1 - 0.05;
              const averagePrice = basePrice * (1 + priceVariation);
              
              return {
                type,
                count: Math.round(count),
                yearOverYearChange: Number((yearOverYearChange * 100).toFixed(1)),
                diseaseIncidence: Number((diseaseIncidence * 100).toFixed(1)),
                averagePrice: Math.round(averagePrice)
              };
            })
          };
        });
        
        setData(enhancedData);
      } catch (err) {
        console.error('Failed to fetch livestock data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLivestockData();
  }, []);

  return { data, loading, error };
};

// Get rainfall data
export const useRainfallData = () => {
  const [data, setData] = useState<RainfallData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRainfallData = async () => {
      setLoading(true);
      try {
        // In a real application, this would fetch from Meteorological Department API
        // Using enhanced simulated data for now
        const provinces = [
          "Lusaka", "Copperbelt", "Central", "Eastern", "Northern", 
          "Muchinga", "Southern", "Western", "Luapula", "North-Western"
        ];
        
        // Define baseline rainfall patterns based on Zambia's climate zones
        const rainfallBaselines: { [key: string]: number } = {
          "Southern": 750, // Drier zone
          "Western": 800,
          "Lusaka": 850,
          "Central": 950,
          "Eastern": 1000,
          "Copperbelt": 1200,
          "North-Western": 1250,
          "Northern": 1300, // Wetter zone
          "Muchinga": 1150,
          "Luapula": 1200
        };
        
        const rainfallData: RainfallData[] = provinces.map(province => {
          const baseline = rainfallBaselines[province];
          
          // Current season varies from baseline by -15% to +15%
          const currentSeasonVariation = Math.random() * 0.3 - 0.15;
          const currentSeason = baseline * (1 + currentSeasonVariation);
          
          // Previous season
          const previousSeasonVariation = Math.random() * 0.2 - 0.1;
          const previousSeason = baseline * (1 + previousSeasonVariation);
          
          // 10-year average is close to baseline with small variation
          const tenYearVariation = Math.random() * 0.1 - 0.05;
          const tenYearAverage = baseline * (1 + tenYearVariation);
          
          // Forecast for next season (with climate change factors)
          let forecastAdjustment = -0.05; // General trend of decreasing rainfall due to climate change
          
          // Southern parts are getting drier, northern parts might see more rain
          if (["Southern", "Western", "Lusaka"].includes(province)) {
            forecastAdjustment -= 0.03;
          } else if (["Northern", "North-Western", "Luapula"].includes(province)) {
            forecastAdjustment += 0.02;
          }
          
          const forecastRandomness = Math.random() * 0.08 - 0.04;
          const forecastNextSeason = currentSeason * (1 + forecastAdjustment + forecastRandomness);
          
          return {
            province,
            currentSeason: Math.round(currentSeason),
            previousSeason: Math.round(previousSeason),
            tenYearAverage: Math.round(tenYearAverage),
            forecastNextSeason: Math.round(forecastNextSeason),
            unit: "mm"
          };
        });
        
        setData(rainfallData);
      } catch (err) {
        console.error('Failed to fetch rainfall data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRainfallData();
  }, []);

  return { data, loading, error };
};

// Get soil health data
export const useSoilHealthData = () => {
  const [data, setData] = useState<SoilHealthData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSoilHealthData = async () => {
      setLoading(true);
      try {
        // In a real application, this would fetch from Ministry of Agriculture API
        // Using enhanced simulated data for now
        const provinces = [
          "Lusaka", "Copperbelt", "Central", "Eastern", "Northern", 
          "Muchinga", "Southern", "Western", "Luapula", "North-Western"
        ];
        
        // Define soil health baselines based on Zambia's soil zones
        const soilHealthBaselines: { [key: string]: {
          n: number, p: number, k: number, om: number, ph: number
        } } = {
          "Southern": { n: 35, p: 20, k: 45, om: 1.8, ph: 5.8 }, // Drier, more alkaline soils
          "Western": { n: 38, p: 22, k: 40, om: 2.0, ph: 5.5 },
          "Lusaka": { n: 40, p: 25, k: 50, om: 2.1, ph: 6.0 },
          "Central": { n: 45, p: 30, k: 55, om: 2.4, ph: 5.7 },
          "Eastern": { n: 48, p: 28, k: 52, om: 2.5, ph: 5.6 },
          "Copperbelt": { n: 42, p: 26, k: 48, om: 2.3, ph: 5.3 }, // More acidic due to mining
          "North-Western": { n: 50, p: 32, k: 58, om: 2.7, ph: 5.4 },
          "Northern": { n: 53, p: 35, k: 60, om: 3.0, ph: 5.2 }, // Higher rainfall, more leaching
          "Muchinga": { n: 49, p: 30, k: 55, om: 2.8, ph: 5.3 },
          "Luapula": { n: 52, p: 33, k: 58, om: 2.9, ph: 5.1 }
        };
        
        const soilHealthData: SoilHealthData[] = provinces.map(province => {
          const baseline = soilHealthBaselines[province];
          
          // Add variations to baseline data
          const nVariation = Math.random() * 10 - 5;
          const pVariation = Math.random() * 8 - 4;
          const kVariation = Math.random() * 12 - 6;
          const omVariation = Math.random() * 0.6 - 0.3;
          const phVariation = Math.random() * 0.4 - 0.2;
          
          const nitrogenContent = Math.max(5, baseline.n + nVariation);
          const phosphorusContent = Math.max(5, baseline.p + pVariation);
          const potassiumContent = Math.max(10, baseline.k + kVariation);
          const organicMatter = Math.max(0.5, baseline.om + omVariation);
          const phLevel = Math.max(4.0, Math.min(7.5, baseline.ph + phVariation));
          
          // Calculate soil quality index (0-100)
          // This is a simplified model based on optimal ranges for these parameters
          const nitrogenScore = Math.min(100, (nitrogenContent / 60) * 100);
          const phosphorusScore = Math.min(100, (phosphorusContent / 40) * 100);
          const potassiumScore = Math.min(100, (potassiumContent / 70) * 100);
          
          // Organic matter: optimal is 3-5%
          const organicMatterScore = organicMatter < 3 
            ? (organicMatter / 3) * 100 
            : Math.max(0, 100 - ((organicMatter - 5) / 2) * 100);
          
          // pH: optimal is 5.5-6.5
          const phScore = phLevel < 5.5 
            ? 100 - ((5.5 - phLevel) / 1.5) * 100 
            : phLevel > 6.5 
              ? 100 - ((phLevel - 6.5) / 1) * 100 
              : 100;
          
          const qualityIndex = (nitrogenScore + phosphorusScore + potassiumScore + organicMatterScore + phScore) / 5;
          
          return {
            province,
            nitrogenContent: Number(nitrogenContent.toFixed(1)),
            phosphorusContent: Number(phosphorusContent.toFixed(1)),
            potassiumContent: Number(potassiumContent.toFixed(1)),
            organicMatter: Number(organicMatter.toFixed(1)),
            phLevel: Number(phLevel.toFixed(1)),
            qualityIndex: Number(qualityIndex.toFixed(1))
          };
        });
        
        setData(soilHealthData);
      } catch (err) {
        console.error('Failed to fetch soil health data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSoilHealthData();
  }, []);

  return { data, loading, error };
};
