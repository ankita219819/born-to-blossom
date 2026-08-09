import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllServiceSlugs,
  getServiceBySlug,
  serviceCategories
} from "@/lib/services-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, serviceJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return buildPageMetadata({
      title: "Service",
      description: "Healing services at Born to Blossom Soul Awakening.",
      path: `/services/${slug}`,
      noIndex: true
    });
  }

  const category = serviceCategories.find((c) => c.id === service.categoryId);

  return buildPageMetadata({
    title: service.title,
    description: `${service.summary} ${service.duration}. ${service.format}. Healing in Gurgaon and online across India.`,
    path: `/services/${service.slug}`,
    image: service.image,
    keywords: [
      service.title,
      service.shortTitle,
      category?.title ?? "",
      `${service.title} Gurgaon`,
      "Born to Blossom",
      "energy healing India"
    ].filter(Boolean)
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <Navbar />
      <main className="md:pt-24">
        <ServiceDetailView service={service} />
      </main>
      <Footer />
    </>
  );
}

export const dynamicParams = false;
