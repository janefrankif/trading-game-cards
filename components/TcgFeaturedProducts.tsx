'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Repeat, 
  ShoppingBag, 
  Eye, 
  ShieldCheck, 
  TrendingUp, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { CardItem } from '@/lib/marketplace-data';

interface TcgFeaturedProductsProps {
  cards: CardItem[];
  onSelectCard: (card: CardItem) => void;
  onAddToCart: (card: CardItem) => void;
  onProposeTrade: (card: CardItem) => void;
  onViewAllInShop: () => void;
}

export function TcgFeaturedProducts({
  cards,
  onSelectCard,
  onAddToCart,
  onProposeTrade,
  onViewAllInShop,
}: TcgFeaturedProductsProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'grails' | 'graded' | 'modern'>('all');

  // Filter logic
  const filteredCards = cards.filter((card) => {
    if (activeFilter === 'grails') return card.listingPrice >= 2000;
    if (activeFilter === 'graded') return card.isGraded;
    if (activeFilter === 'modern') return card.setYear >= 2020;
    return true;
  });

  return (
    <section id="featured" className="py-12 border-t border-slate-900 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Curated Collector Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Featured Products & Grail Slabs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Handpicked investment-grade cards available for immediate purchase or bilateral trade through our double-sided escrow vault.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'grails', label: 'Vintage Grails ($2K+)' },
              { id: 'graded', label: 'Graded (PSA/BGS)' },
              { id: 'modern', label: 'Modern Alt-Arts' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="group bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-950/40 hover:-translate-y-1"
            >
              <div>
                {/* Top Image Preview */}
                <div 
                  onClick={() => onSelectCard(card)}
                  className="relative w-full h-72 bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center p-3"
                >
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient bottom cover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                  {/* Grade Badge */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-slate-950/90 border border-slate-700 text-amber-300 font-mono font-bold text-[10px] backdrop-blur-sm flex items-center gap-1 shadow-md">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    <span>{card.isGraded ? card.gradeScore : card.rawCondition}</span>
                  </div>

                  {/* Franchise Pill */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-indigo-950/90 border border-indigo-700/50 text-indigo-300 text-[10px] font-bold">
                    {card.game}
                  </div>

                  {/* Quick Inspect Button on Hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCard(card);
                    }}
                    className="absolute inset-x-4 bottom-3 py-2 rounded-xl bg-slate-900/95 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md shadow-xl"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Archival Slabs</span>
                  </button>
                </div>

                {/* Card Meta */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate">{card.set}</span>
                    <span className="font-mono text-[10px] text-slate-500 shrink-0">#{card.cardNumber}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectCard(card)}
                    className="font-bold text-white text-sm hover:text-indigo-400 transition-colors cursor-pointer line-clamp-1"
                    title={card.name}
                  >
                    {card.name}
                  </h3>

                  {/* Pricing and 7-day Change */}
                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="font-mono font-black text-emerald-400 text-base">
                        ${card.listingPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-500 ml-1">USD</span>
                    </div>

                    <div className="flex items-center gap-0.5 text-[11px] font-mono">
                      <TrendingUp className={`w-3 h-3 ${card.sevenDayChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`} />
                      <span className={card.sevenDayChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {card.sevenDayChange >= 0 ? '+' : ''}{card.sevenDayChange}%
                      </span>
                    </div>
                  </div>

                  {/* Trade Preference snippet */}
                  {card.allowTrades && card.tradePreferences && (
                    <div className="text-[10px] text-slate-400 bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80 truncate">
                      <span className="text-indigo-400 font-semibold">Prefers: </span>
                      <span>{card.tradePreferences[0]}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onAddToCart(card)}
                  className="py-2 px-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Buy Now</span>
                </button>

                <button
                  onClick={() => onProposeTrade(card)}
                  className="py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 hover:text-white border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <Repeat className="w-3 h-3 text-emerald-400" />
                  <span>Trade</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-2">
          <button
            onClick={onViewAllInShop}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs transition-colors shadow-sm"
          >
            <span>View All Cards in Full Shop Catalog</span>
            <ArrowRight className="w-4 h-4 text-indigo-400" />
          </button>
        </div>

      </div>
    </section>
  );
}
