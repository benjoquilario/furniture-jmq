"use client"

import { useEffect, useRef, useState } from "react"
import { VideoData } from "@/types"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  MessageCircle,
  Share,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"

interface VideoPlayerProps {
  video: VideoData
  isActive: boolean
}

export function VideoPlayer({ video, isActive }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return

    if (isActive) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isActive])

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className="bg-background relative h-screen w-full overflow-hidden">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="https://artplayer.org/assets/sample/video.mp4"
        loop
        muted={isMuted}
        playsInline
        poster={video.thumbnailUrl}
        onClick={togglePlay}
      />

      {/* Overlay Controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
        <div className="flex h-full">
          {/* Left side - Video info */}
          <div className="flex flex-1 flex-col justify-end p-6 pb-24">
            <div className="space-y-4">
              {/* Video description */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg md:text-3xl">
                  {video.title}
                </h3>
                <p className="max-w-lg text-base leading-relaxed text-white/90 drop-shadow-md md:text-lg">
                  {video.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex flex-col items-center justify-end space-y-4 p-6 pb-24">
            {/* Mute button */}
            <div className="flex flex-col items-center space-y-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-14 w-14 rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-black/60"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-7 w-7" />
                ) : (
                  <Volume2 className="h-7 w-7" />
                )}
              </Button>
              <span className="text-xs font-medium text-white/80">
                {isMuted ? "Unmute" : "Mute"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Play/Pause overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="icon"
            variant="ghost"
            className="bg-background/50 text-foreground hover:bg-background/70 h-16 w-16 rounded-full backdrop-blur-sm"
            onClick={togglePlay}
          >
            <Play className="ml-1 h-8 w-8" />
          </Button>
        </div>
      )}
    </div>
  )
}
