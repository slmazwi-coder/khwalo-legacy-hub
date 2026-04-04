import { motion } from "framer-motion";
import { Building2, Camera, Tent, Car, Flower2, Plane, Users, FileText } from "lucide-react";

const services = [
  { icon: Building2, title: "Mortuary Services", desc: "State-of-the-art mortuary facilities across all branches" },
  { icon: Tent, title: "Tents & Marquees", desc: "Large-scale tent setups for funeral services of any size" },
  { icon: Flower2, title: "Decorations", desc: "Elegant floral arrangements and venue décor" },
  { icon: Camera, title: "Photography", desc: "Professional funeral photography and videography" },
  { icon: Plane, title: "Aerial Photography", desc: "Drone photography capturing the full ceremony" },
  { icon: Car, title: "Fleet & Transport", desc: "Luxury hearse fleet and body trailers" },
  { icon: Users, title: "Financial Advice", desc: "Burial plan consultation and financial guidance" },
  { icon: FileText, title: "Full Service Funerals", desc: "Complete end-to-end funeral management" },
];

const ServicesSection = () => (
  <section id="services" className="py-24 bg-gradient-dark">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-gold tracking-[0.2em] uppercase text-sm mb-3">What We Offer</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Our Services</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-lg p-6 hover:border-gold/40 transition-all group"
          >
            <s.icon className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
