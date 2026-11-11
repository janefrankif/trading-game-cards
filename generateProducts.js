const fs = require('fs');

const rawList = `Chaos Rising Booster box $230
Chaose Rising Etbs $70
Mega Evolution Booster box $240
Mega Evolution Etbs $85
Mega Evolution Bundle $45
Prismatic Etbs $130
Prismatic Spc $160
Prismatic 2-packs $120
Prismatic Bundles $60
Ascended heroes Etbs $130
Ascended Heroes Booster Bundles $50
Ascended Heroes PC Etbs $270
Surging Sparks Bundle $45
Phantasmal Flames Booster Box $250
Phantasmal Flames UPC $140
Phantasmal Flames PC Etbs $140
Paldean Fates $200
Crown Zenith $230
151 UPC $450
151 Etbs $250
151 PC Etbs $650
151 Blooming waters $150
151 Booster Bundles $90
Destined Rivals Booster Box $300
Destined Rivals Etbs $100
Destined Rivals Bundle $60
Surging Sparks Etbs $80
Surging Sparks Booster box $240
Black Bolt Etbs $90
White Flare Etbs $90
Prismatic 2-packs $110
Team Rocket UPC $220
Perfect Order Booster Box $240
Perfect Order Etbs $85
Lost Origin Etbs $100
Chois Rising Etbs $100
Sealed Shrouded Fable $80
Silver Tempest Bundle $65
Journey Together Booster Box $250
Journey Together Etbs $85
Journey Together Bundles $45
White Flare Booster bundles $40
Black Bolt Booster Bundles $40
Surging Sparks 2packs $120
Chilling Reign Booster Box $260
Temporal Force Booster Box $220
Fusion Strike Booster box $230
Darkness Ablaze Booster box $230
Paradox Rift Booster Box $240
Stellar Crown Booster Box $240
OP-14 $200 per box ($3000 per case)
OP-13 $300 per box ($2,500 per case)
OP-12 $320 per box ($4,500 per case)
OP-11 $220 per box ($3,600 per case)
OP-10 $400 per box ($2,320 per case)
OP-09 $500 per box ($4000 per case)
OP-08 $450 per box ($3,680 per case)
OP-07 $230 per box ($2,750 per case)
OP-06 $290 per box (3,500 per case)
OP-05 $800 per box (5000 per case)
OP-04 $700 per box ($2,800 per case)
OP-03 $350 per box ($2,300 per case)
Op-02 $240 per box ($1,700 per case )
Op-01 blue and white available
EB-01 $200 per box ($1,600 per case )
EB-02 $300 per box (2,150 per case
Op015 box $250 and case $2500`;

const cards = rawList.split('\n').map((line, idx) => {
  if (!line.trim()) return null;
  let name = line;
  let price = 100;
  
  const match = line.match(/\$?(\d+,?\d*)/);
  if (match) {
    price = parseInt(match[1].replace(',', ''), 10);
  }
  
  // if it's op-01 blue and white, set price manually
  if (line.toLowerCase().includes('op-01')) {
    name = "OP-01 Blue & White Booster Box";
    price = 250;
  }
  if (line.toLowerCase().includes('op015')) {
    name = "OP-01.5 Box";
  }
  if (line.toLowerCase().includes('case') || line.toLowerCase().includes('op-') || line.toLowerCase().includes('eb-') || line.toLowerCase().includes('op015')) {
      const cleanName = name.split('$')[0].trim().replace(/\s*per box|\s*box/i, '').trim();
      let gameName = (line.toLowerCase().includes('op') || line.toLowerCase().includes('eb')) ? 'One Piece' : 'Pokemon';
      return {
          id: `prod-${idx}`,
          name: `${cleanName} Box`,
          game: gameName,
          set: 'Sealed Product',
          setYear: 2024,
          cardNumber: 'SEALED',
          rarity: 'Sealed Box',
          finish: 'Normal',
          isGraded: false,
          marketPrice: price + 10,
          listingPrice: price,
          sevenDayChange: parseFloat((Math.random() * 5 - 2.5).toFixed(1)),
          seller: {
            name: 'Vault Cards Official',
            location: 'New York, NY',
            verifiedTier: 'Pro Hobby Shop',
            rating: 100,
            salesCount: 5000,
            badge: 'Direct Inventory',
          },
          recentSales: [],
          priceHistory: [price - 5, price, price + 5, price, price - 2, price + 3, price],
          image: `https://picsum.photos/seed/${idx}/600/840`,
          allowTrades: false,
          description: `Factory sealed ${cleanName}. Guaranteed untampered.`,
          seoData: {
            slug: `sealed-product-${idx}`,
            metaTitle: `${cleanName} Sealed Box - Best Price`,
            metaDescription: `Buy authentic sealed ${cleanName} with buyer protection.`,
            targetKeywords: [cleanName.toLowerCase(), 'sealed product'],
            schemaType: 'Product',
          }
      };
  }

  // extract name
  const cleanName = line.split('$')[0].trim();
  
  return {
    id: `prod-${idx}`,
    name: cleanName,
    game: 'Pokemon',
    set: 'Sealed Product',
    setYear: 2024,
    cardNumber: 'SEALED',
    rarity: 'Sealed Box',
    finish: 'Normal',
    isGraded: false,
    marketPrice: price + (price * 0.05),
    listingPrice: price,
    sevenDayChange: parseFloat((Math.random() * 5 - 2.5).toFixed(1)),
    seller: {
      name: 'Vault Cards Official',
      location: 'New York, NY',
      verifiedTier: 'Pro Hobby Shop',
      rating: 100,
      salesCount: 5000,
      badge: 'Direct Inventory',
    },
    recentSales: [],
    priceHistory: [price, price, price, price, price, price, price],
    image: `https://picsum.photos/seed/tcg-${idx}/600/840`,
    allowTrades: false,
    description: `Factory sealed ${cleanName}. Guaranteed untampered.`,
    seoData: {
      slug: `sealed-product-${idx}`,
      metaTitle: `${cleanName} - Best Price`,
      metaDescription: `Buy authentic sealed ${cleanName} with buyer protection.`,
      targetKeywords: [cleanName.toLowerCase(), 'sealed product'],
      schemaType: 'Product',
    }
  };
}).filter(Boolean);

console.log(JSON.stringify(cards, null, 2));
