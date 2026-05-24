// src/hooks/use-init-elastic-box-positions.ts

"use client"
import { useState, useEffect, type RefObject } from "react"
import type { MotionValue } from "framer-motion"

interface PositionState {
  isPositioned: boolean
  anchor: { x: number; y: number }
  restPosition: { x: number; y: number }
}

export function useInitElasticBoxPositions(
  containerRef: RefObject<HTMLDivElement | null>,
  x: MotionValue<number>,
  y: MotionValue<number>,
): PositionState {
  const [positionState, setPositionState] = useState<PositionState>({
    isPositioned: false,
    anchor: { x: 0, y: 0 },
    restPosition: { x: 0, y: 0 },
  })

 useEffect(() => {
  /**
   * === НАСТРОЙКИ В ПРОЦЕНТАХ ===
   *
   * LAMP_X_PERCENT — горизонтальная позиция лампы и верёвки.
   *   0.0 = край слева
   *   0.5 = центр
   *   1.0 = край справа
   *
   * LAMP_ANCHOR_Y_PERCENT — вертикальная позиция точки крепления верёвки.
   *   0.0 = самый верх контейнера
   *   0.05 = 5% ниже
   *
   * LAMP_REST_Y_PERCENT — высота, на которой лампа висит в покое.
   *   0.13 = 13% высоты контейнера
   */

  const LAMP_X_PERCENT = 0.30          // 30% ширины — смещено вправо
  const LAMP_ANCHOR_Y_PERCENT = 0.00   // крепление в самом верху
  const LAMP_REST_Y_PERCENT = 0.13     // лампа висит на 13% высоты

  const updatePositions = () => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()

    const newPositions = {
      isPositioned: true,

      // ТОЧКА КРЕПЛЕНИЯ ВЕРЁВКИ
      anchor: {
        x: rect.width * LAMP_X_PERCENT,
        y: rect.height * LAMP_ANCHOR_Y_PERCENT,
      },

      // ПОЗИЦИЯ ЛАМПЫ В ПОКОЕ
      restPosition: {
        x: rect.width * LAMP_X_PERCENT,
        y: rect.height * LAMP_REST_Y_PERCENT,
      },
    }

    setPositionState(newPositions)

    if (!positionState.isPositioned) {
      x.set(newPositions.restPosition.x)
      y.set(newPositions.restPosition.y)
    }
  }

  updatePositions()
  window.addEventListener("resize", updatePositions)
  return () => window.removeEventListener("resize", updatePositions)
}, [containerRef, x, y, positionState.isPositioned])


  return positionState
}
