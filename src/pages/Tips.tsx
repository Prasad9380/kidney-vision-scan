import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, ArrowLeft, Droplets, Apple, Dumbbell, Stethoscope, Moon, AlertCircle } from "lucide-react";

const Tips = () => {
  const tips = [
    {
      icon: Droplets,
      title: "Stay Hydrated",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      items: [
        "Drink 8-10 glasses of water daily",
        "Monitor urine color - pale yellow is ideal",
        "Increase intake during hot weather or exercise",
        "Limit caffeinated and sugary drinks"
      ]
    },
    {
      icon: Apple,
      title: "Healthy Diet",
      color: "text-success",
      bg: "bg-success/10",
      items: [
        "Reduce sodium intake to less than 2,300mg/day",
        "Eat plenty of fruits and vegetables",
        "Limit processed foods and red meat",
        "Choose whole grains over refined carbs"
      ]
    },
    {
      icon: Dumbbell,
      title: "Regular Exercise",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      items: [
        "Aim for 150 minutes of moderate activity weekly",
        "Include both cardio and strength training",
        "Maintain a healthy body weight",
        "Stay active throughout the day"
      ]
    },
    {
      icon: Stethoscope,
      title: "Regular Checkups",
      color: "text-primary",
      bg: "bg-primary/10",
      items: [
        "Annual kidney function tests (eGFR, creatinine)",
        "Monitor blood pressure regularly",
        "Check blood sugar levels if diabetic",
        "Review medications with your doctor"
      ]
    },
    {
      icon: Moon,
      title: "Lifestyle Habits",
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      items: [
        "Get 7-9 hours of quality sleep",
        "Manage stress through meditation or yoga",
        "Avoid smoking and limit alcohol",
        "Take breaks during prolonged sitting"
      ]
    },
    {
      icon: AlertCircle,
      title: "Warning Signs",
      color: "text-destructive",
      bg: "bg-destructive/10",
      items: [
        "Changes in urination patterns",
        "Blood in urine or foamy urine",
        "Persistent fatigue or weakness",
        "Swelling in feet, ankles, or face"
      ]
    }
  ];

  return (
    <div className="min-h-screen mesh-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">KidneyAI</span>
            </Link>
          </div>
          <Link to="/signup">
            <Button variant="default" size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-display text-4xl font-bold mb-4">
            Healthy Kidney <span className="gradient-text">Tips</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these guidelines to maintain optimal kidney health and prevent kidney disease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl ${tip.bg} flex items-center justify-center mb-4`}>
                  <tip.icon className={`w-6 h-6 ${tip.color}`} />
                </div>
                <CardTitle className="text-xl">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tip.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${tip.color.replace('text-', 'bg-')} mt-2 shrink-0`} />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center animate-fade-in-up delay-500">
          <Card variant="glass" className="max-w-2xl mx-auto p-8">
            <h2 className="font-display text-2xl font-bold mb-4">
              Ready to Check Your Kidney Health?
            </h2>
            <p className="text-muted-foreground mb-6">
              Upload your kidney scan and get instant AI-powered analysis with personalized recommendations.
            </p>
            <Link to="/signup">
              <Button variant="hero" size="lg">
                Start Your Analysis
              </Button>
            </Link>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Tips;
