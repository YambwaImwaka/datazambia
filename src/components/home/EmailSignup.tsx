
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
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
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-zambia-500/5"
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
          className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-blue-500/5"
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
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="mb-6 w-16 h-16 rounded-full bg-zambia-100 dark:bg-zambia-900/50 flex items-center justify-center">
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
                  className="flex-grow h-12 dark:bg-gray-800 focus-visible:ring-zambia-500"
                  required
                  aria-label="Email address"
                />
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="h-12 px-6 bg-zambia-600 hover:bg-zambia-700 text-white font-medium transition-all"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
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
      </div>
    </motion.section>
  );
};

export default EmailSignup;
