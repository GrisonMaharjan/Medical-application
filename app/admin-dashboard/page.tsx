"use client"

import React from "react";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import {
  Activity,
  Bell,
  Calendar,
  ChevronDown,
  CreditCard,
  FileText,
  LayoutDashboard,
  Menu,
  MessageSquare,
  PieChart,
  Settings,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useAuth from "@/utils/middleware";

// Mock data for recent patients
const recentPatients = [
  {
    id: "P001",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2024-03-02",
    status: "Active",
    doctor: "Dr. Smith",
    type: "Follow-up",
  },
  {
    id: "P002",
    name: "Michael Brown",
    email: "michael.b@example.com",
    date: "2024-03-02",
    status: "Pending",
    doctor: "Dr. Wilson",
    type: "New Patient",
  },
  {
    id: "P003",
    name: "Emma Davis",
    email: "emma.d@example.com",
    date: "2024-03-01",
    status: "Completed",
    doctor: "Dr. Johnson",
    type: "Regular Checkup",
  },
]

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    user: "Dr. Smith",
    action: "Updated patient records",
    time: "5 minutes ago",
    icon: FileText,
  },
  {
    id: 2,
    user: "Admin Staff",
    action: "Processed insurance claim",
    time: "10 minutes ago",
    icon: CreditCard,
  },
  {
    id: 3,
    user: "Dr. Johnson",
    action: "Completed appointment",
    time: "15 minutes ago",
    icon: Calendar,
  },
]

export default function AdminDashboard() {
  const { loading } = useAuth(["admin"]); // ✅ Allow only "admin"
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/medical-login"); // Redirect to login if no token
    } else {
      fetch("http://localhost:5000/dashboard", {
        headers: { Authorization: token },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Unauthorized!") {
            localStorage.removeItem("token");
            router.push("/medical-login");
          } else {
            setUser(data.userId); // Store user ID (or fetch user details)
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          router.push("/medical-login");
        });
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/medical-login"); // Redirect if not logged in
      return;
    }

    fetch("http://localhost:5000/dashboard", {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => router.push("/medical-login"));
  }, []);

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
            <Activity className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-semibold">MediAdmin</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col gap-1 p-4">
          <Button variant="ghost" className="justify-start">
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground">
            <Users className="mr-3 h-5 w-5" />
            Patients
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground">
            <Calendar className="mr-3 h-5 w-5" />
            Appointments
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
            <div className="ml-4 md:ml-0">
              <h2 className="font-semibold">Admin Dashboard</h2>
              <p className="text-sm text-muted-foreground">Welcome back, Admin </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                3
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
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">6 pending confirmations</p>
                </CardContent>
              </Card>
              {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">3 on leave today</p>
                </CardContent>
              </Card> */}
              {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12,345</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card> */}
            </div>

            {/* Recent Patients and Activity */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Recent Patients */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Patients</CardTitle>
                    <CardDescription>Latest patient registrations and appointments</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View All</DropdownMenuItem>
                      <DropdownMenuItem>Export List</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentPatients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {patient.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{patient.name}</div>
                                <div className="text-sm text-muted-foreground">{patient.type}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                patient.status === "Active"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : patient.status === "Pending"
                                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                    : "bg-blue-50 text-blue-700 border-blue-200"
                              }
                            >
                              {patient.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{patient.doctor}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Patients
                  </Button>
                </CardFooter>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <activity.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{activity.user}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Button className="h-auto py-4 flex flex-col items-center gap-2" variant="outline">
                    <Calendar className="h-5 w-5" />
                    <span>Schedule Appointment</span>
                  </Button>
                  <Button className="h-auto py-4 flex flex-col items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Add New Patient</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Staff Management */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Staff Management</CardTitle>
                  <CardDescription>Manage doctors and administrative staff</CardDescription>
                </div>
                <Button>Add Staff Member</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input placeholder="Search staff..." className="max-w-sm" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="doctor">Doctors</SelectItem>
                        <SelectItem value="nurse">Patient</SelectItem>
                        <SelectItem value="admin">Admin Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Smith" />
                              <AvatarFallback>DS</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">Dr. Sarah Smith</div>
                              <div className="text-sm text-muted-foreground">sarah.smith@example.com</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>Doctor</TableCell>
                        <TableCell>Cardiology</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>View Schedule</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      {/* Add more staff rows as needed */}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  <Button variant="outline">Previous</Button>
                  <div className="text-sm text-muted-foreground">Page 1 of 10</div>
                  <Button variant="outline">Next</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

