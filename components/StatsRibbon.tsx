'use client';

import { motion } from 'framer-motion';

export default function StatsRibbon() {
  const stats = [
    { number: "8", label: "Private Villas" },
    { number: "4.9", label: "Star Rating" },
    { number: "100%", label: "Private Pools" },
    { number: "24/7", label: "Butler Service" },
  ];

  return (
    <section className="bg-warm-white border-y border-sand-dark py-8 relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-sand-dark">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              className="flex flex-col items-center justify-center p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <span className="font-display text-4xl text-clay mb-2">{stat.number}</span>
              <span className="font-body text-xs tracking-widest uppercase text-text-muted">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
