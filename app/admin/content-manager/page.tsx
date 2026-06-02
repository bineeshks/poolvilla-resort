'use client';

import { useEffect, useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  HelpCircle, 
  Compass, 
  Check, 
  Plus, 
  Trash2,
  Save
} from 'lucide-react';
import { adminData, ExperiencePackage, FAQItem, AttractionItem } from '@/lib/adminData';

export default function AdminContentManager() {
  const [activeTab, setActiveTab] = useState<'packages' | 'faqs' | 'attractions'>('packages');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Database lists
  const [packages, setPackages] = useState<ExperiencePackage[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [attractions, setAttractions] = useState<AttractionItem[]>([]);

  // Selected edit items
  const [selectedPkgId, setSelectedPkgId] = useState<string>('');
  const [selectedFaqId, setSelectedFaqId] = useState<string>('');
  const [selectedAttrId, setSelectedAttrId] = useState<string>('');

  // Form states - Packages
  const [pkgPrice, setPkgPrice] = useState('');
  const [pkgBullets, setPkgBullets] = useState<string[]>([]);
  const [bulletInputs, setBulletInputs] = useState<string>('');

  // Form states - FAQs
  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');

  // Form states - Attractions
  const [attrKm, setAttrKm] = useState('');
  const [attrDrive, setAttrDrive] = useState('');

  useEffect(() => {
    const pkgs = adminData.getPackages();
    const fqs = adminData.getFAQs();
    const attrs = adminData.getAttractions();
    
    setPackages(pkgs);
    setFaqs(fqs);
    setAttractions(attrs);

    if (pkgs.length > 0) setSelectedPkgId(pkgs[0].id);
    if (fqs.length > 0) setSelectedFaqId(fqs[0].id);
    if (attrs.length > 0) setSelectedAttrId(attrs[0].id);
  }, []);

  // Update form inputs when selected item changes
  useEffect(() => {
    if (selectedPkgId) {
      const match = packages.find(p => p.id === selectedPkgId);
      if (match) {
        setPkgPrice(match.price);
        setPkgBullets(match.bullets);
        setBulletInputs(match.bullets.join('\n'));
      }
    }
  }, [selectedPkgId, packages]);

  useEffect(() => {
    if (selectedFaqId) {
      const match = faqs.find(f => f.id === selectedFaqId);
      if (match) {
        setFaqQ(match.q);
        setFaqA(match.a);
      }
    }
  }, [selectedFaqId, faqs]);

  useEffect(() => {
    if (selectedAttrId) {
      const match = attractions.find(a => a.id === selectedAttrId);
      if (match) {
        setAttrKm(match.km);
        setAttrDrive(match.drive);
      }
    }
  }, [selectedAttrId, attractions]);

  // Submit handlers
  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    const bulletList = bulletInputs.split('\n').map(b => b.trim()).filter(b => b !== '');
    adminData.updatePackage(selectedPkgId, bulletList, pkgPrice);
    setPackages(adminData.getPackages()); // refresh
    triggerSuccess('Experience package updated successfully!');
  };

  const handleSaveFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    adminData.updateFAQ(selectedFaqId, faqQ, faqA);
    setFaqs(adminData.getFAQs()); // refresh
    triggerSuccess('FAQ updated successfully!');
  };

  const handleSaveAttraction = (e: React.FormEvent) => {
    e.preventDefault();
    adminData.updateAttraction(selectedAttrId, attrKm, attrDrive);
    setAttractions(adminData.getAttractions()); // refresh
    triggerSuccess('Attraction distance details updated!');
  };

  const triggerSuccess = (msg: string) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* ── TABS NAVIGATOR ───────────────────────────────────────────── */}
      <div className="flex border-b border-[#c17c45]/15 pb-px gap-6 text-sm tracking-widest uppercase font-semibold">
        <button 
          onClick={() => setActiveTab('packages')}
          className={`pb-4 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'packages' 
              ? 'border-clay text-[#f5efe8]' 
              : 'border-transparent text-text-muted hover:text-warm-white'
          }`}
        >
          <Sparkles size={16} className="text-clay" />
          <span>Experience Packages</span>
        </button>
        <button 
          onClick={() => setActiveTab('faqs')}
          className={`pb-4 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'faqs' 
              ? 'border-clay text-[#f5efe8]' 
              : 'border-transparent text-text-muted hover:text-warm-white'
          }`}
        >
          <HelpCircle size={16} className="text-clay" />
          <span>FAQs Editor</span>
        </button>
        <button 
          onClick={() => setActiveTab('attractions')}
          className={`pb-4 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'attractions' 
              ? 'border-clay text-[#f5efe8]' 
              : 'border-transparent text-text-muted hover:text-warm-white'
          }`}
        >
          <Compass size={16} className="text-clay" />
          <span>Wayanad Attractions</span>
        </button>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
          <Check size={14} />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* ── TAB DETAILS RENDERERS ────────────────────────────────────── */}
      <div className="bg-[#1b1410] border border-[#c17c45]/15 p-6 md:p-8 rounded-2xl">
        
        {/* TAB 1: packages */}
        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List side */}
            <div className="space-y-3 lg:border-r border-[#c17c45]/10 lg:pr-8">
              <span className="text-[10px] tracking-widest text-text-muted uppercase block">Select Package to Edit</span>
              <div className="flex flex-col gap-2">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPkgId(pkg.id)}
                    className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      selectedPkgId === pkg.id 
                        ? 'bg-clay/10 border-clay text-warm-white' 
                        : 'bg-[#120d0a]/60 border-white/[0.04] text-text-muted hover:border-gold hover:text-warm-white'
                    }`}
                  >
                    <p className="font-semibold text-warm-white">{pkg.name}</p>
                    <p className="text-[10px] text-text-muted mt-1">Starting from: <span className="text-clay font-semibold">{pkg.price}</span></p>
                  </button>
                ))}
              </div>
            </div>

            {/* Form side */}
            <div className="lg:col-span-2">
              {selectedPkgId && (
                <form onSubmit={handleSavePackage} className="space-y-6">
                  <h4 className="font-display text-xl text-warm-white mb-2">
                    Modify <em className="text-gold italic font-light">"{packages.find(p => p.id === selectedPkgId)?.name}"</em>
                  </h4>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#cdb8a5] px-1 font-body">Package Pricing</label>
                    <input 
                      type="text"
                      value={pkgPrice}
                      onChange={(e) => setPkgPrice(e.target.value)}
                      className="w-full bg-[#120d0a] border border-white/[0.08] rounded-xl text-warm-white px-4 py-3 focus:border-[#d39a63] focus:ring-0 focus:outline-none text-sm font-body"
                      required
                    />
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#cdb8a5] px-1 font-body">Package Details (One per line)</label>
                    <textarea 
                      rows={6}
                      value={bulletInputs}
                      onChange={(e) => setBulletInputs(e.target.value)}
                      className="w-full bg-[#120d0a] border border-white/[0.08] rounded-xl text-warm-white px-4 py-3 focus:border-[#d39a63] focus:ring-0 focus:outline-none text-xs font-body resize-none"
                      required
                    />
                    <p className="text-[10px] text-text-muted px-1 italic">Note: These details appear as checked bullets inside the packaging offer card on the homepage.</p>
                  </div>

                  {/* Save button */}
                  <button 
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #c17c45 0%, #a86432 100%)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    className="flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-warm-white hover:shadow-lg transition-all"
                  >
                    <Save size={14} />
                    <span>Save Package Content</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: faqs */}
        {activeTab === 'faqs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List side */}
            <div className="space-y-3 lg:border-r border-[#c17c45]/10 lg:pr-8 h-[400px] overflow-y-auto pr-2">
              <span className="text-[10px] tracking-widest text-text-muted uppercase block">Select Question to Edit</span>
              <div className="flex flex-col gap-2">
                {faqs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => setSelectedFaqId(faq.id)}
                    className={`text-left p-3.5 rounded-xl border text-xs font-medium transition-all truncate ${
                      selectedFaqId === faq.id 
                        ? 'bg-clay/10 border-clay text-warm-white' 
                        : 'bg-[#120d0a]/60 border-white/[0.04] text-text-muted hover:border-gold hover:text-warm-white'
                    }`}
                  >
                    {faq.q}
                  </button>
                ))}
              </div>
            </div>

            {/* Form side */}
            <div className="lg:col-span-2">
              {selectedFaqId && (
                <form onSubmit={handleSaveFAQ} className="space-y-6">
                  <h4 className="font-display text-xl text-warm-white mb-2">
                    Modify <em className="text-gold italic font-light">FAQ Answer</em>
                  </h4>

                  {/* Question */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#cdb8a5] px-1 font-body">Question Title</label>
                    <input 
                      type="text"
                      value={faqQ}
                      onChange={(e) => setFaqQ(e.target.value)}
                      className="w-full bg-[#120d0a] border border-white/[0.08] rounded-xl text-warm-white px-4 py-3 focus:border-[#d39a63] focus:ring-0 focus:outline-none text-sm font-body"
                      required
                    />
                  </div>

                  {/* Answer */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.18em] uppercase text-[#cdb8a5] px-1 font-body">Answer Content</label>
                    <textarea 
                      rows={5}
                      value={faqA}
                      onChange={(e) => setFaqA(e.target.value)}
                      className="w-full bg-[#120d0a] border border-white/[0.08] rounded-xl text-warm-white px-4 py-3 focus:border-[#d39a63] focus:ring-0 focus:outline-none text-xs font-body resize-none"
                      required
                    />
                  </div>

                  {/* Save button */}
                  <button 
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #c17c45 0%, #a86432 100%)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    className="flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-warm-white hover:shadow-lg transition-all"
                  >
                    <Save size={14} />
                    <span>Save FAQ Changes</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: attractions */}
        {activeTab === 'attractions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List side */}
            <div className="space-y-3 lg:border-r border-[#c17c45]/10 lg:pr-8 h-[400px] overflow-y-auto pr-2">
              <span className="text-[10px] tracking-widest text-text-muted uppercase block">Select Attraction to Edit</span>
              <div className="flex flex-col gap-2">
                {attractions.map((attr) => (
                  <button
                    key={attr.id}
                    onClick={() => setSelectedAttrId(attr.id)}
                    className={`text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                      selectedAttrId === attr.id 
                        ? 'bg-clay/10 border-clay text-warm-white' 
                        : 'bg-[#120d0a]/60 border-white/[0.04] text-text-muted hover:border-gold hover:text-warm-white'
                    }`}
                  >
                    <p className="font-semibold text-warm-white">{attr.name}</p>
                    <p className="text-[9px] text-text-muted mt-0.5">{attr.type} &middot; {attr.km}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Form side */}
            <div className="lg:col-span-2">
              {selectedAttrId && (
                <form onSubmit={handleSaveAttraction} className="space-y-6">
                  <h4 className="font-display text-xl text-warm-white mb-2">
                    Modify <em className="text-gold italic font-light">"{attractions.find(a => a.id === selectedAttrId)?.name}" Distance Specs</em>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Distance KM */}
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.18em] uppercase text-[#cdb8a5] px-1 font-body">Distance (in km)</label>
                      <input 
                        type="text"
                        value={attrKm}
                        onChange={(e) => setAttrKm(e.target.value)}
                        className="w-full bg-[#120d0a] border border-white/[0.08] rounded-xl text-warm-white px-4 py-3 focus:border-[#d39a63] focus:ring-0 focus:outline-none text-sm font-body"
                        required
                      />
                    </div>

                    {/* Drive time */}
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.18em] uppercase text-[#cdb8a5] px-1 font-body">Drive Duration</label>
                      <input 
                        type="text"
                        value={attrDrive}
                        onChange={(e) => setAttrDrive(e.target.value)}
                        className="w-full bg-[#120d0a] border border-white/[0.08] rounded-xl text-warm-white px-4 py-3 focus:border-[#d39a63] focus:ring-0 focus:outline-none text-sm font-body"
                        required
                      />
                    </div>
                  </div>

                  {/* Save button */}
                  <button 
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #c17c45 0%, #a86432 100%)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    className="flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-warm-white hover:shadow-lg transition-all"
                  >
                    <Save size={14} />
                    <span>Save Attraction Info</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
