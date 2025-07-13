export interface CashfreePaymentLinkRequest {
  customerDetails: {
    customerEmail: string;
    customerName: string;
    customerPhone: string;
  };
  linkAmount: number;
  linkCurrency: string;
  linkPurpose: string;
  linkMeta: {
    notifyUrl: string;
    returnUrl: string;
  };
  linkNotify: {
    sendEmail: boolean;
    sendSMS: boolean;
  };
  linkAutoReminders: boolean;
}

export interface CashfreePaymentResponse {
  paymentSessionId: string; // cf_link_id
  orderId: string; // link_id
  orderAmount: number; // link_amount
  orderCurrency: string; // link_currency
  paymentLink: string; // link_url
  status: string; // link_status
  message?: string;
}

export interface PaymentStatus {
  orderId: string; // link_id
  paymentId: string; // cf_link_id
  transactionId: string; // cf_link_id (same as paymentId for links)
  status: 'pending' | 'success' | 'failed';
  amount: number; // link_amount
  currency: string; // link_currency
  paymentMethod: string;
  paymentDate: string;
  message?: string;
}

export interface CreatePaymentRequest {
  bookingId: number;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderNote?: string; // This will be used as link_purpose
}

export interface PaymentWebhook {
  orderId: string; // link_id
  paymentId: string; // cf_link_id
  transactionId: string; // cf_link_id
  status: string; // link_status
  amount: number; // link_amount
  currency: string; // link_currency
  paymentMethod: string;
  paymentDate: string;
  signature: string;
} 