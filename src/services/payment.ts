import { apiRequest } from "./api";
import {
  CashfreePaymentLinkRequest,
  CashfreePaymentResponse,
  PaymentStatus,
  CreatePaymentRequest,
} from "@/types/payment";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api/v1";

export const createPaymentSession = async (
  token: string,
  paymentData: CreatePaymentRequest
): Promise<CashfreePaymentResponse> => {
  const response = await apiRequest<CashfreePaymentResponse>(
    "/payment/links",
    {
      method: "POST",
      body: JSON.stringify(paymentData),
    },
    token
  );

  return response;
};

export const checkPaymentWithBookingNumber = async (
  token: string,
  bookingNumber: string,
  paymentLinkID: string
): Promise<PaymentStatus> => {
  const response = await apiRequest<PaymentStatus>(
    `/booking/check-payment/${bookingNumber}?paymentLinkId=${paymentLinkID}`,
    {
      method: "GET",
    },
    token
  );

  return response;
};

export const checkPaymentStatus = async (
  token: string,
  linkId: string
): Promise<PaymentStatus> => {
  const response = await apiRequest<PaymentStatus>(
    `/payment/status/${linkId}`,
    {
      method: "GET",
    },
    token
  );

  return response;
};

export const getPaymentHistory = async (
  token: string
): Promise<PaymentStatus[]> => {
  const response = await apiRequest<{ payments: PaymentStatus[] }>(
    "/payment/history",
    {
      method: "GET",
    },
    token
  );

  return response.payments;
};

export const sendPaymentConfirmationEmail = async (
  token: string,
  bookingNumber: string
): Promise<{ status: string; message: string }> => {
  const response = await apiRequest<{ status: string; message: string }>(
    `/payment/send-email/${bookingNumber}`,
    {
      method: "POST",
    },
    token
  );

  return response;
};

export const refundPayment = async (
  token: string,
  linkId: string,
  amount: number,
  reason: string
): Promise<{ success: boolean; message: string }> => {
  const response = await apiRequest<{ success: boolean; message: string }>(
    "/payment/refund",
    {
      method: "POST",
      body: JSON.stringify({ linkId, amount, reason }),
    },
    token
  );

  return response;
};

// Utility function to generate link ID
export const generateLinkId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `LINK_${timestamp}_${random}`.toUpperCase();
};

// Utility function to format amount for Cashfree (in paise)
export const formatAmountForCashfree = (amount: number): number => {
  return Math.round(amount * 100); // Convert to paise
};

// Utility function to format amount from Cashfree (from paise)
export const formatAmountFromCashfree = (amount: number): number => {
  return amount / 100; // Convert from paise
};
