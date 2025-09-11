import type { Metadata } from "next"
import { BlogClient } from "./BlogClient"

export const metadata: Metadata = {
  title: "Blog - Insights & Updates",
  description:
    "Stay updated with the latest insights, tutorials, and industry trends in web development, mobile apps, and digital transformation.",
  keywords: "blog, web development, mobile apps, tutorials, tech insights, digital transformation, programming",
  openGraph: {
    title: "Blog - Insights & Updates | RapidXSolution",
    description:
      "Stay updated with the latest insights, tutorials, and industry trends in web development, mobile apps, and digital transformation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Insights & Updates | RapidXSolution",
    description:
      "Stay updated with the latest insights, tutorials, and industry trends in web development, mobile apps, and digital transformation.",
  },
}

export default function BlogPage() {
  return <BlogClient />
}
