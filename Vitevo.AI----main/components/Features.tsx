import React from 'react';
import { motion } from 'motion/react';
import { Camera, BarChart3, Target, Sparkles } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "生理數據辨識",
      description: "利用先進的 AI 影像處理技術，只需拍照即可自動讀取並記錄各類生理測量數據。",
      color: "from-brand-primary to-brand-secondary"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "生物年齡儀表板",
      description: "多維度分析您的生物年齡、預期壽命與關鍵生物標記，實時掌握健康趨勢。",
      color: "from-brand-secondary to-brand-accent"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "精準長壽策略",
      description: "根據您的數據，AI 會生成個人化的營養、運動與生活管理建議，精準導航長壽路徑。",
      color: "from-brand-accent to-brand-primary"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI 智能推薦",
      description: "結合全球長壽研究與個人數據，推薦最適合您的營養補充品與生活管理工具。",
      color: "from-brand-primary via-brand-secondary to-brand-accent"
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-bg-dark relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">核心技術與功能</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            我們將複雜的生物數據轉化為簡單易懂的行動指南，讓長壽不再是偶然，而是可以管理的科學。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-3xl hud-panel border-white/5 hover:border-brand-primary/30 transition-all relative overflow-hidden"
            >
              {/* HUD Decorative Corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand-primary/20 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brand-primary/20 rounded-tr-lg" />
              
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-8 glow-primary group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
