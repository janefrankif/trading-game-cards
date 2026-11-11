'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Lock, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle,
  Clock,
  ExternalLink,
  PackageCheck,
  Apple,
  Bitcoin,
  Building2,
  DollarSign,
  Send,
  Info
} from 'lucide-react';
import { CartItem, PlacedOrder, US_STATES } from '@/lib/woocommerce-store';
import { useTheme } from '@/lib/theme-context';

export type PaymentMethodType = 
  | 'apple_pay' 
  | 'chime' 
  | 'cashapp' 
  | 'zelle' 
  | 'bitcoin' 
  | 'escrow' 
  | 'stripe';

const PAYMENT_OPTIONS = [
  {
    id: 'apple_pay' as const,
    name: 'Apple Pay',
    tag: '1-Touch Express',
    tagColor: 'text-zinc-800 border-zinc-300 bg-zinc-100',
    icon: Apple,
    iconColor: 'text-zinc-900',
    description: 'Fast, encrypted 1-touch checkout with Apple Wallet on supported devices.',
    notice: 'Payment details not integrated yet. Order will be reserved without entering payment info.',
  },
  {
    id: 'chime' as const,
    name: 'Chime',
    tag: 'Direct & Member Pay',
    tagColor: 'text-emerald-800 border-emerald-200 bg-emerald-50',
    icon: Building2,
    iconColor: 'text-emerald-600',
    description: 'Direct Chime member-to-member payment with zero transaction fees.',
    notice: 'Payment details not integrated yet. No bank or routing numbers are collected.',
  },
  {
    id: 'cashapp' as const,
    name: 'Cash App',
    tag: '$Cashtag Instant',
    tagColor: 'text-emerald-800 border-emerald-200 bg-emerald-50',
    icon: DollarSign,
    iconColor: 'text-emerald-600',
    description: 'Instant transfer using Cash App Pay with verified $Cashtag recipient escrow.',
    notice: 'Payment details not integrated yet. No $Cashtag or payment credentials needed right now.',
  },
  {
    id: 'zelle' as const,
    name: 'Zelle',
    tag: 'Instant Bank Transfer',
    tagColor: 'text-purple-800 border-purple-200 bg-purple-50',
    icon: Send,
    iconColor: 'text-purple-600',
    description: 'Direct zero-fee bank-to-bank settlement across all major US institutions.',
    notice: 'Payment details not integrated yet. Bank info is not required or collected at this step.',
  },
  {
    id: 'bitcoin' as const,
    name: 'Bitcoin (BTC)',
    tag: 'Lightning & On-Chain',
    tagColor: 'text-amber-800 border-amber-200 bg-amber-50',
    icon: Bitcoin,
    iconColor: 'text-amber-600',
    description: 'Cryptographic settlement held in dual-signature multi-sig escrow vault.',
    notice: 'Payment details not integrated yet. No wallet connection or address required at this stage.',
  },
  {
    id: 'escrow' as const,
    name: 'Vault 72-Hour Inspection Escrow',
    tag: 'Collector Escrow',
    tagColor: 'text-indigo-800 border-indigo-200 bg-indigo-50',
    icon: Clock,
    iconColor: 'text-indigo-600',
    description: 'Funds held in trust. Released to seller only after 72-hour physical slab inspection.',
    notice: 'Escrow protection enabled with full return guarantee during physical inspection window.',
  },
  {
    id: 'stripe' as const,
    name: 'Credit Card',
    tag: 'Visa, MC, Amex',
    tagColor: 'text-blue-800 border-blue-200 bg-blue-50',
    icon: CreditCard,
    iconColor: 'text-blue-400',
    description: 'Major credit & debit cards processed with 256-bit SSL encryption.',
    notice: 'Payment details not integrated yet. Demo card preview shown without processing live charges.',
  },
];

interface WooCommerceCheckoutPageProps {
  cartItems: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  taxAmount: number;
  grandTotal: number;
  selectedState: string;
  onOrderPlaced: (order: PlacedOrder) => void;
  onContinueShopping: () => void;
  onViewOrders: () => void;
}

export function WooCommerceCheckoutPage({
  cartItems,
  subtotal,
  discountAmount,
  shippingCost,
  taxAmount,
  grandTotal,
  selectedState,
  onOrderPlaced,
  onContinueShopping,
  onViewOrders
}: WooCommerceCheckoutPageProps) {
  const { colors } = useTheme();
  // Billing Form State
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Vance');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Los Angeles');
  const [stateCode, setStateCode] = useState(selectedState || 'CA');
  const [zip, setZip] = useState('90001');
  const [phone, setPhone] = useState('(310) 555-0199');
  const [email, setEmail] = useState('alex.vance@collector.io');
  const [orderNotes, setOrderNotes] = useState('Please ensure slab is sealed in bubble wrap with tamper-evident seal.');

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('apple_pay');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('789');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Completed Order State for Confirmation Screen
  const [completedOrder, setCompletedOrder] = useState<PlacedOrder | null>(null);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the Collector Escrow Terms & Conditions to proceed.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNum = `VT-${Math.floor(100000 + Math.random() * 900000)}`;
      const tracking = `9400 1118 9956 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} 12`;

      const paymentMethodNames: Record<PaymentMethodType, string> = {
        apple_pay: 'Apple Pay',
        chime: 'Chime',
        cashapp: 'Cash App',
        zelle: 'Zelle',
        bitcoin: 'Bitcoin (BTC)',
        escrow: 'Vault 72-Hour Escrow Hold',
        stripe: 'Credit Card (Stripe)',
      };

      const newOrder: PlacedOrder = {
        id: `order-${Date.now()}`,
        orderNumber: orderNum,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        items: [...cartItems],
        subtotal,
        discount: discountAmount,
        shippingMethod: shippingCost === 0 ? 'USPS Priority Express (Free Escrow Promotion)' : 'USPS Priority Express + Signature',
        shippingCost,
        tax: taxAmount,
        total: grandTotal,
        status: 'Processing',
        trackingNumber: tracking,
        paymentMethod: paymentMethodNames[paymentMethod],
        billingAddress: {
          firstName,
          lastName,
          address,
          city,
          state: stateCode,
          zip,
          email,
          phone,
        },
      };

      setCompletedOrder(newOrder);
      onOrderPlaced(newOrder);
      setIsSubmitting(false);
    }, 1200);
  };

  // ORDER RECEIVED CONFIRMATION SCREEN
  if (completedOrder) {
    return (
      <div className="max-w-4xl mx-auto py-8 space-y-6 animate-in fade-in">
        {/* WooCommerce Order Received Header Notice */}
        <div className="bg-emerald-950/70 border border-emerald-500/60 rounded-2xl p-6 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h1 className="text-2xl font-black text-white">Thank you. Your order has been received.</h1>
          <p className="text-xs text-emerald-200 max-w-lg mx-auto">
            Your transaction is securely routed through our US Collector Escrow Vault. Funds are held in trust and will only disburse after the 72-hour physical inspection window.
          </p>
        </div>

        {/* Order Meta Bar */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Order Number:</span>
            <span className="font-mono font-bold text-white text-sm">{completedOrder.orderNumber}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Date:</span>
            <span className="font-bold text-white">{completedOrder.date}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Total:</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">
              ${completedOrder.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Payment Method:</span>
            <span className="font-bold text-slate-200">{completedOrder.paymentMethod}</span>
          </div>
        </div>

        {/* Escrow & Tracking Live Status */}
        <div className="bg-indigo-950/40 border border-indigo-900/50 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-indigo-400" />
              <h2 className="font-bold text-white text-sm">USPS Carrier Dispatch & Escrow Timer</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-900 text-indigo-300 border border-indigo-700/50">
              {completedOrder.status}
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Assigned USPS Tracking Number: <span className="font-mono text-amber-300 font-bold">{completedOrder.trackingNumber}</span> (Priority Mail with Mandatory Adult Signature).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Payment Method</span>
              <span className="font-bold text-white">{completedOrder.paymentMethod}</span>
            </div>
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Payment Details Status</span>
              <span className="font-bold text-amber-300">Pending Integration (Reserved)</span>
            </div>
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Inspection Window</span>
              <span className="font-bold text-emerald-400">72:00:00 (Post-Delivery)</span>
            </div>
          </div>
        </div>

        {/* Payment Details Note */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 text-xs space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-300 font-bold">
            <Info className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Payment Method: {completedOrder.paymentMethod}</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Your card inventory has been reserved in our vault queue. Payment details are not integrated yet as requested; no sensitive account details or live credentials were required for this transaction.
          </p>
        </div>

        {/* Order Details Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <h2 className="p-4 font-bold text-white text-sm border-b border-slate-800">
            Order Items & Specifications
          </h2>
          <div className="divide-y divide-slate-800 p-4 space-y-3">
            {completedOrder.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs pt-2">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-14 rounded-lg overflow-hidden border border-slate-700">
                    <Image src={item.card.image} alt={item.card.name} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <span className="font-bold text-white">{item.card.name} × {item.quantity}</span>
                    <div className="text-[11px] text-slate-400">{item.selectedCondition}</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-white">
                  ${(item.unitPrice * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}

            <div className="pt-4 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-white font-mono">${completedOrder.subtotal.toLocaleString()}</span>
              </div>
              {completedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount:</span>
                  <span className="font-mono">-${completedOrder.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-white font-mono">${completedOrder.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax ({completedOrder.billingAddress.state}):</span>
                <span className="text-white font-mono">${completedOrder.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-white text-sm pt-2 border-t border-slate-800">
                <span>Total:</span>
                <span className="font-mono text-emerald-400">${completedOrder.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onViewOrders}
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors text-center shadow-lg shadow-indigo-600/30"
          >
            Manage Order in My Account
          </button>
          <button
            onClick={onContinueShopping}
            className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 transition-colors text-center"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // EMPTY CHECKOUT REDIRECT
  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Your cart is empty.</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={onContinueShopping}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handlePlaceOrder} className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-xs text-zinc-500 flex items-center gap-1.5 border-b border-zinc-200 pb-3">
        <button type="button" onClick={onContinueShopping} className="hover:text-zinc-900">Home</button>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <button type="button" onClick={onContinueShopping} className="hover:text-zinc-900">Shop</button>
        <ChevronRight className="w-3 h-3 text-zinc-400" />
        <span className="text-zinc-900 font-semibold">Checkout</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Billing Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs space-y-5">
            <h2 className="text-base font-black text-zinc-900 pb-3 border-b border-zinc-100">
              Billing Details
            </h2>

            {/* Names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-700 font-semibold block mb-1">
                  First name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-zinc-100 hover:bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-400"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-700 font-semibold block mb-1">
                  Last name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-zinc-100 hover:bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-400"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="text-xs text-zinc-700 font-semibold block mb-1">
                Country / Region <span className="text-rose-500">*</span>
              </label>
              <div className="w-full bg-zinc-100 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-800 font-medium">
                United States (US)
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="text-xs text-zinc-700 font-semibold block mb-1">
                Street address <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="House number and street name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-zinc-100 hover:bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-400"
              />
            </div>

            {/* City, State, ZIP */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-zinc-700 font-semibold block mb-1">
                  Town / City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-zinc-100 hover:bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-400"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-700 font-semibold block mb-1">
                  State <span className="text-rose-500">*</span>
                </label>
                <select
                  value={stateCode}
                  onChange={(e) => setStateCode(e.target.value)}
                  className="w-full bg-zinc-100 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-400"
                >
                  {US_STATES.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-700 font-semibold block mb-1">
                  ZIP Code <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full bg-zinc-100 hover:bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-400"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-700 font-semibold block mb-1">
                  Phone (Carrier SMS Updates) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-100 hover:bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-400"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-700 font-semibold block mb-1">
                  Email address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-100 hover:bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 outline-none focus:border-zinc-400"
                />
              </div>
            </div>

            {/* Order Notes */}
            <div>
              <label className="text-xs text-zinc-700 font-semibold block mb-1">
                Order notes (optional)
              </label>
              <textarea
                rows={2}
                placeholder="Special delivery instructions for USPS carrier or tamper seal preferences..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full bg-zinc-100 hover:bg-zinc-50 focus:bg-white border border-zinc-200 rounded-xl p-3 text-xs text-zinc-900 outline-none focus:border-zinc-400 resize-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Review & WooCommerce Gateways */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-black text-zinc-900 pb-3 border-b border-zinc-100">
              Your Order
            </h2>

            {/* Order Items Table */}
            <div className="divide-y divide-zinc-100 text-xs">
              <div className="flex justify-between py-2 text-zinc-400 font-bold uppercase text-[10px]">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="py-2.5 flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-8 h-11 rounded border border-zinc-200 overflow-hidden shrink-0 bg-zinc-50">
                      <Image src={item.card.image} alt={item.card.name} fill className="object-contain p-0.5" referrerPolicy="no-referrer" />
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-zinc-900 truncate">{item.card.name}</div>
                      <div className="text-[10px] text-zinc-500">Qty: {item.quantity} • {item.selectedCondition}</div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-zinc-900 whitespace-nowrap">
                    ${(item.unitPrice * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}

              {/* Subtotal */}
              <div className="py-2 flex justify-between text-zinc-600 pt-3">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-zinc-900">${subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="py-2 flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="font-mono font-bold">-${discountAmount.toLocaleString()}</span>
                </div>
              )}

              {/* Shipping */}
              <div className="py-2 flex justify-between text-zinc-600">
                <span>Shipping (USPS Signature)</span>
                <span className="font-mono font-bold text-emerald-700">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              {/* Sales Tax */}
              <div className="py-2 flex justify-between text-zinc-600">
                <span>Sales Tax ({stateCode})</span>
                <span className="font-mono font-bold text-zinc-900">${taxAmount.toFixed(2)}</span>
              </div>

              {/* Total */}
              <div className="py-3 flex justify-between text-sm font-bold text-zinc-900 border-t border-zinc-100">
                <span>Total</span>
                <span className="font-mono font-black text-xl text-zinc-900">
                  ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Payment Gateway Selectors */}
            <div className="space-y-3 pt-4 border-t border-zinc-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Payment Method
                </h3>
                <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  <span>No credentials required</span>
                </span>
              </div>

              {/* Notice Banner */}
              <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-600 flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <p>
                  Select your preferred settlement method below. Payment details are not integrated at this step—your order will be placed and inventory reserved immediately.
                </p>
              </div>

              {/* Payment Methods List */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {PAYMENT_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const isSelected = paymentMethod === option.id;

                  return (
                    <div
                      key={option.id}
                      onClick={() => setPaymentMethod(option.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-50 border-zinc-900 shadow-xs'
                          : 'bg-white border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          checked={isSelected}
                          onChange={() => setPaymentMethod(option.id)}
                          className="accent-zinc-900 mt-0.5"
                        />
                        <div className="space-y-1 w-full min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-zinc-900 text-xs flex items-center gap-1.5 truncate">
                              <Icon className={`w-3.5 h-3.5 shrink-0 ${option.iconColor}`} />
                              <span>{option.name}</span>
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border shrink-0 ${option.tagColor}`}>
                              {option.tag}
                            </span>
                          </div>

                          <p className="text-[11px] text-zinc-600 leading-normal">
                            {option.description}
                          </p>

                          {isSelected && (
                            <div className="pt-1.5">
                              <div className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span>{option.notice}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2 text-xs text-zinc-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="rounded accent-zinc-900 mt-0.5"
                />
                <span>
                  I have read and agree to the website <span className="text-zinc-900 font-semibold underline">terms and conditions</span> and the 72-Hour Collector Inspection Protocol.
                </span>
              </label>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-4 rounded-xl ${colors.buttonBg} ${colors.buttonText} font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer`}
            >
              <Lock className="w-4 h-4" />
              <span>
                {isSubmitting 
                  ? 'Reserving Order in Vault Escrow...' 
                  : `Place Order with ${PAYMENT_OPTIONS.find(p => p.id === paymentMethod)?.name || 'Selected Method'}`
                }
              </span>
            </button>

            <div className="text-[10px] text-zinc-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL Encrypted & US 1099-K Facilitator Compliant</span>
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}
