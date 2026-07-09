import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
};

export type BlogPostListItem = {
  _id: string;
  title: string;
  slug: string;
  author?: string;
  category?: string;
  excerpt?: string;
  publishedAt?: string;
  mainImage?: SanityImage;
};

export type BlogPost = BlogPostListItem & {
  body?: PortableTextBlock[];
};

export function formatPostDate(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric"
  });
}
