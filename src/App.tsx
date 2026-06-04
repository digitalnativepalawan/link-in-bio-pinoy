import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Settings, 
  DollarSign, 
  Sparkles, 
  Users, 
  MapPin, 
  Share2, 
  Heart, 
  Grid,
  CheckCircle2,
  Tv,
  ExternalLink,
  MessageSquare,
  Volume2,
  Maximize2
} from 'lucide-react';

import { CreatorProfile, SocialLink, GridItem, ThemeConfig, VideoModule, Lead, Tip, CustomLink, BackgroundPreset } from './types';
import { THEMES, INITIAL_CREATORS, INITIAL_SOCIALS, INITIAL_GRID_ITEMS, INITIAL_VIDEOS, INITIAL_LEADS, INITIAL_TIPS, INITIAL_CUSTOM_LINKS } from './data';
import Dashboard from './components/Dashboard';
import MobilePreview from './components/MobilePreview';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // Preset select state
  const [currentCreatorId, setCurrentCreatorId] = useState<string>('mariansantos');
  
  // Stateful master collections for Admin panel & custom added profiles
  const [backgroundPresets, setBackgroundPresets] = useState<BackgroundPreset[]>(() => {
    const local = localStorage.getItem('merqato_presets');
    if (local) return JSON.parse(local);
    return [
      { id: 'batanes-hills', name: 'Batanes Hills ⛰️', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80' },
      { id: 'el-nido-lagoon', name: 'El Nido Lagoon 🛶', url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80' },
      { id: 'boracay-sunset', name: 'Boracay Sunset 🌅', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80' },
      { id: 'siargao-palms', name: 'Siargao Palms 🌴', url: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=1200&q=80' },
      { id: 'cebu-kawasan', name: 'Cebu Kawasan 🌊', url: 'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&w=1200&q=80' },
      { id: 'pulag-clouds', name: 'Pulag Clouds ☁️', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80' },
    ];
  });

  const [creatorsList, setCreatorsList] = useState<CreatorProfile[]>(() => {
    const local = localStorage.getItem('merqato_creators');
    return local ? JSON.parse(local) : INITIAL_CREATORS;
  });

  const [socialsMap, setSocialsMap] = useState<Record<string, SocialLink[]>>(() => {
    const local = localStorage.getItem('merqato_sociallinks_map');
    return local ? JSON.parse(local) : INITIAL_SOCIALS;
  });

  const [customLinksMap, setCustomLinksMap] = useState<Record<string, CustomLink[]>>(() => {
    const local = localStorage.getItem('merqato_customlinks_map');
    return local ? JSON.parse(local) : INITIAL_CUSTOM_LINKS;
  });

  const [gridItemsMap, setGridItemsMap] = useState<Record<string, GridItem[]>>(() => {
    const local = localStorage.getItem('merqato_griditems_map');
    return local ? JSON.parse(local) : INITIAL_GRID_ITEMS;
  });

  const [videosMap, setVideosMap] = useState<Record<string, VideoModule>>(() => {
    const local = localStorage.getItem('merqato_videos_map');
    return local ? JSON.parse(local) : INITIAL_VIDEOS;
  });

  // Admin Open check state
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // High-level states initialized from presets
  const [profile, setProfile] = useState<CreatorProfile>(() => {
    const local = localStorage.getItem('merqato_creators');
    const list = local ? JSON.parse(local) : INITIAL_CREATORS;
    return list.find((c: any) => c.username === 'mariansantos') || list[0];
  });
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => socialsMap['mariansantos'] || []);
  const [customLinks, setCustomLinks] = useState<CustomLink[]>(() => customLinksMap['mariansantos'] || []);
  const [gridItems, setGridItems] = useState<GridItem[]>(() => gridItemsMap['mariansantos'] || []);
  const [videoModule, setVideoModule] = useState<VideoModule>(() => videosMap['mariansantos'] || { enabled: false, videoUrl: '', title: '', autoplay: false });
  
  // DB Leads and Tips mapped dictionary to persist during swap v3
  const [allLeads, setAllLeads] = useState<Record<string, Lead[]>>(INITIAL_LEADS);
  const [allTips, setAllTips] = useState<Record<string, Tip[]>>(INITIAL_TIPS);

  // Layout View modes: 'split' (Default) or 'phone-only' for full mobile feel
  const [appViewMode, setAppViewMode] = useState<'split' | 'phone-only'>('split');

  // Simulator height mode: 'iphone' (fixed phone chassis) or 'full' (stretch full page height)
  const [simulatorMode, setSimulatorMode] = useState<'iphone' | 'full'>('iphone');

  // Triggering live interactive banner / toast
  const [liveToast, setLiveToast] = useState<{ id: string; msg: string; amt?: number } | null>(null);

  // Active theme mapping
  const [activeTheme, setActiveTheme] = useState<ThemeConfig>(THEMES[0]);

  // Design / Premium background layout configuration state
  const [bgLayout, setBgLayout] = useState<'entire' | 'hero'>('entire');
  const [bgImage, setBgImage] = useState<string>(''); // Base64 uploaded or preselected image
  const [bgOpacity, setBgOpacity] = useState<number>(40); // darken overlay percentage
  const [bgBlur, setBgBlur] = useState<number>(0); // blur density in px
  const [bgZoom, setBgZoom] = useState<number>(100); // wallpaper custom zoom scale percent
  const [bgPosition, setBgPosition] = useState<string>('center'); // wallpaper position alignment
  const [bgRepeat, setBgRepeat] = useState<boolean>(false); // tile backdrop option
  const [bgSize, setBgSize] = useState<string>('cover'); // 'cover' | 'contain' | 'custom'
  const [bgSizePercent, setBgSizePercent] = useState<number>(100); // 10% to 300%
  const [bgPositionX, setBgPositionX] = useState<number>(50); // 0% to 100%
  const [bgPositionY, setBgPositionY] = useState<number>(50); // 0% to 100%

  // Section 3: Advanced Aesthetics layout/design states
  // 1. TYPOGRAPHY
  const [fontPairing, setFontPairing] = useState<string>('tech'); // 'elegant' | 'tech' | 'bold'
  const [titleFontSize, setTitleFontSize] = useState<number>(20); // 14px to 28px
  const [bioFontSize, setBioFontSize] = useState<number>(14); // 12px to 18px
  const [letterSpacing, setLetterSpacing] = useState<number>(0); // -0.05em to 0.15em

  // 2. CARD & BUTTON STYLING
  const [btnStyle, setBtnStyle] = useState<string>('filled'); // 'filled' | 'outline' | 'shadow'
  const [cornerRadius, setCornerRadius] = useState<number>(12); // bgRadius: 0 to 99px, classic indicator is 8
  const [cardDensity, setCardDensity] = useState<string>('comfortable'); // 'comfortable' | 'compact' | 'grid'
  const [glassBlur, setGlassBlur] = useState<number>(12); // 0px to 20px
  const [cardOpacity, setCardOpacity] = useState<number>(30); // 10% to 100%
  const [borderGlow, setBorderGlow] = useState<boolean>(false); // subtle neon glow border

  // 3. PROFILE HEADER LAYOUT
  const [profileAlign, setProfileAlign] = useState<string>('center'); // 'left' | 'center' | 'right'
  const [avatarShape, setAvatarShape] = useState<string>('circle'); // 'circle' | 'squircle' | 'hexagon'
  const [headerStyle, setHeaderStyle] = useState<string>('standard'); // 'standard' | 'minimal' | 'split'

  // 4. ANIMATIONS & FX
  const [attentionGrabber, setAttentionGrabber] = useState<string>('none'); // 'none' | 'pulse' | 'wobble' | 'glow'
  const [pageTransition, setPageTransition] = useState<string>('smooth'); // 'none' | 'smooth' | 'cascade'

  // 5. SEO & SOCIAL SHARING STATE
  const [seoTitle, setSeoTitle] = useState<string>('');
  const [seoDescription, setSeoDescription] = useState<string>('');
  const [seoImage, setSeoImage] = useState<string>('');

  // Synchronize dynamic profiles from our stateful lists when selection is changed (Swapped)
  useEffect(() => {
    const creator = creatorsList.find(c => c.username === currentCreatorId);
    if (creator) {
      setProfile(creator);
      setSocialLinks(socialsMap[currentCreatorId] || []);
      setCustomLinks(customLinksMap[currentCreatorId] || []);
      setGridItems(gridItemsMap[currentCreatorId] || []);
      setVideoModule(videosMap[currentCreatorId] || { enabled: false, videoUrl: '', title: '', autoplay: false });
      
      const matchTheme = THEMES.find(t => t.id === creator.themeId) || THEMES[0];
      setActiveTheme(matchTheme);

      // Initialize SEO state variables with defaults or local overrides
      const savedTitle = localStorage.getItem(`merqato_seo_title_${currentCreatorId}`);
      const savedDesc = localStorage.getItem(`merqato_seo_desc_${currentCreatorId}`);
      const savedImg = localStorage.getItem(`merqato_seo_img_${currentCreatorId}`);

      setSeoTitle(savedTitle || `${creator.displayName} | Link-in-Bio hub`);
      setSeoDescription(savedDesc || creator.bio || "Welcome to my customized links and feeds hub. View my content, tipping channels, and social links!");
      setSeoImage(savedImg || creator.avatarUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80");
    }
  }, [currentCreatorId]);

  // Persist SEO edits to localStorage
  useEffect(() => {
    if (currentCreatorId && seoTitle) {
      localStorage.setItem(`merqato_seo_title_${currentCreatorId}`, seoTitle);
    }
  }, [seoTitle, currentCreatorId]);

  useEffect(() => {
    if (currentCreatorId && seoDescription) {
      localStorage.setItem(`merqato_seo_desc_${currentCreatorId}`, seoDescription);
    }
  }, [seoDescription, currentCreatorId]);

  useEffect(() => {
    if (currentCreatorId && seoImage) {
      localStorage.setItem(`merqato_seo_img_${currentCreatorId}`, seoImage);
    }
  }, [seoImage, currentCreatorId]);

  // Dynamic real SEO update for index.html tags and browser tabs
  useEffect(() => {
    if (!seoTitle) return;
    document.title = seoTitle;
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seoDescription);

    // Update Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: seoTitle },
      { property: 'og:description', content: seoDescription },
      { property: 'og:image', content: seoImage },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href }
    ];

    ogTags.forEach(({ property, content }) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    });
  }, [seoTitle, seoDescription, seoImage]);

  // Local storage writers
  useEffect(() => {
    localStorage.setItem('merqato_presets', JSON.stringify(backgroundPresets));
  }, [backgroundPresets]);

  useEffect(() => {
    localStorage.setItem('merqato_creators', JSON.stringify(creatorsList));
  }, [creatorsList]);

  useEffect(() => {
    localStorage.setItem('merqato_sociallinks_map', JSON.stringify(socialsMap));
  }, [socialsMap]);

  useEffect(() => {
    localStorage.setItem('merqato_customlinks_map', JSON.stringify(customLinksMap));
  }, [customLinksMap]);

  useEffect(() => {
    localStorage.setItem('merqato_griditems_map', JSON.stringify(gridItemsMap));
  }, [gridItemsMap]);

  useEffect(() => {
    localStorage.setItem('merqato_videos_map', JSON.stringify(videosMap));
  }, [videosMap]);

  // Auto-save edited local states back into master maps
  useEffect(() => {
    if (profile && profile.username) {
      setCreatorsList(prev => {
        if (!prev.some(c => c.username === profile.username)) return prev;
        return prev.map(c => c.username === profile.username ? profile : c);
      });
    }
  }, [profile]);

  useEffect(() => {
    setSocialsMap(prev => ({ ...prev, [currentCreatorId]: socialLinks }));
  }, [socialLinks, currentCreatorId]);

  useEffect(() => {
    setCustomLinksMap(prev => ({ ...prev, [currentCreatorId]: customLinks }));
  }, [customLinks, currentCreatorId]);

  useEffect(() => {
    setGridItemsMap(prev => ({ ...prev, [currentCreatorId]: gridItems }));
  }, [gridItems, currentCreatorId]);

  useEffect(() => {
    setVideosMap(prev => ({ ...prev, [currentCreatorId]: videoModule }));
  }, [videoModule, currentCreatorId]);

  // Handle link click events locally
  const handleLinkClick = (id: string, type: 'social' | 'grid' | 'custom') => {
    // Increment the specific link inside active state
    if (type === 'social') {
      setSocialLinks(prev => prev.map(l => l.id === id ? { ...l, clicks: l.clicks + 1 } : l));
      triggerToast('Redirect click tracked on Social Link module!');
    } else if (type === 'custom') {
      setCustomLinks(prev => prev.map(cl => cl.id === id ? { ...cl, clicks: cl.clicks + 1 } : cl));
      triggerToast('Redirect click tracked on Website builder custom link!');
    } else {
      setGridItems(prev => prev.map(g => g.id === id ? { ...g, clicks: g.clicks + 1 } : g));
      triggerToast('Local Commerce Checkout link registered!');
    }
  };

  // Toast Trigger Helper
  const triggerToast = (msg: string, amt?: number) => {
    const id = Date.now().toString();
    setLiveToast({ id, msg, amt });
    setTimeout(() => {
      setLiveToast((current) => current?.id === id ? null : current);
    }, 4500);
  };

  // Add captured newsletter lead subscription
  const handleNewLeadSubmission = (
    leadName: string,
    leadEmail: string,
    phone?: string,
    interest?: string,
    note?: string,
    marketingConsent?: boolean
  ) => {
    const newLead: Lead = {
      id: 'lead-' + Date.now(),
      name: leadName,
      email: leadEmail,
      phone,
      interest,
      note,
      marketingConsent,
      timestamp: new Date().toISOString()
    };

    setAllLeads(prev => ({
      ...prev,
      [currentCreatorId]: [newLead, ...(prev[currentCreatorId] || [])]
    }));

    triggerToast(`🎉 New Lead Registered: ${leadName} subscribed!`);
  };

  // Handle tipping completed successfully
  const handleNewTipCompleted = (donorName: string, amount: number, paymentMethod: 'gcash' | 'maya' | 'bank', message: string) => {
    const newTip: Tip = {
      id: 'tip-' + Date.now(),
      donorName,
      amount,
      paymentMethod,
      message,
      timestamp: new Date().toISOString()
    };

    setAllTips(prev => ({
      ...prev,
      [currentCreatorId]: [newTip, ...(prev[currentCreatorId] || [])]
    }));

    triggerToast(`💰 Fan support of ₱${amount.toLocaleString()} received via ${paymentMethod.toUpperCase()}!`, amount);
  };

  // Sandbox simulation event: generate instant PHP donation
  const handleTriggerSimulatedTip = () => {
    const randomDonors = ['Jose Alvarez', 'Nikki Santos', 'Dev Maria', 'Chef Ryan', 'Patricia Lim', 'Anon Pinoy', 'Jorella UGC'];
    const randomMessages = [
      'Ang ganda ng templates nyo po!',
      'Supporting GCash digital products reviews!',
      'Mabuhay ang Filipino creators! Solid!',
      'Thanks for the Shopee link, bought 2!',
      'Salamats for Cebu hot sauce. Really hot!',
      'Highly optimized workspace presets.'
    ];

    const randomName = randomDonors[Math.floor(Math.random() * randomDonors.length)];
    const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    const randomAmount = [100, 200, 500, 1000, 2500][Math.floor(Math.random() * 5)];
    const randomMethod = ['gcash', 'maya', 'bank'][Math.floor(Math.random() * 3)] as 'gcash' | 'maya' | 'bank';

    handleNewTipCompleted(randomName, randomAmount, randomMethod, randomMsg);
  };

  // Clear Leads List
  const handleClearLeads = () => {
    setAllLeads(prev => ({
      ...prev,
      [currentCreatorId]: []
    }));
    triggerToast('Subscribers database flushed successfully.');
  };

  const activeLeads = allLeads[currentCreatorId] || [];
  const activeTips = allTips[currentCreatorId] || [];

  return (
    <div className="min-h-screen bg-[#020203] text-zinc-100 flex flex-col font-sans overflow-x-hidden antialiased">
      
      {/* Platform Real-Time Simulated Alerts */}
      <AnimatePresence>
        {liveToast && (
          <motion.div
            initial={{ opacity: 0, y: -45, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4"
          >
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 shadow-2xl flex items-center gap-3.5" id="real-time-notification-toast">
              <div className={`p-2.5 rounded-xl ${liveToast.amt ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                {liveToast.amt ? <DollarSign className="animate-spin" size={18} /> : <Volume2 size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Live Web Notification</div>
                <p className="text-xs font-bold text-white leading-normal truncate">{liveToast.msg}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER PLATFORM DESKTOP ACTIONS */}
      <header className="bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-900 sticky top-0 z-40 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3Select font-sans select-none">
        
        {/* Merqato Logo Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-8 px-2.5 rounded-lg bg-emerald-500 text-zinc-950 font-black tracking-widest text-sm">
            MERQATO
          </div>
          <p className="hidden md:inline-block text-[11px] font-mono text-zinc-400 tracking-wide font-medium">
            Premium Host Link-in-Bio Solutions • merqato.digital
          </p>
        </div>

        {/* Multi-Creator Tester Preset selection toggle */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <label className="text-xs font-mono text-zinc-400">Load Creator Sample:</label>
          <select
            value={currentCreatorId}
            onChange={(e) => setCurrentCreatorId(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-xs font-semibold rounded-lg px-3 py-1.5 focus:border-zinc-700 focus:outline-hidden text-zinc-200 cursor-pointer"
            id="preset-creator-dropdown"
          >
            {creatorsList.map((c) => (
              <option key={c.username} value={c.username}>
                {c.displayName} (@{c.username})
              </option>
            ))}
          </select>

          {/* Dedicated Authorized Personnel Admin login */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-1.5 px-3 rounded-lg text-xs font-mono font-bold bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 transition-all flex items-center gap-1.5 cursor-pointer"
            id="open-admin-action"
            title="Open Merqato Administrative Dashboard (Passkey Needed)"
          >
            🔑 Admin Console
          </button>

          {/* Toggle Screen Layout Frame button */}
          <div className="flex items-center bg-zinc-900 rounded-lg p-0.5 border border-zinc-850">
            <button
              onClick={() => setAppViewMode('split')}
              className={`p-1 px-2.5 rounded text-[10px] font-mono font-bold transition-all ${
                appViewMode === 'split' ? 'bg-zinc-850 text-white shadow-xs' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Split View"
            >
              Split Portal
            </button>
            <button
              onClick={() => setAppViewMode('phone-only')}
              className={`p-1 px-2.5 rounded text-[10px] font-mono font-bold transition-all ${
                appViewMode === 'phone-only' ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Visitor View Only"
            >
              WebView View
            </button>
          </div>
        </div>
      </header>

      {/* CORE WORKSPACE container layout */}
      <main className="flex-grow flex flex-col md:flex-row items-stretch overflow-hidden">
        
        {/* VIEW 1: PREVIEW SYSTEM & SETTINGS PANEL */}
        {appViewMode === 'split' && (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Split section 1: LEFT side control panel */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col h-full min-h-[500px]">
              <Dashboard
                backgroundPresets={backgroundPresets}
                profile={profile}
                setProfile={setProfile}
                socialLinks={socialLinks}
                setSocialLinks={setSocialLinks}
                customLinks={customLinks}
                setCustomLinks={setCustomLinks}
                gridItems={gridItems}
                setGridItems={setGridItems}
                videoModule={videoModule}
                setVideoModule={setVideoModule}
                leads={activeLeads}
                tips={activeTips}
                onTriggerSimulatedTip={handleTriggerSimulatedTip}
                onClearLeads={handleClearLeads}
                activeTheme={activeTheme}
                setActiveTheme={setActiveTheme}
                onTriggerSimulatedClick={handleLinkClick}
                bgLayout={bgLayout}
                setBgLayout={setBgLayout}
                bgSize={bgSize}
                setBgSize={setBgSize}
                bgSizePercent={bgSizePercent}
                setBgSizePercent={setBgSizePercent}
                bgPositionX={bgPositionX}
                setBgPositionX={setBgPositionX}
                bgPositionY={bgPositionY}
                setBgPositionY={setBgPositionY}
                bgImage={bgImage}
                setBgImage={setBgImage}
                bgOpacity={bgOpacity}
                setBgOpacity={setBgOpacity}
                bgBlur={bgBlur}
                setBgBlur={setBgBlur}
                bgZoom={bgZoom}
                setBgZoom={setBgZoom}
                bgPosition={bgPosition}
                setBgPosition={setBgPosition}
                bgRepeat={bgRepeat}
                setBgRepeat={setBgRepeat}
                fontPairing={fontPairing}
                setFontPairing={setFontPairing}
                titleFontSize={titleFontSize}
                setTitleFontSize={setTitleFontSize}
                bioFontSize={bioFontSize}
                setBioFontSize={setBioFontSize}
                letterSpacing={letterSpacing}
                setLetterSpacing={setLetterSpacing}
                btnStyle={btnStyle}
                setBtnStyle={setBtnStyle}
                cornerRadius={cornerRadius}
                setCornerRadius={setCornerRadius}
                cardDensity={cardDensity}
                setCardDensity={setCardDensity}
                glassBlur={glassBlur}
                setGlassBlur={setGlassBlur}
                cardOpacity={cardOpacity}
                setCardOpacity={setCardOpacity}
                borderGlow={borderGlow}
                setBorderGlow={setBorderGlow}
                profileAlign={profileAlign}
                setProfileAlign={setProfileAlign}
                avatarShape={avatarShape}
                setAvatarShape={setAvatarShape}
                headerStyle={headerStyle}
                setHeaderStyle={setHeaderStyle}
                attentionGrabber={attentionGrabber}
                setAttentionGrabber={setAttentionGrabber}
                pageTransition={pageTransition}
                setPageTransition={setPageTransition}
                seoTitle={seoTitle}
                setSeoTitle={setSeoTitle}
                seoDescription={seoDescription}
                setSeoDescription={setSeoDescription}
                seoImage={seoImage}
                setSeoImage={setSeoImage}
              />
            </div>
            
            {/* Split section 2: RIGHT side simulated in-app native frame */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center">
              
              <div className="flex flex-col items-center gap-3 mb-4 select-none w-full max-w-[340px]">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-zinc-950 p-1.5 px-3 rounded-full border border-zinc-850">
                  <Smartphone size={12} className="text-indigo-400" /> Active Mobile WebView Simulator
                </span>
                
                {/* Simulator Mode Selector Pill */}
                <div className="flex bg-zinc-900/95 border border-zinc-850 rounded-xl p-0.5 w-full">
                  <button
                    onClick={() => setSimulatorMode('iphone')}
                    className={`flex-1 text-center py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      simulatorMode === 'iphone' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <span>📱 iPhone Device</span>
                  </button>
                  <button
                    onClick={() => setSimulatorMode('full')}
                    className={`flex-1 text-center py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      simulatorMode === 'full' ? 'bg-emerald-500/10 border border-emerald-500/15 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <span>📜 Full Page Scroll</span>
                  </button>
                </div>
              </div>

              {simulatorMode === 'iphone' ? (
                /* Physical mobile iPhone chassis device frame with custom notch */
                <div className="relative w-full max-w-[340px] aspect-[9/19] rounded-[42px] border-[10px] border-zinc-900 bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden ring-4 ring-zinc-950">
                  
                  {/* Notch speaker */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-32 bg-zinc-900 rounded-b-xl z-50 flex items-center justify-center">
                    <div className="w-12 h-1 bg-zinc-950 rounded-full" />
                  </div>

                  {/* Simulated in-app browser header */}
                  <div className="bg-zinc-950 pt-5 pb-2.5 px-4 flex items-center justify-between border-b border-zinc-900 text-zinc-400 select-none z-30 shrink-0">
                    <div className="text-[10px] font-mono tracking-tight text-white flex items-center gap-1">
                      <span>9:41</span>
                      <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1 rounded">5G</span>
                    </div>
                    <div className="text-[9px] truncate font-mono text-zinc-400 max-w-[120px] select-all">
                      merqato.digital/{profile.username}
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize2 size={9} onClick={() => setAppViewMode('phone-only')} className="cursor-pointer hover:text-white" />
                    </div>
                  </div>

                  {/* Immersive Mobile WebView Body content */}
                  <div className="flex-grow overflow-hidden relative">
                    <MobilePreview
                      profile={profile}
                      socialLinks={socialLinks}
                      customLinks={customLinks}
                      gridItems={gridItems}
                      videoModule={videoModule}
                      theme={activeTheme}
                      onLinkClick={handleLinkClick}
                      onNewLeadSubmission={handleNewLeadSubmission}
                      onNewTipCompleted={handleNewTipCompleted}
                      isInsideIphone={true}
                      bgLayout={bgLayout}
                      bgSize={bgSize}
                      bgSizePercent={bgSizePercent}
                      bgPositionX={bgPositionX}
                      bgPositionY={bgPositionY}
                      bgImage={bgImage}
                      bgOpacity={bgOpacity}
                      bgBlur={bgBlur}
                      bgZoom={bgZoom}
                      bgPosition={bgPosition}
                      bgRepeat={bgRepeat}
                      fontPairing={fontPairing}
                      titleFontSize={titleFontSize}
                      bioFontSize={bioFontSize}
                      letterSpacing={letterSpacing}
                      btnStyle={btnStyle}
                      cornerRadius={cornerRadius}
                      cardDensity={cardDensity}
                      glassBlur={glassBlur}
                      cardOpacity={cardOpacity}
                      borderGlow={borderGlow}
                      profileAlign={profileAlign}
                      avatarShape={avatarShape}
                      headerStyle={headerStyle}
                      attentionGrabber={attentionGrabber}
                      pageTransition={pageTransition}
                    />
                  </div>
                </div>
              ) : (
                /* Natural stretching browser allows scrolling down the entire content container in the parent site layout */
                <div className="relative w-full max-w-[340px] rounded-[24px] border border-zinc-850 bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden ring-4 ring-zinc-950 h-auto">
                  
                  {/* Simulated standard browser header */}
                  <div className="bg-zinc-950 py-3.5 px-4 flex items-center justify-between border-b border-zinc-900 text-zinc-400 select-none z-30 shrink-0">
                    <div className="text-[10px] font-mono select-all text-zinc-300">
                      merqato.digital/{profile.username}
                    </div>
                    <span className="text-[8px] font-bold tracking-widest bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono uppercase">Full View</span>
                  </div>

                  {/* Fully stretched list */}
                  <div className="h-auto relative">
                    <MobilePreview
                      profile={profile}
                      socialLinks={socialLinks}
                      customLinks={customLinks}
                      gridItems={gridItems}
                      videoModule={videoModule}
                      theme={activeTheme}
                      onLinkClick={handleLinkClick}
                      onNewLeadSubmission={handleNewLeadSubmission}
                      onNewTipCompleted={handleNewTipCompleted}
                      isInsideIphone={false}
                      bgLayout={bgLayout}
                      bgSize={bgSize}
                      bgSizePercent={bgSizePercent}
                      bgPositionX={bgPositionX}
                      bgPositionY={bgPositionY}
                      bgImage={bgImage}
                      bgOpacity={bgOpacity}
                      bgBlur={bgBlur}
                      bgZoom={bgZoom}
                      bgPosition={bgPosition}
                      bgRepeat={bgRepeat}
                      fontPairing={fontPairing}
                      titleFontSize={titleFontSize}
                      bioFontSize={bioFontSize}
                      letterSpacing={letterSpacing}
                      btnStyle={btnStyle}
                      cornerRadius={cornerRadius}
                      cardDensity={cardDensity}
                      glassBlur={glassBlur}
                      cardOpacity={cardOpacity}
                      borderGlow={borderGlow}
                      profileAlign={profileAlign}
                      avatarShape={avatarShape}
                      headerStyle={headerStyle}
                      attentionGrabber={attentionGrabber}
                      pageTransition={pageTransition}
                    />
                  </div>
                </div>
              )}
              
              <p className="mt-3 text-[10px] text-zinc-500 font-mono italic max-w-[280px] text-center select-none leading-relaxed">
                Interactions within the mobile mockup immediately persist and refresh the analytics bars above.
              </p>

            </div>

          </div>
        )}

        {/* VIEW 2: INDEPENDENT IMMERSIVE RAW PROFILE MOBILE PREVIEW ONLY */}
        {appViewMode === 'phone-only' && (
          <div className="flex-grow w-full flex flex-col md:flex-row h-full">
            
            {/* Compact left side action menu to switch creator & return to admin console */}
            <div className="w-full md:w-80 bg-zinc-950/80 backdrop-blur-xl border-b md:border-b-0 md:border-r border-zinc-900 p-6 flex flex-col justify-between select-none">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                    <Smartphone size={16} className="text-emerald-400" /> Web Viewer Simulation
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">This mode models how the Link-in-Bio renders on standard in-app browsers like Instagram, Tiktok, or Messenger WebView.</p>
                </div>

                {/* Preset Picker inside view */}
                <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 space-y-3">
                  <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Change Creator preset</label>
                  <div className="grid grid-cols-1 gap-2">
                    {creatorsList.map((c) => (
                      <button
                        key={c.username}
                        onClick={() => setCurrentCreatorId(c.username)}
                        className={`p-2.5 rounded-lg text-left text-xs font-semibold flex items-center justify-between border transition-all ${
                          currentCreatorId === c.username
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                            : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {c.displayName}
                        <span className="text-[10px] font-mono opacity-60">@{c.username}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sandbox simulation block in view */}
                <div className="bg-zinc-900/35 border border-zinc-850 p-4 rounded-xl space-y-2 text-center">
                  <p className="text-[10px] font-mono text-zinc-500">Test GCash tipping alerts on phone:</p>
                  <button
                    onClick={handleTriggerSimulatedTip}
                    className="w-full py-2 px-3 text-xs font-bold rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-all flex items-center justify-center gap-1 select-none"
                  >
                    🚀 Trigger Sample Tip
                  </button>
                </div>
              </div>

              <div className="pt-6 md:pt-0">
                <button
                  onClick={() => setAppViewMode('split')}
                  className="w-full py-3 rounded-xl bg-white text-zinc-950 font-bold text-xs hover:opacity-90 transition-all text-center select-none"
                  id="tab-back-main"
                >
                  Return to Admin Portal Console
                </button>
              </div>
            </div>

            {/* Expansive responsive profile WebView space */}
            <div className="flex-grow w-full md:flex-row h-full">
              <div className="w-full max-w-md h-full md:max-h-[85vh] md:rounded-[40px] md:border-[12px] md:border-zinc-900 relative shadow-2xl overflow-hidden flex flex-col bg-zinc-950">
                <MobilePreview
                  profile={profile}
                  socialLinks={socialLinks}
                  customLinks={customLinks}
                  gridItems={gridItems}
                  videoModule={videoModule}
                  theme={activeTheme}
                  onLinkClick={handleLinkClick}
                  onNewLeadSubmission={handleNewLeadSubmission}
                  onNewTipCompleted={handleNewTipCompleted}
                  isInsideIphone={false}
                  bgLayout={bgLayout}
                  bgSize={bgSize}
                  bgSizePercent={bgSizePercent}
                  bgPositionX={bgPositionX}
                  bgPositionY={bgPositionY}
                  bgImage={bgImage}
                  bgOpacity={bgOpacity}
                  bgBlur={bgBlur}
                  bgZoom={bgZoom}
                  bgPosition={bgPosition}
                  bgRepeat={bgRepeat}
                  fontPairing={fontPairing}
                  titleFontSize={titleFontSize}
                  bioFontSize={bioFontSize}
                  letterSpacing={letterSpacing}
                  btnStyle={btnStyle}
                  cornerRadius={cornerRadius}
                  cardDensity={cardDensity}
                  glassBlur={glassBlur}
                  cardOpacity={cardOpacity}
                  borderGlow={borderGlow}
                  profileAlign={profileAlign}
                  avatarShape={avatarShape}
                  headerStyle={headerStyle}
                  attentionGrabber={attentionGrabber}
                  pageTransition={pageTransition}
                />
              </div>
            </div>

          </div>
        )}

      </main>

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        creatorsList={creatorsList}
        setCreatorsList={setCreatorsList}
        socialsMap={socialsMap}
        setSocialsMap={setSocialsMap}
        customLinksMap={customLinksMap}
        setCustomLinksMap={setCustomLinksMap}
        gridItemsMap={gridItemsMap}
        setGridItemsMap={setGridItemsMap}
        backgroundPresets={backgroundPresets}
        setBackgroundPresets={setBackgroundPresets}
        currentCreatorId={currentCreatorId}
        setCurrentCreatorId={setCurrentCreatorId}
        triggerToast={triggerToast}
      />

    </div>
  );
}
