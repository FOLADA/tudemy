import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code, ChefHat, Brain, Music, Palette, Camera, Dumbbell, Globe } from "lucide-react";

const categories = [
  { id: "programming", name: "Programming", icon: Code, color: "bg-primary" },
  { id: "cooking", name: "Cooking", icon: ChefHat, color: "bg-secondary" },
  { id: "philosophy", name: "Philosophy", icon: Brain, color: "bg-accent" },
  { id: "music", name: "Music", icon: Music, color: "bg-pink" },
  { id: "art", name: "Art", icon: Palette, color: "bg-primary" },
  { id: "photography", name: "Photography", icon: Camera, color: "bg-secondary" },
  { id: "fitness", name: "Fitness", icon: Dumbbell, color: "bg-accent" },
  { id: "language", name: "Language", icon: Globe, color: "bg-pink" },
];

const CategorySelection = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const userRole = localStorage.getItem("userRole") || "learner";

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    localStorage.setItem("selectedCategory", categoryId);
    
    setTimeout(() => {
      if (userRole === "creator") {
        navigate("/create");
      } else {
        navigate("/feed");
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Category
          </h1>
          <p className="text-xl text-muted-foreground">
            {userRole === "creator" 
              ? "Select the category where you'll share your expertise" 
              : "Pick a category to explore and learn from"
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 animate-fade-in ${
                selectedCategory === category.id 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 ${category.color} rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-12`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {category.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Role Selection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;