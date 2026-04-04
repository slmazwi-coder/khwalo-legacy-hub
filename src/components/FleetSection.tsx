import { useState } from "react";
import { motion } from "framer-motion";
import fleetHero from "@/assets/fleet-hero.jpg";
import aerialPhoto from "@/assets/aerial-photo.jpg";
import decoShowcase from "@/assets/deco-showcase.jpg";
import tentSetup from "@/assets/tent-setup.jpg";
import tentExterior from "@/assets/tent-exterior.jpg";
import servicePhoto from "@/assets/service-photo.jpg";

const tabs = [
  {
    id: "vehicles",
    label: "Vehicles & Hearses",
    items: [
      { img: fleetHero, title: "Luxury Hearse Fleet", desc: "Premium Mercedes-Benz hearses" },
      { img: servicePhoto, title: "Body Trailers", desc: "Professional body transport vehicles" },
    ],
  },
  {
    id: "deco",
    label: "Décor & Tents",
    items: [
      { img: decoShowcase, title: "Premium Décor", desc: "Elegant floral and fabric arrangements" },
      { img: tentSetup, title: "Interior Setup", desc: "Full interior tent décor with seating" },
      { img: tentExterior, title: "Marquee Tents", desc: "Large-scale tent structures for any venue" },
    ],
  },
  {
    id: "aerial",
    label: "Aerial Photography",
    items: [
      { img: aerialPhoto, title: "Drone Coverage", desc: "Aerial views of the full ceremony" },
    ],
  },
];

const FleetSection = () => {
  const [active, setActive] = useState("vehicles");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section id="fleet" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gold tracking-[0.2em] uppercase text-sm mb-3">Our Capabilities</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Fleet & Showcase</h2>
        </motion.div>

        <div className="flex justify-center gap-2 mb-12 flex-wrap">
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

        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {current.items.map((item) => (
            <div key={item.title} className="group overflow-hidden rounded-lg border border-border">
              <div className="overflow-hidden aspect-video">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
