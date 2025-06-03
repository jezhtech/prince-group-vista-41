import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, FileText, CreditCard, Building2, Calendar, Users as UsersIcon, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const servicePreview = {
    documentation: {
      title: "Documentation Services",
      description: "Quick & reliable document processing",
      icon: <FileText className="w-8 h-8" />,
      stats: "33500+ Documents Processed"
    },
    loans: {
      title: "Loan Services", 
      description: "Flexible loans with competitive rates",
      icon: <CreditCard className="w-8 h-8" />,
      stats: "40crore + Loans Disbursed"
    }
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Building2 className="w-4 h-4" /> },
    { 
      name: 'Services', 
      path: '/services',
      icon: <FileText className="w-4 h-4" />,
      hasDropdown: true
    },
    { name: 'Branches', path: '/branches', icon: <Building2 className="w-4 h-4" /> },
    { name: 'Events', path: '/events', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Membership', path: '/membership', icon: <UsersIcon className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <>
    <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-xl py-2' 
            : 'bg-white/70 backdrop-blur-md shadow-md py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center relative">
            {/* Logo with animated underline */}
            <motion.div 
              className="flex-shrink-0 z-20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
            <Logo />
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] mt-1"
                initial={{ width: 0 }}
                animate={{ width: scrolled ? "100%" : "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Desktop Navigation - Floating Pill Design */}
          <div className="hidden md:block">
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
                                    to={key === "documentation" ? "/documentation-services" : key === "loans" ? "/loan-services" : `/services#${key}`}
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
                    <Link
                      to={item.path}
                        className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                        isActive(item.path) 
                            ? 'bg-[#4eb4a7] text-white' 
                            : 'text-gray-700 hover:bg-[#85cbc3]/20'
                      }`}
                    >
                        {item.icon}
                      {item.name}
                    </Link>
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

          {/* Mobile menu button */}
            <div className="md:hidden z-20">
              <motion.button
              onClick={toggleMenu}
                className={`p-2 rounded-lg text-gray-700 hover:bg-gray-100/50`}
                whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Slide from right */}
        <AnimatePresence>
        {isMenuOpen && (
            <motion.div 
              className="fixed inset-0 top-16 bg-black/70 md:hidden z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div 
                className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl border-l border-[#4eb4a7]/20"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", bounce: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 space-y-4">
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
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive(item.path) 
                            ? 'bg-[#4eb4a7] text-white shadow-md' 
                            : 'text-gray-700 bg-gray-50/80 border border-gray-100 shadow-sm hover:bg-gradient-to-r hover:from-[#4eb4a7]/10 hover:to-[#85cbc3]/10'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.icon}
                        {item.name}
                            </Link>
                    </motion.div>
                  ))}
                  
                  <div className="pt-6 mt-2 border-t border-gray-200 space-y-4">
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full rounded-full border-[#4eb4a7]/30 hover:bg-[#4eb4a7]/5 hover:border-[#4eb4a7] bg-white"
                    >
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        <User className="mr-2 h-4 w-4" /> Login
                      </Link>
                    </Button>
                    
                    <Button 
                      asChild 
                      className="w-full bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] hover:from-[#3da296] hover:to-[#4e9da3] rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Service Quick Access Bar - Shows on scroll */}
      <AnimatePresence>
        {scrolled && (
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
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MainNavbar;
