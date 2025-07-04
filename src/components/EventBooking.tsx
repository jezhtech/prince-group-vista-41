import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Label } from "./ui/label";
import { CheckCircle } from "lucide-react";
import { Minus, Plus, Ticket, CalendarDays, MusicIcon } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { useState, useCallback, useMemo } from "react";
import { cn, isIOS } from "@/lib/utils";
import { Input } from "./ui/input";

const TICKET_CLASSES = [
  {
    id: "platinum",
    name: "Platinum",
    price: 7500,
    description: "Elite experience with exclusive amenities and prime viewing",
    benefits: [
      "Front row seating",
      "Meet & Greet",
      "Exclusive merchandise",
      "VIP lounge access",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 6000,
    description: "Elite experience with exclusive amenities and prime viewing",
    benefits: [
      "Front row seating",
      "Meet & Greet",
      "Exclusive merchandise",
      "VIP lounge access",
    ],
  },
  {
    id: "vvip",
    name: "VVIP",
    price: 5000,
    description: "Very exclusive access with premium services and seating",
    benefits: [
      "Premium seating",
      "Complimentary refreshments",
      "Priority entry",
      "Photo opportunity",
    ],
  },
  {
    id: "ultraluxury",
    name: "Ultra Luxury",
    price: 4000,
    description: "Ultra-premium comfort with excellent views",
    benefits: [
      "Excellent view",
      "Comfortable seating",
      "Refreshments",
      "Priority entry",
    ],
  },
  {
    id: "luxury",
    name: "Luxury",
    price: 3500,
    description: "Superior comfort with great visibility",
    benefits: ["Great visibility", "Comfortable seating", "Refreshments"],
  },
  {
    id: "vip",
    name: "VIP",
    price: 3000,
    description: "Priority access with enhanced amenities",
    benefits: ["Priority access", "Good view", "Refreshments"],
  },
  {
    id: "eco",
    name: "Eco",
    price: 2000,
    description: "Standard admission with good experience",
    benefits: [
      "Standard admission",
      "Good experience",
      "Refreshments available",
    ],
  },
  {
    id: "ecostanding",
    name: "Eco Standing",
    price: 1500,
    description: "Affordable standing area with full event access",
    benefits: ["Standing area", "Full event access", "Refreshments available"],
  },
];

const EVENT_DETAILS = {
  date: "3 PM, 20 September 2025",
  time: "3:00 PM - 10:00 PM",
  location: "Concordia High School Ground, Nagercoil",
  performers: ["Sri Nisha", "Aditya Rkay", "Aparnaa Pratheep"],
  features: [
    "Main Performer - Singers: Sri Nisha | Aditya Rkay",
    "Violin - Chendamellan Fusion by Aparnaa Pratheep",
    "World-class Sound and Lighting System",
  ],
};

const EVENT_OFFERS = [
  "Subscribe our youtube channel to get Rs 2000 discount on all tickets",
];

const GENERAL_BENEFITS = [
  "Entry to all concert areas based on ticket class",
  "Access to food and beverage stalls",
  "Official event merchandise discount (10%)",
  "Exclusive entry to after-party (Elite & VVIP only)",
];

interface EventBookingProps {
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
}

export const EventBooking = ({
  isBookingOpen,
  setIsBookingOpen,
}: EventBookingProps) => {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [ticketCategory, setTicketCategory] = useState("");

  // Memoized calculations
  const selectedTicket = useMemo(
    () => TICKET_CLASSES.find((ticket) => ticket.id === ticketCategory),
    [ticketCategory]
  );

  const totalPrice = useMemo(
    () => (selectedTicket ? selectedTicket.price * ticketQuantity : 0),
    [selectedTicket, ticketQuantity]
  );

  const isBookingValid = useMemo(
    () => ticketCategory && ticketQuantity > 0,
    [ticketCategory, ticketQuantity]
  );

  // Optimized handlers
  const handleTicketSelect = useCallback((ticketId: string) => {
    setTicketCategory(ticketId);
  }, []);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 8) {
      setTicketQuantity(newQuantity);
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsBookingOpen(false);
    // Reset form when closing
    setTicketCategory("");
    setTicketQuantity(1);
  }, [setIsBookingOpen]);

  const handleProceedToPayment = useCallback(() => {
    if (isBookingValid) {
      // Handle booking logic here
      console.log("Booking:", { ticketCategory, ticketQuantity, totalPrice });
      handleClose();
      // Show success message or redirect to payment
    }
  }, [isBookingValid, ticketCategory, ticketQuantity, totalPrice, handleClose]);

  const formatPrice = useCallback((price: number) => {
    const discount = price * 0.05;
    const gst = price * 0.18;
    const total = price - discount + gst;

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  return (
    <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
      <DialogContent className="booking-form-section concert z-[9999] p-0 sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-prince border-none">
        {/* Header */}
        <div className="booking-form-header">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-600 to-red-600 flex items-center justify-center">
              <MusicIcon className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-pink-500">
              Book Concert Tickets
            </h3>
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

        <div className={cn("booking-form-content open", isIOS && "mb-0")}>
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
                {TICKET_CLASSES.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${
                      ticketCategory === ticket.id
                        ? "border-pink-500 bg-pink-500/10"
                        : "border-white/10 hover:border-pink-500/50 bg-white/5"
                    }`}
                    onClick={() => handleTicketSelect(ticket.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-white text-sm sm:text-base">
                          {ticket.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-white/60 mt-1">
                          {ticket.description}
                        </p>
                        {/* Show benefits for selected ticket */}
                        {ticketCategory === ticket.id && ticket.benefits && (
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
                      <div className="font-bold text-white text-base sm:text-lg ml-3">
                        {formatPrice(ticket.price)}
                      </div>
                    </div>
                  </motion.div>
                ))}
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
                        ticketQuantity < 4 &&
                        handleQuantityChange(ticketQuantity + 1)
                      }
                      disabled={ticketQuantity >= 4}
                      className="rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-white/50 text-sm mt-1">
                    Maximum 4 tickets per booking
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
                        <span className="text-white/70 text-sm">{feature}</span>
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
                        <span className="text-white/70">Price per ticket</span>
                        <span className="font-medium text-white">
                          {formatPrice(selectedTicket.price)}
                        </span>
                      </p>
                    )}
                    <p className="pt-2 border-t border-white/20 flex justify-between">
                      <span className="font-medium text-white">Subtotal</span>
                      <span className="font-bold text-pink-400 text-lg">
                        {totalPrice > 0 ? formatPrice(totalPrice) : "---"}
                      </span>
                    </p>
                    <p className="pt-2 border-t border-white/20 flex justify-between">
                      <span className="font-medium text-white">Discount</span>
                      <span className="font-bold text-pink-400 text-lg">
                        {totalPrice > 0 ? totalPrice * 0.05 : "---"}
                      </span>
                    </p>
                    <p className="pt-2 border-t border-white/20 flex justify-between">
                      <span className="font-medium text-white">GST (18%)</span>
                      <span className="font-bold text-pink-400 text-lg">
                        {totalPrice > 0 ? totalPrice * 0.18 : "---"}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-white/90">Referral Code</Label>
                  <Input
                    className="bg-white/5 border-white/20 text-white"
                    type="text"
                    placeholder="Enter referral code"
                  />
                </div>
                {/* Event Offers */}
                <div>
                  <Label className="text-white/90">Event Offers</Label>
                  <div
                    className={cn(
                      "p-4 border border-white/20 rounded-lg bg-white/5 space-y-2",
                      !isIOS && "mt-2"
                    )}
                  >
                    {EVENT_OFFERS.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                    <Button size="sm" className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white">
                      Subscribe Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white"
              disabled={!isBookingValid}
              onClick={handleProceedToPayment}
            >
              <Ticket className="mr-1.5 h-3.5 w-3.5" />
              Proceed to Payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
