import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { useT } from "../lib/i18n";

declare global { interface Window { Cal?: any } }
let embedInstance = 0;
export function Booking() {
  const { t, lang } = useT();
  const event = lang === "sk" ? "studio-recording-session" : "recording-session";
  const selector = `#booking-calendar-${lang}`;
  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el || el.getAttribute("data-initialized") === "true") return;
    el.setAttribute("data-initialized", "true");
    const namespace = `${event}-${++embedInstance}`;
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: any[]) {
          const cal = C.Cal;
          const ar = args;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function (...apiArgs: any[]) {
              p(api, apiArgs);
            };
            const ns = ar[1];
            api.q = api.q || [];
            if (typeof ns === "string") {
              cal.ns[ns] = cal.ns[ns] || api;
              p(cal.ns[ns], ar);
              p(cal, ["initNamespace", ns]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", namespace, { origin: "https://app.cal.com" });


    window.Cal.ns[namespace]("inline", {
      elementOrSelector: selector,
      config: { layout: "month_view", theme: "dark" },
      calLink: `prodtymo/${event}`,
    });

    // Read the live --color-accent token instead of duplicating its hex
    // value here, so the Cal.com embed's brand color can't drift out of
    // sync with the design system if the token ever changes.
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || "#7c5cff";

    window.Cal.ns[namespace]("ui", {
      theme: "dark",
      cssVarsPerTheme: { dark: { "cal-brand": accentColor } },
      hideEventTypeDetails: false,
      layout: "month_view",
      useSlotsViewOnSmallScreen: true,
    });
  }, [event, selector]);

  return (
    <section id="booking" className="border-t border-border py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-[2.75rem]">{t("booking_title")}</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-dim">{t("booking_desc")}</p>
        </Reveal>
        <p className="mt-6 text-center text-sm text-ink-dim">
          {lang === "sk" ? "Chceš celý balíček s mixom, masterom a beatom? " : "Want the full package with a mix, master and beat? "}
          <Link to="/one-stop" className="text-accent-soft underline">One-Stop · €199</Link>
        </p>
        <p className="mt-5 text-center text-sm text-ink-dim">
          {lang === "sk" ? "Kalendár sa nenačítal? " : "Calendar not loading? "}
          <a href={`https://cal.com/prodtymo/${event}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-accent-soft underline">{lang === "sk" ? "Otvoriť rezerváciu v novom okne" : "Open booking in a new window"}</a>
        </p>
        <div key={lang} id={`booking-calendar-${lang}`} className="mt-10 min-h-[720px] w-full overflow-hidden rounded-2xl border border-border bg-surface" />

      </div>
    </section>
  );
}
