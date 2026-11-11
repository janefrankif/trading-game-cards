'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Lock, 
  ArrowUp, 
  CheckCircle2, 
  Sparkles,
  FileText
} from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

interface TcgFooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectCategory: (cat: string) => void;
}

export function TcgFooter({ onNavigate, onSelectCategory }: TcgFooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { colors } = useTheme();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-200 bg-slate-50 pt-8 pb-6 text-xs text-zinc-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Compact Top Newsletter Bar — Clean White Panel */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5 text-center md:text-left">
            <div className={`w-7 h-7 rounded-lg ${colors.badgeBg} border ${colors.badgeBorder} flex items-center justify-center ${colors.textAccent} shrink-0`}>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-bold text-zinc-900 text-xs sm:text-sm">
                Collector Intel & Drop Alerts
              </div>
              <div className="text-[11px] text-zinc-500">
                Use promo code <strong className={`${colors.textAccent} font-mono`}>VAULT10</strong> for 10% off your first escrow trade.
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0">
            {subscribed ? (
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl font-semibold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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
                  className="bg-zinc-100 hover:bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 flex-1"
                />
                <button
                  type="submit"
                  className={`px-4 py-1.5 rounded-xl ${colors.buttonBg} ${colors.buttonText} font-bold text-xs transition-colors shrink-0 shadow-xs`}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Columns Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          {/* Brand Col */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-100 shrink-0 shadow-xs">
                <Image
                  src="/site-logo.jpg"
                  alt="Vault & Exchange Logo"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="font-black text-sm text-zinc-900 tracking-tight">
                VAULT<span className={colors.textAccent}>CARDS</span>
              </div>
            </div>
            <p className="text-zinc-600 text-[11px] leading-relaxed">
              Online card shop & bilateral escrow exchange. Physical verification on every slab.
            </p>
            <div className="text-[10px] text-zinc-400">
              USPS Adult Signature Tracking # Available
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2">
              Explore Pages
            </h4>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-zinc-950 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-zinc-950 transition-colors">
                  Shop Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('featured')} className="hover:text-zinc-950 transition-colors">
                  Featured Grails
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-zinc-950 transition-colors">
                  About & Escrow
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-zinc-950 transition-colors">
                  Collector Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faqs')} className="hover:text-zinc-950 transition-colors">
                  FAQs & Help
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-zinc-950 transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Franchises */}
          <div>
            <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2">
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
                    className="hover:text-zinc-950 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Security */}
          <div>
            <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2">
              Escrow Protection
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Dual-Custody Escrow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className={`w-3.5 h-3.5 ${colors.textAccent} shrink-0`} />
                <span>72-Hour Physical Inspection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>IRS 1099-K Tax Compliant</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <div>
            © 2026 VaultCards TCG. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Privacy</span>
            <span>•</span>
            <span>Terms</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 px-2.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-700 transition-colors flex items-center gap-1 text-[11px] border border-zinc-200 shadow-xs"
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
