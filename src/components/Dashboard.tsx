import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  FileText, 
  DollarSign, 
  Users, 
  Sparkles, 
  Plus, 
  Trash2, 
  Eye, 
  Smartphone, 
  Edit3, 
  Copy, 
  TrendingUp, 
  ShieldCheck, 
  RefreshCw, 
  CreditCard, 
  Play, 
  QrCode, 
  Download,
  CheckCircle,
  FileSpreadsheet,
  Globe,
  UserCheck,
  Check,
  Upload,
  Image,
  Sliders,
  Tv,
  ChevronDown,
  ChevronUp,
  Type,
  Layers,
  BarChart3,
  MousePointerClick,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  AlertCircle,
  Sun,
  Moon,
  Monitor,
  Info
} from 'lucide-react';
import { CreatorProfile, SocialLink, GridItem, ThemeConfig, VideoModule, Lead, Tip, CustomLink, BackgroundPreset } from '../types';
import { THEMES } from '../data';
import { generateSecureQrCode } from '../lib/qr';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface DashboardProps {
  backgroundPresets: BackgroundPreset[];
  profile: CreatorProfile;
  setProfile: React.Dispatch<React.SetStateAction<CreatorProfile>>;
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  customLinks: CustomLink[];
  setCustomLinks: React.Dispatch<React.SetStateAction<CustomLink[]>>;
  gridItems: GridItem[];
  setGridItems: React.Dispatch<React.SetStateAction<GridItem[]>>;
  videoModule: VideoModule;
  setVideoModule: React.Dispatch<React.SetStateAction<VideoModule>>;
  leads: Lead[];
  tips: Tip[];
  onTriggerSimulatedTip: () => void;
  onClearLeads: () => void;
  activeTheme: ThemeConfig;
  setActiveTheme: (theme: ThemeConfig) => void;
  onTriggerSimulatedClick: (id: string, type: 'social' | 'grid' | 'custom') => void;
  bgLayout: 'entire' | 'hero';
  setBgLayout: React.Dispatch<React.SetStateAction<'entire' | 'hero'>>;
  bgImage: string;
  setBgImage: React.Dispatch<React.SetStateAction<string>>;
  bgOpacity: number;
  setBgOpacity: React.Dispatch<React.SetStateAction<number>>;
  bgBlur: number;
  setBgBlur: React.Dispatch<React.SetStateAction<number>>;
  bgZoom: number;
  setBgZoom: React.Dispatch<React.SetStateAction<number>>;
  bgPosition: string;
  setBgPosition: React.Dispatch<React.SetStateAction<string>>;
  bgRepeat: boolean;
  setBgRepeat: React.Dispatch<React.SetStateAction<boolean>>;
  bgSize: string;
  setBgSize: React.Dispatch<React.SetStateAction<string>>;
  bgSizePercent: number;
  setBgSizePercent: React.Dispatch<React.SetStateAction<number>>;
  bgPositionX: number;
  setBgPositionX: React.Dispatch<React.SetStateAction<number>>;
  bgPositionY: number;
  setBgPositionY: React.Dispatch<React.SetStateAction<number>>;
  fontPairing: string;
  setFontPairing: React.Dispatch<React.SetStateAction<string>>;
  titleFontSize: number;
  setTitleFontSize: React.Dispatch<React.SetStateAction<number>>;
  bioFontSize: number;
  setBioFontSize: React.Dispatch<React.SetStateAction<number>>;
  letterSpacing: number;
  setLetterSpacing: React.Dispatch<React.SetStateAction<number>>;
  btnStyle: string;
  setBtnStyle: React.Dispatch<React.SetStateAction<string>>;
  cornerRadius: number;
  setCornerRadius: React.Dispatch<React.SetStateAction<number>>;
  cardDensity: string;
  setCardDensity: React.Dispatch<React.SetStateAction<string>>;
  glassBlur: number;
  setGlassBlur: React.Dispatch<React.SetStateAction<number>>;
  cardOpacity: number;
  setCardOpacity: React.Dispatch<React.SetStateAction<number>>;
  borderGlow: boolean;
  setBorderGlow: React.Dispatch<React.SetStateAction<boolean>>;
  profileAlign: string;
  setProfileAlign: React.Dispatch<React.SetStateAction<string>>;
  avatarShape: string;
  setAvatarShape: React.Dispatch<React.SetStateAction<string>>;
  headerStyle: string;
  setHeaderStyle: React.Dispatch<React.SetStateAction<string>>;
  attentionGrabber: string;
  setAttentionGrabber: React.Dispatch<React.SetStateAction<string>>;
  pageTransition: string;
  setPageTransition: React.Dispatch<React.SetStateAction<string>>;
  seoTitle: string;
  setSeoTitle: (title: string) => void;
  seoDescription: string;
  setSeoDescription: (desc: string) => void;
  seoImage: string;
  setSeoImage: (img: string) => void;
}

const ALL_REGISTRY_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', category: 'Social', placeholder: 'https://instagram.com/username' },
  { id: 'tiktok', name: 'TikTok', category: 'Social', placeholder: 'https://tiktok.com/@username' },
  { id: 'youtube', name: 'YouTube', category: 'Social', placeholder: 'https://youtube.com/c/channel' },
  { id: 'facebook', name: 'Facebook', category: 'Social', placeholder: 'https://facebook.com/username' },
  { id: 'twitter', name: 'X (Twitter)', category: 'Social', placeholder: 'https://twitter.com/username' },
  { id: 'threads', name: 'Threads', category: 'Social', placeholder: 'https://threads.net/@username' },
  { id: 'snapchat', name: 'Snapchat', category: 'Social', placeholder: 'https://snapchat.com/add/username' },
  { id: 'lemon8', name: 'Lemon8', category: 'Social', placeholder: 'https://lemon8-app.com/username' },
  { id: 'mastodon', name: 'Mastodon', category: 'Social', placeholder: 'https://mastodon.social/@username' },
  { id: 'linkedin', name: 'LinkedIn', category: 'Professional', placeholder: 'https://linkedin.com/in/username' },
  { id: 'github', name: 'GitHub', category: 'Professional', placeholder: 'https://github.com/username' },
  { id: 'polywork', name: 'Polywork', category: 'Professional', placeholder: 'https://polywork.com/username' },
  { id: 'medium', name: 'Medium', category: 'Professional', placeholder: 'https://medium.com/@username' },
  { id: 'substack', name: 'Substack', category: 'Professional', placeholder: 'https://username.substack.com' },
  { id: 'patreon', name: 'Patreon', category: 'Professional', placeholder: 'https://patreon.com/username' },
  { id: 'kofi', name: 'Ko-fi', category: 'Professional', placeholder: 'https://ko-fi.com/username' },
  { id: 'buymeacoffee', name: 'Buy Me a Coffee', category: 'Professional', placeholder: 'https://buymeacoffee.com/username' },
  { id: 'onlyfans', name: 'OnlyFans', category: 'Professional', placeholder: 'https://onlyfans.com/username' },
  { id: 'discord', name: 'Discord', category: 'Community & Chat', placeholder: 'https://discord.gg/invite' },
  { id: 'telegram', name: 'Telegram', category: 'Community & Chat', placeholder: 'https://t.me/username' },
  { id: 'whatsapp', name: 'WhatsApp', category: 'Community & Chat', placeholder: 'https://wa.me/number' },
  { id: 'viber', name: 'Viber', category: 'Community & Chat', placeholder: 'viber://chat?number=number' },
  { id: 'reddit', name: 'Reddit', category: 'Community & Chat', placeholder: 'https://reddit.com/user/username' },
  { id: 'spotify', name: 'Spotify Music', category: 'Media & Streaming', placeholder: 'https://open.spotify.com/artist/id' },
  { id: 'applepodcasts', name: 'Apple Podcasts', category: 'Media & Streaming', placeholder: 'https://podcasts.apple.com/us/podcast/id' },
  { id: 'behance', name: 'Behance', category: 'Media & Streaming', placeholder: 'https://behance.net/username' },
  { id: 'dribbble', name: 'Dribbble', category: 'Media & Streaming', placeholder: 'https://dribbble.com/username' },
  { id: 'pinterest', name: 'Pinterest', category: 'Media & Streaming', placeholder: 'https://pinterest.com/username' },
  { id: 'twitch', name: 'Twitch', category: 'Media & Streaming', placeholder: 'https://twitch.tv/username' },
  { id: 'vimeo', name: 'Vimeo', category: 'Media & Streaming', placeholder: 'https://vimeo.com/username' },
  { id: 'kick', name: 'Kick', category: 'Media & Streaming', placeholder: 'https://kick.com/username' },
];

interface SeoPreviewHubProps {
  seoTitle: string;
  seoDescription: string;
  seoImage: string;
  username: string;
}

function SeoPreviewHub({ seoTitle, seoDescription, seoImage, username }: SeoPreviewHubProps) {
  const [previewTab, setPreviewTab] = useState<'google' | 'facebook' | 'twitter' | 'imessage'>('google');

  // fallback images
  const sampleImage = seoImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80";

  return (
    <div className="bg-zinc-900/60 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-zinc-850">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5 justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Shared Preview</span>
          </div>
          <span className="text-[9px] text-zinc-500 font-mono">Simulated</span>
        </h4>
        <p className="text-[10px] text-zinc-400 mt-1">Select a context format to view how your shared URL customizes page metadata.</p>
      </div>

      {/* Selector Tabs */}
      <div className="flex bg-zinc-950 p-1 font-mono text-[9px] border-b border-zinc-850 gap-0.5">
        {[
          { id: 'google', label: '🔍 Search snippet' },
          { id: 'facebook', label: '📘 Facebook' },
          { id: 'twitter', label: '🐦 X / Twitter' },
          { id: 'imessage', label: '💬 Messages' }
        ].map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setPreviewTab(t.id as any)}
            className={`flex-1 py-1 px-1.5 text-center font-extrabold rounded-md transition-all cursor-pointer truncate ${
              previewTab === t.id ? 'bg-zinc-805 text-white bg-zinc-800 border border-zinc-700/50 shadow-xs' : 'text-zinc-500 hover:text-zinc-300'
            }`}
            id={`preview-tab-${t.id}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Viewport Content */}
      <div className="p-4 bg-zinc-950/20 min-h-[220px] flex items-center justify-center">
        
        {/* GOOGLE PREVIEW */}
        {previewTab === 'google' && (
          <div className="bg-white text-slate-800 p-4 rounded-xl shadow-md border border-slate-200/80 w-full max-w-sm space-y-1 font-sans">
            <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 font-normal truncate">
              <span className="font-semibold text-slate-700">https://merqa.to</span>
              <span>›</span>
              <span className="text-slate-400">{username}</span>
            </div>
            <h5 className="text-[16px] text-[#1a0dab] font-normal hover:underline cursor-pointer leading-tight font-sans">
              {seoTitle || 'My Link-in-Bio Profile'}
            </h5>
            <p className="text-[11.5px] text-slate-600 leading-normal font-normal line-clamp-3">
              {seoDescription || 'Discover all my feeds, digital storefront, tip jars, content collection hub, and updates in one place.'}
            </p>
          </div>
        )}

        {/* FACEBOOK PREVIEW */}
        {previewTab === 'facebook' && (
          <div className="bg-white text-slate-900 rounded-xl overflow-hidden border border-slate-200/80 shadow-md w-full max-w-sm font-sans">
            <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden border-b border-slate-200/40">
              <img src={sampleImage} alt="Social Card" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="p-3 bg-[#f2f3f5] space-y-1 border-t border-slate-200/20">
              <span className="text-[9.5px] text-slate-400 uppercase tracking-wider font-mono font-bold">MERQA.TO</span>
              <h5 className="text-[13px] font-bold text-slate-900 leading-snug truncate">
                {seoTitle || 'My Link-in-Bio Profile'}
              </h5>
              <p className="text-[10.5px] text-slate-500 line-clamp-1">
                {seoDescription || 'Discover all my feeds, digital storefront, tip jars, content collection hub, and updates in one place.'}
              </p>
            </div>
          </div>
        )}

        {/* TWITTER PREVIEW */}
        {previewTab === 'twitter' && (
          <div className="bg-black text-white rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl w-full max-w-sm font-sans flex flex-col">
            <div className="relative aspect-[16/9] bg-zinc-900 overflow-hidden">
              <img src={sampleImage} alt="Social Card" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="p-3 bg-zinc-900/60 space-y-0.5 border-t border-zinc-800/80">
              <span className="text-[11px] text-zinc-500 font-normal">merqa.to</span>
              <h5 className="text-[13px] font-bold text-zinc-100 leading-snug truncate">
                {seoTitle || 'My Link-in-Bio Profile'}
              </h5>
              <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                {seoDescription || 'Discover all my feeds, digital storefront, tip jars, content collection hub, and updates in one place.'}
              </p>
            </div>
          </div>
        )}

        {/* IMESSAGE PREVIEW */}
        {previewTab === 'imessage' && (
          <div className="bg-[#e9e9eb] text-black rounded-3xl p-3 pb-3.5 w-full max-w-sm font-sans shadow-md relative">
            <div className="bg-[#f1f1f2] rounded-2xl overflow-hidden border border-zinc-200/50 flex flex-col">
              <div className="aspect-[16/9] bg-white overflow-hidden relative border-b border-zinc-200/30">
                <img src={sampleImage} alt="Bubble" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="p-3 space-y-1">
                <div className="flex items-center gap-1">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-[7px] text-white font-extrabold font-mono">M</div>
                  <span className="text-[9.5px] text-zinc-400 font-semibold uppercase tracking-wider font-mono">merqa.to</span>
                </div>
                <h5 className="text-[12px] font-bold text-black leading-snug truncate">
                  {seoTitle || 'My Link-in-Bio Profile'}
                </h5>
                <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed font-normal">
                  {seoDescription || 'Discover all my feeds, digital storefront, tip jars, content collection hub, and updates in one place.'}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      <div className="p-3 bg-zinc-950 border-t border-zinc-850/80 flex items-center gap-2">
        <Info size={12} className="text-emerald-400 shrink-0" />
        <span className="text-[9.5px] text-zinc-400 leading-normal">
          Check each platform option to verify title/description fit and visual image boundaries. Let's keep images widescreen (1.91:1 ratio ideal).
        </span>
      </div>
    </div>
  );
}

export default function Dashboard({
  backgroundPresets,
  profile,
  setProfile,
  socialLinks,
  setSocialLinks,
  customLinks,
  setCustomLinks,
  gridItems,
  setGridItems,
  videoModule,
  setVideoModule,
  leads,
  tips,
  onTriggerSimulatedTip,
  onClearLeads,
  activeTheme,
  setActiveTheme,
  onTriggerSimulatedClick,
  bgLayout,
  setBgLayout,
  bgImage,
  setBgImage,
  bgOpacity,
  setBgOpacity,
  bgBlur,
  setBgBlur,
  bgZoom,
  setBgZoom,
  bgPosition,
  setBgPosition,
  bgRepeat,
  setBgRepeat,
  bgSize,
  setBgSize,
  bgSizePercent,
  setBgSizePercent,
  bgPositionX,
  setBgPositionX,
  bgPositionY,
  setBgPositionY,
  fontPairing,
  setFontPairing,
  titleFontSize,
  setTitleFontSize,
  bioFontSize,
  setBioFontSize,
  letterSpacing,
  setLetterSpacing,
  btnStyle,
  setBtnStyle,
  cornerRadius,
  setCornerRadius,
  cardDensity,
  setCardDensity,
  glassBlur,
  setGlassBlur,
  cardOpacity,
  setCardOpacity,
  borderGlow,
  setBorderGlow,
  profileAlign,
  setProfileAlign,
  avatarShape,
  setAvatarShape,
  headerStyle,
  setHeaderStyle,
  attentionGrabber,
  setAttentionGrabber,
  pageTransition,
  setPageTransition,
  seoTitle,
  setSeoTitle,
  seoDescription,
  setSeoDescription,
  seoImage,
  setSeoImage
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'links' | 'monetization' | 'leads' | 'design' | 'analytics' | 'seo'>('profile');
  
  const [dashboardTheme, setDashboardTheme] = useState<'system' | 'dark' | 'light'>(() => {
    return (localStorage.getItem('merqato_dashboard_theme') as 'system' | 'dark' | 'light') || 'system';
  });

  const [isSystemLight, setIsSystemLight] = useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-color-scheme: light)');
    setIsSystemLight(media.matches);
    
    const listener = (e: MediaQueryListEvent) => setIsSystemLight(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const isLightMode = dashboardTheme === 'light' || (dashboardTheme === 'system' && isSystemLight);

  const handleThemeChange = (theme: 'system' | 'dark' | 'light') => {
    setDashboardTheme(theme);
    localStorage.setItem('merqato_dashboard_theme', theme);
  };

  const [expandedSection, setExpandedSection] = useState<'typography' | 'cards' | 'headers' | 'animations' | null>('typography');
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState<7 | 14 | 30>(7);
  
  // Local form state for adding links
  const [newLinkPlatform, setNewLinkPlatform] = useState<SocialLink['platform']>('instagram');
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // Local form state for adding grid products
  const [newGridTitle, setNewGridTitle] = useState('');
  const [newGridPrice, setNewGridPrice] = useState('₱');
  const [newGridUrl, setNewGridUrl] = useState('');
  const [newGridImage, setNewGridImage] = useState('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=400&q=80');

  // Copied GCash wallet code helper
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Local form state for adding Custom Web Links (Website Builder)
  const [newCustomLinkTitle, setNewCustomLinkTitle] = useState('');
  const [newCustomLinkSubtitle, setNewCustomLinkSubtitle] = useState('');
  const [newCustomLinkUrl, setNewCustomLinkUrl] = useState('');
  const [newCustomLinkBadge, setNewCustomLinkBadge] = useState('None');
  const [customBadgeText, setCustomBadgeText] = useState('');

  // Local state for platform directory search / selector overlay
  const [platformSearchQuery, setPlatformSearchQuery] = useState('');
  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false);

  // Web image URL import state
  const [webImageUrlInput, setWebImageUrlInput] = useState('');
  const [downloadingUrlStatus, setDownloadingUrlStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Backdrop downloader custom rendering representation
  const handleDownloadBackdrop = () => {
    if (!bgImage) return;
    
    // Create an image element securely
    const imgElement = window.document.createElement('img');
    imgElement.crossOrigin = 'anonymous';
    imgElement.onload = () => {
      const canvas = window.document.createElement('canvas');
      const isHero = bgLayout === 'hero';
      canvas.width = isHero ? 1200 : 1080;
      canvas.height = isHero ? 450 : 1920;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Default dark fill
      ctx.fillStyle = '#0a0a0c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const zoomScale = bgZoom === 0 ? 0.5 : bgZoom / 100;
      let drawW = canvas.width;
      let drawH = canvas.height;
      let drawX = 0;
      let drawY = 0;
      
      const imgWidth = imgElement.naturalWidth || imgElement.width || 800;
      const imgHeight = imgElement.naturalHeight || imgElement.height || 600;
      
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvas.width / canvas.height;
      if (bgSize === 'cover') {
        if (imgRatio > canvasRatio) {
          drawH = canvas.height;
          drawW = canvas.height * imgRatio;
          const excessW = drawW - canvas.width;
          drawX = -excessW * (bgPositionX / 100);
          drawY = 0;
        } else {
          drawW = canvas.width;
          drawH = canvas.width / imgRatio;
          const excessH = drawH - canvas.height;
          drawX = 0;
          drawY = -excessH * (bgPositionY / 100);
        }
      } else if (bgSize === 'contain') {
        if (imgRatio > canvasRatio) {
          drawW = canvas.width;
          drawH = canvas.width / imgRatio;
          const unusedH = canvas.height - drawH;
          drawX = 0;
          drawY = unusedH * (bgPositionY / 100);
        } else {
          drawH = canvas.height;
          drawW = canvas.height * imgRatio;
          const unusedW = canvas.width - drawW;
          drawX = unusedW * (bgPositionX / 100);
          drawY = 0;
        }
      } else {
        drawW = imgWidth * (bgSizePercent / 100);
        drawH = imgHeight * (bgSizePercent / 100);
        drawX = (canvas.width - drawW) * (bgPositionX / 100);
        drawY = (canvas.height - drawH) * (bgPositionY / 100);
      }
      
      try {
        ctx.drawImage(imgElement, drawX, drawY, drawW, drawH);
      } catch (err) {
        console.warn('Canvas direct drawing failed, fallback solid fill used', err);
      }
      
      // Paint translucence tint overlay
      if (bgOpacity > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${bgOpacity / 100})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      try {
        const link = window.document.createElement('a');
        link.download = isHero ? 'merqato-hero-cover-layout.png' : 'merqato-full-background-layout.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        const win = window.open();
        if (win) win.document.write(`<img src="${canvas.toDataURL()}" alt="Custom background" />`);
      }
    };
    imgElement.src = bgImage;
  };

  // Add a new custom website link
  const handleAddCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomLinkTitle || !newCustomLinkUrl) return;

    let targetUrl = newCustomLinkUrl.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    const finalBadge = newCustomLinkBadge === 'Custom' ? customBadgeText.trim() : (newCustomLinkBadge === 'None' ? '' : newCustomLinkBadge);

    const newLink: CustomLink = {
      id: 'custom-web-' + Date.now(),
      title: newCustomLinkTitle.trim(),
      subtitle: newCustomLinkSubtitle.trim() || undefined,
      url: targetUrl,
      badge: finalBadge || undefined,
      clicks: 0,
      active: true
    };

    setCustomLinks(prev => [...prev, newLink]);

    // Reset fields
    setNewCustomLinkTitle('');
    setNewCustomLinkSubtitle('');
    setNewCustomLinkUrl('');
    setNewCustomLinkBadge('None');
    setCustomBadgeText('');
  };

  // Remove a custom website link
  const handleRemoveCustomLink = (id: string) => {
    setCustomLinks(prev => prev.filter(cl => cl.id !== id));
  };

  // Toggle active status for custom website link
  const handleToggleCustomLinkActive = (id: string) => {
    setCustomLinks(prev => prev.map(cl => cl.id === id ? { ...cl, active: !cl.active } : cl));
  };

  // Move a custom website link (Reordering up/down)
  const handleMoveCustomLink = (index: number, direction: 'up' | 'down') => {
    setCustomLinks(prev => {
      const result = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= result.length) return prev;
      
      const temp = result[index];
      result[index] = result[targetIndex];
      result[targetIndex] = temp;
      return result;
    });
  };

  // Activate platform in social accounts registry
  const handleActivatePlatform = (platformId: string) => {
    setProfile(prev => {
      const socialAccounts = prev.socialAccounts || {};
      return {
        ...prev,
        socialAccounts: {
          ...socialAccounts,
          [platformId]: {
            url: socialAccounts[platformId]?.url || '',
            active: true
          }
        }
      };
    });
    setIsPlatformDropdownOpen(false);
    setPlatformSearchQuery('');
  };

  // Deactivate/hide platform in social accounts registry
  const handleDeactivatePlatform = (platformId: string) => {
    setProfile(prev => {
      const socialAccounts = prev.socialAccounts || {};
      return {
        ...prev,
        socialAccounts: {
          ...socialAccounts,
          [platformId]: {
            ...socialAccounts[platformId],
            active: false
          }
        }
      };
    });
  };

  // Update specific platform URL
  const handleUpdateSocialUrl = (platformId: string, url: string) => {
    setProfile(prev => {
      const socialAccounts = prev.socialAccounts || {};
      return {
        ...prev,
        socialAccounts: {
          ...socialAccounts,
          [platformId]: {
            ...(socialAccounts[platformId] || { active: true }),
            url: url
          }
        }
      };
    });
  };

  // Quick preset avatar images
  const AVATAR_PRESETS = [
    { name: 'Aesthetic Light', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    { name: 'Creative Guy', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { name: 'Chef Vibe', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Brand Minimalist', url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80' }
  ];

  const handleCopyField = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(fieldId);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  // Add a new social link
  const handleAddSocialLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkLabel || !newLinkUrl) return;
    
    // Auto-fix layout URLs
    let linkUrl = newLinkUrl;
    if (!/^https?:\/\//i.test(linkUrl) && !/^mailto:/i.test(linkUrl)) {
      linkUrl = 'https://' + linkUrl;
    }

    const newLink: SocialLink = {
      id: 'custom-' + Date.now(),
      platform: newLinkPlatform,
      label: newLinkLabel,
      url: linkUrl,
      clicks: 0,
      active: true
    };

    setSocialLinks([...socialLinks, newLink]);
    setNewLinkLabel('');
    setNewLinkUrl('');
  };

  // Delete social link
  const handleDeleteSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter(l => l.id !== id));
  };

  // Add new Commerce Grid Item
  const handleAddGridItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGridTitle || !newGridUrl) return;

    let linkUrl = newGridUrl;
    if (!/^https?:\/\//i.test(linkUrl)) {
      linkUrl = 'https://' + linkUrl;
    }

    const newItem: GridItem = {
      id: 'grid-' + Date.now(),
      title: newGridTitle,
      price: newGridPrice || undefined,
      imageUrl: newGridImage,
      url: linkUrl,
      clicks: 0
    };

    setGridItems([...gridItems, newItem]);
    setNewGridTitle('');
    setNewGridPrice('₱');
    setNewGridUrl('');
  };

  // Delete grid product
  const handleDeleteGridItem = (id: string) => {
    setGridItems(gridItems.filter(g => g.id !== id));
  };

  // Calculate earnings total
  const totalEarnings = tips.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div 
      className={`flex flex-col border rounded-2xl overflow-hidden h-full transition-all duration-300 ${
        isLightMode 
          ? 'merqato-theme-light bg-slate-50 border-slate-200 text-slate-800' 
          : 'merqato-theme-dark bg-[#070709] border-zinc-800 text-zinc-100'
      }`} 
      id="merqato-admin-panel"
    >
      
      {/* Top Banner Administration */}
      <div className={`p-4 border-b flex justify-between items-center flex-wrap gap-2 transition-colors duration-300 ${
        isLightMode ? 'bg-white border-slate-200' : 'bg-zinc-950 border-zinc-800'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-tr from-indigo-500 to-rose-500 rounded-xl p-2 select-none">
            <span className="font-extrabold text-xs tracking-widest text-white">M</span>
          </div>
          <div>
            <div className={`text-xs font-mono flex items-center gap-1 ${isLightMode ? 'text-slate-500' : 'text-zinc-400'}`}>
              Active Server node <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            </div>
            <h2 className={`text-sm font-bold tracking-tight ${isLightMode ? 'text-slate-800' : 'text-white'}`}>Merqato PH Sovereign Console</h2>
          </div>
        </div>

        {/* Global Controls & Theme Switcher Segmented Control */}
        <div className="flex items-center gap-3.5 flex-wrap">
          <button className="hidden" /> {/* Fix matching tag alignment if needed */}
          
          {/* Segmented Theme Picker */}
          <div 
            className={`flex items-center rounded-xl p-1 border transition-colors duration-300 ${
              isLightMode ? 'bg-slate-100/85 border-slate-200' : 'bg-zinc-900/95 border-zinc-800'
            }`} 
            id="global-theme-toggle-group"
          >
            {[
              { id: 'system', label: 'System', icon: Monitor },
              { id: 'light', label: 'Light', icon: Sun },
              { id: 'dark', label: 'Dark', icon: Moon }
            ].map((t) => {
              const Icon = t.icon;
              const active = dashboardTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                    active 
                      ? isLightMode 
                        ? 'bg-white text-slate-900 font-extrabold shadow-sm border border-slate-200' 
                        : 'bg-zinc-800 text-white font-extrabold shadow-[0_2px_8px_rgba(0,0,0,0.15)] border-t border-white/5' 
                      : isLightMode 
                        ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50' 
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-850/50'
                  }`}
                  id={`theme-btn-${t.id}`}
                  title={`Switch editing interface to ${t.label} mode`}
                >
                  <Icon size={12} className={active ? 'text-emerald-500' : ''} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Localized verification security indicator */}
          <div className={`flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-xl border transition-colors duration-300 ${
            isLightMode ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-zinc-900 border-zinc-800 text-zinc-300'
          }`}>
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Self-Hosted Secured</span>
          </div>
        </div>
      </div>

      {/* Mini metrics bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-zinc-800/80 bg-zinc-900/35">
        <div className="p-4 border-r border-zinc-850 text-center sm:text-left select-none">
          <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Tipping Supports</div>
          <p className="text-lg font-black text-emerald-400 mt-1">₱{totalEarnings.toLocaleString()}</p>
        </div>
        <div className="p-4 border-r border-zinc-850 text-center sm:text-left select-none">
          <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Subscribers Captured</div>
          <p className="text-lg font-black text-indigo-400 mt-1">{leads.length} contacts</p>
        </div>
        <div className="p-4 border-r border-zinc-850 text-center sm:text-left select-none">
          <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Platform Links</div>
          <p className="text-lg font-black text-amber-500 mt-1">{socialLinks.length + gridItems.length} modules</p>
        </div>
        <div className="p-4 text-center sm:text-left select-none">
          <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Merchant Wallet ID</div>
          <p className="text-xs font-mono text-zinc-400 truncate mt-1">
            {profile.gcashNumber ? 'GCash Configured' : 'No Wallets'}
          </p>
        </div>
      </div>

      {/* Tab Navigation Controls */}
      <div className="flex overflow-x-auto bg-zinc-950 p-2 gap-1 scrollbar-none border-b border-zinc-800">
        {[
          { id: 'profile', label: 'Profile Bio', icon: Settings },
          { id: 'links', label: 'Feeds & Commerce', icon: FileText },
          { id: 'monetization', label: 'Tipping & Income', icon: DollarSign },
          { id: 'leads', label: 'Captured Leads', icon: Users },
          { id: 'design', label: 'Aesthetics', icon: Sparkles },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'seo', label: 'SEO & Social', icon: Globe }
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-2 px-4 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                activeTab === tab.id
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
              id={`tab-button-${tab.id}`}
            >
              <IconComponent size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dashboard Editor Workspace */}
      <div className="flex-1 overflow-y-auto p-5 md:p-6" id="dashboard-tab-viewport">
        <AnimatePresence mode="wait">
          
          {/* PROFILE CREATOR TAB */}
          {activeTab === 'profile' && (
            <motion.div
              key="tab-profile"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Creator Profile Specifications</h3>
                <p className="text-xs text-zinc-400">Configure visual branding parameters displayed on your Link-in-Bio profile.</p>
              </div>

              {/* Avatar Selector and Presets */}
              <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 space-y-4">
                <label className="block text-xs font-medium text-zinc-300">Profile Representative Avatar</label>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-800 border-2 border-zinc-700 overflow-hidden shrink-0">
                    <img src={profile.avatarUrl} alt="Vibe Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-1 min-w-[200px]">
                    <input
                      type="text"
                      value={profile.avatarUrl}
                      onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                      placeholder="Paste Image URL or select preset below..."
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-xs text-zinc-200 focus:border-zinc-700 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Preset Avatars */}
                <div className="pt-2">
                  <p className="text-[10px] text-zinc-500 font-mono mb-2 uppercase tracking-wide">Or choose a Philippine creator template</p>
                  <div className="flex gap-2 flex-wrap">
                    {AVATAR_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          const associatedCreator = p.name === 'Aesthetic Light' 
                            ? 'bianca.creates' 
                            : p.name === 'Creative Guy' 
                            ? 'techjuan.ph' 
                            : p.name === 'Chef Vibe' 
                            ? 'kiko.eats' 
                            : 'bianca.creates';
                          
                          setProfile({
                            ...profile,
                            avatarUrl: p.url,
                            displayName: p.name === 'Aesthetic Light' ? 'Bianca Reyes' : p.name === 'Creative Guy' ? 'Tech Juan' : p.name === 'Chef Vibe' ? 'Kiko Eats Cebu' : 'Minimalist Brand',
                            tagline: p.name === 'Aesthetic Light' ? 'UGC Content Creator & Esthetic Enthusiast 🌸' : p.name === 'Creative Guy' ? 'Unboxing the future of Philippine Tech ⚡' : p.name === 'Chef Vibe' ? 'Street Food Archaeologist & Cebuano Chef 🌶' : 'Curated premium designs'
                          });
                        }}
                        className="flex items-center gap-1.5 py-1 px-2 border border-zinc-800 hover:border-zinc-700 rounded-lg bg-zinc-950 text-[10px] text-zinc-300 transition-colors"
                      >
                        <span className="w-4 h-4 rounded-full bg-cover overflow-hidden" style={{ backgroundImage: `url('${p.url}')` }} />
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form entries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Creator Display Name</label>
                  <input
                    type="text"
                    value={profile.displayName}
                    onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white focus:border-zinc-700 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Specialized Tagline Accent</label>
                  <input
                    type="text"
                    value={profile.tagline}
                    onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white focus:border-zinc-700 focus:outline-hidden"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Profile Bio Description</label>
                  <textarea
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white focus:border-zinc-700 focus:outline-hidden resize-none"
                    placeholder="Provide a description of who you are and what your products showcase..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Localized Region Territory</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-xs text-white focus:border-zinc-700 focus:outline-hidden"
                  />
                </div>

                {/* Verified Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/30">
                  <div>
                    <span className="block text-xs font-medium text-zinc-300">Merqato Verified Badge</span>
                    <span className="text-[10px] text-zinc-500">Toggles B2B credential badge beside name</span>
                  </div>
                  <button
                    onClick={() => setProfile({ ...profile, verified: !profile.verified })}
                    className={`h-5 w-10 rounded-full p-0.5 transition-colors relative ${profile.verified ? 'bg-emerald-500' : 'bg-zinc-700'}`}
                    id="toggle-verified-badge"
                  >
                    <div className={`h-4 w-4 rounded-full bg-white transition-transform ${profile.verified ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              {/* SOCIAL ACCOUNTS REGISTRY MANAGER */}
              <div className="mt-8 pt-6 border-t border-zinc-850">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h4 className="text-xs font-extrabold text-white tracking-wider uppercase flex items-center gap-1.5">
                      <Sparkles size={14} className="text-amber-400 animate-pulse" /> Social Accounts Registry
                    </h4>
                    <p className="text-[11px] text-zinc-500">Toggle platforms on/off and configure active channel handles or profile links.</p>
                  </div>
                  
                  {/* Search Platform Dropdown Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsPlatformDropdownOpen(!isPlatformDropdownOpen)}
                      className="py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-bold text-white hover:bg-zinc-850 flex items-center gap-1.5 cursor-pointer"
                      id="studio-add-platform-trigger"
                    >
                      <span>Add Social Platform</span>
                      <Plus size={12} className="text-amber-400" />
                    </button>

                    {/* Popover list of platform cards */}
                    {isPlatformDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl z-50 p-3 max-h-96 overflow-y-auto">
                        <input
                          type="text"
                          placeholder="Search platforms (e.g., GitHub, Pinterest, Spotify)..."
                          value={platformSearchQuery}
                          onChange={(e) => setPlatformSearchQuery(e.target.value)}
                          className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-2 text-xs text-white mb-2 focus:outline-hidden"
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="space-y-3">
                          {['Social', 'Professional', 'Community & Chat', 'Media & Streaming'].map(category => {
                            const matching = ALL_REGISTRY_PLATFORMS.filter(p => 
                              p.category === category && 
                              p.name.toLowerCase().includes(platformSearchQuery.toLowerCase()) && 
                              !profile.socialAccounts?.[p.id]?.active
                            );
                            if (matching.length === 0) return null;
                            return (
                              <div key={category} className="space-y-1">
                                <span className="block text-[8px] font-mono tracking-widest text-zinc-500 uppercase">{category}</span>
                                <div className="grid grid-cols-1 gap-1">
                                  {matching.map(platform => (
                                    <button
                                      key={platform.id}
                                      type="button"
                                      onClick={() => handleActivatePlatform(platform.id)}
                                      className="w-full text-left p-1.5 rounded-lg hover:bg-zinc-900 text-xs text-zinc-350 transition-all flex items-center justify-between cursor-pointer"
                                    >
                                      <span>{platform.name}</span>
                                      <span className="text-[9px] bg-zinc-900 border border-zinc-850 text-indigo-400 font-bold px-1.5 rounded">Activate</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                          
                          {ALL_REGISTRY_PLATFORMS.filter(p => !profile.socialAccounts?.[p.id]?.active).length === 0 && (
                            <p className="text-[10px] text-zinc-500 italic text-center py-2">All platforms already activated!</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Listing Active Cards and inputs */}
                <div className="grid grid-cols-1 gap-4">
                  {!profile.socialAccounts || ALL_REGISTRY_PLATFORMS.filter(p => profile.socialAccounts?.[p.id]?.active).length === 0 ? (
                    <div className="p-6 text-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/20">
                      <p className="text-xs text-zinc-550 italic">No social accounts connected yet. Click "Add Social Platform" above to instantly link your handles!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ALL_REGISTRY_PLATFORMS.filter(p => profile.socialAccounts?.[p.id]?.active).map(platform => {
                        const accountInfo = profile.socialAccounts?.[platform.id] || { url: '', active: true };
                        return (
                          <div
                            key={platform.id}
                            className="p-3 bg-zinc-900/30 border border-zinc-800 rounded-xl space-y-2 flex flex-col justify-between"
                            id={`registry-card-${platform.id}`}
                          >
                            <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-white capitalize">{platform.name}</span>
                                <span className="text-[8px] tracking-wide text-zinc-450 bg-zinc-900/80 border border-zinc-800 px-1.5 py-0.5 rounded font-mono uppercase">{platform.category}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleDeactivatePlatform(platform.id)}
                                className="text-[10px] text-zinc-500 hover:text-rose-400 font-mono font-bold cursor-pointer"
                              >
                                Deactivate
                              </button>
                            </div>

                            <div className="space-y-1">
                              <span className="block text-[9px] font-semibold text-zinc-500 uppercase">Redirect URL Handle:</span>
                              <input
                                type="text"
                                placeholder={platform.placeholder}
                                value={accountInfo.url}
                                onChange={(e) => handleUpdateSocialUrl(platform.id, e.target.value)}
                                className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2 text-white focus:border-zinc-700 focus:outline-hidden"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* LINKS & FEEDS COMMERCE TAB */}
          {activeTab === 'links' && (
            <motion.div
              key="tab-links"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Product Grid Commerce */}
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Commerce Grid Settings & Products</h3>
                <p className="text-xs text-zinc-400">Products display inside the immersive swipable social-commerce container.</p>
              </div>

              {/* Add New Product Block */}
              <form onSubmit={handleAddGridItem} className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 space-y-3">
                <p className="text-xs font-semibold text-amber-400 font-mono">➕ Add Product / Service</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Product Title (e.g. Lightroom Presets 5-Pack)"
                    required
                    value={newGridTitle}
                    onChange={(e) => setNewGridTitle(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-xs text-white focus:border-zinc-700 focus:outline-hidden"
                  />
                  <input
                    type="text"
                    placeholder="Price tag (e.g. ₱350, ₱1,200)"
                    value={newGridPrice}
                    onChange={(e) => setNewGridPrice(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-xs text-white focus:border-zinc-700 focus:outline-hidden"
                  />
                  <input
                    type="text"
                    placeholder="Checkout / Destination URL"
                    required
                    value={newGridUrl}
                    onChange={(e) => setNewGridUrl(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-xs text-white focus:border-zinc-700 focus:outline-hidden"
                  />
                  
                  {/* Photo selector for demo */}
                  <select
                    value={newGridImage}
                    onChange={(e) => setNewGridImage(e.target.value)}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-xs text-zinc-300 focus:border-zinc-700 focus:outline-hidden"
                  >
                    <option value="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=400&q=80">Preset: Camera & Filter Lens</option>
                    <option value="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80">Preset: Laptop Design Studio</option>
                    <option value="https://images.unsplash.com/photo-1610940882244-1f7df20274db?auto=format&fit=crop&w=400&q=80">Preset: Tech Electronics</option>
                    <option value="https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=400&q=80">Preset: Spicy Sauce / Food Craft</option>
                  </select>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-bold text-[11px] text-zinc-950 flex items-center gap-1 cursor-pointer"
                    id="add-product-submit"
                  >
                    <Plus size={12} /> Add to Commerce Feed
                  </button>
                </div>
              </form>

              {/* Grid List Products */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-zinc-300">Active Commerce Products ({gridItems.length})</p>
                {gridItems.length === 0 ? (
                  <p className="text-[11px] text-zinc-500 italic p-3 text-center rounded-lg border border-zinc-850/50 bg-black/10">No commerce products listed in feed.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {gridItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/40">
                        <div className="flex items-center gap-2 max-w-[70%]">
                          <img src={item.imageUrl} alt={item.title} className="w-9 h-9 object-cover rounded-md" referrerPolicy="no-referrer" />
                          <div>
                            <span className="block text-xs font-semibold text-white truncate">{item.title}</span>
                            <span className="text-[10px] font-mono text-emerald-400">{item.price || 'No Price'}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2.5">
                          {/* Live Track counter badge */}
                          <span className="text-[10px] font-mono bg-zinc-950 px-2 py-1 rounded border border-zinc-800 flex items-center gap-1">
                            <Eye size={10} className="text-zinc-500" /> {item.clicks} clicks
                          </span>
                          <button
                            onClick={() => handleDeleteGridItem(item.id)}
                            className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                            title="Delete Product"
                            id={`delete-product-${item.id}`}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* INLINE VIDEO CHANNEL */}
              <div className="pt-4 border-t border-zinc-800/80">
                <h4 className="text-xs font-bold text-white mb-2">Inline Video Stream Settings</h4>
                <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-medium text-zinc-300">Enable Media Frame</span>
                      <span className="text-[10px] text-zinc-500">Allows direct inline plays on profile</span>
                    </div>
                    <button
                      onClick={() => setVideoModule({ ...videoModule, enabled: !videoModule.enabled })}
                      className={`h-5 w-10 rounded-full p-0.5 transition-colors relative ${videoModule.enabled ? 'bg-indigo-500' : 'bg-zinc-700'}`}
                      id="toggle-video-block"
                    >
                      <div className={`h-4 w-4 rounded-full bg-white transition-transform ${videoModule.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {videoModule.enabled && (
                    <div className="grid grid-cols-1 gap-3 pt-2 border-t border-zinc-850">
                      <div>
                        <label className="block text-[10px] text-zinc-400 mb-1">Embedded Stream URL (YouTube Embed)</label>
                        <input
                          type="text"
                          value={videoModule.videoUrl}
                          onChange={(e) => setVideoModule({ ...videoModule, videoUrl: e.target.value })}
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-xs text-white focus:outline-hidden"
                          placeholder="e.g., https://www.youtube.com/embed/jNQXAC9IVRw"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-zinc-400 mb-1">Video Stream Overlay Title</label>
                        <input
                          type="text"
                          value={videoModule.title}
                          onChange={(e) => setVideoModule({ ...videoModule, title: e.target.value })}
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-xs text-white focus:outline-hidden"
                          placeholder="e.g., Aesthetic Studio Vlog Workspace Setup Tour"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* GENERAL CUSTOM WEB LINKS & WEBSITE BUILDER SECTION */}
              <div className="pt-6 border-t border-zinc-800/80">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">General Custom Web Links (Website Builder)</h3>
                  <p className="text-xs text-zinc-400">Add dynamic, fully re-orderable custom website redirects or standard banner call-to-actions.</p>
                </div>

                {/* Form to append a custom redirect link */}
                <form onSubmit={handleAddCustomLink} className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 space-y-3 mt-4">
                  <p className="text-xs font-semibold text-emerald-400 font-mono flex items-center gap-1">✨ Add Custom Link Button</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1">Link Title / Main CTA Label</label>
                      <input
                        type="text"
                        placeholder="e.g., My Portfolio Website"
                        required
                        value={newCustomLinkTitle}
                        onChange={(e) => setNewCustomLinkTitle(e.target.value)}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-xs text-white focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1">Subtitle / Supporting Description</label>
                      <input
                        type="text"
                        placeholder="e.g., Read my brand setup specs"
                        value={newCustomLinkSubtitle}
                        onChange={(e) => setNewCustomLinkSubtitle(e.target.value)}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-xs text-white focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-400 mb-1">Destination URL</label>
                      <input
                        type="text"
                        placeholder="e.g., marian-santos.digital"
                        required
                        value={newCustomLinkUrl}
                        onChange={(e) => setNewCustomLinkUrl(e.target.value)}
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-xs text-white focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-zinc-405 mb-1">Status Badge Label</label>
                      <div className="flex gap-2">
                        <select
                          value={newCustomLinkBadge}
                          onChange={(e) => setNewCustomLinkBadge(e.target.value)}
                          className="flex-1 rounded-lg border border-zinc-805 bg-zinc-950 p-2 text-xs text-zinc-300 focus:outline-hidden"
                        >
                          <option value="None">No Badge</option>
                          <option value="HOT 🔥">HOT 🔥</option>
                          <option value="NEW">NEW</option>
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="Custom">Custom Text...</option>
                        </select>
                        {newCustomLinkBadge === 'Custom' && (
                          <input
                            type="text"
                            placeholder="Custom tag"
                            value={customBadgeText}
                            onChange={(e) => setCustomBadgeText(e.target.value)}
                            className="flex-1 rounded-lg border border-zinc-850 bg-zinc-950 p-2 text-xs text-white focus:outline-hidden"
                            required
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-bold text-[11px] text-zinc-950 flex items-center gap-1 cursor-pointer"
                      id="add-custom-link-submit"
                    >
                      <Plus size={12} /> Add Custom Link
                    </button>
                  </div>
                </form>

                {/* Displaying listing array blocks with Up/Down Arrows */}
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-zinc-300">Active Custom Links Directory ({customLinks.length})</p>
                  {customLinks.length === 0 ? (
                    <p className="text-[11px] text-zinc-500 italic p-3 text-center rounded-lg border border-zinc-850/50 bg-black/10">No website builder links configured yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {customLinks.map((cl, index) => (
                        <div key={cl.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/10 gap-3">
                          <div className="flex flex-col max-w-[65%] min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-extrabold text-white leading-none truncate">{cl.title}</span>
                              {cl.badge && (
                                <span className="text-[8px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">{cl.badge}</span>
                              )}
                            </div>
                            {cl.subtitle && (
                              <span className="text-[10px] text-zinc-450 mt-1 leading-snug">{cl.subtitle}</span>
                            )}
                            <span className="text-[9px] text-zinc-500 truncate font-mono mt-0.5">{cl.url}</span>
                          </div>

                          <div className="flex items-center gap-2 justify-end shrink-0">
                            {/* Reordering buttons Up / Down */}
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => handleMoveCustomLink(index, 'up')}
                              className={`p-1 px-1.5 rounded bg-zinc-950 border border-zinc-850 hover:bg-zinc-900 text-[10px] text-zinc-400 font-bold transition-all ${index === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                              title="Move Link Up"
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              disabled={index === customLinks.length - 1}
                              onClick={() => handleMoveCustomLink(index, 'down')}
                              className={`p-1 px-1.5 rounded bg-zinc-950 border border-zinc-850 hover:bg-zinc-900 text-[10px] text-zinc-400 font-bold transition-all ${index === customLinks.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                              title="Move Link Down"
                            >
                              ▼
                            </button>

                            {/* View link clicks count telemetry */}
                            <span className="text-[10px] font-mono bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 flex items-center gap-1 select-none text-zinc-400">
                              <Eye size={10} className="text-zinc-500" /> {cl.clicks}
                            </span>

                            {/* Toggle active status */}
                            <button
                              type="button"
                              onClick={() => handleToggleCustomLinkActive(cl.id)}
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${cl.active ? 'border-emerald-500/20 bg-emerald-600/10 text-emerald-400' : 'border-zinc-800 bg-zinc-950 text-zinc-500'} cursor-pointer`}
                            >
                              {cl.active ? 'Visible' : 'Hidden'}
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveCustomLink(cl.id)}
                              className="p-1 px-1.5 text-zinc-500 hover:text-rose-450 transition-colors cursor-pointer"
                              title="Delete Link"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* SOCIAL BUTTON LINKS */}
              <div className="pt-6 border-t border-zinc-800/80">
                <h4 className="text-xs font-bold text-white mb-2">Standard Profile Redirect Links Mapping</h4>
                
                {/* Form to append link */}
                <form onSubmit={handleAddSocialLink} className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <select
                      value={newLinkPlatform}
                      onChange={(e) => setNewLinkPlatform(e.target.value as any)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-xs text-zinc-300 focus:outline-hidden"
                    >
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="youtube">YouTube</option>
                      <option value="facebook">Facebook</option>
                      <option value="twitter">X (Twitter)</option>
                      <option value="threads">Threads</option>
                      <option value="snapchat">Snapchat</option>
                      <option value="lemon8">Lemon8</option>
                      <option value="mastodon">Mastodon</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="github">GitHub</option>
                      <option value="polywork">Polywork</option>
                      <option value="medium">Medium</option>
                      <option value="substack">Substack</option>
                      <option value="patreon">Patreon</option>
                      <option value="kofi">Ko-fi</option>
                      <option value="buymeacoffee">Buy Me a Coffee</option>
                      <option value="onlyfans">OnlyFans</option>
                      <option value="discord">Discord</option>
                      <option value="telegram">Telegram</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="viber">Viber</option>
                      <option value="reddit">Reddit</option>
                      <option value="spotify">Spotify</option>
                      <option value="applepodcasts">Apple Podcasts</option>
                      <option value="behance">Behance</option>
                      <option value="dribbble">Dribbble</option>
                      <option value="pinterest">Pinterest</option>
                      <option value="twitch">Twitch</option>
                      <option value="vimeo">Vimeo</option>
                      <option value="kick">Kick</option>
                      <option value="globe">Personal Website</option>
                      <option value="email">Email address</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Title Label (e.g. Read Blog)"
                      required
                      value={newLinkLabel}
                      onChange={(e) => setNewLinkLabel(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-xs text-white focus:outline-hidden"
                    />

                    <input
                      type="text"
                      placeholder="Destination Link Url"
                      required
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-xs text-white focus:outline-hidden"
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="py-1.5 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 font-bold text-[11px] text-white flex items-center gap-1 cursor-pointer"
                      id="add-social-submit"
                    >
                      <Plus size={12} /> Add Link mapping
                    </button>
                  </div>
                </form>

                {/* Listing */}
                <div className="mt-3 space-y-2">
                  {socialLinks.map((link) => (
                    <div key={link.id} className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/20">
                      <div className="flex items-center gap-2 max-w-[65%] truncate">
                        <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 capitalize py-0.5 px-2 rounded-sm select-none shrink-0">{link.platform}</span>
                        <span className="text-xs font-semibold text-white truncate">{link.label}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono bg-zinc-950 px-2 py-1 rounded border border-zinc-800 flex items-center gap-1">
                          <Eye size={10} className="text-zinc-500" /> {link.clicks} clicks
                        </span>
                        
                        {/* Toggle active state */}
                        <button
                          onClick={() => {
                            setSocialLinks(socialLinks.map(l => l.id === link.id ? { ...l, active: !l.active } : l));
                          }}
                          className={`text-[10px] font-semibold px-2 py-1 rounded border ${link.active ? 'border-indigo-500/20 bg-indigo-600/10 text-indigo-400' : 'border-zinc-800 bg-zinc-900 text-zinc-500'}`}
                        >
                          {link.active ? 'Enabled' : 'Hidden'}
                        </button>

                        <button
                          onClick={() => handleDeleteSocialLink(link.id)}
                          className="p-1 px-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                          title="Delete Link"
                          id={`delete-link-${link.id}`}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* MONETIZATION DIRECT TIPS TAB */}
          {activeTab === 'monetization' && (
            <motion.div
              key="tab-monetization"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Direct Tipping & Self-Checkout configuration</h3>
                <p className="text-xs text-zinc-400">Configure GCash and Maya direct wallets to capture support contributions from Philippine fans.</p>
              </div>

              {/* Wallet configuration form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800">
                
                {/* GCash Module */}
                <div className="space-y-3.5 p-4 rounded-xl bg-zinc-950/40 border border-zinc-850">
                  <div>
                    <label className="block text-xs font-semibold text-blue-400 flex items-center gap-1.5 mb-1.5">
                      GCash Registered Number 🇵🇭
                    </label>
                    <input
                      type="text"
                      value={profile.gcashNumber}
                      onChange={(e) => setProfile({ ...profile, gcashNumber: e.target.value })}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 font-mono text-xs text-white focus:outline-hidden"
                      placeholder="e.g., 0917 123 4567"
                    />
                  </div>

                  <div className="pt-1.5 border-t border-zinc-900">
                    <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                      GCash Secure QR Code
                    </label>
                    
                    <div className="flex items-center gap-3">
                      {profile.gcashQrUrl ? (
                        <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950/80 p-1 flex items-center justify-center group">
                          <img src={profile.gcashQrUrl} className="h-full w-full object-contain" alt="GCash QR" />
                          <button
                            type="button"
                            onClick={() => setProfile({ ...profile, gcashQrUrl: '' })}
                            className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[9px] text-rose-400 font-extrabold font-mono transition-opacity cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="h-16 w-16 rounded-xl border border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/20">
                          <QrCode size={20} className="stroke-current" />
                          <span className="text-[8px] font-mono">No QR</span>
                        </div>
                      )}

                      <div className="flex flex-col gap-1.5">
                        <input
                          type="file"
                          accept="image/*"
                          id="dashboard-gcash-qr"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setProfile({ ...profile, gcashQrUrl: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <div className="flex gap-1.5">
                          <label
                            htmlFor="dashboard-gcash-qr"
                            className="py-1 px-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10.5px] font-mono font-bold text-zinc-350 hover:text-white rounded-lg cursor-pointer transition-colors"
                          >
                            Upload File
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const secureCode = generateSecureQrCode(profile.displayName, profile.gcashNumber || '0917 123 4567', 'GCash');
                              setProfile({ ...profile, gcashQrUrl: secureCode });
                            }}
                            className="py-1 px-2.5 bg-blue-500/10 hover:bg-blue-500/25 border border-blue-500/20 text-[10.5px] font-mono font-bold text-blue-400 rounded-lg cursor-pointer transition-colors"
                          >
                            Generate Vector QR
                          </button>
                        </div>
                        <span className="text-[9px] text-zinc-500 font-sans leading-tight">
                          Drag &amp; drop or upload your personal QR code file, or auto-generate a secure scanner graphic.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maya Module */}
                <div className="space-y-3.5 p-4 rounded-xl bg-zinc-950/40 border border-zinc-855">
                  <div>
                    <label className="block text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                      Maya Registered Phone 📱
                    </label>
                    <input
                      type="text"
                      value={profile.mayaNumber}
                      onChange={(e) => setProfile({ ...profile, mayaNumber: e.target.value })}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 font-mono text-xs text-white focus:outline-hidden"
                      placeholder="e.g., 0917 123 4567"
                    />
                  </div>

                  <div className="pt-1.5 border-t border-zinc-900">
                    <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">
                      Maya Secure QR Code
                    </label>
                    
                    <div className="flex items-center gap-3">
                      {profile.mayaQrUrl ? (
                        <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950/80 p-1 flex items-center justify-center group">
                          <img src={profile.mayaQrUrl} className="h-full w-full object-contain" alt="Maya QR" />
                          <button
                            type="button"
                            onClick={() => setProfile({ ...profile, mayaQrUrl: '' })}
                            className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[9px] text-rose-400 font-extrabold font-mono transition-opacity cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="h-16 w-16 rounded-xl border border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/20">
                          <QrCode size={20} className="stroke-current" />
                          <span className="text-[8px] font-mono">No QR</span>
                        </div>
                      )}

                      <div className="flex flex-col gap-1.5">
                        <input
                          type="file"
                          accept="image/*"
                          id="dashboard-maya-qr"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setProfile({ ...profile, mayaQrUrl: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <div className="flex gap-1.5">
                          <label
                            htmlFor="dashboard-maya-qr"
                            className="py-1 px-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[10.5px] font-mono font-bold text-zinc-350 hover:text-white rounded-lg cursor-pointer transition-colors"
                          >
                            Upload File
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const secureCode = generateSecureQrCode(profile.displayName, profile.mayaNumber || '0917 123 4567', 'Maya');
                              setProfile({ ...profile, mayaQrUrl: secureCode });
                            }}
                            className="py-1 px-2.5 bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/20 text-[10.5px] font-mono font-bold text-emerald-450 rounded-lg cursor-pointer transition-colors"
                          >
                            Generate Vector QR
                          </button>
                        </div>
                        <span className="text-[9px] text-zinc-500 font-sans leading-tight">
                          Drag &amp; drop or upload your personal QR code file, or auto-generate a secure scanner graphic.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-500 mb-1.5">InstaPay Bank Entity</label>
                  <input
                    type="text"
                    value={profile.bankName}
                    onChange={(e) => setProfile({ ...profile, bankName: e.target.value })}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-xs text-white focus:outline-hidden"
                    placeholder="e.g., BDO Unibank, UnionBank"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-500 mb-1.5 font-mono">Bank Account Code</label>
                  <input
                    type="text"
                    value={profile.bankAccount}
                    onChange={(e) => setProfile({ ...profile, bankAccount: e.target.value })}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 font-mono text-xs text-white focus:outline-hidden"
                    placeholder="e.g., 1234-5678-9012"
                  />
                </div>
              </div>

              {/* Simulation Sandbox Button */}
              <div className="bg-indigo-950/20 border border-indigo-700/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="block text-xs font-bold text-white">🎭 Simulated Tipping Sandbox</span>
                  <span className="text-[11px] text-indigo-200">Generate a realistic ₱PHP tip to verify visual notifications on mobile preview.</span>
                </div>
                <button
                  type="button"
                  onClick={onTriggerSimulatedTip}
                  className="py-2 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-xs shrink-0 flex items-center gap-1 cursor-pointer"
                  id="sandbox-tip-trigger"
                >
                  <Sparkles size={13} /> Simulation Test Tip
                </button>
              </div>

              {/* Tips history */}
              <div className="space-y-3">
                <div className="flex justify-between items-center select-none">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Recent Fan Tributes History</h4>
                  <span className="text-[10px] font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-zinc-400">GCash/Maya/Instapay</span>
                </div>

                {tips.length === 0 ? (
                  <p className="text-[11px] text-zinc-500 italic p-3 text-center rounded-lg border border-zinc-850/50 bg-black/10">No payments captured today.</p>
                ) : (
                  <div className="space-y-2 max-h-[220px] overflow-y-auto">
                    {[...tips].reverse().map((t) => (
                      <div key={t.id} className="p-3.5 rounded-xl border border-zinc-850 bg-zinc-900/30 flex justify-between items-center flex-wrap gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="font-extrabold text-white">{t.donorName}</span>
                            <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-black/40 text-zinc-400 capitalize border border-zinc-800">
                              {t.paymentMethod}
                            </span>
                          </div>
                          {t.message && <p className="text-[11px] text-zinc-300 italic">"{t.message}"</p>}
                          <span className="text-[9px] text-zinc-650 font-mono italic block">{new Date(t.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <span className="text-sm font-black text-emerald-400 font-mono">
                          ₱{t.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

            {/* CAPTURED LEADS CODES */}
          {activeTab === 'leads' && (() => {
            // Calculate summary stats
            const totalLeads = leads.length;
            const consentedCount = leads.filter(l => l.marketingConsent !== false).length;
            const consentPct = totalLeads > 0 ? Math.round((consentedCount / totalLeads) * 100) : 0;

            // Calculate top interest segment
            const interestMap: Record<string, number> = {};
            leads.forEach(l => {
              const cat = l.interest || 'Newsletter & General Updates';
              interestMap[cat] = (interestMap[cat] || 0) + 1;
            });
            let topInterest = 'Updates';
            let maxCount = 0;
            Object.entries(interestMap).forEach(([k, v]) => {
              if (v > maxCount) {
                maxCount = v;
                topInterest = k;
              }
            });

            // Shorten interest label for quick badges
            const getShortInterest = (fullStr: string) => {
              if (fullStr.includes('Discount')) return 'Promo / Offer';
              if (fullStr.includes('Pre-order')) return 'Product Launch';
              if (fullStr.includes('Collab')) return 'Brand Partnership';
              if (fullStr.includes('Beta')) return 'Product Tester';
              return 'General News';
            };

            // Comprehensive CSV formatter including newly captured attributes
            const handleExportCSV = () => {
              const headers = 'Name,Email,Phone,Interest Chosen,Message Note,Marketing Consent,Date Registered\n';
              const rows = leads.map(l => {
                const escapedName = `"${(l.name || '').replace(/"/g, '""')}"`;
                const escapedEmail = `"${(l.email || '').replace(/"/g, '""')}"`;
                const escapedPhone = `"${(l.phone || '').replace(/"/g, '""')}"`;
                const escapedInterest = `"${(l.interest || 'Newsletter & General Updates').replace(/"/g, '""')}"`;
                const escapedNote = `"${(l.note || '').replace(/"/g, '""')}"`;
                const consentStr = l.marketingConsent !== false ? 'YES' : 'NO';
                const dateStr = `"${new Date(l.timestamp).toLocaleString('en-PH')}"`;
                return `${escapedName},${escapedEmail},${escapedPhone},${escapedInterest},${escapedNote},${consentStr},${dateStr}`;
              }).join('\n');
              
              handleCopyField(headers + rows, 'csv');
            };

            return (
              <motion.div
                key="tab-leads"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-850 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      👥 Fan Lead Subscriber CRM Database
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      Manage client prospects, newsletter signups, and custom project collaboration queries captured in real-time.
                    </p>
                  </div>
                  {totalLeads > 0 && (
                    <button
                      onClick={onClearLeads}
                      className="py-1.5 px-3 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 hover:text-red-300 rounded-lg text-xs font-semibold font-mono transition-colors cursor-pointer"
                    >
                      Clear Database
                    </button>
                  )}
                </div>

                {totalLeads === 0 ? (
                  <div className="text-center py-12 border border-zinc-850 border-dashed rounded-2xl bg-zinc-950/30 space-y-3">
                    <Users size={32} className="mx-auto text-zinc-600 animate-pulse" />
                    <p className="text-xs text-zinc-400 font-medium">No captured subscriber profiles yet.</p>
                    <p className="text-[11px] text-zinc-500 max-w-sm mx-auto leading-relaxed">
                      Fans joining your Inner Circle via the interactive Mobile Simulation will show up with contact coordinates, select interests, and personal requests.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Database Micro Statistics cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-zinc-900/40 p-4 border border-zinc-850 rounded-xl space-y-1.5">
                        <span className="text-[9.5px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase">Subscribers</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-white">{totalLeads}</span>
                          <span className="text-[10px] text-emerald-400 font-bold">Live CRM</span>
                        </div>
                        <p className="text-[9px] text-zinc-500 font-mono">Real-time captured rows</p>
                      </div>

                      <div className="bg-zinc-900/40 p-4 border border-zinc-850 rounded-xl space-y-1.5">
                        <span className="text-[9.5px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase">Promotional Opt-In</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl font-extrabold text-indigo-400">{consentPct}%</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold font-mono">High Consent</span>
                        </div>
                        <p className="text-[9px] text-zinc-500 font-mono">Explicit consent given</p>
                      </div>

                      <div className="bg-zinc-900/40 p-4 border border-zinc-850 rounded-xl space-y-1.5">
                        <span className="text-[9.5px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase">Hot Interest Segment</span>
                        <div className="truncate">
                          <span className="text-[12.5px] font-bold text-amber-400 block truncate" title={topInterest}>
                            {getShortInterest(topInterest)}
                          </span>
                          <span className="text-[10px] font-medium text-zinc-400 block">
                            {maxCount} {maxCount === 1 ? 'signup' : 'signups'}
                          </span>
                        </div>
                        <p className="text-[9px] text-zinc-500 font-mono">Highest engagement filter</p>
                      </div>
                    </div>

                    {/* Export spreadsheet actions bar */}
                    <div className="flex items-center justify-between bg-zinc-950 p-3 rounded-xl border border-zinc-850">
                      <span className="text-[11px] font-mono text-zinc-400 font-semibold">
                        Registered Records Grid • {totalLeads} entries ready
                      </span>
                      <button
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 text-xs text-indigo-400 tracking-wide font-mono transition-colors cursor-pointer"
                      >
                        {copiedAccount === 'csv' ? (
                          <>
                            <Check size={12} className="text-emerald-400" />
                            Copied Rich CSV to Clipboard!
                          </>
                        ) : (
                          <>
                            <FileSpreadsheet size={13} />
                            Export Rich Subscriber CRM CSV
                          </>
                        )}
                      </button>
                    </div>

                    {/* Highly aesthetic subscriber details feed */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {leads.map((lead, index) => {
                        const isMarketingConsent = lead.marketingConsent !== false;
                        return (
                          <div
                            key={lead.id}
                            className="bg-zinc-900/35 border border-zinc-850 hover:border-zinc-800 rounded-xl p-4.5 space-y-4 transition-all flex flex-col justify-between"
                          >
                            <div className="space-y-3.5">
                              {/* Header Meta Row */}
                              <div className="flex items-start justify-between gap-2.5">
                                <div className="space-y-0.5">
                                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5 max-w-[180px] truncate" title={lead.name}>
                                    {lead.name}
                                  </h4>
                                  <span className="text-[9px] font-mono text-zinc-500">
                                    Row #{index + 1} • {new Date(lead.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </span>
                                </div>

                                {/* Consent Label Badge */}
                                {isMarketingConsent ? (
                                  <span className="text-[8.5px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-900/20 text-emerald-400 border border-emerald-900/40 flex items-center gap-1 select-none shrink-0">
                                    <CheckCircle size={9} />
                                    Adv Promo
                                  </span>
                                ) : (
                                  <span className="text-[8.5px] font-bold font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-800 flex items-center gap-1 select-none shrink-0" title="This fan opted out of third-party promotional newsletters. Only email directly for essential services.">
                                    <AlertCircle size={9} />
                                    No Opt-In
                                  </span>
                                )}
                              </div>

                              {/* Chosen Interest Highlight Tag */}
                              <div className="flex items-center gap-1.5">
                                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest shrink-0">Goal:</div>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/15 truncate block max-w-full">
                                  {lead.interest || 'Newsletter & General Updates'}
                                </span>
                              </div>

                              {/* Contact Information Coordinates */}
                              <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-900 grid grid-cols-1 gap-2.5">
                                {/* Email Row */}
                                <div className="flex items-center justify-between text-xs font-mono">
                                  <div className="flex items-center gap-2 text-zinc-400 truncate">
                                    <Mail size={11} className="text-purple-400 shrink-0" />
                                    <span className="truncate select-all text-[11px]">{lead.email}</span>
                                  </div>
                                  <button
                                    onClick={() => handleCopyField(lead.email, `email-${lead.id}`)}
                                    className="p-1 px-1.5 hover:bg-zinc-850 rounded text-zinc-500 hover:text-white transition-colors cursor-pointer shrink-0"
                                    title="Copy Email"
                                  >
                                    {copiedAccount === `email-${lead.id}` ? (
                                      <Check size={10} className="text-emerald-400 font-bold" />
                                    ) : (
                                      <Copy size={10} />
                                    )}
                                  </button>
                                </div>

                                {/* Phone Row */}
                                <div className="flex items-center justify-between text-xs font-mono">
                                  <div className="flex items-center gap-2 text-zinc-450 truncate">
                                    <Phone size={11} className="text-[#ff007f] shrink-0" />
                                    <span className="text-[11px] truncate">
                                      {lead.phone ? `+63 ${lead.phone}` : 'No phone provided'}
                                    </span>
                                  </div>
                                  {lead.phone && (
                                    <button
                                      onClick={() => handleCopyField(lead.phone || '', `phone-${lead.id}`)}
                                      className="p-1 px-1.5 hover:bg-zinc-850 rounded text-zinc-500 hover:text-white transition-colors cursor-pointer shrink-0"
                                      title="Copy Phone"
                                    >
                                      {copiedAccount === `phone-${lead.id}` ? (
                                        <Check size={10} className="text-emerald-400 font-bold" />
                                      ) : (
                                        <Copy size={10} />
                                      )}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Optional Custom Note Quote Block */}
                            {lead.note ? (
                              <div className="mt-3.5 pt-3.5 border-t border-zinc-900">
                                <div className="flex items-start gap-1.5 text-[10px] text-zinc-500 font-mono mb-1">
                                  <MessageSquare size={9} className="text-indigo-400 mt-0.5 shrink-0" />
                                  <span>Inquiry / Message Note:</span>
                                </div>
                                <p className="text-[11px] text-zinc-300 italic bg-zinc-950/30 p-2.5 rounded-lg border border-zinc-850 leading-relaxed max-w-full overflow-hidden break-words">
                                  "{lead.note}"
                                </p>
                              </div>
                            ) : (
                              <div className="mt-3.5 pt-3.5 border-t border-zinc-900 text-center">
                                <span className="text-[9.5px] font-mono text-zinc-650 italic">Subscriber left no custom note</span>
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })()}

          {/* DESIGN GLASSMORPHISM THEMES TAB */}
          {activeTab === 'design' && (
            <motion.div
              key="tab-design"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-7"
            >
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Aesthetics & Layout Designer</h3>
                <p className="text-xs text-zinc-400">Customize the background layout style, upload custom artwork downloaded from your device, modify tints, and select colors.</p>
              </div>

              {/* SECTION 1: WALLPAPER LAYOUT STYLE */}
              <div className="bg-zinc-950/60 p-5 rounded-2xl border border-zinc-900 space-y-4 relative group/tooltip-wallpaper">
                <div className="flex items-center gap-2 cursor-help">
                  <Tv size={16} className="text-emerald-400 shrink-0" />
                  <span className="text-xs font-extrabold text-zinc-200 tracking-wider font-mono flex items-center gap-1">
                    <span>1. WALLPAPER DISPLAY STYLE LAYOUT</span>
                    <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors`} />
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Choose how your customized artwork presents itself. You can immerse the whole bio backdrop or mount it as a beautiful widescreen cover banner behind your avatar.
                </p>
                {/* Tooltip Content */}
                <div className={`invisible opacity-0 group-hover/tooltip-wallpaper:visible group-hover/tooltip-wallpaper:opacity-100 group-hover/tooltip-wallpaper:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                  isLightMode 
                    ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                    : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                }`}>
                  <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                  Entire Background creates an immersive background behind everything on mobile. Hero Cover Banner limits the image to a top widescreen graphic context.
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <button
                    onClick={() => setBgLayout('entire')}
                    className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                      bgLayout === 'entire'
                        ? 'border-emerald-500 bg-emerald-500/5 text-white'
                        : 'border-zinc-850 bg-zinc-900/40 text-zinc-400 hover:border-zinc-800'
                    }`}
                    id="design-layout-entire"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <Smartphone size={16} className={bgLayout === 'entire' ? 'text-emerald-400' : 'text-zinc-500'} />
                      <span className="text-xs font-bold font-sans">Entire Background</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 block">Fullscreen backdrop covering the entire viewport.</span>
                  </button>

                  <button
                    onClick={() => setBgLayout('hero')}
                    className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                      bgLayout === 'hero'
                        ? 'border-emerald-500 bg-emerald-500/5 text-white'
                        : 'border-zinc-850 bg-zinc-900/40 text-zinc-400 hover:border-zinc-800'
                    }`}
                    id="design-layout-hero"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <Tv size={16} className={bgLayout === 'hero' ? 'text-emerald-400' : 'text-zinc-500'} />
                      <span className="text-xs font-bold font-sans">Hero Cover Banner</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 block">Banner mounted exclusively at the top behind your avatar.</span>
                  </button>
                </div>
              </div>

              {/* SECTION 2: DOWNLOADING/UPLOADING CUSTOM DECORATIVE IMAGES & PRESETS */}
              <div className="bg-zinc-950/60 p-5 rounded-2xl border border-zinc-900 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image size={16} className="text-emerald-400" />
                    <span className="text-xs font-extrabold text-zinc-200 tracking-wider font-mono">2. CUSTOM IMAGE & WALLPAPER WALL</span>
                  </div>
                  {bgImage && (
                    <button
                      type="button"
                      onClick={() => setBgImage('')}
                      className="text-[9px] font-mono uppercase bg-red-500/10 hover:bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20 cursor-pointer"
                    >
                      Reset Image
                    </button>
                  )}
                </div>

                {/* OPTION A: PASTE WEB LINK / URL */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase">Option A: Paste & download image link from web</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Paste image link (e.g. https://images.unsplash.com/photo-...)"
                      value={webImageUrlInput}
                      onChange={(e) => {
                        setWebImageUrlInput(e.target.value);
                        setDownloadingUrlStatus('idle');
                      }}
                      className="flex-1 bg-zinc-950 border border-zinc-850 text-[11px] text-zinc-200 placeholder-zinc-650 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const trimmed = webImageUrlInput.trim();
                        if (trimmed) {
                          setBgImage(trimmed);
                          setDownloadingUrlStatus('success');
                        } else {
                          setDownloadingUrlStatus('error');
                        }
                      }}
                      className="px-3.5 py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-emerald-400 font-bold hover:text-white rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors select-none"
                    >
                      <Download size={13} />
                      Set Wallpaper
                    </button>
                  </div>
                  {downloadingUrlStatus === 'success' && (
                    <span className="text-[9.5px] font-semibold text-emerald-400 block animate-fadeIn">✓ Web URL downloaded and loaded successfully!</span>
                  )}
                  {downloadingUrlStatus === 'error' && (
                    <span className="text-[9.5px] font-semibold text-red-400 block animate-fadeIn">⚠ Please paste a valid image URL first</span>
                  )}
                </div>

                {/* SEPARATOR OR LINE */}
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-zinc-900"></div>
                  <span className="flex-shrink mx-3 text-[9px] font-mono font-extrabold text-zinc-650 uppercase">Or</span>
                  <div className="flex-grow border-t border-zinc-900"></div>
                </div>

                {/* OPTION B: DEVICE DRAG & DROP UPLOADER CONTAINER */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase">Option B: Upload downloaded image from device</label>
                  <div className="border border-dashed border-zinc-850 rounded-xl p-5 bg-zinc-950 hover:bg-zinc-900/30 hover:border-zinc-700 transition-all text-center flex flex-col items-center justify-center relative cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              setBgImage(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                      id="local-image-input"
                    />
                    
                    <div className="space-y-1.5 pointer-events-none">
                      <Upload size={20} className="mx-auto text-emerald-400 group-hover:scale-110 transition-transform" />
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-zinc-200">Load photo from computer/phone</p>
                        <p className="text-[10px] text-zinc-500">Pick any image currently saved on your device</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live upload thumbnail & DOWNLOAD CURRENT BACKGROUND BUTTON */}
                {bgImage && (
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-900/50 p-3 rounded-xl border border-zinc-850 animate-fadeIn">
                      <div className="flex items-center gap-3">
                        <img src={bgImage} className="w-12 h-12 rounded object-cover border border-white/10" alt="Wallpaper Preview" referrerPolicy="no-referrer" />
                        <div className="text-left select-none text-[10px] overflow-hidden">
                          <span className="text-emerald-400 font-bold block">✓ CURRENTLY ACTIVE</span>
                          <span className="text-zinc-400 block truncate">Using custom background</span>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleDownloadBackdrop}
                        className="px-3.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500 hover:text-black hover:font-black text-emerald-400 rounded-lg border border-emerald-500/20 text-xs flex items-center justify-center gap-2 cursor-pointer transition-all uppercase font-mono font-extrabold select-none hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-pulse"
                        title="Download the custom wallpaper preview image directly to your device"
                      >
                        <Download size={14} />
                        Download Backdrop File
                      </button>
                    </div>

                    {/* WALLPAPER TAILORING ENGINE (SLIDERS & TOGGLE) */}
                    <div className="space-y-3.5 p-4 rounded-xl bg-zinc-900/40 border border-zinc-850 animate-fadeIn">
                      <span className="text-[10px] font-mono tracking-wider font-extrabold text-zinc-300 uppercase flex items-center gap-1.5 border-b border-zinc-900 pb-2">
                        <Sliders size={13} className="text-emerald-400" />
                        Wallpaper Alignment & Size Engine
                      </span>

                      {/* Fit Style Toggle */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10.5px] font-mono font-bold">
                          <span className={isLightMode ? 'text-slate-600' : 'text-zinc-400'}>Fit Sizing Style:</span>
                          <span className="text-emerald-400 uppercase text-[9.5px] font-mono">{bgSize}</span>
                        </div>
                        <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-900">
                          {['cover', 'contain', 'custom'].map((mode) => (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => setBgSize(mode)}
                              className={`flex-1 text-center py-1.5 rounded-lg text-[10px] font-mono font-extrabold transition-all cursor-pointer ${
                                bgSize === mode
                                  ? 'bg-zinc-805 bg-zinc-800 text-emerald-405 text-emerald-400 shadow-sm border border-zinc-900/40'
                                  : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              {mode.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sizing Percentage Slider */}
                      {bgSize === 'custom' && (
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10.5px] font-mono font-bold">
                            <span className={isLightMode ? 'text-slate-600' : 'text-zinc-400'}>Wallpaper Scale Sizing:</span>
                            <span className="text-emerald-400">{bgSizePercent}%</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="300"
                            value={bgSizePercent}
                            onChange={(e) => setBgSizePercent(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                          />
                        </div>
                      )}

                      {/* Object Alignment offsets */}
                      <div className="space-y-2.5">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[10.5px] font-mono font-bold">
                              <span className={isLightMode ? 'text-slate-600' : 'text-zinc-400'}>Align Offset X:</span>
                              <span className="text-emerald-400">{bgPositionX}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={bgPositionX}
                              onChange={(e) => setBgPositionX(Number(e.target.value))}
                              className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[10.5px] font-mono font-bold">
                              <span className={isLightMode ? 'text-slate-600' : 'text-zinc-400'}>Align Offset Y:</span>
                              <span className="text-emerald-400">{bgPositionY}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={bgPositionY}
                              onChange={(e) => setBgPositionY(Number(e.target.value))}
                              className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Dark overlay dimming & soft blur sliders */}
                      <div className="grid grid-cols-2 gap-3 border-t border-zinc-900 pt-2.5">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                            <span className={isLightMode ? 'text-slate-600' : 'text-zinc-400'}>Dim Overlay:</span>
                            <span className="text-emerald-400">{bgOpacity}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={bgOpacity}
                            onChange={(e) => setBgOpacity(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                            <span className={isLightMode ? 'text-slate-600' : 'text-zinc-400'}>Blur Wallpaper:</span>
                            <span className="text-emerald-400">{bgBlur}px</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="20"
                            value={bgBlur}
                            onChange={(e) => setBgBlur(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PRESET AESTHETIC BACKGROUNDS */}
                <div className="space-y-2 pt-1 border-t border-zinc-900">
                  <label className="block text-[10px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase">Or select a curated Philippine-themed template preset:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {backgroundPresets.map((pw) => (
                      <button
                        key={pw.id}
                        type="button"
                        onClick={() => setBgImage(pw.url)}
                        className={`text-[10px] py-1.5 px-2 rounded-lg border text-center transition-all truncate cursor-pointer ${
                          bgImage === pw.url
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                            : 'border-zinc-850 bg-zinc-950 text-zinc-400 hover:text-zinc-200 hover:border-zinc-850'
                        }`}
                      >
                        {pw.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 3: ADVANCED DESIGN CONTROLS - ACCORDIONS */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sliders size={16} className="text-emerald-400" />
                  <span className="text-xs font-extrabold text-zinc-200 tracking-wider font-mono">3. ADVANCED DESIGN CONTROLS</span>
                </div>

                {/* ACCORDION 1: TYPOGRAPHY PANEL */}
                <div className="border border-zinc-900 rounded-2xl bg-zinc-950/60 overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === 'typography' ? null : 'typography')}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-zinc-90 w-full hover:bg-zinc-900/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Type size={15} className="text-emerald-400" />
                      <div>
                        <span className="text-xs font-bold text-zinc-200 block">Typography Designer</span>
                        <span className="text-[10px] text-zinc-500">Pair heading styles & adjust precise sizes or tracking.</span>
                      </div>
                    </div>
                    {expandedSection === 'typography' ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronDown size={14} className="text-zinc-400" />}
                  </button>

                  {expandedSection === 'typography' && (
                    <div className="p-4 border-t border-zinc-900/50 space-y-4 bg-zinc-950/40 animate-fadeIn">
                      {/* Font Pairing Presets */}
                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase">Font Pairing Presets</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {[
                            { id: 'elegant', name: 'Elegant & Editorial', fontTitle: 'Playfair Display', fontBody: 'Inter', className: 'font-serif' },
                            { id: 'tech', name: 'Tech & Minimalist', fontTitle: 'JetBrains Mono', fontBody: 'Plus Jakarta', className: 'font-mono' },
                            { id: 'bold', name: 'Bold & Creative', fontTitle: 'Syne', fontBody: 'Standard Sans', className: 'font-extrabold' }
                          ].map((preset) => (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => setFontPairing(preset.id)}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                fontPairing === preset.id
                                  ? 'border-emerald-500 bg-emerald-500/5 text-white shadow-[0_0_15px_rgba(0,255,204,0.05)]'
                                  : 'border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
                              }`}
                            >
                              <span className="text-[10px] font-bold block text-emerald-400">{preset.name}</span>
                              <span className={`text-[11px] block mt-1 truncate ${preset.className}`} style={{ fontFamily: preset.id === 'elegant' ? 'Playfair Display, serif' : preset.id === 'bold' ? 'Syne, sans-serif' : 'JetBrains Mono, monospace' }}>
                                Headings Demo
                              </span>
                              <span className="text-[9px] text-zinc-500 block">Body: {preset.fontBody}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Typography Details sliders */}
                      <div className="space-y-3 pt-2 border-t border-zinc-900/40">
                        <label className="block text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase">Typography Fine-Tuning</label>
                        
                        {/* Title Font Size */}
                        <div className="space-y-1 relative group/tooltip-title">
                          <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                            <span className="flex items-center gap-1 cursor-help">
                              <span className={isLightMode ? 'text-slate-600' : 'text-zinc-400'}>Title Font Size:</span>
                              <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                            </span>
                            <span className="text-emerald-400">{titleFontSize}px</span>
                          </div>
                          <input
                            type="range"
                            min="14"
                            max="28"
                            step="1"
                            value={titleFontSize}
                            onChange={(e) => setTitleFontSize(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                          />
                          {/* Tooltip Content */}
                          <div className={`invisible opacity-0 group-hover/tooltip-title:visible group-hover/tooltip-title:opacity-100 group-hover/tooltip-title:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                            isLightMode 
                              ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                              : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                          }`}>
                            <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                            Rescales your display headline size in the phone preview. Use smaller values if your name is exceptionally long to avoid clumsy line-breaks in mobile browsers.
                          </div>
                        </div>

                        {/* Bio Font Size */}
                        <div className="space-y-1 relative group/tooltip-bio">
                          <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                            <span className="flex items-center gap-1 cursor-help">
                              <span className={isLightMode ? 'text-slate-600' : 'text-zinc-400'}>Bio Description Font Size:</span>
                              <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                            </span>
                            <span className="text-emerald-400">{bioFontSize}px</span>
                          </div>
                          <input
                            type="range"
                            min="12"
                            max="18"
                            step="1"
                            value={bioFontSize}
                            onChange={(e) => setBioFontSize(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                          />
                          {/* Tooltip Content */}
                          <div className={`invisible opacity-0 group-hover/tooltip-bio:visible group-hover/tooltip-bio:opacity-100 group-hover/tooltip-bio:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                            isLightMode 
                              ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                              : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                          }`}>
                            <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                            Alters the reading layout density of your brief description in the mobile frame. Ensure text is prominent enough to read perfectly on hand-held displays.
                          </div>
                        </div>

                        {/* Letter Spacing */}
                        <div className="space-y-1 relative group/tooltip-tracking">
                          <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                            <span className="flex items-center gap-1 cursor-help">
                              <span className={isLightMode ? 'text-slate-600' : 'text-zinc-400'}>Letter Spacing (Tracking):</span>
                              <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                            </span>
                            <span className="text-emerald-400">{letterSpacing > 0 ? `+${letterSpacing}` : letterSpacing}em</span>
                          </div>
                          <input
                            type="range"
                            min="-0.05"
                            max="0.15"
                            step="0.01"
                            value={letterSpacing}
                            onChange={(e) => setLetterSpacing(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                          />
                          {/* Tooltip Content */}
                          <div className={`invisible opacity-0 group-hover/tooltip-tracking:visible group-hover/tooltip-tracking:opacity-100 group-hover/tooltip-tracking:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                            isLightMode 
                              ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                              : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                          }`}>
                            <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                            Alters the horizontal characters density for design headings inside the phone viewport, recreating elite magazine cover letter-spacing or standard compact text.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ACCORDION 2: CARD & BUTTON STYLING PANEL */}
                <div className="border border-zinc-900 rounded-2xl bg-zinc-950/60 overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === 'cards' ? null : 'cards')}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-zinc-900/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers size={15} className="text-emerald-400" />
                      <div>
                        <span className="text-xs font-bold text-zinc-200 block">Buttons & Cards Designer</span>
                        <span className="text-[10px] text-zinc-500">Edit corners, densities, card outlines, and glassmorphic blur.</span>
                      </div>
                    </div>
                    {expandedSection === 'cards' ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronDown size={14} className="text-zinc-400" />}
                  </button>

                  {expandedSection === 'cards' && (
                    <div className="p-4 border-t border-zinc-900/50 space-y-4 bg-zinc-950/40 animate-fadeIn">
                      {/* Button Style Segmented Control */}
                      <div className="space-y-1.5 relative group/tooltip-btnstyle">
                        <label className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase cursor-help">
                          <span>Button Shape Style</span>
                          <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                        </label>
                        <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-900">
                          {[
                            { id: 'filled', label: 'Filled' },
                            { id: 'outline', label: 'Outline/Ghost' },
                            { id: 'shadow', label: 'Soft Shadow GLOW' }
                          ].map((styleOption) => (
                            <button
                              key={styleOption.id}
                              type="button"
                              onClick={() => setBtnStyle(styleOption.id)}
                              className={`flex-1 text-center py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                btnStyle === styleOption.id
                                  ? 'bg-zinc-900 text-emerald-400 shadow-sm border border-zinc-800'
                                  : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              {styleOption.label}
                            </button>
                          ))}
                        </div>
                        {/* Tooltip Content */}
                        <div className={`invisible opacity-0 group-hover/tooltip-btnstyle:visible group-hover/tooltip-btnstyle:opacity-100 group-hover/tooltip-btnstyle:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                          isLightMode 
                            ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                            : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                        }`}>
                          <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                          Selects buttons look in the mobile preview: Filled colors for maximum click focus, modern transparent Outlines, or glowing radial dropshadow filters.
                        </div>
                      </div>

                      {/* Corner Radius Slider with 8px modern classic default locator */}
                      <div className="space-y-1.5 relative group/tooltip-radius">
                        <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                          <span className="flex items-center gap-1 cursor-help">
                            <span className={isLightMode ? 'text-slate-600' : 'text-zinc-400'}>Card & Button Radius:</span>
                            <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                          </span>
                          <span className="text-emerald-400">{cornerRadius}px</span>
                        </div>
                        <div className="relative pt-1 pb-2">
                          <input
                            type="range"
                            min="0"
                            max="99"
                            step="1"
                            value={cornerRadius}
                            onChange={(e) => setCornerRadius(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                          />
                          <div className="absolute top-[18px] left-[8%] -translate-x-1/2 flex flex-col items-center">
                            <span className="text-[8px] font-mono text-zinc-500 font-black">|</span>
                            <span className="text-[8px] font-mono text-zinc-500">8px (Modern Classic)</span>
                          </div>
                          <div className="flex justify-between text-[9px] text-zinc-650 font-mono mt-1 pt-1.5">
                            <span>0px (Square)</span>
                            <span>99px (Pill)</span>
                          </div>
                        </div>
                        {/* Tooltip Content */}
                        <div className={`invisible opacity-0 group-hover/tooltip-radius:visible group-hover/tooltip-radius:opacity-100 group-hover/tooltip-radius:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                          isLightMode 
                            ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                            : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                        }`}>
                          <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                          Rounds the corners of action cards in the mobile preview. Drag from sharp angular rectangles (0px) to organic capsule-like rounded pill buttons (99px).
                        </div>
                      </div>

                      {/* Card Density segmented toggle */}
                      <div className="space-y-1.5 pt-1 relative group/tooltip-density">
                        <label className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase cursor-help">
                          <span>Card Display Density & Grid Layout</span>
                          <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                        </label>
                        <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-900">
                          {[
                            { id: 'comfortable', label: 'Comfortable (Normal)', desc: 'Large subtext' },
                            { id: 'compact', label: 'Compact', desc: 'Slim row items' },
                            { id: 'grid', label: 'Grid (2x2 Layout)', desc: 'Grid block buttons' }
                          ].map((densityOption) => (
                            <button
                              key={densityOption.id}
                              type="button"
                              onClick={() => setCardDensity(densityOption.id)}
                              className={`flex-1 text-center py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                cardDensity === densityOption.id
                                  ? 'bg-zinc-900 text-emerald-400 shadow-sm border border-zinc-800'
                                  : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                              title={densityOption.desc}
                            >
                              {densityOption.label}
                            </button>
                          ))}
                        </div>
                        <p className="text-[9.5px] text-zinc-500 italic">Grid layout transforms secondary links into a responsive 2-column dashboard layout structure.</p>
                        {/* Tooltip Content */}
                        <div className={`invisible opacity-0 group-hover/tooltip-density:visible group-hover/tooltip-density:opacity-100 group-hover/tooltip-density:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                          isLightMode 
                            ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                            : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                        }`}>
                          <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                          Reorganizes the links in the mobile bio card view. Comfortable is spacious, Compact minimizes height, and Grid triggers an adaptive 2-column bento format.
                        </div>
                      </div>

                      {/* Glassmorphic Fine-Tuning controls */}
                      <div className="pt-3 border-t border-zinc-900/50 space-y-3.5">
                        <span className="block text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase">Ambient Glassmorphic Fine-Tuning</span>
                        
                        {/* Blur */}
                        <div className="space-y-1 relative group/tooltip-blur">
                          <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                            <span className="flex items-center gap-1 cursor-help">
                              <span className={isLightMode ? 'text-slate-600' : 'text-zinc-400'}>Glass Panel Blur:</span>
                              <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                            </span>
                            <span className="text-emerald-400">{glassBlur}px blur</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            value={glassBlur}
                            onChange={(e) => setGlassBlur(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                          />
                          {/* Tooltip Content */}
                          <div className={`invisible opacity-0 group-hover/tooltip-blur:visible group-hover/tooltip-blur:opacity-100 group-hover/tooltip-blur:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                            isLightMode 
                              ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                              : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                          }`}>
                            <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                            Increases backdrop glass blur level in mobile view, creating high-end glassy translucence covering background visuals.
                          </div>
                        </div>

                        {/* Card Opacity */}
                        <div className="space-y-1 relative group/tooltip-opacity">
                          <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                            <span className="flex items-center gap-1 cursor-help">
                              <span className={isLightMode ? 'text-slate-600' : 'text-zinc-400'}>Glass Panel Opacity:</span>
                              <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                            </span>
                            <span className="text-emerald-400">{cardOpacity}%</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            step="5"
                            value={cardOpacity}
                            onChange={(e) => setCardOpacity(Number(e.target.value))}
                            className="w-full h-1 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                          />
                          {/* Tooltip Content */}
                          <div className={`invisible opacity-0 group-hover/tooltip-opacity:visible group-hover/tooltip-opacity:opacity-100 group-hover/tooltip-opacity:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                            isLightMode 
                              ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                              : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                          }`}>
                            <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                            Sets translucent density of mobile item cards. Make them fully translucent or solid, opaque panels.
                          </div>
                        </div>

                        {/* Border Glow toggle */}
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-900 relative group/tooltip-glow">
                          <div className="flex items-start gap-1.5">
                            <Info size={13} className="text-emerald-400 shrink-0 mt-0.5 cursor-help" />
                            <div>
                              <span className="text-xs font-bold text-zinc-200 block">Neon Border Glow Match</span>
                              <span className="text-[9.5px] text-zinc-500">Adds an atmospheric outline illuminated using the active theme accent color.</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setBorderGlow(!borderGlow)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                              borderGlow
                                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold'
                                : 'bg-zinc-900 text-zinc-500 border border-zinc-850 hover:text-zinc-300'
                            }`}
                          >
                            {borderGlow ? 'GLOW ON' : 'GLOW OFF'}
                          </button>
                          {/* Tooltip Content */}
                          <div className={`invisible opacity-0 group-hover/tooltip-glow:visible group-hover/tooltip-glow:opacity-100 group-hover/tooltip-glow:translate-y-0 group-hover/tooltip-glow:translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                            isLightMode 
                              ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                              : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                          }`}>
                            <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                            Illuminates a subtle glowing outline around link items card edges, styling according to the currently active color palette.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ACCORDION 3: PROFILE HEADER LAYOUT PANEL */}
                <div className="border border-zinc-900 rounded-2xl bg-zinc-950/60 overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === 'headers' ? null : 'headers')}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-zinc-900/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe size={15} className="text-emerald-400" />
                      <div>
                        <span className="text-xs font-bold text-zinc-200 block">Profile Header Layout</span>
                        <span className="text-[10px] text-zinc-500">Pick alignment, shapes, and floating banner styles.</span>
                      </div>
                    </div>
                    {expandedSection === 'headers' ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronDown size={14} className="text-zinc-400" />}
                  </button>

                  {expandedSection === 'headers' && (
                    <div className="p-4 border-t border-zinc-900/50 space-y-4 bg-zinc-950/40 animate-fadeIn">
                      {/* Alignment Selector */}
                      <div className="space-y-1.5 relative group/tooltip-alignment">
                        <label className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase cursor-help">
                          <span>Text & Elements Alignment</span>
                          <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                        </label>
                        <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-900">
                          {[
                            { id: 'left', label: 'Left' },
                            { id: 'center', label: 'Centered' },
                            { id: 'right', label: 'Right' }
                          ].map((alignOption) => (
                            <button
                              key={alignOption.id}
                              type="button"
                              onClick={() => setProfileAlign(alignOption.id)}
                              className={`flex-1 text-center py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                profileAlign === alignOption.id
                                  ? 'bg-zinc-900 text-emerald-400 shadow-sm border border-zinc-800'
                                  : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              {alignOption.label}
                            </button>
                          ))}
                        </div>
                        {/* Tooltip Content */}
                        <div className={`invisible opacity-0 group-hover/tooltip-alignment:visible group-hover/tooltip-alignment:opacity-100 group-hover/tooltip-alignment:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                          isLightMode 
                            ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                            : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                        }`}>
                          <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                          Controls horizontal text alignment in the mobile preview. Center matches classic social landing pages, while Left or Right gives a modern directional design.
                        </div>
                      </div>

                      {/* Avatar Shape */}
                      <div className="space-y-1.5 relative group/tooltip-avatar">
                        <label className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase cursor-help">
                          <span>Avatar Profile Shape</span>
                          <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'circle', label: '🟢 Circle' },
                            { id: 'squircle', label: '🟪 Squircle' },
                            { id: 'hexagon', label: '⬢ Hexagon Shape' }
                          ].map((shapeOption) => (
                            <button
                              key={shapeOption.id}
                              type="button"
                              onClick={() => setAvatarShape(shapeOption.id)}
                              className={`p-2.5 rounded-xl border text-center transition-all text-xs font-bold cursor-pointer ${
                                avatarShape === shapeOption.id
                                  ? 'border-emerald-500 bg-emerald-500/5 text-emerald-300'
                                  : 'border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-zinc-850 hover:text-zinc-200'
                              }`}
                            >
                              {shapeOption.label}
                            </button>
                          ))}
                        </div>
                        {/* Tooltip Content */}
                        <div className={`invisible opacity-0 group-hover/tooltip-avatar:visible group-hover/tooltip-avatar:opacity-100 group-hover/tooltip-avatar:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                          isLightMode 
                            ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                            : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                        }`}>
                          <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                          Changes your avatar's outline frame style in the phone mockup. Choose from perfect circular, organic squircle, or sharp hexagonal geometry.
                        </div>
                      </div>

                      {/* Header Style (Standard, Minimal, Split) */}
                      <div className="space-y-1.5 pt-1 relative group/tooltip-headerstyle">
                        <label className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase cursor-help">
                          <span>Global Header Structure Style</span>
                          <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                        </label>
                        <div className="grid grid-cols-1 gap-2.5">
                          {[
                            { id: 'standard', name: 'Standard Layout (Overlapping Banner)', desc: 'Avatar floats directly overlapping custom widescreen banner artwork.' },
                            { id: 'minimal', name: 'Minimal Theme (No Header Banner)', desc: 'Splits out any cover banner completely; a clean custom biography sits seamless at the top.' },
                            { id: 'split', name: 'Asymmetric Split Layout (Side-by-Side)', desc: 'Avatar is anchored to the left while your Display Name and Bio details rest elegantly on the right.' }
                          ].map((styleOption) => (
                            <button
                              key={styleOption.id}
                              type="button"
                              onClick={() => setHeaderStyle(styleOption.id)}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                                headerStyle === styleOption.id
                                  ? 'border-emerald-500 bg-emerald-500/5 text-white'
                                  : 'border-zinc-900 bg-zinc-950 text-zinc-400 hover:border-zinc-800'
                              }`}
                            >
                              <span className="text-xs font-extrabold block text-emerald-400">{styleOption.name}</span>
                              <span className="text-[10px] text-zinc-500 block mt-0.5 leading-relaxed">{styleOption.desc}</span>
                            </button>
                          ))}
                        </div>
                        {/* Tooltip Content */}
                        <div className={`invisible opacity-0 group-hover/tooltip-headerstyle:visible group-hover/tooltip-headerstyle:opacity-100 group-hover/tooltip-headerstyle:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                          isLightMode 
                            ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                            : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                        }`}>
                          <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                          Reshapes layout of information above your links in the mobile viewer. Standard has banner overlap, Minimal hides banners, and Split is dual-column.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ACCORDION 4: ANIMATIONS & ENGAGEMENT FX PANEL */}
                <div className="border border-zinc-900 rounded-2xl bg-zinc-950/60 overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === 'animations' ? null : 'animations')}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-zinc-900/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Sparkles size={15} className="text-emerald-400" />
                      <div>
                        <span className="text-xs font-bold text-zinc-200 block">Animations & Engagement FX</span>
                        <span className="text-[10px] text-zinc-500">Add eye-catching loop effects or smooth load-in transitions.</span>
                      </div>
                    </div>
                    {expandedSection === 'animations' ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronDown size={14} className="text-zinc-400" />}
                  </button>

                  {expandedSection === 'animations' && (
                    <div className="p-4 border-t border-zinc-900/50 space-y-4 bg-zinc-950/40 animate-fadeIn">
                      {/* Attention Grabber for highest priority link */}
                      <div className="space-y-1.5 relative group/tooltip-attention">
                        <label className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase cursor-help">
                          <span>Attention-Grabber Hot-Link Modifier</span>
                          <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                        </label>
                        <select
                          value={attentionGrabber}
                          onChange={(e) => setAttentionGrabber(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-900 text-xs text-zinc-200 rounded-xl p-3 cursor-pointer focus:outline-none focus:border-emerald-500 transition-colors"
                        >
                          <option value="none">None (Static Glass)</option>
                          <option value="pulse">Gentle Breathing Pulse (Highly Interactive)</option>
                          <option value="wobble">Attention Grabber Wobble / Shake Loop</option>
                          <option value="glow">Cycling Neon Rainbow Glow Border Frame</option>
                        </select>
                        <p className="text-[9.5px] text-zinc-500 leading-normal">Loops a dynamic motion effect on the topmost custom high-priority link item to maximize click conversion rate.</p>
                        {/* Tooltip Content */}
                        <div className={`invisible opacity-0 group-hover/tooltip-attention:visible group-hover/tooltip-attention:opacity-100 group-hover/tooltip-attention:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                          isLightMode 
                            ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                            : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                        }`}>
                          <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                          Draws immediate attention to your main link. Generates physical eye-catching loops in the mobile preview like continuous pulses, tilt shakes, or cycling rainbow borders.
                        </div>
                      </div>

                      {/* Page Load Transitions */}
                      <div className="space-y-1.5 pt-1 relative group/tooltip-pagetransition">
                        <label className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase cursor-help">
                          <span>Immersive Page Entry Load Animation</span>
                          <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                        </label>
                        <select
                          value={pageTransition}
                          onChange={(e) => setPageTransition(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-900 text-xs text-zinc-200 rounded-xl p-3 cursor-pointer focus:outline-none focus:border-emerald-500 transition-colors"
                        >
                          <option value="none">No Entrance Effect (Pragmatic Instant)</option>
                          <option value="smooth">Smooth Fade-In Entrance (Elegance)</option>
                          <option value="cascade">Bento Slide-Up Cascade Sequence Loop</option>
                        </select>
                        <p className="text-[9.5px] text-zinc-500 leading-normal">Sets the visual animation trigger style activated when a fan visits your link-in-bio page.</p>
                        {/* Tooltip Content */}
                        <div className={`invisible opacity-0 group-hover/tooltip-pagetransition:visible group-hover/tooltip-pagetransition:opacity-100 group-hover/tooltip-pagetransition:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                          isLightMode 
                            ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                            : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                        }`}>
                          <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ Mobile Preview Impact</span>
                          Determines component entrance visual styles upon load. Staggers rendering, gliding cards upward in sequence (Cascade) or gently fades them in.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 4: COLOR SCHEMES */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-400" />
                  <span className="text-xs font-extrabold text-zinc-200 tracking-wider font-mono">4. SOLID COLOR SCHEMA PALETTE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" id="theme-selector-grid">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setActiveTheme(theme)}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all relative overflow-hidden group cursor-pointer ${
                        activeTheme.id === theme.id
                          ? 'border-white bg-zinc-900 shadow-xl'
                          : 'border-zinc-850 bg-zinc-950 hover:border-zinc-800'
                      }`}
                      id={`select-theme-${theme.id}`}
                    >
                      {/* Atmospheric color circle mockup */}
                      <div className={`absolute top-0 right-0 w-24 h-24 blur-xl rounded-full opacity-35 transition-opacity ${
                        theme.id === 'midnight-oasis' ? 'bg-indigo-600' :
                        theme.id === 'palawan-escape' ? 'bg-emerald-500' :
                        theme.id === 'boracay-dream' ? 'bg-rose-500' :
                        theme.id === 'manila-cyberpunk' ? 'bg-fuchsia-500' : 'bg-stone-400'
                      }`} />

                      <div className="relative z-10 space-y-1 mt-1">
                        <span className="block text-xs font-extrabold text-white">{theme.name}</span>
                        <span className="text-[10px] text-zinc-500 font-mono capitalize">
                          {theme.id.replace('-', ' ')} structure
                        </span>
                      </div>

                      <div className="relative z-10 flex items-center justify-between mt-6 pt-2 border-t border-zinc-900">
                        <div className="flex gap-1.5">
                          <span className="h-3 w-3 rounded-full border border-white/20 select-none bg-white/10" />
                          <span className="h-3 w-3 rounded-full border border-white/20 select-none bg-black/25" />
                          <span className="h-3 w-3 rounded-full select-none" style={{ backgroundColor: theme.accentColor }} />
                        </div>
                        
                        {activeTheme.id === theme.id ? (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase">
                            Set Style
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (() => {
            // Calculate totals
            const totalSocialClicks = socialLinks.reduce((sum, item) => sum + item.clicks, 0);
            const totalCustomClicks = customLinks.reduce((sum, item) => sum + item.clicks, 0);
            const totalGridClicks = gridItems.reduce((sum, item) => sum + item.clicks, 0);
            const totalClicksTotal = totalSocialClicks + totalCustomClicks + totalGridClicks;

            // Generate weights
            let weights: number[] = [];
            if (analyticsTimeRange === 7) {
              weights = [0.08, 0.12, 0.11, 0.15, 0.13, 0.18, 0.23];
            } else if (analyticsTimeRange === 14) {
              weights = [0.05, 0.06, 0.08, 0.07, 0.09, 0.08, 0.11, 0.09, 0.10, 0.12, 0.11, 0.13, 0.14, 0.17];
            } else {
              weights = Array.from({ length: 30 }, (_, i) => {
                const progress = i / 29;
                const cycle = Math.cos((i / 3.5) * Math.PI) * 0.25 + 0.75;
                const noise = Math.abs(Math.sin(i * 1.5)) * 0.1;
                return 0.3 + progress * 0.6 + cycle * 0.25 + noise;
              });
            }

            const sumWeights = weights.reduce((a, b) => a + b, 0);
            const normalizedWeights = weights.map(w => w / sumWeights);

            // Distribute click totals
            const distributedClicks = normalizedWeights.map(w => Math.round(totalClicksTotal * w));
            const sumDistributed = distributedClicks.reduce((a, b) => a + b, 0);
            const remainder = totalClicksTotal - sumDistributed;
            distributedClicks[distributedClicks.length - 1] = Math.max(0, distributedClicks[distributedClicks.length - 1] + remainder);

            // Structure final dataset
            const chartData = Array.from({ length: analyticsTimeRange }, (_, i) => {
              const d = new Date();
              d.setDate(d.getDate() - (analyticsTimeRange - 1 - i));
              const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              const clicks = distributedClicks[i] || 0;
              
              // Add baseline views derived from clicks
              const baseOffset = (analyticsTimeRange === 30 ? 15 : analyticsTimeRange === 14 ? 12 : 10);
              const views = Math.round(clicks * 2.8) + baseOffset + Math.round(Math.abs(Math.sin(i * 0.7) * 8));

              return {
                name: label,
                clicks,
                views,
              };
            });

            const totalViewsTotal = chartData.reduce((sum, d) => sum + d.views, 0);
            const ctrRatio = totalViewsTotal > 0 ? ((totalClicksTotal / totalViewsTotal) * 100).toFixed(1) : '0.0';

            // Find top link
            const allLinks = [
              ...socialLinks.map(l => ({ title: `@${l.platform} (${l.label})`, clicks: l.clicks, type: 'Social Account' })),
              ...customLinks.map(cl => ({ title: cl.title, clicks: cl.clicks, type: 'Custom Website Link' })),
              ...gridItems.map(g => ({ title: g.title, clicks: g.clicks, type: 'Commerce Product' }))
            ];
            const sortedByClicks = [...allLinks].sort((a, b) => b.clicks - a.clicks);
            const topPerformingLink = sortedByClicks[0];

            return (
              <motion.div
                key="tab-analytics"
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 animate-fade-in"
              >
                {/* Module Heading */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-850 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      💼 Unified Account Analytics Hub
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 leading-normal">
                      High-fidelity analytics calculated directly from your bio link interactions and visitor views.
                    </p>
                  </div>

                  {/* Range Select Controls */}
                  <div className="flex bg-zinc-950 border border-zinc-850 p-0.5 rounded-lg shrink-0">
                    {([7, 14, 30] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setAnalyticsTimeRange(r)}
                        className={`px-3 py-1 text-[10.5px] font-bold font-mono rounded-md transition-colors cursor-pointer ${
                          analyticsTimeRange === r
                            ? 'bg-zinc-850 text-white'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                      >
                        {r}D
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid stats cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Views summary stat card */}
                  <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="text-[10px] font-mono tracking-wider uppercase font-extrabold">Profile Views</span>
                      <Eye size={14} className="text-amber-500" />
                    </div>
                    <div>
                      <span className="text-xl font-black text-white">{totalViewsTotal.toLocaleString()}</span>
                      <span className="text-[9px] text-emerald-400 font-bold ml-1.5 font-mono">▲ 4.2%</span>
                    </div>
                    <p className="text-[9px] text-zinc-500 font-mono">Last {analyticsTimeRange} days total</p>
                  </div>

                  {/* Clicks summary stat card */}
                  <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="text-[10px] font-mono tracking-wider uppercase font-extrabold">Link Clicks</span>
                      <MousePointerClick size={14} className="text-indigo-400" />
                    </div>
                    <div>
                      <span className="text-xl font-black text-white">{totalClicksTotal.toLocaleString()}</span>
                      <span className="text-[9px] text-emerald-400 font-bold ml-1.5 font-mono">▲ 8.1%</span>
                    </div>
                    <p className="text-[9px] text-zinc-500 font-mono">Real-time interaction count</p>
                  </div>

                  {/* CTR stat card */}
                  <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="text-[10px] font-mono tracking-wider uppercase font-extrabold">Click-Through (CTR)</span>
                      <BarChart3 size={14} className="text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-xl font-black text-white">{ctrRatio}%</span>
                      <span className="text-[9px] text-zinc-500 ml-1.5 font-mono">Stable</span>
                    </div>
                    <p className="text-[9px] text-zinc-500 font-mono">Efficiency ratio</p>
                  </div>

                  {/* Max Convertor stat card */}
                  <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 space-y-2 col-span-2 lg:col-span-1 border-dashed">
                    <div className="flex items-center justify-between text-zinc-500">
                      <span className="text-[10px] font-mono tracking-wider uppercase font-extrabold">Top Traction Hub</span>
                      <TrendingUp size={14} className="text-rose-400" />
                    </div>
                    <div className="truncate">
                      <span className="text-sm font-bold text-rose-400 block truncate" title={topPerformingLink?.title || 'None active'}>
                        {topPerformingLink?.title || 'No Traction'}
                      </span>
                      <span className="text-[10px] font-medium text-zinc-300 font-mono block truncate">
                        {topPerformingLink ? `${topPerformingLink.clicks} clicks` : 'Configure more links'}
                      </span>
                    </div>
                    <p className="text-[9px] text-zinc-500 font-mono">Primary referral source</p>
                  </div>
                </div>

                {/* Line Chart Panel */}
                <div className="bg-zinc-950/40 border border-zinc-850 p-5 rounded-2xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Traffic Pattern Volume</h4>
                      <p className="text-[10px] text-zinc-500">Comparison of profile visitors against redirection links clicked.</p>
                    </div>
                    <div className="flex gap-4 text-[10px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-1.5 bg-amber-500 rounded-full" />
                        <span className="text-zinc-400 font-semibold">Views</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-1.5 rounded-full" style={{ backgroundColor: activeTheme.accentColor || '#6366f1' }} />
                        <span className="text-zinc-400 font-semibold">Clicks</span>
                      </div>
                    </div>
                  </div>

                  {/* Responsive Container for Chart */}
                  <div className="w-full h-80 bg-zinc-900/20 rounded-xl p-3 border border-zinc-900/60 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{ top: 15, right: 10, left: -24, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#1d1d21" vertical={false} />
                        <XAxis
                          dataKey="name"
                          stroke="#52525b"
                          fontSize={9.5}
                          fontFamily="monospace"
                          tickLine={false}
                          axisLine={false}
                          dy={6}
                        />
                        <YAxis
                          stroke="#52525b"
                          fontSize={9.5}
                          fontFamily="monospace"
                          tickLine={false}
                          axisLine={false}
                          dx={-4}
                        />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-zinc-950/95 border border-zinc-850 p-3 rounded-xl shadow-xl backdrop-blur-md">
                                  <p className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase mb-1.5">{label}</p>
                                  <div className="space-y-1">
                                    {payload.map((p: any) => (
                                      <div key={p.name} className="flex items-center gap-4 justify-between">
                                        <span className="text-[11px] font-medium text-zinc-300 flex items-center gap-1.5">
                                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.stroke || p.color }} />
                                          {p.name === 'views' ? 'Profile Views' : 'Link Clicks'}
                                        </span>
                                        <span className="text-xs font-mono font-bold text-white">{p.value.toLocaleString()}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="views"
                          name="views"
                          stroke="#f59e0b"
                          strokeWidth={2.5}
                          dot={{ fill: '#f59e0b', strokeWidth: 1, r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="clicks"
                          name="clicks"
                          stroke={activeTheme.accentColor || '#6366f1'}
                          strokeWidth={2.5}
                          dot={{ fill: activeTheme.accentColor || '#6366f1', strokeWidth: 1, r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Breakdowns table */}
                <div className="bg-zinc-950/40 border border-zinc-850 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Direct Referrals Summary</h4>
                      <p className="text-[10px] text-zinc-500">Distribution of clicks mapping across your set platform links and product cards.</p>
                    </div>
                    <span className="text-[9.5px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
                      {sortedByClicks.length} total channels
                    </span>
                  </div>

                  {sortedByClicks.length === 0 ? (
                    <div className="text-center py-8 text-zinc-650 space-y-2">
                      <BarChart3 size={24} className="mx-auto opacity-40" />
                      <p className="text-xs">No active links configured. Start by creating social profile redirects or local products first.</p>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {sortedByClicks.map((item, index) => {
                        const pct = totalClicksTotal > 0 ? (item.clicks / totalClicksTotal) * 100 : 0;
                        return (
                          <div key={`${item.title}-${index}`} className="group space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <div className="flex items-center gap-2 max-w-[70%]">
                                <span className="text-[10px] font-mono text-zinc-500 w-5 text-right">{index + 1}.</span>
                                <span className="font-semibold text-zinc-200 truncate">{item.title}</span>
                                <span className="text-[8.5px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-400 font-mono uppercase">
                                  {item.type}
                                </span>
                              </div>
                              <div className="text-right flex items-center gap-3">
                                <span className="text-xs font-bold text-white font-mono">{item.clicks.toLocaleString()} clicks</span>
                                <span className="text-[10px] font-mono text-zinc-500 w-10 text-right">{pct.toFixed(0)}%</span>
                              </div>
                            </div>
                            
                            {/* Custom animated progress bar indicator */}
                            <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-850/40">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: activeTheme.accentColor || '#6366f1' }}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </motion.div>
            );
          })()}

          {/* SEO & SOCIAL SHARING TAB */}
          {activeTab === 'seo' && (
            <motion.div
              key="tab-seo"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm font-bold text-white mb-1">SEO & Social Sharing Parameters</h3>
                <p className="text-xs text-zinc-400">Optimize how your page presents itself on search engines, instant messaging bubbles, and social timelines.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Configuration controls */}
                <div className="lg:col-span-7 space-y-5">
                  
                  {/* Meta tag records card panel */}
                  <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-zinc-850">
                      <Globe size={16} className="text-emerald-400" />
                      <span className="text-xs font-extrabold text-zinc-200 tracking-wider font-mono">Page SEO Meta Tags</span>
                    </div>

                    {/* SEO Title Input */}
                    <div className="space-y-1.5 relative group/tooltip-seotitle">
                      <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                        <span className="flex items-center gap-1 cursor-help">
                          <span className={isLightMode ? 'text-slate-600' : 'text-zinc-350'}>Browser Meta Title:</span>
                          <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                        </span>
                        <span className={`text-[10px] ${seoTitle.length > 60 ? 'text-amber-400' : 'text-emerald-400'} font-mono`}>
                          {seoTitle.length} / 60 chars
                        </span>
                      </div>
                      <input
                        type="text"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder={`${profile.displayName} | Link-in-Bio`}
                        className="w-full text-xs bg-zinc-950 border border-zinc-900 focus:border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                      />
                      <p className="text-[10px] text-zinc-500 leading-normal">
                        Appears inside the browser tab, search snippet title, and bubble title frames. Maximize impact by staying below 55-60 symbols.
                      </p>
                      {/* Tooltip Content */}
                      <div className={`invisible opacity-0 group-hover/tooltip-seotitle:visible group-hover/tooltip-seotitle:opacity-100 group-hover/tooltip-seotitle:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                        isLightMode 
                          ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                          : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                      }`}>
                        <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ SEO Context Impact</span>
                        The HTML &lt;title&gt; is indexed directly by Google. Setting an authoritative, clean phrasing increases click CTR substantially.
                      </div>
                    </div>

                    {/* SEO Description Area */}
                    <div className="space-y-1.5 relative group/tooltip-seodesc">
                      <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                        <span className="flex items-center gap-1 cursor-help">
                          <span className={isLightMode ? 'text-slate-600' : 'text-zinc-350'}>Meta Summary Description:</span>
                          <Info size={11} className={`${isLightMode ? 'text-slate-400' : 'text-zinc-500'} hover:text-emerald-400 transition-colors shrink-0`} />
                        </span>
                        <span className={`text-[10px] ${seoDescription.length > 160 ? 'text-amber-400' : 'text-emerald-400'} font-mono`}>
                          {seoDescription.length} / 160 chars
                        </span>
                      </div>
                      <textarea
                        value={seoDescription}
                        onChange={(e) => setSeoDescription(e.target.value)}
                        placeholder="Define what readers discover upon clicking your shared URL..."
                        rows={3}
                        className="w-full text-xs bg-zinc-950 border border-zinc-900 focus:border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed font-normal"
                      />
                      <p className="text-[10px] text-zinc-500 leading-normal">
                        A dynamic overview showing directly in search results. Recommend keeping this under 155-160 characters to avoid snippet cutoff.
                      </p>
                      {/* Tooltip Content */}
                      <div className={`invisible opacity-0 group-hover/tooltip-seodesc:visible group-hover/tooltip-seodesc:opacity-100 group-hover/tooltip-seodesc:translate-y-0 translate-y-1 transition-all duration-200 pointer-events-none absolute bottom-full left-0 mb-2 z-50 p-2.5 text-[10px] leading-relaxed rounded-xl shadow-xl border w-64 ${
                        isLightMode 
                          ? 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50' 
                          : 'bg-zinc-950/95 border-zinc-800 text-zinc-300 shadow-black/80'
                      }`}>
                        <span className="font-extrabold text-[9px] block mb-0.5 text-emerald-400 uppercase font-mono tracking-wider">✓ SEO Context Impact</span>
                        Google parses the summary to match queries. WhatsApp / Facebook render this as explanatory subtext block below titles.
                      </div>
                    </div>
                  </div>

                  {/* Open Graph Image Panel */}
                  <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-zinc-850">
                      <Image size={16} className="text-emerald-400" />
                      <span className="text-xs font-extrabold text-zinc-200 tracking-wider font-mono">Custom Sharing Asset / Card</span>
                    </div>

                    <div className="space-y-4">
                      {/* URL input and Sync button */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[11px] font-mono font-bold">
                          <span className="text-zinc-350">Open Graph image URL:</span>
                          <button
                            type="button"
                            onClick={() => setSeoImage(profile.avatarUrl)}
                            className="text-[9px] font-extrabold font-mono tracking-wider text-emerald-400 hover:text-emerald-350 transition-colors uppercase flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/15 px-2 py-0.5 rounded"
                          >
                            Sync Avatar URL
                          </button>
                        </div>
                        <input
                          type="text"
                          value={seoImage}
                          onChange={(e) => setSeoImage(e.target.value)}
                          placeholder="Paste an absolute web asset URL..."
                          className="w-full text-xs font-mono bg-zinc-950 border border-zinc-900 focus:border-zinc-800 rounded-xl p-3 text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>

                      {/* File upload drag and drop section */}
                      <div className="space-y-1.5">
                        <span className="block text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase">Or upload custom social layout:</span>
                        <div className="border border-dashed border-zinc-800 rounded-xl p-4 bg-zinc-950/40 text-center hover:bg-zinc-950/80 transition-colors group relative cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    setSeoImage(event.target.result as string);
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <Upload size={18} className="mx-auto text-zinc-500 group-hover:text-emerald-400 transition-colors mb-1.5" />
                          <p className="text-[10.5px] font-bold text-zinc-300">Choose custom picture asset</p>
                          <p className="text-[9px] text-zinc-500 mt-1">Converts of embeds standard files into a local Base64 string instantly.</p>
                        </div>
                      </div>

                      {/* Default curated artist preset images */}
                      <div className="space-y-2 pt-1">
                        <span className="block text-[10px] font-mono tracking-wider font-extrabold text-zinc-400 uppercase">Choose from styled minimalist backdrops:</span>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { id: 'pres-glass', name: 'Glassmorphic', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80' },
                            { id: 'pres-synth', name: 'Neon Synth', url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&h=630&q=80' },
                            { id: 'pres-ink', name: 'Ink Flow', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&h=630&q=80' },
                            { id: 'pres-satin', name: 'Satin Dream', url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&h=630&q=80' }
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setSeoImage(item.url)}
                              className={`relative aspect-[16/9] rounded-lg overflow-hidden border transition-all ${
                                seoImage === item.url ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-zinc-900 hover:border-zinc-800'
                              }`}
                              title={item.name}
                            >
                              <img src={item.url} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <div className="absolute inset-x-0 bottom-0 bg-black/70 p-0.5 text-[8.5px] text-zinc-300 font-mono text-center truncate">
                                {item.name}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Simulated live visual dashboard deck */}
                <div className="lg:col-span-5 space-y-4">
                  <SeoPreviewHub
                    seoTitle={seoTitle}
                    seoDescription={seoDescription}
                    seoImage={seoImage}
                    username={profile.username}
                  />
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
