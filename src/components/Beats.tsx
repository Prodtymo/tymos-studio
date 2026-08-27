import { Music2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { useT } from "../lib/i18n";

export function Beats() {
  const { t } = useT();

  return (
    <section id="beats" className="border-t border-border py-20">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <h3 className="font-display text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">{t("beats_title")}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-dim">{t("beats_desc")}</p>
          <a
            href="https://www.beatstars.com/prodtymo/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-3 text-[14px] font-semibold text-accent-soft transition-colors duration-200 hover:bg-accent/15"
          >
            <Music2 className="h-4 w-4" />
            {t("beats_cta")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
