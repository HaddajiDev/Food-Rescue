"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "#how-it-works" },
    {
      name: "Recipes",
      href: "#recipes",
      children: [
        { name: "Popular Recipes", href: "#popular" },
        { name: "Seasonal Recipes", href: "#seasonal" },
        { name: "Quick Meals", href: "#quick" },
      ],
    },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "border-b border-border/40 bg-background/80 backdrop-blur-md shadow-sm" : "bg-background/0"
      }`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div
              className={`absolute inset-0 bg-primary/20 rounded-full transition-transform duration-700 ${mounted ? "scale-100" : "scale-0"}`}
            ></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-8 w-8 text-primary relative z-10 transition-transform duration-500 ${mounted ? "rotate-0" : "rotate-180"}`}
            >
              <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
              <path d="M21 12c0-4.97-4.03-9-9-9" />
            </svg>
          </div>
          <span
            className={`text-xl font-bold transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}
          >
            FoodRescue
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item, index) =>
            item.children ? (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {item.children.map((child, childIndex) => (
                    <DropdownMenuItem key={childIndex} asChild>
                      <Link href={child.href} className="cursor-pointer">
                        {child.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={index}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-primary/5 ${
                  index === 0 ? "text-foreground" : ""
                }`}
              >
                {item.name}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "top-3 rotate-45" : "top-2"}`}
              ></span>
              <span
                className={`absolute block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "top-3"}`}
              ></span>
              <span
                className={`absolute block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileMenuOpen ? "top-3 -rotate-45" : "top-4"}`}
              ></span>
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[400px] border-t border-border/40" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col p-4 bg-background">
          {navItems.map((item, index) =>
            item.children ? (
              <div key={index} className="py-2">
                <div className="flex items-center justify-between py-2 text-sm font-medium">
                  {item.name}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </div>
                <div className="pl-4 border-l border-border/40 mt-1 space-y-1">
                  {item.children.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      href={child.href}
                      className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={index}
                href={item.href}
                className={`py-3 text-sm font-medium hover:text-foreground transition-colors ${
                  index === 0 ? "text-foreground" : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  )
}
