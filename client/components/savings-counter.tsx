"use client"

import { useState, useEffect, useRef } from "react"
import { DollarSign, Users, Leaf } from "lucide-react"

export function SavingsCounter() {
  const [savedAmount, setSavedAmount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)
  const [wasteReduced, setWasteReduced] = useState(0)
  const counterRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const targetSavedAmount = 1342
    const targetUsersCount = 5280
    const targetWasteReduced = 2764

    const duration = 2000 // 2 seconds
    const framesCount = 60
    const interval = duration / framesCount

    let startTime: number | null = null
    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function for smoother animation
      const easeOutQuad = (t: number) => t * (2 - t)
      const easedProgress = easeOutQuad(progress)

      setSavedAmount(Math.floor(easedProgress * targetSavedAmount))
      setUsersCount(Math.floor(easedProgress * targetUsersCount))
      setWasteReduced(Math.floor(easedProgress * targetWasteReduced))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible])

  return (
    <div
      ref={counterRef}
      className="py-16 md:py-24 bg-muted/50 dark:bg-muted/20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of users who are already making a difference by reducing food waste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl p-8 border border-border shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <div className="text-4xl font-bold mb-2 flex items-center justify-center">
              <span className="text-primary">$</span>
              <span className="tabular-nums">{savedAmount.toLocaleString()}</span>
            </div>
            <p className="text-muted-foreground">Total Money Saved</p>
          </div>

          <div className="bg-card rounded-xl p-8 border border-border shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="text-4xl font-bold mb-2 tabular-nums">{usersCount.toLocaleString()}</div>
            <p className="text-muted-foreground">Active Users</p>
          </div>

          <div className="bg-card rounded-xl p-8 border border-border shadow-md text-center hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <div className="text-4xl font-bold mb-2 tabular-nums">{wasteReduced.toLocaleString()} kg</div>
            <p className="text-muted-foreground">Food Waste Reduced</p>
          </div>
        </div>
      </div>
    </div>
  )
}
