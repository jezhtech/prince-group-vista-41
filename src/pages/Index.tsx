import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import EventTicketBanner from "@/components/EventTicketBanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  ArrowRight, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle, 
  Shield, 
  FileText, 
  CreditCard, 
  Calendar, 
  ChevronDown,
  ArrowUpRight,
  Cpu,
  Database,
  Lock,
  BarChart3,
  FileCheck,
  Home,
  Car,
  Briefcase,
  GraduationCap,
  Heart,
  TrendingUp,
  Sparkles,
  Phone,
  Building2,
  Timer
} from "lucide-react";

const Index = () => {
  // Define TypeScript type for feature animation
  type FeatureAnimation = {
    type: 'pulse' | 'bounce' | 'spin' | 'ping';
    scale?: number[];
    y?: number[];
    rotate?: number[];
    opacity?: number[];
    duration: number;
  };

  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<'documentation' | 'loans'>('documentation');
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: "smooth"
    });
  };

  const serviceDetails = {
    documentation: {
      title: "Document Registration & Processing",
      subtitle: "Fast, Secure, Hassle-free",
      features: [
        { icon: <FileCheck className="w-5 h-5" />, text: "Property Registration" },
        { icon: <Shield className="w-5 h-5" />, text: "Legal Documentation" },
        { icon: <Briefcase className="w-5 h-5" />, text: "Business Permits" },
        { icon: <GraduationCap className="w-5 h-5" />, text: "Educational Certificates" }
      ],
      stats: { value: "33500+", label: "Documents Processed" },
      color: "from-[#4eb4a7] to-[#60afb4]"
    },
    loans: {
      title: "Personal & Business Loans",
      subtitle: "Flexible Terms, Quick Approval",
      features: [
        { icon: <Home className="w-5 h-5" />, text: "Home Loans" },
        { icon: <Car className="w-5 h-5" />, text: "Vehicle Loans" },
        { icon: <Briefcase className="w-5 h-5" />, text: "Business Loans" },
        { icon: <Heart className="w-5 h-5" />, text: "Personal Loans" }
      ],
      stats: { value: "40crore +", label: "Loans Disbursed" },
      color: "from-[#60afb4] to-[#85cbc3]"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Prince Group - Professional Document & Loan Solutions in Kanyakumari District</title>
        <meta name="description" content="Prince Group offers trusted document registration and loan services across 20+ branches in Kanyakumari District. Same-day processing, expert guidance, and competitive rates." />
        <meta name="keywords" content="document registration, loan services, Kanyakumari, property registration, legal documentation, business loans, personal loans, home loans" />
        <meta property="og:title" content="Prince Group - Documentation & Loan Services in Kanyakumari" />
        <meta property="og:description" content="Trusted documentation and financial solutions with 20+ branches across Kanyakumari District since 2018." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://princegroupcompanies.in" />
      </Helmet>
      
      {/* Event Ticket Banner - Placed before navbar */}
      <EventTicketBanner />
      
      <MainNavbar />
      
      <main className="flex-grow pt-2">
        {/* Innovative Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-white pt-7">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/2 w-[150%] h-[150%] bg-gradient-to-br from-[#4eb4a7]/5 via-[#60afb4]/5 to-[#85cbc3]/5 rounded-full animate-pulse" />
            <motion.div 
              className="absolute top-20 left-20 w-32 h-32 bg-[#4eb4a7]/10 rounded-full blur-3xl"
              animate={{ 
                x: [0, 50, 0], 
                y: [0, -30, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-20 right-20 w-48 h-48 bg-[#85cbc3]/10 rounded-full blur-3xl"
              animate={{ 
                x: [0, -50, 0], 
                y: [0, 30, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10 pt-36">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Interactive Service Selector */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Welcome Badge */}
                <motion.div 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4eb4a7]/10 to-[#85cbc3]/10 px-4 py-2 rounded-full mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-4 h-4 text-[#4eb4a7]" />
                  <span className="text-sm font-medium text-gray-700">Trusted by 30000+ Customers</span>
                </motion.div>

                <h1 className="text-4xl lg:text-4xl font-bold text-gray-900 mb-6">Document, Loan & Revenue Services in Kanyakumari</h1>
                 
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"><span className="block mt-2 bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] bg-clip-text text-transparent">
                    {selectedService === 'documentation' ? 'Trusted Documentation Services' : 'Reliable Financial Solutions'}
                  </span>
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                  Expert document registration and loan services across 20+ branches in Kanyakumari District. 
                  Same-day processing, transparent pricing, and professional support.
                </p>

                {/* Service Toggle */}
                <div className="bg-gray-100 p-1.5 rounded-xl inline-flex mb-8">
                  <button
                    onClick={() => setSelectedService('documentation')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      selectedService === 'documentation'
                        ? 'bg-white text-[#4eb4a7] shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <FileText className="w-4 h-4 inline mr-2" />
                    Documentation
                  </button>
                  <button
                    onClick={() => setSelectedService('loans')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      selectedService === 'loans'
                        ? 'bg-white text-[#60afb4] shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Loans
                  </button>
                </div>

                {/* Service Features */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedService}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {serviceDetails[selectedService].subtitle}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {serviceDetails[selectedService].features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all cursor-pointer"
                          onHoverStart={() => setHoveredFeature(index)}
                          onHoverEnd={() => setHoveredFeature(null)}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${serviceDetails[selectedService].color} text-white`}>
                            {feature.icon}
                    </div>
                          <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                        </motion.div>
                      ))}
                  </div>
                  </motion.div>
                </AnimatePresence>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Link to="/contact">
                      Get Started Now <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="rounded-full px-8 py-6 text-lg border-2 border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/10"
                  >
                    <Link to="/branches">
                      Find Nearest Branch <MapPin className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                    </div>

                {/* Trust Indicators */}
                <div className="mt-8 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#4eb4a7]" />
                    <span className="text-sm text-gray-600">Licensed & Authorized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#4eb4a7]" />
                    <span className="text-sm text-gray-600">100% Secure</span>
                    </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#4eb4a7]" />
                    <span className="text-sm text-gray-600">Quick Processing</span>
                  </div>
                </div>
              </motion.div>

              {/* Right Side - Dynamic Visual Representation */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Main Visual Card */}
                <div className="relative">
                  {/* Background Decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4eb4a7]/20 to-[#85cbc3]/20 rounded-3xl transform rotate-6" />
                  
                  {/* Main Card */}
                  <motion.div 
                    className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card Header */}
                    <div className={`p-8 bg-gradient-to-r ${serviceDetails[selectedService].color}`}>
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{serviceDetails[selectedService].title}</h3>
                          <div className="flex items-center gap-4">
                            <div className="text-3xl font-bold">{serviceDetails[selectedService].stats.value}</div>
                            <div className="text-sm opacity-90">{serviceDetails[selectedService].stats.label}</div>
                          </div>
                        </div>
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                          {selectedService === 'documentation' ? 
                            <FileText className="w-10 h-10" /> : 
                            <CreditCard className="w-10 h-10" />
                          }
                        </div>
                      </div>
                    </div>

                    {/* Interactive Service Preview */}
                    <div className="p-8">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedService}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          {selectedService === 'documentation' ? (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <FileCheck className="w-6 h-6 text-[#4eb4a7]" />
                                  <span className="font-medium">Property Registration</span>
                  </div>
                                <span className="text-sm text-gray-500">1 day</span>
                </div>
                              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <Shield className="w-6 h-6 text-[#4eb4a7]" />
                                  <span className="font-medium">Legal Documents</span>
                                </div>
                                <span className="text-sm text-gray-500">1-3 days</span>
                              </div>
                              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <Briefcase className="w-6 h-6 text-[#4eb4a7]" />
                                  <span className="font-medium">Business Permits</span>
                                </div>
                                <span className="text-sm text-gray-500">5-7 days</span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <Home className="w-6 h-6 text-[#60afb4]" />
                                  <span className="font-medium">Home Loans</span>
                                </div>
                                <span className="text-sm text-gray-500">Up to ₹1 Cr</span>
                              </div>
                              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <Car className="w-6 h-6 text-[#60afb4]" />
                                  <span className="font-medium">Vehicle Loans</span>
                                </div>
                                <span className="text-sm text-gray-500">90% Financing</span>
                              </div>
                              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <TrendingUp className="w-6 h-6 text-[#60afb4]" />
                                  <span className="font-medium">Business Loans</span>
                                </div>
                                <span className="text-sm text-gray-500">Quick Approval</span>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Call to Action */}
                      <motion.div 
                        className="mt-6 text-center"
                        whileHover={{ scale: 1.02 }}
                      >
                        <Link 
                          to="/services" 
                          className="inline-flex items-center gap-2 text-[#4eb4a7] font-medium hover:gap-3 transition-all"
                        >
                          View All Services <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div 
                    className="absolute -top-8 -right-8 bg-[#85cbc3]/20 rounded-full p-4"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-[#60afb4]" />
                  </motion.div>

                  <motion.div 
                    className="absolute -bottom-8 -left-8 bg-[#4eb4a7]/20 rounded-full p-4"
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [360, 180, 0]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <Shield className="w-6 h-6 text-[#4eb4a7]" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator with Animation */}
          <motion.button 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            onClick={scrollToContent}
            animate={{ 
              y: [0, 10, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="flex flex-col items-center gap-2 text-gray-600 hover:text-[#4eb4a7] transition-colors">
              <span className="text-sm font-medium">Discover More</span>
              <ChevronDown className="w-5 h-5" />
            </div>
          </motion.button>
        </section>

        {/* Features Section - Prince Group Advantage */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4eb4a7]/5 via-transparent to-[#85cbc3]/5" />
            <motion.div 
              className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#4eb4a7]/10 rounded-full blur-3xl"
              animate={{ 
                x: [0, 100, 0],
                y: [-50, 50, -50],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#85cbc3]/10 rounded-full blur-3xl"
              animate={{ 
                x: [0, -100, 0],
                y: [0, -100, 0],
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                ease: "linear",
                delay: 5
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4eb4a7]/10 to-[#85cbc3]/10 px-6 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#4eb4a7]" />
                <span className="text-sm font-bold text-[#4eb4a7] uppercase tracking-wide">Why Choose Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Prince Group's Trusted 
                <span className="bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] bg-clip-text text-transparent"> Documentation Excellence</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Since 2018, Prince Group has become the most trusted name in Kanyakumari District for document registration and loan services, with over 33,500+ successful document registrations and ₹40 crore in loan disbursements.
              </p>
            </motion.div>

            {/* Features Grid with Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: <Users className="h-8 w-8" />,
                  squareIcon: <Heart className="h-5 w-5" />,
                  title: "30000+ Happy Customers",
                  description: "Trusted by thousands across Kanyakumari for reliable document processing and loan services",
                  color: "from-[#4eb4a7] to-[#60afb4]",
                  delay: 0,
                  animation: {
                    type: "pulse",
                    scale: [1, 1.2, 1],
                    duration: 1.5
                  }
                },
                {
                  icon: <MapPin className="h-8 w-8" />,
                  squareIcon: <Building2 className="h-5 w-5" />,
                  title: "20+ Branch Network",
                  description: "Extensive coverage with convenient branches throughout Kanyakumari District for easy document registration",
                  color: "from-[#60afb4] to-[#85cbc3]",
                  delay: 0.1,
                  animation: {
                    type: "bounce",
                    y: [0, -3, 0],
                    duration: 1.5
                  }
                },
                {
                  icon: <Clock className="h-8 w-8" />,
                  squareIcon: <Timer className="h-5 w-5" />,
                  title: "Same Day Processing",
                  description: "Fast document registration and loan approvals with efficient same-day processing systems",
                  color: "from-[#85cbc3] to-[#4eb4a7]",
                  delay: 0.2,
                  animation: {
                    type: "spin",
                    rotate: [0, 360],
                    duration: 4
                  }
                },
                {
                  icon: <Shield className="h-8 w-8" />,
                  squareIcon: <CheckCircle className="h-5 w-5" />,
                  title: "100% Secure & Legal",
                  description: "Government authorized documentation services with complete legal compliance and transparency",
                  color: "from-[#4eb4a7] to-[#85cbc3]",
                  delay: 0.3,
                  animation: {
                    type: "ping",
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.1, 1],
                    duration: 1.5
                  }
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                >
                  <div className="relative h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Icon with Gradient Background */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mb-4 relative`}>
                      <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                        <div className={`bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                    {feature.icon}
                  </div>
                      </div>
                      {/* Small Icon Square */}
                      <motion.div 
                        className="absolute -right-2 -bottom-2 w-8 h-8 rounded-lg bg-gradient-to-br from-[#4eb4a7] to-[#85cbc3] flex items-center justify-center text-white shadow-md"
                        animate={
                          feature.animation?.type === "pulse" ? { boxShadow: ["0 4px 6px rgba(78, 180, 167, 0.3)", "0 8px 15px rgba(78, 180, 167, 0.6)", "0 4px 6px rgba(78, 180, 167, 0.3)"] } :
                          feature.animation?.type === "bounce" ? { y: [0, -5, 0], boxShadow: ["0 4px 6px rgba(78, 180, 167, 0.3)", "0 8px 15px rgba(78, 180, 167, 0.5)", "0 4px 6px rgba(78, 180, 167, 0.3)"] } :
                          feature.animation?.type === "spin" ? { rotate: [0, 45, 0], borderRadius: ["0.5rem", "1rem", "0.5rem"] } :
                          feature.animation?.type === "ping" ? { scale: [1, 1.1, 1], boxShadow: ["0 0 0 0 rgba(78, 180, 167, 0)", "0 0 0 8px rgba(78, 180, 167, 0.3)", "0 0 0 0 rgba(78, 180, 167, 0)"] } :
                          {}
                        }
                        transition={{ 
                          duration: (feature.animation?.duration || 1.5) * 1.5, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        <motion.div
                          animate={
                            feature.animation?.type === "pulse" ? { scale: feature.animation.scale } :
                            feature.animation?.type === "bounce" ? { y: feature.animation.y } :
                            feature.animation?.type === "spin" ? { rotate: feature.animation.rotate } :
                            feature.animation?.type === "ping" ? { opacity: feature.animation.opacity, scale: feature.animation.scale } :
                            {}
                          }
                          transition={{ 
                            duration: feature.animation?.duration || 1.5, 
                            repeat: Infinity,
                            ease: "easeInOut" 
                          }}
                        >
                          {feature.squareIcon}
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-[#4eb4a7] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>

                    {/* Animated Corner Decoration */}
                    <motion.div 
                      className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br ${feature.color} rounded-full opacity-10`}
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Statistics Bar */}
            <motion.div 
              className="bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] rounded-3xl p-8 shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
                {[
                  { value: "8+", label: "Years in Kanyakumari" },
                  { value: "33500+", label: "Documents Processed" },
                  { value: "40crore +", label: "Loans Disbursed" },
                  { value: "98%", label: "Customer Satisfaction" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Background Patterns */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%234eb4a7%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          </div>
          
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4eb4a7]/10 to-[#85cbc3]/10 px-6 py-2 rounded-full mb-6">
                <FileText className="w-4 h-4 text-[#4eb4a7]" />
                <span className="text-sm font-bold text-[#4eb4a7] uppercase tracking-wide">Our Services</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Premier Documentation, Loan & Revenue Services in
                <span className="bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] bg-clip-text text-transparent"> Kanyakumari</span>
              </h2>
              <p className="text-lg text-gray-600">
                Choose from our comprehensive range of legal document registration services and flexible loan options tailored to meet your specific needs with expert guidance
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <FileText className="h-10 w-10" />,
                  title: "Expert Documentation Services",
                  description: "Comprehensive document registration and legal paperwork assistance with government compliance",
                  features: [
                    "Property Registration & Sale Deeds",
                    "Legal Documentation & Power of Attorney",
                    "Business & Partnership Agreements",
                    "Educational Certificates & Affidavits"
                  ],
                  stats: { label: "Documents Processed", value: "33500+" },
                  image: "/lovable-uploads/43081f16-3e26-46ee-bec6-e85ef9aadbbc.png",
                  gradient: "from-[#4eb4a7] to-[#60afb4]",
                  path: "/services",
                  delay: 0
                },
                {
                  icon: <CreditCard className="h-10 w-10" />,
                  title: "Flexible Loan Solutions",
                  description: "Customized financial solutions with competitive interest rates and simplified approval process",
                  features: [
                    "Personal & Home Loans",
                    "Business & SME Financing",
                    "Vehicle & Equipment Loans",
                    "Educational & Agricultural Loans"
                  ],
                  stats: { label: "Loans Disbursed", value: "40crore +" },
                  image: "/lovable-uploads/f4f5c039-d495-44e1-83bd-cc24c888ca39.png",
                  gradient: "from-[#60afb4] to-[#85cbc3]",
                  path: "/services#loans",
                  delay: 0.2
                }
              ].map((service, index) => (
                <motion.div 
                  key={index} 
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: service.delay }}
                >
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
                    {/* Image Section with Overlay */}
                    <div className="relative h-48 overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-80`} />
                      
                      {/* Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          className="bg-white/20 backdrop-blur-sm rounded-full p-6"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="text-white">
                            {service.icon}
                  </div>
                </motion.div>
            </div>

                      {/* Stats Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-[#4eb4a7]" />
                          <span className="text-sm font-bold text-gray-800">{service.stats.value}</span>
              </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-[#4eb4a7] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
            <motion.div 
                            key={idx}
                            className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: service.delay + 0.1 + idx * 0.05 }}
                      >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`} />
                            <span className="text-gray-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Stats Bar */}
                      <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{service.stats.label}</span>
                          <span className="text-lg font-bold text-[#4eb4a7]">{service.stats.value}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button 
                        asChild 
                        className={`w-full bg-gradient-to-r ${service.gradient} text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                      >
                        <Link to={service.path} className="flex items-center justify-center gap-2">
                          Explore Service <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
              </div>
            </motion.div>
              ))}
            </div>
            
            {/* Bottom CTA */}
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-gray-600 mb-4">Need help choosing the right service?</p>
              <Button 
                asChild 
                variant="outline" 
                className="border-2 border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7] hover:text-white rounded-full px-8"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Talk to Our Experts
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <motion.div 
              className="absolute top-10 left-10 w-20 h-20 bg-[#4eb4a7]/10 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-10 right-10 w-32 h-32 bg-[#85cbc3]/10 rounded-full"
              animate={{ 
                scale: [1.5, 1, 1.5],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4eb4a7]/10 to-[#85cbc3]/10 px-6 py-2 rounded-full mb-6">
                <Users className="w-4 h-4 text-[#4eb4a7]" />
                <span className="text-sm font-bold text-[#4eb4a7] uppercase tracking-wide">Testimonials</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What Our 
                <span className="bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] bg-clip-text text-transparent"> Kanyakumari Clients Say</span>
              </h2>
              <p className="text-lg text-gray-600">
                Read genuine success stories from Kanyakumari residents who trusted Prince Group for their documentation and loan requirements
              </p>
            </motion.div>

            {/* Testimonials Carousel */}
            <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                    quote: "Prince Group handled my property registration with exceptional efficiency. Their team's expertise in documentation services saved me significant time and money in Kanyakumari District.",
                    author: "Sneha Patel",
                    position: "Property Owner, Nagercoil",
                    rating: 5,
                    service: "Documentation Services",
                  delay: 0,
                    image: "/customer/1740978306596.jpeg" // Male image
                },
                {
                    quote: "I received my business loan approval within just 5 days! Prince Group offers the most competitive interest rates in Kanyakumari with flexible repayment terms for entrepreneurs.",
                    author: "Priya Nair",
                    position: "Business Owner, Thuckalay",
                    rating: 5,
                    service: "Loan Services",
                  delay: 0.1,
                    image: "/customer/1702451425744.jpeg" // Female image
                },
                {
                    quote: "As a loyal customer for over 5 years, I've relied on Prince Group for multiple documentation and loan services. Their consistent professionalism and expertise is unmatched in Kanyakumari.",
                    author: "Mohammed Ali",
                    position: "Premium Member, Kanyakumari",
                    rating: 5,
                    service: "Multiple Services",
                  delay: 0.2,
                    image: "/customer/1685698257032.jpeg" // Male image
                },
              ].map((testimonial, index) => (
                <motion.div 
                  key={index} 
                    className="group"
                    initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: testimonial.delay }}
                >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full relative overflow-hidden">
                      {/* Quote Icon */}
                      <div className="absolute top-4 right-4 text-[#4eb4a7]/10">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>

                      {/* Service Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="bg-gradient-to-r from-[#4eb4a7]/10 to-[#85cbc3]/10 px-3 py-1 rounded-full">
                          <span className="text-xs font-medium text-[#4eb4a7]">{testimonial.service}</span>
                  </div>
                  </div>

                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.svg 
                            key={i} 
                            className="w-5 h-5 text-yellow-400" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: testimonial.delay + 0.1 + i * 0.05 }}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </motion.svg>
              ))}
            </div>

                      {/* Quote */}
                      <p className="text-gray-700 mb-6 italic relative z-10">
                        "{testimonial.quote}"
                      </p>

                      {/* Author with Image */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author} 
                            className="w-full h-full object-cover"
                          />
              </div>
                        <div>
                          <p className="font-bold text-gray-800">{testimonial.author}</p>
                          <p className="text-sm text-gray-600">{testimonial.position}</p>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4eb4a7]/5 to-[#85cbc3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    </div>
            </motion.div>
                ))}
              </div>

              {/* Testimonial Stats */}
                <motion.div 
                className="mt-12 bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] rounded-2xl p-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-1">30000+</div>
                    <div className="text-sm opacity-90">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">4.8/5</div>
                    <div className="text-sm opacity-90">Average Rating</div>
                      </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">98%</div>
                    <div className="text-sm opacity-90">Satisfaction Rate</div>
                      </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">8+</div>
                    <div className="text-sm opacity-90">Years of Trust</div>
                    </div>
                  </div>
                </motion.div>
            </div>
          </div>
        </section>

        {/* Branches Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-40 h-40 bg-[#4eb4a7]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-60 h-60 bg-[#85cbc3]/5 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4eb4a7]/10 to-[#85cbc3]/10 px-6 py-2 rounded-full mb-6">
                <MapPin className="w-4 h-4 text-[#4eb4a7]" />
                <span className="text-sm font-bold text-[#4eb4a7] uppercase tracking-wide">Our Locations</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Extensive Network of
                <span className="bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] bg-clip-text text-transparent"> 20+ Branches in Kanyakumari</span>
              </h2>
              <p className="text-lg text-gray-600">
                Visit your nearest Prince Group branch in Kanyakumari District for expert document registration services and personalized loan consultations
              </p>
            </motion.div>

            {/* Branches Carousel */}
            <div className="relative">
              <div className="overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-6 w-max auto-scroll-carousel">
              {[
                {
                      name: "Thingal Nagar Branch",
                      phone: "9489359755",
                      address: "Near Thingal Nagar Sub-Register office, Anbu Complex 1st Floor, Thingal Nagar"
                    },
                    {
                      name: "Rajakkamangalam Branch",
                      phone: "8300933178",
                      address: "Near Rajakkamangalam Sub-Register Office No. 11/14, Saraswathi Nathan Complex, Ganapathipuram 629502"
                    },
                    {
                      name: "Kanyakumari Branch",
                      phone: "9150537718",
                      address: "Door no 3B/1, SLB South Street, Near Mutharamman Temple, Nagercoil"
                    },
                    {
                      name: "Palugal Branch",
                      phone: "9361073196",
                      address: "Opposite Palugal Sub-Register Office, Koonampana Market, Koonampana"
                    },
                    {
                      name: "Verlilambi Branch",
                      phone: "7339070114",
                      address: "Opposite to fish Market, Near Verkilambi Register Office, Mallanvillai, Verkilambi, 629166"
                },
                {
                      name: "Karungal Branch",
                      phone: "9384170178",
                      address: "Opposite Royal Enfield Service Showroom 1st Floor, Karungal"
                    },
                    {
                      name: "Thiruvattar Branch",
                      phone: "9789499178",
                      address: "Sindhu Kumar Building, 1st floor, Beside Thanumalayan Hotel, Thiruvattar"
                    },
                    {
                      name: "Kollamcode Branch",
                      phone: "8939258163",
                      address: "Beside Suresh Hotel, 1 st floor, Kollamcode"
                    },
                    {
                      name: "Palliyadi Branch",
                      phone: "9566909178",
                      address: "No 21/133/5, Opposite Palliyadi Sub-Register Office, Alanthurai, Palliyadi"
                    },
                    {
                      name: "Manavalakurichy Branch",
                      phone: "8220594178",
                      address: "Near Manavalakurichy Sub-Register Office, Opposite to Lakshmipuram College Ground, Lakshmipuram"
                    },
                    {
                      name: "Colachel Branch",
                      phone: "9363916484",
                      address: "Opposite Colachel Sub-Register Office, Near David Driving School, Colachel, 629251"
                },
                {
                      name: "Edalagudi Branch",
                      phone: "9363914982",
                      address: "Near Edalagudi Sub-Register Office, Opposit to Government High School, Jaganathan Complex, 1st floor, Edalagudi"
                    },
                    {
                      name: "Boothapandi Branch",
                      phone: "7448975519",
                      address: "Opposite to National Highway Office, Gerome Complex, Ist Floor, Boothapandi"
                    },
                    {
                      name: "Vadasery Branch",
                      phone: "9150537718",
                      address: "Door no 3B/1, SLB South Street, Near Mutharamman Temple, Nagercoil"
                    },
                    {
                      name: "Munjirai Branch",
                      phone: "8681980178",
                      address: "Opposite to Munjirai Sub-Register Office, Munjirai"
                    },
                    {
                      name: "Thovalai Branch",
                      phone: "9150537718",
                      address: "Near Thovalai Sub Register Office, Sister Complex, 1st Floor, Main Road, Thovalai 629302"
                    },
                    {
                      name: "Arumanai Branch",
                      phone: "9150537718",
                      address: "Beside Arumanai Sub-Register Office, Punniyam, Arumanai"
                    },
                    {
                      name: "Thuckalay Branch",
                      phone: "9600303653",
                      address: "Opposite to Thaluk Office, Near Anna Statue, Market Road, Thuckalay"
                    }
                  ].map((branch, index) => (
                <motion.div 
                  key={index} 
                      className="w-[320px] flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group h-full">
                        {/* Branch Header with Gradient */}
                        <div className="relative h-32 bg-gradient-to-br from-[#4eb4a7] to-[#85cbc3] p-6">
                          <div className="absolute inset-0 bg-black/10" />
                          <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-2">{branch.name}</h3>
                            <div className="flex items-center gap-2 text-white/90">
                              <Phone className="w-4 h-4" />
                              <span className="text-sm">{branch.phone}</span>
                      </div>
                    </div>
                          {/* Decorative Element */}
                          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                    </div>

                        {/* Branch Details */}
                  <div className="p-6">
                          <div className="flex items-start gap-3 mb-4">
                            <MapPin className="w-5 h-5 text-[#4eb4a7] flex-shrink-0 mt-1" />
                            <p className="text-sm text-gray-600 line-clamp-3">{branch.address}</p>
                    </div>

                          <div className="flex items-center gap-3 mb-4">
                            <Clock className="w-5 h-5 text-[#4eb4a7]" />
                            <p className="text-sm text-gray-600">Mon-Sat: 9:00 AM - 6:00 PM</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-3">
                            <Button 
                              asChild 
                              className="w-full bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] text-white rounded-full hover:shadow-lg transition-all"
                            >
                              <Link to={`tel:${branch.phone}`} className="flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" />
                                Call Now
                              </Link>
                            </Button>
                            <Button 
                              asChild 
                              variant="outline" 
                              className="w-full border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/10 rounded-full"
                            >
                              <Link to="/branches" className="flex items-center justify-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Get Directions
                      </Link>
                    </Button>
                          </div>
                        </div>
                  </div>
                </motion.div>
              ))}
            </div>
              </div>

              {/* Scroll Indicators */}
              <div className="flex justify-center mt-8 gap-2">
                <div className="h-2 w-16 bg-[#4eb4a7] rounded-full" />
                <div className="h-2 w-2 bg-gray-300 rounded-full" />
                <div className="h-2 w-2 bg-gray-300 rounded-full" />
              </div>
            </div>

            {/* View All CTA */}
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                asChild 
                className="bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] text-white rounded-full px-8 hover:shadow-lg transition-all"
              >
                <Link to="/branches" className="flex items-center gap-2">
                  View All Branches <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why Trust Us Section - Redesigned */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          {/* Enhanced Background Elements for entire section */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4eb4a7]/5 via-white to-[#85cbc3]/5 z-0"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[10%] right-[20%] w-60 h-60 rounded-full border-2 border-[#4eb4a7]/10"></div>
            <div className="absolute bottom-[15%] left-[25%] w-80 h-80 rounded-full border border-[#85cbc3]/10"></div>
            <div className="absolute top-[45%] left-[10%] w-40 h-40 rounded-full border border-[#60afb4]/10"></div>
            <motion.div 
              className="absolute top-20 left-20 w-32 h-32 bg-[#4eb4a7]/5 rounded-full blur-3xl"
              animate={{ 
                x: [0, 50, 0], 
                y: [0, -30, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-20 right-20 w-48 h-48 bg-[#85cbc3]/5 rounded-full blur-3xl"
              animate={{ 
                x: [0, -50, 0], 
                y: [0, 30, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4eb4a7]/10 to-[#85cbc3]/10 px-6 py-2 rounded-full mb-6">
                  <Shield className="w-4 h-4 text-[#4eb4a7]" />
                  <span className="text-sm font-bold text-[#4eb4a7] uppercase tracking-wide">Why Trust Us</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  Kanyakumari's Leading
                  <span className="bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] bg-clip-text text-transparent"> Documentation Company</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Since 2018, Prince Group has become the most trusted name in Kanyakumari District for document registration and loan services, with over 33,500+ successful document registrations and ₹40 crore in loan disbursements.
                </p>

                {/* Trust Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: <Shield className="h-6 w-6" />,
                      title: "Government Authorized",
                      description: "Fully licensed for legal document registration services in Kanyakumari"
                    },
                    {
                      icon: <Lock className="h-6 w-6" />,
                      title: "Data Security",
                      description: "Secure document processing with confidential information protection"
                    },
                    {
                      icon: <Database className="h-6 w-6" />,
                      title: "Digital Infrastructure",
                      description: "Advanced document management system for efficient processing"
                    },
                    {
                      icon: <Cpu className="h-6 w-6" />,
                      title: "Tech-Enabled",
                      description: "Modern loan application tracking and document registration updates"
                    },
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#4eb4a7]/30">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#4eb4a7] to-[#85cbc3] rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                            <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] text-white rounded-full px-8 py-6 hover:shadow-lg transition-all"
                  >
                    <Link to="/about" className="flex items-center gap-2">
                      Learn More About Us <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Right Visual - Interactive Stats */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Central Circle with Fixed Positioned Stats */}
                <div className="relative w-full h-[500px] max-w-md mx-auto overflow-hidden">
                  {/* Background Glow */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-[#4eb4a7]/20 to-[#85cbc3]/20 rounded-full blur-3xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.7, 0.5]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Center Badge */}
                      <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                    animate={{ 
                      y: [0, -8, 0],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="bg-white rounded-full p-8 shadow-[0_10px_25px_-5px_rgba(78,180,167,0.3)] backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-5xl font-bold bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] bg-clip-text text-transparent mb-1">
                          8+
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Years in Kanyakumari</div>
                      </div>
                    </div>
                      </motion.div>

                  {/* Stat: Branches - Top Right with floating animation */}
                      <motion.div 
                    className="absolute top-[10%] right-[30%] z-10"
                    animate={{ 
                      y: [0, -6, 0],
                      x: [0, 4, 0]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    <motion.div 
                      className="bg-white rounded-full py-4 px-5 shadow-lg text-center hover:shadow-xl transition-all cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      >
                      <div className="text-2xl font-bold text-[#4eb4a7]">20+</div>
                      <div className="text-xs text-gray-600">Branches</div>
                      </motion.div>
                  </motion.div>

                  {/* Stat: Members - Right with floating animation */}
                      <motion.div 
                    className="absolute top-[50%] right-[10%] z-10"
                    animate={{ 
                      y: [0, 6, 0],
                      x: [0, 3, 0]
                    }}
                    transition={{ 
                      duration: 4.5, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <motion.div 
                      className="bg-white rounded-full py-4 px-5 shadow-lg text-center hover:shadow-xl transition-all cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      >
                      <div className="text-2xl font-bold text-[#4eb4a7]">5k+</div>
                      <div className="text-xs text-gray-600">Members</div>
                      </motion.div>
                  </motion.div>

                  {/* Stat: Services - Bottom with floating animation */}
                      <motion.div 
                    className="absolute top-[80%] left-[30%] z-10"
                    animate={{ 
                      y: [0, 8, 0],
                      x: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  >
                    <motion.div 
                      className="bg-white rounded-full py-4 px-5 shadow-lg text-center hover:shadow-xl transition-all cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      >
                      <div className="text-2xl font-bold text-[#4eb4a7]">10k+</div>
                      <div className="text-xs text-gray-600">Services</div>
                      </motion.div>
                  </motion.div>

                  {/* Stat: Satisfaction - Left with floating animation */}
                  <motion.div 
                    className="absolute top-[50%] left-[10%] z-10"
                    animate={{ 
                      y: [0, -7, 0],
                      x: [0, -4, 0]
                    }}
                    transition={{ 
                      duration: 5.5, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2
                    }}
                  >
                    <motion.div 
                      className="bg-white rounded-full py-4 px-5 shadow-lg text-center hover:shadow-xl transition-all cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="text-2xl font-bold text-[#4eb4a7]">98%</div>
                      <div className="text-xs text-gray-600">Satisfaction</div>
                    </motion.div>
                  </motion.div>

                  {/* Decorative Elements */}
                  <motion.div 
                    className="absolute top-[30%] right-[40%] w-8 h-8 bg-[#4eb4a7]/20 rounded-full z-0"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      y: [0, 15, 0],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div 
                    className="absolute bottom-[35%] left-[40%] w-12 h-12 bg-[#85cbc3]/30 rounded-full z-0"
                    animate={{ 
                      scale: [1.2, 1, 1.2],
                      y: [0, -20, 0],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                  <motion.div 
                    className="absolute top-[70%] right-[20%] w-6 h-6 bg-[#60afb4]/20 rounded-full z-0"
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{ 
                      duration: 7, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Membership CTA Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-6xl mx-auto relative rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4eb4a7] to-[#60afb4] z-0"></div>
              <div className="absolute inset-0 dot-pattern opacity-10 z-1"></div>
              
              <div className="blob-shape bg-[#85cbc3] w-80 h-80 rounded-full top-0 left-[10%] animate-pulse"></div>
              <div className="blob-shape bg-[#60afb4] w-96 h-96 rounded-full bottom-0 right-[5%] animate-pulse"></div>

              <div className="px-6 py-16 md:p-16 text-center relative z-10">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  Register for Document, Loan & Revenue Services in Kanyakumari
                </motion.h2>
                <motion.p 
                  className="text-xl text-white/80 mb-10 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Join 30000+ satisfied customers who trust Prince Group for reliable document registration and loan services across Kanyakumari District. Same-day processing available.
                </motion.p>
                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <Button asChild className="bg-white text-[#4eb4a7] hover:bg-gray-100 px-8 py-6 text-lg flex items-center gap-2 rounded-full shadow-lg hover:shadow-xl">
                    <Link to="/membership">Register for Services <ArrowRight className="ml-1" /></Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
};

export default Index;

