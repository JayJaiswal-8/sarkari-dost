"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle } from 'lucide-react';

export default function Results() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getResults() {
      const userProfile = JSON.parse(localStorage.getItem('userProfile'));
      const res = await fetch('/api/match', { method: 'POST', body: JSON.stringify({ userProfile }) });
      const data = await res.json();
      setSchemes(data.matchedSchemes || []);
      setLoading(false);
    }
    getResults();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-2xl font-bold text-slate-700">AI is scanning government databases...</p>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black mb-4">Your <span className="text-blue-600">Matching</span> Benefits</h2>
        <p className="text-slate-500 text-lg">Based on your profile, our AI found these opportunities for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schemes.map((s, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1 }}
            key={i} className="glass p-8 rounded-[32px] border border-white hover:shadow-2xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <CheckCircle size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{s.name_en}</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">{s.benefit_en}</p>
            <div className="bg-white/50 p-4 rounded-2xl mb-6 text-sm text-slate-700 border border-white">
              <span className="font-bold block mb-1 text-blue-600">How to Apply:</span>
              {s.action_en}
            </div>
            <a href={s.link} target="_blank" className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all">
              Apply Now <ExternalLink size={18} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
