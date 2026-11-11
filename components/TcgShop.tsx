'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Search, 
  ShoppingBag, 
  Eye, 
  ShieldCheck, 
  SlidersHorizontal,
  TrendingUp,
} from 'lucide-react';
import { CardItem } from '@/lib/marketplace-data';
import { TCG_CATEGORIES } from './TcgHeader';
import { useTheme } from '@/lib/theme-context';

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
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: TcgShopProps) {
  const [conditionFilter, setConditionFilter] = useState<'all' | 'graded' | 'raw'>('all');
  const [tradeOnly, setTradeOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'change'>('featured');
  const [priceMax, setPriceMax] = useState<number>(25000);
  const { colors } = useTheme();

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
          if (!matchName && !matchSet && !matchGame) return false;
        }

        // Graded vs Raw Filter
        if (conditionFilter === 'graded' && !card.isGraded) return false;
        if (conditionFilter === 'raw' && card.isGraded) return false;

        // Trade Only Filter
        if (tradeOnly && !card.allowTrades) return false;

        // Price Filter
        if (card.listingPrice > priceMax) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.listingPrice - b.listingPrice;
        if (sortBy === 'price-desc') return b.listingPrice - a.listingPrice;
        if (sortBy === 'change') return (b.sevenDayChange || 0) - (a.sevenDayChange || 0);
        return 0; // 'featured' retains natural order
      });
  }, [cards, selectedCategory, searchQuery, conditionFilter, tradeOnly, priceMax, sortBy]);

  return (
    <section id="shop" className="py-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Title */}
        <div className="space-y-1">
          <div className={`flex items-center gap-1.5 ${colors.textAccent} font-bold text-xs uppercase tracking-wider`}>
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Store Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
            Shop Collectible Cards
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl">
            Browse our verified inventory of Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Lorcana, and One Piece singles. Complete direct purchases with escrow tracking.
          </p>
        </div>

        {/* Filter Controls Bar — Clean White Panel */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-4 space-y-4 shadow-xs">
          
          {/* Top Row: Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {TCG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? `${colors.buttonBg} ${colors.buttonText} shadow-xs`
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 border border-zinc-200'
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
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search card name, set, or #"
                className="w-full bg-zinc-100 border border-zinc-200 hover:border-zinc-300 focus:bg-white rounded-xl pl-9 pr-8 py-2.5 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-700 font-bold"
                >
                  ×
                </button>
              )}
            </div>

            {/* Condition Toggle */}
            <div className="lg:col-span-3 flex bg-zinc-100 border border-zinc-200 rounded-xl p-1">
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
                      ? `${colors.buttonBg} ${colors.buttonText} shadow-xs`
                      : 'text-zinc-600 hover:text-zinc-900'
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
                className="w-full bg-zinc-100 border border-zinc-200 rounded-xl px-3 py-2.5 text-zinc-900 focus:outline-none focus:border-zinc-400"
              >
                <option value="featured">Sort: Featured Picks</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="change">Highest 7-Day Surge</option>
              </select>
            </div>

          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between pt-1 border-t border-zinc-100 text-[11px] text-zinc-500">
            <span>
              Showing <strong className="text-zinc-900">{filteredAndSortedCards.length}</strong> collectible items
              {selectedCategory !== 'All' && <span> in <span className={colors.textAccent}>{selectedCategory}</span></span>}
            </span>

            {(searchQuery || selectedCategory !== 'All' || conditionFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setConditionFilter('all');
                }}
                className={`text-xs ${colors.textAccent} hover:underline font-semibold`}
              >
                Clear all filters
              </button>
            )}
          </div>

        </div>

        {/* Empty State */}
        {filteredAndSortedCards.length === 0 && (
          <div className="py-16 text-center bg-white border border-zinc-200 rounded-2xl space-y-3">
            <ShoppingBag className="w-10 h-10 text-zinc-400 mx-auto" />
            <h3 className="text-base font-bold text-zinc-900">No trading cards matched your criteria</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Try clearing your search query or toggling between graded slabs and raw singles.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setConditionFilter('all');
              }}
              className={`px-4 py-2 rounded-xl ${colors.buttonBg} ${colors.buttonText} text-xs font-bold shadow-xs`}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Product Cards Grid — Clean White with Soft Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedCards.map((card) => (
            <div
              key={card.id}
              className="group bg-white rounded-2xl border border-zinc-200 hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5"
            >
              <div>
                {/* Image Box */}
                <div 
                  onClick={() => onSelectCard(card)}
                  className="relative w-full h-64 bg-zinc-50 border-b border-zinc-100 cursor-pointer overflow-hidden flex items-center justify-center p-3"
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

                  {/* Franchise pill */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-white/95 border border-zinc-200 text-zinc-700 text-[10px] font-bold shadow-xs">
                    {card.game}
                  </div>

                  {/* Quick Inspect Button on Hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCard(card);
                    }}
                    className="absolute inset-x-3 bottom-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Archival View</span>
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="truncate">{card.set}</span>
                    <span className="font-mono text-zinc-400 text-[10px]">#{card.cardNumber}</span>
                  </div>

                  <h3 
                    onClick={() => onSelectCard(card)}
                    className="font-bold text-zinc-900 text-sm hover:text-zinc-600 transition-colors cursor-pointer line-clamp-1"
                    title={card.name}
                  >
                    {card.name}
                  </h3>

                  {/* Price and comp */}
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

                  {/* Seller Tier */}
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-zinc-100">
                    <span className="truncate">{card.seller.name}</span>
                    <span className="text-emerald-700 font-semibold">{card.seller.rating}% Positive</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => onAddToCart(card)}
                  className={`w-full py-2 px-2.5 rounded-xl ${colors.buttonBg} ${colors.buttonText} font-black text-xs flex items-center justify-center gap-1 transition-colors shadow-xs`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
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
