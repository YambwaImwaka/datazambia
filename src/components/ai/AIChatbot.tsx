import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Loader2, X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

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
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      // Hardcoded OpenAI API call
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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` // Replace with your actual API key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant providing data about Zambia." },
            { role: "user", content: input }
          ],
          max_tokens: 100
        })
      });

      const data = await response.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.choices?.[0]?.message?.content || "I'm sorry, I couldn't understand that.",
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "There was an error processing your request. Please try again later.",
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
      <Bot size={24} />
    </Button>
  );

  return (
    <>
      <FloatingChatButton />
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 w-full sm:max-w-md max-h-[80vh] border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
          <DialogHeader className="bg-gradient-to-r from-zambia-600 to-blue-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot size={16} />
              </div>
              <div className="flex-1">
                <DialogTitle className="font-semibold">Zambia Data AI Assistant</DialogTitle>
                <p className="text-xs text-white/80">Ask about Zambia's statistics and data</p>
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
          
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800/50 max-h-[calc(80vh-140px)]">
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
              Powered by OpenAI
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIChatbot;
