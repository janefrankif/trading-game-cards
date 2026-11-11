'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronDown, 
  SlidersHorizontal,
  ArrowRightLeft,
  BookOpen,
  Calculator,
  SearchCheck,
  CheckCircle2,
  Package
} from 'lucide-react';
import { CardItem } from '@/lib/marketplace-data';

export type WooCommercePage = 
  | 'shop' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'account' 
  | 'trades' 
  | 'architecture' 
  | 'seo' 
  | 'fees';

interface WooCommerceHeaderProps {
  activePage: WooCommercePage;
  setActivePage: (page: WooCommercePage) => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenMiniCart: () => void;
  onOpenAi: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function WooCommerceHeader({
  activePage,
  setActivePage,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenMiniCart,
  onOpenAi,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}: WooCommerceHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

  const handleNavClick = (page: WooCommercePage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    setIsToolsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 shadow-xl">
      {/* Top WooCommerce Store Notice Banner */}
      <div className="bg-slate-950 border-b border-slate-800/80 text-[11px] py-1.5 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              WOOCOMMERCE TCG STORE
            </span>
            <span className="text-slate-400">
              FREE Insured Shipping with Signature Confirmation on US Orders Over $150
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <button 
              onClick={() => handleNavClick('account')} 
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <Package className="w-3 h-3 text-amber-400" />
              <span>Track Orders</span>
            </button>
            <span>•</span>
            <div className="flex items-center gap-1 font-medium text-slate-300">
              <span>Currency:</span>
              <span className="text-amber-400 font-bold">USD ($)</span>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              <span>PSA & BGS Verified</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo with WooCommerce Emblem */}
          <button 
            onClick={() => handleNavClick('shop')} 
            className="flex items-center gap-3 shrink-0 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 flex items-center justify-center shadow-lg shadow-indigo-600/30 text-white font-black text-xl tracking-tight group-hover:scale-105 transition-transform">
              W
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Vault<span className="text-indigo-400">Commerce</span>
                </span>
                <span className="hidden md:inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                  TCG Shop
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">WooCommerce Collector Store & Escrow Hub</p>
            </div>
          </button>

          {/* WooCommerce Central Ajax Search Bar with Category Filter */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="w-full flex rounded-xl overflow-hidden border border-slate-700 bg-slate-950/70 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-900 text-xs text-slate-300 px-3 py-2 border-r border-slate-700 outline-none cursor-pointer hover:text-white"
              >
                <option value="All">All Categories</option>
                <option value="Pokemon">Pokemon (WOTC / SV)</option>
                <option value="Magic: The Gathering">Magic: The Gathering</option>
                <option value="Yu-Gi-Oh!">Yu-Gi-Oh!</option>
                <option value="Disney Lorcana">Disney Lorcana</option>
                <option value="One Piece">One Piece TCG</option>
              </select>

              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="Search 1st Edition, PSA 10, Charizard, Black Lotus, Lorcana..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activePage !== 'shop') setActivePage('shop');
                  }}
                  className="w-full bg-transparent px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mr-2 text-xs text-slate-500 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              <button 
                onClick={() => {
                  if (activePage !== 'shop') setActivePage('shop');
                }}
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-white flex items-center justify-center transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Header Action Icons: Wishlist, My Account, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Consultant */}
            <button
              onClick={onOpenAi}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 text-xs font-semibold transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Appraiser</span>
            </button>

            {/* My Account Header Page Link */}
            <button
              onClick={() => handleNavClick('account')}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs ${
                activePage === 'account'
                  ? 'bg-indigo-600/30 border-indigo-500 text-white'
                  : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="My Account"
            >
              <User className="w-4 h-4 text-indigo-400" />
              <span className="hidden lg:inline font-medium">My Account</span>
            </button>

            {/* WooCommerce Cart Widget */}
            <button
              onClick={onOpenMiniCart}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl border flex items-center gap-2.5 text-xs transition-all shadow-sm ${
                activePage === 'cart' || activePage === 'checkout'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-indigo-600/20 hover:bg-indigo-600/30 border-indigo-500/40 text-indigo-200 hover:text-white'
              }`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[10px] uppercase font-bold text-slate-400">Cart</span>
                <span className="font-bold text-white text-xs">${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Primary WooCommerce Header Navigation Bar */}
      <div className="border-t border-slate-800/90 bg-slate-900/95 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-11">
          
          {/* Main Header Pages Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => handleNavClick('shop')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activePage === 'shop'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Shop Catalog</span>
            </button>

            <button
              onClick={() => handleNavClick('product')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activePage === 'product'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Single Product</span>
            </button>

            <button
              onClick={() => handleNavClick('cart')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activePage === 'cart'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.2 bg-indigo-500 text-white text-[10px] rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('checkout')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activePage === 'checkout'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>Checkout</span>
            </button>

            <button
              onClick={() => handleNavClick('account')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activePage === 'account'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>My Account</span>
            </button>

            <button
              onClick={() => handleNavClick('trades')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                activePage === 'trades'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-800'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Trade & Escrow Vault</span>
            </button>

            {/* Architecture & Engineering Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1 ${
                  ['architecture', 'seo', 'fees'].includes(activePage)
                    ? 'bg-slate-800 text-indigo-300 border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Architecture & SEO Tools</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>

              {isToolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => handleNavClick('architecture')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <div>
                      <div className="font-semibold">Platform Blueprint</div>
                      <div className="text-[10px] text-slate-400">Headless vs WooCommerce</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('seo')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                  >
                    <SearchCheck className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold">Programmatic SEO Lab</div>
                      <div className="text-[10px] text-slate-400">JSON-LD Schema & Sitemaps</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNavClick('fees')}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                  >
                    <Calculator className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-semibold">Fee & 1099-K Model</div>
                      <div className="text-[10px] text-slate-400">eBay & TCGPlayer Comparison</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Quick Stats Right Side */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] text-slate-400">
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live WooCommerce API v3
            </span>
            <span>•</span>
            <span>Stripe Connect Escrow Ready</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 p-4 space-y-3">
          {/* Mobile Search */}
          <div className="flex rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
            <input
              type="text"
              placeholder="Search cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
            />
            <button 
              onClick={() => {
                setActivePage('shop');
                setIsMobileMenuOpen(false);
              }}
              className="bg-indigo-600 px-3 text-white"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <button
              onClick={() => handleNavClick('shop')}
              className={`p-2.5 rounded-lg text-left ${activePage === 'shop' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200'}`}
            >
              🛍️ Shop Catalog
            </button>
            <button
              onClick={() => handleNavClick('product')}
              className={`p-2.5 rounded-lg text-left ${activePage === 'product' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200'}`}
            >
              🔍 Single Product
            </button>
            <button
              onClick={() => handleNavClick('cart')}
              className={`p-2.5 rounded-lg text-left ${activePage === 'cart' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200'}`}
            >
              🛒 Cart ({cartCount})
            </button>
            <button
              onClick={() => handleNavClick('checkout')}
              className={`p-2.5 rounded-lg text-left ${activePage === 'checkout' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200'}`}
            >
              💳 Checkout
            </button>
            <button
              onClick={() => handleNavClick('account')}
              className={`p-2.5 rounded-lg text-left ${activePage === 'account' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200'}`}
            >
              👤 My Account
            </button>
            <button
              onClick={() => handleNavClick('trades')}
              className={`p-2.5 rounded-lg text-left ${activePage === 'trades' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-emerald-400'}`}
            >
              🔄 Trade Escrow
            </button>
            <button
              onClick={() => handleNavClick('architecture')}
              className="p-2.5 rounded-lg text-left bg-slate-800 text-slate-200"
            >
              📐 Architecture
            </button>
            <button
              onClick={() => handleNavClick('seo')}
              className="p-2.5 rounded-lg text-left bg-slate-800 text-slate-200"
            >
              🌐 SEO Lab
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
