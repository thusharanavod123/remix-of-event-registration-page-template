import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type SeoPage = { title: string; description: string; robots?: string };

const pages: Record<string, SeoPage> = {
  "/": { title: "Elladria Lanka | European Jobs for Sri Lankans", description: "Find trusted jobs in Romania and across Europe with Elladria Lanka. Get support with recruitment, documents, visas, travel, and appointments." },
  "/vacancies": { title: "European Job Vacancies for Sri Lankans | Elladria Lanka", description: "Explore current European job vacancies for Sri Lankan candidates, including driving, factory, warehouse, and logistics opportunities." },
  "/about": { title: "About Elladria Lanka | International Recruitment", description: "Learn about Elladria Lanka, a Sri Lankan international recruitment company connecting local talent with trusted employers and opportunities abroad." },
  "/careers": { title: "Careers at Elladria Lanka | Join Our Team", description: "Explore career opportunities at Elladria Lanka and join the team helping Sri Lankan professionals build rewarding international careers." },
  "/privacy-policy": { title: "Privacy Policy | Elladria Lanka", description: "Read how Elladria Lanka collects, uses, shares, retains, and protects personal information, including data used for Google sign-in." },
  "/auth": { title: "Sign In | Elladria Lanka", description: "Sign in to Elladria Lanka.", robots: "noindex, nofollow" },
  "/reset-password": { title: "Reset Password | Elladria Lanka", description: "Reset your Elladria Lanka password.", robots: "noindex, nofollow" },
  "/admin": { title: "Administration | Elladria Lanka", description: "Elladria Lanka administration.", robots: "noindex, nofollow" },
};

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pages[pathname] ?? { title: "Page Not Found | Elladria Lanka", description: "The requested page could not be found.", robots: "noindex, nofollow" };
    const origin = window.location.origin;
    const canonicalUrl = `${origin}${pathname === "/" ? "/" : pathname}`;
    const imageUrl = `${origin}/og-image.jpg`;

    document.title = page.title;
    setMeta('meta[name="description"]', "name", "description", page.description);
    setMeta('meta[name="robots"]', "name", "robots", page.robots ?? "index, follow, max-image-preview:large");
    setMeta('meta[property="og:title"]', "property", "og:title", page.title);
    setMeta('meta[property="og:description"]', "property", "og:description", page.description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", imageUrl);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", page.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", page.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", imageUrl);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let schema = document.head.querySelector<HTMLScriptElement>("#organization-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "organization-schema";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EmploymentAgency",
      name: "Elladria Lanka",
      url: origin,
      logo: `${origin}/favicon.png`,
      image: imageUrl,
      description: pages["/"].description,
      areaServed: ["Sri Lanka", "Europe", "Romania"],
      sameAs: ["https://web.facebook.com/Elladrialanka/", "https://www.tiktok.com/@elladria.lanka.of"],
    });
  }, [pathname]);

  return null;
}
