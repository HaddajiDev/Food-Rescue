import { Camera, Sparkles, UtensilsCrossed } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <Camera className="h-12 w-12 text-primary-foreground" />,
      title: "Take a Photo",
      description: "Snap a picture of your ingredients or leftovers using your phone or upload an existing image.",
    },
    {
      icon: <Sparkles className="h-12 w-12 text-primary-foreground" />,
      title: "AI Analysis",
      description: "Our AI identifies your ingredients and considers nutritional value and flavor combinations.",
    },
    {
      icon: <UtensilsCrossed className="h-12 w-12 text-primary-foreground" />,
      title: "Get Recipes",
      description: "Receive personalized recipe suggestions based on what you have, complete with instructions.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16 animate-slide-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How It <span className="gradient-text">Works</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Turn your food waste into delicious meals in just three simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-primary/20 -translate-y-1/2 -z-10" />
              )}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
            <p className="text-muted-foreground text-center max-w-xs">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">See It In Action</h3>
            <p className="text-muted-foreground mb-6">
              Watch how easy it is to turn your leftover vegetables into a delicious stir-fry with our AI-powered recipe
              suggestions.
            </p>
            <button className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 mr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              Watch Demo
            </button>
          </div>
          <div className="bg-muted h-64 md:h-auto">
            <img
              src="/placeholder.svg?height=300&width=500"
              alt="Demo video thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
