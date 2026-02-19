import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { getSEOConfig } from "../data/seo-config";

const DEFAULT_TITLE = "Orbital Simulator Hub – #1 Space Research & Learning Platform | Global Authority";
const DEFAULT_DESCRIPTION = "Free interactive 3D satellite orbit simulator. Learn orbital mechanics, space missions, astronaut database, planet explorer, aerospace engineering, AI in space. For students, researchers, and PhD scientists.";
const SITE_URL = "https://www.orbitalsimulatorhub.com";
const SITE_NAME = "Orbital Simulator Hub";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function SEOHead() {
  const [path] = useLocation();
  const cleanPath = path.split("?")[0].split("#")[0];
  const prevTitle = useRef(document.title);

  useEffect(() => {
    const config = getSEOConfig(cleanPath);
    const title = config?.title ?? DEFAULT_TITLE;
    const description = config?.description ?? DEFAULT_DESCRIPTION;
    const keywords = config?.keywords ?? "";
    const ogTitle = config?.ogTitle ?? config?.title ?? title;
    const ogDescription = config?.ogDescription ?? config?.description ?? description;
    const fullUrl = `${SITE_URL}${cleanPath || "/"}`;

    document.title = title;
    prevTitle.current = title;

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    setMeta("og:title", ogTitle, true);
    setMeta("og:description", ogDescription, true);
    setMeta("og:url", fullUrl, true);
    setMeta("og:type", "website", true);
    setMeta("og:image", OG_IMAGE, true);
    setMeta("og:site_name", "Orbital Simulator Hub", true);
    setMeta("og:locale", "en_US", true);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", ogTitle);
    setMeta("twitter:description", ogDescription);
    setMeta("twitter:image", OG_IMAGE);

    setLink("canonical", fullUrl);

    const breadcrumbItems: { name: string; item: string }[] = [
      { name: "Home", item: SITE_URL + "/" },
    ];
    const segments = cleanPath.split("/").filter(Boolean);
    let accumulated = "";
    for (const seg of segments) {
      accumulated += "/" + seg;
      const label = seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      breadcrumbItems.push({ name: label, item: SITE_URL + accumulated });
    }
    if (breadcrumbItems.length > 1) {
      setJsonLd("seo-breadcrumb", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: b.item,
        })),
      });
    }

    return () => {
      document.title = prevTitle.current;
    };
  }, [cleanPath]);

  return null;
}
