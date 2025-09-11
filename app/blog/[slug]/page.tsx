import type { Metadata } from "next"
import { slugify } from "@/lib/utils"
import { blogPosts } from "@/lib/blog-data"

type Props = {
  params: { slug: string }
}

// Update the metadata function
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((post) => slugify(post.title) === params.slug)

  if (!post) {
    return {
      title: "Post Not Found | RapidXTech",
    }
  }

  return {
    title: `${post.title} | RapidXTech Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.image,
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
      images: [post.image],
    },
  }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: slugify(post.title),
  }))
}

export default function BlogPost({ params }: Props) {
  const post = blogPosts.find((post) => slugify(post.title) === params.slug)

  if (!post) {
    return <div>Post not found</div>
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
        <a href="/blog" className="inline-flex items-center theme-text hover:opacity-80 mb-8 theme-transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Blog
        </a>

        <article
          className="bg-background/30 backdrop-blur-md rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto"
          itemScope
          itemType="http://schema.org/BlogPosting"
        >
          <div className="relative h-64 md:h-96">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
              itemProp="image"
            />
          </div>

          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-primary/30 theme-text px-2 py-1 rounded theme-transition">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 theme-text theme-transition" itemProp="headline">
              {post.title}
            </h1>

            <div className="flex items-center text-muted-foreground mb-8">
              <time dateTime={post.date} itemProp="datePublished">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="mx-2">•</span>
              <span itemProp="author" itemScope itemType="http://schema.org/Person">
                <span itemProp="name">{post.author}</span>
              </span>
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
}
