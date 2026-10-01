import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Language } from "@/data/scheme";
import { translations, type Dict } from "@/data/translations";

type LanguageContextValue = {
  lang: Language;
  /** Translation dictionary for the active language. */
  t: Dict;
  setLang: (lang: Language) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: translations[lang],
      setLang,
      toggle: () => setLang((current) => (current === "en" ? "xh" : "en")),
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return context;
}
