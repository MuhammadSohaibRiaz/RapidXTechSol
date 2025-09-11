import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with RapidXTech",
  description:
    "Ready to start your next project? Contact RapidXTech today to discuss your software development needs and get a free consultation.",
  openGraph: {
    title: "Contact Us - Get in Touch with RapidXTech",
    description:
      "Ready to start your next project? Contact RapidXTech today to discuss your software development needs and get a free consultation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Get in Touch with RapidXTech",
    description:
      "Ready to start your next project? Contact RapidXTech today to discuss your software development needs and get a free consultation.",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
