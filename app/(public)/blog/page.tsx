import { Suspense } from "react"
import BlogClient from "./BlogClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - RapidXSolution",
  description:
    "Stay updated with the latest insights, tutorials, and trends in web development, mobile app development, and digital innovation from our expert team.",
  keywords: ["blog", "web development", "mobile development", "technology", "tutorials", "insights"],
  openGraph: {
    title: "Blog - RapidXSolution",
    description: "Stay updated with the latest insights and trends in web development and digital innovation.",
    type: "website",
  },
}

function BlogLoading() {
  return (
    <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="theme-text theme-transition">Loading blog posts...</p>
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogClient />
    </Suspense>
  )
}
