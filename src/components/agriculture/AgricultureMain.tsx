
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wheat, TrendingUp, Calendar, Info } from "lucide-react";
import { CropProductionView } from "./CropProductionView";
import { LivestockView } from "./LivestockView";
import { RainfallView } from "./RainfallView";
import { SoilHealthView } from "./SoilHealthView";
import AquacultureDashboard from "@/components/visualizations/AquacultureDashboard";
import ArableLandTrends from "@/components/visualizations/ArableLandTrends";

export const AgricultureMain = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const provinces = ["Southern", "Eastern", "Central", "Lusaka", "Copperbelt"];
  const years = [2019, 2020, 2021, 2022, 2023];

  return (
    <div className="w-full py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Agriculture Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Comprehensive agricultural data and insights for Zambia
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select value={selectedProvince} onValueChange={setSelectedProvince}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Provinces</SelectItem>
              {provinces.map(province => (
                <SelectItem key={province} value={province}>{province}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="crops" className="w-full">
        <TabsList
          className="w-full min-w-0 overflow-x-auto flex md:grid md:grid-cols-6 gap-1 md:gap-0 no-scrollbar pl-4 pr-2 scroll-snap-x"
          style={{ WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}
        >
          <TabsTrigger value="crops" className="flex items-center gap-2 min-w-[110px] justify-center text-xs md:text-base scroll-snap-align ml-4">
            <Wheat className="h-4 w-4" />
            Crops
          </TabsTrigger>
          <TabsTrigger value="livestock" className="min-w-[110px] justify-center text-xs md:text-base scroll-snap-align">Livestock</TabsTrigger>
          <TabsTrigger value="aquaculture" className="min-w-[110px] justify-center text-xs md:text-base scroll-snap-align">Aquaculture</TabsTrigger>
          <TabsTrigger value="land" className="min-w-[110px] justify-center text-xs md:text-base scroll-snap-align">Land Use</TabsTrigger>
          <TabsTrigger value="rainfall" className="min-w-[110px] justify-center text-xs md:text-base scroll-snap-align">Rainfall</TabsTrigger>
          <TabsTrigger value="soil" className="min-w-[110px] justify-center text-xs md:text-base scroll-snap-align">Soil Health</TabsTrigger>
        </TabsList>

        <TabsContent value="crops" className="mt-6">
          <CropProductionView 
            selectedProvince={selectedProvince} 
            selectedYear={selectedYear} 
          />
        </TabsContent>

        <TabsContent value="livestock" className="mt-6">
          <LivestockView 
            selectedProvince={selectedProvince} 
            selectedYear={selectedYear} 
          />
        </TabsContent>

        <TabsContent value="aquaculture" className="mt-6">
          <AquacultureDashboard />
        </TabsContent>

        <TabsContent value="land" className="mt-6">
          <ArableLandTrends />
        </TabsContent>

        <TabsContent value="rainfall" className="mt-6">
          <RainfallView 
            selectedProvince={selectedProvince} 
            selectedYear={selectedYear} 
          />
        </TabsContent>

        <TabsContent value="soil" className="mt-6">
          <SoilHealthView 
            selectedProvince={selectedProvince} 
            selectedYear={selectedYear} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgricultureMain;
