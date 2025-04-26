"use client"

import { Clock, Users, Star, Bookmark, ThumbsUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface RecipeCardProps {
  id: number
  title: string
  image: string
  time: string
  servings: number
  difficulty: string
  rating: number
  category: string
  isSaved?: boolean
  isLiked?: boolean
  onSave?: (id: number) => void
  onLike?: (id: number) => void
}

export function RecipeCard({
  id,
  title,
  image,
  time,
  servings,
  difficulty,
  rating,
  category,
  isSaved = false,
  isLiked = false,
  onSave,
  onLike,
}: RecipeCardProps) {
  return (
    <Card className="overflow-hidden border border-border hover:shadow-md transition-all duration-300 group">
      <div className="relative">
        <Link href={`/recipes/${id}`}>
          <div className="h-48 overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-background/80 backdrop-blur-sm text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          {onSave && (
            <button
              onClick={() => onSave(id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isSaved ? "bg-primary text-primary-foreground" : "bg-background/80 backdrop-blur-sm hover:bg-primary/20"
              }`}
              aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? "fill-primary-foreground" : ""}`} />
            </button>
          )}
          {onLike && (
            <button
              onClick={() => onLike(id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isLiked ? "bg-primary text-primary-foreground" : "bg-background/80 backdrop-blur-sm hover:bg-primary/20"
              }`}
              aria-label={isLiked ? "Unlike recipe" : "Like recipe"}
            >
              <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-primary-foreground" : ""}`} />
            </button>
          )}
        </div>
      </div>
      <div className="p-4">
        <Link href={`/recipes/${id}`}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({rating.toFixed(1)})</span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>Serves {servings}</span>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-xs ${
              difficulty === "Easy"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : difficulty === "Medium"
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {difficulty}
          </span>
        </div>
      </div>
    </Card>
  )
}
