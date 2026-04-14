import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import { JournalArticle } from '../types';

interface JournalDetailProps {
  article: JournalArticle;
  onBack: () => void;
}

const JournalDetail: React.FC<JournalDetailProps> = ({ article, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-bg-dark pt-32 pb-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-brand-primary mb-12 group transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          返回列表
        </button>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-lg bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-widest">
              {article.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Clock className="w-4 h-4" />
              {article.date}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-white">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 py-6 border-y border-white/5">
            <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{article.author}</div>
              <div className="text-xs text-white/40">Vitevo.AI Scientific Advisor</div>
            </div>
          </div>
        </div>

        <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-12 border border-white/5">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="prose prose-invert prose-brand max-w-none">
          <p className="text-xl text-white/80 leading-relaxed mb-8 font-medium">
            {article.excerpt}
          </p>
          <div className="text-white/60 leading-loose space-y-6 text-lg">
            {typeof article.content === 'string' ? article.content.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            )) : article.content}
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-white/5 flex flex-wrap gap-3">
          {['Longevity', 'Science', 'AI', 'Biohacking'].map((tag) => (
            <div key={tag} className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-xs text-white/60">
              <Tag className="w-3 h-3" />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default JournalDetail;
