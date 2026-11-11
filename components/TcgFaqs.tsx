'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  ShieldCheck, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { FAQ_ITEMS, FaqItem } from '@/lib/tcg-content';

interface TcgFaqsProps {
  onGoToContact: () => void;
}

export function TcgFaqs({ onGoToContact }: TcgFaqsProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [faqCategory, setFaqCategory] = useState<string>('All');
  const [faqSearch, setFaqSearch] = useState<string>('');

  const categories = ['All', 'Trading & Escrow', 'Authentication & Grading', 'Orders & Shipping', 'Payouts & Taxes'];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (faqCategory !== 'All' && item.category !== faqCategory) {
      return false;
    }
    if (faqSearch.trim()) {
      const q = faqSearch.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-16 border-t border-slate-900 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-600/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Everything You Need to Know
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Got questions about bilateral escrow trades, authentication protocols, shipping security, or IRS tax thresholds? We&apos;ve got answers.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search questions (e.g., escrow, adult signature, cash delta)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  faqCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm text-white flex items-center gap-2">
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-indigo-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-300' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="bg-gradient-to-r from-indigo-950/70 to-slate-900 border border-indigo-900/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-white text-sm">Still have a specific question?</h4>
            <p className="text-xs text-slate-400">
              Our appraisal and escrow operations specialists are available 6 days a week.
            </p>
          </div>
          <button
            onClick={onGoToContact}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shrink-0 transition-colors shadow-md"
          >
            Contact Vault Team
          </button>
        </div>

      </div>
    </section>
  );
}
