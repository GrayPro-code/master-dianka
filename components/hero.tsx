"use client"

import { useMemo, useState, useRef } from "react"
import Image from "next/image"
import { motion, useMotionValue } from "framer-motion"
import Link from "next/link"

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { HighlightedText } from "./highlighted-text"
import { Lamp } from "@/components/lamp"
import { BackgroundEffects } from "@/components/shared/solution-hero-background"

import { useGravityEffect } from "@/hooks/use-gravity-effect"
import { useInitElasticBoxPositions } from "@/hooks/use-init-elastic-box-positions"
import { useIsMobile } from "@/hooks/use-mobile"

export function Hero() {
  // Основной контейнер секции
  const containerRef = useRef<HTMLDivElement>(null)

  // Флаги для перетаскивания лампы
  const isDraggingRef = useRef(false)

  // Состояние света
  const [isLightOn, setIsLightOn] = useState(true)

  // Проверка мобильного устройства
  const isMobile = useIsMobile()

  // Motion values для лампы и фоновых эффектов
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotation = useMotionValue(0)

  // Передаём координаты в BackgroundEffects
  const dynamicOrigin = useMemo(() => ({ x, y }), [x, y])

  // Позиционирование лампы
  const { isPositioned, anchor, restPosition } =
    useInitElasticBoxPositions(containerRef, x, y)

  // Физика лампы
  useGravityEffect({ anchor, restPosition, x, y, rotation, isDraggingRef })

  // Обработка начала перетаскивания лампы
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    const target = e.target as HTMLElement
    target.setPointerCapture(e.pointerId)

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
  }

  // Движение лампы
  const handlePointerMove = (e: PointerEvent) => {
    if (isDraggingRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      x.set(e.clientX - rect.left)
      y.set(e.clientY - rect.top)
    }
  }

  // Завершение перетаскивания
  const handlePointerUp = () => {
    isDraggingRef.current = false
    window.removeEventListener("pointermove", handlePointerMove)
    window.removeEventListener("pointerup", handlePointerUp)
  }

  // Включение/выключение света
  const handleToggle = () => setIsLightOn((prev) => !prev)

  // -----------------------------
  // 🔥 3D‑эффект карточки
  // -----------------------------
  const cardRotateX = useMotionValue(0)
  const cardRotateY = useMotionValue(0)

  // Движение мыши по всей секции
  const handleSectionPointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()

    // Нормализуем координаты в диапазон -0.5 ... 0.5
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5

    const maxRotate = 15 // максимальный угол поворота

    cardRotateY.set(relX * maxRotate)
    cardRotateX.set(relY * -maxRotate)
  }

  // Возврат карточки в исходное положение
  const handleSectionPointerLeave = () => {
    cardRotateX.set(0)
    cardRotateY.set(0)
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden p-6 gap-10"
      style={{
        background: "radial-gradient(circle, #1E293B 0%, #0F172A 100%)",
      }}
      onPointerMove={handleSectionPointerMove}
      onPointerLeave={handleSectionPointerLeave}
    >
      {/* Затемнение при выключенном свете */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ backgroundColor: "#020617" }}
        animate={{ opacity: isLightOn ? 0 : 0.85 }}
        transition={{ duration: 0.5 }}
      />

      {/* Фоновые эффекты */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <BackgroundEffects dynamicOrigin={dynamicOrigin} isLightOn={isLightOn} />
        </div>
      )}

      {/* Лампа */}
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
          {/* Оборачиваем карточку в motion.div для 3D‑эффекта */}
          <motion.div
            style={{
              rotateX: cardRotateX,
              rotateY: cardRotateY,
              transformStyle: "preserve-3d",
            }}
          >
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
                <Link href="/#projects">
                  <CardItem translateZ={20} className="px-4 py-2 rounded-xl text-lg font-bold text-white">
                    פורטפוליו →
                  </CardItem>
                </Link>

                <Link href="#booking">
                  <CardItem
                    translateZ={20}
                    className="px-4 py-2 rounded-xl bg-purple-500 dark:bg-white dark:text-black text-white text-lg font-bold"
                  >
                    קבעי תור
                  </CardItem>
                </Link>
              </div>
            </CardBody>
          </motion.div>
        </CardContainer>
      </div>

      {/* Левая часть — текст */}
      <div className="md:w-1/2 w-full text-right mb-10 md:mb-0 z-20" dir="rtl">
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
