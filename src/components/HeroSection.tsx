import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hero images folder: src/assets/hero/
// Using the images you uploaded (FB_IMG..., images (...).jpeg) plus placeholders.
import hero01 from "@/assets/hero/hero-01.jpg";
import hero02 from "@/assets/hero/hero-02.jpg";
import hero03 from "@/assets/hero/hero-03.jpg";

import fb1 from "@/assets/hero/FB_IMG_1775288989078.jpg";
import fb2 from "@/assets/hero/FB_IMG_1775289003500.jpg";
import fb3 from "@/assets/hero/FB_IMG_1775289171785.jpg";
import fb4 from "@/assets/hero/FB_IMG_1775307378065.jpg";
import fb5 from "@/assets/hero/FB_IMG_1775307444395.jpg";
import fb6 from "@/assets/hero/FB_IMG_1775307619504.jpg";
import fb7 from "@/assets/hero/FB_IMG_1775307628842.jpg";
import fb8 from "@/assets/hero/FB_IMG_1775307674745.jpg";
import fb9 from "@/assets/hero/FB_IMG_1775307732026.jpg";

import img14 from "@/assets/hero/images (14).jpeg";
import img16 from "@/assets/hero/images (16).jpeg";
import img19 from "@/assets/hero/images (19).jpeg";
import img24 from "@/assets/hero/images (24).jpeg";
import img6 from "@/assets/hero/images (6).jpeg";
import img8 from "@/assets/hero/images (8).jpeg";

const heroImageMotion = {
  initial: { opacity: 0, scale: 1.02 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.01 },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

const heroTextMotion = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

const HeroSection = () => {
  const images = useMemo(
    () => [
      // Your dedicated hero slots
      hero01,
      hero02,
      hero03,

      // Uploaded images
      fb1,
      fb2,
      fb3,
      fb4,
      fb5,
      fb6,
      fb7,
      fb8,
      fb9,

      img14,
      img16,
      img19,
      img24,
      img6,
      img8,
    ],
    []
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={images[idx]}
            alt="Khwalo Group"
            className="w-full h-full object-cover"
            initial={heroImageMotion.initial}
            animate={heroImageMotion.animate}
            exit={heroImageMotion.exit}
            transition={heroImageMotion.transition}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.div
          initial={heroTextMotion.initial}
          animate={heroTextMotion.animate}
          transition={heroTextMotion.transition}
        >
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-4 font-body font-light">
            Dignity · Professionalism · Humility
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="text-gradient-gold">Khwalo</span>{" "}
            <span className="text-foreground">Group</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 font-body font-light">
            Funeral Services & Financial Advice
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 font-body text-sm">
            Our pledge to stand with you in the time of need is certain. Serving the Eastern Cape with prestige and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#plans"
              className="bg-gradient-maroon px-8 py-4 rounded-md text-primary-foreground font-medium hover:opacity-90 transition shadow-maroon"
            >
              View Burial Plans
            </a>
            <a
              href="#apply"
              className="border border-gold px-8 py-4 rounded-md text-gold font-medium hover:bg-gold/10 transition"
            >
              Apply Online
            </a>
          </div>

          <div className="flex justify-center gap-2 mt-8 flex-wrap">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Hero image ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === idx ? "bg-gold" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
