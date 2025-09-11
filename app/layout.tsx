import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeContextProvider } from "@/context/theme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "RapidXTech - Innovative Software Solutions",
    template: "%s | RapidXTech",
  },
  description:
    "Transform your business with cutting-edge software solutions. We specialize in web development, mobile apps, and digital transformation services.",
  keywords: [
    "software development",
    "web development",
    "mobile apps",
    "digital transformation",
    "custom software",
    "technology solutions",
  ],
  authors: [{ name: "RapidXTech Team" }],
  creator: "RapidXTech",
  publisher: "RapidXTech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rapidxtech.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rapidxtech.com",
    siteName: "RapidXTech",
    title: "RapidXTech - Innovative Software Solutions",
    description:
      "Transform your business with cutting-edge software solutions. We specialize in web development, mobile apps, and digital transformation services.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RapidXTech - Innovative Software Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RapidXTech - Innovative Software Solutions",
    description:
      "Transform your business with cutting-edge software solutions. We specialize in web development, mobile apps, and digital transformation services.",
    images: ["/og-image.jpg"],
    creator: "@rapidxtech",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
