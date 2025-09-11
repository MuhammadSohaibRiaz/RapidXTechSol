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

// Function to convert Unsplash photo page URLs to direct image URLs
function getOptimizedImageUrl(url: string, width?: number, height?: number): string {
  if (!url) return "/placeholder.svg?height=400&width=600&text=No+Image"

  // Handle Unsplash photo page URLs (convert to direct image URLs)
  if (url.includes("unsplash.com/photos/")) {
    const photoId = url.split("/photos/")[1]?.split("?")[0]?.split("-").pop()
    if (photoId) {
      const dimensions = width && height ? `&w=${width}&h=${height}&fit=crop` : "&w=800&h=600&fit=crop"
      return `https://images.unsplash.com/photo-${photoId}?auto=format&q=80${dimensions}`
    }
  }

  // Handle direct Unsplash image URLs
  if (url.includes("images.unsplash.com")) {
    const baseUrl = url.split("?")[0]
    const dimensions = width && height ? `&w=${width}&h=${height}&fit=crop` : "&w=800&h=600&fit=crop"
    return `${baseUrl}?auto=format&q=80${dimensions}`
  }

  // Handle other image URLs
  if (
    url.startsWith("http") &&
    (url.includes(".jpg") || url.includes(".jpeg") || url.includes(".png") || url.includes(".webp"))
  ) {
    return url
  }

  // Handle placeholder URLs
  if (url.includes("placeholder.svg")) {
    return url
  }

  // Fallback to placeholder
  return "/placeholder.svg?height=400&width=600&text=Invalid+Image"
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  priority = false,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const optimizedSrc = imageError
    ? "/placeholder.svg?height=400&width=600&text=Image+Error"
    : getOptimizedImageUrl(src, width, height)

  const handleError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (fill) {
    return (
      <div className={`relative ${className}`}>
        {isLoading && <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />}
        <Image
          src={optimizedSrc || "/placeholder.svg"}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
          onError={handleError}
          onLoad={handleLoad}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
          style={{ width, height }}
        />
      )}
      <Image
        src={optimizedSrc || "/placeholder.svg"}
        alt={alt}
        width={width || 400}
        height={height || 300}
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
      />
    </div>
  )
}
