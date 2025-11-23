import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  LogOut, 
  FileText, 
  Users, 
  Calendar as CalendarIcon,
  User,
  DollarSign,
  Clock,
  Upload,
  Image as ImageIcon,
  X,
  Download,
  MapPin,
  Phone,
  Mail,
  Star,
  Navigation
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  uploadDate: string;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  area: string;
  address: string;
  distance: string;
  phone: string;
  email: string;
  experience: string;
  availability: string;
}

const PatientDashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [appointmentReason, setAppointmentReason] = useState<string>("");

  const handleLogout = () => {
    toast({ title: "Logged out successfully" });
    navigate("/");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a valid image file. Please upload JPG, PNG, GIF, WEBP, BMP, or SVG files.`,
          variant: "destructive"
        });
        return;
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} is too large. Maximum file size is 10MB.`,
          variant: "destructive"
        });
        return;
      }

      const preview = URL.createObjectURL(file);
      const newImage: UploadedImage = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        preview,
        name: file.name,
        size: file.size,
        uploadDate: new Date().toLocaleDateString()
      };

      setUploadedImages(prev => [...prev, newImage]);
      toast({
        title: "Image uploaded successfully",
        description: `${file.name} has been uploaded.`
      });
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (id: string) => {
    const image = uploadedImages.find(img => img.id === id);
    if (image) {
      URL.revokeObjectURL(image.preview);
      setUploadedImages(prev => prev.filter(img => img.id !== id));
      toast({
        title: "Image removed",
        description: `${image.name} has been removed.`
      });
    }
  };

  const handleDownloadImage = (image: UploadedImage) => {
    const link = document.createElement('a');
    link.href = image.preview;
    link.download = image.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(undefined);
    setSelectedTime("");
    setAppointmentReason("");
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select date and time",
        description: "You need to select both a date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }

    if (selectedDoctor) {
      toast({
        title: "Appointment Booked Successfully!",
        description: `Your appointment with ${selectedDoctor.name} is scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
      });
      setShowBookingModal(false);
      setSelectedDoctor(null);
      setSelectedDate(undefined);
      setSelectedTime("");
      setAppointmentReason("");
    }
  };

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const bills = [
    { id: 1, date: "2024-01-15", amount: "$250", status: "Paid" },
    { id: 2, date: "2024-02-20", amount: "$180", status: "Pending" },
  ];

  const [selectedArea, setSelectedArea] = useState<string>("all");
  
  const allDoctors = [
    { 
      id: 1, 
      name: "Dr. John Smith", 
      specialty: "Cardiology", 
      rating: 4.8,
      area: "Downtown",
      address: "123 Medical Center Dr, Downtown",
      distance: "0.5 km",
      phone: "+1 (555) 123-4567",
      email: "john.smith@hospital.com",
      experience: "15 years",
      availability: "Available Today"
    },
    { 
      id: 2, 
      name: "Dr. Sarah Lee", 
      specialty: "Dermatology", 
      rating: 4.9,
      area: "Downtown",
      address: "456 Health Plaza, Downtown",
      distance: "1.2 km",
      phone: "+1 (555) 234-5678",
      email: "sarah.lee@clinic.com",
      experience: "12 years",
      availability: "Available Tomorrow"
    },
    { 
      id: 3, 
      name: "Dr. Michael Chen", 
      specialty: "Pediatrics", 
      rating: 4.7,
      area: "Northside",
      address: "789 Children's Hospital, Northside",
      distance: "2.5 km",
      phone: "+1 (555) 345-6789",
      email: "michael.chen@childrens.com",
      experience: "10 years",
      availability: "Available Today"
    },
    { 
      id: 4, 
      name: "Dr. Emily Rodriguez", 
      specialty: "Orthopedics", 
      rating: 4.9,
      area: "Westside",
      address: "321 Sports Medicine Center, Westside",
      distance: "3.8 km",
      phone: "+1 (555) 456-7890",
      email: "emily.rodriguez@sportsmed.com",
      experience: "18 years",
      availability: "Available Next Week"
    },
    { 
      id: 5, 
      name: "Dr. James Wilson", 
      specialty: "Neurology", 
      rating: 4.6,
      area: "Downtown",
      address: "654 Brain Health Institute, Downtown",
      distance: "0.8 km",
      phone: "+1 (555) 567-8901",
      email: "james.wilson@neuro.com",
      experience: "20 years",
      availability: "Available Today"
    },
    { 
      id: 6, 
      name: "Dr. Lisa Anderson", 
      specialty: "Gynecology", 
      rating: 4.8,
      area: "Eastside",
      address: "987 Women's Health Clinic, Eastside",
      distance: "4.2 km",
      phone: "+1 (555) 678-9012",
      email: "lisa.anderson@womenshealth.com",
      experience: "14 years",
      availability: "Available Tomorrow"
    },
  ];

  const areas = ["all", ...Array.from(new Set(allDoctors.map(d => d.area)))];
  
  const filteredDoctors = selectedArea === "all" 
    ? allDoctors 
    : allDoctors.filter(d => d.area === selectedArea);

  const nearbyDoctors = allDoctors
    .filter(d => parseFloat(d.distance) <= 3.0)
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

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
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Welcome, Jane Doe</h1>
              <p className="text-sm text-muted-foreground">Patient Portal - View Your Medical Information</p>
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
                <CardTitle className="text-lg">Patient Portal Menu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    const imageSection = document.getElementById('image-upload-section');
                    imageSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Upload Images
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    const doctorsSection = document.getElementById('doctors-section');
                    doctorsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View Nearby Doctors
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Patient Dashboard Overview</h2>
              <p className="text-sm text-muted-foreground mt-1">
                View your medical bills, doctors, appointments, and upload images
              </p>
            </div>

            {/* Image Upload Section */}
            <Card id="image-upload-section">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Upload Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/svg+xml"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          Click to upload images
                        </p>
                        <p className="text-xs text-muted-foreground">
                          JPG, PNG, GIF, WEBP, BMP, SVG (Max 10MB per file)
                        </p>
                      </div>
                      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Select Images
                      </Button>
                    </div>
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4">
                      Uploaded Images ({uploadedImages.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {uploadedImages.map((image) => (
                        <div
                          key={image.id}
                          className="group relative border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <div className="aspect-square bg-muted relative">
                            <img
                              src={image.preview}
                              alt={image.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleDownloadImage(image)}
                                className="h-8"
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRemoveImage(image.id)}
                                className="h-8"
                              >
                                <X className="h-3 w-3 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                          <div className="p-3 bg-card">
                            <p className="text-sm font-medium text-foreground truncate" title={image.name}>
                              {image.name}
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-muted-foreground">{formatFileSize(image.size)}</p>
                              <p className="text-xs text-muted-foreground">{image.uploadDate}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {uploadedImages.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No images uploaded yet</p>
                    <p className="text-xs mt-1">Upload your first image to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>

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

            {/* Nearby Doctors Section */}
            <Card id="doctors-section">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Nearby Doctors
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Find doctors in your area with their locations and contact information
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedArea} onValueChange={setSelectedArea}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Areas</SelectItem>
                        {areas.filter(a => a !== "all").map((area) => (
                          <SelectItem key={area} value={area}>{area}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Nearby Doctors Highlight */}
                {nearbyDoctors.length > 0 && selectedArea === "all" && (
                  <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Navigation className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Doctors Within 3 km</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {nearbyDoctors.map((doctor) => (
                        <div key={doctor.id} className="p-3 bg-card border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-foreground">{doctor.name}</h4>
                              <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {doctor.distance}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Doctors List */}
                <div className="space-y-4">
                  {filteredDoctors.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground">No doctors found in this area</p>
                    </div>
                  ) : (
                    filteredDoctors.map((doctor) => (
                      <div 
                        key={doctor.id} 
                        className="p-6 border rounded-lg hover:shadow-lg transition-all bg-card"
                      >
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          {/* Doctor Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-foreground mb-1">
                                  {doctor.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {doctor.specialty} • {doctor.experience} experience
                                </p>
                              </div>
                              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded">
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                <span className="text-sm font-semibold text-foreground">
                                  {doctor.rating}
                                </span>
                              </div>
                            </div>

                            {/* Location & Distance */}
                            <div className="space-y-2 mb-4">
                              <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-foreground">{doctor.address}</p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      <Navigation className="h-3 w-3 mr-1" />
                                      {doctor.distance} away
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                      {doctor.area}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              {/* Contact Info */}
                              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  <span>{doctor.phone}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  <span>{doctor.email}</span>
                                </div>
                              </div>

                              {/* Availability */}
                              <div className="mt-3">
                                <Badge 
                                  variant={doctor.availability.includes("Today") ? "default" : "outline"}
                                  className="text-xs"
                                >
                                  {doctor.availability}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2 md:w-auto w-full">
                            <Button 
                              size="sm" 
                              className="w-full md:w-auto"
                              onClick={() => handleBookAppointment(doctor)}
                            >
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              Book Appointment
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Summary Stats */}
                <div className="mt-6 pt-6 border-t">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{filteredDoctors.length}</p>
                      <p className="text-xs text-muted-foreground">Total Doctors</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{nearbyDoctors.length}</p>
                      <p className="text-xs text-muted-foreground">Within 3 km</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {filteredDoctors.filter(d => d.availability.includes("Today")).length}
                      </p>
                      <p className="text-xs text-muted-foreground">Available Today</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {(filteredDoctors.reduce((sum, d) => sum + d.rating, 0) / filteredDoctors.length).toFixed(1)}
                      </p>
                      <p className="text-xs text-muted-foreground">Avg Rating</p>
                    </div>
                  </div>
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

      {/* Book Appointment Modal with Calendar */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <CalendarIcon className="h-6 w-6 text-primary" />
              Book Appointment
            </DialogTitle>
            <DialogDescription>
              {selectedDoctor && (
                <div className="mt-2">
                  <p className="font-medium text-foreground">With {selectedDoctor.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedDoctor.specialty} • {selectedDoctor.address}</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedDoctor && (
            <div className="space-y-6 mt-4">
              {/* Calendar Section */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Select Date</Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={isDateDisabled}
                      className="rounded-md border"
                      initialFocus
                    />
                  </div>
                  {selectedDate && (
                    <p className="text-sm text-muted-foreground mt-3 text-center">
                      Selected: {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}
                </div>

                {/* Time Selection */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Select Time</Label>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="w-full"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  {selectedTime && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Selected time: <span className="font-medium text-foreground">{selectedTime}</span>
                    </p>
                  )}
                </div>

                {/* Appointment Reason */}
                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-base font-semibold">
                    Reason for Visit (Optional)
                  </Label>
                  <Textarea
                    id="reason"
                    placeholder="Briefly describe the reason for your appointment..."
                    value={appointmentReason}
                    onChange={(e) => setAppointmentReason(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>

                {/* Appointment Summary */}
                {(selectedDate || selectedTime) && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-foreground mb-3">Appointment Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Doctor:</span>
                          <span className="font-medium text-foreground">{selectedDoctor.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Specialty:</span>
                          <span className="font-medium text-foreground">{selectedDoctor.specialty}</span>
                        </div>
                        {selectedDate && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium text-foreground">
                              {selectedDate.toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                        )}
                        {selectedTime && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Time:</span>
                            <span className="font-medium text-foreground">{selectedTime}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span className="font-medium text-foreground text-right max-w-[200px]">
                            {selectedDoctor.address}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowBookingModal(false);
                    setSelectedDate(undefined);
                    setSelectedTime("");
                    setAppointmentReason("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  onClick={handleConfirmBooking}
                  disabled={!selectedDate || !selectedTime}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Confirm Appointment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientDashboard;
