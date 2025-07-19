import { apiRequest } from "./api";
import { User } from "@/types/user";
import { Booking } from "@/types/booking";
import { Ticket } from "@/types/ticket";
import { getAllBookingsForAdmin } from "./booking";
import { getAllUsers } from "./user";
import { getAllTickets } from "./ticket";

export interface DashboardStats {
  totalRegistrations: number;
  totalCapacity: number;
  totalTickets: number;
  soldTickets: number;
  totalTicketCount: number;
  membershipSignups: number;
  conversionRate: number;
  ticketRevenue: number;
  membershipRevenue: number;
  averageTicketPrice: number;
  averageMembershipPrice: number;
}

export interface TicketTypeStats {
  name: string;
  count: number;
  total: number;
  percent: number;
  color: string;
}

export interface RecentRegistration {
  name: string;
  email: string;
  type: string;
  date: string;
  amount: string;
  status: string;
  ticketCount?: number;
}

export interface DashboardData {
  stats: DashboardStats;
  ticketTypes: TicketTypeStats[];
  recentRegistrations: RecentRegistration[];
  recentMembers: RecentRegistration[];
  revenueBreakdown: {
    ticketRevenue: number;
    totalRevenue: number;
  };
}

export const getDashboardData = async (
  token: string
): Promise<DashboardData> => {
  try {
    // Fetch all required data in parallel
    const [users, bookings, tickets] = await Promise.all([
      getAllUsers(token),
      getAllBookingsForAdmin(token),
      getAllTickets(),
    ]);

    // Calculate dashboard statistics
    const stats = calculateStats(users, bookings, tickets);
    const ticketTypes = calculateTicketTypeStats(tickets, bookings);
    const recentRegistrations = getRecentRegistrations(bookings, 5);
    const recentMembers = getRecentMembers(users, 5);
    const revenueBreakdown = calculateRevenueBreakdown(bookings, tickets);

    return {
      stats,
      ticketTypes,
      recentRegistrations,
      recentMembers,
      revenueBreakdown,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

const calculateStats = (
  users: User[],
  bookings: Booking[],
  tickets: Ticket[]
): DashboardStats => {
  const totalRegistrations = bookings.length;
  const totalCapacity = tickets.reduce(
    (sum, ticket) => sum + ticket.totalTickets,
    0
  );
  const totalTickets = tickets.reduce(
    (sum, ticket) => sum + ticket.totalTickets,
    0
  );
  const soldTickets = bookings.length; // Total bookings made
  const totalTicketCount = bookings.reduce(
    (sum, booking) => sum + (booking.ticketCount || 1),
    0
  ); // Total individual tickets sold

  // For now, we'll consider all users as memberships (you can adjust this logic)
  const membershipSignups = users.length;
  const conversionRate =
    totalRegistrations > 0 ? (membershipSignups / totalRegistrations) * 100 : 0;

  const successfulBookings = bookings;
  const ticketRevenue = successfulBookings.reduce((sum, booking) => {
    const ticket = tickets.find((t) => t.id === booking.ticketId);
    return sum + (ticket?.price || 0) * (booking.ticketCount || 1);
  }, 0);

  // For now, assuming membership revenue is a fixed amount per user
  const membershipRevenue = users.length * 1000; // ₹1000 per membership
  const averageTicketPrice =
    successfulBookings.length > 0 ? ticketRevenue / totalTicketCount : 0;
  const averageMembershipPrice =
    users.length > 0 ? membershipRevenue / users.length : 0;

  return {
    totalRegistrations,
    totalCapacity,
    totalTickets,
    soldTickets,
    totalTicketCount,
    membershipSignups,
    conversionRate,
    ticketRevenue,
    membershipRevenue,
    averageTicketPrice,
    averageMembershipPrice,
  };
};

const calculateTicketTypeStats = (
  tickets: Ticket[],
  bookings: Booking[]
): TicketTypeStats[] => {
  const successfulBookings = bookings.filter(
    (b) => b.paymentStatus === "success"
  );

  return tickets.map((ticket) => {
    const ticketBookings = successfulBookings.filter(
      (b) => b.ticketId === ticket.id
    );
    const soldCount = ticketBookings.reduce(
      (sum, booking) => sum + (booking.ticketCount || 1),
      0
    );
    const percent =
      ticket.totalTickets > 0 ? (soldCount / ticket.totalTickets) * 100 : 0;

    // Assign colors based on ticket type
    let color = "bg-ui-blue-500";
    if (ticket.type.toLowerCase().includes("vip")) {
      color = "bg-purple-500";
    } else if (ticket.type.toLowerCase().includes("early")) {
      color = "bg-prince-green";
    } else if (ticket.type.toLowerCase().includes("workshop")) {
      color = "bg-orange-500";
    }

    return {
      name: ticket.name,
      count: soldCount,
      total: ticket.totalTickets,
      percent: Math.round(percent),
      color,
    };
  });
};

const getRecentRegistrations = (
  bookings: Booking[],
  limit: number
): RecentRegistration[] => {
  const successfulBookings = bookings
    .filter((b) => b.paymentStatus === "success")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
  return successfulBookings.map((booking) => ({
    name: booking.user?.fullName || "Unknown User",
    email: booking.user?.email || "No email",
    type: booking.ticket?.name || "Unknown Ticket",
    date: new Date(booking.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    amount: `₹${(
      (booking.ticket?.price || 0) * (booking.ticketCount || 1)
    ).toLocaleString()}`,
    status: booking.paymentStatus === "success" ? "Success" : "Pending",
    ticketCount: booking.ticketCount || 1,
  }));
};

const getRecentMembers = (
  users: User[],
  limit: number
): RecentRegistration[] => {
  const recentUsers = users
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);

  return recentUsers.map((user) => ({
    name: user.fullName,
    email: user.email,
    type: "Basic", // You can add membership type to user model later
    date: new Date(user.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    amount: "₹999", // Fixed membership price for now
    status: "Active",
  }));
};

const calculateRevenueBreakdown = (bookings: Booking[], tickets: Ticket[]) => {
  const successfulBookings = bookings.filter(
    (b) => b.paymentStatus === "success"
  );
  const ticketRevenue = successfulBookings.reduce((sum, booking) => {
    return sum + booking.paymentPrice;
  }, 0);

  // For now, assuming membership revenue is a fixed amount per user
  const totalRevenue = ticketRevenue;

  return {
    ticketRevenue,
    totalRevenue,
  };
};
