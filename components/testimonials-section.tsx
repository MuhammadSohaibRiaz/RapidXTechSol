"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import type { ClientReview } from "@/lib/supabase"
import { OptimizedImage } from "./optimized-image"

interface TestimonialsSectionProps {
  reviews: ClientReview[]
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!reviews || reviews.length === 0) {
    return null
  }

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  const currentReview = reviews[currentIndex]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <Quote className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6 opacity-50" />

              <div className="flex mb-6">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                "{currentReview.review_text}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    {currentReview.client_image ? (
                      <OptimizedImage
                        src={currentReview.client_image}
                        alt={currentReview.client_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                        {currentReview.client_name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-lg">
                      {currentReview.client_name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {currentReview.client_position} at {currentReview.client_company}
                    </div>
                    {currentReview.project_category && (
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        {currentReview.project_category} Project
                      </div>
                    )}
                  </div>
                </div>

                {reviews.length > 1 && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={prevTestimonial} className="p-2 bg-transparent">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={nextTestimonial} className="p-2 bg-transparent">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Testimonial indicators */}
          {reviews.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-blue-600 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
