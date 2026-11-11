'use client';

import React, { useState } from 'react';
import { CardItem } from '@/lib/marketplace-data';
import { 
  X, 
  ShieldCheck, 
  ArrowLeftRight, 
  ShoppingCart, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Search,
  ZoomIn
} from 'lucide-react';

interface CardDetailModalProps {
  card: CardItem | null;
  onClose: () => void;
  onInitiateTrade: (card: CardItem) => void;
  onInitiateBuy: (card: CardItem) => void;
  onInspectSeo: (card: CardItem) => void;
}

export function CardDetailModal({
  card,
  onClose,
  onInitiateTrade,
  onInitiateBuy,
  onInspectSeo,
}: CardDetailModalProps) {
  const [zoomActive, setZoomActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  if (!card) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // SVG Sparkline calculation
  const minPrice = Math.min(...card.priceHistory);
  const maxPrice = Math.max(...card.priceHistory);
  const priceRange = maxPrice - minPrice || 1;
  const svgWidth = 320;
  const svgHeight = 70;
  const points = card.priceHistory
    .map((price, idx) => {
      const x = (idx / (card.priceHistory.length - 1)) * svgWidth;
      const y = svgHeight - ((price - minPrice) / priceRange) * (svgHeight - 16) - 8;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="card-detail-modal-container" 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100 flex flex-col md:flex-row relative"
      >
        {/* Close Button */}
        <button
          id="close-card-detail-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Macro Inspection Card View */}
        <div className="md:w-5/12 p-6 bg-slate-950/60 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col items-center justify-between">
          <div className="w-full text-center mb-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 border border-indigo-500/30 text-indigo-300">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              {card.isGraded ? `${card.gradingCompany} Authenticated Slab` : 'Standard Raw Inspection'}
            </div>
          </div>

          {/* Interactive Zoom Container */}
          <div 
            id="card-macro-zoom-container"
            className="relative w-64 h-88 rounded-xl overflow-hidden shadow-2xl border-2 border-slate-700 cursor-crosshair group bg-slate-900"
            onMouseEnter={() => setZoomActive(true)}
            onMouseLeave={() => setZoomActive(false)}
            onMouseMove={handleMouseMove}
          >
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-75"
              style={{
                backgroundImage: `url(${card.image})`,
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                transform: zoomActive ? 'scale(2.2)' : 'scale(1)',
              }}
            />

            {/* Slab Header Simulation for Graded Cards */}
            {card.isGraded && (
              <div className="absolute top-0 inset-x-0 bg-slate-950/90 border-b border-amber-500/40 p-2 flex items-center justify-between text-[11px] font-mono pointer-events-none">
                <span className="font-bold text-amber-400">{card.gradeScore}</span>
                <span className="text-slate-400">CERT #9048218</span>
              </div>
            )}

            {!zoomActive && (
              <div className="absolute bottom-3 inset-x-3 bg-slate-950/75 backdrop-blur-md rounded-lg py-1 px-2.5 text-center text-xs text-slate-300 pointer-events-none flex items-center justify-center gap-1.5 border border-slate-800">
                <ZoomIn className="w-3.5 h-3.5 text-amber-400" /> Hover for 1200 DPI macro-zoom
              </div>
            )}
          </div>

          {/* Population Report Badge if Graded */}
          {card.popReport ? (
            <div className="mt-4 w-full bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs">
              <div className="flex justify-between items-center text-slate-300 mb-1 font-medium">
                <span>Official Census / Pop Report</span>
                <span className="text-amber-400 font-bold">{card.gradingCompany}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center mt-2">
                <div className="bg-slate-800/80 p-1.5 rounded-lg">
                  <div className="text-slate-400 text-[10px]">Pop at Grade</div>
                  <div className="font-bold text-sm text-slate-100">{card.popReport.popAtGrade.toLocaleString()}</div>
                </div>
                <div className="bg-slate-800/80 p-1.5 rounded-lg">
                  <div className="text-slate-400 text-[10px]">Pop Higher</div>
                  <div className="font-bold text-sm text-slate-100">{card.popReport.popHigher.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 w-full bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
              <span className="font-medium text-emerald-400">Raw Grading Standard:</span> Evaluated under 10x magnification. Centering measured 55/45.
            </div>
          )}

          {/* Subgrades if BGS or Detailed PSA */}
          {card.subgrades && (
            <div className="mt-3 w-full grid grid-cols-4 gap-1.5 text-center text-[10px]">
              <div className="bg-slate-800/60 p-1 rounded border border-slate-700/50">
                <div className="text-slate-400">Centering</div>
                <div className="font-bold text-amber-400">{card.subgrades.centering}</div>
              </div>
              <div className="bg-slate-800/60 p-1 rounded border border-slate-700/50">
                <div className="text-slate-400">Corners</div>
                <div className="font-bold text-amber-400">{card.subgrades.corners}</div>
              </div>
              <div className="bg-slate-800/60 p-1 rounded border border-slate-700/50">
                <div className="text-slate-400">Edges</div>
                <div className="font-bold text-amber-400">{card.subgrades.edges}</div>
              </div>
              <div className="bg-slate-800/60 p-1 rounded border border-slate-700/50">
                <div className="text-slate-400">Surface</div>
                <div className="font-bold text-amber-400">{card.subgrades.surface}</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Pricing, Seller, Escrow & Actions */}
        <div className="md:w-7/12 p-6 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <span>{card.game}</span>
              <span>•</span>
              <span>{card.set} ({card.setYear})</span>
            </div>

            <h2 className="text-2xl font-black text-white tracking-tight">{card.name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300">
                Card #{card.cardNumber}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300">
                {card.rarity}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {card.finish}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {card.isGraded ? card.gradeScore : card.rawCondition}
              </span>
            </div>

            {/* Price & Historical Trend */}
            <div className="mt-5 p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="text-xs text-slate-400">Listing Price (Escrow Protected)</div>
                  <div className="text-3xl font-black text-emerald-400">
                    ${card.listingPrice.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">7-Day Market Average</div>
                  <div className="flex items-center gap-1 justify-end font-semibold text-sm">
                    <span>${card.marketPrice.toLocaleString()}</span>
                    {card.sevenDayChange >= 0 ? (
                      <span className="inline-flex items-center text-xs text-emerald-400">
                        <TrendingUp className="w-3.5 h-3.5" /> +{card.sevenDayChange}%
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs text-rose-400">
                        <TrendingDown className="w-3.5 h-3.5" /> {card.sevenDayChange}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Graph Sparkline */}
              <div className="pt-2 border-t border-slate-700/60">
                <div className="text-[11px] text-slate-400 flex justify-between mb-1">
                  <span>Recent 7-Day Comps Trend</span>
                  <span className="text-slate-400 font-mono">High: ${maxPrice.toLocaleString()}</span>
                </div>
                <div className="w-full overflow-hidden bg-slate-950/40 rounded-lg p-1">
                  <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-12 stroke-indigo-400 fill-none">
                    <polyline
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Verified Seller Trust Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-900/60 border border-indigo-500/40 flex items-center justify-center font-bold text-indigo-300">
                  {card.seller.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                    {card.seller.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-slate-400 flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3 h-3 text-slate-500" /> {card.seller.location} • {card.seller.rating}% Positive ({card.seller.salesCount} deals)
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {card.seller.badge}
                </span>
              </div>
            </div>

            {/* Trade Preferences (If Trade Allowed) */}
            {card.allowTrades && card.tradePreferences && (
              <div className="mt-3 p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-indigo-300 mb-1">
                  <ArrowLeftRight className="w-3.5 h-3.5" /> Seller Open to Bilateral Trades / Trade-Ups:
                </div>
                <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                  {card.tradePreferences.map((pref, i) => (
                    <li key={i}>{pref}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
            <button
              id="buy-with-escrow-button"
              onClick={() => onInitiateBuy(card)}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all active:scale-98"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Buy with Escrow (${card.listingPrice.toLocaleString()})</span>
            </button>

            <button
              id="inspect-seo-schema-button"
              onClick={() => onInspectSeo(card)}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
              title="Inspect Schema.org & SEO Architecture for this Card"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
