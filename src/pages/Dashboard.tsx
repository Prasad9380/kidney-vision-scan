import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Upload, Image, FileText, User, LogOut, Heart, Droplet, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [bp, setBp] = useState("");
  const [glucose, setGlucose] = useState("");
  const [notes, setNotes] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) {
      toast({
        title: "No image uploaded",
        description: "Please upload a kidney scan image first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-kidney-scan', {
        body: {
          imageBase64: uploadedImage,
          bp: bp || undefined,
          glucose: glucose || undefined,
          notes: notes || undefined,
        }
      });

      if (error) {
        console.error("Analysis error:", error);
        toast({
          title: "Analysis Failed",
          description: error.message || "Failed to analyze the scan. Please try again.",
          variant: "destructive",
        });
        setIsAnalyzing(false);
        return;
      }

      if (data?.error) {
        toast({
          title: "Analysis Error",
          description: data.error,
          variant: "destructive",
        });
        setIsAnalyzing(false);
        return;
      }

      toast({
        title: "Analysis Complete",
        description: "Your kidney scan has been analyzed successfully.",
      });

      navigate("/results", { 
        state: { 
          image: uploadedImage,
          analysis: data.analysis,
          timestamp: data.timestamp,
          bp,
          glucose,
          notes 
        } 
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-4 hidden lg:block">
        <Link to="/" className="flex items-center gap-2 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">KidneyAI</span>
        </Link>
        
        <nav className="space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium">
            <Upload className="w-5 h-5" />
            New Scan
          </Link>
          <Link to="/history" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <FileText className="w-5 h-5" />
            History
          </Link>
          <Link to="/tips" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Heart className="w-5 h-5" />
            Health Tips
          </Link>
          <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <User className="w-5 h-5" />
            Profile
          </Link>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={() => navigate("/")}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden bg-card border-b border-border p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">KidneyAI</span>
          </Link>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </header>

        <div className="p-6 lg:p-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">Upload Kidney Scan</h1>
            <p className="text-muted-foreground">
              Upload your ultrasound or CT scan for AI-powered analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Area */}
            <Card variant="outlined" className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Image className="w-5 h-5 text-primary" />
                  Scan Image
                </CardTitle>
                <CardDescription>
                  Upload a kidney US or CT scan image
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : uploadedImage
                      ? "border-success bg-success/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <img
                          src={uploadedImage}
                          alt="Uploaded scan"
                          className="max-h-64 rounded-xl shadow-md mx-auto"
                        />
                        <button
                          onClick={() => setUploadedImage(null)}
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-md hover:bg-destructive/90 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-success font-medium">Image uploaded successfully</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">
                          Drag and drop your scan here
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          or click to browse files
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Supports: JPG, PNG, DICOM
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Vitals & Notes */}
            <div className="space-y-6">
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Optional Vitals
                  </CardTitle>
                  <CardDescription>
                    Adding vitals can improve prediction accuracy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bp" className="flex items-center gap-2">
                        <Droplet className="w-4 h-4 text-rose-500" />
                        Blood Pressure
                      </Label>
                      <Input
                        id="bp"
                        placeholder="120/80"
                        value={bp}
                        onChange={(e) => setBp(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="glucose" className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-amber-500" />
                        Glucose (mg/dL)
                      </Label>
                      <Input
                        id="glucose"
                        type="number"
                        placeholder="100"
                        value={glucose}
                        onChange={(e) => setGlucose(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Additional Notes
                  </CardTitle>
                  <CardDescription>
                    Add any symptoms or relevant information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="E.g., experiencing lower back pain, frequent urination..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

              <Button
                variant="hero"
                size="xl"
                className="w-full"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !uploadedImage}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Activity className="w-5 h-5" />
                    Analyze Scan
                  </>
                )}
              </Button>
              
              {isAnalyzing && (
                <p className="text-sm text-center text-muted-foreground animate-pulse">
                  Our AI is analyzing your kidney scan. This may take a few seconds...
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
