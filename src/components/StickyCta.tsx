import { useEffect, useState } from "react";
import { useT } from "../lib/i18n";

export function StickyCta() {
  const { t } = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    const booking = document.getElementById("booking");
    const footer = document.getElementById("contact");
    if (!hero || !booking) return;
    let pastHero = false;
    let atBooking = false;
    let atFooter = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) pastHero = !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
        if (entry.target === booking) atBooking = entry.isIntersecting;
        if (entry.target === footer) atFooter = entry.isIntersecting;
      }
      setVisible(pastHero && !atBooking && !atFooter);
    });
    observer.observe(hero);
    observer.observe(booking);
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;
  return (
    <a href="#booking" className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 rounded-full bg-accent-2 px-4 py-3.5 text-center text-[14px] font-semibold text-white shadow-xl md:hidden">
      {t("sticky_cta")}
    </a>
  );
}
