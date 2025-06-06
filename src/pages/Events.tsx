import { useState, useEffect, useRef, Fragment } from "react";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

// Add a new CSS section for collapsible booking forms
const bookingFormStyles = `
  .booking-form-section {
    margin-top: 1rem;
    overflow: hidden;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    background-color: rgba(12, 30, 60, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .booking-form-header {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .booking-form-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease;
  }

  .booking-form-content.open {
    max-height: 2000px;
    overflow: visible;
    padding: 1rem;
  }

  .booking-form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .booking-form-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .booking-form-section.concert {
    border-color: rgba(236, 72, 153, 0.3);
  }

  .booking-form-section.helicopter {
    border-color: rgba(99, 102, 241, 0.3);
  }

  .booking-form-section.shopping {
    border-color: rgba(245, 158, 11, 0.3);
  }

  .booking-form-section.food {
    border-color: rgba(16, 185, 129, 0.3);
  }

  .booking-form-section.cake {
    border-color: rgba(244, 63, 94, 0.3);
  }
  
  .booking-form-section.concert .booking-form-header {
    background: linear-gradient(90deg, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.1));
  }
  
  .booking-form-section.helicopter .booking-form-header {
    background: linear-gradient(90deg, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.1));
  }
  
  .booking-form-section.shopping .booking-form-header {
    background: linear-gradient(90deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1));
  }
  
  .booking-form-section.food .booking-form-header {
    background: linear-gradient(90deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
  }
  
  .booking-form-section.cake .booking-form-header {
    background: linear-gradient(90deg, rgba(244, 63, 94, 0.1), rgba(225, 29, 72, 0.1));
  }
`;

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
  
  /* Booking Form Fixes for iPad 9th Gen */
  .ipad-9th-gen .booking-form-section {
    border-radius: 16px !important;
    border-width: 2px !important;
    margin-top: 16px !important;
    margin-bottom: 16px !important;
  }
  
  .ipad-9th-gen .booking-form-header {
    padding: 16px !important;
  }
  
  .ipad-9th-gen .booking-form-content.open {
    padding: 16px !important;
  }
  
  .ipad-9th-gen .booking-form-grid {
    gap: 16px !important;
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

// Create a reusable BookingForm component
interface BookingFormProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  accentColor: string;
  textColor: string;
  children: React.ReactNode;
  onProceed?: () => void;
  proceedButtonText?: string;
  disableProceed?: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({
  id,
  title,
  icon,
  isOpen,
  onToggle,
  accentColor,
  textColor,
  children,
  onProceed,
  proceedButtonText = "Book Now",
  disableProceed = false,
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={formRef} id={`booking-form-${id}`} className={`booking-form-section ${id}`}>
      <div className="booking-form-header">
        <div className="flex items-center gap-2">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${accentColor}`}>
            {icon}
          </div>
          <h3 className={`text-lg sm:text-xl font-bold ${textColor}`}>{title}</h3>
        </div>
        <Button 
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-white hover:bg-white/10"
        >
          {isOpen ? <X className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </div>
      <div className={`booking-form-content ${isOpen ? 'open' : ''}`}>
        <div className="booking-form-grid">
          {children}
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={onToggle}
            className="border-white/20 text-white hover:bg-white/10 hover:text-white cross-browser-rounded opacity-100 bg-white/15"
          >
            Cancel
          </Button>
          {onProceed && (
            <Button
              className={`${accentColor} text-white cross-browser-rounded`}
              disabled={disableProceed}
              onClick={onProceed}
            >
              {proceedButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  // Ref for scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
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
  const [openBookingSection, setOpenBookingSection] = useState<string | null>(null);
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
  
  // Function to scroll to a specific element by ID
  const scrollToSection = (elementId: string) => {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        // Use a small offset to account for fixed header
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 300); // Longer timeout to ensure the element is fully rendered
  };
  
  // Function to handle opening booking sections with scrolling
  const handleOpenBookingSection = (section: string) => {
    // If we're closing the current section, scroll back to hero
    if (openBookingSection === section) {
      setOpenBookingSection(null);
      scrollToSection("hero-section");
    } else {
      // Open the new section and scroll to it
      setOpenBookingSection(section);
      scrollToSection(`booking-form-${section}`);
    }
  };
  
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
      bookingAction: () => handleOpenBookingSection("concert")
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
      bookingAction: () => handleOpenBookingSection("helicopter")
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
      bookingAction: () => handleOpenBookingSection("shopping")
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
      bookingAction: () => handleOpenBookingSection("food")
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
      bookingAction: () => handleOpenBookingSection("cake")
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
      bookingAction: () => handleOpenBookingSection("shopping")
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

  return (
    <div className="min-h-screen flex flex-col bg-black" ref={containerRef}>
      <Helmet>
        <title>Rhythm Of Carnival 2025 | Prince Group's Mega Event</title>
        <meta name="description" content="Experience the Rhythm Of Carnival by Prince Group. A 6-day spectacular event from December 21-26, 2025 featuring music, helicopter rides, shopping, and attractions." />
      </Helmet>
      
      {/* Add the booking form styles */}
      <style type="text/css">{bookingFormStyles}</style>
      
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
        <div className="min-h-screen safari-flex-fix pt-4 md:pt-8 lg:pt-10" ref={heroSectionRef} id="hero-section">
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
                        onClick={() => handleOpenBookingSection("concert")}
                      >
                        <MusicIcon className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                        <span className="text-[10px] sm:text-xs md:text-sm">Concert</span>
                      </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-2 lg:grid-cols-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white h-8 sm:h-9 py-0 safari-button-fix cross-browser-rounded"
                      onClick={() => handleOpenBookingSection("helicopter")}
                    >
                      <Plane className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                      <span className="text-[10px] sm:text-xs md:text-sm">Helicopter</span>
                    </Button>
                    
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white h-8 sm:h-9 py-0 safari-button-fix cross-browser-rounded"
                      onClick={() => handleOpenBookingSection("shopping")}
                    >
                      <ShoppingBag className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                      <span className="text-[10px] sm:text-xs md:text-sm">Shopping</span>
                    </Button>
                    
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white h-8 sm:h-9 py-0 safari-button-fix cross-browser-rounded"
                      onClick={() => handleOpenBookingSection("food")}
                    >
                      <Utensils className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                      <span className="text-[10px] sm:text-xs md:text-sm">Food Combo</span>
                    </Button>
                    
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white h-8 sm:h-9 py-0 safari-button-fix cross-browser-rounded"
                      onClick={() => handleOpenBookingSection("cake")}
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
      
      {/* Collapsible Booking Forms Section */}
      <section className="relative w-full bg-[#0c1e3c]/80 backdrop-blur-md py-6">
        <div className="container mx-auto px-3 sm:px-4">
          <AnimatePresence>
            {openBookingSection === "concert" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <div className="booking-form-section concert">
                  <div className="booking-form-header">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-600 to-red-600 flex items-center justify-center">
                        <MusicIcon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-pink-500">Book Concert Tickets</h3>
                    </div>
                    <Button 
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpenBookingSection(null)}
                      className="text-white hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="booking-form-content open">
                    <div className="booking-form-grid">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-white/90">Select Ticket Class</h4>
                        <div className="space-y-3 md:space-y-4">
                          {ticketClasses.map((ticket) => (
                            <div 
                              key={ticket.id} 
                              className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${
                                ticketCategory === ticket.id 
                                  ? 'border-pink-500 bg-pink-500/10'
                                  : 'border-white/10 hover:border-pink-500/50 bg-white/5'
                              }`}
                              onClick={() => {
                                setTicketCategory(ticket.id);
                                setTotalPrice(ticket.price * ticketQuantity);
                              }}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-white text-sm sm:text-base">{ticket.name}</h4>
                                  <p className="text-xs sm:text-sm text-white/60">{ticket.description}</p>
                                </div>
                                <div className="font-bold text-white text-base sm:text-lg">{formatPrice(ticket.price)}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 md:mt-6 bg-pink-900/20 p-3 sm:p-4 rounded-lg border border-pink-500/20">
                          <h4 className="text-xs sm:text-sm font-medium text-pink-300 mb-2">Ticket Benefits:</h4>
                          <ul className="space-y-1.5 sm:space-y-2">
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-400 mt-0.5" />
                              Entry to all concert areas based on ticket class
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-400 mt-0.5" />
                              Access to food and beverage stalls
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-400 mt-0.5" />
                              Official event merchandise discount (10%)
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-400 mt-0.5" />
                              Exclusive entry to after-party (Elite & VVIP only)
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-white/90">Ticket Details</h4>
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="quantity" className="text-white/90">Number of Tickets</Label>
                            <div className="flex mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  decreaseQuantity(setTicketQuantity, ticketQuantity);
                                  if (ticketCategory) {
                                    const ticket = ticketClasses.find(t => t.id === ticketCategory);
                                    if (ticket) {
                                      setTotalPrice((ticketQuantity - 1) * ticket.price);
                                    }
                                  }
                                }}
                                disabled={ticketQuantity <= 1}
                                className="rounded-r-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <div className="flex-1 flex items-center justify-center border-y border-white/20 bg-white/5 text-white">
                                {ticketQuantity}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  increaseQuantity(setTicketQuantity, ticketQuantity, 8);
                                  if (ticketCategory) {
                                    const ticket = ticketClasses.find(t => t.id === ticketCategory);
                                    if (ticket) {
                                      setTotalPrice((ticketQuantity + 1) * ticket.price);
                                    }
                                  }
                                }}
                                disabled={ticketQuantity >= 8}
                                className="rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-white/50 text-sm mt-1">Maximum 8 tickets per booking</p>
                          </div>
                          
                          <div>
                            <Label htmlFor="concert-date" className="text-white/90">Concert Date</Label>
                            <div className="mt-2 p-4 border border-white/20 rounded-lg bg-white/5">
                              <div className="flex items-center gap-3">
                                <CalendarDays className="h-5 w-5 text-pink-500" />
                                <div>
                                  <div className="font-medium text-white">December 21, 2025</div>
                                  <div className="text-sm text-white/60">7:00 PM - 11:00 PM</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-white/90">Concert Details</Label>
                            <div className="mt-2 p-4 border border-white/20 rounded-lg bg-white/5 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-pink-500 mt-0.5" />
                                <span className="text-white/70 text-sm">Main Performer - Singer & Actor: Vijay Antony</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-pink-500 mt-0.5" />
                                <span className="text-white/70 text-sm">Special Performances by Guest Artists</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-pink-500 mt-0.5" />
                                <span className="text-white/70 text-sm">World-class Sound and Lighting System</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-white/90">Summary</Label>
                            <div className="mt-2 p-4 border border-white/20 rounded-lg bg-white/5 space-y-2">
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
                              <div className="pt-2 border-t border-white/20 flex justify-between">
                                <span className="font-medium text-white">Total Amount</span>
                                <span className="font-bold text-pink-400 text-lg">
                                  {totalPrice > 0 ? formatPrice(totalPrice) : "---"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setOpenBookingSection(null)}
                        className="border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white"
                        disabled={!ticketCategory}
                        onClick={() => {
                          // Handle booking logic
                          setOpenBookingSection(null);
                          // Show success message or redirect to payment
                        }}
                      >
                        <Ticket className="mr-1.5 h-3.5 w-3.5" />
                        Proceed to Payment
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {openBookingSection === "helicopter" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <div className="booking-form-section helicopter">
                  <div className="booking-form-header">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                        <Plane className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-indigo-500">Book Helicopter Ride</h3>
                    </div>
                    <Button 
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpenBookingSection(null)}
                      className="text-white hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="booking-form-content open">
                    <div className="booking-form-grid">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-white/90">Select Package</h4>
                        <div className="space-y-3 md:space-y-4">
                          {helicopterPackages.map((pkg) => (
                            <div 
                              key={pkg.id} 
                              className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${
                                selectedHelicopterPackage === pkg.id 
                                  ? 'border-indigo-500 bg-indigo-500/10'
                                  : 'border-white/10 hover:border-indigo-500/50 bg-white/5'
                              }`}
                              onClick={() => setSelectedHelicopterPackage(pkg.id)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-white text-sm sm:text-base">{pkg.name}</h4>
                                  <div className="text-xs sm:text-sm text-indigo-400 font-medium mt-1">{pkg.duration}</div>
                                  <p className="text-xs sm:text-sm text-white/60 mt-1">{pkg.description}</p>
                                </div>
                                <div className="font-bold text-white text-base sm:text-lg">{formatPrice(pkg.price)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 md:mt-6 bg-indigo-900/20 p-3 sm:p-4 rounded-lg border border-indigo-500/20">
                          <h4 className="text-xs sm:text-sm font-medium text-indigo-300 mb-2">Package Includes:</h4>
                          <ul className="space-y-1.5 sm:space-y-2">
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-400 mt-0.5" />
                              Professional pilots with safety briefing
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-400 mt-0.5" />
                              Commemorative certificate
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-400 mt-0.5" />
                              Professional photos available for purchase
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-400 mt-0.5" />
                              Lucky draw entry for 1-day luxury Alappuzha boat house stay
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-white/90 mt-4 md:mt-0">Booking Details</h4>
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
                            <div className="flex mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => decreaseQuantity(setHelicopterTickets, helicopterTickets)}
                                disabled={helicopterTickets <= 1}
                                className="rounded-r-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <div className="flex-1 flex items-center justify-center border-y border-white/20 bg-white/5 text-white">
                                {helicopterTickets}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => increaseQuantity(setHelicopterTickets, helicopterTickets, 4)}
                                disabled={helicopterTickets >= 4}
                                className="rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-white/50 mt-1">Maximum 4 tickets per booking</p>
                          </div>
                          
                          <div>
                            <Label className="text-white/90">Summary</Label>
                            <div className="mt-2 p-4 border border-white/20 rounded-lg bg-white/5 space-y-2">
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
                              <div className="pt-2 border-t border-white/20 flex justify-between">
                                <span className="font-medium text-white">Total Amount</span>
                                <span className="font-bold text-indigo-400 text-lg">
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
                    
                    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setOpenBookingSection(null)}
                        className="border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        disabled={!selectedHelicopterPackage}
                        onClick={() => {
                          // Handle booking logic
                          setOpenBookingSection(null);
                          // Show success message or redirect to payment
                        }}
                      >
                        <Plane className="mr-1.5 h-3.5 w-3.5" />
                        Secure Your Ride
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {openBookingSection === "shopping" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <div className="booking-form-section shopping">
                  <div className="booking-form-header">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-amber-500">Book Shopping Arena Pass</h3>
                    </div>
                    <Button 
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpenBookingSection(null)}
                      className="text-white hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="booking-form-content open">
                    <div className="booking-form-grid">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-white/90">Select Pass Type</h4>
                        <div className="space-y-3 md:space-y-4">
                          <div 
                            className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${
                              true 
                                ? 'border-amber-500 bg-amber-500/10'
                                : 'border-white/10 hover:border-amber-500/50 bg-white/5'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-white text-sm sm:text-base">Shopping Festival Pass</h4>
                                <div className="text-xs sm:text-sm text-amber-400 font-medium mt-1">Full access to all shopping areas</div>
                                <p className="text-xs sm:text-sm text-white/60 mt-1">Access to 300+ stalls, theme park, and entertainment zones</p>
                              </div>
                              <div className="font-bold text-white text-base sm:text-lg">{formatPrice(499)}</div>
                            </div>
                          </div>

                          <div 
                            className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all
                              border-white/10 hover:border-amber-500/50 bg-white/5
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-white text-sm sm:text-base">VIP Shopping Experience</h4>
                                <div className="text-xs sm:text-sm text-amber-400 font-medium mt-1">Premium shopping experience</div>
                                <p className="text-xs sm:text-sm text-white/60 mt-1">Includes priority access, exclusive discounts, and complimentary refreshments</p>
                              </div>
                              <div className="font-bold text-white text-base sm:text-lg">{formatPrice(999)}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-6 bg-amber-900/20 p-3 sm:p-4 rounded-lg border border-amber-500/20">
                          <h4 className="text-xs sm:text-sm font-medium text-amber-300 mb-2">Shopping Festival Features:</h4>
                          <ul className="space-y-1.5 sm:space-y-2">
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 mt-0.5" />
                              300+ curated stalls and shops
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 mt-0.5" />
                              Products from across India
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 mt-0.5" />
                              Live demonstrations and workshops
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400 mt-0.5" />
                              Access to theme park with fun activities
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-white/90 mt-4 md:mt-0">Booking Details</h4>
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="shopping-date" className="text-white/90">Select Date</Label>
                            <Select>
                              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                                <SelectValue placeholder="Select date" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0c1e3c] border-amber-500/20 text-white">
                                <SelectItem value="dec22" className="focus:bg-amber-500/20 focus:text-white">December 22, 2025</SelectItem>
                                <SelectItem value="dec23" className="focus:bg-amber-500/20 focus:text-white">December 23, 2025</SelectItem>
                                <SelectItem value="dec24" className="focus:bg-amber-500/20 focus:text-white">December 24, 2025</SelectItem>
                                <SelectItem value="dec25" className="focus:bg-amber-500/20 focus:text-white">December 25, 2025</SelectItem>
                                <SelectItem value="dec26" className="focus:bg-amber-500/20 focus:text-white">December 26, 2025</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="shopping-adults" className="text-white/90">Number of Adults</Label>
                            <div className="flex mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => decreaseQuantity(setAdultCount, adultCount)}
                                disabled={adultCount <= 1}
                                className="rounded-r-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <div className="flex-1 flex items-center justify-center border-y border-white/20 bg-white/5 text-white">
                                {adultCount}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => increaseQuantity(setAdultCount, adultCount, 10)}
                                disabled={adultCount >= 10}
                                className="rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="shopping-children" className="text-white/90">Number of Children</Label>
                            <div className="flex mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => decreaseQuantity(setChildCount, childCount, 0)}
                                disabled={childCount <= 0}
                                className="rounded-r-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <div className="flex-1 flex items-center justify-center border-y border-white/20 bg-white/5 text-white">
                                {childCount}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => increaseQuantity(setChildCount, childCount, 10)}
                                disabled={childCount >= 10}
                                className="rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-white/50 text-sm mt-1">Children under 5 years enter free</p>
                          </div>
                          
                          <div>
                            <Label className="text-white/90">Summary</Label>
                            <div className="mt-2 p-4 border border-white/20 rounded-lg bg-white/5 space-y-2">
                              <div className="flex justify-between">
                                <span className="text-white/70">Pass Type</span>
                                <span className="font-medium text-white">Shopping Festival Pass</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Adults</span>
                                <span className="font-medium text-white">{adultCount}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Children</span>
                                <span className="font-medium text-white">{childCount}</span>
                              </div>
                              <div className="pt-2 border-t border-white/20 flex justify-between">
                                <span className="font-medium text-white">Total Amount</span>
                                <span className="font-bold text-amber-400 text-lg">
                                  {formatPrice(499 * adultCount)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setOpenBookingSection(null)}
                        className="border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                        onClick={() => {
                          // Handle booking logic
                          setOpenBookingSection(null);
                          // Show success message or redirect to payment
                        }}
                      >
                        <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
                        Purchase Passes
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {openBookingSection === "food" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <div className="booking-form-section food">
                  <div className="booking-form-header">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
                        <Utensils className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-emerald-500">Book Food Combos</h3>
                    </div>
                    <Button 
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpenBookingSection(null)}
                      className="text-white hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="booking-form-content open">
                    <div className="booking-form-grid">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-white/90">Select Food Combo</h4>
                        <div className="space-y-3 md:space-y-4">
                          {foodCombos.map((combo) => (
                            <div 
                              key={combo.id} 
                              className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${
                                selectedFoodCombo === combo.id 
                                  ? 'border-emerald-500 bg-emerald-500/10'
                                  : 'border-white/10 hover:border-emerald-500/50 bg-white/5'
                              }`}
                              onClick={() => setSelectedFoodCombo(combo.id)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-white text-sm sm:text-base">{combo.name}</h4>
                                  <p className="text-xs sm:text-sm text-white/60 mt-1">{combo.description}</p>
                                </div>
                                <div className="font-bold text-white text-base sm:text-lg">{formatPrice(combo.price)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 md:mt-6 bg-emerald-900/20 p-3 sm:p-4 rounded-lg border border-emerald-500/20">
                          <h4 className="text-xs sm:text-sm font-medium text-emerald-300 mb-2">Food Combo Information:</h4>
                          <ul className="space-y-1.5 sm:space-y-2">
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 mt-0.5" />
                              Pre-order to avoid queues at the venue
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 mt-0.5" />
                              Vegetarian and non-vegetarian options available
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 mt-0.5" />
                              Collect from the designated food counters
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 mt-0.5" />
                              Special festival menu available
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-white/90 mt-4 md:mt-0">Order Details</h4>
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="food-preference" className="text-white/90">Food Preference</Label>
                            <Select>
                              <SelectTrigger className="bg-white/5 border-white/20 text-white mt-2">
                                <SelectValue placeholder="Select preference" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0c1e3c] border-emerald-500/20 text-white">
                                <SelectItem value="veg" className="focus:bg-emerald-500/20 focus:text-white">Vegetarian</SelectItem>
                                <SelectItem value="nonveg" className="focus:bg-emerald-500/20 focus:text-white">Non-Vegetarian</SelectItem>
                                <SelectItem value="mixed" className="focus:bg-emerald-500/20 focus:text-white">Mixed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="food-date" className="text-white/90">Pickup Date</Label>
                            <Select>
                              <SelectTrigger className="bg-white/5 border-white/20 text-white mt-2">
                                <SelectValue placeholder="Select date" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0c1e3c] border-emerald-500/20 text-white">
                                <SelectItem value="dec21" className="focus:bg-emerald-500/20 focus:text-white">December 21, 2025</SelectItem>
                                <SelectItem value="dec22" className="focus:bg-emerald-500/20 focus:text-white">December 22, 2025</SelectItem>
                                <SelectItem value="dec23" className="focus:bg-emerald-500/20 focus:text-white">December 23, 2025</SelectItem>
                                <SelectItem value="dec24" className="focus:bg-emerald-500/20 focus:text-white">December 24, 2025</SelectItem>
                                <SelectItem value="dec25" className="focus:bg-emerald-500/20 focus:text-white">December 25, 2025</SelectItem>
                                <SelectItem value="dec26" className="focus:bg-emerald-500/20 focus:text-white">December 26, 2025</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="food-quantity" className="text-white/90">Number of Combos</Label>
                            <div className="flex mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => decreaseQuantity(setFoodComboQuantity, foodComboQuantity)}
                                disabled={foodComboQuantity <= 1}
                                className="rounded-r-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <div className="flex-1 flex items-center justify-center border-y border-white/20 bg-white/5 text-white">
                                {foodComboQuantity}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => increaseQuantity(setFoodComboQuantity, foodComboQuantity, 6)}
                                disabled={foodComboQuantity >= 6}
                                className="rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-white/50 text-sm mt-1">Maximum 6 combos per booking</p>
                          </div>
                          
                          <div>
                            <Label htmlFor="food-notes" className="text-white/90">Special Requests (Optional)</Label>
                            <Input 
                              id="food-notes" 
                              className="mt-2 bg-white/5 border-white/20 text-white focus-visible:ring-emerald-500/40" 
                              placeholder="Any dietary requirements or allergies" 
                            />
                          </div>
                          
                          <div>
                            <Label className="text-white/90">Summary</Label>
                            <div className="mt-2 p-4 border border-white/20 rounded-lg bg-white/5 space-y-2">
                              <div className="flex justify-between">
                                <span className="text-white/70">Combo Type</span>
                                <span className="font-medium text-white">
                                  {selectedFoodCombo 
                                    ? foodCombos.find(c => c.id === selectedFoodCombo)?.name 
                                    : "Select a combo"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Quantity</span>
                                <span className="font-medium text-white">{foodComboQuantity}</span>
                              </div>
                              <div className="pt-2 border-t border-white/20 flex justify-between">
                                <span className="font-medium text-white">Total Amount</span>
                                <span className="font-bold text-emerald-400 text-lg">
                                  {selectedFoodCombo 
                                    ? formatPrice((foodCombos.find(c => c.id === selectedFoodCombo)?.price || 0) * foodComboQuantity) 
                                    : "---"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setOpenBookingSection(null)}
                        className="border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                        disabled={!selectedFoodCombo}
                        onClick={() => {
                          // Handle booking logic
                          setOpenBookingSection(null);
                          // Show success message or redirect to payment
                        }}
                      >
                        <Utensils className="mr-1.5 h-3.5 w-3.5" />
                        Order Food Combo
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {openBookingSection === "cake" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <div className="booking-form-section cake">
                  <div className="booking-form-header">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 flex items-center justify-center">
                        <Gift className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-rose-500">Book Celebration Cake</h3>
                    </div>
                    <Button 
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpenBookingSection(null)}
                      className="text-white hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="booking-form-content open">
                    <div className="booking-form-grid">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 md:mb-4 text-white/90">Select Cake</h4>
                        <div className="space-y-3 md:space-y-4">
                          {cakeOptions.map((cake) => (
                            <div 
                              key={cake.id} 
                              className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${
                                selectedCake === cake.id 
                                  ? 'border-rose-500 bg-rose-500/10'
                                  : 'border-white/10 hover:border-rose-500/50 bg-white/5'
                              }`}
                              onClick={() => setSelectedCake(cake.id)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-white text-sm sm:text-base">{cake.name}</h4>
                                  <p className="text-xs sm:text-sm text-white/60 mt-1">{cake.description}</p>
                                </div>
                                <div className="font-bold text-white text-base sm:text-lg">{formatPrice(cake.price)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 md:mt-6 bg-rose-900/20 p-3 sm:p-4 rounded-lg border border-rose-500/20">
                          <h4 className="text-xs sm:text-sm font-medium text-rose-300 mb-2">Cake Ordering Information:</h4>
                          <ul className="space-y-1.5 sm:space-y-2">
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-400 mt-0.5" />
                              Order at least 24 hours in advance
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-400 mt-0.5" />
                              Custom cake designs available
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-400 mt-0.5" />
                              Collect from the dessert booth at the venue
                            </li>
                            <li className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-white/70">
                              <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-400 mt-0.5" />
                              Perfect for celebrations during the festival
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold mb-4 text-white/90 mt-4 md:mt-0">Cake Details</h4>
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="cake-message" className="text-white/90">Cake Message</Label>
                            <Input 
                              id="cake-message" 
                              className="mt-2 bg-white/5 border-white/20 text-white focus-visible:ring-rose-500/40" 
                              placeholder="E.g., Happy Birthday John!"
                              value={cakeMessage}
                              onChange={(e) => setCakeMessage(e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cake-date" className="text-white/90">Pickup Date</Label>
                            <Select>
                              <SelectTrigger className="bg-white/5 border-white/20 text-white mt-2">
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
                          
                          <div>
                            <Label htmlFor="cake-time" className="text-white/90">Pickup Time</Label>
                            <Select>
                              <SelectTrigger className="bg-white/5 border-white/20 text-white mt-2">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#0c1e3c] border-rose-500/20 text-white">
                                <SelectItem value="11am" className="focus:bg-rose-500/20 focus:text-white">11:00 AM</SelectItem>
                                <SelectItem value="12pm" className="focus:bg-rose-500/20 focus:text-white">12:00 PM</SelectItem>
                                <SelectItem value="1pm" className="focus:bg-rose-500/20 focus:text-white">1:00 PM</SelectItem>
                                <SelectItem value="2pm" className="focus:bg-rose-500/20 focus:text-white">2:00 PM</SelectItem>
                                <SelectItem value="3pm" className="focus:bg-rose-500/20 focus:text-white">3:00 PM</SelectItem>
                                <SelectItem value="4pm" className="focus:bg-rose-500/20 focus:text-white">4:00 PM</SelectItem>
                                <SelectItem value="5pm" className="focus:bg-rose-500/20 focus:text-white">5:00 PM</SelectItem>
                                <SelectItem value="6pm" className="focus:bg-rose-500/20 focus:text-white">6:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="cake-quantity" className="text-white/90">Quantity</Label>
                            <div className="flex mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => decreaseQuantity(setCakeQuantity, cakeQuantity)}
                                disabled={cakeQuantity <= 1}
                                className="rounded-r-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <div className="flex-1 flex items-center justify-center border-y border-white/20 bg-white/5 text-white">
                                {cakeQuantity}
                              </div>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => increaseQuantity(setCakeQuantity, cakeQuantity, 3)}
                                disabled={cakeQuantity >= 3}
                                className="rounded-l-none border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-white/50 text-sm mt-1">Maximum 3 cakes per booking</p>
                          </div>
                          
                          <div>
                            <Label className="text-white/90">Summary</Label>
                            <div className="mt-2 p-4 border border-white/20 rounded-lg bg-white/5 space-y-2">
                              <div className="flex justify-between">
                                <span className="text-white/70">Cake Type</span>
                                <span className="font-medium text-white">
                                  {selectedCake 
                                    ? cakeOptions.find(c => c.id === selectedCake)?.name 
                                    : "Select a cake"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Message</span>
                                <span className="font-medium text-white line-clamp-1">
                                  {cakeMessage || "Not specified"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Quantity</span>
                                <span className="font-medium text-white">{cakeQuantity}</span>
                              </div>
                              <div className="pt-2 border-t border-white/20 flex justify-between">
                                <span className="font-medium text-white">Total Amount</span>
                                <span className="font-bold text-rose-400 text-lg">
                                  {selectedCake 
                                    ? formatPrice((cakeOptions.find(c => c.id === selectedCake)?.price || 0) * cakeQuantity) 
                                    : "---"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setOpenBookingSection(null)}
                        className="border-white/20 text-white hover:bg-white/10 hover:text-white opacity-100 bg-white/15"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                        disabled={!selectedCake}
                        onClick={() => {
                          // Handle booking logic
                          setOpenBookingSection(null);
                          // Show success message or redirect to payment
                        }}
                      >
                        <Gift className="mr-1.5 h-3.5 w-3.5" />
                        Order Cake
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Event Details Section */}
      <section className="bg-[#0e1b36] py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col items-center justify-center mb-10">
            <Badge className="bg-[#4eb4a7]/20 text-[#4eb4a7] border-none backdrop-blur-sm py-1 px-4 mb-6 text-sm">
              EVENT DETAILS
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-6">
              The Ultimate Festival Experience
            </h2>
            <p className="text-white/70 text-center max-w-3xl mx-auto text-sm sm:text-base">
              Prince Group's Rhythm of Carnival brings you 6 days of non-stop entertainment, shopping, 
              and unique experiences at Kanyakumari's biggest festival of 2025!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Event Date Card */}
            <div className="bg-[#0c1e3c]/80 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="h-14 w-14 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center mb-5">
                <CalendarDays className="h-7 w-7 text-[#4eb4a7]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Event Date</h3>
              <p className="text-white/70">December 21-26, 2025</p>
            </div>
            
            {/* Location Card */}
            <div className="bg-[#0c1e3c]/80 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="h-14 w-14 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center mb-5">
                <MapPin className="h-7 w-7 text-[#4eb4a7]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Location</h3>
              <p className="text-white/70">Kanyakumari, Tamil Nadu</p>
            </div>
            
            {/* Attendees Card */}
            <div className="bg-[#0c1e3c]/80 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="h-14 w-14 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center mb-5">
                <Users className="h-7 w-7 text-[#4eb4a7]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Attendees</h3>
              <p className="text-white/70">Expected 10,000+</p>
            </div>
            
            {/* Registered Card */}
            <div className="bg-[#0c1e3c]/80 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="h-14 w-14 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center mb-5">
                <Ticket className="h-7 w-7 text-[#4eb4a7]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Registered</h3>
              <p className="text-white/70">30,000+ Tickets</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Attractions Section */}
      <section className="bg-[#0c1b30] py-16" id="attractions">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col items-center justify-center mb-12">
            <Badge className="bg-[#4eb4a7]/20 text-[#4eb4a7] border-none backdrop-blur-sm py-1 px-4 mb-6 text-sm">
              ATTRACTIONS
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-6">
              Key Festival Attractions
            </h2>
            <p className="text-white/70 text-center max-w-3xl mx-auto text-sm sm:text-base">
              Discover all the exciting experiences waiting for you at Rhythm of Carnival.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Live Concert Card */}
            <div className="rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-pink-600 to-red-600 h-48 relative">
                <Badge className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white border-none">
                  Featured
                </Badge>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                  <MusicIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="bg-[#0c1e3c] p-5">
                <h3 className="text-2xl font-bold text-pink-500 mb-2">Live Concert</h3>
                <p className="text-white/70 mb-4">Experience the electrifying performance by Vijay Antony and other top artists</p>
                
                <div className="space-y-2 mb-5">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5" />
                    <p className="text-white/70 text-sm">World-class sound and light system</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-pink-500 mt-0.5" />
                    <p className="text-white/70 text-sm">Multiple seating options available</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    onClick={() => handleOpenBookingSection("concert")}
                    className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white"
                  >
                    <MusicIcon className="mr-2 h-4 w-4" />
                    Book Tickets
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/10">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Helicopter Card */}
            <div className="rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-48 relative">
                <Badge className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white border-none">
                  Featured
                </Badge>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Plane className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="bg-[#0c1e3c] p-5">
                <h3 className="text-2xl font-bold text-indigo-500 mb-2">Helicopter Ride</h3>
                <p className="text-white/70 mb-4">Experience breathtaking aerial views of Kanyakumari from above</p>
                
                <div className="space-y-2 mb-5">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <p className="text-white/70 text-sm">Panoramic views of the Arabian Sea, Bay of Bengal and Indian Ocean</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <p className="text-white/70 text-sm">Professional pilots with safety briefing</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    onClick={() => handleOpenBookingSection("helicopter")}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  >
                    <Plane className="mr-2 h-4 w-4" />
                    Book Tickets
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/10">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Shopping Festival Card */}
            <div className="rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-48 relative">
                <Badge className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white border-none">
                  Featured
                </Badge>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="bg-[#0c1e3c] p-5">
                <h3 className="text-2xl font-bold text-amber-500 mb-2">Shopping Festival</h3>
                <p className="text-white/70 mb-4">Explore over 300 stalls with a wide range of products and exclusive offers</p>
                
                <div className="space-y-2 mb-5">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <p className="text-white/70 text-sm">300+ curated stalls and shops</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <p className="text-white/70 text-sm">Exclusive festival discounts</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    onClick={() => handleOpenBookingSection("shopping")}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Book Tickets
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/10">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Food Combo Card */}
            <div className="rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-48 relative">
                <Badge className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white border-none">
                  Featured
                </Badge>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Utensils className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="bg-[#0c1e3c] p-5">
                <h3 className="text-2xl font-bold text-emerald-500 mb-2">Food Combo</h3>
                <p className="text-white/70 mb-4">Pre-book your food packages for the festival day</p>
                
                <div className="space-y-2 mb-5">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <p className="text-white/70 text-sm">Pre-book to avoid queues</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <p className="text-white/70 text-sm">Multiple cuisine options</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    onClick={() => handleOpenBookingSection("food")}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                  >
                    <Utensils className="mr-2 h-4 w-4" />
                    Book Tickets
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/10">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Cake Pre-Booking Card */}
            <div className="rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-rose-500 to-pink-600 h-48 relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Gift className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="bg-[#0c1e3c] p-5">
                <h3 className="text-2xl font-bold text-rose-500 mb-2">Cake Pre-Booking</h3>
                <p className="text-white/70 mb-4">Pre-order celebration cakes for your special moments at the festival</p>
                
                <div className="space-y-2 mb-5">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-rose-500 mt-0.5" />
                    <p className="text-white/70 text-sm">Custom designs available</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-rose-500 mt-0.5" />
                    <p className="text-white/70 text-sm">Multiple flavors to choose from</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    onClick={() => handleOpenBookingSection("cake")}
                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                  >
                    <Gift className="mr-2 h-4 w-4" />
                    Book Tickets
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/10">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Theme Park Card */}
            <div className="rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-48 relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="bg-[#0c1e3c] p-5">
                <h3 className="text-2xl font-bold text-blue-500 mb-2">Theme Park</h3>
                <p className="text-white/70 mb-4">Enjoy thrilling rides and fun activities for all ages</p>
                
                <div className="space-y-2 mb-5">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <p className="text-white/70 text-sm">Various rides for all age groups</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <p className="text-white/70 text-sm">Games and entertainment</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    onClick={() => handleOpenBookingSection("shopping")}
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Book Tickets
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/10">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
