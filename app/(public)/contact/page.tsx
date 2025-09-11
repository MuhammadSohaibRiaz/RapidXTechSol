import type { Metadata } from "next"
import { ContactPageClient } from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us - Get In Touch",
  description: "Ready to start your project? Get in touch with RapidXSolution for a free consultation and quote.",
  keywords: "contact, get quote, consultation, project inquiry, web development services",
  openGraph: {
    title: "Contact Us - Get In Touch | RapidXSolution",
    description: "Ready to start your project? Get in touch with RapidXSolution for a free consultation and quote.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Get In Touch | RapidXSolution",
    description: "Ready to start your project? Get in touch with RapidXSolution for a free consultation and quote.",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
