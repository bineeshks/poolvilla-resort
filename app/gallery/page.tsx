import GalleryComponent from '@/components/Gallery';
import Image from 'next/image';
import img1 from './img1.jpeg';

export const metadata = {
  title: "Gallery | Sitharom Pool Villa",
  description: "Take a visual journey through Sitharom Pool Villa. View our stunning private pools, elegant interiors, and lush surroundings.",
};

export default function GalleryPage() {
  return (
    <main className="bg-cream">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex flex-col justify-center items-center overflow-hidden">
        <Image 
          src={img1} 
          alt="Sitharom Gallery Background"
          fill
          className="object-cover"
          priority
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-villa-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-villa-dark/60 via-transparent to-transparent" />
        
        <div className="relative z-10 container mx-auto px-6 text-center mt-20">
          <h1 className="text-5xl md:text-7xl font-display text-warm-white mb-6">
            The <em className="text-gold italic">Gallery</em>
          </h1>
          <p className="text-warm-white/90 font-light max-w-2xl mx-auto text-balance">
            A visual exploration of the architectural elegance, tropical beauty, and serene moments that await you.
          </p>
        </div>
      </section>
      
      {/* We reuse the gallery component but in a real app this would map over many more images */}
      <GalleryComponent />
    </main>
  );
}
