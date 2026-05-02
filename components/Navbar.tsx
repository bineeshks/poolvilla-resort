'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import logoImg from '@/app/gallery/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const hasHero = pathname === '/' || pathname === '/gallery';
  const isSolid = isScrolled || !hasHero;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Villas', href: '/villas' },
    { name: 'Amenities', href: '/#amenities' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-colors duration-500',
        isSolid ? 'bg-cream/95 backdrop-blur-md shadow-sm py-4 text-villa-dark' : 'bg-transparent py-6 text-warm-white'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center relative z-50">
          <Image 
            src={logoImg} 
            alt="Sitharom Pool Villa" 
            width={240} 
            height={90} 
            className="h-[90px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest hover:text-clay transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/#book" 
            className="bg-clay text-warm-white px-6 py-3 text-sm tracking-widest uppercase hover:bg-clay-light transition-colors"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden relative z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={28} className={isSolid || isMobileMenuOpen ? 'text-villa-dark' : 'text-warm-white'} />
          ) : (
            <Menu size={28} className={isSolid ? 'text-villa-dark' : 'text-warm-white'} />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 bg-sand z-40 flex flex-col justify-center items-center px-6"
          >
            <nav className="flex flex-col items-center gap-8 text-center text-villa-dark">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-display text-3xl tracking-widest uppercase hover:text-clay transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/#book" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-clay text-warm-white px-8 py-4 mt-4 text-sm tracking-widest uppercase hover:bg-clay-light transition-colors"
              >
                Book Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
