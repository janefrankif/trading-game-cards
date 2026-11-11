'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowUp, 
  CheckCircle2, 
  Sparkles,
  Phone,
  FileText,
  Apple,
  Bitcoin,
  Building2,
  DollarSign,
  Send,
  CreditCard
} from 'lucide-react';

interface TcgFooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectCategory: (cat: string) => void;
}

export function TcgFooter({ onNavigate, onSelectCategory }: TcgFooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 pt-8 pb-6 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Compact Top Newsletter Bar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5 text-center md:text-left">
            <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-700/50 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">
                Collector Intel & Drop Alerts
              </div>
              <div className="text-[11px] text-slate-400">
                Use promo code <strong className="text-emerald-400 font-mono">VAULT10</strong> for 10% off your first escrow trade.
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0">
            {subscribed ? (
              <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 px-3 py-1.5 rounded-xl font-semibold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Subscribed with VAULT10!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-80">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email..."
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Columns Links (Compact Spacing) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          {/* Brand Col */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-xs">
                TCG
              </div>
              <div className="font-black text-sm text-white tracking-tight">
                VAULT<span className="text-indigo-400">CARDS</span>
              </div>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Online card shop & bilateral escrow exchange. Physical verification on every slab.
            </p>
            <div className="text-[10px] text-slate-500">
              USPS Adult Signature Tracking # Available
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              Explore Pages
            </h4>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-indigo-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-indigo-400 transition-colors">
                  Shop Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('featured')} className="hover:text-indigo-400 transition-colors">
                  Featured Grails
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-indigo-400 transition-colors">
                  About & Escrow
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-indigo-400 transition-colors">
                  Collector Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faqs')} className="hover:text-indigo-400 transition-colors">
                  FAQs & Help
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-indigo-400 transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Franchises */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              Card Franchises
            </h4>
            <ul className="space-y-1 text-xs">
              {['Pokemon', 'Magic: The Gathering', 'Yu-Gi-Oh!', 'Disney Lorcana', 'One Piece'].map((cat) => (
                <li key={cat}>
                  <button 
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigate('shop');
                    }}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Security */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              Escrow Protection
            </h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Dual-Custody Escrow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>72-Hour Physical Inspection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>IRS 1099-K Tax Compliant</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 VaultCards TCG. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Privacy</span>
            <span>•</span>
            <span>Terms</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3 h-3" />
              <span>Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
