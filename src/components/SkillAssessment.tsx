import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SkillAssessmentProps {
  onComplete: (skills: string[], resumeFile?: File) => void;
  onBack: () => void;
}

const SkillAssessment = ({ onComplete, onBack }: SkillAssessmentProps) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const skillSuggestions = [
    "Python", "JavaScript", "React", "Node.js", "SQL", "Project Management",
    "Data Analysis", "Communication", "Leadership", "Problem Solving",
    "Machine Learning", "AWS", "Git", "Agile", "Marketing"
  ];

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills(prev => [...prev, trimmedSkill]);
      setSkillInput("");
      
      toast({
        title: "Nice! That's a valuable skill.",
        duration: 2000,
      });
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const handleFileUpload = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOCX, or TXT file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setResumeFile(file);
    toast({
      title: "Resume uploaded successfully!",
      description: "Your resume is safe with us. We only use it to help you grow.",
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSubmit = () => {
    if (skills.length === 0 && !resumeFile) {
      toast({
        title: "Please add some skills or upload your resume",
        description: "We need at least one way to analyze your capabilities.",
        variant: "destructive",
      });
      return;
    }

    onComplete(skills, resumeFile || undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">CareerCraft</h1>
          <div className="text-sm text-muted-foreground">Step 2 of 2: Skill Assessment</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">
              Let's Map Your{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Skills
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your resume for AI analysis, or manually add your key skills.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Resume Upload */}
            <Card className="shadow-card border-0">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <Upload className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold">Upload Your Resume</h3>
                    <p className="text-muted-foreground">
                      Our AI will analyze your resume to identify and score your skills.
                    </p>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                      isDragOver 
                        ? 'border-primary bg-primary/5' 
                        : resumeFile 
                          ? 'border-accent bg-accent/5'
                          : 'border-muted-foreground/25 hover:border-primary hover:bg-primary/5'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {resumeFile ? (
                      <div className="space-y-4">
                        <FileText className="h-16 w-16 text-accent mx-auto" />
                        <div>
                          <p className="font-medium text-accent-foreground">{resumeFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setResumeFile(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-lg font-medium">Drag & Drop Your Resume Here</p>
                          <p className="text-sm text-muted-foreground">
                            Supported formats: PDF, DOCX, TXT (Max 5MB)
                          </p>
                        </div>
                        
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Browse Files
                        </Button>
                        
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.docx,.txt"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manual Skills Entry */}
            <Card className="shadow-card border-0">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <Plus className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold">Enter Skills Manually</h3>
                    <p className="text-muted-foreground">
                      Add as many relevant skills as you can think of. We'll help you score them.
                    </p>
                  </div>

                  {/* Skill Suggestions */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Popular Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {skillSuggestions
                        .filter(suggestion => !skills.includes(suggestion))
                        .slice(0, 8)
                        .map((suggestion) => (
                        <Badge
                          key={suggestion}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent transition-colors"
                          onClick={() => addSkill(suggestion)}
                        >
                          + {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Custom Skill Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Add Custom Skill</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., Python, Project Management"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill(skillInput);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addSkill(skillInput)}
                        disabled={!skillInput.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Selected Skills */}
                  {skills.length > 0 && (
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Your Skills ({skills.length})</label>
                      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                        {skills.map((skill) => (
                          <Badge
                            key={skill}
                            className="bg-accent text-accent-foreground"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-2 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                You're one step closer to your dream career.
              </p>
              <Button
                variant="hero"
                size="lg"
                onClick={handleSubmit}
                className="min-w-[200px]"
              >
                Analyze Skills & See My Graph
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkillAssessment;