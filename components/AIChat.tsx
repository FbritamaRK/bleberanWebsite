
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/gemini';
import { Message } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Halo! Saya Guide Bleberan. Ingin tahu rute kapal ke Jembatan Kabanaran atau harga paket camping malam ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const response = await getGeminiResponse(userMessage);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <section id="chat" className="py-24 bg-emerald-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600 rounded-full mix-blend-screen filter blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-orange-500 font-black tracking-widest uppercase text-xs mb-4">Smart Tourism</h2>
            <h3 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Tanya Apapun <br/>Pada <span className="text-emerald-400">Asisten Digital</span>
            </h3>
            <p className="text-emerald-100/70 text-lg mb-10 leading-relaxed max-w-lg">
              Asisten bertenaga AI kami telah dilatih khusus dengan data Dusun Bleberan. Siap memberikan rekomendasi terbaik untuk perjalanan Anda.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="text-orange-500 font-bold mb-1">Respon Cepat</div>
                <div className="text-xs text-emerald-100/50">Tersedia 24/7 untuk menjawab pertanyaan Anda.</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="text-emerald-400 font-bold mb-1">Info Terkini</div>
                <div className="text-xs text-emerald-100/50">Data UMKM dan event desa selalu diperbarui.</div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="bg-white rounded-[2.5rem] shadow-2xl flex flex-col h-[600px] text-slate-800 overflow-hidden border-8 border-white/10 backdrop-blur-sm">
              <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-black text-emerald-900 block text-sm uppercase tracking-wider">Guide AI Bleberan</span>
                    <span className="text-[10px] text-green-600 font-bold flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span> ONLINE
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-white to-slate-50">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-5 py-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                      ? 'bg-emerald-700 text-white rounded-tr-none' 
                      : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-100 px-5 py-4 rounded-[1.5rem] rounded-tl-none flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 bg-white">
                <div className="flex items-center space-x-3 bg-slate-100 rounded-2xl px-5 py-2 group focus-within:bg-slate-200 transition-all border border-transparent focus-within:border-emerald-200">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tanya paket camping atau rute..."
                    className="flex-1 py-3 text-sm outline-none bg-transparent"
                  />
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-emerald-700 text-white p-3 rounded-xl hover:bg-orange-600 transition-all disabled:opacity-50 shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;
