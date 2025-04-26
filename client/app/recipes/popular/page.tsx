"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RecipeCard } from "@/components/recipe-card"
import { Button } from "@/components/ui/button"
import { Search, Filter, ChevronDown, X } from "lucide-react"

// Mock data for popular recipes
const popularRecipes = [
  {
    id: 1,
    title: "Vegetable Stir Fry with Tofu",
    image: "https://images.unsplash.com/photo-1706922122195-a1d670210618?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "25 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.7,
    category: "Asian",
    tags: ["Vegetarian", "Quick", "Healthy"],
    ingredients: ["Tofu", "Bell Peppers", "Broccoli", "Carrots", "Soy Sauce"],
  },
  {
    id: 2,
    title: "Mediterranean Chickpea Salad",
    image: "https://images.unsplash.com/photo-1636044990022-97492e89a143?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "15 mins",
    servings: 2,
    difficulty: "Easy",
    rating: 4.5,
    category: "Mediterranean",
    tags: ["Vegan", "No-Cook", "Protein-Rich"],
    ingredients: ["Chickpeas", "Cucumber", "Tomatoes", "Red Onion", "Feta"],
  },
  {
    id: 3,
    title: "Creamy Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1617237692625-36ecc1173a4d?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "40 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    category: "Italian",
    tags: ["Vegetarian", "Comfort Food"],
    ingredients: ["Arborio Rice", "Mushrooms", "Onion", "White Wine", "Parmesan"],
  },
  {
    id: 4,
    title: "Spicy Black Bean Tacos",
    image: "https://images.unsplash.com/photo-1676560662899-253459ea7419?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "20 mins",
    servings: 3,
    difficulty: "Easy",
    rating: 4.6,
    category: "Mexican",
    tags: ["Vegan", "Spicy", "Quick"],
    ingredients: ["Black Beans", "Corn Tortillas", "Avocado", "Salsa", "Lime"],
  },
  {
    id: 5,
    title: "Roasted Vegetable Lasagna",
    image: "https://images.unsplash.com/photo-1654657639692-1cccc800046c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "75 mins",
    servings: 6,
    difficulty: "Hard",
    rating: 4.9,
    category: "Italian",
    tags: ["Vegetarian", "Baked", "Comfort Food"],
    ingredients: ["Lasagna Noodles", "Zucchini", "Eggplant", "Ricotta", "Tomato Sauce"],
  },
  {
    id: 6,
    title: "Thai Green Curry with Vegetables",
    image: "https://images.unsplash.com/photo-1606315983891-469221f05c89?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "35 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    category: "Thai",
    tags: ["Spicy", "Gluten-Free"],
    ingredients: ["Coconut Milk", "Green Curry Paste", "Mixed Vegetables", "Tofu", "Basil"],
  },
  {
    id: 7,
    title: "Quinoa Stuffed Bell Peppers",
    image: "https://images.unsplash.com/photo-1738079862239-c48136cf452a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "45 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.5,
    category: "American",
    tags: ["Vegetarian", "Protein-Rich", "Gluten-Free"],
    ingredients: ["Bell Peppers", "Quinoa", "Black Beans", "Corn", "Cheese"],
  },
  {
    id: 8,
    title: "Lentil and Vegetable Soup",
    image: "https://images.unsplash.com/photo-1716959669858-11d415bdead6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "40 mins",
    servings: 6,
    difficulty: "Easy",
    rating: 4.4,
    category: "Soup",
    tags: ["Vegan", "High-Fiber", "One-Pot"],
    ingredients: ["Lentils", "Carrots", "Celery", "Onion", "Vegetable Broth"],
  },
  {
    id: 9,
    title: "Eggplant Parmesan",
    image: "https://images.unsplash.com/photo-1596464716059-f81da526557b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "60 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    category: "Italian",
    tags: ["Vegetarian", "Baked", "Comfort Food"],
    ingredients: ["Eggplant", "Tomato Sauce", "Mozzarella", "Parmesan", "Breadcrumbs"],
  },
  {
    id: 10,
    title: "Sweet Potato and Black Bean Burritos",
    image: "https://images.unsplash.com/photo-1543738066-5edfab962f10?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "30 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.7,
    category: "Mexican",
    tags: ["Vegetarian", "High-Fiber", "Meal Prep"],
    ingredients: ["Sweet Potatoes", "Black Beans", "Tortillas", "Avocado", "Salsa"],
  },
  {
    id: 11,
    title: "Mushroom and Spinach Frittata",
    image: "https://images.unsplash.com/photo-1540138411301-84af810a9a44?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "25 mins",
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    category: "Breakfast",
    tags: ["Vegetarian", "High-Protein", "Gluten-Free"],
    ingredients: ["Eggs", "Mushrooms", "Spinach", "Onion", "Cheese"],
  },
  {
    id: 12,
    title: "Cauliflower and Chickpea Curry",
    image: "https://images.unsplash.com/photo-1597387216134-81e3c0e69b21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    time: "35 mins",
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    category: "Indian",
    tags: ["Vegan", "Spicy", "One-Pot"],
    ingredients: ["Cauliflower", "Chickpeas", "Coconut Milk", "Curry Powder", "Tomatoes"],
  },
]

// All unique categories from recipes
const allCategories = Array.from(new Set(popularRecipes.map((recipe) => recipe.category)))

// All unique tags from recipes
const allTags = Array.from(new Set(popularRecipes.flatMap((recipe) => recipe.tags)))

// All unique difficulties
const allDifficulties = Array.from(new Set(popularRecipes.map((recipe) => recipe.difficulty)))

export default function PopularRecipesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [savedRecipes, setSavedRecipes] = useState<number[]>([])
  const [likedRecipes, setLikedRecipes] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter recipes based on search query and selected filters
  const filteredRecipes = popularRecipes.filter((recipe) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchQuery.toLowerCase()))

    // Category filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(recipe.category)

    // Tags filter
    const matchesTags = selectedTags.length === 0 || recipe.tags.some((tag) => selectedTags.includes(tag))

    // Difficulty filter
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(recipe.difficulty)

    return matchesSearch && matchesCategory && matchesTags && matchesDifficulty
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

  const toggleDifficulty = (difficulty: string) => {
    if (selectedDifficulties.includes(difficulty)) {
      setSelectedDifficulties(selectedDifficulties.filter((d) => d !== difficulty))
    } else {
      setSelectedDifficulties([...selectedDifficulties, difficulty])
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedTags([])
    setSelectedDifficulties([])
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
              Popular <span className="gradient-text">Recipes</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our most loved recipes for reducing food waste and creating delicious meals.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
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
              {(selectedCategories.length > 0 || selectedTags.length > 0 || selectedDifficulties.length > 0) && (
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <div>
                  <h3 className="font-semibold mb-3">Difficulty</h3>
                  <div className="flex flex-wrap gap-2">
                    {allDifficulties.map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => toggleDifficulty(difficulty)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          selectedDifficulties.includes(difficulty)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        }`}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active filters display */}
          {(selectedCategories.length > 0 || selectedTags.length > 0 || selectedDifficulties.length > 0) && (
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
              {selectedDifficulties.map((difficulty) => (
                <div
                  key={difficulty}
                  className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {difficulty}
                  <button onClick={() => toggleDifficulty(difficulty)}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {filteredRecipes.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
              <p className="text-muted-foreground mb-6">We couldn't find any recipes matching your search criteria.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Get Weekly Recipe <span className="gradient-text">Inspiration</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter and receive new recipes, tips for reducing food waste, and seasonal ingredient
              guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
