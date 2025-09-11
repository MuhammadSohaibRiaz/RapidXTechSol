import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeContextProvider } from "@/context/theme-context"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "RapidXSolution - Innovative Web & Mobile Development",
    template: "%s | RapidXSolution",
  },
  description:
    "Transform your ideas into exceptional digital experiences with RapidXSolution. Expert web development, mobile apps, and digital solutions for startups and enterprises.",
  keywords: [
    "web development",
    "mobile app development",
    "digital solutions",
    "startup development",
    "enterprise software",
  ],
  authors: [{ name: "RapidXSolution Team" }],
  creator: "RapidXSolution",
  publisher: "RapidXSolution",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rapidxsolution.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rapidxsolution.vercel.app",
    siteName: "RapidXSolution",
    title: "RapidXSolution - Innovative Web & Mobile Development",
    description: "Transform your ideas into exceptional digital experiences with expert development services.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RapidXSolution - Web & Mobile Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RapidXSolution - Innovative Web & Mobile Development",
    description: "Transform your ideas into exceptional digital experiences with expert development services.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeContextProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Suspense fallback={null}>
              {children}
              <Analytics />
            </Suspense>
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  )
}
