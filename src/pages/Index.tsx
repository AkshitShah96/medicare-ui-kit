import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RegistrationModal } from "@/components/auth/RegistrationModal";
import { LoginModal } from "@/components/auth/LoginModal";
import { Stethoscope, Users, Calendar, Shield } from "lucide-react";

const Index = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Stethoscope className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            MediCare Portal
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your comprehensive healthcare management system. Connect with doctors, manage appointments, and access your medical records securely.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => setShowRegister(true)} className="text-lg px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => setShowLogin(true)} className="text-lg px-8">
              Login
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Patient Management</h3>
            <p className="text-muted-foreground">
              Comprehensive patient records and medical history at your fingertips.
            </p>
          </div>
          <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <Calendar className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Appointment System</h3>
            <p className="text-muted-foreground">
              Easy scheduling and management of medical appointments.
            </p>
          </div>
          <div className="bg-card p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your data is protected with enterprise-grade security.
            </p>
          </div>
        </div>
      </div>

      <RegistrationModal
        open={showRegister}
        onOpenChange={setShowRegister}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
      
      <LoginModal
        open={showLogin}
        onOpenChange={setShowLogin}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
    </div>
  );
};

export default Index;
