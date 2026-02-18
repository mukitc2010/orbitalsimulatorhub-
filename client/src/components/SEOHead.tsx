import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { getSEOConfig } from "../data/seo-config";

const DEFAULT_TITLE = "Orbital Simulator Hub – Learn Space, Satellites & NASA Science";
const DEFAULT_DESCRIPTION = "Learn orbital mechanics, satellites, aerospace engineering, AI in space, NASA missions, and real simulations. Interactive space simulator for students, engineers, and researchers.";
const SITE_URL = "https://orbitalsimulatorhub.com";

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

    document.title = title;
    prevTitle.current = title;

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("og:title", ogTitle, true);
    setMeta("og:description", ogDescription, true);
    setMeta("og:url", `${SITE_URL}${cleanPath || "/"}`, true);
    setMeta("og:type", "website", true);

    return () => {
      document.title = prevTitle.current;
    };
  }, [cleanPath]);

  return null;
}
