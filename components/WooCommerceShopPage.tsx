'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  CardItem, 
  SAMPLE_CARDS 
} from '@/lib/marketplace-data';
import { 
  ShoppingBag, 
  ArrowRightLeft, 
  Star, 
  ShieldCheck, 
  SlidersHorizontal, 
  Check, 
  Search,
  ExternalLink,
  Tag,
  ArrowUpDown,
  Sparkles
} from 'lucide-react';

interface WooCommerceShopPageProps {
  onSelectProduct: (card: CardItem) => void;
  onAddToCart: (card: CardItem, condition?: string) => void;
  onProposeTrade: (card: CardItem) => void;
  onQuickInspect: (card: CardItem) => void;
  searchQuery: string;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export function WooCommerceShopPage({
  onSelectProduct,
  onAddToCart,
  onProposeTrade,
  onQuickInspect,
  searchQuery,
  selectedCategory,
  setSelectedCategory
}: WooCommerceShopPageProps) {
  // Filters state
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [selectedConditionFilter, setSelectedConditionFilter] = useState<string>('All');
  const [onlyGraded, setOnlyGraded] = useState<boolean>(false);
  const [onlyTrades, setOnlyTrades] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [justAddedCardId, setJustAddedCardId] = useState<string | null>(null);

  // Categories counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: SAMPLE_CARDS.length };
    SAMPLE_CARDS.forEach(c => {
      counts[c.game] = (counts[c.game] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return SAMPLE_CARDS.filter((card) => {
      // Category filter
      if (selectedCategory !== 'All' && card.game !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          card.name.toLowerCase().includes(q) ||
          card.set.toLowerCase().includes(q) ||
          card.game.toLowerCase().includes(q) ||
          card.cardNumber.toLowerCase().includes(q) ||
          (card.gradeScore && card.gradeScore.toLowerCase().includes(q));
        if (!matches) return false;
      }
      // Max price
      if (card.listingPrice > maxPrice) {
        return false;
      }
      // Graded only
      if (onlyGraded && !card.isGraded) {
        return false;
      }
      // Trades only
      if (onlyTrades && !card.allowTrades) {
        return false;
      }
      // Condition filter
      if (selectedConditionFilter !== 'All') {
        if (selectedConditionFilter.startsWith('PSA') && (!card.isGraded || card.gradingCompany !== 'PSA')) return false;
        if (selectedConditionFilter.startsWith('BGS') && (!card.isGraded || card.gradingCompany !== 'BGS')) return false;
        if (selectedConditionFilter === 'Raw NM' && (card.isGraded || card.rawCondition !== 'Near Mint (NM)')) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.listingPrice - b.listingPrice;
      if (sortBy === 'price-high') return b.listingPrice - a.listingPrice;
      if (sortBy === 'rating') return b.seller.rating - a.seller.rating;
      if (sortBy === 'latest') return b.setYear - a.setYear;
      if (sortBy === 'growth') return b.sevenDayChange - a.sevenDayChange;
      return 0; // featured/popularity
    });
  }, [selectedCategory, searchQuery, maxPrice, onlyGraded, onlyTrades, selectedConditionFilter, sortBy]);

  const handleAddToCartWithAlert = (card: CardItem) => {
    onAddToCart(card, card.isGraded ? `${card.gradingCompany} ${card.gradeScore}` : (card.rawCondition || 'Near Mint'));
    setJustAddedCardId(card.id);
    setTimeout(() => {
      setJustAddedCardId(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* WooCommerce Breadcrumbs & Store Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
            <span>Home</span>
            <span>/</span>
            <span className="text-indigo-400">Shop</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-slate-200">{selectedCategory}</span>
              </>
            )}
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Collectible Card Shop</h1>
          <p className="text-xs text-slate-400">
            Verified raw & slabbed collectibles with insured escrow custody and guaranteed authenticity.
          </p>
        </div>

        {/* Quick Stat Pill */}
        <div className="inline-flex items-center gap-2 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>All items 100% Guaranteed Genuine</span>
        </div>
      </div>

      {/* Main 2-Column WooCommerce Archive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* LEFT COLUMN: WooCommerce Sidebar Widgets */}
        <aside className="lg:col-span-1 space-y-6 bg-slate-900/70 p-5 rounded-2xl border border-slate-800">
          
          {/* Widget 1: Product Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-indigo-400" />
              <span>Product Categories</span>
            </h3>
            <ul className="space-y-1.5 text-xs">
              {['All', 'Pokemon', 'Magic: The Gathering', 'Yu-Gi-Oh!', 'Disney Lorcana', 'One Piece'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg flex items-center justify-between transition-colors ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {categoryCounts[cat] || 0}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Widget 2: Filter by Price Slider */}
          <div className="border-t border-slate-800 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
              <span>Filter by Price</span>
              <span className="text-amber-400 font-mono font-bold">${maxPrice.toLocaleString()}</span>
            </h3>
            <input
              type="range"
              min={100}
              max={300000}
              step={200}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>$100</span>
              <span>$150,000</span>
              <span>$300,000</span>
            </div>
          </div>

          {/* Widget 3: Filter by Card Condition / Slab */}
          <div className="border-t border-slate-800 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Grading & Preservation
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { id: 'All', label: 'All Conditions' },
                { id: 'PSA', label: 'PSA Slabs (10 / 9)' },
                { id: 'BGS', label: 'Beckett (BGS) Slabs' },
                { id: 'Raw NM', label: 'Raw Near Mint (NM)' }
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                  <input
                    type="radio"
                    name="condition"
                    checked={selectedConditionFilter === item.id}
                    onChange={() => setSelectedConditionFilter(item.id)}
                    className="accent-indigo-600"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Widget 4: Checkbox Toggles */}
          <div className="border-t border-slate-800 pt-5 space-y-2.5">
            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyGraded}
                onChange={(e) => setOnlyGraded(e.target.checked)}
                className="rounded accent-indigo-600 w-4 h-4"
              />
              <span>Graded Slabs Only (PSA/BGS/CGC)</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyTrades}
                onChange={(e) => setOnlyTrades(e.target.checked)}
                className="rounded accent-indigo-600 w-4 h-4"
              />
              <span className="text-emerald-400 font-medium">Accepting Card Trades</span>
            </label>
          </div>

          {/* Widget 5: US Seller Escrow Guarantee */}
          <div className="border-t border-slate-800 pt-5 bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-900/40 text-[11px] text-slate-300 space-y-2">
            <div className="font-bold text-indigo-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>WooCommerce Buyer Protection</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Every card over $250 ships with USPS Signature Confirmation and is protected by our 72-hour escrow inspection window.
            </p>
          </div>

        </aside>

        {/* RIGHT COLUMN: Products Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Shop Controls: Result Count & WooCommerce Ordering */}
          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-400">
              Showing <span className="font-bold text-white">{filteredProducts.length}</span> of {SAMPLE_CARDS.length} results
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <label htmlFor="orderby" className="text-slate-400 shrink-0 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Sort by:</span>
              </label>
              <select
                id="orderby"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="featured">Default sorting (Featured)</option>
                <option value="rating">Sort by average rating</option>
                <option value="latest">Sort by latest release</option>
                <option value="price-low">Sort by price: low to high</option>
                <option value="price-high">Sort by price: high to low</option>
                <option value="growth">Sort by 7-day surge (%)</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
              <p className="text-base font-semibold text-slate-300">No cards matched your filter criteria.</p>
              <p className="text-xs text-slate-500">Try loosening your price slider or resetting your category filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setMaxPrice(300000);
                  setSelectedConditionFilter('All');
                  setOnlyGraded(false);
                  setOnlyTrades(false);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((card) => {
                const isJustAdded = justAddedCardId === card.id;

                return (
                  <div
                    key={card.id}
                    className="group bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-slate-700 hover:shadow-2xl transition-all duration-200 flex flex-col overflow-hidden"
                  >
                    {/* Top Image & Badges Container */}
                    <div className="relative p-4 pb-0 flex flex-col items-center">
                      
                      {/* WooCommerce Badges Overlay */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                        {card.isGraded ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black tracking-wide uppercase bg-red-600 text-white shadow-md">
                            {card.gradingCompany} {card.gradeScore}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-amber-300 border border-amber-500/30">
                            RAW • {card.rawCondition}
                          </span>
                        )}

                        {card.marketPrice > card.listingPrice && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
                            Sale!
                          </span>
                        )}
                      </div>

                      {/* Trade Offer Badge */}
                      {card.allowTrades && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-950/90 text-indigo-300 border border-indigo-700/60 flex items-center gap-1 shadow-xs">
                            <ArrowRightLeft className="w-3 h-3 text-indigo-400" />
                            <span>Trades OK</span>
                          </span>
                        </div>
                      )}

                      {/* Card Thumbnail */}
                      <div
                        onClick={() => onSelectProduct(card)}
                        className="relative w-40 h-56 rounded-xl overflow-hidden shadow-xl border border-slate-700/90 bg-slate-950 cursor-pointer group-hover:scale-103 transition-transform duration-200 mt-3"
                      >
                        <Image
                          src={card.image}
                          alt={card.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                          sizes="(max-width: 768px) 100vw, 160px"
                        />
                      </div>

                      {/* Quick Inspect Button on Hover */}
                      <button
                        onClick={() => onQuickInspect(card)}
                        className="mt-2 text-[11px] text-slate-400 hover:text-indigo-300 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Quick Spec & Census</span>
                      </button>
                    </div>

                    {/* Card Content & WooCommerce Meta */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          {card.game} • {card.set}
                        </div>

                        {/* Title click opens Single Product page */}
                        <button
                          onClick={() => onSelectProduct(card)}
                          className="text-left font-bold text-slate-100 text-sm hover:text-indigo-400 transition-colors line-clamp-1 mt-0.5 block w-full"
                        >
                          {card.name}
                        </button>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1 mt-1 text-amber-400 text-xs">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">({card.seller.salesCount} sold)</span>
                        </div>
                      </div>

                      {/* Pricing block */}
                      <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Buy It Now</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-black font-mono text-white">
                              ${card.listingPrice.toLocaleString()}
                            </span>
                            {card.marketPrice > card.listingPrice && (
                              <span className="text-xs font-mono text-slate-500 line-through">
                                ${card.marketPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className={`text-right text-[11px] font-mono font-bold ${card.sevenDayChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {card.sevenDayChange >= 0 ? `+${card.sevenDayChange}%` : `${card.sevenDayChange}%`}
                          <div className="text-[9px] text-slate-500 font-normal">7d Market</div>
                        </div>
                      </div>

                      {/* WooCommerce Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => handleAddToCartWithAlert(card)}
                          className={`w-full py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>

                        {card.allowTrades ? (
                          <button
                            onClick={() => onProposeTrade(card)}
                            className="w-full py-2 px-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 transition-colors flex items-center justify-center gap-1"
                          >
                            <ArrowRightLeft className="w-3.5 h-3.5" />
                            <span>Trade</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onSelectProduct(card)}
                            className="w-full py-2 px-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors text-center"
                          >
                            View Specs
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
