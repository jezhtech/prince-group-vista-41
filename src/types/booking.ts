import { User } from "./user";
import { Ticket } from "./ticket";
import { Referral } from "./referral";

export interface Booking {
  id: string; // Changed from number to string for UUID
  userId: string;
  bookingNumber: string;
  referralId: string;
  ticketId: number;
  ticketCount: number;
  paymentMethod: string;
  paymentStatus: "pending" | "success" | "failed";
  paymentDate: string;
  paymentLinkId: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;

  // Related entities
  user?: User;
  ticket?: Ticket;
  referral?: Referral;
}

export interface CreateBookingRequest {
  userId: string;
  referralId: string;
  ticketId: number;
  paymentMethod: string;
  paymentStatus: "pending" | "success" | "failed";
  paymentDate: string;
  paymentLinkId: string;
}

export interface UpdateBookingRequest extends Partial<CreateBookingRequest> {
  bookingNumber: string;
}
