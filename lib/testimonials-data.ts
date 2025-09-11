export interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  content: string
  image?: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CTO",
    company: "TechVision Inc.",
    content:
      "RapidXTech led our project execution with remarkable clarity, professionalism, and efficiency. Their communication and coordination skills were excellent, ensuring all requirements were understood and questions resolved on time. They proved to be a dependable and proactive partner who kept everything organized and ensured smooth progress throughout the project, reflecting RapidXTech's commitment to excellence.",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager",
    company: "InnovateLabs",
    content:
      "Working with RapidXTech was a game-changer for our startup. They delivered a robust, scalable solution that exceeded our expectations. Their technical expertise and attention to detail helped us launch our product ahead of schedule and within budget.",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Founder & CEO",
    company: "GreenTech Solutions",
    content:
      "RapidXTech transformed our vision into reality with their innovative approach and cutting-edge technology solutions. Their team's dedication and expertise made the entire development process seamless and enjoyable.",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
]
