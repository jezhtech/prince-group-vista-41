
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CalendarCheck, List, Grid, MapPin, Clock, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Events = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const events = [
    {
      id: 1,
      title: "Document Registration Workshop",
      date: "Jun 15, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Nagercoil Main Branch",
      attendees: 45,
      capacity: 50,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Learn about efficient document registration processes and tips to avoid common pitfalls."
    },
    {
      id: 2,
      title: "Financial Planning Seminar",
      date: "Jun 22, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Thuckalay Branch",
      attendees: 28,
      capacity: 40,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Expert guidance on managing personal finances, investments, and retirement planning."
    },
    {
      id: 3,
      title: "Loan Application Workshop",
      date: "Jun 29, 2023",
      time: "11:00 AM - 1:00 PM",
      location: "Marthandam Branch",
      attendees: 32,
      capacity: 35,
      image: "https://placehold.co/600x400/e9e9e9/7d7d7d?text=Event+Image",
      description: "Step-by-step guidance on preparing a successful loan application with our experts."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-prince-green py-24">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Upcoming Events</h1>
              <p className="text-xl text-white/90">
                Join us for educational workshops, seminars, and networking opportunities.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -skew-y-3"></div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between mb-8">
              <Tabs defaultValue="upcoming" className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                  <TabsTrigger value="members">Members Only</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4 mr-2" /> Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4 mr-2" /> List
                </Button>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <div className="h-48 relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-prince-green text-white py-1 px-3 text-sm font-medium">
                        {event.date}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3">{event.title}</h3>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center">
                          <CalendarCheck className="h-5 w-5 text-prince-green mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-prince-green mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-prince-green mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-prince-green mr-3 flex-shrink-0" />
                          <div className="w-full">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-600">
                                {event.attendees} / {event.capacity} registered
                              </span>
                              {event.attendees / event.capacity > 0.8 && (
                                <span className="text-sm text-orange-600 font-medium">
                                  Almost Full!
                                </span>
                              )}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  event.attendees / event.capacity > 0.8 ? "bg-orange-500" : "bg-prince-green"
                                }`}
                                style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full">
                        Register Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col md:flex-row"
                  >
                    <div className="md:w-1/4 h-48 md:h-auto">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-3/4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center">
                            <CalendarCheck className="h-5 w-5 text-prince-green mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-prince-green mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{event.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="mb-3 sm:mb-0">
                          <div className="text-sm text-gray-600">
                            {event.attendees} / {event.capacity} registered
                          </div>
                          <div className="w-36 bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className={`h-2 rounded-full ${
                                event.attendees / event.capacity > 0.8 ? "bg-orange-500" : "bg-prince-green"
                              }`}
                              style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button>Register Now</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Events
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
