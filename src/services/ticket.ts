import { Ticket, CreateTicketRequest, UpdateTicketRequest } from "@/types/ticket";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const getAllTickets = async (token: string): Promise<Ticket[]> => {
    const response = await fetch(`${API_BASE_URL}/ticket/all`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch tickets");
    }

    const data = await response.json();
    return data.tickets;
};

export const getTicketById = async (token: string, id: number): Promise<Ticket> => {
    const response = await fetch(`${API_BASE_URL}/ticket/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch ticket");
    }

    const data = await response.json();
    return data.ticket;
};

export const createTicket = async (token: string, ticket: CreateTicketRequest): Promise<Ticket> => {
    const response = await fetch(`${API_BASE_URL}/ticket`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
    });

    if (!response.ok) {
        throw new Error("Failed to create ticket");
    }

    const data = await response.json();
    return data.ticket;
};

export const updateTicket = async (token: string, ticket: UpdateTicketRequest): Promise<Ticket> => {
    const response = await fetch(`${API_BASE_URL}/ticket/${ticket.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
    });

    if (!response.ok) {
        throw new Error("Failed to update ticket");
    }

    const data = await response.json();
    return data.ticket;
};

export const deleteTicket = async (token: string, id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/ticket/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete ticket");
    }
};