
import React from "react";
import { Helmet } from "react-helmet-async";
import Hero from "@/components/home/Hero";
import KeyMetrics from "@/components/home/KeyMetrics";
import DataVisualizer from "@/components/home/DataVisualizer";
import EmailSignup from "@/components/home/EmailSignup";
import PageLayout from "@/components/layout/PageLayout";
import SectorTiles from "@/components/home/SectorTiles";
import DataHighlights from "@/components/home/DataHighlights";
import FeaturedProvinces from "@/components/home/FeaturedProvinces";
import AIChatbot from "@/components/ai/AIChatbot";
import NewsHighlights from "@/components/home/NewsHighlights";
import { educationStatistics } from "@/utils/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, LineChart, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Index: React.FC = () => {
  // Education statistics highlight
  const edStats = educationStatistics.Zambia_Education_Statistics_2020_2024;
  
  // Safely check if a note property exists in an object
  const getNote = (dataObj: Record<string, any>): string | null => {
    return dataObj && 'note' in dataObj ? dataObj.note : null;
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Zambia Data Hub | Comprehensive National Data Repository</title>
        <meta name="description" content="Access comprehensive data on Zambia's economy, education, health, agriculture and provincial statistics through interactive visualizations and reports." />
      </Helmet>

      <Hero />
      <DataHighlights />
      <SectorTiles />
      <FeaturedProvinces />
      <NewsHighlights />
      <DataVisualizer />
      
      {/* Education Statistics Showcase */}
      <motion.section 
        className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/80"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
            <div>
              <div className="inline-block mb-2">
                <div className="flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-full text-sm font-medium">
                  <Book size={16} />
                  <span>Education Insights</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Education Progress
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                Key educational metrics showing Zambia's progress towards literacy and educational goals
              </p>
            </div>
            <Link to="/explore/education">
              <Button 
                variant="outline" 
                className="group flex items-center border-dashed"
              >
                View Full Education Data 
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-100 dark:border-amber-900/10">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium text-amber-900 dark:text-amber-300">
                    Adult Literacy
                  </CardTitle>
                  <Book className="h-5 w-5 text-amber-500" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">2020</span>
                    <span className="text-sm font-medium">{edStats.Literacy_Access.Adult_Literacy_Rate_percent["2020"]}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${edStats.Literacy_Access.Adult_Literacy_Rate_percent["2020"]}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">2024</span>
                    <span className="text-sm font-medium">{edStats.Literacy_Access.Adult_Literacy_Rate_percent["2024"]}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${parseFloat(edStats.Literacy_Access.Adult_Literacy_Rate_percent["2024"].replace("*", ""))}%` }}></div>
                  </div>
                  
                  <div className="pt-2 text-right">
                    <span className="text-xs text-green-600 dark:text-green-400">
                      +{(parseFloat(edStats.Literacy_Access.Adult_Literacy_Rate_percent["2024"].replace("*", "")) - edStats.Literacy_Access.Adult_Literacy_Rate_percent["2020"]).toFixed(1)}% since 2020
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900/10">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium text-blue-900 dark:text-blue-300">
                    Primary Enrollment
                  </CardTitle>
                  <LineChart className="h-5 w-5 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">2020</span>
                    <span className="text-sm font-medium">{edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2020"]}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2020"]}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">2024</span>
                    <span className="text-sm font-medium">{edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2024"]}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${parseFloat(edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2024"].replace("*", ""))}%` }}></div>
                  </div>
                  
                  <div className="pt-2 text-right">
                    <span className="text-xs text-green-600 dark:text-green-400">
                      +{(parseFloat(edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2024"].replace("*", "")) - edStats.Literacy_Access.Primary_School_Enrollment_Rate_percent["2020"]).toFixed(1)}% since 2020
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-900/10">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium text-green-900 dark:text-green-300">
                    Teacher Training
                  </CardTitle>
                  <Book className="h-5 w-5 text-green-500" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">2020</span>
                    <span className="text-sm font-medium">{edStats.Teachers_Training.Percent_of_Trained_Primary_Teachers["2020"]}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${edStats.Teachers_Training.Percent_of_Trained_Primary_Teachers["2020"]}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">2024</span>
                    <span className="text-sm font-medium">{edStats.Teachers_Training.Percent_of_Trained_Primary_Teachers["2024"]}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${parseFloat(edStats.Teachers_Training.Percent_of_Trained_Primary_Teachers["2024"].replace("*", ""))}%` }}></div>
                  </div>
                  
                  <div className="pt-2 text-right">
                    <span className="text-xs text-green-600 dark:text-green-400">
                      +{(parseFloat(edStats.Teachers_Training.Percent_of_Trained_Primary_Teachers["2024"].replace("*", "")) - edStats.Teachers_Training.Percent_of_Trained_Primary_Teachers["2020"]).toFixed(1)}% since 2020
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>
      
      <EmailSignup />
      <AIChatbot />
    </PageLayout>
  );
};

export default Index;
