import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Activity, AlertTriangle, CheckCircle, Download, Share2, ArrowLeft, Utensils, Pill, Stethoscope, Droplets } from "lucide-react";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image } = location.state || {};

  // Simulated result - replace with actual prediction
  const prediction = {
    label: "Stone",
    confidence: 94.7,
    isNormal: false,
  };

  const getResultColor = (label: string) => {
    switch (label.toLowerCase()) {
      case "normal":
        return "text-success";
      case "cyst":
        return "text-blue-500";
      case "stone":
        return "text-amber-500";
      case "tumor":
        return "text-destructive";
      default:
        return "text-foreground";
    }
  };

  const getResultBg = (label: string) => {
    switch (label.toLowerCase()) {
      case "normal":
        return "bg-success/10 border-success/30";
      case "cyst":
        return "bg-blue-500/10 border-blue-500/30";
      case "stone":
        return "bg-amber-500/10 border-amber-500/30";
      case "tumor":
        return "bg-destructive/10 border-destructive/30";
      default:
        return "bg-muted border-border";
    }
  };

  const guidance = {
    stone: {
      diet: [
        "Drink 8-12 glasses of water daily",
        "Limit sodium intake to less than 2,300mg/day",
        "Reduce animal protein consumption",
        "Avoid oxalate-rich foods (spinach, rhubarb, nuts)",
        "Increase citrus fruit intake for citrate"
      ],
      treatments: [
        "Extracorporeal Shock Wave Lithotripsy (ESWL)",
        "Ureteroscopy for larger stones",
        "Percutaneous Nephrolithotomy for very large stones",
        "Medical Expulsive Therapy for smaller stones"
      ],
      medications: [
        "Alpha blockers (Tamsulosin) to help pass stones",
        "Potassium citrate for uric acid stones",
        "Thiazide diuretics for calcium stones",
        "Allopurinol for uric acid stones"
      ]
    }
  };

  if (!image) {
    return (
      <div className="min-h-screen mesh-background flex items-center justify-center p-4">
        <Card variant="glass" className="max-w-md text-center p-8">
          <AlertTriangle className="w-16 h-16 text-warning mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">No Scan Data</h2>
          <p className="text-muted-foreground mb-6">
            Please upload a kidney scan first to see results.
          </p>
          <Button variant="hero" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <Activity className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">KidneyAI</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="default" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Result Banner */}
        <Card className={`mb-8 border-2 ${getResultBg(prediction.label)} animate-fade-in-up`}>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${prediction.isNormal ? 'bg-success' : 'bg-amber-500'}`}>
                {prediction.isNormal ? (
                  <CheckCircle className="w-12 h-12 text-primary-foreground" />
                ) : (
                  <AlertTriangle className="w-12 h-12 text-primary-foreground" />
                )}
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground mb-1">Analysis Result</p>
                <h1 className={`font-display text-4xl font-bold mb-2 ${getResultColor(prediction.label)}`}>
                  {prediction.label} Detected
                </h1>
                <p className="text-lg text-muted-foreground">
                  Confidence: <span className="font-semibold text-foreground">{prediction.confidence}%</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image & Heatmap */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Scan</CardTitle>
                <CardDescription>Original kidney scan image</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  src={image}
                  alt="Uploaded kidney scan"
                  className="w-full rounded-xl shadow-md"
                />
              </CardContent>
            </Card>

            <Card variant="glass">
              <CardHeader>
                <CardTitle>Grad-CAM Heatmap</CardTitle>
                <CardDescription>
                  Areas highlighted show where the AI focused its attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <img
                    src={image}
                    alt="Grad-CAM overlay"
                    className="w-full rounded-xl"
                  />
                  {/* Simulated heatmap overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/40 via-yellow-500/30 to-transparent rounded-xl mix-blend-multiply" />
                </div>
                <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-cyan-500" />
                    Low attention
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gradient-to-r from-yellow-500 to-orange-500" />
                    Medium
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gradient-to-r from-red-500 to-rose-500" />
                    High attention
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Guidance */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-success" />
                  Dietary Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {guidance.stone.diet.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Droplets className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-primary" />
                  Treatment Options
                </CardTitle>
                <CardDescription>
                  Consult with a healthcare provider for proper diagnosis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {guidance.stone.treatments.map((treatment, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                        {index + 1}
                      </div>
                      <span>{treatment}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-warning" />
                  Possible Medications
                </CardTitle>
                <CardDescription>
                  Always consult a doctor before taking any medication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {guidance.stone.medications.map((med, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Pill className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm">{med}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl bg-warning/10 border border-warning/30">
              <p className="text-sm text-warning-foreground">
                <strong>Disclaimer:</strong> This analysis is for educational purposes only and should not be considered medical advice. Please consult with a qualified healthcare provider for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
