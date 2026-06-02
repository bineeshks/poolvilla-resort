'use client';

import { useEffect, useState } from 'react';
import { 
  Inbox, 
  CheckCircle, 
  CalendarRange, 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  Users, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import Link from 'next/link';
import { adminData, Inquiry, VillaRate, BlockedDate } from '@/lib/adminData';

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [rates, setRates] = useState<VillaRate[]>([]);
  const [blocked, setBlocked] = useState<BlockedDate[]>([]);
  
  useEffect(() => {
    setInquiries(adminData.getInquiries());
    setRates(adminData.getVillaRates());
    setBlocked(adminData.getBlockedDates());
  }, []);

  const handleStatusChange = (id: string, newStatus: Inquiry['status']) => {
    adminData.updateInquiryStatus(id, newStatus);
    setInquiries(adminData.getInquiries()); // refresh
  };

  // Metrics calculations
  const pendingInquiries = inquiries.filter(i => i.status === 'Pending').length;
  const contactedInquiries = inquiries.filter(i => i.status === 'Contacted').length;
  const bookedInquiries = inquiries.filter(i => i.status === 'Booked').length;
  const totalInquiries = inquiries.length;

  const ithalBookings = inquiries.filter(i => i.villaType === 'Ithal Villa' && i.status === 'Booked').length;
  const harshamBookings = inquiries.filter(i => i.villaType === 'Harsham Villa' && i.status === 'Booked').length;

  const activeInquiriesCount = pendingInquiries + contactedInquiries;
  const conversionRate = totalInquiries > 0 ? Math.round((bookedInquiries / totalInquiries) * 100) : 0;

  const recentInquiries = inquiries.slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── TOP STATS ROW ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Stat 1: Active Inquiries */}
        <div className="bg-[#1b1410] border border-[#c17c45]/15 p-6 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-text-muted">Active Inquiries</p>
            <h3 className="font-display text-3xl font-light text-warm-white">{activeInquiriesCount}</h3>
            <p className="text-[10.5px] text-clay flex items-center gap-1 font-light">
              <Clock size={11} /> {pendingInquiries} pending follow-up
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-clay/10 border border-clay/20 flex items-center justify-center text-clay">
            <Inbox size={22} />
          </div>
        </div>

        {/* Stat 2: Total Bookings */}
        <div className="bg-[#1b1410] border border-[#c17c45]/15 p-6 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-text-muted">Confirmed Bookings</p>
            <h3 className="font-display text-3xl font-light text-warm-white">{bookedInquiries}</h3>
            <p className="text-[10.5px] text-green-400 flex items-center gap-1 font-light">
              <CheckCircle size={11} /> Ready for check-in
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
            <CheckCircle size={22} />
          </div>
        </div>

        {/* Stat 3: Conversion Rate */}
        <div className="bg-[#1b1410] border border-[#c17c45]/15 p-6 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-text-muted">Conversion Rate</p>
            <h3 className="font-display text-3xl font-light text-warm-white">{conversionRate}%</h3>
            <p className="text-[10.5px] text-gold flex items-center gap-1 font-light">
              <TrendingUp size={11} /> High booking intent
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
            <TrendingUp size={22} />
          </div>
        </div>

        {/* Stat 4: Blocked Dates */}
        <div className="bg-[#1b1410] border border-[#c17c45]/15 p-6 rounded-2xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-text-muted">Blocked Calendar Days</p>
            <h3 className="font-display text-3xl font-light text-warm-white">{blocked.length}</h3>
            <p className="text-[10.5px] text-text-muted flex items-center gap-1 font-light">
              <CalendarRange size={11} /> Locked across both properties
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted">
            <CalendarRange size={22} />
          </div>
        </div>

      </div>

      {/* ── SECOND ROW: VILLA PERFORMANCE & BOOKING PIPELINE ───────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Villa Distribution Analytics */}
        <div className="bg-[#1b1410] border border-[#c17c45]/15 p-6 rounded-2xl flex flex-col justify-between col-span-1">
          <div>
            <h4 className="font-display text-lg tracking-wide text-warm-white mb-6">Villa Bookings Breakdown</h4>
            <div className="space-y-6">
              
              {/* Ithal Villa */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-light text-text-muted">Ithal Villa (Valley View)</span>
                  <span className="font-semibold text-warm-white">{ithalBookings} Bookings</span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-clay h-full rounded-full transition-all duration-500" 
                    style={{ width: `${bookedInquiries > 0 ? (ithalBookings / bookedInquiries) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Harsham Villa */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-light text-text-muted">Harsham Villa (Highland View)</span>
                  <span className="font-semibold text-warm-white">{harshamBookings} Bookings</span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gold h-full rounded-full transition-all duration-500" 
                    style={{ width: `${bookedInquiries > 0 ? (harshamBookings / bookedInquiries) * 100 : 0}%` }}
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="border-t border-[#c17c45]/10 pt-6 mt-6 space-y-4">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted font-light">Current Base Rates:</span>
              <span className="text-gold font-normal">
                Ithal: {rates.find(r => r.id === 'ithal')?.basePrice ? `₹${rates.find(r => r.id === 'ithal')?.basePrice.toLocaleString()}` : '₹12,999'}/n
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted font-light"></span>
              <span className="text-gold font-normal">
                Harsham: {rates.find(r => r.id === 'harsham')?.basePrice ? `₹${rates.find(r => r.id === 'harsham')?.basePrice.toLocaleString()}` : '₹14,999'}/n
              </span>
            </div>
            <Link 
              href="/admin/rates-calendar"
              className="w-full flex items-center justify-center gap-1.5 border border-clay/30 hover:border-clay hover:bg-clay/5 text-clay py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              <span>Manage Pricing & Blocks</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="bg-[#1b1410] border border-[#c17c45]/15 p-6 rounded-2xl lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-display text-lg tracking-wide text-warm-white">Recent WhatsApp Inquiries</h4>
              <Link href="/admin/inquiries" className="text-xs text-clay hover:text-clay-light flex items-center gap-1">
                <span>View all</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#c17c45]/10 text-text-muted uppercase tracking-wider font-light h-10">
                    <th className="pb-3 font-normal">Guest</th>
                    <th className="pb-3 font-normal">Dates</th>
                    <th className="pb-3 font-normal">Villa Type</th>
                    <th className="pb-3 font-normal text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c17c45]/5">
                  {recentInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-4">
                        <p className="font-semibold text-warm-white">{inq.name}</p>
                        <p className="text-[10px] text-text-muted">{inq.phone}</p>
                      </td>
                      <td className="py-4">
                        <p className="text-warm-white">
                          {new Date(inq.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-[10px] text-text-muted">
                          to {new Date(inq.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </td>
                      <td className="py-4 font-light text-text-muted">{inq.villaType}</td>
                      <td className="py-4 text-right">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value as Inquiry['status'])}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-semibold focus:outline-none cursor-pointer border ${
                            inq.status === 'Pending' 
                              ? 'bg-clay/10 text-clay border-clay/35' 
                              : inq.status === 'Contacted' 
                              ? 'bg-gold/10 text-gold border-gold/35' 
                              : inq.status === 'Booked' 
                              ? 'bg-green-500/10 text-green-400 border-green-500/35' 
                              : 'bg-white/5 text-text-muted border-white/10'
                          }`}
                        >
                          <option value="Pending" className="bg-[#1b1410] text-clay">Pending</option>
                          <option value="Contacted" className="bg-[#1b1410] text-gold">Contacted</option>
                          <option value="Booked" className="bg-[#1b1410] text-green-400">Booked</option>
                          <option value="Cancelled" className="bg-[#1b1410] text-text-muted">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {recentInquiries.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-text-muted italic">
                        No inquiries received yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
