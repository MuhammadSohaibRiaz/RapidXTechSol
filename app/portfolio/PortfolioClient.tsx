"use client"

import Link from "next/link"
import { PortfolioCMS } from "@/lib/supabase-cms"
import { getProjectSlug } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function PortfolioClient() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await PortfolioCMS.getPublishedProjects()
      setProjects(data)
    }

    fetchProjects()
  }, [])

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
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent theme-gradient-text theme-transition">
            Our Portfolio
          </h1>
          <p className="text-center theme-text opacity-80 max-w-2xl mx-auto theme-transition">
            Discover our successful projects and the innovative solutions we've delivered for our clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const slug = getProjectSlug(project.title)
            return (
              <article
                key={project.id}
                className="bg-background/30 backdrop-blur-md rounded-lg overflow-hidden shadow-lg h-full flex flex-col theme-transition hover:transform hover:scale-105 transition-all duration-300"
                itemScope
                itemType="http://schema.org/CreativeWork"
              >
                <Link href={`/portfolio/${slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.images[0]?.url || "/placeholder.svg?height=200&width=400&text=Project+Image"}
                      alt={project.images[0]?.alt || project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      itemProp="image"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-primary/90 text-white rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="p-6 flex-grow">
                  <Link href={`/portfolio/${slug}`}>
                    <h2
                      className="text-xl font-semibold mb-2 theme-text hover:opacity-80 transition-colors theme-transition"
                      itemProp="name"
                    >
                      {project.title}
                    </h2>
                  </Link>

                  <p className="theme-text opacity-80 mb-4 theme-transition" itemProp="description">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technology.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs bg-secondary/20 theme-text px-2 py-1 rounded theme-transition">
                        {tech}
                      </span>
                    ))}
                    {project.technology.length > 3 && (
                      <span className="text-xs theme-text opacity-60 px-2 py-1">
                        +{project.technology.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-sm theme-text opacity-60 mb-4 theme-transition">
                    <span>{project.duration}</span>
                    <span>{project.team_size} team members</span>
                  </div>
                </div>

                <div className="px-6 pb-6 mt-auto">
                  <Link href={`/portfolio/${slug}`} className="block w-full">
                    <button className="w-full bg-primary hover:bg-primary/90 theme-text py-2 px-4 rounded transition-colors theme-transition">
                      View Project
                    </button>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold theme-text mb-2 theme-transition">No projects yet</h3>
            <p className="theme-text opacity-70 theme-transition">Check back soon for our latest projects</p>
          </div>
        )}
      </div>
    </div>
  )
}
