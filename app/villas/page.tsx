import Villas from '@/components/Villas';
import Amenities from '@/components/Amenities';

export const metadata = {
  title: "Villas & Suites | Sitharom Pool Villa",
  description: "Explore our collection of luxurious private pool villas. From intimate garden retreats to royal infinity suites.",
};

export default function VillasPage() {
  return (
    <main className="pt-32">
      {/* Header */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-display text-villa-dark mb-6">
          Our <em className="text-clay italic">Accommodations</em>
        </h1>
        <p className="text-text-muted font-light max-w-2xl mx-auto">
          Discover a sanctuary of unparalleled luxury. Every villa at Sitharom is a testament to mindful design, blending seamlessly with nature while offering world-class amenities and complete privacy.
        </p>
      </div>

      <Villas />
      <Amenities />
    </main>
  );
}
