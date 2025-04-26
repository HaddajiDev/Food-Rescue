import { Leaf, UtensilsCrossed, Sparkles, Recycle } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <Leaf className="h-10 w-10 text-primary" />,
      title: "Reduce Food Waste",
      description: "Save money and help the environment by using up ingredients before they go bad.",
    },
    {
      icon: <UtensilsCrossed className="h-10 w-10 text-primary" />,
      title: "Creative Recipes",
      description: "Discover new and exciting ways to use your leftover ingredients.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "AI-Powered",
      description: "Our advanced AI recognizes ingredients and suggests personalized recipes.",
    },
    {
      icon: <Recycle className="h-10 w-10 text-primary" />,
      title: "Sustainable Living",
      description: "Join a community committed to reducing environmental impact through food choices.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/50 dark:bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Use <span className="gradient-text">FoodRescue</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform helps you make the most of your food while reducing waste and saving money.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card text-card-foreground p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] border border-border"
            >
              <div className="mb-6 bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
