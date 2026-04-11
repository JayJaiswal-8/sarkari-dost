"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="noise-overlay" />
      
      {/* Morphing Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] animate-morph" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-600/20 blur-[120px] animate-morph" style={{ animationDelay: '-4s' }} />

      <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">S</div>
          SARKARI<span className="text-blue-500">DOST</span>
        </div>
        <Link href="/apply" className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-all shadow-lg">
          Start Now
        </Link>
      </nav>

      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-md text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-8 border border-blue-500/20">
            <Sparkles size={16} /> <span>India's First AI Benefit Engine</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
            Stop Missing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-orange-400">
              Your Money.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Millions of rupees in government subsidies go unclaimed. <br className="hidden md:block" /> 
            <span className="text-white font-medium">Sarkari Dost</span> simplifies the chaos into a 30-second AI scan.
          </p>
          <Link href="/apply">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(37, 99, 235, 0.5)" }} 
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white text-2xl font-black px-12 py-6 rounded-2xl shadow-2xl hover:bg-blue-700 transition-all flex items-center gap-3 group mx-auto"
            >
              Find My Benefits <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full px-4">
          {[
            { title: "Instant Matching", desc: "AI scans thousands of schemes in milliseconds.", icon: <Zap size={32} />, color: "from-blue-600 to-blue-400" },
            { title: "Zero Middlemen", desc: "Direct official links. No bribes, no agents, no fees.", icon: <ShieldCheck size={32} />, color: "from-green-600 to-green-400" },
            { title: "Pan-India Reach", desc: "From smallest villages to biggest cities, we cover all.", icon: <Sparkles size={32} />, color: "from-orange-600 to-orange-400" },
          ].map((f, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.2 }}
              key={i} className="glass p-8 rounded-[40px] border border-white/10 hover:border-blue-500/50 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
