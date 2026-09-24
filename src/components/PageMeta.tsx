import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useT } from "../lib/i18n";

import pageData from "../lib/page-meta.json";
const pages: Record<string, string[]> = pageData;

export function PageMeta() {
  const { pathname: rawPathname } = useLocation();
  const pathname = rawPathname.replace(/\/+$/, "") || "/";
  const { lang } = useT();
  useEffect(() => {
    const page = pages[pathname];
    const title = `${page ? page[lang === "sk" ? 0 : 1] : lang === "sk" ? "Stránka sa nenašla" : "Page not found"} | Tymo's Studio`;
    const description = page?.[lang === "sk" ? 2 : 3] ?? "Tymo's Studio";
    document.title = title;
    const set = (key: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let node = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!node) { node = document.createElement("meta"); node.setAttribute(attr, key); document.head.appendChild(node); }
      node.content = content;
    };
    set("description", description);
    set("og:title", title, true); set("og:description", description, true);
    set("og:url", `https://tymostudio.com${pathname}`, true);
    set("og:locale", lang === "sk" ? "sk_SK" : "en_US", true);
    set("og:locale:alternate", lang === "sk" ? "en_US" : "sk_SK", true);
    set("twitter:title", title); set("twitter:description", description);
    set("robots", !page || pathname === "/welcome" ? "noindex,follow" : "index,follow");
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", `https://tymostudio.com${pathname}`);
  }, [pathname, lang]);
  return null;
}
