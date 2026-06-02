import type { Metadata } from 'next';
import Villas from '@/components/Villas';
import ExperiencePackages from '@/components/ExperiencePackages';
import Testimonials from '@/components/Testimonials';
import BookingForm from '@/components/BookingForm';

export const metadata: Metadata = {
  title: "Romantic Honeymoon Pool Villa Resort in Wayanad | Sitharom Resort",
  description: "Celebrate your romance at Wayanad's premier honeymoon pool villa resort. Sitharom offers absolute seclusion, flower-decorated private plunge pools, and candlelit dinners under the stars in Old Vythiri.",
  keywords: "honeymoon resort wayanad, romantic stay wayanad, honeymoon pool villa kerala, couple villa wayanad, private pool honeymoon"
};

export default function HoneymoonLandingPage() {
  return (
    <main className="pt-20">
      
      {/* Editorial Header */}
      <section className="bg-[#120d0a] text-warm-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,69,27,0.12)_0%,transparent_75%)]" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10 space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-clay font-bold block">Romantic Getaways</span>
          <h1 className="font-display text-4xl md:text-6xl leading-tight">
            Honeymoon Resort <br />
            in <em className="text-clay italic">Wayanad, Kerala</em>
          </h1>
          <p className="text-sm md:text-base font-light text-text-muted leading-relaxed max-w-2xl mx-auto">
            Sitharom Resort is custom-designed for new chapters and romantic milestones. With only two exclusive villas on the property, couples enjoy total privacy in their own plunge pool. Wake up to misty valleys, enjoy in-villa breakfast in bed, and dine by candlelight next to the forest.
          </p>
        </div>
      </section>

      {/* Reused Sections for High Conversion */}
      <Villas />
      <ExperiencePackages />
      <Testimonials />
      <BookingForm />

    </main>
  );
}
