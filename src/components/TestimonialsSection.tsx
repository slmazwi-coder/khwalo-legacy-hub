import { motion } from "framer-motion";

// Uploaded testimonials (images only)
import t1 from "@/assets/testimonials/FB_IMG_1775288759156.jpg";
import t2 from "@/assets/testimonials/FB_IMG_1775288815421.jpg";
import t3 from "@/assets/testimonials/FB_IMG_1775288823471.jpg";

const testimonials = [t1, t2, t3];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

const fadeUpItem = (i: number) =>
  ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }) as const;

const TestimonialsSection = () => (
  <div className="py-16">
    <div className="container mx-auto px-4">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-gold tracking-[0.2em] uppercase text-sm mb-3">Client Stories</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Testimonials</h2>
        <p className="text-muted-foreground mt-4 text-sm">Real words from families we’ve served</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((img, i) => (
          <motion.div
            key={img}
            {...fadeUpItem(i)}
            className="bg-card border border-border rounded-lg overflow-hidden"
          >
            <img
              src={img}
              alt={`Testimonial ${i + 1}`}
              loading="lazy"
              className="w-full aspect-square object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default TestimonialsSection;
