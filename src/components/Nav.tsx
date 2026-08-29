import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useT } from "../lib/i18n";
import { cn } from "../lib/utils";
import { LogoMark } from "./LogoMark";

const LINKS = [
  { href: "#about", key: "nav_about" },
  { href: "#gallery", key: "nav_home" },
  { href: "#music", key: "nav_music" },
  { href: "#pricing", key: "nav_pricing" },
  { href: "#reviews", key: "nav_reviews" },
  { href: "#contact", key: "nav_contact" },
];

// Sections that only exist on the homepage. On any other route, links to
// these hashes need to go back to "/" first instead of being a no-op.
const HOME_ONLY_HASHES = new Set(["#home", "#about", "#gallery", "#music", "#pricing", "#reviews", "#booking"]);

export function Nav() {
  const { t, lang, setLang } = useT();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const toHref = (hash: string) => (pathname === "/" || !HOME_ONLY_HASHES.has(hash) ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-border bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href={toHref("#home")} className="flex items-center gap-3 font-display text-[15px] font-semibold tracking-tight text-ink">
          <LogoMark className="h-10 w-10 text-ink" />
          Tymo's <span className="text-accent-soft">Studio</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={toHref(l.href)}
                className="text-[13px] font-medium text-ink-dim transition-colors duration-200 hover:text-ink"
              >
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-border bg-surface-2/60 p-0.5 text-[11px] font-semibold">
            {(["sk", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  "rounded-full px-2.5 py-1 uppercase transition-colors duration-200",
                  lang === l ? "bg-accent-2 text-white" : "text-ink-faint hover:text-ink-dim"
                )}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href={toHref("#booking")}
            className="hidden rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-bg transition-transform duration-200 active:scale-[0.97] sm:inline-block"
          >
            {t("nav_book")}
          </a>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg/95 px-5 py-5 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={toHref(l.href)}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-ink"
                >
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between">
            <div className="inline-flex items-center rounded-full border border-border bg-surface-2/60 p-0.5 text-[11px] font-semibold">
              {(["sk", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={cn(
                    "rounded-full px-2.5 py-1 uppercase",
                    lang === l ? "bg-accent-2 text-white" : "text-ink-faint"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            <a
              href={toHref("#booking")}
              onClick={() => setOpen(false)}
              className="rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-bg"
            >
              {t("nav_book")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
