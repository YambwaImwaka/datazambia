
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-zambia-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">ZI</span>
              </div>
              <span className="font-display font-bold text-xl text-gray-900 dark:text-white">
                Zambia Insight
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Comprehensive data visualization platform for Zambia's provinces, providing insights into health, education, economy, and more.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-zambia-100 hover:text-zambia-600">
                <Facebook size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-zambia-100 hover:text-zambia-600">
                <Twitter size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-zambia-100 hover:text-zambia-600">
                <Instagram size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-zambia-100 hover:text-zambia-600">
                <Youtube size={18} />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore/overview" className="text-sm text-gray-600 dark:text-gray-400 hover:text-zambia-600">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/explore/health" className="text-sm text-gray-600 dark:text-gray-400 hover:text-zambia-600">
                  Health
                </Link>
              </li>
              <li>
                <Link to="/explore/education" className="text-sm text-gray-600 dark:text-gray-400 hover:text-zambia-600">
                  Education
                </Link>
              </li>
              <li>
                <Link to="/explore/agriculture" className="text-sm text-gray-600 dark:text-gray-400 hover:text-zambia-600">
                  Agriculture
                </Link>
              </li>
              <li>
                <Link to="/explore/economy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-zambia-600">
                  Economy
                </Link>
              </li>
              <li>
                <Link to="/explore/infrastructure" className="text-sm text-gray-600 dark:text-gray-400 hover:text-zambia-600">
                  Infrastructure
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Provinces
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/province/lusaka" className="text-sm text-gray-600 dark:text-gray-400 hover:text-zambia-600">
                  Lusaka
                </Link>
              </li>
              <li>
                <Link to="/province/copperbelt" className="text-sm text-gray-600 dark:text-gray-400 hover:text-zambia-600">
                  Copperbelt
                </Link>
              </li>
              <li>
                <Link to="/province/central" className="text-sm text-gray-600 dark:text-gray-400 hover:text-zambia-600">
                  Central
                </Link>
              </li>
              <li>
                <Link to="/province/eastern" className="text-sm text-gray-600 dark:text-gray-400 hover:text-zambia-600">
                  Eastern
                </Link>
              </li>
              <li>
                <Link to="/province/southern" className="text-sm text-gray-600 dark:text-gray-400 hover:text-zambia-600">
                  Southern
                </Link>
              </li>
              <li>
                <Link to="/provinces" className="text-sm text-zambia-600 font-medium">
                  View all provinces →
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Subscribe
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white border-gray-200"
                />
                <Button className="bg-zambia-600 hover:bg-zambia-700">
                  <Mail size={16} className="mr-2" />
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © 2023 Zambia Insight. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-500 dark:text-gray-500 hover:text-zambia-600">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 dark:text-gray-500 hover:text-zambia-600">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-sm text-gray-500 dark:text-gray-500 hover:text-zambia-600">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
