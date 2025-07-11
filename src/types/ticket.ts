export interface Ticket {
  id: number;
  name: string;
  price: number;
  type: string;
  description: string;
  benefits: string[];
  status: string;
  totalTickets: number;
  offerPriceWithReferral: number;
  offerPriceWithReferralAndYoutube: number;
  availableTickets: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketRequest {
  name: string;
  price: number;
  type: string;
  description: string;
  benefits: string[];
  status: string;
  totalTickets: number;
  offerPriceWithReferral: number;
  offerPriceWithReferralAndYoutube: number;
  availableTickets: number;
}

export interface UpdateTicketRequest extends Partial<CreateTicketRequest> {
  id: number;
}
