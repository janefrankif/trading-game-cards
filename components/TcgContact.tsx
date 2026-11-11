'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck,
  Building,
  AlertCircle
} from 'lucide-react';

interface TcgContactProps {
  onNotify: (msg: string) => void;
}

export function TcgContact({ onNotify }: TcgContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Bilateral Trade Offer',
    cardDetails: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onNotify('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onNotify('Your message has been dispatched to our Escrow & Appraisal Team!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'Bilateral Trade Offer',
        cardDetails: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 border-t border-slate-900 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-600/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Contact Vault Operations
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Have a question about a trade, need an appraisal consultation, or want to consign a high-grade collection? We&apos;re here to help.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-400" />
                <span>Escrow & Vault Headquarters</span>
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Physical Inspection Facility</strong>
                    <span>742 Evergreen Terrace, Suite 400</span>
                    <br />
                    <span>Los Angeles, CA 90001</span>
                    <div className="text-[11px] text-slate-500 mt-0.5">High-security armed insured custody</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Trader Support Hotline</strong>
                    <span>(310) 555-0199</span>
                    <div className="text-[11px] text-slate-500 mt-0.5">Toll-free across North America</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Direct Department Inboxes</strong>
                    <div>Trades: <span className="text-indigo-400">escrow@vaultcardstcg.com</span></div>
                    <div>General: <span className="text-indigo-400">support@vaultcardstcg.com</span></div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                  <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm">Operating Hours</strong>
                    <div>Monday â€“ Friday: 9:00 AM â€“ 7:00 PM PST</div>
                    <div>Saturday: 10:00 AM â€“ 4:00 PM PST</div>
                    <div className="text-emerald-400 font-semibold text-[11px] mt-0.5">
                      âœ“ Vault currently accepting shipments
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Guarantee Callout */}
            <div className="bg-indigo-950/40 border border-indigo-800/40 rounded-2xl p-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="font-bold text-white">Average Response Time: </span>
                <span>Under 15 minutes during active market trading hours.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for contacting our vault team. A certified appraisal coordinator will review your inquiry and follow up via email shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Send an Inquiry</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Your Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@collector.com"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Bilateral Trade Offer">Bilateral Trade Offer</option>
                      <option value="Order & Shipping Support">Order & Shipping Support</option>
                      <option value="Vault Consignment">Vault Consignment (Selling High End)</option>
                      <option value="Card Appraisal Request">Card Appraisal / Grading Advice</option>
                      <option value="General Support">General Platform Question</option>
                    </select>
                  </div>
                </div>

                {/* Card Details / Reference */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Card Involved / Target Slab (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.cardDetails}
                    onChange={(e) => setFormData({ ...formData, cardDetails: e.target.value })}
                    placeholder="e.g. 1999 1st Edition Charizard PSA 9 or MTG Unlimited Lotus"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Message Details <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your trade proposition, cards offered, or support question in detail..."
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Inquiry to Escrow Team</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
