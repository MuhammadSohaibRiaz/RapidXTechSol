import { supabase, type ProjectDetail, type BlogPost, type ClientReview, type TrustedPartner } from "./supabase"
import { slugify } from "./utils"

// Portfolio Projects CMS
export class PortfolioCMS {
  // Get all projects (admin)
  static async getAllProjects(): Promise<ProjectDetail[]> {
    try {
      const { data, error } = await supabase.from("projects").select("*").order("updated_at", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching all projects:", error)
      throw new Error("Failed to fetch projects")
    }
  }

  // Get published projects (public)
  static async getPublishedProjects(): Promise<ProjectDetail[]> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .order("updated_at", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching published projects:", error)
      throw new Error("Failed to fetch published projects")
    }
  }

  // Get project by ID
  static async getProjectById(id: number): Promise<ProjectDetail | null> {
    try {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error fetching project by ID:", error)
      return null
    }
  }

  // Get project by slug
  static async getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_published", true)
        .ilike("title", `%${slug.replace(/-/g, " ")}%`)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error fetching project by slug:", error)
      return null
    }
  }

  // Add new project
  static async addProject(project: Omit<ProjectDetail, "id" | "created_at" | "updated_at">): Promise<ProjectDetail> {
    try {
      const { data, error } = await supabase.from("projects").insert([project]).select().single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error adding project:", error)
      throw new Error("Failed to add project")
    }
  }

  // Update project
  static async updateProject(id: number, updates: Partial<ProjectDetail>): Promise<ProjectDetail> {
    try {
      const { data, error } = await supabase.from("projects").update(updates).eq("id", id).select().single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error updating project:", error)
      throw new Error("Failed to update project")
    }
  }

  // Delete project
  static async deleteProject(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id)

      if (error) throw error
    } catch (error) {
      console.error("Error deleting project:", error)
      throw new Error("Failed to delete project")
    }
  }

  // Toggle publish status
  static async togglePublishStatus(id: number): Promise<ProjectDetail> {
    try {
      // First get current status
      const { data: currentData, error: fetchError } = await supabase
        .from("projects")
        .select("is_published")
        .eq("id", id)
        .single()

      if (fetchError) throw fetchError

      // Toggle the status
      const { data, error } = await supabase
        .from("projects")
        .update({ is_published: !currentData.is_published })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error toggling publish status:", error)
      throw new Error("Failed to toggle publish status")
    }
  }
}

// Blog Posts CMS
export class BlogCMS {
  // Get all blog posts (admin)
  static async getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching all blog posts:", error)
      throw new Error("Failed to fetch blog posts")
    }
  }

  // Get published blog posts (public)
  static async getPublishedBlogPosts(): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("date", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching published blog posts:", error)
      throw new Error("Failed to fetch published blog posts")
    }
  }

  // Get blog post by slug
  static async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error fetching blog post by slug:", error)
      return null
    }
  }

  // Add new blog post
  static async addBlogPost(post: Omit<BlogPost, "id" | "created_at" | "updated_at">): Promise<BlogPost> {
    try {
      // Generate slug if not provided
      const slug = post.slug || slugify(post.title)

      const { data, error } = await supabase
        .from("blog_posts")
        .insert([{ ...post, slug }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error adding blog post:", error)
      throw new Error("Failed to add blog post")
    }
  }

  // Update blog post
  static async updateBlogPost(id: number, updates: Partial<BlogPost>): Promise<BlogPost> {
    try {
      // Update slug if title changed
      if (updates.title && !updates.slug) {
        updates.slug = slugify(updates.title)
      }

      const { data, error } = await supabase.from("blog_posts").update(updates).eq("id", id).select().single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error updating blog post:", error)
      throw new Error("Failed to update blog post")
    }
  }

  // Delete blog post
  static async deleteBlogPost(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id)

      if (error) throw error
    } catch (error) {
      console.error("Error deleting blog post:", error)
      throw new Error("Failed to delete blog post")
    }
  }

  // Toggle publish status
  static async toggleBlogPublishStatus(id: number): Promise<BlogPost> {
    try {
      // First get current status
      const { data: currentData, error: fetchError } = await supabase
        .from("blog_posts")
        .select("is_published")
        .eq("id", id)
        .single()

      if (fetchError) throw fetchError

      // Toggle the status
      const { data, error } = await supabase
        .from("blog_posts")
        .update({ is_published: !currentData.is_published })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error toggling blog publish status:", error)
      throw new Error("Failed to toggle blog publish status")
    }
  }

  // Search blog posts
  static async searchBlogPosts(query: string): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
        .order("date", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error searching blog posts:", error)
      return []
    }
  }

  // Get posts by tag
  static async getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .contains("tags", [tag])
        .order("date", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching posts by tag:", error)
      return []
    }
  }
}

// Client Reviews CMS
export class ReviewsCMS {
  // Get all reviews (admin)
  static async getAllReviews(): Promise<ClientReview[]> {
    try {
      const { data, error } = await supabase
        .from("client_reviews")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching all reviews:", error)
      throw new Error("Failed to fetch reviews")
    }
  }

  // Get published reviews (public)
  static async getPublishedReviews(): Promise<ClientReview[]> {
    try {
      const { data, error } = await supabase
        .from("client_reviews")
        .select("*")
        .eq("is_published", true)
        .order("rating", { ascending: false })
        .order("created_at", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching published reviews:", error)
      throw new Error("Failed to fetch published reviews")
    }
  }

  // Get featured reviews (public)
  static async getFeaturedReviews(): Promise<ClientReview[]> {
    try {
      const { data, error } = await supabase
        .from("client_reviews")
        .select("*")
        .eq("is_published", true)
        .eq("is_featured", true)
        .order("rating", { ascending: false })
        .order("created_at", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching featured reviews:", error)
      throw new Error("Failed to fetch featured reviews")
    }
  }

  // Add new review
  static async addReview(review: Omit<ClientReview, "id" | "created_at" | "updated_at">): Promise<ClientReview> {
    try {
      const { data, error } = await supabase.from("client_reviews").insert([review]).select().single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error adding review:", error)
      throw new Error("Failed to add review")
    }
  }

  // Update review
  static async updateReview(id: number, updates: Partial<ClientReview>): Promise<ClientReview> {
    try {
      const { data, error } = await supabase.from("client_reviews").update(updates).eq("id", id).select().single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error updating review:", error)
      throw new Error("Failed to update review")
    }
  }

  // Delete review
  static async deleteReview(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("client_reviews").delete().eq("id", id)

      if (error) throw error
    } catch (error) {
      console.error("Error deleting review:", error)
      throw new Error("Failed to delete review")
    }
  }

  // Toggle publish status
  static async toggleReviewPublishStatus(id: number): Promise<ClientReview> {
    try {
      const { data: currentData, error: fetchError } = await supabase
        .from("client_reviews")
        .select("is_published")
        .eq("id", id)
        .single()

      if (fetchError) throw fetchError

      const { data, error } = await supabase
        .from("client_reviews")
        .update({ is_published: !currentData.is_published })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error toggling review publish status:", error)
      throw new Error("Failed to toggle review publish status")
    }
  }

  // Toggle featured status
  static async toggleReviewFeaturedStatus(id: number): Promise<ClientReview> {
    try {
      const { data: currentData, error: fetchError } = await supabase
        .from("client_reviews")
        .select("is_featured")
        .eq("id", id)
        .single()

      if (fetchError) throw fetchError

      const { data, error } = await supabase
        .from("client_reviews")
        .update({ is_featured: !currentData.is_featured })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error toggling review featured status:", error)
      throw new Error("Failed to toggle review featured status")
    }
  }
}

// Trusted Partners CMS
export class PartnersCMS {
  // Get all partners (admin)
  static async getAllPartners(): Promise<TrustedPartner[]> {
    try {
      const { data, error } = await supabase
        .from("trusted_partners")
        .select("*")
        .order("display_order", { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching all partners:", error)
      throw new Error("Failed to fetch partners")
    }
  }

  // Get published partners (public)
  static async getPublishedPartners(): Promise<TrustedPartner[]> {
    try {
      const { data, error } = await supabase
        .from("trusted_partners")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching published partners:", error)
      throw new Error("Failed to fetch published partners")
    }
  }

  // Get featured partners (public)
  static async getFeaturedPartners(): Promise<TrustedPartner[]> {
    try {
      const { data, error } = await supabase
        .from("trusted_partners")
        .select("*")
        .eq("is_published", true)
        .eq("is_featured", true)
        .order("display_order", { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching featured partners:", error)
      throw new Error("Failed to fetch featured partners")
    }
  }

  // Add new partner
  static async addPartner(partner: Omit<TrustedPartner, "id" | "created_at" | "updated_at">): Promise<TrustedPartner> {
    try {
      const { data, error } = await supabase.from("trusted_partners").insert([partner]).select().single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error adding partner:", error)
      throw new Error("Failed to add partner")
    }
  }

  // Update partner
  static async updatePartner(id: number, updates: Partial<TrustedPartner>): Promise<TrustedPartner> {
    try {
      const { data, error } = await supabase.from("trusted_partners").update(updates).eq("id", id).select().single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error updating partner:", error)
      throw new Error("Failed to update partner")
    }
  }

  // Delete partner
  static async deletePartner(id: number): Promise<void> {
    try {
      const { error } = await supabase.from("trusted_partners").delete().eq("id", id)

      if (error) throw error
    } catch (error) {
      console.error("Error deleting partner:", error)
      throw new Error("Failed to delete partner")
    }
  }

  // Toggle publish status
  static async togglePartnerPublishStatus(id: number): Promise<TrustedPartner> {
    try {
      const { data: currentData, error: fetchError } = await supabase
        .from("trusted_partners")
        .select("is_published")
        .eq("id", id)
        .single()

      if (fetchError) throw fetchError

      const { data, error } = await supabase
        .from("trusted_partners")
        .update({ is_published: !currentData.is_published })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error toggling partner publish status:", error)
      throw new Error("Failed to toggle partner publish status")
    }
  }

  // Toggle featured status
  static async togglePartnerFeaturedStatus(id: number): Promise<TrustedPartner> {
    try {
      const { data: currentData, error: fetchError } = await supabase
        .from("trusted_partners")
        .select("is_featured")
        .eq("id", id)
        .single()

      if (fetchError) throw fetchError

      const { data, error } = await supabase
        .from("trusted_partners")
        .update({ is_featured: !currentData.is_featured })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error toggling partner featured status:", error)
      throw new Error("Failed to toggle partner featured status")
    }
  }
}

// Combined CMS Hook
export function useSupabaseCMS() {
  return {
    // Portfolio methods
    getAllProjects: PortfolioCMS.getAllProjects,
    getPublishedProjects: PortfolioCMS.getPublishedProjects,
    getProjectById: PortfolioCMS.getProjectById,
    getProjectBySlug: PortfolioCMS.getProjectBySlug,
    addProject: PortfolioCMS.addProject,
    updateProject: PortfolioCMS.updateProject,
    deleteProject: PortfolioCMS.deleteProject,
    togglePublishStatus: PortfolioCMS.togglePublishStatus,

    // Blog methods
    getAllBlogPosts: BlogCMS.getAllBlogPosts,
    getPublishedBlogPosts: BlogCMS.getPublishedBlogPosts,
    getBlogPostBySlug: BlogCMS.getBlogPostBySlug,
    addBlogPost: BlogCMS.addBlogPost,
    updateBlogPost: BlogCMS.updateBlogPost,
    deleteBlogPost: BlogCMS.deleteBlogPost,
    toggleBlogPublishStatus: BlogCMS.toggleBlogPublishStatus,
    searchBlogPosts: BlogCMS.searchBlogPosts,
    getBlogPostsByTag: BlogCMS.getBlogPostsByTag,

    // Reviews methods
    getAllReviews: ReviewsCMS.getAllReviews,
    getPublishedReviews: ReviewsCMS.getPublishedReviews,
    getFeaturedReviews: ReviewsCMS.getFeaturedReviews,
    addReview: ReviewsCMS.addReview,
    updateReview: ReviewsCMS.updateReview,
    deleteReview: ReviewsCMS.deleteReview,
    toggleReviewPublishStatus: ReviewsCMS.toggleReviewPublishStatus,
    toggleReviewFeaturedStatus: ReviewsCMS.toggleReviewFeaturedStatus,

    // Partners methods
    getAllPartners: PartnersCMS.getAllPartners,
    getPublishedPartners: PartnersCMS.getPublishedPartners,
    getFeaturedPartners: PartnersCMS.getFeaturedPartners,
    addPartner: PartnersCMS.addPartner,
    updatePartner: PartnersCMS.updatePartner,
    deletePartner: PartnersCMS.deletePartner,
    togglePartnerPublishStatus: PartnersCMS.togglePartnerPublishStatus,
    togglePartnerFeaturedStatus: PartnersCMS.togglePartnerFeaturedStatus,
  }
}
