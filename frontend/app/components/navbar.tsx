'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/src/context/AuthContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  console.log("Auth: ", isAuthenticated);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-800 bg-[#0D0D0D]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-semibold text-slate-100">
            GoalHub
          </Link>
        </div>
        {!isMobile && (
          <>
            <div className="flex gap-6">
              <Link href="/goals" className="text-sm text-slate-300 hover:text-slate-100">
                Browse Goals
              </Link>
              <Link href="/sell" className="text-sm text-slate-300 hover:text-slate-100">
                Sell Goal
              </Link>
              <Link href="/dashboard" className="text-sm text-slate-300 hover:text-slate-100">
                Dashboard
              </Link>
              <Link href="/account" className="text-sm text-slate-300 hover:text-slate-100">
                My Account
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {!isAuthenticated && (
                <>
                  <Link href="/auth">
                    <Button variant="ghost" className="text-slate-300 hover:text-red-500">
                      Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-red-600 text-white hover:bg-red-700">
                  Get Started
                </Button>
              </Link>
              </>)}
            </div>
          </>
        )}
        {isMobile && (
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        )}
      </div>
      {isMobile && isMenuOpen && (
        <div className="bg-[#0D0D0D] py-2">
          <Link href="/goals" className="block px-4 py-2 text-sm text-slate-300 hover:text-slate-100">
            Browse Goals
          </Link>
          <Link href="/sell" className="block px-4 py-2 text-sm text-slate-300 hover:text-slate-100">
            Sell Goal
          </Link>
          <Link href="/dashboard" className="block px-4 py-2 text-sm text-slate-300 hover:text-slate-100">
            Dashboard
          </Link>
          <Link href="/account" className="block px-4 py-2 text-sm text-slate-300 hover:text-slate-100">
            My Account
          </Link>
          <div className="px-4 py-2 space-y-2">
            {!isAuthenticated && (
            <>
            <Link href="/auth">
              <Button variant="ghost" className="w-full text-slate-300 hover:text-red-500">
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="w-full bg-red-600 text-white hover:bg-red-700">
                Get Started
              </Button>
            </Link>
          </>
            ) }
            </div>
        </div>
      )}
    </nav>
  )
}

