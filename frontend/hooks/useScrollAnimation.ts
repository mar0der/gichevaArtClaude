'use client'

import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  animateOnce?: boolean
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px',
  animateOnce = true
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldAnimate = entry.isIntersecting && (!animateOnce || !hasAnimated)
        
        if (shouldAnimate) {
          setIsInView(true)
          if (animateOnce) {
            setHasAnimated(true)
          }
        } else if (!animateOnce) {
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, animateOnce, hasAnimated])

  return { ref, isInView }
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.5) {
  const ref = useRef<T>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const scrolled = window.scrollY
      const rate = scrolled * -speed
      
      // Only apply parallax when element is in view
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        setOffset(rate)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return { ref, offset }
}