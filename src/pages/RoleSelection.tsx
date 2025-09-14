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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tudemy
          </h1>
          <p className="text-base text-muted-foreground mb-6">
            Welcome to the future of learning!
          </p>
          <h2 className="text-lg font-semibold text-foreground">
            Are you a Course Creator or a Learner?
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <Card 
            className={`p-4 cursor-pointer transition-all duration-200 border border-border hover:border-primary ${
              selectedRole === "creator" ? "border-primary bg-primary/10" : "bg-card"
            }`}
            onClick={() => handleRoleSelect("creator")}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h3 className="text-base font-bold text-foreground mb-1">Course Creator</h3>
                <p className="text-sm text-muted-foreground">
                  Share your knowledge and create engaging educational content.
                </p>
              </div>
            </div>
          </Card>

          <Card 
            className={`p-4 cursor-pointer transition-all duration-200 border border-border hover:border-primary ${
              selectedRole === "learner" ? "border-primary bg-primary/10" : "bg-card"
            }`}
            onClick={() => handleRoleSelect("learner")}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h3 className="text-base font-bold text-foreground mb-1">Learner</h3>
                <p className="text-sm text-muted-foreground">
                  Discover new skills through interactive videos and quizzes.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;