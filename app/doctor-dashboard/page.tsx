"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import {
  Bell,
  Calendar,
  ChevronDown,
  ClipboardList,
  Clock,
  FileText,
  Heart,
  Home,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import useAuth from "@/utils/middleware";

export default function MedicalDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { loading } = useAuth(["doctor"]); // Only doctor can access
  
  console.log("MedicalDashboard Rendered");
  console.log("Sidebar State:", sidebarOpen);
  console.log("User Loading:", loading);

  if (loading) return <p>Loading...</p>;
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
            <span className="ml-2 text-lg font-semibold">MediCare</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="py-4">
          <nav className="space-y-1 px-2">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <Users className="mr-3 h-5 w-5" />
              Patients
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <Calendar className="mr-3 h-5 w-5" />
              Appointments
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <FileText className="mr-3 h-5 w-5" />
              Medical Records
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <MessageSquare className="mr-3 h-5 w-5" />
              Messages
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <ClipboardList className="mr-3 h-5 w-5" />
              Tasks
            </Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Button>
          </nav>
        </div>
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Dr. Smith" />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">Dr. Smith</p>
              <p className="text-xs text-muted-foreground">Cardiologist</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
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
            <div className="relative ml-4 md:ml-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] md:w-[300px] pl-8 rounded-full bg-muted"
              />
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
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Dr. Smith" />
                    <AvatarFallback>DS</AvatarFallback>
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
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/30">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Dr. Smith</p>
            </div>

            {/* Stats overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">3 remaining for today</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">2 urgent reports</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">New Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">5 unread messages</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for different sections */}
            <Tabs defaultValue="appointments" className="space-y-4">
              <TabsList>
                <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
                <TabsTrigger value="patients">Recent Patients</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
              </TabsList>

              {/* Appointments Tab */}
              <TabsContent value="appointments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>You have 12 appointments scheduled for today</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Appointment 1 */}
                    <div className="flex items-center p-3 border rounded-lg bg-white">
                      <div className="flex-shrink-0 mr-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Jane Cooper" />
                          <AvatarFallback>JC</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Jane Cooper</p>
                        <p className="text-xs text-muted-foreground">Annual Checkup</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm">09:15 AM</span>
                      </div>
                      <Badge className="ml-4" variant="outline">
                        Confirmed
                      </Badge>
                      <Button variant="ghost" size="sm" className="ml-4">
                        View
                      </Button>
                    </div>

                    {/* Appointment 2 */}
                    <div className="flex items-center p-3 border rounded-lg bg-white">
                      <div className="flex-shrink-0 mr-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Robert Fox" />
                          <AvatarFallback>RF</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Robert Fox</p>
                        <p className="text-xs text-muted-foreground">Follow-up Consultation</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm">10:30 AM</span>
                      </div>
                      <Badge className="ml-4" variant="outline">
                        Confirmed
                      </Badge>
                      <Button variant="ghost" size="sm" className="ml-4">
                        View
                      </Button>
                    </div>

                    {/* Appointment 3 */}
                    <div className="flex items-center p-3 border rounded-lg bg-white">
                      <div className="flex-shrink-0 mr-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Esther Howard" />
                          <AvatarFallback>EH</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Esther Howard</p>
                        <p className="text-xs text-muted-foreground">Blood Test Results</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm">11:45 AM</span>
                      </div>
                      <Badge className="ml-4" variant="secondary">
                        Pending
                      </Badge>
                      <Button variant="ghost" size="sm" className="ml-4">
                        View
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Appointments
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Patients Tab */}
              <TabsContent value="patients" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Patients</CardTitle>
                    <CardDescription>You have seen 8 patients in the last 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Patient 1 */}
                      <div className="flex items-center p-3 border rounded-lg bg-white">
                        <div className="flex-shrink-0 mr-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Cameron Williamson" />
                            <AvatarFallback>CW</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">Cameron Williamson</p>
                          <p className="text-xs text-muted-foreground">42 years • Male • Hypertension</p>
                        </div>
                        <Badge>Critical</Badge>
                        <Button variant="ghost" size="sm" className="ml-4">
                          View
                        </Button>
                      </div>

                      {/* Patient 2 */}
                      <div className="flex items-center p-3 border rounded-lg bg-white">
                        <div className="flex-shrink-0 mr-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Brooklyn Simmons" />
                            <AvatarFallback>BS</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">Brooklyn Simmons</p>
                          <p className="text-xs text-muted-foreground">35 years • Female • Diabetes</p>
                        </div>
                        <Badge variant="outline">Stable</Badge>
                        <Button variant="ghost" size="sm" className="ml-4">
                          View
                        </Button>
                      </div>

                      {/* Patient 3 */}
                      <div className="flex items-center p-3 border rounded-lg bg-white">
                        <div className="flex-shrink-0 mr-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Leslie Alexander" />
                            <AvatarFallback>LA</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">Leslie Alexander</p>
                          <p className="text-xs text-muted-foreground">29 years • Female • Pregnancy</p>
                        </div>
                        <Badge variant="outline">Stable</Badge>
                        <Button variant="ghost" size="sm" className="ml-4">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Patients
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Tasks Tab */}
              <TabsContent value="tasks" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>You have 5 tasks due today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="task1" />
                            <label
                              htmlFor="task1"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Review lab results for patient #1248
                            </label>
                          </div>
                          <Badge variant="outline">High</Badge>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="task2" />
                            <label
                              htmlFor="task2"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Complete medical report for insurance
                            </label>
                          </div>
                          <Badge variant="outline">Medium</Badge>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="task3" />
                            <label
                              htmlFor="task3"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Schedule follow-up for post-op patients
                            </label>
                          </div>
                          <Badge variant="outline">Medium</Badge>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="task4" />
                            <label
                              htmlFor="task4"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Update patient medication records
                            </label>
                          </div>
                          <Badge variant="outline">Low</Badge>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Tasks
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Patient Health Metrics */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Health Metrics</CardTitle>
                  <CardDescription>Overview of key health indicators across your patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Blood Pressure Control</span>
                        <span className="text-sm text-muted-foreground">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Diabetes Management</span>
                        <span className="text-sm text-muted-foreground">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Vaccination Rate</span>
                        <span className="text-sm text-muted-foreground">89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Medication Adherence</span>
                        <span className="text-sm text-muted-foreground">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your practice</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Medical report updated</p>
                        <p className="text-xs text-muted-foreground">
                          You updated the medical report for Leslie Alexander
                        </p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Appointment rescheduled</p>
                        <p className="text-xs text-muted-foreground">
                          Robert Fox rescheduled his appointment to tomorrow
                        </p>
                        <p className="text-xs text-muted-foreground">4 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New message received</p>
                        <p className="text-xs text-muted-foreground">You received a new message from Jane Cooper</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New patient registered</p>
                        <p className="text-xs text-muted-foreground">Cameron Williamson registered as a new patient</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

