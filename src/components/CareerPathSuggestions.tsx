import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TrendingUp, DollarSign, Target, ArrowRight } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface OnboardingData {
  name: string;
  education: string;
  interests: string[];
}

interface CareerPathSuggestionsProps {
  onboardingData: OnboardingData | null;
  skills: string[];
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

const CareerPathSuggestions = ({ onboardingData, skills, onChoosePath, onBack }: CareerPathSuggestionsProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [goalType, setGoalType] = useState<string>("long-term");
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);

  useEffect(() => {
    const fetchCareerPaths = async () => {
      try {
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
          Based on the following user data, generate 6 custom job recommendations in JSON format.
          
          User Data:
          - Onboarding Data: ${JSON.stringify(onboardingData)}
          - Skills: ${JSON.stringify(skills)}

          JSON output should follow this structure:
          [
            {
              "id": "job-id",
              "title": "Job Title",
              "matchScore": 92,
              "growthRate": "+22%",
              "averageSalary": "₹12L/year",
              "requiredSkills": ["Skill 1", "Skill 2"],
              "industry": "Technology",
              "description": "Job description."
            },
            ...
          ]
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        
        // Clean the response to remove markdown formatting
        const cleanedText = text.replace(/```json\n|```/g, "");
        const parsedCareerPaths = JSON.parse(cleanedText);
        setCareerPaths(parsedCareerPaths);
      } catch (error) {
        console.error("Error fetching career paths:", error);
      }
    };

    fetchCareerPaths();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-primary">CareerCraft</h1>
            <div className="text-sm text-muted-foreground">
              Step 3 of 6: Career Path Suggestions
            </div>
          </div>
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">
              Your Skills Match These Careers
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Based on your profile, here are paths where you can thrive, {onboardingData?.name || "there"}.
            </p>
          </div>

          {/* Filters */}
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
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Creative Arts">Creative Arts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Show paths for:</label>
              <ToggleGroup type="single" value={goalType} onValueChange={setGoalType}>
                <ToggleGroupItem value="quick">Quick Entry</ToggleGroupItem>
                <ToggleGroupItem value="long-term">Long-Term Growth</ToggleGroupItem>
                <ToggleGroupItem value="freelance">Freelance</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          {/* Career Cards Grid */}
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
                  {/* Match Score */}
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Skill Match:</span>
                    <span className={`font-bold ${getMatchScoreColor(career.matchScore)}`}>
                      {career.matchScore}%
                    </span>
                  </div>

                  {/* Growth Rate */}
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Job Growth:</span>
                    <span className="font-bold text-green-600">{career.growthRate} (5yr)</span>
                  </div>

                  {/* Salary */}
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">Avg Salary:</span>
                    <span className="font-bold text-accent">{career.averageSalary}</span>
                  </div>

                  {/* Required Skills */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Key Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {career.requiredSkills.slice(0, 4).map((skill) => (
                        <Badge
                          key={skill}
                          variant={skills.includes(skill) ? "default" : "outline"}
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {career.requiredSkills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{career.requiredSkills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="hero"
                    className="w-full mt-4 group-hover:shadow-glow"
                    onClick={() => {
                      console.log("🎯 User selected career path:", career.title, career);
                      onChoosePath(career.id);
                    }}
                  >
                    Explore Path
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main CTA */}
          <div className="text-center pt-8">
            <Button
              size="lg"
              variant="hero"
              onClick={() => {
                console.log("🚀 User proceeding to build roadmap with selections");
                onChoosePath("selected");
              }}
              className="px-8 py-4 text-lg"
            >
              Choose a Path & Build My Roadmap
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPathSuggestions;