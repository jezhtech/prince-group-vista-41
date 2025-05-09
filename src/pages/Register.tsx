
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { User, Mail, Phone, KeySquare } from 'lucide-react';
import Logo from '@/components/Logo';

const Register = () => {
  const [step, setStep] = useState<'details' | 'verification'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate OTP sending
    setTimeout(() => {
      setStep('verification');
      setIsLoading(false);
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${formData.mobile}`,
      });
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate OTP verification and account creation
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
      });
      
      // In a real app, this would navigate to dashboard or login
      window.location.href = '/member/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-ui-blue-50 to-ui-green-50 z-0"></div>
      
      {/* Glow effects - positioned behind content */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-ui-blue-400 opacity-10 filter blur-3xl z-0"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-ui-green-400 opacity-10 filter blur-3xl z-0"></div>
      
      <Card className="w-full max-w-md p-8 shadow-xl relative z-10 bg-white/80 backdrop-blur-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 'details' ? 'Create an Account' : 'Verify Your Number'}
        </h2>
        
        {step === 'details' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  className="pl-10"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="mobile" className="text-sm font-medium">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="pl-10"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Continue"}
            </Button>
            
            <div className="text-center text-sm mt-6">
              <p className="text-gray-600">Already have an account?</p>
              <Link to="/login" className="text-ui-blue-600 font-medium hover:underline">
                Login Here
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium">
                Verification Code
              </label>
              <div className="relative">
                <KeySquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className="pl-10 text-center tracking-wider font-medium"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                />
              </div>
              <p className="text-sm text-gray-500 text-center">
                OTP sent to {formData.mobile}
              </p>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify & Register"}
            </Button>
            
            <div className="text-center">
              <button 
                type="button"
                onClick={() => setStep('details')}
                className="text-sm text-ui-blue-600 hover:underline"
              >
                Change Details
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

export default Register;
