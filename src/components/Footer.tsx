import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { useLang } from "@/i18n/LanguageContext";
import { contact, wa } from "@/data/contact";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-primary pb-28 pt-14 text-primary-foreground sm:pb-14">
      <div className="mx-auto grid w-[min(1180px,calc(100%-24px))] gap-8 md:grid-cols-2">
        <div>
          <div className="inline-block rounded-xl bg-card p-2">
            <Logo className="h-12 w-auto object-contain" />
          </div>
          <p className="mt-5 max-w-md border-l-[3px] border-sky pl-4 text-sm italic text-primary-foreground/85">
            {t.footer.scripture}
          </p>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden="true" />
            <span>{contact.address}</span>
          </div>

          <div className="space-y-2">
            {contact.phones.map((phone) => (
              <div key={phone.tel} className="flex items-center gap-4">
                <a href={`tel:${phone.tel}`} className="focus-ring inline-flex items-center gap-2 rounded font-semibold">
                  <Phone className="h-4 w-4 text-sky" aria-hidden="true" />
                  {phone.display}
                </a>
                <a
                  href={wa(phone.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center gap-1.5 rounded text-primary-foreground/85 underline"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sky" aria-hidden="true" />
            <div>
              <a href={`mailto:${contact.primaryEmail}`} className="focus-ring block rounded font-semibold">
                {contact.primaryEmail}
              </a>
              <a
                href={`mailto:${contact.alternateEmail}`}
                className="focus-ring block rounded text-primary-foreground/85"
              >
                {contact.alternateEmail}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 w-[min(1180px,calc(100%-24px))] border-t border-primary-foreground/20 pt-6 text-xs text-primary-foreground/75">
        © {new Date().getFullYear()} {t.footer.rights}
      </div>
    </footer>
  );
}
