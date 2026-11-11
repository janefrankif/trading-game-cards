'use client';

import React, { useState } from 'react';
import { STRATEGY_TOPICS } from '@/lib/marketplace-data';
import { 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Search, 
  Server, 
  Code2, 
  CheckCircle2, 
  AlertCircle,
  Cpu,
  Database
} from 'lucide-react';

export function ArchitectureGuide() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(STRATEGY_TOPICS[0].id);

  const currentTopic = STRATEGY_TOPICS.find((t) => t.id === selectedTopicId) || STRATEGY_TOPICS[0];

  return (
    <section id="architecture-guide-section" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 mb-2">
          <BookOpen className="w-3.5 h-3.5" /> Technical Specification & Strategy Manual
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Specialized TCG E-Commerce Blueprint (US Market)
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
          Complete architectural guide addressing core features, headless platform selection, fraud-resistant escrow models, and programmatic SEO hierarchies to outrank generic marketplaces.
        </p>

        {/* Tab Selector */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {STRATEGY_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                selectedTopicId === topic.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-900/40'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              {topic.category === 'features' && <Layers className="w-3.5 h-3.5" />}
              {topic.category === 'platforms' && <Server className="w-3.5 h-3.5" />}
              {topic.category === 'security' && <ShieldCheck className="w-3.5 h-3.5" />}
              {topic.category === 'seo' && <Search className="w-3.5 h-3.5" />}
              <span>{topic.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: In-depth Strategy Content */}
        <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {currentTopic.badge}
            </span>
            <h3 className="text-xl font-black text-white mt-2">
              {currentTopic.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {currentTopic.summary}
            </p>
          </div>

          {/* Highlights checklist */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Requirements & Architecture Standards:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentTopic.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deep-dive sections */}
          <div className="space-y-6">
            {currentTopic.inDepthArchitecture.map((section, idx) => (
              <div key={idx} className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                <h4 className="text-base font-bold text-white tracking-tight">
                  {section.heading}
                </h4>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed text-slate-300 text-xs sm:text-sm">
                    {p}
                  </p>
                ))}

                {section.technicalPoints && (
                  <div className="mt-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5 font-mono text-[11px] text-indigo-300">
                    <div className="text-slate-400 font-sans font-semibold flex items-center gap-1.5 mb-1 text-xs">
                      <Code2 className="w-3.5 h-3.5 text-indigo-400" /> Engineering Implementation Notes:
                    </div>
                    {section.technicalPoints.map((pt, ptIdx) => (
                      <div key={ptIdx} className="flex items-start gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.usMarketNote && (
                  <div className="mt-2 p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 text-xs text-amber-200">
                    <strong className="text-amber-300">US Collector Insight:</strong> {section.usMarketNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 Cols: Technical Platform Matrix */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Platform Recommendation Breakdown */}
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Platform Comparison Matrix</span>
            </h4>

            <div className="space-y-3 text-xs">
              
              {/* Option 1: Headless Next.js + Medusa / Custom API */}
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/40">
                <div className="flex items-center justify-between font-bold text-white mb-1">
                  <span>Headless Next.js + MedusaJS</span>
                  <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300">Recommended</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Best-in-class for programmatic SEO, unlimited variant hierarchy (Raw vs Graded), and native support for Stripe Connect multi-party escrow holds.
                </p>
              </div>

              {/* Option 2: Shopify Plus + Hydrogen */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between font-bold text-slate-200 mb-1">
                  <span>Shopify Plus (Hydrogen)</span>
                  <span className="text-[10px] px-2 py-0.2 rounded bg-amber-500/20 text-amber-300">Expensive</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  High monthly costs ($2,000+/mo). Struggles with multi-vendor bilateral trading and strict 100-variant limit unless extensively hacked with metaobjects.
                </p>
              </div>

              {/* Option 3: WooCommerce */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center justify-between font-bold text-slate-200 mb-1">
                  <span>WooCommerce (WordPress)</span>
                  <span className="text-[10px] px-2 py-0.2 rounded bg-rose-500/20 text-rose-300">Not Advised</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Slow queries on 50,000+ card variations; poor concurrency during high-traffic new set release drops; vulnerable to plugin security exploits.
                </p>
              </div>

            </div>
          </div>

          {/* Database Schema Overview */}
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Core TCG Database Schema</span>
            </h4>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
              <div className="text-amber-400 font-bold">PostgreSQL Relational ERD:</div>
              <div>• <code>cards</code> (id, game_id, set_id, name, number, rarity)</div>
              <div>• <code>card_variants</code> (id, card_id, finish, print_era)</div>
              <div>• <code>listing_items</code> (id, variant_id, is_graded, cert_no, grade_score, price)</div>
              <div>• <code>escrow_trades</code> (id, initiator_id, target_id, cash_delta, status)</div>
              <div>• <code>shipment_audits</code> (id, tracking_no, tamper_seal_id, carrier_status)</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
