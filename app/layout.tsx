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
  title: "RapidXTech Solutions - Premium Web & Mobile Development",
  description:
    "Transform your business with cutting-edge web and mobile applications. Expert development, stunning design, and scalable solutions.",
  keywords: "web development, mobile apps, React, Next.js, UI/UX design, software development",
  authors: [{ name: "RapidXTech Solutions" }],
  creator: "RapidXTech Solutions",
  publisher: "RapidXTech Solutions",
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
    title: "RapidXTech Solutions - Premium Web & Mobile Development",
    description: "Transform your business with cutting-edge web and mobile applications.",
    url: "https://rapidxtech.com",
    siteName: "RapidXTech Solutions",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RapidXTech Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RapidXTech Solutions - Premium Web & Mobile Development",
    description: "Transform your business with cutting-edge web and mobile applications.",
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
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ThemeContextProvider>
              {children}
              <Analytics />
            </ThemeContextProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
