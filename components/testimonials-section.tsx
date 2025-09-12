"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { ReviewsCMS } from "@/lib/supabase-cms"
import type { ClientReview } from "@/lib/supabase"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0) // 1 for next, -1 for previous
  const [testimonials, setTestimonials] = useState<ClientReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { mode, color } = useThemeContext()

  // Load testimonials from Supabase
  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await ReviewsCMS.getPublishedReviews()
      setTestimonials(data)
    } catch (error) {
      console.error("Error loading testimonials:", error)
      setError("Failed to load testimonials")
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    if (index === currentIndex) return

    setIsAutoPlaying(false)
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  // Smooth slide variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  // Get button styles based on theme
  const getArrowButtonClass = () => {
    if (color === "white" && mode === "light") {
      return "bg-white/90 hover:bg-white text-gray-800 border border-gray-200 shadow-lg"
    } else if (color === "black" || mode === "dark") {
      return "bg-gray-900/90 hover:bg-gray-800 text-white border border-gray-700 shadow-lg"
    } else {
      return "bg-background/90 hover:bg-background text-foreground border border-border shadow-lg"
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <section className="py-32 theme-bg relative overflow-hidden theme-transition">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-96 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-128 mx-auto animate-pulse" />
          </div>
          <div className="max-w-4xl mx-auto">
            <div
              className={`${mode === "dark" || color === "black" ? "bg-gray-900/40" : "bg-white/40"} backdrop-blur-md rounded-2xl p-12 shadow-2xl animate-pulse`}
            >
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4" />
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4" />
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-4/6 mb-8" />
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full mr-4" />
                <div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="py-32 theme-bg relative overflow-hidden theme-transition">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl theme-text opacity-70 max-w-2xl mx-auto theme-transition">
              Unable to load testimonials at the moment. Please try again later.
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Empty state
  if (testimonials.length === 0) {
    return (
      <section className="py-32 theme-bg relative overflow-hidden theme-transition">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl theme-text opacity-70 max-w-2xl mx-auto theme-transition">
              No testimonials available at the moment.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-32 theme-bg relative overflow-hidden theme-transition">
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl theme-text opacity-70 max-w-2xl mx-auto theme-transition">
            Don't just take our word for it - hear from the clients who've experienced our commitment to excellence
          </p>
        </motion.div>

        {/* Main container with arrows positioned outside */}
        <div className="max-w-6xl mx-auto relative">
          <div className="flex items-center justify-center">
            {/* Left Arrow - Outside the card */}
            {testimonials.length > 1 && (
              <motion.button
                onClick={goToPrevious}
                className={`hidden lg:flex items-center justify-center w-12 h-12 rounded-full ${getArrowButtonClass()} backdrop-blur-md transition-all duration-200 hover:scale-110 theme-transition mr-8 flex-shrink-0`}
                aria-label="Previous testimonial"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            )}

            {/* Testimonial Card Container */}
            <div className="flex-1 max-w-4xl">
              <div className="relative overflow-hidden">
                <div className="relative h-auto min-h-[400px] flex items-center">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.3 },
                        scale: { duration: 0.3 },
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x)

                        if (swipe < -swipeConfidenceThreshold) {
                          goToNext()
                        } else if (swipe > swipeConfidenceThreshold) {
                          goToPrevious()
                        }
                      }}
                      className={`w-full ${
                        mode === "dark" || color === "black" ? "bg-gray-900/40" : "bg-white/40"
                      } backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl theme-transition cursor-grab active:cursor-grabbing border border-white/10`}
                    >
                      {/* Quote icon */}
                      <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <svg
                          className="w-12 h-12 theme-text opacity-30 theme-transition"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                        </svg>
                      </motion.div>

                      {/* Stars rating */}
                      <motion.div
                        className="flex mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Testimonial content */}
                      <motion.blockquote
                        className="text-lg md:text-xl theme-text mb-8 leading-relaxed theme-transition"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        "{currentTestimonial.review_text}"
                      </motion.blockquote>

                      {/* Client info - Show only for identified testimonials */}
                      {currentTestimonial.testimonial_type === "identified" && currentTestimonial.client_name && (
                        <motion.div
                          className="flex items-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <motion.div
                            className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gradient-to-r theme-gradient-text flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                          >
                            {currentTestimonial.client_image ? (
                              <img
                                src={currentTestimonial.client_image || "/placeholder.svg"}
                                alt={currentTestimonial.client_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white text-xl font-bold">
                                {currentTestimonial.client_name.charAt(0)}
                              </span>
                            )}
                          </motion.div>
                          <div>
                            <motion.h4
                              className="font-semibold text-lg theme-text theme-transition"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 }}
                            >
                              {currentTestimonial.client_name}
                            </motion.h4>
                            <motion.p
                              className="theme-text opacity-70 theme-transition"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 }}
                            >
                              {currentTestimonial.client_position} at {currentTestimonial.client_company}
                            </motion.p>
                            {currentTestimonial.project_category && (
                              <motion.p
                                className="text-sm text-primary mt-1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.9 }}
                              >
                                {currentTestimonial.project_category}
                              </motion.p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Anonymous testimonial footer */}
                      {currentTestimonial.testimonial_type === "anonymous" && (
                        <motion.div
                          className="flex items-center justify-between"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <motion.div
                            className="flex items-center theme-text opacity-60 theme-transition"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            <span className="text-sm">Verified Client</span>
                          </motion.div>
                          {currentTestimonial.project_category && (
                            <motion.p
                              className="text-sm text-primary"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 }}
                            >
                              {currentTestimonial.project_category}
                            </motion.p>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Arrow - Outside the card */}
            {testimonials.length > 1 && (
              <motion.button
                onClick={goToNext}
                className={`hidden lg:flex items-center justify-center w-12 h-12 rounded-full ${getArrowButtonClass()} backdrop-blur-md transition-all duration-200 hover:scale-110 theme-transition ml-8 flex-shrink-0`}
                aria-label="Next testimonial"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            )}
          </div>

          {/* Mobile arrows - positioned at the bottom */}
          {testimonials.length > 1 && (
            <div className="flex lg:hidden justify-center mt-6 space-x-4">
              <motion.button
                onClick={goToPrevious}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${getArrowButtonClass()} backdrop-blur-md transition-all duration-200 hover:scale-110 theme-transition`}
                aria-label="Previous testimonial"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={goToNext}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${getArrowButtonClass()} backdrop-blur-md transition-all duration-200 hover:scale-110 theme-transition`}
                aria-label="Next testimonial"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          )}

          {/* Dots indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : mode === "dark" || color === "black"
                        ? "bg-gray-600 hover:bg-gray-500"
                        : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  whileHover={{ scale: index === currentIndex ? 1.25 : 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          )}

          {/* Auto-play indicator */}
          {testimonials.length > 1 && (
            <motion.div
              className="flex justify-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center space-x-2 text-sm theme-text opacity-60 theme-transition">
                <motion.div
                  className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-green-500" : "bg-gray-400"}`}
                  animate={isAutoPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={isAutoPlaying ? { duration: 1, repeat: Number.POSITIVE_INFINITY } : {}}
                />
                <span>{isAutoPlaying ? "Auto-playing" : "Paused"}</span>
              </div>
            </motion.div>
          )}

          {/* Swipe hint for mobile */}
          <motion.div
            className="flex justify-center mt-2 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-xs theme-text opacity-50 theme-transition">Swipe left or right to navigate</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
