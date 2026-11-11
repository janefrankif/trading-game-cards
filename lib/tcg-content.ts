export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Market Trends' | 'Trading Guides' | 'Grading Advice' | 'Collector Spotlights';
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  content: string[];
  coverImage: string;
  highlightedCards?: string[];
  tags: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Trading & Escrow' | 'Authentication & Grading' | 'Orders & Shipping' | 'Payouts & Taxes';
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: '2026-vintage-pokemon-market-report',
    title: '2026 Vintage Pokémon Market Report: Shadowless & Gold Stars Breakdown',
    category: 'Market Trends',
    readTime: '6 min read',
    date: 'Sep 1, 2026',
    author: {
      name: 'Marcus Sterling',
      role: 'Head of Vintage Appraisals',
      avatar: 'https://picsum.photos/seed/avatar-marcus/120/120',
    },
    summary: 'A deep dive into historical auction data, population trends, and why Shadowless holos are outperforming modern chase cards.',
    content: [
      'The vintage Pokémon market in 2026 is experiencing a structural pivot. While high-supply modern alternate arts have fluctuated with reprint cycles, vintage Wizards of the Coast (WOTC) printsâ€”specifically 1999 1st Edition Base Set and EX-era Gold Starsâ€”continue to demonstrate liquidity resilience.',
      'According to our aggregated auction crawler spanning eBay Sold comps, Heritage Auctions, and our internal Escrow settlement ledger, PSA 9 and PSA 10 Shadowless Charizard copies have gained 14.2% annualized value over the past 24 months.',
      'Key insight for collectors looking to trade: Bilateral trades combining a mid-tier modern grail with cash delta remain the fastest way to acquire vintage holofoil slabs without liquidating your entire collection.',
    ],
    coverImage: 'https://picsum.photos/seed/blog-pokemon-vintage/800/500',
    highlightedCards: ['Charizard (Shadowless)', 'Gengar VMAX (Alternate Art)'],
    tags: ['Pokémon', 'Vintage', 'Market Comps', 'PSA 9'],
  },
  {
    id: 'blog-2',
    slug: 'how-to-execute-safe-bilateral-card-trades',
    title: 'How to Execute Safe Bilateral Card Trades Online Without Getting Scammed',
    category: 'Trading Guides',
    readTime: '8 min read',
    date: 'Aug 24, 2026',
    author: {
      name: 'Elena Rostova',
      role: 'Escrow Operations Director',
      avatar: 'https://picsum.photos/seed/avatar-elena/120/120',
    },
    summary: 'Step-by-step masterclass on avoiding the notorious "send first" scam using dual-custody escrow vaults and 72-hour physical inspection holds.',
    content: [
      'Trading cards online has historically been plagued by asymmetry: who ships first? In community groups on Discord or Facebook, one party inevitably takes 100% of the counterparty default risk.',
      'Our platform eliminates counterparty risk using the Dual-Custody Escrow Protocol: Both collectors ship their cards to our verified processing vault simultaneously with insured USPS Priority tracking.',
      'Both cards are authenticated under 40x macro digital loupes to match submitted serial numbers and condition claims before the swap is physically finalized and re-dispatched with Adult Signature confirmation.',
    ],
    coverImage: 'https://picsum.photos/seed/blog-trade-escrow/800/500',
    highlightedCards: ['Black Lotus', 'Blue-Eyes White Dragon'],
    tags: ['Escrow', 'Security', 'Bilateral Trading', 'USPS Signature'],
  },
  {
    id: 'blog-3',
    slug: 'psa-vs-bgs-vs-cgc-grading-premiums-2026',
    title: 'PSA vs Beckett (BGS) vs CGC in 2026: Grading Multipliers & Resale Value',
    category: 'Grading Advice',
    readTime: '5 min read',
    date: 'Aug 16, 2026',
    author: {
      name: 'Kenji Takahashi',
      role: 'Senior Scribing & Authenticity Lead',
      avatar: 'https://picsum.photos/seed/avatar-kenji/120/120',
    },
    summary: 'Compare return-on-investment multipliers across PSA 10, BGS 9.5 True Gem, BGS Pristine 10 Black Label, and CGC Pristine 10.',
    content: [
      'Choosing where to submit raw chase cards directly impacts liquidity and final trade power. In 2026, PSA 10 continues to hold the standard for maximum collector search volume and liquidity.',
      'However, for vintage cards with flawless subgrades (Centering 10, Corners 10, Edges 10, Surface 10), Beckett Black Label command premiums upwards of 3.5x to 5x of a standard PSA 10 comp.',
      'CGC has rapidly expanded market share in Disney Lorcana and One Piece TCG, offering pristine pristine gold labels that rival Beckett for modern Japanese and English releases.',
    ],
    coverImage: 'https://picsum.photos/seed/blog-grading-slabs/800/500',
    highlightedCards: ['Monkey D. Luffy (Manga Alternate Art)', 'Elsa - Spirit of Winter'],
    tags: ['PSA', 'Beckett', 'CGC', 'Grading Multipliers'],
  },
  {
    id: 'blog-4',
    slug: 'disney-lorcana-one-piece-alt-art-boom',
    title: 'Disney Lorcana & One Piece TCG: Why Alternate Art Manga & Enchanteds Are Surging',
    category: 'Collector Spotlights',
    readTime: '7 min read',
    date: 'Aug 08, 2026',
    author: {
      name: 'Sarah Chen',
      role: 'Modern TCG Portfolio Strategist',
      avatar: 'https://picsum.photos/seed/avatar-sarah/120/120',
    },
    summary: 'Why non-Big Three card games are attracting high-net-worth collectors and dominating the bilateral trade volume.',
    content: [
      'For over two decades, the trading card market was strictly defined by Pokémon, Magic: The Gathering, and Yu-Gi-Oh!. In 2026, Disney Lorcana and One Piece have officially transitioned from speculative novelty to institutional collectibles.',
      'Manga Alternate Arts from Romance Dawn and Wings of the Captain, alongside First Chapter cold foil Enchanted cards like Elsa - Spirit of Winter, now routinely trade directly for vintage Pokémon slabs.',
      'Our trading engine supports cross-game bilateral tradesâ€”meaning you can trade three modern Disney Enchanted slabs for a vintage revised Magic: The Gathering dual land in one frictionless transaction.',
    ],
    coverImage: 'https://picsum.photos/seed/blog-lorcana-piece/800/500',
    highlightedCards: ['Elsa - Spirit of Winter (Enchanted)', 'Monkey D. Luffy (Manga Alternate Art)'],
    tags: ['Lorcana', 'One Piece', 'Manga Art', 'Enchanted'],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Trading & Escrow',
    question: 'How does card trading work on this online shop?',
    answer: 'Trading on our platform is 100% bilateral and protected by our dual-custody escrow vault. When you find a card marked "Accepts Trades", click "Propose Trade". You can select up to 3 cards from your personal binder and optionally add cash delta (e.g., your card + $150 cash). Both parties review the offer. Once accepted, both parties ship to our secure US vault where our certified appraisers verify authenticity before re-shipping to each collector.',
  },
  {
    id: 'faq-2',
    category: 'Trading & Escrow',
    question: 'What is the 72-Hour Physical Inspection Guarantee?',
    answer: 'When an order or trade is delivered via carrier tracking, your payment is NOT immediately released to the seller. We place the funds in a 72-hour escrow hold. You have 72 hours to inspect the slab or raw single in person. If the card was tampered with or differs from the listing specifications, you can trigger a full refund and return with pre-paid insured shipping.',
  },
  {
    id: 'faq-3',
    category: 'Authentication & Grading',
    question: 'How do you verify graded slabs and raw singles?',
    answer: 'Every graded card listed on the platform is validated against official PSA, BGS, or CGC population and certification registries. We inspect high-res hologram patterns, sonic welding integrity, and slab thickness to guarantee the case has never been cracked or swapped. Raw singles are verified for surface dents, edge silvering, and authentic rosette print patterns under digital microscopes.',
  },
  {
    id: 'faq-4',
    category: 'Orders & Shipping',
    question: 'What shipping methods do you use and is signature required?',
    answer: 'All cards valued over $250 are shipped via USPS Priority Express or FedEx Ground with Mandatory Adult Signature confirmation and 100% third-party cargo insurance. Cards are packed in bubble sleeves, placed inside rigid cardboard armor, and sealed with tamper-evident serial tape.',
  },
  {
    id: 'faq-5',
    category: 'Payouts & Taxes',
    question: 'How do payouts, sales tax, and 1099-K reporting work?',
    answer: 'As a registered US Marketplace Facilitator, we automatically calculate and remit applicable state sales tax on all purchases. For sellers and traders receiving cash deltas, payouts are deposited directly to your bank account via Stripe Connect after the 72-hour inspection window clears. We provide automated annual 1099-K tax reporting when legal thresholds are met.',
  },
  {
    id: 'faq-6',
    category: 'Authentication & Grading',
    question: 'Can I buy cards directly without trading anything?',
    answer: 'Yes! While our shop specializes in bilateral trades, every card in the catalog can also be purchased outright just like standard e-commerce. You can add cards to your shopping cart, apply promo codes like VAULT10 or POKEMON10, and select from supported payment methods including Apple Pay, Chime, Cash App, Zelle, Bitcoin, credit cards, or our 72-hour vault escrow hold.',
  },
  {
    id: 'faq-7',
    category: 'Orders & Shipping',
    question: 'What payment methods do you accept at checkout?',
    answer: 'We support Apple Pay, Chime, Cash App ($Cashtag), Zelle instant bank transfer, Bitcoin (BTC on-chain and Lightning), credit cards, and our dual-custody 72-Hour Vault Escrow hold. In preview mode, orders can be placed and inventory reserved without entering financial credentials.',
  },
  {
    id: 'faq-8',
    category: 'Orders & Shipping',
    question: 'What happens if a package is lost or damaged during transit?',
    answer: 'Every shipment leaving our facility is 100% insured via full-value cargo insurance. If a carrier damages the armored box or loses the parcel, our escrow vault immediately processes a 100% full refund to the buyer while our claims department handles the carrier recovery. You are never left out of pocket.',
  },
  {
    id: 'faq-9',
    category: 'Authentication & Grading',
    question: 'Are sealed Booster Boxes and Elite Trainer Boxes guaranteed unweighed?',
    answer: 'Yes. All sealed product lines—including the Mega Evolution Chaos Rising Elite Trainer Boxes—are sourced directly from factory-sealed distributor master cases. Every box is inspected for authentic manufacturer shrink wrap with official logos, flawless factory seams, and zero signs of tampering or re-sealing.',
  },
  {
    id: 'faq-10',
    category: 'Trading & Escrow',
    question: 'How does the AI Card Appraiser calculate real-time valuations?',
    answer: 'Our AI Card Appraiser analyzes real-time realized sales comps from eBay Historical, PWCC Vault, Goldin Auctions, and PriceCharting API. It weights recent PSA 10 and BGS 9.5 sale velocity, subgrade premiums, and population trends to provide a fair market trade value within 1.5% accuracy.',
  },
];
