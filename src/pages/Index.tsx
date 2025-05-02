import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Landmark, ChevronRight, Database, Globe, MessageCircle, Brain } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import KeyMetrics from "@/components/home/KeyMetrics";
import FeaturedProvinces from "@/components/home/FeaturedProvinces";
import LineChart from "@/components/charts/LineChart";
import WeatherSection from "@/components/home/WeatherSection";
import { provinces } from "@/utils/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import EmailSignup from "@/components/home/EmailSignup";
import { motion, useScroll, useTransform } from "framer-motion";
import AIChatbot from "@/components/ai/AIChatbot";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  
  // Refs for scroll animations
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"]
  });
  
  // Transform values for parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
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

        <Hero />

        <WeatherSection />

        <KeyMetrics />

        <FeaturedProvinces />

        <motion.section 
          className="py-20 bg-white dark:bg-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <motion.div 
                className="inline-block mb-4 relative overflow-hidden"
                variants={fadeInUpVariants}
                custom={0}
              >
                <div className="flex items-center justify-center space-x-2 bg-zambia-50 dark:bg-zambia-900/30 text-zambia-600 dark:text-zambia-400 px-4 py-2 rounded-full text-sm font-medium">
                  <Brain size={18} className="animate-pulse" />
                  <span>AI-Powered Insights</span>
                </div>
                <motion.div 
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-zambia-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 relative"
                variants={fadeInUpVariants}
                custom={1}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-zambia-600 to-blue-600">
                  Data Insights
                </span>
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300"
                variants={fadeInUpVariants}
                custom={2}
              >
                Explore Zambia's development through AI-enhanced indicators and metrics
              </motion.p>
            </div>

            <Tabs
              defaultValue="overview"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <div className="flex justify-center mb-8">
                <TabsList className="bg-gradient-to-r from-gray-100/80 to-gray-100 dark:from-gray-800/80 dark:to-gray-800 p-1 shadow-sm">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 transition-all"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="economic"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 transition-all"
                  >
                    Economic
                  </TabsTrigger>
                  <TabsTrigger
                    value="social"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 transition-all"
                  >
                    Social
                  </TabsTrigger>
                  <TabsTrigger
                    value="environmental"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 transition-all"
                  >
                    Environmental
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="mt-0">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <motion.div 
                    className="md:col-span-3 text-center p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg relative overflow-hidden"
                    variants={fadeInUpVariants}
                    custom={0}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-zambia-500/5 to-blue-500/5" />
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.3, 0.1]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Zambia at a Glance</h3>
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                      Explore comprehensive data showcasing Zambia's economic growth, social development, 
                      and environmental sustainability through interactive visualizations and AI-powered insights.
                    </p>
                    <Button variant="link" className="mt-4 text-zambia-600 font-medium hover:text-zambia-700">
                      Learn more <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </motion.div>
                  
                  {/* AI-Powered Forecasting Preview */}
                  <motion.div
                    className="col-span-1 md:col-span-1 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md"
                    variants={fadeInUpVariants}
                    custom={1}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-zambia-100 dark:bg-zambia-900/50 flex items-center justify-center text-zambia-600 dark:text-zambia-400 mr-3">
                        <Brain size={20} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Forecasting</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Predictive analytics powered by AI models forecasting GDP growth, inflation, and key metrics.
                    </p>
                    <div className="h-32 bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center justify-center mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Interactive forecast charts coming soon</p>
                    </div>
                    <Button variant="outline" className="w-full text-sm">View Forecasts</Button>
                  </motion.div>
                  
                  {/* Automated Insights Preview */}
                  <motion.div
                    className="col-span-1 md:col-span-1 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md"
                    variants={fadeInUpVariants}
                    custom={2}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                        <Database size={20} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Insights</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Auto-generated summaries and trends highlighting key changes in Zambia's economic landscape.
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="text-xs bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-gray-700 dark:text-gray-300">
                        Inflation decreased by 0.4% in the last quarter, showing economic stabilization.
                      </li>
                      <li className="text-xs bg-green-50 dark:bg-green-900/20 p-2 rounded text-gray-700 dark:text-gray-300">
                        Agricultural output increased 7.3% year-over-year, driven by improved rainfall.
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full text-sm">View All Insights</Button>
                  </motion.div>
                  
                  {/* Smart Reports Preview */}
                  <motion.div
                    className="col-span-1 md:col-span-1 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md"
                    variants={fadeInUpVariants}
                    custom={3}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400 mr-3">
                        <Globe size={20} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Smart Reports</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      AI-generated reports with clear explanations of complex economic and social trends.
                    </p>
                    <div className="h-32 bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center justify-center mb-4 p-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        Comprehensive reports that transform raw data into meaningful narratives about Zambia's development
                      </p>
                    </div>
                    <Button variant="outline" className="w-full text-sm">Generate Report</Button>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="economic" className="mt-0">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <motion.div 
                    variants={fadeInUpVariants}
                    custom={0}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/90 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-zambia-500/10 to-transparent rounded-bl-3xl" />
                      <div className="flex items-center mb-4 relative">
                        <Landmark className="h-6 w-6 text-zambia-500 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Banking & Finance
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 relative">
                        Explore financial indicators, exchange rates, and banking metrics across Zambia.
                      </p>
                      <Link to="/explore/finance" className="text-zambia-600 hover:text-zambia-700 font-medium flex items-center group">
                        <span className="relative">
                          View Details
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-zambia-500 group-hover:w-full transition-all duration-300" />
                        </span>
                        <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Card>
                  </motion.div>

                  <motion.div 
                    variants={fadeInUpVariants}
                    custom={1}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/90 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-3xl" />
                      <div className="flex items-center mb-4 relative">
                        <Globe className="h-6 w-6 text-blue-500 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Trade & Investment
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 relative">
                        Analyze trade flows, foreign direct investments, and economic partnerships.
                      </p>
                      <Link to="/explore/trade" className="text-blue-600 hover:text-blue-700 font-medium flex items-center group">
                        <span className="relative">
                          View Details
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                        </span>
                        <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Card>
                  </motion.div>

                  <motion.div 
                    variants={fadeInUpVariants}
                    custom={2}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/90 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-3xl" />
                      <div className="flex items-center mb-4 relative">
                        <Database className="h-6 w-6 text-amber-500 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Industry Analysis
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 relative">
                        Discover performance metrics across various industry sectors in Zambia.
                      </p>
                      <Link to="/explore/industry" className="text-amber-600 hover:text-amber-700 font-medium flex items-center group">
                        <span className="relative">
                          View Details
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
                        </span>
                        <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="social" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Education Metrics
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Literacy Rate</span>
                        <span className="font-medium text-gray-900 dark:text-white">86.7%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Primary School Enrollment</span>
                        <span className="font-medium text-gray-900 dark:text-white">94.2%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Secondary School Enrollment</span>
                        <span className="font-medium text-gray-900 dark:text-white">68.5%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Tertiary Education</span>
                        <span className="font-medium text-gray-900 dark:text-white">23.1%</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link to="/explore/education" className="text-zambia-600 hover:text-zambia-700 font-medium flex items-center">
                        View More Education Data
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Healthcare Indicators
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Life Expectancy</span>
                        <span className="font-medium text-gray-900 dark:text-white">63.5 years</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Infant Mortality Rate</span>
                        <span className="font-medium text-gray-900 dark:text-white">42.7 per 1,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Healthcare Access</span>
                        <span className="font-medium text-gray-900 dark:text-white">67.3%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Vaccination Coverage</span>
                        <span className="font-medium text-gray-900 dark:text-white">76.8%</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link to="/explore/health" className="text-zambia-600 hover:text-zambia-700 font-medium flex items-center">
                        View More Health Data
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="environmental" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Environmental Indicators
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Biodiversity</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Zambia hosts over 8,017 species of plants, 224 mammal species, and 757 bird species, with 4 national parks designated as UNESCO World Heritage sites.
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Forest Coverage</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Forests cover approximately 60% of Zambia's total land area, though deforestation occurs at a rate of 0.5% annually due to agriculture and charcoal production.
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Water Resources</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          The country possesses 40% of Central and Southern Africa's water resources, with the Zambezi River Basin being crucial for hydropower generation and agriculture.
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Climate Change</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Zambia has experienced a 1.3°C increase in temperature since 1960, with more frequent droughts and floods affecting agriculture and water availability.
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Sustainable Development
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Renewable Energy</span>
                        <span className="font-medium text-gray-900 dark:text-white">85.9%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Clean Water Access</span>
                        <span className="font-medium text-gray-900 dark:text-white">72.3%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">CO₂ Emissions</span>
                        <span className="font-medium text-gray-900 dark:text-white">0.2 tons per capita</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Protected Areas</span>
                        <span className="font-medium text-gray-900 dark:text-white">37.8%</span>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <Link to="/explore/environment" className="text-zambia-600 hover:text-zambia-700 font-medium flex items-center">
                        View Environmental Data
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.section>

        <EmailSignup />

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
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x
