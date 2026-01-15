"use client"

import { ArrowRight } from "lucide-react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"

export function Navbar() {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0
        if (latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    return (
        <motion.div
            variants={{
                visible: { y: 0, x: "-50%" },
                hidden: { y: "-150%", x: "-50%" },
            }}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-4 left-1/2 z-50 w-[95%] max-w-[95%] md:w-auto md:min-w-[400px] flex justify-center"
        >
            <div className="w-full md:w-auto bg-black/20 backdrop-blur-3xl rounded-[1rem] border border-white/10 py-4 px-20 flex flex-col items-center gap-1.5 text-center shadow-lg transition-all hover:bg-black/30 select-none font-sans">
                <span className="text-white text-[13px] font-medium tracking-tight leading-none">
                    Faeth
                </span>
                <span className="text-white/70 text-[13px] font-medium tracking-tight leading-none">
                    Functional Aesthetic Design Studio
                </span>
                <a
                    href="https://www.linkedin.com/in/aminulishmam/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 text-[13px] font-semibold cursor-pointer hover:text-white transition-colors flex items-center gap-1 tracking-tight leading-none"
                >
                    Let&apos;s talk <ArrowRight className="w-3 h-3" />
                </a>
            </div>
        </motion.div>
    )
}
