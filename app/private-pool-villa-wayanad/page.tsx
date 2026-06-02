import type { Metadata } from 'next';
import Villas from '@/components/Villas';
import Amenities from '@/components/Amenities';
import BookingForm from '@/components/BookingForm';
import Testimonials from '@/components/Testimonials';

export const metadata: Metadata = {
  title: "Best Private Pool Villa in Wayanad, Kerala | Sitharom Resort",
  description: "Stay at Sitharom Resort, featuring the best private plunge pool villas in Wayanad. Complete seclusion, forest-view balconies, and premium in-villa dining.",
  keywords: "private pool villa wayanad, best pool villa wayanad, resort with private pool kerala, luxury pool villa vythiri"
};

export default function PrivatePoolLandingPage() {
  return (
    <main className="pt-20">
      
      {/* Editorial Header */}
      <section className="bg-villa-dark text-warm-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(193,124,69,0.08)_0%,transparent_65%)]" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10 space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-bold block">Signature Luxury</span>
          <h1 className="font-display text-4xl md:text-6xl leading-tight">
            Best Private Pool Villa <br />
            in <em className="text-gold italic font-light">Wayanad, Kerala</em>
          </h1>
          <p className="text-sm md:text-base font-light text-text-muted leading-relaxed max-w-2xl mx-auto">
            Unlike resorts with shared, crowded pools, both Ithal Villa and Harsham Villa at Sitharom offer completely private plunge pools. Enjoy unlimited, private swim times at midnight or sunrise, framed by massive rocks and towering rainforest trees.
          </p>
        </div>
      </section>

      {/* Reused Sections for High Conversion */}
      <Villas />
      <Amenities />
      <Testimonials />
      <BookingForm />

    </main>
  );
}
