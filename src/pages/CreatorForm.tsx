import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Video, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreatorForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoFile: null as File | null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const selectedCategory = localStorage.getItem("selectedCategory");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, videoFile: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate course creation
    setIsSubmitted(true);
    
    toast({
      title: "Course Created!",
      description: "Your course has been successfully uploaded.",
    });

    // Redirect to feed after a delay
    setTimeout(() => {
      navigate("/feed");
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center animate-scale-in">
          <div className="w-16 h-16 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Course Created Successfully!
          </h2>
          <p className="text-muted-foreground mb-6">
            Your course "{formData.title}" has been added to the {selectedCategory} category.
          </p>
          <Button 
            onClick={() => navigate("/feed")}
            className="bg-gradient-primary text-white"
          >
            View in Feed
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/categories")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create Course</h1>
            <p className="text-muted-foreground">
              Share your knowledge in the <span className="text-primary font-medium">#{selectedCategory}</span> category
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Upload */}
          <Card className="p-6">
            <Label htmlFor="video-upload" className="text-lg font-semibold mb-4 block">
              Upload Video
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                  {formData.videoFile ? (
                    <Video className="w-8 h-8 text-white" />
                  ) : (
                    <Upload className="w-8 h-8 text-white" />
                  )}
                </div>
                <p className="text-foreground font-medium mb-2">
                  {formData.videoFile ? formData.videoFile.name : "Click to upload video"}
                </p>
                <p className="text-sm text-muted-foreground">
                  MP4, MOV, AVI up to 500MB
                </p>
              </label>
            </div>
          </Card>

          {/* Course Details */}
          <Card className="p-6 space-y-4">
            <div>
              <Label htmlFor="title" className="text-lg font-semibold">
                Course Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter an engaging title for your course"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-lg font-semibold">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Describe what learners will gain from this course..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="mt-2 min-h-32"
              />
            </div>

            <div>
              <Label className="text-lg font-semibold">Category</Label>
              <div className="mt-2 p-3 bg-muted rounded-md">
                <span className="text-primary font-medium">#{selectedCategory}</span>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/categories")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary text-white"
            >
              Create Course
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatorForm;