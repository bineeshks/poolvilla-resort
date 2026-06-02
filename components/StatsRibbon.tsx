'use client';

import { motion } from 'framer-motion';

export default function StatsRibbon() {
  const stats = [
    { number: "2", label: "Private Villas" },
    { number: "2", label: "Bedrooms Each" },
    { number: "100%", label: "Private Pools" },
    { number: "5.0", label: "Google Rated" },
  ];
  return (
    <section className="bg-warm-white dark:bg-[#130D08] border-y border-sand-dark dark:border-gold/10 py-8 md:py-10 relative z-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-sand-dark dark:divide-gold/10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              className="flex flex-col items-center justify-center p-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <span className="font-display text-4xl text-clay dark:text-gold mb-2 transition-colors duration-500">{stat.number}</span>
              <span className="font-body text-xs tracking-widest uppercase text-text-muted dark:text-sand/60 transition-colors duration-500">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
