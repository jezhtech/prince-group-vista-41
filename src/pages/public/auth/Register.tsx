import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { User, Mail, Phone, Lock, AlertCircle } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";

const Register = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear password error when updating password fields
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }

    // Clear general error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Check password length
    if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    // Validate mobile number
    if (!formData.mobile || formData.mobile.length !== 10) {
      setError("Please enter a valid mobile number");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { password, ...others } = formData;
      await signUp(others, password);

      toast({
        title: "Registration Successful",
        description:
          "Your account has been created successfully. Please check your email for verification.",
      });

      navigate("/member/dashboard");
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-14">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4eb4a7]/10 via-white to-[#85cbc3]/10 z-0"></div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#4eb4a7]/20 opacity-5 filter blur-3xl z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#85cbc3]/20 opacity-5 filter blur-3xl z-0"></div>

      <Card className="w-full max-w-md p-8 shadow-lg relative z-10 bg-white/90 backdrop-blur-sm border border-white">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="name"
                name="fullName"
                placeholder="Enter your full name"
                className="pl-10 border-gray-200"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                className="pl-10 border-gray-200"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="mobile"
              className="text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                className="pl-10 border-gray-200"
                value={formData.mobile}
                onChange={handleInputChange}
                required
                minLength={10}
                maxLength={10}
              />
            </div>
            <p className="text-xs text-gray-500">
              We'll use this for account verification
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                className="pl-10 border-gray-200"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="pl-10 border-gray-200"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#4eb4a7] hover:bg-[#60afb4] transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </Button>

          <div className="text-center text-sm mt-6">
            <p className="text-gray-600">Already have an account?</p>
            <Link
              to="/login"
              className="text-[#4eb4a7] font-medium hover:underline"
            >
              Login Here
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Register;
