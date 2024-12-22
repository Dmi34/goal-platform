"use client"

import { cn } from "@/lib/utils"
import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { useEffect } from "react"

export const TypewriterEffect = ({
  words,
  className,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
}) => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 2,
          delay: stagger(0.2),
        }
      )
    }
  }, [isInView])

  const renderWords = words.map((word, idx) => {
    return (
      <motion.span
        initial={{
          opacity: 0,
        }}
        key={`${word}-${idx}`}
        className={cn("dark:text-white text-black", word.className)}
      >
        {word.text}&nbsp;
      </motion.span>
    )
  })

  return (
    <div ref={scope} className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="inline-flex text-center text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          {renderWords}
        </div>
      </div>
    </div>
  )
}

