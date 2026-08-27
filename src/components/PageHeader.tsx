import { Link } from "react-router-dom";
import { useT } from "../lib/i18n";
import { cn } from "../lib/utils";
import { LogoMark } from "./LogoMark";

export function PageHeader() {
  const { lang, setLang } = useT();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-3 font-display text-[15px] font-semibold tracking-tight text-ink">
          <LogoMark className="h-10 w-10 text-ink" />
          Tymo's <span className="text-accent-soft">Studio</span>
        </Link>

        <div className="flex items-center rounded-full border border-border bg-surface-2/60 p-0.5 text-[11px] font-semibold">
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
      </nav>
    </header>
  );
}
