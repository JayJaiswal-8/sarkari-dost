"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Zap, Sparkles, 
  Globe, CheckCircle, User, MapPin, 
  Wallet, GraduationCap, Briefcase,
  Award, ExternalLink, AlertCircle
} from 'lucide-react'; // Note: If lucide-react gives error, use 'lucide-react'

export default function SarkariDost() {
  const [view, setView] = useState('landing'); 
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ state: '', age: '', income: '', category: '', profession: '' });
  const [matchedSchemes, setMatchedSchemes] = useState([]);
  const [error, setError] = useState(null);

  const steps = [
    { id: 'state', label: 'Location', icon: <MapPin />, placeholder: 'e.g. Bihar, Maharashtra' },
    { id: 'age', label: 'Your Age', icon: <User />, placeholder: 'e.g. 25', type: 'number' },
    { id: 'income', label: 'Annual Income', icon: <Wallet />, placeholder: 'e.g. 150000', type: 'number' },
    { id: 'category', label: 'Category', icon: <GraduationCap />, placeholder: 'SC/ST/OBC/General' },
    { id: 'profession', label: 'Profession', icon: <Briefcase />, placeholder: 'e.g. Farmer, Student' },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else handleAnalyze();
  };

  const handleAnalyze = async () => {
    setView('scanning');
    setError(null);

    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userProfile: formData }),
      });

      if (!response.ok) throw new Error('AI Server is currently busy. Please try again.');
      
      const data = await response.json();
      setMatchedSchemes(data.matchedSchemes || []);
      setView('results');
    } catch (e) {
      setError(e.message);
      setView('results');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500 overflow-x-hidden">
      {/* CINEMATIC BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 grayscale" style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617] to-[#020617]" />
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
      </div>

      {/* FIXED NAVIGATION - Zero Overlap */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-xl border-b border-white/10">
        <div className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
          <img src="/assets/emblem.png" alt="Emblem" className="w-7 h-7 md:w-9 md:h-9 object-contain" />
          <span className="uppercase tracking-tight">Sarkari<span className="text-blue-500">Dost</span></span>
        </div>
        <button onClick={() => setView('form')} className="bg-white text-black px-5 py-2 rounded-full text-xs md:text-sm font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-lg">
          Check Eligibility
        </button>
      </nav>

      <AnimatePresence mode="wait">
        {/* VIEW 1: LANDING */}
        {view === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-32 pb-20 px-6 text-center">
            <div className="max-w-6xl mx-auto">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 bg-white/5 text-blue-400 px-4 py-2 rounded-full text-xs font-bold mb-8 border border-white/10 backdrop-blur-md uppercase tracking-widest">
                <Sparkles size={14} /> India's First AI Benefit Engine
              </motion.div>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.8] uppercase">
                Claim Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Rights.</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-3xl max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                Stop losing money to middlemen. <br className="hidden md:block" /> 
                Our AI simplifies the chaos into a <span className="text-white font-medium">30-second scan.</span>
              </p>
              <button onClick={() => setView('form')} className="group relative px-10 py-5 bg-white text-black text-xl font-black rounded-full shadow-2xl hover:bg-blue-50 transition-all flex items-center gap-3 mx-auto">
                Start Analysis <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: CONVERSATIONAL FORM */}
        {view === 'form' && (
          <motion.div key="form" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-2xl w-full bg-white/5 backdrop-blur-3xl p-8 md:p-16 rounded-[60px] border border-white/10 shadow-2xl text-center">
              <div className="mb-12">
                <div className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4">Step {step + 1} of {steps.length}</div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase">{steps[step].label}</h2>
                <div className="flex justify-center gap-2 mb-10">
                  {steps.map((_, i) => (
                    <div key={i} className={`h-1 w-8 rounded-full transition-all ${i === step ? 'bg-blue-500 w-12' : 'bg-white/20'}`} />
                  ))}
                </div>
              </div>
              <div className="relative mb-12 group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">{steps[step].icon}</div>
                <input autoFocus type={steps[step].type || 'text'} placeholder={steps[step].placeholder} className="w-full pl-14 p-6 rounded-3xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all text-2xl text-center font-medium" onChange={e => setFormData({...formData, [steps[step].id]: e.target.value})} onKeyDown={e => e.key === 'Enter' && handleNext()} />
              </div>
              <button onClick={handleNext} className="w-full bg-white text-black py-6 rounded-3xl font-black text-xl hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-3">
                {step === steps.length - 1 ? 'Analyze My Profile' : 'Next'} <ArrowRight size={24} />
              </button>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: SCANNING */}
        {view === 'scanning' && (
          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <motion.img src="/assets/emblem.png" animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 2 }} className="w-32 h-32 object-contain z-20" />
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-full" />
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute inset-8 border-2 border-dashed border-indigo-500/30 rounded-full" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mt-12 mb-4 tracking-tighter uppercase">Scanning Portals...</h2>
            <p className="text-slate-400 text-xl max-w-md">Our AI is searching the National Portal of India and State Databases in real-time.</p>
          </motion.div>
        )}

        {/* VIEW 4: RESULTS */}
        {view === 'results' && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-xs font-bold mb-6 border border-blue-500/20 uppercase tracking-widest">
                <Sparkles size={16} /> AI Matching Complete
              </div>
              <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase">Your <span className="text-blue-500">Benefits.</span></h2>
              <img src="/assets/flag.png" alt="India Flag" className="w-16 h-auto mx-auto mb-8 opacity-50" />
            </div>
            {error ? (
              <div className="text-center py-32 glass rounded-[60px] border border-dashed border-slate-700">
                <AlertCircle size={64} className="mx-auto text-red-500 mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">Analysis Failed</h3>
                <p className="text-slate-400 mb-10 max-w-md mx-auto">{error}</p>
                <button onClick={() => setView('form')} className="bg-white text-black px-10 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all">Try Again</button>
              </div>
            ) : matchedSchemes.length === 0 ? (
              <div className="text-center py-32 glass rounded-[60px] border border-dashed border-slate-700">
                <AlertCircle size={64} className="mx-auto text-slate-600 mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">No Exact Matches Found</h3>
                <button onClick={() => setView('form')} className="bg-white text-black px-10 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all">Try different details</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {matchedSchemes.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass p-10 rounded-[40px] border border-white/10 hover:border-blue-500/50 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right, p-4"><div className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">AI Match</div></div>
                    <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all"><Award size={32} /></div>
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{s.name}</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed text-lg">{s.benefit}</p>
                    <div className="bg-white/5 p-6 rounded-3xl mb-8 border border-white/5">
                      <span className="font-bold block mb-2 text-blue-400 uppercase text-xs tracking-widest">How to Apply</span>
                      <p className="text-slate-300 text-sm leading-relaxed">{s.action}</p>
                    </div>
                    <a href={s.link} target="_blank" className="flex items-center justify-center gap-2 w-full bg-white text-slate-900 py-5 rounded-2xl font-black hover:bg-blue-50 transition-all">
                      Apply Now <ExternalLink size={20} />
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
