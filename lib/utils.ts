import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

export function getProjectSlug(title: string): string {
  return slugify(title)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

export function getImageUrl(url: string): string {
  // Handle Unsplash URLs
  if (url.includes("unsplash.com/photos/")) {
    // Extract photo ID from Unsplash URL
    const photoId = url.split("/").pop()?.split("-").pop()
    if (photoId) {
      return `https://images.unsplash.com/photo-${photoId}?w=800&h=600&fit=crop&auto=format`
    }
  }

  // Handle direct Unsplash image URLs
  if (url.includes("images.unsplash.com")) {
    return url
  }

  // Handle other image URLs
  if (url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
    return url
  }

  // Fallback to placeholder
  return "/placeholder.svg?height=400&width=600&text=Image"
}

export function validateImageUrl(url: string): boolean {
  try {
    new URL(url)
    return (
      url.includes("unsplash.com") ||
      url.includes("images.unsplash.com") ||
      url.match(/\.(jpeg|jpg|gif|png|webp)$/i) !== null
    )
  } catch {
    return false
  }
}
