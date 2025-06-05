import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, CheckCircle, Star, HelpCircle, List, Shield, Clock, ArrowRight, 
  FileCheck, Briefcase, GraduationCap, Users, Sparkles, ArrowUpRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const DocumentationServices = () => {
  const [activeTab, setActiveTab] = useState("property");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const documentTypes = [
    {
      id: "property",
      title: "Property Documents",
      icon: <FileCheck className="w-6 h-6 text-[#4eb4a7]" />,
      documents: [
        "Sale Deed", 
        "Power of Attorney", 
        "Memorandum of Title Deed",
        "Power Cancel",
        "Settlement",
        "Will",
        "Will Cancel",
        "Partition Deed",
        "Ratification Deed",
        "Rectification Deed",
        "Release Deed",
        "Gift Deed",
        "Marriage Registration",
        "Exchange Deed",
        "Receipt Deed",
        "Lease Deed",
        "Sale Agreement",
        "Building Agreement",
        "Cancel Deed"
      ]
    },
    {
      id: "business",
      title: "Business Documents",
      icon: <Briefcase className="w-6 h-6" />,
      documents: [
        "Partnership Deed",
        "Company Registration",
        "GST Registration",
        "Business License",
        "MSME Registration",
        "Trade License",
        "Trademark Registration",
        "Startup Registration",
        "Import-Export Code",
        "Shop Establishment Act"
      ]
    },
    {
      id: "educational",
      title: "Educational Documents",
      icon: <GraduationCap className="w-6 h-6" />,
      documents: [
        "Degree Certificate",
        "Transcripts",
        "Migration Certificate",
        "Transfer Certificate",
        "Character Certificate",
        "NIOS Documents",
        "Open University Documents",
        "Scholarship Documents",
        "Educational Affidavits"
      ]
    },
    {
      id: "legal",
      title: "Legal Notary Services",
      icon: <Shield className="w-6 h-6" />,
      documents: [
        "Affidavits",
        "Declaration",
        "Undertaking",
        "Legal Notice",
        "Surety Bond",
        "Indemnity Bond",
        "Will Notarization",
        "Agreement Notarization",
        "Document Authentication"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Documentation Services - Prince Group</title>
        <meta name="description" content="Professional documentation services including property registration, legal documentation, business permits, and educational certificates with expert guidance and same-day processing." />
      </Helmet>
      <MainNavbar />
      <main className="flex-grow pt-20">
        {/* Innovative Hero Section */}
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
                  <span className="text-sm font-medium text-[#4eb4a7]">33500+ Documents Processed</span>
                </div>

                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                    Document Services
                  </span>
                  <br /> 
                  <span className="text-gray-800">Simplified & Streamlined</span>
                </h1>

                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Expert document registration and processing services with seamless execution, transparent procedures, and industry-leading efficiency.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link to="/contact">
                Schedule a Consultation
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="rounded-full px-8 py-6 border-2 border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/10"
                    asChild
                  >
                    <a href="#document-types">
                      Explore Services <ArrowRight className="ml-2 h-5 w-5" />
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
                    <div className="text-2xl font-bold text-[#4eb4a7]">8+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="text-2xl font-bold text-[#4eb4a7]">20+</div>
                    <div className="text-sm text-gray-600">Branches</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-2xl font-bold text-[#4eb4a7]">98%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
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
                {/* Document Stack Visualization */}
                <div className="relative h-[500px] flex items-center justify-center">
                  {/* Animated Documents */}
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
                      <FileText className="h-10 w-10 text-[#4eb4a7]" />
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
                      <Briefcase className="h-10 w-10 text-[#60afb4]" />
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
                    <Shield className="h-6 w-6 text-[#4eb4a7]" />
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
                    <GraduationCap className="h-6 w-6 text-[#60afb4]" />
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
                    <FileCheck className="h-5 w-5 text-[#85cbc3]" />
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

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Our Documentation Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We offer a comprehensive range of documentation services to help individuals and businesses navigate complex paperwork requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Property Registration",
                  description: "Complete property registration services including document verification, preparation, and submission.",
                  icon: <FileCheck className="h-8 w-8 text-white" />,
                  bgGradient: "from-[#4eb4a7] to-[#60afb4]"
                },
                {
                  title: "Legal Documentation",
                  description: "Preparation and processing of various legal documents with proper authentication and verification.",
                  icon: <Shield className="h-8 w-8 text-white" />,
                  bgGradient: "from-[#60afb4] to-[#85cbc3]"
                },
                {
                  title: "License Applications",
                  description: "Assistance with various license applications and renewals for businesses and individuals.",
                  icon: <Briefcase className="h-8 w-8 text-white" />,
                  bgGradient: "from-[#85cbc3] to-[#4eb4a7]"
                },
                {
                  title: "Notary Services",
                  description: "Professional notary services for document authentication and certification.",
                  icon: <CheckCircle className="h-8 w-8 text-white" />,
                  bgGradient: "from-[#4eb4a7] to-[#85cbc3]"
                },
                {
                  title: "Document Translation",
                  description: "Accurate translation of documents to and from multiple languages with certification.",
                  icon: <GraduationCap className="h-8 w-8 text-white" />,
                  bgGradient: "from-[#60afb4] to-[#4eb4a7]"
                },
                {
                  title: "Document Verification",
                  description: "Thorough verification of documents to ensure authenticity and compliance with legal requirements.",
                  icon: <Users className="h-8 w-8 text-white" />,
                  bgGradient: "from-[#85cbc3] to-[#60afb4]"
                }
              ].map((service, index) => (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.bgGradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                      
                      {/* Decorative dots */}
                      <div className="absolute top-0 right-0 w-3 h-3 bg-white/20 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 bg-white/20 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[#4eb4a7] transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="text-3xl font-bold text-[#4eb4a7] mb-2">33500+</div>
                <div className="text-gray-600">Documents Processed</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="text-3xl font-bold text-[#4eb4a7] mb-2">98%</div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="text-3xl font-bold text-[#4eb4a7] mb-2">8+</div>
                <div className="text-gray-600">Years of Experience</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="text-3xl font-bold text-[#4eb4a7] mb-2">20+</div>
                <div className="text-gray-600">Office Locations</div>
              </div>
            </div>
          </div>
        </section>

        {/* Document Types Section */}
        <section id="document-types" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4eb4a7]/10 to-[#85cbc3]/10 px-6 py-2 rounded-full mb-6">
                <FileText className="w-4 h-4 text-[#4eb4a7]" />
                <span className="text-sm font-bold text-[#4eb4a7] uppercase tracking-wide">Document Types</span>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                Comprehensive <span className="bg-gradient-to-r from-[#4eb4a7] to-[#85cbc3] bg-clip-text text-transparent">Documentation Services</span>
              </h2>
              <p className="text-lg text-gray-600">
                From property registration to educational certificates, we handle all your documentation needs with expertise and efficiency.
              </p>
            </motion.div>

            {/* Innovative Document Category Cards */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {documentTypes.map((category, index) => (
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
                        {category.documents.length} document types
                      </p>
                      
                      {/* Preview of Documents */}
                      <div className="space-y-2 mb-4">
                        {category.documents.slice(0, 3).map((doc, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#4eb4a7]" />
                            <span className="text-gray-600 text-sm">{doc}</span>
                          </div>
                        ))}
                        {category.documents.length > 3 && (
                          <div className="text-[#4eb4a7] text-sm font-medium">
                            +{category.documents.length - 3} more...
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

            {/* Selected Document Type Display */}
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
                    {documentTypes.find(t => t.id === activeTab)?.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {documentTypes.find(t => t.id === activeTab)?.title} We Process
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {documentTypes.find(t => t.id === activeTab)?.documents.map((doc, idx) => (
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
                        <span className="font-medium text-gray-800">{doc}</span>
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
                    asChild 
                    className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] text-white rounded-full px-8"
                  >
                    <Link to="/contact" className="flex items-center gap-2">
                      Get Started with {documentTypes.find(t => t.id === activeTab)?.title} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Why Choose Our Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our documentation services stand out with exceptional quality, efficiency, and customer care
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Expert Professionals",
                  description: "Our team consists of experienced professionals with extensive knowledge in all documentation processes."
                },
                {
                  title: "Fast Turnaround",
                  description: "We prioritize quick processing without compromising on accuracy or quality."
                },
                {
                  title: "Complete Support",
                  description: "From initial consultation to final delivery, we provide comprehensive support throughout the process."
                },
                {
                  title: "Transparent Pricing",
                  description: "No hidden fees or surprises - our pricing structure is clear and upfront."
                },
                {
                  title: "Digital Access",
                  description: "Access your documents and track progress through our secure online portal."
                },
                {
                  title: "Custom Solutions",
                  description: "We tailor our services to meet your specific requirements and deadlines."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-[#4eb4a7] hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className="bg-[#4eb4a7] p-2 rounded-full mr-4">
                      <List className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 pl-14">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Pricing Plans</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the right service package that fits your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Standard",
                  price: "₹1,500",
                  isPopular: false,
                  features: [
                    "Basic document processing",
                    "1-3 business days turnaround",
                    "Email support",
                    "Standard verification"
                  ]
                },
                {
                  title: "Premium",
                  price: "₹2,500",
                  isPopular: true,
                  features: [
                    "Priority document processing",
                    "Same day processing",
                    "Phone & email support",
                    "Enhanced verification",
                    "Document pickup & delivery"
                  ]
                },
                {
                  title: "VIP",
                  price: "₹4,000",
                  isPopular: false,
                  features: [
                    "Express document processing",
                    "1-2 business days turnaround",
                    "24/7 dedicated support",
                    "Premium verification",
                    "Document pickup & delivery",
                    "Expert consultation"
                  ]
                }
              ].map((plan, index) => (
                <Card key={index} className={`overflow-hidden ${plan.isPopular ? 'border-2 border-[#4eb4a7] shadow-lg' : 'border border-gray-200'}`}>
                  {plan.isPopular && (
                    <div className="bg-[#4eb4a7] text-white text-center py-1 text-sm font-medium">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                    <div className="text-4xl font-bold text-[#4eb4a7] mb-6">{plan.price}</div>
                    <div className="space-y-3 mb-8 text-left">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-[#4eb4a7] mr-2" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className={`w-full ${plan.isPopular ? 'bg-[#4eb4a7] hover:bg-[#60afb4]' : ''}`}>
                      Choose Plan
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our documentation services
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "What documents do I need for property registration?",
                    answer: "For property registration, you'll typically need property title documents, identity proof, address proof, photographs, and any relevant agreements or NOCs. Our team will guide you through the specific requirements based on your situation."
                  },
                  {
                    question: "How long does the documentation process take?",
                    answer: "The processing time varies depending on the type of document. Property registration can be completed in 1 day, and legal documentation typically takes 1-3 days. For other services, processing times may vary based on complexity and requirements."
                  },
                  {
                    question: "Do you provide document pickup and delivery services?",
                    answer: "Yes, document pickup and delivery services are included in our Premium and VIP packages. For Standard packages, these services can be availed for an additional fee."
                  },
                  {
                    question: "What areas do you service?",
                    answer: "We provide documentation services throughout Kanyakumari district through our network of 20 branch offices. For specific locations, please check our branches page or contact our customer support."
                  },
                  {
                    question: "Is online document submission possible?",
                    answer: "Yes, many documents can be submitted online through our secure portal. However, some documentation processes may require in-person verification or submission of physical documents depending on regulatory requirements."
                  }
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center">
                        <HelpCircle className="h-5 w-5 text-[#4eb4a7] mr-2" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-9">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 gradient-heading">Customer Testimonials</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear what our clients have to say about our services
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rajesh Kumar",
                  position: "Business Owner",
                  testimonial: "The documentation services provided by Prince Group were exceptional. They handled all the paperwork for my new business license with remarkable efficiency.",
                  rating: 5,
                  image: "/customer/1740978306596.jpeg"
                },
                {
                  name: "Priya Sharma",
                  position: "Homeowner",
                  testimonial: "I was amazed by how smoothly the property registration process went with Prince Group's help. Their team managed everything professionally and saved me a lot of time.",
                  rating: 5,
                  image: "/customer/1702451425744.jpeg"
                },
                {
                  name: "Sanjay Patel",
                  position: "Restaurant Manager",
                  testimonial: "Getting all the licenses for my new restaurant was a breeze thanks to Prince Group. Their staff was knowledgeable and supportive throughout the entire process.",
                  rating: 4,
                  image: "/customer/1735796812076.jpeg"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-6 border-0 shadow-md">
                  <div className="flex items-center mb-4">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">{`"${testimonial.testimonial}"`}</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full mr-4 overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.position}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and let us handle all your documentation needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-[#4eb4a7] hover:bg-gray-100" asChild>
                <Link to="/contact">
                Schedule a Consultation
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
};

export default DocumentationServices;
