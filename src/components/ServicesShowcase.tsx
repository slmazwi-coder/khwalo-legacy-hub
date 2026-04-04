import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import m1 from "@/assets/services/mortuary/FB_IMG_1775288732336.jpg";
import m2 from "@/assets/services/mortuary/FB_IMG_1775307797500.jpg";

import d1 from "@/assets/services/decorations/FB_IMG_1775288609785.jpg";
import d2 from "@/assets/services/decorations/FB_IMG_1775288682388.jpg";

import f1 from "@/assets/services/fleet/FB_IMG_1775307179824.jpg";
import f2 from "@/assets/services/fleet/FB_IMG_1775307193555.jpg";

type Item = { img: string; title: string; desc: string };

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

const fadeUpItem = (i: number) =>
  ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }) as const;

const ServicesShowcase = () => {
  const tabs = useMemo(
    () => [
      {
        id: "mortuary",
        label: "Mortuary",
        items: [
          { img: m1, title: "Viewing Area", desc: "Private and respectful viewing facilities" },
          { img: m2, title: "Mortuary Facility", desc: "Clean, secure and professional care" },
        ] satisfies Item[],
      },
      {
        id: "decor",
        label: "Decorations",
        items: [
          { img: d1, title: "Venue Décor", desc: "Elegant setups for a dignified farewell" },
          { img: d2, title: "Floral Arrangements", desc: "Premium flowers and styling" },
        ] satisfies Item[],
      },
      {
        id: "fleet",
        label: "Fleet",
        items: [
          { img: f1, title: "Hearse Fleet", desc: "Luxury vehicles for transport" },
          { img: f2, title: "Support Vehicles", desc: "Reliable support for every service" },
        ] satisfies Item[],
      },
    ],
    []
  );

  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

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

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
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

        <motion.div
          key={active}
          initial= opacity: 0, y: 10 
          animate= opacity: 1, y: 0 
          transition= duration: 0.35 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {current.items.map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUpItem(i)}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
