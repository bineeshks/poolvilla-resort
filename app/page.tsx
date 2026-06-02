import Hero from '@/components/Hero';
import StatsRibbon from '@/components/StatsRibbon';
import About from '@/components/About';
import Villas from '@/components/Villas';
import Amenities from '@/components/Amenities';
import Gallery from '@/components/Gallery';
import Experience from '@/components/Experience';
import WhyWayanad from '@/components/WhyWayanad';
import NearbyAttractions from '@/components/NearbyAttractions';
import ExperiencePackages from '@/components/ExperiencePackages';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import BookingForm from '@/components/BookingForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsRibbon />
      <About />
      <Villas />
      <Amenities />
      <Gallery />
      <Experience />
      <WhyWayanad />
      <NearbyAttractions />
      <ExperiencePackages />
      <Testimonials />
      <FAQ />
      <BookingForm />
    </main>
  );
}
