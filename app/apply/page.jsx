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
    <div className="min-h-screen py-12 px-4 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="max-w-3xl w-full bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">Eligibility Check</h2>
          <p className="text-slate-500">Fill in your details to let our AI find your benefits.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-slate-400" size={20} />
            <input placeholder="State" required className="w-full pl-12 p-4 border rounded-2xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all" onChange={e => setFormData({...formData, state: e.target.value})} />
          </div>
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-400" size={20} />
            <input placeholder="Age" type="number" required className="w-full pl-12 p-4 border rounded-2xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all" onChange={e => setFormData({...formData, age: e.target.value})} />
          </div>
          <div className="relative">
            <Wallet className="absolute left-4 top-4 text-slate-400" size={20} />
            <input placeholder="Annual Income (₹)" type="number" required className="w-full pl-12 p-4 border rounded-2xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all" onChange={e => setFormData({...formData, income: e.target.value})} />
          </div>
          <div className="relative">
            <GraduationCap className="absolute left-4 top-4 text-slate-400" size={20} />
            <input placeholder="Category (SC/ST/OBC/Gen)" required className="w-full pl-12 p-4 border rounded-2xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all" onChange={e => setFormData({...formData, category: e.target.value})} />
          </div>
          <div className="relative md:col-span-2">
            <Briefcase className="absolute left-4 top-4 text-slate-400" size={20} />
            <input placeholder="Profession (e.g. Farmer, Student, Shopkeeper)" required className="w-full pl-12 p-4 border rounded-2xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all" onChange={e => setFormData({...formData, profession: e.target.value})} />
          </div>
          <button className="md:col-span-2 bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200">
            Analyze My Profile →
          </button>
        </form>
      </motion.div>
    </div>
  );
}
