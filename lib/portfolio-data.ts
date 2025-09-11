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
  testimonial?: {
    quote: string
    author: string
    position: string
    company: string
  }
}

export const portfolioProjects: ProjectDetail[] = [
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
      {
        id: 4,
        url: "/placeholder.svg?height=600&width=800&text=Admin+Dashboard",
        alt: "Admin dashboard",
        caption: "Comprehensive admin dashboard with analytics and inventory management",
      },
      {
        id: 5,
        url: "/placeholder.svg?height=600&width=800&text=Mobile+View",
        alt: "Mobile responsive design",
        caption: "Fully responsive design optimized for mobile shopping",
      },
    ],
    duration: "4 months",
    teamSize: 5,
    clientType: "Retail Business",
    liveUrl: "https://example-ecommerce.com",
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
      {
        id: 3,
        url: "/placeholder.svg?height=600&width=400&text=Transactions",
        alt: "Transaction history",
        caption: "Detailed transaction history with search and filtering",
      },
      {
        id: 4,
        url: "/placeholder.svg?height=600&width=400&text=Budget+Tracker",
        alt: "Budget tracking",
        caption: "Visual budget tracking with spending categories",
      },
    ],
    duration: "6 months",
    teamSize: 4,
    clientType: "Financial Institution",
    testimonial: {
      quote:
        "The mobile banking app developed by RapidXTech has transformed our customer experience. The security features and user interface are outstanding.",
      author: "Michael Chen",
      position: "CTO",
      company: "SecureBank",
    },
  },
  {
    id: 3,
    title: "Healthcare Dashboard",
    category: "UI/UX Design",
    technology: ["Figma", "Adobe XD", "React", "D3.js", "Material-UI"],
    description: "Intuitive dashboard for healthcare providers to monitor patient data and treatment plans.",
    longDescription:
      "A comprehensive healthcare management dashboard designed to streamline patient care workflows. The interface provides healthcare professionals with quick access to patient information, treatment histories, and real-time health monitoring data.",
    challenge:
      "Healthcare professionals needed a unified interface to access patient data from multiple systems while maintaining HIPAA compliance and ensuring quick access to critical information during patient care.",
    solution:
      "Designed an intuitive, role-based dashboard that aggregates data from various healthcare systems. Implemented clear information hierarchy, quick-access features for emergency situations, and comprehensive data visualization for patient monitoring.",
    results: [
      "45% reduction in data access time",
      "30% improvement in patient care efficiency",
      "100% HIPAA compliance maintained",
      "90% user adoption rate within first month",
    ],
    features: [
      "Patient information aggregation",
      "Real-time vital signs monitoring",
      "Treatment plan management",
      "Medication tracking",
      "Appointment scheduling",
      "Lab results integration",
      "Emergency alerts system",
      "Reporting and analytics",
    ],
    images: [
      {
        id: 1,
        url: "/placeholder.svg?height=600&width=800&text=Dashboard+Overview",
        alt: "Healthcare dashboard overview",
        caption: "Main dashboard showing patient overview and key metrics",
      },
      {
        id: 2,
        url: "/placeholder.svg?height=600&width=800&text=Patient+Profile",
        alt: "Patient profile page",
        caption: "Detailed patient profile with medical history and current treatments",
      },
      {
        id: 3,
        url: "/placeholder.svg?height=600&width=800&text=Vital+Signs",
        alt: "Vital signs monitoring",
        caption: "Real-time vital signs monitoring with alert system",
      },
      {
        id: 4,
        url: "/placeholder.svg?height=600&width=800&text=Analytics",
        alt: "Healthcare analytics",
        caption: "Comprehensive analytics and reporting dashboard",
      },
    ],
    duration: "3 months",
    teamSize: 3,
    clientType: "Healthcare Provider",
    liveUrl: "https://healthcare-demo.com",
    testimonial: {
      quote:
        "The dashboard design has revolutionized how our medical staff accesses and manages patient information. It's intuitive, fast, and perfectly suited to our workflow.",
      author: "Dr. Emily Rodriguez",
      position: "Chief Medical Officer",
      company: "MedCenter Hospital",
    },
  },
]

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return portfolioProjects.find((project) => project.title.toLowerCase().replace(/\s+/g, "-") === slug)
}

export function getProjectSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-")
}
