/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface BioData {
  id: string;
  label: string;
  value: string | number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'optimal' | 'warning' | 'critical';
}

export interface Strategy {
  id: string;
  title: string;
  description: string;
  category: 'nutrition' | 'exercise' | 'sleep' | 'mindset';
  impact: 'high' | 'medium' | 'low';
  recommendation?: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'dashboard' }
  | { type: 'journal', article: JournalArticle }
  | { type: 'strategy', strategy: Strategy };
