import { motion } from "framer-motion";

// Uploaded testimonials (replace/rename freely, just update these imports if filenames change)
import t1 from "@/assets/testimonials/FB_IMG_1775288767613.jpg";
import t2 from "@/assets/testimonials/FB_IMG_1775288777237.jpg";
import t3 from "@/assets/testimonials/FB_IMG_1775288782772.jpg";

const testimonials = [
  {
    img: t1,
    name: "Tayo Family",
    text: "Thank you so much for your good service on laying our father to rest. May the good Lord bless you.",
  },
  {
    img: t2,
    name: "Mhlaba Family",
    text: "Khwalo Group gave our mother a dignified farewell. The service was impeccable from start to finish.",
  },
  {
    img: t3,
    name: "Skenjana Family",
    text: "Professional, compassionate and always available. We cannot thank Khwalo enough for their outstanding service.",
  },
];

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
        <p className="text-muted-foreground mt-4 text-sm">98% of clients recommend our services</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            {...fadeUpItem(i)}
            className="bg-card border border-border rounded-lg overflow-hidden"
          >
            <img src={t.img} alt={t.name} loading="lazy" className="w-full aspect-square object-cover" />
            <div className="p-6">
              <p className="text-muted-foreground text-sm italic mb-4">"{t.text}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-display font-semibold text-foreground">{t.name}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default TestimonialsSection;
