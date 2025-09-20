// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Home, BookOpen } from "lucide-react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import mermaid from "mermaid";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// interface OnboardingData {
//   name: string;
//   education: string;
//   interests: string[];
// }

// interface LocationState {
//   onboardingData?: OnboardingData;
//   skills?: string[];
//   resumeFile?: File;
//   likedCareers?: string[];
//   chosenPath?: string;
//   careerData?: any[];
// }

// interface Milestone {
//   title: string;
//   description: string;
//   timeframe: string;
// }

// const Congratulations = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const state = location.state as LocationState;
//   const [mermaidCode, setMermaidCode] = useState("");
//   const [timeline, setTimeline] = useState<Milestone[]>([]);

//   useEffect(() => {
//     const generateRoadmap = async () => {
//       try {
//         const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
//         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//         const prompt = `
//           Generate a practical, skills-focused career roadmap for a user interested in becoming a ${state?.chosenPath}.
//           The user has shown interest in the following job role: ${JSON.stringify(state?.careerData)}
//           The user's skills include: ${JSON.stringify(state?.skills)}
//           The roadmap should focus on making the user job-ready and include actionable steps like online courses, skill development, and educational milestones.
//           Avoid generic advice about networking or research.

//           The output should be a JSON object with two properties: "mermaidCode" and "timeline".
//           - "mermaidCode" should be a Mermaid flowchart definition outlining the key stages.
//           - "timeline" should be an array of milestone objects, each with a title, a detailed description focusing on actionable skills, and a timeframe (e.g., '0–3 months').
//         `;

//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const text = await response.text();

//         const cleanedText = text.replace(/```json\n|```/g, "");
//         const { mermaidCode, timeline } = JSON.parse(cleanedText);

//         setMermaidCode(mermaidCode);
//         setTimeline(timeline);
//       } catch (error) {
//         console.error("Error generating roadmap:", error);
//       }
//     };

//     if (state?.chosenPath) {
//       generateRoadmap();
//     }
//   }, [state?.chosenPath, state?.careerData, state?.skills]);

//   useEffect(() => {
//     if (mermaidCode) {
//       mermaid.initialize({ startOnLoad: true });
//       mermaid.contentLoaded();
//     }
//   }, [mermaidCode]);

//   const userName = state?.onboardingData?.name || "Career Explorer";

//   return (
//     <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
//       <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
//         <h1 className="text-4xl font-bold">
//           Congratulations, {userName}!
//         </h1>
//         <p className="text-lg text-muted-foreground">
//           Here is your personalized career roadmap.
//         </p>

//         {/* Mermaid Flowchart */}
//         <Card className="shadow-card">
//           <CardHeader>
//             <CardTitle className="text-2xl">Your Career Roadmap</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {mermaidCode && <div className="mermaid">{mermaidCode}</div>}
//           </CardContent>
//         </Card>

//         {/* Textual Timeline */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold flex items-center gap-2 justify-center">
//             <BookOpen className="h-5 w-5" />
//             Your Learning Journey
//           </h3>
//           <div className="space-y-4">
//             {timeline.map((milestone, index) => (
//               <Card
//                 key={index}
//                 className="shadow-soft transition-all text-left"
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-start gap-4">
//                     {/* Timeline Dot */}
//                     <div className="flex flex-col items-center">
//                       <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-primary text-primary-foreground">
//                         {index + 1}
//                       </div>
//                       {index < timeline.length - 1 && (
//                         <div className="w-0.5 h-12 mt-2 bg-primary" />
//                       )}
//                     </div>
//                     {/* Content */}
//                     <div className="flex-1 space-y-3">
//                       <div className="flex items-start justify-between">
//                         <div>
//                           <h4 className="font-semibold text-lg">{milestone.title}</h4>
//                           <p className="text-muted-foreground">{milestone.description}</p>
//                         </div>
//                         <Badge variant="outline" className="text-xs">
//                           {milestone.timeframe}
//                         </Badge>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         <div className="flex gap-4 justify-center pt-6">
//           <Button
//             variant="outline"
//             onClick={() => navigate("/career-discovery")}
//             className="flex items-center gap-2"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Discovery
//           </Button>
//           <Button
//             onClick={() => navigate("/")}
//             className="flex items-center gap-2"
//           >
//             <Home className="h-4 w-4" />
//             Start New Journey
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Congratulations;



// ############################################################ 2.0 prompt ########################################################################3

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, BookOpen } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mermaid from "mermaid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface Milestone {
  title: string;
  description: string;
  timeframe: string;
}

const Congratulations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [mermaidCode, setMermaidCode] = useState("");
  const [timeline, setTimeline] = useState<Milestone[]>([]);

  useEffect(() => {
    const generateRoadmap = async () => {
      try {
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
          Generate a **practical, skills-focused career roadmap** for a user interested in becoming a ${state?.chosenPath}.
          The user has shown interest in the following job role: ${JSON.stringify(state?.careerData)}
          The user's current skills include: ${JSON.stringify(state?.skills)}

          The roadmap should be **job-ready** and focus on actionable steps such as:
          1. Identifying **missing skills** required for the target job.
          2. Providing a **step-by-step flow** to gain each missing skill (e.g., foundational skill → intermediate → advanced).
          3. Recommending **online courses, certifications, or educational milestones** for each skill.
          4. Integrating a **timeline** for each skill (e.g., '0–3 months', '3–6 months').

          **Output format**: Return a JSON object with two properties:
          - "mermaidCode": A **Mermaid flowchart** showing the skill/education/certification progression, including dependencies (e.g., Drawing → Digital Art → Portfolio Project). Focus only on skill acquisition and learning steps.
          - "timeline": An **array of milestone objects**, each with:
            - title
            - detailed description emphasizing actionable skill-building
            - timeframe

          Avoid generic advice about networking, research, or vague goals. Focus solely on **skills, certifications, and educational steps** required to reach the target job.
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

    if (state?.chosenPath) {
      generateRoadmap();
    }
  }, [state?.chosenPath, state?.careerData, state?.skills]);

  useEffect(() => {
    if (mermaidCode) {
      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded();
    }
  }, [mermaidCode]);

  const userName = state?.onboardingData?.name || "Career Explorer";

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold">
          Congratulations, {userName}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Here is your personalized career roadmap.
        </p>

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
          <h3 className="text-xl font-semibold flex items-center gap-2 justify-center">
            <BookOpen className="h-5 w-5" />
            Your Learning Journey
          </h3>
          <div className="space-y-4">
            {timeline.map((milestone, index) => (
              <Card
                key={index}
                className="shadow-soft transition-all text-left"
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