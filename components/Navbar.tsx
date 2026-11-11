'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Layers, 
  ArrowLeftRight, 
  Calculator, 
  Sparkles,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'marketplace' | 'architecture' | 'escrow' | 'seo' | 'fees' | 'ai';
  setActiveTab: (tab: 'marketplace' | 'architecture' | 'escrow' | 'seo' | 'fees' | 'ai') => void;
  onOpenAi: () => void;
}

export function Navbar({ activeTab, setActiveTab, onOpenAi }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand & Market Badges */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-xl tracking-tighter">
              TCG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-100 tracking-tight">VaultTrade<span className="text-amber-400">HQ</span></span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" /> US Market Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Specialized E-Commerce Architecture & Trading Engine</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs font-medium">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'marketplace'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Live Marketplace</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'architecture'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Platform Blueprint</span>
            </button>

            <button
              onClick={() => setActiveTab('escrow')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'escrow'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Escrow Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'seo'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Programmatic SEO</span>
            </button>

            <button
              onClick={() => setActiveTab('fees')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === 'fees'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Fee & Tax Model</span>
            </button>
          </nav>

          {/* AI Consultant Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAi}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs transition-all shadow-md hover:shadow-amber-500/25 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Ask TCG Consultant</span>
            </button>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-800 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'marketplace' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'architecture' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Architecture
          </button>
          <button
            onClick={() => setActiveTab('escrow')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'escrow' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Escrow Flow
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'seo' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Programmatic SEO
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
              activeTab === 'fees' ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            Fees & Payouts
          </button>
        </div>

      </div>
    </header>
  );
}
