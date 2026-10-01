import { useState } from "react";
import { Check, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "@/i18n/LanguageContext";
import { benefits, benefitsXh, schemes, terms } from "@/data/scheme";
import { formatZAR } from "@/lib/format";
import { wa, defaultWhatsapp } from "@/data/contact";
import { cn } from "@/lib/utils";

export function BurialScheme() {
  const { t, lang } = useLang();
  const [withSpouse, setWithSpouse] = useState(false);

  const list = lang === "en" ? benefits : benefitsXh;

  return (
    <section id="scheme" className="bg-secondary/60 py-16 sm:py-24">
      <div className="mx-auto w-[min(1180px,calc(100%-24px))]">
        <SectionHeading eyebrow={t.scheme.eyebrow} title={t.scheme.title} sub={t.scheme.sub}>
          <div className="mt-6 inline-flex rounded-full bg-muted p-1" role="group" aria-label={t.scheme.sub}>
            <button
              type="button"
              onClick={() => setWithSpouse(false)}
              aria-pressed={!withSpouse}
              className={cn(
                "focus-ring rounded-full px-4 py-2 text-sm font-bold transition-colors",
                !withSpouse ? "bg-card text-primary shadow-sm" : "text-muted-foreground",
              )}
            >
              {t.scheme.single}
            </button>
            <button
              type="button"
              onClick={() => setWithSpouse(true)}
              aria-pressed={withSpouse}
              className={cn(
                "focus-ring rounded-full px-4 py-2 text-sm font-bold transition-colors",
                withSpouse ? "bg-card text-primary shadow-sm" : "text-muted-foreground",
              )}
            >
              {t.scheme.spouse}
            </button>
          </div>
        </SectionHeading>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {schemes.map((scheme) => {
            const premium = withSpouse ? scheme.withSpouse : scheme.withoutSpouse;
            const joining = typeof scheme.joining === "number" ? formatZAR(scheme.joining) : scheme.joining;
            return (
              <Card key={scheme.id} className="border-border/70">
                <CardContent className="p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-xs font-extrabold text-royal">
                        Scheme {scheme.id}
                      </span>
                      <h3 className="mt-3 text-lg font-bold text-primary">
                        {lang === "en" ? scheme.age : scheme.ageXh}
                      </h3>
                    </div>
                    <ShieldCheck className="h-6 w-6 text-royal" aria-hidden="true" />
                  </div>

                  <p className="mt-5 text-3xl font-extrabold text-primary">
                    {formatZAR(premium)}
                    <span className="text-sm font-semibold text-muted-foreground"> {t.scheme.perMonth}</span>
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t.scheme.joining}: <span className="font-semibold text-foreground">{joining}</span>
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-7 border-border/70">
          <CardContent className="p-7">
            <h3 className="text-lg font-bold text-primary">{t.scheme.benefits}</h3>
            <div className="mt-4 grid gap-x-8 sm:grid-cols-2">
              {list.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 border-b border-border/70 py-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-royal" aria-hidden="true" />
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="my-6 h-px bg-border" />

            <h3 className="text-lg font-bold text-primary">{t.scheme.terms}</h3>
            <ul className="mt-3 space-y-3">
              {terms.map((term) => (
                <li key={term.en} className="text-sm text-muted-foreground">
                  <span className="text-foreground">{lang === "en" ? term.en : term.xh}</span>{" "}
                  <span className="text-xs italic text-royal">({t.confirmNote})</span>
                </li>
              ))}
            </ul>

            <Button asChild className="mt-6 rounded-full">
              <a href={wa(defaultWhatsapp)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t.scheme.joinToday}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
