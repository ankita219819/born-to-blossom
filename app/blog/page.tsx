import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";
import type { BlogPostListItem } from "@/sanity/lib/types";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Blog | Born To Blossom",
  description: "Reflections on healing, growth, and spiritual wisdom from Born To Blossom."
};

export const revalidate = 60;

async function getPosts() {
  try {
    return await client.fetch<BlogPostListItem[]>(postsQuery);
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main className="pb-16 pt-6 md:pb-24 md:pt-28">
        <Container>
          <div className="mx-auto max-w-[920px]">
            <p className="eyebrow">Journal</p>
            <h1 className="mt-3 font-display text-[2.4rem] font-medium leading-[1.1] tracking-[-0.03em] text-[#2E2925] md:text-[3.25rem]">
              Blog
            </h1>
            <p className="mt-3 max-w-2xl text-[1rem] leading-[1.8] text-[#6F6258]">
              Stories, guidance, and reflections to support your healing journey.
            </p>

            <div className="mt-8 md:mt-10">
              {posts.length ? (
                posts.map((post) => <BlogPostCard key={post._id} post={post} />)
              ) : (
                <div className="rounded-[20px] border border-[#EFE5DA] bg-[#FFFDFC] p-8 text-center">
                  <p className="text-[#6F6258]">No blog posts yet.</p>
                  <p className="mt-2 text-sm text-[#9A8D82]">
                    Publish your first post in{" "}
                    <Link href="/studio" className="font-semibold text-[#365A43] underline underline-offset-4">
                      Sanity Studio
                    </Link>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
