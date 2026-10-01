import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "@/i18n/LanguageContext";

export function TrustSection() {
  const { t } = useLang();
  const [certificateMissing, setCertificateMissing] = useState(false);

  return (
    <section id="trust" className="bg-secondary/60 py-16 sm:py-24">
      <div className="mx-auto w-[min(1180px,calc(100%-24px))]">
        <SectionHeading eyebrow={t.trust.eyebrow} title={t.trust.title} />

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
          <Card className="border-border/70">
            <CardContent className="p-7">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-royal" aria-hidden="true" />
                <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-royal">SAFPA</p>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.trust.text}</p>
            </CardContent>
          </Card>

          <div className="overflow-hidden rounded-2xl border border-border bg-card p-3">
            {certificateMissing ? (
              <div className="grid h-[280px] place-items-center rounded-xl bg-muted text-center text-sm font-semibold text-muted-foreground">
                SAFPA certificate
              </div>
            ) : (
              <img
                src="/safpa-certificate.jpg"
                alt={t.trust.alt}
                loading="lazy"
                decoding="async"
                className="mx-auto max-h-[420px] w-full rounded-xl object-contain"
                onError={() => setCertificateMissing(true)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
