import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, FileText, CreditCard, Building2, Calendar, Users as UsersIcon, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

// Define breakpoints for better control
const TABLET_BREAKPOINT = 1024; // Changed from 768 (md) to 1024 (lg) to include iPad mini
const MOBILE_BREAKPOINT = 768;

// Function to detect iPad
const isIPad = () => {
  const userAgent = navigator.userAgent;
  return /iPad|Macintosh/i.test(userAgent) && 'ontouchend' in document;
};

// Elegant shimmer animation for Events menu item
const shimmerAnimation = {
  background: [
    "linear-gradient(90deg, rgba(78, 180, 167, 0) 0%, rgba(78, 180, 167, 0.1) 50%, rgba(78, 180, 167, 0) 100%)",
    "linear-gradient(90deg, rgba(78, 180, 167, 0) 0%, rgba(96, 175, 180, 0.2) 50%, rgba(78, 180, 167, 0) 100%)",
    "linear-gradient(90deg, rgba(78, 180, 167, 0) 0%, rgba(78, 180, 167, 0.1) 50%, rgba(78, 180, 167, 0) 100%)",
  ],
  backgroundSize: ["200% 100%", "200% 100%", "200% 100%"],
  backgroundPosition: ["100% 0%", "0% 0%", "100% 0%"],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }
};

// Floating animation for Events menu item
const floatAnimation = {
  y: [0, -4, 0],
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Attention pulse animation for the Events icon
const iconPulseAnimation = {
  scale: [1, 1.15, 1],
  filter: [
    "drop-shadow(0 0 0 rgba(78, 180, 167, 0))",
    "drop-shadow(0 0 3px rgba(78, 180, 167, 0.7))",
    "drop-shadow(0 0 0 rgba(78, 180, 167, 0))"
  ],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isIpad, setIsIpad] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const isTablet = window.innerWidth < TABLET_BREAKPOINT;
      const ipadDetected = isIPad();
      setIsIpad(ipadDetected);
      setIsMobileOrTablet(isTablet || ipadDetected);
    };

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const servicePreview = {
    documentation: {
      title: "Documentation Services",
      description: "Quick & reliable document processing",
      icon: <FileText className="w-8 h-8" />,
      stats: "33500+ Documents Processed",
      path: "/documentation-services"
    },
    loans: {
      title: "Loan Services", 
      description: "Flexible loans with competitive rates",
      icon: <CreditCard className="w-8 h-8" />,
      stats: "40crore + Loans Disbursed",
      path: "/loan-services"
    }
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Building2 className="w-4 h-4" /> },
    { 
      name: 'Services', 
      path: '/services',
      icon: <FileText className="w-4 h-4" />,
      hasDropdown: true,
      dropdown: [
        { name: 'Documentation Services', path: '/documentation-services', icon: <FileText className="w-4 h-4" /> },
        { name: 'Loan Services', path: '/loan-services', icon: <CreditCard className="w-4 h-4" /> },
      ]
    },
    { name: 'Branches', path: '/branches', icon: <Building2 className="w-4 h-4" /> },
    { 
      name: 'Events', 
      path: '/events', 
      icon: <Calendar className="w-4 h-4 text-[#4eb4a7]" />,
      highlight: true,
      isNew: true
    },
    { name: 'Membership', path: '/membership', icon: <UsersIcon className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <Info className="w-4 h-4" /> },
  ];

  // If it's an iPad, always use mobile layout
  const shouldUseMobileLayout = isMobileOrTablet || isIpad;

  // Special rendering for the Events menu item - elegant shimmer effect
  const renderNavItem = (item) => {
    if (item.highlight) {
      return (
        <motion.div
          className="relative"
          animate={floatAnimation}
          whileHover={{ y: 0 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full z-0"
              animate={shimmerAnimation}
            />
            <div className="absolute inset-0 rounded-full z-0 animate-pulse-slow bg-[#4eb4a7]/10"></div>
            <Link
              to={item.path}
              className={`relative z-10 px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                isActive(item.path) 
                  ? 'bg-[#4eb4a7] text-white shadow-md' 
                  : 'bg-white/50 backdrop-blur-sm text-[#4eb4a7] border border-[#4eb4a7]/20 hover:border-[#4eb4a7]/50 shadow-sm'
              }`}
            >
              <motion.div animate={iconPulseAnimation}>
                {item.icon}
              </motion.div>
              <span className="font-medium relative">
                {item.name}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#4eb4a7]/60 rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </span>
              {item.isNew && (
                <span className="ml-1 h-2 w-2 rounded-full bg-[#4eb4a7] animate-ping-slow" />
              )}
            </Link>
          </div>
        </motion.div>
      );
    }

    return (
      <Link
        to={item.path}
        className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
          isActive(item.path) 
            ? 'bg-[#4eb4a7] text-white' 
            : 'text-gray-700 hover:bg-[#85cbc3]/20'
        }`}
      >
        {item.icon}
        <span>{item.name}</span>
      </Link>
    );
  };

  // Special rendering for the Events mobile menu item
  const renderMobileNavItem = (item) => {
    if (item.highlight) {
      return (
        <motion.div
          className="relative"
          animate={floatAnimation}
          whileHover={{ y: 0 }}
        >
          <div className="relative overflow-hidden rounded-lg">
            <motion.div
              className="absolute inset-0 z-0"
              animate={shimmerAnimation}
            />
            <div className="absolute inset-0 z-0 animate-pulse-slow bg-[#4eb4a7]/10"></div>
            <Link
              to={item.path}
              className={`relative z-10 flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path) 
                  ? 'bg-[#4eb4a7] text-white shadow-md' 
                  : 'text-[#4eb4a7] bg-white border border-[#4eb4a7]/20 shadow-md hover:border-[#4eb4a7]/50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div animate={iconPulseAnimation}>
                {item.icon}
              </motion.div>
              <span className="font-medium">{item.name}</span>
              {item.isNew && (
                <div className="relative ml-2 flex items-center">
                  <span className="h-2 w-2 rounded-full bg-[#4eb4a7] animate-ping-slow"></span>
                  <span className="ml-1 text-xs text-[#4eb4a7]/80">New</span>
                </div>
              )}
            </Link>
          </div>
        </motion.div>
      );
    }

    return (
      <Link
        to={item.path}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
          isActive(item.path) 
            ? 'bg-[#4eb4a7] text-white shadow-md' 
            : 'text-gray-700 bg-white border border-gray-200 shadow-sm hover:bg-[#4eb4a7]/5'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {item.icon}
        <span className="font-medium">{item.name}</span>
      </Link>
    );
  };

  return (
    <>
    <nav 
        className={`fixed top-[50px] left-0 right-0 z-[999] transform translate-z-0 will-change-transform transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-xl py-2' 
            : 'bg-white/70 backdrop-blur-md shadow-md py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center relative">
            {/* Logo with animated underline */}
            <div 
              className="flex-shrink-0 z-[999]"
              style={{ 
                position: 'relative', 
                display: 'block',
                visibility: 'visible',
                opacity: 1
              }}
            >
            <Logo />
          </div>

            {/* Desktop Navigation - Only shown on large screens and NOT on iPads */}
          <div className={`hidden ${!isIpad ? "lg:block" : ""}`}>
              <motion.div 
                className={`flex items-center gap-2 ${
                  scrolled 
                    ? 'bg-gray-100/50 backdrop-blur-md' 
                    : 'bg-white/80 backdrop-blur-md'
                } rounded-full px-4 py-2 shadow-lg`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {navItems.map((item, index) => (
                  <div key={item.name} className="relative">
                    {item.hasDropdown ? (
                      <div
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <motion.button
                          className={`px-4 py-2 flex items-center gap-2 rounded-full transition-all ${
                          isActive(item.path) 
                              ? 'bg-[#4eb4a7] text-white' 
                              : 'text-gray-700 hover:bg-[#85cbc3]/20'
                        }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                      >
                          {item.icon}
                        {item.name}
                          <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} />
                        </motion.button>

                        {/* Service Preview Dropdown */}
                        <AnimatePresence>
                      {activeDropdown === item.name && (
                            <motion.div 
                              className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 w-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="grid grid-cols-2 p-4 gap-4">
                                {Object.entries(servicePreview).map(([key, service]) => (
                            <Link
                                    key={key}
                                    to={service.path}
                                    className="group relative p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-[#4eb4a7]/10 hover:to-[#85cbc3]/10 transition-all duration-300"
                                    onMouseEnter={() => setHoveredService(key)}
                                    onMouseLeave={() => setHoveredService(null)}
                                  >
                                    <div className="flex items-start gap-4">
                                      <div className={`p-3 rounded-lg transition-all duration-300 ${
                                        hoveredService === key 
                                          ? 'bg-[#4eb4a7] text-white' 
                                          : 'bg-white text-[#4eb4a7]'
                                      }`}>
                                        {service.icon}
                                      </div>
                                      <div className="flex-1">
                                        <h3 className="font-bold text-gray-800 mb-2">{service.title}</h3>
                                        <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                                        <div className="flex items-center justify-between">
                                          <span className="text-xs text-[#60afb4] font-medium">{service.stats}</span>
                                          <motion.span 
                                            className="text-[#4eb4a7] text-sm font-medium"
                                            initial={{ x: 0 }}
                                            animate={{ x: hoveredService === key ? 5 : 0 }}
                                          >
                                            Learn More →
                                          </motion.span>
                                        </div>
                                      </div>
                                    </div>
                            </Link>
                          ))}
                        </div>
                            </motion.div>
                      )}
                        </AnimatePresence>
                    </div>
                  ) : (
                    renderNavItem(item)
                  )}
                </div>
              ))}

                {/* Animated divider */}
                <motion.div 
                  className="w-px h-6 bg-gray-300/50 mx-2"
                  initial={{ height: 0 }}
                  animate={{ height: 24 }}
                  transition={{ delay: 0.5 }}
                />

                {/* Action buttons with hover effects */}
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button 
                    asChild 
                    variant="ghost" 
                    className={`rounded-full hover:bg-[#85cbc3]/20 text-gray-700`}
                  >
                    <Link to="/login">
                      <User className="mr-2 h-4 w-4" /> 
                      <span className="hidden lg:inline">Login</span>
                    </Link>
                </Button>
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                  <Link to="/contact">Contact Us</Link>
                </Button>
                </motion.div>
              </motion.div>
          </div>

          {/* Mobile and Tablet menu button - Shown on all iPads regardless of orientation */}
            <div 
              className={`${!isIpad ? "lg:hidden" : ""} z-[999] mobile-menu-safari`}
              style={{ 
                position: "relative",
              }}
            >
            <button
              onClick={toggleMenu}
                className="p-2 rounded-full bg-white/80 shadow-md"
                aria-label="Toggle menu"
            >
                {isMenuOpen ? 
                  <X className="h-6 w-6 text-[#4eb4a7]" /> : 
                  <Menu className="h-6 w-6 text-[#4eb4a7]" />
                }
            </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Slide from right - Also used for iPad mini */}
        <AnimatePresence>
        {isMenuOpen && (
            <motion.div 
              className={`fixed inset-0 top-16 bg-black/70 ${!isIpad ? "lg:hidden" : ""} z-50`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div 
                className="absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-xl border-l border-[#4eb4a7]/20"
                style={{ background: "#ffffff" }}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", bounce: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 space-y-4 bg-white">
                  <div className="flex items-center justify-between pb-4 mb-2 border-b border-gray-200 bg-white rounded-lg p-2">
                    <h3 className="font-bold text-[#4eb4a7] text-xl">Prince Group</h3>
                  </div>
                  
              {navItems.map((item) => (
                    <motion.div 
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navItems.indexOf(item) * 0.1 }}
                      className="mb-2"
                    >
                      {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                            className={`flex w-full items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all ${
                              isActive(item.path) 
                                ? 'bg-[#4eb4a7] text-white shadow-md' 
                                : 'text-gray-700 bg-white border border-gray-200 shadow-sm hover:bg-[#4eb4a7]/5'
                        }`}
                      >
                            <div className="flex items-center gap-3">
                              {item.icon}
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>

                      {activeDropdown === item.name && (
                            <div className="pl-4 mt-2 space-y-2 border-l-2 border-[#4eb4a7]/30">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-[#4eb4a7]/5"
                              onClick={() => {
                                setActiveDropdown(null);
                                setIsMenuOpen(false);
                              }}
                            >
                                  {dropdownItem.icon}
                                  <span>{dropdownItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                        renderMobileNavItem(item)
                  )}
                    </motion.div>
              ))}
                  
                  <div className="pt-6 mt-2 border-t border-gray-200 space-y-4 bg-white">
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full rounded-full border-[#4eb4a7] hover:bg-[#4eb4a7]/5 hover:border-[#4eb4a7] bg-white text-[#4eb4a7]"
                    >
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <User className="mr-2 h-4 w-4" /> 
                        <span className="font-medium">Login</span>
                  </Link>
                </Button>
                    
                    <Button 
                      asChild 
                      className="w-full bg-[#4eb4a7] hover:bg-[#3da296] text-white rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                        <span className="font-medium">Contact Us</span>
                      </Link>
                </Button>
              </div>
            </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Service Quick Access Bar - Shows on scroll, but not on iPads */}
      <AnimatePresence>
        {scrolled && !isIpad && (
          <motion.div 
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 hidden lg:block"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/90 backdrop-blur-md rounded-full shadow-lg px-6 py-2 flex items-center gap-4">
              <span className="text-sm text-gray-600">Quick Access:</span>
              <Link to="/documentation-services" className="text-sm text-[#4eb4a7] hover:underline flex items-center gap-1">
                <FileText className="w-3 h-3" /> Documents
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/loan-services" className="text-sm text-[#4eb4a7] hover:underline flex items-center gap-1">
                <CreditCard className="w-3 h-3" /> Loans
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/branches" className="text-sm text-[#4eb4a7] hover:underline flex items-center gap-1">
                <Building2 className="w-3 h-3" /> Find Branch
              </Link>
              <span className="text-gray-300">|</span>
              <motion.div
                className="relative"
                animate={floatAnimation}
                whileHover={{ y: 0 }}
              >
                <Link to="/events" className="text-sm text-[#4eb4a7] font-medium hover:underline flex items-center gap-1">
                  <motion.div animate={iconPulseAnimation}>
                    <Calendar className="w-3 h-3" />
                  </motion.div>
                  <span className="relative">
                    Events
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#4eb4a7]/60 rounded-full"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                  </span>
                  <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#4eb4a7] animate-ping-slow" />
                </Link>
              </motion.div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MainNavbar;
