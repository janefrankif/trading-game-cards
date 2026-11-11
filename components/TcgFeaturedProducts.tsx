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
  ArrowRight
} from 'lucide-react';
import { CardItem } from '@/lib/marketplace-data';
import { useTheme } from '@/lib/theme-context';

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
  const { colors } = useTheme();

  // Filter logic
  const filteredCards = cards.filter((card) => {
    if (activeFilter === 'grails') return card.listingPrice >= 2000;
    if (activeFilter === 'graded') return card.isGraded;
    if (activeFilter === 'modern') return card.setYear >= 2020;
    return true;
  });

  return (
    <section id="featured" className="py-12 border-t border-zinc-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className={`flex items-center gap-2 ${colors.textAccent} font-bold text-xs uppercase tracking-wider`}>
              <Sparkles className="w-4 h-4" />
              <span>Curated Collector Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-1">
              Featured Products & Grail Slabs
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
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
                    ? `${colors.buttonBg} ${colors.buttonText} shadow-xs`
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 border border-zinc-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Showcase Banner */}
        <div className="relative w-full aspect-[16/7] sm:aspect-[21/8] min-h-[180px] max-h-72 rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-900 shadow-md group">
          <Image
            src="/featured-image.jpg"
            alt="Premier Vault Investment Grade TCG Showcase Banner"
            fill
            className="object-cover group-hover:scale-102 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end max-w-lg space-y-1.5 pointer-events-none">
            <span className={`px-2.5 py-0.5 rounded-md ${colors.badgeBg} border ${colors.badgeBorder} text-[10px] font-mono font-bold ${colors.textAccent} w-fit`}>
              OFFICIAL FEATURED SPOTLIGHT
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">
              Aether Vault Investment Slabs
            </h3>
            <p className="text-xs text-zinc-200 line-clamp-2">
              Museum-quality verified slabs with guaranteed authenticity and dual-custody escrow protection.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="group bg-white rounded-2xl border border-zinc-200 hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5"
            >
              <div>
                {/* Top Image Preview */}
                <div 
                  onClick={() => onSelectCard(card)}
                  className="relative w-full h-72 bg-zinc-50 border-b border-zinc-100 overflow-hidden cursor-pointer flex items-center justify-center p-3"
                >
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Grade Badge */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-white/95 border border-zinc-200 text-zinc-900 font-mono font-bold text-[10px] shadow-xs flex items-center gap-1 backdrop-blur-xs">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{card.isGraded ? card.gradeScore : card.rawCondition}</span>
                  </div>

                  {/* Franchise Pill */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-white/95 border border-zinc-200 text-zinc-700 text-[10px] font-bold shadow-xs">
                    {card.game}
                  </div>

                  {/* Quick Inspect Button on Hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCard(card);
                    }}
                    className="absolute inset-x-4 bottom-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Archival Slabs</span>
                  </button>
                </div>

                {/* Card Meta */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="truncate">{card.set}</span>
                    <span className="font-mono text-[10px] text-zinc-400 shrink-0">#{card.cardNumber}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectCard(card)}
                    className="font-bold text-zinc-900 text-sm hover:text-zinc-600 transition-colors cursor-pointer line-clamp-1"
                    title={card.name}
                  >
                    {card.name}
                  </h3>

                  {/* Pricing and 7-day Change */}
                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="font-mono font-black text-zinc-900 text-base">
                        ${card.listingPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-zinc-400 ml-1">USD</span>
                    </div>

                    <div className="flex items-center gap-0.5 text-[11px] font-mono">
                      <TrendingUp className={`w-3 h-3 ${card.sevenDayChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`} />
                      <span className={card.sevenDayChange >= 0 ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                        {card.sevenDayChange >= 0 ? '+' : ''}{card.sevenDayChange}%
                      </span>
                    </div>
                  </div>

                  {/* Trade Preference snippet */}
                  {card.allowTrades && card.tradePreferences && (
                    <div className="text-[10px] text-zinc-600 bg-zinc-50 p-1.5 rounded-lg border border-zinc-200 truncate">
                      <span className={`${colors.textAccent} font-semibold`}>Prefers: </span>
                      <span>{card.tradePreferences[0]}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => onAddToCart(card)}
                  className={`py-2 px-2.5 rounded-xl ${colors.buttonBg} ${colors.buttonText} font-black text-xs flex items-center justify-center gap-1 transition-colors shadow-xs`}
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Buy Now</span>
                </button>

                <button
                  onClick={() => onProposeTrade(card)}
                  className="py-2 px-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <Repeat className="w-3 h-3 text-emerald-600" />
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
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-800 font-bold text-xs transition-colors shadow-xs"
          >
            <span>View All Cards in Full Shop Catalog</span>
            <ArrowRight className={`w-4 h-4 ${colors.textAccent}`} />
          </button>
        </div>

      </div>
    </section>
  );
}
