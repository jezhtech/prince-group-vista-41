import { useState, useEffect, useRef } from "react";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Users,
  Search,
  Filter,
  ChevronDown,
  Music as MusicIcon,
  Ticket,
  Star,
  Trophy,
  Sparkles,
  Flame,
  PartyPopper,
  Gift,
  Utensils,
  CheckCircle,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRightCircle,
  ShoppingBag,
  CalendarDays,
  Clock2,
  ArrowRight
} from "lucide-react";

const Events = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [ticketCategory, setTicketCategory] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [concertTicketDialogOpen, setConcertTicketDialogOpen] = useState(false);
  const [shoppingTicketDialogOpen, setShoppingTicketDialogOpen] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

  const events = [
    {
      id: 1,
      title: "Document Registration Workshop",
      date: "Jun 15, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Nagercoil Main Branch",
      attendees: 45,
      capacity: 50,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Learn about efficient document registration processes and tips to avoid common pitfalls.",
      category: "documentation"
    },
    {
      id: 2,
      title: "Financial Planning Seminar",
      date: "Jun 22, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Thuckalay Branch",
      attendees: 28,
      capacity: 40,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Expert guidance on managing personal finances, investments, and retirement planning.",
      category: "financial"
    },
    {
      id: 3,
      title: "Loan Application Workshop",
      date: "Jun 29, 2023",
      time: "11:00 AM - 1:00 PM",
      location: "Marthandam Branch",
      attendees: 32,
      capacity: 35,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Step-by-step guidance on preparing a successful loan application with our experts.",
      category: "loans"
    },
    {
      id: 4,
      title: "Real Estate Investment Forum",
      date: "Jul 05, 2023",
      time: "3:00 PM - 6:00 PM",
      location: "Nagercoil Main Branch",
      attendees: 22,
      capacity: 50,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Learn about lucrative real estate investment opportunities in Kanyakumari district.",
      category: "financial"
    },
    {
      id: 5,
      title: "Business Licensing Seminar",
      date: "Jul 12, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Colachel Branch",
      attendees: 15,
      capacity: 25,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Comprehensive guidance on business licensing requirements and application processes.",
      category: "documentation"
    },
    {
      id: 6,
      title: "Home Loan Orientation",
      date: "Jul 18, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Kuzhithurai Branch",
      attendees: 18,
      capacity: 30,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Learn about home loan options, eligibility criteria, and application procedures.",
      category: "loans"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || event.category === filter;
    return matchesSearch && matchesFilter;
  });

  // Ticket categories and pricing
  const ticketClasses = [
    { id: "elite", name: "Elite", price: 19999, description: "Elite experience with exclusive amenities and prime viewing" },
    { id: "vvip", name: "VVIP", price: 14999, description: "Very exclusive access with premium services and seating" },
    { id: "ultraluxury", name: "Ultra Luxury", price: 9999, description: "Ultra-premium comfort with excellent views" },
    { id: "luxury", name: "Luxury", price: 4999, description: "Superior comfort with great visibility" },
    { id: "vip", name: "VIP", price: 2499, description: "Priority access with enhanced amenities" },
    { id: "eco", name: "Eco", price: 999, description: "Standard admission with good experience" },
    { id: "ecostanding", name: "Eco Standing", price: 499, description: "Affordable standing area with full event access" }
  ];
  
  // Update total price when ticket category or quantity changes
  useEffect(() => {
    if (ticketCategory) {
      const selectedTicket = ticketClasses.find(ticket => ticket.id === ticketCategory);
      if (selectedTicket) {
        setTotalPrice(selectedTicket.price * ticketQuantity);
      }
    } else {
      setTotalPrice(0);
    }
  }, [ticketCategory, ticketQuantity]);
  
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
  
  const increaseAdultCount = () => {
    setAdultCount(prev => prev + 1);
  };
  
  const decreaseAdultCount = () => {
    if (adultCount > 1) {
      setAdultCount(prev => prev - 1);
    }
  };
  
  const increaseChildCount = () => {
    setChildCount(prev => prev + 1);
  };
  
  const decreaseChildCount = () => {
    if (childCount > 0) {
      setChildCount(prev => prev - 1);
    }
  };

  // Format price as Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Calculate total price for concert tickets
  const calculateConcertTotal = () => {
    if (ticketCategory) {
      const selectedTicket = ticketClasses.find(ticket => ticket.id === ticketCategory);
      if (selectedTicket) {
        return selectedTicket.price * ticketQuantity;
      }
    }
    return 0;
  };

  // Calculate total price for shopping tickets
  const calculateShoppingTotal = () => {
    return (adultCount * 299) + (childCount * 149);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fdfc] via-white to-[#f0faf9]">
      <Helmet>
        <title>Rhythm Of Carnival - Prince Group Events</title>
        <meta name="description" content="Experience the Rhythm Of Carnival by Prince Group. A 6-day spectacular event from December 21-26, 2025 featuring music, shopping, and attractions." />
      </Helmet>
      <MainNavbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden mt-16">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4eb4a7]/90 to-[#60afb4]/90"></div>
            
            {/* Animated Waveform Background */}
            <motion.div 
              className="absolute bottom-0 left-0 w-full h-64"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full">
                <motion.path 
                  fill="#ffffff" 
                  fillOpacity="0.2"
                  d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,266.7C672,267,768,245,864,224C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  animate={{
                    d: [
                      "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,266.7C672,267,768,245,864,224C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                      "M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,165.3C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                      "M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
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
            </motion.div>
            
            {/* Animated Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/30"
                style={{
                  width: Math.random() * 10 + 5,
                  height: Math.random() * 10 + 5,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -Math.random() * 100 - 50],
                  opacity: [0.2, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              {/* Festival Information */}
              <motion.div
                className="md:w-1/2 text-white"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="bg-white/20 hover:bg-white/30 text-white mb-6 backdrop-blur-sm py-1.5 px-4 text-sm">
                  <CalendarIcon className="w-4 h-4 mr-1" /> December 21-26, 2025
                </Badge>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  Prince Group
                  <br />
                  <span className="flex items-center">
                    <MusicIcon className="w-12 h-12 mr-3" />
                    Rhythm Of Carnival
                  </span>
                </h1>
                
                <p className="text-xl text-white/90 mb-8 max-w-xl">
                  Join us for a spectacular 6-day event featuring music, entertainment, shopping, 
                  and attractions at Kanyakumari's biggest festival of 2025!
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-[#4eb4a7] hover:bg-white/90 px-8 py-6 rounded-full"
                    onClick={() => setConcertTicketDialogOpen(true)}
                  >
                    <Ticket className="mr-2 h-5 w-5" />
                    Book Concert Tickets
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white/20 text-white hover:bg-white/30 px-8 py-6 rounded-full backdrop-blur-sm"
                    onClick={() => setShoppingTicketDialogOpen(true)}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shopping Arena Pass
                  </Button>
                </div>
              </motion.div>
              
              {/* Festival Image or Animation */}
              <motion.div
                className="md:w-1/2 mt-12 md:mt-0"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-full h-full bg-[#85cbc3]/30 rounded-2xl transform rotate-3"></div>
                  <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#4eb4a7]/20 rounded-2xl transform -rotate-2"></div>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4eb4a7]/10 to-[#60afb4]/10"></div>
                    <div className="relative">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-2">
                          <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                        </div>
                        <div className="text-white/70 text-sm">Prince Group Mega Event</div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-4 border border-white/20">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-[#4eb4a7] flex items-center justify-center text-white mr-3">
                            <CalendarDays className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">Event Date</div>
                            <div className="text-white/80 text-lg">December 21-26, 2025</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-4 border border-white/20">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-[#4eb4a7] flex items-center justify-center text-white mr-3">
                            <MapPin className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">Location</div>
                            <div className="text-white/80 text-lg">Kanyakumari</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-[#4eb4a7] flex items-center justify-center text-white mr-3">
                            <MusicIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">Main Performer</div>
                            <div className="text-white/80 text-lg">Singer & Actor, Vijay Antony</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Event Overview Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-0 left-0 w-full h-full">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <motion.path
                  d="M0,0 L100,0 L100,100 L0,100 Z"
                  fill="none"
                  stroke="#4eb4a7"
                  strokeWidth="0.1"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
                />
              </svg>
            </div>
            {/* Decorative circles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`circle-${i}`}
                className="absolute rounded-full bg-gradient-to-r from-[#4eb4a7]/10 to-[#60afb4]/10"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0.1, scale: 0.8 }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1], 
                  scale: [0.8, 1.2, 0.8],
                  x: [0, Math.random() * 50 - 25, 0],
                  y: [0, Math.random() * 50 - 25, 0],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block relative mb-6">
                <div className="bg-[#4eb4a7]/10 text-[#4eb4a7] text-sm font-semibold py-1 px-4 rounded-full backdrop-blur-sm">
                  EVENT DETAILS
                </div>
                <motion.div 
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#4eb4a7]/20 to-[#60afb4]/20 blur-sm -z-10"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                  6-Day Mega Event Experience
                </span>
                <motion.div
                  className="absolute inset-0 -z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`line-${i}`}
                      className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#4eb4a7]/30 to-transparent"
                      style={{ top: `${25 * (i + 1)}%`, left: 0, right: 0 }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.2, duration: 1.5 }}
                    />
                  ))}
                </motion.div>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Experience a spectacular event featuring music, entertainment, shopping, and attractions over 6 exciting days
              </p>
            </div>

            {/* Day by Day Schedule */}
            <div className="max-w-6xl mx-auto mb-20">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Day by Day Schedule</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Day 1: Rhythm of Carnival */}
                <motion.div 
                  className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#4eb4a7]/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] p-4 text-white">
                    <h4 className="text-xl font-bold flex items-center">
                      <MusicIcon className="w-5 h-5 mr-2" />
                      Day 1: December 21, 2025
                    </h4>
                    <p className="text-white/90">Rhythm of Carnival</p>
                  </div>
                  <div className="p-6">
                    <p className="mb-4 text-gray-700">
                      The main music festival featuring Vijay Antony and other performers. A spectacular night of music, 
                      entertainment, and celebration at Kanyakumari's biggest music festival.
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center">
                        <Clock className="text-[#4eb4a7] w-4 h-4 mr-2" />
                        <span className="text-gray-700 text-sm">Timing: 9:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex items-center">
                        <Ticket className="text-[#4eb4a7] w-4 h-4 mr-2" />
                        <span className="text-gray-700 text-sm">Special ticket required for this day</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="text-[#4eb4a7] w-4 h-4 mr-2" />
                        <span className="text-gray-700 text-sm">Highlights: Music Concert, Live Performances</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-[#4eb4a7] hover:bg-[#3da296]"
                      onClick={() => setConcertTicketDialogOpen(true)}
                    >
                      Book Concert Tickets
                    </Button>
                  </div>
                </motion.div>
                
                {/* Days 2-6: Shopping Arena & Attractions */}
                <motion.div 
                  className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#4eb4a7]/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-gradient-to-r from-[#60afb4] to-[#85cbc3] p-4 text-white">
                    <h4 className="text-xl font-bold flex items-center">
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Days 2-6: December 22-26, 2025
                    </h4>
                    <p className="text-white/90">Shopping Arena & Attractions</p>
                  </div>
                  <div className="p-6">
                    <p className="mb-4 text-gray-700">
                      Explore 300+ stalls offering a wide range of products, enjoy fun attractions, theme park rides, 
                      and entertainment for all ages in a massive 30,000 sq. ft. venue.
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center">
                        <Clock className="text-[#4eb4a7] w-4 h-4 mr-2" />
                        <span className="text-gray-700 text-sm">Timing: 9:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex items-center">
                        <ShoppingBag className="text-[#4eb4a7] w-4 h-4 mr-2" />
                        <span className="text-gray-700 text-sm">Adult: ₹299 | Children: ₹149</span>
                      </div>
                      <div className="flex items-center">
                        <Sparkles className="text-[#4eb4a7] w-4 h-4 mr-2" />
                        <span className="text-gray-700 text-sm">Highlights: Shopping, Food Court, Attractions</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-[#60afb4] hover:bg-[#4e9da3]"
                      onClick={() => setShoppingTicketDialogOpen(true)}
                    >
                      Book Shopping Arena Pass
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Event Layout */}
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Event Layout</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Layout Image */}
                <div className="lg:col-span-3">
                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-lg border border-[#4eb4a7]/10 h-full"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative">
                      <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                        {/* Layout Diagram would go here */}
                        <div className="w-full h-full bg-gradient-to-br from-[#f8fdfc] to-[#f0faf9] flex items-center justify-center p-4">
                          <img 
                            src="/path-to-layout-image.jpg" 
                            alt="Event Layout" 
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              // If image fails to load, show a placeholder
                              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0faf9'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' text-anchor='middle' alignment-baseline='middle' fill='%234eb4a7'%3EEvent Layout Diagram%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#4eb4a7] rounded-sm"></div>
                          <span className="text-sm text-gray-600">Stage Area</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#85cbc3] rounded-sm"></div>
                          <span className="text-sm text-gray-600">VIP Seating</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#60afb4] rounded-sm"></div>
                          <span className="text-sm text-gray-600">Business Class</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#4eb4a7]/40 rounded-sm"></div>
                          <span className="text-sm text-gray-600">Luxury Class</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#85cbc3]/40 rounded-sm"></div>
                          <span className="text-sm text-gray-600">Theme Park</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-[#60afb4]/40 rounded-sm"></div>
                          <span className="text-sm text-gray-600">Food Court</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Layout Description */}
                <div className="lg:col-span-2">
                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-lg border border-[#4eb4a7]/10 h-full"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Venue Highlights</h4>
                    <div className="space-y-4 mb-6">
                      <div className="flex gap-4 items-start">
                        <div className="h-8 w-8 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center text-[#4eb4a7] mt-0.5">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">300+ Stalls</h5>
                          <p className="text-gray-600 text-sm">Browse through over 300 stalls offering a wide range of products and services</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start">
                        <div className="h-8 w-8 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center text-[#4eb4a7] mt-0.5">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">30,000 sq. ft Area</h5>
                          <p className="text-gray-600 text-sm">A massive venue with ample space for all activities and entertainment</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start">
                        <div className="h-8 w-8 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center text-[#4eb4a7] mt-0.5">
                          <Clock2 className="h-4 w-4" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">Extended Hours</h5>
                          <p className="text-gray-600 text-sm">Open from 9:00 AM to 10:00 PM daily for maximum enjoyment</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start">
                        <div className="h-8 w-8 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center text-[#4eb4a7] mt-0.5">
                          <Flame className="h-4 w-4" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">Special Attractions</h5>
                          <p className="text-gray-600 text-sm">Helicopter rides, theme park, water games, petting zoo and more</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mt-8">
                      <Link to="/events/tickets" className="flex-1">
                        <Button variant="outline" className="w-full border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/5">
                          View Ticket Classes
                        </Button>
                      </Link>
                      <Link to="/events/attractions" className="flex-1">
                        <Button variant="outline" className="w-full border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/5">
                          Explore Attractions
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]"></div>
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full"
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, -10, 0]
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  Experience the Ultimate Festival of 2025
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Join us for a spectacular 6-day event featuring music, shopping, and attractions.
                  Book your tickets now!
                </p>
                
                <div className="flex flex-wrap justify-center gap-6">
                  <Button 
                    size="lg" 
                    className="bg-white text-[#4eb4a7] hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all px-8 py-6 rounded-full"
                    onClick={() => setConcertTicketDialogOpen(true)}
                  >
                    <MusicIcon className="mr-2 h-5 w-5" />
                    Concert Tickets (Dec 21)
                  </Button>
                  
                  <Button 
                    size="lg" 
                    className="bg-white/20 hover:bg-white/30 text-white shadow-xl hover:shadow-2xl transition-all px-8 py-6 rounded-full backdrop-blur-sm"
                    onClick={() => setShoppingTicketDialogOpen(true)}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shopping Arena Pass (Dec 22-26)
                  </Button>
                </div>
                
                <div className="mt-16 flex flex-wrap justify-center gap-8">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <CalendarIcon className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-white/70 text-sm">Date</div>
                      <div className="text-white font-medium">December 21-26, 2025</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-white/70 text-sm">Time</div>
                      <div className="text-white font-medium">9:00 AM - 10:00 PM</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-white/70 text-sm">Location</div>
                      <div className="text-white font-medium">Kanyakumari</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Concert Ticket Booking Dialog */}
      <Dialog open={concertTicketDialogOpen} onOpenChange={setConcertTicketDialogOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] py-6 px-6">
            <DialogTitle className="text-white text-2xl font-bold flex items-center gap-2">
              <MusicIcon className="h-6 w-6" />
              Rhythm of Carnival Tickets
            </DialogTitle>
            <DialogDescription className="text-white/80">
              Book your tickets for the main concert event on December 21, 2025
            </DialogDescription>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ticketCategory" className="text-gray-700">Select Ticket Class</Label>
                <Select
                  value={ticketCategory}
                  onValueChange={setTicketCategory}
                >
                  <SelectTrigger id="ticketCategory" className="w-full">
                    <SelectValue placeholder="Select a ticket class" />
                  </SelectTrigger>
                  <SelectContent>
                    {ticketClasses.map((ticket) => (
                      <SelectItem key={ticket.id} value={ticket.id}>
                        <span className="font-medium">{ticket.name}</span>
                        <span className="ml-2 text-gray-500">({formatPrice(ticket.price)})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {ticketCategory && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="ticketQuantity" className="text-gray-700">Number of Tickets</Label>
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
                        {formatPrice(ticketClasses.find(t => t.id === ticketCategory)?.price || 0)} x {ticketQuantity}
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-200 my-2 pt-2">
                      <div className="flex justify-between items-center font-bold">
                        <span>Total Amount:</span>
                        <span className="text-[#4eb4a7] text-xl">{formatPrice(calculateConcertTotal())}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#4eb4a7]/5 p-4 rounded-lg border border-[#4eb4a7]/10">
                    <h3 className="flex items-center text-[#4eb4a7] font-semibold mb-2">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Ticket Benefits
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {ticketClasses.find(t => t.id === ticketCategory)?.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      All tickets include entry to the concert event on December 21, 2025 only.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <DialogFooter className="bg-gray-50 p-6">
            <Button
              variant="outline"
              onClick={() => setConcertTicketDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] hover:from-[#3da296] hover:to-[#4e9da3]"
              disabled={!ticketCategory}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Shopping Arena Pass Dialog */}
      <Dialog open={shoppingTicketDialogOpen} onOpenChange={setShoppingTicketDialogOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-[#60afb4] to-[#85cbc3] py-6 px-6">
            <DialogTitle className="text-white text-2xl font-bold flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              Shopping Arena Pass
            </DialogTitle>
            <DialogDescription className="text-white/80">
              Book your passes for the shopping & attractions (December 22-26, 2025)
            </DialogDescription>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700 mb-2 block">Adult Passes (₹299 each)</Label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={decreaseAdultCount}
                      disabled={adultCount <= 1}
                      className="rounded-r-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={adultCount}
                      onChange={(e) => setAdultCount(parseInt(e.target.value) || 1)}
                      className="w-16 text-center rounded-none"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={increaseAdultCount}
                      className="rounded-l-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-700 mb-2 block">Child Passes (₹149 each)</Label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={decreaseChildCount}
                      disabled={childCount <= 0}
                      className="rounded-r-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="0"
                      value={childCount}
                      onChange={(e) => setChildCount(parseInt(e.target.value) || 0)}
                      className="w-16 text-center rounded-none"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={increaseChildCount}
                      className="rounded-l-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Adult Passes:</span>
                  <span className="font-medium">₹299 x {adultCount} = {formatPrice(adultCount * 299)}</span>
                </div>
                
                {childCount > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Child Passes:</span>
                    <span className="font-medium">₹149 x {childCount} = {formatPrice(childCount * 149)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 my-2 pt-2">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total Amount:</span>
                    <span className="text-[#60afb4] text-xl">{formatPrice(calculateShoppingTotal())}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#60afb4]/5 p-4 rounded-lg border border-[#60afb4]/10">
                <h3 className="flex items-center text-[#60afb4] font-semibold mb-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Pass Information
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 text-[#60afb4] mt-0.5 flex-shrink-0" />
                    <span>Valid for all 5 days (December 22-26, 2025)</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 text-[#60afb4] mt-0.5 flex-shrink-0" />
                    <span>Access to shopping area, food court, and all general attractions</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 text-[#60afb4] mt-0.5 flex-shrink-0" />
                    <span>Some premium attractions may require additional payment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <DialogFooter className="bg-gray-50 p-6">
            <Button
              variant="outline"
              onClick={() => setShoppingTicketDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-[#60afb4] to-[#85cbc3] hover:from-[#4e9da3] hover:to-[#74bab2]"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <MainFooter />
    </div>
  );
};

export default Events;
