import React, { useState, useRef, useEffect } from 'react';
import { generateSchoolAssistantResponse } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';

const SchoolAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', parts: "Hi there! I'm Guru, your magical school robot. How can I brighten your day? 🌈✨" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', parts: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await generateSchoolAssistantResponse(input);
    setMessages(prev => [...prev, { role: 'model', parts: response || '' }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="bg-white rounded-[3rem] shadow-2xl w-80 sm:w-96 h-[550px] mb-6 flex flex-col border-[8px] border-kids-purple animate-pop-in overflow-hidden">
          {/* Header */}
          <div className="bg-kids-purple text-white p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white text-kids-purple w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner animate-wiggle">🤖</div>
              <div>
                <span className="block font-display font-bold text-xl">Guru Robot</span>
                <span className="block text-[10px] uppercase font-black opacity-70 tracking-tighter">Your School Buddy</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-white/20 p-2 rounded-full hover:rotate-90 transition-transform">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-purple-50/30 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm font-bold leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-kids-blue text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border-2 border-purple-100'}`}>
                  {m.parts}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-kids-purple rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-kids-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-kids-purple rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t bg-white flex gap-3">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 outline-none font-bold text-sm focus:bg-white focus:ring-2 ring-kids-purple transition-all"
            />
            <button 
              onClick={handleSend}
              className="bg-kids-purple text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-fun hover:translate-y-1 hover:shadow-none transition-all"
            >
              <i className="fas fa-paper-plane text-xl"></i>
            </button>
          </div>
        </div>
      )}

      {/* Main Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-kids-purple text-white w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl hover:scale-110 transition-all active:scale-95 animate-bounce-subtle"
      >
        <i className={isOpen ? 'fas fa-chevron-down' : 'fas fa-robot'}></i>
        <div className="absolute -top-2 -left-2 bg-kids-pink text-white text-[10px] font-black px-2 py-1 rounded-full animate-pulse uppercase">Guru</div>
      </button>
    </div>
  );
};

export default SchoolAssistant;