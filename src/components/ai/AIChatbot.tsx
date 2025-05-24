
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, BarChart3, User, Loader2, X, TrendingUp, MapPin } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const AIChatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your Zambia Data Analyst. I can help you understand economic indicators, provincial statistics, health metrics, education data, and development trends across Zambia. What would you like to explore?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Suggested questions for quick start
  const suggestedQuestions = [
    "What are Zambia's current economic indicators?",
    "Compare education statistics between provinces",
    "Show me health metrics for rural areas",
    "What's the trend in copper production?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      // Get messages for context - exclude the welcome message
      const messageHistory = messages
        .filter(msg => msg.id !== "welcome")
        .slice(-8); // Limit context to last 8 messages for focused analysis
      
      // Call our enhanced Supabase Edge Function
      const { data, error } = await supabase.functions.invoke("ai-chat", {
        body: { 
          input: input,
          messageHistory: messageHistory
        }
      });
      
      if (error) {
        console.error("Error calling Zambia AI chat function:", error);
        throw new Error(error.message);
      }
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "I'm sorry, I couldn't analyze that data at the moment.",
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error in Zambia data analysis:", error);
      
      toast({
        title: "Analysis Error",
        description: "Failed to process your data inquiry. Please try again.",
        variant: "destructive"
      });
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "I encountered an error while analyzing the data. Please try rephrasing your question or ask about a specific economic indicator, province, or development metric.",
        sender: "bot",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Component for floating chat button
  const FloatingChatButton = () => (
    <Button
      onClick={() => setIsOpen(true)} 
      className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg bg-zambia-600 hover:bg-zambia-700 text-white p-0 z-50 flex items-center justify-center"
    >
      <BarChart3 size={24} />
    </Button>
  );

  return (
    <>
      <FloatingChatButton />
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 w-full sm:max-w-md max-h-[80vh] border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
          <DialogHeader className="bg-gradient-to-r from-zambia-600 to-green-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm">
                <BarChart3 size={16} />
              </div>
              <div className="flex-1">
                <DialogTitle className="font-semibold">Zambia Data Analyst</DialogTitle>
                <p className="text-xs text-white/80">Economic & Development Insights</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)} 
                className="rounded-full h-8 w-8 bg-white/10 hover:bg-white/20 text-white"
              >
                <X size={16} />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800/50 max-h-[calc(80vh-180px)]">
            {/* Suggested questions for first-time users */}
            {messages.length === 1 && (
              <div className="mb-4 space-y-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Try asking about:</p>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="block w-full text-left text-xs p-2 bg-white dark:bg-gray-700 rounded border hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex gap-2">
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-zambia-500 to-green-500 flex items-center justify-center text-white flex-shrink-0 mt-1">
                        <BarChart3 size={16} />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-xl ${
                        message.sender === 'user'
                          ? 'bg-zambia-100 dark:bg-zambia-900/50 text-gray-800 dark:text-white rounded-tr-none'
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm rounded-tl-none'
                      }`}
                    >
                      {message.text}
                      <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-gray-500' : 'text-gray-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-zambia-600 flex items-center justify-center text-white flex-shrink-0 mt-1">
                        <User size={14} />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex mb-4 justify-start"
                >
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-zambia-500 to-green-500 flex items-center justify-center text-white flex-shrink-0 mt-1">
                      <BarChart3 size={16} />
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm rounded-tl-none min-w-[60px]">
                      <div className="flex gap-1 items-center">
                        <div className="h-2 w-2 bg-gray-300 dark:bg-gray-500 rounded-full animate-pulse" />
                        <div className="h-2 w-2 bg-gray-300 dark:bg-gray-500 rounded-full animate-pulse delay-100" />
                        <div className="h-2 w-2 bg-gray-300 dark:bg-gray-500 rounded-full animate-pulse delay-200" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>
          
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Zambian data, statistics, or trends..."
                className="flex-grow"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="bg-zambia-600 hover:bg-zambia-700 text-white"
                disabled={isTyping || !input.trim()}
              >
                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              AI-powered Zambia data analysis
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIChatbot;
