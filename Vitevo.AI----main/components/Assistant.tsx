import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Minimize2, Activity } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { cn } from '../lib/utils';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '您好！我是您的長壽導航者。有什麼生理數據或長壽策略我可以幫您解答的嗎？', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const response = await sendMessageToGemini(history, input);
    
    const modelMsg: ChatMessage = { role: 'model', text: response, timestamp: Date.now() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] hud-panel rounded-3xl border-brand-primary/20 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* HUD Decorative Corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-brand-primary/40 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-brand-primary/40 rounded-tr-2xl" />
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center glow-primary">
                  <Activity className="text-bg-dark w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">長壽導航者</div>
                  <div className="text-[10px] text-brand-primary uppercase tracking-widest font-bold">AI Assistant</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "flex flex-col max-w-[80%]",
                  m.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                )}>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    m.role === 'user' 
                      ? "bg-brand-primary text-bg-dark font-medium rounded-tr-none" 
                      : "bg-white/5 text-white/80 border border-white/5 rounded-tl-none"
                  )}>
                    {m.text}
                  </div>
                  <span className="text-[10px] text-white/20 mt-1">
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-1 p-2">
                  <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="詢問您的長壽策略..."
                  className="w-full bg-bg-dark border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-brand-primary text-bg-dark flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xl",
          isOpen ? "bg-white text-bg-dark rotate-90" : "bg-brand-primary text-bg-dark glow-primary hover:scale-110"
        )}
      >
        {isOpen ? <X /> : <MessageSquare />}
      </button>
    </div>
  );
};

export default Assistant;
