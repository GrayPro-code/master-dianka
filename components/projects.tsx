"use client"

import { useState, useEffect, useRef } from "react"

interface Project {
  id: number
  title: string
  category: string
  location: string
  year: string
  image: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "מניקור נעוץ עדין",
    category: "קלאסי",
    location: "תל אביב",
    year: "2024",
    image: "/images/portfolio-1.jpg",
  },
  {
    id: 2,
    title: "פרנץ' ברוק כסף",
    category: "אלגנטי",
    location: "תל אביב",
    year: "2024",
    image: "/images/portfolio-2.jpg",
  },
  {
    id: 3,
    title: "עצות מוארות",
    category: "מודרני",
    location: "תל אביב",
    year: "2024",
    image: "/images/portfolio-3.jpg",
  },
  {
    id: 4,
    title: "ניצוץ וברק",
    category: "ערב",
    location: "תל אביב",
    year: "2024",
    image: "/images/portfolio-4.jpg",
  },
]

export function Projects() {
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const [scrollY, setScrollY] = useState(0)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollYRef = useRef(0)

  // Обновляем позицию прокрутки с частотой анимационного кадра, чтобы не рендерить компонент на каждом событии scroll.
  useEffect(() => {
    let frameId: number | null = null

    const handleScroll = () => {
      scrollYRef.current = window.scrollY

      if (frameId === null) {
        frameId = window.requestAnimationFrame(() => {
          setScrollY(scrollYRef.current)
          frameId = null
        })
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const projectId = Number((entry.target as HTMLElement).dataset.projectId)

          if (Number.isNaN(projectId)) {
            return
          }

          setRevealedImages((prev) => (prev.has(projectId) ? prev : new Set(prev).add(projectId)))
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Сохраняет DOM-ссылку на каждый элемент сетки, чтобы observer мог отслеживать его появление.
  const setImageRef = (index: number) => (el: HTMLDivElement | null) => {
    imageRefs.current[index] = el
  }

  // Рассчитывает поворот карточки для волнообразного эффекта и лёгкого наклона.
  const getSwayTransform = (index: number) => {
    // Создаёт волновой эффект, чтобы карточки слегка колебались при прокрутке.
    const offset = (scrollY * 0.5 + index * 100) % 360
    const sway = Math.sin((offset * Math.PI) / 180) * 8 // 8 degrees of sway
    const tilt = index % 2 === 0 ? -2 : 2 // slight alternating tilt
    
    return `rotateZ(${tilt + sway}deg)`
  }

  return (
    <section
  id="projects"
  className="block md:hidden py-24 bg-gradient-to-b from-purple-100 to-purple-400"
>

      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-purple-500 text-sm tracking-[0.3em] uppercase mb-4">{"הלויה שלי"}</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-purple-500">{"רעיים"}</span>
            <span className="text-black mx-2">{"מהפלון"}</span>
          </h2>
          <p className="text-gray-600 text-lg" dir="rtl">
            {"כל פולרואיד - לקוחה אימיתית, ציפורנים אימיתיות, חיוך אימיתי"}
          </p>
        </div>

        {/* Polaroid Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              data-project-id={project.id}
              ref={setImageRef(index)}
              className="relative group cursor-pointer"
              style={{
                perspective: "1200px",
              }}
            >
              {/* Wooden Clothespin */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 w-10 h-12">
                {/* Main wooden body */}
                <div className="relative w-full h-full">
                  {/* Wood top part */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-amber-700 via-amber-600 to-amber-800 rounded-t-lg shadow-lg" 
                    style={{
                      boxShadow: "0 4px 8px rgba(0,0,0,0.3), inset -1px -1px 2px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(255,255,255,0.1)"
                    }}>
                    {/* Wood grain texture */}
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-amber-900 to-transparent rounded-t-lg" />
                    {/* Highlight */}
                    <div className="absolute top-1 left-1 w-1 h-3 bg-amber-300 opacity-40 rounded-full blur-sm" />
                  </div>
                  
                  {/* Metal spring/tension */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3 h-4 border-2 border-gray-500 rounded-full" 
                    style={{
                      background: "linear-gradient(to bottom, #888, #555)",
                      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)"
                    }} />
                </div>
              </div>

              {/* Polaroid Card */}
              <div
                className="bg-white rounded-sm shadow-lg transition-shadow duration-300 group-hover:shadow-2xl"
                style={{
                  transform: getSwayTransform(index),
                  transformStyle: "preserve-3d",
                  padding: "12px",
                  willChange: "transform",
                }}
              >
                {/* White Border Container */}
                <div className="relative overflow-hidden bg-white aspect-square">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${revealedImages.has(project.id) ? "opacity-100 scale-100" : "opacity-50 scale-95"
                      }`}
                  />

                  {/* Reveal Overlay */}
                  <div
                    className="absolute inset-0 bg-pink-200"
                    style={{
                      transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                      transformOrigin: "top",
                      transition: "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)",
                    }}
                  />
                </div>

                {/* Caption */}
                <div className="mt-3 text-center">
                  <h3 className="text-sm font-medium text-gray-800" dir="rtl">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
