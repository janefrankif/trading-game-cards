'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Lock, 
  ShoppingBag
} from 'lucide-react';
import { CardItem } from '@/lib/marketplace-data';
import { useTheme } from '@/lib/theme-context';

interface TcgHeroProps {
  cards?: CardItem[];
  onExploreShop: () => void;
  onOpenTradeModal: () => void;
  onOpenAiAppraiser: () => void;
  onSelectCard?: (card: CardItem) => void;
  onAddToCart?: (card: CardItem) => void;
}

export function TcgHero({
  onExploreShop,
  onOpenTradeModal,
  onOpenAiAppraiser,
}: TcgHeroProps) {
  const [imageDisplayMode] = useState<'fit' | 'fill'>('fit');
  const { colors } = useTheme();

  return (
    <section id="home" className="relative pt-1 sm:pt-2 pb-8 overflow-hidden">
      {/* Subtle Background Ambient Glows */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] blur-[120px] rounded-full pointer-events-none -z-10 opacity-20"
        style={{ backgroundColor: colors.hex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* COMPLETE HIGH-RESOLUTION COVER HERO SECTION (16:9 MASTER RATIO) */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800/90 bg-zinc-950 shadow-2xl min-h-[420px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[540px] flex flex-col justify-between group">
          
          {/* Full Cover Image Canvas — Crisp 16:9 Resolution */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <Image
              src="/hero-cover.png"
              alt="Premier Collectible Holographic Charizard TCG Collection - High Resolution Master Cover"
              fill
              className={`object-cover ${imageDisplayMode === 'fit' ? 'object-[center_right] sm:object-center' : 'object-center'} transition-all duration-700`}
              priority
              quality={100}
              referrerPolicy="no-referrer"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1536px"
            />
            
            {/* Cinematic Mineral Grey Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/75 sm:via-zinc-950/45 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/30 pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-zinc-950/70 to-transparent pointer-events-none" />
          </div>

          {/* Top Bar on the Cover Image */}
          <div className="relative z-10 px-5 sm:px-8 pt-5 sm:pt-6 flex flex-wrap items-center justify-between gap-3">
            <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-950/90 backdrop-blur-md border ${colors.borderAccent}/40 text-xs font-semibold shadow-lg`}>
              <div className="relative w-5 h-5 rounded-full overflow-hidden border border-amber-400/50 shrink-0">
                <Image
                  src="/site-icon.jpg"
                  alt="Site Icon"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-bold text-white">Bilateral Trading & Escrow Engine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">Vault Active</span>
            </div>
          </div>

          {/* Main Text Content In Front of Cover Image — Tight, Crisp, and Readable */}
          <div className="relative z-10 px-5 sm:px-8 lg:px-10 py-6 sm:py-8 max-w-2xl space-y-4">
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] drop-shadow-lg">
              Trade, Buy & Authenticate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-amber-200 to-amber-400">
                Premier Game Cards
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-300 text-xs sm:text-sm sm:leading-relaxed max-w-lg drop-shadow-md font-normal">
              The dedicated online shop and bilateral trading card exchange for Pokémon, MTG, Yu-Gi-Oh!, and One Piece. Verified by PSA, BGS, and CGC with 72-hour escrow.
            </p>

            {/* Action CTAs In Front of Image */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-explore-shop-btn"
                onClick={onExploreShop}
                className={`px-5 sm:px-6 py-3 rounded-xl ${colors.buttonBg} ${colors.buttonText} font-black text-xs sm:text-sm shadow-xl ${colors.buttonShadow} transition-all hover:scale-102 flex items-center gap-2`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Shop Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-ai-appraiser-btn"
                onClick={onOpenAiAppraiser}
                className="px-4 py-3 rounded-xl bg-zinc-950/90 hover:bg-zinc-850 border border-zinc-700/90 text-zinc-200 hover:text-white font-medium text-xs sm:text-sm backdrop-blur-md transition-colors flex items-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Card Appraiser</span>
              </button>
            </div>

          </div>

          {/* Bottom Bar on the Cover Image */}
          <div className="relative z-10 px-5 sm:px-8 py-3.5 bg-zinc-950/85 backdrop-blur-md border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-300">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">PSA, BGS & CGC Authenticated</span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-zinc-300 hidden sm:inline">72-Hour Inspection Escrow</span>
            </div>
            
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-mono text-zinc-400">
              <span className="text-emerald-400 font-bold">100% Guaranteed</span>
              <span>•</span>
              <span className={colors.textAccent}>Insured Custody Vault</span>
            </div>
          </div>

        </div>

        {/* Security Guarantee Pills — Crisp Clean White */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-600">
          <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl p-3.5 shadow-xs">
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-zinc-900 text-sm">100% Authenticated</div>
              <div className="text-xs text-zinc-500">PSA, BGS & CGC Graded Slabs</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl p-3.5 shadow-xs">
            <div className={`p-2 rounded-xl ${colors.badgeBg} border ${colors.badgeBorder} ${colors.textAccent}`}>
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-zinc-900 text-sm">72-Hour Inspection Escrow</div>
              <div className="text-xs text-zinc-500">Zero-Risk Buyer Hold Period</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl p-3.5 shadow-xs">
            <div className="p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-zinc-900 text-sm">Dual-Custody Vault</div>
              <div className="text-xs text-zinc-500">Synchronized Bilateral Delivery</div>
            </div>
          </div>
        </div>

        {/* Live Marketplace Metrics Counter Bar — Clean White */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center shadow-xs">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-zinc-900 font-mono">$4.2M+</div>
            <div className="text-xs text-zinc-500 mt-0.5">Insured Escrow Volume</div>
          </div>
          <div>
            <div className={`text-2xl sm:text-3xl font-black ${colors.textAccent} font-mono`}>100%</div>
            <div className="text-xs text-zinc-500 mt-0.5">PSA/BGS/CGC Verified</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">72-Hour</div>
            <div className="text-xs text-zinc-500 mt-0.5">Inspection Protection</div>
          </div>
          <div>
            <div className={`text-2xl sm:text-3xl font-black ${colors.textAccent} font-mono`}>14,800+</div>
            <div className="text-xs text-zinc-500 mt-0.5">Active Card Traders</div>
          </div>
        </div>

      </div>

    </section>
  );
}

