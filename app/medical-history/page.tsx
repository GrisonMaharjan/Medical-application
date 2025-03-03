"use client"

import { useState } from "react"
import {
  Activity,
  Calendar,
  Download,
  FileText,
  Filter,
  Heart,
  PillIcon as Pills,
  Search,
  Syringe,
  Table,
  Printer,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table as TableComponent, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function MedicalHistory() {
  const [dateRange, setDateRange] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Medical History</h1>
          <p className="text-muted-foreground">View and manage your complete medical records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Records
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search records..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="year">Past Year</SelectItem>
                  <SelectItem value="6months">Past 6 Months</SelectItem>
                  <SelectItem value="3months">Past 3 Months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Records Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="visits">Visits</TabsTrigger>
          <TabsTrigger value="lab-results">Lab Results</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120/80</div>
                <p className="text-xs text-muted-foreground">Last checked: 2 days ago</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72 BPM</div>
                <p className="text-xs text-muted-foreground">Last checked: 2 days ago</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Medications</CardTitle>
                <Pills className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Last updated: Today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Jun 15</div>
                <p className="text-xs text-muted-foreground">Dr. Smith - Follow-up</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest medical events and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Timeline Item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Annual Physical Examination</p>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Regular checkup with Dr. Smith. All vitals normal.</p>
                    <p className="text-sm text-muted-foreground">May 15, 2024</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>

                {/* Timeline Item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Table className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Blood Test Results</p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Normal
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Complete blood count and metabolic panel</p>
                    <p className="text-sm text-muted-foreground">May 10, 2024</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Results
                  </Button>
                </div>

                {/* Timeline Item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Syringe className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Flu Vaccination</p>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Annual flu shot administered</p>
                    <p className="text-sm text-muted-foreground">May 1, 2024</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Record
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visits Tab */}
        <TabsContent value="visits">
          <Card>
            <CardHeader>
              <CardTitle>Medical Visits</CardTitle>
              <CardDescription>History of your medical appointments and consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <TableComponent>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>May 15, 2024</TableCell>
                    <TableCell>Dr. Sarah Smith</TableCell>
                    <TableCell>Annual Physical</TableCell>
                    <TableCell>Routine Examination</TableCell>
                    <TableCell>
                      <Badge variant="outline">Completed</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <span className="sr-only">Open menu</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Download Report</DropdownMenuItem>
                          <DropdownMenuItem>Share Record</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {/* Add more visit rows as needed */}
                </TableBody>
              </TableComponent>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lab Results Tab */}
        <TabsContent value="lab-results">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Results</CardTitle>
              <CardDescription>View your test results and laboratory reports</CardDescription>
            </CardHeader>
            <CardContent>
              <TableComponent>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Range</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>May 10, 2024</TableCell>
                    <TableCell>Complete Blood Count</TableCell>
                    <TableCell>Hematology</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Normal
                      </Badge>
                    </TableCell>
                    <TableCell>Within range</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Report
                      </Button>
                    </TableCell>
                  </TableRow>
                  {/* Add more lab result rows */}
                </TableBody>
              </TableComponent>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medications Tab */}
        <TabsContent value="medications">
          <Card>
            <CardHeader>
              <CardTitle>Medications History</CardTitle>
              <CardDescription>Current and past medications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Current Medications</h3>
                  <div className="grid gap-4">
                    {/* Current Medication Card */}
                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Lisinopril</h4>
                          <Badge>Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">10mg - Once daily</p>
                        <p className="text-sm text-muted-foreground">Started: Jan 15, 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Refill
                        </Button>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Past Medications</h3>
                  <TableComponent>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medication</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Started</TableHead>
                        <TableHead>Ended</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Amoxicillin</TableCell>
                        <TableCell>500mg - Three times daily</TableCell>
                        <TableCell>Apr 1, 2024</TableCell>
                        <TableCell>Apr 10, 2024</TableCell>
                        <TableCell>
                          <Badge variant="outline">Completed</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </TableComponent>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vaccinations Tab */}
        <TabsContent value="vaccinations">
          <Card>
            <CardHeader>
              <CardTitle>Vaccination Records</CardTitle>
              <CardDescription>Your immunization history and upcoming vaccinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Upcoming Vaccinations */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Upcoming Vaccinations</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center p-4 border rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <h4 className="font-medium">Tetanus Booster</h4>
                        <p className="text-sm text-muted-foreground">Due in 3 months</p>
                      </div>
                      <Button>Schedule Now</Button>
                    </div>
                  </div>
                </div>

                {/* Vaccination History */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Vaccination History</h3>
                  <TableComponent>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vaccine</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Lot Number</TableHead>
                        <TableHead>Next Due</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Influenza</TableCell>
                        <TableCell>May 1, 2024</TableCell>
                        <TableCell>Dr. Johnson</TableCell>
                        <TableCell>LOT123456</TableCell>
                        <TableCell>May 2025</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Record
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>COVID-19 Booster</TableCell>
                        <TableCell>Jan 15, 2024</TableCell>
                        <TableCell>Dr. Williams</TableCell>
                        <TableCell>LOT789012</TableCell>
                        <TableCell>Jan 2025</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Record
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </TableComponent>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

