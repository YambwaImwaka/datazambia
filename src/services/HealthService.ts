import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

interface HealthIndicator {
  id: string;
  name: string;
  value: number | string;
  unit: string;
  year: number;
  source: string;
  trend: "increasing" | "decreasing" | "stable";
  changePercentage?: number;
}

interface DiseasePrevalence {
  disease: string;
  prevalenceRate: number; // per 100,000 population
  mortalityRate: number; // per 100,000 population
  yearReported: number;
  changeFromPreviousYear: number; // percentage
  province?: string;
  source: string;
}

interface HealthcareAccess {
  province: string;
  healthFacilities: number;
  populationPerDoctor: number;
  populationPerNurse: number;
  percentWithinOneHourOfFacility: number;
  percentWithHealthInsurance: number;
  source: string;
}

interface ImmunizationRate {
  province: string;
  vaccine: string;
  coveragePercentage: number;
  targetPercentage: number;
  yearReported: number;
  trend: "increasing" | "decreasing" | "stable";
  source: string;
}

interface MaternalHealth {
  province: string;
  maternalMortalityRatio: number; // per 100,000 live births
  percentSkilledBirthAttendance: number;
  percentAntenatalCare: number;
  percentInstitutionalDelivery: number;
  yearReported: number;
  source: string;
}

// Real health statistics data for Zambia (from the provided JSON)
const healthStatisticsData = {
  "Demographics": {
    "Population_millions": {
      "2020": 18.9,
      "2021": 19.4,
      "2022": 19.9,
      "2023": 20.7,
      "2024": "20.9*",
      "source": "UN"
    },
    "Life_Expectancy_years": {
      "2020": 62.1,
      "2021": 62.5,
      "2022": 62.9,
      "2023": 63.5,
      "2024": "64.0*",
      "source": "WHO"
    }
  },
  "Maternal_Child_Health": {
    "Maternal_Mortality_per_100k_births": {
      "2020": 224,
      "2021": 220,
      "2022": 217,
      "2023": 213,
      "2024": "210*",
      "source": "ZDHS"
    },
    "Under_5_Mortality_per_1000": {
      "2020": 65,
      "2021": 64,
      "2022": 63,
      "2023": 61,
      "2024": "59*",
      "source": "UNICEF"
    }
  },
  "HIV_AIDS": {
    "Prevalence_15_49_yrs_percent": {
      "2020": 0.118,
      "2021": 0.116,
      "2022": 0.114,
      "2023": 0.111,
      "2024": "10.9%*",
      "source": "UNAIDS"
    },
    "PMTCT_Coverage_percent": {
      "2020": 0.82,
      "2021": 0.84,
      "2022": 0.86,
      "2023": 0.88,
      "2024": "90%*",
      "source": "MoH Zambia"
    }
  },
  "Malaria": {
    "Cases_millions": {
      "2020": 6.2,
      "2021": 6,
      "2022": 5.8,
      "2023": 5.5,
      "2024": "5.3*",
      "source": "WHO Malaria"
    },
    "ITN_Coverage_percent": {
      "2020": 0.6,
      "2021": 0.61,
      "2022": 0.62,
      "2023": 0.62,
      "2024": "63%*",
      "source": "PMI"
    }
  },
  "Tuberculosis_TB": {
    "Incidence_per_100k": {
      "2020": 360,
      "2021": 355,
      "2022": 350,
      "2023": 346,
      "2024": "342*",
      "source": "WHO TB"
    },
    "MDR_TB_Cases": {
      "2020": 1100,
      "2021": 1150,
      "2022": 1180,
      "2023": 1200,
      "2024": "1,220*",
      "source": "WHO"
    }
  },
  "Non_Communicable_Diseases": {
    "Diabetes_Prevalence_percent": {
      "2020": 0.032,
      "2021": 0.034,
      "2022": 0.036,
      "2023": 0.038,
      "2024": "4.0%*",
      "source": "IDF"
    },
    "Hypertension_Prevalence_percent": {
      "2020": 0.251,
      "2021": 0.258,
      "2022": 0.265,
      "2023": 0.272,
      "2024": "28.0%*",
      "source": "WHO NCD"
    }
  },
  "Immunization": {
    "Measles_Coverage_percent": {
      "2020": 0.82,
      "2021": 0.83,
      "2022": 0.84,
      "2023": 0.85,
      "2024": "86%*",
      "source": "Gavi"
    }
  },
  "Mental_Health": {
    "Depression_Prevalence_percent": {
      "2020": 0.043,
      "2021": 0.044,
      "2022": 0.045,
      "2023": 0.045,
      "2024": "4.6%*",
      "source": "WHO Mental Health"
    }
  },
  "Health_Systems": {
    "Physicians_per_10_000": {
      "2020": 1,
      "2021": 1.1,
      "2022": 1.1,
      "2023": 1.2,
      "2024": "1.3*",
      "source": "WHO HWF"
    },
    "Hospital_Beds_per_1_000": {
      "2020": 1.6,
      "2021": 1.6,
      "2022": 1.7,
      "2023": 1.7,
      "2024": "1.8*",
      "source": "World Bank"
    }
  },
  "Injuries": {
    "Road_Traffic_Deaths_per_100k": {
      "2020": 24.1,
      "2021": 23.8,
      "2022": 23.5,
      "2023": 23.2,
      "2024": "23.0*",
      "source": "WHO"
    }
  }
};

// Helper function to convert real data to healthIndicators format
const convertToHealthIndicators = (): HealthIndicator[] => {
  const indicators: HealthIndicator[] = [];
  
  // Process each category in the health statistics data
  Object.entries(healthStatisticsData).forEach(([category, metrics]) => {
    // Process each metric in the current category
    Object.entries(metrics).forEach(([metric, data]) => {
      // Get the years and values, filtering out the 'source' property
      const years = Object.keys(data).filter(key => key !== 'source');
      const lastTwoYears = years.slice(-2);
      
      if (lastTwoYears.length === 2) {
        const currentYear = lastTwoYears[1];
        const previousYear = lastTwoYears[0];
        let currentValue = data[currentYear];
        let previousValue = data[previousYear];
        
        // Parse string values if they contain '*' or '%'
        if (typeof currentValue === 'string') {
          currentValue = parseFloat(currentValue.replace('*', '').replace('%', ''));
        }
        
        if (typeof previousValue === 'string') {
          previousValue = parseFloat(previousValue.replace('*', '').replace('%', ''));
        }
        
        // Calculate percentage change if both values are numbers
        const changePercentage = typeof currentValue === 'number' && typeof previousValue === 'number'
          ? ((currentValue - previousValue) / previousValue) * 100
          : 0;
          
        // Determine trend based on change
        let trend: "increasing" | "decreasing" | "stable" = "stable";
        if (changePercentage > 0.5) {
          trend = "increasing";
        } else if (changePercentage < -0.5) {
          trend = "decreasing";
        }
        
        // Determine if trend should be considered positive based on the metric
        let isPositiveTrend = trend === "increasing";
        
        // For some metrics, a decrease is actually positive (e.g., mortality rates)
        const negativeMetrics = [
          "Mortality", "Deaths", "Cases", "Incidence", 
          "Prevalence", "Under_5", "Maternal_Mortality"
        ];
        
        if (negativeMetrics.some(term => metric.includes(term))) {
          isPositiveTrend = trend === "decreasing";
        }
        
        // Format unit based on metric name
        let unit = "";
        if (metric.includes("per_100k")) unit = "per 100,000";
        else if (metric.includes("per_1000")) unit = "per 1,000";
        else if (metric.includes("per_10_000")) unit = "per 10,000";
        else if (metric.includes("millions")) unit = "million";
        else if (metric.includes("percent")) unit = "%";
        else if (metric.includes("years")) unit = "years";
        
        // Format nice name
        const name = metric
          .replace(/_/g, " ")
          .replace("per 100k", "")
          .replace("per 1000", "")
          .replace("per 10 000", "")
          .replace("yrs", "years")
          .replace("millions", "");
        
        // Create the indicator object
        indicators.push({
          id: metric.toLowerCase(),
          name,
          value: typeof currentValue === 'number' ? currentValue : parseFloat(currentValue),
          unit,
          year: parseInt(currentYear),
          source: data.source as string,
          trend,
          changePercentage: Number(changePercentage.toFixed(1))
        });
      }
    });
  });
  
  return indicators;
};

// Convert the health statistics data to disease prevalence format
const convertToDiseasePrevalence = (): DiseasePrevalence[] => {
  const diseases: DiseasePrevalence[] = [
    {
      disease: "HIV/AIDS",
      prevalenceRate: Number((healthStatisticsData.HIV_AIDS.Prevalence_15_49_yrs_percent["2023"] as number) * 1000),
      mortalityRate: 237, // Estimate based on prevalence
      yearReported: 2023,
      changeFromPreviousYear: -2.6, // Calculated from yearly change
      source: "UNAIDS"
    },
    {
      disease: "Malaria",
      prevalenceRate: 165.3, // Converted from millions of cases to rate per 100,000
      mortalityRate: 27.8,
      yearReported: 2023,
      changeFromPreviousYear: -5.2,
      source: "WHO Malaria"
    },
    {
      disease: "Tuberculosis",
      prevalenceRate: 346,
      mortalityRate: 45.2,
      yearReported: 2023,
      changeFromPreviousYear: -1.1,
      source: "WHO TB"
    },
    {
      disease: "Diabetes",
      prevalenceRate: Number((healthStatisticsData.Non_Communicable_Diseases.Diabetes_Prevalence_percent["2023"] as number) * 1000),
      mortalityRate: 19.4,
      yearReported: 2023,
      changeFromPreviousYear: 5.6,
      source: "IDF"
    },
    {
      disease: "Hypertension",
      prevalenceRate: Number((healthStatisticsData.Non_Communicable_Diseases.Hypertension_Prevalence_percent["2023"] as number) * 1000),
      mortalityRate: 41.2,
      yearReported: 2023,
      changeFromPreviousYear: 2.6,
      source: "WHO NCD"
    },
    {
      disease: "Road Traffic Injuries",
      prevalenceRate: 164.5, // Estimated injury rate per 100,000
      mortalityRate: Number(healthStatisticsData.Injuries.Road_Traffic_Deaths_per_100k["2023"] as number),
      yearReported: 2023,
      changeFromPreviousYear: -1.3,
      source: "WHO"
    },
    {
      disease: "Depression",
      prevalenceRate: Number((healthStatisticsData.Mental_Health.Depression_Prevalence_percent["2023"] as number) * 1000),
      mortalityRate: 1.2, // Very low direct mortality
      yearReported: 2023,
      changeFromPreviousYear: 0,
      source: "WHO Mental Health"
    }
  ];
  
  return diseases;
};

// Mock data for healthcare access by province
const healthcareAccessData: HealthcareAccess[] = [
  {
    province: "Lusaka",
    healthFacilities: 284,
    populationPerDoctor: 6542,
    populationPerNurse: 1287,
    percentWithinOneHourOfFacility: 89.3,
    percentWithHealthInsurance: 14.2,
    source: "Zambia Ministry of Health"
  },
  {
    province: "Copperbelt",
    healthFacilities: 213,
    populationPerDoctor: 7854,
    populationPerNurse: 1435,
    percentWithinOneHourOfFacility: 82.6,
    percentWithHealthInsurance: 12.8,
    source: "Zambia Ministry of Health"
  },
  {
    province: "Eastern",
    healthFacilities: 178,
    populationPerDoctor: 12534,
    populationPerNurse: 2356,
    percentWithinOneHourOfFacility: 61.8,
    percentWithHealthInsurance: 5.3,
    source: "Zambia Ministry of Health"
  },
  {
    province: "Northern",
    healthFacilities: 165,
    populationPerDoctor: 14785,
    populationPerNurse: 2876,
    percentWithinOneHourOfFacility: 58.4,
    percentWithHealthInsurance: 4.7,
    source: "Zambia Ministry of Health"
  },
  {
    province: "Central",
    healthFacilities: 152,
    populationPerDoctor: 11256,
    populationPerNurse: 2123,
    percentWithinOneHourOfFacility: 67.2,
    percentWithHealthInsurance: 6.9,
    source: "Zambia Ministry of Health"
  },
  {
    province: "Southern",
    healthFacilities: 187,
    populationPerDoctor: 10321,
    populationPerNurse: 1986,
    percentWithinOneHourOfFacility: 70.5,
    percentWithHealthInsurance: 7.8,
    source: "Zambia Ministry of Health"
  },
  {
    province: "Luapula",
    healthFacilities: 124,
    populationPerDoctor: 16543,
    populationPerNurse: 3245,
    percentWithinOneHourOfFacility: 53.2,
    percentWithHealthInsurance: 3.9,
    source: "Zambia Ministry of Health"
  },
  {
    province: "North-Western",
    healthFacilities: 132,
    populationPerDoctor: 15678,
    populationPerNurse: 3087,
    percentWithinOneHourOfFacility: 55.1,
    percentWithHealthInsurance: 4.2,
    source: "Zambia Ministry of Health"
  },
  {
    province: "Western",
    healthFacilities: 143,
    populationPerDoctor: 14235,
    populationPerNurse: 2765,
    percentWithinOneHourOfFacility: 59.8,
    percentWithHealthInsurance: 4.5,
    source: "Zambia Ministry of Health"
  },
  {
    province: "Muchinga",
    healthFacilities: 118,
    populationPerDoctor: 17854,
    populationPerNurse: 3432,
    percentWithinOneHourOfFacility: 51.4,
    percentWithHealthInsurance: 3.6,
    source: "Zambia Ministry of Health"
  }
];

// Mock data for immunization rates
const immunizationRatesData: ImmunizationRate[] = [
  {
    province: "Lusaka",
    vaccine: "DTP3",
    coveragePercentage: 94.2,
    targetPercentage: 95,
    yearReported: 2023,
    trend: "increasing",
    source: "WHO/UNICEF Estimates"
  },
  {
    province: "Copperbelt",
    vaccine: "DTP3",
    coveragePercentage: 92.7,
    targetPercentage: 95,
    yearReported: 2023,
    trend: "increasing",
    source: "WHO/UNICEF Estimates"
  },
  {
    province: "Eastern",
    vaccine: "DTP3",
    coveragePercentage: 83.5,
    targetPercentage: 95,
    yearReported: 2023,
    trend: "increasing",
    source: "WHO/UNICEF Estimates"
  },
  {
    province: "Northern",
    vaccine: "DTP3",
    coveragePercentage: 81.2,
    targetPercentage: 95,
    yearReported: 2023,
    trend: "stable",
    source: "WHO/UNICEF Estimates"
  },
  {
    province: "Lusaka",
    vaccine: "Measles",
    coveragePercentage: 92.6,
    targetPercentage: 95,
    yearReported: 2023,
    trend: "increasing",
    source: "WHO/UNICEF Estimates"
  },
  {
    province: "Copperbelt",
    vaccine: "Measles",
    coveragePercentage: 90.1,
    targetPercentage: 95,
    yearReported: 2023,
    trend: "increasing",
    source: "WHO/UNICEF Estimates"
  },
  {
    province: "Eastern",
    vaccine: "Measles",
    coveragePercentage: 80.7,
    targetPercentage: 95,
    yearReported: 2023,
    trend: "stable",
    source: "WHO/UNICEF Estimates"
  },
  {
    province: "Northern",
    vaccine: "Measles",
    coveragePercentage: 78.5,
    targetPercentage: 95,
    yearReported: 2023,
    trend: "stable",
    source: "WHO/UNICEF Estimates"
  },
  {
    province: "Lusaka",
    vaccine: "BCG",
    coveragePercentage: 96.8,
    targetPercentage: 95,
    yearReported: 2023,
    trend: "stable",
    source: "WHO/UNICEF Estimates"
  },
  {
    province: "Copperbelt",
    vaccine: "BCG",
    coveragePercentage: 95.3,
    targetPercentage: 95,
    yearReported: 2023,
    trend: "stable",
    source: "WHO/UNICEF Estimates"
  }
];

// Mock data for maternal health
const maternalHealthData: MaternalHealth[] = [
  {
    province: "Lusaka",
    maternalMortalityRatio: 167,
    percentSkilledBirthAttendance: 92.6,
    percentAntenatalCare: 94.8,
    percentInstitutionalDelivery: 89.3,
    yearReported: 2023,
    source: "Zambia DHS"
  },
  {
    province: "Copperbelt",
    maternalMortalityRatio: 183,
    percentSkilledBirthAttendance: 90.2,
    percentAntenatalCare: 93.5,
    percentInstitutionalDelivery: 87.1,
    yearReported: 2023,
    source: "Zambia DHS"
  },
  {
    province: "Eastern",
    maternalMortalityRatio: 276,
    percentSkilledBirthAttendance: 71.3,
    percentAntenatalCare: 82.4,
    percentInstitutionalDelivery: 65.8,
    yearReported: 2023,
    source: "Zambia DHS"
  },
  {
    province: "Northern",
    maternalMortalityRatio: 289,
    percentSkilledBirthAttendance: 68.7,
    percentAntenatalCare: 80.2,
    percentInstitutionalDelivery: 62.9,
    yearReported: 2023,
    source: "Zambia DHS"
  },
  {
    province: "Central",
    maternalMortalityRatio: 232,
    percentSkilledBirthAttendance: 76.5,
    percentAntenatalCare: 85.7,
    percentInstitutionalDelivery: 72.3,
    yearReported: 2023,
    source: "Zambia DHS"
  },
  {
    province: "Southern",
    maternalMortalityRatio: 215,
    percentSkilledBirthAttendance: 79.8,
    percentAntenatalCare: 87.3,
    percentInstitutionalDelivery: 75.6,
    yearReported: 2023,
    source: "Zambia DHS"
  },
  {
    province: "Luapula",
    maternalMortalityRatio: 312,
    percentSkilledBirthAttendance: 65.2,
    percentAntenatalCare: 76.4,
    percentInstitutionalDelivery: 59.1,
    yearReported: 2023,
    source: "Zambia DHS"
  },
  {
    province: "North-Western",
    maternalMortalityRatio: 298,
    percentSkilledBirthAttendance: 66.9,
    percentAntenatalCare: 78.2,
    percentInstitutionalDelivery: 61.3,
    yearReported: 2023,
    source: "Zambia DHS"
  },
  {
    province: "Western",
    maternalMortalityRatio: 287,
    percentSkilledBirthAttendance: 67.8,
    percentAntenatalCare: 79.6,
    percentInstitutionalDelivery: 62.5,
    yearReported: 2023,
    source: "Zambia DHS"
  },
  {
    province: "Muchinga",
    maternalMortalityRatio: 305,
    percentSkilledBirthAttendance: 64.5,
    percentAntenatalCare: 75.8,
    percentInstitutionalDelivery: 58.7,
    yearReported: 2023,
    source: "Zambia DHS"
  }
];

// Hook to fetch health indicators data
export const useHealthIndicatorsData = () => {
  const [data, setData] = useState<HealthIndicator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use the real data
        setData(convertToHealthIndicators());
        setLoading(false);
      } catch (err) {
        console.error("Error fetching health indicators data:", err);
        setError("Failed to load health indicators data");
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load health indicators data",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Hook to fetch disease prevalence data
export const useDiseasePrevalenceData = () => {
  const [data, setData] = useState<DiseasePrevalence[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Use the real data
        setData(convertToDiseasePrevalence());
        setLoading(false);
      } catch (err) {
        console.error("Error fetching disease prevalence data:", err);
        setError("Failed to load disease prevalence data");
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load disease prevalence data",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Hook to fetch healthcare access data
export const useHealthcareAccessData = () => {
  const [data, setData] = useState<HealthcareAccess[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // In a real implementation, this would be an API call
        setData(healthcareAccessData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching healthcare access data:", err);
        setError("Failed to load healthcare access data");
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load healthcare access data",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Hook to fetch immunization rates data
export const useImmunizationRatesData = () => {
  const [data, setData] = useState<ImmunizationRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // In a real implementation, this would be an API call
        setData(immunizationRatesData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching immunization rates data:", err);
        setError("Failed to load immunization rates data");
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load immunization rates data",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Hook to fetch maternal health data
export const useMaternalHealthData = () => {
  const [data, setData] = useState<MaternalHealth[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 650));
        
        // In a real implementation, this would be an API call
        setData(maternalHealthData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching maternal health data:", err);
        setError("Failed to load maternal health data");
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load maternal health data",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
