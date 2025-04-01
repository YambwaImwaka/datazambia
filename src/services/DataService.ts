import { toast } from "@/hooks/use-toast";

// External API endpoints
const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_ACCESS_KEY = "fw2fib32GoLg1NSCR4xIVp2dj4dNVSIJpDbvXiQH5Yg"; // Real API key

// Default images to use as fallbacks
const DEFAULT_IMAGES = {
  province: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
  agriculture: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  economics: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
  health: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
  education: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
  tourism: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  landscape: "https://images.unsplash.com/photo-1520962922320-2038eebab146?auto=format&fit=crop&w=800&q=80"
};

export interface ImageResult {
  id: string;
  url: string;
  alt_description: string;
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
}

/**
 * Fetch images from Unsplash API
 */
export const fetchImages = async (query: string, count: number = 1): Promise<ImageResult[]> => {
  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}?query=${query}+zambia&per_page=${count}`, 
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`);
    }

    const data = await response.json();
    
    return data.results.map((result: any) => ({
      id: result.id,
      url: result.urls.regular,
      alt_description: result.alt_description || `Image for ${query}`,
      user: {
        name: result.user.name,
        username: result.user.username,
        links: {
          html: result.user.links.html
        }
      }
    }));
  } catch (error) {
    console.error("Error fetching images:", error);
    // Fall back to default images
    return [{
      id: "default",
      url: DEFAULT_IMAGES[query as keyof typeof DEFAULT_IMAGES] || DEFAULT_IMAGES.landscape,
      alt_description: `Default image for ${query}`,
      user: {
        name: "Default",
        username: "default",
        links: {
          html: "https://unsplash.com"
        }
      }
    }];
  }
};

// World Bank API for development indicators
const WORLD_BANK_API_URL = "https://api.worldbank.org/v2/country/ZMB/indicator";

export interface IndicatorData {
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
  date: string;
  value: number | null;
}

/**
 * Fetch development indicators from World Bank API
 */
export const fetchDevelopmentIndicator = async (indicatorId: string): Promise<IndicatorData[]> => {
  try {
    const response = await fetch(
      `${WORLD_BANK_API_URL}/${indicatorId}?format=json&per_page=10`, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch indicator data: ${response.status}`);
    }

    const data = await response.json();
    // World Bank API returns an array where first element is metadata and second is the actual data
    return data[1] || [];
  } catch (error) {
    console.error(`Error fetching indicator ${indicatorId}:`, error);
    toast({
      title: "Data Fetch Error",
      description: "Could not load development indicator data",
      variant: "destructive"
    });
    return [];
  }
};

// List of useful World Bank indicators for Zambia
export const WORLD_BANK_INDICATORS = {
  GDP_PER_CAPITA: "NY.GDP.PCAP.CD", // GDP per capita (current US$)
  POPULATION_GROWTH: "SP.POP.GROW", // Population growth (annual %)
  LIFE_EXPECTANCY: "SP.DYN.LE00.IN", // Life expectancy at birth, total (years)
  LITERACY_RATE: "SE.ADT.LITR.ZS", // Literacy rate, adult total (% of people ages 15 and above)
  UNEMPLOYMENT: "SL.UEM.TOTL.ZS", // Unemployment, total (% of total labor force)
  ELECTRICITY_ACCESS: "EG.ELC.ACCS.ZS", // Access to electricity (% of population)
  POVERTY_HEADCOUNT: "SI.POV.NAHC", // Poverty headcount ratio at national poverty lines (% of population)
  AGRICULTURE_VALUE_ADDED: "NV.AGR.TOTL.ZS", // Agriculture, forestry, and fishing, value added (% of GDP)
  CO2_EMISSIONS: "EN.ATM.CO2E.PC", // CO2 emissions (metric tons per capita)
  INTERNET_USERS: "IT.NET.USER.ZS" // Individuals using the Internet (% of population)
};

// Open Weather Map API for more detailed weather data
const OPENWEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const OPENWEATHER_API_KEY = "bd5e378503939ddaee76f12ad7a97608"; // Real API key

export interface WeatherForecast {
  city: string;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    dt_txt: string;
  }>;
}

/**
 * Fetch 5-day weather forecast from OpenWeatherMap
 */
export const fetchWeatherForecast = async (city: string): Promise<WeatherForecast | null> => {
  try {
    const response = await fetch(
      `${OPENWEATHER_API_URL}?q=${city},zambia&units=metric&appid=${OPENWEATHER_API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch weather forecast: ${response.status}`);
    }

    const data = await response.json();
    return {
      city: data.city.name,
      list: data.list
    };
  } catch (error) {
    console.error(`Error fetching weather forecast for ${city}:`, error);
    return null;
  }
};
