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
import { Mail, KeySquare, Lock, AlertCircle, Chrome } from "lucide-react";
import Logo from "@/components/Logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { emailOTPService } from "@/services/emailOTP";

const Login = () => {
  const { signIn, signInWithGoogle, signInWithEmailOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const loginType = searchParams.get("type") || "password";

  // Get the intended destination from location state
  const from = (location.state as any)?.from?.pathname || "/member/dashboard";

  // States for passwordless login
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // States for password login
  const [passwordEmail, setPasswordEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"passwordless" | "password">(
    "password"
  );
  const [error, setError] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await emailOTPService.sendOTP(email);
      setOtpSent(true);
      setIsLoading(false);
      toast({
        title: "OTP Sent",
        description: response.message || `A verification code has been sent to ${email}.`,
      });
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Failed to Send OTP",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await emailOTPService.verifyOTP(email, otp);
      
      if (response.success) {
        // Sign in with the verified OTP
        await signInWithEmailOTP(email, otp);
        
        toast({
          title: "Login Successful",
          description: "You have been logged in successfully.",
        });
        navigate(from, { replace: true });
      } else {
        setError(response.message || "Invalid OTP code");
        toast({
          title: "Invalid OTP",
          description: response.message || "Please enter the correct verification code.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "OTP Verification Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signIn(passwordEmail, password);
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });
      navigate(redirect || from, { replace: true });
    } catch (error: any) {
      if (error.message.includes("auth/invalid-credential")) {
        setError("Invalid email or password");
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      } else {
        setError(error.message);
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signInWithGoogle();

      if (result.isNewUser || result.needsProfileCompletion) {
        toast({
          title: "Google Sign-in Successful",
          description: "Please complete your profile with additional details.",
        });
        navigate("/register/complete?source=google", { replace: true });
      } else {
        toast({
          title: "Login Successful",
          description: "You have been logged in successfully with Google.",
        });
        navigate(redirect || from, { replace: true });
      }
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Google Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setLoginMethod(loginType as "passwordless" | "password");
  }, [loginType]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ui-blue-50 via-white to-ui-green-50 z-0"></div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-ui-blue-400 opacity-5 filter blur-3xl z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-ui-green-400 opacity-5 filter blur-3xl z-0"></div>

      <Card className="w-full max-w-md p-8 shadow-lg relative z-10 bg-white/90 backdrop-blur-sm border border-white">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login to your account
        </h2>

        <Tabs
          defaultValue="password"
          className="mb-4"
          value={loginMethod}
          onValueChange={(value) => {
            navigate(`/login?type=${value}`);
          }}
        >
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="password">Password Login</TabsTrigger>
            <TabsTrigger value="passwordless">Passwordless Login</TabsTrigger>
          </TabsList>

          {/* Password Login Tab */}
          <TabsContent value="password">
            {loginMethod === "password" && (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="passwordEmail"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input
                      id="passwordEmail"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 border-gray-200"
                      value={passwordEmail}
                      onChange={(e) => setPasswordEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-[#4eb4a7] hover:text-[#60afb4] transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 border-gray-200"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#4eb4a7] hover:bg-[#60afb4] transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Login Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 transition-colors"
                  onClick={handleGoogleLogin}
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
                  </svg>{" "}
                  {isLoading ? "Signing in..." : "Continue with Google"}
                </Button>

                <div className="text-center text-sm mt-6 flex space-x-1 justify-center">
                  <p className="text-gray-600">Don't have an account?</p>
                  <Link
                    to="/register"
                    className="text-[#4eb4a7] font-medium hover:underline"
                  >
                    Register Now
                  </Link>
                </div>
              </form>
            )}
          </TabsContent>

          {/* Passwordless Login Tab */}
          <TabsContent value="passwordless">
            {loginMethod === "passwordless" && !otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
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
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 border-gray-200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#4eb4a7] hover:bg-[#60afb4] transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Login Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 transition-colors"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  {isLoading ? "Signing in..." : "Continue with Google"}
                </Button>

                <div className="text-center text-sm mt-6 flex space-x-1 justify-center">
                  <p className="text-gray-600">Don't have an account?</p>
                  <Link
                    to="/register"
                    className="text-[#4eb4a7] font-medium hover:underline"
                  >
                    Register Now
                  </Link>
                </div>
              </form>
            ) : loginMethod === "passwordless" && otpSent ? (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="otp"
                    className="text-sm font-medium text-gray-700"
                  >
                    Verification Code
                  </label>
                  <div className="relative">
                    <KeySquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      className="pl-10 text-center tracking-wider font-medium border-gray-200"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength={6}
                    />
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    OTP sent to {email}
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#4eb4a7] hover:bg-[#60afb4] transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify & Login"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-sm text-[#4eb4a7] hover:underline"
                  >
                    Change Email Address
                  </button>

                  <p className="text-gray-500 text-sm mt-2">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          setIsLoading(true);
                          const response = await emailOTPService.resendOTP(email);
                          toast({
                            title: "OTP Resent",
                            description: response.message || "A new verification code has been sent.",
                          });
                        } catch (error: any) {
                          toast({
                            title: "Failed to Resend OTP",
                            description: error.message,
                            variant: "destructive",
                          });
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                      className="text-[#4eb4a7] hover:underline"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Resend OTP"}
                    </button>
                  </p>
                </div>
              </form>
            ) : null}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
