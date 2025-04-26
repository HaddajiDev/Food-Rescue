import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Leaf, Users, Code, Globe, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
              About <span className="gradient-text">FoodRescue</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're on a mission to reduce food waste through technology and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At FoodRescue, we believe that reducing food waste is one of the most impactful ways to combat climate
                change and resource scarcity. Our mission is to empower individuals to make the most of the food they
                already have.
              </p>
              <p className="text-muted-foreground mb-4">
                We're building technology that makes it easy and enjoyable to transform leftover ingredients into
                delicious meals, saving money and reducing environmental impact in the process.
              </p>
              <div className="flex items-center gap-2 mt-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Environmental Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Food waste accounts for 8% of global greenhouse gas emissions.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Team working on food waste solutions"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-8 w-8 text-primary" />,
                title: "Sustainability",
                description:
                  "We're committed to creating a more sustainable food system through technology and education.",
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Accessibility",
                description: "We believe everyone should have access to tools that help reduce waste and save money.",
              },
              {
                icon: <Code className="h-8 w-8 text-primary" />,
                title: "Innovation",
                description:
                  "We continuously improve our AI technology to provide the best possible recipe recommendations.",
              },
            ].map((value, index) => (
              <div key={index} className="bg-card p-8 rounded-xl shadow-sm border border-border">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Team</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            We're a passionate team of technologists, food lovers, and environmental advocates working together to solve
            the food waste crisis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: "Ahmed Haddaji",
                role: "Developer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Ghaith Belhassen",
                role: "Developer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Imed Edine Amara",
                role: "Developer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Mohamed Hachem Ftirich",
                role: "Designer",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 border-4 border-primary/10">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">Our Technology</h2>
              <p className="text-muted-foreground mb-4">
                FoodRescue uses advanced AI and machine learning to identify ingredients from photos and generate
                personalized recipe recommendations that help reduce food waste.
              </p>
              <p className="text-muted-foreground mb-4">
                Our technology considers factors like ingredient freshness, nutritional value, dietary preferences, and
                flavor combinations to suggest the best possible recipes for your specific situation.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Computer Vision</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Machine Learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Natural Language Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Recipe Generation</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 rounded-xl overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="FoodRescue technology visualization"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us in Reducing <span className="gradient-text">Food Waste</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Together, we can make a significant impact on food waste reduction and create a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-8 py-6 text-lg">
                  Contact Us
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
