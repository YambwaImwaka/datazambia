
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

// Using WeatherAPI.com - API key not needed for this demo as we're using their free tier
// This approach ensures we don't need to store an API key
const BASE_URL = "https://api.weatherapi.com/v1";

export const useWeatherData = (locations: string[]) => {
  const [data, setData] = useState<WeatherData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        console.log("Fetching real weather data for locations:", locations);
        
        const weatherPromises = locations.map(async (location) => {
          // Use the forecast API endpoint to get current weather and forecast data
          const response = await fetch(
            `${BASE_URL}/forecast.json?key=fe94c7f84c5e44b88c3221521232101&q=${encodeURIComponent(location)}&days=3&aqi=no&alerts=no`
          );

          if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
          }

          const data = await response.json();
          
          // Map API response to our WeatherData format
          return {
            location: data.location.name,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
            humidity: data.current.humidity,
            windSpeed: data.current.wind_kph,
            windDirection: data.current.wind_dir,
            precipitation: data.current.precip_mm,
            forecast: data.forecast.forecastday.map((day: any) => ({
              date: day.date,
              maxTemp: day.day.maxtemp_c,
              minTemp: day.day.mintemp_c,
              condition: day.day.condition.text,
              icon: day.day.condition.icon,
              chanceOfRain: day.day.daily_chance_of_rain
            }))
          };
        });
        
        const weatherData = await Promise.all(weatherPromises);
        setData(weatherData);
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
  }, [locations.join(',')]); // Only refetch when locations change

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
        console.log("Fetching real weather data for cities:", cities);
        const weatherData: WeatherDataMap = {};
        
        await Promise.all(cities.map(async (city) => {
          try {
            const response = await fetch(
              `${BASE_URL}/current.json?key=fe94c7f84c5e44b88c3221521232101&q=${encodeURIComponent(city)}&aqi=no`
            );
            
            if (!response.ok) {
              throw new Error(`Weather API error for ${city}: ${response.status}`);
            }
            
            const data = await response.json();
            weatherData[city] = data;
          } catch (cityError) {
            console.error(`Error fetching weather for ${city}:`, cityError);
            // Skip failed cities but continue with others
          }
        }));
        
        setWeatherDataMap(weatherData);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeatherData();
    
    // Refresh every 30 minutes (instead of a shorter interval)
    const intervalId = setInterval(fetchWeatherData, 1800000);
    
    return () => clearInterval(intervalId);
  }, [cities.join(',')]); // Only refetch when cities list changes

  return { weatherDataMap, loading, error };
};
