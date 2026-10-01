import {
  ArrowDownToLine,
  Armchair,
  Cross,
  FileText,
  HeartHandshake,
  Mic2,
  Tent,
  Truck,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "@/i18n/LanguageContext";
import { serviceNames } from "@/data/translations";

const ICONS: LucideIcon[] = [
  HeartHandshake, // Coffins / Caskets
  HeartHandshake, // Décor
  Tent,
  Armchair,
  Cross,
  Video,
  Mic2,
  Truck,
  ArrowDownToLine,
  FileText,
  HeartHandshake, // And more
];

export function ServicesSection() {
  const { t, lang } = useLang();
  const names = serviceNames[lang];

  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="mx-auto w-[min(1180px,calc(100%-24px))]">
        <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} sub={t.services.sub} />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {names.map((name, index) => {
            const Icon = ICONS[index] ?? HeartHandshake;
            return (
              <Card key={name} className="border-border/70 transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-primary">{name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.services.blurb}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
