import { User } from './user';
import { Ticket } from './ticket';
import { Referral } from './referral';

export interface Booking {
    id: string; // Changed from number to string for UUID
    userId: string;
    bookingNumber: string;
    referralId: string;
    ticketId: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    ticketCount: number;
    paymentMethod: string;
    paymentStatus: 'pending' | 'success' | 'failed';
    paymentDate: string;
    paymentUrl: string;
    paymentId: string;
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
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentMethod: string;
    paymentStatus: 'pending' | 'success' | 'failed';
    paymentDate: string;
    paymentUrl: string;
    paymentId: string;
    transactionId: string;
}

export interface UpdateBookingRequest extends Partial<CreateBookingRequest> {
    id: number;
} 