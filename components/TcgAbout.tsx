'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Repeat, 
  Clock, 
  Award, 
  CheckCircle2, 
  Building2, 
  Truck, 
  Sparkles,
  SearchCheck,
  Scale
} from 'lucide-react';

interface TcgAboutProps {
  onExploreShop: () => void;
  onOpenTradeModal: () => void;
}

export function TcgAbout({ onExploreShop, onOpenTradeModal }: TcgAboutProps) {
  const pillars = [
    {
      icon: Lock,
      color: 'text-indigo-400',
      bg: 'bg-indigo-950/60 border-indigo-700/40',
      title: 'Dual-Custody Escrow Vault',
      description: 'Zero counterparty risk. When collectors agree on a bilateral card trade, both parties ship to our secure US escrow vault simultaneously. Neither party ever risks "sending first".'
    },
    {
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-950/60 border-amber-700/40',
      title: '72-Hour Physical Inspection',
      description: 'Your purchase or trade funds are held in escrow for a full 72 hours after carrier delivery. If a slab is tampered or a raw card doesn\'t match its stated condition, you receive a 100% refund.'
    },
    {
      icon: SearchCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/60 border-emerald-700/40',
      title: 'Micro-Optic Authentication',
      description: 'Every high-value slab is cross-checked with PSA, BGS, and CGC serial databases. Our in-house numismatic and TCG specialists inspect case sonics, holofoil rosette patterns, and edge wear.'
    },
    {
      icon: Truck,
      color: 'text-purple-400',
      bg: 'bg-purple-950/60 border-purple-700/40',
      title: 'USPS Insured Adult Signature',
      description: 'Orders and trade dispatches over $250 are armored in rigid cardboard protectors and shipped with mandatory USPS Priority Express Adult Signature confirmation with 100% full-value insurance.'
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Lock Trade Agreement',
      description: 'Browse the shop, pick a card that accepts trades, and propose an offer from your collection with optional cash delta compensation.'
    },
    {
      num: '02',
      title: 'Simultaneous Vault Ingestion',
      description: 'Both collectors ship their verified cards to our Los Angeles vault facility using insured prepaid labels with tracking.'
    },
    {
      num: '03',
      title: 'Authentication & Dual Dispatch',
      description: 'Our team verifies slabs under UV and 40x magnification. Once validated, cards are cross-shipped with Adult Signature and a 72-hour inspection guarantee.'
    },
  ];

  return (
    <section id="about" className="py-16 border-t border-slate-900 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-600/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>About Our Platform</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Built by Collectors, Engineered for Safe Trading
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            For decades, trading high-value game cards online was rife with scam risks, counterfeit slabs, and the anxiety of who sends first. We created VaultCards to provide a fully authenticated, escrow-backed marketplace where collectors can buy, sell, and trade with absolute confidence.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-3 transition-all hover:-translate-y-1 shadow-md"
              >
                <div className={`w-10 h-10 rounded-xl ${p.bg} border flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${p.color}`} />
                </div>
                <h3 className="text-sm font-black text-white">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>

        {/* How Trading Works 3-Step Lifecycle Box */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Repeat className="w-3.5 h-3.5" />
                <span>Bilateral Trade Engine</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                How Card Trading Works (Step-by-Step)
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {steps.map((step, i) => (
              <div key={i} className="relative bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-2">
                <div className="font-mono text-2xl font-black text-indigo-400/60">
                  {step.num}
                </div>
                <h4 className="text-sm font-bold text-white">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance & Grading Partners Banner */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-xs">
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">PSA Certified</div>
            <div className="text-[11px] text-slate-400">Direct API Pop Verification</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">Beckett (BGS)</div>
            <div className="text-[11px] text-slate-400">Subgrade Authenticity Sync</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">USPS Priority Insured</div>
            <div className="text-[11px] text-slate-400">Adult Signature Courier</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">IRS 1099-K Ready</div>
            <div className="text-[11px] text-slate-400">Marketplace Facilitator Tax</div>
          </div>
        </div>

      </div>
    </section>
  );
}
