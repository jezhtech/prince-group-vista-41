
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
  BarChart3
} from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-ui-blue-600 to-ui-blue-400 z-0"></div>
          <div className="absolute inset-0 dot-pattern opacity-10 z-1"></div>
          
          {/* Blob shapes */}
          <div className="blob-shape bg-ui-green-300 w-96 h-96 rounded-full top-10 left-[10%] animate-pulse"></div>
          <div className="blob-shape bg-ui-blue-300 w-80 h-80 rounded-full bottom-10 right-[5%] animate-pulse"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                className="lg:w-1/2 text-center lg:text-left text-white mb-12 lg:mb-0 lg:pr-12"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-medium mb-6 border border-white/20">
                  Welcome to Prince Group
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Your Trusted Partner for <span className="text-ui-green-300">Document</span> Registration & <span className="text-ui-green-300">Loan</span> Services
                </h1>
                <p className="text-xl text-white/80 mb-8 max-w-2xl">
                  Providing exceptional service and membership benefits across Kanyakumari District with over 20 branches for your convenience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild className="bg-white text-ui-blue-600 hover:bg-gray-100 px-8 py-6 text-lg flex items-center gap-2 rounded-full shadow-lg hover:shadow-xl">
                    <Link to="/services">Explore Our Services <ArrowRight className="ml-1" /></Link>
                  </Button>
                  <Button asChild variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg flex items-center gap-2 rounded-full backdrop-blur-sm">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>

                <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
                  <div className="flex items-center">
                    <div className="bg-white/20 rounded-full p-2">
                      <CheckCircle className="h-5 w-5 text-ui-green-300" />
                    </div>
                    <span className="ml-2 text-white">20+ Branches</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/20 rounded-full p-2">
                      <CheckCircle className="h-5 w-5 text-ui-green-300" />
                    </div>
                    <span className="ml-2 text-white">Verified Services</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/20 rounded-full p-2">
                      <CheckCircle className="h-5 w-5 text-ui-green-300" />
                    </div>
                    <span className="ml-2 text-white">Quick Processing</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="lg:w-1/2 relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-20 h-20 bg-ui-green-300 rounded-full blur-xl opacity-70 animate-pulse-light"></div>
                  <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-ui-cyan-400 rounded-full blur-lg opacity-70 animate-pulse-light" style={{ animationDelay: '1s' }}></div>
                  
                  <div className="modern-glass rounded-2xl p-8 relative">
                    <div className="absolute top-0 right-0 bg-ui-green-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">FEATURED</div>
                    <img 
                      src="/lovable-uploads/291e6070-8709-4492-bd3a-9a09467bf216.png" 
                      alt="Document Services" 
                      className="w-full h-auto rounded-lg shadow-lg mb-6 hover:shadow-xl transition-all duration-300" 
                    />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Professional Documentation Services</h3>
                    <p className="text-gray-600 mb-4">Get all your documentation needs handled with precision and efficiency</p>
                    <Button asChild className="w-full bg-ui-blue-600 hover:bg-ui-blue-500">
                      <Link to="/services#documentation" className="flex items-center justify-center">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ui-blue-500/10 rounded-2xl blur-xl"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll down indicator */}
          <motion.button 
            className="scroll-indicator"
            onClick={scrollToContent}
            style={{ opacity, scale }}
          >
            <span className="text-white text-sm mb-2">Scroll</span>
            <div className="mouse">
              <div className="wheel"></div>
            </div>
          </motion.button>

          {/* Wave divider */}
          <div className="wave-shape">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.17,118.92,150.87,130.42,213.18,119.57,273.88,108.93,292.16,87.81,321.39,56.44Z" className="shape-fill"></path>
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-ui-blue-100 px-4 py-1 rounded-full text-ui-blue-600 text-sm font-medium mb-4">
                WHY CHOOSE US
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Prince Group Advantage</h2>
              <p className="text-lg text-gray-600">
                We're committed to providing exceptional service and value to our clients across Kanyakumari District.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Users className="h-8 w-8 text-ui-blue-600" />,
                  title: "Membership Benefits",
                  description:
                    "Join our exclusive membership program to enjoy special benefits, discounts, and priority access to events.",
                  delay: 0,
                },
                {
                  icon: <MapPin className="h-8 w-8 text-ui-blue-600" />,
                  title: "20+ Branches",
                  description:
                    "With over 20 branches across Kanyakumari District, we're always nearby to serve you.",
                  delay: 0.1,
                },
                {
                  icon: <Clock className="h-8 w-8 text-ui-blue-600" />,
                  title: "Quick Processing",
                  description:
                    "Experience efficient service delivery with our streamlined processes and dedicated team.",
                  delay: 0.2,
                },
                {
                  icon: <Shield className="h-8 w-8 text-ui-blue-600" />,
                  title: "Expert Support",
                  description:
                    "Our knowledgeable team ensures you receive professional guidance every step of the way.",
                  delay: 0.3,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                >
                  <div className="icon-circle">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
          <div className="blob-shape bg-ui-green-200 w-96 h-96 rounded-full top-[10%] left-[5%] animate-pulse"></div>
          <div className="blob-shape bg-ui-blue-200 w-80 h-80 rounded-full bottom-[10%] right-[5%] animate-pulse"></div>
          
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-ui-blue-100 px-4 py-1 rounded-full text-ui-blue-600 text-sm font-medium mb-4">
                OUR SERVICES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Services to Meet Your Needs</h2>
              <p className="text-lg text-gray-600">
                Explore our range of professional services designed specifically for your requirements.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <FileText className="h-8 w-8 text-ui-blue-600" />,
                  title: "Documentation Services",
                  description: "Professional assistance with all your documentation needs including registration, verification, and processing.",
                  path: "/services",
                  image: "/lovable-uploads/43081f16-3e26-46ee-bec6-e85ef9aadbbc.png",
                  delay: 0
                },
                {
                  icon: <CreditCard className="h-8 w-8 text-ui-blue-600" />,
                  title: "Loan Services",
                  description: "Comprehensive loan services with competitive rates and flexible terms for individuals and businesses.",
                  path: "/services#loans",
                  image: "/lovable-uploads/f4f5c039-d495-44e1-83bd-cc24c888ca39.png",
                  delay: 0.1
                },
                {
                  icon: <Calendar className="h-8 w-8 text-ui-blue-600" />,
                  title: "Event Management",
                  description: "Discover and participate in exclusive events organized for our members and the community.",
                  path: "/events",
                  image: "/lovable-uploads/1081dccb-43d0-4aae-b4d6-a7f93a4f7eab.png",
                  delay: 0.2
                },
                {
                  icon: <Users className="h-8 w-8 text-ui-blue-600" />,
                  title: "Membership Programs",
                  description: "Join our tiered membership programs to access premium benefits, discounts, and exclusive services.",
                  path: "/membership",
                  image: "/lovable-uploads/d7323ce8-25af-46ae-b15c-259b71e567d5.png",
                  delay: 0.3
                }
              ].map((service, index) => (
                <motion.div 
                  key={index} 
                  className="service-card group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: service.delay }}
                >
                  <div className="flex items-start">
                    <div className="mr-6">
                      <div className="icon-outline group-hover:border-ui-blue-400 transition-colors duration-300">
                        <div className="icon-outline-inner">
                          {service.icon}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-ui-blue-600 transition-colors duration-300">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      
                      <div className="mb-6">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300"
                        />
                      </div>
                      
                      <Button asChild variant="outline" className="border-ui-blue-200 text-ui-blue-600 hover:bg-ui-blue-50 group-hover:border-ui-blue-400">
                        <Link to={service.path} className="flex items-center">
                          Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:transform group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tariff Comparison Section */}
        <section className="py-20 lg:py-28 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-ui-blue-100 px-4 py-1 rounded-full text-ui-blue-600 text-sm font-medium mb-4">
                TRANSPARENT PRICING
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Clear and Consistent Service Fees</h2>
              <p className="text-lg text-gray-600">
                We believe in complete transparency with our service fees. No hidden charges, ever.
              </p>
            </motion.div>

            <motion.div 
              className="max-w-4xl mx-auto modern-glass rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="blue-gradient-bg text-white">
                      <th className="py-4 px-6 text-left">Service</th>
                      <th className="py-4 px-6 text-center">Regular Fee</th>
                      <th className="py-4 px-6 text-center">Member Fee</th>
                      <th className="py-4 px-6 text-center">Processing Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        service: "Property Registration",
                        regularFee: "₹2,500",
                        memberFee: "₹2,000",
                        time: "3-5 days",
                      },
                      {
                        service: "Legal Documentation",
                        regularFee: "₹1,500",
                        memberFee: "₹1,200",
                        time: "2-3 days",
                      },
                      {
                        service: "License Application",
                        regularFee: "₹1,800",
                        memberFee: "₹1,500",
                        time: "5-7 days",
                      },
                      {
                        service: "Notary Services",
                        regularFee: "₹800",
                        memberFee: "₹600",
                        time: "Same day",
                      },
                      {
                        service: "Personal Loan Processing",
                        regularFee: "₹2,000",
                        memberFee: "₹1,500",
                        time: "2-3 days",
                      },
                    ].map((row, index) => (
                      <motion.tr 
                        key={index} 
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        <td className="py-4 px-6 font-medium text-gray-800">{row.service}</td>
                        <td className="py-4 px-6 text-center text-gray-600">{row.regularFee}</td>
                        <td className="py-4 px-6 text-center text-ui-blue-600 font-medium">
                          {row.memberFee}
                        </td>
                        <td className="py-4 px-6 text-center text-gray-600">{row.time}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-10 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild className="bg-ui-blue-600 hover:bg-ui-blue-500">
                <Link to="/tariff-comparison" className="flex items-center">
                  View Full Tariff Comparison <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 blue-gradient-bg z-0"></div>
          <div className="absolute inset-0 dot-pattern opacity-10 z-1"></div>
          
          <div className="blob-shape bg-ui-blue-300 w-96 h-96 rounded-full top-20 left-[10%] animate-pulse"></div>
          <div className="blob-shape bg-ui-green-300 w-80 h-80 rounded-full bottom-20 right-[15%] animate-pulse"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-medium mb-4">
                TESTIMONIALS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What Our Clients Say</h2>
              <p className="text-lg text-white/80">
                Don't just take our word for it. See what our clients have to say about us.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Prince Group helped me navigate the complex loan process with ease. Their staff was knowledgeable and supportive throughout.",
                  author: "Ramesh Kumar",
                  position: "Business Owner",
                  delay: 0,
                },
                {
                  quote: "The documentation services are quick and reliable. I've been a member for 3 years and always receive excellent customer service.",
                  author: "Priya Sharma",
                  position: "Regular Customer",
                  delay: 0.1,
                },
                {
                  quote: "Their membership program offers great benefits. The exclusive events and discounts have more than paid for the membership fee.",
                  author: "Suresh Patel",
                  position: "Premium Member",
                  delay: 0.2,
                },
              ].map((testimonial, index) => (
                <motion.div 
                  key={index} 
                  className="modern-glass rounded-xl p-8 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: testimonial.delay }}
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.17 14.83L14.83 9.17M14.83 14.83L9.17 9.17" stroke="#4C83FB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4C83FB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-8 text-center">{testimonial.quote}</p>
                  <div className="text-center">
                    <p className="font-bold text-gray-800">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.position}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Branches Section */}
        <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
          <div className="blob-shape bg-ui-cyan-200 w-96 h-96 rounded-full top-[20%] left-[5%] animate-pulse"></div>
          <div className="blob-shape bg-ui-blue-200 w-80 h-80 rounded-full bottom-[10%] right-[7%] animate-pulse"></div>
          
          <div className="container mx-auto px-4 relative">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-ui-blue-100 px-4 py-1 rounded-full text-ui-blue-600 text-sm font-medium mb-4">
                OUR LOCATIONS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Branches Near You</h2>
              <p className="text-lg text-gray-600">
                With 20 branches spread across Kanyakumari District, we're always nearby to assist you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Nagercoil Headquarters",
                  address: "Sri Sai Complex, Court Road, Vepamoodu Junction",
                  phone: "9150537718",
                  delay: 0,
                },
                {
                  name: "Thuckalay Branch",
                  address: "123 Main Street, Thuckalay",
                  phone: "9385722102",
                  delay: 0.1,
                },
                {
                  name: "Marthandam Branch",
                  address: "45 Gandhi Road, Marthandam",
                  phone: "9876543210",
                  delay: 0.2,
                },
              ].map((branch, index) => (
                <motion.div 
                  key={index} 
                  className="modern-glass rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: branch.delay }}
                >
                  <div className="h-40 bg-ui-blue-100 relative overflow-hidden">
                    <div className="absolute inset-0 blue-gradient-bg opacity-20"></div>
                    <MapPin className="h-24 w-24 text-ui-blue-200 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-ui-blue-600 group-hover:text-ui-blue-500 transition-colors">{branch.name}</h3>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-ui-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{branch.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-ui-blue-500 mr-3 flex-shrink-0" />
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button asChild variant="outline" className="w-full border-ui-blue-200 text-ui-blue-600 hover:bg-ui-blue-50 group-hover:border-ui-blue-400">
                        <Link to={`tel:${branch.phone}`} className="flex items-center justify-center">
                          Call Branch <ArrowUpRight className="ml-2 h-4 w-4 group-hover:transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild className="bg-ui-blue-600 hover:bg-ui-blue-500">
                <Link to="/branches" className="flex items-center">
                  View All Branches <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Events Preview Section */}
        <section className="py-20 lg:py-28 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-ui-blue-100 px-4 py-1 rounded-full text-ui-blue-600 text-sm font-medium mb-4">
                UPCOMING EVENTS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Events</h2>
              <p className="text-lg text-gray-600">
                Educational workshops, seminars, and networking opportunities to help you grow.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Document Registration Workshop",
                  date: "Jun 15, 2023",
                  location: "Nagercoil Main Branch",
                  image: "/lovable-uploads/3e5ce188-b3e9-4530-82ce-d7584b665a78.png",
                  delay: 0,
                  icon: <FileText className="h-6 w-6" />
                },
                {
                  title: "Financial Planning Seminar",
                  date: "Jun 22, 2023",
                  location: "Thuckalay Branch",
                  image: "/lovable-uploads/3e5ce188-b3e9-4530-82ce-d7584b665a78.png",
                  delay: 0.1,
                  icon: <BarChart3 className="h-6 w-6" />
                },
                {
                  title: "Loan Application Workshop",
                  date: "Jun 29, 2023",
                  location: "Marthandam Branch",
                  image: "/lovable-uploads/3e5ce188-b3e9-4530-82ce-d7584b665a78.png",
                  delay: 0.2,
                  icon: <CreditCard className="h-6 w-6" />
                },
              ].map((event, index) => (
                <motion.div 
                  key={index} 
                  className="modern-glass rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: event.delay }}
                >
                  <div className="h-48 relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md">
                      <div className="bg-ui-blue-600 text-white rounded-full p-2">
                        {event.icon}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-ui-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                      {event.date}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-ui-blue-600 transition-colors">{event.title}</h3>
                    <div className="flex items-center mb-6">
                      <MapPin className="h-5 w-5 text-ui-blue-500 mr-2" />
                      <span className="text-gray-600">{event.location}</span>
                    </div>
                    <Button asChild className="w-full bg-ui-blue-600 hover:bg-ui-blue-500">
                      <Link to="/events" className="flex items-center justify-center">
                        Register Now <ArrowRight className="ml-2 h-4 w-4 group-hover:transform group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button asChild variant="outline" className="border-ui-blue-200 text-ui-blue-600 hover:bg-ui-blue-50">
                <Link to="/events" className="flex items-center">
                  View All Events <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why Trust Us Section */}
        <section className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">
          <div className="blob-shape bg-ui-green-200 w-96 h-96 rounded-full top-[10%] left-[5%] animate-pulse"></div>
          <div className="blob-shape bg-ui-blue-200 w-80 h-80 rounded-full bottom-[10%] right-[5%] animate-pulse"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block bg-ui-blue-100 px-4 py-1 rounded-full text-ui-blue-600 text-sm font-medium mb-4">
                  WHY TRUST US
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Building Trust Through <span className="wavy-underline">Excellence</span> and <span className="wavy-underline">Transparency</span></h2>
                <p className="text-lg text-gray-600 mb-8">
                  Prince Group has become a trusted name in Kanyakumari District through our commitment to excellence, transparency, and customer satisfaction.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Shield className="h-6 w-6" />,
                      title: "Licensed & Authorized",
                      description: "We are fully licensed and authorized to provide all our services."
                    },
                    {
                      icon: <Lock className="h-6 w-6" />,
                      title: "Secure Processing",
                      description: "Your documents and personal information are handled with utmost security."
                    },
                    {
                      icon: <Database className="h-6 w-6" />,
                      title: "Advanced Systems",
                      description: "Using state-of-the-art technology to ensure efficient and accurate processing."
                    },
                    {
                      icon: <Cpu className="h-6 w-6" />,
                      title: "Digital Infrastructure",
                      description: "Modern digital infrastructure for seamless service delivery."
                    },
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex items-start p-4 rounded-lg border border-gray-100 bg-white hover:border-ui-blue-200 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <div className="mr-4 bg-ui-blue-100 p-3 rounded-full text-ui-blue-600">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:w-1/2 flex items-center justify-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute -top-5 -left-5 w-40 h-40 bg-ui-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                  <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-ui-green-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-6">
                      <motion.div 
                        className="bg-white p-8 rounded-xl shadow-lg text-center"
                        whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                      >
                        <div className="counter-number">15<span className="counter-suffix">+</span></div>
                        <p className="text-gray-600 font-medium mt-2">Years Experience</p>
                      </motion.div>
                      <motion.div 
                        className="bg-white p-8 rounded-xl shadow-lg text-center"
                        whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                      >
                        <div className="counter-number">20<span className="counter-suffix">+</span></div>
                        <p className="text-gray-600 font-medium mt-2">Locations</p>
                      </motion.div>
                    </div>
                    <div className="flex flex-col gap-6 mt-10">
                      <motion.div 
                        className="bg-white p-8 rounded-xl shadow-lg text-center"
                        whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                      >
                        <div className="counter-number">5k<span className="counter-suffix">+</span></div>
                        <p className="text-gray-600 font-medium mt-2">Happy Members</p>
                      </motion.div>
                      <motion.div 
                        className="bg-white p-8 rounded-xl shadow-lg text-center"
                        whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                      >
                        <div className="counter-number">10k<span className="counter-suffix">+</span></div>
                        <p className="text-gray-600 font-medium mt-2">Documents Processed</p>
                      </motion.div>
                    </div>
                  </div>
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
              <div className="absolute inset-0 blue-gradient-bg z-0"></div>
              <div className="absolute inset-0 dot-pattern opacity-10 z-1"></div>
              
              <div className="blob-shape bg-ui-green-300 w-80 h-80 rounded-full top-0 left-[10%] animate-pulse"></div>
              <div className="blob-shape bg-ui-blue-300 w-96 h-96 rounded-full bottom-0 right-[5%] animate-pulse"></div>

              <div className="px-6 py-16 md:p-16 text-center relative z-10">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  Ready to Get Started?
                </motion.h2>
                <motion.p 
                  className="text-xl text-white/80 mb-10 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Join thousands of satisfied customers who trust Prince Group for their documentation and loan services.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <Button asChild className="bg-white text-ui-blue-600 hover:bg-gray-100 px-8 py-6 text-lg flex items-center gap-2 rounded-full shadow-lg hover:shadow-xl">
                    <Link to="/membership">Become a Member <ArrowRight className="ml-1" /></Link>
                  </Button>
                  <Button asChild variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg flex items-center gap-2 rounded-full backdrop-blur-sm">
                    <Link to="/contact">Contact Us</Link>
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
