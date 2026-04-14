import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import DNAHelix from './DNAHelix';

const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <DNAHelix />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full hud-panel text-brand-primary text-xs font-bold tracking-widest uppercase mb-6 border-brand-primary/20">
            Next-Gen Longevity Navigator
          </span>
          
          <h1 
            className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight text-white glitch"
            data-text="數據驅動 生命持續進化"
          >
            數據驅動 <br />
            <span className="text-gradient">生命持續進化</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            Vitevo.AI 結合生理數據辨識與機器學習，為您量身打造精準的長壽導航策略。
            從生物年齡監測到個人化營養建議，掌握生命進化的主導權。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onExplore}
              className="group relative px-8 py-4 rounded-2xl bg-brand-primary text-bg-dark font-bold text-lg overflow-hidden transition-all hover:scale-105 glow-primary"
            >
              <span className="relative z-10 flex items-center gap-2">
                開始您的長壽旅程 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="flex items-center gap-2 text-white/80 font-medium hover:text-white transition-colors group">
              了解科學原理 <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Stats Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {[
            { label: '精準數據點', value: '1M+' },
            { label: '長壽策略', value: '500+' },
            { label: '生物標記分析', value: '50+' },
            { label: '預期壽命提升', value: '15%' },
          ].map((stat, i) => (
            <div key={i} className="hud-panel p-6 rounded-2xl border-white/5">
              <div className="text-2xl md:text-3xl font-bold text-brand-primary mb-1">{stat.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-brand-primary/20 to-transparent" />
    </section>
  );
};

export default Hero;
