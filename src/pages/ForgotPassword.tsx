import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Mail } from 'lucide-react';
import Logo from '@/components/Logo';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API request to send password reset link
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Reset Link Sent",
        description: "A password reset link has been sent to your email.",
      });
      
      // Navigate to confirmation page with email param
      navigate(`/password-reset-sent?email=${encodeURIComponent(email)}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4eb4a7]/10 via-white to-[#85cbc3]/10 z-0"></div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#4eb4a7]/20 opacity-5 filter blur-3xl z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#85cbc3]/20 opacity-5 filter blur-3xl z-0"></div>
      
      <Card className="w-full max-w-md p-8 shadow-lg relative z-10 bg-white/90 backdrop-blur-sm border border-white">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Forgot Password
        </h2>
        
        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
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
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
          
          <div className="text-center text-sm mt-6">
            <Link to="/login" className="text-[#4eb4a7] font-medium hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword; 