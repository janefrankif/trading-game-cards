'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CardItem } from '@/lib/marketplace-data';
import { 
  X, 
  ArrowLeftRight, 
  Plus, 
  Trash2, 
  ShieldCheck
} from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

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
  const { colors } = useTheme();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="trade-proposal-modal-container"
        className="bg-white border border-zinc-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-zinc-900 p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className={`flex items-center gap-2 ${colors.textAccent} font-bold text-sm mb-1`}>
          <ArrowLeftRight className="w-4 h-4" />
          <span>Bilateral Trade Engine</span>
        </div>
        <h2 className="text-xl font-black text-zinc-900">Create Trade & Cash Delta Offer</h2>
        <p className="text-xs text-zinc-600 mt-1">
          Offer cards from your virtual binder, plus an optional cash delta. Both parties ship to our Escrow Vault for condition authentication before release.
        </p>

        {/* Target Card Header */}
        <div className="mt-4 p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-16 rounded-lg overflow-hidden border border-zinc-200 bg-white shrink-0">
              <Image
                src={targetCard.image}
                alt={targetCard.name}
                fill
                className="object-contain p-1"
                referrerPolicy="no-referrer"
                sizes="48px"
              />
            </div>
            <div>
              <div className="text-xs text-zinc-500">{targetCard.game} • {targetCard.set}</div>
              <div className="font-bold text-zinc-900 text-sm">{targetCard.name}</div>
              <div className="text-xs text-emerald-700 font-semibold">
                {targetCard.isGraded ? targetCard.gradeScore : targetCard.rawCondition}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-zinc-500">Target Value</div>
            <div className="text-lg font-black text-zinc-900 font-mono">${targetCard.listingPrice.toLocaleString()}</div>
          </div>
        </div>

        {/* What you are offering */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-zinc-800">1. Cards From Your Binder:</label>
            <span className="text-xs text-zinc-500">Cards Total: <strong className="text-zinc-900 font-bold">${totalOfferedCardValue.toLocaleString()}</strong></span>
          </div>

          {/* List of currently offered cards */}
          <div className="space-y-2 mb-3">
            {myOfferedItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-zinc-200 text-xs shadow-xs">
                <span className="font-medium text-zinc-800">{item.name}</span>
                <div className="flex items-center gap-3">
                  <span className={`font-mono font-bold ${colors.textAccent}`}>${item.val}</span>
                  <button 
                    onClick={() => handleRemoveCard(idx)}
                    className="text-zinc-400 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add card input */}
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 p-2 rounded-2xl bg-zinc-50 border border-zinc-200">
            <input
              type="text"
              placeholder="e.g. Pikachu VMAX Secret (PSA 10)"
              value={offeredCardName}
              onChange={(e) => setOfferedCardName(e.target.value)}
              className="sm:col-span-4 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400"
            />
            <input
              type="number"
              placeholder="Value $"
              value={offeredCardEstimatedVal}
              onChange={(e) => setOfferedCardEstimatedVal(e.target.value)}
              className="sm:col-span-2 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400"
            />
            <button
              onClick={handleAddCard}
              className={`sm:col-span-1 p-1.5 rounded-lg ${colors.buttonBg} ${colors.buttonText} flex items-center justify-center font-bold`}
              title="Add Card"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cash Delta Adjustment */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-zinc-800 block mb-1">
            2. Add Cash Delta (Authorized via Stripe Escrow):
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-zinc-400 text-xs">$</span>
            <input
              type="number"
              value={cashDelta || ''}
              onChange={(e) => setCashDelta(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 font-mono focus:outline-none focus:border-zinc-400"
            />
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">
            Cash is only charged after both cards pass physical condition inspection at the central verification hub.
          </p>
        </div>

        {/* Trade Balance Summary */}
        <div className="mt-5 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs space-y-1">
          <div className="flex justify-between items-center py-1">
            <span className="text-zinc-600">Total Offeree Card Value:</span>
            <span className="font-mono font-bold text-zinc-900">${totalOfferedCardValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-zinc-600">Cash Delta Added:</span>
            <span className="font-mono font-bold text-zinc-900">+${cashDelta.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-t border-zinc-200 font-bold">
            <span className="text-zinc-900">Total Value Offered:</span>
            <span className={`font-mono text-sm ${colors.textAccent}`}>${totalOfferValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-1 text-[11px]">
            <span className="text-zinc-500">Trade Difference vs Listing:</span>
            <span className={`font-mono font-semibold ${valueDelta >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
              {valueDelta >= 0 ? `+$${valueDelta.toLocaleString()} (Advantage Seller)` : `-$${Math.abs(valueDelta).toLocaleString()} (Under Ask)`}
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-600 hover:text-zinc-900"
          >
            Cancel
          </button>
          <button
            id="submit-trade-offer-button"
            onClick={handleConfirm}
            className={`px-5 py-2.5 rounded-xl ${colors.buttonBg} ${colors.buttonText} text-xs font-black flex items-center gap-2 shadow-xs`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Submit to Escrow Engine</span>
          </button>
        </div>

      </div>
    </div>
  );
}
