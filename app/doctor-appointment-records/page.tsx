"use client"

import { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  List,
  MoreHorizontal,
  Printer,
  Search,
  User,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from "date-fns"

// Mock data for appointments
const appointments = [
  {
    id: "apt1",
    patient: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12345",
      age: 42,
      gender: "Female",
      phone: "(555) 123-4567",
      email: "sarah.j@example.com",
    },
    time: "09:00 AM",
    date: "2024-03-08",
    type: "Follow-up",
    status: "confirmed",
    notes: "Patient experiencing persistent headaches",
    history: [
      { date: "2024-02-10", type: "Initial Consultation", notes: "Diagnosed with migraine" },
      { date: "2024-01-15", type: "Emergency Visit", notes: "Severe headache and dizziness" },
    ],
  },
  {
    id: "apt2",
    patient: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12346",
      age: 35,
      gender: "Male",
      phone: "(555) 234-5678",
      email: "michael.b@example.com",
    },
    time: "10:30 AM",
    date: "2024-03-08",
    type: "Annual Physical",
    status: "confirmed",
    notes: "Routine checkup",
    history: [{ date: "2023-03-10", type: "Annual Physical", notes: "All vitals normal" }],
  },
  {
    id: "apt3",
    patient: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12347",
      age: 28,
      gender: "Female",
      phone: "(555) 345-6789",
      email: "emma.d@example.com",
    },
    time: "01:15 PM",
    date: "2024-03-08",
    type: "Consultation",
    status: "confirmed",
    notes: "New patient consultation for diabetes management",
    history: [],
  },
  {
    id: "apt4",
    patient: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12348",
      age: 52,
      gender: "Male",
      phone: "(555) 456-7890",
      email: "james.w@example.com",
    },
    time: "03:00 PM",
    date: "2024-03-08",
    type: "Lab Results",
    status: "confirmed",
    notes: "Review recent blood work results",
    history: [
      { date: "2024-02-25", type: "Lab Work", notes: "Blood samples taken for analysis" },
      { date: "2024-01-20", type: "Consultation", notes: "Discussed medication adjustment" },
    ],
  },
  {
    id: "apt5",
    patient: {
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12349",
      age: 45,
      gender: "Female",
      phone: "(555) 567-8901",
      email: "olivia.m@example.com",
    },
    time: "09:30 AM",
    date: "2024-03-09",
    type: "Follow-up",
    status: "confirmed",
    notes: "Post-surgery follow-up",
    history: [
      { date: "2024-02-15", type: "Surgery", notes: "Appendectomy performed" },
      { date: "2024-02-10", type: "Pre-op Consultation", notes: "Surgery scheduled" },
    ],
  },
  {
    id: "apt6",
    patient: {
      name: "Robert Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12350",
      age: 38,
      gender: "Male",
      phone: "(555) 678-9012",
      email: "robert.t@example.com",
    },
    time: "11:00 AM",
    date: "2024-03-09",
    type: "Vaccination",
    status: "confirmed",
    notes: "Scheduled for flu vaccination",
    history: [{ date: "2023-10-05", type: "Vaccination", notes: "COVID-19 booster administered" }],
  },
  {
    id: "apt7",
    patient: {
      name: "Sophia Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12351",
      age: 32,
      gender: "Female",
      phone: "(555) 789-0123",
      email: "sophia.l@example.com",
    },
    time: "02:00 PM",
    date: "2024-03-09",
    type: "Prenatal Checkup",
    status: "confirmed",
    notes: "Second trimester checkup",
    history: [{ date: "2024-02-05", type: "Prenatal Checkup", notes: "First trimester checkup, all normal" }],
  },
  {
    id: "apt8",
    patient: {
      name: "William Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12352",
      age: 65,
      gender: "Male",
      phone: "(555) 890-1234",
      email: "william.g@example.com",
    },
    time: "10:00 AM",
    date: "2024-03-10",
    type: "Cardiology Consultation",
    status: "pending",
    notes: "Referred by primary care physician for heart palpitations",
    history: [{ date: "2024-02-20", type: "Primary Care Visit", notes: "Complained of occasional heart palpitations" }],
  },
  {
    id: "apt9",
    patient: {
      name: "Ava Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12353",
      age: 29,
      gender: "Female",
      phone: "(555) 901-2345",
      email: "ava.r@example.com",
    },
    time: "11:30 AM",
    date: "2024-03-10",
    type: "Dermatology",
    status: "pending",
    notes: "Skin rash examination",
    history: [],
  },
  {
    id: "apt10",
    patient: {
      name: "Daniel Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12354",
      age: 48,
      gender: "Male",
      phone: "(555) 012-3456",
      email: "daniel.t@example.com",
    },
    time: "03:30 PM",
    date: "2024-03-10",
    type: "Orthopedic Consultation",
    status: "pending",
    notes: "Knee pain assessment",
    history: [
      { date: "2023-12-15", type: "Physical Therapy", notes: "Completed 6 weeks of therapy for knee rehabilitation" },
    ],
  },
  {
    id: "apt11",
    patient: {
      name: "Isabella Clark",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12355",
      age: 55,
      gender: "Female",
      phone: "(555) 123-4567",
      email: "isabella.c@example.com",
    },
    time: "09:00 AM",
    date: "2024-03-07",
    type: "Follow-up",
    status: "completed",
    notes: "Blood pressure monitoring",
    history: [
      { date: "2024-02-07", type: "Follow-up", notes: "Adjusted hypertension medication" },
      { date: "2024-01-07", type: "Follow-up", notes: "Initial hypertension diagnosis" },
    ],
  },
  {
    id: "apt12",
    patient: {
      name: "Ethan Wright",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12356",
      age: 41,
      gender: "Male",
      phone: "(555) 234-5678",
      email: "ethan.w@example.com",
    },
    time: "11:15 AM",
    date: "2024-03-07",
    type: "Consultation",
    status: "completed",
    notes: "Discussed weight management options",
    history: [{ date: "2023-12-10", type: "Annual Physical", notes: "Recommended weight management program" }],
  },
  {
    id: "apt13",
    patient: {
      name: "Mia Nelson",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12357",
      age: 36,
      gender: "Female",
      phone: "(555) 345-6789",
      email: "mia.n@example.com",
    },
    time: "02:30 PM",
    date: "2024-03-07",
    type: "Psychiatric Evaluation",
    status: "completed",
    notes: "Anxiety assessment",
    history: [{ date: "2024-02-15", type: "Initial Consultation", notes: "Reported increasing anxiety symptoms" }],
  },
  {
    id: "apt14",
    patient: {
      name: "Alexander King",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12358",
      age: 62,
      gender: "Male",
      phone: "(555) 456-7890",
      email: "alexander.k@example.com",
    },
    time: "04:00 PM",
    date: "2024-03-07",
    type: "Follow-up",
    status: "completed",
    notes: "Post-stroke recovery monitoring",
    history: [
      { date: "2024-02-20", type: "Follow-up", notes: "Continued improvement in mobility" },
      { date: "2024-01-25", type: "Follow-up", notes: "Initial post-stroke assessment" },
      { date: "2024-01-10", type: "Emergency", notes: "Admitted for stroke" },
    ],
  },
  {
    id: "apt15",
    patient: {
      name: "Charlotte Scott",
      avatar: "/placeholder.svg?height=40&width=40",
      id: "P12359",
      age: 27,
      gender: "Female",
      phone: "(555) 567-8901",
      email: "charlotte.s@example.com",
    },
    time: "09:45 AM",
    date: "2024-03-06",
    type: "Consultation",
    status: "cancelled",
    notes: "Migraine consultation",
    history: [],
  },
]

// Status badge mapping
const statusBadges = {
  confirmed: { label: "Confirmed", variant: "outline", className: "bg-green-50 text-green-700 border-green-200" },
  pending: { label: "Pending", variant: "outline", className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  completed: { label: "Completed", variant: "outline", className: "bg-blue-50 text-blue-700 border-blue-200" },
  cancelled: { label: "Cancelled", variant: "outline", className: "bg-red-50 text-red-700 border-red-200" },
}

export default function DoctorAppointmentRecords() {
  const [view, setView] = useState<"list" | "calendar">("list")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<(typeof appointments)[0] | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Get unique appointment types for filter
  const appointmentTypes = Array.from(new Set(appointments.map((apt) => apt.type)))

  // Filter and sort appointments
  const filteredAppointments = appointments
    .filter((appointment) => {
      // Apply search filter
      const matchesSearch =
        appointment.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.type.toLowerCase().includes(searchQuery.toLowerCase())

      // Apply status filter
      const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

      // Apply type filter
      const matchesType = typeFilter === "all" || appointment.type === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
    .sort((a, b) => {
      // Sort by selected field
      if (sortField === "date") {
        const dateA = new Date(`${a.date} ${a.time}`).getTime()
        const dateB = new Date(`${b.date} ${b.time}`).getTime()
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA
      } else if (sortField === "patient") {
        return sortDirection === "asc"
          ? a.patient.name.localeCompare(b.patient.name)
          : b.patient.name.localeCompare(a.patient.name)
      } else if (sortField === "type") {
        return sortDirection === "asc" ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type)
      }
      return 0
    })

  // Get appointments for selected date in calendar view
  const selectedDateStr = date ? format(date, "yyyy-MM-dd") : ""
  const appointmentsForSelectedDate = filteredAppointments.filter((apt) => apt.date === selectedDateStr)

  // Toggle sort direction or change sort field
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle appointment selection
  const handleAppointmentClick = (appointment: (typeof appointments)[0]) => {
    setSelectedAppointment(appointment)
  }

  // Reset filters
  const resetFilters = () => {
    setStatusFilter("all")
    setTypeFilter("all")
    setSearchQuery("")
    setSortField("date")
    setSortDirection("asc")
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointment Records</h1>
          <p className="text-muted-foreground">View and manage all patient appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          {/* <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button> */}
        </div>
      </div>

      {/* Filters and View Toggle */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by patient name, ID, or appointment type..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Appointment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover>
                {/* <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Date
                  </Button>
                </PopoverTrigger> */}
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>

              <Button variant="ghost" onClick={resetFilters}>
                <X className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Showing {filteredAppointments.length} appointments</div>
            <div className="flex items-center gap-2">
              <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}>
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
              {/* <Button
                variant={view === "calendar" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("calendar")}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendar
              </Button> */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* List View */}
      {view === "list" && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">
                      <Button
                        variant="ghost"
                        className="flex items-center p-0 h-auto font-medium"
                        onClick={() => handleSort("patient")}
                      >
                        Patient
                        {sortField === "patient" &&
                          (sortDirection === "asc" ? (
                            <ArrowUp className="ml-2 h-4 w-4" />
                          ) : (
                            <ArrowDown className="ml-2 h-4 w-4" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        className="flex items-center p-0 h-auto font-medium"
                        onClick={() => handleSort("date")}
                      >
                        Date & Time
                        {sortField === "date" &&
                          (sortDirection === "asc" ? (
                            <ArrowUp className="ml-2 h-4 w-4" />
                          ) : (
                            <ArrowDown className="ml-2 h-4 w-4" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        className="flex items-center p-0 h-auto font-medium"
                        onClick={() => handleSort("type")}
                      >
                        Type
                        {sortField === "type" &&
                          (sortDirection === "asc" ? (
                            <ArrowUp className="ml-2 h-4 w-4" />
                          ) : (
                            <ArrowDown className="ml-2 h-4 w-4" />
                          ))}
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <TableRow
                        key={appointment.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleAppointmentClick(appointment)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                              <AvatarFallback>
                                {appointment.patient.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{appointment.patient.name}</div>
                              <div className="text-xs text-muted-foreground">ID: {appointment.patient.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{new Date(appointment.date).toLocaleDateString()}</div>
                          <div className="text-xs text-muted-foreground">{appointment.time}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusBadges[appointment.status as keyof typeof statusBadges].className}
                          >
                            {statusBadges[appointment.status as keyof typeof statusBadges].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{appointment.notes}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleAppointmentClick(appointment)
                                }}
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit Appointment</DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                View Patient Record
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {appointment.status === "confirmed" && (
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  Mark as Completed
                                </DropdownMenuItem>
                              )}
                              {appointment.status === "pending" && (
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                  Confirm Appointment
                                </DropdownMenuItem>
                              )}
                              {(appointment.status === "confirmed" || appointment.status === "pending") && (
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-destructive">
                                  Cancel Appointment
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No appointments found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredAppointments.length} of {appointments.length} appointments
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Calendar View */}
      {/* {view === "calendar" && (
        <div className="grid gap-6">
          <Card>
            <CardContent className="p-4">
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border mx-auto" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appointments for {date ? format(date, "MMMM d, yyyy") : "Selected Date"}</CardTitle>
              <CardDescription>{appointmentsForSelectedDate.length} appointments scheduled</CardDescription>
            </CardHeader>
            <CardContent>
              {appointmentsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {appointmentsForSelectedDate.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleAppointmentClick(appointment)}
                    >
                      <div className="flex-shrink-0 mr-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
                          <AvatarFallback>
                            {appointment.patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{appointment.patient.name}</p>
                        <p className="text-xs text-muted-foreground">{appointment.type}</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                      <Badge
                        className={`ml-4 ${statusBadges[appointment.status as keyof typeof statusBadges].className}`}
                        variant="outline"
                      >
                        {statusBadges[appointment.status as keyof typeof statusBadges].label}
                      </Badge>
                      <Button variant="ghost" size="sm" className="ml-4">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">No appointments</h3>
                  <p className="text-sm text-muted-foreground">There are no appointments scheduled for this date</p>
                  <Button className="mt-4">Schedule Appointment</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )} */}

      {/* Appointment Details Dialog */}
      {selectedAppointment && (
        <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
              <DialogDescription>Complete information about the selected appointment</DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              {/* Patient Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Patient Information</h3>
                  <div className="flex items-center gap-4 mb-4">
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
                      <h4 className="font-medium">{selectedAppointment.patient.name}</h4>
                      <p className="text-sm text-muted-foreground">ID: {selectedAppointment.patient.id}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Age:</span>
                      <span className="text-sm">{selectedAppointment.patient.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Gender:</span>
                      <span className="text-sm">{selectedAppointment.patient.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Phone:</span>
                      <span className="text-sm">{selectedAppointment.patient.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <span className="text-sm">{selectedAppointment.patient.email}</span>
                    </div>
                  </div>
                </div>

                {/* Appointment Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Appointment Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                          <p className="font-medium">{new Date(selectedAppointment.date).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <p className="font-medium">{selectedAppointment.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <Badge variant="outline" className="mt-1">
                          {selectedAppointment.type}
                        </Badge>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge
                          className={`mt-1 ${statusBadges[selectedAppointment.status as keyof typeof statusBadges].className}`}
                          variant="outline"
                        >
                          {statusBadges[selectedAppointment.status as keyof typeof statusBadges].label}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Notes</p>
                      <div className="p-3 bg-muted rounded-md text-sm mt-1">{selectedAppointment.notes}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment History */}
              <div>
                <h3 className="text-lg font-medium mb-4">Appointment History</h3>
                {selectedAppointment.history.length > 0 ? (
                  <div className="border rounded-md divide-y">
                    {selectedAppointment.history.map((record, index) => (
                      <div key={index} className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm font-medium">{new Date(record.date).toLocaleDateString()}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {record.type}
                          </Badge>
                        </div>
                        <p className="text-sm mt-2">{record.notes}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 border rounded-md">
                    <p className="text-muted-foreground">No previous appointment history</p>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelectedAppointment(null)}>
                  Close
                </Button>
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>

              <div className="flex gap-2">
                {selectedAppointment.status === "confirmed" && (
                  <Button>
                    <Check className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </Button>
                )}
                {selectedAppointment.status === "pending" && (
                  <Button>
                    <Check className="h-4 w-4 mr-2" />
                    Confirm Appointment
                  </Button>
                )}
                <Button variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  View Patient
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

