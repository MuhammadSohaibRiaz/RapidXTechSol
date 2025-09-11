import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://fmwzrgjfxgxnnislysya.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtd3pyZ2pmeGd4bm5pc2x5c3lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5NTY0NzEsImV4cCI6MjA2ODUzMjQ3MX0.jDJzu9hx6KBDVGRQdcot-RMaHRtunl31ULcfS_ZbAfY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: number
          title: string
          category: string
          technology: string[]
          description: string
          long_description: string | null
          challenge: string | null
          solution: string | null
          results: string[]
          features: string[]
          images: ProjectImage[]
          duration: string | null
          team_size: number
          client_type: string | null
          live_url: string | null
          github_url: string | null
          is_published: boolean
          created_at: string
          updated_at: string
          testimonial: ProjectTestimonial | null
        }
        Insert: {
          title: string
          category: string
          technology: string[]
          description: string
          long_description?: string | null
          challenge?: string | null
          solution?: string | null
          results?: string[]
          features?: string[]
          images?: ProjectImage[]
          duration?: string | null
          team_size?: number
          client_type?: string | null
          live_url?: string | null
          github_url?: string | null
          is_published?: boolean
          testimonial?: ProjectTestimonial | null
        }
        Update: {
          title?: string
          category?: string
          technology?: string[]
          description?: string
          long_description?: string | null
          challenge?: string | null
          solution?: string | null
          results?: string[]
          features?: string[]
          images?: ProjectImage[]
          duration?: string | null
          team_size?: number
          client_type?: string | null
          live_url?: string | null
          github_url?: string | null
          is_published?: boolean
          testimonial?: ProjectTestimonial | null
        }
      }
      blog_posts: {
        Row: {
          id: number
          title: string
          slug: string
          excerpt: string
          content: string
          image: string | null
          tags: string[]
          author: string
          date: string
          is_published: boolean
          created_at: string
          updated_at: string
          seo_title: string | null
          seo_description: string | null
        }
        Insert: {
          title: string
          slug: string
          excerpt: string
          content: string
          image?: string | null
          tags?: string[]
          author?: string
          date?: string
          is_published?: boolean
          seo_title?: string | null
          seo_description?: string | null
        }
        Update: {
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          image?: string | null
          tags?: string[]
          author?: string
          date?: string
          is_published?: boolean
          seo_title?: string | null
          seo_description?: string | null
        }
      }
      client_reviews: {
        Row: {
          id: number
          client_name: string
          client_position: string
          client_company: string
          client_image: string | null
          review_text: string
          rating: number
          project_category: string | null
          is_featured: boolean
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          client_name: string
          client_position: string
          client_company: string
          client_image?: string | null
          review_text: string
          rating?: number
          project_category?: string | null
          is_featured?: boolean
          is_published?: boolean
        }
        Update: {
          client_name?: string
          client_position?: string
          client_company?: string
          client_image?: string | null
          review_text?: string
          rating?: number
          project_category?: string | null
          is_featured?: boolean
          is_published?: boolean
        }
      }
      trusted_partners: {
        Row: {
          id: number
          company_name: string
          company_logo: string
          company_website: string | null
          partnership_type: string | null
          description: string | null
          is_featured: boolean
          is_published: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          company_name: string
          company_logo: string
          company_website?: string | null
          partnership_type?: string | null
          description?: string | null
          is_featured?: boolean
          is_published?: boolean
          display_order?: number
        }
        Update: {
          company_name?: string
          company_logo?: string
          company_website?: string | null
          partnership_type?: string | null
          description?: string | null
          is_featured?: boolean
          is_published?: boolean
          display_order?: number
        }
      }
    }
  }
}

export interface ProjectImage {
  id: number
  url: string
  alt: string
  caption?: string
}

export interface ProjectTestimonial {
  quote: string
  author: string
  position: string
  company: string
}

export type ProjectDetail = Database["public"]["Tables"]["projects"]["Row"]
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"]
export type ClientReview = Database["public"]["Tables"]["client_reviews"]["Row"]
export type TrustedPartner = Database["public"]["Tables"]["trusted_partners"]["Row"]
