"use client"

import { motion, type MotionValue, useTransform } from "framer-motion"

interface LampProps {
  x: MotionValue<number>
  y: MotionValue<number>
  rotation: MotionValue<number>
  anchor: { x: number; y: number }
  isLightOn: boolean
  onPointerDown: (e: React.PointerEvent) => void
  onCordPull: () => void
}

export function Lamp({
  x,
  y,
  rotation,
  anchor,
  isLightOn,
  onPointerDown,
  onCordPull,
}: LampProps) {
  // смещения для картинки лампы относительно точки крепления верёвки
  const lampX = useTransform(x, (v) => v - 60)
  const lampY = useTransform(y, (v) => v - 50)

  return (
    <svg
      className="absolute inset-0 w-full h-full z-40 pointer-events-none"
      style={{ overflow: "visible" }}
    >
      {/* Верёвка */}
      <motion.line
        x1={anchor.x}
        y1={anchor.y}
        x2={x}          // MotionValue
        y2={y}          // MotionValue
        stroke="#141414"
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* Лампа */}
      <motion.image
  href="/images/lumi2.png"
  width="120"
  height="150"
  x={lampX}
  y={lampY}
  style={{
    transformOrigin: "50% 0%",
    rotate: rotation,          // ← MotionValue здесь работает
    opacity: isLightOn ? 1 : 0.6
  }}
  className="pointer-events-auto cursor-grab active:cursor-grabbing"
  onPointerDown={onPointerDown}
/>


      {/* Зона клика по верёвочке */}
      <motion.rect
        x={useTransform(x, (v) => v - 20)}
        y={useTransform(y, (v) => v + 50)}
        width="40"
        height="80"
        fill="transparent"
        className="pointer-events-auto cursor-pointer"
        onPointerDown={(e) => {
          e.stopPropagation()
          onCordPull()
        }}
      />
    </svg>
  )
}
