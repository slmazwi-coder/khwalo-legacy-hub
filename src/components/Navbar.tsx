import { useState } from "react";
import { Languages, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { useLang } from "@/i18n/LanguageContext";
import { contact } from "@/data/contact";

export function Navbar() {
  const { t, lang, toggle } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.scheme, href: "#scheme" },
    { label: t.nav.catalogue, href: "#catalogue" },
    { label: t.nav.trust, href: "#trust" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="no-print sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-[min(1180px,calc(100%-24px))] items-center justify-between gap-4">
        <a href="#top" className="focus-ring shrink-0 rounded-md" aria-label={contact.name}>
          <Logo className="h-11 w-auto object-contain sm:h-12" />
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring rounded text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${contact.phones[0].tel}`}
            className="focus-ring hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {contact.phones[0].display}
          </a>
          <button
            type="button"
            onClick={toggle}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
            aria-label={`Switch language to ${t.langToggle}`}
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{lang === "en" ? "isiXhosa" : "English"}</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-primary lg:hidden"
            aria-label={t.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="border-t border-border bg-background lg:hidden" aria-label="Mobile">
          <div className="mx-auto w-[min(1180px,calc(100%-24px))] py-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="focus-ring block rounded px-2 py-3 font-semibold text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
