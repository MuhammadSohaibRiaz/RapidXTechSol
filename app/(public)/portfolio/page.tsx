import { Suspense } from "react"
import PortfolioClient from "./PortfolioClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio - RapidXSolution",
  description:
    "Explore our portfolio of innovative web development, mobile app development, and digital solutions. See how we transform ideas into exceptional digital experiences.",
  keywords: ["portfolio", "web development", "mobile apps", "digital solutions", "case studies"],
  openGraph: {
    title: "Portfolio - RapidXSolution",
    description:
      "Explore our portfolio of innovative digital solutions and see how we transform ideas into exceptional experiences.",
    type: "website",
  },
}

function PortfolioLoading() {
  return (
    <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="theme-text theme-transition">Loading portfolio...</p>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<PortfolioLoading />}>
      <PortfolioClient />
    </Suspense>
  )
}
