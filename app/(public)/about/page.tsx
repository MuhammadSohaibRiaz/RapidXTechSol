import type { Metadata } from "next"
import AboutClientPage from "./AboutClientPage"

export const metadata: Metadata = {
  title: "About Us - Meet the RapidXTech Team",
  description:
    "Learn about RapidXTech's mission, values, and the talented team behind our innovative software solutions.",
  openGraph: {
    title: "About Us - Meet the RapidXTech Team",
    description:
      "Learn about RapidXTech's mission, values, and the talented team behind our innovative software solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Meet the RapidXTech Team",
    description:
      "Learn about RapidXTech's mission, values, and the talented team behind our innovative software solutions.",
  },
}

export default function AboutPage() {
  return <AboutClientPage />
}
