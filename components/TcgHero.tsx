'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Repeat, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Lock, 
  ShoppingBag,
  Flame,
  Maximize2,
  X,
  ZoomIn
} from 'lucide-react';
import { CardItem } from '@/lib/marketplace-data';

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
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [imageDisplayMode, setImageDisplayMode] = useState<'fit' | 'fill'>('fit');

  return (
    <section id="home" className="relative pt-1 sm:pt-2 pb-8 overflow-hidden">
      {/* Subtle Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* COMPACT, WELL-PROPORTIONED HERO SECTION WITH COVER IMAGE & TEXT IN FRONT */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800/90 bg-slate-950 shadow-xl shadow-indigo-950/40 min-h-[320px] sm:min-h-[350px] md:min-h-[380px] lg:min-h-[400px] flex flex-col justify-between group">
          
          {/* Cover Image Canvas — Fitted Proportionally to prevent blowing up or cropping */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            {imageDisplayMode === 'fit' ? (
              // Fit Mode: Image is scaled to fit cleanly on the right half/center without excessive crop
              <div className="relative w-full h-full flex items-center justify-end">
                {/* Ambient backdrop blur of image so edges blend seamlessly */}
                <div className="absolute inset-0 opacity-20 filter blur-xl scale-105">
                  <Image
                    src="/hero-cover.jpg"
                    alt=""
                    fill
                    className="object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Main Crisp Fitted Image */}
                <div className="relative w-full sm:w-[85%] md:w-[70%] lg:w-[60%] h-full ml-auto">
                  <Image
                    src="/hero-cover.jpg"
                    alt="Premier TCG Collection Cover Art"
                    fill
                    className="object-cover sm:object-contain object-center sm:object-right transition-transform duration-700"
                    priority
                    quality={100}
                    referrerPolicy="no-referrer"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 700px"
                  />
                  {/* Gentle left-side fade so text sits on clean dark slate */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 sm:via-slate-950/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />
                </div>
              </div>
            ) : (
              // Fill Mode: Standard full-cover background
              <div className="relative w-full h-full">
                <Image
                  src="/hero-cover.jpg"
                  alt="Premier TCG Collection Cover Art"
                  fill
                  className="object-cover object-center transition-transform duration-700"
                  priority
                  quality={100}
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />
              </div>
            )}
          </div>

          {/* Top Bar on the Cover Image */}
          <div className="relative z-10 px-5 sm:px-8 pt-5 sm:pt-6 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-indigo-500/40 text-indigo-300 text-xs font-semibold shadow-md">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Bilateral Trading & Escrow Engine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[10px] font-bold">Vault Active</span>
            </div>

            {/* Image Controls: Fit / Fill Toggle + HD View */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setImageDisplayMode(prev => prev === 'fit' ? 'fill' : 'fit')}
                className="px-2.5 py-1 rounded-xl bg-slate-950/85 hover:bg-slate-900 backdrop-blur-md border border-slate-700/80 text-slate-300 hover:text-white text-[11px] font-medium transition-all shadow-md"
                title={imageDisplayMode === 'fit' ? 'Switch to Widescreen Fill' : 'Switch to Proportional Fit'}
              >
                {imageDisplayMode === 'fit' ? 'Fit View' : 'Fill View'}
              </button>

              <button
                onClick={() => setIsFullscreenOpen(true)}
                className="px-2.5 py-1 rounded-xl bg-slate-950/85 hover:bg-indigo-600 backdrop-blur-md border border-slate-700/80 hover:border-indigo-500 text-slate-200 hover:text-white text-[11px] font-medium flex items-center gap-1.5 shadow-md transition-all"
                aria-label="Expand cover image to full screen"
                title="View Original High-Resolution Image"
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline">View HD</span>
              </button>
            </div>
          </div>

          {/* Main Text Content In Front of the Image — Tight, Crisp, and Readable */}
          <div className="relative z-10 px-5 sm:px-8 lg:px-10 py-5 sm:py-6 max-w-2xl space-y-4">
            
            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-[1.15] drop-shadow-md">
              Trade, Buy & Authenticate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300">
                Premier Game Cards
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-lg drop-shadow-sm font-normal">
              The dedicated online shop and bilateral trading card exchange for Pokémon, MTG, Yu-Gi-Oh!, and One Piece. Verified by PSA, BGS, and CGC with 72-hour escrow.
            </p>

            {/* Action CTAs In Front of Image */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                id="hero-explore-shop-btn"
                onClick={onExploreShop}
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-102 flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Explore Shop Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="hero-ai-appraiser-btn"
                onClick={onOpenAiAppraiser}
                className="px-3.5 py-2.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-slate-700/80 text-slate-200 hover:text-white font-medium text-xs backdrop-blur-md transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Appraiser</span>
              </button>
            </div>

          </div>

          {/* Bottom Bar on the Cover Image */}
          <div className="relative z-10 px-5 sm:px-8 py-3 bg-slate-950/80 backdrop-blur-md border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-medium text-white">PSA, BGS & CGC Authenticated</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-slate-300 hidden sm:inline">72-Hour Inspection Escrow</span>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-400">
              <span className="text-emerald-400">Zero Default Rate</span>
              <span>•</span>
              <span>Insured Vault</span>
            </div>
          </div>

        </div>

        {/* Security Guarantee Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5">
            <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">100% Authenticated</div>
              <div className="text-xs text-slate-400">PSA, BGS & CGC Graded Slabs</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5">
            <div className="p-2 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">72-Hour Inspection Escrow</div>
              <div className="text-xs text-slate-400">Zero-Risk Buyer Hold Period</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5">
            <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Dual-Custody Vault</div>
              <div className="text-xs text-slate-400">Synchronized Bilateral Delivery</div>
            </div>
          </div>
        </div>

        {/* Live Marketplace Metrics Counter Bar */}
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center shadow-lg">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">$4.2M+</div>
            <div className="text-xs text-slate-400 mt-0.5">Insured Escrow Volume</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono">100%</div>
            <div className="text-xs text-slate-400 mt-0.5">PSA/BGS/CGC Verified</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">72-Hour</div>
            <div className="text-xs text-slate-400 mt-0.5">Inspection Protection</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">14,800+</div>
            <div className="text-xs text-slate-400 mt-0.5">Active Card Traders</div>
          </div>
        </div>

      </div>

      {/* Fullscreen High-Resolution Cover Image Modal */}
      {isFullscreenOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsFullscreenOpen(false)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center justify-center bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-6 overflow-hidden shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-bold text-white">
                <ZoomIn className="w-4 h-4 text-indigo-400" />
                <span>Premier Collection Cover Art — High Resolution</span>
              </div>
              <button
                onClick={() => setIsFullscreenOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center">
              <Image
                src="/hero-cover.jpg"
                alt="Premier TCG Collection Cover Art HD"
                fill
                className="object-contain"
                quality={100}
                priority
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="w-full flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Full original resolution: 16:9 enhanced master</span>
              <span>Click outside or Esc to close</span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

