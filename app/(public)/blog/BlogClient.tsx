"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, Tag, Clock } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"
import { useThemeContext } from "@/context/theme-context"
import { BlogCMS } from "@/lib/supabase-cms"
import type { BlogPost } from "@/lib/supabase"
import Link from "next/link"

export default function BlogClient() {
  const { mode, color } = useThemeContext()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await BlogCMS.getPublishedBlogPosts()
      setPosts(data)
      setFilteredPosts(data)
    } catch (err) {
      console.error("Error loading blog posts:", err)
      setError("Failed to load blog posts. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let filtered = posts

    if (selectedTag !== "All") {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag))
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredPosts(filtered)
  }, [posts, selectedTag, searchTerm])

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  // Get all unique tags
  const allTags = ["All", ...Array.from(new Set(posts.flatMap((post) => post.tags)))]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readingTime} min read`
  }

  if (error) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold theme-text mb-2">Error Loading Blog</h2>
          <p className="theme-text opacity-70 mb-4">{error}</p>
          <Button onClick={loadPosts} className="bg-primary hover:bg-primary/90 text-white">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <motion.div
          className="absolute inset-0 theme-glow blur-3xl theme-transition"
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "50%", "0%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-6">
            Our Blog
          </h1>
          <p className="text-xl theme-text opacity-80 theme-transition max-w-3xl mx-auto">
            Stay updated with the latest insights, tutorials, and trends in web development and digital innovation
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 mb-8 shadow-lg theme-transition`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 theme-text opacity-50" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 theme-text bg-transparent border-gray-300 dark:border-gray-600"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 8).map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className={
                    selectedTag === tag
                      ? "bg-primary text-white"
                      : "bg-transparent theme-text border-gray-300 dark:border-gray-600"
                  }
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
            <p className="theme-text opacity-70 theme-transition">
              Showing {filteredPosts.length} of {posts.length} posts
            </p>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`${getCardBgClass()} backdrop-blur-md rounded-lg overflow-hidden animate-pulse`}>
                <div className="h-64 bg-gray-300 dark:bg-gray-700" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                  <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${getCardBgClass()} backdrop-blur-md rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 theme-transition group`}
                >
                  {/* Post Image */}
                  <div className="relative h-64 overflow-hidden">
                    <OptimizedImage
                      src={post.image || "/placeholder.svg?height=300&width=400&text=Blog+Post"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="px-2 py-1 bg-secondary/20 theme-text rounded text-xs theme-transition">
                          +{post.tags.length - 2} more
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold theme-text mb-3 theme-transition group-hover:text-primary line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="theme-text opacity-70 mb-4 line-clamp-3 theme-transition">{post.excerpt}</p>

                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-sm theme-text opacity-60 mb-4 theme-transition">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.date)}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {getReadingTime(post.content)}
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold theme-text mb-2 theme-transition">No Posts Found</h3>
            <p className="theme-text opacity-70 theme-transition mb-6">
              {searchTerm || selectedTag !== "All"
                ? "Try adjusting your search or filter criteria"
                : "No blog posts are currently available"}
            </p>
            {(searchTerm || selectedTag !== "All") && (
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedTag("All")
                }}
                variant="outline"
                className="bg-transparent theme-text border-gray-300 dark:border-gray-600"
              >
                Clear Filters
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
