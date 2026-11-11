'use client';

import React, { useState } from 'react';
import { SAMPLE_CARDS, CardItem } from '@/lib/marketplace-data';
import { 
  Search, 
  Copy, 
  Check, 
  Globe, 
  Smartphone, 
  Monitor, 
  Code2, 
  Sparkles, 
  ExternalLink,
  Tag
} from 'lucide-react';

interface SeoLabProps {
  initialCardId?: string;
}

export function SeoLab({ initialCardId }: SeoLabProps) {
  const [selectedCardId, setSelectedCardId] = useState<string>(
    initialCardId || SAMPLE_CARDS[0].id
  );
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState<boolean>(false);

  const card = SAMPLE_CARDS.find((c) => c.id === selectedCardId) || SAMPLE_CARDS[0];

  // Generate dynamic Schema.org JSON-LD based on whether the card is graded or raw
  const jsonLdSchema = {
    '@context': 'https://schema.org/',
    '@type': card.seoData.schemaType,
    name: `${card.name} - ${card.set} #${card.cardNumber} ${card.isGraded ? card.gradeScore : card.rawCondition}`,
    image: [card.image],
    description: card.seoData.metaDescription,
    sku: `TCG-${card.game.toUpperCase().slice(0, 3)}-${card.cardNumber.replace('/', '-')}`,
    category: `Trading Cards > ${card.game} > ${card.set}`,
    brand: {
      '@type': 'Brand',
      name: card.game,
    },
    ...(card.isGraded
      ? {
          serialNumber: 'CERT_9048218',
          itemCondition: 'https://schema.org/UsedCondition',
          offers: {
            '@type': 'Offer',
            url: `https://vaulttradehq.com/cards/${card.seoData.slug}`,
            priceCurrency: 'USD',
            price: card.listingPrice,
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/UsedCondition',
            seller: {
              '@type': 'Organization',
              name: card.seller.name,
            },
          },
        }
      : {
          offers: {
            '@type': 'AggregateOffer',
            url: `https://vaulttradehq.com/cards/${card.seoData.slug}`,
            priceCurrency: 'USD',
            lowPrice: card.listingPrice,
            highPrice: Math.round(card.listingPrice * 1.15),
            offerCount: 8,
            availability: 'https://schema.org/InStock',
          },
        }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '184',
    },
  };

  const schemaString = JSON.stringify(jsonLdSchema, null, 2);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(schemaString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="seo-lab-section" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 mb-2">
          <Search className="w-3.5 h-3.5" /> Programmatic SEO & Structured Data Studio
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Niche Collector SEO Architecture & Schema.org Lab
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
          Trading card collectors query exact card numbers, grading certs, and set variants. Inspect how our programmatic route architecture and Schema.org rich snippets dominate Google search results.
        </p>

        {/* Card Selector dropdown */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Select Card Sample:</span>
          <select
            id="seo-card-select"
            value={selectedCardId}
            onChange={(e) => setSelectedCardId(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-white text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500"
          >
            {SAMPLE_CARDS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.game}: {c.name} ({c.isGraded ? c.gradeScore : c.rawCondition}) - ${c.listingPrice}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Google SERP Preview & Schema Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 6 Cols: Google SERP Visualizer */}
        <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>Google SERP Snippet Preview</span>
            </h3>

            {/* Desktop / Mobile toggle */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setDevicePreview('desktop')}
                className={`p-1.5 rounded ${devicePreview === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setDevicePreview('mobile')}
                className={`p-1.5 rounded ${devicePreview === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SERP Mock Card */}
          <div className={`p-4 rounded-xl border transition-all ${
            devicePreview === 'desktop' ? 'bg-white text-slate-900 max-w-xl' : 'bg-white text-slate-900 max-w-sm mx-auto'
          }`}>
            {/* Breadcrumb row */}
            <div className="text-[11px] text-[#202124] flex items-center gap-1.5 mb-1">
              <div className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-[8px] text-white font-bold">
                T
              </div>
              <span className="font-medium">VaultTradeHQ</span>
              <span className="text-slate-400">›</span>
              <span className="text-slate-500">cards › {card.game.toLowerCase().replace(/\s+/g, '-')} › {card.cardNumber}</span>
            </div>

            {/* Google Blue Title */}
            <h4 className="text-[#1a0dab] hover:underline font-medium text-base sm:text-lg leading-snug cursor-pointer">
              {card.seoData.metaTitle}
            </h4>

            {/* Rich snippet stars & price badge */}
            <div className="flex items-center gap-2 text-xs text-[#4d5156] mt-1">
              <span className="text-[#e37400] font-bold">★★★★★ 4.9</span>
              <span>(184)</span>
              <span>•</span>
              <span className="font-semibold text-emerald-700 font-mono">${card.listingPrice.toLocaleString()}.00</span>
              <span>•</span>
              <span className="text-emerald-700 font-medium">In stock</span>
              {card.isGraded && (
                <>
                  <span>•</span>
                  <span className="text-slate-600">{card.gradingCompany} Authenticated</span>
                </>
              )}
            </div>

            {/* Google Meta Description */}
            <p className="text-xs text-[#4d5156] mt-1.5 leading-relaxed">
              {card.seoData.metaDescription}
            </p>
          </div>

          {/* Canonical Programmatic Slug Details */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
            <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              Canonical Programmatic URL Route:
            </div>
            <div className="font-mono text-indigo-300 break-all bg-slate-900 p-2 rounded-lg border border-slate-800 text-[11px]">
              https://vaulttradehq.com/cards/{card.seoData.slug}
            </div>

            <div className="pt-2">
              <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mb-1.5">
                Target Long-Tail Collector Keywords:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {card.seoData.targetKeywords.map((kw, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 text-[11px] flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5 text-amber-400" />
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: JSON-LD Schema.org Live Code */}
        <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Generated Schema.org JSON-LD</span>
            </h3>

            <button
              id="copy-schema-btn"
              onClick={handleCopySchema}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON-LD</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-400">
            This structured data is pre-rendered via Next.js Server Components. Search crawlers parse it to award Rich Snippets with pricing, stock status, and authentic condition ratings.
          </p>

          <div className="relative">
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-[380px] scrollbar-thin">
              {schemaString}
            </pre>
          </div>
        </div>

      </div>
    </section>
  );
}
