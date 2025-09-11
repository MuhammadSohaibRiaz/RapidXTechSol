import type { Metadata } from "next"
import { BlogClient } from "./BlogClient"

export const metadata: Metadata = {
  title: "Blog - RapidXSolution",
  description:
    "Stay updated with the latest insights, tutorials, and industry trends in web development, mobile apps, and digital transformation.",
  keywords: "blog, web development, mobile apps, tutorials, technology trends, digital transformation",
  openGraph: {
    title: "Blog - RapidXSolution",
    description:
      "Stay updated with the latest insights, tutorials, and industry trends in web development, mobile apps, and digital transformation.",
    type: "website",
  },
}

export default function BlogPage() {
  return <BlogClient />
}
