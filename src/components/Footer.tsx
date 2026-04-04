import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/khwalo-logo.jpg";

const Footer = () => (
  <footer className="bg-card border-t border-border py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <img src={logo} alt="Khwalo Group" className="h-16 mb-4" />
          <p className="text-muted-foreground text-sm">
            Serving with dignity, professionalism and humility across the Eastern Cape.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-foreground mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["Services", "Fleet", "Burial Plans", "Apply Online", "Testimonials"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(/\s+/g, "")}`} className="text-muted-foreground hover:text-gold transition">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-foreground mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4 text-gold" /> 076 227 1640
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4 text-gold" /> 073 918 6029
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 text-gold" /> info@khwalogroup.co.za
            </li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-gold mt-0.5" /> 14 Greenwood Road, East London
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-foreground mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/KhwaloFuneralServices"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold border border-border transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold border border-border transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          <p className="text-muted-foreground text-xs mt-6">150K+ Facebook followers</p>
        </div>
      </div>

      <div className="border-t border-border mt-12 pt-8 text-center">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Khwalo Group. All rights reserved. Always open — 24/7 service.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
