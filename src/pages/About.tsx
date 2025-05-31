import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  ArrowRight, 
  Award, 
  BarChart, 
  Users, 
  Shield, 
  Clock, 
  MapPin, 
  Building, 
  Calendar, 
  Target, 
  Sparkles, 
  Star, 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  Quote
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import StatisticsCard from "@/components/StatisticsCard";

const About = () => {
  const [activeSection, setActiveSection] = useState("story");
  const [visibleSection, setVisibleSection] = useState<string | null>(null);
  const teamCarouselRef = useRef(null);
  const [teamIndex, setTeamIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  
  // Observer for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll("section[id]").forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setTeamIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);
    // Cleanup
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fdfc] via-white to-[#f0faf9]">
      <Helmet>
        <title>About Us - Prince Group</title>
        <meta name="description" content="Learn about Prince Group's mission, values, and the team behind our success in documentation and loan services." />
      </Helmet>
      <MainNavbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <motion.div 
              className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#4eb4a7]/10 to-[#85cbc3]/5 rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
                x: ["30%", "32%", "30%"],
                y: ["-30%", "-28%", "-30%"]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#60afb4]/10 to-[#4eb4a7]/5 rounded-full"
              animate={{ 
                scale: [1, 1.15, 1],
                x: ["-30%", "-25%", "-30%"],
                y: ["30%", "28%", "30%"]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }}
            />
            
            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#4eb4a7]/30"
                style={{
                  width: Math.random() * 10 + 5,
                  height: Math.random() * 10 + 5,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 30 - 15],
                  opacity: [0.2, 0.5, 0.2],
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
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block mb-6">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] rounded-full p-4">
                      <Building className="h-8 w-8 text-white" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#4eb4a7]"
                      initial={{ opacity: 0.7, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.8 }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                    Our Journey of
                  </span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60afb4] to-[#85cbc3]">
                    Excellence
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                  Since 2010, Prince Group has been simplifying documentation and loan services 
                  for thousands of clients across Kanyakumari District, built on a foundation of 
                  trust, innovation, and community service.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    className="px-8 py-6 rounded-full bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] hover:from-[#3da296] hover:to-[#4e9da3] text-white"
                    asChild
                  >
                    <a href="#story">
                      <span>Our Story</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="px-8 py-6 rounded-full border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/5"
                    asChild
                  >
                    <a href="#team">
                      <span>Meet Our Team</span>
                    </a>
                  </Button>
                </div>
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

        {/* Stats Section */}
        <section className="py-16 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    value: "2010",
                    label: "Year Established",
                    icon: <Calendar className="h-8 w-8" />,
                    delay: 0
                  },
                  {
                    value: "18+",
                    label: "Branch Locations",
                    icon: <MapPin className="h-8 w-8" />,
                    delay: 0.1
                  },
                  {
                    value: "36",
                    label: "Team Members",
                    icon: <Users className="h-8 w-8" />,
                    delay: 0.2
                  },
                  {
                    value: "50,000+",
                    label: "Happy Clients",
                    icon: <Award className="h-8 w-8" />,
                    delay: 0.3
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: stat.delay }}
                    className="relative group"
                  >
                    <div className="bg-white rounded-2xl p-8 border border-[#4eb4a7]/10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#4eb4a7]/10 to-[#85cbc3]/20 text-[#4eb4a7] mb-6 group-hover:from-[#4eb4a7] group-hover:to-[#60afb4] group-hover:text-white transition-all duration-300 w-16 h-16 flex items-center justify-center">
                        {stat.icon}
                      </div>
                      <h3 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                        {stat.value}
                      </h3>
                      <p className="text-gray-600 text-lg">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section id="story" className="py-20 bg-gradient-to-br from-white to-[#f0faf9]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative">
                    <div className="absolute top-8 -left-8 bg-[#4eb4a7]/10 w-full h-full rounded-3xl transform rotate-3"></div>
                    <div className="absolute top-4 -right-4 bg-[#60afb4]/10 w-full h-full rounded-3xl transform -rotate-2"></div>
                    <div className="relative bg-white shadow-xl rounded-3xl p-6 z-10">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden">
                          <div className="w-full h-full bg-[#4eb4a7]/20 flex items-center justify-center">
                            <Building className="h-10 w-10 text-[#4eb4a7]" />
                          </div>
                        </div>
                        <div className="aspect-[4/3] rounded-xl overflow-hidden">
                          <div className="w-full h-full bg-[#60afb4]/20 flex items-center justify-center">
                            <Users className="h-10 w-10 text-[#60afb4]" />
                          </div>
                        </div>
                        <div className="aspect-[4/3] rounded-xl overflow-hidden">
                          <div className="w-full h-full bg-[#85cbc3]/20 flex items-center justify-center">
                            <Award className="h-10 w-10 text-[#85cbc3]" />
                          </div>
                        </div>
                        <div className="aspect-[4/3] rounded-xl overflow-hidden">
                          <div className="w-full h-full bg-[#4eb4a7]/20 flex items-center justify-center">
                            <MapPin className="h-10 w-10 text-[#4eb4a7]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="inline-block mb-6">
                    <div className="bg-[#4eb4a7]/10 text-[#4eb4a7] text-sm font-semibold py-1 px-3 rounded-full">
                    OUR JOURNEY
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                      Our Story
                    </span>
                  </h2>
                  
                <p className="text-gray-600 mb-6">
                    Founded in 2010, Prince Group started with a vision to simplify documentation services in Kanyakumari district. 
                    What began as a small office with three dedicated staff members has now grown into a network of over 18 branches 
                    serving thousands of satisfied customers.
                </p>
                  
                <p className="text-gray-600 mb-6">
                    Our journey has been marked by continuous improvement, innovation, and an unwavering commitment to customer satisfaction. 
                    Today, we are proud to be the leading documentation and loan service provider in the region, with a team of 36 experts 
                    dedicated to excellence.
                </p>
                  
                  <div className="mb-10">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center">
                        <Check className="h-6 w-6 text-[#4eb4a7]" />
                      </div>
                      <p className="text-gray-700 font-medium">From 3 staff members to a team of 36 professionals</p>
                    </div>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center">
                        <Check className="h-6 w-6 text-[#4eb4a7]" />
                      </div>
                      <p className="text-gray-700 font-medium">Expanded to 18+ branches across Kanyakumari District</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#4eb4a7]/10 flex items-center justify-center">
                        <Check className="h-6 w-6 text-[#4eb4a7]" />
                      </div>
                      <p className="text-gray-700 font-medium">Processed over 7800 documents and disbursed 40+ crore in loans</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="px-8 py-6 rounded-full bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] hover:from-[#3da296] hover:to-[#4e9da3] text-white"
                    asChild
                  >
                    <a href="#vision">
                      <span>Learn About Our Vision</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Bottom Curved Wave */}
          <div className="w-full mt-16">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,128L48,122.7C96,117,192,107,288,122.7C384,139,480,181,576,181.3C672,181,768,139,864,122.7C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section id="vision" className="py-20 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block mb-6">
                  <div className="bg-[#4eb4a7]/10 text-[#4eb4a7] text-sm font-semibold py-1 px-3 rounded-full">
                  OUR PURPOSE
                </div>
              </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                    Vision & Mission
                  </span>
                </h2>
                
                <p className="text-gray-600 max-w-3xl mx-auto">
                Our guiding principles that drive everything we do at Prince Group
              </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#4eb4a7]/10 h-full transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="h-16 bg-gradient-to-r from-[#4eb4a7] to-[#60afb4] flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">Vision</h3>
                </div>
                  <div className="p-8">
                    <div className="bg-[#4eb4a7]/10 p-4 rounded-full inline-block mb-6">
                      <Target className="h-8 w-8 text-[#4eb4a7]" />
                    </div>
                    
                    <p className="text-gray-600 mb-8 text-lg">
                      We envision a future where access to quality documentation and financial guidance is 
                      seamless and stress-free, empowering our customers to grow with confidence, clarity, 
                      and integrity. Our commitment lies in building long-term relationships through 
                      professionalism, innovation, and consistent service excellence.
                    </p>
                    
                    <ul className="space-y-4">
                      {[
                        "Become the premier documentation service provider in Tamil Nadu",
                        "Innovate continuously to enhance customer experience",
                        "Maintain the highest standards of professional integrity"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mt-1 mr-3 text-[#4eb4a7]">
                            <Check className="h-5 w-5" />
                    </div>
                          <span className="text-gray-700">{item}</span>
                  </li>
                      ))}
                </ul>
              </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#4eb4a7]/10 h-full transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="h-16 bg-gradient-to-r from-[#60afb4] to-[#85cbc3] flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">Mission</h3>
                    </div>
                  <div className="p-8">
                    <div className="bg-[#60afb4]/10 p-4 rounded-full inline-block mb-6">
                      <Zap className="h-8 w-8 text-[#60afb4]" />
                    </div>
                    
                    <p className="text-gray-600 mb-8 text-lg">
                      Our mission encompasses a comprehensive approach to documentation and financial services:
                    </p>
                    
                    <ul className="space-y-5">
                      {[
                        "Offering precise and legally compliant document preparation tailored to diverse needs",
                        "Providing ethical and informed loan assistance that empowers financial decision-making",
                        "Ensuring a customer-first approach with integrity, confidentiality, and professionalism",
                        "Leveraging our local expertise to serve communities with speed, clarity, and care",
                        "Continuously evolving our services to meet changing legal standards and client expectations"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#60afb4]/10 flex items-center justify-center mt-1 mr-3">
                            <span className="text-[#60afb4] font-bold">{index + 1}</span>
                    </div>
                          <span className="text-gray-700">{item}</span>
                  </li>
                      ))}
                </ul>
              </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Carousel */}
        <section id="team" className="py-20 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-block mb-6">
                    <div className="bg-[#4eb4a7]/10 text-[#4eb4a7] text-sm font-semibold py-1 px-3 rounded-full">
                      OUR TEAM
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                      Meet Our Dedicated Team
                    </span>
                  </h2>
                  
                  <p className="text-gray-600 max-w-3xl mx-auto mb-4">
                    Our team consists of 36 talented professionals dedicated to providing exceptional service
                  </p>
                  
                  <div className="flex justify-center items-center gap-8 mb-12">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#4eb4a7]"></div>
                      </div>
                      <span className="text-gray-600">21 Permanent Staff</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full bg-[#60afb4]/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#60afb4]"></div>
                      </div>
                      <span className="text-gray-600">15 Contract Professionals</span>
                    </div>
                </div>
                </motion.div>
            </div>

              {/* Team Carousel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative px-10"
              >
                <Carousel 
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                  setApi={setCarouselApi}
                >
                  <CarouselContent>
              {[
                {
                        name: "Rajesh Kumar",
                        position: "Founder & CEO",
                        bio: "With over 15 years of experience in documentation services, Rajesh founded Prince Group with a vision to simplify the complex process for customers across Kanyakumari district.",
                        imagePlaceholder: "RK"
                },
                {
                        name: "Priya Sharma",
                        position: "Operations Director",
                        bio: "Priya brings 10 years of operational expertise, ensuring our 18+ branches maintain consistent quality standards and exceptional customer service.",
                        imagePlaceholder: "PS"
                      },
                      {
                        name: "Anand Patel",
                        position: "Finance Manager",
                        bio: "With a strong background in banking and finance, Anand oversees our loan services, ensuring compliance with regulations and competitive offerings.",
                        imagePlaceholder: "AP"
                },
                {
                        name: "Lakshmi Narayan",
                        position: "Documentation Specialist",
                        bio: "Lakshmi's meticulous attention to detail and deep knowledge of legal documentation has helped thousands of clients navigate complex paperwork effortlessly.",
                        imagePlaceholder: "LN"
                },
                {
                        name: "Vikram Singh",
                        position: "Regional Manager",
                        bio: "Vikram oversees our branch expansion, strategically growing our presence to ensure Prince Group services are accessible across Kanyakumari district.",
                        imagePlaceholder: "VS"
                      },
                      {
                        name: "Deepa Menon",
                        position: "Customer Relations Lead",
                        bio: "With her people-first approach, Deepa ensures every client receives personalized attention and solutions tailored to their specific needs.",
                        imagePlaceholder: "DM"
                }
                    ].map((member, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-2 h-full">
                          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#4eb4a7]/10 h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="aspect-[4/3] bg-gradient-to-br from-[#4eb4a7]/80 to-[#60afb4] flex items-center justify-center">
                              <span className="text-white text-5xl font-bold">{member.imagePlaceholder}</span>
                            </div>
                            <div className="p-6">
                              <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                              <p className="text-[#4eb4a7] font-medium mb-4">{member.position}</p>
                              <p className="text-gray-600 text-sm">{member.bio}</p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2">
                    <CarouselPrevious className="h-10 w-10 rounded-full bg-white border border-[#4eb4a7]/20 text-[#4eb4a7] hover:bg-[#4eb4a7] hover:text-white shadow-md" />
                  </div>
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2">
                    <CarouselNext className="h-10 w-10 rounded-full bg-white border border-[#4eb4a7]/20 text-[#4eb4a7] hover:bg-[#4eb4a7] hover:text-white shadow-md" />
                  </div>
                </Carousel>
                
                {/* Carousel Indicators */}
                <div className="flex justify-center mt-8 space-x-2">
                  {[...Array(6)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (carouselApi) {
                          carouselApi.scrollTo(i);
                        }
                      }}
                      className={`w-2.5 h-2.5 rounded-full ${
                        teamIndex === i ? 'bg-[#4eb4a7]' : 'bg-[#4eb4a7]/20'
                      } transition-all duration-300`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
              
              <div className="text-center mt-16">
                <p className="text-gray-600 mb-8">
                  Our balanced team structure enables operational flexibility while maintaining a strong foundational workforce.
                </p>
                <Button 
                  variant="outline" 
                  className="px-8 py-6 rounded-full border-[#4eb4a7] text-[#4eb4a7] hover:bg-[#4eb4a7]/5"
                >
                  Join Our Team
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Timeline */}
        <section id="growth" className="py-20 bg-gradient-to-br from-white to-[#f0faf9]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-block mb-6">
                    <div className="bg-[#4eb4a7]/10 text-[#4eb4a7] text-sm font-semibold py-1 px-3 rounded-full">
                      OUR PROGRESS
                    </div>
                </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                      Our Growth Journey
                    </span>
                  </h2>
                  
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    From our modest beginnings to our current success, we've achieved significant milestones along the way
                  </p>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Documentation Growth */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-xl overflow-hidden border border-[#4eb4a7]/10">
                    <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                      Documentation Growth
                    </h3>
                    
                    <div className="mb-8">
                      <div className="bg-gradient-to-b from-[#f8fdfc] to-white rounded-xl overflow-hidden border border-[#4eb4a7]/20 p-4">
                        <div className="text-center mb-6">
                          <span className="text-lg font-medium text-gray-600">Documents Processed</span>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-2 mb-4">
                          <div className="text-center">
                            <div className="font-semibold text-[#4eb4a7]">1300</div>
                            <div className="bg-[#4eb4a7] w-full rounded-t-md mt-2" style={{ height: "24px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2018-19</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-semibold text-[#4eb4a7]">2400</div>
                            <div className="bg-[#4eb4a7] w-full rounded-t-md mt-2" style={{ height: "45px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2019-20</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-semibold text-[#4eb4a7]">4000</div>
                            <div className="bg-[#4eb4a7] w-full rounded-t-md mt-2" style={{ height: "72px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2020-21</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-semibold text-[#4eb4a7]">4800</div>
                            <div className="bg-[#4eb4a7] w-full rounded-t-md mt-2" style={{ height: "88px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2021-22</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-semibold text-[#4eb4a7]">6000</div>
                            <div className="bg-[#4eb4a7] w-full rounded-t-md mt-2" style={{ height: "112px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2022-23</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-semibold text-[#4eb4a7]">7500</div>
                            <div className="bg-[#4eb4a7] w-full rounded-t-md mt-2" style={{ height: "136px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2023-24</div>
            </div>

                          <div className="text-center">
                            <div className="font-semibold text-[#4eb4a7]">7807+</div>
                            <div className="bg-[#4eb4a7] w-full rounded-t-md mt-2" style={{ height: "152px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2024-25</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-center">
                      Growing steadily from just 1,300 documents in our first year to over 7,800 today
                    </p>
                  </div>
                </motion.div>
                
                {/* Loan Services Growth */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-xl overflow-hidden border border-[#4eb4a7]/10">
                    <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#60afb4] to-[#85cbc3]">
                      Loan Volume Growth
                    </h3>
                    
                    <div className="mb-8">
                      <div className="bg-gradient-to-b from-[#f8fdfc] to-white rounded-xl overflow-hidden border border-[#60afb4]/20 p-4">
                        <div className="text-center mb-6">
                          <span className="text-lg font-medium text-gray-600">Loan Volume Growth</span>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-2 mb-4">
                          <div className="text-center">
                            <div className="font-semibold text-[#60afb4]">0</div>
                            <div className="text-xs text-gray-500">0 Loans</div>
                            <div className="bg-[#60afb4] w-full rounded-t-md mt-2" style={{ height: "0px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2019</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-semibold text-[#60afb4]">60L</div>
                            <div className="text-xs text-gray-500">20 Loans</div>
                            <div className="bg-[#60afb4] w-full rounded-t-md mt-2" style={{ height: "24px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2020</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-semibold text-[#60afb4]">3Cr</div>
                            <div className="text-xs text-gray-500">30 Loans</div>
                            <div className="bg-[#60afb4] w-full rounded-t-md mt-2" style={{ height: "40px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2021</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-semibold text-[#60afb4]">12.5Cr</div>
                            <div className="text-xs text-gray-500">50 Loans</div>
                            <div className="bg-[#60afb4] w-full rounded-t-md mt-2" style={{ height: "72px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2022</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-semibold text-[#60afb4]">15Cr</div>
                            <div className="text-xs text-gray-500">100 Loans</div>
                            <div className="bg-[#60afb4] w-full rounded-t-md mt-2" style={{ height: "88px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2023</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-semibold text-[#60afb4]">37.5Cr</div>
                            <div className="text-xs text-gray-500">250 Loans</div>
                            <div className="bg-[#60afb4] w-full rounded-t-md mt-2" style={{ height: "136px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2024</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="font-semibold text-[#60afb4]">40Cr+</div>
                            <div className="text-xs text-gray-500">300+ Loans</div>
                            <div className="bg-[#60afb4] w-full rounded-t-md mt-2" style={{ height: "152px" }}></div>
                            <div className="text-xs text-gray-500 mt-2">2025</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-center">
                      From humble beginnings to over ₹40 crore in loans disbursed, with 300+ satisfied borrowers
                    </p>
                  </div>
                </motion.div>
                </div>
            </div>
          </div>
          
          {/* Bottom Curved Wave */}
          <div className="w-full mt-16">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,128L48,122.7C96,117,192,107,288,122.7C384,139,480,181,576,181.3C672,181,768,139,864,122.7C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>
        
        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-block mb-6">
                    <div className="bg-[#4eb4a7]/10 text-[#4eb4a7] text-sm font-semibold py-1 px-3 rounded-full">
                      CLIENT STORIES
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]">
                      What Our Clients Say
                    </span>
                  </h2>
                  
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Read about the experiences of those who have benefited from our services
                  </p>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Pradeep S.",
                    location: "Nagercoil",
                    quote: "Prince Group made the entire home loan process seamless. Their team guided me through every step, making what seemed complicated very straightforward.",
                    service: "Home Loan"
                  },
                  {
                    name: "Lakshmi R.",
                    location: "Kanyakumari",
                    quote: "I needed urgent documentation for a property sale. The team at Prince Group delivered with exceptional speed and accuracy, saving me valuable time.",
                    service: "Property Documentation"
                  },
                  {
                    name: "Mohammed K.",
                    location: "Thuckalay",
                    quote: "As a small business owner, I was struggling with loan options. Prince Group provided personalized solutions that perfectly matched my business needs.",
                    service: "Business Loan"
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#4eb4a7]/10 h-full transition-all duration-300 hover:shadow-xl relative">
                      <div className="absolute top-6 right-6 text-[#4eb4a7]/20 group-hover:text-[#4eb4a7]/40 transition-colors duration-300">
                        <Quote className="h-12 w-12" />
                      </div>
                      
                      <p className="text-gray-600 mb-8 relative z-10">"{testimonial.quote}"</p>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4eb4a7] to-[#60afb4] flex items-center justify-center text-white font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.location} • {testimonial.service}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4eb4a7] to-[#60afb4]"></div>
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
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
            
            {/* Floating Elements */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: Math.random() * 60 + 20,
                  height: Math.random() * 60 + 20,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -(Math.random() * 60 + 40)],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  Ready to Experience Our Services?
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Visit any of our 18+ branches across Kanyakumari District or get in touch with our team to learn more.
            </p>
                
            <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-[#4eb4a7] hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all px-8 py-6 rounded-full"
                  >
                    <span>Find Nearest Branch</span>
                    <MapPin className="ml-2 h-5 w-5" />
              </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-full"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
};

export default About;
