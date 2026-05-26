"use client"

import { useState } from "react"

/**
 * Компонент интерактивной формы записи.
 * После подключения backend (PocketBase) можно будет:
 * 1. Отправлять данные на сервер (POST /api/book)
 * 2. На сервере — пересылать сообщение в Telegram Диане
 * 3. Добавить админку для управления портфолио и расписанием
 */

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const services = [
    "מניקור קלאסי",
    "מניקור ג'ל",
    "בניית ציפורניים",
    "תיקון / מילוי",
  ]

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      setError("נא למלא את כל השדות החובה.")
      return
    }

    setIsSubmitting(true)

    try {
      // 🔗 Здесь будет запрос к PocketBase
      // await pb.collection("bookings").create(formData)

      await new Promise((r) => setTimeout(r, 800)) // имитация запроса

      setSuccess("הבקשה נשלחה! אחזור אלייך בהקדם לאישור סופי.")
      setFormData({
        name: "",
        phone: "",
        service: "",
        date: "",
        time: "",
        notes: "",
      })
    } catch (err) {
      console.error(err)
      setError("משהו השתבש. נסי שוב בעוד רגע.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="booking"
      className="py-20 bg-[#161F31] text-right text-white flex items-center justify-center"
    >
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-3xl overflow-hidden shadow-xl">

        {/* Левая часть — картинка */}
        <div className="md:w-1/2 bg-[#1A1A1D] flex flex-col justify-between p-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[#AD46FF] font-bold text-lg">MASTER DIANKA</h2>
            <button className="text-xs text-gray-300 hover:text-[#AD46FF] transition">
              חזרה לאתר →
            </button>
          </div>

          {/* картинка */}
         <div className="rounded-xl overflow-hidden aspect-[1024/1225] bg-[#222]">

             <img src="/images/diana-booking.png" className="object-cover w-full h-full" /> 
            תמונה שלך כאן
          </div>

          <p className="mt-4 text-center text-gray-300 text-xs">
            Capturing Beauty, Creating Confidence
          </p>
        </div>

        {/* Правая часть — форма */}
        <div className="md:w-1/2 bg-[#141416] p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-1">קביעת תור</h2>
          <p className="text-gray-400 text-xs mb-6">
            מלאי את הפרטים ובחרי תאריך ושעה שנוחים לך.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Имя */}
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-300">שם מלא</label>
              <input
                type="text"
                name="name"
                placeholder="לדוגמה: נטל כהן"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#1E1E22] border border-[#2A2A2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#AD46FF]/40"
              />
            </div>

            {/* Телефон */}
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-300">טלפון</label>
              <input
                type="tel"
                name="phone"
                placeholder="050-1234567"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#1E1E22] border border-[#2A2A2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#AD46FF]/40"
              />
            </div>

            {/* Услуга */}
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-300">שירות</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-[#1E1E22] border border-[#2A2A2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#AD46FF]/40"
              >
                <option value="">בחרי שירות...</option>
                {services.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Дата и время */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-300">שעה</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-[#1E1E22] border border-[#2A2A2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#AD46FF]/40"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-300">תאריך</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-[#1E1E22] border border-[#2A2A2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#AD46FF]/40"
                />
              </div>
            </div>

            {/* Примечания */}
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-300">הערות (אופציונלי)</label>
              <textarea
                name="notes"
                placeholder="צבע מועדף, השראה, אלרגיות..."
                value={formData.notes}
                onChange={handleChange}
                className="w-full bg-[#1E1E22] border border-[#2A2A2E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#AD46FF]/40"
                rows={2}
              />
            </div>

            {/* Сообщения */}
            {error && <p className="text-red-500 text-xs">{error}</p>}
            {success && <p className="text-green-500 text-xs">{success}</p>}

            {/* Кнопка */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#AD46FF] text-white font-semibold py-2 rounded-lg hover:opacity-90 transition shadow-lg shadow-[#AD46FF]/30 text-sm"
            >
              {isSubmitting ? "שולחת..." : "✨ שלחי בקשת תור ✨"}
            </button>

          </form>
        </div>
      </div>
    </section>
  )
}
