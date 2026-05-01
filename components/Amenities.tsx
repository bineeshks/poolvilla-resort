'use client';

import { motion } from 'framer-motion';
import { 
  BedDouble, 
  CarFront, 
  Tv, 
  Wifi, 
  Refrigerator, 
  Coffee 
} from 'lucide-react';

const amenitiesList = [
  { icon: BedDouble, name: '4 Bedrooms', desc: 'Spacious bedrooms with private balconies.' },
  { icon: CarFront, name: 'Parking', desc: 'Secure on-site parking facilities.' },
  { icon: Tv, name: 'Smart TV', desc: 'Entertainment at your fingertips.' },
  { icon: Wifi, name: 'Free Wi-Fi', desc: 'High-speed internet connectivity.' },
  { icon: Refrigerator, name: 'Mini Refrigerator', desc: 'Keep your beverages and snacks cool.' },
  { icon: Coffee, name: 'Kettle', desc: 'In-room tea and coffee making facilities.' },
];

export default function Amenities() {
  return (
    <section className="bg-villa-dark pt-24 pb-0 overflow-hidden relative" id="amenities">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-clay mb-4 block">Signature Amenities</span>
          <h2 className="text-4xl md:text-5xl font-display text-warm-white">
            Uncompromising <em className="text-clay italic">Luxury</em>
          </h2>
        </motion.div>

        {/* Grid Container */}
        {/* We use a thin border wrapper and divide utilities to create the internal grid setup */}
        <div className="border border-warm-white/10 mx-auto max-w-6xl relative z-10 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-warm-white/10 border-b border-warm-white/10 last:border-b-0">
            {amenitiesList.slice(0, 3).map((amenity, idx) => (
              <AmenityCard key={idx} amenity={amenity} idx={idx} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-warm-white/10">
            {amenitiesList.slice(3, 6).map((amenity, idx) => (
              <AmenityCard key={idx + 3} amenity={amenity} idx={idx + 3} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function AmenityCard({ amenity, idx }: { amenity: any, idx: number }) {
  const Icon = amenity.icon;
  
  return (
    <motion.div 
      className="p-10 group hover:bg-clay/5 transition-colors duration-500 flex flex-col items-start"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
    >
      <div className="mb-6 p-4 border border-clay/30 rounded-xl text-clay group-hover:bg-clay group-hover:text-warm-white transition-all duration-500">
        <Icon strokeWidth={1.5} size={28} />
      </div>
      <h3 className="font-display text-xl text-warm-white mb-3 tracking-wide">{amenity.name}</h3>
      <p className="text-sm font-light text-text-muted leading-relaxed">
        {amenity.desc}
      </p>
    </motion.div>
  );
}
