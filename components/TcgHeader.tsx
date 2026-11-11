'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  ShoppingBag, 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  Lock,
  Home,
  BookOpen,
  HelpCircle,
  Mail,
  Palette,
  Check
} from 'lucide-react';
import { useTheme, ACCENT_PALETTES, AccentColor } from '@/lib/theme-context';

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
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);
  const { accent, setAccent, colors } = useTheme();

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
      {/* Top Banner Notice: Clean Light Slate with Emerald Highlights */}
      <div className={`bg-slate-50 border-b border-zinc-200 text-[11px] px-4 text-zinc-600 transition-all duration-300 overflow-hidden ${
        isScrolled 
          ? 'max-h-0 py-0 opacity-0 border-none pointer-events-none' 
          : 'max-h-12 py-1.5 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
              TRUSTED TRADING
            </span>
            <span className="truncate text-zinc-600">
              72-Hour Inspection Escrow • Mandatory Adult Signature on Orders $250+
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-zinc-600">
            <span className="flex items-center gap-1 text-zinc-700 font-medium">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>Dual-Custody Vault</span>
            </span>
            <span className="text-zinc-300">|</span>
            <button 
              onClick={onOpenAiModal}
              className={`hidden md:flex items-center gap-1 ${colors.textAccent} hover:text-zinc-950 transition-colors font-semibold`}
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>AI Card Appraiser</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar — Pure Crisp White */}
      <div className={`border-b transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-zinc-200/90 shadow-md' 
          : 'bg-white border-zinc-200 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Header Row: Branding, Wide Search, Theme Switcher, and CTAs */}
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-14' : 'h-16'
          } gap-3 sm:gap-6`}>
            
            {/* Site Logo & Brand Mark */}
            <div 
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-3 cursor-pointer shrink-0 group"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50 shadow-xs group-hover:scale-105 transition-transform">
                <Image
                  src="/site-logo.jpg"
                  alt="Vault & Exchange Premier TCG Vault Logo"
                  fill
                  className="object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="leading-tight">
                <div className="font-black text-zinc-900 text-base tracking-tight flex items-center gap-1">
                  <span>VAULT</span>
                  <span className={colors.textAccent}>CARDS</span>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase">
                  Premier TCG Vault
                </div>
              </div>
            </div>

            {/* Wide Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl relative items-center">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cards, sets, slabs (e.g. Charizard, Black Lotus, PSA 10)..."
                className="w-full bg-zinc-100 hover:bg-zinc-50 focus:bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl pl-9 pr-8 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-zinc-400 hover:text-zinc-700 text-sm font-bold"
                >
                  ×
                </button>
              )}
            </div>

            {/* Actions: Theme Switcher, AI Appraiser, Order CTA, Cart, Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Secondary Color Theme Selector Pill */}
              <div className="relative">
                <button
                  onClick={() => setIsThemePickerOpen(!isThemePickerOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 text-xs font-medium transition-all shadow-xs"
                  title="Customize Secondary Accent Color"
                >
                  <span 
                    className="w-3 h-3 rounded-full border border-black/10 shrink-0 shadow-xs" 
                    style={{ backgroundColor: colors.hex }}
                  />
                  <span className="hidden xl:inline text-[11px] font-semibold text-zinc-700">
                    {colors.name}
                  </span>
                  <Palette className="w-3.5 h-3.5 text-zinc-500" />
                </button>

                {/* Theme Dropdown Menu */}
                {isThemePickerOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-zinc-200 rounded-2xl p-2.5 shadow-xl z-50 animate-in fade-in zoom-in-95 space-y-1">
                    <div className="px-2 py-1 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 mb-1 flex items-center justify-between">
                      <span>Secondary Accent</span>
                      <span className="text-[10px] text-zinc-400 font-normal">White Theme</span>
                    </div>

                    {(Object.keys(ACCENT_PALETTES) as AccentColor[]).map((key) => {
                      const pal = ACCENT_PALETTES[key];
                      const isSelected = accent === key;
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setAccent(key);
                            setIsThemePickerOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors text-left ${
                            isSelected ? 'bg-zinc-100 text-zinc-900 font-bold' : 'hover:bg-zinc-50 text-zinc-600'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span 
                              className="w-4 h-4 rounded-full border border-black/10 shrink-0" 
                              style={{ backgroundColor: pal.hex }}
                            />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold">{pal.name}</span>
                                {pal.recommended && (
                                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200 font-bold">
                                    ★ Suggested
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-zinc-500 leading-tight">
                                {pal.tagline}
                              </div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-zinc-900 shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* AI Appraiser Button */}
              <button
                onClick={onOpenAiModal}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 hover:text-zinc-950 font-bold text-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>AI Appraiser</span>
              </button>

              {/* Order Now CTA */}
              <button
                onClick={() => onNavigate('shop')}
                className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl ${colors.buttonBg} ${colors.buttonText} font-bold text-xs shadow-xs transition-all hover:scale-102`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Order now</span>
              </button>

              {/* Cart Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 hover:text-zinc-950 transition-colors"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${colors.buttonBg} ${colors.buttonText} text-[10px] font-mono font-bold flex items-center justify-center animate-in zoom-in`}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>

          {/* DEDICATED HEADER MENU BAR: All 7 Pages Prominently Displayed on All Screens */}
          <div className="flex items-center justify-between border-t border-zinc-100 py-1.5 gap-3 overflow-x-auto scrollbar-none">
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
                        ? `${colors.buttonBg} ${colors.buttonText} shadow-xs` 
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 border border-transparent'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? colors.buttonText : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Game Filter Pills on the Right */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] shrink-0">
              <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px] mr-1">
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
                      ? `${colors.badgeBg} ${colors.badgeText} border ${colors.badgeBorder} font-bold`
                      : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 border border-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-zinc-200 p-4 space-y-3 animate-in slide-in-from-top-2 shadow-xl">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collectible game cards..."
              className="w-full bg-zinc-100 border border-zinc-200 rounded-xl pl-8 pr-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider px-1">
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
                      ? `${colors.buttonBg} ${colors.buttonText} border-transparent shadow-xs` 
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className={`w-4 h-4 ${isActive ? colors.buttonText : colors.textAccent}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-black/10 text-current' : 'bg-zinc-200 text-zinc-600'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
