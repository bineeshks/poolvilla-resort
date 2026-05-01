'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

import img3 from '@/app/gallery/img3.jpeg';
import img4 from '@/app/gallery/img4.jpeg';
import img5 from '@/app/gallery/img5.jpeg';
import img6 from '@/app/gallery/img6.jpeg';
import img7 from '@/app/gallery/img7.jpeg';
import img8 from '@/app/gallery/img8.jpeg';
import img9 from '@/app/gallery/img9.jpeg';

const images = [
  { id: 'img-3', src: img3, label: 'Living Area' },
  { id: 'img-4', src: img4, label: 'Bathroom' },
  { id: 'img-5', src: img5, label: 'Bedroom' },
  { id: 'img-6', src: img6, label: 'Balcony View' },
  { id: 'img-7', src: img7, label: 'Pool Side' },
  { id: 'img-8', src: img8, label: 'Dining Space' },
  { id: 'img-9', src: img9, label: 'Exterior' },
];

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-cream overflow-hidden" id="gallery">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[10px] tracking-[0.25em] uppercase text-clay mb-4 block">Visual Journey</span>
            <h2 className="text-4xl md:text-5xl font-display text-villa-dark">
              Glimpse of <em className="text-clay italic">Paradise</em>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <div className="hidden md:flex gap-4">
              <button onClick={() => scroll('left')} className="p-3 rounded-full border border-clay text-clay hover:bg-clay hover:text-white transition-colors" aria-label="Previous image">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scroll('right')} className="p-3 rounded-full border border-clay text-clay hover:bg-clay hover:text-white transition-colors" aria-label="Next image">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Link 
              href="/gallery" 
              className="text-xs tracking-widest uppercase border-b border-text-muted pb-1 hover:text-clay hover:border-clay transition-colors"
            >
              View Full Gallery
            </Link>
          </motion.div>
        </div>

        {/* Slider Setup */}
        <div className="relative -mx-6 px-6 md:mx-0 md:px-0">
          <div 
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((img, idx) => (
              <motion.div 
                key={img.id}
                className="relative group overflow-hidden bg-sand flex-none w-[85vw] md:w-[400px] lg:w-[500px] h-[400px] md:h-[500px] snap-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Image 
                  src={img.src} 
                  alt={img.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 85vw, 500px"
                  placeholder="blur"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-villa-dark/20 group-hover:bg-villa-dark/40 transition-colors duration-500 flex items-end justify-start p-8">
                  <span className="font-display text-2xl text-warm-white tracking-widest transform translate-y-4 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-500">
                    {img.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
