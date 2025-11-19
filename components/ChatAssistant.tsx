import React, { useState, useRef, useEffect } from 'react';
import { generateTourGuideResponse } from '../services/geminiService';
import { ChatMessage, Destination } from '../types';
import { Send, Bot, User } from 'lucide-react';

interface Props {
  destinations: Destination[];
}

const ChatAssistant: React.FC<Props> = ({ destinations }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo! Saya SmartGuide Paniai. Ada yang bisa saya bantu mengenai wisata di Paniai?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await generateTourGuideResponse(
      messages.map(m => ({ role: m.role, text: m.text })),
      userMsg.text,
      destinations
    );

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="h-[600px] bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white flex items-center gap-3 shadow-md">
        <div className="bg-white/20 p-2 rounded-full">
            <Bot size={24} />
        </div>
        <div>
            <h3 className="font-bold text-lg">SmartGuide Paniai</h3>
            <p className="text-xs text-emerald-100">Powered by Google Gemini</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-emerald-200 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanya tentang Danau Paniai, budaya, atau rute..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 disabled:bg-gray-300 transition-all shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;