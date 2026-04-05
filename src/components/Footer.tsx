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
          <div className="flex gap-4 flex-wrap">
            <a
              href="https://www.facebook.com/khwalofuneralservices/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold border border-border transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>

            <a
              href="https://www.tiktok.com/@khwalo_funerals"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold border border-border transition"
            >
              {/* Simple TikTok glyph */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.6 5.82c.95.69 2.11 1.1 3.4 1.1v3.23c-1.46 0-2.83-.43-4-1.17v6.17c0 3.36-2.72 6.08-6.08 6.08S3.84 18.52 3.84 15.16c0-3.36 2.72-6.08 6.08-6.08.2 0 .4.01.6.03v3.34c-.2-.05-.4-.08-.6-.08-1.58 0-2.86 1.28-2.86 2.86 0 1.58 1.28 2.86 2.86 2.86 1.58 0 2.86-1.28 2.86-2.86V2h3.18c.08 1.5.73 2.84 1.72 3.82z"/></svg>
            </a>

            <a
              href="https://x.com/kfs1102"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold border border-border transition"
            >
              {/* X logo */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.9 2H22l-6.8 7.8L23 22h-6.6l-5.2-6.7L5.3 22H2l7.3-8.4L1 2h6.8l4.7 6.1L18.9 2zm-1.2 18h1.8L6.9 3.9H5L17.7 20z"/></svg>
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
