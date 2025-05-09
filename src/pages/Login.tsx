
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Phone, KeySquare } from 'lucide-react';
import Logo from '@/components/Logo';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${mobileNumber}`,
      });
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });
      
      // In a real app, this would navigate to dashboard or home
      window.location.href = '/member/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ui-blue-50 via-white to-ui-green-50 z-0"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-ui-blue-400 opacity-5 filter blur-3xl z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-ui-green-400 opacity-5 filter blur-3xl z-0"></div>
      
      <Card className="w-full max-w-md p-8 shadow-lg relative z-10 bg-white/90 backdrop-blur-sm border border-white">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {otpSent ? 'Verify OTP' : 'Login to your account'}
        </h2>
        
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ui-blue-500 h-5 w-5" />
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="pl-10 border-gray-200 focus:border-ui-blue-300 focus:ring focus:ring-ui-blue-200 focus:ring-opacity-50"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-ui-blue-500 hover:bg-ui-blue-600 transition-colors" 
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </Button>
            
            <div className="text-center text-sm mt-6">
              <p className="text-gray-600">Don't have an account?</p>
              <Link to="/register" className="text-ui-blue-600 font-medium hover:underline">
                Register Now
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <div className="relative">
                <KeySquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ui-blue-500 h-5 w-5" />
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className="pl-10 text-center tracking-wider font-medium border-gray-200 focus:border-ui-blue-300 focus:ring focus:ring-ui-blue-200 focus:ring-opacity-50"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                />
              </div>
              <p className="text-sm text-gray-500 text-center">
                OTP sent to {mobileNumber}
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-ui-blue-500 hover:bg-ui-blue-600 transition-colors" 
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify & Login"}
            </Button>
            
            <div className="text-center">
              <button 
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-sm text-ui-blue-600 hover:underline"
              >
                Change Mobile Number
              </button>
              
              <p className="text-gray-500 text-sm mt-2">
                Didn't receive the code?{" "}
                <button 
                  type="button"
                  onClick={handleSendOtp}
                  className="text-ui-blue-600 hover:underline"
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Login;
