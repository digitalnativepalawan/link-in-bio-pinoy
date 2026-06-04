import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Twitter, 
  Github, 
  Globe, 
  Mail, 
  MessageSquare, 
  MapPin, 
  TrendingUp, 
  Share2, 
  Sparkles, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  CheckCircle, 
  DollarSign, 
  Send,
  Loader2,
  Lock,
  Coffee,
  ShoppingBag,
  Headphones,
  BookOpen,
  Music,
  User,
  Volume2,
  Maximize2,
  ExternalLink,
  Linkedin,
  Phone
} from 'lucide-react';
import { CreatorProfile, SocialLink, GridItem, ThemeConfig, VideoModule, CustomLink } from '../types';
import TipModal from './TipModal';

interface MobilePreviewProps {
  profile: CreatorProfile;
  socialLinks: SocialLink[];
  customLinks?: CustomLink[];
  gridItems: GridItem[];
  videoModule: VideoModule;
  theme: ThemeConfig;
  onLinkClick: (id: string, type: 'social' | 'grid' | 'custom') => void;
  onNewLeadSubmission: (
    name: string,
    email: string,
    phone?: string,
    interest?: string,
    note?: string,
    marketingConsent?: boolean
  ) => void;
  onNewTipCompleted: (donorName: string, amount: number, paymentMethod: 'gcash' | 'maya' | 'bank', message: string) => void;
  isInsideIphone?: boolean;
  bgLayout?: 'entire' | 'hero';
  bgImage?: string;
  bgOpacity?: number;
  bgBlur?: number;
  bgZoom?: number;
  bgPosition?: string;
  bgRepeat?: boolean;
  bgSize?: string;
  bgSizePercent?: number;
  bgPositionX?: number;
  bgPositionY?: number;
  fontPairing?: string;
  titleFontSize?: number;
  bioFontSize?: number;
  letterSpacing?: number;
  btnStyle?: string;
  cornerRadius?: number;
  cardDensity?: string;
  glassBlur?: number;
  cardOpacity?: number;
  borderGlow?: boolean;
  profileAlign?: string;
  avatarShape?: string;
  headerStyle?: string;
  attentionGrabber?: string;
  pageTransition?: string;
}

export default function MobilePreview({
  profile,
  socialLinks,
  customLinks = [],
  gridItems,
  videoModule,
  theme,
  onLinkClick,
  onNewLeadSubmission,
  onNewTipCompleted,
  isInsideIphone = false,
  bgLayout = 'entire',
  bgImage = '',
  bgOpacity = 40,
  bgBlur = 0,
  bgZoom = 100,
  bgPosition = 'center',
  bgRepeat = false,
  bgSize = 'cover',
  bgSizePercent = 100,
  bgPositionX = 50,
  bgPositionY = 50,
  fontPairing = 'elegant',
  titleFontSize = 24,
  bioFontSize = 13,
  letterSpacing = 0,
  btnStyle = 'filled',
  cornerRadius = 16,
  cardDensity = 'comfortable',
  glassBlur = 8,
  cardOpacity = 40,
  borderGlow = false,
  profileAlign = 'center',
  avatarShape = 'circle',
  headerStyle = 'standard',
  attentionGrabber = 'none',
  pageTransition = 'none'
}: MobilePreviewProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram size={16} />;
      case 'tiktok': return <Music size={16} />;
      case 'youtube': return <Youtube size={16} />;
      case 'facebook': return <Facebook size={16} />;
      case 'twitter':
      case 'x': return <Twitter size={16} />;
      case 'threads': return <MessageSquare size={16} />;
      case 'snapchat': return <Sparkles size={16} />;
      case 'lemon8': return <Sparkles size={16} />;
      case 'mastodon': return <Share2 size={16} />;
      case 'linkedin': return <Linkedin size={16} />;
      case 'github': return <Github size={16} />;
      case 'polywork': return <TrendingUp size={16} />;
      case 'medium': return <BookOpen size={16} />;
      case 'substack': return <BookOpen size={16} />;
      case 'patreon': return <Coffee size={16} />;
      case 'kofi': return <Coffee size={16} />;
      case 'buymeacoffee': return <Coffee size={16} />;
      case 'onlyfans': return <Heart size={16} />;
      case 'discord': return <MessageSquare size={16} />;
      case 'telegram': return <Send size={16} />;
      case 'whatsapp': return <MessageSquare size={16} />;
      case 'viber': return <MessageSquare size={16} />;
      case 'reddit': return <MessageSquare size={16} />;
      case 'spotify': return <Music size={16} />;
      case 'applepodcasts': return <Headphones size={16} />;
      case 'behance': return <Globe size={16} />;
      case 'dribbble': return <Globe size={16} />;
      case 'pinterest': return <Heart size={16} />;
      case 'twitch': return <Play size={16} />;
      case 'vimeo': return <Play size={16} />;
      case 'kick': return <Play size={16} />;
      case 'email': return <Mail size={16} />;
      default: return <Globe size={16} />;
    }
  };

  const isLight = theme.id === 'batanes-mist';
  const textPrimaryClass = isLight ? 'text-stone-900 border-stone-305' : 'text-white border-white/10';
  const textSecondaryClass = isLight ? 'text-stone-700' : 'text-zinc-200';
  const textMutedClass = isLight ? 'text-stone-500' : 'text-zinc-400';
  const borderClass = isLight ? 'border-stone-200/60' : 'border-white/[0.07]';
  const bgInputClass = isLight ? 'bg-stone-100 border-stone-200' : 'bg-black/30 border-white/[0.06]';
  const bgCardClass = theme.cardBg || (isLight ? 'bg-white/75 border-stone-200/50' : 'bg-white/[0.035] backdrop-blur-md border border-white/[0.08]');
  const buttonStyleClass = theme.buttonStyle || (isLight ? 'bg-stone-100 hover:bg-stone-200 text-stone-900 border-stone-200' : 'bg-white/10 hover:bg-white/20 border-white/10 text-white');

  // Typography font & tracking mappings
  const headingStyle = {
    fontFamily: 
      fontPairing === 'elegant' ? 'Playfair Display, serif' :
      fontPairing === 'tech' ? 'JetBrains Mono, monospace' :
      fontPairing === 'bold' ? 'Syne, sans-serif' : 'inherit',
    letterSpacing: `${letterSpacing}em`,
  };

  // Avatar shaping map
  const avatarStyle = avatarShape === 'hexagon'
    ? { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', borderRadius: '0' }
    : avatarShape === 'squircle'
    ? { borderRadius: '24px' }
    : { borderRadius: '9999px' };

  // Alignment class strings for parent container & item contents
  const alignClass = profileAlign === 'left' ? 'items-start text-left' : profileAlign === 'right' ? 'items-end text-right' : 'items-center text-center';
  const inlineAlignClass = profileAlign === 'left' ? 'justify-start' : profileAlign === 'right' ? 'justify-end' : 'justify-center';

  // Card background styling modifiers mapping
  const dynamicCardStyle = {
    borderRadius: `${cornerRadius}px`,
    borderWidth: btnStyle === 'outline' ? '2px' : '1px',
    borderColor: btnStyle === 'outline' ? theme.accentColor : borderGlow ? theme.accentColor : undefined,
    boxShadow: btnStyle === 'shadow' ? `0 4px 20px ${theme.accentColor}35` : undefined,
    // Support fine-tuning sliders for opacity & blurring
    backgroundColor: btnStyle === 'outline' ? 'transparent' : `rgba(${isLight ? '240, 240, 245' : '20, 20, 25'}, ${cardOpacity / 100})`,
    backdropFilter: glassBlur > 0 ? `blur(${glassBlur}px)` : 'none',
  };

  // Animation props for high priority focus item
  const getAttentionGrabberProps = (index: number) => {
    if (index !== 0 || attentionGrabber === 'none') return {};
    
    if (attentionGrabber === 'pulse') {
      return {
        animate: { scale: [1, 1.025, 1] },
        transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" }
      };
    }
    if (attentionGrabber === 'wobble') {
      return {
        animate: { rotate: [0, -1.5, 1.5, -1.5, 1.5, 0] },
        transition: { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
      };
    }
    if (attentionGrabber === 'glow') {
      return {
        animate: { 
          boxShadow: [
            `0 0 10px ${theme.accentColor || '#00FFCC'}20`, 
            `0 0 25px ${theme.accentColor || '#00FFCC'}80`, 
            `0 0 10px ${theme.accentColor || '#00FFCC'}20`
          ],
          borderColor: theme.accentColor || '#00FFCC'
        },
        transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
      };
    }
    return {};
  };

  // Carousel State
  const [activeSlide, setActiveSlide] = useState(0);

  // Tip Form State
  const [tipAmount, setTipAmount] = useState<number | ''>('');
  const [selectedMethod, setSelectedMethod] = useState<'gcash' | 'maya' | 'bank'>('gcash');
  const [donorName, setDonorName] = useState('');
  const [tipMessage, setTipMessage] = useState('');
  const [isTipModalOpen, setIsTipModalOpen] = useState(false);
  const [tipError, setTipError] = useState('');

  // Newsletter Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadInterest, setLeadInterest] = useState('Newsletter & General Updates');
  const [leadNote, setLeadNote] = useState('');
  const [leadMarketingConsent, setLeadMarketingConsent] = useState(true);
  const [leadStatus, setLeadStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Video State
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Copied State for clipboard
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto scroll/slide helpers
  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === gridItems.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? gridItems.length - 1 : prev - 1));
  };

  // Handle lead capture submission
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;
    setLeadStatus('submitting');
    setTimeout(() => {
      onNewLeadSubmission(
        leadName,
        leadEmail,
        leadPhone || undefined,
        leadInterest || undefined,
        leadNote || undefined,
        leadMarketingConsent
      );
      setLeadStatus('success');
      setLeadName('');
      setLeadEmail('');
      setLeadPhone('');
      setLeadInterest('Newsletter & General Updates');
      setLeadNote('');
      setLeadMarketingConsent(true);
      setTimeout(() => setLeadStatus('idle'), 4000);
    }, 1500);
  };

  // Trigger Tipping Flow
  const handleInitiateTip = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsedAmount = Number(tipAmount);
    if (!tipAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setTipError('Please enter a valid amount.');
      return;
    }
    if (parsedAmount > 50000) {
      setTipError('Maximum single tipping limit is ₱50,000.');
      return;
    }
    setTipError('');
    setIsTipModalOpen(true);
  };

  const handlePaymentSuccess = (verifiedDonor: string, verifiedMsg: string) => {
    onNewTipCompleted(
      verifiedDonor || 'Contributor',
      Number(tipAmount) || 150,
      selectedMethod,
      verifiedMsg
    );
    setIsTipModalOpen(false);
    // Reset forms
    setTipAmount('');
    setDonorName('');
    setTipMessage('');
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(`https://merqato.digital/${profile.username}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSlideSelect = (idx: number) => {
    setActiveSlide(idx);
  };

  // Maps labeled platforms to custom, gorgeous icon badges
  const getCustomIconForLabel = (label: string, platform: string) => {
    const l = label.toLowerCase();
    if (l.includes('shop') || l.includes('store') || l.includes('merch')) {
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-105 transition-all">
          <ShoppingBag size={20} />
        </div>
      );
    }
    if (l.includes('vlog') || l.includes('watch') || l.includes('vlog')) {
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 group-hover:bg-rose-500/20 group-hover:scale-105 transition-all">
          <Play size={18} className="fill-rose-400/20 text-rose-400" />
        </div>
      );
    }
    if (l.includes('discord') || l.includes('chat') || l.includes('community')) {
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-105 transition-all">
          <MessageSquare size={20} />
        </div>
      );
    }
    if (l.includes('podcast') || l.includes('listen') || l.includes('audio')) {
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 group-hover:bg-violet-500/20 group-hover:scale-105 transition-all">
          <Headphones size={20} />
        </div>
      );
    }
    if (l.includes('blog') || l.includes('read')) {
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:bg-sky-500/20 group-hover:scale-105 transition-all">
          <BookOpen size={20} />
        </div>
      );
    }
    if (l.includes('playlist') || l.includes('spotify') || l.includes('stream')) {
      return (
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all">
          <Music size={20} />
        </div>
      );
    }
    
    // Fallback based on raw platform name
    switch (platform.toLowerCase()) {
      case 'instagram': 
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 group-hover:bg-pink-500/20 group-hover:scale-105 transition-all">
            <Instagram size={20} />
          </div>
        );
      case 'tiktok':
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:scale-105 transition-all">
            <Music size={20} />
          </div>
        );
      case 'youtube':
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 group-hover:bg-red-500/20 group-hover:scale-105 transition-all">
            <Youtube size={20} />
          </div>
        );
      case 'facebook':
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-600/20 text-blue-400 group-hover:bg-blue-600/20 group-hover:scale-105 transition-all">
            <Facebook size={20} />
          </div>
        );
      case 'twitter':
      case 'x':
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800/10 border border-zinc-800/20 text-zinc-300 group-hover:bg-zinc-800/20 group-hover:scale-105 transition-all">
            <Twitter size={20} />
          </div>
        );
      case 'linkedin':
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600/10 border border-sky-600/20 text-sky-400 group-hover:bg-sky-600/20 group-hover:scale-105 transition-all">
            <Linkedin size={20} />
          </div>
        );
      case 'github':
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-500/10 border border-zinc-550/20 text-white group-hover:bg-zinc-550/20 group-hover:scale-105 transition-all">
            <Github size={20} />
          </div>
        );
      case 'spotify':
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all">
            <Music size={20} />
          </div>
        );
      case 'discord':
      case 'telegram':
      case 'whatsapp':
      case 'viber':
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 group-hover:bg-teal-500/20 group-hover:scale-105 transition-all">
            <MessageSquare size={20} />
          </div>
        );
      case 'patreon':
      case 'kofi':
      case 'buymeacoffee':
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:bg-amber-500/20 group-hover:scale-105 transition-all">
            <Coffee size={20} />
          </div>
        );
      case 'email':
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:bg-orange-500/20 group-hover:scale-105 transition-all">
            <Mail size={20} />
          </div>
        );
      default:
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-500/10 border border-zinc-500/20 text-zinc-450 group-hover:bg-zinc-500/20 group-hover:scale-105 transition-all">
            <Globe size={20} />
          </div>
        );
    }
  };

  return (
    <div className={`relative flex flex-col w-full ${isInsideIphone ? 'min-h-full overflow-y-auto' : 'h-auto overflow-y-visible'} overflow-x-hidden ${theme.backgroundClass} select-none font-sans ${theme.id === 'sophisticated-dark' ? 'sophisticated-bg' : ''}`} id="creator-mobile-page">
      
      {/* Background custom wallpaper layout */}
      {bgImage && bgLayout === 'entire' && (
        <>
          <div 
            className="absolute inset-0 pointer-events-none z-0 transition-all duration-300"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: bgSize === 'cover' ? 'cover' : bgSize === 'contain' ? 'contain' : `${bgSizePercent}%`,
              backgroundPosition: `${bgPositionX}% ${bgPositionY}%`,
              backgroundRepeat: bgRepeat ? 'repeat' : 'no-repeat',
              filter: bgBlur > 0 ? `blur(${bgBlur}px)` : 'none',
              transform: bgBlur > 0 ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none z-0 bg-black transition-all duration-300"
            style={{
              opacity: bgOpacity / 100,
            }}
          />
        </>
      )}

      {/* Hero Cover Banner Layout */}
      {bgImage && bgLayout === 'hero' && headerStyle !== 'minimal' && (
        <>
          <div 
            className="absolute top-0 left-0 right-0 h-[170px] pointer-events-none z-0 transition-all duration-300"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: bgSize === 'cover' ? 'cover' : bgSize === 'contain' ? 'contain' : `${bgSizePercent}%`,
              backgroundPosition: `${bgPositionX}% ${bgPositionY}%`,
              backgroundRepeat: bgRepeat ? 'repeat' : 'no-repeat',
              filter: bgBlur > 0 ? `blur(${bgBlur}px)` : 'none',
              transform: bgBlur > 0 ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          <div 
            className="absolute top-0 left-0 right-0 h-[170px] pointer-events-none z-0 bg-zinc-950 transition-all duration-300"
            style={{
              opacity: bgOpacity / 100,
            }}
          />
          {/* Subtle gradient divider overlay for hero mode */}
          <div className="absolute top-[130px] left-0 right-0 h-10 pointer-events-none z-0 bg-gradient-to-b from-transparent to-black/80" />
        </>
      )}

      {/* Background organic light leak overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden origin-center z-0">
        <div className="absolute top-[-20%] left-[-30%] w-[100%] h-[80%] rounded-full bg-violet-600/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-15%] right-[-20%] w-[80%] h-[60%] rounded-full bg-emerald-500/10 blur-[130px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Main content body with transition load effects */}
      <motion.div 
        key={`preview-animated-body-${pageTransition}`}
        initial={pageTransition === 'none' ? { opacity: 1, y: 0 } : { opacity: 0, y: pageTransition === 'cascade' ? 25 : 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={pageTransition === 'none' ? {} : { duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center px-5 py-8 md:px-6"
      >
        
        {/* Top bar with username and share */}
        <div className="w-full flex items-center justify-between mb-8">
          <span className="text-[11px] font-mono py-1.5 px-4 rounded-full bg-black/40 border border-white/[0.08] backdrop-blur-md opacity-90 select-none text-zinc-300">
            merqato.digital/{profile.username}
          </span>
          <button 
            onClick={handleShareProfile}
            className="flex items-center justify-center p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all text-white backdrop-blur-md"
            title="Share Profile"
            id="share-profile-button"
          >
            {copiedLink ? (
              <span className="text-[10px] font-mono font-medium tracking-tight px-1 text-emerald-400 select-none">COPIED</span>
            ) : (
              <Share2 size={13} />
            )}
          </button>
        </div>

        {/* HERO SECTION */}
        {headerStyle === 'split' ? (
          <div className="flex flex-col sm:flex-row items-center w-full gap-5 mb-6 relative z-10 p-4 border border-white/[0.05] rounded-2xl" style={dynamicCardStyle}>
            {/* Avatar with customized shape and glow */}
            <div className="relative shrink-0 select-none">
              <div 
                className={`w-[85px] h-[85px] flex items-center justify-center overflow-hidden bg-zinc-900 border ${borderGlow ? 'border-emerald-500' : 'border-white/10'}`}
                style={avatarStyle}
              >
                <img 
                  src={profile.avatarUrl} 
                  alt={`${profile.displayName} Avatar`}
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Online Green dot */}
              <div className="absolute bottom-0.5 right-0.5 bg-emerald-500 w-3 h-3 rounded-full border-2 border-zinc-950" />
            </div>

            {/* Biography details */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h1 className={`text-xl font-extrabold tracking-tight ${textPrimaryClass} select-all`} style={{ ...headingStyle, fontSize: `${titleFontSize}px` }}>
                  {profile.displayName}
                </h1>
                {profile.verified && (
                  <div className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#7c4dff]/20 border border-[#7c4dff]/30 text-[#a78bfa]" title="Verified Creator">
                    <CheckCircle size={11} className="fill-[#7c4dff]/10" />
                  </div>
                )}
              </div>
              <p className={`text-[10px] font-medium tracking-wider font-mono ${textMutedClass} mb-1.5`}>
                @{profile.username}
              </p>
              <p className={`text-xs ${textSecondaryClass} mt-1 mb-2 leading-relaxed select-text`} style={{ fontSize: `${bioFontSize}px` }}>
                {profile.tagline || 'Content Creator'}
              </p>

              {/* Simple Location caption */}
              <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-400">
                <MapPin size={10} className="text-rose-500" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className={`flex flex-col ${alignClass} w-full mb-6 relative z-10`}>
            {/* Avatar with dynamic shape settings */}
            <div className="relative mb-5 select-none">
              <div 
                className={`w-[104px] h-[104px] flex items-center justify-center overflow-hidden bg-zinc-900 border ${borderGlow ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.35)]' : 'border-white/10'}`}
                style={avatarStyle}
              >
                <img 
                  src={profile.avatarUrl} 
                  alt={`${profile.displayName} Avatar`}
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Online Green dot at bottom right */}
              <div className="absolute bottom-1 right-2 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-[#040113] shadow-[0_0_12px_#10b981]" title="Online Now" />
            </div>

            {/* Typography displays */}
            <div className={`flex items-center gap-1.5 ${inlineAlignClass} mb-1 w-full`}>
              <h1 className={`text-2xl font-extrabold tracking-tight ${textPrimaryClass} select-all`} style={{ ...headingStyle, fontSize: `${titleFontSize}px` }}>
                {profile.displayName}
              </h1>
              {profile.verified && (
                <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#7c4dff]/20 border border-[#7c4dff]/30 text-[#a78bfa]" title="Verified Creator">
                  <CheckCircle size={14} className="fill-[#7c4dff]/10" />
                </div>
              )}
            </div>

            <p className={`text-[11px] font-medium tracking-wider font-mono ${textMutedClass} mb-3.5`}>
              @{profile.username}
            </p>

            <p className={`text-xs ${textSecondaryClass} mt-1 mb-4 leading-relaxed max-w-sm px-4 select-text`} style={{ fontSize: `${bioFontSize}px` }}>
              {profile.tagline || 'Content Creator'}
            </p>

            {/* Localized location indicator capsule */}
            <div className={`flex items-center gap-1.5 text-[10px] font-mono opacity-90 ${isLight ? 'bg-stone-200/50 border-stone-300' : 'bg-white/[0.05] border-white/[0.08]'} px-3.5 py-1.5 rounded-full mb-6`}>
              <MapPin size={11} className="text-rose-500 shrink-0" />
              <span className={`${textSecondaryClass}`}>{profile.location}</span>
            </div>

            {/* Followers count row if present in mariansantos style */}
            {profile.followersCount && (
              <div className={`flex items-center justify-center gap-10 py-1.5 px-4 select-none w-full border-y ${isLight ? 'border-stone-200' : 'border-white/[0.05]'} mb-6`}>
                <div className="text-center">
                  <div className={`text-[16px] font-extrabold ${textPrimaryClass} leading-none`}>{profile.followersCount}</div>
                  <div className={`text-[10px] ${textMutedClass} mt-1`}>Followers</div>
                </div>
                <div className={`h-6 w-[1px] ${isLight ? 'bg-stone-200' : 'bg-white/[0.08]'}`} />
                <div className="text-center">
                  <div className={`text-[16px] font-extrabold ${textPrimaryClass} leading-none`}>{profile.postsCount || '0'}</div>
                  <div className={`text-[10px] ${textMutedClass} mt-1`}>Posts</div>
                </div>
                <div className={`h-6 w-[1px] ${isLight ? 'bg-stone-200' : 'bg-white/[0.08]'}`} />
                <div className="text-center">
                  <div className={`text-[16px] font-extrabold ${textPrimaryClass} leading-none`}>{profile.collabsCount || '0'}</div>
                  <div className={`text-[10px] ${textMutedClass} mt-1`}>Collabs</div>
                </div>
              </div>
            )}

            {/* Centered raw action circle row */}
            <div className={`flex items-center ${inlineAlignClass} gap-4.5 mb-7 select-none w-full`}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={`w-[42px] h-[42px] rounded-full border ${isLight ? 'border-stone-300 bg-stone-100/80 hover:bg-stone-200 text-stone-700' : 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/15 text-zinc-300'} transition-all flex items-center justify-center`}>
                <Instagram size={17} />
              </a>
              <button onClick={handleShareProfile} className={`w-[42px] h-[42px] rounded-full border ${isLight ? 'border-stone-300 bg-stone-100/80 hover:bg-stone-200 text-stone-700' : 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/15 text-zinc-300'} transition-all flex items-center justify-center`}>
                <Share2 size={17} />
              </button>
              <a href="https://merqato.digital" target="_blank" rel="noreferrer" className={`w-[42px] h-[42px] rounded-full border ${isLight ? 'border-stone-300 bg-stone-100/80 hover:bg-stone-200 text-stone-700' : 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/15 text-zinc-300'} transition-all flex items-center justify-center`}>
                <Globe size={17} />
              </a>
              <button onClick={() => {
                const el = document.getElementById('localized-tip-block');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} className={`w-[42px] h-[42px] rounded-full border ${isLight ? 'border-stone-300 bg-stone-100/80 hover:bg-stone-200 text-stone-700' : 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/15 text-zinc-300'} transition-all flex items-center justify-center`}>
                <Coffee size={17} />
              </button>
            </div>
          </div>
        )}

        {/* SOCIAL LINKS VERTICAL STACK */}
        <div className={`w-full mb-8 ${cardDensity === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}`} id="social-links-block">
          {socialLinks.filter(l => l.active).map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onLinkClick(link.id, 'social')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full ${cardDensity === 'compact' ? 'p-2.5' : 'p-3.5'} flex items-center justify-between group cursor-pointer transition-all duration-300`}
              style={dynamicCardStyle}
              id={`social-link-${link.id}`}
              {...getAttentionGrabberProps(index)}
            >
              <div className="flex items-center gap-3 w-[85%]">
                {getCustomIconForLabel(link.label, link.platform)}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-xs font-semibold ${textPrimaryClass} tracking-tight leading-tight`}>{link.label}</span>
                    {link.tag && (
                      <span className={`px-1 py-0.5 rounded text-[7px] font-extrabold tracking-wider uppercase ${
                        link.tag.includes('HOT') 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}>
                        {link.tag}
                      </span>
                    )}
                  </div>
                  {link.subtitle && cardDensity !== 'compact' && (
                    <span className={`text-[9.5px] ${textMutedClass} font-sans mt-0.5 leading-snug`}>{link.subtitle}</span>
                  )}
                </div>
              </div>
              <ExternalLink size={11} className={`${textMutedClass} opacity-60 group-hover:opacity-100 transition-all shrink-0 mr-1`} />
            </motion.a>
          ))}

          {/* Section 1 Website Builder: Custom CTAs / Text links */}
          {customLinks.filter(cl => cl.active).map((cl, index) => (
            <motion.a
              key={cl.id}
              href={cl.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onLinkClick(cl.id, 'custom')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full ${cardDensity === 'compact' ? 'p-2.5' : 'p-3.5'} flex items-center justify-between group cursor-pointer transition-all duration-300`}
              style={dynamicCardStyle}
              id={`custom-link-preview-${cl.id}`}
              {...getAttentionGrabberProps(index + socialLinks.filter(l => l.active).length)}
            >
              <div className="flex items-center gap-3 w-[85%]">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all shrink-0">
                  <Globe size={15} />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-xs font-semibold ${textPrimaryClass} tracking-tight leading-tight`}>{cl.title}</span>
                    {cl.badge && (
                      <span className={`px-1 py-0.5 rounded text-[7px] font-extrabold tracking-wider uppercase ${
                        cl.badge.includes('HOT') 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold' 
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold'
                      }`}>
                        {cl.badge}
                      </span>
                    )}
                  </div>
                  {cl.subtitle && cardDensity !== 'compact' && (
                    <span className={`text-[9.5px] ${textMutedClass} font-sans mt-0.5 leading-snug`}>{cl.subtitle}</span>
                  )}
                </div>
              </div>
              <ExternalLink size={11} className={`${textMutedClass} opacity-60 group-hover:opacity-100 transition-all shrink-0 mr-1`} />
            </motion.a>
          ))}

          {/* Section 2 Directories: Active Registry Accounts with custom inputs */}
          {Object.entries(profile.socialAccounts || {})
            .filter(([_, data]) => data.active && data.url)
            .map(([platformKey, data], index) => (
              <motion.a
                key={platformKey}
                href={data.url.startsWith('http') ? data.url : `https://${data.url}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full ${cardDensity === 'compact' ? 'p-2.5' : 'p-3.5'} flex items-center justify-between group cursor-pointer transition-all duration-300`}
                style={dynamicCardStyle}
                id={`social-account-preview-${platformKey}`}
                {...getAttentionGrabberProps(index + socialLinks.filter(l => l.active).length + customLinks.filter(c => c.active).length)}
              >
                <div className="flex items-center gap-3 w-[85%]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:scale-105 transition-all shrink-0">
                    {getSocialIcon(platformKey)}
                  </div>
                  <div className="flex flex-col min-w-0 animate-fadeIn">
                    <span className={`text-xs font-semibold ${textPrimaryClass} tracking-tight leading-tight capitalize`}>
                      {platformKey === 'applepodcasts' ? 'Apple Podcasts' : platformKey}
                    </span>
                    {cardDensity !== 'compact' && (
                      <span className={`text-[9.5px] ${textMutedClass} font-sans mt-0.5 leading-none`}>
                        Connect on {platformKey === 'applepodcasts' ? 'Apple Podcasts' : platformKey}
                      </span>
                    )}
                  </div>
                </div>
                <ExternalLink size={11} className={`${textMutedClass} opacity-60 group-hover:opacity-100 transition-all shrink-0 mr-1`} />
              </motion.a>
            ))}
        </div>

        {/* A. MERQATO GRID SIDE-BY-SIDE */}
        {gridItems.length > 0 && (
          <div className="w-full mb-8" id="merqato-grid-block">
            <div className="w-full flex items-center justify-between mb-4">
              <div>
                <h2 className={`text-base font-extrabold ${textPrimaryClass} tracking-tight`}>Merqato Grid</h2>
                <p className={`text-xs ${textMutedClass} mt-0.5`}>Curated content & collections</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={handlePrevSlide}
                  className={`w-7 h-7 rounded-full border ${isLight ? 'border-stone-300 bg-stone-150 hover:bg-stone-200 text-stone-700' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-white/80'} flex items-center justify-center transition-all cursor-pointer`}
                  title="Previous Product"
                >
                  <ChevronLeft size={15} />
                </button>
                <button 
                  onClick={handleNextSlide}
                  className={`w-7 h-7 rounded-full border ${isLight ? 'border-stone-300 bg-stone-150 hover:bg-stone-200 text-stone-700' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-white/80'} flex items-center justify-center transition-all cursor-pointer`}
                  title="Next Product"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* 2 columns side-by-side matches the exact image layout */}
            <div className="grid grid-cols-2 gap-4 w-full mb-3.5">
              {gridItems.map((item) => (
                <a 
                  key={item.id} 
                  href={item.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={() => onLinkClick(item.id, 'grid')}
                  className={`relative aspect-[4/5] rounded-2xl overflow-hidden group border ${isLight ? 'border-stone-300 bg-stone-100 shadow-sm' : 'border-white/[0.06] bg-zinc-950/40 shadow-lg'} transition-all duration-300 hover:scale-[1.015]`}
                >
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none" />
                  
                  {/* Black capsule category tag on top-left of photo */}
                  <span className="absolute top-3 left-3 bg-black/85 backdrop-blur-md text-[8.5px] font-extrabold tracking-widest text-white/95 px-2.5 py-1 rounded-md border border-white/[0.05]">
                    {item.price || 'FEATURED'}
                  </span>
                  
                  {/* Dark gradient overlay and title display at the bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex items-end p-3.5">
                    <span className="text-[11.5px] font-bold text-white leading-snug tracking-tight">
                      {item.title}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Pagination custom active indicator slide dot */}
            <div className="flex gap-1.5 justify-center mb-1">
              <div className="h-1.5 w-4 rounded-full bg-pink-500 transition-all duration-300" />
              <div className={`h-1.5 w-1.5 rounded-full ${isLight ? 'bg-stone-300' : 'bg-white/20'}`} />
              <div className={`h-1.5 w-1.5 rounded-full ${isLight ? 'bg-stone-300' : 'bg-white/20'}`} />
            </div>
          </div>
        )}

        {/* B. INLINE VIDEO STREAMER */}
        {videoModule.enabled && videoModule.videoUrl && (
          <div className="w-full mb-8 animate-fade-in" id="video-stream-block">
            <div className="w-full flex flex-col mb-4">
              <h2 className="text-base font-extrabold text-white tracking-tight">Featured Video</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Latest vlog episode</p>
            </div>

            <div className="w-full aspect-video rounded-2xl overflow-hidden relative border border-white/[0.08] bg-zinc-950 group shadow-lg">
              {isVideoPlaying ? (
                <iframe
                  src={`${videoModule.videoUrl}?autoplay=1`}
                  title={videoModule.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0 rounded-2xl"
                />
              ) : (
                <div 
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 cursor-pointer flex flex-col justify-between"
                  id="vlog-thumbnail-wrapper"
                >
                  {/* Rich thumbnail layout */}
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80')" }} />
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/50 transition-colors" />

                  {/* Empty space at top */}
                  <div />

                  {/* Play circle trigger button centered */}
                  <div className="relative z-10 flex items-center justify-center w-full">
                    <div className="h-13 w-13 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center border border-white/20 backdrop-blur-md group-hover:scale-105 transition-transform" id="video-play-layer">
                      <Play size={18} className="fill-white ml-0.5 text-white" />
                    </div>
                  </div>

                  {/* Glassy bottom details control bar */}
                  <div className="relative z-10 bg-black/60 backdrop-blur-md border-t border-white/[0.07] p-3 flex items-center justify-between select-none">
                    <div className="min-w-0 pr-4">
                      <div className="text-[11.5px] font-bold text-white tracking-wide truncate">
                        {videoModule.title}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-medium mt-0.5">
                        45K views • 2 days ago
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-white/70">
                      <button className="hover:text-white transition-colors" title="Mute">
                        <Volume2 size={13} />
                      </button>
                      <button className="hover:text-white transition-colors" title="Fullscreen">
                        <Maximize2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* C. DIRECT LOCALIZED TIP-SUPPORT WIDGET */}
        <div className="w-full mb-8" id="localized-tip-block">
          <div className="w-full flex flex-col mb-4">
            <h2 className={`text-base font-extrabold ${textPrimaryClass} tracking-tight`}>Support Creator</h2>
            <p className={`text-xs ${textMutedClass} mt-0.5`}>Send tips via local payment channels</p>
          </div>

          <div className={`w-full rounded-2xl ${bgCardClass} p-5 shadow-lg`} id="payment-widget-container">
            <form onSubmit={handleInitiateTip} className="space-y-4">
              
              {/* PAYMENT CHANNEL SELECTOR */}
              <div>
                <label className={`block text-[10px] font-mono tracking-wider ${isLight ? 'text-stone-550' : 'text-purple-400'} uppercase font-semibold mb-2.5`}>
                  SELECT PAYMENT METHOD
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('gcash')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedMethod === 'gcash'
                        ? 'bg-[#005cfa] border-blue-500 text-white font-bold shadow-[0_4px_12px_rgba(0,92,250,0.25)]'
                        : `${isLight ? 'bg-stone-100 border-stone-250 text-stone-700 hover:bg-stone-200' : 'bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.06] text-zinc-300'}`
                    } text-[11px] font-sans`}
                    id="select-gcash"
                  >
                    GCash
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('maya')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedMethod === 'maya'
                        ? 'bg-emerald-600/35 border-emerald-500 text-emerald-300 font-bold shadow-[0_4px_12px_rgba(16,185,129,0.15)]'
                        : `${isLight ? 'bg-stone-105 border-stone-250 text-stone-700 hover:bg-stone-200' : 'bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.06] text-zinc-300'}`
                    } text-[11px] font-sans`}
                    id="select-maya"
                  >
                    Maya
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('bank')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedMethod === 'bank'
                        ? 'bg-purple-600/30 border-purple-500/40 text-purple-300 font-bold shadow-[0_4px_12px_rgba(139,92,246,0.15)]'
                        : `${isLight ? 'bg-stone-105 border-stone-250 text-stone-700 hover:bg-stone-200' : 'bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.06] text-zinc-300'}`
                    } text-[11px] font-sans`}
                    id="select-bank"
                  >
                    Bank
                  </button>
                </div>
              </div>

              {/* CHOOSE AMOUNT BUTTON PRESETS */}
              <div>
                <label className={`block text-[10px] font-mono tracking-wider ${isLight ? 'text-stone-550' : 'text-purple-400'} uppercase font-semibold mb-2.5`}>
                  AMOUNT (₱)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[50, 100, 200, 500].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setTipAmount(preset)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        tipAmount === preset
                          ? selectedMethod === 'gcash' 
                            ? 'bg-[#005cfa] border-blue-500 text-white shadow-md'
                            : `${isLight ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-zinc-950 border-white'}`
                          : `${isLight ? 'bg-stone-105 border-stone-250 text-stone-700 hover:bg-stone-200' : 'bg-white/[0.03] border-white/[0.05] hover:bg-white/[0.06] text-zinc-300'}`
                      }`}
                      id={`preset-${preset}`}
                    >
                      ₱{preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* INPUT FIELDS AREA */}
              <div className="space-y-3 font-sans">
                <div className="relative">
                  <span className={`absolute left-3.5 top-3.5 text-sm ${textMutedClass}`}>₱</span>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={tipAmount}
                    onChange={(e) => {
                      const val = e.target.value === '' ? '' : Math.abs(parseInt(e.target.value));
                      setTipAmount(val as number | '');
                    }}
                    className={`w-full rounded-xl border ${isLight ? 'border-stone-300 bg-stone-50 text-stone-900 focus:border-stone-400 placeholder-stone-400 font-medium' : 'border-white/[0.06] bg-black/30 text-white focus:border-white/15 placeholder-zinc-500'} py-3 pl-8 pr-4 text-xs focus:outline-hidden`}
                    min="1"
                    max="50000"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className={`w-full rounded-xl border ${isLight ? 'border-stone-300 bg-stone-50 text-stone-900 focus:border-stone-400 placeholder-stone-400 font-medium' : 'border-white/[0.06] bg-black/30 text-white focus:border-white/15 placeholder-zinc-500'} py-3 px-4 text-xs focus:outline-hidden`}
                />

                <textarea
                  placeholder="Support Message / Note (Optional)"
                  value={tipMessage}
                  onChange={(e) => setTipMessage(e.target.value)}
                  rows={2}
                  className={`w-full rounded-xl border ${isLight ? 'border-stone-300 bg-stone-50 text-stone-900 focus:border-stone-400 placeholder-stone-400 font-medium' : 'border-white/[0.06] bg-black/30 text-white focus:border-white/15 placeholder-zinc-500'} p-3.5 text-xs focus:outline-hidden resize-none`}
                />
              </div>

              {tipError && <p className="text-[11px] font-mono text-center text-rose-400">{tipError}</p>}

              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl border ${isLight ? 'border-stone-300 bg-stone-800 text-white hover:bg-stone-900' : 'border-white/10 bg-white/[0.04] text-white/80 hover:bg-white/10 hover:text-white'} font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer`}
                id="tip-action-submit"
              >
                <Heart size={14} className="stroke-current shrink-0" />
                Support with ₱{tipAmount ? Number(tipAmount).toLocaleString() : '0'}
              </button>

              <div className={`text-center text-[10px] ${textMutedClass} font-sans`}>
                Payments are processed securely via {selectedMethod === 'gcash' ? 'GCash' : selectedMethod === 'maya' ? 'Maya' : 'Instapay'}
              </div>
            </form>
          </div>
        </div>

        {/* D. JOIN THE INNER CIRCLE (LEAD CAPTURE) */}
        <div className="w-full mb-8" id="lead-capture-block">
          <div className="w-full flex flex-col mb-4">
            <h2 className={`text-base font-extrabold ${textPrimaryClass} tracking-tight`}>Join the Inner Circle</h2>
            <p className={`text-xs ${textMutedClass} mt-0.5`}>Exclusive updates, discounts & early access</p>
          </div>

          <div className={`w-full rounded-2xl ${bgCardClass} p-5 shadow-lg`}>
            <AnimatePresence mode="wait">
              {leadStatus === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center"
                >
                  <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
                    <CheckCircle size={16} />
                  </div>
                  <h4 className={`text-sm font-bold ${textPrimaryClass}`}>Awesome, you're on the list!</h4>
                  <p className={`text-[10px] ${textMutedClass} mt-1`}>Welcome! Check your inbox soon.</p>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleLeadSubmit} className="space-y-3">
                  {/* Name Input */}
                  <div className="relative">
                    <User size={13} className={`absolute left-3.5 top-3.5 ${textMutedClass}`} />
                    <input
                      type="text"
                      required
                      placeholder="Your full name *"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className={`w-full rounded-xl border ${isLight ? 'border-stone-300 bg-stone-50 text-stone-900 focus:border-stone-400 placeholder-stone-400 font-medium' : 'border-white/[0.06] bg-black/30 text-white focus:border-white/15 placeholder-zinc-500'} py-3 pl-9 pr-4 text-xs focus:outline-hidden`}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <Mail size={13} className={`absolute left-3.5 top-3.5 ${textMutedClass}`} />
                    <input
                      type="email"
                      required
                      placeholder="your@email.com *"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className={`w-full rounded-xl border ${isLight ? 'border-stone-300 bg-stone-50 text-stone-900 focus:border-stone-400 placeholder-stone-400 font-medium' : 'border-white/[0.06] bg-black/30 text-white focus:border-white/15 placeholder-zinc-500'} py-3 pl-9 pr-4 text-xs focus:outline-hidden`}
                    />
                  </div>

                  {/* Optional Phone Input */}
                  <div className="relative">
                    <Phone size={12} className={`absolute left-3.5 top-3.5 ${textMutedClass}`} />
                    <input
                      type="tel"
                      placeholder="Mobile number (optional)"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className={`w-full rounded-xl border ${isLight ? 'border-stone-300 bg-stone-50 text-stone-900 focus:border-stone-400 placeholder-stone-400 font-medium' : 'border-white/[0.06] bg-black/30 text-white focus:border-white/15 placeholder-zinc-500'} py-3 pl-9 pr-4 text-xs focus:outline-hidden font-mono`}
                    />
                  </div>

                  {/* Interest Selection Dropdown */}
                  <div className="space-y-1">
                    <label className={`block text-[10px] ${textMutedClass} font-mono tracking-wider font-extrabold uppercase pl-0.5`}>
                      Your Main Interest
                    </label>
                    <div className="relative">
                      <select
                        value={leadInterest}
                        onChange={(e) => setLeadInterest(e.target.value)}
                        className={`w-full rounded-xl border ${isLight ? 'border-stone-300 bg-stone-50 text-stone-900 focus:border-stone-400' : 'border-white/[0.06] bg-black/30 text-white focus:border-white/15'} py-3 px-3.5 pr-8 text-xs focus:outline-hidden appearance-none cursor-pointer font-medium`}
                      >
                        <option value="Newsletter & General Updates" className={isLight ? 'bg-white text-stone-900' : 'bg-zinc-950 text-white'}>Updates &amp; Announcements</option>
                        <option value="Exclusive Discounts & Offers" className={isLight ? 'bg-white text-stone-900' : 'bg-zinc-950 text-white'}>Discounts, Deals &amp; Store Promo</option>
                        <option value="Pre-orders & Launch Access" className={isLight ? 'bg-white text-stone-900' : 'bg-zinc-950 text-white'}>Early Beta &amp; Pre-Order Access</option>
                        <option value="Brand Collaboration Queries" className={isLight ? 'bg-white text-stone-900' : 'bg-zinc-950 text-white'}>Work Collab / Brand Sponsor Pitch</option>
                        <option value="Join Beta / Product Tester Team" className={isLight ? 'bg-white text-stone-900' : 'bg-zinc-950 text-white'}>Product Testing &amp; Feedback Crew</option>
                      </select>
                      <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Sparkles size={11} className={textMutedClass} />
                      </div>
                    </div>
                  </div>

                  {/* Optional Custom Note Form Text Area */}
                  <div className="relative">
                    <MessageSquare size={13} className={`absolute left-3.5 top-3 ${textMutedClass}`} />
                    <textarea
                      placeholder="Add a message or inquiry (optional)..."
                      value={leadNote}
                      onChange={(e) => setLeadNote(e.target.value)}
                      rows={2}
                      className={`w-full rounded-xl border ${isLight ? 'border-stone-300 bg-stone-50 text-stone-900 focus:border-stone-400 placeholder-stone-400 font-medium' : 'border-white/[0.06] bg-black/30 text-white focus:border-white/15 placeholder-zinc-500'} py-2.5 pl-9 pr-4 text-xs focus:outline-hidden resize-none`}
                    />
                  </div>

                  {/* Explicit Marketing Consent Checkbox */}
                  <label className="flex items-start gap-2.5 px-0.5 py-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={leadMarketingConsent}
                      onChange={(e) => setLeadMarketingConsent(e.target.checked)}
                      className="mt-0.5 accent-[#ff007f] cursor-pointer rounded"
                    />
                    <span className={`text-[10px] ${textMutedClass} leading-snug`}>
                      I consent to receiving exclusive updates, promotional deals, and newsletters.
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={leadStatus === 'submitting'}
                    className="w-full py-3.5 mt-1.5 rounded-xl bg-gradient-to-r from-[#d946ef] to-[#ff007f] hover:brightness-110 active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_4px_12px_rgba(236,72,153,0.25)] cursor-pointer border-0"
                    id="lead-capture-submit"
                  >
                    {leadStatus === 'submitting' ? (
                      <>
                        <Loader2 size={13} className="animate-spin text-white mr-1" />
                        Submitting Lead Profile...
                      </>
                    ) : (
                      <>
                        <Send size={11} className="mr-0.5" />
                        Join Creator's Club
                      </>
                    )}
                  </button>

                  <div className={`text-center text-[10px] ${textMutedClass} mt-1 leading-normal`}>
                    No spam, ever. Unsubscribe anytime. We respect your privacy. 🔒
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* E. FOOTER REGISTRATION & DESIGN CREDITS */}
        <div className={`text-center text-[10.5px] ${textMutedClass} flex flex-col items-center gap-1.5 pt-4 pb-2 select-none`}>
          <div className={`flex items-center gap-1 font-semibold ${textMutedClass}`}>
            Made with 💖 by Merqato
          </div>
          <div className={`flex items-center gap-1 font-medium font-sans ${textMutedClass}`}>
            <Lock size={10} className={`${textMutedClass} shrink-0`} /> Secured & Self-Hosted · merqato.digital
          </div>
          <div className={`flex justify-center gap-3 text-[10px] ${textMutedClass} font-mono mt-1 select-none`}>
            <span className="hover:opacity-85 cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:opacity-85 cursor-pointer">Terms</span>
            <span>·</span>
            <span className="hover:opacity-85 cursor-pointer">Support</span>
          </div>
          <div className={`${isLight ? 'bg-stone-200/60 border-stone-300 text-stone-800 hover:bg-stone-200' : 'bg-white/[0.03] border-white/[0.08] text-white/50 hover:bg-white/[0.06]'} border px-3.5 py-1.5 rounded-full text-xs font-mono select-all inline-flex items-center gap-2 mt-4 transition-all cursor-pointer`}>
            <div className="h-2 w-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899] animate-pulse" />
            merqato.digital
          </div>
        </div>

      </motion.div>

      {/* SECURE GCASH / MAYA PAYMENT POPUP ROUTE */}
      <TipModal
        isOpen={isTipModalOpen}
        onClose={() => setIsTipModalOpen(false)}
        creatorName={profile.displayName}
        amount={Number(tipAmount) || 0}
        paymentMethod={selectedMethod}
        onPaymentSuccess={handlePaymentSuccess}
        donorName={donorName}
        message={tipMessage}
        gcashQrUrl={profile.gcashQrUrl}
        mayaQrUrl={profile.mayaQrUrl}
        gcashNumber={profile.gcashNumber}
        mayaNumber={profile.mayaNumber}
      />

    </div>
  );
}
