import { useState } from "react";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  Ticket, 
  CalendarDays, 
  Clock,
  MapPin,
  Sparkles,
  CheckCircle,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  Building,
  Wifi,
  Droplet,
  CupSoda,
  HeadphonesIcon,
  Shield,
  Users,
  DoorOpen,
  MusicIcon
} from "lucide-react";

const EventTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  
  // Format price as Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Handle ticket quantity changes
  const increaseQuantity = () => {
    if (ticketQuantity < 10) {
      setTicketQuantity(ticketQuantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity(ticketQuantity - 1);
    }
  };
  
  // Ticket classes and their details
  const ticketClasses = [
    {
      id: "elite",
      name: "Elite",
      price: 19999,
      color: "from-violet-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      features: [
        { icon: <DoorOpen className="h-4 w-4" />, text: "Direct Entrance" },
        { icon: <Building className="h-4 w-4" />, text: "Top Closed Roof" },
        { icon: <Users className="h-4 w-4" />, text: "Premium Seating" },
        { icon: <CupSoda className="h-4 w-4" />, text: "Complimentary Snacks, Tea, Water" },
        { icon: <Sparkles className="h-4 w-4" />, text: "Snacks will be served on the spot" },
        { icon: <Wifi className="h-4 w-4" />, text: "Fully Air-Conditioned" },
        { icon: <HeadphonesIcon className="h-4 w-4" />, text: "Studio Effect Sound & Lights" },
        { icon: <Shield className="h-4 w-4" />, text: "Full Fledged Security" },
        { icon: <Users className="h-4 w-4" />, text: "Dedicated Welcome Girls & Bouncers" },
      ]
    },
    {
      id: "vvip",
      name: "VVIP",
      price: 14999,
      color: "from-blue-500 to-indigo-600",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      features: [
        { icon: <DoorOpen className="h-4 w-4" />, text: "4 Private Entrances" },
        { icon: <CupSoda className="h-4 w-4" />, text: "Complimentary Water bottle" },
        { icon: <Users className="h-4 w-4" />, text: "Dedicated Welcome Girls & Bouncers" },
        { icon: <HeadphonesIcon className="h-4 w-4" />, text: "Dolby ATMOS Surround Sound System" },
        { icon: <Sparkles className="h-4 w-4" />, text: "Live Vision to stage & 2 LED Displays (20ft. x 20ft.)" },
        { icon: <Wifi className="h-4 w-4" />, text: "DJ Light Effects" },
        { icon: <Droplet className="h-4 w-4" />, text: "Cooling Fans" },
      ]
    },
    {
      id: "ultraluxury",
      name: "Ultra Luxury",
      price: 9999,
      color: "from-teal-500 to-emerald-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      features: [
        { icon: <DoorOpen className="h-4 w-4" />, text: "4 Private Entrances" },
        { icon: <CupSoda className="h-4 w-4" />, text: "Complimentary Water bottle" },
        { icon: <Users className="h-4 w-4" />, text: "Dedicated Welcome Girls & Bouncers" },
        { icon: <HeadphonesIcon className="h-4 w-4" />, text: "Effective Surround Sound System" },
        { icon: <Sparkles className="h-4 w-4" />, text: "Live Vision to stage and 2 LED Displays (20ft. x 20ft.)" },
      ]
    },
    {
      id: "luxury",
      name: "Luxury",
      price: 4999,
      color: "from-amber-500 to-orange-600",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      features: [
        { icon: <DoorOpen className="h-4 w-4" />, text: "4 Private Entrances" },
        { icon: <CupSoda className="h-4 w-4" />, text: "Complimentary Snacks & Water bottle" },
        { icon: <Users className="h-4 w-4" />, text: "Near Ramp, Premium Seating" },
        { icon: <Building className="h-4 w-4" />, text: "Top Closed Roof" },
        { icon: <Droplet className="h-4 w-4" />, text: "Air Coolers" },
        { icon: <Users className="h-4 w-4" />, text: "Dedicated Welcome Girls and Bouncers" },
        { icon: <HeadphonesIcon className="h-4 w-4" />, text: "Dolby Atmos Surround Sound System" },
        { icon: <Sparkles className="h-4 w-4" />, text: "DJ Light Effects" },
      ]
    },
    {
      id: "vip",
      name: "VIP",
      price: 2499,
      color: "from-pink-500 to-rose-600",
      textColor: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      features: [
        { icon: <DoorOpen className="h-4 w-4" />, text: "4 Private Entrances" },
        { icon: <CupSoda className="h-4 w-4" />, text: "Complimentary Water bottle" },
        { icon: <Users className="h-4 w-4" />, text: "Dedicated Welcome Girls and Bouncers" },
        { icon: <HeadphonesIcon className="h-4 w-4" />, text: "Effective Surround Sound System" },
        { icon: <Sparkles className="h-4 w-4" />, text: "Live Vision to stage and 2 LED Displays" },
      ]
    },
    {
      id: "eco",
      name: "Eco",
      price: 999,
      color: "from-lime-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      features: [
        { icon: <DoorOpen className="h-4 w-4" />, text: "Standard Entry" },
        { icon: <Users className="h-4 w-4" />, text: "General Seating" },
        { icon: <HeadphonesIcon className="h-4 w-4" />, text: "Good Quality Sound System" },
      ]
    },
    {
      id: "ecostanding",
      name: "Eco Standing",
      price: 499,
      color: "from-gray-500 to-gray-600",
      textColor: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      features: [
        { icon: <DoorOpen className="h-4 w-4" />, text: "Standard Entry" },
        { icon: <Users className="h-4 w-4" />, text: "Standing Area Only" },
        { icon: <HeadphonesIcon className="h-4 w-4" />, text: "Standard Sound Experience" },
      ]
    }
  ];
  
  const openBookingDialog = (ticket) => {
    setSelectedTicket(ticket);
    setTicketQuantity(1);
    setBookingDialogOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fdfc] via-white to-[#f0faf9]">
      <Helmet>
        <title>Ticket Classes - Rhythm Of Carnival</title>
        <meta name="description" content="Explore the different ticket classes available for the Rhythm Of Carnival event. Choose from Elite, VVIP, Ultra Luxury, Luxury, VIP, Eco, and Eco Standing options." />
      </Helmet>
      <MainNavbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4eb4a7]/95 to-[#60afb4]/95 z-0"></div>
          
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Pattern Background */}
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="url(#smallGrid)"/>
                  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            
            {/* Animated Wave */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
                <motion.path 
                  d="M0,50 C180,150 360,-50 540,50 C720,150 900,-50 1080,50 C1260,150 1440,-50 1440,50 L1440,100 L0,100 Z" 
                  fill="white"
                  fillOpacity="1"
                  animate={{
                    d: [
                      "M0,50 C180,150 360,-50 540,50 C720,150 900,-50 1080,50 C1260,150 1440,-50 1440,50 L1440,100 L0,100 Z",
                      "M0,25 C180,125 360,-75 540,25 C720,125 900,-75 1080,25 C1260,125 1440,-75 1440,25 L1440,100 L0,100 Z",
                      "M0,50 C180,150 360,-50 540,50 C720,150 900,-50 1080,50 C1260,150 1440,-50 1440,50 L1440,100 L0,100 Z"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 10,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <Link to="/events" className="inline-flex items-center gap-1 text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Event Overview</span>
              </Link>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="bg-white/20 hover:bg-white/30 text-white mb-4 py-1.5 px-4 text-sm">
                  <CalendarDays className="w-4 h-4 mr-2" /> December 21, 2025
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Concert Ticket Classes
                </h1>
                
                <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
                  Choose the perfect ticket class for your Rhythm Of Carnival experience.
                  Each class offers different amenities and views.
                </p>
                
                <div className="flex flex-wrap gap-3 justify-center">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4 text-white/80" />
                    <span className="text-white/80 text-sm">9:00 AM - 10:00 PM</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <MapPin className="w-4 h-4 text-white/80" />
                    <span className="text-white/80 text-sm">Kanyakumari</span>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <MusicIcon className="w-4 h-4 text-white/80" />
                    <span className="text-white/80 text-sm">Live Performance</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Ticket Classes Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-block bg-[#4eb4a7]/10 text-[#4eb4a7] text-sm font-semibold py-1 px-3 rounded-full mb-4">
                  7 TICKET OPTIONS
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                    Select Your Ideal Experience
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  From premium Elite to affordable Eco Standing, we have options for every preference and budget
                </p>
              </div>
              
              {/* Ticket Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
                {ticketClasses.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ translateY: -8 }}
                    className="h-full"
                  >
                    <Card className={`overflow-hidden h-full border ${ticket.borderColor}`}>
                      <div className={`h-3 bg-gradient-to-r ${ticket.color}`}></div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className={`text-2xl font-bold ${ticket.textColor}`}>
                              {ticket.name}
                            </h3>
                            <p className="text-3xl font-bold text-gray-800 mt-1">
                              {formatPrice(ticket.price)}
                            </p>
                          </div>
                          <Badge className={`${ticket.bgColor} ${ticket.textColor} border-0`}>
                            {ticket.id === "elite" ? "Best Value" : 
                             ticket.id === "ecostanding" ? "Affordable" : 
                             ticket.id === "vvip" ? "Popular" : ""}
                          </Badge>
                        </div>
                        
                        <div className={`${ticket.bgColor} rounded-lg p-4 mb-6`}>
                          <h4 className={`font-semibold ${ticket.textColor} mb-3`}>Features Included:</h4>
                          <ul className="space-y-2">
                            {ticket.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className={`mt-0.5 ${ticket.textColor}`}>{feature.icon}</span>
                                <span className="text-gray-700 text-sm">{feature.text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button 
                          className={`w-full bg-gradient-to-r ${ticket.color} text-white hover:opacity-90`}
                          onClick={() => openBookingDialog(ticket)}
                        >
                          <Ticket className="mr-2 h-4 w-4" />
                          Book Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {/* Important Notes */}
              <div className="bg-[#4eb4a7]/5 border border-[#4eb4a7]/10 rounded-xl p-6 max-w-3xl mx-auto">
                <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center">
                  <CheckCircle className="text-[#4eb4a7] mr-2 h-5 w-5" />
                  Important Notes About Tickets
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-[#4eb4a7] mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700">All ticket prices include entry to the concert event on December 21, 2025 only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-[#4eb4a7] mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700">Please arrive at least 30 minutes before the event starts to avoid long queues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-[#4eb4a7] mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700">Tickets are non-refundable but can be transferred to another person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-[#4eb4a7] mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span className="text-gray-700">For shopping arena and attractions (Dec 22-26), separate passes are required</span>
                  </li>
                </ul>
                
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <Link to="/events">
                    <Button variant="outline" className="border-[#4eb4a7] text-[#4eb4a7]">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Event Details
                    </Button>
                  </Link>
                  <Link to="/events/attractions">
                    <Button className="bg-[#4eb4a7]">
                      <Sparkles className="mr-2 h-4 w-4" />
                      View Event Attractions
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Ticket Booking Dialog */}
      {selectedTicket && (
        <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
            <div className={`bg-gradient-to-r ${selectedTicket.color} py-6 px-6 text-white`}>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                {selectedTicket.name} Ticket
              </DialogTitle>
              <DialogDescription className="text-white/80">
                Book your tickets for December 21, 2025
              </DialogDescription>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="ticketQuantity" className="text-gray-700 mb-2 block">Number of Tickets</Label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={decreaseQuantity}
                      disabled={ticketQuantity <= 1}
                      className="rounded-r-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id="ticketQuantity"
                      type="number"
                      min="1"
                      max="10"
                      value={ticketQuantity}
                      onChange={(e) => setTicketQuantity(parseInt(e.target.value) || 1)}
                      className="w-16 text-center rounded-none"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={increaseQuantity}
                      disabled={ticketQuantity >= 10}
                      className="rounded-l-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Ticket Price:</span>
                    <span className="font-medium">
                      {formatPrice(selectedTicket.price)} x {ticketQuantity}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 my-2 pt-2">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Amount:</span>
                      <span className={selectedTicket.textColor + " text-xl"}>
                        {formatPrice(selectedTicket.price * ticketQuantity)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={`${selectedTicket.bgColor} p-4 rounded-lg`}>
                  <h4 className={`font-semibold ${selectedTicket.textColor} mb-2 flex items-center`}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Included Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedTicket.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className={`mt-0.5 ${selectedTicket.textColor}`}>{feature.icon}</span>
                        <span className="text-gray-700 text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <DialogFooter className="bg-gray-50 p-6">
              <Button
                variant="outline"
                onClick={() => setBookingDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className={`bg-gradient-to-r ${selectedTicket.color} text-white hover:opacity-90`}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Proceed to Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      <MainFooter />
    </div>
  );
};

export default EventTickets; 