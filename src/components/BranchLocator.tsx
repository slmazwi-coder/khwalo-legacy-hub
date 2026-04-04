import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

const branches = [
  {
    name: "East London (Head Office)",
    address: "14 Greenwood Road, East London, 5200",
    phone: "076 227 1640",
    coords: { lat: -33.0153, lng: 27.9116 },
  },
  {
    name: "Mthatha",
    address: "Mthatha, Eastern Cape",
    phone: "073 918 6029",
    coords: { lat: -31.5889, lng: 28.7844 },
  },
  {
    name: "Queenstown",
    address: "Queenstown, Eastern Cape",
    phone: "083 764 7122",
    coords: { lat: -31.8975, lng: 26.8753 },
  },
  {
    name: "Ngcobo",
    address: "Ngcobo, Eastern Cape",
    phone: "083 873 0222",
    coords: { lat: -31.6806, lng: 28.0003 },
  },
  {
    name: "Lusikisiki",
    address: "Lusikisiki, Eastern Cape",
    phone: "076 227 1640",
    coords: { lat: -31.3661, lng: 29.5731 },
  },
];

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
        <motion.div
          initial= opacity: 0, y: 20 
          whileInView= opacity: 1, y: 0 
          viewport= once: true 
          className="text-center mb-16"
        >
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
