import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TrendingUp, DollarSign, Target, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface OnboardingData {
  name: string;
  education: string;
  interests: string[];
}

interface CareerVideo {
  id: string;
  title: string;
  company: string;
  role: string;
  tags: string[];
}

interface CareerPathSuggestionsProps {
  onboardingData: OnboardingData | null;
  skills: string[];
  userLikedCareers: CareerVideo[];
  onChoosePath: (careerPath: string) => void;
  onBack: () => void;
}

interface CareerPath {
  id: string;
  title: string;
  matchScore: number;
  growthRate: string;
  averageSalary: string;
  requiredSkills: string[];
  industry: string;
  description: string;
}

const CareerPathSuggestions = ({ onboardingData, skills, userLikedCareers, onChoosePath, onBack }: CareerPathSuggestionsProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [goalType, setGoalType] = useState<string>("long-term");
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareerPaths = async () => {
      try {
        setLoading(true);
        
        const payload = {
          likedCareerIds: userLikedCareers.map(c => c.id),
          likedCareersDetails: userLikedCareers.map(c => ({
            id: c.id,
            title: c.title,
            company: c.company,
            role: c.role,
            tags: c.tags
          }))
        };

        // Make sure this matches your backend port (8000)
        const response = await fetch("http://localhost:8000/api/generate-career-paths", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        setCareerPaths(data);
      } catch (error) {
        console.error("Error fetching career paths:", error);
        toast.error("Failed to connect to AI server. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    if (userLikedCareers && userLikedCareers.length > 0) {
        fetchCareerPaths();
    }
  }, [userLikedCareers]);

  const filteredPaths = careerPaths.filter(path => {
    if (selectedIndustry !== "all" && path.industry !== selectedIndustry) {
      return false;
    }
    return true;
  });

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">CareerCraft</h1>
            <div className="text-sm text-muted-foreground">
              Step 3 of 6: AI Career Suggestions
            </div>
          </div>
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
        </div>

        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">
              Your Skills Match These Careers
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Based on your profile, here are paths where you can thrive.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 items-center justify-center bg-card p-6 rounded-lg shadow-soft">
            <div className="space-y-2">
              <label className="text-sm font-medium">Filter by Industry</label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Creative Arts">Creative Arts</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg text-muted-foreground">Analyzing your profile with AI...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaths.map((career) => (
                <Card key={career.id} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg leading-tight">{career.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {career.industry}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {career.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Match:</span>
                      <span className={`font-bold ${getMatchScoreColor(career.matchScore)}`}>
                        {career.matchScore}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Growth:</span>
                      <span className="font-bold text-green-600">{career.growthRate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">Salary:</span>
                      <span className="font-bold text-accent">{career.averageSalary}</span>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Key Skills:</span>
                      <div className="flex flex-wrap gap-1">
                        {career.requiredSkills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant={skills.includes(skill) ? "default" : "outline"} className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="hero"
                      className="w-full mt-4 group-hover:shadow-glow"
                      onClick={() => onChoosePath(career.title)}
                    >
                      Explore Path
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPathSuggestions;