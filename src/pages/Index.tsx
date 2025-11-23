import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RegistrationModal } from "@/components/auth/RegistrationModal";
import { LoginModal } from "@/components/auth/LoginModal";
import { 
  Stethoscope, 
  Users, 
  Calendar, 
  Shield, 
  Brain,
  Heart,
  Scan,
  Sparkles,
  Zap,
  Eye,
  TrendingUp,
  Activity,
  Layers,
  Cpu,
  CheckCircle2,
  ArrowDown,
  Target,
  FileImage,
  BarChart3,
  Globe
} from "lucide-react";

const Index = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <Brain className="h-20 w-20 text-primary relative z-10" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            MedAI
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            AI-Powered Medical Diagnostics
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Revolutionary diagnostic platform leveraging deep learning to detect and monitor 11 critical diseases through advanced medical imaging analysis.
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <Button size="lg" onClick={() => setShowRegister(true)} className="text-lg px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => setShowLogin(true)} className="text-lg px-8">
              Login
            </Button>
          </div>
          <div className="animate-bounce flex justify-center">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* About MedAI Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-primary" />
                About MedAI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-base">
                MedAI is an innovative diagnostic platform leveraging deep learning to detect and monitor <strong className="text-foreground">11 critical diseases</strong>, including pneumonia, pneumothorax, cardiac enlargement, and three stages of brain tumors.
              </p>
              <p className="text-base">
                Designed to analyze <strong className="text-foreground">chest X-rays, brain X-rays, MRIs, and CT scans</strong>, MedAI aims to transform medical diagnostics by providing precise, early disease detection through a user-friendly web interface.
              </p>
              <p className="text-base">
                By utilizing <strong className="text-foreground">convolutional neural networks (CNNs)</strong> implemented in Python with TensorFlow, OpenCV, and NumPy, the system supports healthcare professionals and patients in making timely and informed decisions, especially for high-mortality conditions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="container mx-auto px-6 py-16 bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Key Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge capabilities that revolutionize medical diagnostics
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-all border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Explainable AI (XAI)</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Generates visual heatmaps to build trust by highlighting areas influencing predictions, ensuring transparency in AI decisions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Scan className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Multi-Disease Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Detects multiple diseases in a single scan, reducing the need for multiple diagnostic tests and saving time and resources.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Real-Time Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Provides instant feedback on image quality, ensuring reliable inputs for accurate diagnostic results.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Disease Progression Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                User-friendly tracking system enabling users to monitor disease changes over time with visual progression maps.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Lightweight Deployment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Optimized for offline use, making the tool accessible in resource-limited settings without constant internet connectivity.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all border-primary/20">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Stage-Based Tumor Maps</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Visual representation of tumor severity using segmentation techniques like U-Net, showing three stages of brain tumor progression.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Disease Detection Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">11 Critical Diseases Detected</h2>
          <p className="text-lg text-muted-foreground">
            Advanced AI detection for life-threatening conditions
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {[
            "Pneumonia",
            "Pneumothorax",
            "Cardiac Enlargement",
            "Brain Tumor Stage 1",
            "Brain Tumor Stage 2",
            "Brain Tumor Stage 3",
            "Lung Opacity",
            "Pleural Effusion",
            "Atelectasis",
            "Consolidation",
            "Edema"
          ].map((disease, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{disease}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="container mx-auto px-6 py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Powered by Advanced Technology</h2>
            <p className="text-lg text-muted-foreground">
              Built with cutting-edge AI and machine learning frameworks
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "TensorFlow", icon: Cpu, desc: "Deep Learning Framework" },
              { name: "OpenCV", icon: FileImage, desc: "Image Processing" },
              { name: "NumPy", icon: Layers, desc: "Numerical Computing" },
              { name: "CNNs", icon: Brain, desc: "Neural Networks" }
            ].map((tech, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <tech.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{tech.name}</h3>
                  <p className="text-xs text-muted-foreground">{tech.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mt-8 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                Research & Datasets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Inspired by research such as "Pneumonia Detection Using Convolutional Neural Networks (CNNs)", MedAI combines cutting-edge methodologies with open datasets:
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm">CheXpert</Badge>
                <Badge variant="secondary" className="text-sm">BraTS</Badge>
                <Badge variant="secondary" className="text-sm">Medical Imaging Datasets</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits & Impact Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Impact & Benefits</h2>
            <p className="text-lg text-muted-foreground">
              Transforming healthcare through AI-powered diagnostics
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  For Healthcare Professionals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Precise, early disease detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Explainable AI for trust and transparency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Reduced need for multiple diagnostic tests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Timely and informed decision-making</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-primary" />
                  Global Healthcare Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Enhanced early detection capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Improved patient outcomes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Accessible in resource-limited settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Scalable and efficient diagnostic system</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portal Features Section */}
      <section className="container mx-auto px-6 py-16 bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">MediCare Portal Features</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive healthcare management system
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Patient Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Comprehensive patient records and medical history at your fingertips.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Appointment System</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Easy scheduling and management of medical appointments with calendar integration.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Your data is protected with enterprise-grade security and privacy measures.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join MedAI today and experience the future of medical diagnostics. Connect with healthcare professionals and access advanced AI-powered diagnostic tools.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => setShowRegister(true)} className="text-lg px-8">
                Create Account
              </Button>
              <Button size="lg" variant="outline" onClick={() => setShowLogin(true)} className="text-lg px-8">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <RegistrationModal
        open={showRegister}
        onOpenChange={(open) => setShowRegister(open)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
      
      <LoginModal
        open={showLogin}
        onOpenChange={(open) => setShowLogin(open)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
    </div>
  );
};

export default Index;
