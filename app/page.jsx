"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200 blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-200 blur-[120px] opacity-50" />

      <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 md:py-40">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-blue-100">
            <Sparkles size={16} /> <span>India's First AI Benefit Finder</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
            Your Right to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Govt Benefits.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Stop guessing. Stop paying middlemen. Our AI scans thousands of government schemes to find the money and support you deserve in seconds.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/apply">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white text-xl font-bold px-10 py-5 rounded-2xl shadow-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                Find My Schemes <ArrowRight size={24} />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-4">
          {[
            { title: "Instant Matching", desc: "AI analyzes your profile against 1000+ schemes.", icon: <Zap className="text-blue-600" /> },
            { title: "Zero Cost", desc: "100% free for every Indian citizen. No hidden fees.", icon: <ShieldCheck className="text-green-600" /> },
            { title: "Direct Action", desc: "Get exact steps and links to apply officially.", icon: <Sparkles className="text-orange-600" /> },
          ].map((f, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.2 }}
              key={i} className="glass p-8 rounded-3xl border border-white hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
