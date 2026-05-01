'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import room1Img from '@/app/gallery/room1.jpeg';
import room2Img from '@/app/gallery/room2.jpeg';

const villas = [
  {
    id: 'ithal',
    name: 'Ithal Villa',
    price: 'Premium',
    tag: '2 Bedrooms',
    image: room1Img
  },
  {
    id: 'harsham',
    name: 'Harsham Villa',
    price: 'Premium',
    tag: '2 Bedrooms',
    image: room2Img
  }
];

export default function Villas() {
  return (
    <section className="py-24 bg-sand relative" id="villas">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-clay mb-4 block">Our Accommodations</span>
          <h2 className="text-4xl md:text-5xl font-display text-villa-dark">
            Your Private <em className="text-clay italic">Sanctuary</em>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {villas.map((villa, idx) => (
            <motion.div 
              key={villa.id} 
              className="group relative bg-cream overflow-hidden flex flex-col h-[500px]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
            >
              {/* Image Container */}
              <div className="relative h-3/4 w-full overflow-hidden">
                <Image 
                  src={villa.image} 
                  alt={villa.name}
                  fill
                  placeholder="blur"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-cream/90 backdrop-blur-sm px-3 py-1 text-[10px] tracking-widest uppercase font-medium text-clay shadow-sm z-10">
                  {villa.tag}
                </div>
              </div>

              {/* Info Container */}
              <div className="absolute bottom-0 left-0 w-full bg-cream transform transition-transform duration-500 ease-in-out p-6 pt-5">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="font-display text-2xl text-villa-dark">{villa.name}</h3>
                  <div className="text-right">
                    <span className="block text-sm text-text-muted mb-1">From</span>
                    <span className="font-display text-xl text-clay">{villa.price}</span>
                  </div>
                </div>
                
                {/* Hidden content that slides up */}
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden mt-4">
                  <Link 
                    href={`/villas#${villa.id}`}
                    className="block w-full bg-villa-dark text-warm-white text-center py-3 text-xs tracking-widest uppercase hover:bg-clay transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link 
            href="/villas" 
            className="inline-block border border-clay text-clay px-8 py-4 text-sm tracking-widest uppercase hover:bg-clay hover:text-warm-white transition-colors"
          >
            View All Villas
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
