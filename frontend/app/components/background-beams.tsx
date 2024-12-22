"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useRef } from "react"

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beamsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!beamsRef.current) return

    const moveBeams = (e: MouseEvent) => {
      if (!beamsRef.current) return

      const { clientX, clientY } = e
      const x = clientX - beamsRef.current.offsetLeft
      const y = clientY - beamsRef.current.offsetTop

      const keyframes = {
        transform: `translate(${x * 0.01}px, ${y * 0.01}px)`,
      }

      beamsRef.current.animate(keyframes, {
        duration: 3000,
        fill: "forwards",
        easing: "ease",
      })
    }

    window.addEventListener("mousemove", moveBeams)

    return () => {
      window.removeEventListener("mousemove", moveBeams)
    }
  }, [])

  return (
    <div
      ref={beamsRef}
      className={cn(
        "absolute inset-0 opacity-30 [mask-image:radial-gradient(100%_100%_at_top_center,black,transparent)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 via-red-600/30 to-amber-500/30 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 via-red-600/10 to-amber-500/10" />
    </div>
  )
}

