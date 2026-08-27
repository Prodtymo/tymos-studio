import { Reveal } from "./Reveal";
import { useT } from "../lib/i18n";

export function StatsBar() {
  const { t } = useT();

  const stats = [
    { num: t("hero_stat_1_num"), label: t("hero_stat_1_label") },
    { num: t("hero_stat_2_num"), label: t("hero_stat_2_label") },
    { num: t("hero_stat_3_num"), label: t("hero_stat_3_label") },
  ];

  return (
    <section className="border-t border-border">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-border px-5 sm:px-8">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 py-8 text-center sm:py-10">
            <div className="font-mono text-2xl font-bold tracking-tight text-ink sm:text-3xl">{s.num}</div>
            <div className="text-[12px] text-ink-faint">{s.label}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
