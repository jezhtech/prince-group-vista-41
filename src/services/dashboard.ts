import { apiRequest } from "./api";
import { User } from "@/types/user";
import { Booking } from "@/types/booking";
import { Ticket } from "@/types/ticket";
import { getAllBookingsForAdmin } from "./booking";
import { getAllUsers } from "./user";
import { getAllTickets } from "./ticket";

export interface DashboardStats {
  totalRegistrations: number;
  successBookings: number;
  totalCapacity: number;
  membershipSignups: number;
  conversionRate: number;
  ticketRevenue: number;
  averageTicketPrice: number;
}

export interface TicketTypeStats {
  name: string;
  count: number;
  total: number;
  percent: number;
  color: string;
}
export interface TimeSeriesData {
  date: string;
  registrations: number;
  users: number;
  revenue: number;
  tickets: number;
}

export interface DashboardData {
  stats: DashboardStats;
  ticketTypes: TicketTypeStats[];
  allBookings: Booking[];
  allMembers: User[];
  revenueBreakdown: {
    ticketRevenue: number;
    totalRevenue: number;
  };
  timeSeriesData: TimeSeriesData[];
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
    const allBookings = getBookings(bookings);
    const allMembers = getMembers(users);
    const revenueBreakdown = calculateRevenueBreakdown(bookings, tickets);
    const timeSeriesData = generateTimeSeriesData(bookings, users, tickets);

    return {
      stats,
      ticketTypes,
      allBookings,
      allMembers,
      revenueBreakdown,
      timeSeriesData,
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
  const successBookings = bookings.filter(
    (booking) => booking.paymentStatus === "success"
  ).length;
  const totalCapacity = tickets.reduce(
    (sum, ticket) => sum + ticket.totalTickets,
    0
  );

  // For now, we'll consider all users as memberships (you can adjust this logic)
  const membershipSignups = users.length;
  const conversionRate =
    totalRegistrations > 0 ? (membershipSignups / totalRegistrations) * 100 : 0;

  const successfulBookings = bookings.filter(
    (booking) => booking.paymentStatus === "success"
  );
  const ticketRevenue = successfulBookings.reduce((sum, booking) => {
    const ticket = tickets.find((t) => t.id === booking.ticketId);
    return sum + (ticket?.price || 0) * (booking.ticketCount || 1);
  }, 0);

  const totalTicketCount = successfulBookings.reduce(
    (sum, booking) => sum + (booking.ticketCount || 1),
    0
  );
  const averageTicketPrice =
    successfulBookings.length > 0 ? ticketRevenue / totalTicketCount : 0;

  return {
    totalRegistrations,
    successBookings,
    totalCapacity,
    membershipSignups,
    conversionRate,
    ticketRevenue,
    averageTicketPrice,
  };
};

export const getPaginatedData = <T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
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

const getBookings = (bookings: Booking[]): Booking[] => {
  const sortedBookings = bookings.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return sortedBookings;
};

const getMembers = (users: User[]): User[] => {
  const sortedUsers = users.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return sortedUsers;
};

const calculateRevenueBreakdown = (bookings: Booking[], tickets: Ticket[]) => {
  const successfulBookings = bookings.filter(
    (b) => b.paymentStatus === "success"
  );
  const ticketRevenue = successfulBookings.reduce((sum, booking) => {
    if (booking.paymentStatus !== "success") {
      return sum;
    }
    return sum + booking.paymentPrice;
  }, 0);

  // For now, assuming membership revenue is a fixed amount per user
  const totalRevenue = ticketRevenue;

  return {
    ticketRevenue,
    totalRevenue,
  };
};

const generateTimeSeriesData = (
  bookings: Booking[],
  users: User[],
  tickets: Ticket[]
): TimeSeriesData[] => {
  // Generate last 30 days of data to support longer periods
  const data: TimeSeriesData[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    // Filter bookings for this date
    const dayBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.createdAt);
      return bookingDate.toDateString() === date.toDateString();
    });

    // Filter users for this date
    const dayUsers = users.filter((user) => {
      const userDate = new Date(user.createdAt);
      return userDate.toDateString() === date.toDateString();
    });

    // Calculate revenue for this date
    const dayRevenue = dayBookings.reduce((sum, booking) => {
      if (booking.paymentStatus === "success") {
        return sum + booking.paymentPrice;
      }
      return sum;
    }, 0);

    // Calculate tickets for this date
    const dayTickets = dayBookings.reduce((sum, booking) => {
      if (booking.paymentStatus === "success") {
        return sum + (booking.ticketCount || 1);
      }
      return sum;
    }, 0);

    data.push({
      date: dateStr,
      registrations: dayBookings.length,
      users: dayUsers.length,
      revenue: dayRevenue,
      tickets: dayTickets,
    });
  }

  return data;
};
