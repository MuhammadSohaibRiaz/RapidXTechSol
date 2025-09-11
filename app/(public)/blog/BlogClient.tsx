"use client"

import Link from "next/link"
import { BlogCMS } from "@/lib/supabase-cms"
import { getImageUrl, formatDate } from "@/lib/utils"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, User, Tag } from "lucide-react"
import type { BlogPost } from "@/lib/supabase"

export function BlogClient() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await BlogCMS.getPublishedBlogPosts()
        setPosts(data)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="theme-text theme-transition">Loading blog posts...</p>
        </div>
      </div>
    )
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent theme-gradient-text theme-transition">
            Our Blog
          </h1>
          <p className="text-center theme-text opacity-80 max-w-2xl mx-auto theme-transition">
            Stay updated with the latest insights, tech trends, and best practices in software development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const imageUrl = getImageUrl(post.image || "")

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background/30 backdrop-blur-md rounded-lg overflow-hidden shadow-lg h-full flex flex-col theme-transition hover:transform hover:scale-105 transition-all duration-300"
                itemScope
                itemType="http://schema.org/BlogPosting"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      itemProp="image"
                    />
                  </div>
                </Link>

                <div className="p-6 flex-grow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded theme-transition">
                        <Tag className="w-3 h-3 inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2
                      className="text-xl font-semibold mb-3 theme-text hover:opacity-80 transition-colors theme-transition"
                      itemProp="headline"
                    >
                      {post.title}
                    </h2>
                  </Link>

                  <p className="theme-text opacity-80 mb-4 theme-transition" itemProp="description">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm theme-text opacity-60 theme-transition">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span itemProp="author">{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <time dateTime={post.date} itemProp="datePublished">
                        {formatDate(post.date)}
                      </time>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 mt-auto">
                  <Link href={`/blog/${post.slug}`} className="block w-full">
                    <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded transition-colors theme-transition">
                      Read More
                    </button>
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </div>

        {posts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold theme-text mb-2 theme-transition">No blog posts yet</h3>
            <p className="theme-text opacity-70 theme-transition">Check back soon for our latest insights</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
