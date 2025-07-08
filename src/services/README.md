# API Services

This directory contains TypeScript services that communicate with the Go backend API.

## Overview

The services are organized by entity and provide CRUD operations for:
- **Users** - User management and authentication
- **Tickets** - Event ticket management
- **Bookings** - Booking management with payment integration
- **Referrals** - Referral system management

## API Base URL

The services use the `VITE_API_URL` environment variable, defaulting to `http://localhost:8000/api/v1` if not set.

## Authentication

All API calls require a Firebase JWT token passed in the Authorization header:
```
Authorization: Bearer <firebase-jwt-token>
```

## Available Services

### User Service (`user.ts`)
- `createUser(token, userData)` - Create a new user
- `getUser(token)` - Get current user data
- `getUserById(token, id)` - Get user by ID
- `updateUser(token, userData)` - Update user data
- `getAllUsers(token)` - Get all users (admin only)
- `deleteUser(token, id)` - Delete user (admin only)

### Ticket Service (`ticket.ts`)
- `getTickets(token)` - Get all tickets
- `getTicketById(token, id)` - Get ticket by ID
- `createTicket(token, ticketData)` - Create a new ticket
- `updateTicket(token, ticketData)` - Update ticket
- `deleteTicket(token, id)` - Delete ticket

### Booking Service (`booking.ts`)
- `getBookingById(token, id)` - Get booking by ID
- `getAllBookings(token)` - Get all bookings
- `createBooking(token, bookingData)` - Create a new booking
- `updateBooking(token, bookingData)` - Update booking
- `deleteBooking(token, id)` - Delete booking

### Referral Service (`referral.ts`)
- `getReferralById(token, id)` - Get referral by ID
- `getAllReferrals(token)` - Get all referrals
- `createReferral(token, referralData)` - Create a new referral
- `updateReferral(token, referralData)` - Update referral
- `deleteReferral(token, id)` - Delete referral

## Usage Example

```typescript
import { getTickets, createTicket } from '@/services/ticket';
import { getUser } from '@/services/user';

// Get Firebase token from your auth context
const token = await getFirebaseToken();

// Get all tickets
const tickets = await getTickets(token);

// Create a new ticket
const newTicket = await createTicket(token, {
  name: "VIP Event Ticket",
  price: 1000,
  type: "vip",
  status: "active",
  amount: 1000,
  totalTickets: 50,
  availableTickets: 50
});

// Get current user
const user = await getUser(token);
```

## Error Handling

All services throw `ApiError` instances when API calls fail. Handle errors appropriately:

```typescript
try {
  const tickets = await getTickets(token);
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error: ${error.status} - ${error.message}`);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## TypeScript Types

All services use TypeScript interfaces defined in the `@/types` directory:
- `User`, `CreateUserRequest`, `UpdateUserRequest`
- `Ticket`, `CreateTicketRequest`, `UpdateTicketRequest`
- `Booking`, `CreateBookingRequest`, `UpdateBookingRequest`
- `Referral`, `CreateReferralRequest`, `UpdateReferralRequest`

## Environment Variables

Set the following environment variable in your `.env` file:
```
VITE_API_URL=http://localhost:8000/api/v1
``` 