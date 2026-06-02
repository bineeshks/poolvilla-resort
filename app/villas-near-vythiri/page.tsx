import type { Metadata } from 'next';
import Villas from '@/components/Villas';
import Amenities from '@/components/Amenities';
import BookingForm from '@/components/BookingForm';
import WhyWayanad from '@/components/WhyWayanad';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: "Luxury Private Pool Villas Near Vythiri, Wayanad | Sitharom Resort",
  description: "Looking for premium villas near Vythiri? Sitharom Resort offers 2 exclusive private pool villas with lush rainforest views, mist, and absolute seclusion just minutes from Vythiri town.",
  keywords: "villas near vythiri, luxury resort vythiri, private pool villa vythiri, sitharom vythiri, wayanad villas"
};

export default function VythiriLandingPage() {
  return (
    <main className="pt-20">
      
      {/* Editorial Header */}
      <section className="bg-villa-dark text-warm-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-clay/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10 space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-clay font-bold block">Location Advantage</span>
          <h1 className="font-display text-4xl md:text-6xl leading-tight">
            Villas Near <em className="text-clay italic">Vythiri, Wayanad</em>
          </h1>
          <p className="text-sm md:text-base font-light text-text-muted leading-relaxed max-w-2xl mx-auto">
            Sitharom Resort sits tucked in the rainforest slopes of Old Vythiri. Enjoy the perfect blend of absolute wilderness seclusion and easy highway connectivity. Reach top attractions, spice markets, and viewpoints in minutes from your private pool sanctuary.
          </p>
        </div>
      </section>

      {/* Reused Sections for High Conversion */}
      <WhyWayanad />
      <Villas />
      <Amenities />
      <BookingForm />
      <FAQ />

    </main>
  );
}
