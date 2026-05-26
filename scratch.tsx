// ───────────────────────────────────────────
// SECTION: DINING
// ───────────────────────────────────────────
function DiningSection() {
  return (
    <section className="relative py-24 bg-[#0A192F] overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] via-[#0A4F7A]/10 to-[#0A192F] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-gold/60" />
                <span className="font-['Plus_Jakarta_Sans'] text-xs tracking-[0.25em] uppercase text-white/40">Culinary</span>
              </div>
              <h2 className="section-heading text-white text-4xl md:text-5xl lg:text-6xl mb-6">
                Blue Rays <span className="text-gold block">Restaurant</span>
              </h2>
              <p className="font-['Inter'] text-white/60 text-lg leading-relaxed mb-8">
                Indulge in a spectacular culinary journey. Our in-house restaurant offers a sophisticated blend of authentic Goan coastal flavors and exquisite international cuisine, all prepared with the freshest local ingredients.
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-white/70">
                  <Utensils className="w-5 h-5 text-gold" />
                  <span className="font-['Inter'] text-sm">Fine Dining</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Coffee className="w-5 h-5 text-gold" />
                  <span className="font-['Inter'] text-sm">Breakfast Buffer</span>
                </div>
              </div>
              <button className="luxury-btn group overflow-hidden bg-white/5 border border-white/10 px-8 py-4 rounded-full relative">
                <span className="relative z-10 font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-[0.2em] text-white group-hover:text-gold transition-colors duration-500">View Menu</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 relative h-[600px]">
            <motion.div 
              className="w-full h-full rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <img src={IMAGES.diningAlt} alt="Blue Rays Restaurant Fine Dining in Goa" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-80" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// SECTION: ATTRACTIONS
// ───────────────────────────────────────────
const ATTRACTIONS = [
  { name: "Calangute Beach", distance: "75 Meters", type: "Beach", image: IMAGES.beach },
  { name: "Baga Beach", distance: "1.5 KM", type: "Beach & Nightlife", image: IMAGES.beachAlt },
  { name: "Tito's Lane", distance: "2 KM", type: "Entertainment", image: IMAGES.cta },
  { name: "Fort Aguada", distance: "7 KM", type: "Historical Site", image: IMAGES.hero },
];

function AttractionsSection() {
  return (
    <section className="relative py-24 bg-[#0A192F] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-12 h-px bg-gold/60" />
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-white/40">Explore</span>
            <span className="w-12 h-px bg-gold/60" />
          </div>
          <h2 className="section-heading text-white text-4xl md:text-5xl lg:text-6xl text-center">
            Discover <span className="text-gold">North Goa</span>
          </h2>
          <p className="font-['Inter'] text-sm text-white/50 mt-4 max-w-xl mx-auto">Perfectly situated near Calangute Beach, Bluerays Goa gives you immediate access to the best attractions, beaches, and nightlife in Goa.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ATTRACTIONS.map((attr, i) => (
            <motion.div 
              key={i}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <img src={attr.image} alt={attr.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-gold mb-2 block">{attr.type}</span>
                <h3 className="font-['Canela',serif] text-2xl text-white mb-1">{attr.name}</h3>
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin className="w-3 h-3" />
                  <span className="font-['Inter'] text-xs">{attr.distance} away</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// SECTION: GALLERY
// ───────────────────────────────────────────
function GallerySection() {
  return (
    <section className="relative py-24 bg-[#0A192F] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="section-heading text-white text-4xl md:text-5xl lg:text-6xl">
              Visual <span className="text-gold">Journey</span>
            </h2>
          </div>
          <button className="font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest text-gold border-b border-gold/30 pb-1 hover:border-gold transition-colors">View All Images</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group">
            <img src={IMAGES.roomAlt} alt="Luxury Resort Goa" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          <div className="rounded-2xl overflow-hidden relative group">
            <img src={IMAGES.dining} alt="Dining at Bluerays" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          <div className="rounded-2xl overflow-hidden relative group">
            <img src={IMAGES.poolAlt} alt="Swimming Pool" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// SECTION: FAQ
// ───────────────────────────────────────────
const FAQS = [
  { q: "How far is Bluerays Goa from Calangute Beach?", a: "We are located just 75 meters away from the pristine Calangute Beach, making it a less than 2-minute walk." },
  { q: "Do the rooms have air conditioning?", a: "Yes, all our standard and deluxe rooms are fully air-conditioned for your maximum comfort." },
  { q: "Is there an in-house restaurant?", a: "Absolutely! The Blue Rays Restaurant serves a delicious variety of authentic Goan coastal dishes and international cuisines." },
  { q: "Do you have a swimming pool?", a: "Yes, we feature a beautiful swimming pool exclusively for our hotel guests." },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 bg-[#0A192F] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 md:px-16">
        <h2 className="section-heading text-white text-4xl md:text-5xl lg:text-6xl text-center mb-16">
          Frequently <span className="text-gold block">Asked Questions</span>
        </h2>
        
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden border border-white/10">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-6 flex items-center justify-between text-left"
              >
                <span className="font-['Canela',serif] text-xl text-white">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gold transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 font-['Inter'] text-white/60 text-sm leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
