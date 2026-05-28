"use client"

import { useEffect, useRef, useState } from "react"

const reviews = [
  {
    text: "בפעם הראשונה הפכתי ללקוחה קבועה. דיאנה אומנית אמיתית!",
    name: "אנה ש.",
  },
  {
    text: "הכי טובה בנגריה. עיצובים מדויקים ויצירתיים, חומרים איכותיים, ומחירים הוגנים.",
    name: "שירה ב.",
  },
  {
    text: "סוף סוף מצאתי מאסטרית! היחס האישי, הקפה, השיחה — חוויה שלמה. ממליצה בחום ❤️",
    name: "נטלי ק.",
  },
  {
    text: "דיאנה מהממת! מקצועית, סבלנית, והבית שלה כל כך נעים. הציפורניים שלי החזיקו 4 שבועות מושלמות.",
    name: "מאיה ל.",
  },
]

export function Reviews() {
  const [visible, setVisible] = useState<number[]>([])
  const refs = useRef<(HTMLDivElement | null)[]>([])

  const setReviewRef = (index: number) => (el: HTMLDivElement | null) => {
    refs.current[index] = el
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisible((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 }
    )

    refs.current.forEach((ref) => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-32 md:py-40 bg-[#FFF6FF]">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
            ביקורות
          </p>

          <h2 className="text-5xl md:text-7xl font-medium leading-[1.15] tracking-tight text-balance">
            מה הן
            <br />
            <span className="text-[#C47BFF]">אומרות עליי</span>
          </h2>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {reviews.map((review, index) => (
            <div
              key={index}
              data-index={index}
              ref={setReviewRef(index)}
              className={`bg-white rounded-3xl shadow-sm p-8 text-right transition-all duration-700
                ${visible.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="text-[#C47BFF] text-xl mb-4">★★★★★</div>

              <p className="text-lg leading-relaxed text-[#161F31] mb-6">
                "{review.text}"
              </p>

              <p className="text-[#B388FF] font-medium text-lg">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
