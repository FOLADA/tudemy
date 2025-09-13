import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, User, Clock } from "lucide-react";
import { Video } from "@/data/mockVideos";
import QuizModal from "./QuizModal";
import SummaryModal from "./SummaryModal";
import PracticalModal from "./PracticalModal";

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const userRole = localStorage.getItem("userRole") || "learner";

  return (
    <>
      <Card className="w-full max-w-sm mx-auto bg-card border-2 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg animate-scale-in">
        <div className="relative">
          <div className="aspect-[9/16] bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-xs md:text-sm text-white/80 px-4">Video Preview</p>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          </div>
          
          <div className="p-3 md:p-4">
            <h3 className="font-semibold text-base md:text-lg text-foreground mb-2 line-clamp-2">
              {video.title}
            </h3>
            
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-4">
              <User className="w-3 h-3 md:w-4 md:h-4" />
              <span className="truncate">{video.author}</span>
              <span className="text-primary font-medium text-xs">
                #{video.category}
              </span>
            </div>

            {userRole === "learner" && (
              <div className="flex gap-1 md:gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setActiveModal("quiz")}
                >
                  Quiz
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs hover:bg-secondary hover:text-secondary-foreground"
                  onClick={() => setActiveModal("summary")}
                >
                  Summary
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-xs hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setActiveModal("practical")}
                >
                  Example
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      <QuizModal 
        open={activeModal === "quiz"}
        onOpenChange={() => setActiveModal(null)}
        video={video}
      />
      
      <SummaryModal 
        open={activeModal === "summary"}
        onOpenChange={() => setActiveModal(null)}
        video={video}
      />
      
      <PracticalModal 
        open={activeModal === "practical"}
        onOpenChange={() => setActiveModal(null)}
        video={video}
      />
    </>
  );
};

export default VideoCard;