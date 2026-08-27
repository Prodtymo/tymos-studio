import { useEffect } from "react";
import { Reveal } from "./Reveal";
import { useT } from "../lib/i18n";

declare global {
  interface Window {
    Cal?: any;
  }
}

export function Booking() {
  const { t, lang } = useT();
  const namespace = lang === "sk" ? "studio-recording-session" : "recording-session";
  const selector = `#my-cal-inline-${namespace}`;

  useEffect(() => {
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

    const el = document.querySelector(selector);
    if (el) el.innerHTML = "";

    window.Cal.ns[namespace]("inline", {
      elementOrSelector: selector,
      config: { layout: "month_view", theme: "dark" },
      calLink: `prodtymo/${namespace}`,
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
  }, [lang, namespace, selector]);

  return (
    <section id="booking" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-balance text-3xl font-bold tracking-tight text-ink sm:text-[2.75rem]">
            {t("booking_title")}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">{t("booking_desc")}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            key={lang}
            id={`my-cal-inline-${namespace}`}
            className="mt-12 w-full overflow-hidden rounded-2xl border border-border bg-surface/60"
            style={{ width: "100%", minHeight: "600px" }}
          />
        </Reveal>
      </div>
    </section>
  );
}
