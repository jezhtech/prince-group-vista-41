import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail } from 'lucide-react';
import Logo from '@/components/Logo';

const PasswordResetSent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email') || 'your email address';

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
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-[#4eb4a7]" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Check Your Email
        </h2>
        
        <p className="text-center text-gray-600 mb-2">
          We've sent a password reset link to:
        </p>
        
        <p className="text-center font-medium text-gray-800 mb-6 flex items-center justify-center gap-2">
          <Mail className="h-4 w-4" />
          {email}
        </p>
        
        <div className="bg-[#4eb4a7]/10 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            <strong>Didn't receive an email?</strong> Check your spam folder or verify the email address is correct.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            asChild
            className="w-full bg-[#4eb4a7] hover:bg-[#60afb4] transition-colors"
          >
            <Link to="/forgot-password">
              Try a Different Email
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline" 
            className="w-full border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/10"
          >
            <Link to="/login">
              Back to Login
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PasswordResetSent; 