"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Zap, Sparkles, 
  Globe, CheckCircle, User, MapPin, 
  Wallet, GraduationCap, Briefcase,
  Award, ExternalLink, Loader2
} from 'lucide-react';

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
    { id: 'state', label: 'Location', icon: <MapPin />, placeholder: 'Enter your state' },
    { id: 'age', label: 'Age', icon: <User />, placeholder: 'Enter your age', type: 'number' },
    { id: 'income', label: 'Annual Income', icon: <Wallet />, placeholder: 'Enter income in ₹', type: 'number' },
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
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500 overflow-x-hidden">
      {/* BACKGROUND ARCHITECTURE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 grayscale" style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505] to-[#050505]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(37,99,235,0.1),transparent_50%)]" />
      </div>

      {/* SHARP NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center border-b border-white/10 backdrop-blur-md">
        <div className="text-xl font-black tracking-tighter flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
          <img src="/assets/emblem.png" alt="Emblem" className="w-8 h-8 object-contain" />
          <span className="tracking-widest uppercase">Sarkari<span className="text-blue-500">Dost</span></span>
        </div>
        <button onClick={() => setView('form')} className="bg-white text-black px-6 py-2 text-xs font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
          Check Eligibility
        </button>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-40 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                  initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}
                  className="text-left"
                >
                  <div className="inline-flex items-center gap-2 text-blue-500 text-xs font-bold uppercase tracking-[0.3em] mb-6">
                    <Sparkles size={14} /> AI-Powered Intelligence
                  </div>
                  <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] uppercase">
                    Claim Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Rights.</span>
                  </h1>
                  <p className="text-slate-400 text-lg md:text-2xl max-w-xl mb-12 font-light leading-relaxed">
                    The government has thousands of schemes. We use AI to find the ones you are eligible for in seconds. No agents. No bribes.
                  </p>
                  <button onClick={() => setView('form')} className="group relative px-10 py-5 bg-blue-600 text-white text-xl font-black rounded-none hover:bg-blue-700 transition-all flex items-center gap-3">
                    Start Analysis <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                  className="relative hidden lg:block"
                >
                  <div className="relative z-10 border border-white/10 p-4 bg-white/5 backdrop-blur-sm">
                    <img src="/assets/hero-bg.jpg" alt="India Gate" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="absolute -top-10 -right-10 w-full h-full border border-blue-500/30 -z-10" />
                </motion.div>
              </div>

              <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-1 border-t border-white/10">
                {[
                  { title: "Instant Matching", desc: "AI analyzes your profile against 1000+ schemes in milliseconds.", icon: <Zap size={32} /> },
                  { title: "Zero Middlemen", desc: "Direct official links. No bribes, no agents, no hidden fees.", icon: <ShieldCheck size={32} /> },
                  { title: "Pan-India Reach", desc: "From smallest villages to biggest cities, we cover every state.", icon: <Globe size={32} /> },
                ].map((f, i) => (
                  <div key={i} className="p-12 border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-all group">
                    <div className="text-blue-500 mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{f.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {view === 'form' && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl p-8 md:p-16 border border-white/10 shadow-2xl">
              <div className="text-left mb-12">
                <div className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-2">Step {step + 1} of {steps.length}</div>
                <h2 className="text-4xl font-black tracking-tighter uppercase">{steps[step].label}</h2>
              </div>
              <div className="relative mb-12 group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">{steps[step].icon}</div>
                <input autoFocus type={steps[step].type || 'text'} placeholder={steps[step].placeholder} className="w-full pl-14 p-6 bg-transparent border-b-2 border-white/10 focus:border-blue-500 outline-none transition-all text-2xl font-medium" onChange={e => setFormData({...formData, [steps[step].id]: e.target.value})} onKeyDown={e => e.key === 'Enter' && handleNext()} />
              </div>
              <button onClick={handleNext} className="w-full bg-white text-black py-5 rounded-none font-black text-xl hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-3">
                {step === steps.length - 1 ? 'Analyze My Profile' : 'Next'} <ArrowRight size={24} />
              </button>
            </div>
          </motion.div>
        )}

        {view === 'scanning' && (
          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <motion.img src="/assets/emblem.png" animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 2 }} className="w-32 h-32 object-contain z-20" />
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-full" />
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute inset-8 border-2 border-dashed border-indigo-500/30 rounded-full" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mt-12 mb-4 tracking-tighter uppercase">Scanning Portals...</h2>
            <p className="text-slate-400 text-xl max-w-md">Cross-referencing your profile with National Portals and State Databases.</p>
          </motion.div>
        )}

        {view === 'results' && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-xs font-bold mb-6 border border-blue-500/20 uppercase tracking-widest">
                <Sparkles size={16} /> AI Matching Complete
              </div>
              <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase">Your <span className="text-blue-500">Benefits.</span></h2>
              <img src="/assets/flag.png" alt="India Flag" className="w-16 h-auto mx-auto mb-8 opacity-50" />
            </div>
            {matchedSchemes.length === 0 ? (
              <div className="text-center py-32 border border-dashed border-slate-700">
                <AlertCircle size={64} className="mx-auto text-slate-600 mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">No Exact Matches Found</h3>
                <button onClick={() => setView('form')} className="bg-white text-black px-10 py-4 font-bold hover:bg-blue-50 transition-all">Try different details</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
                {matchedSchemes.map((s, i) => (
                  <div key={i} className="bg-[#050505] p-10 hover:bg-white/5 transition-all group relative">
                    <div className="absolute top-6 right-6 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-widest">AI Match</div>
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all"><Award size={24} /></div>
                    <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">{s.name}</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed text-lg">{s.benefit}</p>
                    <div className="bg-white/5 p-6 rounded-xl mb-8 border border-white/5">
                      <span className="font-bold block mb-2 text-blue-400 uppercase text-xs tracking-widest">How to Apply</span>
                      <p className="text-slate-300 text-sm leading-relaxed">{s.action}</p>
                    </div>
                    <a href={s.link} target="_blank" className="flex items-center justify-center gap-2 w-full bg-white text-black py-4 font-black hover:bg-blue-500 hover:text-white transition-all">
                      Apply Now <ExternalLink size={20} />
                    </a>
                  </div>
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
