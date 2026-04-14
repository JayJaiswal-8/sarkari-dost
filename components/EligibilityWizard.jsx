"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, User, Wallet, GraduationCap, Briefcase } from 'lucide-react';

export default function EligibilityWizard({ onComplete }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ state: '', age: '', income: '', category: '', profession: '' });

  const steps = [
    { id: 'state', label: 'Location', icon: <MapPin />, placeholder: 'e.g. Bihar, Maharashtra' },
    { id: 'age', label: 'Your Age', icon: <User />, placeholder: 'e.g. 25', type: 'number' },
    { id: 'income', label: 'Annual Income', icon: <Wallet />, placeholder: 'e.g. 150000', type: 'number' },
    { id: 'category', label: 'Category', icon: <GraduationCap />, placeholder: 'SC/ST/OBC/General' },
    { id: 'profession', label: 'Profession', icon: <Briefcase />, placeholder: 'e.g. Farmer, Student' },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full glass-panel p-8 md:p-16 rounded-none border-l-4 border-l-blue-600 shadow-2xl"
      >
        <div className="mb-12">
          <div className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-4">Step {step + 1} of {steps.length}</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            {steps[step].label}
          </h2>
          <div className="flex gap-1 mt-6">
            {steps.map((_, i) => (
              <div key={i} className={`h-1 flex-1 transition-all duration-500 ${i === step ? 'bg-blue-600' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>

        <div className="relative mb-12 group">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-500 transition-colors">
            {steps[step].icon}
          </div>
          <input 
            autoFocus
            type={steps[step].type || 'text'}
            placeholder={steps[step].placeholder} 
            className="w-full pl-12 p-6 bg-transparent border-b-2 border-white/10 focus:border-blue-600 outline-none transition-all text-2xl md:text-4xl font-light placeholder:text-slate-600" 
            onChange={e => setFormData({...formData, [steps[step].id]: e.target.value})}
            onKeyDown={e => e.key === 'Enter' && handleNext()}
          />
        </div>

        <button 
          onClick={handleNext} 
          className="w-full bg-white text-black py-5 rounded-none font-black text-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3 uppercase tracking-tighter"
        >
          {step === steps.length - 1 ? 'Analyze Profile' : 'Continue'} <ArrowRight size={24} />
        </button>
      </motion.div>
    </div>
  );
}
