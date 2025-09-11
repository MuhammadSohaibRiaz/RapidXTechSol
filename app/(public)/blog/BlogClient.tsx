"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight, Filter } from "lucide-react"
import Link from "next/link"
import { useThemeContext } from "@/context/theme-context"
import { BlogCMS } from "@/lib/supabase-cms"
import type { BlogPost } from "@/lib/supabase"
import { OptimizedImage } from "@/components/optimized-image"

const categories = ["All", "Web Development", "Mobile Apps", "UI/UX", "Technology", "Tutorials", "Industry News"]

export function BlogClient() {
  const { mode, color } = useThemeContext()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await BlogCMS.getPublishedBlogPosts()
        setPosts(postsData)
        setFilteredPosts(postsData)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    let filtered = posts

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.tags.includes(selectedCategory.toLowerCase().replace(" ", "-")))
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredPosts(filtered)
  }, [posts, selectedCategory, searchTerm])

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  if (loading) {
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

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
              Our Blog
            </h1>
            <p className="text-xl theme-text opacity-80 max-w-3xl mx-auto theme-transition">
              Insights, tutorials, and industry trends to help you stay ahead in the digital world
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 mb-12 shadow-lg theme-transition`}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 theme-text opacity-50" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 theme-text bg-transparent border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`${
                      selectedCategory === category
                        ? "bg-primary text-white"
                        : "bg-transparent theme-text border-gray-300 dark:border-gray-600"
                    } transition-all duration-300`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
              <p className="theme-text opacity-70 theme-transition">
                Showing {filteredPosts.length} of {posts.length} articles
              </p>
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg h-full theme-transition hover:transform hover:scale-105 transition-all duration-300 group`}
                  >
                    <div className="relative overflow-hidden rounded-t-lg">
                      <OptimizedImage
                        src={post.image || "/placeholder.svg?height=300&width=400&text=Blog+Post"}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between text-sm theme-text opacity-60 mb-3 theme-transition">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold theme-text mb-3 theme-transition line-clamp-2">{post.title}</h3>
                      <p className="theme-text opacity-80 mb-4 line-clamp-3 theme-transition">{post.excerpt}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs theme-text">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs theme-text">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Read More Button */}
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                        <Link href={`/blog/${post.slug}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Filter className="w-16 h-16 theme-text opacity-50 mx-auto mb-4" />
              <h3 className="text-2xl font-bold theme-text mb-2 theme-transition">No Articles Found</h3>
              <p className="theme-text opacity-70 theme-transition">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent theme-gradient-text theme-transition">
                  Stay Updated
                </h2>
                <p className="text-lg theme-text opacity-80 mb-8 max-w-2xl mx-auto theme-transition">
                  Subscribe to our newsletter for the latest insights and updates
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4" asChild>
                  <Link href="/contact">Subscribe Now</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
