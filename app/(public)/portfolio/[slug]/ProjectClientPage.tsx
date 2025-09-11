"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import { useThemeContext } from "@/context/theme-context"
import type { ProjectDetail } from "@/lib/supabase"
import { OptimizedImage } from "@/components/optimized-image"
import { ImageCarousel } from "@/components/image-carousel"

interface Props {
  project: ProjectDetail
}

export function ProjectClientPage({ project }: Props) {
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
      {/* Background Elements */}
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

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Button variant="outline" asChild className="bg-transparent">
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
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary">
                  {project.category}
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
                  {project.title}
                </h1>
                <p className="text-xl theme-text opacity-80 mb-8 theme-transition">{project.description}</p>

                {/* Project Meta */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center">
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm theme-text opacity-70 theme-transition">Duration</div>
                    <div className="font-semibold theme-text theme-transition">{project.duration}</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm theme-text opacity-70 theme-transition">Team Size</div>
                    <div className="font-semibold theme-text theme-transition">{project.team_size} members</div>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm theme-text opacity-70 theme-transition">Status</div>
                    <div className="font-semibold theme-text theme-transition">Completed</div>
                  </div>
                  <div className="text-center">
                    <Star className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm theme-text opacity-70 theme-transition">Client Type</div>
                    <div className="font-semibold theme-text theme-transition">{project.client_type}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {project.live_url && (
                    <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live Site
                      </a>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button variant="outline" asChild className="bg-transparent">
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Project Image */}
              <div className="lg:w-1/2">
                <Card
                  className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition overflow-hidden`}
                >
                  <OptimizedImage
                    src={project.images[0]?.url || "/placeholder.svg?height=400&width=600&text=Project+Image"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </Card>
              </div>
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold theme-text mb-6 theme-transition">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technology.map((tech, index) => (
                    <Badge key={index} variant="outline" className="px-4 py-2 text-sm theme-text">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Details */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Challenge */}
            {project.challenge && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition h-full`}>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold theme-text mb-4 theme-transition">The Challenge</h3>
                    <p className="theme-text opacity-80 theme-transition leading-relaxed">{project.challenge}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Solution */}
            {project.solution && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition h-full`}>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold theme-text mb-4 theme-transition">Our Solution</h3>
                    <p className="theme-text opacity-80 theme-transition leading-relaxed">{project.solution}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-12"
            >
              <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold theme-text mb-6 theme-transition">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-center theme-text theme-transition">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold theme-text mb-6 theme-transition">Results & Impact</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.results.map((result, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{result}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Image Gallery */}
          {project.images && project.images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mb-12"
            >
              <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold theme-text mb-6 theme-transition">Project Gallery</h3>
                  <ImageCarousel images={project.images} />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Testimonial */}
          {project.testimonial && project.testimonial.quote && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-12"
            >
              <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                <CardContent className="p-8 text-center">
                  <div className="text-4xl text-primary mb-4">"</div>
                  <blockquote className="text-xl theme-text opacity-90 mb-6 theme-transition italic">
                    {project.testimonial.quote}
                  </blockquote>
                  <div className="theme-text theme-transition">
                    <div className="font-semibold">{project.testimonial.author}</div>
                    <div className="opacity-70">
                      {project.testimonial.position} at {project.testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent theme-gradient-text theme-transition">
                  Interested in Similar Results?
                </h2>
                <p className="text-lg theme-text opacity-80 mb-8 max-w-2xl mx-auto theme-transition">
                  Let's discuss how we can help you achieve your project goals with our expertise
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4" asChild>
                    <Link href="/contact">Start Your Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-4 bg-transparent" asChild>
                    <Link href="/portfolio">View More Projects</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
