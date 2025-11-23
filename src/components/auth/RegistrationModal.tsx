import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { UserPlus, Stethoscope, User, Shield, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

export const RegistrationModal = ({ open, onOpenChange, onSwitchToLogin }: RegistrationModalProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"doctor" | "patient">("patient");
  const [showDoctorDetails, setShowDoctorDetails] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    specialization: "",
    licenseNumber: "",
    clinicAddress: "",
  });

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

  const handleInitialSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    if (role === "doctor") {
      setShowDoctorDetails(true);
    } else {
      generateOTP();
      setShowOTP(true);
    }
  };

  const handleDoctorDetailsSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!doctorDetails.name || !doctorDetails.specialization || !doctorDetails.licenseNumber || !doctorDetails.clinicAddress) {
      toast({
        title: "Please fill all doctor details",
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

    if (role === "doctor") {
      toast({
        title: "Registration Successful!",
        description: "OTP verified. Your doctor account has been created. Redirecting to your dashboard...",
      });
      setTimeout(() => {
        navigate("/doctor-dashboard");
      }, 500);
    } else {
      toast({
        title: "Registration Successful!",
        description: "OTP verified. Your patient account has been created. Redirecting to your dashboard...",
      });
      setTimeout(() => {
        navigate("/patient-dashboard");
      }, 500);
    }
    
    onOpenChange(false);
    resetForm();
    setShowOTP(false);
    setOtp("");
    setGeneratedOTP("");
    setOtpTimer(0);
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

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setRole("patient");
    setShowDoctorDetails(false);
    setShowOTP(false);
    setOtp("");
    setGeneratedOTP("");
    setOtpTimer(0);
    setDoctorDetails({
      name: "",
      specialization: "",
      licenseNumber: "",
      clinicAddress: "",
    });
  };

  return (
    <>
      <Dialog open={open && !showDoctorDetails && !showOTP} onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetForm();
        }
        onOpenChange(isOpen);
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <UserPlus className="h-6 w-6 text-primary" />
              Create Account
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleInitialSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@hospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-200 focus:shadow-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all duration-200 focus:shadow-md"
              />
            </div>

            <div className="space-y-3">
              <Label>I am registering as a:</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as "doctor" | "patient")}>
                <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="doctor" id="doctor" />
                  <Label htmlFor="doctor" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Stethoscope className="h-4 w-4 text-primary" />
                    <span>Doctor</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="patient" id="patient" />
                  <Label htmlFor="patient" className="flex items-center gap-2 cursor-pointer flex-1">
                    <User className="h-4 w-4 text-primary" />
                    <span>Patient</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Button type="submit" className="w-full">
                Continue
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={onSwitchToLogin}>
                Already have an account? Login
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showDoctorDetails && !showOTP} onOpenChange={(open) => !open && setShowDoctorDetails(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Stethoscope className="h-6 w-6 text-primary" />
              Doctor Details
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDoctorDetailsSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Dr. John Smith"
                value={doctorDetails.name}
                onChange={(e) => setDoctorDetails({ ...doctorDetails, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                placeholder="Cardiology"
                value={doctorDetails.specialization}
                onChange={(e) => setDoctorDetails({ ...doctorDetails, specialization: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="license">License Number</Label>
              <Input
                id="license"
                placeholder="MD123456"
                value={doctorDetails.licenseNumber}
                onChange={(e) => setDoctorDetails({ ...doctorDetails, licenseNumber: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Clinic Address</Label>
              <Input
                id="address"
                placeholder="123 Medical Center Dr."
                value={doctorDetails.clinicAddress}
                onChange={(e) => setDoctorDetails({ ...doctorDetails, clinicAddress: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setShowDoctorDetails(false)} className="flex-1">
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Send OTP
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* OTP Verification Dialog */}
      <Dialog open={showOTP} onOpenChange={(isOpen) => {
        if (!isOpen) {
          setShowOTP(false);
          setOtp("");
          setGeneratedOTP("");
          setOtpTimer(0);
          if (role === "doctor") {
            setShowDoctorDetails(true);
          }
        }
      }}>
        <DialogContent className="sm:max-w-md">
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
                Verify OTP & Complete Registration
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
                  if (role === "doctor") {
                    setShowDoctorDetails(true);
                  }
                }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
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
        </DialogContent>
      </Dialog>
    </>
  );
};
