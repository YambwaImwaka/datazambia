
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative mx-auto w-32 h-32 mb-4">
            <div className="absolute inset-0 bg-zambia-100 dark:bg-zambia-900/30 rounded-full" />
            <div className="absolute inset-4 bg-zambia-200 dark:bg-zambia-800/50 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-12 w-12 text-zambia-600 dark:text-zambia-400" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Page Not Found</p>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <Button asChild className="w-full">
            <Link to="/">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            If you think this is an error, please{" "}
            <Link to="/contact" className="text-zambia-600 dark:text-zambia-400 hover:underline">
              contact support
            </Link>
            .
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
