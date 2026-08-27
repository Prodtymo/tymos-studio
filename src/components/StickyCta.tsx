import { useEffect, useState } from "react";
import { useT } from "../lib/i18n";
import { cn } from "../lib/utils";

export function StickyCta() {
  const { t } = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "-15% 0px 0px 0px",
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="#booking"
      className={cn(
        "fixed inset-x-4 bottom-4 z-50 rounded-full bg-accent-2 px-4 py-3.5 text-center text-[14px] font-semibold text-white shadow-[0_18px_40px_-14px_var(--color-accent-glow)] transition-opacity duration-300 md:hidden",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      {t("sticky_cta")}
    </a>
  );
}
