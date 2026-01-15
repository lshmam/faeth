"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useAnimationFrame, useScroll, useVelocity, useSpring, useTransform, useInView } from "framer-motion"
import { TrendingUp, Layout, Layers, Camera, ArrowUpRight } from "lucide-react"
import PrismaticBurst from "@/components/PrismaticBurst"
import { ParticlesBackground } from "@/components/particles-background"

// --- Data Constants ---
const cards = [
  { id: 1, image: "/hero-calendar.png", title: "App Design" },
  { id: 2, image: "/hero-furniture.png", title: "Furniture Brand" },
  { id: 3, image: "/hero-website.png", title: "Web Platform" },
]

const services = [
  { icon: TrendingUp, title: "Brand Identity", description: "Crafting unique visual identities that resonate" },
  { icon: Layout, title: "Web Design", description: "Beautiful, functional websites that convert" },
  { icon: Layers, title: "Digital Marketing ", description: "Motion design that brings brands to life" },
  { icon: Camera, title: "Photography & Video", description: "Visual storytelling at its finest" },
]

const projects = [
  { title: "Neucler", description: "Turn conversations into conversions", image: "/neucler.png", tags: ["Product", "Web"], link: "https://neucler.com" },
  { title: "Jim Coach", description: "Personal trainer in your pocket", image: "/jim-coach.png", tags: ["Brand", "Product"], link: "https://jim.coach" },
  { title: "Neta Bridge", description: "Network intelligence platform", image: "/neta-bridge.png", tags: ["Website", "Interaction"], link: "https://neta-bridge.vercel.app/" },
]

export default function Home() {
  // --- Hero Logic ---
  const containerRef = useRef<HTMLDivElement>(null)
  const [contentWidth, setContentWidth] = useState(0)
  const x = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 60, stiffness: 200 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 12], { clamp: false })
  const baseSpeed = 0.5

  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > 50 && !isScrolled) setIsScrolled(true)
      else if (latest <= 50 && isScrolled) setIsScrolled(false)
    })
  }, [scrollY, isScrolled])

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setContentWidth(containerRef.current.scrollWidth / 3)
    }
    updateWidth()
    setTimeout(updateWidth, 100)
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  useAnimationFrame(() => {
    if (contentWidth === 0) return
    let moveBy = baseSpeed + (velocityFactor.get() * 0.5)
    let newX = x.get() - moveBy
    if (newX <= -contentWidth) newX += contentWidth
    else if (newX > 0) newX -= contentWidth
    x.set(newX)
  })

  // --- CTA/Footer Logic ---
  const ctaRef = useRef(null)
  const isCtaInView = useInView(ctaRef, { amount: 0.3 })

  // --- Background/Color State ---
  // Defaults to Hero (Dark). 
  // If Scrolled -> White. 
  // If Footer In View -> Dark (Overrules Scrolled).
  const isDark = !isScrolled || isCtaInView

  return (
    <motion.main
      animate={{
        backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
        color: isDark ? "#ffffff" : "#0a0a0a"
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen pt-2 overflow-hidden flex flex-col items-center"
    >
      {/* 1. Hero Carousel */}
      <div className="flex w-full overflow-hidden select-none">
        <motion.div
          ref={containerRef}
          className="flex gap-2 cursor-grab active:cursor-grabbing px-4"
          style={{ x }}
          drag="x"
          dragMomentum={false}
        >
          {[...cards, ...cards, ...cards].map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="flex-shrink-0 relative h-[80vh] md:h-[94vh] w-auto aspect-[2/3] md:aspect-[3/4] rounded-[1rem] overflow-hidden"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* 2. Intro Content */}
      <div className="max-w-4xl mx-auto text-center py-20 md:py-32 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-5xl leading-tight text-balance font-medium tracking-tight"
        >
          <span className="opacity-40">Faeth is a design studio for startups.</span> We help you build
          from 0 to 1 and beyond.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-16 md:mt-24 text-left max-w-4xl mx-auto"
        >
          {/* <p className="opacity-60 text-lg leading-relaxed mb-6 font-medium">
            A zero-to-one design studio, on a mission to build what&apos;s next.
          </p> */}
          <p className="opacity-60 text-lg leading-relaxed font-medium">
            We partner with founders and startups to create compelling digital products and brands. Whether you&apos;re
            just getting started, turning a napkin sketch into reality, or reinventing an existing product for the next
            stage of growth, we&apos;ll work with you to make the future arrive a little sooner.
          </p>
        </motion.div>
      </div>

      {/* 3. Services */}
      <div className="w-full max-w-4xl mx-auto pb-20 md:pb-32 px-6">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 rounded-full border border-current/20 text-sm opacity-60">
            Services
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-light mb-12 text-balance">How we can help you</h2>
        <div className="flex flex-col gap-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex items-center justify-between bg-current/5 rounded-2xl px-6 md:px-8 py-6 md:py-8 group hover:bg-current/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <service.icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                <span className="text-xl md:text-2xl lg:text-3xl font-light">{service.title}</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-current/40" />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Work Showcase */}
      <div className="w-full py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="inline-block px-4 py-2 rounded-full border border-current/20 text-sm opacity-60 mb-4">
              Selected Work
            </span>
            <h2 className="text-3xl md:text-4xl font-light mt-2">Projects we&apos;re proud of</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={project.title}
                className={`group relative overflow-hidden rounded-xl cursor-pointer block aspect-[4/3] ${project.title === "Neucler" ? "md:col-span-2 md:aspect-[2/1]" : ""
                  }`}
              >
                {project.title === "Neucler" ? (
                  <>
                    <div className="absolute inset-0 z-0">
                      <PrismaticBurst />
                    </div>
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                      <img src="/Frame 79.png" alt="Neucler UI" className="w-[15%] md:w-[10%] h-auto object-contain" />
                    </div>
                  </>
                ) : project.title === "Jim Coach" ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover object-right transition-transform duration-500 group-hover:scale-105"
                  >
                    <source src="/jim-box.mp4" type="video/mp4" />
                  </video>
                ) : project.title === "Neta Bridge" ? (
                  <>
                    <div className="absolute inset-0 z-0 bg-black">
                      <ParticlesBackground id="neta-particles" />
                    </div>
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                      <h3 className="text-4xl text-white tracking-tight font-britanica">
                        NetaBridge
                      </h3>
                    </div>
                  </>
                ) : (
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10">
                  <ArrowUpRight className="w-5 h-5" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-10 transition-transform duration-300 group-hover:translate-y-[-4px]">
                  <div className="flex items-center gap-2 mb-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-medium text-white">{project.title}</h3>
                  <p className="text-sm text-white/80 mt-1">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>


      {/* 5. Testimonial & CTA (Trigger for Dark Mode) */}
      <div ref={ctaRef} className="w-full py-20 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-balance">
            &ldquo;Faeth did a fantastic job translating our MVP vision to reality. The designers became part of our
            team, and were crucial in building for our first set of customers. Also generally good vibes all around and
            super fun to work with!&rdquo;
          </blockquote>
          <div className="mt-10 flex flex-col items-center gap-2">
            {/* <div className="w-12 h-12 rounded-full bg-current/20 flex items-center justify-center">
              <span className="text-lg font-medium">CS</span>
            </div> */}
            <span className="font-medium opacity-90">Charles Sol</span>
            <span className="opacity-50 text-sm">Founder of Studio.dev</span>
          </div>
        </div>

        <div className="pt-20 pb-10 flex justify-center">
          <a
            href="https://www.linkedin.com/in/aminulishmam/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-current hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* 6. Footer */}
      <footer className="w-full border-t border-current/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="opacity-50 text-sm">create@faeth.studio</span>
          <span className="opacity-30 text-xs">©2026 Faeth Studio — All rights reserved</span>
          <span className="opacity-50 text-sm">@faethstudio</span>
        </div>
      </footer>
    </motion.main>
  )
}
