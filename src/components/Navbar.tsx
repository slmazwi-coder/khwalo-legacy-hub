import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/khwalo-logo.jpg";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Burial Plans", href: "#plans" },
  { label: "Updates", href: "#updates" },
  { label: "Our Team", href: "#team" },
  { label: "Contacts", href: "#contacts" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="Khwalo Group" className="h-14 w-auto" />
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="/pay" className="bg-gradient-maroon px-5 py-2.5 rounded-md text-primary-foreground text-sm font-semibold shadow-maroon hover:opacity-90 transition">
            Pay Now
          </a>
          <a href="tel:0762271640" className="flex items-center gap-2 text-sm text-gold">
            <Phone className="w-4 h-4" />
            076 227 1640
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-gray-900"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-b border-border pb-4">
          <a
            href="/pay"
            onClick={() => setOpen(false)}
            className="block mx-6 mt-4 mb-2 text-center bg-gradient-maroon px-6 py-3 rounded-md text-primary-foreground text-sm font-semibold shadow-maroon"
          >
            Pay Now
          </a>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm text-gray-700 hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="tel:0762271640" className="block px-6 py-3 text-sm text-gold">
            📞 076 227 1640
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
