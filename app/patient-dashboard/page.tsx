"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import {
  Activity,
  Bell,
  Calendar,
  FileText,
  Droplets,
  Heart,
  Home,
  Menu,
  MessageSquare,
  PillIcon as Pills,
  Settings,
  X,
  Scale,
  Plus,
  Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuth from "@/utils/middleware";
import axios from 'axios';

interface UserType {
  _id: String;
  firstName: String;
  lastName: String;
  email: String;
  phoneNumber: String;
  dateOfBirth: String;
  gender: String;
  address: String;
  city: String;
  state: String;
  knownAllergies: String;
  currentMedication: String;
  medicalConditions: String;
  emergencyContactName: String;
  emergencyContactNumber: String;
  password: String;
  role: String;
  agreeTos: Boolean; 
  agreePrivacy: Boolean; 
}

interface AppointmentType {
  patientId: String;
    doctorId: String;
    doctorName: String;
    appointmentType: String;
    date: String;
    time: String;
    status: String;
    createdAt: String;
};

export default function PatientDashboard() {
  const router = useRouter();
  const [patientUser, setPatientUser] = useState<UserType | null>(null);
  const [doctorUser, setDoctorUser] = useState<UserType | null>(null);
  const { loading } = useAuth(["patient"]); // Only patient can access
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [waterIntake, setWaterIntake] = useState(0)
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [appointmentType, setAppointmentType] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [time, setTime] = useState("");
  const [appointment, setAppointment] = useState<AppointmentType | null>(null);;
  const [error, setError] = useState("");
  const [detailLoading, setDetailLoading] = useState(true);

  // Getting details of the patient/user
  useEffect(() => {
    axios
      .get("http://localhost:5000/getUsers")
      .then((response) => {
        if (response.data.length > 0) {
          const patientUser = response.data.find((u: UserType) => u.role === "patient") || null;
          setPatientUser(patientUser);
        }
      })
      .catch((err) => console.log("Error fetching users:", err));
  }, []);

  // Getting details of doctor
  useEffect(() => {
    axios
      .get("http://localhost:5000/getUsers")
      .then((response) => {
        if (response.data.length > 0) {
          const doctorUser = response.data.find((u: UserType) => u.role === "doctor") || null;
          setDoctorUser(doctorUser);
        }
      })
      .catch((err) => console.log("Error fetching users:", err));
  }, []);

  // Calculate BMI
  const calculateBMI = () => {
    const heightInM = Number.parseFloat(height) / 100
    const weightInKg = Number.parseFloat(weight)

    if (heightInM > 0 && weightInKg > 0) {
      const bmiValue = weightInKg / (heightInM * heightInM)
      setBmi(Number.parseFloat(bmiValue.toFixed(1)))
    }
  }

  // Get BMI category
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" }
    if (bmi < 25) return { category: "Normal", color: "text-green-500" }
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500" }
    return { category: "Obese", color: "text-red-500" }
  }

  // Handle water intake
  const updateWaterIntake = (action: "add" | "subtract") => {
    if (action === "add" && waterIntake < 8) {
      setWaterIntake((prev) => prev + 1)
    } else if (action === "subtract" && waterIntake > 0) {
      setWaterIntake((prev) => prev - 1)
    }
  }

  useEffect(() => {
        const token = localStorage.getItem("token");
  
        if (!token) {
            router.push("/medical-login"); // Redirect if no token
        } 
    }, [router]);
  
    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear JWT token
        router.push("/medical-login"); // Redirect to login page
    };

    const handleSubmit = async () => {
      if (!appointmentType || !selectedDoctor || !date || !time) {
        alert("Please fill in all fields before booking.");
        return;
      }
  
      try {
        const response = await axios.post("http://localhost:5000/book-appointment", {
          // patientName: patientUser?.firstName,
          patientId: patientUser?._id, // Assuming user is logged in
          // doctorName: doctorUser?.firstName,
          doctorId: doctorUser?._id,
          appointmentType,
          date,
          time,
        });
  
        if (response.status === 200) {
          alert("Appointment booked successfully!");
          window.location.reload(); // Refresh to update UI
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
        alert("Failed to book appointment. Try again later.");
      }
    };
  
    useEffect(() => {
      const fetchAppointment = async () => {
        try {
          const patientId = "67c55e8acce621b24aafdafe"; // Change this dynamically based on logged-in user
          const response = await fetch(`http://localhost:5000/api/appointments?patientId=${patientId}`);
  
          if (!response.ok) {
            throw new Error("Failed to fetch appointment");
          }
  
          const data = await response.json();
          setAppointment(data[0]); // Assuming only one appointment is returned
        } catch (err: any) {
          setError(err.message);
        } finally {
          setDetailLoading(false);
        }
      };
  
      fetchAppointment();
    }, []);

  if (loading) return <p>Loading...</p>
  
  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:z-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-semibold">HealthCare</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col gap-1 p-4">
          <Button variant="ghost" className="justify-start">
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground">
            <Calendar className="mr-3 h-5 w-5" />
            Appointments
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground">
            <FileText className="mr-3 h-5 w-5" />
            Medical Records
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                2
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/30">
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome back, {patientUser?.firstName ?? "Guest"} </h1>
              <p className="text-muted-foreground">Monitor your health and manage your appointments</p>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Card className="cursor-pointer hover:bg-accent transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Book Appointment</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Schedule your next visit</p>
                    </CardContent>
                  </Card>
                </SheetTrigger>
                <SheetContent className="sm:max-w-[425px] max-h-[100vh] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Book an Appointment</SheetTitle>
                    <SheetDescription>Select a date and time for your appointment</SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Appointment Type</Label>
                      <Select onValueChange={setAppointmentType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Checkup</SelectItem>
                          <SelectItem value="specialist">Specialist Consultation</SelectItem>
                          <SelectItem value="followup">Follow-up Visit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Choose Specalist</Label>
                      <Select onValueChange={setSelectedDoctor}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">Dr. {doctorUser?.firstName}</SelectItem>
                          <SelectItem value="specialist">Dr. {doctorUser?.firstName}</SelectItem>
                          <SelectItem value="followup">Dr. {doctorUser?.firstName}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Time</Label>
                      <Select onValueChange={setTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9:00 - 12:00)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (13:00 - 16:00)</SelectItem>
                          <SelectItem value="evening">Evening (17:00 - 19:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full"  onClick={handleSubmit}>Confirm Booking</Button>
                  </div>
                </SheetContent>
              </Sheet>

              {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="font-medium">Dr. {doctorUser?.firstName?? "Guest"} {doctorUser?.lastName ?? ""}</p>
                  <p className="text-xs text-muted-foreground">Tomorrow at 10:00 AM</p>
                </CardContent>
              </Card> */}

<Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="font-medium">
              Dr. {appointment?.doctorName ?? "Unknown Doctor"}
            </p>
            <p className="text-xs text-muted-foreground">
              {appointment?.date ?? "No appointment scheduled"}
            </p>
          </CardContent>
        </Card>

              {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Medications</CardTitle>
                  <Pills className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="font-medium">2 medications due</p>
                  <p className="text-xs text-muted-foreground">Next dose in 2 hours</p>
                </CardContent>
              </Card> */}

              {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="font-medium">2 unread</p>
                  <p className="text-xs text-muted-foreground">From your healthcare team</p>
                </CardContent>
              </Card> */}
            </div>

            {/* Health Metrics */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Water Intake Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    Water Intake
                  </CardTitle>
                  <CardDescription>Track your daily water consumption</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateWaterIntake("subtract")}
                      disabled={waterIntake === 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-blue-500">{waterIntake}</div>
                      <div className="text-sm text-muted-foreground">of 8 glasses</div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateWaterIntake("add")}
                      disabled={waterIntake === 8}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Progress value={(waterIntake / 8) * 100} className="h-2" />
                </CardContent>
              </Card>

              {/* BMI Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    BMI Calculator
                  </CardTitle>
                  <CardDescription>Calculate and track your BMI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="175"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={calculateBMI} className="w-full">
                    Calculate BMI
                  </Button>
                  {bmi && (
                    <div className="text-center space-y-1">
                      <div className="text-2xl font-bold">{bmi}</div>
                      <div className={`text-sm font-medium ${getBMICategory(bmi).color}`}>
                        {getBMICategory(bmi).category}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Medical Records */}
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
                <CardDescription>View your recent medical history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Jun 12, 2023</TableCell>
                      <TableCell>Annual Checkup</TableCell>
                      <TableCell>Dr. Smith</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>May 03, 2023</TableCell>
                      <TableCell>Blood Test</TableCell>
                      <TableCell>Dr. Johnson</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Apr 15, 2023</TableCell>
                      <TableCell>X-Ray</TableCell>
                      <TableCell>Dr. Williams</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Records
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

