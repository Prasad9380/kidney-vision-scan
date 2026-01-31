import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Heart, Shield, Zap, ArrowRight, Upload, FileText, Users, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-kidney.jpg";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen mesh-background relative overflow-hidden">
      {/* Soft background shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="hero-glow" />
        <div className="absolute top-20 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-[100px] floating-element" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-success/15 to-primary/10 blur-[80px] floating-element delay-300" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold">KidneyAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-full">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" size="sm" className="rounded-full shadow-md">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Leaf className="w-4 h-4" />
                <span>Gentle & Accurate Analysis</span>
              </div>
              <h1 className="font-display text-5xl lg:text-6xl font-semibold leading-[1.15] text-foreground">
                Caring for Your{" "}
                <span className="gradient-text">Kidney Health</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Upload your kidney scan and receive thoughtful, AI-powered analysis. 
                Early detection in a calm, supportive environment.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="rounded-full shadow-glow">
                    Begin Your Journey
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/tips">
                  <Button variant="outline" size="xl" className="rounded-full border-border hover:border-primary/40 hover:bg-primary/5">
                    Wellness Tips
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-12 pt-8">
                {[
                  { value: "98%", label: "Accuracy" },
                  { value: "10K+", label: "Scans" },
                  { value: "<5s", label: "Results" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="font-display text-3xl font-semibold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-fade-in delay-300">
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/25 via-accent/15 to-success/10 rounded-[2.5rem] blur-3xl breathe" />
              <div className="relative glass-card p-3 overflow-hidden">
                <img
                  src={heroImage}
                  alt="AI Kidney Analysis Visualization"
                  className="rounded-2xl w-full"
                />
                <div className="absolute bottom-5 left-5 right-5 glass-card p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-success/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Analysis Complete</div>
                    <div className="text-xs text-muted-foreground">Healthy kidney detected</div>
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
            <h2 className="font-display text-4xl font-semibold">A Gentle Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our caring AI system guides you through every step with clarity and compassion.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Upload Safely",
                description: "Securely share your kidney scan in a private, protected environment.",
                delay: "delay-100",
              },
              {
                icon: Zap,
                title: "Gentle Analysis",
                description: "Our AI carefully examines your scan with precision and care.",
                delay: "delay-200",
              },
              {
                icon: FileText,
                title: "Clear Guidance",
                description: "Receive easy-to-understand results with supportive recommendations.",
                delay: "delay-300",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group glass-card p-10 card-hover animate-fade-in-up ${feature.delay}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-medium mb-4">{feature.title}</h3>
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
            <h2 className="font-display text-4xl font-semibold">What We Look For</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our model is trained to identify key conditions with care and accuracy.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Cyst", color: "from-blue-400 to-blue-500", description: "Fluid-filled sacs" },
              { label: "Stone", color: "from-amber-400 to-orange-400", description: "Mineral deposits" },
              { label: "Tumor", color: "from-rose-400 to-pink-400", description: "Tissue growth" },
              { label: "Normal", color: "from-emerald-400 to-green-400", description: "Healthy tissue" },
            ].map((type, index) => (
              <div
                key={index}
                className="glass-card p-8 text-center card-hover group"
              >
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${type.color} mx-auto mb-6 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-500`}>
                  <Heart className="w-9 h-9 text-white" />
                </div>
                <h3 className="font-display text-xl font-medium mb-2">{type.label}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="relative glass-card p-12 lg:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8" />
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/15 rounded-full blur-[80px] floating-element" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/15 rounded-full blur-[80px] floating-element delay-300" />
            <div className="relative max-w-2xl mx-auto text-center space-y-6">
              <h2 className="font-display text-4xl font-semibold">
                Begin Your Health Journey
              </h2>
              <p className="text-lg text-muted-foreground">
                Create your free account and take the first step toward peace of mind.
              </p>
              <div className="pt-4">
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="rounded-full shadow-glow">
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
      <footer className="py-12 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold">KidneyAI</span>
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