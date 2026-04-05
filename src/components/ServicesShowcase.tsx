import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Item = { img: string; title: string; desc: string };

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

const tabGridMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut" },
} as const;

const ServicesShowcase = () => {
  // Automatically include every image inside these folders.
  // Vite will bundle all matching assets.
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
      {
        id: "mortuary",
        label: "Mortuary",
        desc: "Facilities & care",
        images: mortuaryImgs,
      },
      {
        id: "decor",
        label: "Decorations",
        desc: "Décor & tents",
        images: decorImgs,
      },
      {
        id: "fleet",
        label: "Fleet",
        desc: "Vehicles & support",
        images: fleetImgs,
      },
    ],
    [mortuaryImgs, decorImgs, fleetImgs]
  );

  const [active, setActive] = useState(tabs[0].id);
  const [page, setPage] = useState(0);

  const current = tabs.find((t) => t.id === active)!;
  const items: Item[] = current.images.map((img, idx) => ({
    img,
    title: `${current.label} ${idx + 1}`,
    desc: current.desc,
  }));

  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

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
              onClick={() => {
                setActive(t.id);
                setPage(0);
              }}
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

        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={goPrev}
            disabled={safePage === 0}
            className="px-4 py-2 rounded-md border border-border bg-card text-sm disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-muted-foreground">
            Page {safePage + 1} / {totalPages} ({items.length} images)
          </span>
          <button
            onClick={goNext}
            disabled={safePage >= totalPages - 1}
            className="px-4 py-2 rounded-md border border-border bg-card text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>

        <motion.div
          key={`${active}-${safePage}`}
          initial={tabGridMotion.initial}
          animate={tabGridMotion.animate}
          transition={tabGridMotion.transition}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pageItems.map((item) => (
            <div
              key={item.img}
              className="group overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="overflow-hidden aspect-video bg-black">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-5">
                <h4 className="font-display text-lg font-semibold text-foreground">{item.title}</h4>
                <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
