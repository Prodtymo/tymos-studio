import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { useT } from "../lib/i18n";

export function Faq() {
  const { t } = useT();

  return (
    <section id="faq" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-soft">
            {t("faq_kicker")}
          </span>
          <h2 className="font-display text-balance mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem]">
            {t("faq_title")}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">{t("faq_desc")}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface/60">
          {[1, 2, 3, 4, 5].map((n) => (
            <details key={n} className="group px-5 py-4 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                {t(`faq_q${n}`)}
                <ChevronDown className="h-4 w-4 shrink-0 text-accent-soft transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 max-w-[60ch] text-[14px] leading-relaxed text-ink-dim">{t(`faq_a${n}`)}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
