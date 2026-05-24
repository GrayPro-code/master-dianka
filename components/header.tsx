"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <motion.div>
      <header
        className={cn(
          "fixed z-[60] transition-all duration-500 my-0 py-0 rounded-none",
          scrolled || mobileMenuOpen
            ? " backdrop-blur-md py-4 top-0 left-0 right-0"
            : "bg-transparent py-4 top-0 left-0 right-0"
        )}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between md:px-[24]">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group" onClick={scrollToTop}>
            <span
  className={cn(
    "text-xl font-semibold transition-colors duration-500",
    scrolled ? "text-purple-500" : "text-white"
  )}
>
  Diana Nails
</span>

          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-10 text-sm tracking-wide">
            {[
              { label: "בדף הבית", href: "#hero" },
              { label: "עלי", href: "#about" },
              { label: "עבודות", href: "#projects" },
              { label: "השירותים שלי", href: "#services" },
              { label: "שאלות נפוצות", href: "#faq" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
  "hover:text-purple-500 transition-colors duration-700 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-purple-500 after:transition-all after:duration-300",
  scrolled ? "text-purple-500" : "text-white"
)}

                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="hidden md:flex items-center"
            style={
              {
                "--primary": "#ff8800",
                "--rounded-max": "100px",
                "--rounded-min": "10px",
                "--h": "50px",
              } as React.CSSProperties
            }
          >
            <label
              className="relative p-2 cursor-pointer group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="block rounded-[100px] relative z-[2]"
                animate={{
                  y: isHovered ? 0 : -6,
                  scale: isHovered ? 1 : 1.02,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.5, 2, 0.3, 0.8],
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="absolute bg-transparent opacity-0 w-full h-full inset-0 z-10 cursor-pointer pointer-events-auto select-none outline-none"
                />
                <div className="bg-transparent flex border-none p-0 m-0 relative">
                  {/* Button Glow Effects */}
                  <motion.div
                    className="absolute top-0 bottom-0 left-[25%] w-[70%] h-full my-auto rounded-r-[50%] pointer-events-none z-[1] blur-[20px] mix-blend-color-dodge"
                    style={{
                      background: "linear-gradient(to right, #ff8800 0%, transparent 100%)",
                    }}
                    animate={{
                      opacity: isHovered && isChecked ? 1 : 0,
                    }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                  <motion.div
                    className="absolute w-[30px] h-[30px] top-0 bottom-0 left-[28%] my-auto rounded-full pointer-events-none bg-[#ff8800] z-[2] blur-[10px] mix-blend-color-dodge"
                    animate={{
                      opacity: isHovered && isChecked ? 1 : 0,
                    }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />




                  {/* Part 2 - Glass Section */}
                  <div className="relative h-[50px] w-[90px] rounded-l-[6px] rounded-r-[100px] flex items-center justify-center">

                    {/* Glass Container */}
                    <motion.div
                      className="relative overflow-hidden h-full w-full rounded-l-[6px] rounded-r-[100px] border-l border-black/30 flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.2) 50%, rgba(0,0,0,0.5) 100%)",
                      }}
                      animate={{
                        boxShadow: isHovered
                          ? "inset 0 0 7px -4px white, inset 0 -8px 8px -6px rgba(255,255,255,0.4), inset 6px -12px 12px -8px black, inset 6px -8px 10px -10px white, 0 15px 40px -3px #111"
                          : "inset 0 0 7px -4px white, inset 0 -8px 8px -6px rgba(255,255,255,0.4), inset 6px -12px 12px -8px black, inset 6px -8px 10px -10px white, 0 20px 50px -5px #111",
                      }}
                      transition={{ duration: 0.9, ease: [0.5, 2, 0.3, 0.8] }}
                    >
                      {/* Glass shine */}
                      <div
                        className="absolute left-0 top-[10%] right-[14%] h-[70%] rounded-tr-[15px]"
                        style={{
                          background: "linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 60%)",
                        }}
                      />


                      <span className="text-amber-600" >קבעי תור</span>



                      {/* Filament - Off State */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 49 52"
                        height={16}
                        className="absolute left-1 top-0 bottom-0 my-auto w-auto opacity-30"
                        style={{ strokeWidth: "1.5px" }}
                      >
                        <path
                          stroke="#ffc4af"
                          d="M32.5 26.1085C32.5 26.1085 32 5.90019 38.5 2.10852C45 -1.68315 49 5.10852 47.5 9.60852C46 14.1085 39.5 17.1085 21 18.1085C13.667 18.5049 6.49118 18.0371 0.5 17.328"
                        />
                        <path
                          stroke="#ffc4af"
                          d="M32.5 26C32.5 26 32 46.2083 38.5 50C45 53.7917 49 47 47.5 42.5C46 38 39.5 35 21 34C13.667 33.6036 6.49118 34.0714 0.5 34.7805"
                        />
                      </svg>

                      {/* Filament - On State */}
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 49 52"
                        height={16}
                        className="absolute left-1 top-0 bottom-0 my-auto w-auto"
                        style={{ strokeWidth: "1.5px" }}
                        initial={{ opacity: 1 }}
                      >
                        <motion.path
                          stroke="white"
                          d="M32.5 26.1085C32.5 26.1085 32 5.90019 38.5 2.10852C45 -1.68315 49 5.10852 47.5 9.60852C46 14.1085 39.5 17.1085 21 18.1085C13.667 18.5049 6.49118 18.0371 0.5 17.328"
                          strokeDasharray="100 100"
                          animate={{
                            strokeDashoffset: isHovered && isChecked ? 0 : 100,
                          }}
                          transition={{
                            duration: 0.6,
                            delay: isChecked ? 0.6 : 0,
                          }}
                        />
                        <motion.path
                          stroke="white"
                          d="M32.5 26C32.5 26 32 46.2083 38.5 50C45 53.7917 49 47 47.5 42.5C46 38 39.5 35 21 34C13.667 33.6036 6.49118 34.0714 0.5 34.7805"
                          strokeDasharray="100 100"
                          animate={{
                            strokeDashoffset: isHovered && isChecked ? 0 : 100,
                          }}
                          transition={{
                            duration: 0.6,
                            delay: isChecked ? 0.6 : 0,
                          }}
                        />
                      </motion.svg>
                    </motion.div>
                  </div>


                  {/* Part 1 - Switch Mechanism */}
                  <div className="relative z-[1] h-[50px] w-[45px] rounded-l-[100px] rounded-r-[6px]">
                    {/* Line Animation */}
                    <div className="absolute top-0 bottom-0 -right-px">
                      <motion.div
                        className="absolute top-0 bottom-0 right-0 w-px rounded-full my-auto"
                        style={{
                          background: !isChecked ? "rgb(140, 140, 140)" : "white",
                          boxShadow: !isChecked ? "1px 0 8px 2px rgba(255, 220, 145, 0.4)" : "1px 0 8px 2px #ffa600",
                        }}
                        animate={{
                          height: ["0%", "100%", "140%"],
                          opacity: isHovered ? 0 : [1, 1, 0],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    </div>

                    {/* Screw SVG */}
                    <div className="absolute top-0 right-0 bottom-0 my-auto z-[-1] overflow-hidden py-[3px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 115 126"
                        height={44}
                        className="w-auto overflow-visible"
                      >
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.g
                            key={i}
                            style={{ originX: "center", originY: "center" }}
                            animate={{
                              scaleY: !isChecked ? [1, 0.8, 1] : isChecked ? [1, 0.8, 1] : 1,
                            }}
                            transition={{
                              duration: 0.8,
                              delay: (!isChecked ? i : 5 - i) * 0.1,
                            }}
                          >
                            {i === 1 && (
                              <>
                                <path
                                  strokeLinejoin="round"
                                  strokeLinecap="round"
                                  strokeMiterlimit={10}
                                  strokeWidth={2}
                                  stroke="#262626"
                                  fill="url(#paint_linear_steel)"
                                  d="M91.4371 119V7C91.4371 3.686 94.1231 1 97.4371 1H107.617C110.931 1 113.617 3.686 113.617 7V119C113.617 122.314 110.931 125 107.617 125H97.4371C94.1231 125 91.4371 122.314 91.4371 119Z"
                                />
                                <path
                                  fillOpacity="0.4"
                                  fill="#262626"
                                  d="M94 6C94 3.79086 95.7909 2 98 2H109C111.209 2 113 3.79086 113 6V88.2727C113 89.2267 112.227 90 111.273 90C101.733 90 94 82.2667 94 72.7273V6Z"
                                />
                                <motion.path
                                  fill="currentColor"
                                  d="M98.0101 11.589C98.0101 9.57 99.6461 7.93402 101.665 7.93402H105.027C107.046 7.93402 108.682 9.57 108.682 11.589C108.682 13.608 107.046 15.244 105.027 15.244H101.665C99.6461 15.244 98.0101 13.607 98.0101 11.589Z"
                                  className="text-[#8e8c8b]"
                                  animate={{
                                    color: !isChecked
                                      ? ["#8e8c8b", "#ff8800", "#8e8c8b"]
                                      : isChecked
                                        ? ["#8e8c8b", "#ffffff", "#8e8c8b"]
                                        : "#8e8c8b",
                                    filter: !isChecked
                                      ? ["blur(0px)", "blur(2px)", "blur(0px)"]
                                      : isChecked
                                        ? ["blur(0px)", "blur(2px)", "blur(0px)"]
                                        : "blur(0px)",
                                  }}
                                  transition={{
                                    duration: 0.7,
                                    delay: (!isChecked ? 1 : 3 - 1) * 0.15,
                                  }}
                                />
                              </>
                            )}
                            {i === 2 && (
                              <>
                                <path
                                  strokeLinejoin="round"
                                  strokeLinecap="round"
                                  strokeMiterlimit={10}
                                  strokeWidth={2}
                                  stroke="#262626"
                                  fill="url(#paint_linear_steel)"
                                  d="M69.256 119V7C69.256 3.686 71.942 1 75.256 1H85.436C88.75 1 91.436 3.686 91.436 7V119C91.436 122.314 88.75 125 85.436 125H75.256C71.943 125 69.256 122.314 69.256 119Z"
                                />
                                <path
                                  fillOpacity="0.4"
                                  fill="#262626"
                                  d="M72 6C72 3.79086 73.7909 2 76 2H87C89.2091 2 91 3.79086 91 6V88.2727C91 89.2267 90.2267 90 89.2727 90C79.7333 90 72 82.2667 72 72.7273V6Z"
                                />
                                <motion.path
                                  fill="currentColor"
                                  d="M76.011 11.589C76.011 9.57 77.647 7.93402 79.666 7.93402H83.028C85.047 7.93402 86.683 9.57 86.683 11.589C86.683 13.608 85.047 15.244 83.028 15.244H79.666C77.647 15.244 76.011 13.607 76.011 11.589Z"
                                  className="text-[#8e8c8b]"
                                  animate={{
                                    color: !isChecked
                                      ? ["#8e8c8b", "#ff8800", "#8e8c8b"]
                                      : isChecked
                                        ? ["#8e8c8b", "#ffffff", "#8e8c8b"]
                                        : "#8e8c8b",
                                    filter: !isChecked
                                      ? ["blur(0px)", "blur(2px)", "blur(0px)"]
                                      : isChecked
                                        ? ["blur(0px)", "blur(2px)", "blur(0px)"]
                                        : "blur(0px)",
                                  }}
                                  transition={{
                                    duration: 0.7,
                                    delay: (!isChecked ? 2 : 3 - 2) * 0.15,
                                  }}
                                />
                              </>
                            )}
                            {i === 3 && (
                              <>
                                <path
                                  strokeLinejoin="round"
                                  strokeLinecap="round"
                                  strokeMiterlimit={10}
                                  strokeWidth={2}
                                  stroke="#262626"
                                  fill="url(#paint_linear_steel)"
                                  d="M47.076 119V7C47.076 3.686 49.762 1 53.076 1H63.256C66.57 1 69.256 3.686 69.256 7V119C69.256 122.314 66.57 125 63.256 125H53.076C49.762 125 47.076 122.314 47.076 119Z"
                                />
                                <path
                                  fillOpacity="0.4"
                                  fill="#262626"
                                  d="M50 6C50 3.79086 51.7909 2 54 2H65C67.2091 2 69 3.79086 69 6V86.9664C69 88.6418 67.6418 90 65.9664 90C57.1484 90 50 82.8516 50 74.0336V6Z"
                                />
                                <motion.path
                                  fill="currentColor"
                                  d="M54.012 11.589C54.012 9.57 55.648 7.93396 57.667 7.93396H61.029C63.048 7.93396 64.684 9.57 64.684 11.589C64.684 13.608 63.048 15.244 61.029 15.244H57.667C55.648 15.244 54.012 13.607 54.012 11.589Z"
                                  className="text-[#8e8c8b]"
                                  animate={{
                                    color: !isChecked
                                      ? ["#8e8c8b", "#ff8800", "#8e8c8b"]
                                      : isChecked
                                        ? ["#8e8c8b", "#ffffff", "#8e8c8b"]
                                        : "#8e8c8b",
                                    filter: !isChecked
                                      ? ["blur(0px)", "blur(2px)", "blur(0px)"]
                                      : isChecked
                                        ? ["blur(0px)", "blur(2px)", "blur(0px)"]
                                        : "blur(0px)",
                                  }}
                                  transition={{
                                    duration: 0.7,
                                    delay: (!isChecked ? 3 : 3 - 3) * 0.15,
                                  }}
                                />
                              </>
                            )}
                            {i === 4 && (
                              <path
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeMiterlimit={10}
                                strokeWidth={2}
                                stroke="#262626"
                                fill="url(#paint_linear_steel)"
                                d="M23.617 98.853V27.147C23.617 21.501 27.11 16.262 32.838 13.318L47.076 6V120L32.838 112.682C27.111 109.738 23.617 104.499 23.617 98.853Z"
                              />
                            )}
                            {i === 5 && (
                              <path
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeMiterlimit={10}
                                strokeWidth={2}
                                stroke="#262626"
                                fill="url(#paint_linear_steel)"
                                d="M1.00006 76.162V49.838C1.00006 43.314 4.91107 37.235 11.3891 33.691L23.6171 27V99L11.3881 92.309C4.91106 88.765 1.00006 82.686 1.00006 76.162Z"
                              />
                            )}
                          </motion.g>
                        ))}
                        <defs>
                          <linearGradient
                            gradientUnits="userSpaceOnUse"
                            y2={125}
                            x2="105.425"
                            y1={1}
                            x1="105.425"
                            id="paint_linear_steel"
                          >
                            <stop stopColor="#7A7A7A" offset="0.100962" />
                            <stop stopColor="#EEEEEE" offset="0.3125" />
                            <stop stopColor="#787878" offset="0.596154" />
                            <stop stopColor="#666666" offset="0.798077" />
                            <stop stopColor="#9E9E9E" offset={1} />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Case */}
                    <motion.div
                      className="h-[50px] w-[45px] rounded-l-[100px] rounded-r-[6px]"
                      animate={{
                        x: isChecked ? 0 : -22,
                      }}
                      transition={{
                        duration: isChecked ? 1.25 : 0.9,
                        ease: isChecked ? [0.5, -1, 0.3, 0.8] : [0.5, 2, 0.3, 0.8],
                      }}
                    >
                      <motion.div
                        className="absolute overflow-hidden inset-0 rounded-l-[100px] rounded-r-[6px]"
                        style={{
                          background: "linear-gradient(to bottom, #2c2e31 0%, #31343e 20%, #212329 100%)",
                        }}
                        animate={{
                          boxShadow: isHovered
                            ? "inset 6px -12px 12px -8px black, inset 8px -13px 10px -10px white, 0 15px 40px -3px #111"
                            : "inset 6px -12px 12px -8px black, inset 8px -13px 10px -10px white, 0 20px 50px -5px #111",
                        }}
                        transition={{ duration: 0.9, ease: [0.5, 2, 0.3, 0.8] }}
                      >
                        {/* Light Reflex */}
                        <div className="absolute rounded-l-[100px] rounded-r-[6px] left-[30%] top-[23%] w-full h-[30%] bg-white blur-md" />
                        {/* Side Accent */}
                        <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-white/20 mix-blend-overlay" />
                      </motion.div>
                    </motion.div>
                  </div>


                </div>
              </motion.div>
            </label>
          </div>

          {/* MOBILE BURGER BUTTON */}
          <button
            className="md:hidden flex flex-col gap-1 z-[70] relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>

          {/* MOBILE MENU */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-background border-b border-foreground/10 md:hidden z-[50]">
              <nav className="flex flex-col gap-4 p-4">
                <Link href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-primary transition-colors">
                  פרויקטים
                </Link>
                <Link href="#services" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-primary transition-colors">
                  שירותים
                </Link>
                <Link href="#about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium hover:text-primary transition-colors">
                  אודות
                </Link>
                <Link
  href="/#booking"
  onClick={() => setMobileMenuOpen(false)}
  className="px-4 py-2 rounded-full text-sm font-medium text-white bg-[#AD46FF] hover:bg-[#c56aff] transition-colors text-center"
>
  קבעי תור
</Link>

              </nav>
            </div>
          )}
        </nav>
      </header>
    </motion.div>
  )
}
