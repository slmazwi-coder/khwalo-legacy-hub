import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import fleetHero from "@/assets/fleet-hero.jpg";
import aerialPhoto from "@/assets/aerial-photo.jpg";
import decoShowcase from "@/assets/deco-showcase.jpg";
import tentSetup from "@/assets/tent-setup.jpg";
import tentExterior from "@/assets/tent-exterior.jpg";
import servicePhoto from "@/assets/service-photo.jpg";

type Tab = {
  id: string;
  label: string;
  images: string[];
};

const sliderMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.35, ease: "easeOut" },
} as const;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

const FleetSection = () => {
  const [active, setActive] = useState("vehicles");

  const fleetImgs = useMemo(
    () =>
      Object.values(import.meta.glob("@/assets/services/fleet/*.{jpg,jpeg,png,webp}", { eager: true }))
        .map((m: any) => m.default as string)
        .filter(Boolean),
    []
  );

  const decorImgs = useMemo(
    () =>
      Object.values(import.meta.glob("@/assets/services/decorations/*.{jpg,jpeg,png,webp}", { eager: true }))
        .map((m: any) => m.default as string)
        .filter(Boolean),
    []
  );

  const aerialImgs = useMemo(
    () =>
      Object.values(import.meta.glob("@/assets/services/aerial/*.{jpg,jpeg,png,webp}", { eager: true }))
        .map((m: any) => m.default as string)
        .filter(Boolean),
    []
  );

  const tabs: Tab[] = useMemo(
    () => [
      {
        id: "vehicles",
        label: "Fleet",
        images: [fleetHero, servicePhoto, ...fleetImgs],
      },
      {
        id: "deco",
        label: "Décor & Tents",
        images: [decoShowcase, tentSetup, tentExterior, ...decorImgs],
      },
      {
        id: "aerial",
        label: "Aerial Photography",
        images: [aerialPhoto, ...aerialImgs],
      },
    ],
    [fleetImgs, decorImgs, aerialImgs]
  );

  const current = tabs.find((t) => t.id === active)!;
  const images = current.images;

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [active]);

  // Auto-slide inside the frame
  useEffect(() => {
    if (!images.length) return;
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % images.length);
    }, 4500);
    return () => clearInterval(t);
  }, [images.length]);

  const prev = () => {
    if (!images.length) return;
    setIdx((p) => (p - 1 + images.length) % images.length);
  };

  const next = () => {
    if (!images.length) return;
    setIdx((p) => (p + 1) % images.length);
  };

  return (
    <section id="fleet" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center mb-12">
          <p className="text-gold tracking-[0.2em] uppercase text-sm mb-3">Our Capabilities</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Fleet & Showcase</h2>
        </motion.div>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                active === tab.id
                  ? "bg-gradient-maroon text-primary-foreground shadow-maroon"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-lg border border-border bg-black aspect-video">
            {images.length ? (
              <motion.img
                key={`${active}-${idx}`}
                src={images[idx]}
                alt={current.label}
                loading="lazy"
                className="w-full h-full object-contain"
                initial={sliderMotion.initial}
                animate={sliderMotion.animate}
                transition={sliderMotion.transition}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-white/70">
                No images yet
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                >
                  ›
                </button>
              </>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Image ${i + 1}`}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      i === idx ? "bg-gold" : "bg-white/35 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-3">
            {images.length ? `${idx + 1} / ${images.length}` : ""}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
