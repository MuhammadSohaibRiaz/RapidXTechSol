"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Search,
  Calendar,
  Users,
  ChevronDown,
  FileText,
  Briefcase,
} from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { AdminAuth } from "@/components/admin-auth"
import { AdminLayout } from "@/components/admin-layout"
import { useAdminAuth } from "@/lib/auth"
import { useSupabaseCMS } from "@/lib/supabase-cms"
import type { ProjectDetail, BlogPost } from "@/lib/supabase"
import { slugify } from "@/lib/utils"

// Categories and technologies
const categories = ["Web Development", "App Development", "UI/UX Design", "E-commerce", "Enterprise Software"]
const technologies = [
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Node.js",
  "Express",
  "Python",
  "Django",
  "Flask",
  "PHP",
  "Laravel",
  "Ruby",
  "Rails",
  "Java",
  "Spring",
  "C#",
  ".NET",
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST API",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Sass",
  "Tailwind CSS",
  "Material-UI",
  "Bootstrap",
  "Figma",
  "Adobe XD",
]

const blogTags = [
  "web development",
  "mobile development",
  "UI/UX",
  "javascript",
  "react",
  "nodejs",
  "python",
  "database",
  "cloud computing",
  "devops",
  "artificial intelligence",
  "machine learning",
  "cybersecurity",
  "blockchain",
  "startup",
  "technology",
  "programming",
  "software engineering",
  "best practices",
  "tutorials",
]

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAdminAuth()
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      setShowDashboard(true)
    } else {
      setShowDashboard(false)
    }
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="theme-text theme-transition">Initializing admin panel...</p>
        </div>
      </div>
    )
  }

  if (!showDashboard) {
    return <AdminAuth onAuthenticated={() => setShowDashboard(true)} />
  }

  return (
    <AdminLayout>
      <AdminDashboardComponent />
    </AdminLayout>
  )
}

function AdminDashboardComponent() {
  const { mode, color } = useThemeContext()
  const cms = useSupabaseCMS()

  // State management
  const [activeTab, setActiveTab] = useState<"projects" | "blog">("projects")
  const [projects, setProjects] = useState<ProjectDetail[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Form states
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false)
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<ProjectDetail | null>(null)
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")

  // Dropdown states
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)

  // Project form data
  const [projectFormData, setProjectFormData] = useState<Partial<ProjectDetail>>({
    title: "",
    category: "",
    technology: [],
    description: "",
    long_description: "",
    challenge: "",
    solution: "",
    results: [""],
    features: [""],
    images: [{ id: 1, url: "", alt: "", caption: "" }],
    duration: "",
    team_size: 1,
    client_type: "",
    live_url: "",
    github_url: "",
    is_published: false,
    testimonial: {
      quote: "",
      author: "",
      position: "",
      company: "",
    },
  })

  // Blog form data
  const [blogFormData, setBlogFormData] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    tags: [],
    author: "RapidXTech Team",
    date: new Date().toISOString().split("T")[0],
    is_published: false,
    seo_title: "",
    seo_description: "",
  })

  // Load data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [projectsData, blogData] = await Promise.all([cms.getAllProjects(), cms.getAllBlogPosts()])
      setProjects(projectsData)
      setBlogPosts(blogData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // UI helper functions
  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  const getDropdownBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/95 border-gray-700"
    } else {
      return "bg-white/95 border-gray-300"
    }
  }

  // Filter data
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "All" || project.category === filterCategory
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Published" && project.is_published) ||
      (filterStatus === "Draft" && !project.is_published)

    return matchesSearch && matchesCategory && matchesStatus
  })

  const filteredBlogPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Published" && post.is_published) ||
      (filterStatus === "Draft" && !post.is_published)

    return matchesSearch && matchesStatus
  })

  // Project handlers
  const resetProjectForm = () => {
    setProjectFormData({
      title: "",
      category: "",
      technology: [],
      description: "",
      long_description: "",
      challenge: "",
      solution: "",
      results: [""],
      features: [""],
      images: [{ id: 1, url: "", alt: "", caption: "" }],
      duration: "",
      team_size: 1,
      client_type: "",
      live_url: "",
      github_url: "",
      is_published: false,
      testimonial: {
        quote: "",
        author: "",
        position: "",
        company: "",
      },
    })
    setEditingProject(null)
    setIsProjectFormOpen(false)
  }

  const handleEditProject = (project: ProjectDetail) => {
    setProjectFormData(project)
    setEditingProject(project)
    setIsProjectFormOpen(true)
  }

  const handleSaveProject = async () => {
    if (!projectFormData.title || !projectFormData.category || !projectFormData.description) {
      alert("Please fill in all required fields")
      return
    }

    try {
      if (editingProject) {
        await cms.updateProject(editingProject.id, projectFormData)
      } else {
        await cms.addProject(projectFormData as Omit<ProjectDetail, "id" | "created_at" | "updated_at">)
      }
      await loadData()
      resetProjectForm()
    } catch (error) {
      console.error("Error saving project:", error)
      alert("Error saving project. Please try again.")
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await cms.deleteProject(id)
        await loadData()
      } catch (error) {
        console.error("Error deleting project:", error)
        alert("Error deleting project. Please try again.")
      }
    }
  }

  const handleToggleProjectPublish = async (id: number) => {
    try {
      await cms.togglePublishStatus(id)
      await loadData()
    } catch (error) {
      console.error("Error toggling project publish status:", error)
      alert("Error updating project status. Please try again.")
    }
  }

  // Blog handlers
  const resetBlogForm = () => {
    setBlogFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image: "",
      tags: [],
      author: "RapidXTech Team",
      date: new Date().toISOString().split("T")[0],
      is_published: false,
      seo_title: "",
      seo_description: "",
    })
    setEditingBlogPost(null)
    setIsBlogFormOpen(false)
  }

  const handleEditBlogPost = (post: BlogPost) => {
    setBlogFormData(post)
    setEditingBlogPost(post)
    setIsBlogFormOpen(true)
  }

  const handleSaveBlogPost = async () => {
    if (!blogFormData.title || !blogFormData.excerpt || !blogFormData.content) {
      alert("Please fill in all required fields")
      return
    }

    try {
      const slug = blogFormData.slug || slugify(blogFormData.title || "")
      const formDataWithSlug = { ...blogFormData, slug }

      if (editingBlogPost) {
        await cms.updateBlogPost(editingBlogPost.id, formDataWithSlug)
      } else {
        await cms.addBlogPost(formDataWithSlug as Omit<BlogPost, "id" | "created_at" | "updated_at">)
      }
      await loadData()
      resetBlogForm()
    } catch (error) {
      console.error("Error saving blog post:", error)
      alert("Error saving blog post. Please try again.")
    }
  }

  const handleDeleteBlogPost = async (id: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await cms.deleteBlogPost(id)
        await loadData()
      } catch (error) {
        console.error("Error deleting blog post:", error)
        alert("Error deleting blog post. Please try again.")
      }
    }
  }

  const handleToggleBlogPublish = async (id: number) => {
    try {
      await cms.toggleBlogPublishStatus(id)
      await loadData()
    } catch (error) {
      console.error("Error toggling blog publish status:", error)
      alert("Error updating blog status. Please try again.")
    }
  }

  // Array helpers for projects
  const addProjectArrayItem = (field: "results" | "features") => {
    setProjectFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ""],
    }))
  }

  const updateProjectArrayItem = (field: "results" | "features", index: number, value: string) => {
    setProjectFormData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).map((item, i) => (i === index ? value : item)),
    }))
  }

  const removeProjectArrayItem = (field: "results" | "features", index: number) => {
    setProjectFormData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index),
    }))
  }

  const addProjectImage = () => {
    const newId = Math.max(...(projectFormData.images?.map((img) => img.id) || [0])) + 1
    setProjectFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), { id: newId, url: "", alt: "", caption: "" }],
    }))
  }

  const updateProjectImage = (index: number, field: keyof ProjectDetail["images"][0], value: string) => {
    setProjectFormData((prev) => ({
      ...prev,
      images: (prev.images || []).map((img, i) => (i === index ? { ...img, [field]: value } : img)),
    }))
  }

  const removeProjectImage = (index: number) => {
    setProjectFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen theme-bg theme-transition flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="theme-text theme-transition">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  const allCategories = ["All", ...categories]
  const statusOptions = ["All", "Published", "Draft"]

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
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-4">
            Content Management System
          </h1>
          <p className="theme-text opacity-80 theme-transition">
            Manage your portfolio projects and blog posts - add, edit, delete, and control visibility
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === "projects"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Projects</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{projects.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === "blog"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Blog</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{blogPosts.length}</span>
            </button>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 mb-8 shadow-lg theme-transition`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 theme-text opacity-50" />
                <Input
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 theme-text bg-transparent border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* Category Filter (Projects only) */}
              {activeTab === "projects" && (
                <div className="relative dropdown-container">
                  <button
                    onClick={() => {
                      setCategoryDropdownOpen(!categoryDropdownOpen)
                      setStatusDropdownOpen(false)
                    }}
                    className={`flex items-center justify-between w-full md:w-48 px-3 py-2 rounded-md border ${
                      mode === "dark" || color === "black"
                        ? "border-gray-600 bg-gray-800/50"
                        : "border-gray-300 bg-white/50"
                    } theme-text theme-transition hover:bg-opacity-80`}
                  >
                    <span>{filterCategory}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${categoryDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {categoryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute top-full left-0 right-0 mt-1 ${getDropdownBgClass()} backdrop-blur-md rounded-md shadow-lg border z-50 max-h-60 overflow-y-auto`}
                      >
                        {allCategories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setFilterCategory(category)
                              setCategoryDropdownOpen(false)
                            }}
                            className={`w-full text-left px-3 py-2 theme-text hover:bg-primary/20 transition-colors ${
                              filterCategory === category ? "bg-primary/10" : ""
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Status Filter */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => {
                    setStatusDropdownOpen(!statusDropdownOpen)
                    setCategoryDropdownOpen(false)
                  }}
                  className={`flex items-center justify-between w-full md:w-48 px-3 py-2 rounded-md border ${
                    mode === "dark" || color === "black"
                      ? "border-gray-600 bg-gray-800/50"
                      : "border-gray-300 bg-white/50"
                  } theme-text theme-transition hover:bg-opacity-80`}
                >
                  <span>{filterStatus}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${statusDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {statusDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute top-full left-0 right-0 mt-1 ${getDropdownBgClass()} backdrop-blur-md rounded-md shadow-lg border z-50`}
                    >
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setFilterStatus(status)
                            setStatusDropdownOpen(false)
                          }}
                          className={`w-full text-left px-3 py-2 theme-text hover:bg-primary/20 transition-colors ${
                            filterStatus === status ? "bg-primary/10" : ""
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Add Button */}
            <Button
              onClick={() => (activeTab === "projects" ? setIsProjectFormOpen(true) : setIsBlogFormOpen(true))}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add {activeTab === "projects" ? "Project" : "Blog Post"}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {activeTab === "projects" ? projects.length : blogPosts.length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">
                Total {activeTab === "projects" ? "Projects" : "Posts"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {activeTab === "projects"
                  ? projects.filter((p) => p.is_published).length
                  : blogPosts.filter((p) => p.is_published).length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">
                {activeTab === "projects"
                  ? projects.filter((p) => !p.is_published).length
                  : blogPosts.filter((p) => !p.is_published).length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">Drafts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {activeTab === "projects" ? filteredProjects.length : filteredBlogPosts.length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">Filtered</div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        {activeTab === "projects" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${getCardBgClass()} backdrop-blur-md rounded-lg shadow-lg overflow-hidden theme-transition`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.images[0]?.url || "/placeholder.svg?height=200&width=300&text=No+Image"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.is_published ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                      }`}
                    >
                      {project.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-secondary/20 theme-text rounded text-xs theme-transition">
                      {project.category}
                    </span>
                    <span className="text-xs theme-text opacity-50 theme-transition">
                      {new Date(project.updated_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold theme-text mb-2 theme-transition">{project.title}</h3>

                  <p className="text-sm theme-text opacity-70 mb-4 line-clamp-2 theme-transition">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-xs theme-text opacity-60 mb-4 theme-transition">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {project.team_size}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditProject(project)} className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleProjectPublish(project.id)}
                      className={project.is_published ? "text-yellow-600" : "text-green-600"}
                    >
                      {project.is_published ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {filteredBlogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${getCardBgClass()} backdrop-blur-md rounded-lg shadow-lg overflow-hidden theme-transition`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg?height=200&width=300&text=Blog+Post"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.is_published ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                      }`}
                    >
                      {post.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-secondary/20 theme-text rounded text-xs theme-transition">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs theme-text opacity-50 theme-transition">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold theme-text mb-2 theme-transition">{post.title}</h3>

                  <p className="text-sm theme-text opacity-70 mb-4 line-clamp-2 theme-transition">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-xs theme-text opacity-60 mb-4 theme-transition">
                    <span>{post.author}</span>
                    <span>{post.slug}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditBlogPost(post)} className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleBlogPublish(post.id)}
                      className={post.is_published ? "text-yellow-600" : "text-green-600"}
                    >
                      {post.is_published ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteBlogPost(post.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {((activeTab === "projects" && filteredProjects.length === 0) ||
          (activeTab === "blog" && filteredBlogPosts.length === 0)) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">{activeTab === "projects" ? "📁" : "📝"}</div>
            <h3 className="text-xl font-semibold theme-text mb-2 theme-transition">
              No {activeTab === "projects" ? "projects" : "blog posts"} found
            </h3>
            <p className="theme-text opacity-70 theme-transition">
              {searchTerm || filterCategory !== "All" || filterStatus !== "All"
                ? "Try adjusting your filters"
                : `Create your first ${activeTab === "projects" ? "project" : "blog post"} to get started`}
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Form Modal */}
      <AnimatePresence>
        {isProjectFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => resetProjectForm()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto theme-transition`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold theme-text theme-transition">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h2>
                <Button variant="ghost" onClick={resetProjectForm}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Title *</label>
                    <Input
                      value={projectFormData.title || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Project title"
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Category *</label>
                    <select
                      value={projectFormData.category || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, category: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md border ${
                        mode === "dark" || color === "black"
                          ? "border-gray-600 bg-gray-800/50"
                          : "border-gray-300 bg-white/50"
                      } theme-text theme-transition`}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                    Short Description *
                  </label>
                  <Textarea
                    value={projectFormData.description || ""}
                    onChange={(e) => setProjectFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief project description"
                    className="theme-text bg-transparent"
                    rows={3}
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Technologies</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {projectFormData.technology?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm flex items-center"
                      >
                        {tech}
                        <button
                          onClick={() =>
                            setProjectFormData((prev) => ({
                              ...prev,
                              technology: prev.technology?.filter((_, i) => i !== index) || [],
                            }))
                          }
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <select
                    onChange={(e) => {
                      if (e.target.value && !projectFormData.technology?.includes(e.target.value)) {
                        setProjectFormData((prev) => ({
                          ...prev,
                          technology: [...(prev.technology || []), e.target.value],
                        }))
                      }
                      e.target.value = ""
                    }}
                    className={`w-full px-3 py-2 rounded-md border ${
                      mode === "dark" || color === "black"
                        ? "border-gray-600 bg-gray-800/50"
                        : "border-gray-300 bg-white/50"
                    } theme-text theme-transition`}
                  >
                    <option value="">Add technology</option>
                    {technologies.map((tech) => (
                      <option key={tech} value={tech}>
                        {tech}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Publish Status */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={projectFormData.is_published || false}
                    onChange={(e) => setProjectFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="isPublished" className="text-sm font-medium theme-text theme-transition">
                    Publish immediately
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                <Button onClick={handleSaveProject} className="bg-primary hover:bg-primary/90 text-white flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {editingProject ? "Update Project" : "Create Project"}
                </Button>
                <Button variant="outline" onClick={resetProjectForm} className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Form Modal */}
      <AnimatePresence>
        {isBlogFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => resetBlogForm()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto theme-transition`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold theme-text theme-transition">
                  {editingBlogPost ? "Edit Blog Post" : "Add New Blog Post"}
                </h2>
                <Button variant="ghost" onClick={resetBlogForm}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Title *</label>
                    <Input
                      value={blogFormData.title || ""}
                      onChange={(e) => {
                        setBlogFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                          slug: slugify(e.target.value),
                        }))
                      }}
                      placeholder="Blog post title"
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Slug</label>
                    <Input
                      value={blogFormData.slug || ""}
                      onChange={(e) => setBlogFormData((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-slug"
                      className="theme-text bg-transparent"
                    />
                  </div>
                </div>

                {/* Author and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Author</label>
                    <Input
                      value={blogFormData.author || ""}
                      onChange={(e) => setBlogFormData((prev) => ({ ...prev, author: e.target.value }))}
                      placeholder="Author name"
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Date</label>
                    <Input
                      type="date"
                      value={blogFormData.date || ""}
                      onChange={(e) => setBlogFormData((prev) => ({ ...prev, date: e.target.value }))}
                      className="theme-text bg-transparent"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Excerpt *</label>
                  <Textarea
                    value={blogFormData.excerpt || ""}
                    onChange={(e) => setBlogFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the blog post"
                    className="theme-text bg-transparent"
                    rows={3}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Content *</label>
                  <Textarea
                    value={blogFormData.content || ""}
                    onChange={(e) => setBlogFormData((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="Blog post content (HTML supported)"
                    className="theme-text bg-transparent"
                    rows={10}
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                    Featured Image URL
                  </label>
                  <Input
                    value={blogFormData.image || ""}
                    onChange={(e) => setBlogFormData((prev) => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="theme-text bg-transparent"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {blogFormData.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm flex items-center"
                      >
                        {tag}
                        <button
                          onClick={() =>
                            setBlogFormData((prev) => ({
                              ...prev,
                              tags: prev.tags?.filter((_, i) => i !== index) || [],
                            }))
                          }
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <select
                    onChange={(e) => {
                      if (e.target.value && !blogFormData.tags?.includes(e.target.value)) {
                        setBlogFormData((prev) => ({
                          ...prev,
                          tags: [...(prev.tags || []), e.target.value],
                        }))
                      }
                      e.target.value = ""
                    }}
                    className={`w-full px-3 py-2 rounded-md border ${
                      mode === "dark" || color === "black"
                        ? "border-gray-600 bg-gray-800/50"
                        : "border-gray-300 bg-white/50"
                    } theme-text theme-transition`}
                  >
                    <option value="">Add tag</option>
                    {blogTags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SEO */}
                <div className="space-y-4 border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="font-medium theme-text theme-transition">SEO Options</h3>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">SEO Title</label>
                    <Input
                      value={blogFormData.seo_title || ""}
                      onChange={(e) => setBlogFormData((prev) => ({ ...prev, seo_title: e.target.value }))}
                      placeholder="SEO optimized title"
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                      SEO Description
                    </label>
                    <Textarea
                      value={blogFormData.seo_description || ""}
                      onChange={(e) => setBlogFormData((prev) => ({ ...prev, seo_description: e.target.value }))}
                      placeholder="SEO meta description"
                      className="theme-text bg-transparent"
                      rows={2}
                    />
                  </div>
                </div>

                {/* Publish Status */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isBlogPublished"
                    checked={blogFormData.is_published || false}
                    onChange={(e) => setBlogFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="isBlogPublished" className="text-sm font-medium theme-text theme-transition">
                    Publish immediately
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                <Button onClick={handleSaveBlogPost} className="bg-primary hover:bg-primary/90 text-white flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {editingBlogPost ? "Update Post" : "Create Post"}
                </Button>
                <Button variant="outline" onClick={resetBlogForm} className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
