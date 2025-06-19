
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart, Share2, PieChart, Users, Database, MapPin, Heart, Eye, Shield, Lightbulb, Zap } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                About Data Zambia
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                Data for Decisions. Insight for Impact.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Providing comprehensive data visualization and insights for Zambia's provinces to support informed decision-making.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-zambia-600 hover:bg-zambia-700">
                  Explore Data
                </Button>
                
                <Button variant="outline">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Our Story
              </h2>
              
              <div className="prose prose-lg mx-auto text-gray-600 dark:text-gray-300">
                <p className="text-xl leading-relaxed mb-6">
                  Data Zambia is more than a platform—it's a movement.
                </p>
                
                <p className="leading-relaxed mb-6">
                  Born out of the belief that data should be a public good, we exist to transform numbers into action, and insights into impact. Our mission is to equip Zambians—from government to grassroots—with the information they need to make better decisions, build stronger communities, and shape a more inclusive future.
                </p>
                
                <p className="leading-relaxed mb-6">
                  Whether you're a policymaker, journalist, farmer, or student, Data Zambia gives you the tools and knowledge to answer one question: <strong>What does the data say?</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision & Values Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                Mission, Vision & Values
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-zambia-100 text-zambia-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                      Mission
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      To make Zambian data open, understandable, and actionable for everyone—from decision-makers to citizens.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Eye size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                      Vision
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      A Zambia where data powers transparency, development, and opportunity for all.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Core Values
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Transparency
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        We believe data should be open and accessible.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Inclusiveness
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Every Zambian has the right to understand and use data.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Empowerment
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        We don't just show numbers; we help people use them.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Accountability
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        We hold ourselves and others to evidence-based action.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lightbulb size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Innovation
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        We bring data to life with clarity, creativity, and modern tools.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="py-16 bg-gradient-to-br from-zambia-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Success Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center">
                Chip-In Foundation — Using Data to Secure Funding for Malnutrition Programs
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        The Challenge
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Chip-In Foundation, a nonprofit fighting child malnutrition in Zambia, struggled to secure funding without strong data to back their proposals. Donors wanted evidence—clear numbers showing where help was needed most.
                      </p>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        The Solution
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Using Data Zambia's Nutrition Dashboard, the foundation identified high-risk districts in Luapula Province and included visual data on stunting rates and health access in their revised funding application.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="bg-white dark:bg-gray-900 border-l-4 border-zambia-500">
                    <CardContent className="p-8">
                      <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
                        "We had the passion—but needed the proof. Data Zambia helped us turn our goals into a fundable, evidence-based project. Now our programs are smarter, faster, and more impactful."
                      </blockquote>
                      <footer className="text-sm font-medium text-zambia-600 dark:text-zambia-400">
                        — Dr. Namoonga Chimpandu, Founder, Chip-In Foundation
                      </footer>
                    </CardContent>
                  </Card>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Featured Tools Used:
                    </h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-zambia-500 rounded-full mr-3"></span>
                        Data Zambia Health Dashboard
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-zambia-500 rounded-full mr-3"></span>
                        District Stunting Heatmap
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-zambia-500 rounded-full mr-3"></span>
                        Nutrition Facility Locator
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Card className="bg-gradient-to-r from-zambia-500/10 to-blue-500/10 dark:from-zambia-500/20 dark:to-blue-500/20">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Why It Matters
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Chip-In Foundation's success shows how open data isn't just numbers on a screen—it's a lifeline. When civil society is equipped with real-time, localized data, they can act faster and smarter to serve Zambia's most vulnerable populations.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* What We Offer Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                What We Offer
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Comprehensive tools and resources to explore Zambia's provincial data
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-zambia-100 text-zambia-600 rounded-full flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Provincial Profiles
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Detailed profiles for each of Zambia's 10 provinces, including demographics, economy, health, education, and more.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-zambia-100 text-zambia-600 rounded-full flex items-center justify-center">
                    <PieChart size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Interactive Visualizations
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Dynamic charts, maps, and graphs that allow users to explore data patterns and trends across different metrics.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-zambia-100 text-zambia-600 rounded-full flex items-center justify-center">
                    <Database size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Data Downloads
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Access to raw data in various formats (CSV, JSON, Excel) for further analysis and research purposes.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-zambia-100 text-zambia-600 rounded-full flex items-center justify-center">
                    <Users size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Comparative Analysis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tools to compare different provinces across various metrics and timeframes to identify patterns and disparities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-zambia-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Explore Zambia's Data?
            </h2>
            
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Dive into comprehensive datasets, interactive visualizations, and detailed provincial profiles.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/explore">
                <Button className="bg-white text-zambia-600 hover:bg-gray-100 h-12 px-8">
                  Start Exploring
                </Button>
              </Link>
              
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 h-12 px-8">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
