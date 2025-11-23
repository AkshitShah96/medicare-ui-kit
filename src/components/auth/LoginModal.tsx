import { useState, type FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { LogIn, Shield, ArrowLeft } from "lucide-react";
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
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const navigate = useNavigate();

  const generateOTP = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otpCode);
    setOtpTimer(300);
    
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    toast({
      title: "OTP Sent!",
      description: `OTP sent to ${email}. Please enter 000000 to proceed.`,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    generateOTP();
    setShowOTP(true);
  };

  const handleOTPVerify = (e: FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit OTP.",
        variant: "destructive"
      });
      return;
    }

    if (otp !== "000000") {
      toast({
        title: "Invalid OTP",
        description: "Please enter 000000 to proceed.",
        variant: "destructive"
      });
      setOtp("");
      return;
    }

    if (email.includes("doctor")) {
      toast({
        title: "Welcome Doctor!",
        description: "OTP verified. Redirecting to your dashboard...",
      });
      navigate("/doctor-dashboard");
    } else {
      toast({
        title: "Welcome Patient!",
        description: "OTP verified. Redirecting to your dashboard...",
      });
      navigate("/patient-dashboard");
    }
    
    onOpenChange(false);
    setEmail("");
    setPassword("");
    setOtp("");
    setShowOTP(false);
    setGeneratedOTP("");
  };

  const handleResendOTP = () => {
    generateOTP();
    setOtp("");
    toast({
      title: "OTP Resent",
      description: "A new OTP has been sent to your email.",
    });
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "A reset link has been sent to your email.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) {
        setShowOTP(false);
        setOtp("");
        setEmail("");
        setPassword("");
        setGeneratedOTP("");
        setOtpTimer(0);
      }
    }}>
      <DialogContent className="sm:max-w-md">
        {!showOTP ? (
          <>
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
                  Send OTP
                </Button>
                <Button type="button" variant="ghost" className="w-full" onClick={onSwitchToRegister}>
                  Don't have an account? Register
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Shield className="h-6 w-6 text-primary" />
                Verify OTP
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-2">
                We've sent a 6-digit OTP to <span className="font-medium text-foreground">{email}</span>
              </p>
            </DialogHeader>
            <form onSubmit={handleOTPVerify} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {otpTimer > 0 && (
                  <p className="text-center text-sm text-muted-foreground">
                    OTP expires in: <span className="font-medium text-foreground">{formatTimer(otpTimer)}</span>
                  </p>
                )}

                {otpTimer === 0 && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">OTP expired</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleResendOTP}
                    >
                      Resend OTP
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Button type="submit" className="w-full" disabled={otp.length !== 6}>
                  Verify OTP
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setShowOTP(false);
                    setOtp("");
                    setGeneratedOTP("");
                    setOtpTimer(0);
                  }}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
                {otpTimer > 0 && (
                  <Button
                    type="button"
                    variant="link"
                    className="w-full text-sm"
                    onClick={handleResendOTP}
                  >
                    Didn't receive OTP? Resend
                  </Button>
                )}
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
