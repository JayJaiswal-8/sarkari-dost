"use client";
import { motion } from 'framer-motion';
import { ExternalLink, Award, Sparkles, AlertCircle } from 'lucide-react';

export default function ResultsGallery({ schemes, onReset }) {
  return (
    <div className="relative z-10 min-h-screen py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-400 px-4 py-2 rounded-full text-xs font-bold mb-6 border border-blue-600/20 uppercase tracking-widest">
          <Sparkles size={14} /> AI Matching Complete
        </div>
        <h2 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter uppercase leading-none">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Benefits.</span>
        </h2>
      </div>

      {schemes.length === 0 ? (
        <div className="text-center py-32 border border-white/10 bg-white/5 backdrop-blur-md">
          <AlertCircle size={64} className="mx-auto text-slate-600 mb-6" />
          <h3 className="text-3xl font-bold text-white mb-4 uppercase">No Matches Found</h3>
          <p className="text-slate-400 mb-10 max-w-md mx-auto">We couldn't find a perfect match for your profile. Try adjusting your details.</p>
          <button onClick={onReset} className="bg-white text-black px-10 py-4 font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
            Restart Analysis
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {schemes.map((s, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              key={i} className="bg-[#050505] p-10 hover:bg-white/5 transition-all group relative"
            >
              <div className="absolute top-0 right-0 p-6">
                <div className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest">AI Match</div>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Award size={24} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight group-hover:text-blue-400 transition-colors">{s.name}</h3>
              <p className="text-slate-400 mb-8 leading-relaxed text-lg">{s.benefit}</p>
              <div className="bg-white/5 p-6 rounded-none mb-8 border-l-2 border-blue-600">
                <span className="font-bold block mb-2 text-blue-400 uppercase text-xs tracking-widest">How to Apply</span>
                <p className="text-slate-300 text-sm leading-relaxed">{s.action}</p>
              </div>
              <a href={s.link} target="_blank" className="flex items-center justify-center gap-2 w-full bg-white text-black py-5 font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                Apply Now <ExternalLink size={20} />
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
