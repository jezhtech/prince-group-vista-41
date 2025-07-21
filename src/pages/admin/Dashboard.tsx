import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Ticket,
  CreditCard,
  TrendingUp,
  UserPlus,
  BarChart3,
  Calendar,
  ArrowRight,
  Download,
  RefreshCw,
  Loader2,
  CheckCircle,
  Mail,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import {
  getDashboardData,
  DashboardData,
  getPaginatedData,
} from "@/services/dashboard";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import DashboardCharts from "@/components/DashboardCharts";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Booking, User } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { sendPaymentConfirmationEmail, updateBooking } from "@/services";
import { downloadTicketPDFReactPDF } from "@/utils/ticketDownloadReactPDF";
import { EVENT_DETAILS } from "@/constants/event";

const AdminDashboard = () => {
  const { userToken } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<
    "mark-success" | "send-email" | "download-ticket" | null
  >(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDashboardData = async () => {
    try {
      if (!userToken) return;
      const data = await getDashboardData(userToken);
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  useEffect(() => {
    fetchDashboardData();
  }, [userToken]);

  const totalPages = Math.ceil(
    Math.max(
      dashboardData?.allBookings.length || 0,
      dashboardData?.allMembers.length || 0
    ) / itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAction = (
    booking: Booking,
    type: "mark-success" | "send-email" | "download-ticket"
  ) => {
    setSelectedBooking(booking);
    setActionType(type);
    setActionDialogOpen(true);
  };

  const executeAction = async () => {
    if (!selectedBooking || !actionType) return;
    setActionLoading(true);
    try {
      switch (actionType) {
        case "mark-success":
          await updateBooking(userToken, {
            ...selectedBooking,
            paymentStatus: "success",
          });
          const updatedBookings = dashboardData.allBookings.map((booking) =>
            booking.bookingNumber === selectedBooking.bookingNumber
              ? { ...booking, paymentStatus: "success" as const }
              : booking
          );
          setDashboardData({
            ...dashboardData,
            allBookings: updatedBookings,
          });
          toast({
            title: "Success",
            description: `Booking marked as successful for ${selectedBooking.user?.fullName}`,
          });
          break;
        case "send-email":
          await sendPaymentConfirmationEmail(
            userToken,
            selectedBooking.bookingNumber
          );
          toast({
            title: "Email Sent",
            description: `Success email sent to ${selectedBooking.user?.email}`,
          });
          break;
        case "download-ticket":
          downloadTicketPDFReactPDF(selectedBooking, EVENT_DETAILS);
          toast({
            title: "Download Started",
            description: `Ticket download initiated for ${selectedBooking.user?.fullName}`,
          });
          break;
      }
      setActionDialogOpen(false);
      setSelectedBooking(null);
      setActionType(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform action. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const getActionTitle = () => {
    if (!actionType) return "";
    switch (actionType) {
      case "mark-success":
        return "Mark Booking as Successful";
      case "send-email":
        return "Send Success Email";
      case "download-ticket":
        return "Download Ticket";
      default:
        return "";
    }
  };

  const getActionDescription = () => {
    if (!selectedBooking || !actionType) return "";
    switch (actionType) {
      case "mark-success":
        return `Are you sure you want to mark the booking for ${selectedBooking.user?.fullName} as successful? This will update the payment status.`;
      case "send-email":
        return `Send a success confirmation email to ${selectedBooking.user?.email}?`;
      case "download-ticket":
        return `Download the ticket for ${selectedBooking.user?.fullName}?`;
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading dashboard data...</span>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-ui-gray-500 mb-4">Failed to load dashboard data</p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" /> Retry
          </Button>
        </div>
      </div>
    );
  }

  // Handle empty data states
  const hasData =
    dashboardData.stats.totalRegistrations > 0 ||
    dashboardData.stats.membershipSignups > 0;

  if (!hasData) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-ui-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-ui-gray-900 mb-2">
              No Data Available
            </h2>
            <p className="text-ui-gray-500 mb-6">
              There's no booking or user data to display yet.
            </p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with event info and quick stats */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-ui-gray-900">
              Rythm of Kumari 2025
            </h1>
            <p className="text-ui-gray-500 flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-2" />5 PM • Sep 20, 2025 •
              Nagercoil Convention Center
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Active Event
            </span>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
              />
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-ui-blue-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-ui-gray-500 flex items-center">
                <Ticket className="h-4 w-4 mr-2 text-ui-blue-500" /> Total
                Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-bold text-ui-gray-900">
                    {dashboardData.stats.successBookings}
                  </div>
                  <p className="text-xs flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">Active bookings</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-ui-gray-900">
                    {dashboardData.stats.totalCapacity}
                  </div>
                  <div className="text-xs text-ui-gray-500">Capacity</div>
                </div>
              </div>
              <Progress
                className="h-2 mt-3 bg-green-100"
                value={
                  dashboardData.stats.totalCapacity > 0
                    ? (dashboardData.stats.totalRegistrations /
                        dashboardData.stats.totalCapacity) *
                      100
                    : 0
                }
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-prince-light to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-ui-gray-500 flex items-center">
                <UserPlus className="h-4 w-4 mr-2 text-prince-green" />{" "}
                Membership Signups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-bold text-ui-gray-900">
                    {dashboardData.stats.membershipSignups}
                  </div>
                  <p className="text-xs flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">Total members</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-ui-gray-900">
                    {dashboardData.stats.conversionRate.toFixed(1)}%
                  </div>
                  <div className="text-xs text-ui-gray-500">Conversion</div>
                </div>
              </div>
              <Progress
                className="h-2 mt-3 bg-green-100"
                value={dashboardData.stats.conversionRate}
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-ui-gray-500 flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-orange-500" /> Ticket
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-bold text-ui-gray-900">
                    ₹{dashboardData.revenueBreakdown.ticketRevenue}
                  </div>
                  <p className="text-xs flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-500">Total revenue</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-ui-gray-900">
                    ₹{dashboardData.stats.averageTicketPrice.toFixed(0)}
                  </div>
                  <div className="text-xs text-ui-gray-500">Avg. Ticket</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ticket breakdown and analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCharts dashboardData={dashboardData} />

        <Card className="h-auto">
          <CardHeader>
            <CardTitle>Ticket Types</CardTitle>
            <CardDescription>Current sales by ticket category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5 h-[440px] overflow-y-auto">
              {dashboardData.ticketTypes.length > 0 ? (
                dashboardData.ticketTypes.map((type, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{type.name}</div>
                        <div className="text-sm text-ui-gray-500">
                          {type.count} / {type.total} sold
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{type.percent}%</div>
                        <div
                          className={`text-sm ${
                            type.percent === 100
                              ? "text-prince-green"
                              : "text-ui-gray-500"
                          }`}
                        >
                          {type.percent === 100 ? "Sold out" : "Booked"}
                        </div>
                      </div>
                    </div>
                    <Progress
                      className={`h-2 ${
                        type.percent === 100
                          ? "bg-prince-green/20"
                          : "bg-ui-gray-100"
                      }`}
                      value={type.percent}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-ui-gray-500">
                  No ticket types found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent registrations and membership */}
      <Tabs
        defaultValue="recent"
        className="w-full"
        onValueChange={(value) => {
          setCurrentPage(1);
        }}
      >
        <TabsList className="mb-6 bg-ui-gray-100">
          <TabsTrigger value="recent">Recent Registrations</TabsTrigger>
          <TabsTrigger value="members">New Members</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4 animate-fade-in">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-ui-gray-200">
                      <th className="text-left p-4 font-medium text-ui-gray-500">
                        Name
                      </th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">
                        Ticket Type
                      </th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">
                        Purchase Date
                      </th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">
                        Tickets
                      </th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">
                        Amount
                      </th>
                      <th className="text-right p-4 font-medium text-ui-gray-500">
                        Status
                      </th>
                      <th className="text-right p-4 font-medium text-ui-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedData<Booking>(
                      dashboardData.allBookings,
                      currentPage,
                      itemsPerPage
                    ).length > 0 ? (
                      getPaginatedData<Booking>(
                        dashboardData.allBookings,
                        currentPage,
                        itemsPerPage
                      ).map((booking, index) => (
                        <tr
                          key={index}
                          className="border-b border-ui-gray-100 hover:bg-ui-gray-50"
                        >
                          <td className="p-4">
                            <div className="font-medium">
                              {booking.user?.fullName}
                            </div>
                            <div className="text-sm text-ui-gray-500">
                              {booking.user?.email}
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                booking.ticket?.type === "VIP"
                                  ? "bg-purple-100 text-purple-800"
                                  : booking.ticket?.type === "Early Bird"
                                  ? "bg-prince-light text-prince-green"
                                  : booking.ticket?.type === "Workshop"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {booking.ticket?.name}
                            </span>
                          </td>
                          <td className="p-4 text-ui-gray-500">
                            {new Date(booking.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </td>
                          <td className="p-4 font-medium">
                            {booking.ticketCount || 1}
                          </td>
                          <td className="p-4 font-medium">
                            ₹{booking.paymentPrice}
                          </td>
                          <td className="p-4 text-right">
                            <span
                              className={`px-2 py-1 capitalize rounded-full text-xs font-medium ${
                                booking.paymentStatus === "success"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {booking.paymentStatus}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                {booking.paymentStatus !== "success" &&<DropdownMenuItem
                                  onClick={() =>
                                    handleAction(booking, "mark-success")
                                  }
                                  className="cursor-pointer"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as Success
                                </DropdownMenuItem>}
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleAction(booking, "send-email")
                                  }
                                  className="cursor-pointer"
                                >
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Success Email
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleAction(booking, "download-ticket")
                                  }
                                  className="cursor-pointer"
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Ticket
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="p-8 text-center text-ui-gray-500"
                        >
                          No recent registrations found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(
                currentPage * itemsPerPage,
                dashboardData.allBookings.length
              )}{" "}
              of {dashboardData.allBookings.length} registrations
            </div>

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:text-white"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className={cn(
                            "cursor-pointer bg-white shadow hover:text-white",
                            currentPage === page
                              ? "bg-primary text-white hover:bg-primary"
                              : ""
                          )}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:text-white"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </TabsContent>

        <TabsContent value="members" className="animate-fade-in">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-ui-gray-200">
                      <th className="text-left p-4 font-medium text-ui-gray-500">
                        Name
                      </th>
                      <th className="text-left py-4 font-medium text-ui-gray-500">
                        Email
                      </th>
                      <th className="text-left py-4 font-medium text-ui-gray-500">
                        Role
                      </th>
                      <th className="text-left py-4 font-medium text-ui-gray-500">
                        Phone
                      </th>
                      <th className="text-left p-4 font-medium text-ui-gray-500">
                        Joined Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedData<User>(
                      dashboardData.allMembers,
                      currentPage,
                      itemsPerPage
                    ).length > 0 ? (
                      getPaginatedData<User>(
                        dashboardData.allMembers,
                        currentPage,
                        itemsPerPage
                      ).map((member, index) => (
                        <tr
                          key={index}
                          className="border-b border-ui-gray-100 hover:bg-ui-gray-50"
                        >
                          <td className="p-4">
                            <div className="font-medium">{member.fullName}</div>
                          </td>
                          <td className="py-4">
                            <div className="text-sm text-ui-gray-500">
                              {member.email}
                            </div>
                          </td>
                          <td className="py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                member.role === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : member.role === "user"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {member.role === "admin"
                                ? "Admin"
                                : member.role === "client"
                                ? "Client"
                                : "User"}
                            </span>
                          </td>
                          <td className="py-4 text-ui-gray-500">
                            {member.mobile}
                          </td>
                          <td className="p-4 font-medium">
                            {new Date(member.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-8 text-center text-ui-gray-500"
                        >
                          No recent members found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(
                currentPage * itemsPerPage,
                dashboardData.allMembers.length
              )}{" "}
              of {dashboardData.allMembers.length} members
            </div>

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:text-white"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className={cn(
                            "cursor-pointer bg-white shadow hover:text-white",
                            currentPage === page
                              ? "bg-primary text-white hover:bg-primary"
                              : ""
                          )}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer hover:text-white"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getActionTitle()}</DialogTitle>
            <DialogDescription>{getActionDescription()}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setActionDialogOpen(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button onClick={executeAction} disabled={actionLoading}>
              {actionLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
