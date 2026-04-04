import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

// Uploaded weekly funeral images
import f1 from "@/assets/funerals/weekly/FB_IMG_1775288767613.jpg";
import f2 from "@/assets/funerals/weekly/FB_IMG_1775288777237.jpg";

const funerals = [
  {
    name: "Sivuyile Sydney Lwana",
    dates: "10 March 1979 – 22 March 2026",
    ceremony: "Thursday, 02 April 2026",
    venue: "eMphetshwa Location, Bizana",
    img: f1,
  },
  {
    name: "Nolitha Fundiswa Sylvia Madikizela",
    dates: "23/08/1963 – 02/03/2026",
    ceremony: "Saturday, 13 March 2026",
    venue: "Details at nearest branch",
    img: f2,
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

const UpcomingFunerals = () => (
  <div className="py-16">
    <div className="container mx-auto px-4">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-gold tracking-[0.2em] uppercase text-sm mb-3">This Week</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Upcoming Funerals</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {funerals.map((f, i) => (
          <motion.div
            key={f.name}
            {...fadeUpItem(i)}
            className="bg-card border border-border rounded-lg overflow-hidden"
          >
            <div className="aspect-video overflow-hidden">
              <img src={f.img} alt={f.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{f.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{f.dates}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span className="text-muted-foreground">{f.ceremony}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="text-muted-foreground">{f.venue}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default UpcomingFunerals;
