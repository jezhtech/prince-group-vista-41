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
  ShoppingCart
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
    { id: "business", name: "Business Class (Tagline sponsors)", price: 25000, description: "Premium experience with celebrity dinner and backstage access" },
    { id: "elite", name: "Elite", price: 20000, description: "Elite experience with exclusive amenities and prime viewing" },
    { id: "vvip", name: "VVIP", price: 15000, description: "Very exclusive access with premium services and seating" },
    { id: "vip", name: "VIP", price: 10000, description: "Priority access with enhanced amenities" },
    { id: "ultraluxury", name: "Ultraluxury", price: 8000, description: "Ultra-premium comfort with excellent views" },
    { id: "luxury", name: "Luxury", price: 5000, description: "Superior comfort with great visibility" },
    { id: "general", name: "General", price: 2000, description: "Standard admission with good experience" },
    { id: "eco", name: "Eco Standing", price: 1000, description: "Affordable standing area with full event access" }
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
  
  // Format price as Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fdfc] via-white to-[#f0faf9]">
      <Helmet>
        <title>Rhythm Of Carnival - Prince Group Events</title>
        <meta name="description" content="Experience the Rhythm Of Carnival by Prince Group. Book your tickets now in various categories: Business Class, Elite, VVIP, VIP, Ultraluxury, Luxury, General, and Eco Standing. Join us for an unforgettable celebration in Kanyakumari." />
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
              <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full">
                <motion.path 
                  fill="#ffffff" 
                  fillOpacity="0.3"
                  d="M0,192L60,176C120,160,240,128,360,112C480,96,600,96,720,122.7C840,149,960,203,1080,208C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                  animate={{
                    d: [
                      "M0,192L60,176C120,160,240,128,360,112C480,96,600,96,720,122.7C840,149,960,203,1080,208C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
                      "M0,64L60,96C120,128,240,192,360,202.7C480,213,600,171,720,165.3C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
                      "M0,96L60,117.3C120,139,240,181,360,213.3C480,245,600,267,720,250.7C840,235,960,181,1080,170.7C1200,160,1320,192,1380,208L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 8,
                    ease: "easeInOut",
                    delay: 0.5
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
                  <CalendarIcon className="w-4 h-4 mr-1" /> December 21, 2025
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
                  Join us for an unforgettable night of music, entertainment, and celebration
                  at Kanyakumari's biggest music festival of 2025!
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-[#4eb4a7] hover:bg-white/90 px-8 py-6 rounded-full"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    <Ticket className="mr-2 h-5 w-5" />
                    Book Tickets Now
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
                        <div className="text-white/70 text-sm">Prince Group Rhythm Of Carnival</div>
              </div>

                      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-4 border border-white/20">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-[#4eb4a7] flex items-center justify-center text-white mr-3">
                            <CalendarIcon className="h-5 w-5" />
                  </div>
                          <div>
                            <div className="text-white text-sm font-medium">Event Date</div>
                            <div className="text-white/80 text-lg">December 21, 2025</div>
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
        
        {/* Event Details Section */}
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
                  The Ultimate Music Experience
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
                Experience an unforgettable night of music, entertainment, and celebration at the Prince Group Mega Music Festival
              </p>
            </div>

            {/* Event Content Area */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left sidebar - CTA Card */}
                <div className="lg:col-span-1">
                  <div className="lg:sticky lg:top-24 space-y-6">
                    {/* Book Ticket Card */}
                    <motion.div 
                      className="bg-gradient-to-br from-[#4eb4a7] to-[#60afb4] p-6 rounded-xl text-white shadow-lg"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h3 className="text-xl font-bold mb-3 flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-2" />
                        Mark Your Calendar
                      </h3>
                      <p className="mb-4 text-white/90">Secure your spot at the biggest musical event of 2025</p>
                      <Button 
                        className="w-full bg-white text-[#4eb4a7] hover:bg-white/90 font-medium"
                        onClick={() => setIsBookingOpen(true)}
                      >
                        Book Tickets Now
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Right content - Tabs */}
                <div className="lg:col-span-3">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full h-auto flex mb-6 bg-[#4eb4a7]/5 p-1 rounded-xl">
                      <TabsTrigger 
                        value="overview" 
                        className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-[#4eb4a7] data-[state=active]:shadow-md"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Event Overview
                      </TabsTrigger>
                      <TabsTrigger 
                        value="tickets" 
                        className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-[#4eb4a7] data-[state=active]:shadow-md"
                      >
                        <Ticket className="w-4 h-4 mr-2" />
                        Ticket Classes
                      </TabsTrigger>
                      <TabsTrigger 
                        value="attractions" 
                        className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-[#4eb4a7] data-[state=active]:shadow-md"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Attractions
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#4eb4a7]/10">
                      {/* Overview Tab Content */}
                      <TabsContent value="overview" className="m-0 p-0 focus-visible:outline-none focus-visible:ring-0">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>
                          <div className="h-64 md:h-80 bg-gradient-to-r from-[#4eb4a7]/30 to-[#60afb4]/30 relative overflow-hidden">
                            {/* This would be replaced with an actual event image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <MusicIcon className="w-24 h-24 text-white/20" />
                            </div>
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-[#4eb4a7]/10 to-[#60afb4]/10"
                              animate={{ 
                                background: [
                                  "linear-gradient(to right, rgba(78, 180, 167, 0.1), rgba(96, 175, 180, 0.1))",
                                  "linear-gradient(to right, rgba(96, 175, 180, 0.1), rgba(78, 180, 167, 0.1))",
                                  "linear-gradient(to right, rgba(78, 180, 167, 0.1), rgba(96, 175, 180, 0.1))",
                                ]
                              }}
                              transition={{ duration: 10, repeat: Infinity }}
                            />
                          </div>
                          <div className="absolute bottom-6 left-6 z-20">
                            <h3 className="text-3xl font-bold text-white mb-2">Rhythm Of Carnival 2025</h3>
                            <div className="flex items-center">
                              <Badge className="bg-white/20 text-white mr-2 backdrop-blur-sm">Music Festival</Badge>
                              <Badge className="bg-white/20 text-white backdrop-blur-sm">Kanyakumari</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <p className="text-gray-700 mb-6">
                            A spectacular night of music, entertainment, and celebration organized by Prince Group. 
                            Experience the rhythm and carnival atmosphere in Kanyakumari with world-class performers and amenities.
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                            <motion.div 
                              className="flex items-center gap-4 p-4 rounded-xl border border-[#4eb4a7]/10 bg-[#4eb4a7]/5"
                              whileHover={{ scale: 1.02, backgroundColor: "rgba(78, 180, 167, 0.1)" }}
                            >
                              <div className="h-12 w-12 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center text-[#4eb4a7]">
                                <CalendarIcon className="h-6 w-6" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">Date</h4>
                                <p className="text-[#4eb4a7] font-medium">December 21, 2025</p>
                              </div>
                            </motion.div>
                            
                            <motion.div 
                              className="flex items-center gap-4 p-4 rounded-xl border border-[#4eb4a7]/10 bg-[#4eb4a7]/5"
                              whileHover={{ scale: 1.02, backgroundColor: "rgba(78, 180, 167, 0.1)" }}
                            >
                              <div className="h-12 w-12 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center text-[#4eb4a7]">
                                <MapPin className="h-6 w-6" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">Location</h4>
                                <p className="text-[#4eb4a7] font-medium">Kanyakumari</p>
                              </div>
                            </motion.div>
                            
                            <motion.div 
                              className="flex items-center gap-4 p-4 rounded-xl border border-[#4eb4a7]/10 bg-[#4eb4a7]/5"
                              whileHover={{ scale: 1.02, backgroundColor: "rgba(78, 180, 167, 0.1)" }}
                            >
                              <div className="h-12 w-12 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center text-[#4eb4a7]">
                                <Users className="h-6 w-6" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">Organizer</h4>
                                <p className="text-[#4eb4a7] font-medium">Prince Group</p>
                              </div>
                            </motion.div>
                            
                            <motion.div 
                              className="flex items-center gap-4 p-4 rounded-xl border border-[#4eb4a7]/10 bg-[#4eb4a7]/5"
                              whileHover={{ scale: 1.02, backgroundColor: "rgba(78, 180, 167, 0.1)" }}
                            >
                              <div className="h-12 w-12 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center text-[#4eb4a7]">
                                <MusicIcon className="h-6 w-6" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-800">Main Performer</h4>
                                <p className="text-[#4eb4a7] font-medium">Vijay Antony</p>
                              </div>
                            </motion.div>
                          </div>
                          
                          <div className="flex justify-center">
                            <Button 
                              variant="outline"
                              className="border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/5 hover:text-[#4eb4a7]"
                              onClick={() => setIsBookingOpen(true)}
                            >
                              <Ticket className="w-4 h-4 mr-2" />
                              Book Your Tickets
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      {/* Tickets Tab Content */}
                      <TabsContent value="tickets" className="m-0 p-0 focus-visible:outline-none focus-visible:ring-0">
                        <div className="p-6 border-b border-gray-100">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">Ticket Classes</h3>
                            <Badge className="bg-[#4eb4a7]">8 Options</Badge>
                          </div>
                          <p className="text-gray-600 mb-4">
                            Choose from our range of ticket classes to match your desired experience level
                          </p>
                        </div>
                        
                        <div className="divide-y divide-gray-100 max-h-[60vh] overflow-auto custom-scrollbar">
                          {ticketClasses.map((ticket, index) => (
                            <motion.div 
                              key={ticket.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="p-6 hover:bg-[#4eb4a7]/5 transition-colors"
                            >
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    {ticket.id === "business" && <Star className="h-4 w-4 text-yellow-500" />}
                                    {ticket.id === "elite" && <Trophy className="h-4 w-4 text-purple-500" />}
                                    {ticket.id === "vvip" && <Sparkles className="h-4 w-4 text-blue-500" />}
                                    {ticket.name}
                                  </h4>
                                  <p className="text-gray-600 mt-1">{ticket.description}</p>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <div className="text-2xl font-bold text-[#4eb4a7]">
                                    {formatPrice(ticket.price)}
                                  </div>
                                  <Button 
                                    size="sm"
                                    className="bg-[#4eb4a7] hover:bg-[#3da296]"
                                    onClick={() => {
                                      setTicketCategory(ticket.id);
                                      setIsBookingOpen(true);
                                    }}
                                  >
                                    Select
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      {/* Attractions Tab Content */}
                      <TabsContent value="attractions" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                        <div className="p-6 bg-gradient-to-br from-[#4eb4a7]/5 to-[#60afb4]/5">
                          <h3 className="text-2xl font-bold text-gray-800 mb-6">Special Attractions</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Carousel className="w-full">
                              <CarouselContent>
                                <CarouselItem>
                                  <div className="bg-white rounded-xl overflow-hidden shadow-md border border-[#4eb4a7]/10 h-64">
                                    <div className="h-40 bg-gradient-to-br from-[#4eb4a7]/20 to-[#60afb4]/20 flex items-center justify-center">
                                      <Flame className="h-16 w-16 text-[#4eb4a7]/40" />
                                    </div>
                                    <div className="p-4">
                                      <h4 className="font-semibold text-lg text-gray-800">Helicopter Ride</h4>
                                      <p className="text-gray-600 text-sm">Experience breathtaking aerial views</p>
                                    </div>
                                  </div>
                                </CarouselItem>
                                <CarouselItem>
                                  <div className="bg-white rounded-xl overflow-hidden shadow-md border border-[#4eb4a7]/10 h-64">
                                    <div className="h-40 bg-gradient-to-br from-[#60afb4]/20 to-[#85cbc3]/20 flex items-center justify-center">
                                      <PartyPopper className="h-16 w-16 text-[#60afb4]/40" />
                                    </div>
                                    <div className="p-4">
                                      <h4 className="font-semibold text-lg text-gray-800">Theme Park Area</h4>
                                      <p className="text-gray-600 text-sm">Fun rides and attractions for all ages</p>
                                    </div>
                                  </div>
                                </CarouselItem>
                                <CarouselItem>
                                  <div className="bg-white rounded-xl overflow-hidden shadow-md border border-[#4eb4a7]/10 h-64">
                                    <div className="h-40 bg-gradient-to-br from-[#85cbc3]/20 to-[#4eb4a7]/20 flex items-center justify-center">
                                      <Gift className="h-16 w-16 text-[#85cbc3]/40" />
                                    </div>
                                    <div className="p-4">
                                      <h4 className="font-semibold text-lg text-gray-800">Water Games</h4>
                                      <p className="text-gray-600 text-sm">Refreshing water activities and games</p>
                                    </div>
                                  </div>
                                </CarouselItem>
                              </CarouselContent>
                              <div className="flex justify-center mt-4 gap-1">
                                <CarouselPrevious className="static transform-none mx-1 bg-[#4eb4a7]/10 hover:bg-[#4eb4a7]/20 text-[#4eb4a7] border-0" />
                                <CarouselNext className="static transform-none mx-1 bg-[#4eb4a7]/10 hover:bg-[#4eb4a7]/20 text-[#4eb4a7] border-0" />
                              </div>
                            </Carousel>
                            
                            <div className="space-y-4">
                              <motion.div 
                                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-[#4eb4a7]/10"
                                whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(78, 180, 167, 0.15)" }}
                              >
                                <div className="h-12 w-12 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center text-[#4eb4a7]">
                                  <Trophy className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-800">Petting Zoo</h4>
                                  <p className="text-gray-600 text-sm">Interact with friendly animals</p>
                                </div>
                              </motion.div>
                              
                              <motion.div 
                                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-[#4eb4a7]/10"
                                whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(78, 180, 167, 0.15)" }}
                              >
                                <div className="h-12 w-12 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center text-[#4eb4a7]">
                                  <Utensils className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-800">Food Court</h4>
                                  <p className="text-gray-600 text-sm">Exotic and local cuisines</p>
                                </div>
                              </motion.div>
                              
                              <motion.div 
                                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-[#4eb4a7]/10"
                                whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(78, 180, 167, 0.15)" }}
                              >
                                <div className="h-12 w-12 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center text-[#4eb4a7]">
                                  <Gift className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-800">Toys Store</h4>
                                  <p className="text-gray-600 text-sm">Special merchandise and souvenirs</p>
                                </div>
                              </motion.div>
                              
                              <div className="p-4 rounded-xl bg-[#4eb4a7]/10 mt-6">
                                <p className="text-[#4eb4a7] text-sm font-medium text-center">
                                  Many more attractions available at the venue!
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Ticket Booking Dialog */}
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
            <div className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] py-6 px-6">
              <DialogTitle className="text-white text-2xl font-bold flex items-center gap-2">
                <Ticket className="h-6 w-6" />
                Book Your Festival Tickets
              </DialogTitle>
              <DialogDescription className="text-white/80">
                Select your preferred ticket class and quantity
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
                          <span className="text-[#4eb4a7] text-xl">{formatPrice(totalPrice)}</span>
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
                        All tickets include entry to the festival and access to general areas.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <DialogFooter className="bg-gray-50 p-6">
              <Button
                variant="outline"
                onClick={() => setIsBookingOpen(false)}
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
        
        {/* Event Layout Section */}
        <section className="py-24 bg-gradient-to-br from-[#f8fdfc] to-[#f0faf9]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-block mb-6">
                    <div className="bg-[#4eb4a7]/10 text-[#4eb4a7] text-sm font-semibold py-1 px-3 rounded-full">
                      EVENT LAYOUT
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                      Festival Layout & Experience
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    View our carefully designed festival layout with dedicated zones for all attendees
                  </p>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="relative bg-white p-6 rounded-2xl shadow-xl overflow-hidden border border-[#4eb4a7]/10">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]"></div>
                    <div className="aspect-[16/10] bg-gradient-to-br from-[#4eb4a7]/10 to-[#60afb4]/5 rounded-lg overflow-hidden">
                      {/* This would be replaced with an actual event layout image */}
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-[#4eb4a7] font-medium">Festival Layout Diagram</div>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
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
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Experience the Perfect Setup</h3>
                    <p className="text-gray-600">
                      Our festival layout is meticulously designed to provide the best experience for all attendees.
                      With dedicated areas for different ticket classes, attractions, and amenities, you'll enjoy
                      a seamless and unforgettable experience.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-md border border-[#4eb4a7]/10">
                      <h4 className="font-semibold text-[#4eb4a7] mb-2">300+ Stalls</h4>
                      <p className="text-gray-600 text-sm">Browse through over 300 stalls offering a wide range of products and services.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-md border border-[#4eb4a7]/10">
                      <h4 className="font-semibold text-[#4eb4a7] mb-2">30,000 sq. ft Area</h4>
                      <p className="text-gray-600 text-sm">A massive venue with ample space for all activities and entertainment.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-md border border-[#4eb4a7]/10">
                      <h4 className="font-semibold text-[#4eb4a7] mb-2">Helicopter Ride Experience</h4>
                      <p className="text-gray-600 text-sm">Take to the skies with our exclusive helicopter ride experience for pre-booked ticket holders.</p>
                    </div>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] hover:from-[#3da296] hover:to-[#4e9da3] mt-4"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    <Ticket className="mr-2 h-5 w-5" />
                    Book Your Tickets Now
                  </Button>
                </motion.div>
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
                  Don't Miss the Biggest Music Event of 2025
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Book your tickets now to secure your spot at the Prince Group Mega Music Festival.
                  Limited tickets available!
                </p>
                
                <div className="flex flex-wrap justify-center gap-6">
                  <Button 
                    size="lg" 
                    className="bg-white text-[#4eb4a7] hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all px-8 py-6 rounded-full"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    <Ticket className="mr-2 h-5 w-5" />
                    Book Your Tickets
                  </Button>
                </div>
                
                <div className="mt-16 flex flex-wrap justify-center gap-8">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <CalendarIcon className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-white/70 text-sm">Date</div>
                      <div className="text-white font-medium">December 21, 2025</div>
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
      <MainFooter />
    </div>
  );
};

export default Events;
