import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://fmwzrgjfxgxnnislysya.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd3pyZ2pmeGd4bm5pc2x5c3lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTY0NzEsImV4cCI6MjA2ODUzMjQ3MX0.jDJzu9hx6KBDVGRQdcot-RMaHRtunl31ULcfS_ZbAfY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions
export interface ProjectDetail {
  id: number
  title: string
  category: string
  technology: string[]
  description: string
  long_description?: string
  challenge?: string
  solution?: string
  results: string[]
  features: string[]
  images: Array<{
    id: number
    url: string
    alt: string
    caption: string
  }>
  duration: string
  team_size: number
  client_type: string
  live_url?: string
  github_url?: string
  is_published: boolean
  testimonial?: {
    quote: string
    author: string
    position: string
    company: string
  }
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  tags: string[]
  author: string
  date: string
  is_published: boolean
  seo_title?: string
  seo_description?: string
  created_at: string
  updated_at: string
}

export interface ClientReview {
  id: number
  client_name: string
  client_position: string
  client_company: string
  client_image?: string
  review_text: string
  rating: number
  project_category?: string
  is_featured: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface TrustedPartner {
  id: number
  company_name: string
  company_logo: string
  company_website?: string
  partnership_type: string
  description?: string
  is_featured: boolean
  is_published: boolean
  display_order: number
  created_at: string
  updated_at: string
}
