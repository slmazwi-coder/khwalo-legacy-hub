import { motion } from "framer-motion";
import fleetHero from "@/assets/fleet-hero.jpg";

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={fleetHero} alt="Khwalo Group Fleet" className="w-full h-full object-cover" width={1920} height={800} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
    </div>

    <div className="relative z-10 container mx-auto px-4 text-center pt-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
