import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogCMS } from "@/lib/supabase-cms"
import { BlogPostClient } from "./BlogPostClient"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await BlogCMS.getBlogPostBySlug(params.slug)

    if (!post) {
      return {
        title: "Blog Post Not Found - RapidXSolution",
        description: "The requested blog post could not be found.",
      }
    }

    return {
      title: post.seo_title || `${post.title} - RapidXSolution Blog`,
      description: post.seo_description || post.excerpt,
      keywords: post.tags.join(", "),
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        images: post.image ? [post.image] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: post.image ? [post.image] : [],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Blog Post - RapidXSolution",
      description: "Read our latest blog post.",
    }
  }
}

export default async function BlogPostPage({ params }: Props) {
  try {
    const post = await BlogCMS.getBlogPostBySlug(params.slug)

    if (!post) {
      notFound()
    }

    return <BlogPostClient post={post} />
  } catch (error) {
    console.error("Error fetching blog post:", error)
    notFound()
  }
}
