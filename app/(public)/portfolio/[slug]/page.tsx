import type { Metadata } from "next"
import { PortfolioCMS } from "@/lib/supabase-cms"
import { getImageUrl } from "@/lib/utils"
import ProjectClientPage from "./ProjectClientPage"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const project = await PortfolioCMS.getProjectBySlug(params.slug)

    if (!project) {
      return {
        title: "Project Not Found | RapidXTech",
      }
    }

    return {
      title: `${project.title} | RapidXTech Portfolio`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        type: "article",
        images: [
          {
            url: getImageUrl(project.images[0]?.url || ""),
            width: 1200,
            height: 600,
            alt: project.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description: project.description,
        images: [getImageUrl(project.images[0]?.url || "")],
      },
    }
  } catch (error) {
    return {
      title: "Project Not Found | RapidXTech",
    }
  }
}

export default async function ProjectPage() {
  return <ProjectClientPage />
}
