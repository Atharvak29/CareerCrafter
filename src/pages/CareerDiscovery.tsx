import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, ChevronUp, ChevronDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CareerVideo {
  id: string;
  title: string;
  company: string;
  role: string;
  salary: string;
  growth: string;
  tags: string[];
  description: string;
  videoUrl: string; // Changed from thumbnail to videoUrl
  likes: number;
  isLiked: boolean;
}

const CareerDiscovery = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCareers, setLikedCareers] = useState<Set<string>>(new Set());

  const careerVideos: CareerVideo[] = [
    {
      id: "1",
      title: "Day in the Life: Data Scientist",
      company: "Google",
      role: "Senior Data Scientist",
      salary: "₹25L - ₹40L",
      growth: "+22% growth",
      tags: ["Python", "ML", "Analytics", "Remote"],
      description: "Transform data into insights that drive billion-dollar decisions",
      videoUrl: "https://www.youtube.com/embed/E4pB8CDPklE?autoplay=1&loop=1&playlist=E4pB8CDPklE", // Embedded YouTube Short URL
      likes: 1240,
      isLiked: false
    },
    {
      id: "2", 
      title: "UX Designer Building the Future",
      company: "Figma",
      role: "Product Designer",
      salary: "₹18L - ₹35L",
      growth: "+13% growth",
      tags: ["Design", "User Research", "Prototyping", "Creative"],
      description: "Design experiences that millions of users love every day",
      videoUrl: "https://www.youtube.com/embed/SkbVyd7VrtM?autoplay=1&loop=1&playlist=SkbVyd7VrtM", // Embedded YouTube Short URL
      likes: 892,
      isLiked: false
    },
    {
      id: "3",
      title: "Cybersecurity: Digital Guardian",
      company: "CrowdStrike",
      role: "Security Engineer",
      salary: "₹22L - ₹45L", 
      growth: "+35% growth",
      tags: ["Security", "Ethical Hacking", "Networks", "High-demand"],
      description: "Protect organizations from cyber threats in an AI-driven world",
      videoUrl: "https://www.youtube.com/embed/-2HC--hkK4w?autoplay=1&loop=1&playlist=-2HC--hkK4w", // Embedded YouTube Short URL
      likes: 1580,
      isLiked: false
    },
    {
      id: "4",
      title: "AI Engineer: Building Tomorrow",
      company: "OpenAI",
      role: "Machine Learning Engineer",
      salary: "₹30L - ₹60L",
      growth: "+45% growth", 
      tags: ["AI/ML", "Python", "Deep Learning", "Future-proof"],
      description: "Create AI systems that will reshape how humans work and live",
      videoUrl: "https://www.youtube.com/embed/4UeLTsgdZc8?autoplay=1&loop=1&playlist=4UeLTsgdZc8", // Embedded YouTube Short URL
      likes: 2100,
      isLiked: false
    },
    {
      id: "5",
      title: "Product Manager: Strategy Master",
      company: "Stripe",
      role: "Senior Product Manager",
      salary: "₹28L - ₹50L",
      growth: "+19% growth",
      tags: ["Strategy", "Leadership", "Analytics", "Business"],
      description: "Lead cross-functional teams to build products users can't live without",
      videoUrl: "https://www.youtube.com/embed/OM0pR0H1R_A?autoplay=1&loop=1&playlist=OM0pR0H1R_A", // Embedded YouTube Short URL
      likes: 965,
      isLiked: false
    }
  ];

  const handleLike = (careerId: string) => {
    setLikedCareers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(careerId)) {
        newSet.delete(careerId);
      } else {
        newSet.add(careerId);
      }
      return newSet;
    });
  };

  const handleProceedToMatching = () => {
    const likedCareersList = Array.from(likedCareers);
    navigate("/career-matching", { 
      state: { 
        likedCareers: likedCareersList,
        careerData: careerVideos.filter(video => likedCareers.has(video.id))
      }
    });
  };

  const nextVideo = () => {
    setCurrentIndex(prev => (prev + 1) % careerVideos.length);
  };

  const prevVideo = () => {
    setCurrentIndex(prev => prev === 0 ? careerVideos.length - 1 : prev - 1);
  };

  const currentVideo = careerVideos[currentIndex];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold text-lg">Career Discovery</h1>
                <p className="text-sm text-muted-foreground">Explore paths that match you</p>
              </div>
            </div>
            <Button 
              variant="hero"
              onClick={handleProceedToMatching}
              disabled={likedCareers.size === 0}
            >
              {likedCareers.size > 0 ? `View ${likedCareers.size} Matched Careers` : "Like Careers to Continue"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main TikTok-style Interface */}
      <main className="pt-20 h-screen flex items-center justify-center">
        <div className="relative w-full max-w-sm mx-auto h-[calc(100vh-6rem)]">
          
          {/* Career Video Card */}
          <Card className="h-full w-full shadow-glow border-0 bg-gradient-to-b from-card to-card/90 overflow-hidden relative">
            <CardContent className="p-0 h-full flex flex-col">
              
              {/* Video/Preview Area */}
              <div className="flex-1 relative bg-gradient-hero flex items-center justify-center text-white overflow-hidden">
                <iframe
                  title={currentVideo.title}
                  src={currentVideo.videoUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full object-cover"
                ></iframe>
                
                {/* Growth Badge */}
                <Badge className="absolute top-4 right-4 bg-success text-success-foreground z-10">
                  {currentVideo.growth}
                </Badge>
              </div>

              {/* Content Area */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">{currentVideo.title}</h2>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{currentVideo.company}</span>
                    <span className="font-semibold text-primary">{currentVideo.salary}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentVideo.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {currentVideo.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(currentVideo.id)}
                      className={likedCareers.has(currentVideo.id) ? "text-destructive" : ""}
                    >
                      <Heart className={`h-5 w-5 ${likedCareers.has(currentVideo.id) ? "fill-current" : ""}`} />
                      <span className="ml-1 text-xs">{currentVideo.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleProceedToMatching}
                    disabled={likedCareers.size === 0}
                  >
                    View Matches
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <Button
              variant="secondary"
              size="icon"
              onClick={prevVideo}
              className="rounded-full shadow-soft"
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary" 
              size="icon"
              onClick={nextVideo}
              className="rounded-full shadow-soft"
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {careerVideos.map((_, index) => (
              <div
                key={index}
                className={`h-1 w-8 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareerDiscovery;