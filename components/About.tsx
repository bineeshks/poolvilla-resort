'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import aboutImg from '@/app/gallery/img2.jpeg';

export default function About() {
  return (
    <section className="py-24 md:py-32 bg-cream text-villa-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Column */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto z-10">
              <Image 
                src={aboutImg} 
                alt="Luxury Villa Interior"
                fill
                placeholder="blur"
                className="object-cover rounded-t-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute -inset-4 border border-clay/30 rounded-t-full -z-10" />
            </div>

            {/* Floating Badge */}
            <motion.div 
              className="absolute -bottom-6 -right-6 md:right-10 bg-clay text-warm-white rounded-full w-32 h-32 flex flex-col items-center justify-center text-center shadow-xl z-20"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
            >
              <span className="font-display text-3xl mb-1">7★</span>
              <span className="text-[10px] tracking-widest uppercase font-light px-4 leading-tight">Luxury Rating</span>
            </motion.div>
          </motion.div>

          {/* Text Column */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col items-start"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <span className="text-[10px] tracking-[0.25em] uppercase text-clay mb-6">Welcome to Sitharom</span>
            <h2 className="text-4xl md:text-5xl font-display leading-tight mb-8">
              A Private Paradise, <br />
              Crafted for <em className="text-clay italic">You</em>
            </h2>
            
            <div className="space-y-6 text-text-mid font-light leading-relaxed mb-10">
              <p>
                Nestled amidst lush tropical flora, Sitharom offers a sanctuary where modern elegance seamlessly intertwines with authentic island soul. Each of our exclusive villas is a private universe designed to captivate your senses and restore your spirit.
              </p>
              <p>
                From your personal infinity pool catching the morning sun to the intuitive, invisible care of our dedicated 24/7 butler service, every detail is meticulously curated to create moments that linger long after your departure.
              </p>
            </div>

            <Link 
              href="/#experience" 
              className="text-clay border-b border-clay pb-1 text-sm uppercase tracking-widest hover:text-clay-deep hover:border-clay-deep transition-colors"
            >
              Discover The Experience
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
