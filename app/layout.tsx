import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { ThemeProvider } from "../components/theme-provider"
import { ThemeContextProvider } from "@/context/theme-context"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

// Enhanced SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://rapidxtech.com"),
  title: {
    default: "RapidXTech - Innovative Software Development Company",
    template: "%s | RapidXTech",
  },
  description:
    "RapidXTech delivers cutting-edge software solutions in web development, mobile apps, and enterprise systems. Transform your business with our expert development team.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "UI/UX design",
    "enterprise solutions",
    "custom software",
    "React development",
    "Node.js development",
    "full-stack development",
    "digital transformation",
    "startup solutions",
    "e-commerce development",
    "API development",
    "cloud solutions",
    "DevOps services",
  ],
  authors: [{ name: "RapidXTech Team", url: "https://rapidxtech.com" }],
  creator: "RapidXTech",
  publisher: "RapidXTech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rapidxtech.com",
    siteName: "RapidXTech",
    title: "RapidXTech - Innovative Software Development Company",
    description:
      "Transform your business with cutting-edge software solutions. Expert web development, mobile apps, and enterprise systems.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RapidXTech - Software Development Company",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RapidXTech - Innovative Software Development Company",
    description:
      "Transform your business with cutting-edge software solutions. Expert web development, mobile apps, and enterprise systems.",
    images: ["/og-image.jpg"],
    creator: "@rapidxtech",
    site: "@rapidxtech",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
    yandex: "verification_token",
    yahoo: "verification_token",
    other: {
      me: ["mailto:contact@rapidxtech.com"],
    },
  },
  alternates: {
    canonical: "https://rapidxtech.com",
    languages: {
      "en-US": "https://rapidxtech.com",
    },
  },
  category: "technology",
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
        {/* Preload critical resources */}
        <link rel="preload" href="/grid.svg" as="image" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme and viewport */}
        <meta name="theme-color" content="#1e3a8a" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e40af" media="(prefers-color-scheme: dark)" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className={`${inter.className} theme-transition antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ThemeContextProvider>
            <div className="flex flex-col min-h-screen relative overflow-hidden theme-bg theme-transition">
              <Header />
              <main className="flex-grow z-10" role="main">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeContextProvider>
        </ThemeProvider>

        {/* Enhanced structured data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://rapidxtech.com/#organization",
              name: "RapidXTech",
              url: "https://rapidxtech.com",
              logo: {
                "@type": "ImageObject",
                url: "https://rapidxtech.com/logo.png",
                width: 200,
                height: 60,
              },
              description:
                "Innovative software development company specializing in web development, mobile apps, and enterprise solutions.",
              foundingDate: "2020",
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-234-567-8900",
                contactType: "customer service",
                availableLanguage: ["English"],
                areaServed: "Worldwide",
              },
              sameAs: [
                "https://twitter.com/rapidxtech",
                "https://facebook.com/rapidxtech",
                "https://github.com/rapidxtech",
                "https://linkedin.com/company/rapidxtech",
              ],
              serviceType: [
                "Software Development",
                "Web Development",
                "Mobile App Development",
                "UI/UX Design",
                "Enterprise Solutions",
              ],
            }),
          }}
        />

        {/* Website schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://rapidxtech.com/#website",
              url: "https://rapidxtech.com",
              name: "RapidXTech",
              description: "Innovative software development company",
              publisher: {
                "@id": "https://rapidxtech.com/#organization",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://rapidxtech.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Performance monitoring */}
        <Script
          id="performance-observer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                      console.log('FID:', entry.processingStart - entry.startTime);
                    }
                    if (entry.entryType === 'layout-shift') {
                      if (!entry.hadRecentInput) {
                        console.log('CLS:', entry.value);
                      }
                    }
                  }
                });
                observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
