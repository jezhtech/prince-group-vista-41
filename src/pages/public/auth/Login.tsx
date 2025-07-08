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
import { Mail, KeySquare, Lock, AlertCircle } from "lucide-react";
import Logo from "@/components/Logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

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

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // For now, we'll simulate OTP sending since Firebase doesn't have built-in OTP
    // In a real implementation, you'd integrate with a service like Twilio
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${email}`,
      });
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });

      navigate(from, { replace: true });
    }, 1500);
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
      navigate(from, { replace: true });
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
                      onClick={handleSendOtp}
                      className="text-[#4eb4a7] hover:underline"
                    >
                      Resend OTP
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
