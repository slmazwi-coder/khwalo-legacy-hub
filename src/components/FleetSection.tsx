import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import fleetHero from "@/assets/fleet-hero.jpg";
import aerialPhoto from "@/assets/aerial-photo.jpg";
import decoShowcase from "@/assets/deco-showcase.jpg";
import tentSetup from "@/assets/tent-setup.jpg";
import tentExterior from "@/assets/tent-exterior.jpg";
import servicePhoto from "@/assets/service-photo.jpg";

type Item = { img: string; title: string; desc: string };

type Tab = {
  id: string;
  label: string;
  items: Item[];
};

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
        items: [
          { img: fleetHero, title: "Luxury Hearse Fleet", desc: "Premium Mercedes-Benz hearses" },
          { img: servicePhoto, title: "Body Trailers", desc: "Professional body transport vehicles" },
          ...fleetImgs.map((img, i) => ({
            img,
            title: `Fleet ${i + 1}`,
            desc: "More fleet photos",
          })),
        ],
      },
      {
        id: "deco",
        label: "Décor & Tents",
        items: [
          { img: decoShowcase, title: "Premium Décor", desc: "Elegant floral and fabric arrangements" },
          { img: tentSetup, title: "Interior Setup", desc: "Full interior tent décor with seating" },
          { img: tentExterior, title: "Marquee Tents", desc: "Large-scale tent structures for any venue" },
          ...decorImgs.map((img, i) => ({
            img,
            title: `Décor ${i + 1}`,
            desc: "More décor photos",
          })),
        ],
      },
      {
        id: "aerial",
        label: "Aerial Photography",
        items: [
          { img: aerialPhoto, title: "Drone Coverage", desc: "Aerial views of the full ceremony" },
          ...(aerialImgs.length
            ? aerialImgs.map((img, i) => ({ img, title: `Aerial ${i + 1}`, desc: "More aerial photos" }))
            : []),
        ],
      },
    ],
    [fleetImgs, decorImgs, aerialImgs]
  );

  const current = tabs.find((t) => t.id === active)!;

  // Simple pager so *all* images still show without making the page too long
  const pageSize = 9;
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(current.items.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const pageItems = current.items.slice(safePage * pageSize, safePage * pageSize + pageSize);

  return (
    <section id="fleet" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial= opacity: 0, y: 20 
          whileInView= opacity: 1, y: 0 
          viewport= once: true 
          className="text-center mb-12"
        >
          <p className="text-gold tracking-[0.2em] uppercase text-sm mb-3">Our Capabilities</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Fleet & Showcase</h2>
        </motion.div>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActive(tab.id);
                setPage(0);
              }}
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

        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
            className="px-4 py-2 rounded-md border border-border bg-card text-sm disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-muted-foreground">
            Page {safePage + 1} / {totalPages} ({current.items.length} images)
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={safePage >= totalPages - 1}
            className="px-4 py-2 rounded-md border border-border bg-card text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>

        <motion.div
          key={`${active}-${safePage}`}
          initial= opacity: 0, y: 10 
          animate= opacity: 1, y: 0 
          transition= duration: 0.35, ease: "easeOut" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pageItems.map((item) => (
            <div key={item.img} className="group overflow-hidden rounded-lg border border-border">
              <div className="overflow-hidden aspect-video bg-black">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-5 bg-card">
                <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FleetSection;
