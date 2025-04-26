"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RecipeCard } from "@/components/recipe-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, Filter, ChevronDown, X, Clock, Zap, ChefHat, Utensils } from "lucide-react"
import { Card } from "@/components/ui/card"

// Mock data for quick recipes
const quickRecipes = {
  "under-15": [
    {
      id: 501,
      title: "Avocado Toast with Egg",
      image: "https://images.unsplash.com/photo-1650330144131-84c9ba7661f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "10 mins",
      servings: 1,
      difficulty: "Easy",
      rating: 4.6,
      category: "Breakfast",
      tags: ["Vegetarian", "High-Protein", "Quick"],
      ingredients: ["Bread", "Avocado", "Egg", "Salt", "Pepper"],
    },
    {
      id: 502,
      title: "Greek Yogurt Parfait",
      image: "https://images.unsplash.com/photo-1600730493985-d1efe3d85ff3?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "5 mins",
      servings: 1,
      difficulty: "Easy",
      rating: 4.5,
      category: "Breakfast",
      tags: ["Vegetarian", "No-Cook", "High-Protein"],
      ingredients: ["Greek Yogurt", "Berries", "Granola", "Honey", "Nuts"],
    },
    {
      id: 503,
      title: "Caprese Salad",
      image: "https://images.unsplash.com/photo-1595587870672-c79b47875c6a?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "10 mins",
      servings: 2,
      difficulty: "Easy",
      rating: 4.7,
      category: "Salad",
      tags: ["Vegetarian", "No-Cook", "Italian"],
      ingredients: ["Tomatoes", "Mozzarella", "Basil", "Olive Oil", "Balsamic Glaze"],
    },
    {
      id: 504,
      title: "Tuna Salad Wrap",
      image: "https://images.unsplash.com/photo-1722032617357-7b09276b1a8d?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "12 mins",
      servings: 1,
      difficulty: "Easy",
      rating: 4.4,
      category: "Lunch",
      tags: ["High-Protein", "Quick"],
      ingredients: ["Canned Tuna", "Mayonnaise", "Celery", "Tortilla Wrap", "Lettuce"],
    },
    {
      id: 505,
      title: "Microwave Scrambled Eggs",
      image: "https://images.unsplash.com/photo-1680987398307-e1ae27a6ed67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "5 mins",
      servings: 1,
      difficulty: "Easy",
      rating: 4.3,
      category: "Breakfast",
      tags: ["Vegetarian", "High-Protein", "Microwave"],
      ingredients: ["Eggs", "Milk", "Cheese", "Salt", "Pepper"],
    },
    {
      id: 506,
      title: "Cucumber Hummus Bites",
      image: "https://images.unsplash.com/photo-1599448191905-7bedab8ced59?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "10 mins",
      servings: 2,
      difficulty: "Easy",
      rating: 4.5,
      category: "Appetizer",
      tags: ["Vegan", "No-Cook", "Gluten-Free"],
      ingredients: ["Cucumber", "Hummus", "Cherry Tomatoes", "Olive Oil", "Za'atar"],
    },
  ],
  "15-30": [
    {
      id: 601,
      title: "Pesto Pasta with Cherry Tomatoes",
      image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "20 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.8,
      category: "Italian",
      tags: ["Vegetarian", "Quick", "One-Pot"],
      ingredients: ["Pasta", "Pesto", "Cherry Tomatoes", "Parmesan", "Pine Nuts"],
    },
    {
      id: 602,
      title: "Quesadillas with Leftover Vegetables",
      image: "https://images.unsplash.com/photo-1711989874705-bb85dc205541?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "15 mins",
      servings: 2,
      difficulty: "Easy",
      rating: 4.6,
      category: "Mexican",
      tags: ["Vegetarian", "Quick", "Leftovers"],
      ingredients: ["Tortillas", "Cheese", "Bell Peppers", "Onions", "Salsa"],
    },
    {
      id: 603,
      title: "Shrimp Stir Fry",
      image: "https://images.unsplash.com/photo-1607247098391-111d84c1aa72?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "25 mins",
      servings: 4,
      difficulty: "Medium",
      rating: 4.7,
      category: "Asian",
      tags: ["High-Protein", "Quick", "Gluten-Free"],
      ingredients: ["Shrimp", "Mixed Vegetables", "Soy Sauce", "Garlic", "Ginger"],
    },
    {
      id: 604,
      title: "Chickpea Curry",
      image: "https://images.unsplash.com/photo-1582576163090-09d3b6f8a969?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "25 mins",
      servings: 4,
      difficulty: "Medium",
      rating: 4.8,
      category: "Indian",
      tags: ["Vegan", "One-Pot", "Spicy"],
      ingredients: ["Chickpeas", "Coconut Milk", "Curry Powder", "Onion", "Tomatoes"],
    },
    {
      id: 605,
      title: "Frittata with Leftover Vegetables",
      image: "https://images.unsplash.com/photo-1707339088654-117df66bd55c?q=80&w=1971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "20 mins",
      servings: 4,
      difficulty: "Medium",
      rating: 4.6,
      category: "Breakfast",
      tags: ["Vegetarian", "High-Protein", "Leftovers"],
      ingredients: ["Eggs", "Mixed Vegetables", "Cheese", "Herbs", "Olive Oil"],
    },
    {
      id: 606,
      title: "Black Bean Tacos",
      image: "https://images.unsplash.com/photo-1593759608136-45eb2ad9507d?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "15 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.7,
      category: "Mexican",
      tags: ["Vegetarian", "Quick", "High-Fiber"],
      ingredients: ["Black Beans", "Tortillas", "Avocado", "Salsa", "Lime"],
    },
    {
      id: 607,
      title: "Salmon with Roasted Vegetables",
      image: "https://images.unsplash.com/photo-1633524792906-73b111908d9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "25 mins",
      servings: 2,
      difficulty: "Medium",
      rating: 4.9,
      category: "Seafood",
      tags: ["High-Protein", "Healthy", "Gluten-Free"],
      ingredients: ["Salmon Fillets", "Broccoli", "Bell Peppers", "Olive Oil", "Lemon"],
    },
    {
      id: 608,
      title: "Couscous Salad",
      image: "https://images.unsplash.com/photo-1639356690430-65aec108d87b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "15 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.5,
      category: "Salad",
      tags: ["Vegetarian", "Quick", "Mediterranean"],
      ingredients: ["Couscous", "Cucumber", "Cherry Tomatoes", "Feta", "Olive Oil"],
    },
  ],
}

// Get all unique tags from all recipes
const allTags = Array.from(
  new Set(
    Object.values(quickRecipes)
      .flat()
      .flatMap((recipe) => recipe.tags),
  ),
)

// Get all unique categories from all recipes
const allCategories = Array.from(
  new Set(
    Object.values(quickRecipes)
      .flat()
      .map((recipe) => recipe.category),
  ),
)

// Quick cooking tips
const quickCookingTips = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Prep Ahead",
    description:
      "Wash and chop vegetables in advance. Store them in airtight containers in the fridge for quick access during the week.",
  },
  {
    icon: <ChefHat className="h-6 w-6 text-primary" />,
    title: "One-Pot Wonders",
    description: "Choose recipes that cook in a single pot or pan. This saves time on both cooking and cleanup.",
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Smart Shortcuts",
    description:
      "Use pre-washed greens, canned beans, and frozen vegetables to cut down on prep time without sacrificing nutrition.",
  },
  {
    icon: <Utensils className="h-6 w-6 text-primary" />,
    title: "Batch Cooking",
    description:
      "When you do have time to cook, make extra portions to refrigerate or freeze for quick meals later in the week.",
  },
]

export default function QuickMealsPage() {
  const [timeCategory, setTimeCategory] = useState("under-15")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [savedRecipes, setSavedRecipes] = useState<number[]>([])
  const [likedRecipes, setLikedRecipes] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter recipes based on search query and selected filters
  const filteredRecipes = quickRecipes[timeCategory as keyof typeof quickRecipes].filter((recipe) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchQuery.toLowerCase()))

    // Category filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(recipe.category)

    // Tags filter
    const matchesTags = selectedTags.length === 0 || recipe.tags.some((tag) => selectedTags.includes(tag))

    return matchesSearch && matchesCategory && matchesTags
  })

  const toggleSaved = (id: number) => {
    if (savedRecipes.includes(id)) {
      setSavedRecipes(savedRecipes.filter((recipeId) => recipeId !== id))
    } else {
      setSavedRecipes([...savedRecipes, id])
    }
  }

  const toggleLiked = (id: number) => {
    if (likedRecipes.includes(id)) {
      setLikedRecipes(likedRecipes.filter((recipeId) => recipeId !== id))
    } else {
      setLikedRecipes([...likedRecipes, id])
    }
  }

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedTags([])
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background dark:from-primary/10 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Quick <span className="gradient-text">Meals</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Delicious recipes ready in 30 minutes or less, perfect for busy weeknights or when you're short on time.
            </p>
          </div>
        </div>
      </section>

      {/* Time Category Tabs and Recipes Grid */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="under-15" value={timeCategory} onValueChange={setTimeCategory} className="mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="under-15" className="">
                <Clock className="h-4 w-4 mr-2" />
                Under 15 Minutes
              </TabsTrigger>
              <TabsTrigger value="15-30" className="">
                <Clock className="h-4 w-4 mr-2" />
                15-30 Minutes
              </TabsTrigger>
            </TabsList>

            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between my-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search recipes or ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </Button>
                {(selectedCategories.length > 0 || selectedTags.length > 0) && (
                  <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Filter options */}
            {showFilters && (
              <div className="bg-card border border-border rounded-lg p-6 mb-8 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {allCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            selectedCategories.includes(category)
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80 text-foreground"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Dietary Preferences</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            selectedTags.includes(tag)
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80 text-foreground"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Active filters display */}
            {(selectedCategories.length > 0 || selectedTags.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {category}
                    <button onClick={() => toggleCategory(category)}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedTags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {tag}
                    <button onClick={() => toggleTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <TabsContent value="under-15" className="mt-0 py-8">
              {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      id={recipe.id}
                      title={recipe.title}
                      image={recipe.image}
                      time={recipe.time}
                      servings={recipe.servings}
                      difficulty={recipe.difficulty}
                      rating={recipe.rating}
                      category={recipe.category}
                      isSaved={savedRecipes.includes(recipe.id)}
                      isLiked={likedRecipes.includes(recipe.id)}
                      onSave={toggleSaved}
                      onLike={toggleLiked}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any recipes matching your search criteria.
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="15-30" className="mt-0 py-8">
              {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      id={recipe.id}
                      title={recipe.title}
                      image={recipe.image}
                      time={recipe.time}
                      servings={recipe.servings}
                      difficulty={recipe.difficulty}
                      rating={recipe.rating}
                      category={recipe.category}
                      isSaved={savedRecipes.includes(recipe.id)}
                      isLiked={likedRecipes.includes(recipe.id)}
                      onSave={toggleSaved}
                      onLike={toggleLiked}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any recipes matching your search criteria.
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Cooking Tips */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Quick Cooking <span className="gradient-text">Tips</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickCookingTips.map((tip, index) => (
              <Card key={index} className="p-6 border border-border hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                <p className="text-muted-foreground">{tip.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pantry Essentials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pantry <span className="gradient-text">Essentials</span>
            </h2>
            <p className="text-muted-foreground">
              Keep these versatile ingredients on hand to whip up quick, nutritious meals at a moment's notice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
                  <span className="text-xs font-bold">1</span>
                </div>
                Shelf-Stable Items
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Canned beans (chickpeas, black beans, lentils)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Canned tomatoes and tomato paste</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Pasta, rice, quinoa, couscous</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Nuts and seeds</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Oils, vinegars, and condiments</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
                  <span className="text-xs font-bold">2</span>
                </div>
                Refrigerator Staples
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Eggs</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Cheese (feta, parmesan, cheddar)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Greek yogurt</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Tofu</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Lemons and limes</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
                  <span className="text-xs font-bold">3</span>
                </div>
                Freezer Friends
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Frozen vegetables (peas, spinach, stir-fry mix)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Frozen fruits for smoothies</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Frozen herbs (basil, parsley, cilantro)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Frozen shrimp or fish fillets</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <span>Frozen cooked grains</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Meal Prep Ideas */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Meal Prep <span className="gradient-text">Ideas</span>
            </h2>
            <p className="text-muted-foreground">
              Spend a little time prepping on the weekend to enjoy quick, healthy meals all week long.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586585571612-bbc4176c9bf2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Meal prep containers with various foods"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Batch Cooking Basics</h3>
                <p className="text-muted-foreground mb-4">
                  Prepare these versatile components on the weekend to mix and match throughout the week.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Roasted vegetables (sweet potatoes, broccoli, bell peppers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Cooked grains (quinoa, brown rice, farro)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Protein options (grilled chicken, hard-boiled eggs, baked tofu)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Homemade dressings and sauces</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
              <div className="h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1707635569223-c759b3b0501b?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Person preparing meals in containers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Time-Saving Strategies</h3>
                <p className="text-muted-foreground mb-4">
                  Implement these strategies to make meal preparation faster and more efficient.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Wash and chop vegetables as soon as you get home from shopping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Cook double portions and freeze half for later</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Prepare overnight oats or chia pudding for quick breakfasts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Use kitchen tools like food processors to speed up prep work</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Save <span className="gradient-text">Time & Reduce Waste?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Upload a photo of your ingredients and get personalized quick meal suggestions based on what you already
              have.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
              <Zap className="mr-2 h-5 w-5" />
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
