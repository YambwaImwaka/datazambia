import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

// Sample health data for Zambia (for demonstration purposes)
// In a production app, this would come from actual API calls to WHO, World Bank, etc.

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

// Mock data for health indicators
const healthIndicatorsData: HealthIndicator[] = [
  {
    id: "life-expectancy",
    name: "Life Expectancy",
    value: 63.89,
    unit: "years",
    year: 2023,
    source: "WHO Global Health Observatory",
    trend: "increasing",
    changePercentage: 0.8
  },
  {
    id: "infant-mortality",
    name: "Infant Mortality Rate",
    value: 38.6,
    unit: "per 1,000 live births",
    year: 2023,
    source: "UNICEF Data",
    trend: "decreasing",
    changePercentage: -2.4
  },
  {
    id: "maternal-mortality",
    name: "Maternal Mortality Ratio",
    value: 213,
    unit: "per 100,000 live births",
    year: 2022,
    source: "WHO/UNICEF Joint Database",
    trend: "decreasing",
    changePercentage: -3.5
  },
  {
    id: "hiv-prevalence",
    name: "HIV Prevalence (15-49)",
    value: 11.1,
    unit: "%",
    year: 2023,
    source: "UNAIDS Data",
    trend: "decreasing",
    changePercentage: -0.6
  },
  {
    id: "malaria-incidence",
    name: "Malaria Incidence",
    value: 152.3,
    unit: "per 1,000 population at risk",
    year: 2023,
    source: "WHO Malaria Report",
    trend: "decreasing",
    changePercentage: -4.2
  },
  {
    id: "tb-incidence",
    name: "Tuberculosis Incidence",
    value: 333,
    unit: "per 100,000 population",
    year: 2022,
    source: "WHO Global TB Report",
    trend: "decreasing",
    changePercentage: -1.8
  },
  {
    id: "uhc-service-coverage",
    name: "UHC Service Coverage Index",
    value: 56,
    unit: "index value (0-100)",
    year: 2022,
    source: "WHO/World Bank",
    trend: "increasing",
    changePercentage: 2.1
  },
  {
    id: "stunting-children",
    name: "Stunting (Children under 5)",
    value: 34.6,
    unit: "%",
    year: 2023,
    source: "UNICEF/WHO/World Bank",
    trend: "decreasing",
    changePercentage: -1.2
  }
];

// Mock data for disease prevalence
const diseasePrevalenceData: DiseasePrevalence[] = [
  {
    disease: "Malaria",
    prevalenceRate: 152.3,
    mortalityRate: 26.7,
    yearReported: 2023,
    changeFromPreviousYear: -4.2,
    source: "WHO Malaria Report"
  },
  {
    disease: "HIV/AIDS",
    prevalenceRate: 1110, // 11.1% converted to per 100,000
    mortalityRate: 237,
    yearReported: 2023,
    changeFromPreviousYear: -2.3,
    source: "UNAIDS Data"
  },
  {
    disease: "Tuberculosis",
    prevalenceRate: 333,
    mortalityRate: 48,
    yearReported: 2022,
    changeFromPreviousYear: -1.8,
    source: "WHO Global TB Report"
  },
  {
    disease: "Lower Respiratory Infections",
    prevalenceRate: 1840,
    mortalityRate: 83.2,
    yearReported: 2022,
    changeFromPreviousYear: 1.5,
    source: "GBD 2022"
  },
  {
    disease: "Diarrheal Diseases",
    prevalenceRate: 2130,
    mortalityRate: 31.6,
    yearReported: 2022,
    changeFromPreviousYear: -3.1,
    source: "GBD 2022"
  },
  {
    disease: "Hypertension",
    prevalenceRate: 3560,
    mortalityRate: 42.7,
    yearReported: 2023,
    changeFromPreviousYear: 2.8,
    source: "WHO NCD Report"
  },
  {
    disease: "Diabetes",
    prevalenceRate: 1890,
    mortalityRate: 19.8,
    yearReported: 2023,
    changeFromPreviousYear: 3.6,
    source: "IDF Diabetes Atlas"
  }
];

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
        
        // In a real implementation, this would be an API call to WHO or World Bank
        setData(healthIndicatorsData);
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
        
        // In a real implementation, this would be an API call
        setData(diseasePrevalenceData);
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

// In a real-world application, these functions would make actual API calls to WHO, World Bank, etc.
// For demonstration purposes, we're returning mock data
// Functions to fetch real data from WHO, World Bank, etc. would be implemented here
