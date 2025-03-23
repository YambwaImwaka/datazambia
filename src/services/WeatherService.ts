
import { useState, useEffect } from "react";

// Weather data types
export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  precipitation: number;
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  icon: string;
  chanceOfRain: number;
}

// Add city weather data type for the useMultipleCitiesWeather hook
export interface CityWeatherData {
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    precip_mm: number;
    last_updated: string;
  };
  location: {
    name: string;
    region: string;
    country: string;
  };
}

export type WeatherDataMap = Record<string, CityWeatherData>;

// Use mock data since the API key is disabled
export const useWeatherData = (locations: string[]) => {
  const [data, setData] = useState<WeatherData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        console.log("Fetching weather data with mock service");
        
        // Generate weather data based on the provided locations
        const mockWeatherData = locations.map(location => {
          // Generate some randomness for realistic mock data
          const baseTemp = 22 + (Math.random() * 10 - 5);
          const humidity = Math.floor(50 + Math.random() * 40);
          const windSpeed = Math.floor(5 + Math.random() * 15);
          const precipitation = Math.floor(Math.random() * 100);
          
          // List of possible weather conditions
          const conditions = ["Sunny", "Partly cloudy", "Cloudy", "Light rain", "Overcast"];
          const condition = conditions[Math.floor(Math.random() * conditions.length)];
          
          // Generate icon based on condition
          let icon = "sunny";
          if (condition.includes("cloud")) icon = "cloudy";
          if (condition.includes("rain")) icon = "rainy";
          if (condition.includes("Overcast")) icon = "overcast";
          
          // Generate 3-day forecast
          const forecast = Array.from({ length: 3 }, (_, i) => {
            const forecastDate = new Date();
            forecastDate.setDate(forecastDate.getDate() + i + 1);
            
            const forecastCondition = conditions[Math.floor(Math.random() * conditions.length)];
            let forecastIcon = "sunny";
            if (forecastCondition.includes("cloud")) forecastIcon = "cloudy";
            if (forecastCondition.includes("rain")) forecastIcon = "rainy";
            if (forecastCondition.includes("Overcast")) forecastIcon = "overcast";
            
            return {
              date: forecastDate.toISOString().split('T')[0],
              maxTemp: Math.floor(baseTemp + 3 + (Math.random() * 4 - 2)),
              minTemp: Math.floor(baseTemp - 5 + (Math.random() * 4 - 2)),
              condition: forecastCondition,
              icon: forecastIcon,
              chanceOfRain: Math.floor(Math.random() * 100)
            };
          });
          
          return {
            location,
            temperature: Math.floor(baseTemp),
            condition,
            icon,
            humidity,
            windSpeed,
            windDirection: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)],
            precipitation,
            forecast
          };
        });
        
        setData(mockWeatherData);
      } catch (err) {
        console.error("Error in weather service:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    
    // Refresh every 30 minutes
    const intervalId = setInterval(fetchWeatherData, 1800000);
    
    return () => clearInterval(intervalId);
  }, [locations]);

  return { data, loading, error };
};

// Implementation of useMultipleCitiesWeather hook for WeatherSection
export const useMultipleCitiesWeather = (cities: string[]) => {
  const [weatherDataMap, setWeatherDataMap] = useState<WeatherDataMap>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        // Create mock weather data for each city
        const mockData: WeatherDataMap = {};
        
        cities.forEach(city => {
          // Generate random weather data for each city
          const temp = Math.floor(18 + Math.random() * 15); // 18-33°C
          const humidity = Math.floor(40 + Math.random() * 50); // 40-90%
          const wind = Math.floor(5 + Math.random() * 20); // 5-25 km/h
          const precip = (Math.random() * 10).toFixed(1); // 0-10mm
          
          // Possible weather conditions
          const conditions = [
            "Sunny", "Partly cloudy", "Cloudy", 
            "Light rain", "Moderate rain", "Overcast", 
            "Clear"
          ];
          const condition = conditions[Math.floor(Math.random() * conditions.length)];
          
          // Current time
          const now = new Date();
          const hours = now.getHours().toString().padStart(2, '0');
          const minutes = now.getMinutes().toString().padStart(2, '0');
          const timeStr = `${hours}:${minutes}`;
          
          mockData[city] = {
            current: {
              temp_c: temp,
              condition: {
                text: condition,
                icon: `//cdn.weatherapi.com/weather/64x64/day/116.png` // Placeholder icon
              },
              wind_kph: wind,
              humidity: humidity,
              precip_mm: parseFloat(precip),
              last_updated: `2024-05-07 ${timeStr}`
            },
            location: {
              name: city,
              region: "Central Province",
              country: "Zambia"
            }
          };
        });
        
        setWeatherDataMap(mockData);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeatherData();
    
    // Refresh every 30 minutes
    const intervalId = setInterval(fetchWeatherData, 1800000);
    
    return () => clearInterval(intervalId);
  }, [cities]);

  return { weatherDataMap, loading, error };
};
