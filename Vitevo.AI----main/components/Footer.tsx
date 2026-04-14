import React from 'react';
import { Activity, Mail } from 'lucide-react';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  return (
    <footer className="bg-bg-card border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center glow-primary">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold font-display tracking-tight text-white">Vitevo.AI</span>
            </div>
            <p className="text-white/40 max-w-sm leading-relaxed mb-8">
              數據驅動，生命持續進化。我們致力於利用 AI 技術，為每個人提供精準的長壽導航策略。
            </p>
            <div className="flex gap-4">
              {[Activity, Activity, Activity].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/60 hover:text-brand-primary hover:border-brand-primary/30 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">快速連結</h4>
            <ul className="space-y-4">
              <li><a href="#home" onClick={(e) => onLinkClick(e, 'home')} className="text-white/40 hover:text-brand-primary transition-colors">首頁</a></li>
              <li><a href="#dashboard" onClick={(e) => onLinkClick(e, 'dashboard')} className="text-white/40 hover:text-brand-primary transition-colors">數據儀表板</a></li>
              <li><a href="#features" onClick={(e) => onLinkClick(e, 'features')} className="text-white/40 hover:text-brand-primary transition-colors">核心技術</a></li>
              <li><a href="#journal" onClick={(e) => onLinkClick(e, 'journal')} className="text-white/40 hover:text-brand-primary transition-colors">科學雜誌</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">訂閱電子報</h4>
            <p className="text-xs text-white/40 mb-4">獲取最新的長壽研究與個人化建議。</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="您的電子郵件" 
                className="w-full bg-bg-dark border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-primary hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-xs text-white/20">
            © 2024 Vitevo.AI. All rights reserved. 
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-white/20 hover:text-white transition-colors">隱私政策</a>
            <a href="#" className="text-xs text-white/20 hover:text-white transition-colors">服務條款</a>
            <a href="#" className="text-xs text-white/20 hover:text-white transition-colors">生活管理參考聲明</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
