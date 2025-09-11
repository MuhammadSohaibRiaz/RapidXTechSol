import type { Metadata } from "next"
import { BlogCMS } from "@/lib/supabase-cms"
import { getImageUrl, formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await BlogCMS.getBlogPostBySlug(params.slug)

    if (!post) {
      return {
        title: "Post Not Found | RapidXTech",
      }
    }

    return {
      title: post.seo_title || `${post.title} | RapidXTech Blog`,
      description: post.seo_description || post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        tags: post.tags,
        images: [
          {
            url: getImageUrl(post.image || ""),
            width: 1200,
            height: 600,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: [getImageUrl(post.image || "")],
      },
    }
  } catch (error) {
    return {
      title: "Post Not Found | RapidXTech",
    }
  }
}

export default async function BlogPostPage({ params }: Props) {
  try {
    const post = await BlogCMS.getBlogPostBySlug(params.slug)

    if (!post) {
      notFound()
    }

    return (
      <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div
            className="absolute inset-0 theme-glow blur-3xl theme-transition"
            style={{
              animation: "gradient-animation 20s linear infinite alternate",
            }}
          />
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          <Link href="/blog" className="inline-flex items-center theme-text hover:opacity-80 mb-8 theme-transition">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Blog
          </Link>

          <article
            className="bg-background/30 backdrop-blur-md rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto"
            itemScope
            itemType="http://schema.org/BlogPosting"
          >
            <div className="relative h-64 md:h-96">
              <img
                src={getImageUrl(post.image || "")}
                alt={post.title}
                className="w-full h-full object-cover"
                itemProp="image"
              />
            </div>

            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-primary/30 text-primary px-2 py-1 rounded theme-transition">
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4 theme-text theme-transition" itemProp="headline">
                {post.title}
              </h1>

              <div className="flex items-center text-muted-foreground mb-8">
                <div className="flex items-center mr-6">
                  <User className="w-4 h-4 mr-2" />
                  <span itemProp="author" itemScope itemType="http://schema.org/Person">
                    <span itemProp="name">{post.author}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={post.date} itemProp="datePublished">
                    {formatDate(post.date)}
                  </time>
                </div>
              </div>

              <div
                className="prose prose-lg max-w-none theme-transition"
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading blog post:", error)
    notFound()
  }
}
