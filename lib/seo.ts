import type { Metadata } from "next";
import { contactInfo } from "@/lib/content";
import {
  getServiceBySlug,
  serviceCategories,
  type ServiceDetail
} from "@/lib/services-data";

export const SITE_URL = "https://borntoblossom.in";
export const SITE_NAME = "Born to Blossom Soul Awakening";
export const DEFAULT_OG_IMAGE = "/images/logo.png";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  keywords = [],
  noIndex = false
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const fullTitle = title.includes(SITE_NAME) || title.includes("Born to Blossom")
    ? title
    : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical: url
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl]
    }
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "Born to Blossom",
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: absoluteUrl(DEFAULT_OG_IMAGE),
    description:
      "Multi-modality healing sanctuary in Gurgaon offering Family Constellation, Reiki, Sound Healing, Humkaara, Hleem, and 20+ modalities — in person and online worldwide.",
    email: contactInfo.email,
    telephone: contactInfo.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gurgaon",
      addressRegion: "Haryana",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.4595,
      longitude: 77.0266
    },
    areaServed: [
      { "@type": "City", name: "Gurgaon" },
      { "@type": "AdministrativeArea", name: "Delhi NCR" },
      { "@type": "Country", name: "India" },
      "Worldwide"
    ],
    sameAs: [
      contactInfo.instagramPrimary,
      contactInfo.instagramHealing,
      contactInfo.youtube,
      contactInfo.website
    ],
    priceRange: "$$",
    foundingDate: "2015",
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/about/founder#person`,
      name: "Sonia Verma Bhattacharyya"
    }
  };
}

export function founderPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/about/founder#person`,
    name: "Sonia Verma Bhattacharyya",
    jobTitle: "Founder & Healing Practitioner",
    description:
      "Founder of Born to Blossom Soul Awakening in Gurgaon. Certified across 20+ healing modalities and developer of the original modalities Humkaara and Hleem.",
    url: absoluteUrl("/about/founder"),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gurgaon",
      addressRegion: "Haryana",
      addressCountry: "IN"
    },
    sameAs: [
      contactInfo.instagramPrimary,
      contactInfo.instagramHealing,
      contactInfo.youtube
    ],
    knowsAbout: [
      "Family Constellation Therapy",
      "Reiki",
      "Humkaara",
      "Hleem",
      "Sound Healing",
      "Quantum Belief Reprogramming",
      "Energy Healing"
    ]
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function serviceJsonLd(service: ServiceDetail) {
  const category = serviceCategories.find((c) => c.id === service.categoryId);
  const url = absoluteUrl(`/services/${service.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    alternateName: service.shortTitle,
    description: service.summary,
    url,
    image: absoluteUrl(service.image ?? DEFAULT_OG_IMAGE),
    serviceType: category?.title ?? "Healing modality",
    category: category?.title,
    provider: {
      "@type": "HealthAndBeautyBusiness",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gurgaon",
        addressRegion: "Haryana",
        addressCountry: "IN"
      },
      telephone: contactInfo.phone
    },
    areaServed: [
      { "@type": "City", name: "Gurgaon" },
      { "@type": "Country", name: "India" },
      "Worldwide"
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      serviceLocation: {
        "@type": "Place",
        name: "Gurgaon, NCR & Online"
      }
    },
    termsOfService: absoluteUrl("/faq"),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url,
      priceCurrency: "INR",
      description: `${service.duration} · ${service.format}`
    }
  };
}

export function faqPageJsonLd(
  items: ReadonlyArray<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: "Where healing meets homecoming.",
    publisher: {
      "@id": `${SITE_URL}/#organization`
    },
    inLanguage: "en-IN"
  };
}

/** Resolve a service for metadata helpers without importing page code */
export function getServiceSeo(slug: string) {
  return getServiceBySlug(slug);
}
