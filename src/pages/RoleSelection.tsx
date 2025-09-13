import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, BookOpen } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    // Store role in localStorage for later use
    localStorage.setItem("userRole", role);
    setTimeout(() => {
      navigate("/categories");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-4xl text-center animate-fade-in">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 break-words">
            Tudemy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 px-4">
            Welcome to the future of learning! Choose your path:
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground px-4">
            Are you a Course Creator or a Learner?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card 
            className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 ${
              selectedRole === "creator" ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/50"
            }`}
            onClick={() => handleRoleSelect("creator")}
          >
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
               <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Course Creator</h3>
               <p className="text-sm md:text-base text-muted-foreground px-2">
                 Share your knowledge and create engaging educational content for learners worldwide.
               </p>
            </div>
          </Card>

          <Card 
            className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 ${
              selectedRole === "learner" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
            }`}
            onClick={() => handleRoleSelect("learner")}
          >
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-accent rounded-full flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
               <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Learner</h3>
               <p className="text-sm md:text-base text-muted-foreground px-2">
                 Discover new skills through interactive videos, quizzes, and practical examples.
               </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;