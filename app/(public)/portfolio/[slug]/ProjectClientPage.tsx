"use client"

import { PortfolioCMS } from "@/lib/supabase-cms"
import { getImageUrl } from "@/lib/utils"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Award } from "lucide-react"
import { useParams } from "next/navigation"

export default async function ProjectClientPage() {
  const params = useParams<{ slug: string }>()

  try {
    const project = await PortfolioCMS.getProjectBySlug(params.slug)

    if (!project) {
      notFound()
    }

    return (
      <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div
            className="absolute inset-0 theme-glow blur-3xl theme-transition"
            style={{
              animation: "gradient-animation 20s linear infinite alternate",
            }}
          />
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center theme-text hover:opacity-80 mb-8 theme-transition"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Portfolio
          </Link>

          <article
            className="bg-background/30 backdrop-blur-md rounded-lg overflow-hidden shadow-lg max-w-6xl mx-auto"
            itemScope
            itemType="http://schema.org/CreativeWork"
          >
            {/* Hero Image */}
            <div className="relative h-64 md:h-96">
              <img
                src={getImageUrl(project.images[0]?.url || "")}
                alt={project.images[0]?.alt || project.title}
                className="w-full h-full object-cover"
                itemProp="image"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-primary/90 text-white rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="p-8">
              {/* Project Header */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 theme-text theme-transition" itemProp="name">
                  {project.title}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm theme-text opacity-70 mb-6 theme-transition">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{project.team_size} team members</span>
                  </div>
                  {project.client_type && (
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      <span>{project.client_type}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Project
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 theme-text hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  )}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technology.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-secondary/20 theme-text rounded-full text-sm theme-transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div className="prose prose-lg max-w-none theme-transition mb-8">
                <p className="text-lg theme-text opacity-90 theme-transition" itemProp="description">
                  {project.description}
                </p>
                {project.long_description && (
                  <div
                    className="mt-6 theme-text opacity-80 theme-transition"
                    dangerouslySetInnerHTML={{ __html: project.long_description }}
                  />
                )}
              </div>

              {/* Challenge & Solution */}
              {(project.challenge || project.solution) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {project.challenge && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 theme-text theme-transition">Challenge</h3>
                      <p className="theme-text opacity-80 theme-transition">{project.challenge}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 theme-text theme-transition">Solution</h3>
                      <p className="theme-text opacity-80 theme-transition">{project.solution}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Results & Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {project.results && project.results.length > 0 && project.results[0] && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 theme-text theme-transition">Results & Impact</h3>
                    <ul className="space-y-2">
                      {project.results.map((result, i) => (
                        <li key={i} className="flex items-start theme-text opacity-80 theme-transition">
                          <Award className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.features && project.features.length > 0 && project.features[0] && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 theme-text theme-transition">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start theme-text opacity-80 theme-transition">
                          <Award className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Additional Images */}
              {project.images.length > 1 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 theme-text theme-transition">Project Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.slice(1).map((image, i) => (
                      <div key={i} className="relative">
                        <img
                          src={getImageUrl(image.url) || "/placeholder.svg"}
                          alt={image.alt}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        {image.caption && (
                          <p className="text-sm theme-text opacity-70 mt-2 theme-transition">{image.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Client Testimonial */}
              {project.testimonial && project.testimonial.quote && (
                <div className="bg-primary/10 rounded-lg p-6 mb-8">
                  <blockquote className="text-lg italic theme-text mb-4 theme-transition">
                    "{project.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div>
                      <div className="font-semibold theme-text theme-transition">{project.testimonial.author}</div>
                      <div className="text-sm theme-text opacity-70 theme-transition">
                        {project.testimonial.position}, {project.testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading project:", error)
    notFound()
  }
}
