import { Upload } from "@/components/upload"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { PricingPlans } from "@/components/pricing-plans"
import { SavingsCounter } from "@/components/savings-counter"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background dark:from-primary/5 z-0" />
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12 animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Turn Leftover Food Into <span className="gradient-text">Amazing Recipes</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Upload a photo of your ingredients and our AI will suggest delicious recipes to reduce food waste and
                save money.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg border border-border hover:bg-secondary/80 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Food waste reduction concept"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <p className="text-white font-medium">
                      1/3 of all food produced globally goes to waste. Let's change that together.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SavingsCounter />

      {/* Upload Section */}
      <Upload />

      

      {/* Features Section */}
      <Features />

      {/* How It Works */}
      <HowItWorks />

      {/* Pricing Plans */}
      <PricingPlans />

      {/* Footer */}
      <Footer />
    </div>
  )
}
