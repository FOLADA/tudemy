import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, User, Heart, MessageCircle, Share } from "lucide-react";
import { Video } from "@/data/mockVideos";
import QuizModal from "./QuizModal";
import SummaryModal from "./SummaryModal";
import PracticalModal from "./PracticalModal";

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const userRole = localStorage.getItem("userRole") || "learner";

  return (
    <>
      <Card className="w-full max-w-sm mx-auto bg-card border-0 shadow-none">
        <div className="relative">
          <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                <Play className="w-8 h-8 text-white" />
              </div>
              <p className="text-white/90 px-4 font-medium">Video Preview</p>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-bold text-white text-lg mb-1 line-clamp-2">
              {video.title}
            </h3>
            
            <div className="flex items-center gap-2 text-sm text-white/90 mb-3">
              <User className="w-4 h-4" />
              <span className="truncate">{video.author}</span>
            </div>

            <div className="flex gap-3">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full h-12 w-12 bg-black/30 hover:bg-black/50"
                onClick={() => setLiked(!liked)}
              >
                <Heart 
                  className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                />
              </Button>
              
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full h-12 w-12 bg-black/30 hover:bg-black/50"
                onClick={() => setActiveModal("quiz")}
              >
                <MessageCircle className="h-5 w-5 text-white" />
              </Button>
              
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full h-12 w-12 bg-black/30 hover:bg-black/50"
                onClick={() => setActiveModal("summary")}
              >
                <Share className="h-5 w-5 text-white" />
              </Button>
              
              {userRole === "learner" && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full h-12 w-12 bg-gradient-primary hover:opacity-90 ml-auto"
                  onClick={() => setActiveModal("practical")}
                >
                  <Play className="h-5 w-5 text-white" />
                </Button>
              )}
            </div>
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