'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import StickyBookingBar from './StickyBookingBar';
import SmoothScroll from './SmoothScroll';
import { BookingProvider } from '@/lib/BookingContext';
import BookingModal from '@/booking/components/BookingModal';

export default function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <BookingProvider>
      <SmoothScroll>
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
        <StickyBookingBar />
        <BookingModal />
      </SmoothScroll>
    </BookingProvider>
  );
}
