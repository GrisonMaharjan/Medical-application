"use client"

import { useState } from "react"
import { Bell, Calendar, Check, Clock, Filter, MoreHorizontal, Search, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Mock data for appointments
const appointments = [
  {
    id: "apt1",
    patient: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12345",
    },
    time: "09:00 AM",
    date: "Today",
    type: "Follow-up",
    status: "upcoming",
    notes: "Patient experiencing persistent headaches",
    isNew: true,
  },
  {
    id: "apt2",
    patient: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12346",
    },
    time: "10:30 AM",
    date: "Today",
    type: "Annual Physical",
    status: "upcoming",
    notes: "Routine checkup",
    isNew: true,
  },
  {
    id: "apt3",
    patient: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12347",
    },
    time: "01:15 PM",
    date: "Today",
    type: "Consultation",
    status: "upcoming",
    notes: "New patient consultation for diabetes management",
    isNew: false,
  },
  {
    id: "apt4",
    patient: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12348",
    },
    time: "03:00 PM",
    date: "Today",
    type: "Lab Results",
    status: "upcoming",
    notes: "Review recent blood work results",
    isNew: false,
  },
  {
    id: "apt5",
    patient: {
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12349",
    },
    time: "09:30 AM",
    date: "Tomorrow",
    type: "Follow-up",
    status: "upcoming",
    notes: "Post-surgery follow-up",
    isNew: false,
  },
  {
    id: "apt6",
    patient: {
      name: "Robert Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12350",
    },
    time: "11:00 AM",
    date: "Tomorrow",
    type: "Vaccination",
    status: "upcoming",
    notes: "Scheduled for flu vaccination",
    isNew: false,
  },
]

export default function DoctorNotifications() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<(typeof appointments)[0] | null>(null)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const newAppointmentsCount = appointments.filter((apt) => apt.isNew).length

  const filteredAppointments = appointments.filter((appointment) => {
    // Apply search filter
    const matchesSearch =
      appointment.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply status filter
    const matchesFilter =
      filter === "all" ||
      (filter === "today" && appointment.date === "Today") ||
      (filter === "tomorrow" && appointment.date === "Tomorrow")

    return matchesSearch && matchesFilter
  })

  const handleAppointmentClick = (appointment: (typeof appointments)[0]) => {
    setSelectedAppointment(appointment)
  }

  return (
    <div className="relative">
      {/* Notification Bell with Badge */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {newAppointmentsCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs font-medium text-primary-foreground flex items-center justify-center">
                {newAppointmentsCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[380px] p-0" align="end">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">Appointments</h3>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilter("all")}>All Appointments</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("today")}>Today</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("tomorrow")}>Tomorrow</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search appointments..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div> */}

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-2">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              {/* <TabsTrigger value="recent">Recent</TabsTrigger> */}
            </TabsList>
            <TabsContent value="upcoming" className="max-h-[400px] overflow-y-auto">
              {filteredAppointments.length > 0 ? (
                <div className="divide-y">
                  {filteredAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className={`p-3 hover:bg-muted/50 cursor-pointer transition-colors ${appointment.isNew ? "bg-primary/5" : ""}`}
                      onClick={() => handleAppointmentClick(appointment)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                          <AvatarFallback>
                            {appointment.patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{appointment.patient.name}</p>
                            {appointment.isNew && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {appointment.date}, {appointment.time}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {appointment.type}
                            </Badge>
                            <Sheet>
                              <SheetTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </SheetTrigger>
                              <SheetContent>
                                <SheetHeader>
                                  <SheetTitle>Appointment Details</SheetTitle>
                                  <SheetDescription>View and manage appointment information</SheetDescription>
                                </SheetHeader>
                                <div className="py-4 space-y-4">
                                  <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                      <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                                      <AvatarFallback>
                                        {appointment.patient.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="font-medium">{appointment.patient.name}</h3>
                                      <p className="text-sm text-muted-foreground">
                                        Patient ID: {appointment.patient.id}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Date</p>
                                      <p className="font-medium">{appointment.date}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Time</p>
                                      <p className="font-medium">{appointment.time}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Type</p>
                                      <p className="font-medium">{appointment.type}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Status</p>
                                      <Badge variant="outline">Scheduled</Badge>
                                    </div>
                                  </div>

                                  <div>
                                    <p className="text-sm text-muted-foreground">Notes</p>
                                    <p className="text-sm">{appointment.notes}</p>
                                  </div>

                                  <div className="flex gap-2 pt-4">
                                    <Button className="flex-1">Start Appointment</Button>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="outline">Actions</Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent>
                                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                        <DropdownMenuItem>Add Notes</DropdownMenuItem>
                                        <DropdownMenuItem>View Patient Record</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                          Cancel Appointment
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                              </SheetContent>
                            </Sheet>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="font-medium">No appointments found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? "Try a different search term" : "You have no upcoming appointments"}
                  </p>
                </div>
              )}
            </TabsContent>
            {/* <TabsContent value="recent" className="max-h-[400px] overflow-y-auto">
              <div className="p-6 text-center">
                <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-medium">Recent Appointments</h3>
                <p className="text-sm text-muted-foreground">View your recently completed appointments</p>
              </div>
            </TabsContent> */}
          </Tabs>

          <div className="p-4 border-t">
            <Button variant="outline" className="w-full" asChild>
              <a href="/doctor-appointment-records">View All Appointments</a>
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Full Appointment Panel */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">Appointment Details</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedAppointment(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedAppointment.patient.avatar} alt={selectedAppointment.patient.name} />
                  <AvatarFallback>
                    {selectedAppointment.patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedAppointment.patient.name}</h3>
                  <p className="text-muted-foreground">Patient ID: {selectedAppointment.patient.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <p className="font-medium">{selectedAppointment.date}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Time</p>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <p className="font-medium">{selectedAppointment.time}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Appointment Type</p>
                  <Badge variant="outline">{selectedAppointment.type}</Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <Check className="h-3 w-3 mr-1" />
                    Confirmed
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Notes</p>
                <div className="p-3 bg-muted rounded-md text-sm">{selectedAppointment.notes}</div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Actions</p>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <User className="h-4 w-4 mr-2" />
                    View Patient
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Reschedule
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-between">
              <Button variant="outline" onClick={() => setSelectedAppointment(null)}>
                Close
              </Button>
              <Button>Start Appointment</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

