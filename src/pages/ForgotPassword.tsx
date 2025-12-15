import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Heart, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setIsLoading(false);

    if (error) {
      toast.error("Failed to send reset email", {
        description: error.message,
      });
      return;
    }

    setIsEmailSent(true);
    toast.success("Reset email sent!", {
      description: "Check your inbox for the password reset link.",
    });
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-lavender-50 to-sage-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-lavender-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-md animate-fade-in-up relative z-10">
          <Link to="/" className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lavender-400 to-sage-400 flex items-center justify-center shadow-soft">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">KidneyAI</span>
          </Link>

          <Card className="border-border/50 shadow-soft bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-sage-600" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold mb-2">Check your email</h2>
                <p className="text-muted-foreground">
                  We've sent a password reset link to <strong className="text-foreground">{email}</strong>
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setIsEmailSent(false)}
                  className="text-lavender-600 hover:text-lavender-700 transition-colors"
                >
                  try again
                </button>
              </p>
            </CardContent>
            <CardFooter className="justify-center">
              <Link to="/login" className="text-sm text-lavender-600 hover:text-lavender-700 font-medium flex items-center gap-1 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-lavender-50 to-sage-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-lavender-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md animate-fade-in-up relative z-10">
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lavender-400 to-sage-400 flex items-center justify-center shadow-soft">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="font-display text-2xl font-bold text-foreground">KidneyAI</span>
        </Link>

        <Card className="border-border/50 shadow-soft bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-display">Forgot Password</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your email and we'll send you a reset link
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/80">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 border-border/50 focus:border-lavender-400 bg-background/50"
                    required
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-lavender-500 to-sage-500 hover:from-lavender-600 hover:to-sage-600 text-white shadow-soft" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <Link to="/login" className="text-sm text-lavender-600 hover:text-lavender-700 font-medium flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
