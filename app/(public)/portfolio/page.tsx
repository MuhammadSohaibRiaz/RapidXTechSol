import type { Metadata } from "next"
import { PortfolioClient } from "./PortfolioClient"

export const metadata: Metadata = {
  title: "Portfolio - Our Successful Projects",
  description:
    "Explore our portfolio of successful software development projects. See how we've helped businesses transform with innovative solutions.",
  openGraph: {
    title: "Portfolio - Our Successful Projects | RapidXTech",
    description:
      "Explore our portfolio of successful software development projects. See how we've helped businesses transform with innovative solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Our Successful Projects | RapidXTech",
    description:
      "Explore our portfolio of successful software development projects. See how we've helped businesses transform with innovative solutions.",
  },
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
