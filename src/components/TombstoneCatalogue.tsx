import { useMemo, useState } from "react";
import {
  LayoutGrid,
  MessageCircle,
  Phone,
  Printer,
  Search,
  SlidersHorizontal,
  Table2,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "@/i18n/LanguageContext";
import { PREMIUM_THRESHOLD, SLAB_PRICE, hasCataloguePhoto, tombstones, type Tombstone } from "@/data/tombstones";
import { formatZAR } from "@/lib/format";
import { contact, wa, defaultWhatsapp } from "@/data/contact";
import { cn } from "@/lib/utils";

type PriceMode = "head" | "full" | "slab";
type SortKey = "code" | "priceAsc" | "priceDesc";

const ALL_SIZES = "all";

/**
 * Catalogue image with a graceful "photo coming soon" fallback. The physical
 * catalogue only covers P1–P32 and P37–P40, and those photos show real names
 * and dates — see the privacy note in src/data/tombstones.ts before adding any.
 */
function TombstonePhoto({ code, label }: { code: string; label: string }) {
  const [failed, setFailed] = useState(!hasCataloguePhoto(code));

  if (failed) {
    return (
      <div className="grid h-[180px] place-items-center bg-gradient-to-br from-secondary to-muted text-center text-sm font-semibold text-muted-foreground">
        <span>
          {label}
          <br />
          <span className="text-xs">{code}</span>
        </span>
      </div>
    );
  }

  return (
    <img
      src={`/tombstones/${code}.jpg`}
      alt={`Tombstone design ${code}`}
      loading="lazy"
      decoding="async"
      className="h-[180px] w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export function TombstoneCatalogue() {
  const { t } = useLang();
  const [mode, setMode] = useState<PriceMode>("head");
  const [view, setView] = useState<"table" | "cards">("table");
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(ALL_SIZES);
  const [sort, setSort] = useState<SortKey>("code");
  const [minPrice, setMinPrice] = useState(0);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [shortlistOpen, setShortlistOpen] = useState(false);

  const sizes = useMemo(
    () => Array.from(new Set(tombstones.map((item) => item.size).filter((value): value is string => Boolean(value)))),
    [],
  );

  const priceBounds = useMemo(() => {
    const values = tombstones
      .map((item) => item.fullSet ?? item.headBase)
      .filter((value): value is number => typeof value === "number");
    return { min: 0, max: Math.ceil(Math.max(...values) / 1000) * 1000 };
  }, []);

  /** Price shown for a row/card under the active price mode; null means "on request". */
  const displayPrice = (item: Tombstone): number | null => {
    if (mode === "head") return item.headBase;
    if (mode === "full") return item.fullSet;
    return item.fullSet === null ? null : item.fullSet + SLAB_PRICE;
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = tombstones.filter((item) => {
      const matchesQuery = !q || item.code.toLowerCase().includes(q);
      const matchesSize = size === ALL_SIZES || item.size === size;
      const reference = item.fullSet ?? item.headBase ?? 0;
      const matchesPrice = reference >= minPrice;
      return matchesQuery && matchesSize && matchesPrice;
    });

    return [...result].sort((a, b) => {
      if (sort === "priceAsc") return (a.fullSet ?? Infinity) - (b.fullSet ?? Infinity);
      if (sort === "priceDesc") return (b.fullSet ?? -1) - (a.fullSet ?? -1);
      return a.code.localeCompare(b.code, undefined, { numeric: true });
    });
  }, [query, size, sort, minPrice]);

  const toggleShortlist = (code: string) =>
    setShortlist((current) =>
      current.includes(code) ? current.filter((value) => value !== code) : [...current, code],
    );

  const shortlisted = tombstones.filter((item) => shortlist.includes(item.code));
  const shortlistTotal = shortlisted.reduce((sum, item) => sum + (displayPrice(item) ?? 0), 0);

  const quoteLink = (item: Tombstone) =>
    wa(
      defaultWhatsapp,
      `Hi Luloyiso, I'd like a quote for tombstone ${item.code} (${item.size ?? "size on request"}).`,
    );

  const sendShortlist = () => {
    const lines = shortlisted.map(
      (item) =>
        `${item.code} (${item.size ?? "size on request"}) — ${
          displayPrice(item) === null ? t.catalogue.priceOnRequest : formatZAR(displayPrice(item) as number)
        }`,
    );
    const message = `Hi Luloyiso, I'd like a shortlist quote:\n${lines.join("\n")}\n${t.catalogue.total}: ${formatZAR(
      shortlistTotal,
    )}`;
    window.open(wa(defaultWhatsapp, message), "_blank", "noopener,noreferrer");
  };

  const modeOptions: { key: PriceMode; label: string }[] = [
    { key: "head", label: t.catalogue.head },
    { key: "full", label: t.catalogue.full },
    { key: "slab", label: t.catalogue.slab },
  ];

  const PremiumBadge = ({ item }: { item: Tombstone }) =>
    (item.fullSet ?? 0) > PREMIUM_THRESHOLD ? (
      <Badge variant="secondary" className="ml-2 bg-accent/20 text-primary">
        {t.catalogue.premium}
      </Badge>
    ) : null;

  return (
    <section id="catalogue" className="py-16 sm:py-24">
      <div className="mx-auto w-[min(1180px,calc(100%-24px))]">
        <SectionHeading eyebrow={t.catalogue.eyebrow} title={t.catalogue.title} sub={t.catalogue.sub} />

        <Card className="mt-10 border-border/70">
          <CardContent className="p-4 sm:p-6">
            {/* Toolbar */}
            <div className="no-print flex flex-wrap items-center gap-3">
              <div className="relative min-w-[180px] flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.catalogue.search}
                  className="pl-9"
                  aria-label={t.catalogue.search}
                />
              </div>

              <Select value={size} onValueChange={setSize}>
                <SelectTrigger className="w-full sm:w-[170px]" aria-label={t.catalogue.size}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_SIZES}>{t.catalogue.allSizes}</SelectItem>
                  {sizes.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={(value) => setSort(value as SortKey)}>
                <SelectTrigger className="w-full sm:w-[210px]" aria-label={t.catalogue.sortCode}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="code">{t.catalogue.sortCode}</SelectItem>
                  <SelectItem value="priceAsc">{t.catalogue.sortPriceAsc}</SelectItem>
                  <SelectItem value="priceDesc">{t.catalogue.sortPriceDesc}</SelectItem>
                </SelectContent>
              </Select>

              <div className="inline-flex rounded-full bg-muted p-1" role="group" aria-label={t.catalogue.table}>
                <button
                  type="button"
                  onClick={() => setView("table")}
                  aria-pressed={view === "table"}
                  className={cn(
                    "focus-ring inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold transition-colors",
                    view === "table" ? "bg-card text-primary shadow-sm" : "text-muted-foreground",
                  )}
                >
                  <Table2 className="h-4 w-4" aria-hidden="true" />
                  {t.catalogue.table}
                </button>
                <button
                  type="button"
                  onClick={() => setView("cards")}
                  aria-pressed={view === "cards"}
                  className={cn(
                    "focus-ring inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold transition-colors",
                    view === "cards" ? "bg-card text-primary shadow-sm" : "text-muted-foreground",
                  )}
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  {t.catalogue.cards}
                </button>
              </div>

              <Button variant="outline" className="rounded-full" onClick={() => window.print()}>
                <Printer className="h-4 w-4" aria-hidden="true" />
                {t.catalogue.print}
              </Button>

              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => setShortlistOpen(true)}
                aria-haspopup="dialog"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                {t.catalogue.shortlist} ({shortlist.length})
              </Button>
            </div>

            {/* Price mode + range */}
            <div className="no-print mt-4 flex flex-wrap items-center gap-4">
              <div className="inline-flex rounded-full bg-muted p-1" role="group" aria-label={t.catalogue.head}>
                {modeOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setMode(option.key)}
                    aria-pressed={mode === option.key}
                    className={cn(
                      "focus-ring rounded-full px-3 py-2 text-sm font-bold transition-colors",
                      mode === option.key ? "bg-card text-primary shadow-sm" : "text-muted-foreground",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <span className="text-sm font-semibold text-muted-foreground">
                {t.catalogue.slab}: +{formatZAR(SLAB_PRICE)}
              </span>

              <div className="flex min-w-[240px] flex-1 items-center gap-3">
                <label htmlFor="price-range" className="whitespace-nowrap text-sm font-semibold text-muted-foreground">
                  {formatZAR(minPrice)}
                </label>
                <input
                  id="price-range"
                  type="range"
                  min={priceBounds.min}
                  max={priceBounds.max}
                  step={1000}
                  value={minPrice}
                  onChange={(event) => setMinPrice(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer accent-[hsl(var(--primary))]"
                />
                <span className="whitespace-nowrap text-sm text-muted-foreground">+</span>
              </div>
            </div>

            <p className="no-print mt-4 text-sm text-muted-foreground">
              {filtered.length} {t.catalogue.showing}
            </p>

            {/* Table view */}
            {view === "table" ? (
              <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                <Table className="min-w-[760px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.catalogue.code}</TableHead>
                      <TableHead>{t.catalogue.size}</TableHead>
                      <TableHead>{t.catalogue.head}</TableHead>
                      <TableHead>{t.catalogue.full}</TableHead>
                      <TableHead>{t.catalogue.slab}</TableHead>
                      <TableHead className="no-print" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((item) => {
                      const slabTotal = item.fullSet === null ? null : item.fullSet + SLAB_PRICE;
                      return (
                        <TableRow key={item.code} className="odd:bg-muted/30">
                          <TableCell className="font-bold text-primary">
                            {item.code}
                            <PremiumBadge item={item} />
                          </TableCell>
                          <TableCell>{item.size ?? t.catalogue.sizeOnRequest}</TableCell>
                          <TableCell className={cn(mode === "head" && "bg-secondary/70 font-semibold")}>
                            {item.headBase === null ? t.catalogue.priceOnRequest : formatZAR(item.headBase)}
                          </TableCell>
                          <TableCell className={cn(mode === "full" && "bg-secondary/70 font-semibold")}>
                            {item.fullSet === null ? t.catalogue.priceOnRequest : formatZAR(item.fullSet)}
                          </TableCell>
                          <TableCell className={cn(mode === "slab" && "bg-secondary/70")}>
                            {slabTotal === null ? (
                              <>
                                <span className="font-semibold text-primary">{t.catalogue.priceOnRequest}</span>
                                <a
                                  href={`tel:${contact.phones[0].tel}`}
                                  className="focus-ring mt-1 block text-xs font-semibold text-royal underline"
                                >
                                  {t.catalogue.callQuote}
                                </a>
                              </>
                            ) : (
                              <span className="font-semibold text-foreground">{formatZAR(slabTotal)}</span>
                            )}
                          </TableCell>
                          <TableCell className="no-print">
                            <Button asChild size="sm" className="rounded-full">
                              <a href={quoteLink(item)} target="_blank" rel="noopener noreferrer">
                                {t.catalogue.quote}
                              </a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {filtered.length === 0 && <p className="p-8 text-center text-muted-foreground">{t.catalogue.empty}</p>}
              </div>
            ) : (
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((item) => {
                  const price = displayPrice(item);
                  const isShortlisted = shortlist.includes(item.code);
                  return (
                    <Card key={item.code} className="overflow-hidden border-border/70">
                      <TombstonePhoto code={item.code} label={t.catalogue.photoSoon} />
                      <CardContent className="p-5">
                        <div className="flex items-center">
                          <Badge variant="secondary">{item.code}</Badge>
                          <PremiumBadge item={item} />
                        </div>
                        <h3 className="mt-3 text-lg font-bold text-primary">
                          {item.size ?? t.catalogue.sizeOnRequest}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {mode === "head" ? t.catalogue.head : mode === "full" ? t.catalogue.full : t.catalogue.slab}:{" "}
                          {price === null ? (
                            <span className="font-semibold text-primary">{t.catalogue.priceOnRequest}</span>
                          ) : (
                            <span className="font-semibold text-foreground">{formatZAR(price)}</span>
                          )}
                        </p>
                        <div className="no-print mt-4 flex flex-wrap gap-2">
                          <Button asChild size="sm" className="flex-1 rounded-full">
                            <a href={quoteLink(item)} target="_blank" rel="noopener noreferrer">
                              {t.catalogue.quote}
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            variant={isShortlisted ? "secondary" : "outline"}
                            className="flex-1 rounded-full"
                            onClick={() => toggleShortlist(item.code)}
                            aria-pressed={isShortlisted}
                          >
                            {isShortlisted ? t.catalogue.remove : t.catalogue.addShortlist}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                {filtered.length === 0 && (
                  <p className="col-span-full p-8 text-center text-muted-foreground">{t.catalogue.empty}</p>
                )}
              </div>
            )}

            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{t.catalogue.disclaimer}</p>
          </CardContent>
        </Card>
      </div>

      {/* Shortlist drawer */}
      <Sheet open={shortlistOpen} onOpenChange={setShortlistOpen}>
        <SheetContent className="flex w-full flex-col sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{t.catalogue.shortlist}</SheetTitle>
            <SheetDescription>{t.catalogue.sub}</SheetDescription>
          </SheetHeader>

          <div className="mt-4 flex-1 overflow-y-auto">
            {shortlisted.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">{t.catalogue.empty}</p>
            ) : (
              shortlisted.map((item) => (
                <div
                  key={item.code}
                  className="flex items-center justify-between gap-3 border-b border-border py-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-primary">{item.code}</p>
                    <p className="text-xs text-muted-foreground">{item.size ?? t.catalogue.sizeOnRequest}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">
                      {displayPrice(item) === null ? t.catalogue.priceOnRequest : formatZAR(displayPrice(item) as number)}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleShortlist(item.code)}
                      className="focus-ring rounded p-1 text-muted-foreground hover:text-destructive"
                      aria-label={`${t.catalogue.remove} ${item.code}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <SheetFooter className="mt-4 flex-col gap-3 sm:flex-col">
            <div className="flex items-center justify-between text-base font-extrabold text-primary">
              <span>{t.catalogue.total}</span>
              <span>{formatZAR(shortlistTotal)}</span>
            </div>
            <Button className="w-full rounded-full" onClick={sendShortlist} disabled={shortlisted.length === 0}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t.catalogue.sendShortlist}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </section>
  );
}
