import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

interface OnboardingData {
  name: string;
  education: string;
  interests: string[];
}

interface LocationState {
  onboardingData?: OnboardingData;
  skills?: string[];
  resumeFile?: File;
  likedCareers?: string[];
  chosenPath?: string;
  careerData?: any[];
}

const Congratulations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  useEffect(() => {
    // Comprehensive console logging of all user selections
    const userJourney = {
      timestamp: new Date().toISOString(),
      pageReached: "Congratulations",
      userProfile: {
        name: state?.onboardingData?.name || "Unknown User",
        education: state?.onboardingData?.education || "Not specified",
        interests: state?.onboardingData?.interests || []
      },
      skillsAssessment: {
        selectedSkills: state?.skills || [],
        totalSkills: state?.skills?.length || 0,
        resumeUploaded: !!state?.resumeFile,
        resumeFileName: state?.resumeFile?.name || null
      },
      careerExploration: {
        likedCareers: state?.likedCareers || [],
        totalLikedCareers: state?.likedCareers?.length || 0,
        chosenCareerPath: state?.chosenPath || "Not selected",
        careerDetails: state?.careerData || []
      },
      completedFlow: true
    };

    console.log("🎉 Complete User Journey Data:", userJourney);
  }, [state]);

  const userName = state?.onboardingData?.name || "Career Explorer";
  const skills = state?.skills || [];
  const resumeFile = state?.resumeFile;

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold">
          Congratulations, {userName}!
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

        <div className="flex gap-4 justify-center pt-6">
          <Button 
            variant="outline" 
            onClick={() => navigate("/career-discovery")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Discovery
          </Button>
          <Button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Start New Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;