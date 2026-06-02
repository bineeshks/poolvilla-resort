'use client';

import { useEffect, useState } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  MessageCircle, 
  Calendar, 
  Users, 
  Trash2,
  Check,
  X,
  FileText
} from 'lucide-react';
import { adminData, Inquiry } from '@/lib/adminData';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [search, setSearch] = useState('');
  const [villaFilter, setVillaFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    setInquiries(adminData.getInquiries());
  }, []);

  const handleStatusChange = (id: string, newStatus: Inquiry['status']) => {
    adminData.updateInquiryStatus(id, newStatus);
    setInquiries(adminData.getInquiries());
    // Update active modal status too
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      const list = inquiries.filter(i => i.id !== id);
      adminData.saveInquiries(list);
      setInquiries(list);
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  const handleWhatsAppContact = (inq: Inquiry) => {
    // Generate pre-filled response message
    const formattedCheckIn = new Date(inq.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedCheckOut = new Date(inq.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const message = `Hello ${inq.name}! ✨\n\nThank you for reaching out to *Sitharom Resort Wayanad*.\n\nWe have received your inquiry for the *${inq.villaType}* from *${formattedCheckIn}* to *${formattedCheckOut}* (${inq.guests} guests).\n\nWe are happy to confirm availability for these dates! Please let us know if you have any questions or if you'd like us to confirm this booking for you. 😊`;
    
    // Clean up phone number (remove spaces, plus, hyphens for api link)
    const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    // Auto-update status to contacted
    handleStatusChange(inq.id, 'Contacted');
    
    window.open(waUrl, '_blank');
  };

  // Filtered lists
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = inq.name.toLowerCase().includes(search.toLowerCase()) || 
                          inq.phone.includes(search);
    const matchesVilla = villaFilter === 'All' || inq.villaType === villaFilter;
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesVilla && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* ── FILTER & SEARCH HEADER BAR ────────────────────────────────── */}
      <div className="bg-[#1b1410] border border-[#c17c45]/15 p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            <Search size={16} />
          </div>
          <input 
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#120d0a] border border-white/[0.08] rounded-xl text-warm-white pl-9 pr-4 py-2.5 focus:border-[#d39a63] focus:ring-0 focus:outline-none transition-all placeholder:text-white/20 text-xs font-body"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 w-full md:w-auto items-center">
          
          {/* Villa Type Filter */}
          <div className="flex items-center gap-2 bg-[#120d0a] border border-white/[0.08] px-3 py-1.5 rounded-xl">
            <span className="text-[10px] text-text-muted uppercase tracking-wider">Villa:</span>
            <select
              value={villaFilter}
              onChange={(e) => setVillaFilter(e.target.value)}
              className="bg-transparent text-warm-white text-xs border-0 focus:ring-0 focus:outline-none pr-6 cursor-pointer"
            >
              <option value="All" className="bg-[#120d0a]">All Accommodations</option>
              <option value="Ithal Villa" className="bg-[#120d0a]">Ithal Villa</option>
              <option value="Harsham Villa" className="bg-[#120d0a]">Harsham Villa</option>
              <option value="Any Available" className="bg-[#120d0a]">Any Available</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-[#120d0a] border border-white/[0.08] px-3 py-1.5 rounded-xl">
            <span className="text-[10px] text-text-muted uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-warm-white text-xs border-0 focus:ring-0 focus:outline-none pr-6 cursor-pointer"
            >
              <option value="All" className="bg-[#120d0a]">All Statuses</option>
              <option value="Pending" className="bg-[#120d0a]">Pending</option>
              <option value="Contacted" className="bg-[#120d0a]">Contacted</option>
              <option value="Booked" className="bg-[#120d0a]">Booked</option>
              <option value="Cancelled" className="bg-[#120d0a]">Cancelled</option>
            </select>
          </div>

        </div>

      </div>

      {/* ── TABLE & DETAILS FLEX LAYOUT ───────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main List Table (65%) */}
        <div className="bg-[#1b1410] border border-[#c17c45]/15 rounded-2xl p-6 flex-1 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#c17c45]/10 text-text-muted uppercase tracking-wider font-light h-10">
                <th className="pb-3 font-normal">Guest Details</th>
                <th className="pb-3 font-normal">Reservation Period</th>
                <th className="pb-3 font-normal">Villa Type</th>
                <th className="pb-3 font-normal">Status</th>
                <th className="pb-3 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c17c45]/5">
              {filteredInquiries.map((inq) => (
                <tr 
                  key={inq.id} 
                  className={`hover:bg-white/[0.01] transition-all cursor-pointer ${
                    selectedInquiry?.id === inq.id ? 'bg-[#c17c45]/5' : ''
                  }`}
                  onClick={() => setSelectedInquiry(inq)}
                >
                  <td className="py-4 pr-3">
                    <p className="font-semibold text-warm-white">{inq.name}</p>
                    <p className="text-[10px] text-text-muted">{inq.phone}</p>
                  </td>
                  <td className="py-4 pr-3">
                    <p className="text-warm-white">
                      {new Date(inq.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-[10px] text-text-muted">
                      to {new Date(inq.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </td>
                  <td className="py-4 font-light text-text-muted pr-3">{inq.villaType}</td>
                  <td className="py-4">
                    <select
                      value={inq.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as Inquiry['status'])}
                      className={`px-2 py-1 rounded-full text-[10px] font-semibold focus:outline-none cursor-pointer border ${
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
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => handleWhatsAppContact(inq)}
                        className="p-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 rounded-lg text-[#25D366] transition-colors"
                        title="Quick Reply via WhatsApp"
                      >
                        <MessageCircle size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(inq.id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInquiries.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-text-muted italic">
                    No matching inquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Inquiry Detail Sidebar Panel (35%) */}
        {selectedInquiry ? (
          <div className="w-full lg:w-96 bg-[#1b1410] border border-[#c17c45]/15 rounded-2xl p-6 space-y-6 self-start animate-slideIn">
            <div className="flex items-center justify-between border-b border-[#c17c45]/10 pb-4">
              <div>
                <h4 className="font-display text-lg text-warm-white">Inquiry Details</h4>
                <p className="text-[10px] text-text-muted font-light mt-0.5">
                  Received on {new Date(selectedInquiry.createdAt).toLocaleDateString()} at {new Date(selectedInquiry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="text-text-muted hover:text-warm-white p-1 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-text-muted flex items-center gap-1.5"><Calendar size={11} className="text-clay" /> Dates</span>
                <p className="text-xs font-semibold text-warm-white mt-1">
                  {new Date(selectedInquiry.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(selectedInquiry.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              <div className="space-y-1 bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl">
                <span className="text-[9px] uppercase tracking-wider text-text-muted flex items-center gap-1.5"><Users size={11} className="text-clay" /> Guests</span>
                <p className="text-xs font-semibold text-warm-white mt-1">
                  {selectedInquiry.guests} Guest(s)
                </p>
              </div>
            </div>

            {/* Content info */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-text-muted font-body">Guest Name</span>
                <p className="text-sm font-semibold text-warm-white">{selectedInquiry.name}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-text-muted font-body">Contact Phone / WhatsApp</span>
                <p className="text-sm font-semibold text-warm-white">{selectedInquiry.phone}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-text-muted font-body">Accommodation Requested</span>
                <p className="text-sm font-semibold text-gold">{selectedInquiry.villaType}</p>
              </div>
              <div className="space-y-1 border-t border-[#c17c45]/10 pt-4">
                <span className="text-[9px] uppercase tracking-wider text-text-muted font-body flex items-center gap-1.5"><FileText size={11} /> Guest Message</span>
                <p className="text-xs font-light text-text-muted leading-relaxed bg-[#120d0a] border border-white/[0.04] p-4 rounded-xl mt-1.5 italic">
                  &ldquo;{selectedInquiry.message || 'No custom message provided.'}&rdquo;
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="border-t border-[#c17c45]/10 pt-6 space-y-3">
              <button 
                onClick={() => handleWhatsAppContact(selectedInquiry)}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl text-xs tracking-wider uppercase font-medium hover:bg-[#1ebd5c] transition-colors shadow-lg shadow-[#25D366]/10"
              >
                <MessageCircle size={15} />
                <span>Open WhatsApp Chat</span>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleStatusChange(selectedInquiry.id, 'Booked')}
                  className="flex items-center justify-center gap-1 border border-green-500/30 hover:border-green-500 hover:bg-green-500/5 text-green-400 py-3 rounded-xl text-[10px] uppercase tracking-wider transition-colors"
                >
                  <Check size={12} />
                  <span>Confirm Booking</span>
                </button>
                <button
                  onClick={() => handleStatusChange(selectedInquiry.id, 'Cancelled')}
                  className="flex items-center justify-center gap-1 border border-white/10 hover:border-white/20 hover:bg-white/5 text-text-muted py-3 rounded-xl text-[10px] uppercase tracking-wider transition-colors"
                >
                  <X size={12} />
                  <span>Cancel Booking</span>
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="hidden lg:flex w-full lg:w-96 border border-dashed border-[#c17c45]/15 rounded-2xl p-8 flex-col items-center justify-center text-center text-text-muted bg-white/[0.005] self-stretch">
            <Inbox size={32} className="text-[#c17c45]/50 mb-3" />
            <p className="font-display text-lg text-warm-white/80">No Inquiry Selected</p>
            <p className="text-[11px] font-body text-text-muted mt-1 leading-relaxed max-w-xs font-light">
              Click on a row in the booking inquiries table to view the full client details, dates, message, and access actions.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
