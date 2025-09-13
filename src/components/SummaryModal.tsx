import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Video } from "@/data/mockVideos";

interface SummaryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: Video;
}

const SummaryModal = ({ open, onOpenChange, video }: SummaryModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg animate-slide-up">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Summary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">
              {video.title}
            </h3>
            <p className="text-sm text-muted-foreground">by {video.author}</p>
          </div>

          <Card className="p-4 border border-secondary/20 bg-secondary/5">
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed">
                {video.summary}
              </p>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SummaryModal;