import { VideoData } from "@/types"

export const sampleVideos: VideoData[] = [
  {
    id: "1",
    title: "Modern Living Room Setup",
    description:
      "Check out this amazing minimalist living room transformation! Perfect for small spaces. #furniture #homedecor #minimalist",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    author: {
      name: "Interior Designer Pro",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      username: "interiorpro",
    },
    stats: {
      likes: 1234,
      comments: 89,
      shares: 234,
    },
    tags: ["furniture", "homedecor", "minimalist", "livingroom"],
  },
  {
    id: "2",
    title: "DIY Coffee Table Build",
    description:
      "Building a rustic coffee table from scratch! Materials cost under $50. Link in bio for full tutorial! #diy #woodworking",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400",
    author: {
      name: "DIY Master",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      username: "diymaster",
    },
    stats: {
      likes: 2567,
      comments: 156,
      shares: 445,
    },
    tags: ["diy", "woodworking", "furniture", "tutorial"],
  },
  {
    id: "3",
    title: "Bedroom Makeover Reveal",
    description:
      "Transformed this bedroom on a budget! Before vs after is incredible. What do you think? #bedroomdesign #makeover",
    videoUrl:
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
    author: {
      name: "Home Stylist",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      username: "homestylist",
    },
    stats: {
      likes: 3456,
      comments: 234,
      shares: 567,
    },
    tags: ["bedroom", "makeover", "budget", "homedecor"],
  },
]
