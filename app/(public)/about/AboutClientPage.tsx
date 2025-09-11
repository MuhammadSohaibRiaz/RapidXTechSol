"use client"

export default function AboutClientPage() {
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-clip-text text-transparent theme-gradient-text theme-transition">
            About RapidXTech
          </h1>
          <p className="text-xl theme-text opacity-80 text-center mb-12 theme-transition">
            We're passionate about creating innovative software solutions that transform businesses and drive success.
          </p>

          <div className="bg-background/30 backdrop-blur-md rounded-lg p-8 shadow-lg theme-transition">
            <h2 className="text-2xl font-semibold mb-4 theme-text theme-transition">Our Mission</h2>
            <p className="theme-text opacity-80 mb-6 theme-transition">
              At RapidXTech, we believe in the power of technology to transform businesses and improve lives. Our
              mission is to deliver cutting-edge software solutions that not only meet our clients' immediate needs but
              also position them for future growth and success.
            </p>

            <h2 className="text-2xl font-semibold mb-4 theme-text theme-transition">Our Values</h2>
            <ul className="space-y-3 theme-text opacity-80 theme-transition">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <strong>Innovation:</strong> We stay at the forefront of technology trends and continuously explore new
                ways to solve complex problems.
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <strong>Quality:</strong> We maintain the highest standards in everything we do, from code quality to
                customer service.
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <strong>Collaboration:</strong> We work closely with our clients as partners, ensuring their vision
                becomes reality.
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <strong>Transparency:</strong> We believe in open communication and keeping our clients informed
                throughout every project.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
