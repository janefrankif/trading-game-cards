'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  FileText,
  Percent,
  CheckCircle2
} from 'lucide-react';

export function FeeCalculator() {
  const [cardPrice, setCardPrice] = useState<number>(1500);

  // eBay Trading Cards Fee model (13.25% + $0.30 per order up to $7,500, then 2.35% on remainder, plus standard promoted listings ~3%)
  const calculateEbayFee = (val: number) => {
    let fee = 0;
    if (val <= 7500) {
      fee = val * 0.1325 + 0.30;
    } else {
      fee = (7500 * 0.1325) + ((val - 7500) * 0.0235) + 0.30;
    }
    return fee;
  };

  // TCGPlayer Marketplace Fee model (10.25% base + 2.5% + $0.30 payment processing = ~12.75% + $0.30)
  const calculateTcgPlayerFee = (val: number) => {
    return val * 0.1275 + 0.30;
  };

  // VaultTradeHQ (Specialized Platform: 6.5% platform fee + Stripe Connect 2.9% + $0.30 = 9.4% + $0.30)
  const calculateOurPlatformFee = (val: number) => {
    return val * 0.065 + (val * 0.029 + 0.30);
  };

  const ebayFee = calculateEbayFee(cardPrice);
  const tcgPlayerFee = calculateTcgPlayerFee(cardPrice);
  const ourFee = calculateOurPlatformFee(cardPrice);

  const ebayPayout = Math.max(0, cardPrice - ebayFee);
  const tcgPlayerPayout = Math.max(0, cardPrice - tcgPlayerFee);
  const ourPayout = Math.max(0, cardPrice - ourFee);

  const sellerSavingsVsEbay = ebayPayout > 0 ? ourPayout - ebayPayout : 0;
  const sellerSavingsVsTcg = tcgPlayerPayout > 0 ? ourPayout - tcgPlayerPayout : 0;

  return (
    <section id="fee-calculator-section" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-2">
          <Calculator className="w-3.5 h-3.5" /> Financial & Regulatory Unit Economics
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          US Marketplace Fee & Net Seller Payout Calculator
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
          High-value trading card collectors frequently migrate away from eBay and TCGPlayer due to punitive 13%+ fees. See how a dedicated 6.5% escrow marketplace model maximizes collector net payout.
        </p>

        {/* Interactive Slider */}
        <div className="mt-6 p-5 bg-slate-950/60 rounded-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Card Sale Price (USD):
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Custom Value:</span>
              <div className="relative">
                <span className="absolute left-2.5 top-1.5 text-xs text-slate-400 font-mono">$</span>
                <input
                  type="number"
                  min="10"
                  max="100000"
                  value={cardPrice}
                  onChange={(e) => setCardPrice(Math.max(1, Number(e.target.value)))}
                  className="w-32 pl-6 pr-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono font-bold text-sm rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <input
            type="range"
            min="50"
            max="25000"
            step="50"
            value={cardPrice}
            onChange={(e) => setCardPrice(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
            <span>$50 (Raw Single)</span>
            <span>$1,500 (Mid-Grail)</span>
            <span>$5,000 (Vintage Slab)</span>
            <span>$25,000 (Trophy Grail)</span>
          </div>
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* eBay Card */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-white text-base">eBay</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">13.25% + $0.30</span>
            </div>
            <p className="text-xs text-slate-400">Standard collectible category seller rate with high dispute friction.</p>

            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Gross Sale:</span>
                <span className="font-mono text-white">${cardPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Deducted Fees:</span>
                <span className="font-mono">-${ebayFee.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="text-[11px] text-slate-400">Estimated Net Payout:</div>
            <div className="text-2xl font-black font-mono text-slate-200">${ebayPayout.toFixed(2)}</div>
          </div>
        </div>

        {/* TCGPlayer Card */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-white text-base">TCGPlayer</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">10.25% + 2.5%</span>
            </div>
            <p className="text-xs text-slate-400">Marketplace commission + credit card processing fee.</p>

            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Gross Sale:</span>
                <span className="font-mono text-white">${cardPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Deducted Fees:</span>
                <span className="font-mono">-${tcgPlayerFee.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="text-[11px] text-slate-400">Estimated Net Payout:</div>
            <div className="text-2xl font-black font-mono text-slate-200">${tcgPlayerPayout.toFixed(2)}</div>
          </div>
        </div>

        {/* VaultTradeHQ Specialized Model */}
        <div className="bg-gradient-to-b from-indigo-950/70 to-slate-900 rounded-2xl p-5 border-2 border-indigo-500 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Optimal Model
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-white text-base">VaultTradeHQ</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">6.5% + Stripe</span>
            </div>
            <p className="text-xs text-slate-300">Fair-tier platform fee + direct Stripe Connect Custom processing.</p>

            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Gross Sale:</span>
                <span className="font-mono text-white">${cardPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Deducted Total (6.5% + 2.9%):</span>
                <span className="font-mono">-${ourFee.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-indigo-800/60">
            <div className="text-[11px] text-indigo-300">Collector Net Payout:</div>
            <div className="text-2xl font-black font-mono text-emerald-400">${ourPayout.toFixed(2)}</div>

            {sellerSavingsVsEbay > 0 && (
              <div className="mt-2 text-xs font-bold text-emerald-300 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+${sellerSavingsVsEbay.toFixed(2)} more cash in pocket vs eBay!</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* US Tax & Regulatory Compliance Card */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-3">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <span>US Regulatory Requirements: IRS 1099-K & State Sales Tax Facilitator Law</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Under US federal tax regulations, platforms facilitating third-party transactions must issue an IRS Form 1099-K to any seller exceeding the federal gross sales thresholds. Additionally, under the Marketplace Facilitator Act, your platform is legally responsible for collecting and remitting local sales tax on buyers residing in participating US states (e.g. California 7.25%+, Texas 6.25%+, New York 4.0%+), which Stripe Tax or TaxJar handles automatically.
        </p>
      </div>
    </section>
  );
}
