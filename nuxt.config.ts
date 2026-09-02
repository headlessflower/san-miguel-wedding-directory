// nuxt.config.ts
import { readdir } from "node:fs/promises";
import { join } from "node:path";

// Import your seed data + taxonomies (adjust paths to your project)
import { SEED_VENUES } from "./app/data/listings.seed";
import { VENDOR_CATEGORIES } from "./app/data/taxonomies";

function stripExt(name: string) {
  return name.replace(/\.(md|mdx)$/i, "");
}

const gtagId = process.env.NUXT_PUBLIC_GTAG_ID || "G-3M64D0STY7";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  css: ["~/assets/css/tokens.css", "~/assets/css/main.css", "~/assets/css/base.css", "~/assets/css/utilities.css", "~/assets/css/editorial.css"],

  modules: ["@nuxt/image", "@nuxtjs/i18n", "@nuxtjs/seo", "@nuxtjs/sitemap", "@nuxt/content", "nuxt-gtag"],

  image: {
    // Static deploys currently do not publish generated /_ipx assets. Keep
    // NuxtImg's sizing/loading behavior while serving source files directly.
    provider: "none",
    format: ["webp"],
    quality: 80,
  },

  gtag: {
    id: gtagId,
    enabled: true,
  },

  // Swap once your domain is final
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    name: "San Miguel Wedding Venues",
    description:
      "Bilingual directory of wedding venues and wedding vendors in San Miguel de Allende.",
    defaultLocale: "en",
  },

  i18n: {
    strategy: "prefix",
    customRoutes: "config",
    defaultLocale: "en",
    langDir: "locales",


    locales: [
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
      { code: "es", iso: "es-MX", file: "es.json", name: "Español" },
    ],

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "sma_wedding_lang",
      redirectOn: "root",
      alwaysRedirect: false,
      fallbackLocale: "en",
    },

    // Localized route paths for Spanish SEO
    pages: {
      index: { en: "/", es: "/" },

      "wedding-venues/index": {
        en: "/wedding-venues",
        es: "/lugares-para-bodas",
      },
      "wedding-venues/[slug]": {
        en: "/wedding-venues/[slug]",
        es: "/lugares-para-bodas/[slug]",
      },

      "vendors/index": {
        en: "/vendors",
        es: "/proveedores",
      },
      "vendors/[category]/index": {
        en: "/vendors/[category]",
        es: "/proveedores/[category]",
      },
      "vendors/[category]/[slug]": {
        en: "/vendors/[category]/[slug]",
        es: "/proveedores/[category]/[slug]",
      },

      "blog/index": {
        en: "/blog",
        es: "/blog",
      },
      "blog/[slug]": {
        en: "/blog/[slug]",
        es: "/blog/[slug]",
      },

      advertise: {
        en: "/advertise",
        es: "/publicidad",
      },
      "advertise-with-us": {
        en: "/advertise-with-us",
        es: "/anunciate-con-nosotros",
      },
      faq: {
        en: "/faq",
        es: "/preguntas-frecuentes",
      },
      newsletter: {
        en: "/newsletter",
        es: "/newsletter",
      },
      about: {
        en: "/about",
        es: "/acerca",
      },
      contact: {
        en: "/contact",
        es: "/contacto",
      },
    },
  },

  sitemap: {
    // Dynamic routes for sitemap
    urls: async () => {
      const out: { loc: string }[] = [];

      // Static localized routes
      const staticPaths = [
        { en: "/", es: "/" },
        { en: "/wedding-venues", es: "/lugares-para-bodas" },
        { en: "/vendors", es: "/proveedores" },
        { en: "/blog", es: "/blog" },
        { en: "/advertise", es: "/publicidad" },
        { en: "/advertise-with-us", es: "/anunciate-con-nosotros" },
        { en: "/faq", es: "/preguntas-frecuentes" },
        { en: "/about", es: "/acerca" },
        { en: "/newsletter", es: "/newsletter" },
      ];
      for (const p of staticPaths) {
        out.push({ loc: `/en${p.en === "/" ? "" : p.en}` });
        out.push({ loc: `/es${p.es === "/" ? "" : p.es}` });
      }

      // Venue detail pages
      for (const v of SEED_VENUES) {
        out.push({ loc: `/en/wedding-venues/${v.slug}` });
        out.push({ loc: `/es/lugares-para-bodas/${v.slug}` });
      }

      // Vendor category pages
      for (const c of VENDOR_CATEGORIES) {
        out.push({ loc: `/en/vendors/${c.slug.en}` });
        out.push({ loc: `/es/proveedores/${c.slug.es}` });
      }

      // Blog posts: read filenames from /content/blog/en + /content/blog/es
      const blogEnDir = join(process.cwd(), "content", "blog", "en");
      const blogEsDir = join(process.cwd(), "content", "blog", "es");

      try {
        const enFiles = await readdir(blogEnDir);
        for (const f of enFiles) {
          if (!/\.(md|mdx)$/i.test(f)) continue;
          out.push({ loc: `/en/blog/${stripExt(f)}` });
        }
      } catch {}

      try {
        const esFiles = await readdir(blogEsDir);
        for (const f of esFiles) {
          if (!/\.(md|mdx)$/i.test(f)) continue;
          out.push({ loc: `/es/blog/${stripExt(f)}` });
        }
      } catch {}

      return out;
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      meta: [{ name: "theme-color", content: "#f2f2f0" }],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        {
          async: true,
          src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4237793976332563",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  content: {},
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true, // or false if you fully list routes
      failOnError: false,
      routes: [
        '/en',
        '/es',
        '/en/wedding-venues',
        '/es/lugares-para-bodas',
        '/en/vendors',
        '/es/proveedores',
        ...SEED_VENUES.flatMap(v => [
          `/en/wedding-venues/${v.slug}`,
          `/es/lugares-para-bodas/${v.slug}`,
        ]),
        ...VENDOR_CATEGORIES.flatMap(c => [
          `/en/vendors/${c.slug.en}`,
          `/es/proveedores/${c.slug.es}`,
        ]),
      ],
    },
  },
});
