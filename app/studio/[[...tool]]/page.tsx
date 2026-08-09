import { NextStudio } from "next-sanity/studio";
import type { Metadata } from "next";
import { metadata as studioMetadata, viewport } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export { viewport };

export const metadata: Metadata = {
  ...studioMetadata,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  },
  title: "Studio | Born to Blossom",
  description: "Sanity Studio for Born to Blossom content.",
  alternates: {
    canonical: "https://borntoblossom.in/studio"
  }
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
