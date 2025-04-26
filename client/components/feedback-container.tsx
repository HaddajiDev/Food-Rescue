"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, X, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function FeedbackContainer() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"like" | "dislike" | null>(null)
  const [feedbackText, setFeedbackText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!feedbackType) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset after showing thank you message
      setTimeout(() => {
        setIsOpen(false)
        setFeedbackType(null)
        setFeedbackText("")
        setIsSubmitted(false)
      }, 3000)
    }, 1000)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg flex items-center justify-center"
        aria-label="Give feedback"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-card rounded-lg shadow-xl border border-border overflow-hidden transition-all duration-300 animate-fade-in">
      <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
        <h3 className="font-semibold">Share Your Feedback</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8 rounded-full hover:bg-white/20 text-primary-foreground"
          aria-label="Close feedback"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {isSubmitted ? (
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <ThumbsUp className="h-6 w-6 text-primary" />
          </div>
          <h4 className="font-semibold mb-2">Thank You!</h4>
          <p className="text-muted-foreground">Your feedback helps us improve our recipes.</p>
        </div>
      ) : (
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-4">
            How was this recipe suggestion? Your feedback helps us improve.
          </p>

          <div className="flex gap-3 mb-4">
            <Button
              variant={feedbackType === "like" ? "default" : "outline"}
              className={`flex-1 ${feedbackType === "like" ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => setFeedbackType("like")}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button
              variant={feedbackType === "dislike" ? "default" : "outline"}
              className={`flex-1 ${feedbackType === "dislike" ? "bg-primary text-primary-foreground" : ""}`}
              onClick={() => setFeedbackType("dislike")}
            >
              <ThumbsDown className="h-4 w-4 mr-2" />
              Dislike
            </Button>
          </div>

          <div className="mb-4">
            <Textarea
              placeholder="Tell us more about your experience..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="resize-none h-24"
            />
          </div>

          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleSubmit}
            disabled={!feedbackType || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
