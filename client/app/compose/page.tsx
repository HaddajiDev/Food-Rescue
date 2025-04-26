"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Flower, Apple, Sprout, Coffee, Salad, ChevronDown, Info, ArrowRight } from "lucide-react"
import Link from "next/link"
import useDataStore from "../../store/DataStore"

const sampleCompostData = {
  Context:
    "Based on your leftover food image, we've identified items that would make excellent compost. Here are plants that would thrive with this type of compost.",
  Plants: {
    FruitAndVegetableCompostLovers: {
      Vegetables: ["Tomatoes", "Peppers", "Broccoli", "Carrots", "Spinach", "Kale", "Lettuce", "Cucumbers"],
      "Fruit Trees": ["Apple", "Pear", "Peach", "Plum", "Cherry"],
      Flowers: ["Roses", "Dahlias", "Sunflowers", "Marigolds", "Zinnias"],
      Shrubs: ["Blueberry", "Hydrangea", "Azalea", "Rhododendron"],
      Herbs: ["Basil", "Mint", "Rosemary", "Thyme", "Oregano"],
      Vines: ["Grapes", "Kiwi", "Passion Fruit", "Honeysuckle"],
      "Root Crops": ["Potatoes", "Sweet Potatoes", "Beets", "Radishes", "Turnips"],
      "Berry Bushes": ["Raspberry", "Blackberry", "Strawberry", "Blueberry"],
    },
    CookedFoodCompostLovers: {
      Vegetables: ["Corn", "Squash", "Pumpkins", "Zucchini", "Eggplant"],
      "Fruit Trees": ["Citrus", "Avocado", "Banana", "Mango"],
      Flowers: ["Chrysanthemums", "Petunias", "Geraniums", "Begonias"],
      Shrubs: ["Butterfly Bush", "Lilac", "Forsythia", "Spirea"],
      Herbs: ["Lavender", "Sage", "Cilantro", "Dill", "Parsley"],
    },
  },
}

const categoryIcons: Record<string, React.ReactNode> = {
  Vegetables: <Salad className="h-5 w-5 text-green-600 dark:text-green-400" />,
  "Fruit Trees": <Apple className="h-5 w-5 text-red-500 dark:text-red-400" />,
  Flowers: <Flower className="h-5 w-5 text-pink-500 dark:text-pink-400" />,
  Shrubs: <Sprout className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
  Herbs: <Leaf className="h-5 w-5 text-green-500 dark:text-green-400" />,
  Vines: <Sprout className="h-5 w-5 text-teal-600 dark:text-teal-400" />,
  "Root Crops": <Sprout className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
  "Berry Bushes": <Apple className="h-5 w-5 text-purple-500 dark:text-purple-400" />,
}

const categoryColors: Record<string, string> = {
  Vegetables: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  "Fruit Trees": "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
  Flowers: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800",
  Shrubs: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800",
  Herbs: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  Vines: "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800",
  "Root Crops": "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
  "Berry Bushes": "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
}

export default function ComposePage() {
  const [activeTab, setActiveTab] = useState("fruit-vegetable")
  const [compostData, setCompostData] = useState(sampleCompostData)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [isLoaded, setIsLoaded] = useState(false)

  const uploadedData = useDataStore((state: any) => state.compostData)

  useEffect(() => {
    if (uploadedData) {
      setCompostData(uploadedData)
    }

    setIsLoaded(true);
  }, [])

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  // Composting benefits
  const compostBenefits = [
    {
      title: "Nutrient-Rich Soil",
      description: "Compost adds essential nutrients to your soil, improving plant growth and health.",
      icon: <Leaf className="h-6 w-6 text-primary" />,
    },
    {
      title: "Reduces Waste",
      description: "Composting food scraps diverts waste from landfills, reducing methane emissions.",
      icon: <Sprout className="h-6 w-6 text-primary" />,
    },
    {
      title: "Improves Soil Structure",
      description: "Compost enhances soil structure, increasing water retention and reducing erosion.",
      icon: <Coffee className="h-6 w-6 text-primary" />,
    },
  ]

  return (
    <div
      className={`min-h-screen bg-background transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background dark:from-primary/10 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Compost <span className="gradient-text">Companion</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover which plants will thrive with compost made from your food leftovers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Card className="p-6 mb-8 border border-border bg-card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Composting Analysis</h2>
                <p className="text-muted-foreground">
                  {compostData.Context ||
                    "Based on your leftover food image, we've identified items that would make excellent compost. Here are plants that would thrive with this type of compost."}
                </p>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="fruit-vegetable" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="fruit-vegetable" className="flex items-center gap-2">
                <Salad className="h-4 w-4" />
                <span className="hidden sm:inline">Fruit & Vegetable</span>
                <span className="sm:hidden">Fruit/Veg</span>
              </TabsTrigger>
              <TabsTrigger value="cooked-food" className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                <span className="hidden sm:inline">Cooked Food</span>
                <span className="sm:hidden">Cooked</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fruit-vegetable" className="mt-0 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(compostData.Plants.FruitAndVegetableCompostLovers).map(([category, plants]) => (
                  <Card
                    key={category}
                    className={`overflow-hidden border ${plants.length > 0 ? "border-border" : "border-border/50 opacity-70"}`}
                  >
                    <div
                      className={`p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors`}
                    //   onClick={() => toggleCategory(`fv-${category}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {categoryIcons[category] || <Leaf className="h-5 w-5 text-primary" />}
                        </div>
                        <h3 className="font-semibold">{category}</h3>
                      </div>
                      {/* <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform ${expandedCategories[`fv-${category}`] ? "rotate-180" : ""}`}
                      /> */}
                    </div>

                    <div
                      className={` transition-all duration-300 ${expandedCategories[`fv-${category}`] ? "max-h-96" : ""}`}
                    >
                      <div className={`p-4 pt-0 ${categoryColors[category] || "bg-muted/30"} border-t border-border`}>
                        {plants.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                            {plants.map((plant, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 bg-background/80 backdrop-blur-sm rounded-md border border-border/50 text-sm flex items-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                                <span>{plant}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm italic mt-3">
                            No plants identified for this category.
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cooked-food" className="mt-0 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(compostData.Plants.CookedFoodCompostLovers).map(([category, plants]) => (
                  <Card
                    key={category}
                    className={`overflow-hidden border ${plants.length > 0 ? "border-border" : "border-border/50 opacity-70"}`}
                  >
                    <div
                      className={`p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors`}
                      onClick={() => toggleCategory(`cf-${category}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {categoryIcons[category] || <Coffee className="h-5 w-5 text-primary" />}
                        </div>
                        <h3 className="font-semibold">{category}</h3>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform ${expandedCategories[`cf-${category}`] ? "rotate-180" : ""}`}
                      />
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${expandedCategories[`cf-${category}`] ? "max-h-96" : "max-h-0"}`}
                    >
                      <div className={`p-4 pt-0 ${categoryColors[category] || "bg-muted/30"} border-t border-border`}>
                        {plants.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                            {plants.map((plant, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 bg-background/80 backdrop-blur-sm rounded-md border border-border/50 text-sm flex items-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                                <span>{plant}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm italic mt-3">
                            No plants identified for this category.
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Benefits of <span className="gradient-text">Composting</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {compostBenefits.map((benefit, index) => (
              <Card key={index} className="p-6 border border-border hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Composting Tips */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Quick Composting <span className="gradient-text">Tips</span>
            </h2>

            <Card className="p-6 border border-border mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                  <span className="text-sm font-bold">1</span>
                </div>
                Balance Green and Brown Materials
              </h3>
              <p className="text-muted-foreground">
                Aim for a ratio of about 3 parts brown materials (dry leaves, cardboard) to 1 part green materials (food
                scraps, fresh grass clippings) for optimal decomposition.
              </p>
            </Card>

            <Card className="p-6 border border-border mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                  <span className="text-sm font-bold">2</span>
                </div>
                Keep It Moist
              </h3>
              <p className="text-muted-foreground">
                Your compost pile should be as moist as a wrung-out sponge. Too dry and decomposition slows; too wet and
                it can become smelly and anaerobic.
              </p>
            </Card>

            <Card className="p-6 border border-border">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                  <span className="text-sm font-bold">3</span>
                </div>
                Turn Regularly
              </h3>
              <p className="text-muted-foreground">
                Turn your compost pile every few weeks to aerate it, which speeds up decomposition and prevents odors.
                This brings oxygen to the microorganisms that break down the materials.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start <span className="gradient-text">Composting?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Learn more about composting techniques and how to use your food waste to create nutrient-rich soil for
              your garden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/composting">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 text-lg">
                  Composting Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="px-6 py-2 text-lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
