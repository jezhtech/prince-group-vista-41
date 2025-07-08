export interface Ticket {
  id: number;
  name: string;
  price: number;
  type: string;
  status: string;
  amount: number;
  totalTickets: number;
  availableTickets: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketRequest {
  name: string;
  price: number;
  type: string;
  status: string;
  amount: number;
  totalTickets: number;
  availableTickets: number;
}

export interface UpdateTicketRequest extends Partial<CreateTicketRequest> {
  id: number;
}
