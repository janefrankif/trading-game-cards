'use client';

import React from 'react';
import Image from 'next/image';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '@/lib/woocommerce-store';

interface WooCommerceMiniCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onViewCart: () => void;
  onCheckout: () => void;
  subtotal: number;
}

export function WooCommerceMiniCart({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onViewCart,
  onCheckout,
  subtotal,
}: WooCommerceMiniCartProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              <h2 className="font-bold text-base text-white">Your Shopping Cart</h2>
              <span className="text-xs bg-indigo-900/60 text-indigo-300 font-semibold px-2 py-0.5 rounded-full border border-indigo-700/50">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Insured Free Shipping Notice */}
          <div className="bg-indigo-950/40 border-b border-indigo-900/40 p-3 text-xs text-indigo-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {subtotal >= 150 ? (
                <span className="text-emerald-300 font-medium">
                  🎉 You qualify for FREE US Insured Priority Express Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-white">${(150 - subtotal).toFixed(2)}</strong> more for free insured shipping with signature.
                </span>
              )}
            </span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-800/80">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-slate-600 stroke-[1.5]" />
                <p className="text-sm">Your cart is currently empty.</p>
                <p className="text-xs text-slate-500">Explore authentic WOTC, Lorcana, and MTG slabs in the shop.</p>
                <button
                  onClick={() => {
                    onClose();
                    onViewCart();
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Return to Shop
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-3.5 flex gap-3 group">
                  <div className="relative w-16 h-22 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                    <Image
                      src={item.card.image}
                      alt={item.card.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                      sizes="64px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div className="text-xs font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                        {item.card.name}
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {item.card.game} • <span className="text-indigo-400 font-medium">{item.selectedCondition}</span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-700 rounded-md bg-slate-950 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-white text-[11px]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-xs font-mono font-bold text-white">
                        ${(item.unitPrice * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Controls */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-950/90 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-base font-bold text-white font-mono">
                  ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                US State sales tax & shipping calculated at checkout.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onViewCart();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all text-center"
                >
                  View Cart
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onCheckout();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/30"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
