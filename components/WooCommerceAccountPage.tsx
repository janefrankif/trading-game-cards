'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  User, 
  Package, 
  Layers, 
  MapPin, 
  CreditCard, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Plus, 
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PlacedOrder, UserVaultCard, INITIAL_USER_VAULT } from '@/lib/woocommerce-store';

interface WooCommerceAccountPageProps {
  orders: PlacedOrder[];
  onGoToShop: () => void;
  onInitiateVaultListing?: (card: UserVaultCard) => void;
}

export function WooCommerceAccountPage({
  orders,
  onGoToShop,
  onInitiateVaultListing
}: WooCommerceAccountPageProps) {
  const [activeAccountTab, setActiveAccountTab] = useState<'dashboard' | 'orders' | 'vault' | 'addresses' | 'payment' | 'details'>('dashboard');
  const [vaultCards, setVaultCards] = useState<UserVaultCard[]>(INITIAL_USER_VAULT);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [newCardGame, setNewCardGame] = useState('Pokemon');
  const [newCardGrade, setNewCardGrade] = useState('PSA 9 Mint');
  const [newCardValue, setNewCardValue] = useState('1500');

  const handleAddCardToVault = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardName) return;
    const card: UserVaultCard = {
      id: `user-card-${Date.now()}`,
      name: newCardName,
      game: newCardGame,
      set: 'Collector Submission',
      gradeOrCondition: newCardGrade,
      estValue: parseFloat(newCardValue) || 1000,
      image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=600&q=80',
      status: 'In Personal Vault',
    };
    setVaultCards([card, ...vaultCards]);
    setShowAddCardModal(false);
    setNewCardName('');
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-1.5 border-b border-slate-800 pb-3">
        <button onClick={onGoToShop} className="hover:text-indigo-400">Home</button>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-slate-200 font-medium">My Account</span>
        <ChevronRight className="w-3 h-3 text-slate-600" />
        <span className="text-indigo-400 capitalize">{activeAccountTab}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: WooCommerce My Account Navigation Menu */}
        <aside className="lg:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-1 shadow-lg">
          <div className="p-3 mb-2 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-black text-white text-sm shadow-md">
              AV
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Alex Vance</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Collector</span>
              </div>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: User },
              { id: 'orders', label: 'Orders', icon: Package, badge: orders.length },
              { id: 'vault', label: 'My Vault / Binder', icon: Layers, badge: vaultCards.length },
              { id: 'addresses', label: 'Addresses', icon: MapPin },
              { id: 'payment', label: 'Payment Methods', icon: CreditCard },
              { id: 'details', label: 'Account Details', icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveAccountTab(tab.id as any)}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl flex items-center justify-between transition-colors ${
                    activeAccountTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      activeAccountTab === tab.id ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              onClick={() => alert('WooCommerce Sign Out: Session cleared.')}
              className="w-full text-left py-2.5 px-3.5 rounded-xl flex items-center gap-2.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </nav>
        </aside>

        {/* RIGHT COLUMN: Account Content Area */}
        <div className="lg:col-span-9 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl min-h-[480px]">
          
          {/* TAB 1: DASHBOARD */}
          {activeAccountTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl font-black text-white">Hello Alex (Collector #8492)</h1>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  From your account dashboard you can view your <button onClick={() => setActiveAccountTab('orders')} className="text-indigo-400 font-semibold hover:underline">recent orders</button>, manage your <button onClick={() => setActiveAccountTab('addresses')} className="text-indigo-400 font-semibold hover:underline">shipping and billing addresses</button>, and manage physical slabs in your <button onClick={() => setActiveAccountTab('vault')} className="text-indigo-400 font-semibold hover:underline">vault digital binder</button>.
                </p>
              </div>

              {/* Account Quick Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div 
                  onClick={() => setActiveAccountTab('orders')}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer transition-all hover:scale-101"
                >
                  <div className="flex items-center justify-between text-indigo-400">
                    <Package className="w-5 h-5" />
                    <span className="font-mono text-base font-bold text-white">{orders.length}</span>
                  </div>
                  <div className="font-bold text-white text-xs mt-2">Active Orders</div>
                  <div className="text-[11px] text-slate-500">Track shipments & escrow timers</div>
                </div>

                <div 
                  onClick={() => setActiveAccountTab('vault')}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer transition-all hover:scale-101"
                >
                  <div className="flex items-center justify-between text-amber-400">
                    <Layers className="w-5 h-5" />
                    <span className="font-mono text-base font-bold text-white">{vaultCards.length}</span>
                  </div>
                  <div className="font-bold text-white text-xs mt-2">Cards in Vault Binder</div>
                  <div className="text-[11px] text-slate-500">Est. Portfolio: $5,330.00</div>
                </div>

                <div 
                  onClick={() => setActiveAccountTab('payment')}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer transition-all hover:scale-101"
                >
                  <div className="flex items-center justify-between text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold">Active</span>
                  </div>
                  <div className="font-bold text-white text-xs mt-2">Escrow Status</div>
                  <div className="text-[11px] text-slate-500">Stripe Connect Verified</div>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Recent Orders
                  </h3>
                  <button 
                    onClick={() => setActiveAccountTab('orders')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    View All Orders →
                  </button>
                </div>

                {orders.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-2">No orders have been made yet.</p>
                ) : (
                  <div className="space-y-2">
                    {orders.slice(0, 2).map((ord) => (
                      <div key={ord.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white font-mono">{ord.orderNumber}</div>
                          <div className="text-[11px] text-slate-400">{ord.date} • {ord.items.length} item(s)</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-emerald-400">${ord.total.toFixed(2)}</div>
                          <div className="text-[10px] text-indigo-300">{ord.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeAccountTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-black text-white">Order History</h2>
                  <p className="text-xs text-slate-400">Track shipments and manage 72-hour escrow inspection windows.</p>
                </div>
                <button
                  onClick={onGoToShop}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Browse Shop
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-3">
                  <Package className="w-10 h-10 mx-auto text-slate-600" />
                  <p className="text-sm">No orders found.</p>
                  <button
                    onClick={onGoToShop}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold"
                  >
                    Go to Store Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5 text-xs">
                        <div>
                          <span className="font-mono font-bold text-white text-sm">{order.orderNumber}</span>
                          <span className="text-slate-500 ml-2">Placed on {order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-900/80 text-indigo-300 border border-indigo-700/50">
                            {order.status}
                          </span>
                          <span className="font-mono font-bold text-white">${order.total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-slate-800/50">
                        {order.items.map((item) => (
                          <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2.5">
                              <div className="relative w-8 h-11 rounded border border-slate-700 overflow-hidden shrink-0">
                                <Image src={item.card.image} alt={item.card.name} fill className="object-cover" referrerPolicy="no-referrer" />
                              </div>
                              <div>
                                <span className="font-bold text-slate-200">{item.card.name}</span>
                                <div className="text-[10px] text-slate-400">{item.selectedCondition} • Qty: {item.quantity}</div>
                              </div>
                            </div>
                            <span className="font-mono text-white">${(item.unitPrice * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      {/* Carrier & Escrow Banner */}
                      <div className="bg-slate-900/80 p-2.5 rounded-lg text-[11px] text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-slate-800">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>USPS Signature: <strong className="text-slate-300 font-mono">{order.trackingNumber}</strong></span>
                        </div>
                        <button 
                          onClick={() => alert(`Carrier tracking status for ${order.trackingNumber}: Package processed at USPS Regional Distribution Facility.`)}
                          className="text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                          Check Real-Time Tracking →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MY VAULT & DIGITAL BINDER */}
          {activeAccountTab === 'vault' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-black text-white">My Vault / Digital Binder</h2>
                  <p className="text-xs text-slate-400">Cards deposited in your custody vault eligible for instant store listing or bilateral trade offers.</p>
                </div>
                <button
                  onClick={() => setShowAddCardModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Card to Binder</span>
                </button>
              </div>

              {/* Vault Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {vaultCards.map((vc) => (
                  <div key={vc.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="relative w-full h-44 rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
                        <Image src={vc.image} alt={vc.name} fill className="object-cover" referrerPolicy="no-referrer" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/90 text-amber-400 text-[10px] font-bold border border-slate-700">
                          {vc.gradeOrCondition}
                        </span>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">{vc.game} • {vc.set}</div>
                        <div className="font-bold text-white text-xs truncate">{vc.name}</div>
                        <div className="font-mono font-bold text-emerald-400 text-sm mt-1">
                          Est. Value: ${vc.estValue.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        {vc.status}
                      </span>
                      <button
                        onClick={() => alert(`Initiating direct WooCommerce listing for ${vc.name}`)}
                        className="text-indigo-400 hover:text-indigo-300 font-semibold text-[11px]"
                      >
                        List on Shop →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Card Modal */}
              {showAddCardModal && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 max-w-md w-full space-y-4 shadow-2xl">
                    <h3 className="font-black text-white text-base">Add Collectible to Vault Binder</h3>
                    <form onSubmit={handleAddCardToVault} className="space-y-3 text-xs">
                      <div>
                        <label className="text-slate-300 block mb-1">Card Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Gengar VMAX Alternate Art"
                          value={newCardName}
                          onChange={(e) => setNewCardName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-slate-300 block mb-1">Franchise</label>
                          <select
                            value={newCardGame}
                            onChange={(e) => setNewCardGame(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                          >
                            <option>Pokemon</option>
                            <option>Magic: The Gathering</option>
                            <option>Yu-Gi-Oh!</option>
                            <option>Disney Lorcana</option>
                            <option>One Piece</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-slate-300 block mb-1">Grade / Condition</label>
                          <input
                            type="text"
                            value={newCardGrade}
                            onChange={(e) => setNewCardGrade(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-slate-300 block mb-1">Estimated Value ($ USD)</label>
                        <input
                          type="number"
                          value={newCardValue}
                          onChange={(e) => setNewCardValue(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddCardModal(false)}
                          className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg font-bold"
                        >
                          Save to Binder
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ADDRESSES */}
          {activeAccountTab === 'addresses' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-black text-white">Addresses</h2>
                <p className="text-xs text-slate-400">The following addresses will be used on the checkout page by default.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Billing Address Card */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="font-bold text-white">Billing Address</h3>
                    <button className="text-indigo-400 hover:underline text-[11px]">Edit</button>
                  </div>
                  <div className="text-slate-300 leading-relaxed">
                    <p className="font-bold text-white">Alex Vance</p>
                    <p>742 Evergreen Terrace</p>
                    <p>Los Angeles, CA 90001</p>
                    <p>United States (US)</p>
                    <p className="text-slate-500 mt-2">Phone: (310) 555-0199</p>
                  </div>
                </div>

                {/* Shipping Address Card */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="font-bold text-white">Shipping Address (Insured Courier)</h3>
                    <button className="text-indigo-400 hover:underline text-[11px]">Edit</button>
                  </div>
                  <div className="text-slate-300 leading-relaxed">
                    <p className="font-bold text-white">Alex Vance</p>
                    <p>742 Evergreen Terrace</p>
                    <p>Los Angeles, CA 90001</p>
                    <p>United States (US)</p>
                    <p className="text-emerald-400 text-[11px] mt-2">✓ Verified for USPS Adult Signature Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PAYMENT METHODS */}
          {activeAccountTab === 'payment' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-black text-white">Payment Methods</h2>
                <p className="text-xs text-slate-400">Manage credit cards and connected Stripe Escrow payout accounts.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-indigo-400" />
                  <div>
                    <div className="font-bold text-white font-mono">Visa ending in 4242</div>
                    <div className="text-[11px] text-slate-400">Expires 12/28 • Default Billing Card</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 text-[10px] font-bold border border-indigo-800/60">
                  Primary
                </span>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-900/40 p-4 rounded-xl text-xs text-emerald-200 flex items-center justify-between">
                <div>
                  <div className="font-bold">Stripe Connect Custom Escrow Account</div>
                  <div className="text-[11px] text-emerald-300/80">Automated payout disbursement enabled for trade delta cash and card sales.</div>
                </div>
                <span className="text-emerald-400 font-bold text-xs">Connected</span>
              </div>
            </div>
          )}

          {/* TAB 6: DETAILS */}
          {activeAccountTab === 'details' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-black text-white">Account Details</h2>
                <p className="text-xs text-slate-400">Update your personal collector profile and security passwords.</p>
              </div>

              <div className="space-y-3 text-xs max-w-md">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1">First name</label>
                    <input type="text" defaultValue="Alex" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Last name</label>
                    <input type="text" defaultValue="Vance" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Display name</label>
                  <input type="text" defaultValue="Collector Alex #8492" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                  <span className="text-[10px] text-slate-500">This will be how your name will be displayed in the account section and in reviews</span>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Email address</label>
                  <input type="email" defaultValue="alex.vance@collector.io" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
                </div>

                <button
                  type="button"
                  onClick={() => alert('Account details saved.')}
                  className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs"
                >
                  Save changes
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
