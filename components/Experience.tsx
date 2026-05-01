'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    num: "01",
    title: "Pools & Relaxation",
    desc: "Enjoy our main Swimming Pool and a dedicated Kids Pool for the little ones."
  },
  {
    num: "02",
    title: "Evening Delights",
    desc: "Gather around the Campfire or enjoy a delicious BBQ under the stars."
  },
  {
    num: "03",
    title: "Outdoor Games",
    desc: "Get active with a game of Badminton or relax on the Swing."
  },
  {
    num: "04",
    title: "Indoor Board Games",
    desc: "Challenge your family and friends to Carroms, Chess, and Ludo."
  }
];

export default function Experience() {
  return (
    <section className="py-0 bg-cream" id="experience">
      <div className="flex flex-col lg:flex-row min-h-[800px]">
        
        {/* Left Panel - Terracotta Watermark */}
        <div className="lg:w-1/2 bg-clay relative flex items-center justify-center p-16 lg:p-24 overflow-hidden">
          {/* Faded Watermark Text */}
          <div className="absolute inset-0 flex flex-col justify-center select-none opacity-10 leading-[0.8] font-display text-[12rem] lg:text-[18rem] uppercase text-warm-white overflow-hidden text-nowrap pointer-events-none">
            <span className="-ml-10">Bespoke</span>
            <span className="ml-20">Moments</span>
            <span className="-ml-5">Curated</span>
          </div>
          
          <motion.div 
            className="relative z-10 text-warm-white max-w-md"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium mb-6 block text-gold">Curated Activities</span>
            <h2 className="text-5xl md:text-6xl font-display leading-tight mb-8">
              Beyond Your <br/><em className="italic font-light text-gold">Imagination</em>
            </h2>
            <p className="font-light text-sm text-warm-white/80 leading-relaxed tracking-wide">
              Your stay at Sitharom extends far beyond the confines of your suite. Allow us to orchestrate unforgettable moments that connect you with the soul of the island.
            </p>
          </motion.div>
        </div>

        {/* Right Panel - Experience List */}
        <div className="lg:w-1/2 bg-sand py-24 px-6 md:px-16 lg:px-24 flex items-center">
          <div className="w-full max-w-lg mx-auto">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={idx}
                className="group border-b border-text-muted/20 last:border-0 py-8 first:pt-0 last:pb-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <div className="flex items-start gap-8">
                  <span className="font-display text-2xl text-clay/50 group-hover:text-clay transition-colors duration-300">
                    {exp.num}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-villa-dark mb-3 group-hover:text-clay transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <p className="text-text-muted font-light text-sm leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
