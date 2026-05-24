"use client"

import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./highlighted-text"

const aboutItems = [
  {
    icon: "💅",
    title: "חומרים פרימיום",
    description: "אני עובדת רק עם המותגים הכי איכותיים בשוק.",
  },
  {
    icon: "🏠",
    title: "אווירה ביתית",
    description: "סלון קטן ונעים בבית פרטי בנהריה — בלי לחץ ובלי המולה.",
  },
  {
    icon: "☕",
    title: "קפה על הבית",
    description: "כי כל פגישה אצלי מתחילה בכוס קפה ושיחה טובה.",
  },
  {
    icon: "💜",
    title: "יחס אישי",
    description: "לכל לקוחה זמן משלה. נדבר, נצחק, ונתאים בדיוק מה שמתאים לך.",
  },
]

export function AboutDiana() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems(prev => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 }
    )

    itemRefs.current.forEach(ref => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-40 bg-[#FFF6FF]">
      <div className="container mx-auto px-6 md:px-12">

        {/* TOP CENTER TITLE */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold leading-[1.15] tracking-tight text-balance">
            <span className="text-[#AD46FF]">לא רק מניקור</span> — חוויה שלמה
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT — SMALLER CARDS */}
          <div className="grid grid-cols-1 gap-6 order-last lg:order-first max-w-md ml-auto">
            {aboutItems.map((item, index) => (
              <div
                key={item.title}
                ref={el => (itemRefs.current[index] = el)}
                data-index={index}
                className={`bg-white rounded-3xl shadow-sm p-6 text-right transition-all duration-700 ${
                  visibleItems.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="text-[#C47BFF] text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-[#161F31]">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT — IMAGE */}
          <div className="order-first lg:order-last text-center lg:text-right">
            <img
              src="/images/exterior.png"
              alt="Diana workspace"
              className="w-full opacity-95 rounded-none shadow-none"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
