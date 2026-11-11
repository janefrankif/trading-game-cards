'use client';

import React from 'react';
import Image from 'next/image';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '@/lib/woocommerce-store';
import { useTheme } from '@/lib/theme-context';

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
  const { colors } = useTheme();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200 text-zinc-900 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className={`w-5 h-5 ${colors.textAccent}`} />
              <h2 className="font-bold text-base text-zinc-900">Your Shopping Cart</h2>
              <span className={`text-xs ${colors.badgeBg} ${colors.badgeText} font-semibold px-2 py-0.5 rounded-full border ${colors.badgeBorder}`}>
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Insured Free Shipping Notice */}
          <div className="bg-emerald-50 border-b border-emerald-200 p-3 text-xs text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {subtotal >= 150 ? (
                <span className="text-emerald-800 font-semibold">
                  🎉 You qualify for FREE US Insured Priority Express Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-zinc-900 font-bold">${(150 - subtotal).toFixed(2)}</strong> more for free insured shipping with signature.
                </span>
              )}
            </span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-zinc-100">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-zinc-400 stroke-[1.5]" />
                <p className="text-sm font-semibold text-zinc-800">Your cart is currently empty.</p>
                <p className="text-xs text-zinc-500">Explore authentic WOTC, Lorcana, and MTG slabs in the shop.</p>
                <button
                  onClick={() => {
                    onClose();
                    onViewCart();
                  }}
                  className={`mt-4 px-4 py-2 rounded-xl ${colors.buttonBg} ${colors.buttonText} text-xs font-semibold shadow-xs`}
                >
                  Return to Shop
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-3.5 flex gap-3 group">
                  <div className="relative w-16 h-22 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50 shrink-0">
                    <Image
                      src={item.card.image}
                      alt={item.card.name}
                      fill
                      className="object-contain p-1"
                      referrerPolicy="no-referrer"
                      sizes="64px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div className="text-xs font-bold text-zinc-900 truncate">
                        {item.card.name}
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-zinc-400 hover:text-rose-600 transition-colors p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-zinc-500 mt-0.5">
                      {item.card.game} • <span className={`font-semibold ${colors.textAccent}`}>{item.selectedCondition}</span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-zinc-200 rounded-md bg-zinc-50 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-zinc-900 text-[11px] font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-xs font-mono font-bold text-zinc-900">
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
            <div className="p-4 border-t border-zinc-200 bg-zinc-50 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-600">Subtotal</span>
                <span className="text-base font-bold text-zinc-900 font-mono">
                  ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">
                US State sales tax & shipping calculated at checkout.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onViewCart();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-bold transition-all text-center shadow-xs"
                >
                  View Cart
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onCheckout();
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl ${colors.buttonBg} ${colors.buttonText} text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-xs`}
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
