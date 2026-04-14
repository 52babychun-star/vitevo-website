import React from 'react';
import { motion } from 'motion/react';
import { Activity, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  activeView: string;
  onViewChange: (view: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, activeView, onViewChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { label: '首頁', id: 'home', view: { type: 'home' } },
    { label: '數據儀表板', id: 'dashboard', view: { type: 'dashboard' } },
    { label: '長壽策略', id: 'strategies', view: { type: 'home' } },
    { label: '科學雜誌', id: 'journal', view: { type: 'home' } },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between hud-panel rounded-2xl px-6 py-3 border-white/5">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onViewChange({ type: 'home' })}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center glow-primary group-hover:scale-110 transition-transform">
            <Activity className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold font-display tracking-tight text-white group-hover:text-brand-primary transition-colors">Vitevo.AI</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                if (item.view.type === 'dashboard') {
                  e.preventDefault();
                  onViewChange(item.view);
                } else {
                  onNavClick(e, item.id);
                }
              }}
              className={cn(
                "text-sm font-bold uppercase tracking-widest transition-colors hover:text-brand-primary",
                activeView === item.id ? "text-brand-primary glow-primary" : "text-white/70"
              )}
            >
              {item.label}
            </a>
          ))}
          <button 
            onClick={() => onViewChange({ type: 'dashboard' })}
            className="px-5 py-2 rounded-xl bg-brand-primary text-bg-dark text-sm font-bold hover:bg-white transition-all glow-primary"
          >
            立即檢測
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-24 left-6 right-6 hud-panel rounded-2xl p-6 flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                setIsOpen(false);
                if (item.view.type === 'dashboard') {
                  e.preventDefault();
                  onViewChange(item.view);
                } else {
                  onNavClick(e, item.id);
                }
              }}
              className="text-lg font-medium text-white/80"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
