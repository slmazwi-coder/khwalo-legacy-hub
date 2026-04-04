import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Essential Plan",
    price: "R99",
    features: ["Coffin & Casket", "Hearse Transport", "Mortuary Services", "Basic Décor", "Documentation"],
    popular: false,
  },
  {
    name: "Premium Plan",
    price: "R199",
    features: [
      "Premium Casket",
      "Luxury Hearse Fleet",
      "Full Mortuary",
      "Tent & Chairs (200)",
      "Professional Photography",
      "Floral Arrangements",
      "Sound System",
      "Catering Assistance",
    ],
    popular: true,
  },
  {
    name: "Prestige Plan",
    price: "R350",
    features: [
      "Luxury Casket Selection",
      "Full Hearse Fleet",
      "Premium Mortuary",
      "Marquee Tent (500+)",
      "Photography & Videography",
      "Aerial Drone Coverage",
      "Premium Décor Package",
      "Full Catering",
      "Live Streaming",
      "Memorial Booklet",
    ],
    popular: false,
  },
];

const BurialPlans = () => (
  <section id="plans" className="py-24 bg-gradient-dark">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-gold tracking-[0.2em] uppercase text-sm mb-3">Coverage Options</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Burial Plans</h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm">
          Affordable monthly payments to secure dignified funeral services for your family.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`relative rounded-lg p-8 border ${
              plan.popular
                ? "border-gold bg-card shadow-gold"
                : "border-border bg-card"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold px-4 py-1 rounded-full text-xs font-bold text-secondary-foreground">
                MOST POPULAR
              </div>
            )}
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-gradient-gold font-display text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground text-sm"> /month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-gold flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#apply"
              className={`block text-center py-3 rounded-md font-medium transition ${
                plan.popular
                  ? "bg-gradient-maroon text-primary-foreground shadow-maroon hover:opacity-90"
                  : "border border-gold text-gold hover:bg-gold/10"
              }`}
            >
              Join This Plan
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BurialPlans;
