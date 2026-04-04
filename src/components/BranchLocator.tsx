import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

const branches = [
  {
    name: "East London",
    address: "14A Greenwood Street, Berea, East London",
    phone: "047 050 0383",
    coords: { lat: -33.0153, lng: 27.9116 },
  },
  {
    name: "Lusikisiki (Head Office)",
    address: "Jacaranda Street, Aroma Complex, Lusikisiki",
    phone: "076 227 1640",
    coords: { lat: -31.3661, lng: 29.5731 },
  },
  {
    name: "Flagstaff",
    address: "Vatsha Building, AutoZone Complex, Office 25, Flagstaff",
    phone: "076 227 1640",
    coords: { lat: -31.0829, lng: 29.4952 },
  },
  {
    name: "Bizana",
    address: "Bam Building, Office 29, 22 Main Street, Bizana",
    phone: "076 227 1640",
    coords: { lat: -30.8561, lng: 29.8576 },
  },
  {
    name: "Ngcobo",
    address: "Warner Street, Office 152, Ngcobo",
    phone: "083 873 0222",
    coords: { lat: -31.6806, lng: 28.0003 },
  },
  {
    name: "Durban",
    address: "417 Anton Lembede Street (Smith St), Sangro House, Office 910, Durban CBD",
    phone: "076 227 1640",
    coords: { lat: -29.8587, lng: 31.0218 },
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

const BranchLocator = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % branches.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const active = branches[activeIdx];

  return (
    <section id="contacts" className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-gold tracking-[0.2em] uppercase text-sm mb-3">Get in touch</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Contacts</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-3">
            {branches.map((b, i) => (
              <button
                key={b.name}
                onClick={() => setActiveIdx(i)}
                className={`w-full text-left p-5 rounded-lg border transition-all ${
                  i === activeIdx
                    ? "border-gold bg-card shadow-gold"
                    : "border-border bg-card/50 hover:border-gold/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <MapPin
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      i === activeIdx ? "text-gold" : "text-muted-foreground"
                    }`}
                  />
                  <div>
                    <h4 className="font-display font-semibold text-foreground">{b.name}</h4>
                    <p className="text-muted-foreground text-sm">{b.address}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-gold">
                        <Phone className="w-3 h-3" /> {b.phone}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" /> Always Open
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-lg overflow-hidden border border-border h-[400px] lg:h-auto">
            <iframe
              title={`Map - ${active.name}`}
              src={`https://www.google.com/maps?q=${active.coords.lat},${active.coords.lng}&z=12&output=embed`}
              className="w-full h-full min-h-[400px]"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchLocator;
