import { useState } from "react";
import Onboarding from "@/components/Onboarding";
import SkillAssessment from "@/components/SkillAssessment";
import CareerPathSuggestions from "@/components/CareerPathSuggestions";

type Screen = "onboarding" | "skill-assessment" | "career-paths" | "results";

interface OnboardingData {
  name: string;
  education: string;
  interests: string[];
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    setCurrentScreen("skill-assessment");
  };

  const handleSkillAssessmentComplete = (skillsList: string[], resume?: File) => {
    setSkills(skillsList);
    setResumeFile(resume || null);
    setCurrentScreen("career-paths");
  };

  const handleChoosePath = (careerPath: string) => {
    setCurrentScreen("results");
  };

  const handleBack = () => {
    if (currentScreen === "skill-assessment") {
      setCurrentScreen("onboarding");
    } else if (currentScreen === "career-paths") {
      setCurrentScreen("skill-assessment");
    }
  };

  if (currentScreen === "onboarding") {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (currentScreen === "skill-assessment") {
    return (
      <SkillAssessment 
        onComplete={handleSkillAssessmentComplete}
        onBack={handleBack}
      />
    );
  }

  if (currentScreen === "career-paths") {
    return (
      <CareerPathSuggestions
        onboardingData={onboardingData}
        skills={skills}
        onChoosePath={handleChoosePath}
        onBack={handleBack}
      />
    );
  }

  // Results screen (placeholder for now)
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold">
          Congratulations, {onboardingData?.name}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Your career analysis is being processed. This is where we would show your skill graph and career recommendations.
        </p>
        
        {skills.length > 0 && (
          <div className="text-left bg-card p-6 rounded-lg shadow-card">
            <h3 className="font-semibold mb-2">Your Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {resumeFile && (
          <div className="text-left bg-card p-6 rounded-lg shadow-card">
            <h3 className="font-semibold mb-2">Uploaded Resume:</h3>
            <p className="text-sm text-muted-foreground">{resumeFile.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
