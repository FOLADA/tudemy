import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import VideoCard from "@/components/VideoCard";
import { mockVideos, Video } from "@/data/mockVideos";

const VideoFeed = () => {
  const navigate = useNavigate();
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const selectedCategory = localStorage.getItem("selectedCategory");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (!selectedCategory) {
      navigate("/categories");
      return;
    }

    // Filter videos by selected category
    const categoryVideos = mockVideos.filter(video => video.category === selectedCategory);
    setFilteredVideos(categoryVideos);
  }, [selectedCategory, navigate]);

  if (!selectedCategory) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/categories")}
            className="hover:bg-muted text-xs md:text-sm"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Categories</span>
          </Button>
          
          <h1 className="text-base md:text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Tudemy
          </h1>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/")}
            className="hover:bg-muted"
          >
            <Home className="w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </div>
      </div>

      {/* Video Feed */}
      <div className="max-w-2xl mx-auto pb-20 md:pb-8">
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filteredVideos.map((video, index) => (
              <div 
                key={video.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <div className="text-2xl md:text-4xl">📹</div>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
              No Videos Yet
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-6 px-4">
              There are no videos available in the {selectedCategory} category yet.
            </p>
            <Button onClick={() => navigate("/categories")} className="text-sm">
              Choose Different Category
            </Button>
          </div>
        )}
      </div>

      {/* Category Info */}
      <div className="fixed bottom-4 left-4 right-4 max-w-2xl mx-auto">
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-lg p-3 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            Viewing <span className="text-primary font-medium">#{selectedCategory}</span> videos
            {userRole === "creator" && (
              <Button 
                size="sm" 
                className="ml-2 bg-gradient-primary text-white text-xs"
                onClick={() => navigate("/create")}
              >
                Create Course
              </Button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;