import type { Metadata } from "next"
import { ContactPageClient } from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us - RapidXSolution",
  description:
    "Get in touch with RapidXSolution for your digital transformation needs. We're here to help bring your vision to life.",
  keywords: "contact, get in touch, consultation, digital transformation, web development",
  openGraph: {
    title: "Contact Us - RapidXSolution",
    description:
      "Get in touch with RapidXSolution for your digital transformation needs. We're here to help bring your vision to life.",
    type: "website",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
