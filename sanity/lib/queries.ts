import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    author,
    category,
    excerpt,
    publishedAt,
    mainImage
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    author,
    category,
    excerpt,
    publishedAt,
    mainImage,
    body
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const recentPostsQuery = groq`
  *[_type == "post" && defined(slug.current) && slug.current != $slug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    author,
    category,
    excerpt,
    publishedAt,
    mainImage
  }
`;
