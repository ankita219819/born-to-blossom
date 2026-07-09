import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, UserRound } from "lucide-react";
import { BlogPortableText } from "@/components/blog/BlogPortableText";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postBySlugQuery, postSlugsQuery, recentPostsQuery } from "@/sanity/lib/queries";
import { formatPostDate, type BlogPost, type BlogPostListItem } from "@/sanity/lib/types";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  try {
    return await client.fetch<BlogPost | null>(postBySlugQuery, { slug });
  } catch {
    return null;
  }
}

async function getRecentPosts(slug: string) {
  try {
    return await client.fetch<BlogPostListItem[]>(recentPostsQuery, { slug });
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(postSlugsQuery);
    return slugs.filter(Boolean).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found | Born To Blossom" };

  return {
    title: `${post.title} | Born To Blossom`,
    description: post.excerpt || "A reflection from Born To Blossom."
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, recentPosts] = await Promise.all([getPost(slug), getRecentPosts(slug)]);

  if (!post) notFound();

  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1400).height(800).url() : null;

  return (
    <>
      <Navbar />
      <main className="pb-16 pt-6 md:pb-24 md:pt-28">
        <Container>
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-12">
            <article className="min-w-0">
              <nav className="text-[0.8rem] text-[#9A8D82]" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-[#365A43]">
                  Home
                </Link>
                <span className="mx-2">›</span>
                <Link href="/blog" className="hover:text-[#365A43]">
                  Blog
                </Link>
                <span className="mx-2">›</span>
                <span className="text-[#6F6258]">{post.title}</span>
              </nav>

              <h1 className="mt-5 font-display text-[2.2rem] font-medium leading-[1.15] tracking-[-0.03em] text-[#2E2925] md:text-[3rem]">
                {post.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.85rem] text-[#9A8D82]">
                <span className="inline-flex items-center gap-1.5">
                  <UserRound className="h-4 w-4" />
                  {post.author || "Admin"}
                </span>
                {post.publishedAt ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4" />
                    {formatPostDate(post.publishedAt)}
                  </span>
                ) : null}
                {post.category ? (
                  <span className="rounded-full bg-[#E8F2EA] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#365A43]">
                    {post.category}
                  </span>
                ) : null}
              </div>

              {imageUrl ? (
                <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[20px] bg-[#EDE5D8]">
                  <Image
                    src={imageUrl}
                    alt={post.mainImage?.alt || post.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1200px) 100vw, 900px"
                  />
                </div>
              ) : null}

              <div className="mt-2">
                <BlogPortableText value={post.body} />
              </div>
            </article>

            <div className="xl:pt-10">
              <BlogSidebar posts={recentPosts} />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
