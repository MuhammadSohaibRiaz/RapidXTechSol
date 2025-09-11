"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ExternalLink, Github, Calendar, Users, Filter } from "lucide-react"
import Link from "next/link"
import { useThemeContext } from "@/context/theme-context"
import { PortfolioCMS } from "@/lib/supabase-cms"
import type { ProjectDetail } from "@/lib/supabase"
import { OptimizedImage } from "@/components/optimized-image"

const categories = ["All", "Web Development", "Mobile App", "E-commerce", "UI/UX Design", "Custom Software"]

export function PortfolioClient() {
  const { mode, color } = useThemeContext()
  const [projects, setProjects] = useState<ProjectDetail[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ProjectDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await PortfolioCMS.getPublishedProjects()
        setProjects(projectsData)
        setFilteredProjects(projectsData)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    let filtered = projects

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.technology.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredProjects(filtered)
  }, [projects, selectedCategory, searchTerm])

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="theme-text theme-transition">Loading portfolio...</p>
        </div>
      </div>
    )
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
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
              Our Portfolio
            </h1>
            <p className="text-xl theme-text opacity-80 max-w-3xl mx-auto theme-transition">
              Discover our latest projects and see how we've helped businesses transform their digital presence
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 mb-12 shadow-lg theme-transition`}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 theme-text opacity-50" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 theme-text bg-transparent border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`${
                      selectedCategory === category
                        ? "bg-primary text-white"
                        : "bg-transparent theme-text border-gray-300 dark:border-gray-600"
                    } transition-all duration-300`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
              <p className="theme-text opacity-70 theme-transition">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>
          </motion.div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg h-full theme-transition hover:transform hover:scale-105 transition-all duration-300 group`}
                  >
                    <div className="relative overflow-hidden rounded-t-lg">
                      <OptimizedImage
                        src={project.images[0]?.url || "/placeholder.svg?height=300&width=400&text=Project+Image"}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-primary/90 text-white">
                          {project.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold theme-text mb-3 theme-transition">{project.title}</h3>
                      <p className="theme-text opacity-80 mb-4 line-clamp-2 theme-transition">{project.description}</p>

                      {/* Project Details */}
                      <div className="flex items-center justify-between text-sm theme-text opacity-60 mb-4 theme-transition">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {project.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {project.team_size} members
                        </span>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technology.slice(0, 3).map((tech, i) => (
                          <Badge key={i} variant="outline" className="text-xs theme-text">
                            {tech}
                          </Badge>
                        ))}
                        {project.technology.length > 3 && (
                          <Badge variant="outline" className="text-xs theme-text">
                            +{project.technology.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-white">
                          <Link href={`/portfolio/${project.slug}`}>View Details</Link>
                        </Button>
                        {project.live_url && (
                          <Button variant="outline" size="sm" asChild className="bg-transparent">
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                        {project.github_url && (
                          <Button variant="outline" size="sm" asChild className="bg-transparent">
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Filter className="w-16 h-16 theme-text opacity-50 mx-auto mb-4" />
              <h3 className="text-2xl font-bold theme-text mb-2 theme-transition">No Projects Found</h3>
              <p className="theme-text opacity-70 theme-transition">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent theme-gradient-text theme-transition">
                  Ready to Start Your Project?
                </h2>
                <p className="text-lg theme-text opacity-80 mb-8 max-w-2xl mx-auto theme-transition">
                  Let's discuss your ideas and create something amazing together
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4" asChild>
                  <Link href="/contact">Get Started Today</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
