import type { Metadata } from "next"
import { PortfolioClient } from "./PortfolioClient"

export const metadata: Metadata = {
  title: "Portfolio - Our Work & Case Studies",
  description:
    "Explore our portfolio of successful projects including web applications, mobile apps, and digital transformation solutions.",
  keywords: "portfolio, case studies, web development projects, mobile apps, digital solutions, client work",
  openGraph: {
    title: "Portfolio - Our Work & Case Studies | RapidXSolution",
    description:
      "Explore our portfolio of successful projects including web applications, mobile apps, and digital transformation solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Our Work & Case Studies | RapidXSolution",
    description:
      "Explore our portfolio of successful projects including web applications, mobile apps, and digital transformation solutions.",
  },
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
