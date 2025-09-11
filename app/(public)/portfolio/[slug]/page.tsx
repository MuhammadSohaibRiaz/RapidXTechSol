import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PortfolioCMS } from "@/lib/supabase-cms"
import { ProjectClientPage } from "./ProjectClientPage"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const project = await PortfolioCMS.getProjectBySlug(params.slug)

    if (!project) {
      return {
        title: "Project Not Found - RapidXSolution",
        description: "The requested project could not be found.",
      }
    }

    return {
      title: `${project.title} - RapidXSolution Portfolio`,
      description: project.description,
      keywords: project.technology.join(", "),
      openGraph: {
        title: `${project.title} - RapidXSolution Portfolio`,
        description: project.description,
        type: "article",
        images: project.images && project.images.length > 0 ? [project.images[0].url] : [],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Project - RapidXSolution",
      description: "View our project details and case study.",
    }
  }
}

export default async function ProjectPage({ params }: Props) {
  try {
    const project = await PortfolioCMS.getProjectBySlug(params.slug)

    if (!project) {
      notFound()
    }

    return <ProjectClientPage project={project} />
  } catch (error) {
    console.error("Error fetching project:", error)
    notFound()
  }
}
