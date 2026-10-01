import { useState, type FormEvent } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "@/i18n/LanguageContext";
import { contact, wa, defaultWhatsapp } from "@/data/contact";

export function ContactSection() {
  const { t } = useLang();
  // Interest is stored as a stable key so the selection survives a language switch.
  const [form, setForm] = useState<{ name: string; phone: string; interest: keyof typeof t.contact.interests; message: string }>({
    name: "",
    phone: "",
    interest: "funeral",
    message: "",
  });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const interestLabel = t.contact.interests[form.interest];
    const message = `Hello Luloyiso, my name is ${form.name}. Phone: ${form.phone}. Interest: ${interestLabel}. ${form.message}`;
    window.open(wa(defaultWhatsapp, message), "_blank", "noopener,noreferrer");
  };

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${contact.map.longitude - 0.02}%2C${
    contact.map.latitude - 0.02
  }%2C${contact.map.longitude + 0.02}%2C${contact.map.latitude + 0.02}&layer=mapnik&marker=${
    contact.map.latitude
  }%2C${contact.map.longitude}`;

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="mx-auto w-[min(1180px,calc(100%-24px))]">
        <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} sub={t.contact.sub} />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="border-border/70">
            <CardContent className="p-7">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-primary">{t.contact.address}</p>
                  <p className="text-sm text-muted-foreground">{contact.address}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {contact.phones.map((phone) => (
                  <div key={phone.tel} className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <a
                      href={`tel:${phone.tel}`}
                      className="focus-ring inline-flex items-center gap-2 rounded text-sm font-semibold text-primary"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {phone.display}
                    </a>
                    <a
                      href={wa(phone.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex items-center gap-1.5 rounded text-xs font-semibold text-royal underline"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      WhatsApp
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="text-sm">
                  <a
                    href={`mailto:${contact.primaryEmail}`}
                    className="focus-ring block rounded font-semibold text-primary"
                  >
                    {contact.primaryEmail}
                  </a>
                  <a
                    href={`mailto:${contact.alternateEmail}`}
                    className="focus-ring block rounded text-muted-foreground"
                  >
                    {contact.alternateEmail}
                  </a>
                </div>
              </div>

              <iframe
                title={t.contact.mapTitle}
                src={mapSrc}
                className="mt-6 h-[240px] w-full rounded-2xl border-0"
                loading="lazy"
              />
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardContent className="p-7">
              <form onSubmit={submit} className="grid gap-4">
                <div>
                  <Label htmlFor="enquiry-name">{t.contact.name}</Label>
                  <Input
                    id="enquiry-name"
                    required
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="enquiry-phone">{t.contact.phone}</Label>
                  <Input
                    id="enquiry-phone"
                    required
                    inputMode="tel"
                    value={form.phone}
                    onChange={(event) => setForm({ ...form, phone: event.target.value })}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="enquiry-interest">{t.contact.interest}</Label>
                  <Select
                    value={form.interest}
                    onValueChange={(value) =>
                      setForm({ ...form, interest: value as keyof typeof t.contact.interests })
                    }
                  >
                    <SelectTrigger id="enquiry-interest" className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(t.contact.interests) as (keyof typeof t.contact.interests)[]).map((key) => (
                        <SelectItem key={key} value={key}>
                          {t.contact.interests[key]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="enquiry-message">{t.contact.message}</Label>
                  <Textarea
                    id="enquiry-message"
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    className="mt-1.5 min-h-[120px]"
                  />
                </div>

                <Button type="submit" className="rounded-full">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t.contact.send}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
