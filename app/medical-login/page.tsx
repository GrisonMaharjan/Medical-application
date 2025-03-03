"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Heart, Lock, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function MedicalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    console.log("Submitting Login..."); // Debugging log
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setIsLoading(true)

    // Simulate authentication - replace with actual auth logic
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response received:", res);

      const data = await res.json();

      console.log("Response Data:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);

        router.push("/patient-dashboard");
    } else {
      setError(data.message || "Login failed!");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    setError("Server error. Try again later!");
  }
  };


  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch("http://localhost:5000/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       localStorage.setItem("token", data.token);  // Store token
  //       router.push("/admin-dashboard");  // Redirect to dashboard
  //     } else {
  //       setError(data.message || "Login failed!");
  //     }
  //   } catch (err) {
  //     setError("Server error. Try again later!");
  //   }
  // };


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   const res = await fetch("http://localhost:5000/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   const data = await res.json();
  //   if (!res.ok) {
  //     setError(data.message);
  //   } else {
  //     localStorage.setItem("token", data.token);
  //     router.push("/dashboard"); // Redirect to dashboard
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-3 rounded-full">
            <Heart className="h-8 w-8 text-primary" />
          </div>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="email"
                      type="text"
                      placeholder="doctor@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading} onClick={() => console.log("Login button clicked")}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/medical-signup" className="text-primary hover:underline">
                Register
              </Link>
            </div>
            <div className="text-xs text-center text-muted-foreground">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

