"use client"

import type React from "react"

import { useState } from "react"
import { Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// Mock data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Smith",
    specialty: "Cardiologist",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Mon, Wed, Fri",
    rating: 4.8,
    experience: "15 years",
  },
  {
    id: 2,
    name: "Dr. Michael Johnson",
    specialty: "Dermatologist",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Tue, Thu, Sat",
    rating: 4.9,
    experience: "12 years",
  },
  {
    id: 3,
    name: "Dr. Emily Brown",
    specialty: "Pediatrician",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Mon, Tue, Thu",
    rating: 4.7,
    experience: "10 years",
  },
]

// Available time slots
const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
]

export default function BookAppointment() {
  const [date, setDate] = useState<Date>()
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    appointmentType: "",
    reason: "",
    insurance: "",
    policyNumber: "",
  })

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      doctor: selectedDoctor,
      date,
      time: selectedTime,
      ...formData,
    })
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Book an Appointment</h1>
          <p className="text-muted-foreground">Schedule a consultation with our healthcare professionals</p>
        </div>

        {/* Progress Steps */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className={cn("h-2 rounded-full", step >= item ? "bg-primary" : "bg-muted")} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select a Doctor</CardTitle>
                <CardDescription>Choose a specialist for your consultation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search doctors..." className="pl-8" />
                  </div>
                </div>

                <div className="grid gap-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={cn(
                        "flex items-center space-x-4 rounded-lg border p-4 cursor-pointer transition-colors",
                        selectedDoctor === doctor.id ? "border-primary bg-primary/5" : "hover:bg-muted",
                      )}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={doctor.image} alt={doctor.name} />
                        <AvatarFallback>
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{doctor.name}</p>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {doctor.experience}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            ⭐ {doctor.rating}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">Available: {doctor.availability}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleNext} disabled={!selectedDoctor}>
                  Continue
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>Choose your preferred appointment slot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <Label>Available Time Slots</Label>
                    <RadioGroup value={selectedTime} onValueChange={setSelectedTime} className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <div key={time}>
                          <RadioGroupItem value={time} id={time} className="peer sr-only" />
                          <Label
                            htmlFor={time}
                            className="flex items-center justify-center rounded-md border-2 border-muted bg-white p-2 hover:bg-muted cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            {time}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!date || !selectedTime}>
                  Continue
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>Provide additional information for your visit</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Appointment Type</Label>
                    <Select
                      value={formData.appointmentType}
                      onValueChange={(value) => setFormData({ ...formData, appointmentType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type of visit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New Patient Visit</SelectItem>
                        <SelectItem value="followup">Follow-up</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="emergency">Urgent Care</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Reason for Visit</Label>
                    <Textarea
                      placeholder="Please describe your symptoms or reason for visit"
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Insurance Information</Label>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Insurance Provider</Label>
                        <Input
                          placeholder="Enter insurance provider"
                          value={formData.insurance}
                          onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Policy Number</Label>
                        <Input
                          placeholder="Enter policy number"
                          value={formData.policyNumber}
                          onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={!formData.appointmentType || !formData.reason}>
                  Confirm Appointment
                </Button>
              </CardFooter>
            </Card>

            {/* Appointment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Appointment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Doctor</span>
                    <span className="font-medium">{doctors.find((d) => d.id === selectedDoctor)?.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{date ? format(date, "PPP") : "Not selected"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">{formData.appointmentType || "Not selected"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

