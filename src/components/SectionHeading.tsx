import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, sub, align = "left", children }: Props) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-royal">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
        {title}
      </h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{sub}</p>}
      {children}
    </div>
  );
}
