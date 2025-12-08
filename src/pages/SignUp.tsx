import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Activity, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showVitals, setShowVitals] = useState(false);
  const [bp, setBp] = useState("");
  const [glucose, setGlucose] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup - replace with actual auth
    setTimeout(() => {
      toast({
        title: "Account created!",
        description: "Welcome to KidneyAI. You can now upload your scans.",
      });
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen mesh-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold">KidneyAI</span>
        </Link>

        <Card variant="glass">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Start your kidney health journey today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-11"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 pr-11"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Optional Vitals */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowVitals(!showVitals)}
                  className="text-sm text-primary hover:underline"
                >
                  {showVitals ? "Hide" : "Add"} optional vitals
                </button>
              </div>

              {showVitals && (
                <div className="space-y-4 p-4 rounded-xl bg-muted/50 animate-fade-in">
                  <p className="text-xs text-muted-foreground">
                    Adding vitals can improve prediction accuracy
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bp">Blood Pressure</Label>
                      <Input
                        id="bp"
                        type="text"
                        placeholder="120/80"
                        value={bp}
                        onChange={(e) => setBp(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="glucose">Glucose (mg/dL)</Label>
                      <Input
                        id="glucose"
                        type="number"
                        placeholder="100"
                        value={glucose}
                        onChange={(e) => setGlucose(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
