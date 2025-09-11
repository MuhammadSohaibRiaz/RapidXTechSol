"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPageClient() {
  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div
          className="absolute inset-0 theme-glow blur-3xl theme-transition"
          style={{
            animation: "gradient-animation 20s linear infinite alternate",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent theme-gradient-text theme-transition">
            Get in Touch
          </h1>
          <p className="text-xl theme-text opacity-80 text-center mb-12 theme-transition">
            Ready to start your next project? Let's discuss how we can help you achieve your goals.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-background/30 backdrop-blur-md rounded-lg p-8 shadow-lg theme-transition">
              <h2 className="text-2xl font-semibold mb-6 theme-text theme-transition">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium theme-text mb-2 theme-transition">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="theme-text bg-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium theme-text mb-2 theme-transition">
                      Last Name
                    </label>
                    <Input id="lastName" type="text" placeholder="Doe" className="theme-text bg-transparent" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium theme-text mb-2 theme-transition">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="theme-text bg-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium theme-text mb-2 theme-transition">
                    Company (Optional)
                  </label>
                  <Input id="company" type="text" placeholder="Your Company" className="theme-text bg-transparent" />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium theme-text mb-2 theme-transition">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Project Inquiry"
                    className="theme-text bg-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium theme-text mb-2 theme-transition">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="theme-text bg-transparent"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-background/30 backdrop-blur-md rounded-lg p-8 shadow-lg theme-transition">
                <h2 className="text-2xl font-semibold mb-6 theme-text theme-transition">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold theme-text theme-transition">Email</h3>
                      <p className="theme-text opacity-80 theme-transition">hello@rapidxtech.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold theme-text theme-transition">Phone</h3>
                      <p className="theme-text opacity-80 theme-transition">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold theme-text theme-transition">Address</h3>
                      <p className="theme-text opacity-80 theme-transition">
                        123 Tech Street
                        <br />
                        Innovation District
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-primary mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold theme-text theme-transition">Business Hours</h3>
                      <p className="theme-text opacity-80 theme-transition">
                        Monday - Friday: 9:00 AM - 6:00 PM PST
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background/30 backdrop-blur-md rounded-lg p-8 shadow-lg theme-transition">
                <h2 className="text-2xl font-semibold mb-4 theme-text theme-transition">Why Choose RapidXTech?</h2>
                <ul className="space-y-3 theme-text opacity-80 theme-transition">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Expert team with 10+ years of experience
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Agile development methodology
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    24/7 support and maintenance
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    Competitive pricing and flexible packages
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    100% satisfaction guarantee
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
