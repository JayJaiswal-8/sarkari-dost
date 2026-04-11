"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, MapPin, Wallet, GraduationCap, Briefcase } from 'lucide-react';

export default function Apply() {
  const router = useRouter();
  const [formData, setFormData] = useState({ state: '', age: '', income: '', category: '', profession: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(formData));
    router.push('/results');
  };

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center bg-[#020617] text-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="max-w-3xl w-full glass p-8 md:p-16 rounded-[50px] shadow-2xl border border-white/10"
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 tracking-tighter">Eligibility Check</h2>
          <p className="text-slate-400 text-lg">Let our AI analyze your profile to unlock your benefits.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group">
            <MapPin className="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input placeholder="State" required className="w-full pl-12 p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-500" onChange={e => setFormData({...formData, state: e.target.value})} />
          </div>
          <div className="relative group">
            <User className="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input placeholder="Age" type="number" required className="w-full pl-12 p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-500" onChange={e => setFormData({...formData, age: e.target.value})} />
          </div>
          <div className="relative group">
            <Wallet className="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input placeholder="Annual Income (₹)" type="number" required className="w-full pl-12 p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-500" onChange={e => setFormData({...formData, income: e.target.value})} />
          </div>
          <div className="relative group">
            <GraduationCap className="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input placeholder="Category (SC/ST/OBC/Gen)" required className="w-full pl-12 p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-500" onChange={e => setFormData({...formData, category: e.target.value})} />
          </div>
          <div className="relative group md:col-span-2">
            <Briefcase className="absolute left-4 top-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input placeholder="Profession (e.g. Farmer, Student, Shopkeeper)" required className="w-full pl-12 p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-500" onChange={e => setFormData({...formData, profession: e.target.value})} />
          </div>
          <button className="md:col-span-2 bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-2xl hover:shadow-blue-500/40">
            Analyze My Profile →
          </button>
        </form>
      </motion.div>
    </div>
  );
}
