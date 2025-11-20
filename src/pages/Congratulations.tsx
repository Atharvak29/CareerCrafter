import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, BookOpen, Loader2 } from "lucide-react";
import mermaid from "mermaid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface OnboardingData {
  name: string;
  education: string;
  interests: string[];
}

interface LocationState {
  onboardingData?: OnboardingData;
  skills?: string[];
  chosenPath?: string;
  careerData?: any[];
}

interface Milestone {
  title: string;
  description: string;
  timeframe: string;
}

const Congratulations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [mermaidCode, setMermaidCode] = useState("");
  const [timeline, setTimeline] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateRoadmap = async () => {
      try {
        setLoading(true);
        const payload = {
            chosenPath: state?.chosenPath,
            skills: state?.skills || [],
            careerData: state?.careerData 
        };

        const response = await fetch("http://localhost:8000/api/generate-roadmap", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("Failed to generate roadmap");

        const data = await response.json();
        setMermaidCode(data.mermaidCode);
        setTimeline(data.timeline);

      } catch (error) {
        console.error("Error generating roadmap:", error);
        toast.error("Could not generate your roadmap. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    if (state?.chosenPath) {
      generateRoadmap();
    }
  }, [state?.chosenPath, state?.careerData, state?.skills]);

  useEffect(() => {
    if (mermaidCode && !loading) {
      try {
        mermaid.initialize({ startOnLoad: true });
        mermaid.contentLoaded();
      } catch (e) {
          console.error("Mermaid render error", e);
      }
    }
  }, [mermaidCode, loading]);

  const userName = state?.onboardingData?.name || "Career Explorer";

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center py-10">
      <div className="text-center space-y-6 max-w-4xl mx-auto px-4 w-full">
        <h1 className="text-4xl font-bold">
          Congratulations, {userName}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Here is your personalized roadmap to becoming a <span className="text-primary font-bold">{state?.chosenPath}</span>.
        </p>

        {loading ? (
             <div className="flex flex-col items-center justify-center py-12 bg-card rounded-lg shadow-sm">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p>Crafting your personalized roadmap...</p>
             </div>
        ) : (
            <>
                <Card className="shadow-card overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-2xl">Strategy Overview</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    {mermaidCode && <div className="mermaid">{mermaidCode}</div>}
                </CardContent>
                </Card>

                <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2 justify-center pt-4">
                    <BookOpen className="h-5 w-5" />
                    Your Learning Journey
                </h3>
                <div className="space-y-4">
                    {timeline.map((milestone, index) => (
                    <Card key={index} className="shadow-soft transition-all text-left border-l-4 border-l-primary">
                        <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-1 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <h4 className="font-semibold text-lg">{milestone.title}</h4>
                                <Badge variant="outline" className="w-fit whitespace-nowrap">
                                {milestone.timeframe}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">{milestone.description}</p>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    ))}
                </div>
                </div>
            </>
        )}

        <div className="flex gap-4 justify-center pt-6">
          <Button variant="outline" onClick={() => navigate("/career-discovery")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Discovery
          </Button>
          <Button onClick={() => navigate("/")}>
            <Home className="h-4 w-4 mr-2" />
            Start New Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;