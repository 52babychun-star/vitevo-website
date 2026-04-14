import { BioData, Strategy, JournalArticle } from './types';

export const BIO_DATA: BioData[] = [
  {
    id: 'bio-age',
    label: '生物年齡 (Biological Age)',
    value: 28.4,
    unit: '歲',
    trend: 'down',
    status: 'optimal'
  },
  {
    id: 'expected-age',
    label: '預期壽命 (Expected Lifespan)',
    value: 94.2,
    unit: '歲',
    trend: 'up',
    status: 'optimal'
  },
  {
    id: 'vo2-max',
    label: '最大攝氧量 (VO2 Max)',
    value: 48.5,
    unit: 'ml/kg/min',
    trend: 'up',
    status: 'optimal'
  },
  {
    id: 'hrv',
    label: '心率變異度 (HRV)',
    value: 65,
    unit: 'ms',
    trend: 'stable',
    status: 'warning'
  }
];

export const STRATEGIES: Strategy[] = [
  {
    id: 'omega-3',
    title: '高純度 Omega-3 補充',
    description: '提升心血管健康與抗發炎能力。',
    category: 'nutrition',
    impact: 'high',
    recommendation: '建議使用大研生醫魚油，每日 2 顆。'
  },
  {
    id: 'zone-2',
    title: 'Zone 2 低強度有氧',
    description: '優化線粒體功能與代謝健康。',
    category: 'exercise',
    impact: 'high',
    recommendation: '每週至少 150 分鐘，心率維持在 130-140 bpm。'
  },
  {
    id: 'magnesium',
    title: '甘胺酸鎂補充',
    description: '改善睡眠品質與肌肉放鬆。',
    category: 'nutrition',
    impact: 'medium',
    recommendation: '睡前 30 分鐘服用 200mg。'
  }
];

export const ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    title: '解密長壽基因：Sirtuins 的運作機制',
    excerpt: '探索如何透過生活方式啟動體內的長壽開關。',
    content: '長壽基因 Sirtuins 在細胞修復與代謝調節中扮演關鍵角色。透過適度的熱量限制、規律運動以及特定的營養補充，我們可以有效啟動這些基因，延緩細胞老化過程。',
    date: '2024-03-20',
    category: '科學研究',
    image: 'https://picsum.photos/seed/science/800/600',
    author: 'Dr. Vitevo'
  },
  {
    id: 'art-2',
    title: 'AI 如何精準預測你的生物年齡',
    excerpt: '利用機器學習分析生理數據，提供個人化的健康導航。',
    content: '傳統的生理年齡計算已不足夠，AI 提供了更深層次的洞察。透過分析成千上萬的生物標記，Vitevo AI 能夠精確定位您的生物年齡，並預測未來的健康趨勢。',
    date: '2024-03-15',
    category: '技術趨勢',
    image: 'https://picsum.photos/seed/tech/800/600',
    author: 'Vitevo AI Team'
  }
];

export const BRAND_NAME = 'Vitevo.AI';
