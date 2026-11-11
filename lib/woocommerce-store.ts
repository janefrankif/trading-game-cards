import { CardItem } from './marketplace-data';

export interface CartItem {
  id: string;
  card: CardItem;
  quantity: number;
  selectedCondition: string;
  unitPrice: number;
}

export interface PlacedOrder {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingMethod: string;
  shippingCost: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped (Signature Required)' | 'Delivered (Inspection Active)' | 'Completed';
  trackingNumber: string;
  paymentMethod: string;
  billingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    phone: string;
  };
}

export interface UserVaultCard {
  id: string;
  name: string;
  game: string;
  set: string;
  gradeOrCondition: string;
  estValue: number;
  image: string;
  status: 'In Personal Vault' | 'Listed on Shop' | 'Locked in Escrow Trade';
}

export const INITIAL_USER_VAULT: UserVaultCard[] = [
  {
    id: 'vault-1',
    name: 'Blastoise (Holo 1st Edition)',
    game: 'Pokemon',
    set: 'Base Set',
    gradeOrCondition: 'PSA 9 Mint',
    estValue: 3400,
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=600&q=80',
    status: 'In Personal Vault',
  },
  {
    id: 'vault-2',
    name: 'Mox Diamond',
    game: 'Magic: The Gathering',
    set: 'Stronghold',
    gradeOrCondition: 'Raw Near Mint',
    estValue: 680,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    status: 'Listed on Shop',
  },
  {
    id: 'vault-3',
    name: 'Blue-Eyes White Dragon (SDK-001)',
    game: 'Yu-Gi-Oh!',
    set: 'Starter Deck Kaiba',
    gradeOrCondition: 'BGS 9.5 Gem Mint',
    estValue: 1250,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    status: 'In Personal Vault',
  },
];

export const US_STATES = [
  { code: 'AL', name: 'Alabama', taxRate: 0.04 },
  { code: 'AZ', name: 'Arizona', taxRate: 0.056 },
  { code: 'CA', name: 'California', taxRate: 0.0725 },
  { code: 'CO', name: 'Colorado', taxRate: 0.029 },
  { code: 'FL', name: 'Florida', taxRate: 0.06 },
  { code: 'GA', name: 'Georgia', taxRate: 0.04 },
  { code: 'IL', name: 'Illinois', taxRate: 0.0625 },
  { code: 'NC', name: 'North Carolina', taxRate: 0.0475 },
  { code: 'NJ', name: 'New Jersey', taxRate: 0.06625 },
  { code: 'NY', name: 'New York', taxRate: 0.04 },
  { code: 'OH', name: 'Ohio', taxRate: 0.0575 },
  { code: 'PA', name: 'Pennsylvania', taxRate: 0.06 },
  { code: 'TX', name: 'Texas', taxRate: 0.0625 },
  { code: 'WA', name: 'Washington', taxRate: 0.065 },
];
