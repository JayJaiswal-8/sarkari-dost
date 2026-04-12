"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Sparkles, Globe, CheckCircle, User, MapPin, Wallet, GraduationCap, Briefcase, Award, ExternalLink } from 'lucide-react';

const SCHEMES_DATA = [
  { id: 1, name: "PM-Kisan Samman Nidhi", benefit: "₹6,000 annual financial support for farmers.", action: "Register via PM-Kisan portal with Aadhaar.", link: "https://pmkisan.gov.in", criteria: { state: "all", profession: "Farmer", minAge: 18, maxIncome: 200000 } },
  { id: 2, name: "Student Credit Card", benefit: "Low-interest loans up to ₹10 Lakhs for education.", action: "Apply through state education portal.", link: "https://education.gov.in", criteria: { state: "Bihar", profession: "Student", minAge: 16, maxIncome: 500000 } },
  { id: 3, name: "Ujjwala Yojana", benefit: "Free LPG connection for women from BPL families.", action: "Visit nearest LPG distributor with Ration Card.", link: "https://pmuy.gov.in", criteria: { state: "all", category: "Women", minAge: 18, maxIncome: 100000 } },
  { id: 4, name: "Kanya Sumangala Yojana", benefit: "Financial assistance for the girl child's education.", action: "Apply through ICDS portal with birth certificate.", link: "https://kanyasumangala.up.gov.in", criteria: { state: "Uttar Pradesh", category: "Women", minAge: 0, maxIncome: 300000 } },
  { id: 5, name: "National Scholarship Portal", benefit: "Merit-based scholarships for students across India.", action: "Register on the NSP portal during application window.", link: "https://scholarships.gov.in", criteria: { state: "all", profession: "Student", minAge: 10, maxIncome: 800000 } }
];

export default function SarkariDost() {
  const [view, setView] = useState('landing');
  const [formData, setFormData] = useState({ state: '', age: '', income: '', category: '', profession: '' });
  const [matchedSchemes, setMatchedSchemes] = useState([]);

  const handleAnalyze = (e) => {
    e.preventDefault();
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
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <div className="text-xl font-black tracking-tighter flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs">S</div>
          SARKARI<span className="text-blue-500">DOST</span>
        </div>
        <button onClick={() => setView('form')} className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-50 transition-all">
          Check Eligibility
        </button>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 pt-32 pb-20 px-6 text-center">
            <div className="max-w-6xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-xs font-bold mb-8 border border-blue-500/20">
                <Sparkles size={14} /> INDIA'S FIRST AI BENEFIT ENGINE
              </div>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9]">
                Stop Missing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Your Money.</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-light">
                Millions of rupees in government subsidies go unclaimed. <br className="hidden md:block" /> 
                <span className="text-white font-medium">Sarkari Dost</span> simplifies the chaos into a 30-second AI scan.
              </p>
              <button onClick={() => setView('form')} className="bg-blue-600 text-white text-xl font-black px-12 py-6 rounded-2xl shadow-2xl hover:bg-blue-700 transition-all flex items-center gap-3 mx-auto">
                Find My Benefits <ArrowRight size={24} />
              </button>
              <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  { title: "Instant Matching", desc: "AI analyzes your profile against 1000+ schemes.", icon: <Zap size={32} />, color: "from-blue-600 to-blue-400" },
                  { title: "Zero Middlemen", desc: "Direct official links. No bribes, no agents, no fees.", icon: <ShieldCheck size={32} />, color: "from-green-600 to-green-400" },
                  { title: "Pan-India Reach", desc: "From smallest villages to biggest cities, we cover all.", icon: <Globe size={32} />, color: "from-orange-600 to-orange-400" },
                ].map((f, i) => (
                  <div key={i} className="p-8 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl hover:border-blue-500/50 transition-all">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-8 shadow-lg`}>
                      {f.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{f.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {view === 'form' && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-2xl w-full bg-white/5 backdrop-blur-2xl p-8 md:p-16 rounded-[50px] border border-white/10 shadow-2xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black mb-4 tracking-tight">Eligibility Check</h2>
                <p className="text-slate-400">Fill in your details to let our AI find your benefits.</p>
              </div>
              <form onSubmit={handleAnalyze} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative"><MapPin className="absolute left-4 top-4 text-slate-500" size={20} /><input placeholder="State" required className="w-full pl-12 p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none text-white" onChange={e => setFormData({...formData, state: e.target.value})} /></div>
                <div className="relative"><User className="absolute left-4 top-4 text-slate-500" size={20} /><input placeholder="Age" type="number" required className="w-full pl-12 p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none text-white" onChange={e => setFormData({...formData, age: e.target.value})} /></div>
                <div className="relative"><Wallet className="absolute left-4 top-4 text-slate-500" size={20} /><input placeholder="Annual Income (₹)" type="number" required className="w-full pl-12 p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none text-white" onChange={e => setFormData({...formData, income: e.target.value})} /></div>
                <div className="relative"><GraduationCap className="absolute left-4 top-4 text-slate-500" size={20} /><input placeholder="Category (SC/ST/OBC/Gen)" required className="w-full pl-12 p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none text-white" onChange={e => setFormData({...formData, category: e.target.value})} /></div>
                <div className="relative md:col-span-2"><Briefcase className="absolute left-4 top-4 text-slate-500" size={20} /><input placeholder="Profession (e.g. Farmer, Student)" required className="w-full pl-12 p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none text-white" onChange={e => setFormData({...formData, profession: e.target.value})} /></div>
                <button className="md:col-span-2 bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl">Analyze My Profile →</button>
              </form>
            </div>
          </motion.div>
        )}

        {view === 'scanning' && (
          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center"><Zap className="text-blue-500 animate-pulse" size={32} /></div>
            </div>
            <h2 className="text-3xl font-black mt-8 mb-4">Scanning Databases...</h2>
            <p className="text-slate-400 text-lg max-w-md">Our AI is cross-referencing your profile with thousands of government records.</p>
          </motion.div>
        )}

        {view === 'results' && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 min-h-screen py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-blue-500/20"><Sparkles size={16} /> AI Matching Complete</div>
              <h2 className="text-5xl font-black mb-6 tracking-tighter">Your <span className="text-blue-500">Matching</span> Benefits</h2>
            </div>
            {matchedSchemes.length === 0 ? (
              <div className="text-center py-32 glass rounded-[50px] border border-dashed border-slate-700">
                <h3 className="text-3xl font-bold text-white mb-4">No Exact Matches Found</h3>
                <button onClick={() => setView('form')} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all">Try different details</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {matchedSchemes.map((s, i) => (
                  <div key={i} className="glass p-8 rounded-[40px] border border-white/10 hover:border-blue-500/50 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4"><div className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">AI Match</div></div>
                    <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all"><Award size={28} /></div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{s.name}</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed text-lg">{s.benefit}</p>
