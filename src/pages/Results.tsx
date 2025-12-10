import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Activity, AlertTriangle, CheckCircle, Download, Share2, ArrowLeft, Utensils, Pill, Stethoscope, Droplets, Clock, Shield, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import { useState } from "react";
import { toast } from "sonner";

interface AnalysisResult {
  classification: string;
  confidence: number;
  scanType: string;
  findings: string;
  affectedRegion: string;
  recommendations: string[];
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, analysis, timestamp } = location.state || {};
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const prediction: AnalysisResult = analysis || {
    classification: "NORMAL",
    confidence: 0,
    scanType: "unknown",
    findings: "No analysis available",
    affectedRegion: "N/A",
    recommendations: []
  };

  const isNormal = prediction.classification?.toUpperCase() === "NORMAL";

  const getResultColor = (label: string) => {
    switch (label?.toUpperCase()) {
      case "NORMAL":
        return "text-success";
      case "CYST":
        return "text-blue-500";
      case "STONE":
        return "text-amber-500";
      case "TUMOR":
        return "text-destructive";
      default:
        return "text-foreground";
    }
  };

  const getResultBg = (label: string) => {
    switch (label?.toUpperCase()) {
      case "NORMAL":
        return "bg-success/10 border-success/30";
      case "CYST":
        return "bg-blue-500/10 border-blue-500/30";
      case "STONE":
        return "bg-amber-500/10 border-amber-500/30";
      case "TUMOR":
        return "bg-destructive/10 border-destructive/30";
      default:
        return "bg-muted border-border";
    }
  };

  const getIconBg = (label: string) => {
    switch (label?.toUpperCase()) {
      case "NORMAL":
        return "bg-success";
      case "CYST":
        return "bg-blue-500";
      case "STONE":
        return "bg-amber-500";
      case "TUMOR":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  // Condition-specific guidance
  const guidance: Record<string, { diet: string[]; treatments: string[]; medications: string[] }> = {
    STONE: {
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
    },
    CYST: {
      diet: [
        "Maintain a balanced, low-sodium diet",
        "Stay well hydrated with water",
        "Limit caffeine consumption",
        "Avoid excessive protein intake",
        "Include anti-inflammatory foods"
      ],
      treatments: [
        "Regular monitoring with ultrasound",
        "Aspiration and sclerotherapy for large cysts",
        "Laparoscopic cyst decortication if symptomatic",
        "Surgical removal in rare cases"
      ],
      medications: [
        "Pain management with OTC analgesics",
        "Blood pressure medications if needed",
        "Antibiotics if infection develops",
        "Tolvaptan for polycystic kidney disease"
      ]
    },
    TUMOR: {
      diet: [
        "Focus on anti-inflammatory foods",
        "Increase fruits and vegetables",
        "Limit processed and red meats",
        "Maintain healthy body weight",
        "Consider plant-based proteins"
      ],
      treatments: [
        "Partial nephrectomy (kidney-sparing surgery)",
        "Radical nephrectomy for larger tumors",
        "Ablation therapy for small tumors",
        "Active surveillance for small, slow-growing tumors"
      ],
      medications: [
        "Targeted therapy drugs (Sunitinib, Pazopanib)",
        "Immunotherapy (Nivolumab, Pembrolizumab)",
        "Combination therapies as recommended",
        "Pain management as needed"
      ]
    },
    NORMAL: {
      diet: [
        "Maintain a balanced, healthy diet",
        "Stay hydrated with adequate water intake",
        "Limit sodium and processed foods",
        "Include plenty of fruits and vegetables",
        "Moderate protein intake"
      ],
      treatments: [
        "Continue regular health checkups",
        "Annual kidney function tests recommended",
        "Monitor blood pressure regularly",
        "Maintain healthy lifestyle habits"
      ],
      medications: [
        "No medications typically needed",
        "Continue any prescribed medications",
        "Consult doctor before starting supplements",
        "Preventive care as recommended"
      ]
    }
  };

  const currentGuidance = guidance[prediction.classification?.toUpperCase()] || guidance.NORMAL;

  const generatePdfReport = async () => {
    setIsGeneratingPdf(true);
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let yPos = 20;

      // Header with gradient-like styling
      pdf.setFillColor(14, 165, 233); // Primary color
      pdf.rect(0, 0, pageWidth, 45, "F");
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold");
      pdf.text("KidneyAI Analysis Report", margin, 28);
      
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const reportDate = timestamp ? new Date(timestamp).toLocaleString() : new Date().toLocaleString();
      pdf.text(`Generated: ${reportDate}`, margin, 38);

      yPos = 55;

      // Classification Result Box
      const classColor = prediction.classification?.toUpperCase() === "NORMAL" 
        ? [34, 197, 94] // Green
        : prediction.classification?.toUpperCase() === "CYST"
        ? [59, 130, 246] // Blue
        : prediction.classification?.toUpperCase() === "STONE"
        ? [245, 158, 11] // Amber
        : [239, 68, 68]; // Red for tumor
      
      pdf.setFillColor(classColor[0], classColor[1], classColor[2]);
      pdf.roundedRect(margin, yPos, contentWidth, 30, 3, 3, "F");
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      const resultText = `${prediction.classification} ${prediction.classification?.toUpperCase() === "NORMAL" ? "Kidney" : "Detected"}`;
      pdf.text(resultText, margin + 10, yPos + 15);
      
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Confidence: ${prediction.confidence?.toFixed(1)}% | Scan Type: ${prediction.scanType}`, margin + 10, yPos + 24);

      yPos += 40;

      // Add the scan image
      if (image) {
        pdf.setTextColor(30, 41, 59);
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Uploaded Scan Image", margin, yPos);
        yPos += 5;

        try {
          const imgData = image;
          const imgWidth = 80;
          const imgHeight = 60;
          pdf.addImage(imgData, "JPEG", margin, yPos, imgWidth, imgHeight);
          yPos += imgHeight + 10;
        } catch (imgError) {
          console.error("Could not add image to PDF:", imgError);
          yPos += 10;
        }
      }

      // AI Findings Section
      pdf.setTextColor(30, 41, 59);
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("AI Findings", margin, yPos);
      yPos += 8;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(71, 85, 105);
      
      const findingsLines = pdf.splitTextToSize(prediction.findings, contentWidth);
      pdf.text(findingsLines, margin, yPos);
      yPos += findingsLines.length * 5 + 5;

      if (prediction.affectedRegion && prediction.affectedRegion !== "N/A") {
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(30, 41, 59);
        pdf.text("Affected Region: ", margin, yPos);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(71, 85, 105);
        pdf.text(prediction.affectedRegion, margin + 35, yPos);
        yPos += 8;
      }

      // AI Recommendations
      if (prediction.recommendations && prediction.recommendations.length > 0) {
        yPos += 5;
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(30, 41, 59);
        pdf.text("AI Recommendations:", margin, yPos);
        yPos += 6;
        
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(71, 85, 105);
        prediction.recommendations.forEach((rec) => {
          const recLines = pdf.splitTextToSize(`• ${rec}`, contentWidth - 5);
          pdf.text(recLines, margin + 5, yPos);
          yPos += recLines.length * 5 + 2;
        });
      }

      // New page for guidance
      pdf.addPage();
      yPos = 20;

      // Dietary Recommendations
      pdf.setFillColor(34, 197, 94);
      pdf.roundedRect(margin, yPos, contentWidth, 8, 2, 2, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text("Dietary Recommendations", margin + 5, yPos + 6);
      yPos += 15;

      pdf.setTextColor(71, 85, 105);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      currentGuidance.diet.forEach((tip) => {
        const tipLines = pdf.splitTextToSize(`• ${tip}`, contentWidth - 5);
        pdf.text(tipLines, margin + 5, yPos);
        yPos += tipLines.length * 5 + 3;
      });

      yPos += 10;

      // Treatment Options
      pdf.setFillColor(14, 165, 233);
      pdf.roundedRect(margin, yPos, contentWidth, 8, 2, 2, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text("Treatment Options", margin + 5, yPos + 6);
      yPos += 15;

      pdf.setTextColor(71, 85, 105);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      currentGuidance.treatments.forEach((treatment, index) => {
        const treatmentLines = pdf.splitTextToSize(`${index + 1}. ${treatment}`, contentWidth - 5);
        pdf.text(treatmentLines, margin + 5, yPos);
        yPos += treatmentLines.length * 5 + 3;
      });

      yPos += 10;

      // Possible Medications
      pdf.setFillColor(245, 158, 11);
      pdf.roundedRect(margin, yPos, contentWidth, 8, 2, 2, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text("Possible Medications", margin + 5, yPos + 6);
      yPos += 15;

      pdf.setTextColor(71, 85, 105);
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      currentGuidance.medications.forEach((med) => {
        const medLines = pdf.splitTextToSize(`• ${med}`, contentWidth - 5);
        pdf.text(medLines, margin + 5, yPos);
        yPos += medLines.length * 5 + 3;
      });

      yPos += 15;

      // Disclaimer
      pdf.setFillColor(254, 243, 199);
      pdf.roundedRect(margin, yPos, contentWidth, 25, 2, 2, "F");
      pdf.setTextColor(146, 64, 14);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.text("Disclaimer:", margin + 5, yPos + 8);
      pdf.setFont("helvetica", "normal");
      const disclaimerText = "This AI analysis is for educational purposes only and should not be considered medical advice. Please consult with a qualified healthcare provider for proper diagnosis and treatment.";
      const disclaimerLines = pdf.splitTextToSize(disclaimerText, contentWidth - 10);
      pdf.text(disclaimerLines, margin + 5, yPos + 14);

      // Footer
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(148, 163, 184);
        pdf.text(`Page ${i} of ${pageCount} | KidneyAI Report`, pageWidth / 2, pdf.internal.pageSize.getHeight() - 10, { align: "center" });
      }

      // Save the PDF
      const fileName = `KidneyAI_Report_${prediction.classification}_${new Date().toISOString().split("T")[0]}.pdf`;
      pdf.save(fileName);
      toast.success("PDF report downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF report");
    } finally {
      setIsGeneratingPdf(false);
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
            <Button variant="default" size="sm" onClick={generatePdfReport} disabled={isGeneratingPdf}>
              {isGeneratingPdf ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {isGeneratingPdf ? "Generating..." : "Download Report"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Result Banner */}
        <Card className={`mb-8 border-2 ${getResultBg(prediction.classification)} animate-fade-in-up`}>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${getIconBg(prediction.classification)}`}>
                {isNormal ? (
                  <CheckCircle className="w-12 h-12 text-primary-foreground" />
                ) : (
                  <AlertTriangle className="w-12 h-12 text-primary-foreground" />
                )}
              </div>
              <div className="text-center md:text-left flex-1">
                <p className="text-sm text-muted-foreground mb-1">AI Analysis Result</p>
                <h1 className={`font-display text-4xl font-bold mb-2 ${getResultColor(prediction.classification)}`}>
                  {prediction.classification} {isNormal ? "Kidney" : "Detected"}
                </h1>
                <p className="text-lg text-muted-foreground">
                  Confidence: <span className="font-semibold text-foreground">{prediction.confidence?.toFixed(1)}%</span>
                  <span className="mx-2">•</span>
                  Scan Type: <span className="font-semibold text-foreground capitalize">{prediction.scanType}</span>
                </p>
              </div>
              {timestamp && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {new Date(timestamp).toLocaleString()}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image & Findings */}
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
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  AI Findings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Analysis</p>
                  <p className="text-foreground">{prediction.findings}</p>
                </div>
                {prediction.affectedRegion && prediction.affectedRegion !== "N/A" && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Affected Region</p>
                    <p className="text-foreground">{prediction.affectedRegion}</p>
                  </div>
                )}
                {prediction.recommendations && prediction.recommendations.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">AI Recommendations</p>
                    <ul className="space-y-2">
                      {prediction.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
                  {currentGuidance.diet.map((tip, index) => (
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
                  {currentGuidance.treatments.map((treatment, index) => (
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
                  {currentGuidance.medications.map((med, index) => (
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
              <p className="text-sm text-foreground">
                <strong>Disclaimer:</strong> This AI analysis is for educational purposes only and should not be considered medical advice. Please consult with a qualified healthcare provider for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
