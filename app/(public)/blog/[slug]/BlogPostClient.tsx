"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Share2, Clock } from "lucide-react"
import Link from "next/link"
import { useThemeContext } from "@/context/theme-context"
import type { BlogPost } from "@/lib/supabase"
import { OptimizedImage } from "@/components/optimized-image"

interface Props {
  post: BlogPost
}

export function BlogPostClient({ post }: Props) {
  const { mode, color } = useThemeContext()

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  const estimatedReadTime = Math.ceil(post.content.split(" ").length / 200) // Assuming 200 words per minute

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
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
              <CardContent className="p-8">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm theme-text opacity-70 mb-6 theme-transition">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {estimatedReadTime} min read
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl theme-text opacity-80 mb-6 theme-transition">{post.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="theme-text">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Share Button */}
                <Button
                  variant="outline"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: post.excerpt,
                        url: window.location.href,
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                    }
                  }}
                  className="bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Featured Image */}
          {post.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <Card
                className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition overflow-hidden`}
              >
                <OptimizedImage src={post.image} alt={post.title} width={800} height={400} className="w-full h-auto" />
              </Card>
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
              <CardContent className="p-8">
                <div
                  className="prose prose-lg max-w-none theme-text theme-transition prose-headings:theme-text prose-p:theme-text prose-strong:theme-text prose-code:theme-text prose-blockquote:theme-text prose-li:theme-text"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent theme-gradient-text theme-transition">
                  Ready to Get Started?
                </h2>
                <p className="text-lg theme-text opacity-80 mb-8 max-w-2xl mx-auto theme-transition">
                  Let's discuss how we can help you implement these ideas in your next project
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4" asChild>
                    <Link href="/contact">Start Your Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-4 bg-transparent" asChild>
                    <Link href="/blog">Read More Articles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
