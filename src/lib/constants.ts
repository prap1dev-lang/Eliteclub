// ════════════════════════════════════════════════════════════════════
//  ELITE CLUB — Domain constants (single source of truth)
// ════════════════════════════════════════════════════════════════════

export const BRAND = {
  name: 'Elite Club',
  tagline: 'Reserved for Rare.',
  subtitle: "India's Premier Luxury Talent & Brand Collaboration Platform",
}

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
] as const

export const AGE_CATEGORIES = [
  { label: 'Elite Teen', range: '16–20 Years' },
  { label: 'Emerging Creator', range: '21–25 Years' },
  { label: 'Professional Creator', range: '26–30 Years' },
  { label: 'Elite Professional', range: '31–40 Years' },
  { label: 'Legacy Creator', range: '41+ Years' },
] as const

export const CREATOR_CATEGORIES = [
  'Fashion', 'Luxury', 'Travel', 'Beauty', 'Lifestyle', 'Fitness',
  'Technology', 'Food', 'Comedy', 'Education', 'Business', 'Gaming', 'Others',
] as const

export const PHOTOGRAPHER_SPECIALIZATIONS = [
  'Fashion', 'Commercial', 'Luxury', 'Wedding', 'Events',
  'Real Estate', 'Drone', 'Editorial', 'Product', 'Portrait',
] as const

export const VIDEOGRAPHER_SPECIALIZATIONS = [
  'Fashion Films', 'Commercial', 'Corporate', 'Luxury Brand Campaigns',
  'Weddings', 'Events', 'Music Videos', 'Documentary', 'Drone', 'Reels & Shorts',
] as const

export const FOLLOWER_BUCKETS = [
  'Under 10K', '10K – 50K', '50K – 100K', '100K – 500K', '500K – 1M', '1M+',
] as const

export const EXPERIENCE_BUCKETS = [
  'Less than 1 year', '1 – 3 years', '3 – 5 years', '5 – 10 years', '10+ years',
] as const

export const BUSINESS_TYPES = [
  'Luxury Brand', 'Fashion Brand', 'Startup', 'Corporate', 'Hospitality',
  'Hotel', 'Jewelry Brand', 'Beauty Brand', 'Automobile Brand',
  'Event Company', 'Advertising Agency', 'Other',
] as const

export const HIRING_OPTIONS = [
  'Influencers', 'Photographers', 'Videographers', 'Campaign Teams',
  'Fashion Teams', 'Event Coverage Teams',
] as const

// ── Membership packages (influencer add-ons) ─────────────────────────
export type Package = {
  id: 'starter' | 'premium' | 'signature'
  name: string
  price: number
  highlight?: boolean
  blurb: string
  features: string[]
}

export const PACKAGES: Package[] = [
  {
    id: 'starter',
    name: 'Elite Starter',
    price: 5000,
    blurb: 'Begin your journey with the essentials.',
    features: [
      'Basic Photoshoot',
      'Portfolio Creation',
      'One Professional Reel',
      'Website Profile',
      'Competition Entry',
    ],
  },
  {
    id: 'premium',
    name: 'Elite Premium',
    price: 11000,
    highlight: true,
    blurb: 'The professional standard for serious creators.',
    features: [
      'Professional Makeup',
      'Hair Styling',
      'Studio Shoot',
      'Two Professional Reels',
      'Portfolio Development',
      'Website Listing',
      'Competition Entry',
      'Digital Promotion',
    ],
  },
  {
    id: 'signature',
    name: 'Elite Signature',
    price: 25000,
    blurb: 'Maximum exposure. The full luxury treatment.',
    features: [
      'Premium Makeup Artist',
      'Luxury Hair Styling',
      'Celebrity Fashion Stylist',
      'Premium Studio Shoot',
      'Outdoor Luxury Shoot',
      'Professional Videography',
      'Five Cinematic Reels',
      'Brand Portfolio',
      'Homepage Featured Listing',
      'Social Media Branding',
      'Priority Competition Entry',
      'Elite Verification Badge',
      'Brand Collaboration Priority',
      'Media Coverage',
      'Interview Feature',
      'Talent Grooming Session',
      'Career Consultation',
      'Dedicated Relationship Manager',
    ],
  },
]

// ── Championship ─────────────────────────────────────────────────────
export const PRIZE_POOL = '₹23,00,000'

export const PRIZES = [
  { place: 'Grand Champion', amount: '₹11,00,000', medal: '🥇' },
  { place: 'First Runner-Up', amount: '₹7,00,000', medal: '🥈' },
  { place: 'Second Runner-Up', amount: '₹5,00,000', medal: '🥉' },
] as const

export const WINNER_PRIVILEGES = [
  'National Media Recognition',
  'Featured on Elite Club Homepage for 6 Months',
  'Elite Club Verified Champion Badge',
  'Professional Brand Photoshoot',
  'Exclusive Brand Collaboration Opportunities',
  'Luxury Trophy & Certificate',
  'Priority Invitations to Elite Events',
  'Digital Hall of Fame',
] as const

export const COMPETITION_STAGES = [
  { n: 1, title: 'District Selection' },
  { n: 2, title: 'State Competition' },
  { n: 3, title: 'State Winner' },
  { n: 4, title: 'National Grand Finale' },
  { n: 5, title: 'Elite Champion' },
] as const

export const JOURNEY = [
  'Discover', 'Verify', 'Compete', 'Collaborate', 'Win', 'Grow',
] as const

export const JUDGING_PARAMETERS = [
  'Professionalism', 'Creativity', 'Public Presence', 'Communication',
  'Portfolio', 'Brand Value', 'Overall Personality',
] as const

// ── Fees ─────────────────────────────────────────────────────────────
export const FEES = {
  influencerRegistration: 1100,
  businessPosting: 1100,
  photographerRegistration: 0,
  videographerRegistration: 0,
}

// ── Launch offer: first N influencer registrations are FREE ──────────
// The first FREE_SLOT_LIMIT influencers pay ₹0 (instead of the normal
// influencerRegistration fee). After the limit is reached the fee applies.
// The count is enforced server-side at insert time (single source of truth).
export const FREE_SLOT_LIMIT = 100

// ── Registration role meta (drives /register cards + forms) ──────────
export const ROLE_META = {
  influencer: {
    title: 'Influencer',
    fee: FEES.influencerRegistration,
    feeLabel: '₹1,100',
    // Launch offer copy — first 100 registrations are free.
    offerLabel: 'FREE',
    offerNote: 'Free for the first 100 users',
    blurb: 'Compete, build your brand, and secure premium collaborations.',
  },
  photographer: {
    title: 'Photographer',
    fee: 0,
    feeLabel: 'FREE',
    blurb: 'Receive paid assignments from verified luxury businesses.',
  },
  videographer: {
    title: 'Videographer',
    fee: 0,
    feeLabel: 'FREE',
    blurb: 'Get premium project opportunities and brand campaigns.',
  },
} as const

export type RegistrationRole = keyof typeof ROLE_META

// ── Hero / parallax model imagery (free stock, Indian fashion) ───────
// Pexels free-to-use images. Swap freely.
export const HERO_IMAGES = [
  'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/2738792/pexels-photo-2738792.jpeg?auto=compress&cs=tinysrgb&w=900',
]
