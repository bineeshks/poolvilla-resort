'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useBooking } from '@/lib/BookingContext';
import BookingWizard from './BookingWizard';

export default function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeBooking();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeBooking]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop Blur & Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={closeBooking}
            className="absolute inset-0 bg-villa-dark/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="relative w-full h-full md:h-auto flex items-end md:items-center justify-center p-0 md:p-6 pointer-events-none">
            
            {/* Desktop: Centered Glassmorphic Modal */}
            <motion.div
              ref={modalRef}
              initial={{ 
                opacity: 0, 
                scale: 0.95,
                y: typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : '0%'
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: '0%'
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.95,
                y: typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : '5%'
              }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1] // Premium luxury easing
              }}
              className="pointer-events-auto w-full md:max-w-4xl lg:max-w-5xl bg-villa-dark/95 border border-gold/15 shadow-[0_24px_64px_rgba(44,31,20,0.8)] overflow-hidden flex flex-col relative h-[92vh] md:h-auto max-h-[92vh] md:max-h-[85vh] rounded-t-[28px] md:rounded-lg"
            >
              {/* Top Drag Handle (Mobile Only) */}
              <div className="flex md:hidden justify-center py-3 shrink-0">
                <div className="w-12 h-1 bg-warm-white/20 rounded-full" />
              </div>

              {/* Close Button */}
              <button
                onClick={closeBooking}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 rounded-full bg-villa-dark/80 border border-gold/10 hover:border-gold/30 text-warm-white/70 hover:text-gold transition-all duration-300"
                aria-label="Close booking engine"
              >
                <X size={18} strokeWidth={1.8} />
              </button>

              {/* Inner content scroll wrapper */}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                <BookingWizard />
              </div>
            </motion.div>

          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
