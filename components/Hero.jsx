"use client";
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-[150px] animate-morph" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[150px] animate-morph" style={{ animationDelay: '-5s' }} />
      
      <div className="relative z-10 text-center max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white/5 text-blue-400 px-4 py-2 rounded-full text-xs font-bold mb-8 border border-white/10 backdrop-blur-md uppercase tracking-widest"
        >
          <Sparkles size={14} /> India's First AI Benefit Engine
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-cinematic font-black tracking-tighter mb-8 uppercase"
        >
          Claim Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
            Rights.
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed"
        >
          Stop losing money to middlemen. Our AI simplifies the chaos into a <span className="text-white font-medium">30-second scan.</span>
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
          onClick={onStart}
          className="group relative px-10 py-5 bg-white text-black text-xl font-black rounded-full shadow-2xl hover:bg-blue-50 transition-all flex items-center gap-3 mx-auto"
        >
          Start Analysis <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
}
