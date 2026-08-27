import { Reveal } from "./Reveal";
import { useT } from "../lib/i18n";

export function About() {
  const { t } = useT();
  const tags = [t("about_tag_1"), t("about_tag_2"), t("about_tag_3")];

  return (
    <section id="about" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal>
          <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem] sm:leading-[1.05]">
            {t("about_title")}
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-dim sm:text-base">{t("about_p1")}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-dim sm:text-base">{t("about_p2")}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface-2/60 px-3 py-1.5 text-[12px] font-medium text-ink-dim"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img
              src="/images/about/desk-setup.jpg"
              alt="Studio production desk with monitors, MIDI controller, and Universal Audio interface"
              className="aspect-[4/5] w-full object-cover sm:aspect-[4/3]"
              loading="lazy"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
