import {
  Booking,
  CreateBookingRequest,
  UpdateBookingRequest,
} from "@/types/booking";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api/v1";

// Pagination interface
export interface PaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Paginated bookings response
export interface PaginatedBookingsResponse {
  bookings: Booking[];
  pagination: PaginationInfo;
}

export const getBookingById = async (
  token: string,
  id: number
): Promise<Booking> => {
  const response = await fetch(`${API_BASE_URL}/booking/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch booking");
  }

  const data = await response.json();
  return data.booking;
};

export const getBookingsByUserId = async (
  token: string
): Promise<Booking[]> => {
  const response = await fetch(`${API_BASE_URL}/booking/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const data = await response.json();
  return data.bookings;
};

export const getAllBookings = async (
  token: string,
  userId: string
): Promise<Booking[]> => {
  const response = await fetch(`${API_BASE_URL}/booking/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const data = await response.json();
  return data.bookings;
};

export const getAllBookingsForAdmin = async (
  token: string
): Promise<Booking[]> => {
  const response = await fetch(`${API_BASE_URL}/booking/admin/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all bookings");
  }

  const data = await response.json();
  return data.bookings;
};

// Get paginated bookings for admin with user and ticket data
export const getPaginatedBookingsForAdmin = async (
  token: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedBookingsResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/booking/admin/paginated?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch paginated bookings");
  }

  const data = await response.json();
  return {
    bookings: data.bookings,
    pagination: data.pagination,
  };
};

// Get paginated bookings for client with user and ticket data
export const getPaginatedBookingsForClient = async (
  token: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedBookingsResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/client/bookings/paginated?page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch paginated bookings");
  }

  const data = await response.json();
  return {
    bookings: data.bookings,
    pagination: data.pagination,
  };
};

export const createBooking = async (
  token: string,
  booking: CreateBookingRequest
): Promise<Booking> => {
  const response = await fetch(`${API_BASE_URL}/booking/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
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

export const updateBooking = async (
  token: string,
  booking: UpdateBookingRequest
): Promise<Booking> => {
  const response = await fetch(`${API_BASE_URL}/booking/${booking.bookingNumber}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
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

export const deleteBooking = async (
  token: string,
  id: number
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/booking/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete booking");
  }
};

export const getBookingByBookingNumber = async (
  token: string,
  bookingNumber: string
): Promise<Booking> => {
  const response = await fetch(`${API_BASE_URL}/booking/number/${bookingNumber}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch booking");
  }

  const data = await response.json();
  return data.booking;
}; 
