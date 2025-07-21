import "./events.css";

import {
  MapPin,
  Ticket,
  ArrowRight,
  Users,
  CalendarDays,
  CalendarIcon,
  Phone,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn, isIOS } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MainFooter from "@/components/MainFooter";
import { EventNavbar } from "@/components/EventNavbar";
import { EventBooking } from "@/components/EventBooking";

const Events = () => {
  // Ref for scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const isEventDialogueOpen = searchParams.get("eventDialogue") === "true";

  // State variables
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentPerformer, setCurrentPerformer] = useState(0);

  // Three main performers
  const performers = [
    {
      id: "aditya-rkay",
      name: "Aditya Rkay",
      title: "Live Music Concert",
      image: "/images/aditya-rkay.jpg",
      textColor: "text-purple-600",
      buttonColor: "bg-gradient-to-r from-purple-600 to-indigo-600",
    },
    {
      id: "sri-nisha",
      name: "Sri Nisha",
      title: "Featuring",
      image: "/images/sri-nisha.jpg",
      textColor: "text-pink-600",
      buttonColor: "bg-gradient-to-r from-pink-600 to-red-600",
    },
    {
      id: "aparnaa-pratheep",
      name: "Aparnaa Pratheep",
      title: "Violin",
      image: "/images/aparnaa.jpg",
      textColor: "text-orange-600",
      buttonColor: "bg-gradient-to-r from-orange-600 to-red-600",
    },
    {
      id: "hendamellam",
      name: "Chendamellam Fusion",
      title: "Chendamelam Fusion",
      image: "/images/chendamellam.jpg",
      textColor: "text-orange-600",
      buttonColor: "bg-gradient-to-r from-orange-600 to-red-600",
    },
  ];

  // Auto-scrolling performers
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPerformer((prevIndex) =>
        prevIndex === performers.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [performers.length]);

  useEffect(() => {
    if (isEventDialogueOpen) {
      setIsBookingOpen(true);
    }
  }, [isEventDialogueOpen]);

  return (
    <div className="min-h-screen flex flex-col" ref={containerRef}>
      <Helmet>
        <title>
          Rhythm Of Kumari | Sri Nisha, Aditya Rkay & Aparnaa Pratheep | Prince
          Group
        </title>
        <meta
          name="description"
          content="Experience the biggest musical night in Kanyakumari featuring Vijay Antony, Yuvan Shankar Raja & Anirudh Ravichander. December 21-22, 2025 at Concordia High School Ground."
        />
        <meta
          name="keywords"
          content="Rhythm Of Kumari, Vijay Antony, Yuvan Shankar Raja, Anirudh Ravichander, Kanyakumari concert, Prince Group event, Tamil music concert"
        />
        <meta
          property="og:title"
          content="Rhythm Of Kumari 2025 | Prince Group Mega Concert"
        />
        <meta
          property="og:description"
          content="Experience Vijay Antony, Yuvan Shankar Raja & Anirudh Ravichander live in concert. Book your tickets now!"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://princegroupofcompanies.in/events"
        />
        <meta property="og:image" content="/images/event-cover.jpg" />
      </Helmet>

      {/* Custom Event Navbar */}
      <EventNavbar mode="dark" />

      {/* Hero Section with Performers Carousel */}
      <section
        className={cn(
          "relative w-full overflow-hidden pt-20 md:pt-4",
          isIOS() && "pt-40"
        )}
      >
        <div className="min-h-screen flex items-center">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            {/* 3D Starfield Background */}
            <div className="fixed inset-0 bg-gradient-to-b from-[#0c1e3c] via-[#0e253f] to-[#01082f]">
              {[...Array(200)].map((_, i) => (
                <motion.div
                  key={i}
                  className="fixed rounded-full bg-white"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    zIndex: 1,
                  }}
                  animate={{
                    opacity: [0.1, 0.8, 0.1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>

            {/* Animated Gradient Overlay */}
            <motion.div
              className="fixed inset-0 opacity-30 bg-gradient-to-r from-indigo-900/30 via-transparent to-purple-900/30"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
                zIndex: 2,
              }}
            />
          </div>

          {/* Content Container */}
          <div className="container mx-auto px-3 sm:px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Hero Content */}
              <motion.div
                className="text-left text-white"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Event Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Badge className="bg-white/10 text-white border-none backdrop-blur-sm py-2 px-4 text-sm mb-6 inline-flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="font-medium">5 PM, 20 September 2025</span>
                  </Badge>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.span
                    className={cn(
                      "bg-gradient-to-r bg-clip-text text-transparent",
                      currentPerformer === 0
                        ? "from-pink-600 via-purple-600 to-blue-600"
                        : currentPerformer === 1
                        ? "from-purple-600 via-indigo-600 to-blue-600"
                        : "from-blue-600 via-cyan-600 to-green-600"
                    )}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    Rhythm Of Kumari
                  </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl text-white/80 font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  ADITHYA RK LIVE FT SRINISHA
                </motion.p>
                {/* Subtitle */}
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Experience the biggest musical night in Kanyakumari featuring
                  sensational performers
                </motion.p>

                {/* Location Info */}
                <motion.div
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex items-center gap-3 mb-8 max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="h-10 w-10 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center text-[#4eb4a7]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Location</div>
                    <div className="text-white font-medium">
                      Concordia High School Ground, Nagercoil
                    </div>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white h-12 px-8 text-lg"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    <Ticket className="mr-2 h-5 w-5" />
                    Book Tickets Now
                  </Button>
                  <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                    <Phone className="mr-2 h-4 w-4 text-white/80" />
                    <span className="text-white/90 text-sm font-medium">
                      Or call{" "}
                      <a
                        href="tel:9488934178"
                        className="text-white font-semibold hover:text-yellow-300 transition-colors duration-200 underline decoration-yellow-300/50 hover:decoration-yellow-300"
                      >
                        9488934178
                      </a>{" "}
                      to book tickets
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side - Performers Carousel */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative h-[600px] overflow-hidden rounded-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPerformer}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Card className="h-[90%] overflow-hidden border-0 bg-gradient-to-br from-[#0c1e3c] to-[#0e253f] shadow-2xl">
                        {/* Performer Image */}
                        <div className="relative h-full overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <img
                            src={performers[currentPerformer].image}
                            alt={performers[currentPerformer].name}
                            className="w-full h-full object-cover object-top"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop";
                            }}
                          />

                          {/* Overlay with performer info */}
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="flex items-center justify-between mb-4">
                              <Badge
                                className={`${performers[currentPerformer].buttonColor} text-white border-none`}
                              >
                                {performers[currentPerformer].title}
                              </Badge>
                            </div>
                            <h3 className="text-5xl font-bold text-white mb-2">
                              {performers[currentPerformer].name}
                            </h3>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Navigation */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-2">
                      {performers.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPerformer(index)}
                          className={`h-3 w-3 rounded-full transition-all ${
                            currentPerformer === index
                              ? "bg-white w-8"
                              : "bg-white/30 hover:bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={() =>
                      setCurrentPerformer(
                        currentPerformer === 0
                          ? performers.length - 1
                          : currentPerformer - 1
                      )
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-all"
                  >
                    <ArrowRight className="h-6 w-6 rotate-180" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPerformer(
                        currentPerformer === performers.length - 1
                          ? 0
                          : currentPerformer + 1
                      )
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center transition-all"
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-16">
            <Badge className="bg-[#4eb4a7]/20 text-[#4eb4a7] border-none backdrop-blur-sm py-2 px-4 mb-6 text-sm">
              EVENT DETAILS
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Event Information
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Everything you need to know about Rhythm Of Kumari 2025
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CalendarDays,
                title: "Event Date",
                value: "5 PM, 20 September 2025",
                color: "text-blue-400",
              },
              {
                icon: MapPin,
                title: "Location",
                value: "Concordia High School Ground, Nagercoil",
                color: "text-green-400",
              },
              {
                icon: Users,
                title: "Expected Crowd",
                value: "10,000+ Attendees",
                color: "text-purple-400",
              },
              {
                icon: Ticket,
                title: "Tickets Available",
                value: "Limited Seats",
                color: "text-orange-400",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#0c1e3c]/80 backdrop-blur-sm rounded-lg p-6 border border-white/10 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`h-14 w-14 rounded-full bg-[#4eb4a7]/20 flex items-center justify-center mb-4 mx-auto`}
                >
                  <item.icon className={`h-7 w-7 ${item.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/70">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-3 sm:px-4">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-[#4eb4a7]/20 text-[#4eb4a7] border-none backdrop-blur-sm py-2 px-4 mb-4 text-sm">
              Organizer
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Event Organizer
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-4 md:mb-12">
              Brought to you by the best in the industry
            </p>
            <div className="w-auto mx-auto flex flex-col justify-center items-center">
              <img
                src="/logo.png"
                alt="Prince Group"
                className="h-20 w-80 object-contain mb-4"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <EventBooking
        isBookingOpen={isBookingOpen}
        setIsBookingOpen={setIsBookingOpen}
      />

      <MainFooter theme="dark" />
    </div>
  );
};

export default Events;
