import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  User,
  Mail,
  Phone,
  Lock,
  AlertCircle,
  MapPin,
  Home,
  IdCard,
} from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { updateUser } from "@/services";

const Register = () => {
  const { signUp, signInWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const isCompleteStep = location.pathname === "/register/complete";
  const isGoogleSignup = searchParams.get("source") === "google";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    aadhaar: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  // If user is already authenticated and we're on complete step, pre-fill data
  useEffect(() => {
    if (currentUser && isCompleteStep) {
      setFormData((prev) => ({
        ...prev,
        fullName: currentUser.displayName || "",
        email: currentUser.email || "",
      }));
    } else {
      navigate("/register");
    }
  }, [currentUser, isCompleteStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "aadhaar" || name === "mobile" || name === "pincode") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, ""),
      }));
      return;
    }

    // Clear password error when updating password fields
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }

    // Clear general error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError("");

    try {
      await signInWithGoogle();
      toast({
        title: "Google Sign-up Successful",
        description: "Please complete your profile with additional details.",
      });
      navigate("/register/complete?source=google");
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Google Sign-up Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
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

    setIsLoading(true);
    setError("");

    try {
      const {
        password,
        confirmPassword,
        mobile,
        address,
        city,
        state,
        pincode,
        ...userData
      } = formData;
      await signUp(userData, password);

      toast({
        title: "Account Created Successfully",
        description: "Please complete your profile with additional details.",
      });

      navigate("/register/complete");
    } catch (error: any) {
      let errorMesg = "";
      if (error.message.includes("Firebase: Error")) {
        const regex = /Firebase: Error \(auth\/([^)]+)\)/;
        const match = error.message.match(regex);
        errorMesg = match ? match[1].split("-").join(" ") : "An unknown error occurred";
      } else {
        errorMesg = error.message;
      }
      setError(errorMesg);
      toast({
        title: "Registration Failed",
        description: errorMesg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate mobile number
    if (!formData.mobile || formData.mobile.length !== 10) {
      setError("Please enter a valid mobile number");
      return;
    }

    // Validate address fields
    if (
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      setError("Please fill in all address fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const token = await currentUser?.getIdToken();
      if (currentUser && token) {
        await updateUser(token, {
          ...formData,
          firebaseId: currentUser.uid,
        });
      }

      toast({
        title: "Profile Completed",
        description: "Your profile has been updated successfully.",
      });

      navigate(redirect || "/member/dashboard");
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Profile Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create an Account
      </h2>

      <form onSubmit={handleStep1Submit} className="space-y-4">
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
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
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
          {isLoading ? "Creating Account..." : "Continue"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignup}
          disabled={isLoading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
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
    </>
  );

  const renderCompleteStep = () => (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Complete Your Profile
      </h2>

      {isGoogleSignup && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-600">
            Welcome! Please provide additional details to complete your profile.
          </p>
        </div>
      )}

      <form onSubmit={handleCompleteProfile} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="mobile" className="text-sm font-medium text-gray-700">
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
            htmlFor="address"
            className="text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              id="address"
              name="address"
              placeholder="Enter your address"
              className="pl-10 border-gray-200"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium text-gray-700">
              City
            </label>
            <Input
              id="city"
              name="city"
              placeholder="City"
              className="border-gray-200"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="state"
              className="text-sm font-medium text-gray-700"
            >
              State
            </label>
            <Input
              id="state"
              name="state"
              placeholder="State"
              className="border-gray-200"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="pincode"
            className="text-sm font-medium text-gray-700"
          >
            Pincode
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              id="pincode"
              name="pincode"
              placeholder="Enter pincode"
              className="pl-10 border-gray-200"
              value={formData.pincode}
              onChange={handleInputChange}
              required
              minLength={6}
              maxLength={6}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="pincode"
            className="text-sm font-medium text-gray-700"
          >
            Aadhaar Number
          </label>
          <div className="relative">
            <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              id="aadhaar"
              name="aadhaar"
              placeholder="Enter aadhaar number"
              className="pl-10 border-gray-200"
              value={formData.aadhaar}
              onChange={handleInputChange}
              required
              minLength={12}
              maxLength={12}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#4eb4a7] hover:bg-[#60afb4] transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Completing Profile..." : "Complete Profile"}
        </Button>
      </form>
    </>
  );

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

        {isCompleteStep ? renderCompleteStep() : renderStep1()}
      </Card>
    </div>
  );
};

export default Register;
