import React from 'react';
import { Star, Verified } from 'lucide-react';
import Image from 'next/image';

const SOCIAL_REVIEWS = [
  { id: 1, user: '@PokeCollector99', name: 'James W.', platform: 'X', content: 'Just received my PSA 10 Base Set Charizard from Vault Cards. Packaging was bulletproof. Best escrow experience ever! 🐉🔥', rating: 5, time: '2h ago' },
  { id: 2, user: '@MTG_Mage', name: 'Sarah L.', platform: 'Instagram', content: 'The 72-hour escrow gives me so much peace of mind when buying high-end dual lands. 10/10 recommend. #MTG', rating: 5, time: '4h ago' },
  { id: 3, user: '@YugiKing', name: 'David C.', platform: 'X', content: 'Customer service is unmatched. Had a question about my Blue-Eyes order and they replied in 5 mins.', rating: 5, time: '6h ago' },
  { id: 4, user: '@LorcanaLover', name: 'Emma T.', platform: 'X', content: 'First time buying an Enchanted card. Vault Cards made the process so smooth!', rating: 5, time: '7h ago' },
  { id: 5, user: '@SlabHunter', name: 'Mike R.', platform: 'X', content: 'Their zero default rate is no joke. I’ve bought over $10k worth of slabs here. Flawless every time.', rating: 5, time: '11h ago' },
  { id: 6, user: '@OnePieceTCG', name: 'Kenji Y.', platform: 'Instagram', content: 'Manga Zoro arrived in perfect condition! Thank you Vault Cards!', rating: 5, time: '12h ago' },
  { id: 7, user: '@CardBoardCrack', name: 'Alex M.', platform: 'X', content: 'Just used the Apple Pay 1-Touch. Insanely fast checkout for my modern staples.', rating: 5, time: '14h ago' },
  { id: 8, user: '@RetroGamer', name: 'Chris B.', platform: 'Instagram', content: 'Trading here is the only way I do high-end deals now. No more getting scammed on Facebook groups.', rating: 5, time: '18h ago' },
  { id: 9, user: '@PikaPika', name: 'Jessica K.', platform: 'X', content: 'Love the AI Appraiser tool! Helped me value my childhood collection accurately.', rating: 4, time: '20h ago' },
  { id: 10, user: '@BlackLotus', name: 'Tom H.', platform: 'X', content: 'Paid with Bitcoin via Lightning network. Flawless transaction. Welcome to the future of TCG!', rating: 5, time: '1d ago' },
  { id: 11, user: '@CharizardFan', name: 'Brian S.', platform: 'Instagram', content: 'Bought a shadowless Zard. Best addition to my vault.', rating: 5, time: '1d ago' },
  { id: 12, user: '@MTGFinance', name: 'Ryan D.', platform: 'X', content: 'If you aren\'t using Vault Cards for trades over $500, you are doing it wrong.', rating: 5, time: '1d ago' },
  { id: 13, user: '@TCGPodcast', name: 'Mark V.', platform: 'X', content: 'Shoutout to Vault Cards for sponsoring our last episode. Legit the safest marketplace.', rating: 5, time: '2d ago' },
  { id: 14, user: '@ShinyHunter', name: 'Amanda P.', platform: 'Instagram', content: 'Got my graded Moonbreon today! The slab was protected so well.', rating: 5, time: '2d ago' },
  { id: 15, user: '@CardInvestor', name: 'Kevin L.', platform: 'X', content: 'Their 72-hour escrow is a game changer for the hobby. Completely eliminates mail fraud.', rating: 5, time: '2d ago' },
];

export function TcgSocialReviews() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live Community Feedback
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Trusted by the Collector Community
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl">
          Real-time reviews from our users trading, buying, and selling high-end slabs every day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SOCIAL_REVIEWS.map((review) => (
          <div key={review.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:bg-slate-900 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white text-sm">{review.name}</span>
                    <Verified className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="text-[11px] text-slate-500">{review.user}</div>
                </div>
              </div>
              <div className="text-[10px] text-slate-500">{review.time}</div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">
              &quot;{review.content}&quot;
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
