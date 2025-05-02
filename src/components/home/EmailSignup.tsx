
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, MapPin, Tree } from "lucide-react";
import { toast } from "sonner";

const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setLoading(true);
    
    // In a real implementation, this would connect to MailChimp API
    // This is a mockup for demonstration
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
      toast.success("Thank you for subscribing to our newsletter!");
    }, 1500);
  };

  return (
    <motion.section 
      className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-zambia-500/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-blue-500/10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Map Pin icons floating */}
        <div className="absolute top-20 left-1/4 opacity-30">
          <motion.div
            animate={{ y: [0, -15, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          >
            <MapPin size={32} className="text-zambia-500" />
          </motion.div>
        </div>
        
        <div className="absolute bottom-32 right-1/4 opacity-30">
          <motion.div
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          >
            <Tree size={40} className="text-green-500" />
          </motion.div>
        </div>
        
        {/* Data points decoration */}
        <div className="hidden md:block">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-blue-500"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                opacity: 0.4,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-zambia-100 to-blue-100 dark:from-zambia-900/50 dark:to-blue-900/50 flex items-center justify-center">
              <Mail className="h-8 w-8 text-zambia-600 dark:text-zambia-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated with Zambia's Latest Data
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Subscribe to our newsletter to receive regular updates on economic indicators, 
              provincial developments, and AI-powered insights about Zambia.
            </p>
          </div>
          
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow h-12 dark:bg-gray-800 focus-visible:ring-zambia-500 shadow-sm"
                  required
                  aria-label="Email address"
                />
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="h-12 px-6 bg-gradient-to-r from-zambia-500 to-blue-600 hover:from-zambia-600 hover:to-blue-700 text-white font-medium transition-all shadow-sm"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              <motion.p 
                className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                We respect your privacy. Unsubscribe at any time.
              </motion.p>
            </form>
          ) : (
            <motion.div 
              className="text-center py-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Thank you for subscribing!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                You've been added to our mailing list and will receive updates soon.
              </p>
              <Button 
                variant="ghost"
                className="mt-4 text-zambia-600 hover:text-zambia-700 dark:text-zambia-400 dark:hover:text-zambia-300"
                onClick={() => setSubscribed(false)}
              >
                Subscribe another email
              </Button>
            </motion.div>
          )}
        </div>
        
        {/* Benefits of subscribing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-10">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-start">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
              <Mail size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Monthly Insights</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">Regular data updates and provincial reports</p>
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-start">
            <div className="bg-zambia-100 dark:bg-zambia-900/30 p-2 rounded-full mr-3">
              <MapPin size={18} className="text-zambia-600 dark:text-zambia-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Regional Analysis</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">In-depth coverage of specific provinces</p>
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-start">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
              <Tree size={18} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Development Updates</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">Projects and initiatives across Zambia</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default EmailSignup;
