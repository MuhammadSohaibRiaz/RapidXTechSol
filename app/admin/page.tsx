"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Eye, EyeOff, Star, FileText, Briefcase, Heart, Building, Save } from "lucide-react"
import { PortfolioCMS, BlogCMS, ReviewsCMS, PartnersCMS } from "@/lib/supabase-cms"
import type { ProjectDetail, BlogPost, ClientReview, TrustedPartner } from "@/lib/supabase"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("projects")
  const [projects, setProjects] = useState<ProjectDetail[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [reviews, setReviews] = useState<ClientReview[]>([])
  const [partners, setPartners] = useState<TrustedPartner[]>([])
  const [loading, setLoading] = useState(true)

  // Form states
  const [editingProject, setEditingProject] = useState<ProjectDetail | null>(null)
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null)
  const [editingReview, setEditingReview] = useState<ClientReview | null>(null)
  const [editingPartner, setEditingPartner] = useState<TrustedPartner | null>(null)

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      const [projectsData, blogData, reviewsData, partnersData] = await Promise.all([
        PortfolioCMS.getAllProjects(),
        BlogCMS.getAllBlogPosts(),
        ReviewsCMS.getAllReviews(),
        PartnersCMS.getAllPartners(),
      ])

      setProjects(projectsData)
      setBlogPosts(blogData)
      setReviews(reviewsData)
      setPartners(partnersData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    {
      title: "Projects",
      value: projects.length,
      published: projects.filter((p) => p.is_published).length,
      icon: Briefcase,
      color: "text-blue-600",
    },
    {
      title: "Blog Posts",
      value: blogPosts.length,
      published: blogPosts.filter((p) => p.is_published).length,
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "Reviews",
      value: reviews.length,
      published: reviews.filter((r) => r.is_published).length,
      icon: Heart,
      color: "text-red-600",
    },
    {
      title: "Partners",
      value: partners.length,
      published: partners.filter((p) => p.is_published).length,
      icon: Building,
      color: "text-purple-600",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your website content and settings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.published} published</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Portfolio Projects</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <ProjectForm
                  project={null}
                  onSave={(project) => {
                    setProjects([project, ...projects])
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={setEditingProject}
                onTogglePublish={async (id) => {
                  try {
                    const updated = await PortfolioCMS.togglePublishStatus(id)
                    setProjects(projects.map((p) => (p.id === id ? updated : p)))
                  } catch (error) {
                    console.error("Error toggling publish status:", error)
                  }
                }}
                onDelete={async (id) => {
                  try {
                    await PortfolioCMS.deleteProject(id)
                    setProjects(projects.filter((p) => p.id !== id))
                  } catch (error) {
                    console.error("Error deleting project:", error)
                  }
                }}
              />
            ))}
          </div>
        </TabsContent>

        {/* Blog Posts Tab */}
        <TabsContent value="blog" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Blog Posts</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Blog Post</DialogTitle>
                </DialogHeader>
                <BlogPostForm
                  post={null}
                  onSave={(post) => {
                    setBlogPosts([post, ...blogPosts])
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {blogPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                onEdit={setEditingBlogPost}
                onTogglePublish={async (id) => {
                  try {
                    const updated = await BlogCMS.toggleBlogPublishStatus(id)
                    setBlogPosts(blogPosts.map((p) => (p.id === id ? updated : p)))
                  } catch (error) {
                    console.error("Error toggling publish status:", error)
                  }
                }}
                onDelete={async (id) => {
                  try {
                    await BlogCMS.deleteBlogPost(id)
                    setBlogPosts(blogPosts.filter((p) => p.id !== id))
                  } catch (error) {
                    console.error("Error deleting blog post:", error)
                  }
                }}
              />
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Client Reviews</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Review
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Review</DialogTitle>
                </DialogHeader>
                <ReviewForm
                  review={null}
                  onSave={(review) => {
                    setReviews([review, ...reviews])
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onEdit={setEditingReview}
                onTogglePublish={async (id) => {
                  try {
                    const updated = await ReviewsCMS.toggleReviewPublishStatus(id)
                    setReviews(reviews.map((r) => (r.id === id ? updated : r)))
                  } catch (error) {
                    console.error("Error toggling publish status:", error)
                  }
                }}
                onToggleFeatured={async (id) => {
                  try {
                    const updated = await ReviewsCMS.toggleReviewFeaturedStatus(id)
                    setReviews(reviews.map((r) => (r.id === id ? updated : r)))
                  } catch (error) {
                    console.error("Error toggling featured status:", error)
                  }
                }}
                onDelete={async (id) => {
                  try {
                    await ReviewsCMS.deleteReview(id)
                    setReviews(reviews.filter((r) => r.id !== id))
                  } catch (error) {
                    console.error("Error deleting review:", error)
                  }
                }}
              />
            ))}
          </div>
        </TabsContent>

        {/* Partners Tab */}
        <TabsContent value="partners" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Trusted Partners</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Partner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Partner</DialogTitle>
                </DialogHeader>
                <PartnerForm
                  partner={null}
                  onSave={(partner) => {
                    setPartners([partner, ...partners])
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            {partners.map((partner) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                onEdit={setEditingPartner}
                onTogglePublish={async (id) => {
                  try {
                    const updated = await PartnersCMS.togglePartnerPublishStatus(id)
                    setPartners(partners.map((p) => (p.id === id ? updated : p)))
                  } catch (error) {
                    console.error("Error toggling publish status:", error)
                  }
                }}
                onToggleFeatured={async (id) => {
                  try {
                    const updated = await PartnersCMS.togglePartnerFeaturedStatus(id)
                    setPartners(partners.map((p) => (p.id === id ? updated : p)))
                  } catch (error) {
                    console.error("Error toggling featured status:", error)
                  }
                }}
                onDelete={async (id) => {
                  try {
                    await PartnersCMS.deletePartner(id)
                    setPartners(partners.filter((p) => p.id !== id))
                  } catch (error) {
                    console.error("Error deleting partner:", error)
                  }
                }}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Dialogs */}
      {editingProject && (
        <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            <ProjectForm
              project={editingProject}
              onSave={(project) => {
                setProjects(projects.map((p) => (p.id === project.id ? project : p)))
                setEditingProject(null)
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {editingBlogPost && (
        <Dialog open={!!editingBlogPost} onOpenChange={() => setEditingBlogPost(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Blog Post</DialogTitle>
            </DialogHeader>
            <BlogPostForm
              post={editingBlogPost}
              onSave={(post) => {
                setBlogPosts(blogPosts.map((p) => (p.id === post.id ? post : p)))
                setEditingBlogPost(null)
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {editingReview && (
        <Dialog open={!!editingReview} onOpenChange={() => setEditingReview(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Review</DialogTitle>
            </DialogHeader>
            <ReviewForm
              review={editingReview}
              onSave={(review) => {
                setReviews(reviews.map((r) => (r.id === review.id ? review : r)))
                setEditingReview(null)
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {editingPartner && (
        <Dialog open={!!editingPartner} onOpenChange={() => setEditingPartner(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Partner</DialogTitle>
            </DialogHeader>
            <PartnerForm
              partner={editingPartner}
              onSave={(partner) => {
                setPartners(partners.map((p) => (p.id === partner.id ? partner : p)))
                setEditingPartner(null)
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Component definitions for forms and cards would continue here...
// Due to length constraints, I'll provide the key components:

function ProjectCard({
  project,
  onEdit,
  onTogglePublish,
  onDelete,
}: {
  project: ProjectDetail
  onEdit: (project: ProjectDetail) => void
  onTogglePublish: (id: number) => void
  onDelete: (id: number) => void
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <div className="flex gap-2 mb-2">
              <Badge variant="secondary">{project.category}</Badge>
              <Badge variant={project.is_published ? "default" : "outline"}>
                {project.is_published ? "Published" : "Draft"}
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{project.description}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(project)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => onTogglePublish(project.id)}>
              {project.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button size="sm" variant="outline" onClick={() => onDelete(project.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {project.technology.slice(0, 5).map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technology.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{project.technology.length - 5} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function BlogPostCard({
  post,
  onEdit,
  onTogglePublish,
  onDelete,
}: {
  post: BlogPost
  onEdit: (post: BlogPost) => void
  onTogglePublish: (id: number) => void
  onDelete: (id: number) => void
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <div className="flex gap-2 mb-2">
              <Badge variant={post.is_published ? "default" : "outline"}>
                {post.is_published ? "Published" : "Draft"}
              </Badge>
              <Badge variant="secondary">{post.author}</Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{post.excerpt}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(post)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => onTogglePublish(post.id)}>
              {post.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button size="sm" variant="outline" onClick={() => onDelete(post.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ReviewCard({
  review,
  onEdit,
  onTogglePublish,
  onToggleFeatured,
  onDelete,
}: {
  review: ClientReview
  onEdit: (review: ClientReview) => void
  onTogglePublish: (id: number) => void
  onToggleFeatured: (id: number) => void
  onDelete: (id: number) => void
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{review.client_name}</h3>
            <div className="flex gap-2 mb-2">
              <Badge variant={review.is_published ? "default" : "outline"}>
                {review.is_published ? "Published" : "Draft"}
              </Badge>
              {review.is_featured && (
                <Badge variant="secondary">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              <div className="flex">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">"{review.review_text}"</p>
            <p className="text-sm text-gray-500 mt-2">
              {review.client_position} at {review.client_company}
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(review)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => onToggleFeatured(review.id)}>
              <Star className={`h-4 w-4 ${review.is_featured ? "text-yellow-400 fill-current" : ""}`} />
            </Button>
            <Button size="sm" variant="outline" onClick={() => onTogglePublish(review.id)}>
              {review.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button size="sm" variant="outline" onClick={() => onDelete(review.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PartnerCard({
  partner,
  onEdit,
  onTogglePublish,
  onToggleFeatured,
  onDelete,
}: {
  partner: TrustedPartner
  onEdit: (partner: TrustedPartner) => void
  onTogglePublish: (id: number) => void
  onToggleFeatured: (id: number) => void
  onDelete: (id: number) => void
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{partner.company_name}</h3>
            <div className="flex gap-2 mb-2">
              <Badge variant={partner.is_published ? "default" : "outline"}>
                {partner.is_published ? "Published" : "Draft"}
              </Badge>
              {partner.is_featured && (
                <Badge variant="secondary">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              {partner.partnership_type && <Badge variant="outline">{partner.partnership_type}</Badge>}
            </div>
            {partner.description && (
              <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{partner.description}</p>
            )}
            {partner.company_website && (
              <a
                href={partner.company_website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                {partner.company_website}
              </a>
            )}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(partner)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => onToggleFeatured(partner.id)}>
              <Star className={`h-4 w-4 ${partner.is_featured ? "text-yellow-400 fill-current" : ""}`} />
            </Button>
            <Button size="sm" variant="outline" onClick={() => onTogglePublish(partner.id)}>
              {partner.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button size="sm" variant="outline" onClick={() => onDelete(partner.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Form Components
function ProjectForm({
  project,
  onSave,
}: {
  project: ProjectDetail | null
  onSave: (project: ProjectDetail) => void
}) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    category: project?.category || "",
    technology: project?.technology || [],
    description: project?.description || "",
    long_description: project?.long_description || "",
    challenge: project?.challenge || "",
    solution: project?.solution || "",
    results: project?.results || [],
    features: project?.features || [],
    duration: project?.duration || "",
    team_size: project?.team_size || 1,
    client_type: project?.client_type || "",
    live_url: project?.live_url || "",
    github_url: project?.github_url || "",
    is_published: project?.is_published || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let savedProject
      if (project) {
        savedProject = await PortfolioCMS.updateProject(project.id, formData)
      } else {
        savedProject = await PortfolioCMS.addProject(formData)
      }
      onSave(savedProject)
    } catch (error) {
      console.error("Error saving project:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category *</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="long_description">Long Description</Label>
        <Textarea
          id="long_description"
          value={formData.long_description}
          onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="e.g., 3 months"
          />
        </div>
        <div>
          <Label htmlFor="team_size">Team Size</Label>
          <Input
            id="team_size"
            type="number"
            value={formData.team_size}
            onChange={(e) => setFormData({ ...formData, team_size: Number.parseInt(e.target.value) || 1 })}
            min="1"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_published"
          checked={formData.is_published}
          onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
        />
        <Label htmlFor="is_published">Published</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Save Project
        </Button>
      </div>
    </form>
  )
}

function BlogPostForm({
  post,
  onSave,
}: {
  post: BlogPost | null
  onSave: (post: BlogPost) => void
}) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    image: post?.image || "",
    tags: post?.tags || [],
    author: post?.author || "RapidXTech Team",
    date: post?.date || new Date().toISOString().split("T")[0],
    is_published: post?.is_published || false,
    seo_title: post?.seo_title || "",
    seo_description: post?.seo_description || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let savedPost
      if (post) {
        savedPost = await BlogCMS.updateBlogPost(post.id, formData)
      } else {
        savedPost = await BlogCMS.addBlogPost(formData)
      }
      onSave(savedPost)
    } catch (error) {
      console.error("Error saving blog post:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="auto-generated from title"
        />
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt *</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={10}
          required
        />
      </div>

      <div>
        <Label htmlFor="image">Featured Image URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_published"
          checked={formData.is_published}
          onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
        />
        <Label htmlFor="is_published">Published</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Save Post
        </Button>
      </div>
    </form>
  )
}

function ReviewForm({
  review,
  onSave,
}: {
  review: ClientReview | null
  onSave: (review: ClientReview) => void
}) {
  const [formData, setFormData] = useState({
    client_name: review?.client_name || "",
    client_position: review?.client_position || "",
    client_company: review?.client_company || "",
    client_image: review?.client_image || "",
    review_text: review?.review_text || "",
    rating: review?.rating || 5,
    project_category: review?.project_category || "",
    is_featured: review?.is_featured || false,
    is_published: review?.is_published || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let savedReview
      if (review) {
        savedReview = await ReviewsCMS.updateReview(review.id, formData)
      } else {
        savedReview = await ReviewsCMS.addReview(formData)
      }
      onSave(savedReview)
    } catch (error) {
      console.error("Error saving review:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="client_name">Client Name *</Label>
          <Input
            id="client_name"
            value={formData.client_name}
            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="client_position">Position *</Label>
          <Input
            id="client_position"
            value={formData.client_position}
            onChange={(e) => setFormData({ ...formData, client_position: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="client_company">Company *</Label>
          <Input
            id="client_company"
            value={formData.client_company}
            onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="project_category">Project Category</Label>
          <Input
            id="project_category"
            value={formData.project_category}
            onChange={(e) => setFormData({ ...formData, project_category: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="client_image">Client Image URL</Label>
        <Input
          id="client_image"
          value={formData.client_image}
          onChange={(e) => setFormData({ ...formData, client_image: e.target.value })}
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div>
        <Label htmlFor="review_text">Review Text *</Label>
        <Textarea
          id="review_text"
          value={formData.review_text}
          onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div>
        <Label htmlFor="rating">Rating (1-5)</Label>
        <Input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: Number.parseInt(e.target.value) || 5 })}
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="is_featured"
            checked={formData.is_featured}
            onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
          />
          <Label htmlFor="is_featured">Featured</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is_published"
            checked={formData.is_published}
            onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
          />
          <Label htmlFor="is_published">Published</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Save Review
        </Button>
      </div>
    </form>
  )
}

function PartnerForm({
  partner,
  onSave,
}: {
  partner: TrustedPartner | null
  onSave: (partner: TrustedPartner) => void
}) {
  const [formData, setFormData] = useState({
    company_name: partner?.company_name || "",
    company_logo: partner?.company_logo || "",
    company_website: partner?.company_website || "",
    partnership_type: partner?.partnership_type || "",
    description: partner?.description || "",
    is_featured: partner?.is_featured || false,
    is_published: partner?.is_published || false,
    display_order: partner?.display_order || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let savedPartner
      if (partner) {
        savedPartner = await PartnersCMS.updatePartner(partner.id, formData)
      } else {
        savedPartner = await PartnersCMS.addPartner(formData)
      }
      onSave(savedPartner)
    } catch (error) {
      console.error("Error saving partner:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="company_name">Company Name *</Label>
        <Input
          id="company_name"
          value={formData.company_name}
          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="company_logo">Company Logo URL *</Label>
        <Input
          id="company_logo"
          value={formData.company_logo}
          onChange={(e) => setFormData({ ...formData, company_logo: e.target.value })}
          placeholder="https://images.unsplash.com/..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company_website">Website</Label>
          <Input
            id="company_website"
            value={formData.company_website}
            onChange={(e) => setFormData({ ...formData, company_website: e.target.value })}
            placeholder="https://example.com"
          />
        </div>
        <div>
          <Label htmlFor="partnership_type">Partnership Type</Label>
          <Input
            id="partnership_type"
            value={formData.partnership_type}
            onChange={(e) => setFormData({ ...formData, partnership_type: e.target.value })}
            placeholder="client, technology, strategic"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="display_order">Display Order</Label>
        <Input
          id="display_order"
          type="number"
          value={formData.display_order}
          onChange={(e) => setFormData({ ...formData, display_order: Number.parseInt(e.target.value) || 0 })}
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="is_featured"
            checked={formData.is_featured}
            onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
          />
          <Label htmlFor="is_featured">Featured</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is_published"
            checked={formData.is_published}
            onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
          />
          <Label htmlFor="is_published">Published</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Save Partner
        </Button>
      </div>
    </form>
  )
}
