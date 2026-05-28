"use client"

import type React from "react"

import { useEffect, useState, useRef, useCallback } from "react"
import VariableProximity from "@/components/variable-proximity"
import { pb } from "@/lib/pb"

const initialImages = [
  // Top left area
  {
    src: "/images/foto1.jpg",
    alt: "Mountain landscape",
    top: 3,
    left: -2,
    rotate: -12,
    width: 280,
    height: 200,
  },
  {
    src: "/images/foto2.jpg",
    alt: "Ocean waves",
    top: 5,
    left: 18,
    rotate: 5,
    width: 180,
    height: 140,
  },
  {
    src: "/images/foto3.jpg",
    alt: "Forest trees",
    top: -3,
    left: 38,
    rotate: -3,
    width: 200,
    height: 180,
  },
  // Top right area
  {
    src: "/images/foto4.jpg",
    alt: "City skyline",
    top: 2,
    left: 58,
    rotate: 8,
    width: 220,
    height: 160,
  },
  {
    src: "/images/foto5.jpg",
    alt: "Desert dunes",
    top: 5,
    left: 78,
    rotate: -5,
    width: 200,
    height: 150,
  },
  {
    src: "/images/foto6.jpg",
    alt: "Waterfall",
    top: 0,
    left: 92,
    rotate: 12,
    width: 180,
    height: 220,
  },
  // Left side middle
  {
    src: "/images/foto7.jpg",
    alt: "Beach scene",
    top: 32,
    left: -5,
    rotate: 6,
    width: 240,
    height: 180,
  },
  {
    src: "/images/foto8.jpg",
    alt: "Mountain view",
    top: 45,
    left: 8,
    rotate: -8,
    width: 160,
    height: 200,
  },
  // Right side middle
  {
    src: "/images/foto9.jpg",
    alt: "Forest path",
    top: 28,
    left: 85,
    rotate: -6,
    width: 200,
    height: 160,
  },
  {
    src: "/images/foto10.jpg",
    alt: "Night city",
    top: 48,
    left: 82,
    rotate: 10,
    width: 220,
    height: 180,
  },
  // Bottom left area
  {
    src: "/images/foto11.jpg",
    alt: "Sand patterns",
    top: 68,
    left: -3,
    rotate: -4,
    width: 260,
    height: 200,
  },
  {
    src: "/images/foto12.jpg",
    alt: "Cascade",
    top: 72,
    left: 18,
    rotate: 7,
    width: 180,
    height: 160,
  },
  {
    src: "/images/foto13.jpg",
    alt: "Peak view",
    top: 78,
    left: 32,
    rotate: -2,
    width: 160,
    height: 140,
  },
  // Bottom center-right area
  {
    src: "/images/foto14.jpg",
    alt: "Waves",
    top: 75,
    left: 48,
    rotate: 4,
    width: 180,
    height: 150,
  },
  {
    src: "/images/foto15.jpg",
    alt: "Trees",
    top: 72,
    left: 62,
    rotate: -6,
    width: 200,
    height: 170,
  },
  {
    src: "/images/foto12.jpg",
    alt: "Skyline",
    top: 70,
    left: 78,
    rotate: 8,
    width: 220,
    height: 180,
  },
  {
    src: "/images/foto7.jpg",
    alt: "Dunes",
    top: 65,
    left: 92,
    rotate: -10,
    width: 180,
    height: 220,
  },
]

const PORTFOLIO_LAYOUT_STORAGE_KEY = "portfolio-layout-v1"

type PortfolioImage = (typeof initialImages)[number] & {
  id: string
  created?: string
  updated?: string
}

export function Portfolio() {
  const [images, setImages] = useState<PortfolioImage[]>([])
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const pendingPosition = useRef({ left: 0, top: 0 })
  const textContainerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    setDraggingIndex(index)
    const rect = (e.target as HTMLElement).closest(".draggable-image")?.getBoundingClientRect()
    if (rect) {
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
  }

  const updatePosition = useCallback(() => {
    if (draggingIndex === null) return

    setImages((prev) =>
      prev.map((img, i) =>
        i === draggingIndex ? { ...img, left: pendingPosition.current.left, top: pendingPosition.current.top } : img,
      ),
    )
    animationFrameRef.current = null
  }, [draggingIndex])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (draggingIndex === null || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      pendingPosition.current = {
        left: ((e.clientX - containerRect.left - dragOffset.current.x) / containerRect.width) * 100,
        top: ((e.clientY - containerRect.top - dragOffset.current.y) / containerRect.height) * 100,
      }

      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(updatePosition)
      }
    },
    [draggingIndex, updatePosition],
  )

  const handleMouseUp = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    setDraggingIndex(null)
  }, [])

  useEffect(() => {
    let isMounted = true

    const loadPortfolioImages = async () => {
      try {
        const records = await pb.collection("portfolio").getFullList({ sort: "created" })

        if (!isMounted) return

        let savedLayout: PortfolioImage[] = []

        if (typeof window !== "undefined") {
          try {
            const rawSavedLayout = window.localStorage.getItem(PORTFOLIO_LAYOUT_STORAGE_KEY)
            if (rawSavedLayout) {
              savedLayout = JSON.parse(rawSavedLayout) as PortfolioImage[]
            }
          } catch (error) {
            console.error("Failed to read saved portfolio layout", error)
          }
        }

        const savedPositions = new Map(savedLayout.map((item) => [item.id, item]))

        const portfolioImages = records
          .filter((record) => record.foto)
          .map((record, index) => {
            const baseLayout = initialImages[index] ?? initialImages[initialImages.length - 1]
            const savedItem = savedPositions.get(record.id)

            return {
              id: record.id,
              src: pb.files.getURL(record, record.foto),
              alt: record.alt || baseLayout.alt,
              top: savedItem?.top ?? baseLayout.top,
              left: savedItem?.left ?? baseLayout.left,
              rotate: savedItem?.rotate ?? baseLayout.rotate,
              width: savedItem?.width ?? baseLayout.width,
              height: savedItem?.height ?? baseLayout.height,
              created: record.created,
              updated: record.updated,
            } satisfies PortfolioImage
          })

        setImages(portfolioImages)
      } catch (error) {
        console.error("Failed to load portfolio images from PocketBase", error)
        setImages(
          initialImages.map((image, index) => ({
            ...image,
            id: `fallback-${index}`,
          })) as PortfolioImage[],
        )
      }
    }

    loadPortfolioImages()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (images.length === 0) return

    try {
      window.localStorage.setItem(PORTFOLIO_LAYOUT_STORAGE_KEY, JSON.stringify(images))
    } catch (error) {
      console.error("Failed to save portfolio layout", error)
    }
  }, [images])

  return (
    <main
  dir="ltr"
  ref={containerRef}
  className="hidden md:block relative h-screen overflow-hidden bg-[#ed89f7]"

      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,250,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,250,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Scattered draggable images */}
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`draggable-image absolute select-none ${
            draggingIndex === index ? "z-50 cursor-grabbing" : "cursor-grab hover:z-50"
          }`}
          style={{
            top: `${image.top}%`,
            left: `${image.left}%`,
            transform: `rotate(${image.rotate}deg) scale(${draggingIndex === index ? 1.05 : 1})`,
            width: image.width,
            height: image.height,
            transition:
              draggingIndex === index
                ? "transform 0.1s ease-out, box-shadow 0.2s ease-out"
                : "top 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease-out",
            boxShadow:
              draggingIndex === index
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.4)"
                : "0 10px 40px -10px rgba(0, 0, 0, 0.5)",
            willChange: draggingIndex === index ? "top, left, transform" : "auto",
          }}
          onMouseDown={(e) => handleMouseDown(e, index)}
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              draggable={false}
            />
          </div>
        </div>
      ))}

      <div
        ref={textContainerRef}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      >
        <div className="text-center">
          <p
            className="relative z-10 text-7xl text-white/90 md:text-[40px]"
            style={{ fontFamily: "var(--font-corinthia), cursive", marginBottom: "-20px" }}
          >
            Connect on
          </p>
          <h1 className="text-7xl tracking-tight text-white md:text-9xl">
            <VariableProximity
              label="Instagram"
              fromFontVariationSettings="'wght' 700"
              toFontVariationSettings="'wght' 900"
              containerRef={textContainerRef}
              radius={150}
              falloff="gaussian"
              className="pointer-events-auto"
              style={{
                fontFamily: '"Roboto Flex", sans-serif',
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            />
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
            A space for unfinished thoughts and late-night experiments. Catch the behind-the-scenes of my design
            journey.
          </p>
          <div
            className="pointer-events-auto mt-8 mb-8 inline-block rounded-full p-[2px]"
            style={{
              background: "linear-gradient(135deg, #e8e8e8 0%, #6b6b6b 25%, #ffffff 50%, #6b6b6b 75%, #e8e8e8 100%)",
            }}
          >
           <a
  href="https://www.instagram.com/_master_dianka_/"
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-full bg-[#0a0a0a] px-8 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-black inline-block"
>
  Follow me
</a>

          </div>
        </div>
      </div>
    </main>
  )
}
