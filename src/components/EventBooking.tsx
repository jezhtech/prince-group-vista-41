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

      return price * ticketQuantity;
    }, [selectedTicket, ticketQuantity, isValidReferral, isYoutubeSubscribed]);

    const totalSavings = useMemo(() => {
      return basePrice - finalPrice;
    }, [basePrice, finalPrice]);

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

      setIsProcessingPayment(true);
      try {
        // Create booking first
        const bookingData = {
          userId: currentUser.uid,
          referralId: isValidReferral ? referralCode : "",
          ticketId: selectedTicket!.id,
          ticketCount: ticketQuantity,
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
          customerName: currentUser.displayName || "Guest",
          customerEmail: currentUser.email || "",
          customerPhone: userData.mobile || "", // You might want to get this from user profile
          orderNote: `Booking for ${
            selectedTicket!.name
          } x ${ticketQuantity} tickets`,
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

    // Memoized ticket cards to prevent unnecessary re-renders
    const ticketCards = useMemo(() => {
      return ticketClasses.map((ticket) => (
        <div
          key={ticket.id}
          className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
            ticketCategory === ticket.type
              ? "border-pink-500 bg-pink-500/10"
              : "border-white/10 hover:border-pink-500/50 bg-white/5"
          }`}
          onClick={() => handleTicketSelect(ticket.type)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-medium text-white text-sm sm:text-base">
                {ticket.name}
              </h4>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                {ticket.type}
              </p>
              {/* Show benefits for selected ticket */}
              {ticketCategory === ticket.type && ticket.type && (
                <div className="mt-2 space-y-1">
                  {ticket.benefits.slice(0, 2).map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-1.5 text-xs text-white/70"
                    >
                      <CheckCircle className="h-3 w-3 text-pink-400 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="text-right ml-3">
              {/* Original Price */}
              <div className="font-bold text-white text-base sm:text-lg">
                {formatPrice(ticket.price)}
              </div>
              {/* Offer Price */}
              <div className="text-xs sm:text-sm text-green-400 font-medium">
                {formatPrice(ticket.offerPriceWithReferralAndYoutube)} with
                offers
              </div>
            </div>
          </div>
        </div>
      ));
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
                    "space-y-3 md:space-y-4 overflow-y-auto",
                    isIOS ? "mb-3" : "max-h-96"
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
                    <p className="text-white/50 text-sm mt-1">
                      Maximum 15 tickets per booking
                    </p>
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
                      <p className="pt-2 border-t border-white/20 flex justify-between">
                        <span className="font-medium text-white">Subtotal</span>
                        <span className="font-bold text-pink-400 text-lg">
                          {basePrice > 0 ? formatPrice(basePrice) : "---"}
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
              <div className="bg-white/5 p-4 rounded-lg border border-white/20">
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
              </div>

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
        <DialogContent className="booking-form-section concert z-[9999] p-0 pb-2 sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-prince border-none">
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
              "booking-form-content h-auto py-2 px-3 sm:px-4",
              isIOS && "mb-0"
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
        </DialogContent>
      </Dialog>
    );
  }
);
