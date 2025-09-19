import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-career.jpg";

interface OnboardingData {
  name: string;
  education: string;
  interests: string[];
}

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OnboardingData>({
    name: "",
    education: "",
    interests: [],
  });
  
  const [interestInput, setInterestInput] = useState("");

  const educationOptions = [
    "High School",
    "Associate's Degree", 
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
    "Other"
  ];

  const interestSuggestions = [
    "Technology",
    "Healthcare", 
    "Creative Arts",
    "Finance",
    "Education"
  ];

  const addInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
      setInterestInput("");
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.education) {
      onComplete(formData);
    }
  };

  const isFormValid = formData.name.trim() && formData.education;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">CareerCraft</h1>
          <div className="text-sm text-muted-foreground">Step 1 of 2</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Unlock Your Potential.{" "}
                  <span className="bg-gradient-hero bg-clip-text text-transparent">
                    Chart Your Future.
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  CareerCraft uses AI to map your skills, recommend paths, and guide your growth toward a future-ready career.
                </p>
              </div>
              
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Career growth and professional development illustration" 
                  className="rounded-lg shadow-card w-full"
                />
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="space-y-6">
              <Card className="shadow-card border-0">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-semibold">Welcome to CareerCraft!</h2>
                      <p className="text-muted-foreground">Let's get started with some basic information</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Input */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Your Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="name"
                          placeholder="e.g., John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="transition-all duration-200 focus:shadow-soft"
                        />
                      </div>

                      {/* Education Select */}
                      <div className="space-y-2">
                        <label htmlFor="education" className="text-sm font-medium">
                          Highest Education Level <span className="text-destructive">*</span>
                        </label>
                        <Select value={formData.education} onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}>
                          <SelectTrigger className="transition-all duration-200 focus:shadow-soft">
                            <SelectValue placeholder="Select your education level" />
                          </SelectTrigger>
                          <SelectContent>
                            {educationOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Interests */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium">
                          What excites you? <span className="text-xs text-muted-foreground">(Optional, but helpful!)</span>
                        </label>
                        
                        {/* Interest Suggestions */}
                        <div className="flex flex-wrap gap-2">
                          {interestSuggestions
                            .filter(suggestion => !formData.interests.includes(suggestion))
                            .map((suggestion) => (
                            <Badge
                              key={suggestion}
                              variant="outline"
                              className="cursor-pointer hover:bg-accent transition-colors"
                              onClick={() => addInterest(suggestion)}
                            >
                              + {suggestion}
                            </Badge>
                          ))}
                        </div>

                        {/* Custom Interest Input */}
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add your own interest..."
                            value={interestInput}
                            onChange={(e) => setInterestInput(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addInterest(interestInput);
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => addInterest(interestInput)}
                            disabled={!interestInput.trim()}
                          >
                            Add
                          </Button>
                        </div>

                        {/* Selected Interests */}
                        {formData.interests.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {formData.interests.map((interest) => (
                              <Badge
                                key={interest}
                                className="bg-accent text-accent-foreground"
                              >
                                {interest}
                                <button
                                  type="button"
                                  onClick={() => removeInterest(interest)}
                                  className="ml-2 hover:text-destructive"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          className="flex-1"
                          onClick={() => navigate("/career-discovery")}
                        >
                          Explore More
                        </Button>
                        <Button
                          type="submit"
                          variant="hero"
                          size="lg"
                          className="flex-1"
                          disabled={!isFormValid}
                        >
                          Start My Journey
                        </Button>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;