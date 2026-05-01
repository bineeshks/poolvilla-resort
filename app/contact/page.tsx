import BookingForm from '@/components/BookingForm';

export const metadata = {
  title: "Contact & Reservations | Sitharom Pool Villa",
  description: "Get in touch with the Sitharom team or book your private luxury pool villa.",
};

export default function ContactPage() {
  return (
    <main className="pt-32">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-display text-villa-dark mb-6">
          Contact <em className="text-clay italic">Us</em>
        </h1>
        <p className="text-text-muted font-light max-w-2xl mx-auto">
          Whether you are ready to book your escape or have a specialized request, our dedicated team is at your service 24/7.
        </p>
      </div>

      <div className="container mx-auto px-6 mb-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="flex flex-col items-center p-8 bg-cream border border-sand">
          <span className="font-display text-2xl mb-4 text-clay">Address</span>
          <p className="font-light text-text-muted text-sm">
            123 Tropical Way<br />
            Bali 80361, Indonesia
          </p>
        </div>
        <div className="flex flex-col items-center p-8 bg-cream border border-sand">
          <span className="font-display text-2xl mb-4 text-clay">Direct Contact</span>
          <p className="font-light text-text-muted text-sm flex flex-col gap-2">
            <a href="tel:+1234567890" className="hover:text-clay transition-colors">+1 (234) 567-890</a>
            <a href="mailto:info@sitharom.com" className="hover:text-clay transition-colors">info@sitharom.com</a>
          </p>
        </div>
        <div className="flex flex-col items-center p-8 bg-cream border border-sand">
          <span className="font-display text-2xl mb-4 text-clay">Social Media</span>
          <p className="font-light text-text-muted text-sm flex flex-col gap-2">
            <a href="#" className="hover:text-clay transition-colors">Instagram</a>
            <a href="#" className="hover:text-clay transition-colors">Facebook</a>
          </p>
        </div>
      </div>

      <BookingForm />
    </main>
  );
}
