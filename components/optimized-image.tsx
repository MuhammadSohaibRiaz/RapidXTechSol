"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  className = "",
  priority = false,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Convert various image URL formats to optimized versions
  const getOptimizedSrc = (originalSrc: string) => {
    if (!originalSrc) return "/placeholder.svg?height=400&width=600"

    // Handle Unsplash URLs
    if (originalSrc.includes("unsplash.com")) {
      // Convert photo page URLs to direct image URLs
      if (originalSrc.includes("/photos/")) {
        const photoId = originalSrc.split("/photos/")[1]?.split("-").pop()
        if (photoId) {
          return `https://images.unsplash.com/photo-${photoId}?w=800&h=600&fit=crop&auto=format&q=80`
        }
      }

      // If already a direct image URL, ensure it has proper parameters
      if (originalSrc.includes("images.unsplash.com")) {
        const url = new URL(originalSrc)
        url.searchParams.set("auto", "format")
        url.searchParams.set("q", "80")
        if (!url.searchParams.has("w")) url.searchParams.set("w", "800")
        if (!url.searchParams.has("h")) url.searchParams.set("h", "600")
        return url.toString()
      }
    }

    // Handle other image URLs
    if (originalSrc.startsWith("http")) {
      return originalSrc
    }

    // Fallback for invalid URLs
    return "/placeholder.svg?height=400&width=600"
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    // Set fallback image
    const fallbackSrc =
      width && height
        ? `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(alt)}`
        : "/placeholder.svg?height=400&width=600&text=Image+Not+Found"
    setImageSrc(fallbackSrc)
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const optimizedSrc = hasError ? imageSrc : getOptimizedSrc(imageSrc)

  const imageProps = {
    src: optimizedSrc,
    alt,
    className: `${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`,
    onError: handleError,
    onLoad: handleLoad,
    priority,
  }

  if (fill) {
    return <Image {...imageProps} fill />
  }

  return <Image {...imageProps} width={width || 800} height={height || 600} />
}
