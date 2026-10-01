import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LanguageContext";
import { contact, wa, defaultWhatsapp } from "@/data/contact";

export function HeroSection() {
  const { t } = useLang();

  return (
    <section id="top" className="hero-gradient hero-glow relative overflow-hidden py-14 sm:py-20">
      <div className="relative z-10 mx-auto grid w-[min(1180px,calc(100%-24px))] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-royal">{t.hero.eyebrow}</span>
          <h1 className="mt-3 text-4xl font-bold leading-[1.05] text-primary sm:text-5xl lg:text-[3.9rem]">
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.sub}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="w-full rounded-full sm:w-auto">
              <a href={`tel:${contact.phones[0].tel}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {t.hero.call}
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full rounded-full sm:w-auto">
              <a href={wa(defaultWhatsapp)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t.hero.whatsapp}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full rounded-full sm:w-auto">
              <a href="#catalogue">{t.hero.view}</a>
            </Button>
          </div>

          <blockquote className="mt-7 border-l-[3px] border-sky pl-4 text-sm italic text-muted-foreground sm:text-base">
            {t.hero.scripture}
          </blockquote>
        </div>

        <div className="overflow-hidden rounded-[28px] border-8 border-card shadow-2xl shadow-primary/15">
          <img
            src="/business-front.jpg"
            alt="Luloyiso Funeral Services premises in Matatiele"
            className="block h-[280px] w-full object-cover sm:h-[380px] lg:h-[430px]"
            width={1200}
            height={800}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
