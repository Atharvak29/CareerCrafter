import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mermaid from "mermaid";

interface Milestone {
  title: string;
  description: string;
  timeframe: string;
}

const AICareerMap = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { chosenPath } = location.state || {};
  const [mermaidCode, setMermaidCode] = useState("");
  const [timeline, setTimeline] = useState<Milestone[]>([]);

  useEffect(() => {
    const generateRoadmap = async () => {
      try {
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
          Generate a custom career roadmap for a user interested in becoming a ${chosenPath}.
          The output should be a JSON object with two properties: "mermaidCode" and "timeline".
          - "mermaidCode" should be a Mermaid flowchart definition.
          - "timeline" should be an array of milestone objects, each with a title, description, and timeframe.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        
        const cleanedText = text.replace(/```json\n|```/g, "");
        const { mermaidCode, timeline } = JSON.parse(cleanedText);

        setMermaidCode(mermaidCode);
        setTimeline(timeline);
      } catch (error) {
        console.error("Error generating roadmap:", error);
      }
    };

    if (chosenPath) {
      generateRoadmap();
    }
  }, [chosenPath]);

  useEffect(() => {
    if (mermaidCode) {
      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded();
    }
  }, [mermaidCode]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/career-discovery")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-primary">AI Career Map</h1>
              <p className="text-muted-foreground">Your personalized roadmap to success</p>
            </div>
          </div>
          <Button
            variant="hero"
            onClick={() => navigate("/congratulations")}
          >
            View Results
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Mermaid Flowchart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Your Career Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              {mermaidCode && <div className="mermaid">{mermaidCode}</div>}
            </CardContent>
          </Card>

          {/* Textual Timeline */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Your Learning Journey
            </h3>
            <div className="space-y-4">
              {timeline.map((milestone, index) => (
                <Card
                  key={index}
                  className="shadow-soft transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Timeline Dot */}
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-primary text-primary-foreground">
                          {index + 1}
                        </div>
                        {index < timeline.length - 1 && (
                          <div className="w-0.5 h-12 mt-2 bg-primary" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-lg">{milestone.title}</h4>
                            <p className="text-muted-foreground">{milestone.description}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {milestone.timeframe}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AICareerMap;