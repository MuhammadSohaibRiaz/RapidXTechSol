"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import type { ProjectImage } from "@/lib/portfolio-data"

interface ImageCarouselProps {
  images: ProjectImage[]
  projectTitle: string
}

export function ImageCarousel({ images, projectTitle }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const { mode, color } = useThemeContext()

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const goToLightboxPrevious = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToLightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length)
  }

  const getButtonClass = () => {
    if (color === "white" && mode === "light") {
      return "bg-white/90 hover:bg-white text-gray-800 border border-gray-200"
    } else if (color === "black" || mode === "dark") {
      return "bg-gray-900/90 hover:bg-gray-800 text-white border border-gray-700"
    } else {
      return "bg-background/90 hover:bg-background text-foreground border border-border"
    }
  }

  return (
    <>
      {/* Main Carousel */}
      <div className="relative">
        {/* Main Image Display */}
        <div className="relative aspect-video rounded-lg overflow-hidden group">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]?.url || "/placeholder.svg"}
            alt={images[currentIndex]?.alt || projectTitle}
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={() => openLightbox(currentIndex)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Zoom overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ZoomIn className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${getButtonClass()} backdrop-blur-md rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100`}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${getButtonClass()} backdrop-blur-md rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100`}
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Image Caption */}
        {images[currentIndex]?.caption && (
          <motion.p
            key={`caption-${currentIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm theme-text opacity-70 text-center theme-transition"
          >
            {images[currentIndex].caption}
          </motion.p>
        )}

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="mt-6">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                    index === currentIndex ? "border-primary scale-105" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img src={image.url || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightboxIndex]?.url || "/placeholder.svg"}
                alt={images[lightboxIndex]?.alt || projectTitle}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Lightbox Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToLightboxPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={goToLightboxNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Lightbox Caption */}
              {images[lightboxIndex]?.caption && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-4 rounded-lg backdrop-blur-sm">
                  <p className="text-center">{images[lightboxIndex].caption}</p>
                </div>
              )}

              {/* Lightbox Counter */}
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {lightboxIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
