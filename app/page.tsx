'use client';

import React, { useState, useMemo } from 'react';
import { TcgHeader } from '@/components/TcgHeader';
import { TcgHero } from '@/components/TcgHero';
import { TcgFeaturedProducts } from '@/components/TcgFeaturedProducts';
import { TcgShop } from '@/components/TcgShop';
import { TcgAbout } from '@/components/TcgAbout';
import { TcgBlog } from '@/components/TcgBlog';
import { TcgFaqs } from '@/components/TcgFaqs';
import { TcgContact } from '@/components/TcgContact';
import { TcgFooter } from '@/components/TcgFooter';
import { WooCommerceMiniCart } from '@/components/WooCommerceMiniCart';
import { WooCommerceCheckoutPage } from '@/components/WooCommerceCheckoutPage';
import { CardDetailModal } from '@/components/CardDetailModal';
import { TradeProposalModal } from '@/components/TradeProposalModal';
import { AiConsultantModal } from '@/components/AiConsultantModal';
import { TcgTrustpilotSlider } from '@/components/TcgTrustpilotSlider';
import { CardItem, SAMPLE_CARDS } from '@/lib/marketplace-data';
import { CartItem, PlacedOrder, US_STATES } from '@/lib/woocommerce-store';
import { BlogPost, BLOG_POSTS, FAQ_ITEMS } from '@/lib/tcg-content';
import { 
  CheckCircle2, 
  X, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles, 
  BookOpen, 
  Tag,
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/lib/theme-context';

const INITIAL_CART: CartItem[] = [
  {
    id: 'cart-init-1',
    card: SAMPLE_CARDS[0], // Charizard Shadowless
    quantity: 1,
    selectedCondition: 'PSA 9 Mint',
    unitPrice: SAMPLE_CARDS[0].listingPrice,
  }
];

export default function SinglePageTcgShop() {
  const { colors } = useTheme();
  // Navigation State: Which separated page is currently active
  const [activeSection, setActiveSection] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals & Drawers
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickInspectCard, setQuickInspectCard] = useState<CardItem | null>(null);
  const [tradeTargetCard, setTradeTargetCard] = useState<CardItem | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiTargetCard, setAiTargetCard] = useState<CardItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [homeOpenFaqId, setHomeOpenFaqId] = useState<string | null>('faq-1');

  // Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [couponCode, setCouponCode] = useState('');
  const [selectedState, setSelectedState] = useState('CA');
  const [orders, setOrders] = useState<PlacedOrder[]>([]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Separate page navigation handler
  const handleNavigate = (pageId: string) => {
    setActiveSection(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Calculations
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (couponCode === 'VAULT10' || couponCode === 'POKEMON10') {
      return subtotal * 0.1;
    }
    if (couponCode === 'VAULT50') {
      return Math.min(50, subtotal);
    }
    return 0;
  }, [couponCode, subtotal]);

  const effectiveShipping = useMemo(() => {
    if (subtotal >= 150) return 0;
    return 15;
  }, [subtotal]);

  const stateTaxRate = useMemo(() => {
    const st = US_STATES.find(s => s.code === selectedState);
    return st ? st.taxRate : 0.0725;
  }, [selectedState]);

  const taxAmount = useMemo(() => {
    const taxable = Math.max(0, subtotal - discountAmount);
    return taxable * stateTaxRate;
  }, [subtotal, discountAmount, stateTaxRate]);

  const grandTotal = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + effectiveShipping + taxAmount);
  }, [subtotal, discountAmount, effectiveShipping, taxAmount]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Cart Actions
  const handleAddToCart = (card: CardItem, condition?: string, quantity: number = 1) => {
    const conditionLabel = condition || (card.isGraded ? `${card.gradingCompany} ${card.gradeScore}` : (card.rawCondition || 'Near Mint'));
    
    const existingIndex = cartItems.findIndex(
      (item) => item.card.id === card.id && item.selectedCondition === conditionLabel
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: `item-${card.id}-${conditionLabel.replace(/\s+/g, '_')}`,
          card,
          quantity,
          selectedCondition: conditionLabel,
          unitPrice: card.listingPrice,
        }
      ]);
    }

    showNotification(`Added ${card.name} (${conditionLabel}) to cart.`);
    setIsMiniCartOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(
      cartItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleConfirmTradeOffer = (summary: {
    targetCard: CardItem;
    offeredCards: string[];
    cashDelta: number;
    escrowFee: number;
  }) => {
    setTradeTargetCard(null);
    showNotification(
      `Bilateral Trade Offer submitted for ${summary.targetCard.name} with +$${summary.cashDelta} cash delta. Routed to Escrow Vault.`
    );
  };

  const handleOrderPlaced = (order: PlacedOrder) => {
    setOrders([order, ...orders]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    showNotification(`Order #${order.orderNumber} successfully received into Escrow Vault!`);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Header Navigation with all 7 Menu Pages clearly displayed */}
      <TcgHeader
        activeSection={activeSection}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        onOpenCart={() => setIsMiniCartOpen(true)}
        onOpenTradeModal={() => setTradeTargetCard(SAMPLE_CARDS[0])}
        onOpenAiModal={() => {
          setAiTargetCard(SAMPLE_CARDS[0]);
          setIsAiModalOpen(true);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Floating Action Alert Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-white border border-zinc-200 text-zinc-900 p-4 rounded-2xl shadow-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="font-bold text-zinc-900">Marketplace Notice</div>
            <div className="text-zinc-600 mt-0.5">{notification}</div>
          </div>
        </div>
      )}

      {/* SEPARATED PAGES: Render ONLY the Selected Menu Page */}
      <main className="flex-1 w-full pb-16">
        
        {/* ========================================================= */}
        {/* PAGE 1: HOME PAGE                                         */}
        {/* ========================================================= */}
        {activeSection === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Hero Section */}
            <TcgHero
              onExploreShop={() => handleNavigate('shop')}
              onOpenTradeModal={() => setTradeTargetCard(SAMPLE_CARDS[0])}
              onOpenAiAppraiser={() => {
                setAiTargetCard(SAMPLE_CARDS[0]);
                setIsAiModalOpen(true);
              }}
            />

            {/* Section: Exactly 4 Featured Products on Homepage */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-zinc-200">
                <div>
                  <div className={`flex items-center gap-1.5 ${colors.textAccent} font-bold text-xs uppercase tracking-wider`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Vault Highlights</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-900 mt-1">
                    Featured Products
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
                    Top 4 investment-grade slabs authenticated by PSA, BGS, and CGC. Ready for immediate checkout or bilateral trade.
                  </p>
                </div>
                <button
                  onClick={() => handleNavigate('shop')}
                  className={`flex items-center gap-1.5 text-xs font-bold ${colors.textAccent} hover:underline transition-colors shrink-0`}
                >
                  <span>Explore All Products in Shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 Featured Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {SAMPLE_CARDS.slice(0, 4).map((card) => (
                  <div 
                    key={card.id}
                    className="group bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div>
                      {/* Slab Card Image */}
                      <div 
                        onClick={() => setQuickInspectCard(card)}
                        className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200 cursor-pointer group-hover:border-zinc-300 transition-colors"
                      >
                        <Image
                          src={card.image}
                          alt={card.name}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        {/* Grade Badge */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/95 border border-zinc-200 text-[10px] font-mono font-bold text-zinc-900 shadow-xs backdrop-blur-xs">
                          {card.gradeScore || card.rawCondition}
                        </div>
                        {card.sevenDayChange !== undefined && (
                          <div className={`absolute top-2 right-2 px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                            card.sevenDayChange >= 0
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}>
                            {card.sevenDayChange >= 0 ? `+${card.sevenDayChange}%` : `${card.sevenDayChange}%`}
                          </div>
                        )}
                      </div>

                      {/* Card Details */}
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className={`font-bold ${colors.textAccent} uppercase tracking-wider`}>{card.game}</span>
                          <span className="text-zinc-400 font-mono">#{card.cardNumber}</span>
                        </div>
                        <h3 
                          onClick={() => setQuickInspectCard(card)}
                          className="font-bold text-sm text-zinc-900 truncate hover:text-zinc-600 cursor-pointer transition-colors"
                          title={card.name}
                        >
                          {card.name}
                        </h3>
                        <div className="text-[11px] text-zinc-500 truncate">
                          {card.set} • {card.setYear}
                        </div>
                        <div className="pt-2 flex items-baseline justify-between">
                          <span className="text-lg font-black text-zinc-900 font-mono">
                            ${card.listingPrice.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-zinc-500">
                            Est. ~${card.marketPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-2 border-t border-zinc-100">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddToCart(card)}
                          className={`w-full py-2 rounded-xl ${colors.buttonBg} ${colors.buttonText} font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                      <button
                        onClick={() => setQuickInspectCard(card)}
                        className="w-full py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[11px] font-medium transition-colors text-center"
                      >
                        Inspect Slab Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: 10 Trustpilot Real-Time Reviews in Rev Slider Rotating Left to Right */}
            <TcgTrustpilotSlider />

            {/* Section: Exactly 4 FAQs in Interactive Accordion on Homepage */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.badgeBg} border ${colors.badgeBorder} ${colors.textAccent} text-xs font-bold uppercase tracking-wider`}>
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto">
                  Everything you need to know about buying, selling, and trading high-end slabs with dual-custody escrow.
                </p>
              </div>

              {/* 4 Accordion Items */}
              <div className="space-y-3">
                {FAQ_ITEMS.slice(0, 4).map((faq) => {
                  const isOpen = homeOpenFaqId === faq.id;
                  return (
                    <div 
                      key={faq.id} 
                      className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl overflow-hidden transition-all shadow-xs"
                    >
                      <button
                        onClick={() => setHomeOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-zinc-50/60 transition-colors cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="font-bold text-sm text-zinc-900 flex items-center gap-2">
                          <span className="text-zinc-400 font-mono text-xs">#{faq.id.replace('faq-', '')}</span>
                          <span>{faq.question}</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-zinc-900' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3.5 bg-zinc-50/50 animate-in fade-in">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* CTA to view the rest in the full FAQ page */}
              <div className="text-center pt-2">
                <button
                  onClick={() => handleNavigate('faqs')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-800 font-bold text-xs transition-colors shadow-xs"
                >
                  <span>View All 10 Questions on FAQ Page</span>
                  <ArrowRight className={`w-4 h-4 ${colors.textAccent}`} />
                </button>
              </div>
            </div>

            {/* Section: Exactly 4 Blog Posts on Homepage */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-zinc-200">
                <div>
                  <div className={`flex items-center gap-1.5 ${colors.textAccent} font-bold text-xs uppercase tracking-wider`}>
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Collector Knowledge</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-900 mt-1">
                    Collector Blog & Market Insights
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
                    Market breakdowns, population reports, and safe escrow trading strategies compiled by verified appraisers.
                  </p>
                </div>
                <button
                  onClick={() => handleNavigate('blog')}
                  className={`flex items-center gap-1.5 text-xs font-bold ${colors.textAccent} hover:underline transition-colors shrink-0`}
                >
                  <span>View All Articles in Blog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 Blog Posts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {BLOG_POSTS.slice(0, 4).map((post) => (
                  <article 
                    key={post.id}
                    className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 group"
                  >
                    <div>
                      {/* Cover Image */}
                      <div 
                        onClick={() => setSelectedArticle(post)}
                        className="relative w-full h-36 bg-zinc-100 overflow-hidden cursor-pointer"
                      >
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-md ${colors.badgeBg} border ${colors.badgeBorder} text-[10px] font-bold ${colors.textAccent} backdrop-blur-xs`}>
                          {post.category}
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 
                          onClick={() => setSelectedArticle(post)}
                          className="font-bold text-sm text-zinc-900 line-clamp-2 hover:text-zinc-600 cursor-pointer transition-colors"
                          title={post.title}
                        >
                          {post.title}
                        </h3>
                        <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    {/* Author & Read Link */}
                    <div className="p-4 pt-2 border-t border-zinc-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-zinc-200">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[11px] text-zinc-600 font-medium truncate max-w-[90px]">
                          {post.author.name}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedArticle(post)}
                        className={`text-xs font-bold ${colors.textAccent} hover:underline flex items-center gap-1 transition-colors`}
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 2: SHOP CATALOG PAGE                                 */}
        {/* ========================================================= */}
        {activeSection === 'shop' && (
          <div className="animate-in fade-in duration-300">
            <TcgShop
              cards={SAMPLE_CARDS}
              onSelectCard={(card) => setQuickInspectCard(card)}
              onAddToCart={(card) => handleAddToCart(card)}
              onProposeTrade={(card) => setTradeTargetCard(card)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 3: FEATURED GRAILS & HIGHLIGHTS PAGE                 */}
        {/* ========================================================= */}
        {activeSection === 'featured' && (
          <div className="animate-in fade-in duration-300">
            <TcgFeaturedProducts
              cards={SAMPLE_CARDS}
              onSelectCard={(card) => setQuickInspectCard(card)}
              onAddToCart={(card) => handleAddToCart(card)}
              onProposeTrade={(card) => setTradeTargetCard(card)}
              onViewAllInShop={() => handleNavigate('shop')}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 4: ABOUT & ESCROW PAGE                               */}
        {/* ========================================================= */}
        {activeSection === 'about' && (
          <div className="animate-in fade-in duration-300">
            <TcgAbout
              onExploreShop={() => handleNavigate('shop')}
              onOpenTradeModal={() => setTradeTargetCard(SAMPLE_CARDS[0])}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 5: COLLECTOR BLOG PAGE                               */}
        {/* ========================================================= */}
        {activeSection === 'blog' && (
          <div className="animate-in fade-in duration-300">
            <TcgBlog />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 6: FAQS & HELP PAGE (All 10 FAQs in Accordion)       */}
        {/* ========================================================= */}
        {activeSection === 'faqs' && (
          <div className="animate-in fade-in duration-300">
            <TcgFaqs
              onGoToContact={() => handleNavigate('contact')}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 7: CONTACT & OPERATIONS PAGE                         */}
        {/* ========================================================= */}
        {activeSection === 'contact' && (
          <div className="animate-in fade-in duration-300">
            <TcgContact
              onNotify={showNotification}
            />
          </div>
        )}

      </main>

      {/* Storefront Footer with Navigation to All Pages */}
      <TcgFooter
        onNavigate={handleNavigate}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleNavigate('shop');
        }}
      />

      {/* Slide-Out Mini Cart Drawer */}
      <WooCommerceMiniCart
        isOpen={isMiniCartOpen}
        onClose={() => setIsMiniCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateQuantity}
        onViewCart={() => {
          setIsMiniCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onCheckout={() => {
          setIsMiniCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        subtotal={subtotal}
      />

      {/* Full Checkout Modal Overlay */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="relative bg-white border border-zinc-200 rounded-3xl max-w-4xl w-full p-6 sm:p-8 my-8 shadow-2xl max-h-[90vh] overflow-y-auto text-zinc-900">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 transition-colors border border-zinc-200"
              aria-label="Close checkout"
            >
              <X className="w-4 h-4" />
            </button>

            <WooCommerceCheckoutPage
              cartItems={cartItems}
              subtotal={subtotal}
              discountAmount={discountAmount}
              shippingCost={effectiveShipping}
              taxAmount={taxAmount}
              grandTotal={grandTotal}
              selectedState={selectedState}
              onOrderPlaced={handleOrderPlaced}
              onContinueShopping={() => setIsCheckoutOpen(false)}
              onViewOrders={() => {
                setIsCheckoutOpen(false);
                showNotification('Orders can be inspected via receipt tracking number.');
              }}
            />
          </div>
        </div>
      )}

      {/* Card Detail Modal */}
      {quickInspectCard && (
        <CardDetailModal
          card={quickInspectCard}
          onClose={() => setQuickInspectCard(null)}
          onInitiateTrade={(card) => {
            setQuickInspectCard(null);
            setTradeTargetCard(card);
          }}
          onInitiateBuy={(card) => {
            setQuickInspectCard(null);
            handleAddToCart(card);
          }}
          onInspectSeo={() => {
            setQuickInspectCard(null);
            handleNavigate('shop');
          }}
        />
      )}

      {/* Trade Proposal Modal */}
      {tradeTargetCard && (
        <TradeProposalModal
          targetCard={tradeTargetCard}
          onClose={() => setTradeTargetCard(null)}
          onConfirmTradeOffer={handleConfirmTradeOffer}
        />
      )}

      {/* AI Card Valuation & Appraiser Modal */}
      <AiConsultantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        activeCard={aiTargetCard}
      />

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-zinc-900">
            
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 transition-colors border border-zinc-200"
              aria-label="Close article"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full ${colors.badgeBg} border ${colors.badgeBorder} ${colors.textAccent} text-xs font-bold`}>
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-zinc-500">{selectedArticle.date}</span>
                <span className="text-xs text-zinc-300">•</span>
                <span className="text-xs text-zinc-500">{selectedArticle.readTime}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 pt-1">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-200">
                  <Image
                    src={selectedArticle.author.avatar}
                    alt={selectedArticle.author.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">{selectedArticle.author.name}</div>
                  <div className="text-[11px] text-zinc-500">{selectedArticle.author.role}</div>
                </div>
              </div>
            </div>

            {/* Modal Image */}
            <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
              <Image
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-xs sm:text-sm text-zinc-700 leading-relaxed">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-zinc-200">
              <Tag className="w-3.5 h-3.5 text-zinc-400" />
              {selectedArticle.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[11px]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
