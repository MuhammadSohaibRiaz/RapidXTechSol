import type { Metadata } from "next"
import Link from "next/link"
import { BlogCMS } from "@/lib/supabase-cms"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Blog | RapidXTech",
  description:
    "Read the latest articles about software development, technology trends, and industry insights from RapidXTech.",
  openGraph: {
    title: "Blog | RapidXTech",
    description:
      "Read the latest articles about software development, technology trends, and industry insights from RapidXTech.",
    url: "https://rapidxtech.com/blog",
    siteName: "RapidXTech",
    images: [
      {
        url: "https://rapidxtech.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RapidXTech Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default async function Blog() {
  const blogPosts = await BlogCMS.getPublishedBlogPosts()

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
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent theme-gradient-text theme-transition">
            Our Blog
          </h1>
          <p className="text-center theme-text opacity-80 max-w-2xl mx-auto theme-transition">
            Stay updated with the latest insights, tutorials, and news from our expert developers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-background/30 backdrop-blur-md rounded-lg overflow-hidden shadow-lg h-full flex flex-col theme-transition hover:transform hover:scale-105 transition-all duration-300"
              itemScope
              itemType="http://schema.org/BlogPosting"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg?height=200&width=400&text=Blog+Post"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    itemProp="image"
                  />
                </div>
              </Link>

              <div className="p-6 flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-xs bg-primary/30 theme-text px-2 py-1 rounded theme-transition">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2
                    className="text-xl font-semibold mb-2 theme-text hover:opacity-80 transition-colors theme-transition"
                    itemProp="headline"
                  >
                    {post.title}
                  </h2>
                </Link>

                <p className="theme-text opacity-80 mb-4 theme-transition" itemProp="description">
                  {post.excerpt}
                </p>

                <div className="flex justify-between items-center text-sm text-muted-foreground mt-auto">
                  <time dateTime={post.date} itemProp="datePublished">
                    {formatDate(post.date)}
                  </time>
                  <span itemProp="author" itemScope itemType="http://schema.org/Person">
                    <span itemProp="name">{post.author}</span>
                  </span>
                </div>
              </div>

              <div className="px-6 pb-6 mt-auto">
                <Link href={`/blog/${post.slug}`} className="block w-full">
                  <button className="w-full bg-primary hover:bg-primary/90 theme-text py-2 px-4 rounded transition-colors theme-transition">
                    Read More
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold theme-text mb-2 theme-transition">No blog posts yet</h3>
            <p className="theme-text opacity-70 theme-transition">Check back soon for our latest articles</p>
          </div>
        )}
      </div>
    </div>
  )
}
