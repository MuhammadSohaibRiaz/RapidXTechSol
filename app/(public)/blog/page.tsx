import type { Metadata } from "next"
import { BlogClient } from "./BlogClient"

export const metadata: Metadata = {
  title: "Blog - Latest Insights & Tech Trends",
  description:
    "Stay updated with the latest insights, tech trends, and best practices in software development from the RapidXTech team.",
  openGraph: {
    title: "Blog - Latest Insights & Tech Trends | RapidXTech",
    description:
      "Stay updated with the latest insights, tech trends, and best practices in software development from the RapidXTech team.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Latest Insights & Tech Trends | RapidXTech",
    description:
      "Stay updated with the latest insights, tech trends, and best practices in software development from the RapidXTech team.",
  },
}

export default function BlogPage() {
  return <BlogClient />
}
