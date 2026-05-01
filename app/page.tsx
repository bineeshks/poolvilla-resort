import Hero from '@/components/Hero';
import StatsRibbon from '@/components/StatsRibbon';
import About from '@/components/About';
import Villas from '@/components/Villas';
import Amenities from '@/components/Amenities';
import Gallery from '@/components/Gallery';
import Experience from '@/components/Experience';
import Testimonials from '@/components/Testimonials';
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
      <Testimonials />
      <BookingForm />
    </main>
  );
}
