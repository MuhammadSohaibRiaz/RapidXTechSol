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
  Building,
  Star,
} from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { AdminAuth } from "@/components/admin-auth"
import { AdminLayout } from "@/components/admin-layout"
import { useAdminAuth } from "@/lib/auth"
import { useSupabaseCMS } from "@/lib/supabase-cms"
import type { ProjectDetail, BlogPost, ClientReview, TrustedPartner } from "@/lib/supabase"
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

const partnershipTypes = ["client", "technology", "strategic"]

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
  const [activeTab, setActiveTab] = useState<"projects" | "blog" | "reviews" | "partners">("projects")
  const [projects, setProjects] = useState<ProjectDetail[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [reviews, setReviews] = useState<ClientReview[]>([])
  const [partners, setPartners] = useState<TrustedPartner[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Form states
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false)
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false)
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)
  const [isPartnerFormOpen, setIsPartnerFormOpen] = useState(false)

  const [editingProject, setEditingProject] = useState<ProjectDetail | null>(null)
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null)
  const [editingReview, setEditingReview] = useState<ClientReview | null>(null)
  const [editingPartner, setEditingPartner] = useState<TrustedPartner | null>(null)

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

  // Review form data
  const [reviewFormData, setReviewFormData] = useState<Partial<ClientReview>>({
    client_name: "",
    client_position: "",
    client_company: "",
    client_image: "",
    review_text: "",
    rating: 5,
    project_category: "",
    is_featured: false,
    is_published: false,
  })

  // Partner form data
  const [partnerFormData, setPartnerFormData] = useState<Partial<TrustedPartner>>({
    company_name: "",
    company_logo: "",
    company_website: "",
    partnership_type: "client",
    description: "",
    is_featured: false,
    is_published: false,
    display_order: 0,
  })

  // Load data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [projectsData, blogData, reviewsData, partnersData] = await Promise.all([
        cms.getAllProjects(),
        cms.getAllBlogPosts(),
        cms.getAllReviews(),
        cms.getAllPartners(),
      ])
      setProjects(projectsData)
      setBlogPosts(blogData)
      setReviews(reviewsData)
      setPartners(partnersData)
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

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.client_company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review_text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Published" && review.is_published) ||
      (filterStatus === "Draft" && !review.is_published)

    return matchesSearch && matchesStatus
  })

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (partner.description && partner.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Published" && partner.is_published) ||
      (filterStatus === "Draft" && !partner.is_published)

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

  // Review handlers
  const resetReviewForm = () => {
    setReviewFormData({
      client_name: "",
      client_position: "",
      client_company: "",
      client_image: "",
      review_text: "",
      rating: 5,
      project_category: "",
      is_featured: false,
      is_published: false,
    })
    setEditingReview(null)
    setIsReviewFormOpen(false)
  }

  const handleEditReview = (review: ClientReview) => {
    setReviewFormData(review)
    setEditingReview(review)
    setIsReviewFormOpen(true)
  }

  const handleSaveReview = async () => {
    if (!reviewFormData.client_name || !reviewFormData.client_company || !reviewFormData.review_text) {
      alert("Please fill in all required fields")
      return
    }

    try {
      if (editingReview) {
        await cms.updateReview(editingReview.id, reviewFormData)
      } else {
        await cms.addReview(reviewFormData as Omit<ClientReview, "id" | "created_at" | "updated_at">)
      }
      await loadData()
      resetReviewForm()
    } catch (error) {
      console.error("Error saving review:", error)
      alert("Error saving review. Please try again.")
    }
  }

  const handleDeleteReview = async (id: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        await cms.deleteReview(id)
        await loadData()
      } catch (error) {
        console.error("Error deleting review:", error)
        alert("Error deleting review. Please try again.")
      }
    }
  }

  const handleToggleReviewPublish = async (id: number) => {
    try {
      await cms.toggleReviewPublishStatus(id)
      await loadData()
    } catch (error) {
      console.error("Error toggling review publish status:", error)
      alert("Error updating review status. Please try again.")
    }
  }

  const handleToggleReviewFeatured = async (id: number) => {
    try {
      await cms.toggleReviewFeaturedStatus(id)
      await loadData()
    } catch (error) {
      console.error("Error toggling review featured status:", error)
      alert("Error updating review featured status. Please try again.")
    }
  }

  // Partner handlers
  const resetPartnerForm = () => {
    setPartnerFormData({
      company_name: "",
      company_logo: "",
      company_website: "",
      partnership_type: "client",
      description: "",
      is_featured: false,
      is_published: false,
      display_order: 0,
    })
    setEditingPartner(null)
    setIsPartnerFormOpen(false)
  }

  const handleEditPartner = (partner: TrustedPartner) => {
    setPartnerFormData(partner)
    setEditingPartner(partner)
    setIsPartnerFormOpen(true)
  }

  const handleSavePartner = async () => {
    if (!partnerFormData.company_name || !partnerFormData.company_logo) {
      alert("Please fill in all required fields")
      return
    }

    try {
      if (editingPartner) {
        await cms.updatePartner(editingPartner.id, partnerFormData)
      } else {
        await cms.addPartner(partnerFormData as Omit<TrustedPartner, "id" | "created_at" | "updated_at">)
      }
      await loadData()
      resetPartnerForm()
    } catch (error) {
      console.error("Error saving partner:", error)
      alert("Error saving partner. Please try again.")
    }
  }

  const handleDeletePartner = async (id: number) => {
    if (confirm("Are you sure you want to delete this partner?")) {
      try {
        await cms.deletePartner(id)
        await loadData()
      } catch (error) {
        console.error("Error deleting partner:", error)
        alert("Error deleting partner. Please try again.")
      }
    }
  }

  const handleTogglePartnerPublish = async (id: number) => {
    try {
      await cms.togglePartnerPublishStatus(id)
      await loadData()
    } catch (error) {
      console.error("Error toggling partner publish status:", error)
      alert("Error updating partner status. Please try again.")
    }
  }

  const handleTogglePartnerFeatured = async (id: number) => {
    try {
      await cms.togglePartnerFeaturedStatus(id)
      await loadData()
    } catch (error) {
      console.error("Error toggling partner featured status:", error)
      alert("Error updating partner featured status. Please try again.")
    }
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

  const getCurrentData = () => {
    switch (activeTab) {
      case "projects":
        return filteredProjects
      case "blog":
        return filteredBlogPosts
      case "reviews":
        return filteredReviews
      case "partners":
        return filteredPartners
      default:
        return []
    }
  }

  const getCurrentTotal = () => {
    switch (activeTab) {
      case "projects":
        return projects
      case "blog":
        return blogPosts
      case "reviews":
        return reviews
      case "partners":
        return partners
      default:
        return []
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
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-4">
            Content Management System
          </h1>
          <p className="theme-text opacity-80 theme-transition">
            Manage your portfolio projects, blog posts, client reviews, and trusted partners
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
              onClick={() => setActiveTab("reviews")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === "reviews"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Reviews</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{reviews.length}</span>
            </button>
            <button
              onClick={() => setActiveTab("partners")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === "partners"
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Partners</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{partners.length}</span>
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
                switch (activeTab) {
                  case "projects":
                    setIsProjectFormOpen(true)
                    break
                  case "blog":
                    setIsBlogFormOpen(true)
                    break
                  case "reviews":
                    setIsReviewFormOpen(true)
                    break
                  case "partners":
                    setIsPartnerFormOpen(true)
                    break
                }
              }}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add{" "}
              {activeTab === "projects"
                ? "Project"
                : activeTab === "blog"
                  ? "Blog Post"
                  : activeTab === "reviews"
                    ? "Review"
                    : "Partner"}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{getCurrentTotal().length}</div>
              <div className="text-sm theme-text opacity-70 theme-transition">
                Total{" "}
                {activeTab === "projects"
                  ? "Projects"
                  : activeTab === "blog"
                    ? "Posts"
                    : activeTab === "reviews"
                      ? "Reviews"
                      : "Partners"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {getCurrentTotal().filter((item: any) => item.is_published).length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">
                {getCurrentTotal().filter((item: any) => !item.is_published).length}
              </div>
              <div className="text-sm theme-text opacity-70 theme-transition">Drafts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{getCurrentData().length}</div>
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

          {/* Reviews Grid */}
          {activeTab === "reviews" &&
            filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${getCardBgClass()} backdrop-blur-md rounded-lg shadow-lg overflow-hidden theme-transition`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={review.client_image || "/placeholder.svg?height=50&width=50&text=Client"}
                        alt={review.client_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold theme-text theme-transition">{review.client_name}</h3>
                        <p className="text-sm theme-text opacity-70 theme-transition">
                          {review.client_position} at {review.client_company}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          review.is_published ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                        }`}
                      >
                        {review.is_published ? "Published" : "Draft"}
                      </span>
                      {review.is_featured && (
                        <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-sm theme-text opacity-80 mb-4 line-clamp-3 theme-transition">
                    "{review.review_text}"
                  </p>

                  {review.project_category && (
                    <div className="mb-4">
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">
                        {review.project_category}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditReview(review)} className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleReviewFeatured(review.id)}
                      className={review.is_featured ? "text-blue-600" : "text-gray-600"}
                    >
                      <Star className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleReviewPublish(review.id)}
                      className={review.is_published ? "text-yellow-600" : "text-green-600"}
                    >
                      {review.is_published ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

          {/* Partners Grid */}
          {activeTab === "partners" &&
            filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${getCardBgClass()} backdrop-blur-md rounded-lg shadow-lg overflow-hidden theme-transition`}
              >
                <div className="relative h-32 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <img
                    src={partner.company_logo || "/placeholder.svg?height=100&width=200&text=Logo"}
                    alt={partner.company_name}
                    className="max-h-20 max-w-full object-contain"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 flex flex-col space-y-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        partner.is_published ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                      }`}
                    >
                      {partner.is_published ? "Published" : "Draft"}
                    </span>
                    {partner.is_featured && (
                      <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold theme-text mb-2 theme-transition">{partner.company_name}</h3>

                  {partner.partnership_type && (
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-secondary/20 theme-text rounded text-xs theme-transition capitalize">
                        {partner.partnership_type}
                      </span>
                    </div>
                  )}

                  {partner.description && (
                    <p className="text-sm theme-text opacity-70 mb-4 line-clamp-2 theme-transition">
                      {partner.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs theme-text opacity-60 mb-4 theme-transition">
                    <span>Order: {partner.display_order}</span>
                    {partner.company_website && (
                      <a
                        href={partner.company_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditPartner(partner)} className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTogglePartnerFeatured(partner.id)}
                      className={partner.is_featured ? "text-blue-600" : "text-gray-600"}
                    >
                      <Star className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTogglePartnerPublish(partner.id)}
                      className={partner.is_published ? "text-yellow-600" : "text-green-600"}
                    >
                      {partner.is_published ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeletePartner(partner.id)}
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
        {getCurrentData().length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-6xl mb-4">
              {activeTab === "projects" ? "📁" : activeTab === "blog" ? "📝" : activeTab === "reviews" ? "💬" : "🏢"}
            </div>
            <h3 className="text-xl font-semibold theme-text mb-2 theme-transition">No {activeTab} found</h3>
            <p className="theme-text opacity-70 theme-transition">
              {searchTerm || filterCategory !== "All" || filterStatus !== "All"
                ? "Try adjusting your filters"
                : `Create your first ${activeTab.slice(0, -1)} to get started`}
            </p>
          </motion.div>
        )}
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {isReviewFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => resetReviewForm()}
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
                  {editingReview ? "Edit Review" : "Add New Review"}
                </h2>
                <Button variant="ghost" onClick={resetReviewForm}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Client Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Client Name *</label>
                    <Input
                      value={reviewFormData.client_name || ""}
                      onChange={(e) => setReviewFormData((prev) => ({ ...prev, client_name: e.target.value }))}
                      placeholder="John Doe"
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Position *</label>
                    <Input
                      value={reviewFormData.client_position || ""}
                      onChange={(e) => setReviewFormData((prev) => ({ ...prev, client_position: e.target.value }))}
                      placeholder="CEO"
                      className="theme-text bg-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Company *</label>
                    <Input
                      value={reviewFormData.client_company || ""}
                      onChange={(e) => setReviewFormData((prev) => ({ ...prev, client_company: e.target.value }))}
                      placeholder="Company Name"
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                      Client Image URL
                    </label>
                    <Input
                      value={reviewFormData.client_image || ""}
                      onChange={(e) => setReviewFormData((prev) => ({ ...prev, client_image: e.target.value }))}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="theme-text bg-transparent"
                    />
                  </div>
                </div>

                {/* Review Content */}
                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Review Text *</label>
                  <Textarea
                    value={reviewFormData.review_text || ""}
                    onChange={(e) => setReviewFormData((prev) => ({ ...prev, review_text: e.target.value }))}
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
                      value={reviewFormData.rating || 5}
                      onChange={(e) => setReviewFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
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
                      value={reviewFormData.project_category || ""}
                      onChange={(e) => setReviewFormData((prev) => ({ ...prev, project_category: e.target.value }))}
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
                      checked={reviewFormData.is_featured || false}
                      onChange={(e) => setReviewFormData((prev) => ({ ...prev, is_featured: e.target.checked }))}
                      className="rounded"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium theme-text theme-transition">
                      Featured Review
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isReviewPublished"
                      checked={reviewFormData.is_published || false}
                      onChange={(e) => setReviewFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                      className="rounded"
                    />
                    <label htmlFor="isReviewPublished" className="text-sm font-medium theme-text theme-transition">
                      Publish immediately
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                <Button onClick={handleSaveReview} className="bg-primary hover:bg-primary/90 text-white flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {editingReview ? "Update Review" : "Create Review"}
                </Button>
                <Button variant="outline" onClick={resetReviewForm} className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Partner Form Modal */}
      <AnimatePresence>
        {isPartnerFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => resetPartnerForm()}
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
                  {editingPartner ? "Edit Partner" : "Add New Partner"}
                </h2>
                <Button variant="ghost" onClick={resetPartnerForm}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Company Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">Company Name *</label>
                    <Input
                      value={partnerFormData.company_name || ""}
                      onChange={(e) => setPartnerFormData((prev) => ({ ...prev, company_name: e.target.value }))}
                      placeholder="Company Name"
                      className="theme-text bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                      Partnership Type
                    </label>
                    <select
                      value={partnerFormData.partnership_type || "client"}
                      onChange={(e) => setPartnerFormData((prev) => ({ ...prev, partnership_type: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md border ${
                        mode === "dark" || color === "black"
                          ? "border-gray-600 bg-gray-800/50"
                          : "border-gray-300 bg-white/50"
                      } theme-text theme-transition`}
                    >
                      {partnershipTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">
                    Company Logo URL *
                  </label>
                  <Input
                    value={partnerFormData.company_logo || ""}
                    onChange={(e) => setPartnerFormData((prev) => ({ ...prev, company_logo: e.target.value }))}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="theme-text bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Company Website</label>
                  <Input
                    value={partnerFormData.company_website || ""}
                    onChange={(e) => setPartnerFormData((prev) => ({ ...prev, company_website: e.target.value }))}
                    placeholder="https://company.com"
                    className="theme-text bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Description</label>
                  <Textarea
                    value={partnerFormData.description || ""}
                    onChange={(e) => setPartnerFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the partnership..."
                    className="theme-text bg-transparent"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium theme-text mb-2 theme-transition">Display Order</label>
                  <Input
                    type="number"
                    value={partnerFormData.display_order || 0}
                    onChange={(e) => setPartnerFormData((prev) => ({ ...prev, display_order: Number(e.target.value) }))}
                    placeholder="0"
                    className="theme-text bg-transparent"
                  />
                </div>

                {/* Status Options */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPartnerFeatured"
                      checked={partnerFormData.is_featured || false}
                      onChange={(e) => setPartnerFormData((prev) => ({ ...prev, is_featured: e.target.checked }))}
                      className="rounded"
                    />
                    <label htmlFor="isPartnerFeatured" className="text-sm font-medium theme-text theme-transition">
                      Featured Partner
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPartnerPublished"
                      checked={partnerFormData.is_published || false}
                      onChange={(e) => setPartnerFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
                      className="rounded"
                    />
                    <label htmlFor="isPartnerPublished" className="text-sm font-medium theme-text theme-transition">
                      Publish immediately
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                <Button onClick={handleSavePartner} className="bg-primary hover:bg-primary/90 text-white flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {editingPartner ? "Update Partner" : "Create Partner"}
                </Button>
                <Button variant="outline" onClick={resetPartnerForm} className="flex-1 bg-transparent">
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
