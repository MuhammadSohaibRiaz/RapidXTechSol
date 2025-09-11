import type { Metadata } from "next"
import { AboutClientPage } from "./AboutClientPage"

export const metadata: Metadata = {
  title: "About Us - Our Story & Team",
  description:
    "Learn about RapidXSolution's mission, values, and the expert team behind our innovative digital solutions.",
  keywords: "about us, team, company story, mission, values, digital agency, web development team",
  openGraph: {
    title: "About Us - Our Story & Team | RapidXSolution",
    description:
      "Learn about RapidXSolution's mission, values, and the expert team behind our innovative digital solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Our Story & Team | RapidXSolution",
    description:
      "Learn about RapidXSolution's mission, values, and the expert team behind our innovative digital solutions.",
  },
}

export default function AboutPage() {
  return <AboutClientPage />
}
