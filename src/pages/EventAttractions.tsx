import { motion } from "framer-motion";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Ticket, 
  ShoppingBag,
  CalendarDays, 
  Clock, 
  MapPin,
  Sparkles,
  Plane, // Replacing Helicopter since it's not available in lucide-react
  Gamepad2,
  Waves,
  Cat,
  Fish,
  Utensils,
  Gift,
  Store,
  CheckCircle,
  Star,
  Info
} from "lucide-react";

// Define types for our attractions and card props
interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  category: 'premium' | 'general' | 'shopping' | 'dining';
  details: string[];
}

interface AttractionCardProps {
  attraction: Attraction;
}

// Attraction Card Component
const AttractionCard = ({ attraction }: AttractionCardProps) => {
  const categoryColors = {
    premium: {
      bg: "bg-gradient-to-br from-blue-500/80 to-purple-600/80",
      text: "text-white",
      badge: "bg-white/20 text-white"
    },
    general: {
      bg: "bg-gradient-to-br from-[#60afb4]/80 to-[#85cbc3]/80",
      text: "text-white",
      badge: "bg-white/20 text-white"
    },
    shopping: {
      bg: "bg-gradient-to-br from-amber-500/80 to-orange-600/80",
      text: "text-white",
      badge: "bg-white/20 text-white"
    },
    dining: {
      bg: "bg-gradient-to-br from-emerald-500/80 to-green-600/80",
      text: "text-white",
      badge: "bg-white/20 text-white"
    }
  };
  
  const colors = categoryColors[attraction.category];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ translateY: -8 }}
    >
      <Card className="overflow-hidden h-full">
        <div className={`h-48 relative ${colors.bg}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            {attraction.icon}
          </div>
          <div className="absolute top-4 right-4">
            <Badge className={colors.badge}>
              {attraction.category === "premium" ? "Premium" : 
               attraction.category === "shopping" ? "Shopping" : 
               attraction.category === "dining" ? "Dining" : "Included"}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{attraction.name}</h3>
          <p className="text-gray-600 mb-4">{attraction.description}</p>
          
          <div className="space-y-2">
            {attraction.details.map((detail, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="text-[#60afb4] mt-0.5 h-4 w-4 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{detail}</span>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="px-6 pb-6 pt-0">
          {attraction.category === "premium" ? (
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              Pre-Book Now
            </Button>
          ) : (
            <Button className="w-full bg-gradient-to-r from-[#60afb4] to-[#85cbc3] text-white">
              Included With Pass
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const EventAttractions = () => {
  // Attractions Data
  const attractionsData: Attraction[] = [
    {
      id: "helicopter",
      name: "Helicopter Ride",
      description: "Experience breathtaking aerial views of Kanyakumari from above",
      image: "/path-to-helicopter-image.jpg", // Replace with actual path
      icon: <Plane className="h-10 w-10" />,
      category: "premium",
      details: [
        "Only for pre-booked ticket holders (limited to 10,000 slots)",
        "Available for 2 days",
        "Prince Group Membership Winners will receive prizes from Vijay Antony and join him on the helicopter trip",
        "Special Lucky Draw: 100 lucky winners will receive a luxury Alappuzha boat house 1 day stay trip"
      ]
    },
    {
      id: "themepark",
      name: "Theme Park Area",
      description: "Fun rides and attractions for all ages",
      image: "/path-to-themepark-image.jpg", // Replace with actual path
      icon: <Gamepad2 className="h-10 w-10" />,
      category: "general",
      details: [
        "Multiple rides for both children and adults",
        "Games and entertainment activities",
        "Safe and monitored by professional staff",
        "Included with shopping arena entry"
      ]
    },
    {
      id: "watergames",
      name: "Water Games",
      description: "Splash, play and cool off with various water activities",
      image: "/path-to-watergames-image.jpg", // Replace with actual path
      icon: <Waves className="h-10 w-10" />,
      category: "general",
      details: [
        "Water slides and splash zones",
        "Water balloon activities",
        "Suitable for all ages",
        "Changing facilities available"
      ]
    },
    {
      id: "pettingzoo",
      name: "Petting Zoo",
      description: "Get up close with friendly animals in a safe environment",
      image: "/path-to-pettingzoo-image.jpg", // Replace with actual path
      icon: <Cat className="h-10 w-10" />,
      category: "general",
      details: [
        "Variety of friendly animals to interact with",
        "Educational information about each animal",
        "Supervised by trained handlers",
        "Safe for children of all ages"
      ]
    },
    {
      id: "aquarium",
      name: "Aquarium Displays & Sale",
      description: "Explore the underwater world and purchase exotic fish",
      image: "/path-to-aquarium-image.jpg", // Replace with actual path
      icon: <Fish className="h-10 w-10" />,
      category: "shopping",
      details: [
        "Displays of exotic freshwater and marine fish",
        "Aquarium setups and equipment for sale",
        "Expert advice on fish keeping",
        "Special discounts for event attendees"
      ]
    },
    {
      id: "foodcourt",
      name: "Food Court",
      description: "Diverse culinary experiences with exotic and local cuisines",
      image: "/path-to-foodcourt-image.jpg", // Replace with actual path
      icon: <Utensils className="h-10 w-10" />,
      category: "dining",
      details: [
        "Wide range of exotic and local cuisines",
        "Vegetarian and non-vegetarian options",
        "Hygienic preparation and serving",
        "Comfortable seating areas"
      ]
    },
    {
      id: "toysstore",
      name: "Toys Store",
      description: "Special merchandise and souvenirs to remember the event",
      image: "/path-to-toysstore-image.jpg", // Replace with actual path
      icon: <Gift className="h-10 w-10" />,
      category: "shopping",
      details: [
        "Exclusive event merchandise",
        "Toys and gifts for all ages",
        "Souvenirs to commemorate your visit",
        "Special promotions throughout the event days"
      ]
    }
  ];
  
  // Exhibition Zone Data
  const exhibitionData = {
    stalls: 300,
    area: "30,000 sq. ft",
    timing: "9:00 AM to 10:00 PM",
    categories: "Food, Entertainment, Pets, Aquariums, Exotic Products, etc.",
    environment: "Clean and hygienic Environment",
    service: "Audience will be treated with Respect, Care and Love"
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fdfc] via-white to-[#f0faf9]">
      <Helmet>
        <title>Attractions - Rhythm Of Carnival</title>
        <meta name="description" content="Explore the exciting attractions at the Rhythm Of Carnival event including helicopter rides, theme park, water games, petting zoo, aquarium displays, food court and toys store." />
      </Helmet>
      
      <MainNavbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-28 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#60afb4]/95 to-[#85cbc3]/95 z-0"></div>
          
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
            <div className="max-w-4xl mx-auto text-center text-white">
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
                  <CalendarDays className="w-4 h-4 mr-2" /> December 22-26, 2025
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Special Attractions
                </h1>
                
                <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
                  Explore a world of excitement at our shopping arena with multiple attractions
                  for everyone to enjoy. From helicopter rides to petting zoo, there's something for all ages!
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
                    <Store className="w-4 h-4 text-white/80" />
                    <span className="text-white/80 text-sm">300+ Stalls</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link to="/events#shopping-tickets">
                    <Button 
                      size="lg" 
                      className="bg-white text-[#60afb4] hover:bg-white/90 px-6 py-2 rounded-full"
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Book Shopping Arena Pass
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Attractions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-block bg-[#60afb4]/10 text-[#60afb4] text-sm font-semibold py-1 px-3 rounded-full mb-4">
                  7 AMAZING ATTRACTIONS
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60afb4] to-[#85cbc3]">
                    Experience Endless Fun
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Enjoy these special attractions during the shopping arena days from December 22-26, 2025
                </p>
                
                <Tabs defaultValue="all" className="w-full max-w-xl mx-auto">
                  <TabsList className="grid grid-cols-4 mb-8">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="premium">Premium</TabsTrigger>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="shopping">Shopping</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {attractionsData.map((attraction) => (
                        <AttractionCard key={attraction.id} attraction={attraction} />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="premium" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {attractionsData
                        .filter(a => a.category === "premium")
                        .map((attraction) => (
                          <AttractionCard key={attraction.id} attraction={attraction} />
                        ))
                      }
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="general" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {attractionsData
                        .filter(a => a.category === "general")
                        .map((attraction) => (
                          <AttractionCard key={attraction.id} attraction={attraction} />
                        ))
                      }
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="shopping" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {attractionsData
                        .filter(a => a.category === "shopping" || a.category === "dining")
                        .map((attraction) => (
                          <AttractionCard key={attraction.id} attraction={attraction} />
                        ))
                      }
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        
        {/* Exhibition Zone Section */}
        <section className="py-16 bg-gradient-to-br from-[#f8fdfc] to-[#f0faf9]">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#60afb4] to-[#85cbc3]"></div>
                    <h3 className="text-3xl font-bold mb-8 flex items-center text-gray-800">
                      <Store className="h-8 w-8 mr-3 text-[#60afb4]" />
                      Stall & Exhibition Zone
                    </h3>
                    
                    <div className="space-y-5">
                      {Object.entries(exhibitionData).map(([key, value]) => (
                        <div 
                          key={key}
                          className="flex items-center bg-[#60afb4]/5 p-4 rounded-xl border border-[#60afb4]/10"
                        >
                          <div className="min-w-[140px] font-medium text-gray-700 capitalize">
                            {key}:
                          </div>
                          <div className="text-[#60afb4] font-semibold">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-3xl font-bold mb-6 text-gray-800">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60afb4] to-[#85cbc3]">
                      Explore Our Massive Exhibition
                    </span>
                  </h3>
                  
                  <p className="text-gray-600 mb-8 text-lg">
                    Browse through 300+ stalls offering a wide range of products and services, 
                    from food and entertainment to exotic products, all in a clean and 
                    hygienic environment spread across 30,000 sq. ft.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-[#60afb4]/10 flex items-center justify-center text-[#60afb4]">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Extended Opening Hours</h4>
                        <p className="text-gray-600 text-sm">Open from 9:00 AM to 10:00 PM daily for maximum shopping time</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-[#60afb4]/10 flex items-center justify-center text-[#60afb4]">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Diverse Product Categories</h4>
                        <p className="text-gray-600 text-sm">From food and entertainment to pets, aquariums, and exotic products</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-[#60afb4]/10 flex items-center justify-center text-[#60afb4]">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Clean Environment</h4>
                        <p className="text-gray-600 text-sm">A hygienic and well-maintained environment for a pleasant experience</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Link to="/events#shopping-tickets">
                      <Button className="bg-gradient-to-r from-[#60afb4] to-[#85cbc3] text-white">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Get Shopping Pass
                      </Button>
                    </Link>
                    <Link to="/events/tickets">
                      <Button variant="outline" className="border-[#60afb4] text-[#60afb4]">
                        <Ticket className="mr-2 h-4 w-4" />
                        View Concert Tickets
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Important Notes */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#60afb4]/5 border border-[#60afb4]/10 rounded-xl p-8">
                <h3 className="font-bold text-2xl text-gray-800 mb-6 flex items-center">
                  <Info className="text-[#60afb4] mr-2 h-6 w-6" />
                  Important Information for Visitors
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-5 rounded-xl shadow-sm">
                    <h4 className="font-semibold text-lg mb-3 flex items-center text-gray-800">
                      <Star className="text-[#60afb4] mr-2 h-5 w-5" />
                      Shopping Arena Pass
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-[#60afb4] mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Adult Pass: ₹299 per person</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-[#60afb4] mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Child Pass (below 12 years): ₹149 per child</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-[#60afb4] mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Valid for all 5 days (Dec 22-26, 2025)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl shadow-sm">
                    <h4 className="font-semibold text-lg mb-3 flex items-center text-gray-800">
                      <Star className="text-[#60afb4] mr-2 h-5 w-5" />
                      Premium Attractions
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-[#60afb4] mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Helicopter ride requires pre-booking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-[#60afb4] mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Some attractions may have additional charges</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-[#60afb4] mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Special discounts for Prince Group members</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/events">
                    <Button variant="outline" className="border-[#60afb4] text-[#60afb4]">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Event Details
                    </Button>
                  </Link>
                  <Link to="/events/tickets">
                    <Button className="bg-[#60afb4]">
                      <Ticket className="mr-2 h-4 w-4" />
                      View Concert Tickets
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <MainFooter />
    </div>
  );
};

export default EventAttractions; 