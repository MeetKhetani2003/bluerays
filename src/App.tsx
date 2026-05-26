"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Helmet, HelmetProvider } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import { Star, Wifi, Coffee, Waves, Car, Sparkles, Send, CheckCircle2, MapPin, Phone, Mail, Navigation, BedDouble, Wind, Utensils, ShieldCheck, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

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
};

// ─── Experience Data ───
const EXPERIENCES: Omit<SlideProps, "index" | "progress">[] = [
  {
    title: "Luxury",
    subtitle: "Rooms & Suites",
    description: "Coastal elegance meets contemporary design. Each suite opens to panoramic ocean views, curated with hand-selected furnishings and private sanctuaries of unparalleled comfort.",
    image: IMAGES.room,
  },
  {
    title: "Fine",
    subtitle: "Dining Experience",
    description: "A culinary journey through coastal flavors. Our chef crafts exquisite menus featuring the freshest local seafood, international specialties, and hand-picked wine pairings.",
    image: IMAGES.dining,
  },
  {
    title: "Infinity",
    subtitle: "Pool & Wellness",
    description: "Float between sky and sea at our cliff-edge infinity pool. Surrender to wellness rituals inspired by ancient Goan healing traditions and modern spa therapies.",
    image: IMAGES.pool,
  },
  {
    title: "Goa",
    subtitle: "Lifestyle & Culture",
    description: "Immerse yourself in vibrant Goan culture — from golden beach sunsets and private yacht excursions to curated art walks and traditional music under the stars.",
    image: IMAGES.beach,
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
      onClick={(e) => e.preventDefault()}
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative h-[100vh] overflow-hidden"
    >
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
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
        style={{ scale, opacity }}
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
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A]/70">
            Begin Your Journey
          </span>
          <span className="w-8 h-px bg-gold/60" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="hero-display text-[#1A1A1A] leading-[0.85]"
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
          className="font-['Inter'] text-sm md:text-base lg:text-lg text-[#1A1A1A]/70 max-w-xl mt-6 md:mt-8 leading-relaxed font-light"
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
            href="#"
          >
            <span className="relative z-10 text-sm">Book Your Experience</span>
            <svg className="relative z-10 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </MagneticButton>

          <MagneticButton className="luxury-btn group !px-10 !py-5" href="#">
            <span className="relative z-10 text-sm">Contact Concierge</span>
          </MagneticButton>
        </motion.div>

        {/* Footer details */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-end gap-4">
            <div className="text-left">
              <p className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A]/30">
                BLUERAYS GOA
              </p>
              <p className="font-['Inter'] text-[11px] text-[#1A1A1A]/20 mt-1">
                Calangute Beach, Goa
              </p>
            </div>
            <div className="text-right">
              <p className="font-['Inter'] text-[11px] text-[#1A1A1A]/20">
                Luxury Hospitality &mdash; Since 2024
              </p>
            </div>
          </div>
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
          {["Suite", "Dining", "Wellness", "Gallery"].map((item) => (
            <MagneticButton
              key={item}
              href="#"
              className={`font-['Plus_Jakarta_Sans'] text-[11px] tracking-[0.2em] uppercase transition-colors duration-500 relative group hover:text-gold ${scrolled ? 'text-[#1A1A1A]/70' : 'text-white/80'}`}
            >
              {item}
            </MagneticButton>
          ))}
          <a
            href="#booking"
            className="luxury-btn !py-2.5 !px-6 !text-[10px]"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
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
                {["Suite", "Dining", "Wellness", "Gallery", "Contact"].map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="block font-['Canela',serif] text-2xl text-[#1A1A1A]/70 hover:text-gold transition-colors"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                    }}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.a
                  href="#booking"
                  className="luxury-btn luxury-btn-gold !w-full !justify-center mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
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
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="amenities" className="relative py-16 bg-[#FDFBF7] overflow-hidden" ref={containerRef}>
      <motion.div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24" style={{ y, opacity }}>
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 mb-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="w-8 h-px bg-gold/60" />
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A]/70">Exclusive</span>
            <span className="w-8 h-px bg-gold/60" />
          </motion.div>
          <h2 className="section-heading text-[#1A1A1A] text-4xl md:text-5xl lg:text-6xl text-center">
            Signature <span className="text-gold block">Resort Amenities</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AMENITIES.map((amenity, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-8 hover:bg-white/5 transition-colors duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {amenity.icon}
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl text-[#1A1A1A] mb-3">{amenity.title}</h3>
              <p className="font-['Inter'] text-sm text-[#1A1A1A]/70 leading-relaxed">{amenity.desc}</p>
            </motion.div>
          ))}
          <motion.div
            className="glass rounded-2xl p-8 border border-gold/20 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-gold/5 transition-colors duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: AMENITIES.length * 0.1, duration: 0.8 }}
          >
            <h3 className="font-['Plus_Jakarta_Sans'] text-xl text-gold mb-2">And Much More</h3>
            <p className="font-['Inter'] text-sm text-[#1A1A1A]/70 mb-6">Discover the full Bluerays experience.</p>
            <a href="#contact" className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A] border-b border-white/30 pb-1 group-hover:border-white transition-colors">Contact Concierge</a>
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

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section className="relative py-12 bg-[#FDFBF7] overflow-hidden border-t border-black/5 border-b">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-ocean/5 opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/3">
            <motion.h2 
              className="font-['Canela','Times_New_Roman',serif] text-4xl md:text-5xl text-[#1A1A1A] mb-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Guest <span className="text-gold italic">Stories</span>
            </motion.h2>
            <motion.p 
              className="font-['Inter'] text-sm text-[#1A1A1A]/70 mb-8"
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
                className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-white/5 hover:border-gold transition-colors text-[#1A1A1A] hover:text-gold"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-white/5 hover:border-gold transition-colors text-[#1A1A1A] hover:text-gold"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 overflow-hidden relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="glass p-10 md:p-16 rounded-3xl w-full border border-black/10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex gap-1 text-gold mb-6">
                  {[...Array(REVIEWS[activeIndex].rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="font-['Canela',serif] text-2xl md:text-3xl text-[#1A1A1A]/90 leading-relaxed italic mb-8">
                  "{REVIEWS[activeIndex].text}"
                </p>
                <div>
                  <p className="font-['Plus_Jakarta_Sans'] text-sm tracking-widest uppercase text-[#1A1A1A] mb-1">{REVIEWS[activeIndex].name}</p>
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
    <section className="relative py-12 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="text-center mb-16">
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
  return (
    <section className="relative py-12 bg-[#FDFBF7] border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden glass p-2">
              <img src={IMAGES.room} alt="Bluerays Goa AC Room" className="w-full h-full object-cover rounded-2xl" />
            </div>
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
              <h2 className="font-['Canela',serif] text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-6">Standard & Deluxe <span className="text-gold italic">AC Rooms</span></h2>
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
// SECTION: INQUIRY & CONTACT FORM
// ───────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", dates: "", guests: "2", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const WHATSAPP_NUMBER = "919064022151"; // Real Bluerays number

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    const waMessage = `Hello Bluerays Goa! I am interested in booking a room.%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Dates:* ${formData.dates}%0A*Guests:* ${formData.guests}%0A*Message:* ${formData.message}`;
    
    // EmailJS logic (using placeholders)
    emailjs.send(
      "YOUR_SERVICE_ID", // Replace with EmailJS Service ID
      "YOUR_TEMPLATE_ID", // Replace with EmailJS Template ID
      formData,
      "YOUR_PUBLIC_KEY" // Replace with EmailJS Public Key
    ).then(() => {
      setStatus("success");
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`, "_blank");
      setFormData({ name: "", email: "", phone: "", dates: "", guests: "2", message: "" });
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
    <section id="contact" className="relative py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
            <h2 className="section-heading text-[#1A1A1A] text-4xl md:text-5xl lg:text-6xl mb-6">
              Reserve Your <span className="text-gold block">Goa Hotel Room</span>
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
                <div className="space-y-2">
                  <label className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-[#1A1A1A]/70">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-black/20 pb-2 text-[#1A1A1A] font-['Inter'] text-sm focus:outline-none focus:border-gold transition-colors" placeholder="john@example.com" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-widest text-[#1A1A1A]/70">Preferred Dates</label>
                    <input type="text" name="dates" value={formData.dates} onChange={handleChange} className="w-full bg-transparent border-b border-black/20 pb-2 text-[#1A1A1A] font-['Inter'] text-sm focus:outline-none focus:border-gold transition-colors" placeholder="Oct 10 - Oct 15" />
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
    <section className="relative py-12 bg-[#FDFBF7] overflow-hidden border-t border-black/5">
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
              <h2 className="font-['Canela',serif] text-5xl md:text-7xl text-[#1A1A1A] mb-6 leading-none">
                Blue Rays <br/><span className="text-[#1A1A1A]/70 italic">Restaurant</span>
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
    <section className="relative py-12 bg-[#FDFBF7] border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <span className="w-12 h-px bg-gold/60" />
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-[#1A1A1A]/70">Explore</span>
            <span className="w-12 h-px bg-gold/60" />
          </div>
          <h2 className="section-heading text-[#1A1A1A] text-4xl md:text-5xl lg:text-6xl text-center">
            Discover <span className="text-gold">North Goa</span>
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
// SECTION: GALLERY
// ───────────────────────────────────────────
function GallerySection() {
  return (
    <section className="relative py-12 bg-[#FDFBF7] border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="section-heading text-[#1A1A1A] text-4xl md:text-5xl lg:text-6xl">
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
    <section className="relative py-12 bg-[#FDFBF7] border-t border-black/5">
      <div className="max-w-4xl mx-auto px-6 md:px-16">
        <h2 className="section-heading text-[#1A1A1A] text-4xl md:text-5xl lg:text-6xl text-center mb-16">
          Frequently <span className="text-gold block">Asked Questions</span>
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
    <section className="relative py-16 bg-[#FDFBF7] border-t border-black/5">
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
  const appRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (loading) return;

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
    <HelmetProvider>
      <Helmet>
        <title>Bluerays Goa - Luxury Beachside Hospitality | Get a Room in Goa</title>
        <meta name="description" content="Looking to get a room in Goa? Experience luxury stays, curated dining, and breathtaking coastal views at BLUERAYS GOA." />
      </Helmet>
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

        {/* Section 6: Testimonials */}
        <TestimonialsSection />

        {/* Section 7: Inquiry & Contact */}
        <ContactSection />

        {/* Divider */}
        <SectionDivider />

                {/* Section 6.1: Dining */}
        <DiningSection />
        
        {/* Section 6.2: Attractions */}
        <AttractionsSection />
        
        {/* Section 6.3: Gallery */}
        <GallerySection />
        
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
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.2em] uppercase text-[#1A1A1A]/30">
                  BLUERAYS GOA
                </span>
              </div>
              <div className="flex items-center gap-6">
                {["Instagram", "Facebook", "Twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="font-['Inter'] text-[11px] text-[#1A1A1A]/20 hover:text-gold/60 transition-colors duration-300"
                    onClick={(e) => e.preventDefault()}
                  >
                    {social}
                  </a>
                ))}
              </div>
              <p className="font-['Inter'] text-[10px] text-[#1A1A1A]/15">
                &copy; 2024 BLUERAYS GOA. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom Cursor */}
      <CustomCursor />
    </HelmetProvider>
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
