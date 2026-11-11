'use client';

import React, { useState } from 'react';
import { CardItem } from '@/lib/marketplace-data';
import { 
  X, 
  ShieldCheck, 
  ArrowLeftRight, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Search,
  ZoomIn
} from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

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
  onInitiateBuy,
  onInspectSeo,
}: CardDetailModalProps) {
  const [zoomActive, setZoomActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const { colors } = useTheme();

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="card-detail-modal-container" 
        className="bg-white border border-zinc-200 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl text-zinc-900 flex flex-col md:flex-row relative"
      >
        {/* Close Button */}
        <button
          id="close-card-detail-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 transition-colors border border-zinc-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Macro Inspection Card View */}
        <div className="md:w-5/12 p-6 bg-zinc-50 border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col items-center justify-between">
          <div className="w-full text-center mb-3">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colors.badgeBg} border ${colors.badgeBorder} ${colors.textAccent}`}>
              <Award className="w-3.5 h-3.5" />
              {card.isGraded ? `${card.gradingCompany} Authenticated Slab` : 'Standard Raw Inspection'}
            </div>
          </div>

          {/* Interactive Zoom Container */}
          <div 
            id="card-macro-zoom-container"
            className="relative w-64 h-88 rounded-xl overflow-hidden shadow-md border-2 border-zinc-200 cursor-crosshair group bg-zinc-100"
            onMouseEnter={() => setZoomActive(true)}
            onMouseLeave={() => setZoomActive(false)}
            onMouseMove={handleMouseMove}
          >
            <div 
              className="w-full h-full bg-contain bg-center bg-no-repeat transition-transform duration-75 p-2"
              style={{
                backgroundImage: `url(${card.image})`,
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                transform: zoomActive ? 'scale(2.2)' : 'scale(1)',
              }}
            />

            {/* Slab Header Simulation for Graded Cards */}
            {card.isGraded && (
              <div className="absolute top-0 inset-x-0 bg-white/95 border-b border-zinc-200 p-2 flex items-center justify-between text-[11px] font-mono pointer-events-none shadow-xs">
                <span className={`font-bold ${colors.textAccent}`}>{card.gradeScore}</span>
                <span className="text-zinc-500 font-semibold">CERT #9048218</span>
              </div>
            )}

            {!zoomActive && (
              <div className="absolute bottom-3 inset-x-3 bg-white/90 backdrop-blur-xs rounded-lg py-1 px-2.5 text-center text-xs text-zinc-700 pointer-events-none flex items-center justify-center gap-1.5 border border-zinc-200 shadow-xs">
                <ZoomIn className={`w-3.5 h-3.5 ${colors.textAccent}`} /> Hover for 1200 DPI macro-zoom
              </div>
            )}
          </div>

          {/* Population Report Badge if Graded */}
          {card.popReport ? (
            <div className="mt-4 w-full bg-white p-3 rounded-xl border border-zinc-200 text-xs shadow-xs">
              <div className="flex justify-between items-center text-zinc-700 mb-1 font-semibold">
                <span>Official Census / Pop Report</span>
                <span className={`${colors.textAccent} font-bold`}>{card.gradingCompany}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center mt-2">
                <div className="bg-zinc-50 p-1.5 rounded-lg border border-zinc-100">
                  <div className="text-zinc-500 text-[10px]">Pop at Grade</div>
                  <div className="font-bold text-sm text-zinc-900">{card.popReport.popAtGrade.toLocaleString()}</div>
                </div>
                <div className="bg-zinc-50 p-1.5 rounded-lg border border-zinc-100">
                  <div className="text-zinc-500 text-[10px]">Pop Higher</div>
                  <div className="font-bold text-sm text-zinc-900">{card.popReport.popHigher.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 w-full bg-white p-3 rounded-xl border border-zinc-200 text-xs text-zinc-700 shadow-xs">
              <span className="font-semibold text-emerald-700">Raw Grading Standard:</span> Evaluated under 10x magnification. Centering measured 55/45.
            </div>
          )}

          {/* Subgrades if BGS or Detailed PSA */}
          {card.subgrades && (
            <div className="mt-3 w-full grid grid-cols-4 gap-1.5 text-center text-[10px]">
              <div className="bg-white p-1 rounded border border-zinc-200">
                <div className="text-zinc-500">Centering</div>
                <div className={`font-bold ${colors.textAccent}`}>{card.subgrades.centering}</div>
              </div>
              <div className="bg-white p-1 rounded border border-zinc-200">
                <div className="text-zinc-500">Corners</div>
                <div className={`font-bold ${colors.textAccent}`}>{card.subgrades.corners}</div>
              </div>
              <div className="bg-white p-1 rounded border border-zinc-200">
                <div className="text-zinc-500">Edges</div>
                <div className={`font-bold ${colors.textAccent}`}>{card.subgrades.edges}</div>
              </div>
              <div className="bg-white p-1 rounded border border-zinc-200">
                <div className="text-zinc-500">Surface</div>
                <div className={`font-bold ${colors.textAccent}`}>{card.subgrades.surface}</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Pricing, Seller, Escrow & Actions */}
        <div className="md:w-7/12 p-6 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className={`flex items-center gap-2 text-xs font-semibold ${colors.textAccent} uppercase tracking-wider mb-1`}>
              <span>{card.game}</span>
              <span>•</span>
              <span>{card.set} ({card.setYear})</span>
            </div>

            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">{card.name}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 border border-zinc-200 text-zinc-700">
                Card #{card.cardNumber}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 border border-zinc-200 text-zinc-700">
                {card.rarity}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-sky-800 border border-sky-200">
                {card.finish}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {card.isGraded ? card.gradeScore : card.rawCondition}
              </span>
            </div>

            {/* Price & Historical Trend */}
            <div className="mt-5 p-4 rounded-xl bg-zinc-50 border border-zinc-200 shadow-xs">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="text-xs text-zinc-500">Listing Price (Escrow Protected)</div>
                  <div className="text-3xl font-black text-zinc-900 font-mono">
                    ${card.listingPrice.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-500">7-Day Market Average</div>
                  <div className="flex items-center gap-1 justify-end font-semibold text-sm">
                    <span className="text-zinc-900 font-mono">${card.marketPrice.toLocaleString()}</span>
                    {card.sevenDayChange >= 0 ? (
                      <span className="inline-flex items-center text-xs text-emerald-700 font-bold">
                        <TrendingUp className="w-3.5 h-3.5" /> +{card.sevenDayChange}%
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs text-rose-600 font-bold">
                        <TrendingDown className="w-3.5 h-3.5" /> {card.sevenDayChange}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Graph Sparkline */}
              <div className="pt-2 border-t border-zinc-200">
                <div className="text-[11px] text-zinc-500 flex justify-between mb-1">
                  <span>Recent 7-Day Comps Trend</span>
                  <span className="text-zinc-600 font-mono">High: ${maxPrice.toLocaleString()}</span>
                </div>
                <div className="w-full overflow-hidden bg-white border border-zinc-200 rounded-lg p-1">
                  <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-12 stroke-indigo-600 fill-none">
                    <polyline
                      fill="none"
                      stroke="#4f46e5"
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
            <div className="mt-4 p-3.5 rounded-xl bg-white border border-zinc-200 flex items-center justify-between text-xs shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center font-bold text-zinc-800">
                  {card.seller.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-zinc-900 flex items-center gap-1.5">
                    {card.seller.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-zinc-500 flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3 h-3 text-zinc-400" /> {card.seller.location} • {card.seller.rating}% Positive ({card.seller.salesCount} deals)
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  {card.seller.badge}
                </span>
              </div>
            </div>

            {/* Trade Preferences (If Trade Allowed) */}
            {card.allowTrades && card.tradePreferences && (
              <div className="mt-3 p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-amber-900 mb-1">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-amber-700" /> Seller Open to Bilateral Trades / Trade-Ups:
                </div>
                <ul className="list-disc list-inside text-amber-800 space-y-0.5 text-[11px]">
                  {card.tradePreferences.map((pref, i) => (
                    <li key={i}>{pref}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-wrap items-center gap-3">
            <button
              id="buy-with-escrow-button"
              onClick={() => onInitiateBuy(card)}
              className={`flex-1 py-3 px-4 rounded-xl ${colors.buttonBg} ${colors.buttonText} font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Buy with Escrow (${card.listingPrice.toLocaleString()})</span>
            </button>

            <button
              id="inspect-seo-schema-button"
              onClick={() => onInspectSeo(card)}
              className="p-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 transition-colors border border-zinc-200 shadow-xs"
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
