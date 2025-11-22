import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToRegister: () => void;
}

export const LoginModal = ({ open, onOpenChange, onSwitchToRegister }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo authentication - in production, use proper auth
    if (email.includes("doctor")) {
      toast({
        title: "Welcome Doctor!",
        description: "Redirecting to your dashboard...",
      });
      navigate("/doctor-dashboard");
    } else {
      toast({
        title: "Welcome Patient!",
        description: "Redirecting to your dashboard...",
      });
      navigate("/patient-dashboard");
    }
    
    onOpenChange(false);
    setEmail("");
    setPassword("");
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "A reset link has been sent to your email.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <LogIn className="h-6 w-6 text-primary" />
            Welcome Back
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email Address</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="transition-all duration-200 focus:shadow-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="transition-all duration-200 focus:shadow-md"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="link"
              className="px-0 text-primary"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </Button>
          </div>

          <div className="space-y-3">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={onSwitchToRegister}>
              Don't have an account? Register
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
