'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  MessageSquare
} from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/tcg-content';
import { useTheme } from '@/lib/theme-context';

interface TcgFaqsProps {
  onGoToContact: () => void;
}

export function TcgFaqs({ onGoToContact }: TcgFaqsProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [faqCategory, setFaqCategory] = useState<string>('All');
  const [faqSearch, setFaqSearch] = useState<string>('');
  const { colors } = useTheme();

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
    <section id="faqs" className="py-12 border-t border-zinc-200 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.badgeBg} border ${colors.badgeBorder} ${colors.textAccent} text-xs font-bold uppercase tracking-wider`}>
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Collector Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed">
            All 10 comprehensive answers regarding bilateral escrow trades, authentication protocols, shipping security, unsearched booster boxes, and seller payouts.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search questions (e.g., escrow, adult signature, cash delta, valuation)..."
              className="w-full bg-zinc-100 hover:bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
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
                    ? `${colors.buttonBg} ${colors.buttonText} shadow-xs`
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 border border-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Complete Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-zinc-50/60 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm text-zinc-900 flex items-center gap-2">
                    <span className="text-zinc-400 font-mono text-xs">#{faq.id.replace('faq-', '')}</span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-zinc-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3.5 bg-zinc-50/50 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="bg-slate-50 border border-zinc-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-zinc-900 text-sm">Still have a specific question?</h4>
            <p className="text-xs text-zinc-500">
              Our appraisal and escrow operations specialists are available 6 days a week.
            </p>
          </div>
          <button
            onClick={onGoToContact}
            className={`px-5 py-2.5 rounded-xl ${colors.buttonBg} ${colors.buttonText} font-bold text-xs shrink-0 transition-all shadow-xs flex items-center gap-2`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Vault Team</span>
          </button>
        </div>

      </div>
    </section>
  );
}
