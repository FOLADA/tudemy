import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { Video } from "@/data/mockVideos";

interface QuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: Video;
}

const QuizModal = ({ open, onOpenChange, video }: QuizModalProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowResult(false);
    }, 200);
  };

  const isCorrect = selectedAnswer === video.quiz.correct;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg animate-slide-up">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Quick Quiz
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">
              {video.title}
            </h3>
            <p className="text-sm text-muted-foreground">by {video.author}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">
              {video.quiz.question}
            </h4>

            <div className="space-y-2">
              {video.quiz.options.map((option, index) => (
                <Card
                  key={index}
                  className={`p-3 cursor-pointer transition-all duration-200 border-2 ${
                    selectedAnswer === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  } ${
                    showResult && index === video.quiz.correct
                      ? "border-green-500 bg-green-50"
                      : showResult && selectedAnswer === index && index !== video.quiz.correct
                      ? "border-red-500 bg-red-50"
                      : ""
                  }`}
                  onClick={() => !showResult && setSelectedAnswer(index)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{option}</span>
                    {showResult && index === video.quiz.correct && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {showResult && selectedAnswer === index && index !== video.quiz.correct && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {showResult && (
              <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-50" : "bg-red-50"}`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                {!isCorrect && (
                  <p className="text-sm text-muted-foreground">
                    The correct answer is: {video.quiz.options[video.quiz.correct]}
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-2">
              {!showResult ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="flex-1 bg-gradient-primary text-white"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  onClick={handleClose}
                  className="flex-1"
                  variant="outline"
                >
                  Close
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;