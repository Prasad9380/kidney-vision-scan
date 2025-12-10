import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Upload, Heart, User, LogOut, History as HistoryIcon, Eye, Trash2, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ScanRecord {
  id: string;
  image_url: string;
  classification: string;
  confidence: number;
  scan_type: string | null;
  findings: string | null;
  affected_region: string | null;
  recommendations: unknown;
  blood_pressure: string | null;
  glucose_level: string | null;
  notes: string | null;
  created_at: string;
}

const History = () => {
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    fetchScans();
  }, [user]);

  const fetchScans = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('scan_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Failed to fetch scans:", error);
      toast.error("Failed to load scan history");
    } else {
      setScans(data || []);
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleViewScan = (scan: ScanRecord) => {
    const recommendations = Array.isArray(scan.recommendations) ? scan.recommendations as string[] : [];
    navigate("/results", {
      state: {
        image: scan.image_url,
        analysis: {
          classification: scan.classification,
          confidence: scan.confidence,
          scanType: scan.scan_type,
          findings: scan.findings,
          affectedRegion: scan.affected_region,
          recommendations,
        },
        timestamp: scan.created_at,
        bp: scan.blood_pressure,
        glucose: scan.glucose_level,
        notes: scan.notes,
      },
    });
  };

  const handleDeleteScan = async (scanId: string) => {
    const { error } = await supabase
      .from('scan_history')
      .delete()
      .eq('id', scanId);

    if (error) {
      toast.error("Failed to delete scan");
    } else {
      toast.success("Scan deleted");
      setScans(scans.filter(s => s.id !== scanId));
    }
  };

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
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Upload className="w-5 h-5" />
            New Scan
          </Link>
          <Link to="/history" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium">
            <HistoryIcon className="w-5 h-5" />
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
          <div className="px-4 py-2 mb-2 text-sm text-muted-foreground truncate">
            {user?.email}
          </div>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={handleSignOut}>
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
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="w-5 h-5" />
          </Button>
        </header>

        <div className="p-6 lg:p-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">Scan History</h1>
            <p className="text-muted-foreground">
              View your previous kidney scan analyses
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : scans.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <HistoryIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">No scans yet</h3>
                <p className="text-muted-foreground mb-6">
                  Upload your first kidney scan to get started
                </p>
                <Button variant="hero" onClick={() => navigate("/dashboard")}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Scan
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {scans.map((scan) => (
                <Card key={scan.id} className={`border ${getResultBg(scan.classification)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={scan.image_url}
                        alt="Scan"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {scan.classification?.toUpperCase() === "NORMAL" ? (
                            <CheckCircle className="w-5 h-5 text-success" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-warning" />
                          )}
                          <span className={`font-semibold ${getResultColor(scan.classification)}`}>
                            {scan.classification}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({scan.confidence?.toFixed(1)}% confidence)
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {scan.findings}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(scan.created_at).toLocaleDateString()} at{" "}
                          {new Date(scan.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewScan(scan)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteScan(scan.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;