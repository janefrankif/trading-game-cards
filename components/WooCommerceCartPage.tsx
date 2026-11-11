'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Check, 
  Truck, 
  RotateCcw,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { CartItem, US_STATES } from '@/lib/woocommerce-store';

interface WooCommerceCartPageProps {
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
  subtotal: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  discountAmount: number;
  selectedState: string;
  setSelectedState: (state: string) => void;
  shippingCost: number;
  setShippingCost: (cost: number) => void;
  taxAmount: number;
  grandTotal: number;
}

export function WooCommerceCartPage({
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping,
  subtotal,
  couponCode,
  setCouponCode,
  discountAmount,
  selectedState,
  setSelectedState,
  shippingCost,
  setShippingCost,
  taxAmount,
  grandTotal
}: WooCommerceCartPageProps) {
  const [inputCoupon, setInputCoupon] = useState<string>('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = inputCoupon.trim().toUpperCase();
    if (!code) return;

    if (code === 'POKEMON10' || code === 'VAULT10') {
      setCouponCode(code);
      setCouponMessage({ type: 'success', text: `Coupon code "${code}" applied successfully (10% off)!` });
    } else if (code === 'VAULT50') {
      setCouponCode(code);
      setCouponMessage({ type: 'success', text: `Coupon code "${code}" applied ($50 off)!` });
    } else {
      setCouponMessage({ type: 'error', text: `Coupon "${code}" does not exist or has expired.` });
    }
  };

  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-indigo-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-white">Your cart is currently empty.</h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Before proceed to checkout you must add some trading cards or sealed collectibles to your shopping cart.
        </p>
        <button
          onClick={onContinueShopping}
          className="mt-4 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-1.5 border-b border-slate-800 pb-3">
        <button onClick={onContinueShopping} className="hover:text-indigo-400">Home</button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <button onClick={onContinueShopping} className="hover:text-indigo-400">Shop</button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-slate-200 font-medium">Cart</span>
      </nav>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-200 font-semibold">
              {subtotal >= freeShippingThreshold ? (
                <span className="text-emerald-400">
                  🎉 Congratulations! Your order qualifies for <strong>FREE Insured Express Shipping with Signature</strong>!
                </span>
              ) : (
                <span>
                  Add <strong className="text-amber-400">${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more to unlock <strong>FREE US Insured Express Shipping</strong>!
                </span>
              )}
            </span>
          </div>
          <span className="font-mono text-xs text-slate-400 font-bold">{Math.round(progressToFreeShipping)}%</span>
        </div>

        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      {/* Coupon Alerts */}
      {couponMessage && (
        <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
          couponMessage.type === 'success' 
            ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-200' 
            : 'bg-rose-950/80 border border-rose-500/50 text-rose-200'
        }`}>
          {couponMessage.type === 'success' ? <Check className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
          <span>{couponMessage.text}</span>
        </div>
      )}

      {/* 2-Column WooCommerce Cart Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Cart Table & Actions */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4 w-10"></th>
                    <th className="py-3 px-4 w-18">Card</th>
                    <th className="py-3 px-4">Product Details</th>
                    <th className="py-3 px-4 font-mono">Price</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4 text-right font-mono">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {cartItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-850/50 transition-colors">
                      {/* Remove Button */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                          title="Remove item from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                      {/* Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="relative w-12 h-16 rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
                          <Image
                            src={item.card.image}
                            alt={item.card.name}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                            sizes="48px"
                          />
                        </div>
                      </td>

                      {/* Product Name & Specs */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-white text-sm hover:text-indigo-400 transition-colors">
                          {item.card.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {item.card.game} • {item.card.set}
                        </div>
                        <div className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                          {item.selectedCondition}
                        </div>
                      </td>

                      {/* Unit Price */}
                      <td className="py-3 px-4 font-mono font-semibold text-slate-300">
                        ${item.unitPrice.toLocaleString()}
                      </td>

                      {/* Quantity Selector */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center border border-slate-700 rounded-lg bg-slate-950 text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-slate-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 font-mono font-bold text-white text-xs">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-slate-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Line Subtotal */}
                      <td className="py-3 px-4 text-right font-mono font-black text-white text-sm">
                        ${(item.unitPrice * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions: Coupon & Continue Shopping */}
            <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Try 'POKEMON10' or 'VAULT50'"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
                >
                  Apply coupon
                </button>
              </form>

              <button
                onClick={onContinueShopping}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: WooCommerce Cart Totals Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-4">
            <h2 className="text-base font-black text-white pb-3 border-b border-slate-800">
              Cart Totals
            </h2>

            {/* Subtotal */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Subtotal</span>
              <span className="font-mono font-bold text-white text-sm">
                ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Coupon Discount if active */}
            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-xs text-emerald-400">
                <span className="flex items-center gap-1 font-medium">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Coupon: {couponCode}</span>
                </span>
                <span className="font-mono font-bold">
                  -${discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            )}

            {/* Shipping Calculator */}
            <div className="border-t border-slate-800 pt-3 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Shipping Destination</span>
                <span className="text-indigo-400 text-[11px] font-bold">United States (US)</span>
              </div>

              {/* State Selector */}
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500"
              >
                {US_STATES.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.name} ({st.code}) — {(st.taxRate * 100).toFixed(2)}% State Tax
                  </option>
                ))}
              </select>

              {/* Shipping Options */}
              <div className="space-y-1.5 pt-1 text-xs">
                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingCost === 0 && subtotal >= freeShippingThreshold}
                      onChange={() => setShippingCost(0)}
                      className="accent-indigo-600"
                    />
                    <span className="text-slate-300">USPS Priority Express (Free &gt;$150)</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">FREE</span>
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingCost === 18.5}
                      onChange={() => setShippingCost(18.5)}
                      className="accent-indigo-600"
                    />
                    <span className="text-slate-300">USPS Priority Express + Signature</span>
                  </div>
                  <span className="font-mono text-white font-bold">$18.50</span>
                </label>

                <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingCost === 0 && subtotal < freeShippingThreshold}
                      onChange={() => setShippingCost(0)}
                      className="accent-indigo-600"
                    />
                    <span className="text-slate-300">Vault Custody Holding (No Shipping)</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">$0.00</span>
                </label>
              </div>
            </div>

            {/* Estimated Tax */}
            <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs">
              <span className="text-slate-400">Estimated US State Tax</span>
              <span className="font-mono font-bold text-slate-300">
                ${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Grand Total */}
            <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
              <span className="text-sm font-bold text-white">Order Total</span>
              <span className="font-mono font-black text-xl text-white">
                ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust Badges */}
            <div className="pt-2 text-[11px] text-slate-400 space-y-1 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Stripe Encrypted Checkout</span>
              </div>
              <p className="text-slate-500">72-Hour Inspection Window on all graded slabs</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
