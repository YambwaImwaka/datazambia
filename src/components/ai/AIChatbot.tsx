
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Loader2 } from "lucide-react";

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
      text: "Hello! I'm Zambia Data AI Assistant. Ask me about economic indicators, health statistics, or any data about Zambia's provinces.",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
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
    
    // Simulate AI response based on user input
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };
  
  const generateBotResponse = (query: string): string => {
    const normalizedQuery = query.toLowerCase();
    
    if (normalizedQuery.includes("gdp") || normalizedQuery.includes("economic growth")) {
      return "Zambia's nominal GDP in 2023 was $29.2 billion with a growth rate of 4.7%, according to the World Bank and IMF data.";
    }
    
    if (normalizedQuery.includes("inflation")) {
      return "The inflation rate in Zambia as of May 2024 was 13.8%, as reported by ZamStats.";
    }
    
    if (normalizedQuery.includes("population") || normalizedQuery.includes("people")) {
      return "Zambia's population in 2024 is estimated at 20.9 million, according to UN data.";
    }
    
    if (normalizedQuery.includes("copper") || normalizedQuery.includes("mining")) {
      return "Copper production in 2023 was 763,000 metric tons, accounting for 70% of Zambia's exports. Copper reserves are estimated at 20 million tons.";
    }
    
    if (normalizedQuery.includes("health") || normalizedQuery.includes("life expectancy")) {
      return "Life expectancy in Zambia has increased to 64.0 years in 2024. The maternal mortality ratio has declined to 210 per 100,000 births.";
    }
    
    if (normalizedQuery.includes("hiv") || normalizedQuery.includes("aids")) {
      return "HIV prevalence among adults (15-49 years) in Zambia was 11.1% in 2023, showing a decreasing trend. PMTCT coverage has increased to 90% in 2024.";
    }
    
    if (normalizedQuery.includes("malaria")) {
      return "There were approximately 5.3 million malaria cases in Zambia in 2024. ITN (Insecticide-Treated Net) coverage is at 63%.";
    }
    
    return "I don't have specific information about that yet. I can answer questions about Zambia's GDP, population, health statistics, mining, and other economic indicators.";
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[500px]">
      <div className="bg-gradient-to-r from-zambia-600 to-blue-600 p-4 text-white flex items-center gap-3">
        <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Bot size={16} />
        </div>
        <div>
          <h3 className="font-semibold">Zambia Data AI Assistant</h3>
          <p className="text-xs text-white/80">Ask about Zambia's statistics and data</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800/50">
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-zambia-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0 mt-1">
                    <Bot size={16} />
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-zambia-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0 mt-1">
                  <Bot size={16} />
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
            placeholder="Ask about Zambia's data..."
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
          This is a demo. In a full implementation, this would connect to an AI service.
        </p>
      </form>
    </div>
  );
};

export default AIChatbot;
