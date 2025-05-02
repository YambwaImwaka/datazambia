
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Database, Globe, MessageCircle, Brain, Book, LineChart as LineChartIcon, School, FileBarChart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import AIChatbot from "@/components/ai/AIChatbot";
import Hero from "@/components/home/Hero";
import FeaturedProvinces from "@/components/home/FeaturedProvinces";
import DataVisualizer from "@/components/home/DataVisualizer";
import SectorTiles from "@/components/home/SectorTiles";
import FeaturedInsights from "@/components/home/FeaturedInsights";
import DataHighlights from "@/components/home/DataHighlights";
import EmailSignup from "@/components/home/EmailSignup";
import { educationStatistics } from "@/utils/data";

const Index = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  
  // Refs for scroll animations
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"]
  });
  
  // Transform values for parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  // Get education data
  const literacyData = educationStatistics.Zambia_Education_Statistics_2020_2024.Literacy_Access;
  const teacherData = educationStatistics.Zambia_Education_Statistics_2020_2024.Teachers_Training;
  const pupilTeacherRatioData = teacherData.Pupil_Teacher_Ratio_Primary;

  const getPupilTeacherRatioNote = () => {
    // Check if pupilTeacherRatioData is an object and if it has a note property
    if (pupilTeacherRatioData && typeof pupilTeacherRatioData === 'object' && 'note' in pupilTeacherRatioData) {
      return pupilTeacherRatioData.note;
    }
    return "";
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" ref={mainRef}>
      <Header />

      <main className="flex-grow">
        {/* Animated background shapes */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-zambia-500/20 to-blue-500/10 blur-3xl"
            style={{ y: backgroundY }}
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 0.95, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-amber-500/10 to-zambia-500/20 blur-3xl"
            style={{ y: backgroundY }}
            animate={{ 
              rotate: [0, -5, 5, 0],
              scale: [1, 0.95, 1.05, 1]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Hero section */}
        <Hero />

        {/* Data highlights section */}
        <DataHighlights />

        {/* Sector tiles */}
        <SectorTiles />

        {/* Featured insights */}
        <FeaturedInsights />

        {/* Data visualization */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <div className="inline-block mb-4">
                <div className="flex items-center justify-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
                  <LineChartIcon size={16} />
                  <span>Interactive Data</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Data Visualizer
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Explore dynamic visualizations of key development metrics for Zambia
              </p>
            </div>
            
            <DataVisualizer className="max-w-4xl mx-auto" />
          </div>
        </section>

        {/* Education statistics */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-block mb-4">
                <div className="flex items-center justify-center space-x-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-full text-sm font-medium">
                  <School size={16} />
                  <span>Education Data</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Education Statistics
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                A comprehensive look at Zambia's education metrics from 2020-2024
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Book className="h-5 w-5 text-amber-500 mr-2" />
                    <h3 className="text-lg font-semibold">Literacy & Enrollment</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Adult Literacy Rate (2024)</span>
                        <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                          {literacyData.Adult_Literacy_Rate_percent["2024"]}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Youth Literacy (15-24)</span>
                        <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                          {literacyData.Youth_Literacy_Rate_15_24_percent["2024"]}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '89.5%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Primary Enrollment</span>
                        <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                          {literacyData.Primary_School_Enrollment_Rate_percent["2024"]}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '93%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Secondary Enrollment</span>
                        <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                          {literacyData.Secondary_School_Enrollment_Rate_percent["2024"]}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '48.5%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <FileBarChart className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-semibold">Teachers & Resources</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Pupil-Teacher Ratio (Primary)</span>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {pupilTeacherRatioData["2024"]}
                        </span>
                      </div>
                      {getPupilTeacherRatioNote() && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-1">{getPupilTeacherRatioNote()}</p>
                      )}
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Trained Primary Teachers</span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {teacherData.Percent_of_Trained_Primary_Teachers["2024"]}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Education Budget (% of GDP)</span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {educationStatistics.Zambia_Education_Statistics_2020_2024.Budget_Investment.Education_Budget_percent_of_GDP["2024"]}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-2">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Education Budget (USD)</span>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        ${educationStatistics.Zambia_Education_Statistics_2020_2024.Budget_Investment.Education_Budget_USD_billions["2024"]} billion
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Link to="/explore/education">
                <Button className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600">
                  View Detailed Education Data
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured provinces */}
        <FeaturedProvinces />

        {/* Email signup */}
        <EmailSignup />

        {/* Call to action */}
        <motion.section 
          className="py-20 bg-gradient-to-br from-zambia-600 to-blue-700 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute w-96 h-96 rounded-full bg-white opacity-5 top-20 left-0"
              animate={{ 
                x: [0, 30, 0], 
                y: [0, -30, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute w-64 h-64 rounded-full bg-white opacity-5 bottom-10 right-20"
              animate={{ 
                x: [0, -20, 0], 
                y: [0, 20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute w-32 h-32 rounded-full bg-white opacity-10 top-40 right-40"
              animate={{ 
                x: [0, 10, 0], 
                y: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Explore the Rich Data of 
              <br className="hidden md:block" />
              <span className="inline-block mt-2">Zambia's Provinces</span>
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Dive into comprehensive datasets, interactive visualizations, and insightful analyses
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/provinces">
                <Button 
                  className="px-8 py-6 bg-white hover:bg-gray-100 text-zambia-600 rounded-xl shadow-md hover:shadow-xl transform transition-transform hover:-translate-y-1 text-lg font-medium"
                >
                  View All Provinces
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button 
                  variant="outline"
                  className="px-8 py-6 border-white hover:bg-white/10 text-white rounded-xl shadow-md hover:shadow-xl transform transition-transform hover:-translate-y-1 text-lg font-medium"
                >
                  Explore All Data
                  <Database size={20} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
      
      {showChatbot && (
        <div className="fixed bottom-4 right-4 z-50 w-96">
          <AIChatbot />
        </div>
      )}
      
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-zambia-600 to-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        aria-label={showChatbot ? "Close chatbot" : "Open chatbot"}
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default Index;
