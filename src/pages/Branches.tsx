import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MapPin, Phone, Clock, Search, ChevronDown, ChevronRight, 
  Building, MapIcon, Globe, ArrowRight, X, PlusCircle
} from 'lucide-react';
import { Helmet } from "react-helmet-async";

const Branches = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const branchData = [
    {
      id: "thingal",
      name: "Thingal Nagar Branch",
      phone: "9489359755",
      address: "Near Thingal Nagar Sub-Register office, Anbu Complex 1st Floor, Thingal Nagar",
      region: "central"
    },
    {
      id: "rajakkamangalam",
      name: "Rajakkamangalam Branch",
      phone: "8300933178",
      address: "Near Rajakkamangalam Sub-Register Office No. 11/14, Saraswathi Nathan Complex, Ganapathipuram 629502",
      region: "east"
    },
    {
      id: "kanyakumari",
      name: "Kanyakumari Branch",
      phone: "Not Available",
      address: "Door no 8B/1, SLB South Street, Near Mutharamman Temple, Nagercoil",
      region: "south"
    },
    {
      id: "palugal",
      name: "Palugal Branch",
      phone: "9361073196",
      address: "Opposite Palugal Sub-Register Office, Koonampana Market, Koonampana",
      region: "west"
    },
    {
      id: "verlilambi",
      name: "Verlilambi Branch",
      phone: "7339070114",
      address: "Opposite to fish Market, Near Verkilambi Register Office, Mallanvillai, Verkilambi 629166",
      region: "north"
    },
    {
      id: "karungal",
      name: "Karungal Branch",
      phone: "9384170178",
      address: "Opposite Royal Enfield Service Showroom 1st Floor Karungal",
      region: "central"
    },
    {
      id: "thiruvattar",
      name: "Thiruvattar Branch",
      phone: "9789499178",
      address: "Sindhu Kumar Building, 1st floor, Beside Thanumalayan Hotel, Thiruvattar",
      region: "north"
    },
    {
      id: "kollamcode",
      name: "Kollamcode Branch",
      phone: "8939258163",
      address: "Beside Suresh Hotel, 1st floor, Kollamcode",
      region: "south"
    },
    {
      id: "palliyadi",
      name: "Palliyadi Branch",
      phone: "9566909178",
      address: "No 21/133/5 Opposite Palliyadi Sub-Register Office, Alanthurai, Palliyadi",
      region: "east"
    },
    {
      id: "manavalakurichy",
      name: "Manavalakurichy Branch",
      phone: "8220594178",
      address: "Near Manavalakurichy Sub-Register Office, Opposite to Lakshmipuram College Ground Lakshmipuram",
      region: "west"
    },
    {
      id: "colachel",
      name: "Colachel Branch",
      phone: "9363916484",
      address: "Opposite Colachel Sub-Register Office, Near David Driving School, Colachel 629251",
      region: "south"
    },
    {
      id: "edalagudi",
      name: "Edalagudi Branch",
      phone: "9363914982",
      address: "Near Edalagudi Sub-Register Office, Opposit to Government High School, Jaganathan Complex, 1st floor, Edalagudi",
      region: "east"
    },
    {
      id: "boothapandi",
      name: "Boothapandi Branch",
      phone: "7448975519",
      address: "Opposite to National Highway Office, Gerome Complex, 1st Floor, Boothapandi",
      region: "north"
    },
    {
      id: "vadasery",
      name: "Vadasery Branch",
      phone: "Not Available",
      address: "Door no 8B/1, SLB South Street, Near Mutharamman Temple, Nagercoil",
      region: "central"
    },
    {
      id: "munjirai",
      name: "Munjirai Branch",
      phone: "8681980178",
      address: "Opposite to Munjirai Sub-Register Office, Munjirai",
      region: "west"
    },
    {
      id: "arumanai",
      name: "Arumanai Branch",
      phone: "Not Available",
      address: "Beside Arumanai Sub-Register Office, Punniyam, Arumanai",
      region: "east"
    },
    {
      id: "thovalai",
      name: "Thovalai Branch",
      phone: "Not Available",
      address: "Near Thovalai Sub Register Office, Sister Complex, 1st Floor, Main Road, Thovalai 629302",
      region: "central"
    },
    {
      id: "thuckalay",
      name: "Thuckalay Branch",
      phone: "9600303653",
      address: "Opposite to Thaluk Office, Near Anna Statue, Market Road, Thuckalay",
      region: "north"
    }
  ];

  // Filter branches based on search
  const filteredBranches = branchData.filter(branch => {
    return searchTerm === "" || 
           branch.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           branch.address.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fdfc] via-white to-[#f0faf9]">
      <Helmet>
        <title>Our Branches - Prince Group</title>
        <meta name="description" content="Find Prince Group branch locations across Kanyakumari District with contact information, addresses, and operating hours." />
      </Helmet>
      <MainNavbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#4eb4a7]/10 to-[#85cbc3]/5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#60afb4]/10 to-[#4eb4a7]/5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
            
            {/* Decorative Circles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#4eb4a7]/10"
                style={{
                  width: Math.random() * 120 + 40,
                  height: Math.random() * 120 + 40,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.2 + 0.1,
                }}
                animate={{
                  y: [0, Math.random() * 30 - 15],
                  scale: [1, Math.random() * 0.2 + 0.9],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                    Our Branch Network
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                  With over 18 branches strategically located across Kanyakumari District, we bring our services closer to your doorstep.
                </p>
              </motion.div>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-xl relative"
              >
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#4eb4a7]" />
                </div>
                <Input
                  type="text"
                  placeholder="Search branches by name or location..."
                  className="pl-12 py-7 bg-white/90 border-[#4eb4a7]/20 rounded-2xl shadow-xl focus:border-[#4eb4a7] text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-[#4eb4a7]"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </motion.div>
            </div>
          </div>
          
          {/* Curved Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,128L48,122.7C96,117,192,107,288,122.7C384,139,480,181,576,181.3C672,181,768,139,864,122.7C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* Interactive Branch Network Visualization */}
        <section className="py-16 bg-white relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="max-w-6xl mx-auto relative"
              ref={containerRef}
            >
              <div className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-[#f9fffd] to-[#f0faf8] rounded-3xl shadow-lg overflow-hidden border border-[#4eb4a7]/10">
                {/* Background Map Elements */}
                <div className="absolute inset-0">
                  <motion.div
                    className="absolute h-[80%] w-[80%] top-[10%] left-[10%] opacity-5"
                    animate={{ 
                      rotate: 360
                    }}
                    transition={{
                      duration: 200,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#4eb4a7" d="M39.9,-64.1C53.4,-59.2,67.5,-51.8,75.2,-40C82.9,-28.2,84.3,-12,83.6,3.9C82.9,19.9,80.2,35.7,71.7,47.4C63.3,59.2,49.2,67,35.1,71.7C21,76.5,6.9,78.3,-7.2,77.2C-21.3,76.2,-35.5,72.4,-47.2,64.5C-58.9,56.6,-68.1,44.7,-73.5,31.3C-78.9,17.9,-80.4,3,-76.4,-9.7C-72.4,-22.4,-62.9,-32.9,-52.3,-38.8C-41.7,-44.7,-30,-46,-19.6,-51.8C-9.1,-57.7,0.9,-68,12.9,-71.2C24.9,-74.4,48.5,-70.4,46.4,-67.3C48.5,-74.4,24.9,-74.4,39.9,-64.1Z" transform="translate(100 100)" />
                    </svg>
                  </motion.div>
                </div>
                
                {/* Branch Network Visualization */}
                <div className="absolute inset-0 p-4">
                  <div className="relative h-full w-full">
                    {/* Central Hub */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.9, 1, 0.9]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4eb4a7] to-[#60afb4] flex items-center justify-center shadow-lg z-20">
                        <Building className="h-10 w-10 text-white" />
                      </div>
                      
                      {/* Pulse Animation */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#4eb4a7]"
                        initial={{ opacity: 0.7, scale: 1 }}
                        animate={{ 
                          opacity: 0, 
                          scale: 3 
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    </motion.div>
                    
                    {/* Branch Nodes */}
                    {branchData.map((branch, index) => {
                      // Calculate position on a circle around the center
                      const angle = (index * (2 * Math.PI / branchData.length));
                      const radius = Math.min(containerRef.current?.clientWidth || 600, containerRef.current?.clientHeight || 600) * 0.38;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      
                      // Determine if this node is in the bottom half to adjust popup position
                      const isBottomHalf = y > 0;
                      
                      return (
                        <motion.div
                          key={branch.id}
                          className="absolute"
                          style={{
                            top: "50%",
                            left: "50%",
                            x: x,
                            y: y
                          }}
                          animate={{
                            y: y + (Math.sin(index) * 10),
                          }}
                          transition={{
                            duration: 3 + (index % 3),
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut"
                          }}
                          onHoverStart={() => setHoveredBranch(branch.id)}
                          onHoverEnd={() => setHoveredBranch(null)}
                          onClick={() => setSelectedBranch(branch.id === selectedBranch ? null : branch.id)}
                        >
                          {/* Connection line to center */}
                          <motion.div 
                            className="absolute top-1/2 left-1/2 h-[1px] bg-gradient-to-r from-[#4eb4a7]/80 to-[#4eb4a7]/10 transform origin-left"
                            style={{ 
                              width: Math.sqrt(x*x + y*y), 
                              rotate: `${Math.atan2(y, x) * (180 / Math.PI)}deg`,
                            }}
                            initial={{ opacity: 0.3 }}
                            animate={{ 
                              opacity: hoveredBranch === branch.id || selectedBranch === branch.id ? 0.8 : 0.3,
                              height: hoveredBranch === branch.id || selectedBranch === branch.id ? "2px" : "1px"
                            }}
                          />
                          
                          {/* Branch Node */}
                          <motion.div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                            animate={{ 
                              scale: hoveredBranch === branch.id || selectedBranch === branch.id ? 1.1 : 1,
                              zIndex: hoveredBranch === branch.id || selectedBranch === branch.id ? 30 : 10
                            }}
                          >
                            <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                              hoveredBranch === branch.id || selectedBranch === branch.id 
                                ? 'bg-gradient-to-br from-[#4eb4a7] to-[#60afb4] text-white' 
                                : 'bg-white text-[#4eb4a7] border border-[#4eb4a7]/20'
                            } shadow-md transition-all duration-300`}>
                              <MapPin className="h-6 w-6" />
                            </div>
                            
                            {/* Animated Pulse Effect */}
                            <motion.div
                              className="absolute inset-0 rounded-full bg-[#4eb4a7]/30"
                              initial={{ opacity: 0.7, scale: 1 }}
                              animate={{ 
                                opacity: 0, 
                                scale: 2 
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                ease: "easeOut",
                                repeatDelay: index * 0.2 % 1
                              }}
                            />
                            
                            {/* Branch Info Popup */}
                            <AnimatePresence>
                              {(hoveredBranch === branch.id || selectedBranch === branch.id) && (
                                <motion.div
                                  initial={{ opacity: 0, y: isBottomHalf ? -10 : 10, scale: 0.9 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: isBottomHalf ? -10 : 10, scale: 0.9 }}
                                  transition={{ duration: 0.2 }}
                                  className={`absolute ${isBottomHalf ? 'bottom-full mb-4' : 'top-full mt-4'} left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl p-4 w-60 z-40`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="relative">
                                    {/* Decorative element */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#4eb4a7]/5 to-[#85cbc3]/10 rounded-full transform translate-x-5 -translate-y-5"></div>
                                    
                                    {/* Arrow indicator pointing to the node */}
                                    <div className={`absolute ${isBottomHalf ? 'bottom-[-8px]' : 'top-[-8px]'} left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 ${isBottomHalf ? 'shadow-md' : ''}`}></div>
                                    
                                    <h4 className="font-bold text-gray-800 mb-2 relative z-10">{branch.name}</h4>
                                    <p className="text-sm text-gray-600 mb-3 relative z-10">{branch.address}</p>
                                    
                                    {branch.phone !== "Not Available" && (
                                      <a href={`tel:${branch.phone}`} className="flex items-center gap-2 text-sm text-[#4eb4a7] hover:text-[#60afb4] mb-3 relative z-10">
                                        <Phone className="h-4 w-4" />
                                        <span>{branch.phone}</span>
                                      </a>
                                    )}
                                    
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 relative z-10">
                                      <Clock className="h-4 w-4" />
                                      <span>9:00 AM - 5:00 PM (Mon-Fri)</span>
                                    </div>
                                    
                                    <Button 
                                      size="sm" 
                                      className="w-full bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] hover:from-[#3da296] hover:to-[#4e9da3] text-white relative z-10"
                                      asChild
                                    >
                                      <a 
                                        href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Get Directions <ArrowRight className="ml-1 h-3 w-3" />
                                      </a>
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Interactive instructions */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <motion.p 
                    className="text-sm text-gray-500 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full inline-block shadow-sm"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                  >
                    Hover or click on a branch for details
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Branch Cards Grid */}
        <section className="py-16 bg-gradient-to-br from-white to-[#f0faf9]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                    Find Your Nearest Branch
                  </span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our branches are strategically located to serve you better. Explore our network and find the closest Prince Group branch to you.
                </p>
              </motion.div>
              
              {searchTerm && filteredBranches.length === 0 ? (
                <div className="text-center py-20">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-20 h-20 mx-auto bg-[#4eb4a7]/10 rounded-full flex items-center justify-center mb-6">
                      <Search className="h-8 w-8 text-[#4eb4a7]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">No branches found</h3>
                    <p className="text-gray-600 mb-8">We couldn't find any branches matching "{searchTerm}"</p>
                    <Button 
                      variant="outline" 
                      className="border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/10"
                      onClick={() => setSearchTerm("")}
                    >
                      Clear Search
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBranches.map((branch, index) => (
                    <motion.div
                      key={branch.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group"
                    >
                      <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-md border border-[#4eb4a7]/10 hover:shadow-xl transition-all duration-300 p-6">
                        {/* Decorative element */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#4eb4a7]/5 to-[#85cbc3]/10 rounded-full transform translate-x-20 -translate-y-20 group-hover:scale-110 transition-transform duration-500"></div>
                        
                        <div className="relative">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-[#4eb4a7]/10 to-[#85cbc3]/20 text-[#4eb4a7] group-hover:from-[#4eb4a7] group-hover:to-[#60afb4] group-hover:text-white transition-all duration-300">
                              <MapPin className="h-6 w-6" />
                            </div>
                            
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#4eb4a7] transition-colors duration-300">{branch.name}</h3>
                              <p className="text-gray-600 text-sm mb-4">{branch.address}</p>
                              
                              <div className="flex flex-col space-y-3">
                                {branch.phone !== "Not Available" && (
                                  <a href={`tel:${branch.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4eb4a7] transition-colors">
                                    <Phone className="h-4 w-4 text-[#4eb4a7]" />
                                    <span>{branch.phone}</span>
                                  </a>
                                )}
                                
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Clock className="h-4 w-4 text-[#4eb4a7]" />
                                  <span>9:00 AM - 5:00 PM</span>
                                </div>
                              </div>
                              
                              <Button 
                                className="mt-5 w-full bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] hover:from-[#3da296] hover:to-[#4e9da3] text-white shadow-md group-hover:shadow-lg transition-all"
                                asChild
                              >
                                <a 
                                  href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <div className="flex items-center gap-2 justify-center">
                                    <span>Get Directions</span>
                                    <motion.div
                                      animate={{ x: [0, 4, 0] }}
                                      transition={{ 
                                        duration: 1.5, 
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "easeInOut",
                                        repeatDelay: 1
                                      }}
                                    >
                                      <ArrowRight className="h-4 w-4" />
                                    </motion.div>
                                  </div>
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] transform -skew-y-6 scale-110"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Need Help Finding a Branch?
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Our dedicated support team is available to help you locate the nearest branch or answer any questions you may have.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-[#4eb4a7] hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all px-8 py-6 rounded-full"
                  >
                    Contact Support
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: Math.random() * 80 + 20,
                  height: Math.random() * 80 + 20,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -(Math.random() * 100 + 50)],
                  opacity: [0.7, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
};

export default Branches;
