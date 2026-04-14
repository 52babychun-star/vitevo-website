import React from 'react';
import { motion } from 'motion/react';
import { TrendingDown, TrendingUp, Minus, ShieldCheck, Zap, Heart, Brain } from 'lucide-react';
import { BIO_DATA, STRATEGIES } from '../constants';
import { cn } from '../lib/utils';

const Dashboard: React.FC = () => {
  return (
    <section id="dashboard" className="py-24 px-6 bg-bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">長壽數據儀表板</h2>
          <p className="text-white/60">實時監測您的生物標記，精準導航生命進化。</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Bio-Age Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 hud-panel p-8 rounded-3xl border-brand-primary/20 relative overflow-hidden"
          >
            {/* HUD Decorative Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-primary/40 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-primary/40 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-primary/40 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-primary/40 rounded-br-xl" />

            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ActivityIcon className="w-32 h-32" />
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-white/5"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray="552.92"
                    initial={{ strokeDashoffset: 552.92 }}
                    whileInView={{ strokeDashoffset: 552.92 * (1 - 0.75) }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-brand-primary"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-brand-primary glow-primary">28.4</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">生物年齡</span>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                {BIO_DATA.slice(1).map((data) => (
                  <div key={data.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-primary/30 transition-colors">
                    <div className="text-[10px] text-white/40 mb-1 uppercase tracking-wider font-bold">{data.label}</div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-white">{data.value}</span>
                      <span className="text-[10px] text-white/40 mb-1 font-bold">{data.unit}</span>
                      <div className="ml-auto">
                        {data.trend === 'up' ? <TrendingUp className="text-green-400 w-4 h-4" /> : 
                         data.trend === 'down' ? <TrendingDown className="text-brand-primary w-4 h-4" /> : 
                         <Minus className="text-white/20 w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: ShieldCheck, label: '免疫系統狀態', value: '最佳 (Optimal)', color: 'text-green-400', bg: 'bg-brand-primary/10' },
              { icon: Zap, label: '代謝靈活性', value: '高 (High)', color: 'text-brand-primary', bg: 'bg-brand-secondary/10' },
              { icon: Brain, label: '認知儲備', value: '提升中 (+5%)', color: 'text-brand-primary', bg: 'bg-brand-accent/10' },
            ].map((stat, i) => (
              <div key={i} className="hud-panel p-6 rounded-3xl border-white/5 flex items-center gap-4 hover:border-brand-primary/30 transition-colors">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg)}>
                  <stat.icon className={stat.color} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{stat.label}</div>
                  <div className={cn("text-[10px] font-bold uppercase tracking-widest", stat.color)}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategies Preview */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Heart className="text-brand-primary w-5 h-5" /> 推薦長壽策略
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STRATEGIES.map((strategy) => (
              <motion.div 
                key={strategy.id}
                whileHover={{ y: -5 }}
                className="glass-card p-6 rounded-2xl border-white/5"
              >
                <div className={cn(
                  "inline-block px-2 py-1 rounded-lg text-[10px] font-bold uppercase mb-4",
                  strategy.impact === 'high' ? "bg-brand-primary/20 text-brand-primary" : "bg-white/10 text-white/60"
                )}>
                  {strategy.impact} Impact
                </div>
                <h4 className="font-bold mb-2">{strategy.title}</h4>
                <p className="text-sm text-white/40 mb-4">{strategy.description}</p>
                {strategy.recommendation && (
                  <div className="text-xs p-3 rounded-xl bg-white/5 text-brand-primary/80 italic">
                    {strategy.recommendation}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ActivityIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export default Dashboard;
