import { notFound } from "next/navigation"
import { BlogCMS } from "@/lib/supabase-cms"
import BlogPostClient from "./BlogPostClient"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await BlogCMS.getBlogPostBySlug(params.slug)

    if (!post) {
      return {
        title: "Post Not Found - RapidXSolution",
        description: "The requested blog post could not be found.",
      }
    }

    return {
      title: post.seo_title || `${post.title} - RapidXSolution Blog`,
      description: post.seo_description || post.excerpt,
      keywords: post.tags,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        images: post.image ? [{ url: post.image, alt: post.title }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: post.image ? [post.image] : [],
      },
    }
  } catch (error) {
    return {
      title: "Error - RapidXSolution",
      description: "An error occurred while loading the blog post.",
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await BlogCMS.getBlogPostBySlug(params.slug)

    if (!post) {
      notFound()
    }

    return <BlogPostClient post={post} />
  } catch (error) {
    console.error("Error loading blog post:", error)
    notFound()
  }
}
