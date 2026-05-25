"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1C1C1C]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-center">
        <motion.p
          ref={textRef}
          className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.3em] uppercase text-white/40 mb-8"
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
          className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.2em] text-white/20 mt-4"
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
    <div className="relative h-32 md:h-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1C1C1C]/80 to-[#1C1C1C]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C]/30 via-transparent to-[#1C1C1C]/80 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/50 via-transparent to-[#1C1C1C]/30 z-[2]" />
        <motion.img
          src={IMAGES.heroAlt}
          alt="BLUERAYS GOA Luxury Resort"
          className="w-full h-full object-cover"
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
        <motion.div
          className="inline-flex items-center gap-2 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-8 h-px bg-gold/60" />
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/60">
            BLUERAYS GOA
          </span>
          <span className="w-8 h-px bg-gold/60" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="hero-display text-white leading-[0.85] tracking-tight"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } }
          }}
        >
          {["ESCAPE", "TO SOMETHING", "EXTRAORDINARY."].map((line, i) => (
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
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-['Inter'] text-sm md:text-base lg:text-lg text-white/50 max-w-xl mt-6 md:mt-8 leading-relaxed font-light"
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
                <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-white/90">Beachside</p>
                <p className="font-['Inter'] text-[10px] text-white/40">Location</p>
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
                <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-white/90">Luxury</p>
                <p className="font-['Inter'] text-[10px] text-white/40">Accommodation</p>
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
                <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-white/90">Restaurant</p>
                <p className="font-['Inter'] text-[10px] text-white/40">& Dining</p>
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
                <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-white/90">Premium</p>
                <p className="font-['Inter'] text-[10px] text-white/40">Hospitality</p>
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
        <span className="font-['Plus_Jakarta_Sans'] text-[8px] tracking-[0.3em] uppercase text-white/30">
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
      className="relative bg-[#1C1C1C]"
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
            <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-white/40">
              The Experience
            </span>
          </motion.div>
          <h2 className="section-heading text-white text-4xl md:text-5xl lg:text-6xl">
            Curated
            <span className="text-gold block">Moments</span>
          </h2>
        </div>

        {/* Slide counter */}
        <div className="absolute top-8 right-6 md:right-16 lg:right-24 z-20 text-right">
          <span className="font-['Plus_Jakarta_Sans'] text-4xl md:text-6xl font-light text-white/10">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <span className="font-['Plus_Jakarta_Sans'] text-sm text-white/20 block">
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
    <div className="fullscreen-panel relative flex items-center">
      {/* Background Image with Parallax */}
      <motion.div
        ref={imageRef}
        className="absolute inset-0"
        style={{
          scale: 1 + progress * 0.05,
          filter: `blur(${(1 - progress) * 4}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/80 via-[#1C1C1C]/40 to-transparent z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent z-[2]" />
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          style={{ x: mousePos.x * (index % 2 === 0 ? 1 : -1), y: mousePos.y * 0.5 }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 max-w-2xl">
        {/* Label */}
        <motion.div
          className="inline-flex items-center gap-2 mb-4"
          initial={{ opacity: 0, x: -30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-8 h-px bg-gold/60" />
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-gold/80">
            {title}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-['Canela','Times_New_Roman',serif] text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-[0.9]"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="font-['Inter'] text-sm md:text-base text-white/50 mt-6 leading-relaxed font-light max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {description}
        </motion.p>

        {/* Explore Link */}
        <motion.a
          href="#"
          className="inline-flex items-center gap-2 mt-8 font-['Plus_Jakarta_Sans'] text-xs tracking-[0.2em] uppercase text-white/60 hover:text-gold transition-colors duration-500 group"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.preventDefault()}
        >
          Discover More
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </motion.a>
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/60 to-[#1C1C1C]/30 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/40 via-transparent to-[#1C1C1C]/40 z-[2]" />
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
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-white/40">
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
          className="font-['Inter'] text-sm md:text-base lg:text-lg text-white/50 max-w-xl mt-6 md:mt-8 leading-relaxed font-light"
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
              <p className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] uppercase text-white/30">
                BLUERAYS GOA
              </p>
              <p className="font-['Inter'] text-[11px] text-white/20 mt-1">
                Calangute Beach, Goa
              </p>
            </div>
            <div className="text-right">
              <p className="font-['Inter'] text-[11px] text-white/20">
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
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-[#1C1C1C]/80 backdrop-blur-2xl border-b border-white/5" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3" onClick={(e) => e.preventDefault()}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/80 to-gold/40 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#1C1C1C]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <span className="font-['Plus_Jakarta_Sans'] text-sm tracking-[0.15em] uppercase text-white/80">
              Bluerays
            </span>
          </a>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {["Suite", "Dining", "Wellness", "Gallery"].map((item) => (
              <MagneticButton
                key={item}
                href="#"
                className="font-['Plus_Jakarta_Sans'] text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white/80 transition-all duration-500 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold/60 group-hover:w-full transition-all duration-500" />
              </MagneticButton>
            ))}
            <a
              href="#booking"
              className="luxury-btn !py-3 !px-6 !text-[10px]"
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
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <motion.span
              className="w-6 h-px bg-white/60 block"
              animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="w-6 h-px bg-white/60 block"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="w-6 h-px bg-white/60 block"
              animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-[#1C1C1C]/95 backdrop-blur-2xl border-t border-white/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 py-8 space-y-6">
              {["Suite", "Dining", "Wellness", "Gallery", "Contact"].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  className="block font-['Plus_Jakarta_Sans'] text-lg text-white/60 hover:text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
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
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div ref={appRef} className="relative min-h-screen bg-[#1C1C1C]">
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

        {/* Divider */}
        <SectionDivider />

        {/* Section 3: CTA */}
        <CTASection />

        {/* Footer */}
        <footer className="relative bg-[#1C1C1C] border-t border-white/5 py-8">
          <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold/60 to-gold/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#1C1C1C]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.2em] uppercase text-white/30">
                  BLUERAYS GOA
                </span>
              </div>
              <div className="flex items-center gap-6">
                {["Instagram", "Facebook", "Twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="font-['Inter'] text-[11px] text-white/20 hover:text-gold/60 transition-colors duration-300"
                    onClick={(e) => e.preventDefault()}
                  >
                    {social}
                  </a>
                ))}
              </div>
              <p className="font-['Inter'] text-[10px] text-white/15">
                &copy; 2024 BLUERAYS GOA. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom Cursor */}
      <CustomCursor />
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
