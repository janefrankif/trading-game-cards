'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CardItem } from '@/lib/marketplace-data';
import { 
  X, 
  ArrowLeftRight, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface TradeProposalModalProps {
  targetCard: CardItem | null;
  onClose: () => void;
  onConfirmTradeOffer: (offerSummary: {
    targetCard: CardItem;
    offeredCards: string[];
    cashDelta: number;
    escrowFee: number;
  }) => void;
}

export function TradeProposalModal({
  targetCard,
  onClose,
  onConfirmTradeOffer,
}: TradeProposalModalProps) {
  const [offeredCardName, setOfferedCardName] = useState('');
  const [offeredCardEstimatedVal, setOfferedCardEstimatedVal] = useState('');
  const [myOfferedItems, setMyOfferedItems] = useState<Array<{ name: string; val: number }>>([
    { name: 'Charizard VMAX Shiny Vault (PSA 10)', val: 240 },
    { name: 'Mewtwo & Mew GX Secret (Raw NM)', val: 95 },
  ]);
  const [cashDelta, setCashDelta] = useState<number>(0);

  if (!targetCard) return null;

  const totalOfferedCardValue = myOfferedItems.reduce((acc, item) => acc + item.val, 0);
  const totalOfferValue = totalOfferedCardValue + (Number(cashDelta) || 0);
  const valueDelta = totalOfferValue - targetCard.listingPrice;
  const platformEscrowFee = 25.0; // Flat trade arbitration fee

  const handleAddCard = () => {
    if (!offeredCardName.trim() || !offeredCardEstimatedVal) return;
    setMyOfferedItems([
      ...myOfferedItems,
      { name: offeredCardName.trim(), val: parseFloat(offeredCardEstimatedVal) || 0 },
    ]);
    setOfferedCardName('');
    setOfferedCardEstimatedVal('');
  };

  const handleRemoveCard = (index: number) => {
    setMyOfferedItems(myOfferedItems.filter((_, idx) => idx !== index));
  };

  const handleConfirm = () => {
    onConfirmTradeOffer({
      targetCard,
      offeredCards: myOfferedItems.map((c) => `${c.name} ($${c.val})`),
      cashDelta: Number(cashDelta) || 0,
      escrowFee: platformEscrowFee,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="trade-proposal-modal-container"
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100 p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-1">
          <ArrowLeftRight className="w-4 h-4" />
          <span>Bilateral Trade Engine</span>
        </div>
        <h2 className="text-xl font-black text-white">Create Trade & Cash Delta Offer</h2>
        <p className="text-xs text-slate-400 mt-1">
          Offer cards from your virtual binder, plus an optional cash delta. Both parties ship to our Escrow Vault for condition authentication before release.
        </p>

        {/* Target Card Header */}
        <div className="mt-4 p-3.5 bg-slate-950/50 rounded-xl border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-16 rounded-lg overflow-hidden border border-slate-700 shrink-0">
              <Image
                src={targetCard.image}
                alt={targetCard.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                sizes="48px"
              />
            </div>
            <div>
              <div className="text-xs text-slate-400">{targetCard.game} • {targetCard.set}</div>
              <div className="font-bold text-white text-sm">{targetCard.name}</div>
              <div className="text-xs text-emerald-400 font-medium">
                {targetCard.isGraded ? targetCard.gradeScore : targetCard.rawCondition}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-400">Target Value</div>
            <div className="text-lg font-black text-amber-400">${targetCard.listingPrice.toLocaleString()}</div>
          </div>
        </div>

        {/* What you are offering */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-200">1. Cards From Your Binder:</label>
            <span className="text-xs text-slate-400">Cards Total: <strong className="text-slate-200">${totalOfferedCardValue.toLocaleString()}</strong></span>
          </div>

          {/* List of currently offered cards */}
          <div className="space-y-2 mb-3">
            {myOfferedItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
                <span className="font-medium text-slate-200">{item.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-amber-400">${item.val}</span>
                  <button 
                    onClick={() => handleRemoveCard(idx)}
                    className="text-slate-400 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add card input */}
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 p-2 rounded-xl bg-slate-950/40 border border-slate-800">
            <input
              type="text"
              placeholder="e.g. Pikachu VMAX Secret (PSA 10)"
              value={offeredCardName}
              onChange={(e) => setOfferedCardName(e.target.value)}
              className="sm:col-span-4 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="number"
              placeholder="Value $"
              value={offeredCardEstimatedVal}
              onChange={(e) => setOfferedCardEstimatedVal(e.target.value)}
              className="sm:col-span-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleAddCard}
              className="sm:col-span-1 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center"
              title="Add Card"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cash Delta Adjustment */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-slate-200 block mb-1">
            2. Add Cash Delta (Authorized via Stripe Escrow):
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-400 text-xs">$</span>
            <input
              type="number"
              value={cashDelta || ''}
              onChange={(e) => setCashDelta(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-950/60 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Cash is only charged after both cards pass physical condition inspection at the central verification hub.
          </p>
        </div>

        {/* Trade Balance Summary */}
        <div className="mt-5 p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">Total Offeree Card Value:</span>
            <span className="font-mono text-white">${totalOfferedCardValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">Cash Delta Added:</span>
            <span className="font-mono text-white">+${cashDelta.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-t border-slate-700 font-bold">
            <span className="text-slate-300">Total Value Offered:</span>
            <span className="font-mono text-amber-400 text-sm">${totalOfferValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-1 text-[11px]">
            <span className="text-slate-400">Trade Difference vs Listing:</span>
            <span className={`font-mono font-semibold ${valueDelta >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {valueDelta >= 0 ? `+$${valueDelta.toLocaleString()} (Advantage Seller)` : `-$${Math.abs(valueDelta).toLocaleString()} (Under Ask)`}
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            id="submit-trade-offer-button"
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-900/30"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Submit to Escrow Engine</span>
          </button>
        </div>

      </div>
    </div>
  );
}
