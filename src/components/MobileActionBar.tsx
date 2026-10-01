import { MessageCircle, Phone } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { contact, wa, defaultWhatsapp } from "@/data/contact";

/** Sticky mobile-only bar so Call and WhatsApp are always one tap away. */
export function MobileActionBar() {
  const { t } = useLang();

  return (
    <div
      className="no-print fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-border bg-card px-3 py-2 sm:hidden"
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={`tel:${contact.phones[0].tel}`}
        className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        {t.mobileBar.call}
      </a>
      <a
        href={wa(defaultWhatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-bold text-accent-foreground"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {t.mobileBar.whatsapp}
      </a>
    </div>
  );
}
