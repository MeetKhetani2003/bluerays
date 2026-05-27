"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import emailjs from "@emailjs/browser";
import { Star, Coffee, Send, CheckCircle2, MapPin, Phone, Mail, Navigation, Utensils, Check, ChevronDown, ChevronLeft, ChevronRight, Wind, Waves, ShieldCheck } from "lucide-react";

// ─── Types ───
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  index: number;
}

interface SlideProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  index: number;
  progress: number;
}

// ─── Image URLs (Cinematic Luxury Photography) ───
const IMAGES = {
  hero: "https://images.pexels.com/photos/23696832/pexels-photo-23696832.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080",
  heroAlt: "https://images.pexels.com/photos/34790496/pexels-photo-34790496.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080",
  room: "https://images.pexels.com/photos/35868592/pexels-photo-35868592.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080",
  roomAlt: "https://images.pexels.com/photos/36749692/pexels-photo-36749692.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080",
  dining: "https://images.pexels.com/photos/33230508/pexels-photo-33230508.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080",
  diningAlt: "https://images.pexels.com/photos/24433378/pexels-photo-24433378.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080",
  pool: "https://images.pexels.com/photos/35253360/pexels-photo-35253360.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080",
  poolAlt: "https://images.pexels.com/photos/18821250/pexels-photo-18821250.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080",
  beach: "https://images.pexels.com/photos/32262431/pexels-photo-32262431.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080",
  beachAlt: "https://images.pexels.com/photos/2174660/pexels-photo-2174660.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080",
  cta: "https://images.pexels.com/photos/12610509/pexels-photo-12610509.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080",
  ctaAlt: "https://images.pexels.com/photos/35236021/pexels-photo-35236021.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080",
  exteriorLocal: "/exterior.jpg",
  poolLocal: "/pool.jpg",
  bedroomLocal: "/bedroom.jpg",
  receptionLocal: "/reception.jpg",
  bathroomLocal: "/bathroom.jpg",
};

// ─── Experience Data ───
const EXPERIENCES: Omit<SlideProps, "index" | "progress">[] = [
  {
    title: "Luxury",
    subtitle: "Rooms & Suites",
    description: "Coastal elegance meets contemporary design. Each suite opens to panoramic ocean views, curated with hand-selected furnishings and private sanctuaries of unparalleled comfort.",
    image: "/exp_land_room.jpg",
  },
  {
    title: "Fine",
    subtitle: "Dining Experience",
    description: "A culinary journey through coastal flavors. Our chef crafts exquisite menus featuring the freshest local seafood, international specialties, and hand-picked wine pairings.",
    image: "/exp_land_dining.jpg",
  },
  {
    title: "Infinity",
    subtitle: "Pool & Wellness",
    description: "Float between sky and sea at our cliff-edge infinity pool. Surrender to wellness rituals inspired by ancient Goan healing traditions and modern spa therapies.",
    image: "/exp_land_pool.jpg",
  },
  {
    title: "Goa",
    subtitle: "Lifestyle & Culture",
    description: "Immerse yourself in vibrant Goan culture — from golden beach sunsets and private yacht excursions to curated art walks and traditional music under the stars.",
    image: "/exp_land_lifestyle.jpg",
  },
];

// ─── Floating Particles Component ───
function FloatingParticles() {
  const count = 40;
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `radial-gradient(circle, rgba(212, 175, 55, ${p.opacity}), transparent)`,
            boxShadow: `0 0 ${p.size * 4}px rgba(212, 175, 55, ${p.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity, p.opacity * 0.8, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Aurora Background ───
function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(10, 79, 122, 0.15) 0%, rgba(212, 175, 55, 0.05) 30%, transparent 70%)",
          left: "20%",
          top: "30%",
        }}
        animate={{
          x: ["-10%", "10%", "-5%", "-10%"],
          y: ["-5%", "10%", "-10%", "-5%"],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, rgba(248, 246, 242, 0.03) 40%, transparent 70%)",
          right: "15%",
          bottom: "20%",
        }}
        animate={{
          x: ["5%", "-8%", "3%", "5%"],
          y: ["8%", "-5%", "5%", "8%"],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// ─── Glass Card Component ───
function GlassCard({ children, className = "", index }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  return (
    <motion.div
      ref={cardRef}
      className={`glass rounded-2xl p-6 md:p-8 cursor-default ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Magnetic Button ───
function MagneticButton({ children, className = "", href = "#" }: { children: ReactNode; className?: string; href?: string }) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btnRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <a
      ref={btnRef}
      href={href}
      className={`magnetic-btn inline-flex items-center justify-center ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        if (href?.startsWith("#") && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      }}
    >
      {children}
    </a>
  );
}

// ─── Loading Screen ───
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15 + 5;
        return next >= 100 ? 100 : next;
      });
    }, 200);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(onComplete, 800);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FDFBF7]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-center">
        <motion.p
          ref={textRef}
          className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.3em] uppercase text-[#1A1A1A]/70 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          BLUERAYS GOA
        </motion.p>
        <div className="w-40 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/50 to-gold"
            style={{ width: `${progress}%` }}
            layout
          />
        </div>
        <motion.p
          className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.2em] text-[#1A1A1A]/20 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {Math.round(progress)}%
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── Booking Modal ───
function BookingModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#FDFBF7] p-8 md:p-12 rounded-3xl max-w-lg w-full relative shadow-2xl border border-gold/20"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#1A1A1A]/70 hover:bg-black/10 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-gold" />
              </div>
              <h2 className="font-['Canela',serif] text-3xl text-[#1A1A1A] mb-2">Welcome to Bluerays Goa</h2>
              <p className="font-['Inter'] text-[#1A1A1A]/70 text-sm">Experience the ultimate coastal luxury. Book directly with us for exclusive rates and personalized service.</p>
            </div>
            <a
              href="#contact"
              onClick={onClose}
              className="luxury-btn luxury-btn-gold w-full flex items-center justify-center"
            >
              <span className="relative z-10">Book Your Stay Now</span>
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Scroll Progress Indicator ───
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      style={{ opacity: scrollYProgress }}
    >
      <svg width="2" height="120" viewBox="0 0 2 120" className="overflow-visible">
        <line x1="1" y1="0" x2="1" y2="120" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="120"
          stroke="#D4AF37"
          strokeWidth="1"
          style={{ pathLength }}
        />
      </svg>
    </motion.div>
  );
}

// ─── Section Divider ───
function SectionDivider() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent my-8 md:my-16" />
  );
}

// ───────────────────────────────────────────
// SECTION 1: CINEMATIC HERO
// ───────────────────────────────────────────
function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const blurAmount = useTransform(scrollYProgress, [0, 0.8], [0, 8]);

  // Mouse parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100vh] overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: heroScale, filter: `blur(${blurAmount}px)` }}
      >
        {/* Subtle, uniform dark overlay for text legibility without harsh bottom fade */}
        <div className="absolute inset-0 bg-[#050505]/30 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-transparent z-[2]" />
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          src="/hero-video.mp4"
          className="absolute inset-0 w-full h-full object-cover scale-[1.15] z-0 pointer-events-none"
          style={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        />
        {/* Gradient overlay animation */}
        <motion.div
          className="absolute inset-0 z-[3]"
          style={{
            background:
              "linear-gradient(135deg, rgba(10, 79, 122, 0.2) 0%, transparent 50%, rgba(212, 175, 55, 0.1) 100%)",
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Light leak effect */}
      <motion.div
        className="absolute top-0 right-0 w-[40%] h-full z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.06) 50%, transparent 100%)",
          x: mousePos.x * -1,
          y: mousePos.y * -1,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
        style={{ y: contentY, opacity: heroOpacity }}
      >
        {/* Badge */}
        {/* Headline */}
        <motion.h1
          className="font-['Plus_Jakarta_Sans'] text-4xl md:text-5xl lg:text-7xl font-light tracking-wider text-white leading-tight uppercase"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } }
          }}
        >
          {["The Premier", "Luxury Hotel", "In Goa."].map((line, i) => (
            <motion.span
              key={i}
              className={`block overflow-hidden ${i === 1 ? 'text-gold font-normal' : ''}`}
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <span className="block">{line}</span>
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-['Inter'] text-sm md:text-base lg:text-lg text-white/70 max-w-xl mt-6 md:mt-8 leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Experience luxury stays, curated dining, breathtaking coastal views, and
          unforgettable moments in the heart of Goa.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 mt-8 md:mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton
            className="luxury-btn luxury-btn-gold group"
            href="#booking"
          >
            <span className="relative z-10">Reserve Your Stay</span>
            <svg className="relative z-10 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>

          <MagneticButton className="luxury-btn group" href="#experiences">
            <span className="relative z-10">Explore Experiences</span>
            <svg className="relative z-10 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </MagneticButton>
        </motion.div>

        {/* Floating Glass Panels */}
        <motion.div
          className="absolute right-6 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4"
          style={{ y: heroY }}
        >
          <GlassCard index={0}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-ocean/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#1A1A1A]/90">Beachside</p>
                <p className="font-['Inter'] text-[10px] text-[#1A1A1A]/70">Location</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard index={1} className="ml-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-ocean/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#1A1A1A]/90">Luxury</p>
                <p className="font-['Inter'] text-[10px] text-[#1A1A1A]/70">Accommodation</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard index={2}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-ocean/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 8h1a4 4 0 010 8h-1" />
                  <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
              </div>
              <div>
                <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#1A1A1A]/90">Restaurant</p>
                <p className="font-['Inter'] text-[10px] text-[#1A1A1A]/70">& Dining</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard index={3} className="ml-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-ocean/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <div>
                <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#1A1A1A]/90">Premium</p>
                <p className="font-['Inter'] text-[10px] text-[#1A1A1A]/70">Hospitality</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: heroOpacity }}
      >
        <span className="font-['Plus_Jakarta_Sans'] text-[8px] tracking-[0.3em] uppercase text-[#1A1A1A]/30">
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

// ───────────────────────────────────────────
// SECTION 2: EXPERIENCE SHOWCASE (Horizontal Scroll)
// ───────────────────────────────────────────
function ExperienceShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = rect.height;
      const scrollDistance = containerHeight - windowHeight;
      const scrolled = Math.max(0, Math.min(1, -rect.top / scrollDistance));
      setProgress(scrolled);
      setCurrentSlide(Math.min(Math.floor(scrolled * EXPERIENCES.length), EXPERIENCES.length - 1));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", handleScroll);
            handleScroll();
          } else {
            window.removeEventListener("scroll", handleScroll);
          }
        });
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // The horizontal translation
  const slideWidth = 100 / EXPERIENCES.length;
  const xPercent = -progress * (100 - slideWidth);

  return (
    <section
      id="experiences"
      ref={containerRef}
      className="relative bg-[#FDFBF7]"
      style={{ height: `${EXPERIENCES.length * 120}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section Header */}
        <div className="absolute top-8 left-6 md:left-16 lg:left-24 z-20">
          <motion.div
            className="inline-flex items-center gap-2 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="w-8 h-px bg-gold/60" />
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A]/70">
              The Experience
            </span>
          </motion.div>
          <h2 className="font-['Canela',serif] text-[#1A1A1A] text-4xl md:text-5xl lg:text-6xl font-light leading-none">
            Curated
            <span className="text-gold block italic font-normal mt-1">Moments</span>
          </h2>
        </div>

        {/* Slide counter */}
        <div className="absolute top-8 right-6 md:right-16 lg:right-24 z-20 text-right">
          <span className="font-['Plus_Jakarta_Sans'] text-4xl md:text-6xl font-light text-[#1A1A1A]/10">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <span className="font-['Plus_Jakarta_Sans'] text-sm text-[#1A1A1A]/20 block">
            / {String(EXPERIENCES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Horizontal Track */}
        <motion.div
          ref={trackRef}
          className="flex h-full"
          style={{ x: `${xPercent}%`, width: `${EXPERIENCES.length * 100}%` }}
        >
          {EXPERIENCES.map((exp, i) => (
            <ExperienceSlide
              key={i}
              {...exp}
              index={i}
              progress={Math.max(0, Math.min(1, (progress * EXPERIENCES.length) - i))}
            />
          ))}
        </motion.div>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {EXPERIENCES.map((_, i) => (
            <button
              key={i}
              className={`w-12 h-px transition-all duration-700 ${
                i <= currentSlide ? "bg-gold/80" : "bg-white/10"
              }`}
              onClick={() => {
                if (containerRef.current) {
                  const targetScroll = (i / EXPERIENCES.length) * containerRef.current.offsetHeight;
                  window.scrollTo({
                    top: containerRef.current.offsetTop + targetScroll,
                    behavior: "smooth",
                  });
                }
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Individual Experience Slide ───
function ExperienceSlide({ title, subtitle, description, image, index, progress }: SlideProps) {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progress > 0.1 && !isVisible) setIsVisible(true);
  }, [progress, isVisible]);

  // Mouse parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 10,
      y: (e.clientY / window.innerHeight - 0.5) * 10,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fullscreen-panel relative flex items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div
        ref={imageRef}
        className="absolute inset-0"
        style={{
          scale: 1 + progress * 0.05,
          filter: `blur(${(1 - progress) * 4}px)`,
        }}
      >
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          style={{ x: mousePos.x * (index % 2 === 0 ? 1 : -1), y: mousePos.y * 0.5 }}
        />
      </motion.div>

      {/* Content in Frosted Glass Card to prevent overlap and ensure readability */}
      <div className="absolute bottom-12 left-6 md:left-16 lg:left-24 z-10 w-full max-w-xl">
        <motion.div 
          className="bg-[#FDFBF7]/85 backdrop-blur-3xl border border-white/60 p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Label */}
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="w-8 h-px bg-gold/60" />
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-gold">
              {title}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="font-['Canela',serif] text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] font-light leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="font-['Inter'] text-sm md:text-base text-[#1A1A1A]/70 mt-4 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {description}
          </motion.p>

          {/* Explore Link */}
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 mt-6 font-['Plus_Jakarta_Sans'] text-xs tracking-[0.2em] uppercase text-[#1A1A1A] hover:text-gold transition-colors duration-500 group"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.preventDefault()}
          >
            Discover More
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative element */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none overflow-hidden"
        style={{ opacity: progress * 0.3 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, ${0.03 * progress}) 50%, transparent 100%)`,
          }}
        />
      </motion.div>
    </div>
  );
}

// ───────────────────────────────────────────
// SECTION 3: LUXURY BOOKING CTA
// ───────────────────────────────────────────
function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative py-20 md:py-24 overflow-hidden"
    >
      {/* Background */}
      <motion.div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/30 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-[#050505]/40 z-[2]" />
        <motion.img
          src={IMAGES.cta}
          alt="Sunset at BLUERAYS GOA"
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Golden hour overlay */}
        <motion.div
          className="absolute inset-0 z-[3]"
          style={{
            background:
              "linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, transparent 40%, rgba(212, 175, 55, 0.05) 60%, transparent 100%)",
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Glow orbs */}
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full pointer-events-none z-[3]"
        style={{
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)",
        }}
        animate={{
          x: ["-10%", "10%", "-10%"],
          y: ["-5%", "5%", "-5%"],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-8 h-px bg-gold/60" />
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-white/70">
            Begin Your Journey
          </span>
          <span className="w-8 h-px bg-gold/60" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="hero-display text-white leading-[0.85]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
          }}
        >
          {["YOUR GOA", "STORY", "STARTS HERE."].map((line, i) => (
            <motion.span
              key={i}
              className={`block overflow-hidden ${i === 1 ? 'text-gold' : ''}`}
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <span className="block">{line}</span>
            </motion.span>
          ))}
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          className="font-['Inter'] text-sm md:text-base lg:text-lg text-white/70 max-w-xl mt-6 md:mt-8 leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Indulge in luxury hospitality, curated experiences, exceptional dining, and
          memorable coastal escapes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-8 md:mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton
            className="luxury-btn luxury-btn-gold group !px-10 !py-5"
            href="#contact"
          >
            <span className="relative z-10 text-sm">Book Your Experience</span>
            <svg className="relative z-10 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>

          <MagneticButton className="luxury-btn group !px-10 !py-5" href="#contact">
            <span className="relative z-10 text-sm">Contact Concierge</span>
          </MagneticButton>
        </motion.div>

        </motion.div>
    </section>
  );
}

// ───────────────────────────────────────────
// NAVIGATION BAR
// ───────────────────────────────────────────
function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pt-4 md:pt-6 pointer-events-none">
      <motion.header
        className={`pointer-events-auto transition-all duration-700 rounded-full flex items-center justify-between px-6 py-3 md:px-8 md:py-4 ${
          scrolled 
            ? "w-[95%] md:w-[85%] max-w-5xl bg-[#FDFBF7]/60 backdrop-blur-3xl border border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]" 
            : "w-full max-w-7xl bg-transparent border border-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" onClick={(e) => e.preventDefault()}>
          <img src="/logo.png" alt="Bluerays Emblem" className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-gold/30 object-cover shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-transform duration-500 group-hover:scale-105" />
          <div className="flex flex-col">
            <span className={`font-['Canela',serif] text-xl md:text-2xl leading-none tracking-wide transition-colors duration-700 ${scrolled ? 'text-[#1A1A1A]' : 'text-white group-hover:text-gold'}`}>Bluerays</span>
            <span className={`font-['Plus_Jakarta_Sans'] text-[8px] md:text-[9px] uppercase tracking-[0.3em] mt-1 transition-colors duration-700 ${scrolled ? 'text-gold' : 'text-gold/80'}`}>Resort & Spa</span>
          </div>
        </a>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: "Rooms", href: "#accommodations" },
            { name: "Dining", href: "#dining" },
            { name: "Amenities", href: "#amenities" },
            { name: "Gallery", href: "#gallery" }
          ].map((item) => (
            <MagneticButton
              key={item.name}
              href={item.href}
              className={`font-['Plus_Jakarta_Sans'] text-[11px] tracking-[0.2em] uppercase transition-colors duration-500 relative group hover:text-gold ${scrolled ? 'text-[#1A1A1A]/70' : 'text-white/80'}`}
            >
              {item.name}
            </MagneticButton>
          ))}
          <a
            href="#contact"
            className="luxury-btn !py-2.5 !px-6 !text-[10px]"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Book Now
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className={`md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 transition-colors duration-700 ${scrolled ? 'text-[#1A1A1A]' : 'text-gold'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <motion.span
            className="w-6 h-px bg-current block"
            animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="w-6 h-px bg-current block"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="w-6 h-px bg-current block"
            animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
          />
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="absolute top-[calc(100%+16px)] left-0 right-0 md:hidden bg-[#FDFBF7]/95 backdrop-blur-3xl rounded-3xl border border-black/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-6 py-8 space-y-6 flex flex-col items-center text-center">
                {[
                  { name: "Rooms", href: "#accommodations" },
                  { name: "Dining", href: "#dining" },
                  { name: "Amenities", href: "#amenities" },
                  { name: "Gallery", href: "#gallery" },
                  { name: "Contact", href: "#contact" }
                ].map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block font-['Canela',serif] text-2xl text-[#1A1A1A]/70 hover:text-gold transition-colors"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => {
                      if (item.href.startsWith("#") && item.href.length > 1) {
                        e.preventDefault();
                        const target = document.querySelector(item.href);
                        if (target) target.scrollIntoView({ behavior: "smooth" });
                      }
                      setMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  className="luxury-btn luxury-btn-gold !w-full !justify-center mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Book Your Stay
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}

// ───────────────────────────────────────────
// SECTION: AMENITIES
// ───────────────────────────────────────────
const AMENITIES = [
  { icon: <Navigation className="w-6 h-6" />, title: "Prime Location", desc: "Just 75 meters away from the beautiful Calangute Beach." },
  { icon: <Wind className="w-6 h-6" />, title: "Air-Conditioned Rooms", desc: "Beat the Goa heat with our premium AC accommodations." },
  { icon: <Waves className="w-6 h-6" />, title: "Swimming Pool", desc: "Take a refreshing dip in our pristine on-site pool." },
  { icon: <Utensils className="w-6 h-6" />, title: "Blue Rays Restaurant", desc: "In-house dining serving authentic Goan and multi-cuisine delicacies." },
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Family Friendly", desc: "A safe, budget-friendly, and welcoming atmosphere for all guests." }
];

function AmenitiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="amenities" className="relative py-16 md:py-24 bg-[#050505] overflow-hidden" ref={containerRef}>
      {/* Heavy Parallax Background */}
      <motion.div 
        className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-20 pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]) }}
      >
        <img src={IMAGES.room} alt="Luxury Background" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505] pointer-events-none" />

      <motion.div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10" style={{ opacity }}>
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            className="inline-flex items-center gap-2 mb-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="w-8 h-px bg-gold/60" />
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-white/60">Exclusive</span>
            <span className="w-8 h-px bg-gold/60" />
          </motion.div>
          <h2 className="section-heading text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center whitespace-nowrap">
            Signature <span className="text-gold">Amenities</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AMENITIES.map((amenity, i) => (
            <motion.div
              key={i}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/[0.06] hover:border-gold/30 transition-all duration-700 group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-gold flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
                {amenity.icon}
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl text-white mb-3 relative z-10 group-hover:text-gold transition-colors duration-500">{amenity.title}</h3>
              <p className="font-['Inter'] text-sm text-white/60 leading-relaxed relative z-10">{amenity.desc}</p>
            </motion.div>
          ))}
          <motion.div
            className="bg-gold/5 backdrop-blur-xl rounded-3xl p-8 border border-gold/20 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-gold/10 transition-colors duration-500 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: AMENITIES.length * 0.1, duration: 0.8 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000" />
            <h3 className="font-['Canela',serif] text-2xl text-gold mb-2 relative z-10">Discover More</h3>
            <p className="font-['Inter'] text-xs text-white/50 relative z-10 mb-6">Connect with our concierge</p>
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.2em] uppercase text-white border-b border-white/30 pb-1 group-hover:border-gold group-hover:text-gold transition-colors relative z-10">Contact Concierge</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ───────────────────────────────────────────
// SECTION: TESTIMONIALS
// ───────────────────────────────────────────
const REVIEWS = [
  { name: "Anil Mishra", role: "Recent Guest", text: "Very nice staff behaviour, swimming pool was amazing, food quality was also very good. Overall very good experience.", rating: 5 },
  { name: "James Fry", role: "Recent Guest", text: "Nice hotel near the beach. Staff were very helpful. Highly recommended for a comfortable stay.", rating: 5 },
  { name: "Type1 Champion", role: "Recent Guest", text: "Rooms are good and reasonable. Nice and polite staff. A budget friendly and peaceful environment.", rating: 5 }
];

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="relative py-16 md:py-24 bg-[#050505] overflow-hidden border-t border-white/5 border-b" ref={containerRef}>
      {/* Parallax Background Image */}
      <motion.div 
        className="absolute inset-0 w-full h-[140%] -top-[20%] opacity-10 pointer-events-none"
        style={{ y }}
      >
        <img src={IMAGES.dining} alt="Luxury Resort Background" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="w-full md:w-1/3">
            <motion.h2 
              className="font-['Canela','Times_New_Roman',serif] text-4xl md:text-5xl text-white mb-4 whitespace-nowrap"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Guest <span className="text-gold italic">Stories</span>
            </motion.h2>
            <motion.p 
              className="font-['Inter'] text-sm text-white/60 mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Don't just take our word for it. Discover what our esteemed guests have to say about their stay at Bluerays Goa.
            </motion.p>
            <div className="flex items-center gap-2 text-gold mb-8">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            
            {/* Carousel Controls */}
            <div className="flex gap-4">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 hover:border-gold transition-colors text-white hover:text-gold"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 hover:border-gold transition-colors text-white hover:text-gold"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 overflow-hidden relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="bg-white/[0.03] backdrop-blur-xl p-10 md:p-16 rounded-3xl w-full border border-white/10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1 text-gold">
                    {[...Array(REVIEWS[activeIndex].rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    <span className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase font-semibold text-white/80">Verified</span>
                  </div>
                </div>
                <p className="font-['Canela',serif] text-2xl md:text-3xl text-white/90 leading-relaxed italic mb-8">
                  "{REVIEWS[activeIndex].text}"
                </p>
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] text-sm tracking-widest uppercase text-white mb-1">{REVIEWS[activeIndex].name}</p>
                  <p className="font-['Inter'] text-xs text-gold/60">{REVIEWS[activeIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// ───────────────────────────────────────────
// SECTION: LOCATION (BENTO GRID)
// ───────────────────────────────────────────
function LocationSection() {
  return (
    <section className="relative py-8 md:py-12 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="section-heading text-[#1A1A1A] text-4xl md:text-5xl lg:text-6xl text-center">
            Prime <span className="text-gold">Goa Location</span>
          </h2>
          <p className="font-['Inter'] text-sm text-[#1A1A1A]/70 mt-4 max-w-xl mx-auto">Perfectly situated in the heart of North Goa, offering you the best of both worlds: serene comfort and vibrant local culture.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          <div className="glass rounded-3xl p-8 md:col-span-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/35868592/pexels-photo-35868592.jpeg?auto=compress&cs=tinysrgb&w=800')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="text-gold w-6 h-6" />
                <h3 className="font-['Canela',serif] text-3xl text-[#1A1A1A]">Calangute Beach</h3>
              </div>
              <p className="font-['Inter'] text-[#1A1A1A]/70">A mere 75 meters walk from your room to the golden sands of the 'Queen of Beaches'.</p>
            </div>
          </div>
          
          <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center text-center">
            <Navigation className="text-gold w-10 h-10 mb-4" />
            <h3 className="font-['Plus_Jakarta_Sans'] text-xl text-[#1A1A1A] mb-2">Easy Access</h3>
            <p className="font-['Inter'] text-xs text-[#1A1A1A]/70">Near Octopus Restaurant, Maddo Waddo. Centrally located to all major attractions.</p>
          </div>

          <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center text-center">
            <Utensils className="text-gold w-10 h-10 mb-4" />
            <h3 className="font-['Plus_Jakarta_Sans'] text-xl text-[#1A1A1A] mb-2">Culinary Delights</h3>
            <p className="font-['Inter'] text-xs text-[#1A1A1A]/70">Surrounded by vibrant cafes, shacks, and our very own Blue Rays Restaurant.</p>
          </div>

          <div className="glass rounded-3xl p-8 md:col-span-2 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/35253360/pexels-photo-35253360.jpeg?auto=compress&cs=tinysrgb&w=800')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-center">
              <h3 className="font-['Canela',serif] text-2xl text-[#1A1A1A] mb-2">Peaceful Enclave</h3>
              <p className="font-['Inter'] text-[#1A1A1A]/70 max-w-sm">Despite being close to the action, the hotel offers a budget-friendly and peaceful environment as loved by our guests.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// SECTION: ACCOMMODATIONS
// ───────────────────────────────────────────
function AccommodationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="accommodations" className="relative py-12 md:py-20 bg-[#F5F2EA] border-t border-black/5 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="w-full md:w-1/2 relative">
            <motion.div className="aspect-[4/5] rounded-3xl overflow-hidden glass p-2 relative" style={{ y }}>
              <img src={IMAGES.room} alt="Bluerays Goa AC Room" className="w-full h-full object-cover rounded-2xl" />
            </motion.div>
            <div className="absolute -bottom-8 -right-8 glass-strong p-6 rounded-2xl max-w-[200px] hidden md:block">
              <div className="flex gap-1 text-gold mb-2"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
              <p className="font-['Inter'] text-xs text-[#1A1A1A]/70">"Rooms are good and reasonable."</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-gold/60" />
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-gold/80">Stay With Us</span>
              </div>
              <h2 className="font-['Canela',serif] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-6 whitespace-nowrap overflow-hidden text-ellipsis">Rooms & <span className="text-gold italic">Suites</span></h2>
              <p className="font-['Inter'] text-base text-[#1A1A1A]/70 leading-relaxed">
                Experience unparalleled comfort in our thoughtfully designed rooms. Whether you're a solo traveler, a couple on honeymoon, or a family, we offer the perfect sanctuary just steps away from Calangute Beach.
              </p>
            </div>
            <ul className="space-y-4">
              {["Air-Conditioned Comfort", "High-Speed Wi-Fi", "Daily Housekeeping", "En-suite Bathrooms", "Room Service Available"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-['Inter'] text-sm text-[#1A1A1A]/70">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold"><Check className="w-3 h-3" /></div>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#contact" className="luxury-btn luxury-btn-gold inline-flex mt-4">
              <span className="relative z-10">Check Availability</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// SECTION: ROOMS & SERVICES GALLERY
// ───────────────────────────────────────────
function RoomsAndServicesGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const localImages = [
    { src: IMAGES.exteriorLocal, title: "Grand Exterior", desc: "Welcome to Bluerays Goa" },
    { src: IMAGES.receptionLocal, title: "Lobby & Reception", desc: "24/7 Premium Concierge" },
    { src: IMAGES.poolLocal, title: "I Love Goa Pool", desc: "Signature swimming pool experience" },
    { src: IMAGES.bedroomLocal, title: "Deluxe Bedroom", desc: "Comfortable and spacious living" },
    { src: IMAGES.bathroomLocal, title: "Modern En-suite", desc: "Pristine, well-appointed bathrooms" },
  ];

  return (
    <section id="gallery" className="relative py-10 md:py-16 bg-[#FDFBF7] overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            className="inline-flex items-center gap-2 mb-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="w-8 h-px bg-gold/60" />
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A]/70">Exclusive Preview</span>
            <span className="w-8 h-px bg-gold/60" />
          </motion.div>
          <h2 className="section-heading text-[#1A1A1A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center whitespace-nowrap">
            Photo <span className="text-gold italic">Gallery</span>
          </h2>
          <p className="font-['Inter'] text-[#1A1A1A]/70 text-base max-w-xl mx-auto mt-4">
            Take a visual tour of our property. From the welcoming reception to our pristine pool and comfortable rooms, every detail is designed for your ultimate relaxation.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {localImages.map((img, i) => (
            <motion.div 
              key={i}
              className="rounded-3xl overflow-hidden relative group cursor-pointer break-inside-avoid"
              onClick={() => setSelectedImage(img.src)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <img src={img.src} alt={img.title} className="w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white border border-white/50 rounded-full px-4 py-2 font-['Plus_Jakarta_Sans'] text-xs tracking-widest uppercase bg-black/30 backdrop-blur-sm">View</span>
              </div>
              <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-gold mb-1 block">{img.desc}</span>
                <h3 className="font-['Canela',serif] text-2xl text-white">{img.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 rounded-full p-2 transition-colors" onClick={() => setSelectedImage(null)}>
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <motion.img 
              src={selectedImage}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ───────────────────────────────────────────
// SECTION: INQUIRY & CONTACT FORM
// ───────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", arrivalDate: "", arrivalTime: "", durationOfStay: "", guests: "2", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const WHATSAPP_NUMBER = "919064022151"; // Real Bluerays number

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    const waMessage = `Hello Bluerays Goa! I am interested in booking a room.%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Arrival Date:* ${formData.arrivalDate}%0A*Arrival Time:* ${formData.arrivalTime}%0A*Duration of Stay:* ${formData.durationOfStay} nights%0A*Guests:* ${formData.guests}%0A*Message:* ${formData.message}`;
    
    // EmailJS logic (using placeholders)
    emailjs.send(
      "YOUR_SERVICE_ID", // Replace with EmailJS Service ID
      "YOUR_TEMPLATE_ID", // Replace with EmailJS Template ID
      formData,
      "YOUR_PUBLIC_KEY" // Replace with EmailJS Public Key
    ).then(() => {
      setStatus("success");
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`, "_blank");
      setFormData({ name: "", email: "", phone: "", arrivalDate: "", arrivalTime: "", durationOfStay: "", guests: "2", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }).catch((err) => {
      console.error(err);
      // Even if email fails, fallback to WhatsApp so user can contact
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`, "_blank");
      setStatus("success"); 
      setTimeout(() => setStatus("idle"), 5000);
    });
  };

  return (
    <section id="contact" className="relative py-10 md:py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-gold/60" />
              <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A]/70">Inquire Now</span>
            </div>
            <h2 className="section-heading text-[#1A1A1A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 whitespace-nowrap">
              Reserve <span className="text-gold">Your Room</span>
            </h2>
            <p className="font-['Inter'] text-[#1A1A1A]/70 text-base leading-relaxed mb-12 max-w-md">
              Reach out to our dedicated concierge team to secure your stay, plan a bespoke itinerary, or organize a special event at Bluerays Goa.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold"><MapPin className="w-5 h-5" /></div>
                <div><p className="font-['Plus_Jakarta_Sans'] text-sm text-[#1A1A1A]">Location</p><p className="font-['Inter'] text-xs text-[#1A1A1A]/70">Near Octopus Restaurant, Maddo Waddo, Calangute, Goa 403516</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold"><Phone className="w-5 h-5" /></div>
                <div><p className="font-['Plus_Jakarta_Sans'] text-sm text-[#1A1A1A]">Phone / WhatsApp</p><p className="font-['Inter'] text-xs text-[#1A1A1A]/70">+91 90640 22151</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold"><Mail className="w-5 h-5" /></div>
                <div><p className="font-['Plus_Jakarta_Sans'] text-sm text-[#1A1A1A]">Email</p><p className="font-['Inter'] text-xs text-[#1A1A1A]/70">reservations@blueraysgoa.com</p></div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="glass p-8 md:p-10 rounded-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {status === "success" ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-gold" />
                <h3 className="font-['Canela',serif] text-3xl text-[#1A1A1A]">Inquiry Sent</h3>
                <p className="font-['Inter'] text-sm text-[#1A1A1A]/70 max-w-xs">We've redirected you to WhatsApp. Our team will review your request and confirm your booking details shortly.</p>
                <button onClick={() => setStatus("idle")} className="mt-8 font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-widest text-gold border-b border-gold pb-1">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-[#1A1A1A]/70">Full Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-black/20 pb-2 text-[#1A1A1A] font-['Inter'] text-sm focus:outline-none focus:border-gold transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-[#1A1A1A]/70">Phone Number</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-black/20 pb-2 text-[#1A1A1A] font-['Inter'] text-sm focus:outline-none focus:border-gold transition-colors" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-[#1A1A1A]/70">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-black/20 pb-2 text-[#1A1A1A] font-['Inter'] text-sm focus:outline-none focus:border-gold transition-colors" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-[#1A1A1A]/70">Arrival Date</label>
                    <input required type="date" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} className="w-full bg-transparent border-b border-black/20 pb-2 text-[#1A1A1A] font-['Inter'] text-sm focus:outline-none focus:border-gold transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-[#1A1A1A]/70">Arrival Time</label>
                    <input required type="time" name="arrivalTime" value={formData.arrivalTime} onChange={handleChange} className="w-full bg-transparent border-b border-black/20 pb-2 text-[#1A1A1A] font-['Inter'] text-sm focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-[#1A1A1A]/70">Stay (Nights)</label>
                    <input required type="number" min="1" name="durationOfStay" value={formData.durationOfStay} onChange={handleChange} className="w-full bg-transparent border-b border-black/20 pb-2 text-[#1A1A1A] font-['Inter'] text-sm focus:outline-none focus:border-gold transition-colors" placeholder="e.g. 3" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-[#1A1A1A]/70">Guests</label>
                    <select name="guests" value={formData.guests} onChange={handleChange} className="w-full bg-transparent border-b border-black/20 pb-2 text-[#1A1A1A] font-['Inter'] text-sm focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
                      <option value="1" className="bg-[#FDFBF7]">1 Guest</option>
                      <option value="2" className="bg-[#FDFBF7]">2 Guests</option>
                      <option value="3" className="bg-[#FDFBF7]">3 Guests</option>
                      <option value="4" className="bg-[#FDFBF7]">4+ Guests</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-[#1A1A1A]/70">Special Requests</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} className="w-full bg-transparent border-b border-black/20 pb-2 text-[#1A1A1A] font-['Inter'] text-sm focus:outline-none focus:border-gold transition-colors resize-none h-20" placeholder="Any preferences for your stay?" />
                </div>
                <button type="submit" disabled={status === "sending"} className="luxury-btn luxury-btn-gold w-full mt-4 flex items-center justify-center gap-3 !py-4 disabled:opacity-50">
                  <span className="relative z-10">{status === "sending" ? "Processing..." : "Submit Inquiry via WhatsApp"}</span>
                  {!status && <Send className="w-4 h-4 relative z-10" />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// SECTION: DINING
// ───────────────────────────────────────────
function DiningSection() {
  return (
    <section id="dining" className="relative py-8 md:py-12 bg-[#FDFBF7] overflow-hidden border-t border-black/5">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF7] via-[#C5A059]/5 to-[#FDFBF7] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <div className="relative pt-20 pb-32">
          {/* Large Background Image */}
          <motion.div 
            className="w-full md:w-3/4 h-[500px] md:h-[700px] ml-auto rounded-3xl overflow-hidden relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={IMAGES.diningAlt} alt="Blue Rays Restaurant Fine Dining" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-transparent to-transparent opacity-90 md:opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent opacity-80" />
          </motion.div>

          {/* Overlapping Text Content */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full md:w-1/2 z-20">
            <motion.div
              className="bg-[#FDFBF7]/80 backdrop-blur-3xl border border-black/5 p-8 md:p-12 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.08)]"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-gold/60" />
                <span className="font-['Plus_Jakarta_Sans'] text-xs tracking-[0.25em] uppercase text-gold">Culinary</span>
              </div>
              <h2 className="font-['Canela',serif] text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] mb-6 leading-none whitespace-nowrap overflow-hidden text-ellipsis">
                Blue Rays <span className="text-[#1A1A1A]/70 italic">Restaurant</span>
              </h2>
              <p className="font-['Inter'] text-[#1A1A1A]/70 text-base md:text-lg leading-relaxed mb-8">
                Indulge in a spectacular culinary journey. Our in-house restaurant offers a sophisticated blend of authentic Goan coastal flavors and exquisite international cuisine, prepared with the freshest local ingredients.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/5">
                    <Utensils className="w-4 h-4 text-gold" />
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs tracking-widest uppercase text-[#1A1A1A]/90">Fine Dining</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/5">
                    <Coffee className="w-4 h-4 text-gold" />
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs tracking-widest uppercase text-[#1A1A1A]/90">Breakfast Buffet</span>
                </div>
              </div>
              <button className="luxury-btn group overflow-hidden bg-white/5 border border-black/10 px-8 py-4 rounded-full relative">
                <span className="relative z-10 font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-[0.2em] text-[#1A1A1A] group-hover:text-gold transition-colors duration-500">View Menu</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
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
    <section className="relative py-12 md:py-20 bg-[#F5F2EA] border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-12 h-px bg-gold/60" />
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A]/70">Explore</span>
            <span className="w-12 h-px bg-gold/60" />
          </div>
          <h2 className="section-heading text-[#1A1A1A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center whitespace-nowrap">
            Explore <span className="text-gold">Goa</span>
          </h2>
          <p className="font-['Inter'] text-sm text-[#1A1A1A]/70 mt-4 max-w-xl mx-auto">Perfectly situated near Calangute Beach, Bluerays Goa gives you immediate access to the best attractions, beaches, and nightlife in Goa.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          {ATTRACTIONS.map((attr, i) => {
            // Asymmetrical sizing logic
            let gridClass = "";
            if (i === 0) gridClass = "md:col-span-2 md:row-span-2 h-[400px] md:h-full";
            else if (i === 1) gridClass = "md:col-span-2 md:row-span-1 h-[300px] md:h-full";
            else gridClass = "md:col-span-1 md:row-span-1 h-[300px] md:h-full";

            return (
              <motion.div 
                key={i}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer ${gridClass}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={attr.image} alt={attr.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 transition-opacity duration-700" />
                
                {/* Advanced Frost Glass Overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[#FDFBF7]/20 backdrop-blur-md transition-all duration-700 z-10" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <span className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-[0.2em] text-gold mb-3 block transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-80">{attr.type}</span>
                  <h3 className="font-['Canela',serif] text-3xl md:text-4xl text-[#1A1A1A] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{attr.name}</h3>
                  <div className="flex items-center gap-2 text-[#1A1A1A]/70 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 opacity-0 group-hover:opacity-100">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="font-['Inter'] text-sm tracking-wide">{attr.distance} away</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────


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
    <section className="relative py-8 md:py-12 bg-[#FDFBF7] border-t border-black/5">
      <div className="max-w-4xl mx-auto px-6 md:px-16">
        <h2 className="section-heading text-[#1A1A1A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8 md:mb-12 whitespace-nowrap overflow-hidden text-ellipsis">
          Frequently <span className="text-gold">Asked Questions</span>
        </h2>
        
        <div className="space-y-0">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-black/10 group">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-8 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-8">
                  <span className="font-['Plus_Jakarta_Sans'] text-sm tracking-widest text-gold/50">0{i + 1}</span>
                  <span className="font-['Canela',serif] text-2xl md:text-3xl text-[#1A1A1A] group-hover:text-gold transition-colors duration-500">{faq.q}</span>
                </div>
                <ChevronDown className={`w-6 h-6 text-[#1A1A1A]/70 group-hover:text-gold transition-all duration-500 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-[3.25rem] pb-8 pr-12 font-['Inter'] text-[#1A1A1A]/70 text-base md:text-lg leading-relaxed">
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

// ───────────────────────────────────────────
// SECTION: SEO CONTENT BLOCK
// ───────────────────────────────────────────
function SEOContentBlock() {
  return (
    <section className="relative py-10 md:py-16 bg-[#FDFBF7] border-t border-black/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-[#1A1A1A] font-['Canela',serif] text-2xl mb-4">The Best Hotel in Goa for Your Coastal Escape</h2>
        <p className="font-['Inter'] text-xs text-[#1A1A1A]/70 leading-relaxed">
          When looking for the <strong>best hotel in Goa</strong>, Bluerays Goa stands out as the ultimate luxury destination. 
          Situated perfectly as a premium <strong>hotel near Calangute beach</strong>, our guests enjoy unparalleled access to the sun and sand. 
          Whether you want to <strong>book a room in Goa</strong> for a romantic getaway or a family vacation, our 
          <strong> luxury resort in Goa</strong> offers premium air-conditioned accommodations, a stunning swimming pool, and an exquisite 
          in-house dining experience. Discover why so many travelers choose us when searching for a top-tier <strong>Goa hotel booking</strong>.
        </p>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// MAIN APP
// ───────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      setShowBookingModal(true);
    }, 2500);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, [loading]);

  // Prevent body scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div ref={appRef} className="relative min-h-screen bg-[#FDFBF7]">
        {/* Global Effects */}
        <div className="noise-overlay" />
        <FloatingParticles />
        <AuroraBackground />
        <ScrollProgress />

        {/* Navigation */}
        <NavigationBar />

        {/* Section 1: Cinematic Hero */}
        <CinematicHero />

        {/* Divider */}
        <SectionDivider />

        {/* Section 2: Experience Showcase */}
        <ExperienceShowcase />

        {/* Section 3: Amenities */}
        <AmenitiesSection />

        {/* Section 4: Location */}
        <LocationSection />

        {/* Section 5: Accommodations */}
        <AccommodationSection />

        {/* Section 5.1: Rooms & Services Gallery */}
        <RoomsAndServicesGallery />

        {/* Divider */}
        <SectionDivider />

                {/* Section 6.1: Dining */}
        <DiningSection />
        
        {/* Section 6.2: Attractions */}
        <AttractionsSection />
        
        {/* Section 6: Testimonials */}
        <TestimonialsSection />

        {/* Section 7: Inquiry & Contact */}
        <ContactSection />
        {/* Section 6.4: FAQ */}
        <FAQSection />

        {/* Section 8: SEO Block */}
        <SEOContentBlock />

        {/* Section 9: CTA */}
        <CTASection />

        {/* Footer */}
        <footer className="relative bg-[#0A192F] border-t border-black/5 py-8">
          <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold/60 to-gold/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#0A192F]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.2em] uppercase text-white/40">
                  BLUERAYS GOA
                </span>
              </div>
              <div className="flex items-center gap-6">
                {["Instagram", "Facebook", "Twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="font-['Inter'] text-[11px] text-white/40 hover:text-gold transition-colors duration-300"
                    onClick={(e) => e.preventDefault()}
                  >
                    {social}
                  </a>
                ))}
              </div>
              <p className="font-['Inter'] text-[10px] text-white/30">
                &copy; 2024 BLUERAYS GOA. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Initial Booking Modal */}
      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </>
  );
}

// ─── Custom Cursor ───
function CustomCursor() {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".glass") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        className={`custom-cursor-dot hidden md:block ${isHovering ? "hover" : ""}`}
        style={{ left: position.x, top: position.y }}
      />
      <div
        className={`custom-cursor hidden md:block ${isHovering ? "hover" : ""}`}
        style={{ left: position.x, top: position.y }}
      />
    </>
  );
}
