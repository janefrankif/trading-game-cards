'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Package, 
  Truck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  FileText, 
  RefreshCw,
  Eye
} from 'lucide-react';

export function EscrowSimulator() {
  const [currentStep, setCurrentStep] = useState<number>(2); // 1 to 5
  const [disputeTriggered, setDisputeTriggered] = useState<boolean>(false);
  const [carrierStatus, setCarrierStatus] = useState<'pending' | 'in_transit' | 'out_for_delivery' | 'delivered'>('delivered');
  const [signatureVerified, setSignatureVerified] = useState<boolean>(true);
  const [inspectionHoursLeft, setInspectionHoursLeft] = useState<number>(46);

  const steps = [
    {
      step: 1,
      title: 'Order / Trade Agreement',
      desc: 'Buyer initiates purchase or bilateral trade proposal. Condition terms locked.',
      icon: FileText,
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'upcoming',
    },
    {
      step: 2,
      title: 'Stripe Escrow Pre-Auth Hold',
      desc: 'Payment captured into platform-controlled escrow holding vault. Seller notified.',
      icon: Lock,
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'upcoming',
    },
    {
      step: 3,
      title: 'Insured Tracked Transit (USPS)',
      desc: 'Mandatory signature tracking on items >$250 in serialized tamper-evident mailer.',
      icon: Truck,
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : 'upcoming',
    },
    {
      step: 4,
      title: '72-Hr Inspection Window',
      desc: 'Collector checks slab certification or raw centering/surface under magnification.',
      icon: Clock,
      status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'active' : 'upcoming',
    },
    {
      step: 5,
      title: 'Escrow Payout Disbursed',
      desc: 'Funds released to seller Stripe Connect account. 1099-K ledger recorded.',
      icon: CheckCircle2,
      status: currentStep === 5 ? 'completed' : 'upcoming',
    },
  ];

  const handleNextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setDisputeTriggered(false);
    setCarrierStatus('pending');
    setInspectionHoursLeft(72);
  };

  return (
    <section id="escrow-simulator-section" className="space-y-6">
      {/* Title */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> High-Value Collectible Security Protocol
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Interactive Escrow & Middleman Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Simulate the 5-stage secure transaction lifecycle that protects both buyers and sellers against empty-box fraud, counterfeit slabs, and chargeback scams in the US marketplace.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="self-start sm:self-center px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Flow</span>
          </button>
        </div>

        {/* Stepper Progress Visualizer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map((item) => {
            const Icon = item.icon;
            const isCompleted = item.status === 'completed';
            const isActive = item.status === 'active';

            return (
              <div
                key={item.step}
                onClick={() => setCurrentStep(item.step)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-950/50'
                    : isCompleted
                    ? 'bg-slate-800/60 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-500 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    isActive ? 'bg-indigo-600 text-white' : isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : isCompleted ? 'text-emerald-400' : 'text-slate-600'}`} />
                </div>
                <h3 className={`text-xs font-bold leading-snug ${isActive ? 'text-white' : isCompleted ? 'text-slate-200' : 'text-slate-400'}`}>
                  {item.title}
                </h3>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Stage Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Stage Interactive Control */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                Stage {currentStep} Active Ledger
              </span>
              <h3 className="text-xl font-black text-white mt-0.5">
                {steps[currentStep - 1].title}
              </h3>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Stripe Transfer Group #TG_89410_US
              </span>
            </div>
          </div>

          {/* Conditional Stage Content */}
          {currentStep === 1 && (
            <div className="space-y-3 text-xs text-slate-300">
              <p>The buyer initiates an Escrow Checkout for <strong>1st Edition Charizard PSA 9 ($18,200)</strong>.</p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1">
                <div className="text-slate-400">Order ID: <span className="text-white">ORD_77492_TCG</span></div>
                <div className="text-slate-400">Buyer: <span className="text-white">collector_ash@kanto.org (Austin, TX)</span></div>
                <div className="text-slate-400">Seller: <span className="text-white">PikachuVault US (Dallas, TX)</span></div>
                <div className="text-slate-400">Locked Condition: <span className="text-emerald-400">PSA 9 Mint (Cert #9048218)</span></div>
              </div>
              <p className="text-[11px] text-slate-400">
                Both parties agree that payment is held in escrow until physical delivery + 72 hours of uninterrupted inspection time.
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 bg-indigo-950/30 rounded-xl border border-indigo-800/40">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-1">
                  <Lock className="w-4 h-4" /> Funds Held in Platform Escrow
                </div>
                <p className="text-slate-300 text-xs">
                  Stripe PaymentIntent created with <code>capture_method: manual</code> or held in platform escrow account. Total $18,200 + $120 insured shipping is secured. The seller cannot withdraw until inspection approval.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Stripe Pre-Auth State</div>
                  <div className="text-emerald-400 font-mono font-bold text-sm">AUTHORIZED_HOLD</div>
                </div>
                <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Marketplace Commission (6.5%)</div>
                  <div className="text-amber-400 font-mono font-bold text-sm">$1,183.00</div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 text-xs text-slate-300">
              <p>Seller has generated a USPS Priority Mail Express label via Shippo/EasyPost API.</p>
              
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Tracking Number:</span>
                  <span className="font-mono text-indigo-300">9400 1118 9956 0912 3456 78</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Carrier Service:</span>
                  <span className="text-white">USPS Priority Express (Next-Day)</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Signature Confirmation:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Mandatory (Value &gt; $250)
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Tamper Seal Check:</span>
                  <span className="text-amber-400 font-mono">SEAL_VOID_#881923</span>
                </div>
              </div>

              {/* Carrier status simulator */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs">Simulate Webhook Status:</span>
                <select
                  value={carrierStatus}
                  onChange={(e) => setCarrierStatus(e.target.value as any)}
                  className="bg-slate-950 border border-slate-700 text-white text-xs px-2 py-1 rounded-lg"
                >
                  <option value="in_transit">In Transit (Dallas Hub)</option>
                  <option value="out_for_delivery">Out for Delivery (Austin, TX)</option>
                  <option value="delivered">Delivered (Adult Signature Verified)</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-200">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Clock className="w-4 h-4 text-amber-400" /> Active 72-Hour Collector Inspection Clock
                </div>
                <p className="text-xs text-slate-300">
                  Carrier webhook registered delivery on Sep 1 at 1:45 PM. The collector has 72 hours to inspect the slab certification number, UV luminescence check, and case integrity before automated disbursement.
                </p>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                <span className="text-slate-400">Time Remaining to Auto-Release:</span>
                <span className="text-lg font-black font-mono text-emerald-400">{inspectionHoursLeft} Hours 14 Mins</span>
              </div>

              {/* Dispute toggle simulation */}
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Simulate Condition Discrepancy</div>
                  <div className="text-[11px] text-slate-400">What if the buyer claims a scratched slab or fake cert?</div>
                </div>
                <button
                  onClick={() => setDisputeTriggered(!disputeTriggered)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    disputeTriggered
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {disputeTriggered ? 'Dispute Active (Vault Mediation)' : 'Trigger Dispute Test'}
                </button>
              </div>

              {disputeTriggered && (
                <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-rose-200 text-xs">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <AlertTriangle className="w-4 h-4 text-rose-400" /> Payout Frozen: Unboxing Video Arbitration
                  </div>
                  Buyer must upload unbroken packaging video recorded prior to breaking the tamper seal. Escrow team reviews macro scans vs pre-shipment photos within 24 hours.
                </div>
              )}
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-800/40 text-emerald-200">
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Escrow Successfully Released
                </div>
                <p className="text-slate-300">
                  Inspection window cleared without claims. Stripe Transfer initiated to <code>PikachuVault US</code> connected account.
                </p>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 font-mono text-[11px] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Escrow Collected:</span>
                  <span className="text-white">$18,320.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Platform Commission (6.5%):</span>
                  <span className="text-amber-400">-$1,183.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stripe Processing (2.9% + $0.30):</span>
                  <span className="text-slate-400">-$531.58</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800 font-bold">
                  <span className="text-emerald-400">Seller Net Payout:</span>
                  <span className="text-emerald-400 text-sm">$16,605.42</span>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200"
            >
              Previous Stage
            </button>

            <div className="text-xs text-slate-400">
              Stage {currentStep} of 5
            </div>

            <button
              onClick={handleNextStep}
              disabled={currentStep === 5}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-indigo-900/30"
            >
              <span>Advance Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Security & US Rules Reference Card */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>US Trading Card Security Safeguards</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="font-semibold text-amber-400 mb-1">1. Mandatory Signature Confirmation ($250+)</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Under US payment rules (PayPal, Visa, Mastercard, AMEX), seller protection against &quot;Item Not Received&quot; claims is completely void on orders over $250 without a physical signature. Our API automatically requires USPS Signature Confirmation for these tiers.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="font-semibold text-amber-400 mb-1">2. Tamper-Evident Holographic Void Seal</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Raw cards and graded slabs must be enclosed in tamper-evident sleeves. If a buyer opens the seal and claims the card inside was damaged or swapped, the warranty claim is rejected unless recorded on unbroken unboxing video.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="font-semibold text-amber-400 mb-1">3. IRS 1099-K & Marketplace Facilitator Tax</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Your marketplace must collect sales tax automatically for 45+ states via TaxJar or Stripe Tax. Sellers crossing US 1099-K reporting thresholds must submit a W-9 before high-value escrow payouts are unlocked.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
