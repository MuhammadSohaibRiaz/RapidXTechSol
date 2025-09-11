"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, ExternalLink, Github, Calendar, Users, Tag } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"
import { useThemeContext } from "@/context/theme-context"
import { PortfolioCMS } from "@/lib/supabase-cms"
import type { ProjectDetail } from "@/lib/supabase"
import Link from "next/link"
import { slugify } from "@/lib/utils"

const categories = ["All", "Web Development", "App Development", "UI/UX Design", "E-commerce", "Enterprise Software"]

export default function PortfolioClient() {
  const { mode, color } = useThemeContext()
  const [projects, setProjects] = useState<ProjectDetail[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ProjectDetail[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await PortfolioCMS.getPublishedProjects()
      setProjects(data)
      setFilteredProjects(data)
    } catch (err) {
      console.error("Error loading projects:", err)
      setError("Failed to load projects. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let filtered = projects

    if (selectedCategory !== "All") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

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

  if (error) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold theme-text mb-2">Error Loading Portfolio</h2>
          <p className="theme-text opacity-70 mb-4">{error}</p>
          <Button onClick={loadProjects} className="bg-primary hover:bg-primary/90 text-white">
            Try Again
          </Button>
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

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl theme-text opacity-80 theme-transition max-w-3xl mx-auto">
            Discover our latest projects and see how we transform ideas into exceptional digital experiences
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 mb-8 shadow-lg theme-transition`}
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
                  className={
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-transparent theme-text border-gray-300 dark:border-gray-600"
                  }
                >
                  <Filter className="w-3 h-3 mr-1" />
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

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`${getCardBgClass()} backdrop-blur-md rounded-lg overflow-hidden animate-pulse`}>
                <div className="h-64 bg-gray-300 dark:bg-gray-700" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                  <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${getCardBgClass()} backdrop-blur-md rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 theme-transition group`}
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <OptimizedImage
                      src={project.images[0]?.url || "/placeholder.svg?height=300&width=400&text=Project+Image"}
                      alt={project.images[0]?.alt || project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-primary text-white rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold theme-text mb-2 theme-transition group-hover:text-primary">
                      {project.title}
                    </h3>

                    <p className="theme-text opacity-70 mb-4 line-clamp-3 theme-transition">{project.description}</p>

                    {/* Project Meta */}
                    <div className="flex items-center justify-between text-sm theme-text opacity-60 mb-4 theme-transition">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {project.duration || "N/A"}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {project.team_size} {project.team_size === 1 ? "member" : "members"}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technology.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-secondary/20 theme-text rounded text-xs theme-transition flex items-center"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tech}
                        </span>
                      ))}
                      {project.technology.length > 3 && (
                        <span className="px-2 py-1 bg-secondary/20 theme-text rounded text-xs theme-transition">
                          +{project.technology.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link
                        href={`/portfolio/${slugify(project.title)}`}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-center transition-colors duration-200 text-sm font-medium"
                      >
                        View Details
                      </Link>
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                          <ExternalLink className="w-4 h-4 theme-text" />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                          <Github className="w-4 h-4 theme-text" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold theme-text mb-2 theme-transition">No Projects Found</h3>
            <p className="theme-text opacity-70 theme-transition mb-6">
              {searchTerm || selectedCategory !== "All"
                ? "Try adjusting your search or filter criteria"
                : "No projects are currently available"}
            </p>
            {(searchTerm || selectedCategory !== "All") && (
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                variant="outline"
                className="bg-transparent theme-text border-gray-300 dark:border-gray-600"
              >
                Clear Filters
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
