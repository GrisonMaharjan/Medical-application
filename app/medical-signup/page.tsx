"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, ArrowRight, Check, Heart, Info } from "lucide-react"
import Link from "next/link"

// Form steps
const steps = ["Personal Information", "Medical History", "Account Setup"]
// const steps = ["Personal Information", "Medical History", "Insurance", "Account Setup"]


export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    // zipCode: "",

    // Medical History
    knownAllergies: "",
    currentMedication: "",
    medicalConditions: "",
    emergencyContactName: "",
    emergencyContactNumber: "",

    // Insurance
    // insuranceProvider: "",
    // policyNumber: "",
    // groupNumber: "",
    // primaryHolder: "",
    // relationship: "",

    // Account
    password: "",
    confirmPassword: "",
    agreeTos: false,
    agreePrivacy: false,
  })

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [knownAllergies, setKnownAllergies] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [currentMedication, setCurrentMedication] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [role, setRole] = useState("patient"); // Default role is patient
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push("/medical-login"), 2000);
    } else {
      setMessage(data.message);
    }
  };

  const [errors, setErrors] = useState<Record<string, string>>({})


  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required"
      if (!formData.lastName) newErrors.lastName = "Last name is required"
      if (!formData.email) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
      if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required"
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
      if (!formData.gender) newErrors.gender = "Gender is required"
    }

    if (step === 2) {
      if (!formData.emergencyContactName) newErrors.emergencyContact = "Emergency contact is required"
      if (!formData.emergencyContactNumber) newErrors.emergencyPhone = "Emergency contact phone is required"
    }

    // if (step === 3) {
    //   if (!formData.insuranceProvider) newErrors.insuranceProvider = "Insurance provider is required"
    //   if (!formData.policyNumber) newErrors.policyNumber = "Policy number is required"
    // }

    if (step === 4) {
      if (!formData.password) newErrors.password = "Password is required"
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
      if (!formData.agreeTos) newErrors.agreeTos = "You must agree to the Terms of Service"
      if (!formData.agreePrivacy) newErrors.agreePrivacy = "You must agree to the Privacy Policy"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">MediCare</span>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step} className={`flex items-center ${index !== steps.length - 1 ? "flex-1" : ""}`}>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    currentStep > index + 1
                      ? "border-primary bg-primary text-primary-foreground"
                      : currentStep === index + 1
                        ? "border-primary text-primary"
                        : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {currentStep > index + 1 ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${currentStep > index + 1 ? "bg-primary" : "bg-muted-foreground/30"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`text-center flex-1 ${
                  currentStep === index + 1 ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>
              {currentStep === 1 && "Please provide your personal information"}
              {currentStep === 2 && "Tell us about your medical history"}
              {/* {currentStep === 3 && "Add your insurance information"} */}
              {currentStep === 3 && "Set up your account credentials"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={errors.firstName ? "border-destructive" : ""}
                      />
                      {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={errors.lastName ? "border-destructive" : ""}
                      />
                      {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className={errors.phoneNumber ? "border-destructive" : ""}
                      />
                      {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className={errors.dateOfBirth ? "border-destructive" : ""}
                      />
                      {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => handleInputChange("gender", value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                    {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    />
                  </div> */}
                </div>
              )}

              {/* Step 2: Medical History */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Known Allergies</Label>
                    <Textarea
                      id="knownAllergies"
                      placeholder="List any known allergies..."
                      value={formData.knownAllergies}
                      onChange={(e) => handleInputChange("knownAllergies", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentMedications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      placeholder="List any current medications..."
                      value={formData.currentMedication}
                      onChange={(e) => handleInputChange("currnetMedication", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="conditions">Medical Conditions</Label>
                    <Textarea
                      id="medicalConditions"
                      placeholder="List any medical conditions..."
                      value={formData.medicalConditions}
                      onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                    />
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>Emergency contact information is required for your safety.</AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                        className={errors.emergencyContactName ? "border-destructive" : ""}
                      />
                      {errors.emergencyContactName && <p className="text-sm text-destructive">{errors.emergencyContactName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactNumber">Emergency Contact Number</Label>
                      <Input
                        id="emergencyContactNumber"
                        type="tel"
                        value={formData.emergencyContactNumber}
                        onChange={(e) => handleInputChange("emergencyContactNumber", e.target.value)}
                        className={errors.emergencyContactNumber ? "border-destructive" : ""}
                      />
                      {errors.emergencyContactNumber && <p className="text-sm text-destructive">{errors.emergencyContactNumber}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Insurance Information */}
              {/* {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                    <Select
                      value={formData.insuranceProvider}
                      onValueChange={(value) => handleInputChange("insuranceProvider", value)}
                    >
                      <SelectTrigger className={errors.insuranceProvider ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aetna">Aetna</SelectItem>
                        <SelectItem value="bluecross">Blue Cross Blue Shield</SelectItem>
                        <SelectItem value="cigna">Cigna</SelectItem>
                        <SelectItem value="united">United Healthcare</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.insuranceProvider && <p className="text-sm text-destructive">{errors.insuranceProvider}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="policyNumber">Policy Number</Label>
                      <Input
                        id="policyNumber"
                        value={formData.policyNumber}
                        onChange={(e) => handleInputChange("policyNumber", e.target.value)}
                        className={errors.policyNumber ? "border-destructive" : ""}
                      />
                      {errors.policyNumber && <p className="text-sm text-destructive">{errors.policyNumber}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="groupNumber">Group Number</Label>
                      <Input
                        id="groupNumber"
                        value={formData.groupNumber}
                        onChange={(e) => handleInputChange("groupNumber", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryHolder">Primary Insurance Holder</Label>
                    <Input
                      id="primaryHolder"
                      value={formData.primaryHolder}
                      onChange={(e) => handleInputChange("primaryHolder", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship to Primary Holder</Label>
                    <Select
                      value={formData.relationship}
                      onValueChange={(value) => handleInputChange("relationship", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self">Self</SelectItem>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )} */}

              {/* Step 4: Account Setup */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={errors.password ? "border-destructive" : ""}
                    />
                    {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={errors.confirmPassword ? "border-destructive" : ""}
                    />
                    {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeTos"
                        checked={formData.agreeTos}
                        onCheckedChange={(checked) => handleInputChange("agreeTos", checked as boolean)}
                      />
                      <Label htmlFor="agreeTos" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>
                      </Label>
                    </div>
                    {errors.agreeTos && <p className="text-sm text-destructive">{errors.agreeTos}</p>}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreePrivacy"
                        checked={formData.agreePrivacy}
                        onCheckedChange={(checked) => handleInputChange("agreePrivacy", checked as boolean)}
                      />
                      <Label htmlFor="agreePrivacy" className="text-sm">
                        I agree to the{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    {errors.agreePrivacy && <p className="text-sm text-destructive">{errors.agreePrivacy}</p>}
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            {currentStep < steps.length ? (
              <Button type="button" onClick={handleNext} className={currentStep === 1 ? "w-full" : ""}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" onClick={handleSignup}>
                Create Account
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/medical-login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

