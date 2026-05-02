import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/app/gallery/logo.png';

export default function Footer() {
  return (
    <footer className="bg-villa-dark text-sand pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Block */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center">
              <Image 
                src={logoImg} 
                alt="Sitharom Pool Villa Logo" 
                width={240} 
                height={90} 
                className="h-[90px] w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-text-muted leading-relaxed font-light">
              Experience the pinnacle of tropical luxury at our exclusive private pool villas. 24/7 personalized service, lush gardens, and ultimate privacy await.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-display text-lg tracking-widest uppercase text-warm-white">Explore</h4>
            <nav className="flex flex-col gap-3 text-sm text-text-muted font-light">
              <Link href="/villas" className="hover:text-gold transition-colors inline-block">Our Villas</Link>
              <Link href="/gallery" className="hover:text-gold transition-colors inline-block">Gallery</Link>
              <Link href="/#experience" className="hover:text-gold transition-colors inline-block">Experiences</Link>
              <Link href="/#amenities" className="hover:text-gold transition-colors inline-block">Amenities</Link>
              <Link href="/contact" className="hover:text-gold transition-colors inline-block">Contact Us</Link>
            </nav>
          </div>

          {/* Villas List */}
          <div className="flex flex-col gap-6">
            <h4 className="font-display text-lg tracking-widest uppercase text-warm-white">Accommodations</h4>
            <nav className="flex flex-col gap-3 text-sm text-text-muted font-light">
              <Link href="/villas#garden" className="hover:text-gold transition-colors inline-block">Garden Pool Villa</Link>
              <Link href="/villas#panorama" className="hover:text-gold transition-colors inline-block">Panorama Pool Suite</Link>
              <Link href="/villas#royal" className="hover:text-gold transition-colors inline-block">Royal Infinity Villa</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="font-display text-lg tracking-widest uppercase text-warm-white">Connect</h4>
            <div className="flex flex-col gap-3 text-sm text-text-muted font-light">
              <p>123 Tropical Way, Bali 80361, Indonesia</p>
              <a href="tel:+1234567890" className="hover:text-gold transition-colors">+1 (234) 567-890</a>
              <a href="mailto:info@sitharom.com" className="hover:text-gold transition-colors">info@sitharom.com</a>
              <a href="https://wa.me/919000000000" className="text-clay-light hover:text-clay transition-colors mt-2 uppercase tracking-wider font-medium text-xs">
                Chat on WhatsApp
              </a>
            </div>
            
            <div className="flex gap-4 mt-2">
              <a href="#" className="p-2 border border-text-muted rounded-full hover:border-gold hover:text-gold transition-all text-warm-white bg-transparent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="p-2 border border-text-muted rounded-full hover:border-gold hover:text-gold transition-all text-warm-white bg-transparent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="p-2 border border-text-muted rounded-full hover:border-gold hover:text-gold transition-all text-warm-white bg-transparent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-text-muted/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-text-muted">
          <p>&copy; {new Date().getFullYear()} Sitharom Pool Villa. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-warm-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-warm-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
