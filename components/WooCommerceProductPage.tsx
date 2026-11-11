'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CardItem, SAMPLE_CARDS } from '@/lib/marketplace-data';
import { 
  ShoppingBag, 
  ArrowRightLeft, 
  Star, 
  ShieldCheck, 
  Check, 
  Truck, 
  RotateCcw, 
  Lock, 
  ZoomIn, 
  Eye, 
  FileText, 
  BadgeCheck, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface WooCommerceProductPageProps {
  card: CardItem;
  onAddToCart: (card: CardItem, condition?: string, quantity?: number) => void;
  onProposeTrade: (card: CardItem) => void;
  onSelectRelated: (card: CardItem) => void;
  onBackToShop: () => void;
  onOpenAiConsultant: (card: CardItem) => void;
}

export function WooCommerceProductPage({
  card,
  onAddToCart,
  onProposeTrade,
  onSelectRelated,
  onBackToShop,
  onOpenAiConsultant
}: WooCommerceProductPageProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'shipping' | 'reviews'>('description');
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [activeViewAngle, setActiveViewAngle] = useState<'front' | 'back' | 'macro'>('front');
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const handleAddToCart = () => {
    onAddToCart(card, card.isGraded ? `${card.gradingCompany} ${card.gradeScore}` : (card.rawCondition || 'Near Mint'), quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 3000);
  };

  // Related products from same game or general
  const relatedProducts = SAMPLE_CARDS.filter(c => c.id !== card.id && c.game === card.game).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* WooCommerce Breadcrumbs */}
      <nav className="text-xs text-slate-400 flex items-center flex-wrap gap-1.5 border-b border-slate-800 pb-3">
        <button onClick={onBackToShop} className="hover:text-indigo-400">Home</button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <button onClick={onBackToShop} className="hover:text-indigo-400">Shop</button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <button onClick={onBackToShop} className="hover:text-indigo-400">{card.game}</button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-slate-200 font-medium truncate">{card.name}</span>
      </nav>

      {/* WooCommerce Added to Cart Alert Notice Banner */}
      {justAdded && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 p-3.5 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2 text-xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              “<strong>{card.name}</strong>” has been added to your cart.
            </span>
          </div>
          <button
            onClick={() => onBackToShop()}
            className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg font-bold transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      )}

      {/* 2-Column Single Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: Gallery & Micro Inspection */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Main Slab Visualizer */}
          <div className="relative bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-2xl flex flex-col items-center justify-center min-h-[460px] overflow-hidden group">
            
            {/* Certification Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-slate-950/90 border border-slate-700 px-2.5 py-1 rounded-lg text-xs">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white">
                {card.isGraded ? `${card.gradingCompany} Authenticated` : 'Raw Collector Spec'}
              </span>
            </div>

            {/* Micro Loupe Zoom Trigger */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-slate-950/80 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Toggle Micro-Zoom Loupe"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* High-Res Card Image */}
            <div className={`relative transition-transform duration-300 ${isZoomed ? 'scale-130' : 'scale-100'} w-64 h-92 rounded-xl overflow-hidden shadow-2xl border border-slate-700`}>
              <Image
                src={card.image}
                alt={card.name}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                sizes="(max-width: 768px) 100vw, 320px"
                priority
              />

              {/* Holographic Foil Sheen Effect */}
              {card.finish !== 'Normal' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-amber-400/10 pointer-events-none opacity-60 mix-blend-overlay" />
              )}
            </div>

            <div className="mt-4 text-[11px] text-slate-500 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>High-resolution 1200 DPI archival scan • Click zoom icon for edge review</span>
            </div>
          </div>

          {/* Thumbnail Angles Switcher */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'front', label: 'Front Slab / Foil' },
              { id: 'back', label: 'Back Surface & Edges' },
              { id: 'macro', label: 'Centering Loupe' },
            ].map((angle) => (
              <button
                key={angle.id}
                onClick={() => setActiveViewAngle(angle.id as any)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                  activeViewAngle === angle.id
                    ? 'bg-indigo-600/30 border-indigo-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {angle.label}
              </button>
            ))}
          </div>

          {/* AI Valuation Assistant Callout */}
          <div className="bg-gradient-to-r from-amber-500/15 via-indigo-500/10 to-purple-500/15 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Collector Valuation</span>
              </div>
              <p className="text-[11px] text-slate-400">Ask Gemini 2.5 Flash to evaluate grading comps & ROI potential</p>
            </div>

            <button
              onClick={() => onOpenAiConsultant(card)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0 shadow-sm"
            >
              Analyze Slabs
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: WooCommerce Product Summary & Ordering */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header & Title */}
          <div>
            <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              {card.game} • {card.set} ({card.setYear})
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {card.name}
            </h1>
            <div className="text-xs text-slate-400 mt-1 font-mono">
              Card Number: #{card.cardNumber} • Rarity: {card.rarity} • Finish: {card.finish}
            </div>

            {/* Ratings & Sold History */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-400">
                <strong className="text-white">{card.seller.rating} / 5.0</strong> ({card.seller.salesCount} verified sales)
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>72-Hour Escrow Protected</span>
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Buy It Now Price</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                    ${card.listingPrice.toLocaleString()}
                  </span>
                  {card.marketPrice > card.listingPrice && (
                    <span className="text-sm font-mono text-slate-500 line-through">
                      ${card.marketPrice.toLocaleString()}
                    </span>
                  )}
                  {card.marketPrice > card.listingPrice && (
                    <span className="px-2 py-0.5 rounded bg-emerald-600/30 text-emerald-400 text-xs font-bold border border-emerald-500/40">
                      Save ${(card.marketPrice - card.listingPrice).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className={`text-right font-mono font-bold text-sm ${card.sevenDayChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                <div>{card.sevenDayChange >= 0 ? `+${card.sevenDayChange}%` : `${card.sevenDayChange}%`}</div>
                <div className="text-[10px] text-slate-500 font-normal">7-Day Market Trend</div>
              </div>
            </div>

            {/* Stock Availability */}
            <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span><strong>1 in stock</strong> — Authenticated physical slab in climate-controlled vault</span>
            </div>
          </div>

          {/* Condition / Slab Breakdown */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
              Grading & Census Verification
            </label>
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Grade</span>
                <span className="font-bold text-white font-mono">{card.isGraded ? `${card.gradingCompany} ${card.gradeScore}` : card.rawCondition}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Pop at Grade</span>
                <span className="font-bold text-indigo-400 font-mono">{card.popReport ? card.popReport.popAtGrade.toLocaleString() : 'N/A'}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Pop Higher</span>
                <span className="font-bold text-amber-400 font-mono">{card.popReport ? card.popReport.popHigher.toLocaleString() : '0 (None)'}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Subgrades</span>
                <span className="font-bold text-slate-300 font-mono">{card.subgrades ? 'Quad 9.5+' : 'Certified'}</span>
              </div>
            </div>
          </div>

          {/* WooCommerce Quantity & Add to Cart Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-slate-700 rounded-xl bg-slate-900 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors font-bold text-sm"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono font-bold text-white text-sm">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Bilateral Trade Option */}
            {card.allowTrades && (
              <button
                type="button"
                onClick={() => onProposeTrade(card)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Propose Bilateral Trade (Trade Card + Cash Delta)</span>
              </button>
            )}
          </div>

          {/* Safe Checkout Badges */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs text-slate-400">
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-slate-200">USPS Signature</span>
              <span className="text-[10px] text-slate-500">Tracked & Insured</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-slate-200">72h Inspection</span>
              <span className="text-[10px] text-slate-500">Full Escrow Hold</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col items-center gap-1">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-200">Stripe Connect</span>
              <span className="text-[10px] text-slate-500">Encrypted Payouts</span>
            </div>
          </div>

          {/* Product Meta: SKU, Category, Tags */}
          <div className="text-xs text-slate-400 space-y-1.5 pt-4 border-t border-slate-800">
            <div><strong>SKU:</strong> <span className="font-mono text-slate-300">TCG-{card.id.toUpperCase()}</span></div>
            <div><strong>Category:</strong> <span className="text-indigo-400">{card.game}</span> / <span className="text-slate-300">{card.set}</span></div>
            <div><strong>Tags:</strong> <span className="text-slate-300">1st Edition, Holofoil, {card.rarity}, {card.gradingCompany || 'Raw'}, Graded Slab</span></div>
          </div>

        </div>

      </div>

      {/* WooCommerce Tabs: Description, Additional Info, Shipping Policy, Reviews */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('description')}
            className={`py-3.5 px-6 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'description'
                ? 'border-indigo-500 text-white bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('additional')}
            className={`py-3.5 px-6 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'additional'
                ? 'border-indigo-500 text-white bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Additional Information (Specs & Pop)
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`py-3.5 px-6 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'shipping'
                ? 'border-indigo-500 text-white bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Escrow & US Shipping Policy
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 px-6 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-indigo-500 text-white bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Collector Reviews ({card.seller.salesCount})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 text-xs text-slate-300 leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-4 max-w-3xl">
              <p className="text-sm text-slate-200 font-medium leading-normal">
                {card.description}
              </p>
              <p className="text-slate-400">
                This item is cataloged directly from verified collector inventories. Each graded slab is scanned at 1200 DPI to preserve optical clarity on centering, foil clarity, and edge whitening. All cards are cross-referenced with recent sales across TCGPlayer, eBay Sold listings, and private auction houses.
              </p>
            </div>
          )}

          {activeTab === 'additional' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <tbody>
                  <tr className="border-b border-slate-800">
                    <th className="py-2.5 pr-4 font-semibold text-slate-400 w-48">Game Franchise</th>
                    <td className="py-2.5 text-white">{card.game}</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <th className="py-2.5 pr-4 font-semibold text-slate-400">Set Name & Year</th>
                    <td className="py-2.5 text-white">{card.set} ({card.setYear})</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <th className="py-2.5 pr-4 font-semibold text-slate-400">Card Number</th>
                    <td className="py-2.5 text-white font-mono">#{card.cardNumber}</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <th className="py-2.5 pr-4 font-semibold text-slate-400">Rarity & Finish</th>
                    <td className="py-2.5 text-white">{card.rarity} • {card.finish}</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <th className="py-2.5 pr-4 font-semibold text-slate-400">Preservation / Grade</th>
                    <td className="py-2.5 text-white font-semibold text-amber-300">
                      {card.isGraded ? `${card.gradingCompany} ${card.gradeScore}` : card.rawCondition}
                    </td>
                  </tr>
                  {card.subgrades && (
                    <tr className="border-b border-slate-800">
                      <th className="py-2.5 pr-4 font-semibold text-slate-400">Subgrade Breakdown</th>
                      <td className="py-2.5 text-white font-mono">
                        Centering: {card.subgrades.centering} | Corners: {card.subgrades.corners} | Edges: {card.subgrades.edges} | Surface: {card.subgrades.surface}
                      </td>
                    </tr>
                  )}
                  {card.popReport && (
                    <tr>
                      <th className="py-2.5 pr-4 font-semibold text-slate-400">Census Report</th>
                      <td className="py-2.5 text-white font-mono">
                        Population at this grade: {card.popReport.popAtGrade} | Higher: {card.popReport.popHigher}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3 max-w-3xl text-slate-300">
              <h4 className="font-bold text-white text-sm">US Domestic Shipping & Anti-Fraud Escrow Protocol</h4>
              <p>
                To eliminate common e-commerce fraud vectors (such as empty box claims, counterfeit substitutions, or uninspected damage), this store enforces our proprietary bilateral escrow workflow:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong>USPS Signature Confirmation:</strong> Mandatory on all orders over $250. Payout protection requires proof of delivery.</li>
                <li><strong>72-Hour Inspection Clock:</strong> Starts only after the carrier webhook records &ldquo;Delivered&rdquo;. Funds remain securely locked in Stripe Escrow until the buyer confirms condition.</li>
                <li><strong>Tamper-Evident Slabs:</strong> Graded slabs are sealed in holographic void bags with unique serial barcodes before dispatch.</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4 max-w-2xl">
              <div className="space-y-3">
                {[
                  {
                    author: 'Brandon T. (Verified Collector)',
                    rating: 5,
                    date: 'Yesterday',
                    comment: 'Slab arrived in pristine condition, double boxed with bubble mailer inside. Subgrades match PSA census exactly.'
                  },
                  {
                    author: 'Marcus L. (Pro Hobbyist)',
                    rating: 5,
                    date: '3 days ago',
                    comment: 'Seamless escrow checkout. The 72-hour inspection window gave me complete peace of mind on a 4-figure card.'
                  }
                ].map((rev, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{rev.author}</span>
                      <span className="text-[10px] text-slate-500">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-300">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <h3 className="text-lg font-black text-white">Related Collectibles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedProducts.map((relCard) => (
              <div
                key={relCard.id}
                onClick={() => onSelectRelated(relCard)}
                className="bg-slate-900 rounded-xl p-3.5 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all hover:scale-101 flex gap-3 items-center group"
              >
                <div className="relative w-16 h-22 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                  <Image
                    src={relCard.image}
                    alt={relCard.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] text-slate-400 truncate">{relCard.set}</div>
                  <div className="font-bold text-white text-xs truncate group-hover:text-indigo-400 transition-colors">
                    {relCard.name}
                  </div>
                  <div className="font-mono font-bold text-white text-xs mt-1">
                    ${relCard.listingPrice.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
