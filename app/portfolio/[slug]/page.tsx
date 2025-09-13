"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Building, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageCarousel } from "@/components/image-carousel"
import { useThemeContext } from "@/context/theme-context"
import { PortfolioCMS } from "@/lib/supabase-cms"
import type { ProjectDetail } from "@/lib/supabase"
import { notFound } from "next/navigation"

interface ProjectDetailPageProps {
  params: { slug: string }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { mode, color } = useThemeContext()

  useEffect(() => {
    loadProject()
  }, [params.slug])

  const loadProject = async () => {
    try {
      setIsLoading(true)
      const data = await PortfolioCMS.getProjectBySlug(params.slug)
      if (data) {
        setProject(data)
      } else {
        notFound()
      }
    } catch (error) {
      console.error("Error loading project:", error)
      notFound()
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-white">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return notFound()
  }

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/90 border border-gray-700/50"
    } else {
      return "bg-white/95 border border-gray-200/50"
    }
  }

  const getTextClass = () => {
    if (mode === "dark" || color === "black") {
      return "text-white"
    } else {
      return "text-gray-900"
    }
  }

  const getSecondaryTextClass = () => {
    if (mode === "dark" || color === "black") {
      return "text-gray-200"
    } else {
      return "text-gray-700"
    }
  }

  const getMutedTextClass = () => {
    if (mode === "dark" || color === "black") {
      return "text-gray-300"
    } else {
      return "text-gray-600"
    }
  }

  // Helper function to check if content exists and is not empty
  const hasContent = (content: any): boolean => {
    if (!content) return false
    if (Array.isArray(content)) {
      return content.length > 0 && content.some((item) => item && item.trim && item.trim() !== "")
    }
    if (typeof content === "string") {
      return content.trim() !== ""
    }
    return true
  }

  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <motion.div
          className="absolute inset-0 theme-glow blur-3xl theme-transition opacity-20"
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "50%", "0%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/portfolio">
            <Button variant="ghost" className={`${getTextClass()} hover:bg-primary/20 theme-transition`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium shadow-lg">
              {project.category}
            </span>
            {project.technology.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-lg"
              >
                {tech}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-4">
            {project.title}
          </h1>
          <p className={`text-xl ${getSecondaryTextClass()} max-w-3xl theme-transition leading-relaxed`}>
            {project.long_description || project.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Image Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ImageCarousel images={project.images} projectTitle={project.title} />
            </motion.div>

            {/* Project Overview - Only show if challenge or solution exists */}
            {(hasContent(project.challenge) || hasContent(project.solution)) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-8 shadow-xl theme-transition`}
              >
                <h2 className={`text-2xl font-bold ${getTextClass()} mb-6 theme-transition`}>Project Overview</h2>
                <div className="space-y-6">
                  {hasContent(project.challenge) && (
                    <div>
                      <h3 className={`text-lg font-semibold ${getTextClass()} mb-3 theme-transition`}>Challenge</h3>
                      <p className={`${getSecondaryTextClass()} theme-transition leading-relaxed`}>
                        {project.challenge}
                      </p>
                    </div>
                  )}
                  {hasContent(project.solution) && (
                    <div>
                      <h3 className={`text-lg font-semibold ${getTextClass()} mb-3 theme-transition`}>Solution</h3>
                      <p className={`${getSecondaryTextClass()} theme-transition leading-relaxed`}>
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {/* Key Features - Only show if features exist and are not empty */}
            {hasContent(project.features) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-8 shadow-xl theme-transition`}
              >
                <h2 className={`text-2xl font-bold ${getTextClass()} mb-6 theme-transition`}>Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features
                    .filter((feature) => feature && feature.trim() !== "")
                    .map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className={`${getTextClass()} theme-transition`}>{feature}</span>
                      </motion.div>
                    ))}
                </div>
              </motion.section>
            )}

            {/* Results - Only show if results exist and are not empty */}
            {hasContent(project.results) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-8 shadow-xl theme-transition`}
              >
                <h2 className={`text-2xl font-bold ${getTextClass()} mb-6 theme-transition`}>Results & Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.results
                    .filter((result) => result && result.trim() !== "")
                    .map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 shadow-lg"
                      >
                        <div className="text-3xl font-bold text-primary mb-2">{result.match(/\d+%?/)?.[0] || "✓"}</div>
                        <p className={`${getSecondaryTextClass()} text-sm theme-transition font-medium`}>
                          {result.replace(/\d+%?\s*/, "")}
                        </p>
                      </motion.div>
                    ))}
                </div>
              </motion.section>
            )}

            {/* Technology Stack */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-8 shadow-xl theme-transition`}
            >
              <h2 className={`text-2xl font-bold ${getTextClass()} mb-6 theme-transition`}>Technology Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.technology.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            {/* NO TESTIMONIAL SECTION - COMPLETELY REMOVED */}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 shadow-xl theme-transition`}
            >
              <h3 className={`text-xl font-bold ${getTextClass()} mb-4 theme-transition`}>Project Details</h3>
              <div className="space-y-4">
                {hasContent(project.duration) && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <div className={`text-sm ${getMutedTextClass()} theme-transition`}>Duration</div>
                      <div className={`font-semibold ${getTextClass()} theme-transition text-lg`}>
                        {project.duration}
                      </div>
                    </div>
                  </div>
                )}
                {project.team_size && (
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <div className={`text-sm ${getMutedTextClass()} theme-transition`}>Team Size</div>
                      <div className={`font-semibold ${getTextClass()} theme-transition text-lg`}>
                        {project.team_size} members
                      </div>
                    </div>
                  </div>
                )}
                {hasContent(project.client_type) && (
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-primary" />
                    <div>
                      <div className={`text-sm ${getMutedTextClass()} theme-transition`}>Client Type</div>
                      <div className={`font-semibold ${getTextClass()} theme-transition text-lg`}>
                        {project.client_type}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-3"
            >
              {hasContent(project.live_url) && (
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Project
                  </a>
                </Button>
              )}
              {hasContent(project.github_url) && (
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Source Code
                  </a>
                </Button>
              )}
              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/contact">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discuss Your Project
                </Link>
              </Button>
            </motion.div>

            {/* CTA section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 shadow-xl theme-transition`}
            >
              <h3 className={`text-xl font-bold ${getTextClass()} mb-4 theme-transition`}>
                Ready to Start Your Project?
              </h3>
              <p className={`text-sm ${getMutedTextClass()} mb-4 theme-transition leading-relaxed`}>
                Let's discuss how we can help bring your unique vision to life with our expertise and dedication to
                excellence.
              </p>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/contact">Get a Free Consultation</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
