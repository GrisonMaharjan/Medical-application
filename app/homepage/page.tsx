"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, Heart, Mail, MapPin, Phone, Star, Stethoscope, Users, Activity, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";

export default function Homepage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MediCare</span>
          </div>

          <nav className="hidden md:flex gap-6">
            <Link className="text-sm font-medium hover:text-primary" href="#services">
              Services
            </Link>
            <Link className="text-sm font-medium hover:text-primary" href="#doctors">
              Doctors
            </Link>
            <Link className="text-sm font-medium hover:text-primary" href="#about">
              About
            </Link>
            <Link className="text-sm font-medium hover:text-primary" href="#contact">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/medical-login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/medical-login">Book Appointment</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="container flex flex-col lg:flex-row items-center gap-8 py-16 md:py-24">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <Badge className="px-4 py-2 rounded-full">✨ Your Health, Our Priority</Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Expert Healthcare <br />
                for Your Family
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Experience world-class medical care with our team of specialists. Book your appointment today and take
                the first step towards better health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild>
                  <Link href="/medical-login">Book an Appointment</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#services">Our Services</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 justify-center lg:justify-start">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-3xl font-bold">15+</span>
                  <span className="text-sm text-muted-foreground">Years Experience</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-3xl font-bold">50k+</span>
                  <span className="text-sm text-muted-foreground">Patients Served</span>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-3xl font-bold">4.9</span>
                  <span className="text-sm text-muted-foreground">Patient Rating</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <Image
                src="/love and care.jpg"
                alt="Medical Team"
                width={600}
                height={400}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-muted/30">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
              <p className="text-lg text-muted-foreground mx-auto max-w-[700px]">
                Comprehensive healthcare services tailored to your needs
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Primary Care",
                  description: "Comprehensive health services for you and your family",
                  icon: Stethoscope,
                },
                {
                  title: "Specialist Consultations",
                  description: "Expert care from experienced specialists",
                  icon: Users,
                },
                {
                  title: "Emergency Care",
                  description: "24/7 emergency medical services",
                  icon: Activity,
                },
                {
                  title: "Preventive Care",
                  description: "Regular check-ups and health screenings",
                  icon: Shield,
                },
                {
                  title: "Diagnostic Services",
                  description: "Advanced diagnostic and imaging services",
                  icon: Activity,
                },
                {
                  title: "Telemedicine",
                  description: "Virtual consultations from the comfort of home",
                  icon: Phone,
                },
              ].map((service, index) => (
                <Card key={index} className="relative group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="group-hover:text-primary">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Doctors Section */}
        <section id="doctors" className="py-16 md:py-24">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Doctors</h2>
              <p className="text-lg text-muted-foreground mx-auto max-w-[700px]">
                Experienced healthcare professionals dedicated to your wellbeing
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Dr. Sarah Smith",
                  specialty: "Cardiologist",
                  image: "/placeholder.svg",
                  rating: "4.9",
                  experience: "15 years",
                },
                {
                  name: "Dr. Michael Johnson",
                  specialty: "Pediatrician",
                  image: "/placeholder.svg",
                  rating: "4.8",
                  experience: "12 years",
                },
                {
                  name: "Dr. Emily Brown",
                  specialty: "Neurologist",
                  image: "/placeholder.svg",
                  rating: "4.9",
                  experience: "10 years",
                },
              ].map((doctor, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-bold text-xl">{doctor.name}</h3>
                        <p className="text-muted-foreground">{doctor.specialty}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="ml-1 text-sm">{doctor.rating}</span>
                        </div>
                        <Badge variant="outline">{doctor.experience}</Badge>
                      </div>
                      <Button className="w-full">
                        Book Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Patient Testimonials</h2>
              <p className="text-lg text-muted-foreground mx-auto max-w-[700px]">
                What our patients say about their experience
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "John Doe",
                  text: "Exceptional care and attention. The staff was professional and caring throughout my treatment.",
                  rating: 5,
                },
                {
                  name: "Jane Smith",
                  text: "Very impressed with the modern facilities and expert medical team. Highly recommended!",
                  rating: 5,
                },
                {
                  name: "Mike Johnson",
                  text: "The doctors took time to explain everything clearly. I felt well-cared for throughout my visit.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card key={index} className="relative">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex gap-1">
                        {Array(testimonial.rating)
                          .fill(null)
                          .map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ))}
                      </div>
                      <p className="text-muted-foreground">{testimonial.text}</p>
                      <div className="flex items-center gap-4 pt-4">
                        <Avatar>
                          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">Patient</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-12 flex flex-col lg:flex-row items-center gap-8 justify-between">
                <div className="space-y-4 text-center lg:text-left">
                  <h2 className="text-3xl font-bold tracking-tighter">Ready to Get Started?</h2>
                  <p className="text-primary-foreground/90 max-w-[600px]">
                    Book your appointment today and take the first step towards better health
                  </p>
                </div>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/book-appointment">Book an Appointment</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter">Contact Us</h2>
                  <p className="text-lg text-muted-foreground mt-2">
                    Get in touch with us for any questions or concerns
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+1 (555) 000-0000</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">contact@medicare.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">123 Medical Center Dr, City, State</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-muted-foreground">Mon-Fri: 8am-8pm</p>
                      <p className="text-muted-foreground">Sat-Sun: 9am-5pm</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden h-[400px] relative">
                <Image src="/Hospital.jpg" alt="Location Map" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">MediCare</span>
              </div>
              <p className="text-muted-foreground">Providing quality healthcare services for over 15 years</p>
            </div>

            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#services" className="text-muted-foreground hover:text-primary">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#doctors" className="text-muted-foreground hover:text-primary">
                    Our Doctors
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Primary Care
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Specialist Care
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Emergency Care
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Telemedicine
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">123 Medical Center Dr</li>
                <li className="text-muted-foreground">City, State 12345</li>
                <li className="text-muted-foreground">Phone: (555) 000-0000</li>
                <li className="text-muted-foreground">Email: contact@medicare.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 MediCare. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

