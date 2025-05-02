
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, TrendingUp, Activity, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LineChart from "@/components/charts/LineChart";

interface DataVisualizerProps {
  className?: string;
}

const DataVisualizer = ({ className }: DataVisualizerProps) => {
  const [activeTab, setActiveTab] = useState("gdp");

  // Sample data for different metrics
  const gdpData = [
    { name: "2019", value: 23.1 },
    { name: "2020", value: 19.7 },
    { name: "2021", value: 22.1 },
    { name: "2022", value: 26.0 },
    { name: "2023", value: 28.5 },
    { name: "2024", value: 30.2 },
  ];

  const literacyData = [
    { name: "2019", value: 83.5 },
    { name: "2020", value: 85.1 },
    { name: "2021", value: 85.7 },
    { name: "2022", value: 86.2 },
    { name: "2023", value: 86.7 },
    { name: "2024", value: 87.0 },
  ];

  const employmentData = [
    { name: "2019", value: 10.3 },
    { name: "2020", value: 12.7 },
    { name: "2021", value: 12.2 },
    { name: "2022", value: 11.5 },
    { name: "2023", value: 10.8 },
    { name: "2024", value: 10.3 },
  ];

  const getIcon = (tab: string) => {
    switch (tab) {
      case "gdp":
        return <DollarSign className="text-green-500" />;
      case "literacy":
        return <TrendingUp className="text-blue-500" />;
      case "employment":
        return <Activity className="text-amber-500" />;
      default:
        return <ArrowUpRight />;
    }
  };

  const getTitle = (tab: string) => {
    switch (tab) {
      case "gdp":
        return "GDP Trends (Billion USD)";
      case "literacy":
        return "Adult Literacy Rate (%)";
      case "employment":
        return "Unemployment Rate (%)";
      default:
        return "Data Visualization";
    }
  };

  return (
    <Card className={`shadow-md ${className}`}>
      <Tabs defaultValue="gdp" value={activeTab} onValueChange={setActiveTab}>
        <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            {getIcon(activeTab)}
            <h3 className="text-xl font-semibold">{getTitle(activeTab)}</h3>
          </div>
          <TabsList className="bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="gdp">GDP</TabsTrigger>
            <TabsTrigger value="literacy">Literacy</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
          </TabsList>
        </div>
        <CardContent className="p-0 pb-6">
          <AnimatePresence mode="wait">
            <TabsContent value="gdp" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-72 w-full px-4"
              >
                <LineChart
                  data={gdpData}
                  xAxisKey="name"
                  lines={[
                    {
                      dataKey: "value",
                      name: "GDP (Billion USD)",
                      color: "#16a34a",
                      strokeDasharray: ""
                    }
                  ]}
                  height={280}
                  showGrid={true}
                />
              </motion.div>
            </TabsContent>
            <TabsContent value="literacy" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-72 w-full px-4"
              >
                <LineChart
                  data={literacyData}
                  xAxisKey="name"
                  lines={[
                    {
                      dataKey: "value",
                      name: "Literacy Rate (%)",
                      color: "#2563eb",
                      strokeDasharray: ""
                    }
                  ]}
                  height={280}
                  showGrid={true}
                />
              </motion.div>
            </TabsContent>
            <TabsContent value="employment" className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-72 w-full px-4"
              >
                <LineChart
                  data={employmentData}
                  xAxisKey="name"
                  lines={[
                    {
                      dataKey: "value",
                      name: "Unemployment Rate (%)",
                      color: "#d97706",
                      strokeDasharray: ""
                    }
                  ]}
                  height={280}
                  showGrid={true}
                />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default DataVisualizer;
