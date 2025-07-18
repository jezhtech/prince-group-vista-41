import { Button } from "./ui/button";
import {
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Youtube,
  CreditCard,
  Loader2,
} from "lucide-react";
import { Label } from "./ui/label";
import {
  Minus,
  Plus,
  Ticket as TicketIcon,
  CalendarDays,
  MusicIcon,
  Gift,
} from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { useState, useCallback, useMemo, memo, useEffect } from "react";
import { cn, isIOS } from "@/lib/utils";
import { Input } from "./ui/input";
import { Ticket } from "@/types";
import { getAllTickets, createBooking } from "@/services";
import { useAuth } from "@/hooks/useAuth";
import { useYouTubeSubscription } from "@/services/youtube";
import { createPaymentSession, generateLinkId } from "@/services/payment";
import { checkReferralCode } from "@/services/referral";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const EVENT_DETAILS = {
  date: "5 PM, 20 September 2025",
  time: "5:00 PM - 10:00 PM",
  location: "Concordia High School Ground, Nagercoil",
  performers: ["Aditya Rkay", "Sri Nisha", "Aparnaa Pratheep"],
  features: [
    "Main Performer - Singers: Aditya Rkay | Sri Nisha",
    "Violin - Chendamellan Fusion by Aparnaa Pratheep",
    "World-class Sound and Lighting System",
  ],
};

const AVAILABLE_OFFERS = [
  {
    id: "bulk",
    name: "Bulk Purchase Offer",
    description: "Buy 4 tickets get 1 more free, Buy 8 tickets get 2 more free",
    type: "bulk",
    icon: Gift,
  },
  {
    id: "referral",
    name: "Referral Discount",
    description: "Get 20% off with a valid referral code",
    discount: 0.2,
    type: "referral",
    icon: Gift,
  },
  {
    id: "youtube",
    name: "YouTube Subscription",
    description: "Subscribe to our channel for additional 30% off",
    discount: 0.3,
    type: "youtube",
    icon: Youtube,
  },
];

const GENERAL_BENEFITS = [
  "Entry to all concert areas based on ticket class",
  "Access to food and beverage stalls",
  "Official event merchandise discount (10%)",
  "Exclusive entry to after-party (Elite & VVIP only)",
];

// Memoized price formatter to avoid creating new instances
const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

interface EventBookingProps {
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
}

type BookingStep = "tickets" | "offers" | "payment";

export const EventBooking = memo(
  ({ isBookingOpen, setIsBookingOpen }: EventBookingProps) => {
    const { currentUser, userToken, userData } = useAuth();
    const { checkSubscription } = useYouTubeSubscription();
    const [currentStep, setCurrentStep] = useState<BookingStep>("tickets");
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [ticketCategory, setTicketCategory] = useState("");
    const [isTicketClassesLoading, setIsTicketClassesLoading] = useState(false);
    const [ticketClasses, setTicketClasses] = useState<Ticket[]>([]);
    const navigate = useNavigate();
    const [isCheckingReferral, setIsCheckingReferral] =
      useState<boolean>(false);
    const [referralFound, setReferralFound] = useState<boolean>(false);

    // Offer states
    const [referralCode, setReferralCode] = useState("");
    const [isValidReferral, setIsValidReferral] = useState(false);
    const [referralError, setReferralError] = useState("");
    const [isYoutubeSubscribed, setIsYoutubeSubscribed] = useState(false);
    const [isCheckingYoutube, setIsCheckingYoutube] = useState(false);
    const [youtubeChannelId] = useState("UCkIdOa88R8uDR_B3afbtyjg"); // Replace with your channel ID

    // Payment states
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

    // Memoized calculations
    const selectedTicket = useMemo(
      () => ticketClasses.find((ticket) => ticket.type === ticketCategory),
      [ticketCategory, ticketClasses]
    );

    const basePrice = useMemo(
      () => (selectedTicket ? selectedTicket.price * ticketQuantity : 0),
      [selectedTicket, ticketQuantity]
    );

    const finalPrice = useMemo(() => {
      if (!selectedTicket) return 0;

      let price = selectedTicket.price;

      // Apply referral discount only if valid referral is found
      if (isValidReferral) {
        price = selectedTicket.offerPriceWithReferral;
      }

      // Apply YouTube discount if subscribed
      if (isYoutubeSubscribed) {
        price = selectedTicket.offerPriceWithReferralAndYoutube;
      }

      // Calculate price based on quantity purchased (not received)
      let ticketsToPayFor = ticketQuantity;

      // Apply bulk purchase offer - pay for the base quantity, get extra free
      if (ticketQuantity >= 8) {
        // Buy 8, get 2 more free = pay for 8, receive 10
        ticketsToPayFor = 8;
      } else if (ticketQuantity >= 4) {
        // Buy 4, get 1 more free = pay for 4, receive 5
        ticketsToPayFor = 4;
      }

      return price * ticketsToPayFor;
    }, [selectedTicket, ticketQuantity, isValidReferral, isYoutubeSubscribed]);

    const totalSavings = useMemo(() => {
      return basePrice - finalPrice;
    }, [basePrice, finalPrice]);

    // Calculate bulk offer savings
    const bulkSavings = useMemo(() => {
      if (!selectedTicket) return 0;

      let savings = 0;
      if (ticketQuantity >= 8) {
        // Paying for 8 tickets but receiving 10 (2 free)
        savings = selectedTicket.price * 2;
      } else if (ticketQuantity >= 4) {
        // Paying for 4 tickets but receiving 5 (1 free)
        savings = selectedTicket.price * 1;
      }

      return savings;
    }, [selectedTicket, ticketQuantity]);

    const isBookingValid = useMemo(
      () => ticketCategory && ticketQuantity > 0,
      [ticketCategory, ticketQuantity]
    );

    const canProceedToOffers = useMemo(
      () => ticketCategory && ticketQuantity > 0,
      [ticketCategory, ticketQuantity]
    );

    const canProceedToPayment = useMemo(
      () => ticketCategory && ticketQuantity > 0,
      [ticketCategory, ticketQuantity]
    );

    // Optimized handlers
    const handleTicketSelect = useCallback((ticketType: string) => {
      setTicketCategory(ticketType);
    }, []);

    const handleQuantityChange = useCallback((newQuantity: number) => {
      if (newQuantity >= 1 && newQuantity <= 15) {
        setTicketQuantity(newQuantity);
      }
    }, []);

    const handleClose = useCallback(() => {
      setIsBookingOpen(false);
      // Reset form when closing
      setTicketCategory("");
      setTicketQuantity(1);
      setCurrentStep("tickets");
      setReferralCode("");
      setIsValidReferral(false);
      setReferralError("");
      setIsYoutubeSubscribed(false);
    }, [setIsBookingOpen]);

    const handleNextStep = useCallback(() => {
      if (currentStep === "tickets" && canProceedToOffers) {
        setCurrentStep("offers");
      } else if (currentStep === "offers" && canProceedToPayment) {
        setCurrentStep("payment");
      }
    }, [currentStep, canProceedToOffers, canProceedToPayment]);

    const handlePreviousStep = useCallback(() => {
      if (currentStep === "offers") {
        setCurrentStep("tickets");
      } else if (currentStep === "payment") {
        setCurrentStep("offers");
      }
    }, [currentStep]);

    const handleProceedToPayment = useCallback(async () => {
      if (!isBookingValid || !currentUser) {
        toast({
          title: "Error",
          description: "Please select a ticket and ensure you're logged in.",
          variant: "destructive",
        });
        return;
      }

      // Check if userData is available
      if (!userData) {
        console.error("userData is null:", {
          currentUser,
          userToken,
          userData,
        });
        toast({
          title: "User Data Missing",
          description: "Please refresh the page or log in again to continue.",
          variant: "destructive",
        });
        return;
      }

      setIsProcessingPayment(true);
      try {
        // Create booking first
        const bookingData = {
          userId: currentUser.uid,
          referralId: isValidReferral ? referralCode : "",
          ticketId: selectedTicket!.id,
          ticketCount:
            ticketQuantity >= 8
              ? ticketQuantity + 2
              : ticketQuantity >= 4
              ? ticketQuantity + 1
              : ticketQuantity, // Store actual tickets received
          paymentMethod: "cashfree",
          paymentStatus: "pending" as const,
          paymentDate: new Date().toISOString(),
          paymentLinkId: "",
        };

        const booking = await createBooking(
          await currentUser.getIdToken(),
          bookingData
        );

        // Create payment session with Cashfree
        const paymentData = {
          bookingId: booking.bookingNumber,
          amount: finalPrice,
          currency: "INR",
          customerName:
            currentUser.displayName || userData?.fullName || "Guest",
          customerEmail: currentUser.email || userData?.email || "",
          customerPhone: userData?.mobile || "", // You might want to get this from user profile
          orderNote: `Booking for ${selectedTicket!.name} x ${
            ticketQuantity >= 8
              ? ticketQuantity + 2
              : ticketQuantity >= 4
              ? ticketQuantity + 1
              : ticketQuantity
          } tickets (${ticketQuantity} paid + ${
            ticketQuantity >= 8 ? 2 : ticketQuantity >= 4 ? 1 : 0
          } free)`,
        };

        const paymentResponse = await createPaymentSession(
          await currentUser.getIdToken(),
          paymentData
        );

        // Redirect to Cashfree payment page
        if (paymentResponse.paymentLink) {
          setPaymentUrl(paymentResponse.paymentLink);
          window.location.href = paymentResponse.paymentLink;

          toast({
            title: "Payment Initiated",
            description:
              "Redirecting to payment gateway. Please complete your payment.",
          });

          // Close the booking dialog
          handleClose();
        } else {
          throw new Error("Payment URL not received");
        }
      } catch (error) {
        console.error("Payment error:", error);
        toast({
          title: "Payment Error",
          description: "Failed to initiate payment. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsProcessingPayment(false);
      }
    }, [
      isBookingValid,
      currentUser,
      selectedTicket,
      ticketQuantity,
      finalPrice,
      referralCode,
      handleClose,
    ]);

    const formatPrice = useCallback((price: number) => {
      return priceFormatter.format(price);
    }, []);

    // YouTube subscription check
    const checkYoutubeSubscription = useCallback(async () => {
      if (!currentUser) return;

      setIsCheckingYoutube(true);
      try {
        const isSubscribed = await checkSubscription(youtubeChannelId);
        setIsYoutubeSubscribed(isSubscribed);
      } catch (error) {
        console.error("Error checking YouTube subscription:", error);
        // Show user-friendly error message
        if (
          error instanceof Error &&
          error.message.includes("Google access token")
        ) {
          // User needs to sign in with Google
          console.log(
            "User needs to sign in with Google to check YouTube subscription"
          );
        }
      } finally {
        setIsCheckingYoutube(false);
      }
    }, [currentUser, youtubeChannelId, checkSubscription]);

    const checkReferral = useCallback(async () => {
      if (!referralCode.trim()) {
        setReferralError("Please enter a referral code to check.");
        return;
      }

      setIsCheckingReferral(true);
      setReferralError("");
      try {
        const response = await checkReferralCode(userToken, referralCode);
        if (response.found) {
          setReferralCode(response.referral.referralId);
          setIsValidReferral(true);
          setReferralError("");
        } else {
          setReferralCode("");
          setIsValidReferral(false);
          setReferralError(
            "Referral code not found. Please enter a valid code."
          );
        }
      } catch (error) {
        console.error(
          "Referral code not found. Please enter a valid code.",
          error
        );
        setReferralCode("");
        setIsValidReferral(false);
        setReferralError("Referral code not found. Please enter a valid code.");
      } finally {
        setIsCheckingReferral(false);
      }
    }, [referralCode, userToken]);

    // Check if user is already signed in with Google
    const isGoogleUser = useMemo(() => {
      if (!currentUser) return false;
      return currentUser.providerData.some(
        (provider) => provider.providerId === "google.com"
      );
    }, [currentUser]);

    // Redesigned ticket cards for Select Ticket Class
    const ticketCards = useMemo(() => {
      // Find the ticket with the lowest offer price for badge
      let bestValueType = '';
      let minOffer = Infinity;
      ticketClasses.forEach(ticket => {
        if (ticket.offerPriceWithReferralAndYoutube < minOffer) {
          minOffer = ticket.offerPriceWithReferralAndYoutube;
          bestValueType = ticket.type;
        }
      });
      return ticketClasses.map((ticket) => {
        const selected = ticketCategory === ticket.type;
        const isBest = ticket.type === bestValueType;
        return (
          <div
            key={ticket.id}
            className={cn(
              "relative group cursor-pointer border-2 rounded-2xl p-4 flex flex-col gap-2 transition-all duration-300 shadow-md",
              selected
                ? "border-pink-500 bg-gradient-to-br from-pink-600/80 to-red-500/80 scale-105 shadow-xl animate-pulse"
                : "border-white/10 bg-white/5 hover:border-pink-400/80 hover:scale-105 hover:shadow-lg active:scale-100"
            )}
            onClick={() => handleTicketSelect(ticket.type)}
            style={{ minHeight: 120 }}
          >
            {/* Best Value Badge */}
            {isBest && (
              <span className="absolute top-2 right-2 bg-yellow-400 text-pink-900 text-xs font-bold px-2 py-0.5 rounded-full shadow animate-bounce z-10">
                Best Value
              </span>
            )}
            {/* Icon and Name */}
            <div className="flex items-center gap-3">
              <div className={cn(
                "rounded-full p-2 flex items-center justify-center",
                selected ? "bg-white/20" : "bg-pink-500/20"
              )}>
                <TicketIcon className={cn("h-6 w-6", selected ? "text-white" : "text-pink-400")} />
              </div>
              <div>
                <h4 className={cn(
                  "font-bold text-base sm:text-lg",
                  selected ? "text-white" : "text-pink-200"
                )}>{ticket.name}</h4>
                <p className="text-xs text-white/60 mt-0.5 uppercase tracking-wide">{ticket.type}</p>
              </div>
            </div>
            {/* Price Section */}
            <div className="flex items-end gap-2 mt-2">
              <span className={cn(
                "font-extrabold text-xl sm:text-2xl",
                selected ? "text-yellow-200 drop-shadow" : "text-white"
              )}>{formatPrice(ticket.offerPriceWithReferralAndYoutube)}</span>
              <span className="text-xs text-green-400 font-semibold">with offers</span>
              {ticket.price !== ticket.offerPriceWithReferralAndYoutube && (
                <span className="text-xs text-white/50 line-through ml-2">{formatPrice(ticket.price)}</span>
              )}
            </div>
            {/* Benefits */}
            <div className="mt-2 flex flex-wrap gap-2">
              {ticket.benefits.slice(0, 2).map((benefit, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-pink-900/30 text-white/80",
                    selected && "bg-yellow-400/20 text-yellow-100"
                  )}
                >
                  <CheckCircle className="h-3 w-3 text-pink-400" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        );
      });
    }, [ticketCategory, handleTicketSelect, formatPrice, ticketClasses]);

    useEffect(() => {
      setIsTicketClassesLoading(true);
      getAllTickets().then((tickets) => {
        setTicketClasses(tickets);
        setIsTicketClassesLoading(false);
      });
    }, []);

    const renderStepContent = () => {
      switch (currentStep) {
        case "tickets":
          return (
            <div className="booking-form-grid">
              {/* Left Column - Ticket Selection */}
              <div>
                <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-white/90">
                  Select Ticket Class
                </h4>
                <div
                  className={cn(
                    "grid gap-4 md:gap-6 overflow-y-auto",
                    isIOS ? "mb-3" : "max-h-96",
                    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                    "bg-gradient-to-br from-pink-900/30 to-red-900/10 p-2 rounded-xl"
                  )}
                >
                  {ticketCards}
                </div>

                {/* General Benefits */}
                <div
                  className={cn(
                    "bg-pink-900/20 p-3 sm:p-4 rounded-lg border border-pink-500/20",
                    isIOS ? "" : "mt-4 md:mt-6"
                  )}
                >
                  <h4 className="text-xs sm:text-sm font-medium text-pink-300 mb-2">
                    All Tickets Include:
                  </h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {GENERAL_BENEFITS.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70"
                      >
                        <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-400 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Ticket Details */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white/90">
                  Ticket Details
                </h4>
                <div className={cn(isIOS ? "space-y-2" : "space-y-6")}>
                  {/* Quantity Selection */}
                  <div>
                    <Label htmlFor="quantity" className="text-white/90">
                      Number of Tickets
                    </Label>
                    <div className={cn("flex", isIOS ? "" : "mt-4")}>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(ticketQuantity - 1)}
                        disabled={ticketQuantity <= 1}
                        className="rounded-r-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 flex items-center justify-center border-y border-white/20 bg-white/5 text-white font-semibold">
                        {ticketQuantity}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          ticketQuantity < 15 &&
                          handleQuantityChange(ticketQuantity + 1)
                        }
                        disabled={ticketQuantity >= 15}
                        className="rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-white/50 text-sm">
                        Maximum 15 tickets per booking
                      </p>
                      {ticketQuantity >= 4 && (
                        <p className="text-green-400 text-sm font-medium">
                          {ticketQuantity >= 8
                            ? "🎉 You're getting 2 MORE FREE tickets!"
                            : "🎉 You're getting 1 MORE FREE ticket!"}
                        </p>
                      )}
                      {ticketQuantity === 3 && (
                        <p className="text-yellow-400 text-sm">
                          Add 1 more ticket to get 1 MORE FREE ticket!
                        </p>
                      )}
                      {ticketQuantity === 7 && (
                        <p className="text-yellow-400 text-sm">
                          Add 1 more ticket to get 2 MORE FREE tickets!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Event Date */}
                  <div>
                    <Label htmlFor="concert-date" className="text-white/90">
                      Concert Date
                    </Label>
                    <div
                      className={cn(
                        "flex items-start gap-3 p-4 border border-white/20 rounded-lg bg-white/5",
                        !isIOS && "mt-2"
                      )}
                    >
                      <CalendarDays className="h-5 w-5 text-pink-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">
                          {EVENT_DETAILS.date}
                        </p>
                        <p className="text-sm text-white/60">
                          {EVENT_DETAILS.time}
                        </p>
                        <p className="text-sm text-white/60">
                          {EVENT_DETAILS.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Event Features */}
                  <div>
                    <Label className="text-white/90">Concert Details</Label>
                    <div
                      className={cn(
                        "p-4 border border-white/20 rounded-lg bg-white/5 space-y-2",
                        !isIOS && "mt-2"
                      )}
                    >
                      {EVENT_DETAILS.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
                          <span className="text-white/70 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <Label className="text-white/90">Booking Summary</Label>
                    <div
                      className={cn(
                        "p-4 border border-white/20 rounded-lg bg-white/5 space-y-3",
                        !isIOS && "mt-2"
                      )}
                    >
                      <p className="flex justify-between">
                        <span className="text-white/70">Ticket Type</span>
                        <span className="font-medium text-white">
                          {selectedTicket?.name || "Select a ticket"}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-white/70">Quantity</span>
                        <span className="font-medium text-white">
                          {ticketQuantity}
                        </span>
                      </p>
                      {ticketQuantity >= 4 && (
                        <p className="flex justify-between">
                          <span className="text-white/70">Bulk Offer</span>
                          <span className="text-green-400 text-sm">
                            {ticketQuantity >= 8
                              ? "Buy 8, Get 2 More Free"
                              : "Buy 4, Get 1 More Free"}
                          </span>
                        </p>
                      )}
                      {selectedTicket && (
                        <p className="flex justify-between">
                          <span className="text-white/70">
                            Price per ticket
                          </span>
                          <span className="font-medium text-white">
                            {formatPrice(selectedTicket.price)}
                          </span>
                        </p>
                      )}
                      {bulkSavings > 0 && (
                        <p className="flex justify-between">
                          <span className="text-green-400">Bulk Savings</span>
                          <span className="text-green-400 font-medium">
                            -{formatPrice(bulkSavings)}
                          </span>
                        </p>
                      )}
                      <p className="pt-2 border-t border-white/20 flex justify-between">
                        <span className="font-medium text-white">Subtotal</span>
                        <span className="font-bold text-pink-400 text-lg">
                          {finalPrice > 0 ? formatPrice(finalPrice) : "---"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        case "offers":
          return (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white/90">
                  Available Offers
                </h4>
                <p className="text-white/60 mb-6">
                  Unlock additional discounts to save more on your tickets!
                </p>
              </div>

              {/* Bulk Purchase Offer */}
              <div className="bg-white/5 p-4 rounded-lg border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <Gift className="h-5 w-5 text-pink-500" />
                  <div>
                    <h5 className="font-medium text-white">
                      Bulk Purchase Offer
                    </h5>
                    <p className="text-xs sm:text-sm text-white/60">
                      Buy 4 tickets get 1 more free, Buy 8 tickets get 2 more
                      free
                    </p>
                  </div>
                </div>

                {/* Current Offer Status */}
                <div className="mb-3">
                  {ticketQuantity >= 8 ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        You're getting 2 MORE FREE tickets! (Pay for 8, Get 10)
                      </span>
                    </div>
                  ) : ticketQuantity >= 4 ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        You're getting 1 MORE FREE ticket! (Pay for 4, Get 5)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <div className="h-4 w-4 rounded-full border-2 border-yellow-400"></div>
                      <span className="text-sm">
                        Add {4 - ticketQuantity} more ticket
                        {ticketQuantity === 3 ? "" : "s"} to get 1 MORE FREE
                        ticket
                      </span>
                    </div>
                  )}
                </div>

                {/* Quick Add Buttons */}
                <div className="flex flex-wrap gap-2">
                  {ticketQuantity < 4 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTicketQuantity(4)}
                      className="border-pink-500/50 text-pink-400 hover:bg-pink-500/10"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Buy 4 Get 1 More Free
                    </Button>
                  )}
                  {ticketQuantity < 8 && ticketQuantity >= 4 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTicketQuantity(8)}
                      className="border-pink-500/50 text-pink-400 hover:bg-pink-500/10"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Buy 8 Get 2 More Free
                    </Button>
                  )}
                  {ticketQuantity >= 8 && ticketQuantity < 15 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setTicketQuantity(Math.min(ticketQuantity + 1, 15))
                      }
                      className="border-white/20 hover:bg-white/10"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add More Tickets
                    </Button>
                  )}
                </div>

                {/* Bulk Savings Display */}
                {bulkSavings > 0 && (
                  <div className="mt-3 p-2 bg-green-500/10 border border-green-500/20 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-400">
                        Bulk Offer Savings:
                      </span>
                      <span className="text-sm font-medium text-green-400">
                        -{formatPrice(bulkSavings)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Referral Code */}
              <div className="bg-white/5 p-4 rounded-lg border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <Gift className="h-5 w-5 text-pink-500" />
                  <div>
                    <h5 className="font-medium text-white">Referral Code</h5>
                    <p className="text-xs sm:text-sm text-white/60">
                      Get 20% off with a valid referral code
                    </p>
                  </div>
                </div>
                <Input
                  className={`bg-white/10 border-white/20 text-white uppercase placeholder:normal-case ${
                    isValidReferral
                      ? "border-green-500"
                      : referralError
                      ? "border-red-500"
                      : ""
                  }`}
                  type="text"
                  placeholder="Enter referral code"
                  value={referralCode}
                  onChange={(e) => {
                    setReferralCode(e.target.value.toUpperCase());
                    // Clear validation and errors when user starts typing
                    if (isValidReferral) {
                      setIsValidReferral(false);
                    }
                    if (referralError) {
                      setReferralError("");
                    }
                  }}
                />
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    className="w-fit"
                    disabled={isCheckingReferral || referralCode.length === 0}
                    onClick={() => checkReferral()}
                  >
                    {isCheckingReferral
                      ? "Checking Referral Code..."
                      : "Check Referral Code"}
                  </Button>
                  {isValidReferral && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setReferralCode("");
                        setIsValidReferral(false);
                      }}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {isValidReferral && (
                  <div className="flex items-center gap-2 text-green-400 mt-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">
                      Valid referral code! Discount applied.
                    </span>
                  </div>
                )}
                {referralError && (
                  <div className="flex items-center gap-2 text-red-400 mt-2">
                    <X className="h-4 w-4" />
                    <span className="text-sm">{referralError}</span>
                  </div>
                )}
              </div>

              {/* YouTube Subscription */}
              {/* <div className="bg-white/5 p-4 rounded-lg border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <Youtube className="h-5 w-5 text-red-500" />
                  <div>
                    <h5 className="font-medium text-white">
                      YouTube Subscription
                    </h5>
                    <p className="text-xs sm:text-sm text-white/60">
                      Subscribe to our channel for additional 30% off
                    </p>
                  </div>
                </div>

                {isCheckingYoutube ? (
                  <div className="flex items-center gap-2 text-white/70">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-500"></div>
                    Checking subscription status...
                  </div>
                ) : isYoutubeSubscribed ? (
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>You're subscribed! Additional discount applied.</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {isGoogleUser ? (
                      <>
                        <p className="text-sm text-white/60">
                          You're signed in with Google. Click below to check
                          your subscription status.
                        </p>
                        <div className="flex flex-col sm:flex-row  gap-2">
                          <Button
                            onClick={() =>
                              window.open(
                                "https://www.youtube.com/@Princegroupofcompanies",
                                "_blank"
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            <Youtube className="mr-2 h-4 w-4" />
                            Subscribe our Channel
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              // User is already signed in with Google, just check subscription
                              checkYoutubeSubscription();
                            }}
                            className="border-white/20 hover:bg-white/10"
                          >
                            Check Subscription
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-xs sm:text-sm text-white/60">
                          To check your subscription status, you need to sign in
                          with Google.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            onClick={() =>
                              window.open(
                                "https://www.youtube.com/@Princegroupofcompanies",
                                "_blank"
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            <Youtube className="mr-2 h-4 w-4" />
                            Subscribe our Channel
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              // This will trigger a re-authentication with Google
                              checkYoutubeSubscription();
                            }}
                            className="border-white/20 hover:bg-white/10"
                          >
                            Sign in with Google & Check
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div> */}

              {/* Price Summary */}
              <div className="bg-pink-900/20 p-4 rounded-lg border border-pink-500/20">
                <h5 className="font-medium text-pink-300 mb-3">
                  Price Summary
                </h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">Original Price:</span>
                    <span className="text-white">{formatPrice(basePrice)}</span>
                  </div>

                  {/* Bulk Offer Savings */}
                  {bulkSavings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-green-400">
                        Bulk Offer Savings:
                      </span>
                      <span className="text-green-400 font-medium">
                        -{formatPrice(bulkSavings)}
                      </span>
                    </div>
                  )}

                  {/* Referral Savings */}
                  {isValidReferral && (
                    <div className="flex justify-between">
                      <span className="text-green-400">Referral Discount:</span>
                      <span className="text-green-400 font-medium">
                        -
                        {formatPrice(
                          basePrice -
                            (selectedTicket?.offerPriceWithReferral || 0) *
                              ticketQuantity
                        )}
                      </span>
                    </div>
                  )}

                  {/* YouTube Savings */}
                  {isYoutubeSubscribed && (
                    <div className="flex justify-between">
                      <span className="text-green-400">YouTube Discount:</span>
                      <span className="text-green-400 font-medium">
                        -
                        {formatPrice(
                          (selectedTicket?.offerPriceWithReferral ||
                            selectedTicket?.price ||
                            0) *
                            ticketQuantity -
                            finalPrice
                        )}
                      </span>
                    </div>
                  )}

                  {totalSavings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-green-400">Total Savings:</span>
                      <span className="text-green-400 font-medium">
                        -{formatPrice(totalSavings)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2 border-t border-white/20">
                    <span className="font-medium text-white">Final Price:</span>
                    <span className="font-bold text-pink-400 text-lg">
                      {formatPrice(finalPrice)}
                    </span>
                  </div>

                  {/* Ticket Count Info */}
                  {ticketQuantity >= 4 && (
                    <div className="text-xs text-white/60 mt-2">
                      {ticketQuantity >= 8
                        ? `You'll receive ${
                            ticketQuantity + 2
                          } tickets (paying for ${ticketQuantity})`
                        : `You'll receive ${
                            ticketQuantity + 1
                          } tickets (paying for ${ticketQuantity})`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );

        case "payment":
          return (
            <div className="space-y-4 md:space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white/90">
                  Payment Details
                </h4>
                <p className="text-white/60 mb-6 text-sm sm:text-base">
                  Review your booking and proceed to payment
                </p>
              </div>

              {/* Final Summary */}
              <div className="bg-white/5 p-4 rounded-lg border border-white/20">
                <h5 className="font-medium text-white mb-3">Booking Summary</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">Ticket:</span>
                    <span className="text-white">
                      {selectedTicket?.name} x {ticketQuantity}
                    </span>
                  </div>
                  {ticketQuantity >= 4 && (
                    <div className="flex justify-between">
                      <span className="text-white/70">Bulk Offer:</span>
                      <span className="text-green-400">
                        {ticketQuantity >= 8
                          ? "Buy 8, Get 2 More Free"
                          : "Buy 4, Get 1 More Free"}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-white/70">Event:</span>
                    <span className="text-white">{EVENT_DETAILS.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Location:</span>
                    <span className="text-white">{EVENT_DETAILS.location}</span>
                  </div>
                  {isValidReferral && (
                    <div className="flex justify-between">
                      <span className="text-white/70">Referral Code:</span>
                      <span className="text-green-400">{referralCode}</span>
                    </div>
                  )}
                  {isYoutubeSubscribed && (
                    <div className="flex justify-between">
                      <span className="text-white/70">YouTube Subscriber:</span>
                      <span className="text-green-400">Yes</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-white/20">
                    <span className="font-medium text-white">
                      Total Amount:
                    </span>
                    <span className="font-bold text-pink-400 text-lg">
                      {formatPrice(finalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white/5 p-4 rounded-lg border border-white/20">
                <h5 className="font-medium text-white mb-3">Payment Method</h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border border-pink-500/30 rounded-lg bg-pink-500/10">
                    <CreditCard className="h-5 w-5 text-pink-500" />
                    <div className="flex-1">
                      <p className="font-medium text-white">
                        Cashfree Payment Gateway
                      </p>
                      <p className="text-xs text-white/60">
                        Secure payment via UPI, Cards, Net Banking & more
                      </p>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-pink-500 bg-pink-500"></div>
                  </div>

                  <div className="text-xs text-white/50 space-y-1">
                    <p>• Secure payment processing</p>
                    <p>• Multiple payment options available</p>
                    <p>• Instant confirmation</p>
                    <p>• 24/7 customer support</p>
                  </div>
                </div>
              </div>

              {/* Payment Processing State */}
              {isProcessingPayment && (
                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
                    <div>
                      <p className="font-medium text-blue-300">
                        Processing Payment...
                      </p>
                      <p className="text-xs text-blue-200/70">
                        Please wait while we redirect you to the payment gateway
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="z-[9999] booking-form-section concert p-0 pb-2 sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-prince border-none relative">
          {/* Header */}
          <div className="booking-form-header py-2 sm:py-4 px-3 sm:px-4">
            <div className="flex items-center gap-2">
              <div className="sm:size-10 size-8 rounded-full bg-gradient-to-r from-pink-600 to-red-600 flex items-center justify-center">
                <MusicIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="sm:text-xl font-bold text-pink-500">
                  Book Concert Tickets
                </h3>
                <p className="text-xs text-white/60">
                  Step{" "}
                  {currentStep === "tickets"
                    ? "1"
                    : currentStep === "offers"
                    ? "2"
                    : "3"}{" "}
                  of 3
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div
            className={cn(
              "booking-form-content h-auto py-2 px-3 sm:px-4"
            )}
          >
            {renderStepContent()}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-2 mt-6">
              {currentStep !== "tickets" && (
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="w-full sm:w-fit border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                >
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Previous
                </Button>
              )}

              <div className="flex gap-2 sm:w-full">
                {currentStep === "tickets" && (
                  <Button
                    className="w-full sm:w-fit sm:ml-auto bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white"
                    disabled={!canProceedToOffers}
                    onClick={() => {
                      if (currentUser) {
                        handleNextStep();
                      } else {
                        navigate("/login?redirect=/events?eventDialogue=true");
                      }
                    }}
                  >
                    Next
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                )}

                {currentStep === "offers" && (
                  <Button
                    className="w-full sm:w-fit bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white"
                    disabled={!canProceedToPayment}
                    onClick={handleNextStep}
                  >
                    Next
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                )}
                {currentStep === "payment" && (
                  <Button
                    className="w-full sm:w-fit bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white"
                    disabled={!isBookingValid || isProcessingPayment}
                    onClick={handleProceedToPayment}
                  >
                    {isProcessingPayment ? (
                      <>
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <TicketIcon className="mr-1.5 h-3.5 w-3.5" />
                        Proceed to Payment
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Price/Offer Bar */}
        </DialogContent>
      </Dialog>
    );
  }
);
