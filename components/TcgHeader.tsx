'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShoppingBag, 
  Search, 
  Repeat, 
  Sparkles, 
  Menu, 
  X, 
  ChevronRight, 
  Phone, 
  Mail, 
  Lock,
  Home,
  BookOpen,
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TcgHeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTradeModal: () => void;
  onOpenAiModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const TCG_CATEGORIES = [
  'All',
  'Pokemon',
  'Magic: The Gathering',
  'Yu-Gi-Oh!',
  'Disney Lorcana',
  'One Piece'
];

export const NAV_PAGES = [
  { id: 'home', label: 'Home', icon: Home, badge: 'Main' },
  { id: 'shop', label: 'Shop', icon: ShoppingBag, badge: 'All Cards' },
  { id: 'about', label: 'About', icon: ShieldCheck, badge: 'Escrow Vault' },
  { id: 'blog', label: 'Blog', icon: BookOpen, badge: 'Guides' },
  { id: 'faqs', label: 'FAQs', icon: HelpCircle, badge: 'Help' },
  { id: 'contact', label: 'Contact', icon: Mail, badge: 'Support' },
];

export function TcgHeader({
  activeSection,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenTradeModal,
  onOpenAiModal,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: TcgHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header 
      id="main-tcg-header"
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{ position: 'sticky', top: 0 }}
    >
      {/* Top Banner Notice: smoothly collapses on scroll for sleek sticky mode */}
      <div className={`bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-900/40 text-[11px] px-4 text-slate-300 transition-all duration-300 overflow-hidden ${
        isScrolled 
          ? 'max-h-0 py-0 opacity-0 border-none pointer-events-none' 
          : 'max-h-12 py-1.5 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-500/30">
              TRUSTED TRADING
            </span>
            <span className="truncate">
              72-Hour Inspection Escrow • Mandatory USPS Adult Signature on Orders $250+
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Dual-Custody Vault</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <button 
              onClick={onOpenAiModal}
              className="hidden md:flex items-center gap-1 text-indigo-300 hover:text-white transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>AI Card Appraiser</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`border-b transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/95 backdrop-blur-md border-slate-800 shadow-2xl shadow-black/80' 
          : 'bg-slate-950 border-slate-900 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Header Row: Branding, Wide Search, and CTAs */}
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-14' : 'h-16'
          } gap-4 sm:gap-6`}>
            
            {/* Logo */}
            <div 
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 flex items-center justify-center font-black text-white text-base shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                TCG
              </div>
              <div>
                <div className="font-black text-white text-base tracking-tight flex items-center gap-1">
                  <span>VAULT</span>
                  <span className="text-indigo-400">CARDS</span>
                </div>
              </div>
            </div>

            {/* Wide Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl relative items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cards, sets, slabs (e.g. Charizard, Black Lotus, PSA 10)..."
                className="w-full bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-white text-sm font-bold"
                >
                  ×
                </button>
              )}
            </div>

            {/* Actions: AI Appraiser, Trade CTA, Cart, Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onOpenAiModal}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-indigo-300 hover:text-white font-bold text-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Appraiser</span>
              </button>

              <button
                onClick={() => onNavigate('shop')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all hover:scale-102"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Order now</span>
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition-colors"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-mono font-bold flex items-center justify-center animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>

          {/* DEDICATED HEADER MENU BAR: All 7 Pages Prominently Displayed on All Screens */}
          <div className="flex items-center justify-between border-t border-slate-900/90 py-1.5 gap-3 overflow-x-auto scrollbar-none">
            {/* Header Menu Pages Navigation */}
            <nav className="flex items-center gap-1 sm:gap-1.5 shrink-0" aria-label="Main Header Menu">
              {NAV_PAGES.map((item) => {
                const isActive = activeSection === item.id;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`header-nav-${item.id}`}
                    onClick={() => handleLinkClick(item.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Game Filter Pills on the Right */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] shrink-0">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mr-1">
                Games:
              </span>
              {TCG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    onNavigate('shop');
                  }}
                  className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/60 font-bold'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer Showing All 7 Separated Pages */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-3 animate-in slide-in-from-top-2 shadow-2xl">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collectible game cards..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
            Menu:
          </div>

          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {NAV_PAGES.map((item) => {
              const isActive = activeSection === item.id;
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all border ${
                    isActive 
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md' 
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col gap-2 border-t border-slate-800">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('shop');
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order now</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAiModal();
              }}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-800"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Card Valuation Appraiser</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
