import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, contextCard, topic } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid request. Message is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are a world-class expert consultant in trading card game (TCG) e-commerce platforms, card grading (PSA, BGS, CGC), marketplace fraud protection, US sales tax laws (Marketplace Facilitator Act), and programmatic SEO for collectibles (Pokemon, MTG, Yu-Gi-Oh!, Lorcana, One Piece).
Your goal is to give actionable, authoritative, concise, and high-value strategic and technical advice for collectors, traders, and platform builders.
Format with clean bullet points and bold emphasis when discussing fees, protocols, or architecture. Keep answers focused and pragmatic.`;

        const userPrompt = `Context: ${
          contextCard ? `Card: ${contextCard.name} (${contextCard.game}, Set: ${contextCard.set}, Condition/Grade: ${contextCard.gradeScore || contextCard.rawCondition}, Price: $${contextCard.listingPrice})` : "General Marketplace Strategy"
        }
Topic: ${topic || "Marketplace Architecture & Trade Strategy"}
User Question: ${message}`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `${systemPrompt}\n\n${userPrompt}`,
        });

        if (response?.text) {
          return NextResponse.json({ answer: response.text });
        }
      } catch (aiErr) {
        console.warn("Gemini API call failed, falling back to expert knowledge base:", aiErr);
      }
    }

    // High quality domain-specific fallback response
    let answer = "";
    const lower = message.toLowerCase();

    if (lower.includes("escrow") || lower.includes("fraud") || lower.includes("scam") || lower.includes("safe")) {
      answer = `### 🛡️ Recommended Escrow & Anti-Fraud Architecture for US Market:
- **Authorization Hold over Capture:** When a collector buys or trades, place a pre-authorization hold or capture funds into a segregated Stripe escrow transfer group.
- **Carrier-Synchronized Inspection Window:** Grant the buyer a 72-hour window that strictly begins upon USPS/UPS "Delivered" webhook status.
- **Mandatory Signature Confirmation:** Enforce USPS Signature Confirmation on every item above $250. Below $250, use tracked USPS Ground Advantage with rigid bubble mailers.
- **Serial & Tamper-Evident Tape:** Require sellers of raw or high-grade cards to use serialized holographic tamper-evident seals on the card sleeve/toploader. If the seal is broken or reapplied, the claim is flagged for human arbitration.`;
    } else if (lower.includes("seo") || lower.includes("search") || lower.includes("google") || lower.includes("traffic")) {
      answer = `### 🚀 Programmatic SEO Blueprint for TCG Cards:
- **Strict Semantic Hierarchy:** Build routes formatted as \`/{game}/{set-slug}/{card-name}-{card-number}/{condition-or-grade}\`.
- **JSON-LD IndividualProduct Schema:** For graded slabs, provide \`IndividualProduct\` schema with exact PSA/BGS cert numbers, itemCondition (\`https://schema.org/UsedCondition\`), and price valid dates to secure rich Google snippet stars and price badges.
- **Aggregated Raw Product Pages:** Raw listings should use \`Product\` schema with \`AggregateOffer\` showing lowPrice and highPrice across NM, LP, and MP tiers.
- **Long-tail Checklist Clusters:** Build programmatic Set Checklists (e.g., \`/pokemon/base-set-checklist\`) that internally cross-link to every single card card page, distributing PageRank authority efficiently.`;
    } else if (lower.includes("platform") || lower.includes("shopify") || lower.includes("medusa") || lower.includes("tech stack")) {
      answer = `### ⚙️ Recommended Tech Stack for a Card Marketplace:
- **Frontend & SEO:** Next.js 15 App Router with Server-Side Rendering (SSR) to ensure fast initial page load and perfect search engine indexing.
- **Backend & Marketplace Orchestration:** Headless architecture (MedusaJS 2.0 or custom Node.js/NestJS service) rather than monolithic Shopify, because Shopify's 100-variant limit and single-vendor paradigm break when handling multi-vendor card variants and bilateral trades.
- **Search Engine:** Meilisearch or Algolia with multi-attribute filtering (Game, Set, Condition, Grading Company, Foil Finish, Price Range).
- **Payment & Compliance:** Stripe Connect Custom for multi-party payouts, TaxJar / Stripe Tax for US Marketplace Facilitator automated sales tax collection.`;
    } else if (lower.includes("grade") || lower.includes("psa") || lower.includes("bgs") || lower.includes("cgc") || lower.includes("condition")) {
      answer = `### 💎 Card Condition & Authentication Guidelines:
- **The US TCG Grading Hierarchy:** PSA is king for Pokemon and vintage modern liquidity; BGS leads high-end vintage MTG and Quad 9.5/Black Label grails; CGC is surging in modern Pokemon, One Piece, and Lorcana.
- **Raw Card Standards:** Strictly map your raw condition definitions to the established 5-tier US standard: Near Mint (NM), Lightly Played (LP), Moderately Played (MP), Heavily Played (HP), and Damaged (DMG).
- **Sub-Grade Scanning:** Provide sellers with a 4-point macro photo guide: Centering (front/back 60/40 or better), Corners, Edges (silvering/whitening), and Surface (holo scratches, print lines).`;
    } else {
      answer = `### 🃏 Specialized Collector Marketplace Strategy:
- **Bilateral Trade Engine:** Support simultaneous cash + card swaps (e.g. Card A + $75 cash for Card B) held in double-sided escrow.
- **Fee Transparency:** Standardize seller fees around 6% to 8% to undercut eBay (13.25%) and TCGPlayer (10.25%), attracting high-volume power sellers.
- **Digital Binder Sync:** Allow collectors to upload their "Have" list and "Want" list to trigger automated match notifications.
- **USPS Tracked Shipping Standards:** Integrate EasyPost/Shippo API to auto-generate rigid-mail-compliant labels with delivery insurance for cards over $100.`;
    }

    return NextResponse.json({ answer });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
