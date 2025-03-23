
import React from 'react';
import { MapChart } from '@/components/maps/MapChart';
import { provinces } from '@/utils/data';

const Explore = () => {
  // Transform the data for the MapChart component
  const provinceMapData = provinces.map(province => ({
    name: province.name,
    value: province.population, // Using population as the value
    coordinates: province.coordinates as [number, number],
    color: getRandomColor(province.name) // Generate a color based on province name
  }));

  // Generate a deterministic color based on province name
  function getRandomColor(name: string) {
    // Simple hash function to generate a number from a string
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Convert to hex color
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Explore Zambia</h1>
      
      <div className="mb-8">
        <MapChart 
          data={provinceMapData}
          title="Population Distribution by Province"
          description="Visualization of population density across Zambia's provinces (millions)"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {provinces.map(province => (
          <div key={province.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={province.image} 
                alt={province.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-4 text-white">
                  <h2 className="text-2xl font-bold">{province.name} Province</h2>
                  <p className="flex items-center">
                    <span className="mr-2">Population: {province.population}M</span>
                    <span className="mr-2">|</span>
                    <span>Capital: {province.capital}</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{province.description}</p>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Key Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {province.keyIndustries.map((industry, index) => (
                    <span 
                      key={index} 
                      className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Major Exports</h3>
                <div className="flex flex-wrap gap-2">
                  {province.majorExports.map((export_, index) => (
                    <span 
                      key={index} 
                      className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs px-2 py-1 rounded"
                    >
                      {export_}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Tourist Attractions</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {province.touristAttractions.map((attraction, index) => (
                    <li key={index}>{attraction}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
