import { motion } from "framer-motion";
import ceoImg from "@/assets/ceo.jpg";

const consultants = [
  { name: "Branch Consultant", branch: "East London", img: null },
  { name: "Branch Consultant", branch: "Mthatha", img: null },
  { name: "Branch Consultant", branch: "Queenstown", img: null },
  { name: "Branch Consultant", branch: "Ngcobo", img: null },
  { name: "Branch Consultant", branch: "Lusikisiki", img: null },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

const fadeUpCard = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

const CEOSection = () => (
  <section id="team" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="text-gold tracking-[0.2em] uppercase text-sm mb-3">Our Team</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Meet Our Team</h2>
      </motion.div>

      <motion.div {...fadeUpCard} className="max-w-4xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row gap-8 items-center bg-card border border-border rounded-lg overflow-hidden">
          <div className="md:w-1/3">
            <img src={ceoImg} alt="CEO" className="w-full aspect-[3/4] object-cover" />
          </div>
          <div className="md:w-2/3 p-8">
            <p className="text-gold text-sm tracking-widest uppercase mb-2">Chief Executive Officer</p>
            <h3 className="font-display text-3xl font-bold text-foreground mb-4">CEO's Message</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              "At Khwalo Group, we believe every life deserves to be celebrated with dignity and respect.
              Since our founding, we have committed ourselves to providing exceptional funeral services
              that honour the departed and comfort the living."
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              "Our growth across the Eastern Cape — from East London to Lusikisiki — is a testament to the
              trust families place in us. We pledge to continue serving with professionalism, humility and
              unwavering dedication."
            </p>
          </div>
        </div>
      </motion.div>

      <div>
        <h3 className="font-display text-2xl font-bold text-foreground text-center mb-10">Branch Team</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
          {consultants.map((c, i) => (
            <motion.div
              key={c.branch}
              {...fadeUp}
              transition= delay: i * 0.1, duration: 0.6, ease: "easeOut" 
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-muted border-2 border-gold/30 flex items-center justify-center mb-3">
                <span className="text-gold font-display text-2xl">{c.branch[0]}</span>
              </div>
              <p className="text-foreground text-sm font-medium">{c.name}</p>
              <p className="text-gold text-xs">{c.branch}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CEOSection;
