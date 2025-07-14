import { Booking, CreateBookingRequest, UpdateBookingRequest } from "@/types/booking";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const getBookingById = async (token: string, id: number): Promise<Booking> => {
    const response = await fetch(`${API_BASE_URL}/booking/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch booking");
    }

    const data = await response.json();
    return data.booking;
};

export const getBookingsByUserId = async (token: string): Promise<Booking[]> => {
    const response = await fetch(`${API_BASE_URL}/booking/user`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch bookings");
    }

    const data = await response.json();
    return data.bookings;
};

export const getAllBookings = async (token: string, userId: string): Promise<Booking[]> => {
    const response = await fetch(`${API_BASE_URL}/booking/user/${userId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch bookings");
    }

    const data = await response.json();
    return data.bookings;
};

export const createBooking = async (token: string, booking: CreateBookingRequest): Promise<Booking> => {
    const response = await fetch(`${API_BASE_URL}/booking/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
    });

    if (!response.ok) {
        throw new Error("Failed to create booking");
    }

    const data = await response.json();
    return data.booking;
};

export const updateBooking = async (token: string, booking: UpdateBookingRequest): Promise<Booking> => {
    const response = await fetch(`${API_BASE_URL}/booking/${booking.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
    });

    if (!response.ok) {
        throw new Error("Failed to update booking");
    }

    const data = await response.json();
    return data.booking;
};

export const deleteBooking = async (token: string, id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/booking/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete booking");
    }
}; 