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

// Upcoming funerals posters (images only). Add posters to:
// src/assets/funerals/weekly/
const UpcomingFunerals = () => {
  const images = useMemo(
    () =>
      Object.values(import.meta.glob("@/assets/funerals/weekly/*.{jpg,jpeg,png,webp}", { eager: true }))
        .map((m: any) => m.default as string)
        .filter(Boolean),
    []
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % images.length);
    }, 5000);
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
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center mb-12">
          <p className="text-gold tracking-[0.2em] uppercase text-sm mb-3">This Week</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Upcoming Funerals</h2>
          <p className="text-muted-foreground mt-3 text-sm">Latest funeral posters (tap arrows to browse)</p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-lg border border-border bg-black aspect-video">
            {images.length ? (
              <motion.img
                key={idx}
                src={images[idx]}
                alt={`Upcoming funeral poster ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-contain"
                initial={sliderMotion.initial}
                animate={sliderMotion.animate}
                transition={sliderMotion.transition}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-white/70">
                No posters uploaded yet
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous poster"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  aria-label="Next poster"
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
                    aria-label={`Poster ${i + 1}`}
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
    </div>
  );
};

export default UpcomingFunerals;
