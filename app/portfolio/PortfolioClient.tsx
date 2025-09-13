"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ExternalLink, Github, Calendar, Users, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useThemeContext } from "@/context/theme-context"
import { PortfolioCMS } from "@/lib/supabase-cms"
import type { ProjectDetail } from "@/lib/supabase"
import { OptimizedImage } from "@/components/optimized-image"

const categories = ["All", "Web Development", "App Development", "UI/UX Design", "E-commerce", "Enterprise Software"]

export default function PortfolioClient() {
  const { mode, color } = useThemeContext()
  const router = useRouter()
  const [projects, setProjects] = useState<ProjectDetail[]>([])
  const [filteredProjects, setFilteredProjects] = useState<ProjectDetail[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load projects from Supabase
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
    } catch (error) {
      console.error("Error loading projects:", error)
      setError("Failed to load projects")
    } finally {
      setIsLoading(false)
    }
  }

  // Filter projects based on category and search term
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
      return "bg-gray-900/80 border border-gray-700/50"
    } else {
      return "bg-white/90 border border-gray-200/50"
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
      return "text-gray-400"
    } else {
      return "text-gray-600"
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-96 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-128 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`${getCardBgClass()} rounded-lg overflow-hidden animate-pulse`}>
                <div className="h-64 bg-gray-300 dark:bg-gray-700" />
                <div className="p-6">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4" />
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16" />
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20" />
                  </div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen theme-bg theme-transition relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="text-center relative z-10">
          <h1 className={`text-4xl font-bold ${getTextClass()} mb-4`}>Portfolio</h1>
          <p className={`text-xl ${getSecondaryTextClass()} mb-8`}>
            Unable to load projects at the moment. Please try again later.
          </p>
          <Button onClick={loadProjects} className="bg-primary hover:bg-primary/90 text-white">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
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

      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-6">
            Our Portfolio
          </h1>
          <p className={`text-xl ${getSecondaryTextClass()} max-w-3xl mx-auto theme-transition`}>
            Explore our collection of successful projects that showcase our expertise in web development, mobile apps,
            and digital solutions.
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
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${getMutedTextClass()}`} />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${getTextClass()} bg-transparent border-gray-300 dark:border-gray-600`}
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
                      : `bg-transparent ${getTextClass()} border-gray-300 dark:border-gray-600 hover:bg-primary/10`
                  } theme-transition`}
                >
                  <Filter className="w-3 h-3 mr-1" />
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className={`mt-4 text-sm ${getMutedTextClass()} theme-transition`}>
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${getCardBgClass()} backdrop-blur-md rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 theme-transition group cursor-pointer`}
                onClick={() => router.push(`/portfolio/${project.slug}`)}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <OptimizedImage
                    src={project.images[0]?.url || "/placeholder.svg?height=300&width=400&text=Project+Image"}
                    alt={project.images[0]?.alt || project.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-primary text-white rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold ${getTextClass()} mb-2 theme-transition group-hover:text-primary`}>
                    {project.title}
                  </h3>
                  <p className={`${getSecondaryTextClass()} mb-4 line-clamp-2 theme-transition`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technology.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technology.length > 3 && (
                      <span className="px-3 py-1 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-full text-xs font-medium">
                        +{project.technology.length - 3} more
                      </span>
                    )}
                  </div>

                  <div
                    className={`flex items-center justify-between text-sm ${getMutedTextClass()} mb-4 theme-transition`}
                  >
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {project.team_size} {project.team_size === 1 ? "person" : "people"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {project.live_url && (
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.live_url!, "_blank")
                        }}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Live Demo
                      </Button>
                    )}
                    {project.github_url && (
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-semibold"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.github_url!, "_blank")
                        }}
                      >
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className={`text-2xl font-bold ${getTextClass()} mb-2 theme-transition`}>No projects found</h3>
            <p className={`${getSecondaryTextClass()} theme-transition`}>
              Try adjusting your search terms or category filters.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="mt-4 bg-primary hover:bg-primary/90 text-white"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
