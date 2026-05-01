'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "From the moment we arrived, the service was impeccable. The villa is breathtaking, and having our own private pool overlooking the jungle was a dream come true.",
    name: "Sarah M.",
    location: "London, UK"
  },
  {
    quote: "Our butler anticipated our every need without ever intruding on our privacy. The culinary experiences were Michelin-star quality right in our dining room.",
    name: "James & Lisa",
    location: "Singapore"
  },
  {
    quote: "True luxury. The design is stunning, and the attention to detail is unmatched. We left feeling completely rejuvenated. We will certainly return.",
    name: "Priya R.",
    location: "Dubai, UAE"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-clay mb-4 block">Guest Memoirs</span>
          <h2 className="text-4xl md:text-5xl font-display text-villa-dark">
            Words of <em className="text-clay italic">Elegance</em>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              className="bg-warm-white border border-sand p-10 relative overflow-hidden flex flex-col justify-between"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              {/* Quote Watermark */}
              <Quote className="absolute -top-4 -left-4 text-sand-dark opacity-30 w-32 h-32 rotate-180 pointer-events-none" />
              
              <div className="relative z-10 mb-8">
                <div className="flex gap-1 text-gold mb-6">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="font-display italic text-xl md:text-2xl text-text-mid leading-relaxed">
                  &quot;{t.quote}&quot;
                </p>
              </div>

              <div className="relative z-10 border-t border-sand pt-6">
                <span className="block font-display text-lg text-villa-dark">{t.name}</span>
                <span className="block text-xs uppercase tracking-widest text-text-muted mt-1">{t.location}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
