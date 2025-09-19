import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  AlertTriangle,
  Brain,
  Zap,
  Clock,
  Target
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SkillMetric {
  name: string;
  current: number;
  target: number;
  trend: "up" | "down" | "stable";
  riskLevel: "low" | "medium" | "high";
  futureProof: number;
}

interface CrisisPrediction {
  title: string;
  probability: number;
  impact: "low" | "medium" | "high";
  timeline: string;
  description: string;
  mitigations: string[];
}

const SkillEvolution = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("skills");

  const skillMetrics: SkillMetric[] = [
    {
      name: "JavaScript/React",
      current: 85,
      target: 95,
      trend: "up",
      riskLevel: "low",
      futureProof: 80
    },
    {
      name: "Machine Learning",
      current: 45,
      target: 80,
      trend: "up", 
      riskLevel: "medium",
      futureProof: 95
    },
    {
      name: "Data Analysis",
      current: 70,
      target: 85,
      trend: "up",
      riskLevel: "low",
      futureProof: 85
    },
    {
      name: "Manual Testing",
      current: 80,
      target: 60,
      trend: "down",
      riskLevel: "high",
      futureProof: 30
    },
    {
      name: "Cloud Computing",
      current: 35,
      target: 75,
      trend: "up",
      riskLevel: "medium", 
      futureProof: 90
    }
  ];

  const crisisPredictions: CrisisPrediction[] = [
    {
      title: "AI Automation Impact",
      probability: 75,
      impact: "high",
      timeline: "2-3 years",
      description: "Manual testing and basic coding tasks may become automated",
      mitigations: [
        "Learn AI/ML fundamentals",
        "Focus on complex problem-solving",
        "Develop AI prompt engineering skills"
      ]
    },
    {
      title: "Cloud-First Migration",
      probability: 90,
      impact: "medium", 
      timeline: "1-2 years",
      description: "Most companies will require cloud deployment expertise",
      mitigations: [
        "Get AWS/GCP certification",
        "Practice container technologies",
        "Learn infrastructure as code"
      ]
    },
    {
      title: "No-Code/Low-Code Rise",
      probability: 60,
      impact: "medium",
      timeline: "3-5 years",
      description: "Simple applications may not require traditional coding",
      mitigations: [
        "Specialize in complex algorithms",
        "Focus on system architecture",
        "Become a no-code platform expert"
      ]
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-success" />;
      case "down": return <TrendingDown className="h-4 w-4 text-destructive" />;
      default: return <div className="h-4 w-4" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "low": return "bg-success/10 text-success border-success";
      case "medium": return "bg-warning/10 text-warning border-warning";
      case "high": return "bg-destructive/10 text-destructive border-destructive";
      default: return "bg-muted text-muted-foreground";
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
              onClick={() => navigate("/career-map")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-primary">Skill Evolution Dashboard</h1>
              <p className="text-muted-foreground">AI-powered insights & crisis-resilient planning</p>
            </div>
          </div>
          <Button 
            variant="hero"
            onClick={() => navigate("/")}
          >
            Start New Journey
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="skills" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Skills Evolution
              </TabsTrigger>
              <TabsTrigger value="predictions" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Crisis Predictions
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                AI Insights
              </TabsTrigger>
            </TabsList>

            {/* Skills Evolution Tab */}
            <TabsContent value="skills" className="space-y-6">
              <div className="grid gap-6">
                {skillMetrics.map((skill, index) => (
                  <Card key={skill.name} className="shadow-soft">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-lg">{skill.name}</h3>
                            {getTrendIcon(skill.trend)}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getRiskColor(skill.riskLevel)}>
                              {skill.riskLevel} risk
                            </Badge>
                            <Badge variant="secondary">
                              {skill.futureProof}% future-proof
                            </Badge>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Current Level</span>
                            <span>{skill.current}%</span>
                          </div>
                          <Progress value={skill.current} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Target: {skill.target}%</span>
                            <span>Gap: {skill.target - skill.current}%</span>
                          </div>
                        </div>

                        {/* Future-Proof Indicator */}
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Future-Proof Score</span>
                          </div>
                          <div className="text-lg font-bold text-primary">{skill.futureProof}%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Crisis Predictions Tab */}
            <TabsContent value="predictions" className="space-y-6">
              <div className="space-y-6">
                {crisisPredictions.map((prediction, index) => (
                  <Card key={index} className="shadow-soft">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-warning" />
                            {prediction.title}
                          </CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge className={getImpactColor(prediction.impact)}>
                              {prediction.impact} impact
                            </Badge>
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {prediction.timeline}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-warning">{prediction.probability}%</div>
                          <div className="text-xs text-muted-foreground">Probability</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{prediction.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Mitigation Strategies
                        </h4>
                        <ul className="space-y-1">
                          {prediction.mitigations.map((mitigation, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {mitigation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* AI Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                
                {/* Skill Gaps Analysis */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      Critical Skill Gaps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-destructive/10 rounded-lg">
                        <span className="font-medium">Machine Learning</span>
                        <Badge variant="destructive">35% gap</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg">
                        <span className="font-medium">Cloud Computing</span>
                        <Badge className="bg-warning text-warning-foreground">40% gap</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                        <span className="font-medium">React/JS</span>
                        <Badge variant="secondary">10% gap</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Trends */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-success" />
                      Market Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">AI/ML Engineers</span>
                        <span className="text-success font-semibold">+45% demand</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Cloud Architects</span>
                        <span className="text-success font-semibold">+35% demand</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Data Scientists</span>
                        <span className="text-success font-semibold">+22% demand</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Manual Testers</span>
                        <span className="text-destructive font-semibold">-15% demand</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Recommendations */}
                <Card className="shadow-soft md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      AI-Powered Learning Path
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-primary mb-2">Immediate Focus</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Python fundamentals</li>
                          <li>• Statistics & probability</li>
                          <li>• ML algorithms basics</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                        <h4 className="font-semibold text-warning mb-2">Next 3 Months</h4>
                        <ul className="text-sm space-y-1">
                          <li>• AWS Cloud Practitioner</li>
                          <li>• Docker containers</li>
                          <li>• TensorFlow basics</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                        <h4 className="font-semibold text-success mb-2">Long-term Goal</h4>
                        <ul className="text-sm space-y-1">
                          <li>• MLOps engineering</li>
                          <li>• AI system architecture</li>
                          <li>• Advanced cloud services</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SkillEvolution;