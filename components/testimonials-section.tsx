"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useThemeContext } from "@/context/theme-context"
import type { ClientReview } from "@/lib/supabase"
import { getImageUrl } from "@/lib/utils"

interface TestimonialsSectionProps {
  reviews: ClientReview[]
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  const { mode, color } = useThemeContext()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || reviews.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, reviews.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  if (reviews.length === 0) return null

  return (
    <section className="py-20 px-6 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
            What Our Clients Say
          </h2>
          <p className="text-xl theme-text opacity-80 max-w-3xl mx-auto theme-transition">
            Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`${getCardBgClass()} backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl theme-transition`}
              >
                <div className="flex flex-col items-center text-center">
                  {/* Quote Icon */}
                  <Quote className="w-12 h-12 text-primary mb-6 opacity-50" />

                  {/* Rating Stars */}
                  <div className="flex items-center mb-6">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg md:text-xl theme-text mb-8 leading-relaxed theme-transition max-w-3xl">
                    "{reviews[currentIndex].review_text}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={getImageUrl(reviews[currentIndex].client_image || "")}
                        alt={reviews[currentIndex].client_name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-lg theme-text theme-transition">
                        {reviews[currentIndex].client_name}
                      </div>
                      <div className="theme-text opacity-70 theme-transition">
                        {reviews[currentIndex].client_position}
                      </div>
                      <div className="theme-text opacity-60 theme-transition">
                        {reviews[currentIndex].client_company}
                      </div>
                      {reviews[currentIndex].project_category && (
                        <div className="text-sm text-primary mt-1">{reviews[currentIndex].project_category}</div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {reviews.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border-gray-300 dark:border-gray-600 hover:bg-primary/20 transition-all duration-300 z-10"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm border-gray-300 dark:border-gray-600 hover:bg-primary/20 transition-all duration-300 z-10"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Dots Indicator */}
          {reviews.length > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-primary scale-125" : "bg-gray-400 dark:bg-gray-600 hover:bg-primary/60"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Auto-play Control */}
          {reviews.length > 1 && (
            <div className="flex justify-center mt-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-sm theme-text opacity-60 hover:opacity-100 theme-transition"
              >
                {isAutoPlaying ? "Pause" : "Play"} Auto-scroll
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
