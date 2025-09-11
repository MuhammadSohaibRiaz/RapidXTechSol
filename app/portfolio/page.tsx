import type { Metadata } from "next"
import PortfolioClient from "./PortfolioClient"

export const metadata: Metadata = {
  title: "Portfolio | RapidXTech",
  description:
    "Explore our portfolio of successful projects including web development, mobile apps, and enterprise solutions.",
  openGraph: {
    title: "Portfolio | RapidXTech",
    description:
      "Explore our portfolio of successful projects including web development, mobile apps, and enterprise solutions.",
    url: "https://rapidxtech.com/portfolio",
    siteName: "RapidXTech",
    images: [
      {
        url: "https://rapidxtech.com/og-portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "RapidXTech Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default async function Portfolio() {
  return <PortfolioClient />
}
