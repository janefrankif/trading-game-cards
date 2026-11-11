'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Repeat, 
  Eye, 
  ShieldCheck, 
  SlidersHorizontal,
  TrendingUp,
  X,
  CheckCircle2
} from 'lucide-react';
import { CardItem } from '@/lib/marketplace-data';
import { TCG_CATEGORIES } from './TcgHeader';

interface TcgShopProps {
  cards: CardItem[];
  onSelectCard: (card: CardItem) => void;
  onAddToCart: (card: CardItem) => void;
  onProposeTrade: (card: CardItem) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export function TcgShop({
  cards,
  onSelectCard,
  onAddToCart,
  onProposeTrade,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: TcgShopProps) {
  const [conditionFilter, setConditionFilter] = useState<'all' | 'graded' | 'raw'>('all');
  const [tradeOnly, setTradeOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'change'>('featured');
  const [priceMax, setPriceMax] = useState<number>(25000);

  // Filter and Sort Cards
  const filteredAndSortedCards = useMemo(() => {
    return cards
      .filter((card) => {
        // Category
        if (selectedCategory !== 'All' && card.game !== selectedCategory) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = card.name.toLowerCase().includes(q);
          const matchSet = card.set.toLowerCase().includes(q);
          const matchGame = card.game.toLowerCase().includes(q);
          const matchNumber = card.cardNumber.toLowerCase().includes(q);
          if (!matchName && !matchSet && !matchGame && !matchNumber) return false;
        }

        // Condition
        if (conditionFilter === 'graded' && !card.isGraded) return false;
        if (conditionFilter === 'raw' && card.isGraded) return false;

        // Price Max
        if (card.listingPrice > priceMax) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.listingPrice - b.listingPrice;
        if (sortBy === 'price-desc') return b.listingPrice - a.listingPrice;
        if (sortBy === 'change') return b.sevenDayChange - a.sevenDayChange;
        return 0; // default featured order
      });
  }, [cards, selectedCategory, searchQuery, conditionFilter, priceMax, sortBy]);

  return (
    <section id="shop" className="py-12 border-t border-slate-900 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
            <span>Store Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Shop Collectible Cards
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Browse our verified inventory of Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Lorcana, and One Piece singles. Complete direct purchases with escrow tracking.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-4 shadow-lg">
          
          {/* Top Row: Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {TCG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Middle Row: Search, Condition, Sort, Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center text-xs">
            
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search card name, set, or #"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-8 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white font-bold"
                >
                  ×
                </button>
              )}
            </div>

            {/* Condition Toggle */}
            <div className="lg:col-span-3 flex bg-slate-950 border border-slate-700/80 rounded-xl p-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'graded', label: 'Graded Slabs' },
                { id: 'raw', label: 'Raw Singles' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setConditionFilter(c.id as any)}
                  className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors ${
                    conditionFilter === c.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Sort Select */}
            <div className="lg:col-span-5">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="featured">Sort: Featured Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="change">Highest 7-Day Surge</option>
              </select>
            </div>

          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] text-slate-400">
            <span>
              Showing <strong className="text-white">{filteredAndSortedCards.length}</strong> collectible items
              {selectedCategory !== 'All' && <span> in <span className="text-indigo-400">{selectedCategory}</span></span>}
            </span>

            {(searchQuery || selectedCategory !== 'All' || conditionFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setConditionFilter('all');
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

        </div>

        {/* Empty State */}
        {filteredAndSortedCards.length === 0 && (
          <div className="py-16 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
            <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No trading cards matched your criteria</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try clearing your search query or toggling between graded slabs and raw singles.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setConditionFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedCards.map((card) => (
            <div
              key={card.id}
              className="group bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-950/40 hover:-translate-y-1"
            >
              <div>
                {/* Image Box */}
                <div 
                  onClick={() => onSelectCard(card)}
                  className="relative w-full h-64 bg-slate-950 cursor-pointer overflow-hidden flex items-center justify-center p-3"
                >
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                  {/* Grade Badge */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-slate-950/90 border border-slate-700 text-amber-300 font-mono font-bold text-[10px] backdrop-blur-sm flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    <span>{card.isGraded ? card.gradeScore : card.rawCondition}</span>
                  </div>

                  {/* Franchise pill */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/90 border border-slate-700 text-slate-300 text-[10px] font-bold">
                    {card.game}
                  </div>

                  {/* Quick Inspect Button on Hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCard(card);
                    }}
                    className="absolute inset-x-3 bottom-3 py-2 rounded-xl bg-slate-900/95 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md shadow-xl"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Archival View</span>
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate">{card.set}</span>
                    <span className="font-mono text-slate-500 text-[10px]">#{card.cardNumber}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectCard(card)}
                    className="font-bold text-white text-sm hover:text-indigo-400 transition-colors cursor-pointer line-clamp-1"
                    title={card.name}
                  >
                    {card.name}
                  </h3>

                  {/* Price and comp */}
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

                  {/* Seller Tier */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                    <span className="truncate">{card.seller.name}</span>
                    <span className="text-emerald-400 font-semibold">{card.seller.rating}% Positive</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => onAddToCart(card)}
                  className="w-full py-2 px-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Add to Cart</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
