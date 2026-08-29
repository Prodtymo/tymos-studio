import { Hourglass, ThumbsDown, TrendingDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { useT } from "../lib/i18n";

const ICONS = [TrendingDown, ThumbsDown, Hourglass] as const;

export function Problem() {
  const { t } = useT();
  const costs = [1, 2, 3].map((n) => ({
    Icon: ICONS[n - 1],
    title: t(`problem_cost${n}_title`),
    desc: t(`problem_cost${n}_desc`),
  }));

  return (
    <section id="problem" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-soft">
            {t("problem_kicker")}
          </span>
          <h2 className="font-display text-balance mt-4 text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem]">
            {t("problem_title")}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">{t("problem_desc")}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {costs.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-2/60 text-ink-dim">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[15px] font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-faint">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
