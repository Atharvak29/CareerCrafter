import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CareerPathSuggestions from "@/components/CareerPathSuggestions";

interface CareerVideo {
  id: string;
  title: string;
  company: string;
  role: string;
  salary: string;
  growth: string;
  tags: string[];
  description: string;
  thumbnail: string;
  likes: number;
  isLiked: boolean;
}

interface LocationState {
  likedCareers: string[];
  careerData: CareerVideo[];
}

const CareerMatching = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    // Log user selections to console
    if (state?.likedCareers && state?.careerData) {
      const userSelections = {
        timestamp: new Date().toISOString(),
        likedCareerIds: state.likedCareers,
        likedCareersDetails: state.careerData.map(career => ({
          id: career.id,
          title: career.title,
          company: career.company,
          role: career.role,
          tags: career.tags
        })),
        totalLikedCareers: state.likedCareers.length
      };

      console.log("🎯 User Career Selections:", userSelections);
    }
  }, [state]);

  // If no state, redirect back to discovery
  if (!state?.likedCareers || state.likedCareers.length === 0) {
    navigate("/career-discovery");
    return null;
  }

  // Mock onboarding data based on liked careers
  const mockOnboardingData = {
    name: "Career Explorer",
    education: "Exploring", 
    interests: state.careerData.flatMap(career => career.tags).slice(0, 3)
  };

  // Extract skills from liked careers
  const skills = Array.from(new Set(state.careerData.flatMap(career => career.tags)));

  const handleChoosePath = (careerPath: string) => {
    console.log("🚀 User chose career path:", careerPath);
    navigate("/skill-evolution");
  };

  const handleBack = () => {
    navigate("/career-discovery");
  };

  return (
    <CareerPathSuggestions
      onboardingData={mockOnboardingData}
      skills={skills}
      onChoosePath={handleChoosePath}
      onBack={handleBack}
    />
  );
};

export default CareerMatching;