"use client"

import { useState, useEffect } from "react"

export interface ProjectImage {
  id: number
  url: string
  alt: string
  caption?: string
}

export interface ProjectDetail {
  id: number
  title: string
  category: string
  technology: string[]
  description: string
  longDescription: string
  challenge: string
  solution: string
  results: string[]
  features: string[]
  images: ProjectImage[]
  duration: string
  teamSize: number
  clientType: string
  liveUrl?: string
  githubUrl?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
  testimonial?: {
    quote: string
    author: string
    position: string
    company: string
  }
}

// Local storage key
const PROJECTS_STORAGE_KEY = "rapidxtech_portfolio_projects"

// Default projects (initial data)
const defaultProjects: ProjectDetail[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    technology: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
    description: "A full-featured e-commerce platform with inventory management and payment processing.",
    longDescription:
      "A comprehensive e-commerce solution built for a growing retail business. The platform handles everything from product catalog management to order processing, inventory tracking, and customer relationship management. Built with modern technologies to ensure scalability and performance.",
    challenge:
      "The client needed a robust e-commerce platform that could handle high traffic volumes during peak seasons while maintaining fast loading times and secure payment processing. They also required advanced inventory management and analytics capabilities.",
    solution:
      "We developed a scalable microservices architecture using React for the frontend and Node.js for the backend. Implemented real-time inventory tracking, integrated multiple payment gateways, and built a comprehensive admin dashboard for business management.",
    results: [
      "40% increase in conversion rates",
      "60% reduction in page load times",
      "99.9% uptime during peak traffic",
      "50% reduction in cart abandonment",
    ],
    features: [
      "Real-time inventory management",
      "Multi-payment gateway integration",
      "Advanced search and filtering",
      "Mobile-responsive design",
      "Admin analytics dashboard",
      "Customer review system",
      "Wishlist and favorites",
      "Order tracking system",
    ],
    images: [
      {
        id: 1,
        url: "/placeholder.svg?height=600&width=800&text=Homepage",
        alt: "E-commerce homepage",
        caption: "Clean, modern homepage design with featured products",
      },
      {
        id: 2,
        url: "/placeholder.svg?height=600&width=800&text=Product+Page",
        alt: "Product detail page",
        caption: "Detailed product page with image gallery and reviews",
      },
      {
        id: 3,
        url: "/placeholder.svg?height=600&width=800&text=Shopping+Cart",
        alt: "Shopping cart",
        caption: "Streamlined checkout process with multiple payment options",
      },
    ],
    duration: "4 months",
    teamSize: 5,
    clientType: "Retail Business",
    liveUrl: "https://example-ecommerce.com",
    isPublished: true,
    createdAt: "2023-01-15",
    updatedAt: "2023-06-15",
    testimonial: {
      quote:
        "RapidXTech delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and technical expertise helped us achieve remarkable growth.",
      author: "Sarah Johnson",
      position: "CEO",
      company: "RetailCorp",
    },
  },
  {
    id: 2,
    title: "Financial Services App",
    category: "App Development",
    technology: ["React Native", "Firebase", "Node.js", "PostgreSQL", "AWS"],
    description: "Mobile banking application with secure authentication and real-time transaction tracking.",
    longDescription:
      "A comprehensive mobile banking solution that provides users with secure access to their financial accounts, real-time transaction monitoring, and advanced financial management tools. Built with security and user experience as top priorities.",
    challenge:
      "Creating a secure, user-friendly mobile banking app that meets strict financial regulations while providing a seamless user experience. The app needed to handle sensitive financial data with bank-level security.",
    solution:
      "Implemented multi-layer security architecture with biometric authentication, end-to-end encryption, and real-time fraud detection. Used React Native for cross-platform compatibility and Firebase for real-time data synchronization.",
    results: [
      "95% user satisfaction rate",
      "Zero security breaches",
      "30% increase in mobile transactions",
      "50% reduction in customer service calls",
    ],
    features: [
      "Biometric authentication",
      "Real-time transaction alerts",
      "Budget tracking and analytics",
      "Bill payment integration",
      "Card management",
      "Investment portfolio tracking",
      "Secure messaging",
      "ATM locator",
    ],
    images: [
      {
        id: 1,
        url: "/placeholder.svg?height=600&width=400&text=Login+Screen",
        alt: "App login screen",
        caption: "Secure login with biometric authentication",
      },
      {
        id: 2,
        url: "/placeholder.svg?height=600&width=400&text=Dashboard",
        alt: "App dashboard",
        caption: "Clean dashboard showing account overview and recent transactions",
      },
    ],
    duration: "6 months",
    teamSize: 4,
    clientType: "Financial Institution",
    isPublished: true,
    createdAt: "2023-02-01",
    updatedAt: "2023-07-01",
    testimonial: {
      quote:
        "The mobile banking app developed by RapidXTech has transformed our customer experience. The security features and user interface are outstanding.",
      author: "Michael Chen",
      position: "CTO",
      company: "SecureBank",
    },
  },
]

// CMS Hook for managing projects
export function usePortfolioCMS() {
  const [projects, setProjects] = useState<ProjectDetail[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY)
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects))
      } catch (error) {
        console.error("Error loading projects:", error)
        setProjects(defaultProjects)
      }
    } else {
      setProjects(defaultProjects)
    }
    setIsLoading(false)
  }, [])

  // Save projects to localStorage
  const saveProjects = (updatedProjects: ProjectDetail[]) => {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects))
    setProjects(updatedProjects)
  }

  // Get published projects only (for public portfolio)
  const getPublishedProjects = () => {
    return projects.filter((project) => project.isPublished)
  }

  // Get all projects (for admin)
  const getAllProjects = () => {
    return projects
  }

  // Add new project
  const addProject = (projectData: Omit<ProjectDetail, "id" | "createdAt" | "updatedAt">) => {
    const newProject: ProjectDetail = {
      ...projectData,
      id: Date.now(), // Simple ID generation
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }
    const updatedProjects = [...projects, newProject]
    saveProjects(updatedProjects)
    return newProject
  }

  // Update project
  const updateProject = (id: number, projectData: Partial<ProjectDetail>) => {
    const updatedProjects = projects.map((project) =>
      project.id === id ? { ...project, ...projectData, updatedAt: new Date().toISOString().split("T")[0] } : project,
    )
    saveProjects(updatedProjects)
  }

  // Delete project
  const deleteProject = (id: number) => {
    const updatedProjects = projects.filter((project) => project.id !== id)
    saveProjects(updatedProjects)
  }

  // Toggle publish status
  const togglePublishStatus = (id: number) => {
    const updatedProjects = projects.map((project) =>
      project.id === id
        ? { ...project, isPublished: !project.isPublished, updatedAt: new Date().toISOString().split("T")[0] }
        : project,
    )
    saveProjects(updatedProjects)
  }

  // Get project by ID
  const getProjectById = (id: number) => {
    return projects.find((project) => project.id === id)
  }

  // Get project by slug
  const getProjectBySlug = (slug: string) => {
    return projects.find((project) => project.title.toLowerCase().replace(/\s+/g, "-") === slug && project.isPublished)
  }

  return {
    projects,
    isLoading,
    getPublishedProjects,
    getAllProjects,
    addProject,
    updateProject,
    deleteProject,
    togglePublishStatus,
    getProjectById,
    getProjectBySlug,
  }
}

// Utility functions
export function getProjectSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-")
}

export const categories = ["Web Development", "App Development", "UI/UX Design", "E-commerce", "Enterprise Software"]

export const technologies = [
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
  "Sketch",
  "Firebase",
  "Supabase",
]
