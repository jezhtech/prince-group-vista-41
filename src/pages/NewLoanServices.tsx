import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CreditCard, Wallet, CheckCircle, Star, HelpCircle, List, Shield, Clock, ArrowRight, 
  BanknoteIcon, BarChart4, GraduationCap, HomeIcon, Car, Building, Sparkles, ArrowUpRight, Check, BadgePercent, PiggyBank, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NewLoanServices = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const loanTypes = [
    {
      id: "personal",
      title: "Personal Loans",
      icon: <Wallet className="w-6 h-6" />,
      features: [
        "Quick approval process",
        "Minimal documentation",
        "Flexible repayment options",
        "Competitive interest rates",
        "No collateral required",
        "Loan amount up to ₹10 Lakhs",
        "Tenure up to 5 years"
      ]
    },
    {
      id: "business",
      title: "Business Loans",
      icon: <Building className="w-6 h-6" />,
      features: [
        "Working capital loans",
        "Equipment financing",
        "Business expansion loans",
        "Startup funding",
        "MSME special schemes",
        "Loan amount up to ₹50 Lakhs",
        "Tenure up to 7 years"
      ]
    },
    {
      id: "home",
      title: "Home Loans",
      icon: <HomeIcon className="w-6 h-6" />,
      features: [
        "Affordable interest rates",
        "High loan amount availability",
        "Long repayment tenure",
        "Balance transfer option",
        "Home improvement loans",
        "Loan amount up to ₹5 Crores",
        "Tenure up to 30 years"
      ]
    },
    {
      id: "vehicle",
      title: "Vehicle Loans",
      icon: <Car className="w-6 h-6" />,
      features: [
        "New and used vehicle financing",
        "Quick loan processing",
        "Attractive interest rates",
        "Flexible repayment options",
        "Minimal documentation",
        "Loan amount up to ₹25 Lakhs",
        "Tenure up to 7 years"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Loan Services - Prince Group</title>
        <meta name="description" content="Flexible financial solutions including personal loans, business loans, home loans, and vehicle loans with competitive rates, minimal documentation, and quick approvals." />
      </Helmet>
      <MainNavbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#4eb4a7]/10 via-white to-[#85cbc3]/10">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <motion.div 
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#4eb4a7]/10 to-[#85cbc3]/10 rounded-full transform translate-x-1/3 -translate-y-1/3"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-[#85cbc3]/10 to-[#4eb4a7]/10 rounded-full transform -translate-x-1/3 translate-y-1/3"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2] 
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
              {/* Left Side Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="inline-flex items-center gap-2 bg-[#4eb4a7]/10 px-4 py-2 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-[#4eb4a7]" />
                  <span className="text-sm font-medium text-[#4eb4a7]">40crore+ Loan Amount Disbursed</span>
                </div>

                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                    Loan Services
                  </span>
                  <br /> 
                  <span className="text-gray-800">Simplified & Accessible</span>
                </h1>

                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Flexible financial solutions with competitive rates, minimal documentation, and quick approvals to help you achieve your goals.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Apply for a Loan
                  </Button>
                  <Button 
                    variant="outline" 
                    className="rounded-full px-8 py-6 border-2 border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/10"
                    asChild
                  >
                    <a href="#loan-types">
                      Explore Loans <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-12">
                  <motion.div 
                    className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-2xl font-bold text-[#4eb4a7]">9.5%</div>
                    <div className="text-sm text-gray-600">Interest Rates</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="text-2xl font-bold text-[#4eb4a7]">24hrs</div>
                    <div className="text-sm text-gray-600">Approval Time</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-2xl font-bold text-[#4eb4a7]">98%</div>
                    <div className="text-sm text-gray-600">Approval Rate</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Side Visuals */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {/* Loan Visualization */}
                <div className="relative h-[500px] flex items-center justify-center">
                  {/* Animated Loan Card */}
                  <motion.div 
                    className="absolute w-64 h-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 transform rotate-[-8deg] z-10"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [-8, -6, -8],
                      boxShadow: [
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                      ]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="h-4 w-12 bg-[#4eb4a7]/20 rounded mb-4"></div>
                    <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                    <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                    <div className="h-2 w-3/4 bg-gray-100 rounded mb-4"></div>
                    
                    <div className="h-20 w-full bg-[#4eb4a7]/10 rounded mb-4 flex items-center justify-center">
                      <CreditCard className="h-10 w-10 text-[#4eb4a7]" />
                    </div>
                    
                    <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                    <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                    <div className="h-2 w-2/3 bg-gray-100 rounded mb-6"></div>
                    
                    <div className="flex justify-between items-center">
                      <div className="h-6 w-20 bg-[#4eb4a7]/20 rounded"></div>
                      <div className="h-8 w-8 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center">
                        <Check className="h-4 w-4 text-[#4eb4a7]" />
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute w-64 h-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 transform rotate-[5deg] translate-x-10 translate-y-10 z-20"
                    animate={{ 
                      y: [10, 0, 10],
                      rotate: [5, 7, 5],
                      boxShadow: [
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                      ]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    <div className="h-4 w-12 bg-[#60afb4]/20 rounded mb-4"></div>
                    <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                    <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                    <div className="h-2 w-3/4 bg-gray-100 rounded mb-4"></div>
                    
                    <div className="h-20 w-full bg-[#60afb4]/10 rounded mb-4 flex items-center justify-center">
                      <PiggyBank className="h-10 w-10 text-[#60afb4]" />
                    </div>
                    
                    <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                    <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                    <div className="h-2 w-2/3 bg-gray-100 rounded mb-6"></div>
                    
                    <div className="flex justify-between items-center">
                      <div className="h-6 w-20 bg-[#60afb4]/20 rounded"></div>
                      <div className="h-8 w-8 rounded-full bg-[#60afb4]/20 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-[#60afb4]" />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Floating Icons */}
                  <motion.div 
                    className="absolute top-5 right-16 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 z-30"
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <BadgePercent className="h-6 w-6 text-[#4eb4a7]" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute bottom-20 left-5 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 z-30"
                    animate={{ 
                      y: [0, 15, 0],
                      rotate: [0, -10, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <Building className="h-6 w-6 text-[#60afb4]" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute bottom-10 right-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 z-30"
                    animate={{ 
                      y: [0, 10, 0],
                      x: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    <HomeIcon className="h-5 w-5 text-[#85cbc3]" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Bottom Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
            </svg>
          </div>
        </section>

        {/* Loan Types Section */}
        <section id="loan-types" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4eb4a7]/10 to-[#85cbc3]/10 px-6 py-2 rounded-full mb-6">
                <CreditCard className="w-4 h-4 text-[#4eb4a7]" />
                <span className="text-sm font-bold text-[#4eb4a7] uppercase tracking-wide">Loan Types</span>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                Find the <span className="bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] bg-clip-text text-transparent">Perfect Loan</span> for Your Needs
              </h2>
              <p className="text-lg text-gray-600">
                From personal expenses to business growth, we offer a variety of loan options tailored to help you achieve your financial goals.
              </p>
            </motion.div>

            {/* Innovative Loan Category Cards */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {loanTypes.map((category, index) => (
                  <motion.div
                    key={category.id}
                    className={`relative overflow-hidden rounded-2xl cursor-pointer ${
                      activeTab === category.id ? 'ring-2 ring-[#4eb4a7]' : ''
                    }`}
                    onClick={() => setActiveTab(category.id)}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Card Background with Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4eb4a7]/5 to-[#85cbc3]/5" />
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4eb4a7]/10 to-[#85cbc3]/10 rounded-full transform translate-x-16 -translate-y-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-[#4eb4a7]/10 to-[#85cbc3]/10 rounded-full transform -translate-x-12 translate-y-12" />
                    
                    <div className="relative p-8 h-full flex flex-col">
                      {/* Category Icon */}
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                        activeTab === category.id 
                          ? 'from-[#4eb4a7] to-[#60afb4]' 
                          : 'from-[#4eb4a7]/10 to-[#85cbc3]/10'
                      } flex items-center justify-center mb-6 ${
                        activeTab === category.id ? 'text-white' : 'text-[#4eb4a7]'
                      }`}>
                        {category.icon}
                      </div>
                      
                      {/* Category Title and Count */}
                      <h3 className="text-2xl font-bold mb-2 text-gray-800">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {category.features.length} features
                      </p>
                      
                      {/* Preview of Features */}
                      <div className="space-y-2 mb-4">
                        {category.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#4eb4a7]" />
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </div>
                        ))}
                        {category.features.length > 3 && (
                          <div className="text-[#4eb4a7] text-sm font-medium">
                            +{category.features.length - 3} more...
                          </div>
                        )}
                      </div>
                      
                      {/* Selection Indicator */}
                      <div className="mt-auto flex items-center gap-2 text-[#4eb4a7] font-medium">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Selected Loan Type Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg border border-gray-100"
              >
                <div className="mb-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4eb4a7] to-[#60afb4] flex items-center justify-center text-white">
                    {loanTypes.find(t => t.id === activeTab)?.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {loanTypes.find(t => t.id === activeTab)?.title} Features
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {loanTypes.find(t => t.id === activeTab)?.features.map((feature, idx) => (
                    <motion.div 
                      key={idx} 
                      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-[#4eb4a7]/30 hover:bg-[#4eb4a7]/5"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: idx * 0.03 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#4eb4a7]/10 flex items-center justify-center text-[#4eb4a7]">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-gray-800">{feature}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Action Button */}
                <motion.div 
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] text-white rounded-full px-8"
                  >
                    <div className="flex items-center gap-2">
                      Apply for {loanTypes.find(t => t.id === activeTab)?.title} <ArrowRight className="w-4 h-4" />
                    </div>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] bg-clip-text text-transparent">Why Choose</span> Our Loan Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience exceptional service, competitive rates, and a seamless loan process designed with your needs in mind
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Competitive Rates",
                  description: "Our interest rates are among the lowest in the market, helping you save more on repayments.",
                  icon: <BadgePercent className="h-6 w-6" />
                },
                {
                  title: "Fast Approvals",
                  description: "Get your loan approved in as little as 24 hours with our streamlined application process.",
                  icon: <Clock className="h-6 w-6" />
                },
                {
                  title: "Minimal Documentation",
                  description: "We've simplified paperwork requirements to make the application process hassle-free.",
                  icon: <FileText className="h-6 w-6" />
                },
                {
                  title: "Flexible Repayment",
                  description: "Choose from multiple repayment options tailored to fit your financial situation.",
                  icon: <BarChart4 className="h-6 w-6" />
                },
                {
                  title: "Dedicated Support",
                  description: "Our loan specialists provide personalized guidance throughout your loan journey.",
                  icon: <CheckCircle className="h-6 w-6" />
                },
                {
                  title: "No Hidden Charges",
                  description: "Complete transparency with clear disclosure of all applicable fees and charges.",
                  icon: <Shield className="h-6 w-6" />
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-[#4eb4a7] hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4eb4a7]/10 to-[#85cbc3]/10 flex items-center justify-center mb-6 text-[#4eb4a7]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                What Our <span className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] bg-clip-text text-transparent">Customers Say</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from individuals and businesses who have achieved their goals with our loan services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rajesh Kumar",
                  position: "Business Owner",
                  testimonial: "The business loan from Prince Group helped me expand my restaurant chain. Their quick processing and competitive rates made the whole experience smooth and hassle-free.",
                  rating: 5
                },
                {
                  name: "Priya Sharma",
                  position: "Homeowner",
                  testimonial: "Getting a home loan was so much easier than I expected. The staff was helpful throughout the process, and I was able to purchase my dream home with very favorable terms.",
                  rating: 5
                },
                {
                  name: "Vivek Patel",
                  position: "Entrepreneur",
                  testimonial: "As a startup founder, I needed capital quickly. Prince Group understood my business model and approved my loan in just 48 hours. Their service exceeded my expectations.",
                  rating: 4
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.testimonial}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4eb4a7]/20 to-[#60afb4]/20 flex items-center justify-center text-[#4eb4a7] font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.position}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl font-bold text-[#4eb4a7] mb-2">15,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-4xl font-bold text-[#4eb4a7] mb-2">₹40Crore+</div>
                <div className="text-gray-600">Loans Disbursed</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-4xl font-bold text-[#4eb4a7] mb-2">98%</div>
                <div className="text-gray-600">Approval Rate</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-4xl font-bold text-[#4eb4a7] mb-2">15+</div>
                <div className="text-gray-600">Years of Service</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Apply for a loan today and take the first step toward achieving your financial goals
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-[#4eb4a7] hover:bg-gray-100 rounded-full px-8">
                  Apply Now
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
};

export default NewLoanServices; 