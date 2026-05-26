"use client"

import { useMemo, useState, useRef } from "react"
import Image from "next/image"
import { motion, useMotionValue } from "framer-motion"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { HighlightedText } from "./highlighted-text"
import { Lamp } from "@/components/lamp"
import { BackgroundEffects } from "@/components/shared/solution-hero-background"
import { useGravityEffect } from "@/hooks/use-gravity-effect"
import { useInitElasticBoxPositions } from "@/hooks/use-init-elastic-box-positions"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"


export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const [isLightOn, setIsLightOn] = useState(true)
  const isMobile = useIsMobile()


  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotation = useMotionValue(0)

  const dynamicOrigin = useMemo(() => ({ x, y }), [x, y])

  const { isPositioned, anchor, restPosition } =
    useInitElasticBoxPositions(containerRef, x, y)

  useGravityEffect({ anchor, restPosition, x, y, rotation, isDraggingRef })

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    const target = e.target as HTMLElement
    target.setPointerCapture(e.pointerId)
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
  }

  const handlePointerMove = (e: PointerEvent) => {
    if (isDraggingRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      x.set(e.clientX - rect.left)
      y.set(e.clientY - rect.top)
    }
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
    window.removeEventListener("pointermove", handlePointerMove)
    window.removeEventListener("pointerup", handlePointerUp)
  }

  const handleToggle = () => setIsLightOn((prev) => !prev)

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden p-6 gap-10"
      style={{
        background: "radial-gradient(circle, #1E293B 0%, #0F172A 100%)",
      }}
    >
      {/* Затемнение при выключенном свете */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ backgroundColor: "#020617" }}
        animate={{ opacity: isLightOn ? 0 : 0.85 }}
        transition={{ duration: 0.5 }}
      />


      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <BackgroundEffects dynamicOrigin={dynamicOrigin} isLightOn={isLightOn} />
        </div>
      )}

      {/* Лампа — вынесена поверх всего */}
      <div className="absolute inset-0 pointer-events-none z-40">
        {!isMobile && isPositioned && (
          <Lamp
            x={x}
            y={y}
            rotation={rotation}
            anchor={anchor}
            isLightOn={isLightOn}
            onPointerDown={handlePointerDown}
            onCordPull={handleToggle}
          />
        )}

      </div>

      {/* Правая часть — карточка */}
      <div className="md:w-1/2 w-full flex justify-center z-20">
        <CardContainer className="inter-var">
          <CardBody className="bg-fuchsia-50/10 relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/10 dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[28rem] h-auto rounded-xl p-6 border">
            <CardItem translateZ="50" className="text-xl font-bold text-purple-500 dark:text-white">
              אני דיאנה
            </CardItem>
            <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
              מעצבת יופי לך
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="/images/diana-manicure-2.png"
                height={1000}
                width={1000}
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-2xl"
                alt="thumbnail"
              />

            </CardItem>
            <div className="flex justify-between items-center mt-20">

              {/* PORTFOLIO BUTTON */}
              <Link href="/#projects">
                <CardItem
                  translateZ={20}
                  target="__blank"
                  className="px-4 py-2 rounded-xl text-lg font-bold text-white"
                >
                  פורטפוליו →
                </CardItem>
              </Link>

              {/* BOOKING BUTTON */}
              <Link href="#booking">
                <CardItem
                  translateZ={20}
                  target="__blank"
                  className="px-4 py-2 rounded-xl bg-purple-500 dark:bg-white dark:text-black text-white text-lg font-bold"
                >
                  קבעי תור
                </CardItem>
              </Link>

            </div>

          </CardBody>
        </CardContainer>
      </div>

      {/* Левая часть — описание */}
      <div className="md:w-1/2 w-full text-right md:text-right mb-10 md:mb-0 z-20" dir="rtl">
        <h2 className="text-5xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl text-purple-100">
          ציפורניים
          <br />
          <HighlightedText>שמדברות עליך</HighlightedText>
        </h2>

        <p className="text-lg text-purple-200 mb-6 leading-relaxed">
          אני דיאנה — בית קטן בנהריה, אווירה רגועה, קפה חם וציפורניים מושלמות.
          עיצוב מותאם אישית, חומרים איכותיים והרבה אהבה לפרטים הקטנים.
        </p>

        <div className="flex justify-between w-full mt-8 text-purple-200 font-medium" dir="rtl">
          <div className="flex flex-col items-center text-center w-1/3">
            <span className="text-2xl leading-none">⭐</span>
            <span className="text-sm mt-1 leading-tight">דירוג ממוצע</span>
          </div>

          <div className="flex flex-col items-center text-center w-1/3">
            <span className="text-2xl leading-none">+6</span>
            <span className="text-sm mt-1 leading-tight">שנות ניסיון</span>
          </div>

          <div className="flex flex-col items-center text-center w-1/3">
            <span className="text-2xl leading-none">+500</span>
            <span className="text-sm mt-1 leading-tight">לקוחות מרוצות</span>
          </div>
        </div>
      </div>
    </section>
  )
}
