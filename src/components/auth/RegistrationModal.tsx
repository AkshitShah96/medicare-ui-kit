import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserPlus, Stethoscope, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

export const RegistrationModal = ({ open, onOpenChange, onSwitchToLogin }: RegistrationModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"doctor" | "patient">("patient");
  const [showDoctorDetails, setShowDoctorDetails] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    specialization: "",
    licenseNumber: "",
    clinicAddress: "",
  });

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "doctor") {
      setShowDoctorDetails(true);
    } else {
      // Patient registration complete
      toast({
        title: "Registration Successful!",
        description: "Your patient account has been created.",
      });
      onOpenChange(false);
      resetForm();
    }
  };

  const handleDoctorDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Successful!",
      description: "Your doctor account has been created.",
    });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setRole("patient");
    setShowDoctorDetails(false);
    setDoctorDetails({
      name: "",
      specialization: "",
      licenseNumber: "",
      clinicAddress: "",
    });
  };

  return (
    <>
      <Dialog open={open && !showDoctorDetails} onOpenChange={onOpenChange}>
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

      <Dialog open={showDoctorDetails} onOpenChange={(open) => !open && setShowDoctorDetails(false)}>
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
                Complete Registration
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
