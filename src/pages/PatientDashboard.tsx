import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LogOut, 
  FileText, 
  Users, 
  Calendar,
  User,
  DollarSign,
  Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PatientDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({ title: "Logged out successfully" });
    navigate("/");
  };

  const bills = [
    { id: 1, date: "2024-01-15", amount: "$250", status: "Paid" },
    { id: 2, date: "2024-02-20", amount: "$180", status: "Pending" },
  ];

  const doctors = [
    { id: 1, name: "Dr. John Smith", specialty: "Cardiology", rating: "4.8" },
    { id: 2, name: "Dr. Sarah Lee", specialty: "Dermatology", rating: "4.9" },
  ];

  const appointments = [
    { id: 1, doctor: "Dr. John Smith", date: "2024-03-15", time: "10:00 AM" },
    { id: 2, doctor: "Dr. Sarah Lee", date: "2024-03-20", time: "2:30 PM" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-semibold text-foreground">Welcome, Jane Doe</h1>
              <p className="text-sm text-muted-foreground">Patient Portal</p>
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
                <CardTitle className="text-lg">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Bills
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  View Doctors
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Appointments
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">My Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ View Bills</li>
                  <li>✓ View Doctors</li>
                  <li>✓ View Appointments</li>
                  <li>✓ Book Appointments</li>
                </ul>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Dashboard Overview</h2>

            {/* Bills Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Recent Bills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bills.map((bill) => (
                    <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-medium text-foreground">Bill #{bill.id}</p>
                        <p className="text-sm text-muted-foreground">{bill.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{bill.amount}</p>
                        <p className={`text-sm ${bill.status === "Paid" ? "text-primary" : "text-yellow-600"}`}>
                          {bill.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Doctors Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  My Doctors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Appointments Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-medium text-foreground">{appointment.doctor}</p>
                        <p className="text-sm text-muted-foreground">{appointment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{appointment.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
