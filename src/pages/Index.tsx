import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Onboarding from "@/components/Onboarding";
import SkillAssessment from "@/components/SkillAssessment";
import CareerPathSuggestions from "@/components/CareerPathSuggestions";

type Screen = "onboarding" | "skill-assessment" | "career-paths";

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
  const navigate = useNavigate();

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
    navigate("/congratulations", {
      state: {
        onboardingData,
        skills,
        resumeFile,
        chosenPath: careerPath,
      },
    });
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

  return null;
};

export default Index;