import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Trash2, 
  Plus, 
  Edit3, 
  Globe, 
  Image as ImageIcon, 
  UserPlus, 
  UserCheck, 
  FolderLock, 
  CheckCircle,
  Save,
  Sparkles,
  RefreshCw,
  X,
  PlusCircle,
  Link,
  DollarSign,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { CreatorProfile, SocialLink, GridItem, BackgroundPreset, CustomLink } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  creatorsList: CreatorProfile[];
  setCreatorsList: React.Dispatch<React.SetStateAction<CreatorProfile[]>>;
  socialsMap: Record<string, SocialLink[]>;
  setSocialsMap: React.Dispatch<React.SetStateAction<Record<string, SocialLink[]>>>;
  customLinksMap: Record<string, CustomLink[]>;
  setCustomLinksMap: React.Dispatch<React.SetStateAction<Record<string, CustomLink[]>>>;
  gridItemsMap: Record<string, GridItem[]>;
  setGridItemsMap: React.Dispatch<React.SetStateAction<Record<string, GridItem[]>>>;
  backgroundPresets: BackgroundPreset[];
  setBackgroundPresets: React.Dispatch<React.SetStateAction<BackgroundPreset[]>>;
  currentCreatorId: string;
  setCurrentCreatorId: (id: string) => void;
  triggerToast: (msg: string) => void;
}

const MODERN_BG_SUGGESTIONS = [
  { name: 'Palawan Secret Lagoon 🛶', url: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Siargao Cloud 9 Surf 🌴', url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Batanes Scenic Basco Lighthouse ⛰️', url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Mayon Volcano Majestic Dusk 🌋', url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Sagada Sea of Clouds ☁️', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Intramuros Manila Heritage 🏰', url: 'https://images.unsplash.com/photo-1540805513360-149021a41348?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Chocolate Hills Sunrise 🍩', url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Sohoton Cove Marine Dream 🌊', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' },
];

export default function AdminPanel({
  isOpen,
  onClose,
  creatorsList,
  setCreatorsList,
  socialsMap,
  setSocialsMap,
  customLinksMap,
  setCustomLinksMap,
  gridItemsMap,
  setGridItemsMap,
  backgroundPresets,
  setBackgroundPresets,
  currentCreatorId,
  setCurrentCreatorId,
  triggerToast
}: AdminPanelProps) {
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'presets' | 'creators' | 'links'>('presets');

  // Edit / Add Item States
  const [presetNameInput, setPresetNameInput] = useState('');
  const [presetUrlInput, setPresetUrlInput] = useState('');
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null);

  // New Creator Form States
  const [newUsername, setNewUsername] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newAvatar, setNewAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
  const [newLocation, setNewLocation] = useState('Metro Manila, PH');
  const [newGcash, setNewGcash] = useState('');

  // Selected Creator for links editor
  const [selCreatorForLinks, setSelCreatorForLinks] = useState(currentCreatorId);

  // Quick form items
  const [newSocialType, setNewSocialType] = useState<'globe' | 'instagram' | 'tiktok' | 'youtube' | 'email'>('globe');
  const [newSocialLabel, setNewSocialLabel] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  const [newSocialTag, setNewSocialTag] = useState('');

  const [newCustomTitle, setNewCustomTitle] = useState('');
  const [newCustomSubtitle, setNewCustomSubtitle] = useState('');
  const [newCustomUrl, setNewCustomUrl] = useState('');
  const [newCustomBadge, setNewCustomBadge] = useState('');

  const [newGridTitle, setNewGridTitle] = useState('');
  const [newGridPrice, setNewGridPrice] = useState('');
  const [newGridImage, setNewGridImage] = useState('');
  const [newGridUrl, setNewGridUrl] = useState('');

  if (!isOpen) return null;

  const handleVerifyPasskey = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === '5309') {
      setIsAuthenticated(true);
      setErrorMsg('');
      triggerToast('🔒 Admin panel unlocked successfully!');
    } else {
      setErrorMsg('Invalid Passkey! Access Denied.');
      setPasskey('');
    }
  };

  const handleAddPreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!presetNameInput.trim() || !presetUrlInput.trim()) {
      triggerToast('Please provide both a name and an image URL.');
      return;
    }

    if (editingPresetId) {
      // Edit
      setBackgroundPresets(prev => 
        prev.map(p => p.id === editingPresetId ? { ...p, name: presetNameInput, url: presetUrlInput } : p)
      );
      triggerToast(`Presetted background "${presetNameInput}" updated successfully!`);
      setEditingPresetId(null);
    } else {
      // Add
      const newPreset: BackgroundPreset = {
        id: 'preset-' + Date.now(),
        name: presetNameInput,
        url: presetUrlInput
      };
      setBackgroundPresets(prev => [...prev, newPreset]);
      triggerToast(`New scenery backdrop "${presetNameInput}" added to available options!`);
    }

    setPresetNameInput('');
    setPresetUrlInput('');
  };

  const handleStartEditPreset = (p: BackgroundPreset) => {
    setEditingPresetId(p.id);
    setPresetNameInput(p.name);
    setPresetUrlInput(p.url);
  };

  const handleDeletePreset = (id: string) => {
    setBackgroundPresets(prev => prev.filter(p => p.id !== id));
    triggerToast('Scenery template option deleted.');
  };

  const handleApplyModernCombos = () => {
    setBackgroundPresets(MODERN_BG_SUGGESTIONS.map((s, index) => ({
      id: `modern-preset-${index}`,
      name: s.name,
      url: s.url
    })));
    triggerToast('🌄 Modernized high-resolution backdrop presets loaded into database!');
  };

  const handleCreateCreator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newDisplayName.trim()) {
      triggerToast('Username and Display Name are mandatory.');
      return;
    }

    const cleanUsername = newUsername.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '');
    
    if (creatorsList.some(c => c.username === cleanUsername)) {
      triggerToast(`Error: @${cleanUsername} already exists!`);
      return;
    }

    const newCreator: CreatorProfile = {
      username: cleanUsername,
      displayName: newDisplayName,
      tagline: newTagline || 'Digital Nomad & Creative Builder',
      bio: newBio || 'Sharing ideas, designs, and OPM tunes.',
      avatarUrl: newAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      location: newLocation || 'Philippines 🇵🇭',
      themeId: 'sophisticated-dark',
      gcashNumber: newGcash || '0917 000 0000',
      mayaNumber: newGcash || '0917 000 0000',
      bankName: 'UnionBank',
      bankAccount: '123-4567-89',
      verified: true
    };

    setCreatorsList(prev => [...prev, newCreator]);

    // Initialize blank sets for maps
    setSocialsMap(prev => ({ ...prev, [cleanUsername]: [] }));
    setCustomLinksMap(prev => ({ ...prev, [cleanUsername]: [] }));
    setGridItemsMap(prev => ({ ...prev, [cleanUsername]: [] }));

    triggerToast(`✨ Premium Profile for @${cleanUsername} crafted beautifully!`);
    setCurrentCreatorId(cleanUsername);
    setSelCreatorForLinks(cleanUsername);

    // Reset controls
    setNewUsername('');
    setNewDisplayName('');
    setNewTagline('');
    setNewBio('');
    setNewGcash('');
  };

  const handleDeleteCreator = (username: string) => {
    if (creatorsList.length <= 1) {
      triggerToast('Cannot delete last remain profile.');
      return;
    }
    setCreatorsList(prev => prev.filter(c => c.username !== username));
    if (currentCreatorId === username) {
      const remaining = creatorsList.find(c => c.username !== username);
      if (remaining) {
        setCurrentCreatorId(remaining.username);
        setSelCreatorForLinks(remaining.username);
      }
    }
    triggerToast(`Profile @${username} deleted.`);
  };

  // Add individual elements
  const handleAddSocial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSocialUrl.trim() || !newSocialLabel.trim()) return;

    const newLink: SocialLink = {
      id: 'social-link-' + Date.now(),
      platform: newSocialType,
      url: newSocialUrl,
      label: newSocialLabel,
      clicks: 0,
      active: true,
      tag: newSocialTag || undefined
    };

    setSocialsMap(prev => ({
      ...prev,
      [selCreatorForLinks]: [...(prev[selCreatorForLinks] || []), newLink]
    }));

    setNewSocialLabel('');
    setNewSocialUrl('');
    setNewSocialTag('');
    triggerToast('Social custom link appended.');
  };

  const handleAddCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomTitle.trim() || !newCustomUrl.trim()) return;

    const newLink: CustomLink = {
      id: 'custom-link-' + Date.now(),
      title: newCustomTitle,
      subtitle: newCustomSubtitle || undefined,
      url: newCustomUrl,
      badge: newCustomBadge || undefined,
      clicks: 0,
      active: true
    };

    setCustomLinksMap(prev => ({
      ...prev,
      [selCreatorForLinks]: [...(prev[selCreatorForLinks] || []), newLink]
    }));

    setNewCustomTitle('');
    setNewCustomSubtitle('');
    setNewCustomUrl('');
    setNewCustomBadge('');
    triggerToast('Custom website link injected.');
  };

  const handleAddGridItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGridTitle.trim() || !newGridUrl.trim()) return;

    const newItem: GridItem = {
      id: 'grid-item-' + Date.now(),
      title: newGridTitle,
      price: newGridPrice || undefined,
      imageUrl: newGridImage || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=400&q=80',
      url: newGridUrl,
      clicks: 0
    };

    setGridItemsMap(prev => ({
      ...prev,
      [selCreatorForLinks]: [...(prev[selCreatorForLinks] || []), newItem]
    }));

    setNewGridTitle('');
    setNewGridPrice('');
    setNewGridImage('');
    setNewGridUrl('');
    triggerToast('Commerce shop merchandise registered.');
  };

  const handleDeleteSocial = (id: string) => {
    setSocialsMap(prev => ({
      ...prev,
      [selCreatorForLinks]: prev[selCreatorForLinks].filter(l => l.id !== id)
    }));
    triggerToast('Social connector removed.');
  };

  const handleDeleteCustom = (id: string) => {
    setCustomLinksMap(prev => ({
      ...prev,
      [selCreatorForLinks]: prev[selCreatorForLinks].filter(l => l.id !== id)
    }));
    triggerToast('Custom link removed.');
  };

  const handleDeleteGridItem = (id: string) => {
    setGridItemsMap(prev => ({
      ...prev,
      [selCreatorForLinks]: prev[selCreatorForLinks].filter(l => l.id !== id)
    }));
    triggerToast('Commerce model item removed.');
  };

  const handleFakeClickIncrement = (id: string, type: 'social' | 'custom' | 'grid', amount = 100) => {
    if (type === 'social') {
      setSocialsMap(prev => ({
        ...prev,
        [selCreatorForLinks]: prev[selCreatorForLinks].map(l => l.id === id ? { ...l, clicks: l.clicks + amount } : l)
      }));
    } else if (type === 'custom') {
      setCustomLinksMap(prev => ({
        ...prev,
        [selCreatorForLinks]: prev[selCreatorForLinks].map(l => l.id === id ? { ...l, clicks: l.clicks + amount } : l)
      }));
    } else {
      setGridItemsMap(prev => ({
        ...prev,
        [selCreatorForLinks]: prev[selCreatorForLinks].map(l => l.id === id ? { ...l, clicks: l.clicks + amount } : l)
      }));
    }
    triggerToast(`Added ${amount} mockup views to simulation metrics!`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-zinc-950 border border-zinc-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
        id="admin-workspace-dialog"
      >
        
        {/* UPPER TITLE HEADER */}
        <div className="p-6 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-wider uppercase font-mono text-white flex items-center gap-2">
                Merqato Admin Control Dashboard
              </h2>
              <p className="text-[10px] text-zinc-500 font-mono">AUTHORIZED PERSONNEL PORTAL • PORT 3000 CONSOLE</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* AUTHENTICATION WALL */}
        {!isAuthenticated ? (
          <div className="p-8 flex flex-col items-center justify-center text-center max-w-md mx-auto my-12" id="admin-passkey-wall">
            <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mb-4 animate-pulse">
              <Key size={24} />
            </div>
            <h3 className="text-sm font-extrabold text-white tracking-widest uppercase font-mono mb-2">PASSKEY REQUIRED</h3>
            <p className="text-xs text-zinc-400 mb-6 font-mono leading-relaxed">
              Unlock database write authorities. Enter the 4-digit master passkey to continue.
            </p>

            <form onSubmit={handleVerifyPasskey} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter Pin (e.g. 5309)"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono py-3 font-semibold bg-zinc-900 border border-zinc-800 rounded-2xl text-amber-500 focus:outline-none focus:border-amber-500/50"
                  autoFocus
                  required
                />
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
              </div>
              
              {errorMsg && (
                <p className="text-red-500 text-xs font-bold font-mono">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black rounded-2xl tracking-widest uppercase font-mono text-xs transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] cursor-pointer"
              >
                Authenticate Console
              </button>
            </form>
          </div>
        ) : (
          /* UNLOCKED FULL ADMIN CONTENT CONTROLS */
          <div className="flex-grow flex flex-col min-h-0 overflow-hidden">
            
            {/* ADMIN SUB-TABS */}
            <div className="flex bg-zinc-900/50 border-b border-zinc-900 px-6 py-2 select-none">
              {[
                { id: 'presets', name: 'Background Presets 🌄', icon: <ImageIcon size={14} /> },
                { id: 'creators', name: 'Creator Profiles 👥', icon: <UserPlus size={14} /> },
                { id: 'links', name: 'Content Links Master 🛠️', icon: <Link size={14} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-2 px-4 rounded-lg text-xs font-mono font-bold transition-all border mr-2 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>

            {/* TAB CONTAINER VIEW */}
            <div className="flex-grow overflow-y-auto p-6 space-y-8">
              
              {/* TAB 1: MODERNIZE SCENIC BACKGROUND PRESETS */}
              {activeTab === 'presets' && (
                <div className="space-y-6" id="presets-admin-view">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-900/30 p-5 rounded-2xl border border-zinc-900">
                    <div>
                      <h4 className="text-sm font-black text-white uppercase font-mono tracking-wider">Philippine Backdrop Scenery Database</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-normal">
                        Administer the presets array available on the links builder sidebar. You can modernized old generic wallpapers with cinematic scenic locations!
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyModernCombos}
                      className="py-2 px-4 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <Sparkles size={14} />
                      Modernize Presets (Instant Pack)
                    </button>
                  </div>

                  {/* Add / Edit Background Preset form */}
                  <form onSubmit={handleAddPreset} className="bg-zinc-900/40 p-4 border border-zinc-900 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                    <div className="md:col-span-4 space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Backdrop Name / Emoji</label>
                      <input
                        type="text"
                        placeholder="e.g. Palawan Hidden Lagoon 🛶"
                        value={presetNameInput}
                        onChange={(e) => setPresetNameInput(e.target.value)}
                        className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
                        required
                      />
                    </div>
                    <div className="md:col-span-6 space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Unsplash High-Res Image URL</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={presetUrlInput}
                        onChange={(e) => setPresetUrlInput(e.target.value)}
                        className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2.5 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 font-mono"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-amber-500 text-zinc-950 font-extrabold text-xs rounded-lg hover:bg-amber-600 transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Save size={13} />
                        {editingPresetId ? 'Update' : 'Add Scenery'}
                      </button>
                    </div>
                  </form>

                  {/* Presets Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {backgroundPresets.map((p) => (
                      <div key={p.id} className="relative group border border-zinc-900 bg-zinc-950 rounded-2xl overflow-hidden shadow-md">
                        {/* Preset preview thumbnail */}
                        <div className="h-28 w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${p.url})` }}>
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                          <div className="absolute bottom-2.5 left-3 text-xs font-semibold text-white tracking-tight drop-shadow-md">
                            {p.name}
                          </div>
                        </div>
                        {/* URL string truncated */}
                        <div className="p-3 text-[9.5px] font-mono text-zinc-500 truncate border-t border-zinc-900">
                          {p.url}
                        </div>
                        {/* Edit delete action strip */}
                        <div className="flex bg-zinc-900/40 border-t border-zinc-900/60 p-2 text-xs items-center justify-between">
                          <button
                            onClick={() => handleStartEditPreset(p)}
                            className="text-zinc-400 hover:text-white flex items-center gap-1 font-mono hover:underline cursor-pointer"
                          >
                            <Edit3 size={11} /> Modify
                          </button>
                          <button
                            onClick={() => handleDeletePreset(p.id)}
                            className="text-rose-500 hover:text-rose-400 flex items-center gap-1 font-mono hover:underline cursor-pointer"
                          >
                            <Trash2 size={11} /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: CREATE & DELETE CREATOR PROFILES */}
              {activeTab === 'creators' && (
                <div className="space-y-6" id="creators-admin-view">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                    
                    {/* LEFT CELL: Form to craft new creator profile */}
                    <div className="md:col-span-5 bg-zinc-900/20 border border-zinc-900 rounded-2.5xl p-5 space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-white tracking-widest font-mono uppercase">Craft Premium Profile</h4>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Spin up immediate custom Philippine accounts with complete sandbox links.</p>
                      </div>

                      <form onSubmit={handleCreateCreator} className="space-y-3.5">
                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">Custom Username (@handle)</label>
                          <input
                            type="text"
                            placeholder="e.g. nate.renews"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-zinc-700 font-semibold"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">Creator Full Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Nathan Alvarez"
                            value={newDisplayName}
                            onChange={(e) => setNewDisplayName(e.target.value)}
                            className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-zinc-700"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">Tagline</label>
                          <input
                            type="text"
                            placeholder="e.g. Technical Product Reviewer 💻"
                            value={newTagline}
                            onChange={(e) => setNewTagline(e.target.value)}
                            className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-zinc-700"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">Short Memoir / Biography</label>
                          <textarea
                            placeholder="Write a descriptive bio for the creator..."
                            value={newBio}
                            onChange={(e) => setNewBio(e.target.value)}
                            className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2.5 text-zinc-100 focus:outline-none focus:border-zinc-700 h-16 resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">Location</label>
                            <input
                              type="text"
                              value={newLocation}
                              onChange={(e) => setNewLocation(e.target.value)}
                              className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2.5 text-zinc-100 focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[9px] font-mono tracking-widest text-zinc-500 uppercase">GCash Account Number</label>
                            <input
                              type="text"
                              placeholder="0917..."
                              value={newGcash}
                              onChange={(e) => setNewGcash(e.target.value)}
                              className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2.5 text-zinc-100 focus:outline-none"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl tracking-wider uppercase font-mono transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <PlusCircle size={14} /> Compile Creator Profile
                        </button>
                      </form>
                    </div>

                    {/* RIGHT CELL: Beautiful active list with metrics */}
                    <div className="md:col-span-7 space-y-4">
                      <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">Registered creators ({creatorsList.length})</h4>
                      <div className="space-y-3">
                        {creatorsList.map((c) => (
                          <div key={c.username} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/40 border border-zinc-900 group">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <img src={c.avatarUrl} alt={c.username} className="h-10 w-10 rounded-full object-cover border border-zinc-800" />
                                <span className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-zinc-950" />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                                  {c.displayName}
                                  {c.verified && <CheckCircle size={12} className="text-emerald-400 fill-emerald-400/10" />}
                                </div>
                                <span className="text-[10.5px] font-mono bg-zinc-900 p-1 rounded text-zinc-400">@{c.username}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setCurrentCreatorId(c.username);
                                  setSelCreatorForLinks(c.username);
                                  triggerToast(`Active preview is now @${c.username}`);
                                }}
                                className={`text-[10px] uppercase font-mono py-1 px-3 rounded-md transition-all font-semibold ${
                                  currentCreatorId === c.username
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white hover:bg-zinc-800'
                                }`}
                              >
                                {currentCreatorId === c.username ? 'Selected Preview' : 'Select'}
                              </button>
                              <button
                                onClick={() => handleDeleteCreator(c.username)}
                                className="p-2 text-zinc-600 hover:text-rose-400 transition-all cursor-pointer"
                                title={`Wipe Creator profile @${c.username} entirely`}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CONTENT LINKS & PRODUCTS MASTER EDITOR */}
              {activeTab === 'links' && (
                <div className="space-y-6" id="links-admin-view">
                  <div className="flex items-center gap-3 bg-zinc-900/20 p-4 border border-zinc-900 rounded-2.5xl">
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Select Target Creator to Manage:</span>
                    <select
                      value={selCreatorForLinks}
                      onChange={(e) => setSelCreatorForLinks(e.target.value)}
                      className="bg-zinc-950 border border-zinc-850 rounded-lg py-1.5 px-3.5 text-xs text-amber-500 font-mono font-bold focus:outline-none"
                    >
                      {creatorsList.map(c => (
                        <option key={c.username} value={c.username}>@{c.username} ({c.displayName})</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* AREA 1: SOCIAL PLATFORMS */}
                    <div className="bg-zinc-900/35 border border-zinc-900 rounded-2.5xl p-4.5 space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5">
                        <h4 className="text-xs font-black font-mono uppercase text-white">Social Connectors</h4>
                        <span className="text-[10px] font-mono bg-zinc-950 p-1 rounded text-neutral-400 font-bold">
                          {(socialsMap[selCreatorForLinks] || []).length} Links
                        </span>
                      </div>

                      {/* Add Social Form */}
                      <form onSubmit={handleAddSocial} className="space-y-2.5 p-3 rounded-xl border border-zinc-900/60 leading-none">
                        <select
                          value={newSocialType}
                          onChange={(e) => setNewSocialType(e.target.value as any)}
                          className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2 text-zinc-300 focus:outline-none"
                        >
                          <option value="globe">Globe (Custom Website)</option>
                          <option value="instagram">Instagram</option>
                          <option value="tiktok">TikTok</option>
                          <option value="youtube">YouTube</option>
                          <option value="email">Email Anchor</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Label (e.g. My Portfolio)"
                          value={newSocialLabel}
                          onChange={(e) => setNewSocialLabel(e.target.value)}
                          className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2 text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Destination URL"
                          value={newSocialUrl}
                          onChange={(e) => setNewSocialUrl(e.target.value)}
                          className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2 text-zinc-100 placeholder:text-zinc-600 focus:outline-none font-mono"
                          required
                        />
                        <button type="submit" className="w-[100%] py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold font-mono text-[10px] rounded-lg cursor-pointer">
                          Append Connector
                        </button>
                      </form>

                      {/* Display items */}
                      <div className="space-y-2 max-h-56 overflow-y-auto">
                        {(socialsMap[selCreatorForLinks] || []).map((l) => (
                          <div key={l.id} className="p-2 border border-zinc-900 rounded-lg flex items-center justify-between text-xs bg-zinc-950/45 group">
                            <div className="min-w-0">
                              <div className="font-semibold text-zinc-100 truncate">{l.label}</div>
                              <div className="text-[9px] font-mono text-zinc-500 truncate">{l.url}</div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              <button
                                onClick={() => handleFakeClickIncrement(l.id, 'social')}
                                className="text-[9.5px] font-mono text-zinc-500 hover:text-white bg-zinc-900 p-1 rounded"
                                title="Add mock click"
                              >
                                +100 Clicks
                              </button>
                              <button onClick={() => handleDeleteSocial(l.id)} className="text-zinc-600 hover:text-rose-400">
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AREA 2: CUSTOM LINKS */}
                    <div className="bg-zinc-900/35 border border-zinc-900 rounded-2.5xl p-4.5 space-y-4 font-sans">
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5">
                        <h4 className="text-xs font-black font-mono uppercase text-white">Custom Website Links</h4>
                        <span className="text-[10px] font-mono bg-zinc-950 p-1 rounded text-neutral-400 font-bold">
                          {(customLinksMap[selCreatorForLinks] || []).length} Links
                        </span>
                      </div>

                      {/* Add Custom Form */}
                      <form onSubmit={handleAddCustomLink} className="space-y-2.5 p-3 rounded-xl border border-zinc-900/60 leading-none">
                        <input
                          type="text"
                          placeholder="Header Title"
                          value={newCustomTitle}
                          onChange={(e) => setNewCustomTitle(e.target.value)}
                          className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2 text-zinc-100 focus:outline-none"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Subtitle Details"
                          value={newCustomSubtitle}
                          onChange={(e) => setNewCustomSubtitle(e.target.value)}
                          className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2 text-zinc-100 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Link URL"
                          value={newCustomUrl}
                          onChange={(e) => setNewCustomUrl(e.target.value)}
                          className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2 text-zinc-100 focus:outline-none font-mono"
                          required
                        />
                        <button type="submit" className="w-[100%] py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold font-mono text-[10px] rounded-lg cursor-pointer">
                          Inject Custom Link
                        </button>
                      </form>

                      {/* Display items */}
                      <div className="space-y-2 max-h-56 overflow-y-auto">
                        {(customLinksMap[selCreatorForLinks] || []).map((l) => (
                          <div key={l.id} className="p-2 border border-zinc-900 rounded-lg flex items-center justify-between text-xs bg-zinc-950/45 group">
                            <div className="min-w-0">
                              <div className="font-semibold text-zinc-100 truncate">{l.title}</div>
                              {l.subtitle && <div className="text-[9px] text-zinc-400 truncate">{l.subtitle}</div>}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              <button
                                onClick={() => handleFakeClickIncrement(l.id, 'custom')}
                                className="text-[9.5px] font-mono text-zinc-500 hover:text-white bg-zinc-900 p-1 rounded"
                                title="Add mock click"
                              >
                                +100 Clicks
                              </button>
                              <button onClick={() => handleDeleteCustom(l.id)} className="text-zinc-600 hover:text-rose-400 animate-fadeIn">
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                      ))}
                      </div>
                    </div>

                    {/* AREA 3: GRID COMMERCE PRODUCTS */}
                    <div className="bg-zinc-900/35 border border-zinc-900 rounded-2.5xl p-4.5 space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-900 pb-2.5">
                        <h4 className="text-xs font-black font-mono uppercase text-white">Grid Shop Products</h4>
                        <span className="text-[10px] font-mono bg-zinc-950 p-1 rounded text-neutral-400 font-bold">
                          {(gridItemsMap[selCreatorForLinks] || []).length} Products
                        </span>
                      </div>

                      {/* Add Grid Form */}
                      <form onSubmit={handleAddGridItem} className="space-y-2.5 p-3 rounded-xl border border-zinc-900/60 leading-none">
                        <input
                          type="text"
                          placeholder="Product Name"
                          value={newGridTitle}
                          onChange={(e) => setNewGridTitle(e.target.value)}
                          className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Price Tag (e.g. ₱399)"
                          value={newGridPrice}
                          onChange={(e) => setNewGridPrice(e.target.value)}
                          className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2"
                        />
                        <input
                          type="text"
                          placeholder="Destination Merchant Link"
                          value={newGridUrl}
                          onChange={(e) => setNewGridUrl(e.target.value)}
                          className="w-full text-xs bg-zinc-950 border border-zinc-850 rounded-lg p-2 font-mono"
                          required
                        />
                        <button type="submit" className="w-[100%] py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold font-mono text-[10px] rounded-lg cursor-pointer">
                          Register Product
                        </button>
                      </form>

                      {/* Display items */}
                      <div className="space-y-2 max-h-56 overflow-y-auto">
                        {(gridItemsMap[selCreatorForLinks] || []).map((l) => (
                          <div key={l.id} className="p-2 border border-zinc-900 rounded-lg flex items-center justify-between text-xs bg-zinc-950/45 group">
                            <div className="min-w-0">
                              <div className="font-semibold text-zinc-100 truncate">{l.title}</div>
                              <div className="text-[9px] font-mono text-zinc-400">{l.price || 'FREE / AFFILIATE'}</div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                              <button
                                onClick={() => handleFakeClickIncrement(l.id, 'grid')}
                                className="text-[9.5px] font-mono text-zinc-500 hover:text-white bg-zinc-900 p-1 rounded"
                                title="Add mock click"
                              >
                                +100 Clicks
                              </button>
                              <button onClick={() => handleDeleteGridItem(l.id)} className="text-zinc-600 hover:text-rose-400">
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
