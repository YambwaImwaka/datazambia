
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart, Share2, PieChart, Users, Database, MapPin } from "lucide-react";
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
                About Zambia Insight
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
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
        
        {/* Mission Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Our Mission
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
                To provide accessible, accurate, and comprehensive data on Zambia's provinces, enabling policymakers, researchers, businesses, and citizens to make informed decisions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-zambia-100 text-zambia-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Database size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Data Collection
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Gathering accurate and reliable data from various sources across Zambia.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-zambia-100 text-zambia-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Visualization
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Transforming complex data into clear, interactive visualizations.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-zambia-100 text-zambia-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Share2 size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Accessibility
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Making data freely accessible to support research and decision-making.
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
        
        {/* Our Team Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Team
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300">
                A dedicated group of data scientists, developers, and researchers committed to providing valuable insights about Zambia
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mx-auto mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  John Mulenga
                </h3>
                <p className="text-sm text-zambia-600 mb-2">
                  Founder & Data Scientist
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Expert in data analysis and visualization with 10+ years experience.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mx-auto mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Sarah Banda
                </h3>
                <p className="text-sm text-zambia-600 mb-2">
                  Lead Developer
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Full-stack developer specializing in data-driven applications.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mx-auto mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  David Chilufya
                </h3>
                <p className="text-sm text-zambia-600 mb-2">
                  Research Director
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  PhD in Economics with focus on developmental metrics.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mx-auto mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Grace Tembo
                </h3>
                <p className="text-sm text-zambia-600 mb-2">
                  Data Analyst
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Specialist in provincial comparative data analysis.
                </p>
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
