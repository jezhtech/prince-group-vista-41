import { useState, useEffect, useRef, Fragment } from "react";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import "./events.css"; // Import custom styles for the events page
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
  ArrowRight,
  Plane,
  Play,
  Zap,
  Heart,
  Phone,
  PlusCircle,
  Camera,
  Share2,
  TicketIcon,
  Wifi,
  Award,
  Crown,
  CircleDollarSign,
  BellRing,
  Info,
  Mail,
  Menu,
  X
} from "lucide-react";

// Function to detect iPad 9th generation
const isIPad9thGen = () => {
  const userAgent = navigator.userAgent;
  // iPad 9th gen detection - screen size and iOS version check
  if ((/iPad/.test(userAgent) || /Macintosh/.test(userAgent) && 'ontouchend' in document)) {
    // The iPad 9th generation has a resolution of 2160 x 1620 at 264 PPI
    // We can check its dimensions to identify it
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const pixelRatio = window.devicePixelRatio || 1;
    
    // iPad 9th gen dimensions (accounting for orientation)
    const matches = (
      (screenWidth === 810 && screenHeight === 1080) || 
      (screenWidth === 1080 && screenHeight === 810)
    ) && pixelRatio === 2;
    
    return matches;
  }
  return false;
};

// Custom CSS to fix iPad 9th generation issues
const ipadFixStyles = `
  /* Dialog fixes */
  .ipad-9th-gen .dialog-content {
    max-height: 85vh !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding: 16px !important;
    width: 90vw !important;
    margin: 0 auto !important;
    display: flex !important;
    flex-direction: column !important;
  }

  /* Ensure scrollbars are visible on iOS */
  .ipad-9th-gen .dialog-content::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  .ipad-9th-gen .dialog-content::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 1px rgba(255, 255, 255, .3);
  }

  .ipad-9th-gen .dialog-content > div {
    padding: 16px !important;
  }

  /* Ensure the dialog header is visible */
  .ipad-9th-gen .dialog-content [data-radix-dialog-header] {
    margin-bottom: 12px !important;
  }
  
  /* Fix the grid layout within dialog content */
  .ipad-9th-gen .dialog-content .grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
  }

  /* Fix dialog footer styling */
  .ipad-9th-gen .dialog-content [data-radix-dialog-footer] {
    margin-top: 16px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
  }
  
  /* Fix buttons in dialogs */
  .ipad-9th-gen .dialog-content button {
    height: auto !important;
    padding: 8px 16px !important;
    width: 100% !important;
    margin-bottom: 8px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  /* Fix inputs, selects and form controls */
  .ipad-9th-gen .dialog-content input,
  .ipad-9th-gen .dialog-content select,
  .ipad-9th-gen .dialog-content [data-radix-select-trigger] {
    height: 40px !important;
    margin-bottom: 8px !important;
  }

  /* Explicitly enable scrolling for dialog content */
  .ipad-9th-gen .ipad-dialog-content {
    max-height: 60vh !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding-right: 8px !important;
  }

  /* Fix for attraction navigation buttons in hero section */
  .ipad-9th-gen .attraction-nav-button {
    position: absolute !important;
    transform: translateY(-50%) !important;
    top: 50% !important;
    width: 40px !important;
    height: 40px !important;
    z-index: 50 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: rgba(0, 0, 0, 0.6) !important;
  }

  .ipad-9th-gen .attraction-nav-button.left {
    left: 10px !important;
  }

  .ipad-9th-gen .attraction-nav-button.right {
    right: 10px !important;
  }

  /* Fix button content alignment */
  .ipad-9th-gen .attraction-nav-button svg {
    width: 20px !important;
    height: 20px !important;
  }

  /* Fix quantity selector in dialogs */
  .ipad-9th-gen .dialog-content .flex > button {
    width: auto !important;
    height: 40px !important;
    margin-bottom: 0 !important;
  }

  /* Fix ticket selection items */
  .ipad-9th-gen .dialog-content [class*="cursor-pointer"] {
    margin-bottom: 12px !important;
    padding: 12px !important;
  }

  /* Safari specific fixes for dialog content */
  .ipad-9th-gen .safari-flex-fix {
    display: flex !important;
    flex-direction: column !important;
  }

  /* Fix scrolling behavior in dialog content */
  .ipad-9th-gen .dialog-content .max-h-[250px],
  .ipad-9th-gen .dialog-content .max-h-[400px],
  .ipad-9th-gen .dialog-content .overflow-y-auto {
    max-height: none !important;
    overflow-y: visible !important;
    padding-right: 0 !important;
  }
  
  /* Fix for landscape mode */
  @media (orientation: landscape) {
    .ipad-9th-gen .dialog-content {
      max-height: 80vh !important;
      padding: 12px !important;
    }
    
    .ipad-9th-gen .dialog-content .grid {
      flex-direction: row !important;
      flex-wrap: wrap !important;
    }
    
    .ipad-9th-gen .dialog-content .grid > div {
      width: 48% !important;
      flex: 0 0 48% !important;
    }

    /* Adjust scrollable area for landscape mode */
    .ipad-9th-gen .ipad-dialog-content {
      max-height: 50vh !important;
    }
  }
  
  /* Fix hero section specific for iPad 9th gen */
  .ipad-9th-gen .min-h-screen {
    min-height: 90vh !important;
  }
`;

// Add this new iPad-specific dialog component
const iPadDialog = ({ 
  isOpen, 
  onClose, 
  title, 
  icon, 
  accentColor, 
  children, 
  primaryAction,
  primaryLabel,
  primaryIcon,
  isActionDisabled = false
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  children: React.ReactNode;
  primaryAction: () => void;
  primaryLabel: string;
  primaryIcon?: React.ReactNode;
  isActionDisabled?: boolean;
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="ipad-dialog-overlay">
      <div className="ipad-dialog-container">
        <div className="ipad-dialog-handle"></div>
        
        <div className="ipad-dialog-header">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${accentColor}`}>
              {icon}
            </div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
          </div>
          
          <button 
            className="h-8 w-8 rounded-full bg-black/30 flex items-center justify-center" 
            onClick={onClose}
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
        
        <div className="ipad-dialog-content">
          {children}
        </div>
        
        <div className="ipad-dialog-footer">
          <button
            className="ipad-dialog-secondary-button"
            onClick={onClose}
          >
            Cancel
          </button>
          
          <button
            className={`ipad-dialog-primary-button ${accentColor}`}
            onClick={primaryAction}
            disabled={isActionDisabled}
          >
            {primaryIcon}
            <span>{primaryLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Function to conditionally render either the standard Dialog or iPad-specific dialog
const useAdaptiveDialog = () => {
  const [isIpad9thGen, setIsIpad9thGen] = useState(false);
  
  useEffect(() => {
    setIsIpad9thGen(isIPad9thGen());
  }, []);
  
  return {
    isIpad9thGen,
    AdaptiveDialog: isIpad9thGen ? iPadDialog : Dialog,
    AdaptiveDialogContent: isIpad9thGen ? Fragment : DialogContent,
    AdaptiveDialogHeader: isIpad9thGen ? Fragment : DialogHeader,
    AdaptiveDialogFooter: isIpad9thGen ? Fragment : DialogFooter
  };
};

const Events = () => {
  // Ref for scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform values for parallax effects
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  
  // State variables
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
  const [helicopterTicketDialogOpen, setHelicopterTicketDialogOpen] = useState(false);
  const [foodComboDialogOpen, setFoodComboDialogOpen] = useState(false);
  const [cakeBookingDialogOpen, setCakeBookingDialogOpen] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [activeAttraction, setActiveAttraction] = useState<string | null>(null);
  const [currentAttractionIndex, setCurrentAttractionIndex] = useState(0);
  const [isIpad9thGeneration, setIsIpad9thGeneration] = useState(false);
  
  // Check if device is iPad 9th generation
  useEffect(() => {
    setIsIpad9thGeneration(isIPad9thGen());
  }, []);
  
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
  
  // Helicopter ride package options
  const helicopterPackages = [
    { id: "premium", name: "Premium Aerial Tour", price: 4999, duration: "15 minutes", description: "Complete aerial tour of Kanyakumari with sea views" },
    { id: "standard", name: "Standard Ride", price: 2999, duration: "10 minutes", description: "Scenic helicopter ride over the festival venue" },
    { id: "basic", name: "Quick Experience", price: 1999, duration: "5 minutes", description: "Brief helicopter experience with photo opportunity" }
  ];

  // Food combo options
  const foodCombos = [
    { id: "deluxe", name: "Deluxe Food Combo", price: 999, description: "Premium meal with dessert and beverages for 2 people" },
    { id: "standard", name: "Standard Food Combo", price: 699, description: "Complete meal with dessert for 2 people" },
    { id: "basic", name: "Basic Food Combo", price: 499, description: "Main course and beverage for 2 people" }
  ];
  
  // Cake booking options
  const cakeOptions = [
    { id: "custom", name: "Custom Celebration Cake", price: 1499, description: "Personalized cake with your design (1kg)" },
    { id: "chocolate", name: "Chocolate Truffle", price: 999, description: "Rich chocolate cake with truffle frosting (1kg)" },
    { id: "blackforest", name: "Black Forest", price: 899, description: "Classic black forest cake with cherries (1kg)" },
    { id: "butterscotch", name: "Butterscotch", price: 799, description: "Sweet butterscotch cake with caramel (1kg)" }
  ];
  
  const [selectedHelicopterPackage, setSelectedHelicopterPackage] = useState("");
  const [helicopterTickets, setHelicopterTickets] = useState(1);
  const [selectedFoodCombo, setSelectedFoodCombo] = useState("");
  const [foodComboQuantity, setFoodComboQuantity] = useState(1);
  const [selectedCake, setSelectedCake] = useState("");
  const [cakeQuantity, setCakeQuantity] = useState(1);
  const [cakeMessage, setCakeMessage] = useState("");
  
  // Festival attractions with detailed info
  const attractions = [
    {
      id: "concert",
      name: "Live Concert",
      description: "Experience the electrifying performance by Vijay Antony and other top artists",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2574&auto=format&fit=crop",
      heroImage: "/images/concert-hero.jpg",
      icon: <MusicIcon className="h-10 w-10" />,
      color: "from-pink-600 to-red-600",
      textColor: "text-pink-600",
      buttonColor: "bg-gradient-to-r from-pink-600 to-red-600",
      category: "premium",
      date: "December 21, 2025",
      featured: true,
      details: [
        "World-class sound and light system",
        "Multiple seating options available",
        "Exclusive performances by top artists",
        "Refreshments available"
      ],
      ticketTypes: ticketClasses,
      bookingAction: () => setConcertTicketDialogOpen(true)
    },
    {
      id: "helicopter",
      name: "Helicopter Ride",
      description: "Experience breathtaking aerial views of Kanyakumari from above",
      image: "/heli/ER2A0460-scaled.jpg",
      heroImage: "/heli/ER2A0460-scaled.jpg",
      icon: <Plane className="h-10 w-10" />,
      color: "from-indigo-600 to-purple-600",
      textColor: "text-indigo-600",
      buttonColor: "bg-gradient-to-r from-indigo-600 to-purple-600",
      category: "premium",
      date: "December 21-26, 2025",
      featured: true,
      details: [
        "Panoramic views of the Arabian Sea, Bay of Bengal and Indian Ocean",
        "Professional pilots with safety briefing",
        "Photo opportunities from above",
        "Limited spots available - book early!"
      ],
      ticketTypes: helicopterPackages,
      bookingAction: () => setHelicopterTicketDialogOpen(true)
    },
    {
      id: "shopping",
      name: "Shopping Festival",
      description: "Explore over 300 stalls with a wide range of products and exclusive offers",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2215&auto=format&fit=crop",
      heroImage: "/images/shopping-hero.jpg",
      icon: <ShoppingBag className="h-10 w-10" />,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-600",
      buttonColor: "bg-gradient-to-r from-amber-500 to-orange-600",
      category: "general",
      date: "December 22-26, 2025",
      featured: true,
      details: [
        "300+ curated stalls and shops",
        "Exclusive festival discounts",
        "Products from across India",
        "Live demonstrations and workshops"
      ],
      bookingAction: () => setShoppingTicketDialogOpen(true)
    },
    {
      id: "food",
      name: "Food Combo",
      description: "Pre-book your food packages for the festival day",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop",
      heroImage: "/images/food-hero.jpg",
      icon: <Utensils className="h-10 w-10" />,
      color: "from-emerald-500 to-green-600",
      textColor: "text-emerald-600",
      buttonColor: "bg-gradient-to-r from-emerald-500 to-green-600",
      category: "dining",
      date: "December 21, 2025",
      featured: true,
      details: [
        "Pre-book to avoid queues",
        "Multiple cuisine options",
        "Special festival menus",
        "Vegetarian and non-vegetarian options"
      ],
      ticketTypes: foodCombos,
      bookingAction: () => setFoodComboDialogOpen(true)
    },
    {
      id: "cake",
      name: "Cake Pre-Booking",
      description: "Pre-order celebration cakes for your special moments at the festival",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2089&auto=format&fit=crop",
      heroImage: "/images/cake-hero.jpg",
      icon: <Gift className="h-10 w-10" />,
      color: "from-rose-500 to-pink-600",
      textColor: "text-rose-600",
      buttonColor: "bg-gradient-to-r from-rose-500 to-pink-600",
      category: "dining",
      date: "December 21-26, 2025",
      featured: false,
      details: [
        "Custom designs available",
        "Multiple flavors to choose from",
        "Pre-order for delivery at the venue",
        "Perfect for celebrations"
      ],
      ticketTypes: cakeOptions,
      bookingAction: () => setCakeBookingDialogOpen(true)
    },
    {
      id: "themepark",
      name: "Theme Park",
      description: "Enjoy thrilling rides and fun activities for all ages",
      image: "/images/theme-park.jpg",
      heroImage: "/images/theme-park.jpg",
      icon: <Sparkles className="h-10 w-10" />,
      color: "from-blue-500 to-cyan-600",
      textColor: "text-blue-600",
      buttonColor: "bg-gradient-to-r from-blue-500 to-cyan-600",
      category: "general",
      date: "December 22-26, 2025",
      featured: false,
      details: [
        "Various rides for all age groups",
        "Games and entertainment",
        "Win exciting prizes",
        "Included in shopping arena pass"
      ],
      bookingAction: () => setShoppingTicketDialogOpen(true)
    }
  ];

  // Auto-scrolling with ability for user to manually navigate
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAttractionIndex((prevIndex) => 
        prevIndex === attractions.filter(a => a.featured).length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(timer);
  }, [attractions]);

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
  
  // Update helicopter price when package or quantity changes
  useEffect(() => {
    if (selectedHelicopterPackage) {
      const selectedPackage = helicopterPackages.find(pkg => pkg.id === selectedHelicopterPackage);
      if (selectedPackage) {
        setTotalPrice(selectedPackage.price * helicopterTickets);
      }
    }
  }, [selectedHelicopterPackage, helicopterTickets]);
  
  // Update food combo price
  useEffect(() => {
    if (selectedFoodCombo) {
      const combo = foodCombos.find(c => c.id === selectedFoodCombo);
      if (combo) {
        setTotalPrice(combo.price * foodComboQuantity);
      }
    }
  }, [selectedFoodCombo, foodComboQuantity]);
  
  // Update cake price
  useEffect(() => {
    if (selectedCake) {
      const cake = cakeOptions.find(c => c.id === selectedCake);
      if (cake) {
        setTotalPrice(cake.price * cakeQuantity);
      }
    }
  }, [selectedCake, cakeQuantity]);
  
  // Handle quantity changes
  const increaseQuantity = (setter: React.Dispatch<React.SetStateAction<number>>, value: number, max = 10) => {
    if (value < max) {
      setter(value + 1);
    }
  };
  
  const decreaseQuantity = (setter: React.Dispatch<React.SetStateAction<number>>, value: number, min = 1) => {
    if (value > min) {
      setter(value - 1);
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

  // Add iPad 9th generation detection and inject CSS fixes
  useEffect(() => {
    // Inject custom styles for iPad 9th gen
    const styleEl = document.createElement('style');
    styleEl.id = 'ipad-9th-gen-fixes';
    styleEl.innerHTML = ipadFixStyles;
    document.head.appendChild(styleEl);
    
    if (isIPad9thGen()) {
      document.documentElement.classList.add('ipad-9th-gen');
      
      // Add a specific function to handle dialog positioning on iOS
      const fixDialogPositioning = () => {
        const dialogs = document.querySelectorAll('[role="dialog"]');
        dialogs.forEach(dialog => {
          // Ensure dialog scrolls from top
          if (dialog instanceof HTMLElement) {
            dialog.scrollTop = 0;
            
            // Ensure dialog has correct background
            const content = dialog.querySelector('.dialog-content');
            if (content instanceof HTMLElement) {
              content.style.backgroundColor = '#0c1e3c';
            }
          }
        });
      };
      
      // Apply dialog fixes when dialogs open
      const dialogObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length > 0) {
            fixDialogPositioning();
          }
        });
      });
      
      // Observe document body for dialog additions
      dialogObserver.observe(document.body, { childList: true, subtree: true });
      
      return () => {
        document.documentElement.classList.remove('ipad-9th-gen');
        const existingStyle = document.getElementById('ipad-9th-gen-fixes');
        if (existingStyle) {
          existingStyle.remove();
        }
        dialogObserver.disconnect();
      };
    }
    
    return () => {
      document.documentElement.classList.remove('ipad-9th-gen');
      const existingStyle = document.getElementById('ipad-9th-gen-fixes');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Concert Ticket Booking Dialog
  <Dialog open={concertTicketDialogOpen} onOpenChange={setConcertTicketDialogOpen}>
    <DialogContent className={`max-w-4xl bg-gradient-to-b from-[#0c1e3c] to-[#0e253f] border border-pink-600/20 text-white ${isIpad9thGeneration ? "ipad-9th-custom-dialog" : "dialog-content ipad-dialog-fix"}`}>
      <DialogHeader className={isIpad9thGeneration ? "ipad-9th-dialog-header" : "ipad-dialog-header"}>
        <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1.5 sm:gap-2">
          <MusicIcon className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" /> Book Concert Tickets
        </DialogTitle>
        <DialogDescription className="text-sm text-white/70">
          Secure your tickets for Vijay Antony's live concert on December 21, 2025.
        </DialogDescription>
      </DialogHeader>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 py-2 md:py-4 safari-flex-fix ${isIpad9thGeneration ? "ipad-9th-dialog-content" : "ipad-dialog-content"}`}>
        <div className={isIpad9thGeneration ? "ipad-9th-scrollable-section" : "ipad-scrollable-section"}>
          <h3 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-white/90">Select Ticket Class</h3>
          <div className={`space-y-3 md:space-y-4 ${isIpad9thGeneration ? "ipad-9th-ticket-list" : "max-h-[250px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"}`}>
            {ticketClasses.map((ticket) => (
              <div 
                key={ticket.id} 
                className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all cross-browser-rounded ${
                  ticketCategory === ticket.id 
                    ? isIpad9thGeneration ? 'ipad-9th-selected-card' : 'border-pink-500 bg-pink-500/10' 
                    : isIpad9thGeneration ? 'ipad-9th-card' : 'border-white/10 hover:border-pink-500/50 bg-white/5'
                }`}
                onClick={() => setTicketCategory(ticket.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={`font-medium text-white ${isIpad9thGeneration ? "text-base" : "text-sm sm:text-base"}`}>{ticket.name}</h4>
                    <p className={`${isIpad9thGeneration ? "text-sm mt-1" : "text-xs sm:text-sm"} text-white/60`}>{ticket.description}</p>
                  </div>
                  <div className={`font-bold text-white ${isIpad9thGeneration ? "text-lg" : "text-base sm:text-lg"}`}>{formatPrice(ticket.price)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-4 md:mt-6 bg-pink-900/20 p-3 sm:p-4 rounded-lg border border-pink-500/20 cross-browser-rounded ${isIpad9thGeneration ? "ipad-9th-benefits-section" : ""}`}>
            <h4 className="text-xs sm:text-sm font-medium text-pink-300 mb-2">Ticket Benefits:</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                <CheckCircle className={`${isIpad9thGeneration ? "h-4 w-4" : "h-3.5 w-3.5 sm:h-4 sm:w-4"} text-pink-400 mt-0.5`} />
                Entry to all concert areas based on ticket class
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                <CheckCircle className={`${isIpad9thGeneration ? "h-4 w-4" : "h-3.5 w-3.5 sm:h-4 sm:w-4"} text-pink-400 mt-0.5`} />
                Access to food and beverage stalls
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                <CheckCircle className={`${isIpad9thGeneration ? "h-4 w-4" : "h-3.5 w-3.5 sm:h-4 sm:w-4"} text-pink-400 mt-0.5`} />
                Official event merchandise discount (10%)
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                <CheckCircle className={`${isIpad9thGeneration ? "h-4 w-4" : "h-3.5 w-3.5 sm:h-4 sm:w-4"} text-pink-400 mt-0.5`} />
                Exclusive entry to after-party (Elite & VVIP only)
              </li>
            </ul>
          </div>
        </div>
        
        <div className={isIpad9thGeneration ? "ipad-9th-scrollable-section" : "ipad-scrollable-section"}>
          <h3 className="text-lg font-semibold mb-4 text-white/90">Ticket Details</h3>
          <div className="space-y-6">
            <div>
              <Label htmlFor="quantity" className="text-white/90">Number of Tickets</Label>
              <div className={`flex mt-2 ${isIpad9thGeneration ? "ipad-9th-quantity-selector" : ""}`}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => decreaseQuantity(setTicketQuantity, ticketQuantity)}
                  disabled={ticketQuantity <= 1}
                  className={`rounded-r-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
                >
                  <Minus className={isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} />
                </Button>
                <div className={`flex-1 flex items-center justify-center border-y border-white/20 bg-white/5 text-white ${isIpad9thGeneration ? "text-xl font-semibold" : ""}`}>
                  {ticketQuantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => increaseQuantity(setTicketQuantity, ticketQuantity, 8)}
                  disabled={ticketQuantity >= 8}
                  className={`rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
                >
                  <Plus className={isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} />
                </Button>
              </div>
              {isIpad9thGeneration && <p className="text-white/50 text-sm mt-1">Maximum 8 tickets per booking</p>}
            </div>
            
            <div>
              <Label htmlFor="concert-date" className="text-white/90">Concert Date</Label>
              <div className={`mt-2 p-4 border border-white/20 rounded-lg bg-white/5 ${isIpad9thGeneration ? "rounded-xl bg-white/10" : ""}`}>
                <div className="flex items-center gap-3">
                  <CalendarDays className={`${isIpad9thGeneration ? "h-6 w-6 text-pink-400" : "h-5 w-5 text-pink-500"}`} />
                  <div>
                    <div className={`font-medium text-white ${isIpad9thGeneration ? "text-base" : ""}`}>December 21, 2025</div>
                    <div className="text-sm text-white/60">7:00 PM - 11:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-white/90">Concert Details</Label>
              <div className={`mt-2 p-4 border border-white/20 rounded-lg bg-white/5 space-y-2 ${isIpad9thGeneration ? "rounded-xl space-y-3" : ""}`}>
                <div className={`flex items-start gap-2 ${isIpad9thGeneration ? "gap-3" : ""}`}>
                  <CheckCircle className={`${isIpad9thGeneration ? "h-5 w-5 text-pink-400" : "h-4 w-4 text-pink-500"} mt-0.5`} />
                  <span className={`${isIpad9thGeneration ? "text-white/80" : "text-white/70 text-sm"}`}>Main Performer - Singer & Actor: Vijay Antony</span>
                </div>
                <div className={`flex items-start gap-2 ${isIpad9thGeneration ? "gap-3" : ""}`}>
                  <CheckCircle className={`${isIpad9thGeneration ? "h-5 w-5 text-pink-400" : "h-4 w-4 text-pink-500"} mt-0.5`} />
                  <span className={`${isIpad9thGeneration ? "text-white/80" : "text-white/70 text-sm"}`}>Special Performances by Guest Artists</span>
                </div>
                <div className={`flex items-start gap-2 ${isIpad9thGeneration ? "gap-3" : ""}`}>
                  <CheckCircle className={`${isIpad9thGeneration ? "h-5 w-5 text-pink-400" : "h-4 w-4 text-pink-500"} mt-0.5`} />
                  <span className={`${isIpad9thGeneration ? "text-white/80" : "text-white/70 text-sm"}`}>World-class Sound and Lighting System</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-white/90">Summary</Label>
              <div className={`mt-2 p-4 border border-white/20 rounded-lg bg-white/5 space-y-2 ${isIpad9thGeneration ? "rounded-xl space-y-3 bg-white/10" : ""}`}>
                <div className="flex justify-between">
                  <span className="text-white/70">Ticket Type</span>
                  <span className="font-medium text-white">
                    {ticketCategory ? ticketClasses.find(t => t.id === ticketCategory)?.name : "Select a ticket"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Quantity</span>
                  <span className="font-medium text-white">{ticketQuantity}</span>
                </div>
                <div className={`pt-2 border-t border-white/20 flex justify-between ${isIpad9thGeneration ? "pt-3 border-white/10 mt-1" : ""}`}>
                  <span className="font-medium text-white">Total Amount</span>
                  <span className={`font-bold text-pink-400 ${isIpad9thGeneration ? "text-xl" : "text-lg"}`}>
                    {totalPrice > 0 ? formatPrice(totalPrice) : "---"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DialogFooter className={`border-t border-white/10 pt-3 sm:pt-4 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end mt-4 ${isIpad9thGeneration ? "ipad-9th-dialog-footer" : "ipad-dialog-footer"}`}>
        <Button
          variant="outline"
          onClick={() => setConcertTicketDialogOpen(false)}
          className={`border-white/20 text-white hover:bg-white/10 hover:text-white text-sm h-9 w-full sm:w-auto safari-button-fix cross-browser-rounded opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
        >
          Cancel
        </Button>
        <Button
          className={`bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white text-sm h-9 w-full sm:w-auto safari-button-fix cross-browser-rounded ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
          disabled={!ticketCategory}
          onClick={() => {
            // Handle booking logic
            setConcertTicketDialogOpen(false);
            // Show success message or redirect to payment
          }}
        >
          <Ticket className="mr-1.5 h-3.5 w-3.5" />
          Proceed to Payment
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  return (
    <div className="min-h-screen flex flex-col bg-black" ref={containerRef}>
      <Helmet>
        <title>Rhythm Of Carnival 2025 | Prince Group's Mega Event</title>
        <meta name="description" content="Experience the Rhythm Of Carnival by Prince Group. A 6-day spectacular event from December 21-26, 2025 featuring music, helicopter rides, shopping, and attractions." />
      </Helmet>
      
      {/* Custom Event Navbar - Themed for the event */}
      <nav className="fixed top-0 left-0 right-0 z-[999] bg-transparent backdrop-blur-sm py-3 ios-fixed-fix">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/teal-cg-logo.png" alt="Prince Group" className="h-7 sm:h-8 w-auto safari-image-fix" />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4 overflow-x-auto flex-nowrap safari-flex-fix">
              {attractions
                .filter(attraction => attraction.id !== "themepark") // Remove Theme Park from navbar
                .map(attraction => (
                <Button 
                  key={attraction.id}
                  variant="ghost" 
                  className="text-white hover:text-[#4eb4a7] hover:bg-white/5 text-xs lg:text-sm px-2 whitespace-nowrap safari-button-fix"
                  onClick={attraction.bookingAction}
                >
                  {attraction.name}
                </Button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden text-white hover:bg-white/10"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#0c1e3c] border-[#4eb4a7]/20 text-white">
                  <SheetHeader>
                    <SheetTitle className="text-white">Menu</SheetTitle>
                    <SheetDescription className="text-white/60">Navigate the festival experience</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col gap-4">
                    {attractions
                      .filter(attraction => attraction.id !== "themepark") // Remove Theme Park from navbar
                      .map(attraction => (
                      <Button 
                        key={attraction.id}
                        variant="ghost" 
                        className="w-full justify-start text-white hover:text-[#4eb4a7] hover:bg-white/5 safari-button-fix"
                        onClick={() => {
                          attraction.bookingAction();
                          const element = document.querySelector('[data-radix-collection-item]');
                          if (element instanceof HTMLElement) {
                            element.click();
                          }
                        }}
                      >
                        <div className="mr-2">{attraction.icon}</div>
                        {attraction.name}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button 
                variant="outline" 
                className={`rounded-full transition-colors duration-300 border-${attractions[currentAttractionIndex].textColor.split('-')[1]} ${attractions[currentAttractionIndex].textColor} hover:bg-${attractions[currentAttractionIndex].textColor.split('-')[1]}/10 text-xs sm:text-sm safari-button-fix`}
                onClick={() => window.history.back()}
              >
                <ArrowRight className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 rotate-180" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section with Attraction Slideshow */}
      <section className="relative w-full overflow-hidden content-padding-top ipad-landscape-fix mt-0">
        {/* Height calculation: 100vh */}
        <div className="min-h-screen safari-flex-fix pt-8 md:pt-12 lg:pt-16">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            {/* 3D Starfield Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c1e3c] via-[#0e253f] to-[#01082f] safari-bg-fix">
              {[...Array(200)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white safari-image-fix"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    zIndex: 1
                  }}
                  animate={{
                    opacity: [0.1, 0.8, 0.1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>
            
            {/* Animated Gradient Overlay */}
            <motion.div 
              className="absolute inset-0 opacity-30 bg-gradient-to-r from-indigo-900/30 via-transparent to-purple-900/30 safari-bg-fix"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%',
                zIndex: 2
              }}
            />
          </div>
          
          {/* Content Container */}
          <div className="container mx-auto px-3 sm:px-4 h-full relative z-10 flex flex-col justify-center pt-2 md:pt-4 lg:pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center">
              {/* Main Event Content */}
              <motion.div
                className="lg:col-span-5 text-white mobile-padding-fix"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="bg-white/10 text-white border-none backdrop-blur-sm py-1 sm:py-1.5 px-3 sm:px-4 text-xs sm:text-sm mb-3 md:mb-6 inline-flex items-center gap-1 sm:gap-2 cross-browser-rounded">
                  <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" /> 
                  <span className="font-medium">21 - 26 December 2025</span>
                </Badge>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-6 leading-tight">
                  <span 
                    className="block text-[#4eb4a7]"
                    style={{
                      textShadow: "0px 0px 15px rgba(78, 180, 167, 0.5)"
                    }}
                  >
                    Rhythm Of
                  </span>
                  <span className="text-white">Carnival</span>
                </h1>
                
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-4 md:mb-6 max-w-xl leading-relaxed mobile-text-fix">
                  Experience Kanyakumari's biggest festival featuring Vijay Antony live in concert, helicopter rides, shopping, and unforgettable attractions.
                </p>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 md:mb-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/10 flex items-center gap-2 sm:gap-3 cross-browser-rounded">
                    <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center text-[#4eb4a7] cross-browser-rounded">
                      <MusicIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <div>
                      <div className="text-white/60 text-[10px] sm:text-xs">Main Performer - Singer & Actor</div>
                      <div className="text-white font-medium text-xs sm:text-sm md:text-base">Vijay Antony</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/10 flex items-center gap-2 sm:gap-3 cross-browser-rounded">
                    <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center text-[#4eb4a7] cross-browser-rounded">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <div>
                      <div className="text-white/60 text-[10px] sm:text-xs">Location</div>
                      <div className="text-white font-medium text-xs sm:text-sm md:text-base">Kanyakumari</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-white/80 text-[10px] sm:text-xs uppercase tracking-wider">Book Tickets</h3>
                  <div className="grid grid-cols-1 gap-1.5 sm:gap-2 mb-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white h-10 sm:h-11 py-0 w-full safari-button-fix cross-browser-rounded"
                      onClick={() => setConcertTicketDialogOpen(true)}
                    >
                      <MusicIcon className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                      <span className="text-[10px] sm:text-xs md:text-sm">Concert</span>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-2 lg:grid-cols-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white h-8 sm:h-9 py-0 safari-button-fix cross-browser-rounded"
                      onClick={() => setHelicopterTicketDialogOpen(true)}
                    >
                      <Plane className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                      <span className="text-[10px] sm:text-xs md:text-sm">Helicopter</span>
                    </Button>
                    
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white h-8 sm:h-9 py-0 safari-button-fix cross-browser-rounded"
                      onClick={() => setShoppingTicketDialogOpen(true)}
                    >
                      <ShoppingBag className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                      <span className="text-[10px] sm:text-xs md:text-sm">Shopping</span>
                    </Button>
                    
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white h-8 sm:h-9 py-0 safari-button-fix cross-browser-rounded"
                      onClick={() => setFoodComboDialogOpen(true)}
                    >
                      <Utensils className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                      <span className="text-[10px] sm:text-xs md:text-sm">Food Combo</span>
                    </Button>
                    
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white h-8 sm:h-9 py-0 safari-button-fix cross-browser-rounded"
                      onClick={() => setCakeBookingDialogOpen(true)}
                    >
                      <Gift className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                      <span className="text-[10px] sm:text-xs md:text-sm">Cake Booking</span>
                    </Button>
                  </div>
              </div>
              </motion.div>
              
              {/* Featured Attraction Slideshow */}
              <motion.div 
                className="lg:col-span-7 mt-4 md:mt-6 lg:mt-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentAttractionIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl cross-browser-rounded"
                    >
                      {/* Attraction Image */}
                      <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden">
                        {attractions[currentAttractionIndex].id === "helicopter" ? (
                          <img 
                            src="/heli/ER2A0460-scaled.jpg" 
                            alt="Helicopter Ride" 
                            className="w-full h-full object-cover safari-image-fix"
                          />
                        ) : attractions[currentAttractionIndex].id === "concert" ? (
                          <img 
                            src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2574&auto=format&fit=crop" 
                            alt="Concert" 
                            className="w-full h-full object-cover safari-image-fix"
                          />
                        ) : attractions[currentAttractionIndex].id === "themepark" ? (
                          <img 
                            src="/images/theme-park.jpg" 
                            alt="Theme Park" 
                            className="w-full h-full object-cover safari-image-fix"
                            onError={(e) => {
                              // Fallback to unsplash image if local image is missing
                              e.currentTarget.src = "https://images.unsplash.com/photo-1579660126134-38949a0174ea?q=80&w=2274&auto=format&fit=crop";
                            }}
                          />
                        ) : attractions[currentAttractionIndex].id === "food" ? (
                          <img 
                            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop" 
                            alt="Food Combo" 
                            className="w-full h-full object-cover safari-image-fix"
                          />
                        ) : attractions[currentAttractionIndex].id === "shopping" ? (
                          <img 
                            src="/images/shopping-festival.jpg" 
                            alt="Shopping Festival" 
                            className="w-full h-full object-cover safari-image-fix"
                            onError={(e) => {
                              // Fallback to unsplash image if local image is missing
                              e.currentTarget.src = "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2215&auto=format&fit=crop";
                            }}
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        
                        {/* Featured Badge */}
                        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                          <Badge className={`${attractions[currentAttractionIndex].buttonColor} text-white backdrop-blur-sm text-[10px] sm:text-xs py-0.5 px-1.5 sm:py-1 sm:px-2 cross-browser-rounded`}>
                            Featured Experience
                          </Badge>
                        </div>
                      </div>

                      {/* Attraction Details */}
                      <div className="p-3 sm:p-4 md:p-6">
                        <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                          <div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 flex items-center gap-1 sm:gap-2">
                              <span className="hidden sm:inline-block">{attractions[currentAttractionIndex].icon}</span>
                              <span>{attractions[currentAttractionIndex].name}</span>
                            </h3>
                            <p className="text-xs sm:text-sm md:text-base text-white/70 line-clamp-2">{attractions[currentAttractionIndex].description}</p>
                            <p className="text-xs md:text-sm text-white/50 mt-1">{attractions[currentAttractionIndex].date}</p>
                  </div>
                          
                          {attractions[currentAttractionIndex].ticketTypes && (
                            <div className="text-right">
                              <div className="text-[10px] sm:text-xs md:text-sm text-white/60">Starting from</div>
                              <div className="text-base sm:text-xl md:text-2xl font-bold text-white">
                                {formatPrice(attractions[currentAttractionIndex].ticketTypes[attractions[currentAttractionIndex].ticketTypes.length - 1].price)}
                </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4 md:mb-6">
                          {attractions[currentAttractionIndex].details.slice(0, 2).map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-1 sm:gap-2">
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#4eb4a7] mt-0.5" />
                              <span className="text-[10px] sm:text-xs md:text-sm text-white/70">{detail}</span>
                            </div>
                          ))}
                        </div>
                        
                        <Button
                          className={`w-full ${attractions[currentAttractionIndex].buttonColor} text-white text-xs sm:text-sm h-8 sm:h-10 safari-button-fix cross-browser-rounded`}
                          onClick={attractions[currentAttractionIndex].bookingAction}
                        >
                          <span className="mr-1 sm:mr-2">{attractions[currentAttractionIndex].icon}</span>
                          <span>Book Now</span>
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Manual Navigation Controls */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                    {attractions.filter(a => a.featured).map((_, index) => (
                      <button
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all ${
                          index === currentAttractionIndex 
                            ? 'bg-white w-4' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                        onClick={() => setCurrentAttractionIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Modified Side Navigation Arrows with improved visibility for iPad 9th gen */}
                  <button
                    className="attraction-nav-button left absolute top-1/2 left-2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-black/80 z-20"
                    onClick={() => {
                      setCurrentAttractionIndex(prev => 
                        prev === 0 ? attractions.filter(a => a.featured).length - 1 : prev - 1
                      );
                    }}
                    aria-label="Previous attraction"
                  >
                    {/* Explicit left-facing arrow */}
                    <ArrowRight className="h-5 w-5 rotate-180" style={{ transform: 'rotate(180deg)' }} />
                  </button>
                  
                  <button
                    className="attraction-nav-button right absolute top-1/2 right-2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 hover:bg-black/80 z-20"
                    onClick={() => {
                      setCurrentAttractionIndex(prev => 
                        prev === attractions.filter(a => a.featured).length - 1 ? 0 : prev + 1
                      );
                    }}
                    aria-label="Next attraction"
                  >
                    {/* Explicit right-facing arrow */}
                    <ArrowRight className="h-5 w-5" style={{ transform: 'rotate(0deg)' }} />
                  </button>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -left-6 w-40 h-40 bg-gradient-to-br from-[#4eb4a7]/30 to-[#85cbc3]/30 rounded-full blur-3xl -z-10"></div>
                  <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-br from-[#4eb4a7]/20 to-[#85cbc3]/20 rounded-full blur-3xl -z-10"></div>
                          </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Event Overview Section */}
      <section id="event-overview" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#0c1e3c] to-[#0e253f] safari-bg-fix">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <Badge className="bg-[#4eb4a7]/10 text-[#4eb4a7] mb-3 sm:mb-4 py-0.5 px-2 text-xs sm:text-sm cross-browser-rounded">
              EVENT DETAILS
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-6">The Ultimate Festival Experience</h2>
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-3xl mx-auto px-2">
              Prince Group's Rhythm of Carnival brings you 6 days of non-stop entertainment, shopping, and unique experiences at Kanyakumari's biggest festival of 2025!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-2">
            {/* Event Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-md rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10 cross-browser-rounded"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center text-[#4eb4a7] mb-3 sm:mb-4 cross-browser-rounded">
                <CalendarDays className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Event Date</h3>
              <p className="text-sm sm:text-base text-white/70">{attractions[currentAttractionIndex].date}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 backdrop-blur-md rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10 cross-browser-rounded"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center text-[#4eb4a7] mb-3 sm:mb-4 cross-browser-rounded">
                <MapPin className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Location</h3>
              <p className="text-sm sm:text-base text-white/70">Kanyakumari, Tamil Nadu</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-md rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10 cross-browser-rounded"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center text-[#4eb4a7] mb-3 sm:mb-4 cross-browser-rounded">
                <Users className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Attendees</h3>
              <p className="text-sm sm:text-base text-white/70">Expected 10,00,000+</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-md rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10 cross-browser-rounded"
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center text-[#4eb4a7] mb-3 sm:mb-4 cross-browser-rounded">
                <MusicIcon className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 whitespace-nowrap">Registered</h3>
              <p className="text-sm sm:text-base text-white/70">30,000+ Tickets</p>
            </motion.div>
          </div>
          
          {/* Key Attractions */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <Badge className="bg-[#4eb4a7]/10 text-[#4eb4a7] mb-4">
                ATTRACTIONS
              </Badge>
              <h2 className="text-4xl font-bold text-white mb-6">Key Festival Attractions</h2>
              <p className="text-lg text-white/70 max-w-3xl mx-auto">
                Discover all the exciting experiences waiting for you at Rhythm of Carnival.
              </p>
            </div>
            
            {/* Desktop Attractions Grid */}
            <div id="attractions" className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {attractions.map((attraction, index) => (
                <motion.div
                  key={attraction.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 group"
                >
                  <div className={`h-48 bg-gradient-to-r ${attraction.color} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {attraction.icon}
                      </motion.div>
                    </div>
                    {attraction.featured && (
                      <Badge className="absolute top-4 right-4 bg-white/20 text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                      <div className="p-6">
                    <h3 className={`text-2xl font-bold ${attraction.textColor} mb-3`}>
                      {attraction.name}
                    </h3>
                    <p className="text-white/70 mb-6">
                      {attraction.description}
                    </p>

                        <div className="space-y-3 mb-6">
                      {attraction.details.slice(0, 2).map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className={`h-4 w-4 ${attraction.textColor} mt-1`} />
                          <span className="text-white/60 text-sm">{detail}</span>
                          </div>
                      ))}
                          </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className={`${attraction.buttonColor} text-white flex-1`}
                        onClick={attraction.bookingAction}
                      >
                        {attraction.icon}
                        <span className="ml-2">Book Tickets</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-white/15 hover:bg-white/25 hover:scale-105"
                        onClick={() => setActiveAttraction(attraction.id)}
                      >
                        <Info className="h-5 w-5" />
                      </Button>
                          </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Ticket Booking Section with Parallax Effect */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e253f]/95 to-black/95"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:order-2"
            >
              <Badge className="bg-[#4eb4a7]/10 text-[#4eb4a7] mb-6">
                TICKETS NOW AVAILABLE
              </Badge>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3]">
                  Secure Your
                                </span>
                <span className="block text-white mt-2">Festival Experience</span>
              </h2>
              
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Book your tickets now for this one-of-a-kind event. Choose from various ticket categories for concert access or explore our premium experiences like helicopter rides.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
                      <MusicIcon className="h-5 w-5" />
                              </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Concert Tickets</h3>
                      <p className="text-white/60 text-sm">Various seating options available</p>
                              </div>
                    <div className="ml-auto">
                      <Button 
                        onClick={() => setConcertTicketDialogOpen(true)}
                        className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white"
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Helicopter Ride Booking Dialog */}
      <Dialog open={helicopterTicketDialogOpen} onOpenChange={setHelicopterTicketDialogOpen}>
        <DialogContent className={`max-w-4xl bg-gradient-to-b from-[#0c1e3c] to-[#0e253f] border border-indigo-600/20 text-white ${isIpad9thGeneration ? "ipad-9th-custom-dialog" : "dialog-content ipad-dialog-fix"}`}>
          <DialogHeader className={isIpad9thGeneration ? "ipad-9th-dialog-header" : "ipad-dialog-header"}>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1.5 sm:gap-2">
              <Plane className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" /> Book Helicopter Ride
            </DialogTitle>
            <DialogDescription className="text-sm text-white/70">
              Experience breathtaking aerial views of Kanyakumari from above (Dec 21-26, 2025).
            </DialogDescription>
          </DialogHeader>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 py-2 md:py-4 ${isIpad9thGeneration ? "ipad-9th-dialog-content" : "ipad-dialog-content"}`}>
            <div className={isIpad9thGeneration ? "ipad-9th-scrollable-section" : "ipad-scrollable-section"}>
              <h3 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-white/90">Select Package</h3>
              <div className={`space-y-3 md:space-y-4 ${isIpad9thGeneration ? "ipad-9th-ticket-list" : ""}`}>
                {helicopterPackages.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all cross-browser-rounded ${
                      selectedHelicopterPackage === pkg.id 
                        ? isIpad9thGeneration ? 'ipad-9th-selected-card' : 'border-indigo-500 bg-indigo-500/10' 
                        : isIpad9thGeneration ? 'ipad-9th-card' : 'border-white/10 hover:border-indigo-500/50 bg-white/5'
                    }`}
                    onClick={() => setSelectedHelicopterPackage(pkg.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-medium text-white ${isIpad9thGeneration ? "text-base" : "text-sm sm:text-base"}`}>{pkg.name}</h4>
                        <div className={`${isIpad9thGeneration ? "text-sm" : "text-xs sm:text-sm"} text-indigo-400 font-medium mt-1`}>{pkg.duration}</div>
                        <p className={`${isIpad9thGeneration ? "text-sm mt-1" : "text-xs sm:text-sm"} text-white/60`}>{pkg.description}</p>
                      </div>
                      <div className={`font-bold text-white ${isIpad9thGeneration ? "text-lg" : "text-base sm:text-lg"}`}>{formatPrice(pkg.price)}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={`mt-4 md:mt-6 bg-indigo-900/20 p-3 sm:p-4 rounded-lg border border-indigo-500/20 cross-browser-rounded ${isIpad9thGeneration ? "ipad-9th-benefits-section" : ""}`}>
                <h4 className="text-xs sm:text-sm font-medium text-indigo-300 mb-2">Package Includes:</h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                    <CheckCircle className={`${isIpad9thGeneration ? "h-4 w-4" : "h-3.5 w-3.5 sm:h-4 sm:w-4"} text-indigo-400 mt-0.5`} />
                    Professional pilots with safety briefing
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                    <CheckCircle className={`${isIpad9thGeneration ? "h-4 w-4" : "h-3.5 w-3.5 sm:h-4 sm:w-4"} text-indigo-400 mt-0.5`} />
                    Commemorative certificate
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                    <CheckCircle className={`${isIpad9thGeneration ? "h-4 w-4" : "h-3.5 w-3.5 sm:h-4 sm:w-4"} text-indigo-400 mt-0.5`} />
                    Professional photos available for purchase
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                    <CheckCircle className={`${isIpad9thGeneration ? "h-4 w-4" : "h-3.5 w-3.5 sm:h-4 sm:w-4"} text-indigo-400 mt-0.5`} />
                    Lucky draw entry for 1-day luxury Alappuzha boat house stay
                  </li>
                </ul>
              </div>
            </div>
            
            <div className={isIpad9thGeneration ? "ipad-9th-scrollable-section" : "ipad-scrollable-section"}>
              <h3 className="text-lg font-semibold mb-4 text-white/90 mt-4 md:mt-0">Booking Details</h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="heli-date" className="text-white/90">Select Date</Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select date" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0c1e3c] border-indigo-500/20 text-white">
                      <SelectItem value="dec21" className="focus:bg-indigo-500/20 focus:text-white">December 21, 2025</SelectItem>
                      <SelectItem value="dec22" className="focus:bg-indigo-500/20 focus:text-white">December 22, 2025</SelectItem>
                      <SelectItem value="dec23" className="focus:bg-indigo-500/20 focus:text-white">December 23, 2025</SelectItem>
                      <SelectItem value="dec24" className="focus:bg-indigo-500/20 focus:text-white">December 24, 2025</SelectItem>
                      <SelectItem value="dec25" className="focus:bg-indigo-500/20 focus:text-white">December 25, 2025</SelectItem>
                      <SelectItem value="dec26" className="focus:bg-indigo-500/20 focus:text-white">December 26, 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="heli-time" className="text-white/90">Select Time Slot</Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0c1e3c] border-indigo-500/20 text-white">
                      <SelectItem value="9am" className="focus:bg-indigo-500/20 focus:text-white">9:00 AM</SelectItem>
                      <SelectItem value="10am" className="focus:bg-indigo-500/20 focus:text-white">10:00 AM</SelectItem>
                      <SelectItem value="11am" className="focus:bg-indigo-500/20 focus:text-white">11:00 AM</SelectItem>
                      <SelectItem value="12pm" className="focus:bg-indigo-500/20 focus:text-white">12:00 PM</SelectItem>
                      <SelectItem value="1pm" className="focus:bg-indigo-500/20 focus:text-white">1:00 PM</SelectItem>
                      <SelectItem value="2pm" className="focus:bg-indigo-500/20 focus:text-white">2:00 PM</SelectItem>
                      <SelectItem value="3pm" className="focus:bg-indigo-500/20 focus:text-white">3:00 PM</SelectItem>
                      <SelectItem value="4pm" className="focus:bg-indigo-500/20 focus:text-white">4:00 PM</SelectItem>
                      <SelectItem value="5pm" className="focus:bg-indigo-500/20 focus:text-white">5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="heli-tickets" className="text-white/90">Number of Tickets</Label>
                  <div className={`flex mt-2 ${isIpad9thGeneration ? "ipad-9th-quantity-selector" : ""}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => decreaseQuantity(setHelicopterTickets, helicopterTickets)}
                      disabled={helicopterTickets <= 1}
                      className={`rounded-r-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
                    >
                      <Minus className={isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} />
                    </Button>
                    <div className={`flex-1 flex items-center justify-center border-y border-white/20 bg-white/5 text-white ${isIpad9thGeneration ? "text-xl font-semibold" : ""}`}>
                      {helicopterTickets}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => increaseQuantity(setHelicopterTickets, helicopterTickets, 4)}
                      disabled={helicopterTickets >= 4}
                      className={`rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
                    >
                      <Plus className={isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} />
                    </Button>
                  </div>
                  <p className="text-sm text-white/50 mt-1">Maximum 4 tickets per booking</p>
                </div>
                
                <div>
                  <Label className="text-white/90">Summary</Label>
                  <div className={`mt-2 p-4 border border-white/20 rounded-lg bg-white/5 space-y-2 ${isIpad9thGeneration ? "rounded-xl space-y-3 bg-white/10" : ""}`}>
                    <div className="flex justify-between">
                      <span className="text-white/70">Package</span>
                      <span className="font-medium text-white">
                        {selectedHelicopterPackage 
                          ? helicopterPackages.find(p => p.id === selectedHelicopterPackage)?.name 
                          : "Select a package"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Tickets</span>
                      <span className="font-medium text-white">{helicopterTickets}</span>
                    </div>
                    <div className={`pt-2 border-t border-white/20 flex justify-between ${isIpad9thGeneration ? "pt-3 border-white/10 mt-1" : ""}`}>
                      <span className="font-medium text-white">Total Amount</span>
                      <span className={`font-bold text-indigo-400 ${isIpad9thGeneration ? "text-xl" : "text-lg"}`}>
                        {selectedHelicopterPackage 
                          ? formatPrice((helicopterPackages.find(p => p.id === selectedHelicopterPackage)?.price || 0) * helicopterTickets) 
                          : "---"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className={`border-t border-white/10 pt-3 sm:pt-4 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end mt-4 ${isIpad9thGeneration ? "ipad-9th-dialog-footer" : "ipad-dialog-footer"}`}>
            <Button
              variant="outline"
              onClick={() => setHelicopterTicketDialogOpen(false)}
              className={`border-white/20 text-white hover:bg-white/10 hover:text-white text-sm h-9 w-full sm:w-auto safari-button-fix cross-browser-rounded opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
            >
              Cancel
            </Button>
            <Button
              className={`bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm h-9 w-full sm:w-auto safari-button-fix cross-browser-rounded ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
              disabled={!selectedHelicopterPackage}
              onClick={() => {
                // Handle booking logic
                setHelicopterTicketDialogOpen(false);
                // Show success message or redirect to payment
              }}
            >
              <Plane className="mr-1.5 h-3.5 w-3.5" />
              Secure Your Ride
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Shopping Arena Pass Dialog */}
      <Dialog open={shoppingTicketDialogOpen} onOpenChange={setShoppingTicketDialogOpen}>
        <DialogContent className={`max-w-4xl bg-gradient-to-b from-[#0c1e3c] to-[#0e253f] border border-amber-500/20 text-white ${isIpad9thGeneration ? "ipad-9th-custom-dialog" : "dialog-content ipad-dialog-fix"}`}>
          <DialogHeader className={isIpad9thGeneration ? "ipad-9th-dialog-header" : "ipad-dialog-header"}>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1.5 sm:gap-2">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" /> Shopping Arena Pass
            </DialogTitle>
            <DialogDescription className="text-sm text-white/70">
              Purchase passes for the 5-day shopping festival with 500+ stalls and attractions (Dec 22-26, 2025).
            </DialogDescription>
          </DialogHeader>
          
          <div className={`py-2 md:py-4 space-y-4 md:space-y-6 ${isIpad9thGeneration ? "ipad-9th-dialog-content" : "ipad-dialog-content"}`}>
            <div className={`bg-amber-500/5 p-3 md:p-4 rounded-lg border border-amber-500/20 ${isIpad9thGeneration ? "rounded-xl" : ""}`}>
              <h4 className="text-amber-400 font-semibold mb-2">Shopping Arena Highlights:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-start gap-2">
                  <ShoppingBag className={`${isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} text-amber-500 mt-0.5`} />
                  <span className="text-white/70 text-sm">300+ retail stalls with exclusive discounts</span>
                </div>
                <div className="flex items-start gap-2">
                  <Utensils className={`${isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} text-amber-500 mt-0.5`} />
                  <span className="text-white/70 text-sm">200+ food & culinary shops</span>
                </div>
                <div className="flex items-start gap-2">
                  <PartyPopper className={`${isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} text-amber-500 mt-0.5`} />
                  <span className="text-white/70 text-sm">Theme park with exciting rides</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className={`${isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} text-amber-500 mt-0.5`} />
                  <span className="text-white/70 text-sm">Water activities and entertainment</span>
                </div>
                <div className="flex items-start gap-2">
                  <Gift className={`${isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} text-amber-500 mt-0.5`} />
                  <span className="text-white/70 text-sm">Toys and daily essentials shops</span>
                </div>
                <div className="flex items-start gap-2">
                  <Trophy className={`${isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} text-amber-500 mt-0.5`} />
                  <span className="text-white/70 text-sm">Hourly lucky draws and contests</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-white/90">Select Date</Label>
              <div className={`mt-2 bg-white/5 rounded-lg border border-white/20 p-4 ${isIpad9thGeneration ? "rounded-xl" : ""}`}>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[22, 23, 24, 25, 26].map((day) => (
                    <Button
                      key={day}
                      variant="outline"
                      className={`h-12 w-24 border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 ${
                        day === 22 ? 'bg-amber-500/20 border-amber-500' : 'bg-white/5'
                      } ${isIpad9thGeneration ? "ipad-9th-button-fix" : ""}`}
                      onClick={() => {}}
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-medium text-white">Dec {day}</span>
                        <span className="text-xs text-white/60">2025</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-white/50 mt-1">Select your preferred date (December 22-26, 2025)</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adults" className="text-white/90">Number of Adults</Label>
                <div className={`flex mt-2 ${isIpad9thGeneration ? "ipad-9th-quantity-selector" : ""}`}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decreaseQuantity(setAdultCount, adultCount)}
                    disabled={adultCount <= 1}
                    className={`rounded-r-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
                  >
                    <Minus className={isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} />
                  </Button>
                  <div className={`flex-1 flex items-center justify-center border-y border-white/20 bg-white/5 text-white ${isIpad9thGeneration ? "text-xl font-semibold" : ""}`}>
                    {adultCount}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => increaseQuantity(setAdultCount, adultCount, 20)}
                    className={`rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
                  >
                    <Plus className={isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} />
                  </Button>
                </div>
                <p className="text-sm text-white/50 mt-1">₹299 per adult</p>
              </div>
              
              <div>
                <Label htmlFor="children" className="text-white/90">Number of Children (5-12 years)</Label>
                <div className={`flex mt-2 ${isIpad9thGeneration ? "ipad-9th-quantity-selector" : ""}`}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decreaseQuantity(setChildCount, childCount, 0)}
                    disabled={childCount <= 0}
                    className={`rounded-r-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
                  >
                    <Minus className={isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} />
                  </Button>
                  <div className={`flex-1 flex items-center justify-center border-y border-white/20 bg-white/5 text-white ${isIpad9thGeneration ? "text-xl font-semibold" : ""}`}>
                    {childCount}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => increaseQuantity(setChildCount, childCount, 20)}
                    className={`rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
                  >
                    <Plus className={isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} />
                  </Button>
                </div>
                <p className="text-sm text-white/50 mt-1">₹149 per child (Children under 5 are free)</p>
              </div>
            </div>
            
            <div>
              <Label className="text-white/90">Summary</Label>
              <div className={`mt-2 p-4 border border-white/20 rounded-lg bg-white/5 space-y-2 ${isIpad9thGeneration ? "rounded-xl space-y-3 bg-white/10" : ""}`}>
                <div className="flex justify-between">
                  <span className="text-white/70">Adults ({adultCount})</span>
                  <span className="font-medium text-white">{formatPrice(299 * adultCount)}</span>
                </div>
                {childCount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Children ({childCount})</span>
                    <span className="font-medium text-white">{formatPrice(149 * childCount)}</span>
                  </div>
                )}
                <div className={`pt-2 border-t border-white/20 flex justify-between ${isIpad9thGeneration ? "pt-3 border-white/10 mt-1" : ""}`}>
                  <span className="font-medium text-white">Total Amount</span>
                  <span className={`font-bold text-amber-400 ${isIpad9thGeneration ? "text-xl" : "text-lg"}`}>
                    {formatPrice(299 * adultCount + 149 * childCount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className={`border-t border-white/10 pt-3 sm:pt-4 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end mt-4 ${isIpad9thGeneration ? "ipad-9th-dialog-footer" : "ipad-dialog-footer"}`}>
            <Button
              variant="outline"
              onClick={() => setShoppingTicketDialogOpen(false)}
              className={`border-white/20 text-white hover:bg-white/10 hover:text-white text-sm h-9 w-full sm:w-auto safari-button-fix cross-browser-rounded opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
            >
              Cancel
            </Button>
            <Button
              className={`bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm h-9 w-full sm:w-auto safari-button-fix cross-browser-rounded ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
              onClick={() => {
                // Handle booking logic
                setShoppingTicketDialogOpen(false);
                // Show success message or redirect to payment
              }}
            >
              <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
              Book Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Food Combo Booking Dialog */}
      <Dialog open={foodComboDialogOpen} onOpenChange={setFoodComboDialogOpen}>
        <DialogContent className={`max-w-4xl bg-gradient-to-b from-[#0c1e3c] to-[#0e253f] border border-emerald-500/20 text-white ${isIpad9thGeneration ? "ipad-9th-custom-dialog" : "dialog-content ipad-dialog-fix"}`}>
          <DialogHeader className={isIpad9thGeneration ? "ipad-9th-dialog-header" : "ipad-dialog-header"}>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1.5 sm:gap-2">
              <Utensils className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" /> Food Combo Booking
            </DialogTitle>
            <DialogDescription className="text-sm text-white/70">
              Pre-book your food combos for the festival day (December 21, 2025).
            </DialogDescription>
          </DialogHeader>
          
          <div className={`py-4 space-y-6 ${isIpad9thGeneration ? "ipad-9th-dialog-content" : "ipad-dialog-content"}`}>
            <div className={`bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/20 ${isIpad9thGeneration ? "rounded-xl" : ""}`}>
              <h4 className="text-emerald-400 font-semibold mb-2">Why Pre-book Your Food?</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className={`${isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} text-emerald-500 mt-0.5`} />
                  <span className="text-white/70 text-sm">Skip the long lines at food stalls</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className={`${isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} text-emerald-500 mt-0.5`} />
                  <span className="text-white/70 text-sm">Save 15% compared to on-site purchases</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className={`${isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} text-emerald-500 mt-0.5`} />
                  <span className="text-white/70 text-sm">Guaranteed availability of your favorite dishes</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className={`${isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} text-emerald-500 mt-0.5`} />
                  <span className="text-white/70 text-sm">Collect at dedicated counters with no waiting time</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-white/90">Select Food Combo</Label>
              <div className={`space-y-3 mt-2 ${isIpad9thGeneration ? "ipad-9th-ticket-list" : ""}`}>
                {foodCombos.map(combo => (
                  <div
                    key={combo.id}
                    className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all cross-browser-rounded ${
                      selectedFoodCombo === combo.id 
                        ? isIpad9thGeneration ? 'ipad-9th-selected-card' : 'border-emerald-500 bg-emerald-500/10' 
                        : isIpad9thGeneration ? 'ipad-9th-card' : 'border-white/10 hover:border-emerald-500/50 bg-white/5'
                    }`}
                    onClick={() => setSelectedFoodCombo(combo.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-medium text-white ${isIpad9thGeneration ? "text-base" : "text-sm sm:text-base"}`}>{combo.name}</h4>
                        <p className={`${isIpad9thGeneration ? "text-sm mt-1" : "text-xs sm:text-sm"} text-white/60`}>{combo.description}</p>
                      </div>
                      <div className={`font-bold text-white ${isIpad9thGeneration ? "text-lg" : "text-base sm:text-lg"}`}>{formatPrice(combo.price)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="quantity" className="text-white/90">Quantity</Label>
              <div className={`flex mt-2 ${isIpad9thGeneration ? "ipad-9th-quantity-selector" : ""}`}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => decreaseQuantity(setFoodComboQuantity, foodComboQuantity)}
                  disabled={foodComboQuantity <= 1}
                  className={`rounded-r-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
                >
                  <Minus className={isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} />
                </Button>
                <div className={`flex-1 flex items-center justify-center border-y border-white/20 bg-white/5 text-white ${isIpad9thGeneration ? "text-xl font-semibold" : ""}`}>
                  {foodComboQuantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => increaseQuantity(setFoodComboQuantity, foodComboQuantity, 10)}
                  disabled={foodComboQuantity >= 10}
                  className={`rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
                >
                  <Plus className={isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} />
                </Button>
              </div>
              <p className="text-sm text-white/50 mt-1">Maximum 10 combos per booking</p>
            </div>
            
            <div>
              <Label className="text-white/90">Summary</Label>
              <div className={`mt-2 p-4 border border-white/20 rounded-lg bg-white/5 space-y-2 ${isIpad9thGeneration ? "rounded-xl space-y-3 bg-white/10" : ""}`}>
                <div className="flex justify-between">
                  <span className="text-white/70">Combo</span>
                  <span className="font-medium text-white">
                    {selectedFoodCombo ? foodCombos.find(c => c.id === selectedFoodCombo)?.name : "Select a combo"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Quantity</span>
                  <span className="font-medium text-white">{foodComboQuantity}</span>
                </div>
                <div className={`pt-2 border-t border-white/20 flex justify-between ${isIpad9thGeneration ? "pt-3 border-white/10 mt-1" : ""}`}>
                  <span className="font-medium text-white">Total Amount</span>
                  <span className={`font-bold text-emerald-400 ${isIpad9thGeneration ? "text-xl" : "text-lg"}`}>
                    {selectedFoodCombo 
                      ? formatPrice((foodCombos.find(c => c.id === selectedFoodCombo)?.price || 0) * foodComboQuantity) 
                      : "---"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className={`border-t border-white/10 pt-3 sm:pt-4 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end mt-4 ${isIpad9thGeneration ? "ipad-9th-dialog-footer" : "ipad-dialog-footer"}`}>
            <Button
              variant="outline"
              onClick={() => setFoodComboDialogOpen(false)}
              className={`border-white/20 text-white hover:bg-white/10 hover:text-white text-sm h-9 w-full sm:w-auto safari-button-fix cross-browser-rounded opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
            >
              Cancel
            </Button>
            <Button
              className={`bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-sm h-9 w-full sm:w-auto safari-button-fix cross-browser-rounded ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
              disabled={!selectedFoodCombo}
              onClick={() => {
                // Handle booking logic
                setFoodComboDialogOpen(false);
                // Show success message or redirect to payment
              }}
            >
              <Utensils className="mr-1.5 h-3.5 w-3.5" />
              Book Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cake Pre-Booking Dialog */}
      <Dialog open={cakeBookingDialogOpen} onOpenChange={setCakeBookingDialogOpen}>
        <DialogContent className={`max-w-4xl bg-gradient-to-b from-[#0c1e3c] to-[#0e253f] border border-rose-500/20 text-white ${isIpad9thGeneration ? "ipad-9th-custom-dialog" : "dialog-content ipad-dialog-fix"}`}>
          <DialogHeader className={isIpad9thGeneration ? "ipad-9th-dialog-header" : "ipad-dialog-header"}>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1.5 sm:gap-2">
              <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" /> Cake Pre-Booking
            </DialogTitle>
            <DialogDescription className="text-sm text-white/70">
              Pre-order celebration cakes for your special moments at the festival (Dec 21-26, 2025).
            </DialogDescription>
          </DialogHeader>
          
          <div className={`py-4 space-y-6 ${isIpad9thGeneration ? "ipad-9th-dialog-content" : "ipad-dialog-content"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label className="text-white/90">Select Cake</Label>
                <div className={`space-y-3 mt-2 ${isIpad9thGeneration ? "ipad-9th-ticket-list" : ""}`}>
                  {cakeOptions.map(cake => (
                    <div
                      key={cake.id}
                      className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all cross-browser-rounded ${
                        selectedCake === cake.id 
                          ? isIpad9thGeneration ? 'ipad-9th-selected-card' : 'border-rose-500 bg-rose-500/10' 
                          : isIpad9thGeneration ? 'ipad-9th-card' : 'border-white/10 hover:border-rose-500/50 bg-white/5'
                      }`}
                      onClick={() => setSelectedCake(cake.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`font-medium text-white ${isIpad9thGeneration ? "text-base" : "text-sm sm:text-base"}`}>{cake.name}</h4>
                          <p className={`${isIpad9thGeneration ? "text-sm mt-1" : "text-xs sm:text-sm"} text-white/60`}>{cake.description}</p>
                        </div>
                        <div className={`font-bold text-white ${isIpad9thGeneration ? "text-lg" : "text-base sm:text-lg"}`}>{formatPrice(cake.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="quantity" className="text-white/90">Quantity</Label>
                <div className={`flex mt-2 ${isIpad9thGeneration ? "ipad-9th-quantity-selector" : ""}`}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decreaseQuantity(setCakeQuantity, cakeQuantity)}
                    disabled={cakeQuantity <= 1}
                    className={`rounded-r-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
                  >
                    <Minus className={isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} />
                  </Button>
                  <div className={`flex-1 flex items-center justify-center border-y border-white/20 bg-white/5 text-white ${isIpad9thGeneration ? "text-xl font-semibold" : ""}`}>
                    {cakeQuantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => increaseQuantity(setCakeQuantity, cakeQuantity, 5)}
                    disabled={cakeQuantity >= 5}
                    className={`rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
                  >
                    <Plus className={isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} />
                  </Button>
                </div>
                <p className="text-sm text-white/50 mt-1">Maximum 5 cakes per booking</p>
              </div>

              <div>
                <Label htmlFor="cake-date" className="text-white/90">Delivery Date</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0c1e3c] border-rose-500/20 text-white">
                    <SelectItem value="dec21" className="focus:bg-rose-500/20 focus:text-white">December 21, 2025</SelectItem>
                    <SelectItem value="dec22" className="focus:bg-rose-500/20 focus:text-white">December 22, 2025</SelectItem>
                    <SelectItem value="dec23" className="focus:bg-rose-500/20 focus:text-white">December 23, 2025</SelectItem>
                    <SelectItem value="dec24" className="focus:bg-rose-500/20 focus:text-white">December 24, 2025</SelectItem>
                    <SelectItem value="dec25" className="focus:bg-rose-500/20 focus:text-white">December 25, 2025</SelectItem>
                    <SelectItem value="dec26" className="focus:bg-rose-500/20 focus:text-white">December 26, 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="sm:col-span-2">
                <Label className="text-white/90">Message on Cake</Label>
                <div className="mt-2">
                  <textarea
                    value={cakeMessage}
                    onChange={(e) => setCakeMessage(e.target.value)}
                    placeholder="Enter your special message for the cake (up to 30 characters)"
                    maxLength={30}
                    className="w-full p-2 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-white/30"
                  />
                </div>
                <p className="text-sm text-white/50 mt-1">Optional: Leave blank for no message</p>
              </div>
            </div>
            
            <div className={`bg-rose-500/5 p-4 rounded-lg border border-rose-500/20 ${isIpad9thGeneration ? "rounded-xl" : ""}`}>
              <h4 className="text-rose-400 font-semibold mb-2">Important Information:</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Info className={`${isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} text-rose-400 mt-0.5`} />
                  <span className="text-white/70 text-sm">Pre-order at least 24 hours in advance</span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className={`${isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} text-rose-400 mt-0.5`} />
                  <span className="text-white/70 text-sm">Collect your cake from the Festival Bakery Zone</span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className={`${isIpad9thGeneration ? "h-5 w-5" : "h-4 w-4"} text-rose-400 mt-0.5`} />
                  <span className="text-white/70 text-sm">Special dietary requirements: Call +91-98765-43210</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="text-white/90">Summary</Label>
              <div className={`mt-2 p-4 border border-white/20 rounded-lg bg-white/5 space-y-2 ${isIpad9thGeneration ? "rounded-xl space-y-3 bg-white/10" : ""}`}>
                <div className="flex justify-between">
                  <span className="text-white/70">Cake</span>
                  <span className="font-medium text-white">
                    {selectedCake ? cakeOptions.find(c => c.id === selectedCake)?.name : "Select a cake"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Quantity</span>
                  <span className="font-medium text-white">{cakeQuantity}</span>
                </div>
                <div className={`pt-2 border-t border-white/20 flex justify-between ${isIpad9thGeneration ? "pt-3 border-white/10 mt-1" : ""}`}>
                  <span className="font-medium text-white">Total Amount</span>
                  <span className={`font-bold text-rose-400 ${isIpad9thGeneration ? "text-xl" : "text-lg"}`}>
                    {selectedCake 
                      ? formatPrice((cakeOptions.find(c => c.id === selectedCake)?.price || 0) * cakeQuantity) 
                      : "---"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className={`border-t border-white/10 pt-3 sm:pt-4 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end mt-4 ${isIpad9thGeneration ? "ipad-9th-dialog-footer" : "ipad-dialog-footer"}`}>
            <Button
              variant="outline"
              onClick={() => setCakeBookingDialogOpen(false)}
              className={`border-white/20 text-white hover:bg-white/10 hover:text-white text-sm h-9 w-full sm:w-auto safari-button-fix cross-browser-rounded opacity-100 bg-white/15 ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
            >
              Cancel
            </Button>
            <Button
              className={`bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-sm h-9 w-full sm:w-auto safari-button-fix cross-browser-rounded ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
              disabled={!selectedCake}
              onClick={() => {
                // Handle booking logic
                setCakeBookingDialogOpen(false);
                // Show success message or redirect to payment
              }}
            >
              <Gift className="mr-1.5 h-3.5 w-3.5" />
              Book Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Attraction Details Dialog */}
      <Dialog open={!!activeAttraction} onOpenChange={(open) => !open && setActiveAttraction(null)}>
        <DialogContent className={`max-w-3xl bg-gradient-to-b from-[#0c1e3c] to-[#0e253f] border border-white/20 text-white ${isIpad9thGeneration ? "ipad-9th-custom-dialog" : "dialog-content ipad-dialog-fix"}`}>
          {activeAttraction && (() => {
            const attraction = attractions.find(a => a.id === activeAttraction);
            if (!attraction) return null;
            return (
              <>
                <DialogHeader className={isIpad9thGeneration ? "ipad-9th-dialog-header" : "ipad-dialog-header"}>
                  <DialogTitle className={`text-xl sm:text-2xl font-bold text-white flex items-center gap-1.5 sm:gap-2 ${attraction.textColor}`}>
                    {attraction.icon} {attraction.name}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-white/70">
                    {attraction.description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className={`py-4 ${isIpad9thGeneration ? "ipad-9th-dialog-content" : "ipad-dialog-content"}`}>
                  <div className={isIpad9thGeneration ? "ipad-9th-scrollable-section" : "ipad-scrollable-section"}>
                    {/* Hero image section */}
                    <div className="relative h-60 rounded-lg overflow-hidden mb-6">
                      <img 
                        src={attraction.id === "themepark" ? 
                          "https://images.unsplash.com/photo-1560106426-c90d46dedbb8?q=80&w=2574&auto=format&fit=crop" : 
                          attraction.image} 
                        alt={attraction.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <Badge className={`${attraction.buttonColor} text-white`}>
                          {attraction.date}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* About section */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-white/90">About this Experience</h3>
                        <p className="text-white/70">{attraction.description}</p>
                      </div>
                      
                      {/* Features section */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-white/90">Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {attraction.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className={`h-4 w-4 ${attraction.textColor} mt-1`} />
                              <span className="text-white/70">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Ticket options section */}
                      {attraction.ticketTypes && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3 text-white/90">Ticket Options</h3>
                          <div className="space-y-3">
                            {attraction.ticketTypes.map((ticket, idx) => (
                              <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium text-white">{ticket.name}</h4>
                                    <p className="text-sm text-white/60 mt-1">{ticket.description}</p>
                                  </div>
                                  <div className="text-lg font-bold text-white">{formatPrice(ticket.price)}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <DialogFooter className={`border-t border-white/10 pt-3 sm:pt-4 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end mt-4 ${isIpad9thGeneration ? "ipad-9th-dialog-footer" : "ipad-dialog-footer"}`}>
                  <Button 
                    className={`${attraction.buttonColor} text-white text-sm h-9 w-full sm:w-auto safari-button-fix cross-browser-rounded ${isIpad9thGeneration ? "ipad-9th-button-fix" : "ipad-button-fix"}`}
                    onClick={() => {
                      setActiveAttraction(null);
                      attraction.bookingAction();
                    }}
                  >
                    {attraction.icon}
                    <span className="ml-1.5">Book Now</span>
                  </Button>
                </DialogFooter>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
      
    </div>
  );
};

export default Events;
