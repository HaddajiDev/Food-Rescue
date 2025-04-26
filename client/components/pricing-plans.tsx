import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingPlans() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for occasional use and trying out the service.",
      features: [
        "10 recipe generations per month",
        "Basic ingredient detection",
        "Standard recipe suggestions",
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      price: "$4.99",
      period: "per month",
      description: "Ideal for regular home cooks looking to reduce food waste.",
      features: [
        "Unlimited recipe generations",
        "Advanced ingredient detection",
        "Personalized recipe suggestions",
        "Nutritional information",
        "Save favorite recipes",
        "Priority email support",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Family",
      price: "$9.99",
      period: "per month",
      description: "Best for families serious about reducing food waste.",
      features: [
        "Everything in Premium",
        "Up to 5 user profiles",
        "Meal planning calendar",
        "Shopping list generation",
        "Seasonal recipe collections",
        "24/7 priority support",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core AI-powered recipe generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? "border-2 border-primary shadow-lg transform md:-translate-y-4"
                  : "border border-border shadow-md hover:-translate-y-2"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className={`p-8 bg-card text-card-foreground ${plan.popular ? "pt-10" : "pt-8"}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <Button
                  className={`w-full mb-8 ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  }`}
                >
                  {plan.cta}
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <div className="mt-1 rounded-full bg-primary/10 text-primary p-0.5">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            All plans come with a 14-day free trial. No credit card required to start.
          </p>
          <div className="inline-flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-sm font-medium">100% Satisfaction Guarantee • Cancel Anytime</span>
          </div>
        </div>
      </div>
    </section>
  )
}
