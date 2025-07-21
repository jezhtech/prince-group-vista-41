import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  Download,
  QrCode,
  Eye,
  Ticket,
  Calendar,
  CreditCard,
  Tag,
  Users,
  Loader2,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  getAllTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketById,
} from "@/services/ticket";
import {
  Ticket as TicketType,
  CreateTicketRequest,
  UpdateTicketRequest,
} from "@/types/ticket";
import { getAllBookingsForAdmin } from "@/services/booking";
import { Booking } from "@/types/booking";
import { useAuth } from "@/hooks/useAuth";

const ticketTypes = [
  {
    id: 1,
    name: "Early Bird",
    price: 599,
    available: 0,
    sold: 250,
    total: 250,
    color: "bg-prince-green",
    status: "Sold Out",
    startDate: "Jan 15, 2023",
    endDate: "Feb 28, 2023",
    features: ["General admission", "Swag bag", "Access to all sessions"],
  },
  {
    id: 2,
    name: "Regular",
    price: 999,
    available: 125,
    sold: 375,
    total: 500,
    color: "bg-ui-blue-500",
    status: "On Sale",
    startDate: "Mar 1, 2023",
    endDate: "Jun 10, 2023",
    features: [
      "General admission",
      "Swag bag",
      "Access to all sessions",
      "Lunch included",
    ],
  },
  {
    id: 3,
    name: "VIP",
    price: 2999,
    available: 42,
    sold: 108,
    total: 150,
    color: "bg-purple-500",
    status: "On Sale",
    startDate: "Jan 15, 2023",
    endDate: "Jun 10, 2023",
    features: [
      "VIP seating",
      "Exclusive swag bag",
      "Access to all sessions",
      "Lunch & dinner included",
      "Private networking event",
      "Speaker meet & greet",
    ],
  },
  {
    id: 4,
    name: "Workshop",
    price: 1499,
    available: 50,
    sold: 50,
    total: 100,
    color: "bg-orange-500",
    status: "On Sale",
    startDate: "Mar 15, 2023",
    endDate: "Jun 10, 2023",
    features: [
      "Workshop access",
      "Practical sessions",
      "Workshop materials",
      "Certificate of completion",
    ],
  },
];

const recentTickets = [
  {
    id: "TK-3845",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    type: "VIP",
    date: "May 5, 2023",
    amount: "₹2,999",
    status: "Confirmed",
  },
  {
    id: "TK-3844",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    type: "Regular",
    date: "May 4, 2023",
    amount: "₹999",
    status: "Confirmed",
  },
  {
    id: "TK-3843",
    name: "Suresh Patel",
    email: "suresh.patel@example.com",
    type: "Early Bird",
    date: "May 3, 2023",
    amount: "₹599",
    status: "Confirmed",
  },
  {
    id: "TK-3842",
    name: "Anita Singh",
    email: "anita.singh@example.com",
    type: "Workshop",
    date: "May 2, 2023",
    amount: "₹1,499",
    status: "Pending",
  },
  {
    id: "TK-3841",
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    type: "Regular",
    date: "May 1, 2023",
    amount: "₹999",
    status: "Confirmed",
  },
];

const TicketDesignPreview = () => (
  <div className="h-64 border border-dashed border-ui-gray-300 rounded-lg flex items-center justify-center p-4 relative overflow-hidden bg-gray-50">
    <div className="absolute top-0 left-0 right-0 h-12 bg-ui-blue-500 flex items-center px-4">
      <div className="text-white font-bold">
        Annual Developers Conference 2023
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-12 bg-ui-blue-500 flex items-center justify-between px-4">
      <div className="text-white text-sm">June 15-16, 2023</div>
      <div className="text-white text-sm">Nagercoil Convention Center</div>
    </div>

    <div className="flex gap-4 items-center">
      <div className="h-24 w-24 bg-white p-2 rounded-lg border border-ui-gray-200 flex items-center justify-center">
        <QrCode className="h-16 w-16 text-ui-gray-400" />
      </div>
      <div>
        <div className="text-xs text-ui-gray-500">TICKET TYPE</div>
        <div className="text-lg font-bold mb-1">VIP PASS</div>
        <div className="text-xs text-ui-gray-500">ATTENDEE</div>
        <div className="text-sm">John Smith</div>
      </div>
    </div>

    <div className="absolute top-4 right-4 bg-prince-green text-white text-xs font-bold px-2 py-1 rounded">
      #TK-0001
    </div>
  </div>
);

const TicketTypeForm = ({
  formData,
  setFormData,
}: {
  formData: CreateTicketRequest;
  setFormData: (data: CreateTicketRequest) => void;
}) => {
  const [newBenefit, setNewBenefit] = useState("");

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, newBenefit.trim()],
      });
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addBenefit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Ticket Name</Label>
          <Input
            id="name"
            placeholder="e.g. Early Bird, VIP, etc."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseInt(e.target.value) || 0 })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Ticket Type</Label>
          <Input
            id="type"
            placeholder="e.g. vip, regular, early-bird"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="z-[9999]">
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="sold-out">Sold Out</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the ticket and what it includes..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="benefits">Benefits</Label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              id="benefits"
              placeholder="Add a benefit (e.g. Access to all sessions)"
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button type="button" onClick={addBenefit} variant="outline">
              Add
            </Button>
          </div>
          {formData.benefits.length > 0 && (
            <div className="space-y-2">
              {formData.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-muted rounded-md"
                >
                  <span className="flex-1 text-sm">{benefit}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBenefit(index)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="totalTickets">Total Tickets</Label>
          <Input
            id="totalTickets"
            type="number"
            value={formData.totalTickets}
            onChange={(e) =>
              setFormData({
                ...formData,
                totalTickets: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="availableTickets">Available Tickets</Label>
          <Input
            id="availableTickets"
            type="number"
            value={formData.availableTickets}
            onChange={(e) =>
              setFormData({
                ...formData,
                availableTickets: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="offerPriceWithReferral">
            Offer Price with Referral (₹)
          </Label>
          <Input
            id="offerPriceWithReferral"
            type="number"
            value={formData.offerPriceWithReferral}
            onChange={(e) =>
              setFormData({
                ...formData,
                offerPriceWithReferral: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="offerPriceWithReferralAndYoutube">
            Offer Price with Referral & YouTube (₹)
          </Label>
          <Input
            id="offerPriceWithReferralAndYoutube"
            type="number"
            value={formData.offerPriceWithReferralAndYoutube}
            onChange={(e) =>
              setFormData({
                ...formData,
                offerPriceWithReferralAndYoutube: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

const AdminTickets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  const [formError, setFormError] = useState<string>("");
  const [formData, setFormData] = useState<CreateTicketRequest>({
    name: "",
    price: 0,
    type: "",
    description: "",
    status: "",
    totalTickets: 0,
    availableTickets: 0,
    benefits: [],
    offerPriceWithReferral: 0,
    offerPriceWithReferralAndYoutube: 0,
  });

  const { toast } = useToast();
  const { currentUser } = useAuth();

  // Fetch tickets on component mount
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const token = await currentUser?.getIdToken();
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please log in to access this page.",
          variant: "destructive",
        });
        return;
      }

      // Fetch both tickets and bookings in parallel
      const [fetchedTickets, fetchedBookings] = await Promise.all([
        getAllTickets(),
        getAllBookingsForAdmin(token),
      ]);

      setTickets(fetchedTickets);
      setBookings(fetchedBookings);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tickets. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async () => {
    try {
      setFormError(""); // Clear previous errors
      const token = await currentUser?.getIdToken();
      if (!token) return;

      await createTicket(token, formData);
      toast({
        title: "Success",
        description: "Ticket created successfully!",
      });
      setDialogOpen(false);
      setFormData({
        name: "",
        price: 0,
        type: "",
        description: "",
        status: "",
        totalTickets: 0,
        availableTickets: 0,
        benefits: [],
        offerPriceWithReferral: 0,
        offerPriceWithReferralAndYoutube: 0,
      });
      fetchTickets();
    } catch (error: any) {
      // Extract error message from backend response
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Failed to create ticket. Please try again.";
      setFormError(errorMessage);
      console.log(error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleUpdateTicket = async () => {
    if (!editingTicket) return;

    try {
      setFormError(""); // Clear previous errors
      const token = await currentUser?.getIdToken();
      if (!token) return;

      const updateData: UpdateTicketRequest = {
        id: editingTicket.id,
        ...formData,
      };

      await updateTicket(token, updateData);
      toast({
        title: "Success",
        description: "Ticket updated successfully!",
      });
      setDialogOpen(false);
      setEditingTicket(null);
      setFormData({
        name: "",
        price: 0,
        type: "",
        description: "",
        status: "",
        totalTickets: 0,
        availableTickets: 0,
        benefits: [],
        offerPriceWithReferral: 0,
        offerPriceWithReferralAndYoutube: 0,
      });
      fetchTickets();
    } catch (error: any) {
      // Extract error message from backend response
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Failed to update ticket. Please try again.";
      setFormError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleDeleteTicket = async (ticketId: number) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const token = await currentUser?.getIdToken();
      if (!token) return;

      await deleteTicket(token, ticketId);
      toast({
        title: "Success",
        description: "Ticket deleted successfully!",
      });
      fetchTickets();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error ||
        error?.message ||
        "Failed to delete ticket. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (ticket: TicketType) => {
    setEditingTicket(ticket);
    setFormError(""); // Clear errors when opening dialog
    setFormData({
      name: ticket.name,
      price: ticket.price,
      type: ticket.type,
      status: ticket.status,
      description: ticket.description,
      totalTickets: ticket.totalTickets,
      availableTickets: ticket.availableTickets,
      benefits: ticket.benefits,
      offerPriceWithReferral: ticket.offerPriceWithReferral,
      offerPriceWithReferralAndYoutube: ticket.offerPriceWithReferralAndYoutube,
    });
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingTicket(null);
    setFormError(""); // Clear errors when opening dialog
    setFormData({
      name: "",
      price: 0,
      type: "",
      description: "",
      status: "",
      totalTickets: 0,
      availableTickets: 0,
      benefits: [],
      offerPriceWithReferral: 0,
      offerPriceWithReferralAndYoutube: 0,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setFormError(""); // Clear errors when closing dialog
  };

  // Calculate successful booking counts for each ticket
  const getSuccessfulBookingsCount = (ticketId: number): number => {
    return bookings.filter(
      (booking) => 
        booking.ticketId === ticketId && 
        booking.paymentStatus === "success"
    ).length;
  };

  // Calculate total tickets sold for each ticket type
  const getTotalTicketsSold = (ticketId: number): number => {
    return bookings
      .filter(
        (booking) => 
          booking.ticketId === ticketId && 
          booking.paymentStatus === "success"
      )
      .reduce((total, booking) => total + booking.ticketCount, 0);
  };

  // Calculate actual revenue for each ticket type from successful bookings
  const getTicketRevenue = (ticketId: number): number => {
    return bookings
      .filter(
        (booking) => 
          booking.ticketId === ticketId && 
          booking.paymentStatus === "success"
      )
      .reduce((total, booking) => total + booking.paymentPrice, 0);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading tickets...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Ticket Management</h1>
          <p className="text-ui-gray-500 flex items-center mt-1">
            <Calendar className="h-4 w-4 mr-2" />
            Annual Developers Conference 2023
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <PlusCircle className="h-4 w-4 mr-2" /> Create Ticket Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingTicket ? "Edit Ticket Type" : "Create New Ticket Type"}
              </DialogTitle>
              <DialogDescription>
                {editingTicket
                  ? "Modify this ticket type for your event."
                  : "Add a new ticket type for your event. Configure pricing, availability, and features."}
              </DialogDescription>
            </DialogHeader>

            {/* Error Display */}
            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">{formError}</div>
                  </div>
                </div>
              </div>
            )}

            <TicketTypeForm formData={formData} setFormData={setFormData} />
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                onClick={
                  editingTicket ? handleUpdateTicket : handleCreateTicket
                }
              >
                {editingTicket ? "Save Changes" : "Save Ticket Type"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Booking Statistics Summary */}
      {bookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
              <p className="text-xs text-muted-foreground">
                All bookings
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Successful Bookings</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.paymentStatus === "success").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Paid bookings
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets Sold</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {bookings
                  .filter(b => b.paymentStatus === "success")
                  .reduce((total, booking) => total + booking.ticketCount, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Successful sales
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{bookings
                  .filter(b => b.paymentStatus === "success")
                  .reduce((total, booking) => total + booking.paymentPrice, 0)
                  .toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                From successful payments
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {filteredTickets.length === 0 ? (
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <Ticket className="h-16 w-16 text-ui-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {searchTerm || filterStatus !== "all"
                  ? "No tickets found"
                  : "No tickets yet"}
              </h3>
              <p className="text-ui-gray-500 max-w-md mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by creating your first ticket type for your event."}
              </p>
              {!searchTerm && filterStatus === "all" && (
                <Button onClick={openCreateDialog}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Create First Ticket
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="overflow-hidden">
              <div className="h-1.5 w-full bg-ui-blue-500"></div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{ticket.name}</CardTitle>
                    <CardDescription>
                      ₹{ticket.price.toLocaleString()} • Type: {ticket.type} •
                      Created: {new Date(ticket.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(ticket)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteTicket(ticket.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-ui-gray-500 mb-1">
                        Status
                      </div>
                      <Badge
                        className={
                          ticket.status === "sold-out"
                            ? "bg-red-100 text-red-800 hover:bg-red-100"
                            : ticket.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {ticket.status}
                      </Badge>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-ui-gray-500 mb-1">
                        Availability
                      </div>
                      <div className="flex items-center">
                        <div className="font-medium">
                          {ticket.totalTickets - getTotalTicketsSold(ticket.id)} / {ticket.totalTickets}
                        </div>
                        <div className="text-sm text-ui-gray-500 ml-2">
                          (
                          {Math.round(
                            (getTotalTicketsSold(ticket.id) / ticket.totalTickets) *
                              100
                          )}
                          % sold)
                        </div>
                      </div>
                      <div className="w-full bg-ui-gray-100 h-2 rounded-full mt-1">
                        <div
                          className="h-2 rounded-full bg-ui-blue-500"
                          style={{
                            width: `${
                              (getTotalTicketsSold(ticket.id) / ticket.totalTickets) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-ui-gray-500 mb-1">
                        Successful Bookings
                      </div>
                      <div className="flex items-center">
                        <div className="font-medium text-green-600">
                          {getSuccessfulBookingsCount(ticket.id)}
                        </div>
                        <div className="text-sm text-ui-gray-500 ml-2">
                          ({getTotalTicketsSold(ticket.id)} tickets sold)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="text-sm font-medium text-ui-gray-500 mb-1">
                      Details
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Price:</span>
                        <span className="font-medium">₹{ticket.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Description:</span>
                        <span className="font-medium">
                          {ticket.description}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Type:</span>
                        <span className="font-medium">{ticket.type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Updated:</span>
                        <span className="font-medium">
                          {new Date(ticket.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <div className="text-sm text-ui-gray-500">
                  <span className="font-medium">
                    {getTotalTicketsSold(ticket.id)}
                  </span>{" "}
                  tickets sold
                  {getTotalTicketsSold(ticket.id) > 0 && (
                    <>
                      • <span className="font-medium ml-1 text-green-600">
                        ₹
                        {getTicketRevenue(ticket.id).toLocaleString()}
                      </span>{" "}
                      revenue
                    </>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" /> View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTickets;
