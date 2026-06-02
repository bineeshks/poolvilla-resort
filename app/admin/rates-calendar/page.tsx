'use client';

import { useEffect, useState } from 'react';
import { 
  Calendar, 
  DollarSign, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Lock, 
  Info,
  Layers
} from 'lucide-react';
import { adminData, VillaRate, BlockedDate } from '@/lib/adminData';

export default function AdminRatesCalendar() {
  const [rates, setRates] = useState<VillaRate[]>([]);
  const [blocked, setBlocked] = useState<BlockedDate[]>([]);
  const [selectedVilla, setSelectedVilla] = useState<'ithal' | 'harsham'>('ithal');

  // Input states for editing prices
  const [ithalPrice, setIthalPrice] = useState<number>(12999);
  const [harshamPrice, setHarshamPrice] = useState<number>(14999);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Month navigation states
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    const loadedRates = adminData.getVillaRates();
    setRates(loadedRates);
    setBlocked(adminData.getBlockedDates());

    // Initialize inputs
    const ithal = loadedRates.find(r => r.id === 'ithal');
    const harsham = loadedRates.find(r => r.id === 'harsham');
    if (ithal) setIthalPrice(ithal.basePrice);
    if (harsham) setHarshamPrice(harsham.basePrice);
  }, []);

  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    adminData.updateVillaRate('ithal', ithalPrice);
    adminData.updateVillaRate('harsham', harshamPrice);
    setRates(adminData.getVillaRates()); // refresh
    setSaveSuccess('Villa pricing rates updated successfully!');
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const handleCellClick = (dateStr: string) => {
    adminData.toggleBlockedDate(dateStr, selectedVilla);
    setBlocked(adminData.getBlockedDates()); // refresh
  };

  // Calendar math
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Generate calendar days
  const calendarDays = [];
  // Spacer days for starting padding
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  // Days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({ day: d, dateStr });
  }

  // Helpers
  const isDateBlocked = (dateStr: string) => {
    return blocked.some(b => b.date === dateStr && b.villaId === selectedVilla);
  };

  const getBlockReason = (dateStr: string) => {
    const match = blocked.find(b => b.date === dateStr && b.villaId === selectedVilla);
    return match ? match.reason : '';
  };

  return (
    <div className="space-y-8">
      
      {/* ── TOP LAYER: TWO COLUMN LAYOUT ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Rates Editor (1/3) */}
        <div className="bg-[#1b1410] border border-[#c17c45]/15 p-6 rounded-2xl h-fit">
          <h3 className="font-display text-lg text-warm-white mb-6 flex items-center gap-2">
            <DollarSign size={18} className="text-clay" />
            <span>Manage Base Rates</span>
          </h3>

          {saveSuccess && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-xs flex items-center gap-2 mb-6 animate-fadeIn">
              <Check size={14} />
              <span>{saveSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSaveRates} className="space-y-6">
            
            {/* Ithal Price */}
            <div className="space-y-2">
              <label className="text-[10px] tracking-[0.18em] uppercase text-[#cdb8a5] px-1 font-body">Ithal Villa Price (₹)</label>
              <input 
                type="number"
                value={ithalPrice}
                onChange={(e) => setIthalPrice(Number(e.target.value))}
                min={0}
                className="w-full bg-[#120d0a] border border-white/[0.08] rounded-xl text-warm-white px-4 py-3 focus:border-[#d39a63] focus:ring-0 focus:outline-none text-sm font-body"
                required
              />
              <p className="text-[10px] text-text-muted px-1 italic">Valley view property base nightly charge</p>
            </div>

            {/* Harsham Price */}
            <div className="space-y-2">
              <label className="text-[10px] tracking-[0.18em] uppercase text-[#cdb8a5] px-1 font-body">Harsham Villa Price (₹)</label>
              <input 
                type="number"
                value={harshamPrice}
                onChange={(e) => setHarshamPrice(Number(e.target.value))}
                min={0}
                className="w-full bg-[#120d0a] border border-white/[0.08] rounded-xl text-warm-white px-4 py-3 focus:border-[#d39a63] focus:ring-0 focus:outline-none text-sm font-body"
                required
              />
              <p className="text-[10px] text-text-muted px-1 italic">Highland view property base nightly charge</p>
            </div>

            {/* Save Button */}
            <button 
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #c17c45 0%, #a86432 100%)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              className="w-full py-3.5 text-xs font-semibold tracking-widest uppercase text-warm-white hover:shadow-lg transition-all"
            >
              Update Price Rates
            </button>

          </form>
        </div>

        {/* Right Column: Interactive Blocks Calendar (2/3) */}
        <div className="bg-[#1b1410] border border-[#c17c45]/15 p-6 rounded-2xl lg:col-span-2">
          
          {/* Calendar Header with Villa Selectors */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#c17c45]/10 pb-6 mb-6">
            <div>
              <h3 className="font-display text-lg text-warm-white flex items-center gap-2">
                <Calendar size={18} className="text-clay" />
                <span>Interactive Availability Calendar</span>
              </h3>
              <p className="text-[10px] text-text-muted font-light mt-0.5">Click any calendar cell to toggle blocked dates</p>
            </div>

            {/* Selector Buttons */}
            <div className="flex bg-[#120d0a] border border-white/[0.08] p-1 rounded-xl w-fit">
              <button 
                onClick={() => setSelectedVilla('ithal')}
                className={`px-4 py-2 rounded-lg text-xs transition-all ${
                  selectedVilla === 'ithal' 
                    ? 'bg-clay text-warm-white font-medium' 
                    : 'text-text-muted hover:text-warm-white'
                }`}
              >
                Ithal Villa
              </button>
              <button 
                onClick={() => setSelectedVilla('harsham')}
                className={`px-4 py-2 rounded-lg text-xs transition-all ${
                  selectedVilla === 'harsham' 
                    ? 'bg-clay text-warm-white font-medium' 
                    : 'text-text-muted hover:text-warm-white'
                }`}
              >
                Harsham Villa
              </button>
            </div>
          </div>

          {/* Month Navigator */}
          <div className="flex items-center justify-between mb-6 px-2">
            <button 
              onClick={prevMonth}
              className="p-2 border border-[#c17c45]/20 rounded-lg text-text-muted hover:text-warm-white hover:bg-white/5 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <h4 className="font-display text-xl text-warm-white tracking-wide">
              {monthNames[month]} {year}
            </h4>
            <button 
              onClick={nextMonth}
              className="p-2 border border-[#c17c45]/20 rounded-lg text-text-muted hover:text-warm-white hover:bg-white/5 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-1">
            {/* Weekdays Row */}
            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-text-muted uppercase tracking-wider py-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {calendarDays.map((cell, idx) => {
                if (cell === null) {
                  return <div key={`empty-${idx}`} className="aspect-square bg-transparent"></div>;
                }

                const blockedFlag = isDateBlocked(cell.dateStr);
                const reason = getBlockReason(cell.dateStr);

                return (
                  <div
                    key={cell.dateStr}
                    onClick={() => handleCellClick(cell.dateStr)}
                    className={`aspect-square rounded-xl p-2 flex flex-col justify-between border cursor-pointer select-none transition-all group ${
                      blockedFlag 
                        ? 'bg-clay/10 border-clay text-clay shadow-[inset_0_0_10px_rgba(181,69,27,0.1)]' 
                        : 'bg-[#120d0a]/60 border-white/[0.04] text-text-muted hover:border-gold hover:text-warm-white'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className={`text-xs font-semibold ${blockedFlag ? 'text-clay-light' : 'text-[#f5efe8]'}`}>
                        {cell.day}
                      </span>
                      {blockedFlag && (
                        <Lock size={10} className="text-clay mt-0.5" />
                      )}
                    </div>
                    
                    {/* Small text details for blocked dates */}
                    {blockedFlag ? (
                      <span className="text-[7.5px] uppercase tracking-wider text-clay-light truncate w-full block">
                        {reason.includes('Booking') ? 'Reserved' : 'Blocked'}
                      </span>
                    ) : (
                      <span className="text-[7.5px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity text-gold">
                        Block
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend Details */}
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-[#c17c45]/10 text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[#120d0a]/60 border border-white/[0.04]" />
              <span>Available Date</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-clay/10 border border-clay" />
              <span>Blocked / Reserved Date</span>
            </div>
            <div className="ml-auto flex items-center gap-1 text-[10px] italic">
              <Info size={11} className="text-clay" />
              <span>Click a date cell to toggle availability.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
