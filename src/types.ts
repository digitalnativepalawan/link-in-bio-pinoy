export type PlatformType = 
  | 'instagram' 
  | 'tiktok' 
  | 'youtube' 
  | 'facebook' 
  | 'twitter' 
  | 'github' 
  | 'globe' 
  | 'email' 
  | 'whatsapp'
  | 'linkedin'
  | 'threads'
  | 'polywork'
  | 'discord'
  | 'telegram'
  | 'viber'
  | 'spotify'
  | 'applepodcasts'
  | 'behance'
  | 'dribbble'
  | 'pinterest'
  | 'twitch'
  | 'patreon'
  | 'kofi'
  | 'substack'
  | 'snapchat'
  | 'reddit'
  | 'medium'
  | 'vimeo'
  | 'lemon8'
  | 'mastodon'
  | 'kick'
  | 'onlyfans'
  | 'buymeacoffee';

export interface CreatorProfile {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  location: string;
  themeId: string;
  gcashNumber: string;
  mayaNumber: string;
  gcashQrUrl?: string;
  mayaQrUrl?: string;
  bankName: string;
  bankAccount: string;
  verified: boolean;
  tagline: string;
  followersCount?: string;
  postsCount?: string;
  collabsCount?: string;
  socialAccounts?: Record<string, { url: string; active: boolean }>;
}

export interface CustomLink {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  badge?: string;
  clicks: number;
  active: boolean;
}

export interface SocialLink {
  id: string;
  platform: PlatformType;
  url: string;
  label: string;
  clicks: number;
  active: boolean;
  subtitle?: string;
  tag?: string;
}

export interface GridItem {
  id: string;
  title: string;
  imageUrl: string;
  price?: string;
  url: string;
  clicks: number;
}

export interface VideoModule {
  enabled: boolean;
  videoUrl: string;
  title: string;
  autoplay: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  note?: string;
  marketingConsent?: boolean;
  timestamp: string;
}

export interface Tip {
  id: string;
  donorName: string;
  amount: number;
  paymentMethod: 'gcash' | 'maya' | 'bank';
  message: string;
  timestamp: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  backgroundClass: string; // Tailwind class/styles for atmospheric background
  cardBg: string; // Tailwind glassmorphic class
  textPrimary: string;
  textSecondary: string;
  accentColor: string; // Hex or tailwind class for glowing details
  buttonStyle: string;
  avatarBorder: string;
}

export interface BackgroundPreset {
  id: string;
  name: string;
  url: string;
}

