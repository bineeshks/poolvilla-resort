'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, CalendarDays } from 'lucide-react';
import { useBooking } from '@/lib/BookingContext';
import Image from 'next/image';
import logoImg from '@/app/gallery/logo.png';

export default function StickyBookingBar() {
  const { openBooking } = useBooking();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneNumber = "917306197613"; 
  const message = "✨ Hello Sitharom Resort! I'd like to inquire about booking a stay.";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* Inline styles for keyframe animations (shimmer and glowing ring) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer-sweep {
          animation: shimmer-sweep 3s infinite ease-in-out;
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(201, 169, 110, 0.15); border-color: rgba(201, 169, 110, 0.3); }
          50% { box-shadow: 0 4px 30px rgba(201, 169, 110, 0.35); border-color: rgba(201, 169, 110, 0.6); }
        }
        .animate-glow-pulse {
          animation: glow-pulse 3s infinite ease-in-out;
        }
      ` }} />

      <AnimatePresence>
        {isVisible && (
          <>
            {/* DESKTOP: Floating Luxury Dock */}
            <motion.div
              initial={{ y: 50, opacity: 0, x: '-50%' }}
              animate={{ y: 0, opacity: 1, x: '-50%' }}
              exit={{ y: 50, opacity: 0, x: '-50%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-8 left-1/2 z-[45] hidden md:flex items-center gap-6 bg-cream/90 dark:bg-villa-dark/85 backdrop-blur-xl border border-gold/20 px-6 py-3 shadow-[0_8px_30px_rgba(44,31,20,0.12)] dark:shadow-[0_12px_40px_rgba(20,15,10,0.5)] rounded-full animate-glow-pulse hover:bg-warm-white/95 dark:hover:bg-villa-dark/95 transition-colors duration-300"
            >
              <div className="flex items-center">
                <Image
                  src={logoImg}
                  alt="Sitharom Pool Villa"
                  width={110}
                  height={42}
                  className="h-[42px] w-auto object-contain dark:brightness-[1.15]"
                />
              </div>
              <div className="h-4 w-[1px] bg-gold/20" />
              
              <div className="flex items-center gap-4">
                {/* Contact Links */}
                <a 
                  href={waUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-villa-dark/60 dark:text-warm-white/60 hover:text-gold transition-colors duration-200"
                  title="WhatsApp Inquiry"
                >
                  <MessageCircle size={16} strokeWidth={1.8} />
                </a>
                <a 
                  href={`tel:${phoneNumber}`} 
                  className="text-villa-dark/60 dark:text-warm-white/60 hover:text-gold transition-colors duration-200"
                  title="Call Reservations"
                >
                  <Phone size={15} strokeWidth={1.8} />
                </a>

                {/* Primary Booking Trigger */}
                <button
                  onClick={() => openBooking()}
                  className="relative overflow-hidden bg-clay hover:bg-clay-light active:scale-[0.98] text-warm-white text-[10px] font-semibold tracking-[0.2em] uppercase px-6 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(181,69,27,0.25)] flex items-center gap-2 group"
                >
                  {/* Shimmer sweep effect */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer-sweep pointer-events-none" />
                  
                  <CalendarDays size={13} />
                  Book Online
                </button>
              </div>
            </motion.div>

            {/* MOBILE: Sticky Bottom Luxury Bar */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-cream/95 dark:bg-villa-dark/95 backdrop-blur-lg border-t border-gold/15 px-6 py-3.5 flex items-center justify-between shadow-2xl transition-colors duration-500"
              style={{ paddingBottom: 'calc(10px + env(safe-area-inset-bottom))' }}
            >
              <div className="flex items-center">
                <Image
                  src={logoImg}
                  alt="Sitharom Pool Villa"
                  width={90}
                  height={34}
                  className="h-[34px] w-auto object-contain dark:brightness-[1.15]"
                />
              </div>

              <div className="flex items-center gap-3">
                {/* Secondary Quick Action: WhatsApp */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold bg-villa-dark/5 dark:bg-warm-white/5 active:bg-villa-dark/10 dark:active:bg-warm-white/10 transition-colors duration-500"
                  aria-label="WhatsApp enquiry"
                >
                  <MessageCircle size={16} strokeWidth={1.8} />
                </a>

                {/* Primary CTA: Open Booking Drawer */}
                <button
                  onClick={() => openBooking()}
                  className="relative overflow-hidden bg-clay active:bg-clay-light active:scale-[0.98] text-warm-white text-[10px] font-bold tracking-[0.2em] uppercase px-5 py-3 rounded-lg transition-all flex items-center gap-1.5 shadow-[0_4px_12px_rgba(181,69,27,0.25)]"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/45 to-transparent -translate-x-full animate-shimmer-sweep pointer-events-none" />
                  Reserve
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
