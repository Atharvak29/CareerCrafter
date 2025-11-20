import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, X } from "lucide-react";

interface WizardStep {
  title: string;
  description: string;
}

const wizardContent: Record<string, WizardStep[]> = {
  "/": [
    {
      title: "Welcome to CareerCrafter!",
      description:
        "Start by filling out your details to get a personalized solution tailored just for you.",
    },
    {
      title: "Choose Your Path",
      description:
        "Click 'Start my journey' to map your skills and see your graph, or 'Explore more' to browse career videos TikTok-style!",
    },
  ],
  "/career-discovery": [
    {
      title: "Explore Careers",
      description:
        "Watch short videos to discover what different jobs are really like.",
    },
    {
      title: "Like what you see?",
      description:
        "Tap the Heart icon on careers that interest you. This helps us match you better.",
    },
    {
      title: "See Your Matches",
      description:
        "Once you've liked a few options, click 'Matched Careers' to see your personalized report.",
    },
  ],
  "/career-matching": [
    {
      title: "Your Career Matches",
      description:
        "Based on your likes, we've found these top career paths for you.",
    },
    {
      title: "Filter & Explore",
      description:
        "Use the filters to narrow down options, then click 'Explore Path' to see a detailed roadmap.",
    },
  ],
};

export const Wizard = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasSeenWizard, setHasSeenWizard] = useState(false);

  // Unique key for localStorage to track if user has globally skipped/finished the wizard
  const STORAGE_KEY = "careercrafter_wizard_seen";

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen === "true") {
      setHasSeenWizard(true);
    } else {
      // Check if there is content for this page
      if (wizardContent[location.pathname]) {
        setIsOpen(true);
        setCurrentStepIndex(0);
      }
    }
  }, [location.pathname]);

  const handleSkip = () => {
    setIsOpen(false);
    setHasSeenWizard(true);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const handleNext = () => {
    const steps = wizardContent[location.pathname];
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsOpen(false);
      // We don't necessarily set global "seen" here, maybe just for this session/page?
      // But request implies "users won't see the wizard again".
      // Let's keep it open for other pages unless they explicitly Skip.
      // If they finish a flow, we just close it for this page.
    }
  };

  const handleOpenHelp = () => {
    if (wizardContent[location.pathname]) {
      setIsOpen(true);
      setCurrentStepIndex(0);
      // If they ask for help, we re-enable the wizard, but maybe don't clear the "seen" flag globally?
      // Or we just show it temporarily.
    }
  };

  const currentSteps = wizardContent[location.pathname];

  if (!currentSteps) return null;

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse"
        onClick={handleOpenHelp}
        title="Need Help?"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>
    );
  }

  const step = currentSteps[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:justify-center p-4 pointer-events-none">
      {/* Overlay (optional, keeping it transparent for now so users can see the app) */}
      
      <Card className="w-full max-w-md shadow-2xl pointer-events-auto border-primary/20 animate-in fade-in zoom-in duration-300">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl text-primary">
                {step.title}
              </CardTitle>
              <CardDescription className="mt-1">
                Step {currentStepIndex + 1} of {currentSteps.length}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 -mr-2 -mt-2"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{step.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Button variant="ghost" size="sm" onClick={handleSkip}>
            Don't show again
          </Button>
          <Button variant="default" size="sm" onClick={handleNext}>
            {currentStepIndex === currentSteps.length - 1 ? "Got it" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};