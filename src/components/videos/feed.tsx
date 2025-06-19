"use client"

import { useEffect, useState, useCallback } from "react"
import { VideoPlayer } from "./player"
import { VideoData } from "@/types"

interface VideoFeedProps {
  videos: VideoData[]
}

export function VideoFeed({ videos }: VideoFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()

      if (isScrolling) return

      setIsScrolling(true)

      if (e.deltaY > 0 && currentIndex < videos.length - 1) {
        // Scroll down
        setCurrentIndex((prev) => prev + 1)
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll up
        setCurrentIndex((prev) => prev - 1)
      }

      // Reset scrolling flag after animation
      setTimeout(() => setIsScrolling(false), 500)
    },
    [currentIndex, videos.length, isScrolling]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && currentIndex < videos.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else if (e.key === "ArrowUp" && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1)
      }
    },
    [currentIndex, videos.length]
  )

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false })
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("wheel", handleScroll)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleScroll, handleKeyDown])

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentIndex < videos.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  return (
    <div
      className="relative h-[calc(100vh-56px)] overflow-hidden lg:h-screen"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex flex-col transition-transform duration-500 ease-out"
        style={{
          transform: `translateY(-${currentIndex * 100}vh)`,
          height: `${videos.length * 100}vh`,
        }}
      >
        {videos.map((video, index) => (
          <div key={video.id} className="h-screen">
            <VideoPlayer video={video} isActive={index === currentIndex} />
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="fixed top-1/2 right-4 -translate-y-1/2 transform space-y-2">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`h-8 w-1 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
