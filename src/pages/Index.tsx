import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Heart, Shield, Zap, ArrowRight, Upload, FileText, Users } from "lucide-react";
import heroImage from "@/assets/hero-kidney.jpg";

const Index = () => {
  return (
    <div className="min-h-screen mesh-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">KidneyAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="hero-glow" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Shield className="w-4 h-4" />
                <span>AI-Powered Kidney Analysis</span>
              </div>
              <h1 className="font-display text-5xl lg:text-6xl font-bold leading-tight">
                Early Detection for{" "}
                <span className="gradient-text">Healthier Kidneys</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Upload your kidney scan and receive instant AI-powered analysis. 
                Detect cysts, stones, and tumors early with our advanced deep learning model.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button variant="hero" size="xl">
                    Start Analysis
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/tips">
                  <Button variant="outline" size="xl">
                    Healthy Tips
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Scans Analyzed</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-primary">&lt;5s</div>
                  <div className="text-sm text-muted-foreground">Analysis Time</div>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded-3xl blur-3xl" />
              <img
                src={heroImage}
                alt="AI Kidney Analysis Visualization"
                className="relative rounded-3xl shadow-2xl border border-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
            <h2 className="font-display text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI system analyzes kidney scans to detect abnormalities 
              and provide actionable health guidance.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Upload Scan",
                description: "Upload your kidney ultrasound or CT scan image securely to our platform.",
                delay: "delay-100",
              },
              {
                icon: Zap,
                title: "AI Analysis",
                description: "Our deep learning model processes your scan and detects any abnormalities.",
                delay: "delay-200",
              },
              {
                icon: FileText,
                title: "Get Results",
                description: "Receive detailed results with visual explanations and health recommendations.",
                delay: "delay-300",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up ${feature.delay}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detection Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-display text-4xl font-bold">What We Detect</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our model is trained to identify four key conditions in kidney scans.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Cyst", color: "bg-blue-500", description: "Fluid-filled sacs in kidneys" },
              { label: "Stone", color: "bg-amber-500", description: "Mineral deposits in kidneys" },
              { label: "Tumor", color: "bg-rose-500", description: "Abnormal tissue growth" },
              { label: "Normal", color: "bg-emerald-500", description: "Healthy kidney tissue" },
            ].map((type, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border/50 shadow-card text-center hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-full ${type.color} mx-auto mb-4 flex items-center justify-center`}>
                  <Heart className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{type.label}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-glow opacity-95" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-display text-4xl font-bold text-primary-foreground">
              Ready to Check Your Kidney Health?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Create an account today and get your first scan analysis completely free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button variant="hero-outline" size="xl">
                  Create Free Account
                  <Users className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold">KidneyAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 KidneyAI. For educational purposes only. Not medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
