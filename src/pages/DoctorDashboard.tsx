import { useState } from "react";
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
  Stethoscope
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Patient {
  id: number;
  name: string;
  age: number;
  disease: string;
}

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "Sarah Johnson", age: 45, disease: "Hypertension" },
    { id: 2, name: "Michael Chen", age: 32, disease: "Diabetes Type 2" },
    { id: 3, name: "Emily Davis", age: 28, disease: "Asthma" },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({ name: "", age: "", disease: "" });

  const handleLogout = () => {
    toast({ title: "Logged out successfully" });
    navigate("/");
  };

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient = {
      id: patients.length + 1,
      name: formData.name,
      age: parseInt(formData.age),
      disease: formData.disease,
    };
    setPatients([...patients, newPatient]);
    toast({ title: "Patient added successfully" });
    setShowAddModal(false);
    setFormData({ name: "", age: "", disease: "" });
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      age: patient.age.toString(),
      disease: patient.disease,
    });
  };

  const handleUpdatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPatient) {
      setPatients(patients.map(p => 
        p.id === editingPatient.id
          ? { ...p, name: formData.name, age: parseInt(formData.age), disease: formData.disease }
          : p
      ));
      toast({ title: "Patient updated successfully" });
      setEditingPatient(null);
      setFormData({ name: "", age: "", disease: "" });
    }
  };

  const handleDeletePatient = (id: number) => {
    setPatients(patients.filter(p => p.id !== id));
    toast({ title: "Patient removed successfully" });
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dashboard Menu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setShowAddModal(true)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  View Patients
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Appointments
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">Patient Management</h2>
              <Button onClick={() => setShowAddModal(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Age</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Disease</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {patients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 text-sm text-foreground">{patient.name}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{patient.age}</td>
                          <td className="px-6 py-4 text-sm text-foreground">{patient.disease}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditPatient(patient)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeletePatient(patient.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Add Patient Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddPatient} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disease">Disease</Label>
              <Input
                id="disease"
                value={formData.disease}
                onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">Add Patient</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Patient Modal */}
      <Dialog open={!!editingPatient} onOpenChange={() => setEditingPatient(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdatePatient} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Patient Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-age">Age</Label>
              <Input
                id="edit-age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-disease">Disease</Label>
              <Input
                id="edit-disease"
                value={formData.disease}
                onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">Update Patient</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorDashboard;
