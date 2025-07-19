import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Ticket,
  User,
  MapPin,
  Mail,
  Phone,
  Download,
  Edit,
  Clock,
  CheckCircle,
  Shield,
  Star,
  Loader2,
  RefreshCw,
} from "lucide-react";

import MainFooter from "@/components/MainFooter";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LogoutButton from "@/components/LogoutButton";
import { User as UserType } from "@/types/user";
import { getUser, updateUser } from "@/services/user";
import { toast } from "@/hooks/use-toast";
import { Booking } from "@/types";
import { getBookingsByUserId } from "@/services";
import { EventNavbar } from "@/components/EventNavbar";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { downloadTicketPDFReactPDF } from "@/utils/ticketDownloadReactPDF";

interface MemberInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipId: string;
  memberSince: string;
  membershipType: string;
  profileImage: string;
  city: string;
  state: string;
  pincode: string;
  aadhaar: string;
}

const EVENT_DETAILS = {
  name: "Prince Group Mega Music Festival",
  date: "September 20, 2025",
  time: "5:00 PM - 10:00 PM",
  location: "Concordia High School Ground, Nagercoil",
  performers: ["Aditya Rkay", "Sri Nisha", "Aparnaa Pratheep"],
};

const MemberDashboard = () => {
  const { currentUser, userData, userToken, setUserData } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const tab = searchParams.get("tab") || "profile";

  // Get default tab from URL parameter
  const [defaultTab, setDefaultTab] = useState(tab);
  const [memberInfo, setMemberInfo] = useState<MemberInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    membershipId: "PG-2023-0000",
    memberSince: "Jan 2023",
    membershipType: "Premium",
    profileImage: "https://placehold.co/80x80/ffffff/4eb4a7?text=PG",
    aadhaar: "",
  });

  // State for profile edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState<MemberInfo>({
    ...memberInfo,
  });
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };



  // Handle profile edit
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset edited profile when dialog opens/closes
  const handleEditDialogChange = (open: boolean) => {
    setIsEditMode(open);
    if (open) {
      // Reset to current member info when opening
      setEditedProfile({
        ...memberInfo,
        // Ensure we have the latest data from the backend
        name: memberInfo.name || userData?.fullName || "",
        email: memberInfo.email || userData?.email || "",
        phone: memberInfo.phone || userData?.mobile || "",
        address: memberInfo.address || userData?.address || "",
        city: memberInfo.city || userData?.city || "",
        state: memberInfo.state || userData?.state || "",
        pincode: memberInfo.pincode || userData?.pincode || "",
        aadhaar: memberInfo.aadhaar || userData?.aadhaar || "",
      });
    }
  };

  const saveProfileChanges = async () => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "User not authenticated",
        variant: "destructive",
      });
      return;
    }

    // Basic validation
    if (!editedProfile.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    if (!editedProfile.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Email is required",
        variant: "destructive",
      });
      return;
    }

    if (!editedProfile.phone.trim()) {
      toast({
        title: "Validation Error",
        description: "Phone number is required",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const token = await currentUser.getIdToken();

      // Map the edited profile to the User type expected by the API
      const userUpdateData = {
        fullName: editedProfile.name,
        email: editedProfile.email,
        mobile: editedProfile.phone,
        address: editedProfile.address,
        city: editedProfile.city,
        state: editedProfile.state,
        pincode: editedProfile.pincode,
        aadhaar: editedProfile.aadhaar,
      };

      // Call the update API
      const updatedUser = await updateUser(token, userUpdateData);

      // Update the local state with the response from the API
      setMemberInfo({
        name: updatedUser.fullName || "Member",
        email: updatedUser.email || "",
        phone: updatedUser.mobile || "Phone not provided",
        address: updatedUser.address,
        membershipId: updatedUser.userId,
        memberSince: new Date(updatedUser.createdAt).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
          }
        ),
        membershipType: "Premium",
        profileImage: "https://placehold.co/80x80/ffffff/4eb4a7?text=PG",
        city: updatedUser.city || "",
        state: updatedUser.state || "",
        pincode: updatedUser.pincode || "",
        aadhaar: updatedUser.aadhaar || "",
      });

      // Also update the edited profile state
      setEditedProfile({
        name: updatedUser.fullName || "Member",
        email: updatedUser.email || "",
        phone: updatedUser.mobile || "Phone not provided",
        address: updatedUser.address,
        membershipId: updatedUser.userId,
        memberSince: new Date(updatedUser.createdAt).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
          }
        ),
        membershipType: "Premium",
        profileImage: "https://placehold.co/80x80/ffffff/4eb4a7?text=PG",
        city: updatedUser.city || "",
        state: updatedUser.state || "",
        pincode: updatedUser.pincode || "",
        aadhaar: updatedUser.aadhaar || "",
      });

      setIsEditMode(false);

      // Refresh user data to get the latest information
      await fetchUserData();

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = await currentUser?.getIdToken();
      if (currentUser && token) {
        const user: UserType = await getUser(token);
        setUserData(user);
        // Map the user data to memberInfo with defaults for missing fields
        const memberData = {
          name: user.fullName || "Member",
          email: user.email || "",
          phone: user.mobile || "Phone not provided",
          address: user.address, // Default since not in User type
          membershipId: user.userId,
          memberSince: new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          }),
          membershipType: "Premium", // Default membership type
          profileImage: "https://placehold.co/80x80/ffffff/4eb4a7?text=PG",
          city: user.city || "",
          state: user.state || "",
          pincode: user.pincode || "",
          aadhaar: user.aadhaar || "",
        };

        setMemberInfo(memberData);
        setEditedProfile(memberData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Keep default values if fetch fails
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    setDefaultTab(tab);
  }, [tab]);

  useEffect(() => {
    if (currentUser && userToken) {
      setLoadingBookings(true);
      getBookingsByUserId(userToken)
        .then((bookings) => {
          setBookings(bookings);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          toast({
            title: "Error",
            description: "Failed to fetch bookings",
            variant: "destructive",
          });
        })
        .finally(() => {
          setLoadingBookings(false);
        });
    }
  }, [currentUser, userToken]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fdfc] via-white to-[#f0faf9]">
        <EventNavbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-[#4eb4a7] mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Loading your dashboard...
                </h2>
                <p className="text-gray-500">
                  Please wait while we fetch your membership information.
                </p>
              </div>
            </div>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fdfc] via-white to-[#f0faf9]">
      <EventNavbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Top Section with Profile Summary */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <motion.div
              variants={itemVariants}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-[#4eb4a7]/10"
            >
              {/* Background gradient banner */}
              <div className="h-32 bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]"></div>

              <div className="px-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-end -mt-16 mb-6 gap-6">
                  {/* Profile avatar */}
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg bg-[#85cbc3]">
                    <AvatarImage src={memberInfo.profileImage} />
                    <AvatarFallback className="text-3xl text-white">
                      {memberInfo.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-grow">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                          {memberInfo.name}
                        </h1>
                        <p className="text-gray-500 flex items-center gap-1 mt-1">
                          <User className="h-4 w-4" />
                          Member ID: {memberInfo.membershipId}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Badge className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] hover:from-[#4eb4a7] hover:to-[#60afb4] py-1.5 px-3">
                          <Star className="h-3.5 w-3.5 mr-1" />
                          {memberInfo.membershipType}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/5"
                          onClick={() => setIsEditMode(true)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit Profile
                        </Button>
                        <LogoutButton
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content Tabs */}
          <Tabs
            defaultValue={defaultTab}
            onValueChange={(value) => {
              navigate(`/member/dashboard?tab=${value}`);
            }}
            className="w-full"
          >
            <TabsList className="mb-8 w-full justify-start bg-white border border-[#4eb4a7]/10 p-1 rounded-xl shadow-sm">
              <TabsTrigger
                value="profile"
                className="rounded-lg data-[state=active]:bg-[#4eb4a7] data-[state=active]:text-white"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="tickets"
                className="rounded-lg data-[state=active]:bg-[#4eb4a7] data-[state=active]:text-white"
              >
                <Ticket className="h-4 w-4 mr-2" />
                My Tickets
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab Content */}
            <TabsContent value="profile">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Profile Information Card */}
                <motion.div variants={itemVariants}>
                  <Card className="border-[#4eb4a7]/10 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-[#4eb4a7]/5 to-[#60afb4]/5 border-b border-[#4eb4a7]/10">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-gray-800">
                          Profile Information
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">
                            Full Name
                          </p>
                          <p className="flex items-center text-gray-800 font-medium">
                            <User className="h-4 w-4 mr-2 text-[#4eb4a7]" />
                            {memberInfo.name}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">
                            Email Address
                          </p>
                          <p className="flex items-center text-gray-800 font-medium">
                            <Mail className="h-4 w-4 mr-2 text-[#4eb4a7]" />
                            {memberInfo.email}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">
                            Mobile Number
                          </p>
                          <p className="flex items-center text-gray-800 font-medium">
                            <Phone className="h-4 w-4 mr-2 text-[#4eb4a7]" />
                            {memberInfo.phone}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">
                            Member ID
                          </p>
                          <p className="flex items-center text-gray-800 font-medium">
                            <Shield className="h-4 w-4 mr-2 text-[#4eb4a7]" />
                            {memberInfo.membershipId}
                          </p>
                        </div>

                        <div className="pt-2">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Address
                          </p>
                          <p className="flex items-start text-gray-800 font-medium">
                            <MapPin className="h-4 w-4 mr-2 text-[#4eb4a7] mt-1 flex-shrink-0" />
                            <span>{memberInfo.address}</span>
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            City
                          </p>
                          <p className="flex items-start text-gray-800 font-medium">
                            <MapPin className="h-4 w-4 mr-2 text-[#4eb4a7] mt-1 flex-shrink-0" />
                            <span>{memberInfo.city}</span>
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            State
                          </p>
                          <p className="flex items-start text-gray-800 font-medium">
                            <MapPin className="h-4 w-4 mr-2 text-[#4eb4a7] mt-1 flex-shrink-0" />
                            <span>{memberInfo.state}</span>
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Pincode
                          </p>
                          <p className="flex items-start text-gray-800 font-medium">
                            <MapPin className="h-4 w-4 mr-2 text-[#4eb4a7] mt-1 flex-shrink-0" />
                            <span>{memberInfo.pincode}</span>
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Aadhaar Number
                          </p>
                          <p className="flex items-start text-gray-800 font-medium">
                            <MapPin className="h-4 w-4 mr-2 text-[#4eb4a7] mt-1 flex-shrink-0" />
                            <span>{memberInfo.aadhaar}</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t border-gray-100 p-4">
                      <Button
                        className="bg-[#4eb4a7] hover:bg-[#3da296]"
                        onClick={() => setIsEditMode(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Tickets Tab Content */}
            <TabsContent value="tickets">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-[#4eb4a7]/10 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-[#4eb4a7]/5 to-[#60afb4]/5 border-b border-[#4eb4a7]/10">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-gray-800">
                          My Event Bookings
                        </CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (userToken) {
                              setLoadingBookings(true);
                              getBookingsByUserId(userToken)
                                .then((bookings) => {
                                  setBookings(bookings);
                                  toast({
                                    title: "Success",
                                    description:
                                      "Bookings refreshed successfully",
                                  });
                                })
                                .catch((error) => {
                                  console.error(
                                    "Error refreshing bookings:",
                                    error
                                  );
                                  toast({
                                    title: "Error",
                                    description: "Failed to refresh bookings",
                                    variant: "destructive",
                                  });
                                })
                                .finally(() => {
                                  setLoadingBookings(false);
                                });
                            }
                          }}
                          disabled={loadingBookings}
                          className="border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/5"
                        >
                          <RefreshCw
                            className={`h-4 w-4 mr-1 ${
                              loadingBookings ? "animate-spin" : ""
                            }`}
                          />
                          Refresh
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      {loadingBookings ? (
                        <div className="text-center py-12">
                          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Loader2 className="h-8 w-8 text-[#4eb4a7] animate-spin" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">
                            Loading your bookings...
                          </h3>
                          <p className="text-gray-500">
                            Please wait while we fetch your booking information.
                          </p>
                        </div>
                      ) : bookings.length > 0 ? (
                        <div className="space-y-6">
                          {bookings.map(
                            (booking) =>
                              booking.paymentStatus === "success" && (
                                <div
                                  key={booking.id}
                                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                  <div
                                    className={`p-6 border-l-4 ${
                                      booking.paymentStatus === "success"
                                        ? "border-l-green-500"
                                        : booking.paymentStatus === "pending"
                                        ? "border-l-yellow-500"
                                        : "border-l-red-500"
                                    }`}
                                  >
                                    <div className="flex flex-col md:flex-row gap-6">
                                      {/* Booking details */}
                                      <div className="flex-grow space-y-4">
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <Badge
                                              className={cn(
                                                "capitalize",
                                                booking.paymentStatus ===
                                                  "success"
                                                  ? "bg-green-100 hover:bg-green-100 text-green-800 mb-2"
                                                  : booking.paymentStatus ===
                                                    "pending"
                                                  ? "bg-yellow-100 hover:bg-yellow-100 text-yellow-800 mb-2"
                                                  : "bg-red-100 hover:bg-red-100 text-red-800 mb-2"
                                              )}
                                            >
                                              {booking.paymentStatus}
                                            </Badge>
                                            <h3 className="text-xl font-bold text-gray-800">
                                              {EVENT_DETAILS.name}
                                            </h3>
                                            <p className="text-[#4eb4a7] font-medium">
                                              Booking #{booking.bookingNumber}
                                            </p>
                                          </div>

                                          {booking.paymentStatus ===
                                            "success" && (
                                            <Button
                                              size="sm"
                                              className="bg-[#4eb4a7] hover:bg-[#3da296]"
                                              onClick={async () => {
                                                try {
                                                  await downloadTicketPDFReactPDF(
                                                    booking,
                                                    EVENT_DETAILS
                                                  );
                                                  toast({
                                                    title: "Success",
                                                    description:
                                                      "Ticket PDF downloaded successfully!",
                                                  });
                                                } catch (error) {
                                                  console.error(
                                                    "Error downloading ticket:",
                                                    error
                                                  );
                                                  toast({
                                                    title: "Error",
                                                    description:
                                                      "Failed to download ticket PDF",
                                                    variant: "destructive",
                                                  });
                                                }
                                              }}
                                            >
                                              <Download className="h-4 w-4 mr-1" />
                                              Download
                                            </Button>
                                          )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                          <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-[#4eb4a7]" />
                                            <div>
                                              <p className="text-gray-500">
                                                Booking Date
                                              </p>
                                              <p className="font-medium">
                                                {new Date(
                                                  booking.createdAt
                                                ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "short",
                                                  day: "numeric",
                                                })}
                                              </p>
                                            </div>
                                          </div>

                                          <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-[#4eb4a7]" />
                                            <div>
                                              <p className="text-gray-500">
                                                Event Time
                                              </p>
                                              <p className="font-medium">
                                                {EVENT_DETAILS.time}
                                              </p>
                                            </div>
                                          </div>

                                          <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-[#4eb4a7]" />
                                            <div>
                                              <p className="text-gray-500">
                                                Location
                                              </p>
                                              <p className="font-medium">
                                                {EVENT_DETAILS.location}
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-6 pt-2">
                                          <div>
                                            <p className="text-gray-500 text-sm">
                                              Ticket Type
                                            </p>
                                            <p className="font-semibold">
                                              {booking.ticket?.type ||
                                                "Standard"}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-gray-500 text-sm">
                                              Ticket Count
                                            </p>
                                            <p className="font-semibold">
                                              {booking.ticketCount}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-gray-500 text-sm">
                                              Total Price
                                            </p>
                                            <p className="font-semibold">
                                              ₹ {booking.paymentPrice}
                                            </p>
                                          </div>

                                          <div>
                                            <p className="text-gray-500 text-sm">
                                              Payment Status
                                            </p>
                                            <p
                                              className={cn(
                                                "font-semibold capitalize",
                                                booking.paymentStatus ===
                                                  "success"
                                                  ? "text-green-600"
                                                  : booking.paymentStatus ===
                                                    "pending"
                                                  ? "text-yellow-600"
                                                  : "text-red-600"
                                              )}
                                            >
                                              {booking.paymentStatus}
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      {/* QR code (only for confirmed bookings) */}
                                      {booking.paymentStatus === "success" && (
                                        <div className="w-32 h-32 flex-shrink-0">
                                          <div className="w-full h-full rounded-lg border border-gray-200 bg-white flex items-center justify-center p-2">
                                            <div className="text-center">
                                              <QRCodeSVG
                                                value={booking.bookingNumber}
                                                size={80}
                                                level="M"
                                                includeMargin={true}
                                                className="mb-1"
                                              />
                                              <p className="text-xs text-gray-500">
                                                Entry Pass
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Ticket className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">
                            No bookings found
                          </h3>
                          <p className="text-gray-500 mb-6">
                            You haven't made any event bookings yet.
                          </p>
                          <Button
                            asChild
                            className="bg-[#4eb4a7] hover:bg-[#3da296]"
                          >
                            <Link to="/events">Browse Events</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Profile Edit Dialog */}
      <Dialog open={isEditMode} onOpenChange={handleEditDialogChange}>
        <DialogContent className="md:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile Information</DialogTitle>
            <DialogDescription>
              Make changes to your profile information below.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="md:text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={editedProfile.name}
                onChange={handleProfileChange}
                className="md:col-span-3"
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="md:text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={editedProfile.email}
                onChange={handleProfileChange}
                className="md:col-span-3"
                placeholder="Enter your email address"
                readOnly
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="md:text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={editedProfile.phone}
                onChange={handleProfileChange}
                className="md:col-span-3"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="md:text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={editedProfile.address}
                onChange={handleProfileChange}
                className="md:col-span-3"
                placeholder="Enter your address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="md:text-right">
                City
              </Label>
              <Input
                id="city"
                name="city"
                value={editedProfile.city}
                onChange={handleProfileChange}
                className="md:col-span-3"
                placeholder="Enter your city"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="md:text-right">
                State
              </Label>
              <Input
                id="state"
                name="state"
                value={editedProfile.state}
                onChange={handleProfileChange}
                className="md:col-span-3"
                placeholder="Enter your state"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="pincode" className="md:text-right">
                Pincode
              </Label>
              <Input
                id="pincode"
                name="pincode"
                value={editedProfile.pincode}
                onChange={handleProfileChange}
                className="md:col-span-3"
                placeholder="Enter your pincode"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="aadhaar" className="md:text-right">
                Aadhaar Number
              </Label>
              <Input
                id="aadhaar"
                name="aadhaar"
                value={editedProfile.aadhaar}
                onChange={handleProfileChange}
                className="md:col-span-3"
                placeholder="Enter your Aadhaar number"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleEditDialogChange(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#4eb4a7] hover:bg-[#3da296]"
              onClick={saveProfileChanges}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      

      <MainFooter />
    </div>
  );
};

export default MemberDashboard;
