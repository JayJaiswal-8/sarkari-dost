"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Zap, Sparkles, 
  Globe, CheckCircle, User, MapPin, 
  Wallet, GraduationCap, Briefcase,
  Award, ExternalLink, Loader2
} from 'lucide-react';

// --- DATA SPINE (Local for instant mobile speed) ---
const SCHEMES_DATA = [
  { id: 1, name: "PM-Kisan Samman Nidhi", benefit: "₹6,000 annual financial support for farmers.", action: "Register via PM-Kisan portal with Aadhaar.", link: "https://pmkisan.gov.in", criteria: { state: "all", profession: "Farmer", minAge: 18, maxIncome: 200000 } },
  { id: 2, name: "Student Credit Card", benefit: "Low-interest loans up to ₹10 Lakhs for education.", action: "Apply through state education portal.", link: "https://education.gov.in", criteria: { state: "Bihar", profession: "Student", minAge: 16, maxIncome: 500000 } },
  { id: 3, name: "Ujjwala Yojana", benefit: "Free LPG connection for women from BPL families.", action: "Visit nearest LPG distributor with Ration Card.", link: "https://pmuy.gov.in", criteria: { state: "all", category: "Women", minAge: 18, maxIncome: 100000 } },
  { id: 4, name: "Kanya Sumangala Yojana", benefit: "Financial assistance for the girl child's education.", action: "Apply through ICDS portal with birth certificate.", link: "https://kanyasumangala.up.gov.in", criteria: { state: "Uttar Pradesh", category: "Women", minAge: 0, maxIncome: 300000 } },
  { id: 5, name: "National Scholarship Portal", benefit: "Merit-based scholarships for students across India.", action: "Register on the NSP portal.", link: "https://scholarships.gov.in", criteria: { state: "all", profession: "Student", minAge: 10, maxIncome: 800000 } },
];

export default function SarkariDost() {
  const [view, setView] = useState('landing'); 
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ state: '', age: '', income: '', category: '', profession: '' });
  const [matchedSchemes, setMatchedSchemes] = useState([]);

  const steps = [
    { id: 'state', label: 'Your State', icon: <MapPin />, placeholder: 'e.g. Bihar, Maharashtra' },
    { id: 'age', label: 'Your Age', icon: <User />, placeholder: 'e.g. 25', type: 'number' },
    { id: 'income', label: 'Annual Income', icon: <Wallet />, placeholder: 'e.g. 150000', type: 'number' },
    { id: 'category', label: 'Category', icon: <GraduationCap />, placeholder: 'SC/ST/OBC/General' },
    { id: 'profession', label: 'Profession', icon: <Briefcase />, placeholder: 'e.g. Farmer, Student' },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else handleAnalyze();
  };

  const handleAnalyze = () => {
    setView('scanning');
    setTimeout(() => {
      const filtered = SCHEMES_DATA.filter(s => {
        const stateMatch = s.criteria.state === 'all' || s.criteria.state.toLowerCase() === formData.state.toLowerCase();
        const profMatch = !s.criteria.profession || s.criteria.profession.toLowerCase() === formData.profession.toLowerCase();
        const ageMatch = formData.age >= (s.criteria.minAge || 0);
        const incomeMatch = formData.income <= (s.criteria.maxIncome || Infinity);
        return stateMatch && profMatch && ageMatch && incomeMatch;
      });
      setMatchedSchemes(filtered);
      setView('results');
    }, 3500);
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* CINEMATIC BACKGROUND - Optimized for all screens */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 animate-pulse" style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617] to-[#020617]" />
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      {/* FLOATING DOCK - Responsive padding and size */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-3 md:px-8 rounded-full glass border border-white/10 flex items-center gap-4 md:gap-8 backdrop-blur-xl shadow-2xl w-[90%] max-w-fit">
        <div className="text-base md:text-xl font-black tracking-tighter flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
          <img src="/assets/emblem.png" alt="Emblem" className="w-5 h-5 md:w-7 md:h-7 object-contain" />
          SARKARI<span className="text-blue-500">DOST</span>
        </div>
        <div className="h-4 w-[1px] bg-white/20" />
        <button onClick={() => setView('form')} className="text-[10px] md:text-xs font-bold uppercase tracking-widest hover:text-blue-400 transition-colors whitespace-nowrap">
          Check Eligibility
        </button>
      </nav>

      <AnimatePresence mode="wait">
        {/* VIEW 1: LANDING - Massive Typography, Fluid Layout */}
        {view === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-32 pb-20 px-6 text-center">
            <div className="max-w-6xl mx-auto">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 bg-white/5 text-blue-400 px-4 py-2 rounded-full text-[10px] md:text-xs font-bold mb-8 border border-white/10 backdrop-blur-md">
                <Sparkles size={14} /> INDIA'S FIRST AI BENEFIT ENGINE
              </motion.div>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] uppercase">
                Claim Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Rights.</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-3xl max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                Stop losing money to middlemen. <br className="hidden md:block" /> 
                Our AI simplifies the chaos into a <span className="text-white font-medium">30-second scan.</span>
              </p>
              <button onClick={() => setView('form')} className="group relative px-8 py-4 md:px-12 md:py-6 bg-white text-black text-lg md:text-2xl font-black rounded-full shadow-2xl hover:bg-blue-50 transition-all flex items-center gap-3 mx-auto">
                Start Analysis <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  { title: "Instant Matching", desc: "AI analyzes your profile against 1000+ schemes in milliseconds.", icon: <Zap size={32} />, color: "from-blue-600 to-blue-400" },
                  { title: "Zero Middlemen", desc: "Direct official links. No bribes, no agents, no hidden fees.", icon: <ShieldCheck size={32} />, color: "from-green-600 to-green-400" },
                  { title: "Pan-India Reach", desc: "From smallest villages to biggest cities, we cover all.", icon: <Globe size={32} />, color: "from-orange-600 to-orange-400" },
                ].map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl hover:border-blue-500/50 transition-all group">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                      {f.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{f.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-base">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: CONVERSATIONAL FORM - Thumb-Optimized */}
        {view === 'form' && (
          <motion.div key="form" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-xl w-full bg-white/5 backdrop-blur-3xl p-8 md:p-20 rounded-[60px] border border-white/10 shadow-2xl text-center">
              <div className="mb-12">
                <div className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4">Step {step + 1} of {steps.length}</div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">{steps[step].label}</h2>
                <div className="flex justify-center gap-2 mb-10">
                  {steps.map((_, i) => (
                    <div key={i} className={`h-1 w-6 md:w-10 rounded-full transition-all ${i === step ? 'bg-blue-500 w-12' : 'bg-white/20'}`} />
                  ))}
                </div>
              </div>
              <div className="relative mb-12 group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">{steps[step].icon}</div>
                <input autoFocus type={steps[step].type || 'text'} placeholder={steps[step].placeholder} className="w-full pl-14 p-5 md:p-6 rounded-3xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all text-xl md:text-2xl text-center font-medium" onChange={e => setFormData({...formData, [steps[step].id]: e.target.value})} onKeyDown={e => e.key === 'Enter' && handleNext()} />
              </div>
              <button onClick={handleNext} className="w-full bg-white text-black py-5 md:py-6 rounded-3xl font-black text-xl hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-3">
                {step === steps.length - 1 ? 'Analyze My Profile' : 'Next'} <ArrowRight size={24} />
              </button>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: WAR ROOM SCANNING */}
        {view === 'scanning' && (
          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <motion.img src="/assets/emblem.png" animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 2 }} className="w-32 h-32 object-contain z-20" />
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-full" />
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute inset-8 border-2 border-dashed border-indigo-500/30 rounded-full" />
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }} className="absolute w-1 h-20 bg-gradient-to-t from-blue-500 to-transparent" style={{ rotate: `${deg}deg`, transformOrigin: 'bottom center', bottom: '50%' }} />
              ))}
            </div>
            <h2 className="text-4xl md:text-6xl font-black mt-12 mb-4 tracking-tighter">Scanning Portals...</h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-md">Cross-referencing your profile with National Portals and State Databases.</p>
          </motion.div>
        )}

        {/* VIEW 4: RESULTS - Responsive Grid */}
        {view === 'results' && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-xs font-bold mb-6 border border-blue-500/20 uppercase tracking-widest">
                <Sparkles size={16} /> AI Matching Complete
              </div>
              <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter">Your <span className="text-blue-500">Benefits.</span></h2>
              <img src="/assets/flag.png" alt="India Flag" className="w-12 h-auto mx-auto mb-8 opacity-80" />
            </div>
            {matchedSchemes.length === 0 ? (
              <div className="text-center py-32 glass rounded-[50px] border border-dashed border-slate-700">
                <AlertCircle size={64} className="mx-auto text-slate-600 mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">No Exact Matches Found</h3>
                <button onClick={() => setView('form')} className="bg-white text-black px-10 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all">Try different details</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {matchedSchemes.map((s, i) => (
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="glass p-8 rounded-[40px] border border-white/10 hover:border-blue-500/50 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4"><div className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">AI Match</div></div>
                    <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all"><Award size={28} /></div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{s.name}</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed text-lg">{s.benefit}</p>
                    <div className="bg-white/5 p-6 rounded-3xl mb-8 border border-white/5">
                      <span className="font-bold block mb-2 text-blue-400 uppercase text-xs tracking-widest">How to Apply</span>
                      <p className="text-slate-300 text-sm leading-relaxed">{s.action}</p>
                    </div>
                    <a href={s.link} target="_blank" className="flex items-center justify-center gap-2 w-full bg-white text-slate-900 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all">Apply Now <ExternalLink size={20} /></a>
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

function AlertCircle({ size, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}
