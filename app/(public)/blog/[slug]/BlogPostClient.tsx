"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, User, Clock, Tag, ArrowLeft, Share2 } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"
import { useThemeContext } from "@/context/theme-context"
import type { BlogPost } from "@/lib/supabase"
import Link from "next/link"

interface BlogPostClientProps {
  post: BlogPost
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const { mode, color } = useThemeContext()

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert("URL copied to clipboard!")
    }
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
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/blog">
            <Button variant="outline" className="bg-transparent theme-text border-gray-300 dark:border-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {post.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                <Tag className="w-3 h-3 mr-1 inline" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold theme-text mb-6 theme-transition max-w-4xl mx-auto">
            {post.title}
          </h1>

          <p className="text-xl theme-text opacity-80 theme-transition max-w-3xl mx-auto mb-8">{post.excerpt}</p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm theme-text opacity-70 theme-transition">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {getReadingTime(post.content)}
            </div>
            <Button onClick={handleShare} variant="ghost" size="sm" className="theme-text hover:text-primary">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </motion.header>

        {/* Featured Image */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-12 shadow-2xl"
          >
            <OptimizedImage src={post.image} alt={post.title} fill className="object-cover" priority />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-8 md:p-12 shadow-lg theme-transition max-w-4xl mx-auto`}
        >
          <div
            className="prose prose-lg max-w-none theme-text theme-transition
              prose-headings:theme-text prose-headings:theme-transition
              prose-p:theme-text prose-p:theme-transition prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:theme-text prose-strong:theme-transition
              prose-ul:theme-text prose-ul:theme-transition
              prose-ol:theme-text prose-ol:theme-transition
              prose-li:theme-text prose-li:theme-transition
              prose-blockquote:theme-text prose-blockquote:theme-transition prose-blockquote:border-primary
              prose-code:theme-text prose-code:theme-transition prose-code:bg-gray-100 dark:prose-code:bg-gray-800
              prose-pre:theme-text prose-pre:theme-transition prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>

        {/* Article Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div
            className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-8 shadow-lg theme-transition max-w-2xl mx-auto`}
          >
            <h3 className="text-xl font-bold theme-text mb-4 theme-transition">Enjoyed this article?</h3>
            <p className="theme-text opacity-70 mb-6 theme-transition">
              Stay updated with our latest insights and tutorials by exploring more of our blog posts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog">
                <Button className="bg-primary hover:bg-primary/90 text-white">Read More Posts</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="bg-transparent theme-text border-gray-300 dark:border-gray-600">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
