import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Heart, MessageCircle, Share, MoreHorizontal, Music, Search, User, Play } from "lucide-react";
import { mockVideos, Video } from "@/data/mockVideos";
import QuizModal from "@/components/QuizModal";
import SummaryModal from "@/components/SummaryModal";
import PracticalModal from "@/components/PracticalModal";

const VideoFeed = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const selectedCategory = localStorage.getItem("selectedCategory");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    if (!selectedCategory) {
      navigate("/categories");
      return;
    }

    // Filter videos by selected category
    const categoryVideos = mockVideos.filter(video => video.category === selectedCategory);
    
    // Ensure we have exactly 5 videos by duplicating if necessary
    let finalVideos = [...categoryVideos];
    while (finalVideos.length < 5 && categoryVideos.length > 0) {
      finalVideos = [...finalVideos, ...categoryVideos];
    }
    
    // Take exactly 5 videos
    setVideos(finalVideos.slice(0, 5));
  }, [selectedCategory, navigate]);

  const toggleLike = (videoId: string) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const openModal = (modalType: string, video: Video) => {
    setActiveModal(modalType);
    setCurrentVideo(video);
  };

  if (!selectedCategory || videos.length === 0) return null;

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-md mb-4">
        <div className="flex items-center justify-between py-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/categories")}
            className="text-foreground hover:bg-muted"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="text-lg font-bold text-foreground">Tudemy</h1>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/")}
            className="text-foreground hover:bg-muted"
          >
            <Home className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Video Feed Container - Smaller size */}
      <div className="w-full max-w-md bg-card rounded-xl border border-border overflow-hidden">
        <div className="relative w-full aspect-[9/16]"> {/* 9:16 aspect ratio for video */}
          {videos.map((video, index) => (
            <div
              key={`${video.id}-${index}`}
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Video Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
              
              {/* Video Content - Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                    <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                  </div>
                  <p className="text-foreground/90 text-base">Video Content</p>
                </div>
              </div>
              
              {/* Right Sidebar */}
              <div className="absolute right-2 bottom-32 z-20 flex flex-col items-center gap-3">
                {/* Profile Avatar */}
                <div className="relative">
                  <div className="w-8 h-8 rounded-full border border-foreground bg-gradient-to-br from-primary to-secondary"></div>
                </div>
                
                {/* Like Button */}
                <div className="flex flex-col items-center">
                  <button 
                    className={`w-8 h-8 bg-muted rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-muted/80 ${
                      likedVideos.has(video.id) ? 'bg-primary' : ''
                    }`}
                    onClick={() => toggleLike(video.id)}
                  >
                    <Heart className={`w-4 h-4 ${likedVideos.has(video.id) ? 'fill-primary text-primary-foreground' : 'text-foreground'}`} />
                  </button>
                  <span className="text-foreground text-xs font-medium mt-1">
                    {Math.floor(Math.random() * 100)}K
                  </span>
                </div>
                
                {/* Comment Button */}
                <div className="flex flex-col items-center">
                  <button className="w-8 h-8 bg-muted rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-muted/80">
                    <MessageCircle className="w-4 h-4 text-foreground" />
                  </button>
                  <span className="text-foreground text-xs font-medium mt-1">
                    {Math.floor(Math.random() * 10)}K
                  </span>
                </div>
                
                {/* Share Button */}
                <div className="flex flex-col items-center">
                  <button className="w-8 h-8 bg-muted rounded-full flex items-center justify-center cursor-pointer transition-all hover:bg-muted/80">
                    <Share className="w-4 h-4 text-foreground" />
                  </button>
                </div>
              </div>
              
              {/* Bottom Overlay */}
              <div className="absolute bottom-0 left-0 right-12 z-10 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-foreground text-sm font-semibold">@{video.author.replace(/\s+/g, '').toLowerCase()}</span>
                </div>
                
                <p className="text-foreground text-xs leading-[1.3] mb-1 line-clamp-2">
                  {video.summary}
                </p>
                
                <div className="flex items-center gap-1 text-xs text-foreground/80">
                  <Music className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">
                    Original Sound - {video.author}
                  </span>
                </div>
              </div>
              
              {/* Bottom Action Buttons */}
              <div className="absolute bottom-3 left-3 right-12 z-10 flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs"
                  onClick={() => openModal("quiz", video)}
                >
                  <Play className="w-3 h-3 mr-1" />
                  Quiz
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="flex-1 h-8 text-xs"
                  onClick={() => openModal("summary", video)}
                >
                  Summary
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 h-8 text-xs border-foreground text-foreground hover:bg-foreground hover:text-background"
                  onClick={() => openModal("practical", video)}
                >
                  Example
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Info */}
      <div className="w-full max-w-md mt-3">
        <div className="bg-muted rounded-lg p-2 text-center">
          <p className="text-xs text-foreground">
            Viewing <span className="text-primary font-medium">#{selectedCategory}</span> videos
          </p>
        </div>
      </div>

      {/* Modals */}
      {currentVideo && (
        <>
          <QuizModal 
            open={activeModal === "quiz"}
            onOpenChange={() => setActiveModal(null)}
            video={currentVideo}
          />
          
          <SummaryModal 
            open={activeModal === "summary"}
            onOpenChange={() => setActiveModal(null)}
            video={currentVideo}
          />
          
          <PracticalModal 
            open={activeModal === "practical"}
            onOpenChange={() => setActiveModal(null)}
            video={currentVideo}
          />
        </>
      )}
    </div>
  );
};

export default VideoFeed;