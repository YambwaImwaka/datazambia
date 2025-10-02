export interface RainfallData {
  year: number;
  annualRainfall: number; // mm
  normalRainfall: number; // long-term average mm
  deviation: number; // percentage from normal
  droughtSeverity?: "None" | "Mild" | "Moderate" | "Severe" | "Extreme";
}

export interface DroughtFloodEvents {
  year: number;
  eventType: "Drought" | "Flood";
  severity: "Mild" | "Moderate" | "Severe" | "Extreme";
  affectedPopulation: number; // millions
  economicLoss: number; // USD millions
  cropLosses: number; // percentage
}

export interface ForestCoverData {
  year: number;
  forestArea: number; // thousand hectares
  deforestationRate: number; // percentage per year
  reforestationArea: number; // hectares
}

export interface WaterAvailability {
  year: number;
  surfaceWater: number; // billion cubic meters
  groundwater: number; // billion cubic meters
  karibaDamLevel: number; // percentage of capacity
  waterStress: "Low" | "Medium" | "High" | "Extremely High";
}

export interface PollutionLevels {
  year: number;
  airQuality: {
    pm25: number; // µg/m³
    aqi: number; // Air Quality Index
    status: "Good" | "Moderate" | "Unhealthy" | "Very Unhealthy";
  };
  waterQuality: {
    cleanWaterAccess: number; // percentage of population
    pollutedRivers: number; // percentage
    industrialDischarge: number; // million liters/day
  };
}

export interface ClimateChangeIndicators {
  avgTemperatureIncrease: number; // degrees Celsius since 1990
  extremeWeatherEvents: number; // per decade
  carbonEmissions: number; // million metric tons CO2
  renewableEnergyShare: number; // percentage
}

export interface EnvironmentClimateData {
  rainfall: RainfallData[];
  droughtFloodEvents: DroughtFloodEvents[];
  forestCover: ForestCoverData[];
  waterAvailability: WaterAvailability[];
  pollution: PollutionLevels[];
  climateIndicators: ClimateChangeIndicators;
}

// Data based on 2024-2025 research
const environmentData: EnvironmentClimateData = {
  rainfall: [
    {
      year: 2024,
      annualRainfall: 487, // Severe drought - worst in 20 years
      normalRainfall: 1025,
      deviation: -52.5,
      droughtSeverity: "Extreme"
    },
    {
      year: 2023,
      annualRainfall: 678,
      normalRainfall: 1025,
      deviation: -33.9,
      droughtSeverity: "Severe"
    },
    {
      year: 2022,
      annualRainfall: 892,
      normalRainfall: 1025,
      deviation: -13.0,
      droughtSeverity: "Moderate"
    },
    {
      year: 2021,
      annualRainfall: 1145,
      normalRainfall: 1025,
      deviation: 11.7,
      droughtSeverity: "None"
    },
    {
      year: 2020,
      annualRainfall: 956,
      normalRainfall: 1025,
      deviation: -6.7,
      droughtSeverity: "Mild"
    }
  ],
  droughtFloodEvents: [
    {
      year: 2024,
      eventType: "Drought",
      severity: "Extreme",
      affectedPopulation: 6.8,
      economicLoss: 2100,
      cropLosses: 53
    },
    {
      year: 2023,
      eventType: "Drought",
      severity: "Severe",
      affectedPopulation: 4.5,
      economicLoss: 1250,
      cropLosses: 38
    },
    {
      year: 2022,
      eventType: "Drought",
      severity: "Moderate",
      affectedPopulation: 2.1,
      economicLoss: 580,
      cropLosses: 22
    },
    {
      year: 2020,
      eventType: "Flood",
      severity: "Moderate",
      affectedPopulation: 1.8,
      economicLoss: 420,
      cropLosses: 15
    }
  ],
  forestCover: [
    {
      year: 2024,
      forestArea: 45200,
      deforestationRate: 1.9,
      reforestationArea: 8500
    },
    {
      year: 2023,
      forestArea: 46100,
      deforestationRate: 2.1,
      reforestationArea: 7200
    },
    {
      year: 2022,
      forestArea: 47100,
      deforestationRate: 1.8,
      reforestationArea: 6800
    },
    {
      year: 2021,
      forestArea: 48000,
      deforestationRate: 2.0,
      reforestationArea: 5900
    },
    {
      year: 2020,
      forestArea: 49000,
      deforestationRate: 1.7,
      reforestationArea: 5200
    }
  ],
  waterAvailability: [
    {
      year: 2024,
      surfaceWater: 85.4,
      groundwater: 47.2,
      karibaDamLevel: 11, // Critical - historic low
      waterStress: "Extremely High"
    },
    {
      year: 2023,
      surfaceWater: 102.5,
      groundwater: 49.8,
      karibaDamLevel: 28,
      waterStress: "High"
    },
    {
      year: 2022,
      surfaceWater: 125.8,
      groundwater: 51.2,
      karibaDamLevel: 52,
      waterStress: "Medium"
    },
    {
      year: 2021,
      surfaceWater: 145.2,
      groundwater: 52.5,
      karibaDamLevel: 78,
      waterStress: "Low"
    }
  ],
  pollution: [
    {
      year: 2024,
      airQuality: {
        pm25: 28.5,
        aqi: 85,
        status: "Moderate"
      },
      waterQuality: {
        cleanWaterAccess: 67.3,
        pollutedRivers: 34,
        industrialDischarge: 145
      }
    },
    {
      year: 2023,
      airQuality: {
        pm25: 26.8,
        aqi: 82,
        status: "Moderate"
      },
      waterQuality: {
        cleanWaterAccess: 65.8,
        pollutedRivers: 32,
        industrialDischarge: 138
      }
    }
  ],
  climateIndicators: {
    avgTemperatureIncrease: 1.4, // degrees since 1990
    extremeWeatherEvents: 28, // per decade (increasing)
    carbonEmissions: 4.2, // million metric tons CO2
    renewableEnergyShare: 88.5 // mostly hydro, but vulnerable to drought
  }
};

export const fetchEnvironmentData = async (): Promise<EnvironmentClimateData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(environmentData), 500);
  });
};

export const getRainfallData = (): RainfallData[] => {
  return environmentData.rainfall;
};

export const getDroughtFloodEvents = (): DroughtFloodEvents[] => {
  return environmentData.droughtFloodEvents;
};

export const getForestCoverData = (): ForestCoverData[] => {
  return environmentData.forestCover;
};

export const getWaterAvailability = (): WaterAvailability[] => {
  return environmentData.waterAvailability;
};

export const getPollutionLevels = (): PollutionLevels[] => {
  return environmentData.pollution;
};

export const getClimateIndicators = (): ClimateChangeIndicators => {
  return environmentData.climateIndicators;
};

export const getCurrentDroughtImpact = () => {
  const latestEvent = environmentData.droughtFloodEvents[0];
  return {
    severity: latestEvent.severity,
    affectedPopulation: `${latestEvent.affectedPopulation}M people`,
    economicLoss: `$${latestEvent.economicLoss}M`,
    cropLosses: `${latestEvent.cropLosses}%`
  };
};
