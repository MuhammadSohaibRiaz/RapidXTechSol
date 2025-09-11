"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <motion.div
          className="absolute inset-0 theme-glow blur-3xl theme-transition"
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "50%", "0%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent theme-gradient-text theme-transition"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About RapidXTech
        </motion.h1>
        <div className="space-y-6 theme-text max-w-3xl mx-auto theme-transition">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            RapidXTech is a forward-thinking software development company dedicated to creating innovative digital
            solutions that help businesses thrive in today's competitive landscape. Founded with a passion for
            technology and a commitment to excellence, we've established ourselves as a trusted partner for
            organizations seeking to leverage the power of software.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our team of experienced developers, designers, and strategists work collaboratively to deliver custom
            software solutions that address complex business challenges. From web and mobile applications to enterprise
            systems and emerging technologies, we bring technical expertise and creative thinking to every project.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            At RapidXTech, we believe in:
          </motion.p>
          <motion.ul
            className="list-disc list-inside space-y-2 pl-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <li>Technical excellence and continuous innovation</li>
            <li>User-centered design and exceptional experiences</li>
            <li>Transparent communication and collaborative partnerships</li>
            <li>Agile methodologies that deliver results efficiently</li>
            <li>Long-term relationships built on trust and mutual success</li>
          </motion.ul>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Our mission is to empower organizations through technology, creating software solutions that not only meet
            today's needs but are built to evolve with your business. Whether you're a startup looking to disrupt an
            industry or an established enterprise seeking digital transformation, RapidXTech has the expertise and
            passion to bring your vision to life.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
