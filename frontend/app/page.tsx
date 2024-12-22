import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TypewriterEffect } from "./components/typewriter-effect"
import { BackgroundBeams } from "./components/background-beams"

export default function Home() {
  const words = [
    {
      text: "Transform",
      className: "text-red-500 dark:text-red-500",
    },
    {
      text: "your",
      className: "text-red-500 dark:text-red-500",
    },
    {
      text: "goals",
      className: "text-red-500 dark:text-red-500",
    },
    {
      text: "into",
      className: "text-slate-100 dark:text-slate-100",
    },
    {
      text: "reality.",
      className: "text-slate-100 dark:text-slate-100",
    },
  ]

  return (
    <div className="relative min-h-screen w-full bg-[#0D0D0D] antialiased">
      <nav className="fixed top-0 z-50 w-full border-b border-neutral-800 bg-[#0D0D0D]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-slate-100">
              GoalHub
            </Link>
          </div>
          <div className="hidden gap-6 md:flex">
            <Link href="/goals" className="text-sm text-slate-300 hover:text-slate-100">
              Browse Goals
            </Link>
            <Link href="/sell" className="text-sm text-slate-300 hover:text-slate-100">
              Sell Goal
            </Link>
            <Link href="/account" className="text-sm text-slate-300 hover:text-slate-100">
              My Account
            </Link>
            <Link href="/dashboard" className="text-sm text-slate-300 hover:text-slate-100">
              Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost" className="text-slate-300 hover:text-red-500">
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-orange-600 text-white hover:bg-orange-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
        <BackgroundBeams />
        <div className="relative z-10 text-center">
          <TypewriterEffect words={words} />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Join a community of achievers who share their success blueprints. Whether you're aiming for Harvard or mastering pancake flipping, find your path to success with expert guidance.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/auth">
              <Button className="bg-orange-600 text-white hover:bg-orange-700">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/goals">
              <Button variant="outline" className="border-red-600/20 text-red-500 hover:bg-red-600/10 hover:text-slate-100">
                Explore Goals
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

