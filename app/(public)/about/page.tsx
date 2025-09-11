import type { Metadata } from "next"
import { AboutClientPage } from "./AboutClientPage"

export const metadata: Metadata = {
  title: "About Us - RapidXSolution",
  description:
    "Learn about RapidXSolution's mission, values, and the expert team behind our innovative digital solutions.",
  keywords: "about us, team, mission, values, company, digital agency",
  openGraph: {
    title: "About Us - RapidXSolution",
    description:
      "Learn about RapidXSolution's mission, values, and the expert team behind our innovative digital solutions.",
    type: "website",
  },
}

export default function AboutPage() {
  return <AboutClientPage />
}
