"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { OptimizedImage } from "./optimized-image"
import { useThemeContext } from "@/context/theme-context"
import { ReviewsCMS } from "@/lib/supabase-cms"
import type { ClientReview } from "@/lib/supabase"

export function TestimonialsSection() {
  const { mode, color } = useThemeContext()
  const [reviews, setReviews] = useState<ClientReview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      const data = await ReviewsCMS.getFeaturedReviews()
      setReviews(data.slice(0, 6)) // Show max 6 reviews
    } catch (error) {
      console.error("Error loading reviews:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  if (isLoading) {
    return (
      <section className="py-20 theme-bg theme-transition relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 animate-pulse`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full mr-4" />
                  <div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 mb-2" />
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-32" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (reviews.length === 0) {
    return null
  }

  return (
    <section className="py-20 theme-bg theme-transition relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl theme-text opacity-80 theme-transition max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 theme-transition relative`}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-20">
                <Quote className="w-8 h-8 theme-text" />
              </div>

              {/* Client Info */}
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4">
                  <OptimizedImage
                    src={review.client_image || "/placeholder.svg?height=48&width=48&text=Client"}
                    alt={review.client_name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold theme-text theme-transition">{review.client_name}</h4>
                  <p className="text-sm theme-text opacity-70 theme-transition">
                    {review.client_position} at {review.client_company}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="theme-text opacity-80 theme-transition leading-relaxed mb-4">"{review.review_text}"</p>

              {/* Project Category */}
              {review.project_category && (
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    {review.project_category}
                  </span>
                  {review.is_featured && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-600 rounded text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
