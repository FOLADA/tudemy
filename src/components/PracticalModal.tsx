import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code, Copy } from "lucide-react";
import { Video } from "@/data/mockVideos";
import { useToast } from "@/hooks/use-toast";

interface PracticalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: Video;
}

const PracticalModal = ({ open, onOpenChange, video }: PracticalModalProps) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(video.practicalExample);
    toast({
      title: "Copied!",
      description: "Practical example copied to clipboard.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl animate-slide-up">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent flex items-center gap-2">
            <Code className="w-5 h-5" />
            Practical Example
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">
              {video.title}
            </h3>
            <p className="text-sm text-muted-foreground">by {video.author}</p>
          </div>

          <Card className="p-4 border border-accent/20 bg-accent/5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground">Try this example:</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="hover:bg-accent hover:text-accent-foreground"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            </div>
            
            <div className="bg-muted rounded-md p-4 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap text-foreground">
                {video.practicalExample}
              </pre>
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

export default PracticalModal;