import { apiRequest } from './api';

export interface EmailOTPResponse {
  success: boolean;
  message: string;
  otp?: string; // For development/testing purposes
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: any;
}

export const emailOTPService = {
  // Send OTP to email
  sendOTP: async (email: string): Promise<EmailOTPResponse> => {
    try {
      const response = await apiRequest<EmailOTPResponse>('/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send OTP');
    }
  },

  // Verify OTP
  verifyOTP: async (email: string, otp: string): Promise<VerifyOTPResponse> => {
    try {
      const response = await apiRequest<VerifyOTPResponse>('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, otp })
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to verify OTP');
    }
  },

  // Resend OTP
  resendOTP: async (email: string): Promise<EmailOTPResponse> => {
    try {
      const response = await apiRequest<EmailOTPResponse>('/auth/resend-otp', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to resend OTP');
    }
  }
}; 