
import { useState, useEffect } from 'react';

// Weather data types
export interface WeatherData {
  location: string;
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
  forecast?: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
  };
}

export const useWeatherData = (city: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        // Using WeatherAPI.com - free tier has 1,000,000 calls per month
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=c73c8e4b5f464b5286b160339241505&q=${city},zambia&days=3&aqi=no&alerts=no`
        );
        
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        
        const weatherData = await response.json();
        setData(weatherData);
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  return { data, loading, error };
};

// Get weather for multiple cities in Zambia
export const useMultipleCitiesWeather = (cities: string[]) => {
  const [weatherDataMap, setWeatherDataMap] = useState<{[city: string]: WeatherData | null}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllWeather = async () => {
      setLoading(true);
      try {
        const promises = cities.map(city => 
          fetch(`https://api.weatherapi.com/v1/forecast.json?key=c73c8e4b5f464b5286b160339241505&q=${city},zambia&days=3&aqi=no&alerts=no`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch weather for ${city}`);
              }
              return response.json();
            })
            .then(data => ({ city, data }))
            .catch(err => {
              console.error(`Error fetching weather for ${city}:`, err);
              return { city, data: null };
            })
        );

        const results = await Promise.all(promises);
        const dataMap: {[city: string]: WeatherData | null} = {};
        
        results.forEach(result => {
          dataMap[result.city] = result.data;
        });
        
        setWeatherDataMap(dataMap);
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (cities.length > 0) {
      fetchAllWeather();
    }
  }, [cities]);

  return { weatherDataMap, loading, error };
};
