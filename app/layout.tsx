import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeContextProvider } from "@/context/theme-context"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "RapidXSolution - Digital Innovation & Web Development",
    template: "%s | RapidXSolution",
  },
  description:
    "Transform your business with cutting-edge web development, mobile apps, and digital solutions. Expert team delivering innovative technology solutions for modern businesses.",
  keywords:
    "web development, mobile apps, digital transformation, software development, UI/UX design, e-commerce, custom solutions",
  authors: [{ name: "RapidXSolution Team" }],
  creator: "RapidXSolution",
  publisher: "RapidXSolution",
  metadataBase: new URL("https://rapidxsolution.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rapidxsolution.com",
    siteName: "RapidXSolution",
    title: "RapidXSolution - Digital Innovation & Web Development",
    description:
      "Transform your business with cutting-edge web development, mobile apps, and digital solutions. Expert team delivering innovative technology solutions for modern businesses.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RapidXSolution - Digital Innovation & Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RapidXSolution - Digital Innovation & Web Development",
    description: "Transform your business with cutting-edge web development, mobile apps, and digital solutions.",
    images: ["/og-image.jpg"],
    creator: "@rapidxsolution",
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
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <ThemeContextProvider>
              {children}
              <Analytics />
            </ThemeContextProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
