
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart, Share2, PieChart, Users, Database, MapPin, Heart, Eye, Shield, Lightbulb, Zap, ChevronRight, Sparkles, TrendingUp, Target, Award } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="flex-grow pt-20 relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-zambia-200/30 to-zambia-300/30 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-purple-300/30 rounded-full blur-xl animate-float-slow"></div>
          <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-orange-200/30 to-red-300/30 rounded-full blur-xl animate-float-medium"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-green-200/30 to-teal-300/30 rounded-full blur-xl animate-float"></div>
        </div>

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-5xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="mb-8">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-zambia-100 to-blue-100 dark:from-zambia-900/50 dark:to-blue-900/50 text-zambia-700 dark:text-zambia-300 px-6 py-3 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                  <Sparkles size={16} className="animate-pulse" />
                  <span>Transforming Data into Impact</span>
                </div>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-zambia-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight"
              >
                About Data Zambia
              </motion.h1>
              
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-zambia-500/20 to-blue-500/20 blur-3xl"></div>
                <p className="relative text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  Data for Decisions. Insight for Impact.
                </p>
              </motion.div>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                Providing comprehensive data visualization and insights for Zambia's provinces to support informed decision-making across all sectors of society.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-6"
              >
                <Button className="bg-gradient-to-r from-zambia-600 to-zambia-700 hover:from-zambia-700 hover:to-zambia-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Database className="mr-2" size={20} />
                  Explore Data
                </Button>
                
                <Button variant="outline" className="border-2 border-zambia-300 text-zambia-700 dark:text-zambia-300 hover:bg-zambia-50 dark:hover:bg-zambia-900/20 px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm">
                  <Heart className="mr-2" size={20} />
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-zambia-50/50 via-transparent to-blue-50/50 dark:from-zambia-900/20 dark:via-transparent dark:to-blue-900/20"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <Sparkles size={16} />
                  <span>Our Journey</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Our Story
                </h2>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={itemVariants}>
                  <Card className="bg-gradient-to-br from-white/80 to-zambia-50/80 dark:from-gray-800/80 dark:to-zambia-900/80 backdrop-blur-sm border-0 shadow-2xl">
                    <CardContent className="p-10">
                      <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                        <p className="text-2xl font-semibold text-zambia-700 dark:text-zambia-300">
                          Data Zambia is more than a platform—it's a movement.
                        </p>
                        
                        <p>
                          Born out of the belief that data should be a public good, we exist to transform numbers into action, and insights into impact. Our mission is to equip Zambians—from government to grassroots—with the information they need to make better decisions, build stronger communities, and shape a more inclusive future.
                        </p>
                        
                        <div className="bg-gradient-to-r from-zambia-100 to-blue-100 dark:from-zambia-900/50 dark:to-blue-900/50 p-6 rounded-xl border border-zambia-200/50 dark:border-zambia-700/50">
                          <p className="font-semibold text-zambia-800 dark:text-zambia-200">
                            Whether you're a policymaker, journalist, farmer, or student, Data Zambia gives you the tools and knowledge to answer one question: <span className="text-zambia-600 dark:text-zambia-400">What does the data say?</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-br from-zambia-100 to-zambia-200 dark:from-zambia-800 dark:to-zambia-900 border-0 hover:scale-105 transition-transform duration-300">
                      <CardContent className="p-6 text-center">
                        <Users className="h-12 w-12 text-zambia-600 mx-auto mb-3" />
                        <h4 className="font-bold text-zambia-800 dark:text-zambia-200">10+ Provinces</h4>
                        <p className="text-sm text-zambia-600 dark:text-zambia-400">Comprehensive Coverage</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 border-0 hover:scale-105 transition-transform duration-300">
                      <CardContent className="p-6 text-center">
                        <Database className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                        <h4 className="font-bold text-blue-800 dark:text-blue-200">Real-time Data</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400">Live Updates</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 border-0 hover:scale-105 transition-transform duration-300">
                      <CardContent className="p-6 text-center">
                        <BarChart className="h-12 w-12 text-green-600 mx-auto mb-3" />
                        <h4 className="font-bold text-green-800 dark:text-green-200">Visual Analytics</h4>
                        <p className="text-sm text-green-600 dark:text-green-400">Interactive Charts</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900 border-0 hover:scale-105 transition-transform duration-300">
                      <CardContent className="p-6 text-center">
                        <Share2 className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                        <h4 className="font-bold text-purple-800 dark:text-purple-200">Open Access</h4>
                        <p className="text-sm text-purple-600 dark:text-purple-400">Free for All</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission, Vision & Values Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-900/20 dark:via-gray-900 dark:to-purple-900/20"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <Target size={16} />
                  <span>Our Foundation</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mission, Vision & Values
                </h2>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <motion.div variants={itemVariants}>
                  <Card className="h-full bg-gradient-to-br from-zambia-50 via-white to-zambia-100 dark:from-zambia-900/50 dark:via-gray-800 dark:to-zambia-800/50 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                    <CardContent className="p-10 text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zambia-400 to-zambia-600"></div>
                      <div className="w-20 h-20 bg-gradient-to-br from-zambia-100 to-zambia-200 text-zambia-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                        <Heart size={40} />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Mission
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        To make Zambian data open, understandable, and actionable for everyone—from decision-makers to citizens.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Card className="h-full bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-900/50 dark:via-gray-800 dark:to-blue-800/50 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                    <CardContent className="p-10 text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                        <Eye size={40} />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Vision
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        A Zambia where data powers transparency, development, and opportunity for all.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants}>
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Core Values
                  </h3>
                  <div className="w-24 h-1 bg-gradient-to-r from-zambia-400 to-blue-400 mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Shield, title: "Transparency", desc: "We believe data should be open and accessible.", color: "from-green-100 to-green-200 dark:from-green-800 dark:to-green-900", iconColor: "text-green-600" },
                    { icon: Users, title: "Inclusiveness", desc: "Every Zambian has the right to understand and use data.", color: "from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900", iconColor: "text-purple-600" },
                    { icon: Zap, title: "Empowerment", desc: "We don't just show numbers; we help people use them.", color: "from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-900", iconColor: "text-orange-600" },
                    { icon: BarChart, title: "Accountability", desc: "We hold ourselves and others to evidence-based action.", color: "from-red-100 to-red-200 dark:from-red-800 dark:to-red-900", iconColor: "text-red-600" },
                    { icon: Lightbulb, title: "Innovation", desc: "We bring data to life with clarity, creativity, and modern tools.", color: "from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900", iconColor: "text-blue-600" }
                  ].map((value, index) => (
                    <motion.div
                      key={value.title}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="col-span-1 md:col-span-1 lg:col-span-1"
                      style={index === 4 ? { gridColumn: 'lg: 2 / 3' } : {}}
                    >
                      <Card className={`bg-gradient-to-br ${value.color} border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full`}>
                        <CardContent className="p-8 text-center">
                          <div className={`w-16 h-16 bg-white/80 dark:bg-gray-800/80 ${value.iconColor} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                            <value.icon size={32} />
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            {value.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {value.desc}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-zambia-50 via-white to-blue-50 dark:from-zambia-900/20 dark:via-gray-900 dark:to-blue-900/20"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-zambia-100 to-blue-100 dark:from-zambia-900/50 dark:to-blue-900/50 text-zambia-700 dark:text-zambia-300 px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <Award size={16} />
                  <span>Impact Story</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-zambia-600 to-blue-600 bg-clip-text text-transparent">
                  Success Story
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                  Chip-In Foundation — Using Data to Secure Funding for Malnutrition Programs
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <motion.div variants={itemVariants}>
                  <Card className="bg-gradient-to-br from-white/90 to-zambia-50/90 dark:from-gray-800/90 dark:to-zambia-900/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                    <CardContent className="p-10">
                      <div className="space-y-8">
                        <div>
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/50 text-red-600 rounded-full flex items-center justify-center mr-3">
                              <TrendingUp size={16} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              The Challenge
                            </h3>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Chip-In Foundation, a nonprofit fighting child malnutrition in Zambia, struggled to secure funding without strong data to back their proposals. Donors wanted evidence—clear numbers showing where help was needed most.
                          </p>
                        </div>
                        
                        <div className="border-l-4 border-zambia-400 pl-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 text-green-600 rounded-full flex items-center justify-center mr-3">
                              <Lightbulb size={16} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              The Solution
                            </h3>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Using Data Zambia's Nutrition Dashboard, the foundation identified high-risk districts in Luapula Province and included visual data on stunting rates and health access in their revised funding application.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-8">
                  <Card className="bg-gradient-to-br from-zambia-50 to-blue-50 dark:from-zambia-900/50 dark:to-blue-900/50 border-l-4 border-zambia-500 shadow-xl">
                    <CardContent className="p-8">
                      <blockquote className="text-xl text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
                        "We had the passion—but needed the proof. Data Zambia helped us turn our goals into a fundable, evidence-based project. Now our programs are smarter, faster, and more impactful."
                      </blockquote>
                      <footer className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-zambia-400 to-zambia-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">DC</span>
                        </div>
                        <div>
                          <p className="font-semibold text-zambia-700 dark:text-zambia-300">Dr. Namoonga Chimpandu</p>
                          <p className="text-sm text-zambia-600 dark:text-zambia-400">Founder, Chip-In Foundation</p>
                        </div>
                      </footer>
                    </CardContent>
                  </Card>
                  
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                      <Database className="mr-2 text-zambia-600" size={20} />
                      Featured Tools Used:
                    </h4>
                    <div className="space-y-3">
                      {[
                        "Data Zambia Health Dashboard",
                        "District Stunting Heatmap", 
                        "Nutrition Facility Locator"
                      ].map((tool, index) => (
                        <div key={tool} className="flex items-center bg-white/80 dark:bg-gray-800/80 p-4 rounded-xl shadow-sm border border-zambia-100 dark:border-zambia-800 hover:bg-zambia-50/80 dark:hover:bg-zambia-900/30 transition-colors duration-200">
                          <div className="w-3 h-3 bg-gradient-to-r from-zambia-400 to-zambia-600 rounded-full mr-4"></div>
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{tool}</span>
                          <ChevronRight className="ml-auto text-zambia-400" size={16} />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants} className="mt-12">
                <Card className="bg-gradient-to-r from-zambia-50/50 via-white to-blue-50/50 dark:from-zambia-900/30 dark:via-gray-800/50 dark:to-blue-900/30 border-0 shadow-xl">
                  <CardContent className="p-10 text-center">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
                      <Heart className="mr-3 text-red-500" size={24} />
                      Why It Matters
                    </h4>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                      Chip-In Foundation's success shows how open data isn't just numbers on a screen—it's a lifeline. When civil society is equipped with real-time, localized data, they can act faster and smarter to serve Zambia's most vulnerable populations.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* What We Offer Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/50 dark:to-blue-900/50 text-green-700 dark:text-green-300 px-6 py-3 rounded-full text-sm font-medium mb-6">
                  <Database size={16} />
                  <span>Our Platform</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  What We Offer
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Comprehensive tools and resources to explore Zambia's provincial data
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: MapPin, title: "Provincial Profiles", desc: "Detailed profiles for each of Zambia's 10 provinces, including demographics, economy, health, education, and more.", color: "from-zambia-100 to-zambia-200 dark:from-zambia-800 dark:to-zambia-900" },
                  { icon: PieChart, title: "Interactive Visualizations", desc: "Dynamic charts, maps, and graphs that allow users to explore data patterns and trends across different metrics.", color: "from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900" },
                  { icon: Database, title: "Data Downloads", desc: "Access to raw data in various formats (CSV, JSON, Excel) for further analysis and research purposes.", color: "from-green-100 to-green-200 dark:from-green-800 dark:to-green-900" },
                  { icon: Users, title: "Comparative Analysis", desc: "Tools to compare different provinces across various metrics and timeframes to identify patterns and disparities.", color: "from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="flex group"
                  >
                    <div className="flex-shrink-0 mr-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon size={32} className={`${index === 0 ? 'text-zambia-600' : index === 1 ? 'text-blue-600' : index === 2 ? 'text-green-600' : 'text-purple-600'}`} />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-zambia-600 dark:group-hover:text-zambia-400 transition-colors duration-200">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-zambia-600 via-blue-600 to-purple-700"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="container mx-auto px-4 text-center relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
              className="max-w-4xl mx-auto"
            >
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-8 text-white">
                Ready to Explore Zambia's Data?
              </motion.h2>
              
              <motion.p variants={itemVariants} className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed">
                Dive into comprehensive datasets, interactive visualizations, and detailed provincial profiles.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/explore">
                  <Button className="bg-white text-zambia-600 hover:bg-gray-100 h-14 px-10 text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                    <Database className="mr-2" size={20} />
                    Start Exploring
                  </Button>
                </Link>
                
                <Link to="/contact">
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 h-14 px-10 text-lg font-semibold rounded-full backdrop-blur-sm">
                    <Heart className="mr-2" size={20} />
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
