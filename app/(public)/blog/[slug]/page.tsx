import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogCMS } from "@/lib/supabase-cms"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { OptimizedImage } from "@/components/optimized-image"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await BlogCMS.getBlogPostBySlug(params.slug)

    if (!post) {
      return {
        title: "Post Not Found - RapidXSolution Blog",
        description: "The requested blog post could not be found.",
      }
    }

    return {
      title: post.seo_title || `${post.title} - RapidXSolution Blog`,
      description: post.seo_description || post.excerpt,
      keywords: post.tags.join(", "),
      authors: [{ name: post.author }],
      openGraph: {
        title: post.seo_title || `${post.title} - RapidXSolution Blog`,
        description: post.seo_description || post.excerpt,
        type: "article",
        images: post.image ? [post.image] : [],
        publishedTime: post.date,
      },
      twitter: {
        card: "summary_large_image",
        title: post.seo_title || `${post.title} - RapidXSolution Blog`,
        description: post.seo_description || post.excerpt,
        images: post.image ? [post.image] : [],
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "Blog Post - RapidXSolution",
      description: "Read our latest blog post about technology and digital innovation.",
    }
  }
}

export default async function BlogPostPage({ params }: Props) {
  try {
    const post = await BlogCMS.getBlogPostBySlug(params.slug)

    if (!post) {
      notFound()
    }

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }

    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button variant="outline" className="mb-8 bg-transparent" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <article className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-12">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">{post.excerpt}</p>

              {/* Meta Info */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(post.date)}
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Featured Image */}
              {post.image && (
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                  <OptimizedImage src={post.image} alt={post.title} fill className="object-cover" />
                </div>
              )}
            </header>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Footer */}
            <footer className="border-t pt-8">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">Tags:</span>
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* CTA */}
              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
                  <p className="mb-6 opacity-90">Let's discuss how we can help you achieve your digital goals.</p>
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/contact">Get Started Today</Link>
                  </Button>
                </CardContent>
              </Card>
            </footer>
          </article>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching blog post:", error)
    notFound()
  }
}
