import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code, ChefHat, Brain, Music, Palette, Camera, Dumbbell, Globe, BookOpen, Wrench, Gamepad2, Zap, ArrowLeft } from "lucide-react";

const categories = [
  { id: "programming", name: "Programming", icon: Code },
  { id: "cooking", name: "Cooking", icon: ChefHat },
  { id: "philosophy", name: "Philosophy", icon: Brain },
  { id: "music", name: "Music", icon: Music },
  { id: "art", name: "Art", icon: Palette },
  { id: "photography", name: "Photography", icon: Camera },
  { id: "fitness", name: "Fitness", icon: Dumbbell },
  { id: "language", name: "Language", icon: Globe },
  { id: "literature", name: "Literature", icon: BookOpen },
  { id: "diy", name: "DIY & Crafts", icon: Wrench },
  { id: "gaming", name: "Gaming", icon: Gamepad2 },
  { id: "productivity", name: "Productivity", icon: Zap },
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
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/")}
          className="text-foreground hover:bg-muted"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <h1 className="text-lg font-bold text-foreground">Categories</h1>
        
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {/* Category Grid - Smaller cards */}
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        {categories.map((category, index) => (
          <Card
            key={category.id}
            className={`aspect-square flex flex-col items-center justify-center p-2 cursor-pointer transition-all duration-200 border border-border hover:border-primary ${
              selectedCategory === category.id 
                ? "border-primary bg-primary/10" 
                : "bg-card"
            }`}
            onClick={() => handleCategorySelect(category.id)}
          >
            <div className="w-8 h-8 mb-1 bg-primary rounded-lg flex items-center justify-center">
              <category.icon className="w-4 h-4 text-primary-foreground" />
            </div>
            <h3 className="text-xs font-medium text-center text-foreground leading-tight">
              {category.name}
            </h3>
          </Card>
        ))}
      </div>

      {/* Role Info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {userRole === "creator" 
            ? "Select a category to share your expertise" 
            : "Choose a category to start learning"}
        </p>
      </div>
    </div>
  );
};

export default CategorySelection;