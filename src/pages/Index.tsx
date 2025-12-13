import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Heart, Shield, Zap, ArrowRight, Upload, FileText, Users, Sparkles, Scan } from "lucide-react";
import heroImage from "@/assets/hero-kidney.jpg";

const Index = () => {
  return (
    <div className="min-h-screen mesh-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="hero-glow" />
        <div className="accent-glow w-96 h-96 -right-48 top-1/4" />
        <div className="accent-glow w-64 h-64 -left-32 bottom-1/3" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-105">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">KidneyAI</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" size="sm" className="shadow-glow">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Kidney Analysis</span>
              </div>
              <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Early Detection for{" "}
                <span className="gradient-text">Healthier Kidneys</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Upload your kidney scan and receive instant AI-powered analysis. 
                Detect cysts, stones, and tumors early with our advanced deep learning model.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="shadow-glow animate-glow">
                    Start Analysis
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/tips">
                  <Button variant="outline" size="xl" className="border-border/50 hover:border-primary/50 hover:bg-primary/5">
                    Healthy Tips
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-10 pt-6">
                {[
                  { value: "98%", label: "Accuracy" },
                  { value: "10K+", label: "Scans Analyzed" },
                  { value: "<5s", label: "Analysis Time" },
                ].map((stat, index) => (
                  <div key={index} className="relative">
                    <div className="font-display text-4xl font-bold text-primary tracking-tight">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                    {index < 2 && <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent hidden sm:block" />}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-fade-in delay-300">
              <div className="absolute -inset-8 bg-gradient-to-br from-primary/30 via-accent/20 to-transparent rounded-[2rem] blur-3xl" />
              <div className="relative glass-card p-2 border-glow">
                <img
                  src={heroImage}
                  alt="AI Kidney Analysis Visualization"
                  className="rounded-xl w-full"
                />
                <div className="absolute bottom-6 left-6 right-6 glass-card p-4 flex items-center gap-4 scan-line">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center pulse-ring">
                    <Scan className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Analysis Complete</div>
                    <div className="text-xs text-muted-foreground">Normal kidney tissue detected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-20 animate-fade-in-up">
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
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
                delay: "delay-300",
              },
              {
                icon: FileText,
                title: "Get Results",
                description: "Receive detailed results with visual explanations and health recommendations.",
                delay: "delay-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group glass-card p-8 card-hover border-glow animate-fade-in-up ${feature.delay}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detection Types */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-20">
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">What We Detect</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our model is trained to identify four key conditions in kidney scans.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Cyst", color: "from-blue-500 to-blue-600", bgColor: "bg-blue-500/20", description: "Fluid-filled sacs in kidneys" },
              { label: "Stone", color: "from-amber-500 to-orange-500", bgColor: "bg-amber-500/20", description: "Mineral deposits in kidneys" },
              { label: "Tumor", color: "from-rose-500 to-pink-500", bgColor: "bg-rose-500/20", description: "Abnormal tissue growth" },
              { label: "Normal", color: "from-emerald-500 to-green-500", bgColor: "bg-emerald-500/20", description: "Healthy kidney tissue" },
            ].map((type, index) => (
              <div
                key={index}
                className="glass-card p-8 text-center card-hover group"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${type.color} mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 tracking-tight">{type.label}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="relative glass-card p-12 lg:p-20 overflow-hidden border-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
            <div className="relative max-w-3xl mx-auto text-center space-y-8">
              <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
                Ready to Check Your Kidney Health?
              </h2>
              <p className="text-lg text-muted-foreground">
                Create an account today and get your first scan analysis completely free.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="shadow-glow">
                    Create Free Account
                    <Users className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold tracking-tight">KidneyAI</span>
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