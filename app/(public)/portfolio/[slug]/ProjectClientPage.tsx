"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Building, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageCarousel } from "@/components/image-carousel"
import { useThemeContext } from "@/context/theme-context"
import type { ProjectDetail } from "@/lib/supabase-cms"

interface ProjectClientPageProps {
  project: ProjectDetail
}

export function ProjectClientPage({ project }: ProjectClientPageProps) {
  const { mode, color } = useThemeContext()

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <motion.div
          className="absolute inset-0 theme-glow blur-3xl theme-transition"
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
          <Button variant="outline" className="theme-text hover:opacity-80 theme-transition bg-transparent" asChild>
            <Link href="/portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {project.category}
            </Badge>
            {project.technology.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="bg-secondary/20 theme-text theme-transition">
                {tech}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-4">
            {project.title}
          </h1>
          <p className="text-xl theme-text opacity-80 max-w-3xl theme-transition">{project.description}</p>
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

            {/* Project Overview */}
            {(project.challenge || project.solution) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold theme-text mb-6 theme-transition">Project Overview</h2>
                    <div className="space-y-6">
                      {project.challenge && (
                        <div>
                          <h3 className="text-lg font-semibold theme-text mb-2 theme-transition">Challenge</h3>
                          <p className="theme-text opacity-80 theme-transition">{project.challenge}</p>
                        </div>
                      )}
                      {project.solution && (
                        <div>
                          <h3 className="text-lg font-semibold theme-text mb-2 theme-transition">Solution</h3>
                          <p className="theme-text opacity-80 theme-transition">{project.solution}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && project.features[0] && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold theme-text mb-6 theme-transition">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.features
                        .filter((feature) => feature.trim())
                        .map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                            <span className="theme-text theme-transition">{feature}</span>
                          </motion.div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && project.results[0] && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold theme-text mb-6 theme-transition">Results & Impact</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.results
                        .filter((result) => result.trim())
                        .map((result, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                            className="text-center p-4 rounded-lg bg-primary/10"
                          >
                            <div className="text-2xl font-bold text-primary mb-2">
                              {result.match(/\d+%?/)?.[0] || "✓"}
                            </div>
                            <p className="theme-text text-sm theme-transition">{result.replace(/\d+%?\s*/, "")}</p>
                          </motion.div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            )}

            {/* Technology Stack */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold theme-text mb-6 theme-transition">Technology Stack</h2>
                  <div className="flex flex-wrap gap-3">
                    {project.technology.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        className="px-4 py-2 bg-gradient-to-r theme-gradient text-white rounded-full text-sm font-medium shadow-lg"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Client Testimonial */}
            {project.testimonial && project.testimonial.quote && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold theme-text mb-6 theme-transition">Client Feedback</h2>
                    <div className="space-y-4">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-lg theme-text italic mb-4 theme-transition">
                        "{project.testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r theme-gradient rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{project.testimonial.author.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-semibold theme-text theme-transition">{project.testimonial.author}</div>
                          <div className="text-sm theme-text opacity-70 theme-transition">
                            {project.testimonial.position} at {project.testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold theme-text mb-4 theme-transition">Project Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm theme-text opacity-70 theme-transition">Duration</div>
                        <div className="font-medium theme-text theme-transition">{project.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm theme-text opacity-70 theme-transition">Team Size</div>
                        <div className="font-medium theme-text theme-transition">{project.team_size} members</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm theme-text opacity-70 theme-transition">Client Type</div>
                        <div className="font-medium theme-text theme-transition">{project.client_type}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-3"
            >
              {project.live_url && (
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Project
                  </a>
                </Button>
              )}
              {project.github_url && (
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Source Code
                  </a>
                </Button>
              )}
              <Button asChild variant="outline" className="w-full bg-transparent">
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
            >
              <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold theme-text mb-4 theme-transition">Ready to Start Your Project?</h3>
                  <p className="text-sm theme-text opacity-70 mb-4 theme-transition">
                    Let's discuss how we can help bring your unique vision to life with our expertise and dedication to
                    excellence.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/contact">Get a Free Consultation</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
