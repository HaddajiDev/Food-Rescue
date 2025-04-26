"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Trash2, Sprout, AlertTriangle, CheckCircle, XCircle, ArrowRight, Info } from "lucide-react"

export default function CompostingPage() {
  const [activeTab, setActiveTab] = useState("what-to-compost")

  // Compost data based on the provided JSON
  const compostData = {
    fruitAndVegetableLovers: {
      vegetables: [
        "Peppers",
        "Carrots",
        "Broccoli",
        "Garlic",
        "Brussels Sprouts",
        "Onion",
        "Cucumber",
        "Sweet Potato",
        "Potato",
        "Avocado",
      ],
      rootCrops: ["Carrots", "Sweet Potato", "Potato"],
    },
    cookedFoodCompostLovers: {
      vegetables: [],
    },
  }

  // Additional compost categories
  const compostCategories = {
    green: [
      { name: "Fruit scraps", description: "Apple cores, banana peels, citrus rinds" },
      { name: "Vegetable scraps", description: "Peels, ends, stems, leaves" },
      { name: "Coffee grounds", description: "Including paper filters" },
      { name: "Tea bags", description: "Remove staples and synthetic bags" },
      { name: "Fresh grass clippings", description: "Untreated lawn grass" },
      { name: "Plant trimmings", description: "Soft, green plant material" },
      { name: "Eggshells", description: "Crushed for faster decomposition" },
    ],
    brown: [
      { name: "Dry leaves", description: "All varieties of tree leaves" },
      { name: "Cardboard", description: "Torn into small pieces, no glossy prints" },
      { name: "Paper", description: "Newspaper, office paper, paper bags" },
      { name: "Egg cartons", description: "Paper only, not foam" },
      { name: "Nutshells", description: "Except walnut shells which can be toxic" },
      { name: "Twigs and small branches", description: "Broken into small pieces" },
      { name: "Straw and hay", description: "Untreated and pesticide-free" },
    ],
    avoid: [
      { name: "Meat and fish", description: "Attracts pests and creates odors" },
      { name: "Dairy products", description: "Cheese, yogurt, milk" },
      { name: "Oils and fats", description: "Cooking oil, butter, grease" },
      { name: "Pet waste", description: "Can contain harmful pathogens" },
      { name: "Diseased plants", description: "Can spread disease to your garden" },
      { name: "Treated wood", description: "Contains harmful chemicals" },
      { name: "Citrus and onions", description: "In large quantities can kill worms" },
    ],
  }

  // Composting steps
  const compostingSteps = [
    {
      title: "Choose a Bin",
      description:
        "Select a compost bin that fits your space. Options include enclosed bins, tumblers, or simple open piles for larger yards.",
      icon: <Trash2 className="h-8 w-8 text-primary" />,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Layer Materials",
      description:
        "Start with a layer of browns (carbon-rich), then add greens (nitrogen-rich). Aim for a ratio of about 3 parts brown to 1 part green.",
      icon: <Leaf className="h-8 w-8 text-primary" />,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Add Water",
      description:
        "Keep your compost as moist as a wrung-out sponge. Too dry and decomposition slows; too wet and it becomes smelly.",
      icon: <Sprout className="h-8 w-8 text-primary" />,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Turn Regularly",
      description:
        "Mix or turn your compost every few weeks to aerate it. This speeds decomposition and prevents odors.",
      icon: <ArrowRight className="h-8 w-8 text-primary" />,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Benefits of composting
  const compostBenefits = [
    {
      title: "Reduces Food Waste",
      description:
        "Composting diverts food scraps from landfills, reducing methane emissions and helping combat climate change.",
      icon: <Trash2 className="h-6 w-6 text-primary" />,
    },
    {
      title: "Enriches Soil",
      description:
        "Compost adds vital nutrients and beneficial microorganisms to soil, improving plant health and crop yields.",
      icon: <Sprout className="h-6 w-6 text-primary" />,
    },
    {
      title: "Saves Money",
      description: "Creating your own compost reduces the need to buy fertilizers and soil amendments for your garden.",
      icon: <Leaf className="h-6 w-6 text-primary" />,
    },
    {
      title: "Conserves Water",
      description: "Compost-rich soil retains moisture better, reducing water needs for plants and gardens.",
      icon: <Info className="h-6 w-6 text-primary" />,
    },
  ]

  // Common mistakes
  const commonMistakes = [
    {
      title: "Too Much Green Material",
      description: "Excess nitrogen-rich materials can create a smelly, slimy compost pile.",
      solution: "Add more brown materials like dried leaves or cardboard to balance it out.",
    },
    {
      title: "Not Enough Moisture",
      description: "A dry compost pile decomposes very slowly.",
      solution: "Add water until the pile feels like a wrung-out sponge.",
    },
    {
      title: "Poor Aeration",
      description: "Without oxygen, your pile will develop anaerobic bacteria and start to smell.",
      solution: "Turn your pile regularly to incorporate air throughout the materials.",
    },
    {
      title: "Pieces Too Large",
      description: "Large chunks take much longer to break down.",
      solution: "Chop or shred materials into smaller pieces before adding to your compost.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background dark:from-primary/10 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Leftovers <span className="gradient-text">Composting</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Turn your food waste into garden gold. Learn how to compost your leftovers and reduce your environmental
              footprint.
            </p>
            <div className="flex justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                Start Composting Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Benefits of <span className="gradient-text">Composting</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {compostBenefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-6 border border-border hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]"
              >
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

      {/* Main Content Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="what-to-compost" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="what-to-compost" className="">
                What to Compost
              </TabsTrigger>
              <TabsTrigger value="how-to-compost" className="">
                How to Compost
              </TabsTrigger>
              <TabsTrigger value="troubleshooting" className="">
                Troubleshooting
              </TabsTrigger>
            </TabsList>

            <TabsContent value="what-to-compost" className="mt-0 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="p-6 border border-border overflow-hidden">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Green Materials (Nitrogen)</h3>
                  </div>
                  <div className="space-y-3">
                    {compostCategories.green.map((item, index) => (
                      <div key={index} className="group">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                          <div>
                            <span className="font-medium group-hover:text-primary transition-colors duration-300">
                              {item.name}
                            </span>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 border border-border overflow-hidden">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-3">
                      <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Brown Materials (Carbon)</h3>
                  </div>
                  <div className="space-y-3">
                    {compostCategories.brown.map((item, index) => (
                      <div key={index} className="group">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                          <div>
                            <span className="font-medium group-hover:text-primary transition-colors duration-300">
                              {item.name}
                            </span>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 border border-border overflow-hidden">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold">What to Avoid</h3>
                  </div>
                  <div className="space-y-3">
                    {compostCategories.avoid.map((item, index) => (
                      <div key={index} className="group">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                          <div>
                            <span className="font-medium group-hover:text-primary transition-colors duration-300">
                              {item.name}
                            </span>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="bg-card rounded-xl overflow-hidden border border-border shadow-md">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-6 flex items-center">
                    <Leaf className="h-6 w-6 text-primary mr-2" />
                    Vegetable Composting Guide
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    These vegetables are excellent for composting and will break down quickly to create nutrient-rich
                    soil for your garden.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {compostData.fruitAndVegetableLovers.vegetables.map((vegetable, index) => (
                      <div
                        key={index}
                        className="bg-muted/30 rounded-lg p-4 text-center hover:bg-primary/10 transition-colors duration-300 border border-border"
                      >
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-primary/5 flex items-center justify-center">
                          <img
                            src={`/placeholder.svg?height=100&width=100&text=${vegetable}`}
                            alt={vegetable}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-medium">{vegetable}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {compostData.fruitAndVegetableLovers.rootCrops.includes(vegetable)
                            ? "Root crop"
                            : "Vegetable"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="how-to-compost" className="mt-0 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Getting Started with Composting</h3>
                  <p className="text-muted-foreground mb-6">
                    Composting is a natural process that transforms kitchen and garden waste into a valuable and
                    nutrient-rich food for your garden. It's easy to get started and requires minimal equipment.
                  </p>
                  <div className="bg-muted/30 rounded-lg p-6 border border-border mb-6">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Info className="h-5 w-5 text-primary mr-2" />
                      The Ideal Compost Ratio
                    </h4>
                    <p className="mb-4">For the best results, aim for a balance of materials in your compost pile:</p>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-2">
                          <span className="text-xl font-bold text-green-600 dark:text-green-400">1</span>
                        </div>
                        <span className="text-sm font-medium">Part Green</span>
                      </div>
                      <span className="text-xl">:</span>
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-2">
                          <span className="text-xl font-bold text-amber-600 dark:text-amber-400">3</span>
                        </div>
                        <span className="text-sm font-medium">Parts Brown</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This ratio provides the right balance of nitrogen and carbon for optimal decomposition.
                    </p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                    <h4 className="font-semibold mb-3">Indoor Composting Options</h4>
                    <p className="text-muted-foreground mb-4">
                      Don't have outdoor space? Try these indoor composting methods:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                        <span>
                          <strong>Worm Bins:</strong> Compact and odorless when maintained properly
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                        <span>
                          <strong>Bokashi:</strong> Fermentation system that can handle meat and dairy
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                        <span>
                          <strong>Electric Composters:</strong> Automated devices that speed up the process
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-card rounded-lg overflow-hidden border border-border shadow-md">
                  <img
                    src="/placeholder.svg?height=300&width=600&text=Composting+Process"
                    alt="Composting process diagram"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Composting in 4 Simple Steps</h3>
                    <div className="space-y-6">
                      {compostingSteps.map((step, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{step.title}</h4>
                            <p className="text-muted-foreground text-sm">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {compostingSteps.map((step, index) => (
                  <Card key={index} className="overflow-hidden border border-border">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={step.image || "/placeholder.svg"}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {step.icon}
                        </div>
                        <h4 className="font-semibold">{step.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="troubleshooting" className="mt-0 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-1">
                  <Card className="p-6 border border-border h-full">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <h3 className="text-xl font-semibold">Common Composting Problems</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Even experienced composters encounter issues. Here are some common problems and their solutions.
                    </p>
                    <div className="bg-muted/30 rounded-lg p-4 border border-border">
                      <h4 className="font-semibold mb-2">Signs of a Healthy Compost</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Earthy smell, like forest soil</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Warm to the touch in the center</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Presence of worms and other decomposers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Dark, crumbly texture when finished</span>
                        </li>
                      </ul>
                    </div>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {commonMistakes.map((mistake, index) => (
                      <Card key={index} className="p-6 border border-border">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <XCircle className="h-5 w-5 text-red-500 mr-2" />
                          {mistake.title}
                        </h4>
                        <p className="text-muted-foreground mb-4">{mistake.description}</p>
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                          <p className="text-sm flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>
                              <strong>Solution:</strong> {mistake.solution}
                            </span>
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <Card className="p-6 border border-border mb-8">
                <h3 className="text-xl font-semibold mb-4">Troubleshooting Guide</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-3 px-4 text-left">Problem</th>
                        <th className="py-3 px-4 text-left">Possible Cause</th>
                        <th className="py-3 px-4 text-left">Solution</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Bad odor (rotten eggs)</td>
                        <td className="py-3 px-4">Too wet, compacted, or too much green material</td>
                        <td className="py-3 px-4">
                          Add brown materials, turn the pile to aerate, ensure proper drainage
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Pile isn't heating up</td>
                        <td className="py-3 px-4">Too small, too dry, or not enough nitrogen</td>
                        <td className="py-3 px-4">
                          Add more materials to increase size, add water, or add green materials
                        </td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-3 px-4">Attracts pests</td>
                        <td className="py-3 px-4">Meat/dairy in pile or food scraps exposed</td>
                        <td className="py-3 px-4">
                          Remove prohibited items, bury food scraps in center, use rodent-resistant bin
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Decomposition too slow</td>
                        <td className="py-3 px-4">Pieces too large, too cold, or improper C:N ratio</td>
                        <td className="py-3 px-4">
                          Chop materials smaller, insulate bin in cold weather, adjust green/brown ratio
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3">
                    <img
                      src="/placeholder.svg?height=200&width=200&text=Compost+Expert"
                      alt="Composting expert"
                      className="rounded-full w-32 h-32 mx-auto object-cover border-4 border-primary/20"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-semibold mb-3">Expert Tip</h3>
                    <p className="text-muted-foreground italic mb-4">
                      "If your compost pile seems to be taking too long, try the 'lasagna method' - alternate thin
                      layers of green and brown materials, and make sure everything is chopped into small pieces. This
                      creates ideal conditions for decomposition and can speed up the process significantly."
                    </p>
                    <p className="font-medium">- Maria Rodriguez, Master Composter</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 border border-border">
              <h3 className="font-semibold mb-3 flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
                  <span className="text-xs font-bold">Q</span>
                </div>
                How long does composting take?
              </h3>
              <p className="text-muted-foreground">
                Composting can take anywhere from 2 months to a year, depending on the materials, method, and
                conditions. Hot composting can produce finished compost in 1-3 months, while cold composting typically
                takes 6-12 months.
              </p>
            </Card>

            <Card className="p-6 border border-border">
              <h3 className="font-semibold mb-3 flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
                  <span className="text-xs font-bold">Q</span>
                </div>
                Can I compost in an apartment?
              </h3>
              <p className="text-muted-foreground">
                Yes! Indoor options like worm bins, bokashi systems, and electric composters are perfect for apartments.
                You can also check if your city has a food waste collection program or community garden that accepts
                compost.
              </p>
            </Card>

            <Card className="p-6 border border-border">
              <h3 className="font-semibold mb-3 flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
                  <span className="text-xs font-bold">Q</span>
                </div>
                What can I do with finished compost?
              </h3>
              <p className="text-muted-foreground">
                Use finished compost to enrich garden soil, mix into potting soil for houseplants, use as a top dressing
                for lawns, or brew compost tea for a liquid fertilizer. You can also share it with neighbors or
                community gardens.
              </p>
            </Card>

            <Card className="p-6 border border-border">
              <h3 className="font-semibold mb-3 flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
                  <span className="text-xs font-bold">Q</span>
                </div>
                Do I need worms for composting?
              </h3>
              <p className="text-muted-foreground">
                Worms are helpful but not required for all composting methods. Traditional compost piles rely on
                microorganisms, while vermicomposting specifically uses worms. Worms can speed up the process and create
                a richer end product.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start <span className="gradient-text">Composting?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of people reducing food waste and creating nutrient-rich soil for their gardens.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                Get Your Compost Starter Kit
              </Button>
              <Button variant="outline" className="px-8 py-6 text-lg">
                Join Our Composting Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
