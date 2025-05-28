import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Lock, ShieldCheck } from 'lucide-react';
import Logo from '@/components/Logo';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // In a real application, you would extract the token from the URL
  // and validate it on the server
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token') || 'invalid-token';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear password error when updating password fields
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (formData.password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);

    // Simulate password reset API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset successfully. You can now log in with your new password.",
      });
      
      // Redirect to login page
      navigate('/login');
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
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-[#4eb4a7]" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Reset Your Password
        </h2>
        
        <p className="text-center text-gray-600 mb-6">
          Please create a new secure password for your account.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your new password"
                className="pl-10 border-gray-200"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
              />
            </div>
            <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                className="pl-10 border-gray-200"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs">{passwordError}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#4eb4a7] hover:bg-[#60afb4] transition-colors" 
            disabled={isLoading}
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
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

export default ResetPassword; 