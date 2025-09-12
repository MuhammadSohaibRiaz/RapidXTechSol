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
  MessageSquare,
  Star,
  User,
  UserX,
} from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { AdminAuth } from "@/components/admin-auth"
import { AdminLayout } from "@/components/admin-layout"
import { useAdminAuth } from "@/lib/auth"
import { useSupabaseCMS } from "@/lib/supabase-cms"
import type { ProjectDetail, BlogPost, ClientReview, ProjectImage } from "@/lib/supabase"
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
  const [activeTab, setActiveTab] = useState<"projects" | "blog" | "testimonials">("projects")
  const [projects, setProjects] = useState<ProjectDetail[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [testimonials, setTestimonials] = useState<ClientReview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Form states
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false)
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false)
  const [isTestimonialFormOpen, setIsTestimonialFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<ProjectDetail | null>(null)
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null)
  const [editingTestimonial, setEditingTestimonial] = useState<ClientReview | null>(null)

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

  // Testimonial form data
  const [testimonialFormData, setTestimonialFormData] = useState<Partial<ClientReview>>({
    client_name: "",
    client_position: "",
    client_company: "",
    client_image: "",
    review_text: "",
    rating: 5,
    project_category: "",
    testimonial_type: "identified",
    is_featured: false,
    is_published: false,
  })

  // Load data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [projectsData, blogData, testimonialsData] = await Promise.all([
        cms.getAllProjects(),
        cms.getAllBlogPosts(),
        cms.getAllReviews(),
      ])
      setProjects(projectsData)
      setBlogPosts(blogData)
      setTestimonials(testimonialsData)
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

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      (testimonial.client_name && testimonial.client_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (testimonial.client_company && testimonial.client_company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      testimonial.review_text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Published" && testimonial.is_published) ||
      (filterStatus === "Draft" && !testimonial.is_published)

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

  // Testimonial handlers
  const resetTestimonialForm = () => {
    setTestimonialFormData({
      client_name: "",
      client_position: "",
      client_company: "",
      client_image: "",
      review_text: "",
      rating: 5,
      project_category: "",
      testimonial_type: "identified",
      is_featured: false,
      is_published: false,
    })
    setEditingTestimonial(null)
    setIsTestimonialFormOpen(false)
  }

  const handleEditTestimonial = (testimonial: ClientReview) => {
    setTestimonialFormData(testimonial)
    setEditingTestimonial(testimonial)
    setIsTestimonialFormOpen(true)
  }

  const handleSaveTestimonial = async () => {
    // Validate based on testimonial type
    if (!testimonialFormData.review_text) {
      alert("Please fill in the review text")
      return
    }

    if (testimonialFormData.testimonial_type === "identified") {
      if (!testimonialFormData.client_name || !testimonialFormData.client_company) {
        alert("Please fill in client name and company for identified testimonials")
        return
      }
    }

    try {
      if (editingTestimonial) {
        await cms.updateReview(editingTestimonial.id, testimonialFormData)
      } else {
        await cms.addReview(testimonialFormData as Omit<ClientReview, "id" | "created_at" | "updated_at">)
      }
      await loadData()
      resetTestimonialForm()
    } catch (error) {
      console.error("Error saving testimonial:", error)
      alert("Error saving testimonial. Please try again.")
    }
  }

  const handleDeleteTestimonial = async (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await cms.deleteReview(id)
        await loadData()
      } catch (error) {
        console.error("Error deleting testimonial:", error)
        alert("Error deleting testimonial. Please try again.")
      }
    }
  }

  const handleToggleTestimonialPublish = async (id: number) => {
    try {
      await cms.toggleReviewPublishStatus(id)
      await loadData()
    } catch (error) {
      console.error("Error toggling testimonial publish status:", error)
      alert("Error updating testimonial status. Please try again.")
    }
  }

  const handleToggleTestimonialFeatured = async (id: number) => {
    try {
      await cms.toggleReviewFeaturedStatus(id)
      await loadData()
    } catch (error) {
      console.error("Error toggling testimonial featured status:", error)
      alert("Error updating testimonial featured status. Please try again.")
    }
  }

  const addArrayItem = (field: "results" | "features") => {
    setProjectFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ""],
    }))
  }

  const updateArrayItem = (field: "results" | "features", index: number, value: string) => {
    setProjectFormData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).map((item, i) => (i === index ? value : item)),
    }))
  }

  const removeArrayItem = (field: "results" | "features", index: number) => {
    setProjectFormData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index),
    }))
  }

  const addImage = () => {
    const newId = Math.max(...(projectFormData.images?.map((img) => img.id) || [0])) + 1
    setProjectFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), { id: newId, url: "", alt: "", caption: "" }],
    }))
  }

  const updateImage = (index: number, field: keyof ProjectImage, value: string) => {
    setProjectFormData((prev) => ({
      ...prev,
      images: (prev.images || []).map((img, i) => (i === index ? { ...img, [field]: value } : img)),
    }))
  }

  const removeImage = (index: number) => {
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
            Manage your portfolio projects, blog posts, and client testimonials - add, edit, delete, and control
            visibility
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
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
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === "blog"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Blog</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{blogPosts.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("testimonials")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === "testimonials"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Testimonials</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{testimonials.length}</span>
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
              onClick={() => {
                if (activeTab === "projects") setIsProjectFormOpen(true)
                else if (activeTab === "blog") setIsBlogFormOpen(true)
                else if (activeTab === "testimonials") setIsTestimonialFormOpen(true)
              }}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add {activeTab === "projects" ? "Project" : activeTab === "blog" ? "Blog Post" : "Testimonial"}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {activeTab === "projects"
                  ? projects.length
                  : activeTab === "blog"
                    ? blogPosts.length
                    : testimonials.length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">
                Total {activeTab === "projects" ? "Projects" : activeTab === "blog" ? "Posts" : "Testimonials"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {activeTab === "projects"
                  ? projects.filter((p) => p.is_published).length
                  : activeTab === "blog"
                    ? blogPosts.filter((p) => p.is_published).length
                    : testimonials.filter((p) => p.is_published).length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">
                {activeTab === "projects"
                  ? projects.filter((p) => !p.is_published).length
                  : activeTab === "blog"
                    ? blogPosts.filter((p) => !p.is_published).length
                    : testimonials.filter((p) => !p.is_published).length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">Drafts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {activeTab === "projects"
                  ? filteredProjects.length
                  : activeTab === "blog"
                    ? filteredBlogPosts.length
                    : filteredTestimonials.length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">Filtered</div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Projects Grid */}
          {activeTab === "projects" &&
            filteredProjects.map((project, index) => (
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

          {/* Blog Posts Grid */}
          {activeTab === "blog" &&
            filteredBlogPosts.map((post, index) => (
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

          {/* Testimonials Grid */}
          {activeTab === "testimonials" &&
            filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${getCardBgClass()} backdrop-blur-md rounded-lg shadow-lg overflow-hidden theme-transition`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {testimonial.testimonial_type === "identified" && testimonial.client_name ? (
                        <>
                          <img
                            src={testimonial.client_image || "/placeholder.svg?height=50&width=50&text=Client"}
                            alt={testimonial.client_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold theme-text theme-transition">{testimonial.client_name}</h3>
                            <p className="text-sm theme-text opacity-70 theme-transition">
                              {testimonial.client_position} at {testimonial.client_company}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                            <UserX className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold theme-text theme-transition">Anonymous Client</h3>
                            <p className="text-sm theme-text opacity-70 theme-transition">Verified Review</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          testimonial.is_published ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                        }`}
                      >
                        {testimonial.is_published ? "Published" : "Draft"}
                      </span>
                      {testimonial.is_featured && (
                        <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          testimonial.testimonial_type === "identified"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        }`}
                      >
                        {testimonial.testimonial_type === "identified" ? (
                          <>
                            <User className="w-3 h-3 inline mr-1" />
                            Identified
                          </>
                        ) : (
                          <>
                            <UserX className="w-3 h-3 inline mr-1" />
                            Anonymous
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-sm theme-text opacity-80 mb-4 line-clamp-3 theme-transition">
                    "{testimonial.review_text}"
                  </p>

                  {testimonial.project_category && (
                    <div className="mb-4">
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                        {testimonial.project_category}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditTestimonial(testimonial)}
                      className="flex-1"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleTestimonialFeatured(testimonial.id)}
                      className={testimonial.is_featured ? "text-blue-600" : "text-gray-600"}
                    >
                      <Star className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleTestimonialPublish(testimonial.id)}
                      className={testimonial.is_published ? "text-yellow-600" : "text-green-600"}
                    >
                      {testimonial.is_published ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Empty State */}
        {((activeTab === "projects" && filteredProjects.length === 0) ||
          (activeTab === "blog" && filteredBlogPosts.length === 0) ||
          (activeTab === "testimonials" && filteredTestimonials.length === 0)) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">{activeTab === "projects" ? "📁" : activeTab === "blog" ? "📝" : "💬"}</div>
            <h3 className="text-xl font-semibold theme-text mb-2 theme-transition">
              No {activeTab === "projects" ? "projects" : activeTab === "blog" ? "blog posts" : "testimonials"} found
            </h3>
            <p className="theme-text opacity-70 theme-transition">
              {searchTerm || filterCategory !== "All" || filterStatus !== "All"
                ? "Try adjusting your filters"
                : `Create your first ${activeTab === "projects" ? "project" : activeTab === "blog" ? "blog post" : "testimonial"} to get started`}
            </p>
          </motion.div>
        )}
      </div>

      {/* Testimonial Form Modal */}
      <AnimatePresence>
        {isTestimonialFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => resetTestimonialForm()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto theme-transition`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold theme-text theme-transition">
                  {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
                </h2>
                <Button variant="ghost" onClick={resetTestimonialForm}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Testimonial Type */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                    Testimonial Type *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="testimonial_type"
                        value="identified"
                        checked={testimonialFormData.testimonial_type === "identified"}
                        onChange={(e) =>
                          setTestimonialFormData((prev) => ({
                            ...prev,
                            testimonial_type: e.target.value as "identified" | "anonymous",
                          }))
                        }
                        className="text-primary"
                      />
                      <span className="text-sm theme-text theme-transition flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        Identified (with client details)
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="testimonial_type"
                        value="anonymous"
                        checked={testimonialFormData.testimonial_type === "anonymous"}
                        onChange={(e) =>
                          setTestimonialFormData((prev) => ({
                            ...prev,
                            testimonial_type: e.target.value as "identified" | "anonymous",
                          }))
                        }
                        className="text-primary"
                      />
                      <span className="text-sm theme-text theme-transition flex items-center">
                        <UserX className="w-4 h-4 mr-1" />
                        Anonymous (text and stars only)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Client Info - Only show for identified testimonials */}
                {testimonialFormData.testimonial_type === "identified" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                          Client Name *
                        </label>
                        <Input
                          value={testimonialFormData.client_name || ""}
                          onChange={(e) => setTestimonialFormData((prev) => ({ ...prev, client_name: e.target.value }))}
                          placeholder="John Doe"
                          className="theme-text bg-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium theme-text mb-2 theme-transition">Position *</label>
                        <Input
                          value={testimonialFormData.client_position || ""}
                          onChange={(e) =>
                            setTestimonialFormData((prev) => ({ ...prev, client_position: e.target.value }))
                          }
                          placeholder="CEO"
                          className="theme-text bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium theme-text mb-2 theme-transition">Company *</label>
                        <Input
                          value={testimonialFormData.client_company || ""}
                          onChange={(e) =>
                            setTestimonialFormData((prev) => ({ ...prev, client_company: e.target.value }))
                          }
                          placeholder="Company Name"
                          className="theme-text bg-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                          Client Image URL
                        </label>
                        <Input
                          value={testimonialFormData.client_image || ""}
                          onChange={(e) =>
                            setTestimonialFormData((prev) => ({ ...prev, client_image: e.target.value }))
                          }
                          placeholder="https://images.unsplash.com/photo-..."
                          className="theme-text bg-transparent"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Review Content */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Review Text *</label>
                  <Textarea
                    value={testimonialFormData.review_text || ""}
                    onChange={(e) => setTestimonialFormData((prev) => ({ ...prev, review_text: e.target.value }))}
                    placeholder="The client's review..."
                    className="theme-text bg-transparent"
                    rows={4}
                  />
                </div>

                {/* Rating and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Rating</label>
                    <select
                      value={testimonialFormData.rating || 5}
                      onChange={(e) => setTestimonialFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                      className={`w-full px-3 py-2 rounded-md border ${
                        mode === "dark" || color === "black"
                          ? "border-gray-600 bg-gray-800/50"
                          : "border-gray-300 bg-white/50"
                      } theme-text theme-transition`}
                    >
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} Star{rating !== 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                      Project Category
                    </label>
                    <select
                      value={testimonialFormData.project_category || ""}
                      onChange={(e) =>
                        setTestimonialFormData((prev) => ({ ...prev, project_category: e.target.value }))
                      }
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

                {/* Status Options */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={testimonialFormData.is_featured || false}
                      onChange={(e) => setTestimonialFormData((prev) => ({ ...prev, is_featured: e.target.checked }))}
                      className="rounded"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium theme-text theme-transition">
                      Featured Testimonial
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isTestimonialPublished"
                      checked={testimonialFormData.is_published || false}
                      onChange={(e) => setTestimonialFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                      className="rounded"
                    />
                    <label htmlFor="isTestimonialPublished" className="text-sm font-medium theme-text theme-transition">
                      Publish immediately
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                <Button onClick={handleSaveTestimonial} className="bg-primary hover:bg-primary/90 text-white flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {editingTestimonial ? "Update Testimonial" : "Create Testimonial"}
                </Button>
                <Button variant="outline" onClick={resetTestimonialForm} className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

                {/* Technology Stack */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Technology Stack</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto p-2 border rounded-md">
                    {technologies.map((tech) => (
                      <label key={tech} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={projectFormData.technology?.includes(tech) || false}
                          onChange={(e) => {
                            const currentTech = projectFormData.technology || []
                            if (e.target.checked) {
                              setProjectFormData((prev) => ({
                                ...prev,
                                technology: [...currentTech, tech],
                              }))
                            } else {
                              setProjectFormData((prev) => ({
                                ...prev,
                                technology: currentTech.filter((t) => t !== tech),
                              }))
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm theme-text theme-transition">{tech}</span>
                      </label>
                    ))}
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

                {/* Long Description */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Long Description</label>
                  <Textarea
                    value={projectFormData.long_description || ""}
                    onChange={(e) => setProjectFormData((prev) => ({ ...prev, long_description: e.target.value }))}
                    placeholder="Detailed project description"
                    className="theme-text bg-transparent"
                    rows={5}
                  />
                </div>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Challenge</label>
                    <Textarea
                      value={projectFormData.challenge || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, challenge: e.target.value }))}
                      placeholder="What challenges did you face?"
                      className="theme-text bg-transparent"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Solution</label>
                    <Textarea
                      value={projectFormData.solution || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, solution: e.target.value }))}
                      placeholder="How did you solve them?"
                      className="theme-text bg-transparent"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Duration</label>
                    <Input
                      value={projectFormData.duration || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 3 months"
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Team Size</label>
                    <Input
                      type="number"
                      value={projectFormData.team_size || 1}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, team_size: Number(e.target.value) }))}
                      min="1"
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Client Type</label>
                    <Input
                      value={projectFormData.client_type || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, client_type: e.target.value }))}
                      placeholder="e.g., Startup, Enterprise"
                      className="theme-text bg-transparent"
                    />
                  </div>
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Live URL</label>
                    <Input
                      value={projectFormData.live_url || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, live_url: e.target.value }))}
                      placeholder="https://example.com"
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">GitHub URL</label>
                    <Input
                      value={projectFormData.github_url || ""}
                      onChange={(e) => setProjectFormData((prev) => ({ ...prev, github_url: e.target.value }))}
                      placeholder="https://github.com/..."
                      className="theme-text bg-transparent"
                    />
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Project Images</label>
                  <div className="space-y-3">
                    {projectFormData.images?.map((image, index) => (
                      <div key={image.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 border rounded-md">
                        <Input
                          placeholder="Image URL"
                          value={image.url}
                          onChange={(e) => updateImage(index, "url", e.target.value)}
                          className="theme-text bg-transparent"
                        />
                        <Input
                          placeholder="Alt text"
                          value={image.alt}
                          onChange={(e) => updateImage(index, "alt", e.target.value)}
                          className="theme-text bg-transparent"
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Caption (optional)"
                            value={image.caption || ""}
                            onChange={(e) => updateImage(index, "caption", e.target.value)}
                            className="theme-text bg-transparent flex-1"
                          />
                          {projectFormData.images && projectFormData.images.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeImage(index)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addImage} className="w-full bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Image
                    </Button>
                  </div>
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
                      placeholder="blog-post-slug"
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

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                    Featured Image URL
                  </label>
                  <Input
                    value={blogFormData.image || ""}
                    onChange={(e) => setBlogFormData((prev) => ({ ...prev, image: e.target.value }))}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="theme-text bg-transparent"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Tags</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto p-2 border rounded-md">
                    {blogTags.map((tag) => (
                      <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={blogFormData.tags?.includes(tag) || false}
                          onChange={(e) => {
                            const currentTags = blogFormData.tags || []
                            if (e.target.checked) {
                              setBlogFormData((prev) => ({
                                ...prev,
                                tags: [...currentTags, tag],
                              }))
                            } else {
                              setBlogFormData((prev) => ({
                                ...prev,
                                tags: currentTags.filter((t) => t !== tag),
                              }))
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm theme-text theme-transition">{tag}</span>
                      </label>
                    ))}
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
                    placeholder="Full blog post content (Markdown supported)"
                    className="theme-text bg-transparent"
                    rows={10}
                  />
                </div>

                {/* SEO */}
                <div className="grid grid-cols-1 gap-4">
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
                  {editingBlogPost ? "Update Blog Post" : "Create Blog Post"}
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
