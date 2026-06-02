'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type BookingContextType = {
  isOpen: boolean;
  openBooking: (roomType?: string) => void;
  closeBooking: () => void;
  selectedRoomType: string | null;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);

  const openBooking = (roomType?: string) => {
    setSelectedRoomType(roomType || null);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setSelectedRoomType(null);
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking, selectedRoomType }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
