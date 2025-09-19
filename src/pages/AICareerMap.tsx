import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Target, Zap, Shield, TrendingUp, Clock, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CareerPath {
  id: string;
  title: string;
  timeline: string;
  difficulty: "Easy" | "Medium" | "Hard";
  skills: string[];
  milestones: Milestone[];
  futureProof: number;
  marketDemand: number;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  skills: string[];
  completed: boolean;
}

const AICareerMap = () => {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<string>("job-ready");

  const careerPaths: Record<string, CareerPath> = {
    "job-ready": {
      id: "job-ready",
      title: "Job-Ready Track",
      timeline: "6-12 months",
      difficulty: "Medium",
      skills: ["React", "Node.js", "Database", "Git", "Testing"],
      futureProof: 75,
      marketDemand: 85,
      milestones: [
        {
          id: "1",
          title: "Foundation Skills",
          description: "Master core programming concepts and tools",
          timeframe: "Month 1-2",
          skills: ["HTML/CSS", "JavaScript", "Git"],
          completed: true
        },
        {
          id: "2", 
          title: "Framework Mastery",
          description: "Build modern web applications with React",
          timeframe: "Month 3-4",
          skills: ["React", "State Management", "API Integration"],
          completed: true
        },
        {
          id: "3",
          title: "Backend Development",
          description: "Create server-side applications and databases",
          timeframe: "Month 5-6", 
          skills: ["Node.js", "Express", "MongoDB", "Authentication"],
          completed: false
        },
        {
          id: "4",
          title: "Portfolio & Job Search",
          description: "Build impressive projects and land your first role",
          timeframe: "Month 7-8",
          skills: ["Portfolio", "Interview Skills", "Networking"],
          completed: false
        }
      ]
    },
    "future-ready": {
      id: "future-ready",
      title: "Future-Ready Track", 
      timeline: "12-24 months",
      difficulty: "Hard",
      skills: ["AI/ML", "Cloud", "Blockchain", "IoT", "Cybersecurity"],
      futureProof: 95,
      marketDemand: 70,
      milestones: [
        {
          id: "1",
          title: "AI Fundamentals",
          description: "Understanding machine learning and AI concepts",
          timeframe: "Month 1-3",
          skills: ["Python", "Statistics", "ML Algorithms"],
          completed: false
        },
        {
          id: "2",
          title: "Deep Learning",
          description: "Neural networks and advanced AI techniques", 
          timeframe: "Month 4-8",
          skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP"],
          completed: false
        },
        {
          id: "3",
          title: "Cloud & Infrastructure",
          description: "Scalable AI systems and cloud deployment",
          timeframe: "Month 9-12",
          skills: ["AWS/GCP", "Docker", "Kubernetes", "MLOps"],
          completed: false
        },
        {
          id: "4",
          title: "Emerging Tech Integration",
          description: "Blockchain, IoT, and next-gen technologies",
          timeframe: "Month 13-18",
          skills: ["Blockchain", "IoT", "Edge Computing", "Web3"],
          completed: false
        }
      ]
    }
  };

  const currentPath = careerPaths[selectedPath];
  const completedMilestones = currentPath.milestones.filter(m => m.completed).length;
  const progressPercentage = (completedMilestones / currentPath.milestones.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-success";
      case "Medium": return "text-warning"; 
      case "Hard": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

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
            onClick={() => navigate("/skill-evolution")}
          >
            View Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Path Selection */}
          <Tabs value={selectedPath} onValueChange={setSelectedPath} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="job-ready" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Job-Ready Track
              </TabsTrigger>
              <TabsTrigger value="future-ready" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Future-Ready Track
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedPath} className="space-y-6 mt-8">
              
              {/* Path Overview */}
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-2xl">{currentPath.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{currentPath.timeline}</span>
                        </div>
                        <Badge className={getDifficultyColor(currentPath.difficulty)}>
                          {currentPath.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-sm text-muted-foreground">Progress</div>
                      <div className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="text-sm text-muted-foreground">
                      {completedMilestones} of {currentPath.milestones.length} milestones completed
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        Future-Proof Score
                      </div>
                      <div className="text-lg font-semibold text-primary">{currentPath.futureProof}%</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        Market Demand
                      </div>
                      <div className="text-lg font-semibold text-primary">{currentPath.marketDemand}%</div>
                    </div>
                  </div>

                  {/* Core Skills */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Core Skills You'll Master
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentPath.skills.map(skill => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Milestones Timeline */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Your Learning Journey
                </h3>
                
                <div className="space-y-4">
                  {currentPath.milestones.map((milestone, index) => (
                    <Card 
                      key={milestone.id} 
                      className={`shadow-soft transition-all ${
                        milestone.completed 
                          ? "bg-success/5 border-success" 
                          : index === completedMilestones 
                            ? "bg-warning/5 border-warning shadow-glow" 
                            : "opacity-60"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          
                          {/* Timeline Dot */}
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              milestone.completed 
                                ? "bg-success text-success-foreground" 
                                : index === completedMilestones
                                  ? "bg-warning text-warning-foreground animate-pulse"
                                  : "bg-muted text-muted-foreground"
                            }`}>
                              {index + 1}
                            </div>
                            {index < currentPath.milestones.length - 1 && (
                              <div className={`w-0.5 h-12 mt-2 ${
                                milestone.completed ? "bg-success" : "bg-muted"
                              }`} />
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

                            <div className="flex flex-wrap gap-2">
                              {milestone.skills.map(skill => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            {!milestone.completed && index === completedMilestones && (
                              <Button size="sm" className="mt-2">
                                Start This Milestone
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AICareerMap;