import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

const sliderMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.35, ease: "easeOut" },
} as const;

const ServicesShowcase = () => {
  // Automatically include every image inside these folders.
  const mortuaryImgs = useMemo(
    () =>
      Object.values(import.meta.glob("@/assets/services/mortuary/*.{jpg,jpeg,png,webp}", { eager: true }))
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

  const fleetImgs = useMemo(
    () =>
      Object.values(import.meta.glob("@/assets/services/fleet/*.{jpg,jpeg,png,webp}", { eager: true }))
        .map((m: any) => m.default as string)
        .filter(Boolean),
    []
  );

  const tabs = useMemo(
    () => [
      { id: "mortuary", label: "Mortuary", images: mortuaryImgs },
      { id: "decor", label: "Decorations", images: decorImgs },
      { id: "fleet", label: "Fleet", images: fleetImgs },
    ],
    [mortuaryImgs, decorImgs, fleetImgs]
  );

  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;
  const images = current.images;

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [active]);

  // Auto-slide
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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center mb-10">
          <p className="text-gold tracking-[0.2em] uppercase text-sm mb-3">Showcase</p>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">Service Gallery</h3>
          <p className="text-muted-foreground mt-3 text-sm max-w-xl mx-auto">
            Explore our facilities, décor and fleet.
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all ${
                active === t.id
                  ? "bg-gradient-maroon text-primary-foreground shadow-maroon"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
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

            {/* arrows */}
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

            {/* dots */}
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

export default ServicesShowcase;
