"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

export default function Results() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getResults() {
      try {
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        const res = await fetch('/api/match', { method: 'POST', body: JSON.stringify({ userProfile }) });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setSchemes(data.matchedSchemes || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    getResults();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#020617] text-white">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-3xl font-black animate-pulse">AI is scanning databases...</p>
    </div>
  );

  return (
    <div className="min-h-screen py-20 px-4 max-w-7xl mx-auto bg-[#020617] text-white">
      <div className="text-center mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-blue-500/20"
        >
          <Sparkles size={16} /> AI Matching Complete
        </motion.div>
        <h2 className="text-6xl font-black mb-6 tracking-tighter">Your <span className="text-blue-500">Matching</span> Benefits</h2>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">We found the most impactful schemes based on your specific profile.</p>
      </div>

      {schemes.length === 0 ? (
        <div className="text-center py-32 glass rounded-[50px] border-dashed border-slate-700">
          <AlertCircle size={64} className="mx-auto text-slate-600 mb-6" />
          <h3 className="text-3xl font-bold text-white mb-4">No Exact Matches Found</h3>
          <p className="text-slate-400 mb-10 max-w-md mx-auto">We couldn't find a perfect match for your profile right now, but don't give up!</p>
          <a href="/apply" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all">Try different details</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schemes.map((s, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }}
              key={i} className="glass p-8 rounded-[40px] border border-white/10 hover:border-blue-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <div className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full">AI MATCH</div>
              </div>
              <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{s.name_en}</h3>
              <p className="text-slate-400 mb-8 leading-relaxed text-lg">{s.benefit_en}</p>
              <div className="bg-white/5 p-6 rounded-3xl mb-8 border border-white/5">
                <span className="font-bold block mb-2 text-blue-400 uppercase text-xs tracking-widest">Next Step</span>
                <p className="text-slate-300 text-sm leading-relaxed">{s.action_en}</p>
              </div>
              <a href={s.link} target="_blank" className="flex items-center justify-center gap-2 w-full bg-white text-slate-900 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all">
                Apply Now <ExternalLink size={20} />
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
