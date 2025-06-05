import { useState, useEffect, useRef } from "react";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  MessageCircle, 
  Building, 
  Users, 
  Calendar, 
  Headphones, 
  ChevronRight, 
  ExternalLink,
  MessagesSquare,
  Heart,
  Star,
  ThumbsUp,
  ArrowRight,
  ChevronUp
} from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
// Leaflet imports
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiry: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("message");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const mapRef = useRef(null);

  // Fix Leaflet icon issue
  useEffect(() => {
    // Fix Leaflet default icon issue
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3790/3790810.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35]
  });

  // Create branch marker icons with different colors based on type
  const createBranchIcon = (type: 'headquarter' | 'main' | 'regular') => {
    const colors = {
      headquarter: '#4eb4a7',
      main: '#60afb4',
      regular: '#85cbc3'
    };
    
    // Create animation style based on branch type
    const animationStyle = type === 'headquarter' 
      ? 'animation: pulse 1.5s infinite, float 3s ease-in-out infinite;' 
      : type === 'main' 
        ? 'animation: float 3s ease-in-out infinite;' 
        : '';
    
    // Create a custom div icon with more innovative styling
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          ${type === 'headquarter' || type === 'main' ? 'animation: float 3s ease-in-out infinite;' : ''}
        ">
          ${type === 'headquarter' ? `
          <div style="
            position: absolute;
            top: 18px;
            left: 18px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: transparent;
            border: 2px solid rgba(78, 180, 167, 0.6);
            animation: pulse-ring 2s infinite;
            z-index: -1;
          "></div>
          ` : ''}
          <div style="
            background-color: ${colors[type]}; 
            width: 36px; 
            height: 36px; 
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 4px solid white;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8px;
            ${type === 'headquarter' ? 'animation: pulse 1.5s infinite;' : ''}
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-weight: bold;
              font-size: 14px;
              font-family: Arial, sans-serif;
            ">
              ${type === 'headquarter' ? 'HQ' : (type === 'main' ? 'M' : '<span style="font-size:10px;">●</span>')}
            </div>
          </div>
          <div style="
            position: absolute;
            top: 36px;
            width: 10px;
            height: 10px;
            background: rgba(0,0,0,0.15);
            border-radius: 50%;
            transform: translateX(-50%);
            filter: blur(2px);
          "></div>
        </div>
      `,
      iconSize: [40, 50],
      iconAnchor: [20, 40],
      popupAnchor: [0, -35]
    });
  };

  // Prince Group branch locations (expanded to 20 branches)
  const branches = [
    { id: 1, name: "Thingal Nager HQ", position: [8.1845, 77.4120], address: "Thingal Nager, Nagercoil, Tamil Nadu, India - 629001", type: 'headquarter' },
    { id: 2, name: "Marthandam Branch", position: [8.3062, 77.2190], address: "Main Road, Marthandam", type: 'main' },
    { id: 3, name: "Thuckalay Branch", position: [8.2539, 77.2638], address: "Main Street, Thuckalay", type: 'main' },
    { id: 4, name: "Colachel Branch", position: [8.1722, 77.2587], address: "Beach Road, Colachel", type: 'regular' },
    { id: 5, name: "Kuzhithurai Branch", position: [8.3180, 77.1966], address: "Main Road, Kuzhithurai", type: 'regular' },
    { id: 6, name: "Kanyakumari Branch", position: [8.0883, 77.5385], address: "Beach Road, Kanyakumari", type: 'main' },
    { id: 7, name: "Thiruvattar Branch", position: [8.3427, 77.2778], address: "Temple Road, Thiruvattar", type: 'regular' },
    { id: 8, name: "Eraniel Branch", position: [8.2083, 77.3167], address: "Main Road, Eraniel", type: 'regular' },
    { id: 9, name: "Padmanabhapuram Branch", position: [8.2508, 77.3258], address: "Palace Road, Padmanabhapuram", type: 'regular' },
    { id: 10, name: "Karungal Branch", position: [8.2397, 77.1961], address: "Main Street, Karungal", type: 'regular' },
    { id: 11, name: "Monday Market Branch", position: [8.1775, 77.4188], address: "Market Street, Nagercoil", type: 'regular' },
    { id: 12, name: "Azhagiyamandapam Branch", position: [8.1431, 77.4456], address: "Main Road, Azhagiyamandapam", type: 'regular' },
    { id: 13, name: "Parvathipuram Branch", position: [8.1998, 77.4235], address: "College Road, Parvathipuram", type: 'regular' },
    { id: 14, name: "Susindram Branch", position: [8.1458, 77.4839], address: "Temple Road, Susindram", type: 'regular' },
    { id: 15, name: "Valliyoor Branch", position: [8.3826, 77.6054], address: "Main Road, Valliyoor", type: 'regular' },
    { id: 16, name: "Aralvaimozhi Branch", position: [8.2515, 77.5429], address: "Railway Road, Aralvaimozhi", type: 'regular' },
    { id: 17, name: "Kaliyakkavilai Branch", position: [8.3413, 77.1485], address: "Market Road, Kaliyakkavilai", type: 'regular' },
    { id: 18, name: "Mulagumoodu Branch", position: [8.2149, 77.2191], address: "Main Road, Mulagumoodu", type: 'regular' },
    { id: 19, name: "Kaliyal Branch", position: [8.2752, 77.1841], address: "Junction Road, Kaliyal", type: 'regular' },
    { id: 20, name: "Netta Branch", position: [8.2054, 77.3561], address: "Main Street, Netta", type: 'regular' },
  ];

  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(formData);
      
      toast({
        title: "Message Sent Successfully",
        description: "We've received your message and will get back to you soon.",
        action: (
          <div className="h-8 w-8 bg-[#4eb4a7]/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-[#4eb4a7]" />
          </div>
        ),
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiry: "general"
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  // Contact details
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-white" />,
      title: "Our Headquarters",
      content: "Thingal Nager, Nagercoil, Tamil Nadu, India - 629001",
      color: "from-[#4eb4a7] to-[#85cbc3]"
    },
    {
      icon: <Phone className="h-6 w-6 text-white" />,
      title: "Phone",
      content: "+91 9150537718, +91 9385722102",
      color: "from-[#60afb4] to-[#4eb4a7]"
    },
    {
      icon: <Mail className="h-6 w-6 text-white" />,
      title: "Email",
      content: "info@princegroup.com",
      color: "from-[#85cbc3] to-[#60afb4]"
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Working Hours",
      content: "Monday to Friday: 9am to 6pm\nSaturday: 9am to 2pm\nSunday: Closed",
      color: "from-[#4eb4a7] to-[#60afb4]"
    }
  ];

  // Inquiry types
  const inquiryTypes = [
    { id: "general", name: "General Inquiry", icon: <MessageCircle className="h-5 w-5" /> },
    { id: "documentation", name: "Documentation Services", icon: <Building className="h-5 w-5" /> },
    { id: "loans", name: "Loan Services", icon: <Users className="h-5 w-5" /> },
    { id: "events", name: "Event Registration", icon: <Calendar className="h-5 w-5" /> },
    { id: "support", name: "Technical Support", icon: <Headphones className="h-5 w-5" /> }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      content: "Prince Group's documentation services have made my business registration process seamless. Their team is responsive and professional.",
      avatar: "RK",
      icon: <ThumbsUp className="h-4 w-4" />
    },
    {
      name: "Priya Suresh",
      role: "Homeowner",
      content: "I got my home loan processed through Prince Group in record time. Their competitive rates and transparent process made the experience stress-free.",
      avatar: "PS",
      icon: <Heart className="h-4 w-4" />
    },
    {
      name: "Mohan Krishnan",
      role: "Regular Customer",
      content: "I've been using Prince Group's services for over 5 years now. Their customer support is exemplary and always ready to help.",
      avatar: "MK",
      icon: <Star className="h-4 w-4" />
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fdfc] via-white to-[#f0faf9]">
      <Helmet>
        <title>Contact Us - Prince Group</title>
        <meta name="description" content="Get in touch with Prince Group for documentation and loan services in Kanyakumari. We're here to help you with all your needs." />
        {/* Add custom CSS for map markers */}
        <style>
          {`
            .custom-div-icon {
              background: none;
              border: none;
            }
            .leaflet-marker-icon {
              background: none !important;
              border: none !important;
            }
            @keyframes pulse {
              0% {
                box-shadow: 0 0 0 0 rgba(78, 180, 167, 0.7);
              }
              70% {
                box-shadow: 0 0 0 10px rgba(78, 180, 167, 0);
              }
              100% {
                box-shadow: 0 0 0 0 rgba(78, 180, 167, 0);
              }
            }
            @keyframes float {
              0% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-5px);
              }
              100% {
                transform: translateY(0px);
              }
            }
            @keyframes pulse-ring {
              0% {
                transform: translate(-50%, 0) scale(0.8);
                opacity: 0.8;
              }
              70% {
                transform: translate(-50%, 0) scale(1.5);
                opacity: 0;
              }
              100% {
                transform: translate(-50%, 0) scale(0.8);
                opacity: 0;
              }
            }
          `}
        </style>
      </Helmet>
      <MainNavbar />
      
      <main className="flex-grow">
        {/* Hero Section with Improved Alignment */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] mt-16">
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated waves */}
            <div className="absolute bottom-0 left-0 w-full">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto opacity-10">
                  <path fill="#ffffff" d="M0,192L48,186.7C96,181,192,171,288,186.7C384,203,480,245,576,256C672,267,768,245,864,224C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
              </motion.div>
            </div>
            
            {/* Floating circles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: Math.random() * 200 + 50,
                  height: Math.random() * 200 + 50,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  filter: "blur(40px)"
                }}
                animate={{
                  y: [0, Math.random() * 60 - 30],
                  x: [0, Math.random() * 60 - 30],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 pt-24 pb-24 relative z-10">
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto"
              >
                <Badge className="bg-white/20 text-white px-4 py-1.5 mb-6 backdrop-blur-sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  We're Here To Help
                </Badge>
                
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  Let's Connect
                </h1>
                
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Our team is ready to assist you with all your documentation and loan service needs.
                </p>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Button
                    size="lg"
                    className="bg-white text-[#4eb4a7] hover:bg-white/90 px-8 rounded-full w-full sm:w-auto"
                    onClick={() => {
                      const contactForm = document.getElementById('contact-form');
                      contactForm?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Send a Message
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Curved bottom separator */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,128L80,117.3C160,107,320,85,480,96C640,107,800,149,960,154.7C1120,160,1280,128,1360,112L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>
        
        {/* Contact Info Cards - 4 columns */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="transform transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full border border-[#4eb4a7]/10">
                    <div className={`p-5 bg-gradient-to-r ${info.color}`}>
                      <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
                        {info.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{info.title}</h3>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-700 whitespace-pre-line">{info.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Full-width Interactive Map Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 mb-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <Badge className="bg-[#4eb4a7]/10 text-[#4eb4a7] px-3 py-1 mb-4">
                OUR LOCATIONS
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                  Find Us Across Kanyakumari
                </span>
              </h2>
              <p className="text-lg text-gray-600">
                With over 20 branches throughout the district, we're always close by to serve you.
              </p>
            </div>
          </div>
          
          {/* Full-width map container */}
          <div className="w-full h-[500px] md:h-[600px] relative z-10 shadow-xl border-y border-[#4eb4a7]/10 overflow-hidden rounded-lg">
            {/* Map Legend */}
            <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-[#4eb4a7]/20">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Branch Types</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#4eb4a7] border-2 border-white"></div>
                  <span className="text-xs text-gray-700">Headquarters</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#60afb4] border-2 border-white"></div>
                  <span className="text-xs text-gray-700">Main Branch</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#85cbc3] border-2 border-white"></div>
                  <span className="text-xs text-gray-700">Regular Branch</span>
                </div>
              </div>
            </div>
            
            <MapContainer 
              center={[8.2100, 77.3500] as [number, number]} 
              zoom={10} 
              style={{ height: '100%', width: '100%' }}
              ref={mapRef}
              scrollWheelZoom={true}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {branches.map((branch) => (
                <Marker 
                  key={branch.id} 
                  position={branch.position as [number, number]}
                  icon={createBranchIcon(branch.type as 'headquarter' | 'main' | 'regular')}
                >
                  <Popup>
                    <div className="p-1">
                      <h3 className="font-bold text-[#4eb4a7]">{branch.name}</h3>
                      <p className="text-sm">{branch.address}</p>
                      {branch.type === 'headquarter' && (
                        <Badge className="mt-2 bg-[#4eb4a7]/10 text-[#4eb4a7]">Headquarters</Badge>
                      )}
                      {branch.type === 'main' && (
                        <Badge className="mt-2 bg-[#60afb4]/10 text-[#60afb4]">Main Branch</Badge>
                      )}
                      {branch.type === 'regular' && (
                        <Badge className="mt-2 bg-[#85cbc3]/10 text-[#85cbc3]">Branch Office</Badge>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </section>

        {/* Contact Form Section - Redesigned */}
        <section id="contact-form" className="py-20 bg-gradient-to-br from-[#f8fdfc] via-white to-[#f0faf9]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Form Column - Wider */}
                <div className="lg:col-span-2">
                  <motion.div
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div className="mb-8">
                      <Badge className="bg-[#4eb4a7]/10 text-[#4eb4a7] px-3 py-1 mb-4">
                        GET IN TOUCH
                      </Badge>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                          How Can We Help You?
                        </span>
                      </h2>
                      <p className="text-lg text-gray-600">
                        Fill out the form below, and our team will get back to you promptly.
                      </p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white rounded-2xl overflow-hidden shadow-xl border border-[#4eb4a7]/10">
                      <TabsList className="w-full grid grid-cols-2 p-0 bg-gray-50 border-b border-[#4eb4a7]/10">
                        <TabsTrigger 
                          value="message" 
                          className="py-4 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-[#4eb4a7] data-[state=active]:border-b-2 data-[state=active]:border-[#4eb4a7]"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Send Message
                        </TabsTrigger>
                        <TabsTrigger 
                          value="call" 
                          className="py-4 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:text-[#4eb4a7] data-[state=active]:border-b-2 data-[state=active]:border-[#4eb4a7]"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Request a Call
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="message" className="m-0 p-6">
                        <form onSubmit={handleSubmit}>
                          <div className="grid grid-cols-1 gap-6 mb-6">
                            <div>
                              <label htmlFor="inquiry" className="block text-gray-700 mb-2 font-medium">
                                Inquiry Type
                              </label>
                              <Select 
                                value={formData.inquiry} 
                                onValueChange={(value) => handleSelectChange("inquiry", value)}
                              >
                                <SelectTrigger className="border-gray-200">
                                  <SelectValue placeholder="Select inquiry type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {inquiryTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.id} className="flex items-center">
                                      <div className="flex items-center gap-2">
                                        <span className="text-[#4eb4a7]">{type.icon}</span>
                                        <span>{type.name}</span>
                  </div>
                                    </SelectItem>
                ))}
                                </SelectContent>
                              </Select>
              </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                            Full Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="border-gray-200"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="border-gray-200"
                            required
                          />
                        </div>
                      </div>
                            
                            <div>
                        <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                          className="border-gray-200"
                        />
                      </div>
                            
                            <div>
                        <label htmlFor="subject" className="block text-gray-700 mb-2 font-medium">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          className="border-gray-200"
                          required
                        />
                      </div>
                            
                            <div>
                        <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">
                                Your Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                                placeholder="Please provide details about your inquiry..."
                          rows={5}
                          className="border-gray-200 resize-none"
                          required
                        />
                      </div>
                          </div>
                          
                      <Button 
                        type="submit" 
                            className="w-full bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] hover:from-[#3da296] hover:to-[#4e9da3] text-white flex items-center justify-center gap-2 py-6 rounded-xl"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : (
                          <>
                            Send Message
                                <Send className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </Button>
                          
                          <p className="text-xs text-gray-500 mt-4 text-center">
                        By submitting this form, you agree to our privacy policy and terms of service.
                      </p>
                    </form>
                      </TabsContent>
                      
                      <TabsContent value="call" className="m-0 p-6">
                        <form onSubmit={handleSubmit}>
                          <div className="space-y-6 mb-6">
                            <div>
                              <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                                Full Name
                              </label>
                              <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="border-gray-200"
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">
                                Phone Number
                              </label>
                              <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Your phone number"
                                className="border-gray-200"
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="inquiry" className="block text-gray-700 mb-2 font-medium">
                                Inquiry About
                              </label>
                              <Select 
                                value={formData.inquiry} 
                                onValueChange={(value) => handleSelectChange("inquiry", value)}
                              >
                                <SelectTrigger className="border-gray-200">
                                  <SelectValue placeholder="Select inquiry type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {inquiryTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.id}>
                                      <div className="flex items-center gap-2">
                                        <span className="text-[#4eb4a7]">{type.icon}</span>
                                        <span>{type.name}</span>
                  </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                </div>

                <div>
                              <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">
                                Additional Information
                              </label>
                              <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Let us know the best time to call you and any specific details about your inquiry..."
                                rows={4}
                                className="border-gray-200 resize-none"
                              />
                            </div>
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] hover:from-[#3da296] hover:to-[#4e9da3] text-white flex items-center justify-center gap-2 py-6 rounded-xl"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Submitting...' : (
                              <>
                                Request a Call Back
                                <Phone className="h-4 w-4 ml-1" />
                              </>
                            )}
                          </Button>
                          
                          <p className="text-xs text-gray-500 mt-4 text-center">
                            Our team will call you back within 24 business hours.
                          </p>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                  </div>

                {/* Testimonials Section */}
                <div className="lg:col-span-1">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-8"
                  >
                    <motion.div variants={itemVariants}>
                      <div className="mb-6">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">What Our Clients Say</h3>
                        <p className="text-gray-600">
                          Trusted by thousands of customers across Kanyakumari district.
                        </p>
                      </div>
                      
                    <div className="space-y-4">
                        {testimonials.map((testimonial, index) => (
                          <Card key={index} className="bg-white border border-[#4eb4a7]/10 shadow-md hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] flex items-center justify-center text-white font-bold text-lg">
                                  {testimonial.avatar}
                      </div>
                      <div>
                                  <div className="flex items-center mb-1">
                                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                                    <Badge className="ml-2 bg-[#4eb4a7]/10 text-[#4eb4a7] hover:bg-[#4eb4a7]/20">
                                      <div className="flex items-center gap-1">
                                        {testimonial.icon}
                                        {testimonial.role}
                                      </div>
                                    </Badge>
                                  </div>
                                  <p className="text-gray-600 text-sm">{testimonial.content}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      <div className="mt-4 text-center">
                        <Button 
                          variant="link" 
                          className="text-[#4eb4a7] hover:text-[#3da296] flex items-center justify-center mx-auto"
                        >
                          View More Testimonials
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  Ready to Experience Our Services?
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Whether you need documentation services, loans, or just have a question, we're here to help.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-[#4eb4a7] hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all px-8 py-6 rounded-full"
                    onClick={() => {
                      const contactForm = document.getElementById('contact-form');
                      contactForm?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <MessagesSquare className="mr-2 h-5 w-5" />
                    Contact Us Now
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-[#4eb4a7] text-white shadow-lg flex items-center justify-center z-50 hover:bg-[#3da296] transition-colors"
              onClick={scrollToTop}
            >
              <ChevronUp className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
      <MainFooter />
    </div>
  );
};

export default Contact;
