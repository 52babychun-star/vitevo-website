import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { ARTICLES } from '../constants';
import { JournalArticle } from '../types';

interface JournalProps {
  onArticleClick: (article: JournalArticle) => void;
}

const Journal: React.FC<JournalProps> = ({ onArticleClick }) => {
  return (
    <section id="journal" className="py-24 px-6 bg-bg-dark relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">科學雜誌</h2>
            <p className="text-white/60">深入了解長壽科學的最新研究與技術趨勢。</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-brand-primary font-bold hover:underline">
            查看全部文章 <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onArticleClick(article)}
              className="group cursor-pointer glass-card rounded-3xl overflow-hidden border-white/5 hover:border-brand-primary/20 transition-all"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-bg-dark/80 backdrop-blur-md text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                  {article.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 text-xs text-white/40 mb-4">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{article.author}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-brand-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:gap-4 transition-all">
                  閱讀全文 <BookOpen className="w-4 h-4 text-brand-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;
