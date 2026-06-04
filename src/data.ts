import { CreatorProfile, SocialLink, GridItem, ThemeConfig, VideoModule, Lead, Tip, CustomLink } from './types';

export const THEMES: ThemeConfig[] = [
  {
    id: 'sophisticated-dark',
    name: 'Sophisticated Dark 🌌',
    backgroundClass: 'bg-[#030014] relative text-neutral-200 overflow-hidden',
    cardBg: 'bg-white/[0.03] backdrop-blur-md border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.37)]',
    textPrimary: 'text-white font-sans tracking-tight',
    textSecondary: 'text-neutral-400 font-sans',
    accentColor: '#8b5cf6', // Violet
    buttonStyle: 'bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.1] text-neutral-200 hover:text-white backdrop-blur-md transition-all duration-300',
    avatarBorder: 'ring-2 ring-white/10 shadow-[0_0_30px_rgba(139,92,264,0.3)]'
  },
  {
    id: 'midnight-oasis',
    name: 'Midnight Oasis 🌌',
    backgroundClass: 'bg-radial from-slate-900 via-indigo-950 to-zinc-950',
    cardBg: 'bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-white/20',
    textPrimary: 'text-white font-sans',
    textSecondary: 'text-slate-300 font-sans',
    accentColor: '#6366f1', // Indigo
    buttonStyle: 'bg-white/10 hover:bg-white/20 border-white/10 text-white',
    avatarBorder: 'ring-4 ring-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.4)]'
  },
  {
    id: 'palawan-escape',
    name: 'Palawan Escape 🌴',
    backgroundClass: 'bg-radial from-teal-950 via-emerald-950 to-slate-950',
    cardBg: 'bg-emerald-950/40 border-emerald-500/20 backdrop-blur-xl hover:bg-emerald-950/60 hover:border-emerald-500/35',
    textPrimary: 'text-teal-50 font-sans',
    textSecondary: 'text-emerald-200/80 font-sans',
    accentColor: '#10b981', // Emerald
    buttonStyle: 'bg-emerald-900/30 hover:bg-emerald-900/50 border-emerald-500/25 text-emerald-100',
    avatarBorder: 'ring-4 ring-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
  },
  {
    id: 'boracay-dream',
    name: 'Boracay Dream 🌅',
    backgroundClass: 'bg-radial from-rose-950 via-amber-950 to-zinc-950',
    cardBg: 'bg-rose-950/20 border-rose-500/20 backdrop-blur-xl hover:bg-rose-950/45 hover:border-rose-400/30',
    textPrimary: 'text-amber-50 font-sans',
    textSecondary: 'text-rose-200/80 font-sans',
    accentColor: '#f43f5e', // Rose
    buttonStyle: 'bg-rose-950/30 hover:bg-rose-900/40 border-rose-500/25 text-rose-100',
    avatarBorder: 'ring-4 ring-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.4)]'
  },
  {
    id: 'manila-cyberpunk',
    name: 'Manila Cyberpunk ⚡',
    backgroundClass: 'bg-black', // Layered below with custom keyframes inside index.css
    cardBg: 'bg-zinc-900/80 border-fuchsia-500/20 backdrop-blur-xl hover:bg-zinc-900/90 hover:border-cyan-500/40',
    textPrimary: 'text-zinc-50 font-sans tracking-wide',
    textSecondary: 'text-stone-300 font-mono text-xs',
    accentColor: '#ec4899', // Fuchsia
    buttonStyle: 'bg-fuchsia-950/20 hover:bg-cyan-950/20 border-fuchsia-500/30 hover:border-cyan-500/50 text-fuchsia-300 hover:text-cyan-300',
    avatarBorder: 'ring-4 ring-fuchsia-500/60 shadow-[0_0_30px_rgba(236,72,153,0.5)] polygon-asymmetric'
  },
  {
    id: 'batanes-mist',
    name: 'Batanes Mist 🌫️',
    backgroundClass: 'bg-radial from-zinc-50 via-stone-100 to-zinc-200 text-stone-900',
    cardBg: 'bg-white/60 border-stone-200/50 backdrop-blur-md hover:bg-white/80 hover:border-stone-300/80',
    textPrimary: 'text-stone-900 font-sans font-medium',
    textSecondary: 'text-stone-600 font-sans',
    accentColor: '#78716c', // Stone
    buttonStyle: 'bg-stone-100 hover:bg-stone-200 border-stone-200/80 text-stone-900 shadow-xs',
    avatarBorder: 'ring-4 ring-stone-400/40 shadow-[0_4px_15px_rgba(120,113,108,0.25)]'
  }
];

export const INITIAL_CREATORS: CreatorProfile[] = [
  {
    username: 'mariansantos',
    displayName: 'Maria Santos',
    tagline: 'Content Creator • Digital Entrepreneur • Manila-based PH',
    bio: 'Sharing digital content, online entrepreneurship tips, and creative vlogs with the community.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    location: 'Metro Manila, PH',
    themeId: 'sophisticated-dark',
    gcashNumber: '0917 123 4567',
    mayaNumber: '0917 123 4567',
    bankName: 'BPI Bank',
    bankAccount: '1234-5678-90',
    verified: true,
    followersCount: '124K',
    postsCount: '342',
    collabsCount: '89',
    socialAccounts: {
      instagram: { url: 'https://instagram.com/mariansantos', active: true },
      tiktok: { url: 'https://tiktok.com/@mariansantos', active: true },
      youtube: { url: 'https://youtube.com/c/mariansantos', active: true },
      twitter: { url: 'https://twitter.com/mariansantos', active: false },
      github: { url: 'https://github.com/mariansantos', active: true },
      linkedin: { url: 'https://linkedin.com/in/mariansantos', active: true },
      spotify: { url: 'https://spotify.com/artist/mariansantos', active: true }
    }
  },
  {
    username: 'bianca.creates',
    displayName: 'Bianca Reyes',
    tagline: 'UGC Content Creator & Esthetic Enthusiast 🌸',
    bio: 'Sharing neutral palettes, aesthetic spots in Makati, and tech gear for creators. Let\'s build your digital presence together.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    location: 'Makati, Philippines 🇵🇭',
    themeId: 'sophisticated-dark',
    gcashNumber: '0917 123 4567',
    mayaNumber: '0917 123 4567',
    bankName: 'BDO Unibank',
    bankAccount: '1234-5678-9012',
    verified: true,
    socialAccounts: {
      instagram: { url: 'https://instagram.com/bianca.creates', active: true },
      tiktok: { url: 'https://tiktok.com/@biancareyes.ugc', active: true },
      pinterest: { url: 'https://pinterest.com/biancacreates', active: true }
    }
  },
  {
    username: 'techjuan.ph',
    displayName: 'Tech Juan',
    tagline: 'Unboxing the future of Philippine Tech ⚡',
    bio: 'Gadget reviews, workspace setups, and coding tutorials based in Quezon City. Uncovering hidden tech gems without the marketing fluff.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    location: 'Quezon City, PH 🇵🇭',
    themeId: 'manila-cyberpunk',
    gcashNumber: '0918 987 6543',
    mayaNumber: '0918 987 6543',
    bankName: 'UnionBank',
    bankAccount: '1092-3482-1273',
    verified: true,
    socialAccounts: {
      youtube: { url: 'https://youtube.com/c/techjuan.ph', active: true },
      tiktok: { url: 'https://tiktok.com/@techjuan', active: true },
      github: { url: 'https://github.com/techjuan', active: true },
      linkedin: { url: 'https://linkedin.com/in/techjuan', active: true }
    }
  },
  {
    username: 'kiko.eats',
    displayName: 'Kiko eating Cebu',
    tagline: 'Street Food Archaeologist & Cebuano Chef 🌶️',
    bio: 'Cebu-based food content creator. Making regional dishes accessible to everyone. Home-baked spicy sauces and custom island recipes available!',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    location: 'Cebu City, Philippines 🇵🇭',
    themeId: 'palawan-escape',
    gcashNumber: '0922 456 7890',
    mayaNumber: '0922 456 7890',
    bankName: 'BPI',
    bankAccount: '9876-5432-1098',
    verified: false,
    socialAccounts: {
      facebook: { url: 'https://facebook.com/kikoeatscebu', active: true },
      instagram: { url: 'https://instagram.com/kiko_eats_cebu', active: true },
      youtube: { url: 'https://youtube.com/kikoeatscebu', active: true }
    }
  }
];

export const INITIAL_SOCIALS: Record<string, SocialLink[]> = {
  'mariansantos': [
    { id: 'ms1', platform: 'globe', url: 'https://merqato.digital', label: 'Shop My Merch Store', clicks: 125, active: true, subtitle: 'Limited edition drops • Free shipping', tag: 'HOT 🔥' },
    { id: 'ms2', platform: 'youtube', url: 'https://youtube.com', label: 'Watch Latest Vlog', clicks: 210, active: true, subtitle: 'Behind the scenes content' },
    { id: 'ms3', platform: 'globe', url: 'https://discord.gg', label: 'Join Discord Community', clicks: 345, active: true, subtitle: '5K+ creators • Daily events', tag: 'ACTIVE' },
    { id: 'ms4', platform: 'instagram', url: 'https://instagram.com', label: 'Listen to Podcast', clicks: 180, active: true, subtitle: 'Creator Talks PH • Weekly episodes' },
    { id: 'ms5', platform: 'globe', url: 'https://merqato.digital', label: 'Read My Blog', clicks: 94, active: true, subtitle: 'Tips, tutorials & personal stories' },
    { id: 'ms6', platform: 'youtube', url: 'https://youtube.com', label: 'Streaming Playlist', clicks: 88, active: true, subtitle: 'Curated OPM & chill vibes' }
  ],
  'bianca.creates': [
    { id: 'b1', platform: 'instagram', url: 'https://instagram.com', label: '@bianca.writes', clicks: 432, active: true },
    { id: 'b2', platform: 'tiktok', url: 'https://tiktok.com', label: '@biancareyes.ugc', clicks: 849, active: true },
    { id: 'b3', platform: 'youtube', url: 'https://youtube.com', label: 'Bianca Creates Vlog', clicks: 210, active: true },
    { id: 'b4', platform: 'globe', url: 'https://merqato.digital', label: 'Official UGC Portfolio', clicks: 125, active: true },
    { id: 'b5', platform: 'email', url: 'mailto:collabs@bianca.creates', label: 'Book a Collaboration', clicks: 94, active: true }
  ],
  'techjuan.ph': [
    { id: 't1', platform: 'youtube', url: 'https://youtube.com', label: 'Tech Juan PH Reviews', clicks: 3120, active: true },
    { id: 't2', platform: 'tiktok', url: 'https://tiktok.com', label: '@techjuan', clicks: 5493, active: true },
    { id: 't3', platform: 'github', url: 'https://github.com', label: 'TechJuan open-source projects', clicks: 420, active: true },
    { id: 't4', platform: 'globe', url: 'https://merqato.digital', label: 'My Desk Setup Gear List', clicks: 1337, active: true }
  ],
  'kiko.eats': [
    { id: 'k1', platform: 'facebook', url: 'https://facebook.com', label: 'Kiko eats Cebu (FB)', clicks: 1540, active: true },
    { id: 'k2', platform: 'instagram', url: 'https://instagram.com', label: '@kiko_eats_cebu', clicks: 928, active: true },
    { id: 'k3', platform: 'email', url: 'mailto:collab@kikoeats.ph', label: 'Catering & Sponsorships', clicks: 82, active: true }
  ]
};

export const INITIAL_GRID_ITEMS: Record<string, GridItem[]> = {
  'mariansantos': [
    { id: 'ms_g1', title: 'Boracay Sunset Vibes', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', price: 'TRAVEL', url: 'https://merqato.digital', clicks: 320 },
    { id: 'ms_g2', title: 'Street Food Adventure', imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80', price: 'FOOD', url: 'https://merqato.digital', clicks: 450 }
  ],
  'bianca.creates': [
    { id: 'bg1', title: 'Aesthetic Lightroom Filter Pack (PH Light)', imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=400&q=80', price: '₱350', url: 'https://shop.merqato.digital/bianca-presets', clicks: 148 },
    { id: 'bg2', title: 'The Ultimate Brand Pitch Decks (PDF Template)', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80', price: '₱750', url: 'https://shop.merqato.digital/pitch-deck-pdf', clicks: 92 },
    { id: 'bg3', title: 'Macro Photography Light Ring (Makati Pickup)', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80', price: '₱1,200', url: 'https://shop.merqato.digital/light-ring', clicks: 231 },
    { id: 'bg4', title: 'Pre-loved Aesthetic Linen Dress (Size S)', imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=400&q=80', price: '₱450', url: 'https://shop.merqato.digital/linen-dress', clicks: 79 }
  ],
  'techjuan.ph': [
    { id: 'tg1', title: '65W GaN Travel Charger (Universal Standard)', imageUrl: 'https://images.unsplash.com/photo-1610940882244-1f7df20274db?auto=format&fit=crop&w=400&q=80', price: '₱899', url: 'https://shopee.ph/example-gan-charger', clicks: 822 },
    { id: 'tg2', title: 'Minimalist Desk felt Pad - Extra Large Black', imageUrl: 'https://images.unsplash.com/photo-1632292224971-0d45778b3002?auto=format&fit=crop&w=400&q=80', price: '₱550', url: 'https://shopee.ph/example-desk-mat', clicks: 319 },
    { id: 'tg3', title: 'RK61 Wireless Mech Keyboard (Lubed Yellow switches)', imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=80', price: '₱2,199', url: 'https://lazada.com.ph/example-rk61', clicks: 1205 }
  ],
  'kiko.eats': [
    { id: 'kg1', title: 'Original "Sili-Sili" Local Hot Sauce (150mL)', imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=400&q=80', price: '₱180', url: 'https://merqato.digital/kiko-eats/sili-silis', clicks: 421 },
    { id: 'kg2', title: 'Cebuano Homecooked Lechon Seasoning Mix 50g', imageUrl: 'https://images.unsplash.com/photo-1601315379734-425a469078de?auto=format&fit=crop&w=400&q=80', price: '₱80', url: 'https://merqato.digital/kiko-eats/lechon-mix', clicks: 504 },
    { id: 'kg3', title: 'Secret Kitchen Guide to Cebuano Cooking (Ebook)', imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', price: '₱299', url: 'https://merqato.digital/kiko-eats/ebook', clicks: 139 }
  ]
};

export const INITIAL_VIDEOS: Record<string, VideoModule> = {
  'mariansantos': {
    enabled: true,
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    title: 'Day in My Life as a Content Creator',
    autoplay: false
  },
  'bianca.creates': {
    enabled: true,
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw', // Aesthetic workspace video placeholder
    title: 'Aesthetic Studio Vlog: Workspace Setup Tour 🌸',
    autoplay: false
  },
  'techjuan.ph': {
    enabled: true,
    videoUrl: 'https://www.youtube.com/embed/g_TfFz8c3R0', // Tech studio unboxing placeholder
    title: 'My Dream $2000 Programming Office Setup',
    autoplay: false
  },
  'kiko.eats': {
    enabled: true,
    videoUrl: 'https://www.youtube.com/embed/6i2m8N9O9R8', // Street food/eating placeholder
    title: 'Searching for the Best Crispy Lechon in Cebu!',
    autoplay: false
  }
};

export const INITIAL_LEADS: Record<string, Lead[]> = {
  'mariansantos': [
    {
      id: 'l_ms1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '09176312456',
      interest: 'Digital Products Discount',
      note: 'Super excited to learn more about your templates. Would love to run some collab setups!',
      marketingConsent: true,
      timestamp: '2026-06-02T12:00:00Z'
    }
  ],
  'bianca.creates': [
    {
      id: 'l1',
      name: 'Althea Constantino',
      email: 'althea.con@gmail.com',
      phone: '09182345566',
      interest: 'Pre-order Planners',
      note: 'When is the physical version of the aesthetic Notion layout launching? Please let me know!',
      marketingConsent: true,
      timestamp: '2026-06-02T14:22:00Z'
    },
    {
      id: 'l2',
      name: 'Mark Ramos',
      email: 'mark.ramos.co@outlook.com',
      phone: '09054778123',
      interest: 'Aesthetic Design Tips',
      note: 'Love the minimalist branding content you post on Threads! Do you accept corporate consulting?',
      marketingConsent: false,
      timestamp: '2026-06-01T09:12:00Z'
    }
  ],
  'techjuan.ph': [
    {
      id: 'l3',
      name: 'Dr. Pepe Rizal',
      email: 'pepe@rizal-univ.edu.ph',
      phone: '09165551896',
      interest: 'Exclusive Tech Giveaways',
      note: 'Interested in reviewing some local gadget mounts. Send details over.',
      marketingConsent: true,
      timestamp: '2026-05-30T11:45:00Z'
    },
    {
      id: 'l4',
      name: 'Angela Velasco',
      email: 'angela_v@gamil.com',
      phone: '09278883344',
      interest: 'Brand Sponsoring / Collabs',
      note: 'Hey Juan. Great setup views! Sharing a proposal from our accessory brand. Let\'s connect!',
      marketingConsent: true,
      timestamp: '2026-06-02T19:05:00Z'
    }
  ],
  'kiko.eats': [
    {
      id: 'l5',
      name: 'Juan Carlos',
      email: 'carlitos.eats@yahoo.com',
      phone: '09995554433',
      interest: 'Food Crawl Invitation',
      note: 'We are opening a new crispy pork shop in Binondo and would love to cover your dining. Free degustation voucher inside!',
      marketingConsent: true,
      timestamp: '2026-05-28T08:30:00Z'
    }
  ]
};

export const INITIAL_TIPS: Record<string, Tip[]> = {
  'mariansantos': [
    { id: 'tp_ms1', donorName: 'Patricia G.', amount: 500, paymentMethod: 'gcash', message: 'You are an inspiration!', timestamp: '2026-06-02T18:30:00Z' }
  ],
  'bianca.creates': [
    { id: 'tp1', donorName: 'Patricia G.', amount: 500, paymentMethod: 'gcash', message: 'Love your aesthetic advice so much!', timestamp: '2026-06-02T18:30:00Z' },
    { id: 'tp2', donorName: 'Ramon S.', amount: 150, paymentMethod: 'maya', message: 'Thanks for the pitch deck template!', timestamp: '2026-06-01T20:15:00Z' }
  ],
  'techjuan.ph': [
    { id: 'tp3', donorName: 'Dev Kyle', amount: 1000, paymentMethod: 'gcash', message: 'Bought the GaN charger from your link. Solid!', timestamp: '2026-06-01T15:20:00Z' },
    { id: 'tp4', donorName: 'Anonymous Pinoy', amount: 300, paymentMethod: 'bank', message: 'Your desk mat looks really dope.', timestamp: '2026-05-29T10:04:00Z' }
  ],
  'kiko.eats': [
    { id: 'tp5', donorName: 'Maria Theresa', amount: 200, paymentMethod: 'gcash', message: 'Gihidlaw nako sa Cebu! Salamaat!', timestamp: '2026-06-02T03:10:00Z' }
  ]
};

export const INITIAL_CUSTOM_LINKS: Record<string, CustomLink[]> = {
  'mariansantos': [
    {
      id: 'cl_ms1',
      title: 'My Personal Portfolio Website',
      subtitle: 'Browse through my photography & digital design case studies',
      url: 'https://mariansantos.digital/portfolio',
      badge: 'HOT 🔥',
      clicks: 142,
      active: true
    },
    {
      id: 'cl_ms2',
      title: 'Latest Content Event Registration',
      subtitle: 'Sign up for the upcoming Quezon City creator intensive meetup',
      url: 'https://mariansantos.digital/workshop',
      badge: 'NEW',
      clicks: 89,
      active: true
    }
  ],
  'bianca.creates': [
    {
      id: 'cl_b1',
      title: 'Macro Lens Gear Kit Recommendations',
      subtitle: 'An exhaustive curated list of affordable camera gears for UGC',
      url: 'https://bianca.creates/gear-bundle',
      badge: 'ACTIVE',
      clicks: 120,
      active: true
    }
  ],
  'techjuan.ph': [
    {
      id: 'cl_t1',
      title: 'My Custom RK61 Layout Presets',
      subtitle: 'Free download links to my custom keyboard illumination map configs',
      url: 'https://techjuan.ph/rk61-layout-presets',
      badge: 'HOT 🔥',
      clicks: 341,
      active: true
    }
  ],
  'kiko.eats': [
    {
      id: 'cl_k1',
      title: 'My Handpicked Cebu Carcar Street Vendors Map',
      subtitle: 'The pinpoint coordinates to find authentic, ultra-crispy chicharon',
      url: 'https://kikoeats.ph/cebu-streetfood-map',
      badge: 'NEW',
      clicks: 412,
      active: true
    }
  ]
};
