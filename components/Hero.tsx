'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import heroBg from '@/app/gallery/bg1.jpeg';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Sitharom Pool Villa Background"
          fill
          priority
          quality={100}
          placeholder="blur"
          className="object-cover object-center md:object-[center_80%]"
        />
        <div className="absolute inset-0 bg-villa-dark/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-villa-dark/60 via-transparent to-villa-dark/20" />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          variants={itemVariants}
          className="text-gold uppercase tracking-[0.25em] text-xs font-medium mb-6 drop-shadow-md"
        >
          2 Private Villas &middot; 2 Bedrooms Each
        </motion.p>
        
        <motion.h1 
          variants={itemVariants}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-warm-white leading-tight mb-4 drop-shadow-lg"
        >
          Sitharom <br className="md:hidden" />
          <em className="text-gold font-light italic">Pool Villa</em>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-warm-white/90 uppercase tracking-widest text-sm md:text-base font-light mb-12 max-w-lg text-balance drop-shadow-md"
        >
          Where Luxury Meets Serenity
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link 
            href="/#book" 
            className="bg-clay text-warm-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-clay-light transition-all border border-clay hover:border-clay-light"
          >
            Reserve Your Villa
          </Link>
          <Link 
            href="/villas" 
            className="bg-transparent text-warm-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-warm-white hover:text-villa-dark transition-all border border-warm-white/50"
          >
            Explore Villas
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => {
          window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        }}
      >
        <span className="text-warm-white/70 uppercase tracking-widest text-[10px]">Scroll</span>
        <div className="w-[1px] h-12 bg-warm-white/20 relative overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-gold absolute top-0"
            animate={{ 
              top: ['-50%', '100%'] 
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
