'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { CardItem, SAMPLE_CARDS } from '@/lib/marketplace-data';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  ArrowLeftRight, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Award,
  CheckCircle2,
  Tag
} from 'lucide-react';

interface MarketplaceExplorerProps {
  onSelectCard: (card: CardItem) => void;
  onInitiateTrade: (card: CardItem) => void;
  onInitiateBuy: (card: CardItem) => void;
}

export function MarketplaceExplorer({
  onSelectCard,
  onInitiateTrade,
  onInitiateBuy,
}: MarketplaceExplorerProps) {
  const [selectedGame, setSelectedGame] = useState<string>('All');
  const [conditionFilter, setConditionFilter] = useState<'all' | 'graded' | 'raw'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tradeOnly, setTradeOnly] = useState<boolean>(false);

  const games = ['All', 'Pokemon', 'Magic: The Gathering', 'Yu-Gi-Oh!', 'Disney Lorcana', 'One Piece'];

  const filteredCards = useMemo(() => {
    return SAMPLE_CARDS.filter((card) => {
      // Game filter
      if (selectedGame !== 'All' && card.game !== selectedGame) {
        return false;
      }
      // Condition filter
      if (conditionFilter === 'graded' && !card.isGraded) {
        return false;
      }
      if (conditionFilter === 'raw' && card.isGraded) {
        return false;
      }
      // Trade filter
      if (tradeOnly && !card.allowTrades) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = card.name.toLowerCase().includes(q);
        const matchesSet = card.set.toLowerCase().includes(q);
        const matchesCardNo = card.cardNumber.toLowerCase().includes(q);
        const matchesSeller = card.seller.name.toLowerCase().includes(q);
        if (!matchesName && !matchesSet && !matchesCardNo && !matchesSeller) {
          return false;
        }
      }
      return true;
    });
  }, [selectedGame, conditionFilter, tradeOnly, searchQuery]);

  return (
    <section id="marketplace-explorer-section" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> High-End Collector Marketplace Prototype
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Specialized TCG Exchange & Escrow Engine
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Engineered for high-value cards in the US market: dual-condition hierarchy (Raw NM vs PSA/BGS/CGC Slabs), bilateral trades with cash balance deltas, and tamper-proof mail-in escrow protection.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-4 border border-slate-800 shadow-md space-y-4">
        
        {/* Search & Top Toggles */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              id="marketplace-search-input"
              type="text"
              placeholder="Search by card name, set, # or seller (e.g. Charizard, LOB-001)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end text-xs">
            {/* Condition Toggle */}
            <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
              <button
                onClick={() => setConditionFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  conditionFilter === 'all' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Cards
              </button>
              <button
                onClick={() => setConditionFilter('graded')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  conditionFilter === 'graded' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Graded Slabs Only
              </button>
              <button
                onClick={() => setConditionFilter('raw')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  conditionFilter === 'raw' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Raw Singles
              </button>
            </div>

            {/* Trade Toggle */}
            <button
              id="trade-only-toggle-btn"
              onClick={() => setTradeOnly(!tradeOnly)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                tradeOnly
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-semibold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Accepting Trades</span>
            </button>
          </div>
        </div>

        {/* Game Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800/80 pt-3 text-xs">
          {games.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGame(g)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                selectedGame === g
                  ? 'bg-indigo-600/90 text-white shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            id={`card-item-${card.id}`}
            className="group bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            {/* Top Card Image & Tags */}
            <div className="relative p-4 bg-slate-950/60 flex flex-col items-center">
              {/* Top Badges */}
              <div className="w-full flex items-center justify-between mb-3 text-[11px]">
                <span className="font-semibold text-amber-400 truncate max-w-[150px]">
                  {card.game}
                </span>
                {card.allowTrades && (
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 font-medium">
                    <ArrowLeftRight className="w-3 h-3" /> Trades Allowed
                  </span>
                )}
              </div>

              {/* Card Image Box */}
              <div 
                className="relative w-44 h-60 rounded-xl overflow-hidden shadow-xl border border-slate-700 cursor-pointer group-hover:scale-102 transition-transform duration-200"
                onClick={() => onSelectCard(card)}
              >
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, 176px"
                />

                {/* Graded Slab Badge Header Overlay */}
                {card.isGraded && (
                  <div className="absolute top-0 inset-x-0 bg-slate-950/90 border-b border-amber-500/40 px-2 py-1 flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-amber-400">{card.gradeScore}</span>
                    <span className="text-slate-400">{card.gradingCompany}</span>
                  </div>
                )}

                {/* Raw Condition Overlay */}
                {!card.isGraded && (
                  <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 border-t border-slate-700 px-2 py-1 text-center text-[10px] font-bold text-emerald-400">
                    RAW • {card.rawCondition}
                  </div>
                )}
              </div>

              {/* Set and Year */}
              <div className="mt-3 text-center">
                <span className="text-xs text-slate-400">
                  {card.set} ({card.setYear}) • #{card.cardNumber}
                </span>
              </div>
            </div>

            {/* Card Content & Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 
                  onClick={() => onSelectCard(card)}
                  className="font-black text-slate-100 text-base leading-tight hover:text-indigo-400 cursor-pointer transition-colors"
                >
                  {card.name}
                </h3>
                
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {card.rarity}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {card.finish}
                  </span>
                </div>
              </div>

              {/* Price & 7D Trend */}
              <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Escrow Price</div>
                  <div className="text-xl font-black text-emerald-400">${card.listingPrice.toLocaleString()}</div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-400">7D Comp Trend</div>
                  <div className="flex items-center gap-1 justify-end font-semibold text-xs">
                    {card.sevenDayChange >= 0 ? (
                      <span className="inline-flex items-center text-emerald-400">
                        <TrendingUp className="w-3 h-3" /> +{card.sevenDayChange}%
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-rose-400">
                        <TrendingDown className="w-3 h-3" /> {card.sevenDayChange}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Seller Trust Info */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                  {card.seller.name}
                </span>
                <span>{card.seller.rating}% ({card.seller.salesCount})</span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <button
                  id={`view-card-btn-${card.id}`}
                  onClick={() => onSelectCard(card)}
                  className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
                >
                  Macro View
                </button>

                <button
                  id={`buy-card-btn-${card.id}`}
                  onClick={() => onInitiateBuy(card)}
                  className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Escrow Buy</span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400">
          <p className="text-base font-semibold text-slate-300">No cards matched your filter criteria.</p>
          <p className="text-xs mt-1">Try resetting the search bar or changing the condition filters.</p>
        </div>
      )}
    </section>
  );
}
