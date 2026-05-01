'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

type FormData = {
  checkIn: string;
  checkOut: string;
  guests: string;
  villaType: string;
};

export default function BookingForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    const phoneNumber = "1234567890"; // Replace with actual WhatsApp number
    const message = `Hello! I would like to inquire about a reservation at Sitharom Pool Villa.\n\n*Reservation Details:*\n- Villa Type: ${data.villaType}\n- Check-in: ${data.checkIn}\n- Check-out: ${data.checkOut}\n- Guests: ${data.guests}\n\nPlease let me know the availability and pricing.`;
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section className="bg-clay text-warm-white py-20" id="book">
      <div className="container mx-auto px-6">
        
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-gold mb-4 block">Secure Your Stay</span>
          <h2 className="text-4xl md:text-5xl font-display mb-2">
            Reserve Your Private Villa
          </h2>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 lg:gap-6 bg-clay-deep/30 p-4 lg:p-6 rounded-none backdrop-blur-sm border border-warm-white/20">
            
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[10px] tracking-widest uppercase opacity-80 px-1">Check-in</label>
              <input 
                type="date"
                {...register('checkIn', { required: true })}
                className="w-full bg-transparent border border-warm-white/30 text-warm-white px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-warm-white/50 text-sm"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[10px] tracking-widest uppercase opacity-80 px-1">Check-out</label>
              <input 
                type="date"
                {...register('checkOut', { required: true })}
                className="w-full bg-transparent border border-warm-white/30 text-warm-white px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-warm-white/50 text-sm"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[10px] tracking-widest uppercase opacity-80 px-1">Guests</label>
              <select 
                {...register('guests')}
                className="w-full bg-transparent border border-warm-white/30 text-warm-white px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none text-sm"
                style={{ WebkitAppearance: 'none', backgroundImage: 'none' }}
              >
                <option value="1" className="text-villa-dark">1 Guest</option>
                <option value="2" className="text-villa-dark">2 Guests</option>
                <option value="3" className="text-villa-dark">3 Guests</option>
                <option value="4" className="text-villa-dark">4+ Guests</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[10px] tracking-widest uppercase opacity-80 px-1">Villa Type</label>
              <select 
                {...register('villaType')}
                className="w-full bg-transparent border border-warm-white/30 text-warm-white px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none text-sm"
                style={{ WebkitAppearance: 'none' }}
              >
                <option value="Ithal Villa" className="text-villa-dark">Ithal Villa</option>
                <option value="Harsham Villa" className="text-villa-dark">Harsham Villa</option>
                <option value="Any Available" className="text-villa-dark">Any Available</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col justify-end mt-4 md:mt-0">
              <button 
                type="submit"
                className="w-full bg-[#25D366] text-white h-[46px] text-xs tracking-widest uppercase font-medium hover:bg-[#1ebd5c] transition-colors flex items-center justify-center gap-2"
              >
                Send via WhatsApp
              </button>
            </div>

          </div>
        </motion.form>

      </div>
    </section>
  );
}
