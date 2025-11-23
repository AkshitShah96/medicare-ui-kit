import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  LogOut, 
  UserPlus, 
  Users, 
  Calendar,
  Edit,
  Trash2,
  Stethoscope,
  Search,
  Mail,
  Phone,
  MapPin,
  FileText,
  Clock,
  Activity,
  Pill,
  TestTube
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Patient {
  id: number;
  name: string;
  age: number;
  email: string;
  phone: string;
  disease: string;
  address: string;
  dateAdded: string;
}

interface PatientHistory {
  id: number;
  patientId: number;
  date: string;
  type: "appointment" | "prescription" | "test" | "note" | "diagnosis";
  title: string;
  description: string;
  doctor?: string;
  medications?: string[];
  testResults?: string;
  followUp?: string;
}

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([
    { 
      id: 1, 
      name: "Sarah Johnson", 
      age: 45, 
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      disease: "Hypertension",
      address: "123 Main St, City, State 12345",
      dateAdded: "2024-01-15"
    },
    { 
      id: 2, 
      name: "Michael Chen", 
      age: 32, 
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      disease: "Diabetes Type 2",
      address: "456 Oak Ave, City, State 12345",
      dateAdded: "2024-02-20"
    },
    { 
      id: 3, 
      name: "Emily Davis", 
      age: 28, 
      email: "emily.davis@email.com",
      phone: "+1 (555) 345-6789",
      disease: "Asthma",
      address: "789 Pine Rd, City, State 12345",
      dateAdded: "2024-03-10"
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    age: "", 
    email: "",
    phone: "",
    disease: "",
    address: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatientForHistory, setSelectedPatientForHistory] = useState<Patient | null>(null);
  
  const [patientHistories] = useState<PatientHistory[]>([
    {
      id: 1,
      patientId: 1,
      date: "2024-03-15",
      type: "appointment",
      title: "Follow-up Consultation",
      description: "Regular check-up for hypertension management. Blood pressure readings stable.",
      doctor: "Dr. John Smith",
      followUp: "Next appointment in 3 months"
    },
    {
      id: 2,
      patientId: 1,
      date: "2024-02-20",
      type: "prescription",
      title: "Medication Prescribed",
      description: "Prescribed medications for blood pressure control",
      medications: ["Lisinopril 10mg - Once daily", "Amlodipine 5mg - Once daily"],
      doctor: "Dr. John Smith"
    },
    {
      id: 3,
      patientId: 1,
      date: "2024-02-15",
      type: "test",
      title: "Blood Test Results",
      description: "Complete blood count and lipid profile",
      testResults: "All values within normal range. Cholesterol levels improved.",
      doctor: "Dr. John Smith"
    },
    {
      id: 4,
      patientId: 1,
      date: "2024-01-15",
      type: "diagnosis",
      title: "Initial Diagnosis",
      description: "Patient diagnosed with Hypertension. Treatment plan initiated.",
      doctor: "Dr. John Smith"
    },
    {
      id: 5,
      patientId: 2,
      date: "2024-03-10",
      type: "appointment",
      title: "Diabetes Management Review",
      description: "Reviewed glucose levels and medication effectiveness. Patient showing good progress.",
      doctor: "Dr. John Smith",
      followUp: "Continue current medication, next review in 2 months"
    },
    {
      id: 6,
      patientId: 2,
      date: "2024-02-25",
      type: "prescription",
      title: "Medication Adjustment",
      description: "Adjusted Metformin dosage based on recent test results",
      medications: ["Metformin 1000mg - Twice daily", "Glipizide 5mg - Once daily"],
      doctor: "Dr. John Smith"
    },
    {
      id: 7,
      patientId: 2,
      date: "2024-02-20",
      type: "diagnosis",
      title: "Initial Diagnosis",
      description: "Patient diagnosed with Type 2 Diabetes. Comprehensive treatment plan established.",
      doctor: "Dr. John Smith"
    },
    {
      id: 8,
      patientId: 3,
      date: "2024-03-12",
      type: "appointment",
      title: "Asthma Control Check",
      description: "Reviewed asthma symptoms and inhaler technique. Patient reports good control.",
      doctor: "Dr. John Smith",
      followUp: "Continue preventive inhaler, follow-up in 1 month"
    },
    {
      id: 9,
      patientId: 3,
      date: "2024-03-10",
      type: "diagnosis",
      title: "Initial Diagnosis",
      description: "Patient diagnosed with Asthma. Prescribed preventive and rescue medications.",
      doctor: "Dr. John Smith"
    }
  ]);

  const handleLogout = () => {
    toast({ title: "Logged out successfully" });
    navigate("/");
  };

  const handleAddPatient = (e: FormEvent) => {
    e.preventDefault();
    const newPatient: Patient = {
      id: Math.max(...patients.map(p => p.id), 0) + 1,
      name: formData.name,
      age: parseInt(formData.age, 10),
      email: formData.email,
      phone: formData.phone,
      disease: formData.disease,
      address: formData.address,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setPatients([...patients, newPatient]);
    toast({ 
      title: "Patient added successfully",
      description: `${formData.name} has been added to your patient list.`
    });
    setShowAddModal(false);
    setFormData({ name: "", age: "", email: "", phone: "", disease: "", address: "" });
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      age: patient.age.toString(),
      email: patient.email,
      phone: patient.phone,
      disease: patient.disease,
      address: patient.address,
    });
  };

  const handleUpdatePatient = (e: FormEvent) => {
    e.preventDefault();
    if (editingPatient) {
      setPatients(patients.map(p => 
        p.id === editingPatient.id
          ? { 
              ...p, 
              name: formData.name, 
              age: parseInt(formData.age, 10), 
              email: formData.email,
              phone: formData.phone,
              disease: formData.disease,
              address: formData.address
            }
          : p
      ));
      toast({ 
        title: "Patient updated successfully",
        description: `${formData.name}'s information has been updated.`
      });
      setEditingPatient(null);
      setFormData({ name: "", age: "", email: "", phone: "", disease: "", address: "" });
    }
  };

  const handleDeletePatient = (id: number) => {
    const patient = patients.find(p => p.id === id);
    setPatients(patients.filter(p => p.id !== id));
    toast({ 
      title: "Patient removed successfully",
      description: patient ? `${patient.name} has been removed from your patient list.` : undefined
    });
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery) ||
    patient.disease.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPatientHistory = (patientId: number) => {
    return patientHistories
      .filter(history => history.patientId === patientId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getHistoryIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-4 w-4" />;
      case "prescription":
        return <Pill className="h-4 w-4" />;
      case "test":
        return <TestTube className="h-4 w-4" />;
      case "diagnosis":
        return <Activity className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getHistoryColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "prescription":
        return "bg-green-100 text-green-700 border-green-200";
      case "test":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "diagnosis":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Stethoscope className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-semibold text-foreground">Dr. John Smith</h1>
              <p className="text-sm text-muted-foreground">Cardiology Specialist</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Prominent Add Patient Banner */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <UserPlus className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Add New Patient</h3>
                  <p className="text-sm text-muted-foreground">
                    Manually add a new patient to your records with complete information
                  </p>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={() => setShowAddModal(true)}
                className="w-full md:w-auto"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Add Patient Manually
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Doctor Portal Menu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="default"
                  className="w-full justify-start bg-primary hover:bg-primary/90"
                  onClick={() => setShowAddModal(true)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Patient
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    document.getElementById('patient-list')?.scrollIntoView({ behavior: 'smooth' });
                    setSearchQuery("");
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View All Patients
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Patient Management</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your patients, add new records manually, and update information
                </p>
              </div>
              <Button onClick={() => setShowAddModal(true)} variant="outline">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </div>

            {/* Search Bar */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients by name, email, phone, or disease..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Patient Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                      <p className="text-2xl font-bold text-foreground">{patients.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary opacity-50" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Showing</p>
                      <p className="text-2xl font-bold text-foreground">{filteredPatients.length}</p>
                    </div>
                    <Search className="h-8 w-8 text-primary opacity-50" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">This Month</p>
                      <p className="text-2xl font-bold text-foreground">
                        {patients.filter(p => {
                          const patientDate = new Date(p.dateAdded);
                          const now = new Date();
                          return patientDate.getMonth() === now.getMonth() && 
                                 patientDate.getFullYear() === now.getFullYear();
                        }).length}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card id="patient-list">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  {filteredPatients.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">
                        {searchQuery ? "No patients found matching your search." : "No patients yet. Add your first patient!"}
                      </p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Patient Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Contact</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Age</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Condition</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date Added</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredPatients.map((patient) => (
                          <tr key={patient.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-medium text-foreground">{patient.name}</div>
                              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {patient.address}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-foreground flex items-center gap-2 mb-1">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                {patient.email}
                              </div>
                              <div className="text-sm text-foreground flex items-center gap-2">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                {patient.phone}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-foreground">{patient.age} years</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {patient.disease}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{patient.dateAdded}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setSelectedPatientForHistory(patient)}
                                  title="View patient history"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEditPatient(patient)}
                                  title="Edit patient"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeletePatient(patient.id)}
                                  title="Delete patient"
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Add Patient Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <UserPlus className="h-6 w-6 text-primary" />
              Add New Patient Manually
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Fill in all the required information to add a new patient to your records
            </p>
          </DialogHeader>
          <form onSubmit={handleAddPatient} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name *</Label>
              <Input
                id="name"
                placeholder="Enter patient's full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Age"
                  min="0"
                  max="150"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="patient@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disease">Medical Condition / Disease *</Label>
              <Input
                id="disease"
                placeholder="e.g., Hypertension, Diabetes, etc."
                value={formData.disease}
                onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                placeholder="Street address, City, State, ZIP"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1" 
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Patient History Modal */}
      <Dialog open={!!selectedPatientForHistory} onOpenChange={(open) => !open && setSelectedPatientForHistory(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-6 w-6 text-primary" />
              Patient History - {selectedPatientForHistory?.name}
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Complete medical history and records for this patient
            </p>
          </DialogHeader>
          {selectedPatientForHistory && (
            <div className="space-y-4 mt-4">
              {/* Patient Info Card */}
              <Card className="bg-muted/30">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Age</p>
                      <p className="font-semibold text-foreground">{selectedPatientForHistory.age} years</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Condition</p>
                      <p className="font-semibold text-foreground">{selectedPatientForHistory.disease}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Email</p>
                      <p className="font-semibold text-foreground text-sm">{selectedPatientForHistory.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Phone</p>
                      <p className="font-semibold text-foreground text-sm">{selectedPatientForHistory.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* History Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Medical History Timeline
                </h3>
                {getPatientHistory(selectedPatientForHistory.id).length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">No medical history recorded yet for this patient.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {getPatientHistory(selectedPatientForHistory.id).map((history) => (
                      <Card key={history.id} className="border-l-4 border-l-primary">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg border ${getHistoryColor(history.type)}`}>
                              {getHistoryIcon(history.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-foreground">{history.title}</h4>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(history.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{history.description}</p>
                              
                              {history.medications && history.medications.length > 0 && (
                                <div className="mt-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                                  <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2">Medications Prescribed:</p>
                                  <ul className="space-y-1">
                                    {history.medications.map((med, idx) => (
                                      <li key={idx} className="text-sm text-green-800 dark:text-green-300 flex items-center gap-2">
                                        <Pill className="h-3 w-3" />
                                        {med}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {history.testResults && (
                                <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                                  <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-2">Test Results:</p>
                                  <p className="text-sm text-purple-800 dark:text-purple-300">{history.testResults}</p>
                                </div>
                              )}
                              
                              {history.followUp && (
                                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Follow-up:</p>
                                  <p className="text-sm text-blue-800 dark:text-blue-300">{history.followUp}</p>
                                </div>
                              )}
                              
                              {history.doctor && (
                                <p className="text-xs text-muted-foreground mt-3">
                                  Attended by: <span className="font-medium">{history.doctor}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => setSelectedPatientForHistory(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Patient Modal */}
      <Dialog open={!!editingPatient} onOpenChange={(open) => !open && setEditingPatient(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdatePatient} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Patient Name *</Label>
              <Input
                id="edit-name"
                placeholder="Enter patient's full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-age">Age *</Label>
                <Input
                  id="edit-age"
                  type="number"
                  placeholder="Age"
                  min="0"
                  max="150"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number *</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email Address *</Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="patient@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-disease">Medical Condition / Disease *</Label>
              <Input
                id="edit-disease"
                placeholder="e.g., Hypertension, Diabetes, etc."
                value={formData.disease}
                onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Address *</Label>
              <Input
                id="edit-address"
                placeholder="Street address, City, State, ZIP"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1" 
                onClick={() => setEditingPatient(null)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Update Patient
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorDashboard;
