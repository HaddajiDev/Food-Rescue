"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RecipeCard } from "@/components/recipe-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ChevronDown, X, Leaf } from "lucide-react"
import { Card } from "@/components/ui/card"

// Mock data for seasonal recipes
const seasonalRecipes = {
  spring: [
    {
      id: 101,
      title: "Spring Vegetable Risotto",
      image: "https://images.unsplash.com/photo-1706145787429-4d6b00a5dc0c?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "35 mins",
      servings: 4,
      difficulty: "Medium",
      rating: 4.7,
      category: "Italian",
      tags: ["Vegetarian", "Seasonal"],
      ingredients: ["Arborio Rice", "Asparagus", "Peas", "Lemon", "Parmesan"],
    },
    {
      id: 102,
      title: "Strawberry Spinach Salad",
      image: "https://images.unsplash.com/photo-1727646210298-94150e7ee4a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "15 mins",
      servings: 2,
      difficulty: "Easy",
      rating: 4.5,
      category: "Salad",
      tags: ["Vegetarian", "Quick", "Fresh"],
      ingredients: ["Spinach", "Strawberries", "Feta", "Walnuts", "Balsamic"],
    },
    {
      id: 103,
      title: "Asparagus and Mushroom Tart",
      image: "https://images.unsplash.com/photo-1725545922389-cbb83f9877d4?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "45 mins",
      servings: 6,
      difficulty: "Medium",
      rating: 4.6,
      category: "Baking",
      tags: ["Vegetarian", "Brunch"],
      ingredients: ["Puff Pastry", "Asparagus", "Mushrooms", "Ricotta", "Eggs"],
    },
    {
      id: 104,
      title: "Lemon Herb Roasted Chicken",
      image: "https://images.unsplash.com/photo-1680249816404-29fedb436294?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "75 mins",
      servings: 4,
      difficulty: "Medium",
      rating: 4.8,
      category: "Main Course",
      tags: ["High-Protein", "Gluten-Free"],
      ingredients: ["Chicken", "Lemon", "Fresh Herbs", "Garlic", "Olive Oil"],
    },
    {
      id: 105,
      title: "Rhubarb Crumble",
      image: "https://images.unsplash.com/photo-1623596627064-71c10bd3ddaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "50 mins",
      servings: 6,
      difficulty: "Easy",
      rating: 4.7,
      category: "Dessert",
      tags: ["Sweet", "Baked"],
      ingredients: ["Rhubarb", "Sugar", "Flour", "Butter", "Oats"],
    },
    {
      id: 106,
      title: "Spring Pea Soup",
      image: "https://images.unsplash.com/photo-1625937712842-061738bb1e2a?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "30 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.4,
      category: "Soup",
      tags: ["Vegetarian", "Light"],
      ingredients: ["Peas", "Onion", "Vegetable Stock", "Mint", "Cream"],
    },
  ],
  summer: [
    {
      id: 201,
      title: "Grilled Vegetable Skewers",
      image: "https://images.unsplash.com/photo-1625944228126-74f9d9ae77e3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "25 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.6,
      category: "BBQ",
      tags: ["Vegan", "Gluten-Free"],
      ingredients: ["Zucchini", "Bell Peppers", "Cherry Tomatoes", "Red Onion", "Olive Oil"],
    },
    {
      id: 202,
      title: "Watermelon Feta Salad",
      image: "https://images.unsplash.com/photo-1595421158062-2de1caff0dc0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "10 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.8,
      category: "Salad",
      tags: ["Vegetarian", "No-Cook", "Refreshing"],
      ingredients: ["Watermelon", "Feta", "Mint", "Red Onion", "Lime"],
    },
    {
      id: 203,
      title: "Tomato Basil Pasta",
      image: "https://images.unsplash.com/photo-1559564121-073bd4080db7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "20 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.7,
      category: "Italian",
      tags: ["Vegetarian", "Quick"],
      ingredients: ["Pasta", "Fresh Tomatoes", "Basil", "Garlic", "Parmesan"],
    },
    {
      id: 204,
      title: "Peach Cobbler",
      image: "https://images.unsplash.com/photo-1567552229523-aaa2f6b76a60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "55 mins",
      servings: 8,
      difficulty: "Medium",
      rating: 4.9,
      category: "Dessert",
      tags: ["Sweet", "Baked"],
      ingredients: ["Peaches", "Sugar", "Flour", "Butter", "Cinnamon"],
    },
    {
      id: 205,
      title: "Corn and Black Bean Salsa",
      image: "https://images.unsplash.com/photo-1705515943119-e85d4c81f08f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "15 mins",
      servings: 6,
      difficulty: "Easy",
      rating: 4.5,
      category: "Appetizer",
      tags: ["Vegan", "No-Cook"],
      ingredients: ["Corn", "Black Beans", "Tomatoes", "Cilantro", "Lime"],
    },
    {
      id: 206,
      title: "Gazpacho",
      image: "https://images.unsplash.com/photo-1662469838214-a97415cd83fe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "15 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.4,
      category: "Soup",
      tags: ["Vegan", "No-Cook", "Cold"],
      ingredients: ["Tomatoes", "Cucumber", "Bell Pepper", "Garlic", "Olive Oil"],
    },
  ],
  fall: [
    {
      id: 301,
      title: "Butternut Squash Soup",
      image: "https://images.unsplash.com/photo-1652408414631-f09eae7cc1db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "45 mins",
      servings: 6,
      difficulty: "Medium",
      rating: 4.8,
      category: "Soup",
      tags: ["Vegetarian", "Comfort Food"],
      ingredients: ["Butternut Squash", "Onion", "Vegetable Stock", "Cream", "Nutmeg"],
    },
    {
      id: 302,
      title: "Apple Cinnamon Oatmeal",
      image: "https://images.unsplash.com/photo-1659759965411-f27d0bb3e74c?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "15 mins",
      servings: 2,
      difficulty: "Easy",
      rating: 4.6,
      category: "Breakfast",
      tags: ["Vegetarian", "Warm", "Healthy"],
      ingredients: ["Oats", "Apples", "Cinnamon", "Maple Syrup", "Walnuts"],
    },
    {
      id: 303,
      title: "Roasted Root Vegetables",
      image: "https://images.unsplash.com/photo-1606791422814-b32c705e3e2f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "50 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.5,
      category: "Side Dish",
      tags: ["Vegan", "Gluten-Free"],
      ingredients: ["Carrots", "Parsnips", "Beets", "Sweet Potatoes", "Rosemary"],
    },
    {
      id: 304,
      title: "Pumpkin Risotto",
      image: "https://images.unsplash.com/photo-1736165954825-78d539d7b524?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "40 mins",
      servings: 4,
      difficulty: "Medium",
      rating: 4.7,
      category: "Italian",
      tags: ["Vegetarian", "Comfort Food"],
      ingredients: ["Arborio Rice", "Pumpkin", "Onion", "White Wine", "Parmesan"],
    },
    {
      id: 305,
      title: "Mushroom and Lentil Stew",
      image: "https://images.unsplash.com/photo-1633859159647-11134b20658f?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "35 mins",
      servings: 6,
      difficulty: "Easy",
      rating: 4.6,
      category: "Stew",
      tags: ["Vegan", "High-Protein"],
      ingredients: ["Lentils", "Mushrooms", "Carrots", "Celery", "Thyme"],
    },
    {
      id: 306,
      title: "Apple Crisp",
      image: "https://images.unsplash.com/photo-1696629958314-3d1cf2cbce69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "45 mins",
      servings: 8,
      difficulty: "Easy",
      rating: 4.9,
      category: "Dessert",
      tags: ["Vegetarian", "Baked"],
      ingredients: ["Apples", "Oats", "Brown Sugar", "Cinnamon", "Butter"],
    },
  ],
  winter: [
    {
      id: 401,
      title: "Hearty Vegetable Stew",
      image: "https://images.unsplash.com/photo-1612108438004-257c47560118?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "60 mins",
      servings: 6,
      difficulty: "Medium",
      rating: 4.7,
      category: "Stew",
      tags: ["Vegan", "One-Pot"],
      ingredients: ["Potatoes", "Carrots", "Celery", "Onion", "Vegetable Stock"],
    },
    {
      id: 402,
      title: "Citrus Salad with Honey Dressing",
      image: "https://images.unsplash.com/photo-1714281121101-fdae2ed0272a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "15 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.5,
      category: "Salad",
      tags: ["Vegetarian", "Fresh", "Vitamin C"],
      ingredients: ["Oranges", "Grapefruit", "Mixed Greens", "Honey", "Mint"],
    },
    {
      id: 403,
      title: "Roasted Brussels Sprouts with Balsamic Glaze",
      image: "https://images.unsplash.com/photo-1549466327-f7cd635ff85a?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "25 mins",
      servings: 4,
      difficulty: "Easy",
      rating: 4.6,
      category: "Side Dish",
      tags: ["Vegan", "Gluten-Free"],
      ingredients: ["Brussels Sprouts", "Olive Oil", "Balsamic Vinegar", "Garlic", "Maple Syrup"],
    },
    {
      id: 404,
      title: "Potato Leek Soup",
      image: "https://images.unsplash.com/photo-1697898108747-8f43fe5f9fd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "40 mins",
      servings: 6,
      difficulty: "Medium",
      rating: 4.8,
      category: "Soup",
      tags: ["Vegetarian", "Comfort Food"],
      ingredients: ["Potatoes", "Leeks", "Vegetable Stock", "Cream", "Thyme"],
    },
    {
      id: 405,
      title: "Winter Squash and Kale Pasta",
      image: "https://images.unsplash.com/photo-1566640445929-28a1aa99e0d7?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "30 mins",
      servings: 4,
      difficulty: "Medium",
      rating: 4.6,
      category: "Italian",
      tags: ["Vegetarian", "Hearty"],
      ingredients: ["Pasta", "Butternut Squash", "Kale", "Garlic", "Parmesan"],
    },
    {
      id: 406,
      title: "Spiced Hot Chocolate",
      image: "https://images.unsplash.com/photo-1605547763584-bf69034a327e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "10 mins",
      servings: 2,
      difficulty: "Easy",
      rating: 4.9,
      category: "Beverage",
      tags: ["Vegetarian", "Warm", "Comfort Food"],
      ingredients: ["Milk", "Dark Chocolate", "Cinnamon", "Nutmeg", "Vanilla"],
    },
  ],
}

// Seasonal ingredients information
const seasonalIngredients = {
  spring: ["Asparagus", "Peas", "Rhubarb", "Spinach", "Strawberries", "Radishes", "Artichokes", "Spring Onions"],
  summer: ["Tomatoes", "Zucchini", "Corn", "Berries", "Watermelon", "Peaches", "Cucumbers", "Bell Peppers"],
  fall: [
    "Pumpkin",
    "Apples",
    "Butternut Squash",
    "Sweet Potatoes",
    "Brussels Sprouts",
    "Cauliflower",
    "Beets",
    "Pears",
  ],
  winter: ["Citrus Fruits", "Kale", "Potatoes", "Carrots", "Turnips", "Leeks", "Winter Squash", "Cabbage"],
}

// Get all unique tags from all recipes
const allTags = Array.from(
  new Set(
    Object.values(seasonalRecipes)
      .flat()
      .flatMap((recipe) => recipe.tags),
  ),
)

// Get all unique categories from all recipes
const allCategories = Array.from(
  new Set(
    Object.values(seasonalRecipes)
      .flat()
      .map((recipe) => recipe.category),
  ),
)

// Get all unique difficulties
const allDifficulties = Array.from(
  new Set(
    Object.values(seasonalRecipes)
      .flat()
      .map((recipe) => recipe.difficulty),
  ),
)

export default function SeasonalRecipesPage() {
  const [currentSeason, setCurrentSeason] = useState("spring")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [savedRecipes, setSavedRecipes] = useState<number[]>([])
  const [likedRecipes, setLikedRecipes] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter recipes based on search query and selected filters
  const filteredRecipes = seasonalRecipes[currentSeason as keyof typeof seasonalRecipes].filter((recipe) => {
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
              Seasonal <span className="gradient-text">Recipes</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Eat with the seasons and enjoy the freshest ingredients at their peak flavor and nutrition.
            </p>
          </div>
        </div>
      </section>

      {/* Season Tabs */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="spring" value={currentSeason} onValueChange={setCurrentSeason} className="mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-8">
              <TabsTrigger value="spring" className="">
                Spring
              </TabsTrigger>
              <TabsTrigger value="summer" className="">
                Summer
              </TabsTrigger>
              <TabsTrigger value="fall" className="">
                Fall
              </TabsTrigger>
              <TabsTrigger value="winter" className="">
                Winter
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Seasonal Ingredients */}
          <Card className="p-6 mb-8 border border-border bg-muted/20">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="md:w-1/4">
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">
                    {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)} Ingredients
                  </h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  These ingredients are at their peak during {currentSeason}. Using seasonal produce reduces food miles
                  and gives you the best flavor and nutrition.
                </p>
              </div>
              <div className="md:w-3/4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {seasonalIngredients[currentSeason as keyof typeof seasonalIngredients].map((ingredient, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 bg-card rounded-md border border-border flex items-center gap-2 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Search and Filter Section */}
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

      {/* Seasonal Cooking Tips */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)}{" "}
            <span className="gradient-text">Cooking Tips</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentSeason === "spring" && (
              <>
                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Embrace Fresh Herbs</h3>
                  <p className="text-muted-foreground">
                    Spring is the perfect time to incorporate fresh herbs like mint, chives, and dill into your cooking.
                    They add bright flavors to salads, soups, and pasta dishes.
                  </p>
                </Card>
                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Light Cooking Methods</h3>
                  <p className="text-muted-foreground">
                    As the weather warms up, switch to lighter cooking methods like steaming, blanching, and quick
                    sautéing to preserve the delicate flavors of spring vegetables.
                  </p>
                </Card>
                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Celebrate Asparagus</h3>
                  <p className="text-muted-foreground">
                    Asparagus is at its peak in spring. Look for firm stalks with tight tips. Roast, grill, or steam
                    them for a simple side dish, or add to risottos and pasta.
                  </p>
                </Card>
              </>
            )}
            {currentSeason === "summer" && (
              <>
                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Grill Everything</h3>
                  <p className="text-muted-foreground">
                    Summer is grilling season! Try grilling not just proteins but also vegetables, fruits like peaches,
                    and even pizza for added smoky flavor and to keep your kitchen cool.
                  </p>
                </Card>
                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-3">No-Cook Meals</h3>
                  <p className="text-muted-foreground">
                    When it's too hot to cook, prepare refreshing no-cook meals like gazpacho, cold noodle salads, and
                    sandwiches with fresh summer produce.
                  </p>
                </Card>
                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Preserve the Bounty</h3>
                  <p className="text-muted-foreground">
                    Summer produces an abundance of fruits and vegetables. Learn basic preserving techniques like
                    freezing, pickling, and making jams to enjoy summer flavors year-round.
                  </p>
                </Card>
              </>
            )}
            {currentSeason === "fall" && (
              <>
                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Roast Root Vegetables</h3>
                  <p className="text-muted-foreground">
                    Fall is perfect for roasting root vegetables like carrots, parsnips, and beets. Toss with olive oil,
                    salt, and herbs for a simple, hearty side dish.
                  </p>
                </Card>
                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Embrace Squash</h3>
                  <p className="text-muted-foreground">
                    From butternut to acorn, fall squashes are versatile ingredients. Use them in soups, risottos, or
                    simply roasted with maple syrup and cinnamon.
                  </p>
                </Card>
                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Warm Spices</h3>
                  <p className="text-muted-foreground">
                    Incorporate warming spices like cinnamon, nutmeg, and cloves into your fall cooking. They pair
                    perfectly with apples, pumpkins, and other fall produce.
                  </p>
                </Card>
              </>
            )}
            {currentSeason === "winter" && (
              <>
                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Slow Cooking</h3>
                  <p className="text-muted-foreground">
                    Winter is the perfect time for slow cooking methods. Use your slow cooker or Dutch oven for hearty
                    stews, soups, and braises that warm you from the inside out.
                  </p>
                </Card>
                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Citrus Brightness</h3>
                  <p className="text-muted-foreground">
                    Citrus fruits are at their peak in winter. Use their zest and juice to brighten up heavy winter
                    dishes and add a burst of vitamin C to your meals.
                  </p>
                </Card>
                <Card className="p-6 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Hearty Greens</h3>
                  <p className="text-muted-foreground">
                    Winter greens like kale, collards, and Swiss chard are nutritional powerhouses. Massage them with
                    olive oil for salads or add to soups and pasta dishes.
                  </p>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Seasonal Meal Planning */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Seasonal Meal <span className="gradient-text">Planning</span>
            </h2>
            <p className="text-muted-foreground">
              Planning your meals around seasonal ingredients helps reduce food waste, saves money, and ensures you're
              getting the freshest, most nutritious food.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-4">Benefits of Seasonal Eating</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Better flavor and nutrition from peak-season produce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Lower environmental impact with reduced food miles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Cost savings as seasonal produce is typically more affordable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Support for local farmers and food systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                    <span>Natural variety in your diet throughout the year</span>
                  </li>
                </ul>

              </div>
              <div className="bg-muted h-64 md:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1744116432662-dbe90acb4a63?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Seasonal meal planning"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
